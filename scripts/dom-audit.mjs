// node dom-audit.mjs URL [URL…]  — the DOM audit from references/craft-floors.md §13, run at 390 × 844 (DPR 2, mobile)
// at scroll 0 and again with the main scroller at the end: targets under 44 × 44, overlapping hit areas, text under
// 13 px, text contrast under 4.5 (3 for large), text over images (listed for an eye check). Exit 1 on overlaps or
// low contrast. Works on http:// (a dev server) and file:// (standalone).
// Known false positive: text drawn with mix-blend-mode or background-clip:text reads as contrast 1.00 — eye-check it.
import { launch } from './cdp.mjs';
const urls = process.argv.slice(2);
if (!urls.length) { console.log('usage: node dom-audit.mjs URL [URL…]'); process.exit(2); }

// runs inside the page (serialized with toString) — keep it self-contained
const audit = () => {
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const rgba = (c) => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); return [...cv.getImageData(0, 0, 1, 1).data]; };
  const over = ([r, g, b, a], [R, G, B]) => { a /= 255; return [r * a + R * (1 - a), g * a + G * (1 - a), b * a + B * (1 - a)]; };
  const bgOf = (el) => { const layers = []; let img = false;
    for (let e = el; e; e = e.parentElement) { const s = getComputedStyle(e); img ||= s.backgroundImage !== 'none';
      const c = rgba(s.backgroundColor); if (c[3]) { layers.push(c); if (c[3] === 255) break; } }
    return [layers.reverse().reduce((acc, c) => over(c, acc), [255, 255, 255]), img]; };
  const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const layer = (e) => { for (; e; e = e.parentElement) { const s = getComputedStyle(e);
    if (/fixed|sticky/.test(s.position) || /auto|scroll/.test(s.overflowY)) return e; } return null; };
  const name = (e) => (e.getAttribute('aria-label') || e.textContent).trim().replace(/\s+/g, ' ').slice(0, 28);
  const mine = (e) => !e.closest('[data-lab-bar]');   // skip the lab's own chrome
  const out = { smallTargets: [], overlaps: [], smallText: [], lowContrast: [], checkOnImage: [] };
  const hits = [...document.querySelectorAll('a[href], button, [role=button], [role=radio], input, select')].filter(mine)
    .map((e) => [e, e.getBoundingClientRect()]).filter(([, r]) => r.width && r.height);
  for (const [e, r] of hits) if (r.width < 44 || r.height < 44) out.smallTargets.push(`${name(e)} ${r.width.toFixed(0)}×${r.height.toFixed(0)}`);
  hits.forEach(([a, p], i) => hits.slice(i + 1).forEach(([b, q]) => {
    if (a.contains(b) || b.contains(a) || layer(a) !== layer(b)) return;   // a pinned bar over scrolling rows is expected
    const w = Math.min(p.right, q.right) - Math.max(p.left, q.left), h = Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top);
    if (w > 1 && h > 1) out.overlaps.push(`${name(a)} ∩ ${name(b)} ${w.toFixed(0)}×${h.toFixed(0)}`); }));
  for (const el of [...document.querySelectorAll('body *')].filter(mine)) {
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('')
      .replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, '').trim();   // color emoji carry no text color
    const s = getComputedStyle(el); if (!text || s.visibility === 'hidden' || !el.getClientRects().length) continue;
    const px = parseFloat(s.fontSize), large = px >= 24 || (px >= 18.66 && +s.fontWeight >= 700);
    if (px < 13) out.smallText.push(`${text.slice(0, 28)} ${px}px`);
    const [bg, img] = bgOf(el), cr = ratio(over(rgba(s.color), bg), bg);
    if (img) out.checkOnImage.push(text.slice(0, 28));
    else if (cr < (large ? 3 : 4.5)) out.lowContrast.push(`${text.slice(0, 28)} ${cr.toFixed(2)} (${px}px/${s.fontWeight})`);
  }
  return JSON.stringify(out);
};
const toEnd = () => {
  const all = [...document.querySelectorAll('*')].filter((e) => /(auto|scroll)/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 4);
  all.sort((a, b) => b.clientHeight - a.clientHeight);
  if (all[0]) all[0].scrollTop = all[0].scrollHeight;
  return !!all[0];
};

let bad = 0;
const b = await launch({ width: 600, height: 1000 });
try {
  await b.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  for (const url of urls) {
    const loadError = await b.goto(url.includes('?') || url.startsWith('file:') ? url : url + '?bare', 4000);
    if (loadError) { bad += 1; console.log(`✗ ${url}\n   did not load: ${loadError}`); continue; }
    const top =JSON.parse(await b.eval(`(${audit.toString()})()`));
    const scrolled = (await b.eval(`(${toEnd.toString()})()`)) ? JSON.parse(await b.eval(`(${audit.toString()})()`)) : null;
    const merge = (k) => [...new Set([...(top[k] || []), ...((scrolled && scrolled[k]) || [])])];
    const r = Object.fromEntries(['overlaps', 'lowContrast', 'smallTargets', 'smallText', 'checkOnImage'].map((k) => [k, merge(k)]));
    const fail = r.overlaps.length || r.lowContrast.length;
    bad += fail ? 1 : 0;
    console.log(`${fail ? '✗' : '✓'} ${url}`);
    for (const [k, v] of Object.entries(r)) if (v.length) console.log(`   ${k} (${v.length}): ${v.slice(0, 12).join(' | ')}${v.length > 12 ? ' …' : ''}`);
  }
} finally { await b.close(); }
process.exit(bad ? 1 : 0);
