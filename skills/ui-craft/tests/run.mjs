// node tests/run.mjs — the slop fixture must trip every listed check; the clean fixture must trip none.
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url)), check = join(here, '..', 'scripts', 'check.mjs');
const run = (file) => { let out; try { out = execFileSync('node', [check, join(here, file), '--json'], { encoding: 'utf8' }); } catch (e) { out = e.stdout; } return JSON.parse(out).pages[0]; };
const ids = (page, list) => page[list].map((f) => f.id);
const FAIL = ['contrast', 'small-text', 'target-size', 'overflow-x', 'input-label', 'no-name', 'img-alt', 'img-broken', 'lang', 'zoom-disabled', 'placeholder-text', 'never-visible', 'focus-visible'];
const TELLS = ['gradient-text', 'purple-gradient', 'glass', 'glow', 'ghost-card', 'side-stripe', 'nested-cards', 'identical-blocks', 'eyebrow', 'badge-above-heading', 'accent-word', 'tight-tracking', 'mono-labels', 'middle-dots', 'arrow-links', 'numbered-markers', 'emoji-icons', 'em-dashes', 'stat-strip', 'all-centred', 'loops', 'stock-copy', 'placeholder-facts', 'cream-serif-terracotta', 'reflex-fonts'];
let bad = 0; const miss = (what) => { bad++; console.error('✗ ' + what); };
const slop = run('slop.html'), clean = run('clean.html');
for (const id of FAIL) if (!ids(slop, 'fail').includes(id)) miss(`slop.html should fail ${id}`);
for (const id of TELLS) if (!ids(slop, 'tells').includes(id)) miss(`slop.html should flag ${id}`);
for (const list of ['fail', 'warn', 'tells']) for (const id of ids(clean, list)) miss(`clean.html should be clear but has ${list}: ${id}`);
console.log(bad ? `${bad} problems` : `ok: ${FAIL.length} floor checks and ${TELLS.length} tells fire on slop.html; clean.html is clear`);
process.exit(bad ? 1 : 0);
