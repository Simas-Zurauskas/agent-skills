// node screen-shot.mjs URL OUT_PREFIX [--dpr 2] [--reduced-motion]
// A screen (lab over http://, or standalone over file://) exactly as a phone shows it: 390x844 viewport, device pixel
// ratio 2, a lab's own bar hidden. Exit 1 (and no PNGs) if the page doesn't load.
// Writes OUT_PREFIX-top.png (as it opens) and OUT_PREFIX-scrolled.png (its main scroller at the bottom), and
// prints console errors + a few layout facts (horizontal overflow, missing images, icons that did not inline).
import { launch } from './cdp.mjs';
const [url, prefix] = process.argv.slice(2);
const dpr = Number((process.argv.find((a, i, all) => all[i - 1] === '--dpr')) || 2);
if (!url || !prefix) { console.log('usage: node screen-shot.mjs URL OUT_PREFIX [--dpr 2] [--reduced-motion]'); process.exit(2); }
const b = await launch({ width: 600, height: 1000 });
const errors = [];
try {
  await b.send('Log.enable');
  await b.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: dpr, mobile: true });
  // --reduced-motion: the still frame a reduced-motion user sees (critiques shoot the peak screen this way too)
  if (process.argv.includes('--reduced-motion')) await b.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const loadError = await b.goto(url.includes('?') ? url : url + '?bare', 5000);
  if (loadError) { console.log(`✗ ${url} did not load: ${loadError} (no screenshots written)`); process.exitCode = 1; }
  else {
    await b.eval(`(() => { const s = document.createElement('style'); s.textContent = '[data-lab-bar]{display:none!important}'; document.head.append(s); })()`);
    await new Promise((r) => setTimeout(r, 600));
    const facts = await b.eval(`JSON.stringify({
      title: document.title,
      overflowX: document.documentElement.scrollWidth > 390 ? document.documentElement.scrollWidth : false,
      brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')),
      uninlinedIcons: document.querySelectorAll('i[data-lucide]').length,
      fonts: [...new Set([...document.querySelectorAll('body *')].slice(0, 400).map(e => getComputedStyle(e).fontFamily.split(',')[0].trim()))].slice(0, 8),
      fontsLoaded: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight).slice(0, 12),
    })`);
    await b.shot(prefix + '-top.png');
    const scrolled = await b.eval(`(() => { const all = [...document.querySelectorAll('*')].filter(e => { const s = getComputedStyle(e); return /(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 4; }); all.sort((a, b) => b.clientHeight - a.clientHeight); const m = all[0]; if (!m) return 'nothing scrolls'; m.scrollTop = m.scrollHeight; return 'scrolled ' + (m.tagName.toLowerCase()) + ' by ' + m.scrollTop; })()`);
    await new Promise((r) => setTimeout(r, 400));
    await b.shot(prefix + '-scrolled.png');
    console.log(JSON.stringify({ ...JSON.parse(facts), scrolled }, null, 1));
    console.log('saved', prefix + '-top.png', prefix + '-scrolled.png');
  }
} finally { await b.close(); }
