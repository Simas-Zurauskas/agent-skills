// node verify-screens.mjs URL [URL…]  — load each screen as a phone (390×844) in headless Chrome and report what a
// screenshot can hide: icons that never rendered (Lucide <i data-lucide> left in the page = a wrong name), images
// that failed, horizontal overflow, fonts that didn't load, console errors. Works for http:// (a dev server) and
// file:// (the standalone target). Exit 1 if any screen has a problem.
import { launch } from './cdp.mjs';
const urls = process.argv.slice(2);
if (!urls.length) { console.log('usage: node verify-screens.mjs URL [URL…]'); process.exit(2); }
let bad = 0;
const b = await launch({ width: 600, height: 1000 });
try {
  await b.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await b.send('Log.enable');
  let logs = [];
  b.on((m) => {
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') logs.push(m.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
    if (m.method === 'Runtime.exceptionThrown') logs.push(m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text || 'exception');
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') logs.push(`${m.params.entry.text}${m.params.entry.url ? ' ' + m.params.entry.url : ''}`);
  });
  for (const url of urls) {
    logs = [];
    const loadError = await b.goto(url, 4000);
    if (loadError) { bad += 1; console.log(`✗ ${url}\n   - did not load: ${loadError}`); continue; }
    const f = await b.eval(`JSON.stringify({
      title: document.title,
      icons: [...document.querySelectorAll('i[data-lucide]')].map(i => i.getAttribute('data-lucide')),
      images: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')),
      overflowX: document.documentElement.scrollWidth > 391 ? document.documentElement.scrollWidth : 0,
      fonts: [...new Set([...document.fonts].filter(x => x.status === 'error').map(x => x.family))],
      // every family a Google Fonts <link> asks for must really be available (a misspelled family silently falls back)
      // a family the page links but no element on THIS screen uses is fine (one head part serves all of a variant's
      // screens); only a family some element asks for and that never loaded is a problem
      missingFamilies: [...document.querySelectorAll('link[href*="fonts.googleapis.com"]')].flatMap(l => new URL(l.href).searchParams.getAll('family').map(f => f.split(':')[0].split('+').join(' ')))
        .filter(f => [...document.querySelectorAll('body *')].some(e => getComputedStyle(e).fontFamily.split(',')[0].split('"').join('').trim() === f && (e.textContent || '').trim()))
        .filter(f => ![...document.fonts].some(x => x.family.split('"').join('') === f && x.status === 'loaded')),
    })`);
    const r = JSON.parse(f);
    const problems = [
      r.icons.length && `icons not rendered: ${[...new Set(r.icons)].join(', ')}`,
      r.images.length && `broken images: ${r.images.join(', ')}`,
      r.overflowX && `horizontal overflow: ${r.overflowX}px wide`,
      r.fonts.length && `fonts failed: ${r.fonts.join(', ')}`,
      r.missingFamilies.length && `Google Fonts family not loaded (misspelled or wrong weights?): ${r.missingFamilies.join(', ')}`,
      logs.length && `console errors: ${[...new Set(logs)].slice(0, 5).join(' | ')}`,
    ].filter(Boolean);
    bad += problems.length ? 1 : 0;
    console.log(`${problems.length ? '✗' : '✓'} ${r.title || url}${problems.length ? '\n   - ' + problems.join('\n   - ') : ''}`);
  }
} finally { await b.close(); }
process.exit(bad ? 1 : 0);
