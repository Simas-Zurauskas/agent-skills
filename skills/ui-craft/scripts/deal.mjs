// node deal.mjs [--kind expressive|working] [--hands 3] [--seed WORD]
// Deals starting constraints for visual directions, so their spread comes from outside the model.
// A model asked for "three different directions" proposes the same three every time; a dealt hand does not.
// Each direction honours one hand. See references/direction.md step 5.
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const kind = opt('--kind', 'expressive'), hands = Math.max(1, Math.min(6, Number(opt('--hands', 3)) || 3));
const seed = opt('--seed', Math.random().toString(36).slice(2, 8));
if (!['expressive', 'working'].includes(kind)) { console.error('usage: node deal.mjs [--kind expressive|working] [--hands 3] [--seed WORD]'); process.exit(2); }

// small seeded generator (mulberry32 over a string hash) so a deal can be repeated with --seed
let h = 1779033703 ^ seed.length; for (const c of seed) { h = Math.imul(h ^ c.charCodeAt(0), 3432918353); h = (h << 13) | (h >>> 19); }
const rnd = () => { h = (h + 0x6d2b79f5) | 0; let t = Math.imul(h ^ (h >>> 15), 1 | h); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const AXES = {
  lens: [
    'Places: where the activity happens and where it is talked about afterwards',
    'Materials: what it is made of, written on, printed on, wrapped in',
    'Rituals: the repeated moments around it',
    'Records and instruments: how that world counts, measures, labels and keeps track',
    'Media: how it is shown to others (signage, print, packaging, broadcast)',
    'Systems: a current civic or commercial system that organises similar information well',
    'Before the web: what this looked like on paper, on a wall or over a counter',
  ],
  composition: kind === 'working' ? [
    'table first: comparable rows, the columns do the work',
    'master and detail: a list beside the thing selected',
    'single column feed: one item after another, newest or most urgent first',
    'lanes: items grouped side by side by state',
    'timeline or calendar: position means time',
    'ledger: dense ruled lines, figures aligned, totals at the foot',
    'one object at a time: a large focused record with quiet navigation',
  ] : [
    'tool first: the working part fills the first screen, the words sit beside or under it',
    'statement first: one large line of type, everything else small',
    'index: the page is a list or table to scan, like a menu or a timetable',
    'bands: full-width horizontal bands, each with one job and its own height',
    'single narrow column, read top to bottom like a letter or a ticket',
    'fixed side and scrolling side: one panel stays while the other moves',
    'poster: one image-like composition owns the first screen',
    'unequal tiles: blocks sized by importance, none the same',
  ],
  containment: ['open: space alone separates things', 'ruled: lines separate things', 'boxed: surfaces separate things', 'banded: fields of colour separate things'],
  colour: kind === 'working'
    ? ['restrained: neutrals and one accent used sparingly', 'chrome carries the colour: navigation or header owns it, the work area stays neutral', 'tinted neutrals: every surface leans toward one hue', 'state only: colour appears only where it reports a state']
    : ['restrained: neutrals and one accent used sparingly', 'committed: one colour owns a third or more of the surface', 'full palette: several colours, each with a role', 'drenched: the page is the colour'],
  density: ['airy', 'medium', 'dense'],
};
const decks = Object.fromEntries(Object.entries(AXES).map(([k, v]) => [k, shuffle(v)]));
console.log(`ui-craft deal · ${kind} · seed ${seed}\n`);
for (let i = 0; i < hands; i++) {
  console.log(`Hand ${i + 1}`);
  for (const [k, deck] of Object.entries(decks)) console.log(`  ${k.padEnd(12)} ${deck[i % deck.length]}`);
  console.log('');
}
console.log(`Each direction honours one hand: find its source through the hand's lens, then let the other lines shape it.
Light or dark, the typefaces and the signature are not dealt; they come from the scene and the source.
A hand that cannot serve the job may be swapped for the next one (--hands ${hands + 1} --seed ${seed}); say why in one line.
Working alone, build the direction from Hand 1 unless it is struck, then Hand 2, and so on. The deal decides, not your preference.`);
