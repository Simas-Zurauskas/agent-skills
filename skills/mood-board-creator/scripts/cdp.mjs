// Minimal headless-Chrome driver over the DevTools protocol (Node 22: global WebSocket, fetch).
// import { launch } from './cdp.mjs'; const b = await launch({ width, height }); await b.goto(url); await b.eval('js');
// await b.wheel(x, y, dy); await b.click(x, y); await b.shot(path); await b.close();
// b.goto() returns null, or Chrome's error text (e.g. net::ERR_FILE_NOT_FOUND) when the page did not load.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// Chrome/Chromium binary: CHROME_PATH env var, else Puppeteer's chrome-headless-shell, else the macOS default
// Default to chrome-headless-shell, never Google Chrome.app: a headless copy of the real app registers as
// com.google.Chrome, and macOS then activates it instead of the user's browser, so Chrome seems not to open.
function headlessShell() {
  const root = join(homedir(), '.cache/puppeteer/chrome-headless-shell');
  try {
    for (const version of readdirSync(root).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))) {
      for (const dir of readdirSync(join(root, version))) {
        const bin = join(root, version, dir, 'chrome-headless-shell');
        if (existsSync(bin)) return bin;
      }
    }
  } catch {}
  return null;
}
const CHROME = process.env.CHROME_PATH || headlessShell() || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (CHROME.includes('/Google Chrome.app/')) console.error('cdp.mjs: chrome-headless-shell not found, using Google Chrome.app, which stops the real Chrome from opening. Install it: npx @puppeteer/browsers install chrome-headless-shell@stable --path ~/.cache/puppeteer');
// A separate process group and fresh profile identify exactly the browser we own.
const live = new Map();
function groupExists(proc) {
  if (!proc.pid) return false;
  try { process.kill(-proc.pid, 0); return true; }
  catch (error) {
    if (error.code === 'ESRCH') return false;
    if (error.code === 'EPERM') return true; // uncertain is still present; never authorize profile removal
    throw error;
  }
}
function signalOwned(proc) {
  if (!proc.pid) return;
  try { process.kill(-proc.pid, 'SIGKILL'); }
  catch (error) { if (error.code !== 'ESRCH') throw error; }
}
function cleanupError(proc, profile, error) {
  process.exitCode = 1;
  return new Error(`Owned browser cleanup failed (PID ${proc.pid ?? 'not started'}); retained profile ${profile}: ${error.message}`, { cause: error });
}
async function cleanupOwned(proc, profile) {
  try {
    if (groupExists(proc)) signalOwned(proc);
    const deadline = Date.now() + 1000;
    while (groupExists(proc)) {
      if (Date.now() >= deadline) throw new Error('process group still exists after shutdown deadline');
      await sleep(25);
    }
    rmSync(profile, { recursive: true, force: true });
    live.delete(proc);
  } catch (error) { throw cleanupError(proc, profile, error); }
}
// Exit hooks cannot wait. Never remove a profile while termination is uncertain.
process.on('exit', () => {
  for (const [proc, { profile }] of live) {
    try {
      signalOwned(proc);
      if (groupExists(proc)) throw new Error('process exit prevents waiting for shutdown');
      rmSync(profile, { recursive: true, force: true });
      live.delete(proc);
    } catch (error) { console.error(cleanupError(proc, profile, error).message); }
  }
});
let interrupted = false;
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(sig, async () => {
  if (interrupted) return;
  interrupted = true;
  const results = await Promise.allSettled([...live.values()].map(({ close }) => close()));
  for (const result of results) if (result.status === 'rejected') console.error(result.reason.message);
  process.exit(1);
});
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const isMain = (url) => !!process.argv[1] && resolve(process.argv[1]) === fileURLToPath(url);
if (isMain(import.meta.url)) {
  console.log('cdp.mjs is a library. Chrome: CHROME_PATH, cached chrome-headless-shell, then macOS Chrome.');
  process.exitCode = 2;
}
export async function launch({ width = 1440, height = 1000, timeout = 10000, requestTimeout = 15000, port = 0 } = {}) {
  if (port !== 0) throw new Error('cdp.mjs: only owned ephemeral ports are supported (omit port)');
  if (![width, height, timeout, requestTimeout].every(n => Number.isFinite(n) && n > 0)) throw new Error('Invalid browser dimensions or timeout');
  const profile = mkdtempSync(join(tmpdir(), 'claude-cdp-'));
  const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', `--window-size=${width},${height}`, '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore', detached: true });
  let spawnError, ws, closed = false, cleaned = false, closing;
  proc.on('error', e => { spawnError = e; });
  const pending = new Map(), listeners = new Set();
  const rejectPending = (error) => { for (const p of pending.values()) { clearTimeout(p.timer); p.reject(error); } pending.clear(); };
  const close = () => {
    if (cleaned) return Promise.resolve();
    if (closing) return closing;
    closing = (async () => {
      closed = true;
      rejectPending(new Error('Browser closed'));
      try { ws?.close(); } catch {}
      await cleanupOwned(proc, profile);
      cleaned = true;
    })().finally(() => { closing = null; });
    return closing;
  };
  live.set(proc, { profile, close });
  try {
    const deadline = Date.now() + timeout;
    let page;
    while (Date.now() < deadline && !spawnError && proc.exitCode === null) {
      try {
        const [ownedPort, browserPath] = readFileSync(join(profile, 'DevToolsActivePort'), 'utf8').trim().split('\n');
        if (!/^\d+$/.test(ownedPort) || !browserPath?.startsWith('/devtools/browser/')) throw new Error('Invalid owned endpoint');
        const endpoint = `http://127.0.0.1:${ownedPort}`;
        const get = async path => {
          const r = await fetch(endpoint + path, { signal: AbortSignal.timeout(Math.max(1, Math.min(1000, deadline - Date.now()))) });
          if (!r.ok) throw new Error(`DevTools HTTP ${r.status}`);
          return r.json();
        };
        const version = await get('/json/version');
        const browserURL = new URL(version.webSocketDebuggerUrl);
        if (browserURL.pathname !== browserPath || browserURL.hostname !== '127.0.0.1' || browserURL.port !== ownedPort) throw new Error('Endpoint ownership mismatch');
        const candidate = (await get('/json/list')).find(t => t.type === 'page' && t.url === 'about:blank');
        if (candidate) {
          const endpointURL = new URL(candidate.webSocketDebuggerUrl);
          if (endpointURL.hostname !== '127.0.0.1' || endpointURL.port !== ownedPort) throw new Error('Page endpoint ownership mismatch');
          page = candidate;
          break;
        }
      } catch {}
      await sleep(50);
    }
    if (!page) throw new Error(`headless Chrome did not start: ${spawnError?.message || 'owned DevTools endpoint timed out'}. Binary: ${CHROME}`);
    ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('DevTools connection timed out')), Math.max(1, deadline - Date.now()));
      const done = (error) => { clearTimeout(timer); ws.removeEventListener('open', opened); ws.removeEventListener('error', failed); ws.removeEventListener('close', failed); error ? reject(error) : resolve(); };
      const opened = () => done();
      const failed = () => done(new Error('DevTools connection failed'));
      ws.addEventListener('open', opened); ws.addEventListener('error', failed); ws.addEventListener('close', failed);
    });
    let id = 0;
    ws.addEventListener('close', () => rejectPending(new Error('DevTools disconnected')));
    ws.addEventListener('error', () => rejectPending(new Error('DevTools socket error')));
    ws.addEventListener('message', m => {
      const d = JSON.parse(m.data), p = pending.get(d.id);
      if (p) {
        clearTimeout(p.timer); pending.delete(d.id);
        d.error ? p.reject(new Error(`${p.method}: ${d.error.message}`)) : p.resolve(d);
      } else for (const listener of listeners) listener(d);
    });
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      if (closed || ws.readyState !== WebSocket.OPEN) return reject(new Error('DevTools is not connected'));
      const i = ++id;
      const timer = setTimeout(() => { pending.delete(i); reject(new Error(`${method}: request timed out`)); }, requestTimeout);
      pending.set(i, { resolve, reject, timer, method });
      try { ws.send(JSON.stringify({ id: i, method, params })); } catch (error) { clearTimeout(timer); pending.delete(i); reject(error); }
    });
    const evaluate = async expression => {
      const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text);
      return r.result?.result?.value;
    };
    await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
    const b = {
      send, eval: evaluate, close,
      on(fn) { listeners.add(fn); return () => listeners.delete(fn); },
      async goto(url, wait = 2500) {
        const responses = new Map();
        const off = b.on(m => { if (m.method === 'Network.responseReceived' && m.params.type === 'Document') responses.set(m.params.frameId, m.params.response); });
        try {
          if (!Number.isFinite(wait) || wait < 0 || wait > 60000) throw new Error('Invalid navigation settle time (0–60000ms)');
          const expected = new URL(url).href;
          const r = await send('Page.navigate', { url: expected });
          if (r.result.errorText) return r.result.errorText;
          const deadline = Date.now() + timeout;
          while (await evaluate('document.readyState') !== 'complete') {
            if (Date.now() >= deadline) throw new Error('Navigation timed out');
            await sleep(50);
          }
          await sleep(wait);
          const actual = await evaluate('location.href');
          if (actual !== expected) return `unexpected page: ${actual} (requested ${expected})`;
          const response = responses.get(r.result.frameId);
          if (response?.status >= 400) return `HTTP ${response.status}: ${expected}`;
          return null;
        } catch (error) { return error.message; } finally { off(); }
      },
      async requireSelector(selector) {
        const found = await evaluate(`!!document.querySelector(${JSON.stringify(selector)})`);
        if (!found) throw new Error(`Requested selector not found: ${selector}`);
      },
      async wheel(x, y, deltaY, deltaX = 0, modifiers = 0) { await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x, y, deltaX, deltaY, modifiers }); await sleep(400); },
      async click(x, y) { for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 }); await sleep(300); },
      async drag(x, y, dx, dy, steps = 10) { await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }); await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 }); for (let i = 1; i <= steps; i++) await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x + dx * i / steps, y: y + dy * i / steps, button: 'left', buttons: 1 }); await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: x + dx, y: y + dy, button: 'left', clickCount: 1 }); await sleep(300); },
      async shot(path) { const r = await send('Page.captureScreenshot', { format: 'png' }); mkdirSync(dirname(resolve(path)), { recursive: true }); writeFileSync(path, Buffer.from(r.result.data, 'base64')); return path; },
    };
    return b;
  } catch (error) {
    try { await close(); } catch (cleanup) { throw new AggregateError([error, cleanup], `${error.message}; ${cleanup.message}`); }
    throw error;
  }
}
