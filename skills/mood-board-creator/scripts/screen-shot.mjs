// node screen-shot.mjs URL OUT_PREFIX [--dpr 2] [--reduced-motion] [--verify] [--audit] [--strings FILE] [--width W] [--height H] [--desktop]
// node screen-shot.mjs --batch jobs.json [same flags]; jobs: [{url, prefix}]
// One owned browser; each screen is visited once for capture and optional final checks.
import { readFileSync } from 'node:fs';
import { launch, sleep } from './cdp.mjs';
import { collectErrors, verifyPage } from './verify-screens.mjs';
import { auditPage, toEnd } from './dom-audit.mjs';
import { requiredStrings, checkStrings } from './check-strings.mjs';
const args = process.argv.slice(2);
const option = (key, fallback) => {
  if (!args.includes(key)) return fallback;
  const value = args[args.indexOf(key) + 1];
  if (!value || value.startsWith('--')) throw new Error(`Missing value for ${key}`);
  return value;
};
const dpr = Number(option('--dpr', 2));
const width = Number(option('--width', 390)), height = Number(option('--height', 844));
const mobile = !args.includes('--desktop');
const batch = option('--batch');
const jobs = batch ? JSON.parse(readFileSync(batch, 'utf8')) : [{ url: args[0], prefix: args[1] }];
const stringsFile = option('--strings');
const strings = stringsFile ? JSON.parse(readFileSync(stringsFile, 'utf8')) : null;
if (!Array.isArray(jobs) || !jobs.length || jobs.some(j => !j || typeof j.url !== 'string' || !j.url || typeof j.prefix !== 'string' || !j.prefix) || !Number.isFinite(dpr) || dpr <= 0) throw new Error('usage: node screen-shot.mjs URL OUT_PREFIX or --batch jobs.json [--dpr 2] [--reduced-motion] [--verify] [--audit] [--strings FILE] [--width W] [--height H] [--desktop]');
for (const j of jobs) {
  j.width ??= width; j.height ??= height;
  if (![j.width, j.height].every(n => Number.isInteger(n) && n > 0)) throw new Error('Invalid screen width/height');
}
const b = await launch({ width: jobs[0].width, height: jobs[0].height });
try {
  await b.send('Log.enable');
  if (args.includes('--reduced-motion')) await b.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const { url, prefix, width, height } of jobs) {
    const { logs, stop } = collectErrors(b);
    try {
      await b.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: dpr, mobile });
      if (strings) requiredStrings(strings, url);
      const target = new URL(url);
      if (!target.search) target.search = 'bare';
      const loadError = await b.goto(target.href, 5000);
      if (loadError) throw new Error(loadError);
      await b.eval(`(() => { const s = document.createElement('style'); s.textContent = '[data-lab-bar]{display:none!important}'; document.head.append(s); })()`);
      await sleep(600);
      const facts = await b.eval(`({
        title: document.title,
        overflowX: document.documentElement.scrollWidth > window.innerWidth ? document.documentElement.scrollWidth : false,
        brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')),
        uninlinedIcons: document.querySelectorAll('i[data-lucide]').length,
        fonts: [...new Set([...document.querySelectorAll('body *')].slice(0, 400).map(e => getComputedStyle(e).fontFamily.split(',')[0].trim()))].slice(0, 8),
        fontsLoaded: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight).slice(0, 12),
      })`);
      const problems = [];
      const content = strings ? await checkStrings(b, strings, url) : null;
      if (content?.missing.length || content?.hiddenOnly.length) problems.push('required content missing or hidden (see strings result)');
      if (await b.eval('location.href') !== target.href) throw new Error('Page navigated away before capture');
      await b.shot(prefix + '-top.png');
      const audit = args.includes('--audit') ? await auditPage(b) : null;
      const scrolled = await b.eval(`(${toEnd.toString()})()`);
      await sleep(400);
      if (await b.eval('location.href') !== target.href) throw new Error('Page navigated away before scrolled capture');
      await b.shot(prefix + '-scrolled.png');
      if (args.includes('--verify')) problems.push(...await verifyPage(b, logs));
      if (audit?.overlaps.length || audit?.lowContrast.length) problems.push('DOM audit failed (see audit result)');
      if (problems.length) process.exitCode = 1;
      console.log(JSON.stringify({ url, ...facts, scrolled, consoleErrors: logs, problems, strings: content, audit, saved: [prefix + '-top.png', prefix + '-scrolled.png'] }, null, 1));
    } catch (error) { process.exitCode = 1; console.error(`✗ ${url}: ${error.message}`); }
    finally { stop(); }
  }
} finally { await b.close(); }
