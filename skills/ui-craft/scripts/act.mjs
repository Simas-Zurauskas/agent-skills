// node act.mjs <url-or-file> [--width 1440] [--height 900] <step> [<step> ...]
// Operates a page so states that need interaction can be seen and checked. Steps run in order:
//   click=SELECTOR        real mouse click on the element's centre
//   type=SELECTOR::TEXT   click the field, replace its content with TEXT
//   key=Enter             Enter, Tab, Shift+Tab, Escape, Space, Backspace, ArrowUp/Down/Left/Right
//   hover=SELECTOR        move the pointer over it
//   scroll=SELECTOR       scroll it into view        wait=MS   pause
//   shot=PATH.png         screenshot of the viewport full=PATH.png  whole page
//   zoom=SELECTOR::PATH.png   the element alone at 3x, for checking glyphs, diacritics and fine detail
//   text=SELECTOR         print its visible text      eval=JS   print the result of an expression
//   focus                 print what has keyboard focus
// Example: node act.mjs index.html --width 390 click=#add type=#name::Žydrė key=Enter wait=300 shot=out/added.png
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { launch, sleep } from './cdp.mjs';

const KEYS = { Enter: [13, '\r'], Tab: [9], Escape: [27], Space: [32, ' '], Backspace: [8], ArrowLeft: [37], ArrowUp: [38], ArrowRight: [39], ArrowDown: [40] };
const args = process.argv.slice(2); let width = 1440, height = 900, target; const steps = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--width') width = Number(args[++i]);
  else if (a === '--height') height = Number(args[++i]);
  else if (!target && !/^(click|type|key|hover|scroll|wait|shot|full|zoom|text|eval)=/.test(a) && a !== 'focus') target = /^(https?|file):/.test(a) ? a : pathToFileURL(resolve(a)).href;
  else steps.push(a);
}
if (!target || !steps.length || !(width >= 280) || !(height >= 200)) { console.error('usage: node act.mjs <url-or-file> [--width N] [--height N] <step> [<step> ...]   (steps are listed at the top of this file)'); process.exit(2); }

const b = await launch({ width, height });
let failed = false;
try {
  await b.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  const err = await b.goto(target, 1200); if (err) throw new Error(`could not load: ${err}`);
  const centre = async (sel) => {
    const p = await b.eval(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; e.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return r.width && r.height ? [r.left + r.width / 2, r.top + r.height / 2] : 'hidden'; })()`);
    if (!p) throw new Error(`no element matches ${sel}`); if (p === 'hidden') throw new Error(`${sel} is not visible`); await sleep(120);
    return b.eval(`(() => { const r = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; })()`);
  };
  for (const step of steps) {
    const eq = step.indexOf('='), verb = eq < 0 ? step : step.slice(0, eq), arg = eq < 0 ? '' : step.slice(eq + 1);
    if (verb === 'click') { const [x, y] = await centre(arg); await b.click(x, y); console.log(`clicked ${arg}`); }
    else if (verb === 'type') {
      const [sel, ...rest] = arg.split('::'), value = rest.join('::'); const [x, y] = await centre(sel); await b.click(x, y);
      await b.eval(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (e.select) e.select(); else document.getSelection().selectAllChildren(e); })()`);
      if (value) await b.send('Input.insertText', { text: value }); else await b.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 });
      await sleep(150); console.log(`typed "${value}" into ${sel}`);
    }
    else if (verb === 'key') {
      const shift = arg.startsWith('Shift+'), name = arg.replace('Shift+', ''), k = KEYS[name]; if (!k) throw new Error(`unknown key ${arg}`);
      await b.send('Input.dispatchKeyEvent', { type: k[1] ? 'keyDown' : 'rawKeyDown', key: name === 'Space' ? ' ' : name, code: name, windowsVirtualKeyCode: k[0], nativeVirtualKeyCode: k[0], modifiers: shift ? 8 : 0, ...(k[1] ? { text: k[1] } : {}) });
      await b.send('Input.dispatchKeyEvent', { type: 'keyUp', key: name === 'Space' ? ' ' : name, code: name, windowsVirtualKeyCode: k[0], nativeVirtualKeyCode: k[0], modifiers: shift ? 8 : 0 });
      await sleep(200); console.log(`pressed ${arg}`);
    }
    else if (verb === 'hover') { const [x, y] = await centre(arg); await b.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }); await sleep(300); console.log(`hovering ${arg}`); }
    else if (verb === 'scroll') { await centre(arg); console.log(`scrolled to ${arg}`); }
    else if (verb === 'wait') await sleep(Math.min(Number(arg) || 0, 30000));
    else if (verb === 'shot') { await b.shot(resolve(arg)); console.log(`saved ${resolve(arg)}`); }
    else if (verb === 'full') {
      const h = await b.eval('Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)');
      const r = await b.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: Math.min(h, 15000), scale: 1 } });
      mkdirSync(dirname(resolve(arg)), { recursive: true }); writeFileSync(resolve(arg), Buffer.from(r.result.data, 'base64')); console.log(`saved ${resolve(arg)}`);
    }
    else if (verb === 'zoom') {
      const [sel, path] = arg.split('::'); if (!path) throw new Error('zoom needs SELECTOR::PATH.png'); await centre(sel);
      const c = await b.eval(`(() => { const r = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, width: Math.min(r.width, 1600), height: Math.min(r.height, 1200) }; })()`);
      const r = await b.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { ...c, scale: 3 } });
      mkdirSync(dirname(resolve(path)), { recursive: true }); writeFileSync(resolve(path), Buffer.from(r.result.data, 'base64')); console.log(`saved ${resolve(path)} (3x)`);
    }
    else if (verb === 'text') console.log(`${arg}: ${await b.eval(`(() => { const e = document.querySelector(${JSON.stringify(arg)}); return e ? e.innerText.replace(/\\s+/g, ' ').trim() : '(no such element)'; })()`)}`);
    else if (verb === 'eval') console.log(JSON.stringify(await b.eval(arg)));
    else if (verb === 'focus') console.log(`focus: ${await b.eval(`(() => { const e = document.activeElement; if (!e || e === document.body) return 'nothing'; const s = getComputedStyle(e); return e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + ' "' + (e.getAttribute('aria-label') || e.textContent || e.getAttribute('name') || '').replace(/\\s+/g, ' ').trim().slice(0, 30) + '" outline: ' + s.outlineStyle + ' ' + s.outlineWidth; })()`)}`);
    else throw new Error(`unknown step ${step}`);
  }
} catch (e) { failed = true; console.error(`✗ ${e.message}`); } finally { await b.close(); }
process.exit(failed ? 1 : 0);
