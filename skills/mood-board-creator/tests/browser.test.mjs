// Real Chrome integration regressions. Run with TMPDIR pointing to a disposable lab directory.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { chmodSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from '../scripts/cdp.mjs';
import { verifyPage } from '../scripts/verify-screens.mjs';
import { auditPage } from '../scripts/dom-audit.mjs';
import { requiredStrings, checkStrings } from '../scripts/check-strings.mjs';
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const temp = mkdtempSync(join(tmpdir(), 'browser-tests-'));
const profiles = () => readdirSync(tmpdir()).filter(p => p.startsWith('claude-cdp-')).sort();
const run = (script, args, env = {}) => new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [script, ...args], { cwd: root, env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '';
  child.stdout.on('data', d => output += d); child.stderr.on('data', d => output += d);
  const timer = setTimeout(() => { child.kill('SIGKILL'); reject(new Error(`Test process timed out: ${output}`)); }, 45000);
  child.on('error', reject); child.on('exit', (code, signal) => { clearTimeout(timer); resolve({ code, signal, output }); });
});
let base, server, hits = {};
const html = '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Control</title><style>body{margin:0;background:white;color:black;font:16px sans-serif}button{width:80px;height:48px}#bottom{margin-top:900px}</style><main>Required text<button>Go</button><div id="bottom">Ending</div></main>';
test.before(async () => {
  server = createServer((req, res) => {
    const path = new URL(req.url, 'http://localhost').pathname;
    hits[path] = (hits[path] || 0) + 1;
    if (path === '/redirect') { res.writeHead(302, { Location: '/screen-1.html' }); return res.end(); }
    res.writeHead(path.startsWith('/404') ? 404 : 200, { 'Content-Type': 'text/html' });
    res.end(path.startsWith('/hidden') ? html.replace('Required text', '<span hidden>Required text</span>') : html);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
test.after(async () => { await new Promise(resolve => server.close(resolve)); rmSync(temp, { recursive: true, force: true }); });
test('real Chrome owns a fresh profile; valid navigation, protocol failures and request timeout remain bounded', async () => {
  const before = profiles();
  const b = await launch({ requestTimeout: 500 });
  try {
    assert.equal(await b.goto(base + '/screen-1.html', 0), null);
    assert.equal(await b.eval('document.title'), 'Control');
    assert.deepEqual(await verifyPage(b), []);
    const audit = await auditPage(b);
    assert.deepEqual(audit.overlaps, []); assert.deepEqual(audit.lowContrast, []);
    assert.match(await b.goto(base + '/404/screen-1.html', 0), /HTTP 404/);
    assert.match(await b.goto(base + '/redirect', 0), /unexpected page/);
    assert.match(await b.goto('file:///nonexistent/browser-control.html', 0), /ERR_FILE_NOT_FOUND/);
    await assert.rejects(b.send('NotAProtocol.command'), /wasn't found|not found/);
    const started = Date.now();
    await assert.rejects(b.eval('new Promise(() => {})'), /request timed out/);
    assert.ok(Date.now() - started < 2000);
  } finally { await b.close(); await b.close(); }
  assert.deepEqual(profiles(), before);
});
test('required spec absence and hidden-only presence fail; visible required text passes', async () => {
  assert.throws(() => requiredStrings({}, base + '/screen-1.html'), /No valid required/);
  assert.throws(() => requiredStrings({ 1: [] }, base + '/screen-1.html'), /No valid required/);
  const b = await launch();
  try {
    assert.equal(await b.goto(base + '/hidden/screen-1.html', 0), null);
    const hidden = await checkStrings(b, { 1: ['Required text'] }, base + '/hidden/screen-1.html');
    assert.deepEqual(hidden.hiddenOnly, ['Required text']);
    assert.equal(await b.goto(base + '/screen-1.html', 0), null);
    const visible = await checkStrings(b, { 1: ['Required text'] }, base + '/screen-1.html');
    assert.deepEqual(visible.hiddenOnly, []); assert.deepEqual(visible.missing, []);
    await b.eval(`document.body.innerHTML = '<input value="09 Nov 16:00"><input placeholder="Find work"><input value="Chosen" placeholder="Unused placeholder"><textarea>Notes</textarea><select><option selected>Open</option></select><input style="display:none" value="Hidden control"><input type="hidden" value="Hidden type"><input type="password" value="Secret"><input type="checkbox" value="Checkbox value"><input type="button" placeholder="Not displayed">'`);
    const controls = await checkStrings(b, { 1: ['09 Nov 16:00', 'Find work', 'Chosen', 'Notes', 'Open', 'Hidden control', 'Hidden type', 'Secret', 'Checkbox value', 'Unused placeholder', 'Not displayed'] }, base + '/screen-1.html');
    assert.deepEqual(controls.hiddenOnly, ['Hidden control']);
    assert.deepEqual(controls.missing, ['Hidden type', 'Secret', 'Checkbox value', 'Unused placeholder', 'Not displayed']);

  } finally { await b.close(); }
});
test('page batch reuses one visit and rejects missing selector without a PNG; positional CLI still works', async () => {
  const jobs = join(temp, 'pages.json');
  const out = n => join(temp, `${n}.png`);
  writeFileSync(jobs, JSON.stringify([{ url: base + '/page', out: out('first'), settle: 0 }, { url: base + '/page', out: out('second'), selector: '#bottom', settle: 0 }, { url: base + '/page', out: out('missing'), selector: '#absent', settle: 0 }]));
  const before = hits['/page'] || 0;
  const result = await run('scripts/page-shot.mjs', ['--batch', jobs]);
  assert.equal(result.code, 1, result.output); assert.match(result.output, /Requested selector not found/);
  assert.ok(existsSync(out('first')) && existsSync(out('second'))); assert.equal(existsSync(out('missing')), false);
  assert.equal(hits['/page'] - before, 1);
  const positional = await run('scripts/page-shot.mjs', [base + '/positional', out('positional'), '800', '900', '--settle', '0']);
  assert.equal(positional.code, 0, positional.output); assert.ok(existsSync(out('positional')));
});
test('screen batch captures and checks on one visit each; invalid spec and HTTP errors fail without PNGs', async () => {
  const jobs = join(temp, 'screens.json'), strings = join(temp, 'strings.json');
  const prefix = n => join(temp, n);
  writeFileSync(strings, JSON.stringify({ 1: ['Required text'] }));
  writeFileSync(jobs, JSON.stringify([
    { url: base + '/batch/screen-1.html', prefix: prefix('valid') },
    { url: base + '/desktop/screen-1.html', prefix: prefix('desktop'), width: 1280, height: 900 },
    { url: base + '/hidden/screen-1.html', prefix: prefix('hidden') },
    { url: base + '/404/screen-1.html', prefix: prefix('404') },
    { url: base + '/batch/screen-2.html', prefix: prefix('nospec') },
  ]));
  const before = hits['/batch/screen-1.html'] || 0;
  const result = await run('scripts/screen-shot.mjs', ['--batch', jobs, '--strings', strings, '--verify', '--audit']);
  assert.equal(result.code, 1, result.output);
  assert.ok(existsSync(prefix('valid-top.png')) && existsSync(prefix('valid-scrolled.png')));
  const png = readFileSync(prefix('valid-top.png'));
  assert.equal(png.readUInt32BE(16), 780); assert.equal(png.readUInt32BE(20), 1688);
  assert.notDeepEqual(png, readFileSync(prefix('valid-scrolled.png')));
  assert.match(result.output, /"problems": \[\]/);
  const desktop = readFileSync(prefix('desktop-top.png'));
  assert.equal(desktop.readUInt32BE(16), 2560); assert.equal(desktop.readUInt32BE(20), 1800);
  assert.match(result.output, /hiddenOnly/); assert.match(result.output, /HTTP 404/); assert.match(result.output, /No valid required string spec/);
  assert.equal(existsSync(prefix('404-top.png')), false); assert.equal(existsSync(prefix('nospec-top.png')), false);
  assert.equal(hits['/batch/screen-1.html'] - before, 1);
  const desktopResult = await run('scripts/screen-shot.mjs', [base + '/desktopcontrol/screen-1.html', prefix('desktopcli'), '--width', '1280', '--height', '900', '--desktop', '--dpr', '1', '--verify', '--strings', strings]);
  assert.equal(desktopResult.code, 0, desktopResult.output);
  const desktopCLI = readFileSync(prefix('desktopcli-top.png'));
  assert.equal(desktopCLI.readUInt32BE(16), 1280); assert.equal(desktopCLI.readUInt32BE(20), 900);
});
test('failed binary startup cleans its owned profile', async () => {
  const before = profiles();
  const script = join(temp, 'bad-launch.mjs');
  writeFileSync(script, `import {launch} from ${JSON.stringify(new URL('../scripts/cdp.mjs', import.meta.url).href)}; await launch({timeout:300});`);
  const result = await run(script, [], { CHROME_PATH: join(temp, 'missing-chrome') });
  assert.notEqual(result.code, 0); assert.match(result.output, /ENOENT/); assert.deepEqual(profiles(), before);
});
test('SIGTERM removes only owned browser/profile while unrelated Chrome survives', async () => {
  const unrelated = await launch();
  const before = profiles();
  const script = join(temp, 'interrupt.mjs');
  writeFileSync(script, `import {launch} from ${JSON.stringify(new URL('../scripts/cdp.mjs', import.meta.url).href)}; const b=await launch(); console.log('READY'); setInterval(()=>{},1000);`);
  const child = spawn(process.execPath, [script], { stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Interruption child did not start')), 15000);
      child.stdout.on('data', d => { if (String(d).includes('READY')) { clearTimeout(timer); resolve(); } });
      child.on('error', reject);
    });
    assert.equal(profiles().length, before.length + 1);
    const exited = new Promise(resolve => child.once('exit', resolve));
    child.kill('SIGTERM'); await exited;
    assert.deepEqual(profiles(), before);
    assert.equal(await unrelated.goto(base + '/survivor', 0), null);
    assert.equal(await unrelated.eval('document.title'), 'Control');
  } finally { child.kill('SIGKILL'); await unrelated.close(); }
});

test('stalled startup and websocket connect time out and reap only their owned fake browser', async () => {
  const before = profiles();
  const executable = join(temp, 'fake-chrome.mjs'), pidFile = join(temp, 'fake.pid'), runner = join(temp, 'bounded.mjs');
  writeFileSync(executable, `#!${process.execPath}
import {createServer} from 'node:http';
import {writeFileSync} from 'node:fs';
import {join} from 'node:path';
writeFileSync(process.env.FAKE_PID, String(process.pid));
if(process.env.FAKE_MODE==='startup') setInterval(()=>{},1000);
else {
 const profile=process.argv.find(a=>a.startsWith('--user-data-dir=')).split('=').slice(1).join('=');
 const server=createServer((req,res)=>{
  const endpoint='ws://127.0.0.1:'+server.address().port;
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify(req.url==='/json/version'?{webSocketDebuggerUrl:endpoint+'/devtools/browser/fake'}:[{type:'page',url:'about:blank',webSocketDebuggerUrl:endpoint+'/devtools/page/fake'}]));
 });
 server.on('upgrade',()=>{});
 server.listen(0,'127.0.0.1',()=>writeFileSync(join(profile,'DevToolsActivePort'),server.address().port+${JSON.stringify('\n/devtools/browser/fake')}));
}
`);
  chmodSync(executable, 0o755);
  writeFileSync(runner, `import {launch} from ${JSON.stringify(new URL('../scripts/cdp.mjs', import.meta.url).href)}; await launch({timeout:500});`);
  for (const mode of ['startup', 'connect']) {
    const start = Date.now();
    const result = await run(runner, [], { CHROME_PATH: executable, FAKE_MODE: mode, FAKE_PID: pidFile });
    assert.notEqual(result.code, 0, result.output);
    assert.match(result.output, mode === 'connect' ? /connection timed out/ : /endpoint timed out/);
    assert.ok(Date.now() - start < 3000, result.output);
    const pid = Number(readFileSync(pidFile, 'utf8'));
    assert.throws(() => process.kill(pid, 0), /ESRCH/);
    assert.deepEqual(profiles(), before);
  }
});

test('shutdown failures retain owned evidence, report failure, and permit bounded cleanup retry', async () => {
  const before = profiles(), script = join(temp, 'cleanup-fault.mjs');
  writeFileSync(script, `
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {syncBuiltinESMExports} from 'node:module';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {launch} from ${JSON.stringify(new URL('../scripts/cdp.mjs', import.meta.url).href)};
const before=new Set(fs.readdirSync(tmpdir()));
const b=await launch();
const profile=join(tmpdir(),fs.readdirSync(tmpdir()).find(p=>p.startsWith('claude-cdp-')&&!before.has(p)));
const kill=process.kill, remove=fs.rmSync;
const mode=process.env.CLEANUP_FAULT;
try {
 process.kill=(pid,signal)=>{
  if(pid<0 && mode==='denied') throw Object.assign(new Error('injected kill denial'),{code:'EPERM'});
  if(pid<0 && signal==='SIGKILL' && mode==='unobserved') return true;
  return kill(pid,signal);
 };
 if(mode==='remove') {
  fs.rmSync=(path,...args)=>{if(path===profile) throw Object.assign(new Error('injected remove denial'),{code:'EACCES'}); return remove(path,...args);};
  syncBuiltinESMExports();
 }
 const started=Date.now();
 await assert.rejects(b.close(),/Owned browser cleanup failed/);
 assert.ok(Date.now()-started<2500);
 assert.ok(fs.existsSync(profile),'uncertain cleanup must retain profile');
 assert.equal(process.exitCode,1,'cleanup failure must not produce successful exit');
 console.log('retained and reported '+mode);
} finally {
 process.kill=kill; fs.rmSync=remove; syncBuiltinESMExports();
 await b.close();
 assert.equal(fs.existsSync(profile),false);
 console.log('retry reaped owned resources');
}
`);
  for (const mode of ['denied', 'unobserved', 'remove']) {
    const result = await run(script, [], { CLEANUP_FAULT: mode });
    assert.equal(result.code, 1, result.output);
    assert.match(result.output, new RegExp('retained and reported ' + mode));
    assert.match(result.output, /retry reaped owned resources/);
    assert.deepEqual(profiles(), before);
  }
});
