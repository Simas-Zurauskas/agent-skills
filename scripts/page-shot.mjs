// node page-shot.mjs URL OUT.png [WIDTH=1600] [HEIGHT=1800] [--scroll-to SELECTOR] [--settle MS]
// A round or preview page (a lab sheet over http://, or a standalone page over file://) in a desktop window. At 1600
// wide a page shows its blocks at true size (no zoom step). --scroll-to scrolls so that element is at the top first,
// then waits --settle milliseconds (default 4000; a heavy round page wants 8000–12000).
// Exit 1 (and no PNG) if the page doesn't load; OUT's folder is created if missing.
import { launch } from './cdp.mjs';
const args = process.argv.slice(2);
const [url, out] = args;
const W = Number(args[2]) || 1600, H = Number(args[3]) || 1800;
const settle = args.includes('--settle') ? Number(args[args.indexOf('--settle') + 1]) : 4000; // ms after scrolling: lazy phones load their fonts/icons from CDNs
const sel = args.includes('--scroll-to') ? args[args.indexOf('--scroll-to') + 1] : null;
if (!url || !out) { console.log('usage: node page-shot.mjs URL OUT.png [W] [H] [--scroll-to SELECTOR]'); process.exit(2); }
const b = await launch({ width: W, height: H });
try {
  await b.send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  const loadError = await b.goto(url, 6000);
  if (loadError) { console.log(`✗ ${url} did not load: ${loadError} (no screenshot written)`); process.exitCode = 1; }
  else {
    if (sel) { await b.eval(`document.querySelector(${JSON.stringify(sel)})?.scrollIntoView({ block: 'start' })`); await new Promise((r) => setTimeout(r, settle)); }
    await b.shot(out);
    console.log('saved', out);
  }
} finally { await b.close(); }
