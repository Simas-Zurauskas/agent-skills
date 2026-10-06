// node check-strings.mjs STRINGS.json URL_OR_PATTERN…  — "identical content in every variant", checked: every string the
// brief's content spec requires on a screen must appear in that screen's rendered text (whitespace-normalised,
// case-sensitive). STRINGS.json maps a screen number to its required strings, e.g.
//   { "1": ["Evening, Sam.", "Needs you", "Bins & dishes"], "2": ["The push-up war", "1,690"], "3": ["10,000"] }
// (the selector writes it as round-N/strings.json from the brief's content spec). The screen number is read from the
// URL: screen-<n>.html (standalone) or screen-rR-vNN-<n>.html (Design Lab). Exit 1 if any screen misses a string.
import { readFileSync } from 'node:fs';
import { launch } from './cdp.mjs';
const [file, ...urls] = process.argv.slice(2);
if (!file || !urls.length || file === '-h' || file === '--help') {
  console.log('usage: node check-strings.mjs STRINGS.json URL [URL…]   (screen number from screen-<n>.html / screen-rR-vNN-<n>.html)');
  process.exit(2);
}
const req = JSON.parse(readFileSync(file, 'utf8'));
// typographic quotes count as their straight forms, so a screen may set ’ “ ” where the spec has ' "
const norm = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
let bad = 0;
const b = await launch({ width: 600, height: 1000 });
try {
  await b.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  for (const url of urls) {
    const n = (url.match(/screen-(?:r\d+-v\d+-)?(\d+)\.html/) || [])[1];
    const want = (n && req[n]) || [];
    if (!want.length) { console.log(`? ${url}\n   - no strings listed for screen ${n ?? '(unknown)'}`); continue; }
    const err = await b.goto(url, 3500);
    if (err) { bad++; console.log(`✗ ${url}\n   - did not load: ${err}`); continue; }
    // the whole document's text, including scrolled-away content and text inside collapsed/hidden-by-state blocks
    const text = norm(await b.eval('document.body.innerText + " " + document.body.textContent'));
    const title = await b.eval('document.title');
    const missing = want.filter((s) => !text.includes(norm(s)));
    if (missing.length) bad++;
    console.log(`${missing.length ? '✗' : '✓'} ${title || url}${missing.length ? '\n   - missing: ' + missing.map((s) => JSON.stringify(s)).join(', ') : ''}`);
  }
} finally { await b.close(); }
process.exit(bad ? 1 : 0);
