// node check-strings.mjs STRINGS.json URL [URL…]
// Required strings must be rendered; hidden-only DOM presence is reported separately and fails.
import { readFileSync } from 'node:fs';
import { launch, isMain } from './cdp.mjs';
const norm = s => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
export function requiredStrings(req, url) {
  const n = new URL(url).pathname.match(/screen-(?:r\d+-v\d+-)?(\d+)\.html$/)?.[1];
  const want = n && req[n];
  if (!Array.isArray(want) || !want.length || want.some(s => typeof s !== 'string' || !norm(s))) throw new Error(`No valid required string spec for screen ${n ?? '(unknown)'}: ${url}`);
  return want;
}
export async function checkStrings(b, req, url) {
  const want = requiredStrings(req, url);
  const { rendered, all } = await b.eval(`(() => {
    const controls = [...document.querySelectorAll('input, textarea, select')]
      .filter(e => e.tagName !== 'INPUT' || !['hidden', 'password', 'checkbox', 'radio', 'file', 'range', 'color'].includes(e.type));
    const displayed = e => e.tagName === 'SELECT'
      ? [...e.selectedOptions].map(o => o.textContent).join(' ')
      : e.value || ((e.tagName === 'TEXTAREA' || ['text', 'search', 'url', 'tel', 'email', 'number'].includes(e.type)) ? e.placeholder : '') || '';
    const visible = e => e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && e.getClientRects().length;
    return {
      rendered: document.body.innerText + ' ' + controls.filter(visible).map(displayed).join(' '),
      all: document.body.textContent + ' ' + controls.map(displayed).join(' '),
    };
  })()`);
  const visible = norm(rendered), present = norm(all);
  return {
    missing: want.filter(s => !present.includes(norm(s)) && !visible.includes(norm(s))),
    hiddenOnly: want.filter(s => !visible.includes(norm(s)) && present.includes(norm(s))),
    evidence: 'Rendered text includes offscreen content; screenshot inspection is still required for visual evidence.',
  };
}
if (isMain(import.meta.url)) {
  const [file, ...urls] = process.argv.slice(2);
  if (!file || !urls.length) { console.error('usage: node check-strings.mjs STRINGS.json URL [URL…]'); process.exitCode = 2; }
  else {
    const req = JSON.parse(readFileSync(file, 'utf8'));
    const b = await launch({ width: 600, height: 1000 });
    try {
      await b.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
      for (const url of urls) {
        try {
          requiredStrings(req, url);
          const error = await b.goto(url, 3500);
          if (error) throw new Error(error);
          const result = await checkStrings(b, req, url);
          if (result.missing.length || result.hiddenOnly.length) process.exitCode = 1;
          console.log(JSON.stringify({ url, ...result }));
        } catch (error) { process.exitCode = 1; console.error(`✗ ${url}: ${error.message}`); }
      }
    } finally { await b.close(); }
  }
}
