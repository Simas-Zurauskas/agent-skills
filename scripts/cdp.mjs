// Minimal headless-Chrome driver over the DevTools protocol (Node 22: global WebSocket, fetch).
// import { launch } from './cdp.mjs'; const b = await launch({ width, height }); await b.goto(url); await b.eval('js');
// await b.wheel(x, y, dy); await b.click(x, y); await b.shot(path); await b.close();
// b.goto() returns null, or Chrome's error text (e.g. net::ERR_FILE_NOT_FOUND) when the page did not load.
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// Chrome/Chromium binary: CHROME_PATH env var, else the macOS default
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log("cdp.mjs is a library, not a command: import { launch } from './cdp.mjs' (see its header). Chrome: $CHROME_PATH, else the macOS default.");
  process.exit(2);
}
export async function launch({ width = 1440, height = 1000, port = 9300 + Math.floor(Math.random() * 600) } = {}) {
  const profile = mkdtempSync(join(tmpdir(), 'claude-cdp-'));
  const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', `--window-size=${width},${height}`, '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' });
  let spawnError = null;
  proc.on('error', (e) => { spawnError = e; });
  let targets;
  for (let i = 0; i < 50 && !spawnError; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {} await sleep(200); }
  const page = targets?.find((t) => t.type === 'page');
  if (!page) {
    proc.kill('SIGKILL'); rmSync(profile, { recursive: true, force: true });
    throw new Error(`cdp.mjs: headless Chrome did not start (${spawnError ? spawnError.message : `no DevTools page on port ${port}`}). Binary: ${CHROME}. Set CHROME_PATH to a Chrome/Chromium binary.`);
  }
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0; const pending = new Map(); const listeners = [];
  ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else listeners.forEach((l) => l(d)); });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Page.enable'); await send('Runtime.enable');
  const b = {
    send,
    on(fn) { listeners.push(fn); },
    async goto(url, wait = 2500) { const r = await send('Page.navigate', { url }); await sleep(wait); return r.result?.errorText || null; },
    async eval(expr) { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) return { error: r.result.exceptionDetails.exception?.description }; return r.result?.result?.value; },
    async wheel(x, y, deltaY, deltaX = 0, modifiers = 0) { await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x, y, deltaX, deltaY, modifiers }); await sleep(400); },
    async click(x, y) { for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 }); await sleep(300); },
    async drag(x, y, dx, dy, steps = 10) { await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }); await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 }); for (let i = 1; i <= steps; i++) await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x + (dx * i) / steps, y: y + (dy * i) / steps, button: 'left', buttons: 1 }); await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: x + dx, y: y + dy, button: 'left', clickCount: 1 }); await sleep(300); },
    async shot(path) { const r = await send('Page.captureScreenshot', { format: 'png' }); mkdirSync(dirname(resolve(path)), { recursive: true }); writeFileSync(path, Buffer.from(r.result.data, 'base64')); return path; },
    async close() { try { ws.close(); } catch {} proc.kill('SIGKILL'); await sleep(200); rmSync(profile, { recursive: true, force: true }); },
  };
  return b;
}
