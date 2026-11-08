// node page-shot.mjs URL OUT.png [WIDTH=1600] [HEIGHT=1800] [--scroll-to SELECTOR] [--settle MS]
// node page-shot.mjs --batch jobs.json; jobs: [{url,out,width?,height?,selector?,settle?}]
// Consecutive captures of one URL reuse its loaded page. Missing selectors and bad navigation fail.
import { readFileSync } from 'node:fs';
import { launch, sleep } from './cdp.mjs';
const args = process.argv.slice(2);
const option = (key, fallback) => {
  if (!args.includes(key)) return fallback;
  const value = args[args.indexOf(key) + 1];
  if (!value || value.startsWith('--')) throw new Error(`Missing value for ${key}`);
  return value;
};
const batch = option('--batch');
const jobs = batch ? JSON.parse(readFileSync(batch, 'utf8')) : [{ url: args[0], out: args[1], width: Number(args[2]) || 1600, height: Number(args[3]) || 1800, selector: option('--scroll-to'), settle: Number(option('--settle', args.includes('--scroll-to') ? 4000 : 0)) }];
if (!Array.isArray(jobs) || !jobs.length) throw new Error('Batch must be a nonempty array');
for (const j of jobs) {
  if (!j || typeof j.url !== 'string' || !j.url || typeof j.out !== 'string' || !j.out) throw new Error('usage: node page-shot.mjs URL OUT.png [W] [H] [--scroll-to SELECTOR] [--settle MS] or --batch jobs.json');
  j.width ??= 1600; j.height ??= 1800; j.settle ??= j.selector ? 4000 : 0;
  if (![j.width, j.height].every(n => Number.isInteger(n) && n > 0) || !Number.isFinite(j.settle) || j.settle < 0 || j.settle > 60000 || (j.selector !== undefined && (typeof j.selector !== 'string' || !j.selector))) throw new Error('Invalid capture dimensions, selector, or settle time');
}
const b = await launch({ width: jobs[0].width, height: jobs[0].height });
let currentURL;
try {
  for (const { url, out, width, height, selector, settle } of jobs) {
    try {
      await b.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
      if (currentURL !== url) {
        const error = await b.goto(url, 6000);
        if (error) { currentURL = null; throw new Error(error); }
        currentURL = url;
      } else if (await b.eval('location.href') !== new URL(url).href) throw new Error('Page navigated away between captures');
      if (selector) {
        await b.requireSelector(selector);
        await b.eval(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({ block: 'start' })`);
      } else await b.eval('window.scrollTo(0, 0)');
      await sleep(settle);
      if (await b.eval('location.href') !== new URL(url).href) throw new Error('Page navigated away before capture');
      await b.shot(out);
      console.log('saved', out);
    } catch (error) { process.exitCode = 1; console.error(`✗ ${url}: ${error.message}`); }
  }
} finally { await b.close(); }
