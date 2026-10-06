export const meta = {
  name: 'mood-board-build',
  description: 'Build every variant of a round: build → one side-by-side round critique → refine (thorough: + a fresh-eyes critique per variant before the refine); groups that wait on a brief supplement start later',
  whenToUse: 'Phase 3 of a mood-board-creator round, after the brief (and any supplements) exist. Run with args (see workflows/README.md).',
  phases: [
    { title: 'Pre-build', detail: 'optional per-group agents (e.g. a brief supplement after a source changed)' },
    { title: 'Build', detail: 'one designer-builder per variant: plan, files, two screenshot passes' },
    { title: 'Round critique', detail: 'one critic judges all variants side by side (compare strips + every board): look-alikes, grey, weak signatures, worst faults' },
    { title: 'Critique', detail: 'thorough only: fresh eyes per variant, own screenshots, must-fix list' },
    { title: 'Refine', detail: 'apply the critique, final self-check' },
  ],
}

// ---- args (see workflows/README.md) -------------------------------------------------------------------------------
const A = args || {}
const need = ['product', 'task', 'skill', 'shots', 'variants', 'screens', 'flow', 'target']
const missing = need.filter((k) => !A[k])
if (missing.length) throw new Error(`mood-board-build: missing args: ${missing.join(', ')}`)
const R = A.round || 1
const RR = String(R).padStart(2, '0')
const TASK = A.task
const REFS = `${A.skill}/references`
const TOOLS = `${A.skill}/scripts`
const SHOTS = A.shots
const supplements = A.supplements || {}
const findings = A.findings || `${TASK}/round-${R}/review-findings.md`
const RC_FILE = `${TASK}/round-${R}/round-critique.md`
const TG = A.target // { kind: 'standalone', out, roundJson } | { kind: 'lab', lab, roundJson?, devUrl? }
if (TG.kind === 'standalone' && !(TG.out && TG.roundJson)) throw new Error('target standalone needs out and roundJson')
if (TG.kind === 'lab' && !TG.lab) throw new Error('target lab needs lab')
const DEV = TG.devUrl || 'http://localhost:1234'
// The round critique shoots a viewable round page: the assembler (keeping the builders' previews) and the page's URL.
const ASSEMBLE = A.assemble || (TG.roundJson && (TG.kind === 'lab'
  ? `python3 ${TOOLS}/design-lab/assemble-round.py ${TG.roundJson} --keep-previews`
  : `python3 ${TOOLS}/assemble-standalone.py ${TG.roundJson} --keep-previews`))
const ROUND_URL = A.roundUrl || (TG.kind === 'lab' ? `${DEV}/explorations/round-${RR}.html` : `file://${TG.out}/round-${RR}/index.html`)
const ROUND_CRIT = A.roundCritique !== false && !!ASSEMBLE
// Speed (default): the round critique is the only critique. Thorough, or no round page: a critic per variant too.
const PER_VARIANT = !!A.thorough || !ROUND_CRIT
// After an outage: the stages already on file, e.g. { build: ["01", …], roundCritique: true, critique: [], refine: [] }
const DONE = A.done || {}
const isDone = (stage, v) => (DONE[stage] || []).includes(v.id)
const EX = TG.kind === 'lab' ? `${TG.lab}/src/explorations` : null
const VDIR = (v) => (TG.kind === 'lab' ? EX : `${TG.out}/round-${RR}/v${v.id}`)

// a board lines up with its row of phones: N × 402 (390 + 2 × 6 bezel) + (N − 1) × 40 gaps (1286 for three)
const ROW = A.screens.length * 402 + (A.screens.length - 1) * 40
// the realism bar (args.bar): { good: png, rejected?: png } — screenshots builders and critics compare against
const BAR = A.bar ? `\n- THE BAR: look at ${A.bar.good} (screens at the level of realism and density the owner wants: real app chrome, rows, chips, tab bars with icons, colour; take the LEVEL, never the style or content)${A.bar.rejected ? ` and ${A.bar.rejected} (an attempt the owner rejected: do not make this)` : ''}. Put your shots next to it at every pass: would yours pass as a real app at thumbnail size?` : ''

const vid = (v) => `r${R}-v${v.id}`
const title = (v, s) => `R${R} V${v.id} · ${s.name}`

// every path, URL and rule that differs between targets
const T = {
  head: (v) => (TG.kind === 'lab' ? `${EX}/parts/${vid(v)}-head.html` : `${VDIR(v)}/head.html`),
  css: (v) => (TG.kind === 'lab' ? `${EX}/${vid(v)}.css` : `${VDIR(v)}/style.css`),
  screen: (v, s) => (TG.kind === 'lab' ? `${EX}/screen-${vid(v)}-${s.n}.html` : `${VDIR(v)}/screen-${s.n}.html`),
  board: (v) => (TG.kind === 'lab' ? `${EX}/parts/${vid(v)}-board.html` : `${VDIR(v)}/board.html`),
  screenUrl: (v, n) => (TG.kind === 'lab' ? `${DEV}/explorations/screen-${vid(v)}-${n}.html` : `file://${VDIR(v)}/screen-${n}.html`),
  previewUrl: (v) => (TG.kind === 'lab' ? `${DEV}/explorations/round-preview-${vid(v)}.html` : `file://${TG.out}/round-${RR}/preview-v${v.id}.html`),
  headLine: (v) => (TG.kind === 'lab'
    ? `exactly two lines: the Google Fonts <link rel="stylesheet" href="https://fonts.googleapis.com/css2?..."> for your faces + <link rel="stylesheet" href="${vid(v)}.css">`
    : `just the Google Fonts <link rel="stylesheet" href="https://fonts.googleapis.com/css2?..."> line for your faces (the round page adds your style.css itself)`),
  board_root: (v) => (TG.kind === 'lab' ? `<div class="lab-board ${vid(v)} w-[${ROW}px] …">` : `<div class="mb-board ${vid(v)} board" style="width:${ROW}px">`),
  preview: (v) => (TG.kind === 'lab'
    ? `- ${EX}/round-preview-${vid(v)}.html — your private preview (deleted at assembly): copy ${A.skill}/targets/design-lab/templates/preview.html and fill it (R=${R}, NN=${v.id}, the variant name), one figure per screen: ${A.screens.map((s) => `"${title(v, s)}" (frame title "${s.name}")`).join(', ')}.`
    : `- Your preview is generated, not written: python3 ${TOOLS}/assemble-standalone.py ${TG.roundJson} --preview ${v.id}  (re-run it after changing the board or a title; it writes ${TG.out}/round-${RR}/preview-v${v.id}.html).`),
  screens_rules: TG.kind === 'lab'
    ? `Screens: copy ${A.skill}/targets/design-lab/templates/screen.html (390 × 844; own status bar in your colours; <body class="VID">; last line the lab chrome include; never a <script>). Tailwind v4 utilities are fine (arbitrary values too); bespoke styling in your scoped CSS. Images only from ${EX}/img/ (src="img/<file>"). Icons: Lucide only (<i data-lucide="name" class="h-5 w-5"></i>); check a name exists before using it: ls ${TG.lab}/node_modules/lucide/dist/esm/icons/<name>.mjs — a wrong name breaks the dev build for everyone. Follow ${TG.lab}/CLAUDE.md's rules on links, toggles and aria-labels.`
    : `Screens: copy ${A.skill}/targets/standalone/templates/screen.html (390 × 844; own status bar in your colours; <body class="VID" style="margin:0">; keep its three scripts — Lucide, lucide.createIcons(), ../../assets/phone.js — and add no other script; the Tailwind v4 browser build is optional). Style everything in style.css. Images only from ${TG.out}/img/ (src="../../img/<file>"). Icons: Lucide (<i data-lucide="name"></i>, sized in CSS); a wrong name simply doesn't render — verify-screens.mjs reports it. Icon-only links/controls get aria-label; on/off controls are <button aria-pressed="false">.`,
  links: (v) => (TG.kind === 'lab'
    ? `cd ${TG.lab} && yarn -s links 2>&1 | grep -B1 -A4 "R${R} V${v.id}"`
    : `python3 ${TOOLS}/check-standalone.py ${TG.roundJson} 2>&1 | sed -n '/^V${v.id}/,/^V[0-9]/p'  and  node ${TOOLS}/verify-screens.mjs ${A.screens.map((s) => `file://${VDIR(v)}/screen-${s.n}.html`).join(' ')}`),
  images: TG.kind === 'lab' ? `${EX}/img/` : `${TG.out}/img/`,
}

const STANCE = `DESIGN STANCE — you are the design lead at a studio known for giving every client a distinct identity; this client has rejected anything cliché or templated. Spend boldness in ONE place (the variant's signature) and keep everything around it quiet and disciplined. Type carries the personality: a real type scale, intentional weights/widths/spacing, display type as an active part of the design. Visual structure encodes information (no decorative numbering, eyebrows, dividers). Motion: at most one orchestrated moment, CSS only, respects prefers-reduced-motion. Before finishing, look in the mirror and remove one accessory. The AI-default cluster (${REFS}/generic-tells.md, calibration list) is off-limits unless your brief explicitly licenses a trait.
PRODUCTION BAR — the owner judges at App Store level, next to the reference apps in the bar sheet. Build depth (at least three surface levels, light and shadow with intent, a hero moment on the home screen instead of a stack of equal cards, imagery made in one consistent hand where the direction calls for it), character (one idea you can say in a sentence, grown from a truth of the product named in the guidelines' essence — never a UI trend or a costume applied on top), and professionalism (a real type pairing and scale, a disciplined palette, consistent radii and icon weights, real quotes ’ “ ”, tabular figures, buttons that look pressable, data that reads at a glance). Gimmicks fail this bar unless the brief licenses them: stickers, clay/inflated 3D, mascots, neo-brutal outlines and offset shadows, bubbly "fun" display faces, emoji, confetti, shouting stat numbers, decorative gradients or glass.`


const READS = (v) => `READ FIRST, in full:
- The guidelines ${TASK}/design-guidelines.md (principles, guardrails, anti-generic rules, craft floors, the board, the self-critique checklist, the technical contract).
- The round brief ${TASK}/round-${R}/brief.md: the round in one page, the diversity matrix (your axis positions and assigned caps are binding), the content spec (every string exact; the fixed strings; the never-list; the links), the photo library, and YOUR section${v.lines ? `, lines ${v.lines}` : ''} ("### V${v.id} · ${v.name}"). Skim the other variants' one-liners only, so you don't drift into them.${supplements[v.group] ? `\n- ${supplements[v.group]} — it SUPERSEDES your brief section wherever they differ.` : ''}
- Binding review findings: ${findings} (if it exists) — apply every finding naming V${v.id} or all variants, unless it contradicts the content spec (then the spec wins).
- ${REFS}/critique-patterns.md — what critics caught in earlier rounds; pre-empt it.${ROUND_CRIT ? `
- The round critique ${RC_FILE} (once it exists; the builder won't have it yet): how your variant reads NEXT TO THE OTHERS at thumbnail size, and its worst faults. Its items for V${v.id} are must-fixes and rank above any other critique's — a variant that looks like another one, or grey, has failed whatever its own screens look like.` : ''}
- For structure/content only (not their grey look), the wireframes: ${A.screens.map((s) => s.wireframe).filter(Boolean).join(', ') || `none — the content spec is the source, and the domain research note's "category's default screen" per role (in ${TASK}/research/) is the structural baseline to compare against`}.`

const CONTRACT = (v) => `FILES YOU OWN (create/edit ONLY these — other variants are being built in parallel):
- ${T.head(v)} — ${T.headLine(v)}
- ${T.css(v)} — every selector under .${vid(v)} (the round page loads every variant's CSS at once); custom properties on .${vid(v)}; @keyframes ${vid(v)}-*; no @import, no @font-face, no :root / html / bare body.
${A.screens.map((s) => `- ${T.screen(v, s)}  <title>${title(v, s)}</title>`).join('\n')}
- ${T.board(v)} — the style tile: ONE root ${T.board_root(v)} (${ROW} px = ${A.screens.length} × 402 px devices + ${A.screens.length - 1} × 40 px gaps: it sits right above your phones), height as needed (aim about 1,100–1,400 px, hard cap 1,800), in the variant's own system, no links or buttons. Reading order: a header (the name as display type; number, group and route as separate elements), then six blocks — thesis + the question it tests ("<Product> as ___, because ___"); the signature, large, on real content; palette swatches that read your own tokens, with roles and the contrast pairs that matter; type and numeral specimens on real strings (the longest name, the hero figures, a tabular check such as 1,111 over 8,888); rejected defaults; trade-offs and where they bite. Optional: 2–3 "feedback we want" questions. Full spec: ${REFS}/method.md §10.
${T.preview(v)}
${T.screens_rules.replace(/VID/g, vid(v))} Images only from the shared library ${T.images} (${A.images || "see the brief's photo library"}); per-variant looks are CSS grades, no new images.
Links: ${A.flow}. Everything else href="#" (not styled as a target) or a toggle (<button aria-pressed="false">). Link to a screen only once its file exists (href="#" until then).
BUILD TRAPS (each broke a whole round's build or render before): (1) copying a parent variant's files: rename only selector and keyframe prefixes, NEVER image paths — every img/… you reference must exist (ls it); (2) no CSS mask from an image file (mask-image: url(img/…)): Chrome drops it on file://, so inline the mask as a data URI (once, in a custom property on .${vid(v)}); (3) never generate images unless the brief tells you to — use the shared library.${TG.kind === 'lab' ? ' (4) never put url(…) inside a Tailwind class (bg-[url(img/…)]): it resolves from src/styles.css and breaks the lab build for everyone; (5) no SVG id containing "new" (the minifier rewrites it to "new" and the <use> breaks).' : ''}`

const TOOLING = (v, pass) => `SEE YOUR WORK (design from screenshots, not imagination). mkdir -p ${SHOTS}/v${v.id} first. ${TG.kind === 'lab' ? `The dev server is on ${DEV} (hot reload). NEVER run yarn build or yarn dev, and NEVER start, stop or restart any server yourself, on any port (an agent once replaced the shared server with its own narrower one and broke previews for every later builder); if it's down, wait 60 s, retry, then say so in your return and do what you can. A new file can take ~5 s to be served; a build error naming ANOTHER variant's file means wait 30 s and retry — never edit their files.` : 'The standalone target needs no server: screens open from file://.'}
- A screen as a phone shows it (390×844 @2x, top + scrolled; prints fonts loaded, broken images, overflow):
  node ${TOOLS}/screen-shot.mjs ${T.screenUrl(v, '<n>')} ${SHOTS}/v${v.id}/${pass}-s<n>
- Board + phones as the round page shows them: node ${TOOLS}/page-shot.mjs ${T.previewUrl(v)} ${SHOTS}/v${v.id}/${pass}-preview.png ${Math.max(1600, ROW + 380)} 2600
- Read every PNG you make.
- Tap targets and contrast, which screenshots can't show: node ${TOOLS}/dom-audit.mjs ${A.screens.map((s) => T.screenUrl(v, s.n)).join(' ')}  — no overlaps and no low contrast (R1: 7 of 10 Home feeds had overlapping 44 pt targets that only this caught).
- Mechanical checks for your variant: ${T.links(v)}${BAR}`

const RET = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    files: { type: 'array', items: { type: 'string' } },
    final_shots: { type: 'array', items: { type: 'string' } },
    known_issues: { type: 'array', items: { type: 'string' } },
  },
  required: ['summary', 'files', 'known_issues'],
}
const CRIT = {
  type: 'object',
  properties: {
    scores: { type: 'object', properties: { fidelity: { type: 'number' }, craft: { type: 'number' }, originality: { type: 'number' }, content: { type: 'number' }, board: { type: 'number' } }, required: ['fidelity', 'craft', 'originality', 'content', 'board'] },
    must_fix: { type: 'array', items: { type: 'object', properties: { screen: { type: 'string' }, where: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['screen', 'where', 'problem', 'fix'] } },
    push_further: { type: 'array', items: { type: 'string' } },
    remove_one: { type: 'string' },
  },
  required: ['scores', 'must_fix', 'push_further', 'remove_one'],
}

const build = (v) => agent(`You are the designer-builder of Round ${R} variant V${v.id} "${v.name}" (group ${v.group}) for ${A.product}. You design AND build it as live HTML screens (${TG.kind === "lab" ? "in the Design Lab" : "a standalone static moodboard"}). If your files already exist from an interrupted run, continue from them instead of starting over.
${READS(v)}
${STANCE}
PLAN (short): write ${TASK}/round-${R}/notes/v${v.id}.md — tokens (hex + roles), type scale, spacing, the signature and how each screen expresses it, one ASCII sketch per screen, and the defaults you're avoiding. 60–120 lines. Then build.
${CONTRACT(v)}
${TOOLING(v, '<pass>')}
REVIEW LOOP: after the first full build shoot every screen + the preview (pass "a"), critique yourself against the guidelines' checklist and your brief's traps, fix, shoot again (pass "b"), fix. Two passes minimum; stop when a third would only polish. Shoot the peak screen a second time with --reduced-motion (the still frame IS the design). Check doubtful contrast pairs, 44 pt targets (none overlapping), the status-bar and home-indicator zones, every content-spec string, and that scrolled content is as considered as the top.
Return the summary, files and known issues.`,
  { label: `build:v${v.id}`, phase: 'Build', schema: RET, effort: 'high' })

const critique = (built, v) => agent(`You are a demanding design critic with fresh eyes — you did not build this. Round ${R} variant V${v.id} "${v.name}" (group ${v.group}) for ${A.product}.
${READS(v)}
The builder says: ${built ? built.summary : '(no summary — inspect the files)'} Known issues: ${built ? JSON.stringify(built.known_issues) : '[]'}${ROUND_CRIT ? `
The round critique's items for V${v.id} already bind the refiner: don't repeat them — find what a side-by-side look can't see.` : ''}
${TOOLING(v, 'crit')}
Take your own screenshots of every screen (top + scrolled; the peak screen also with --reduced-motion) and the preview; run dom-audit.mjs (overlapping targets, contrast — see TOOLING); read the variant's files. Judge: (0) the production bar first — next to the bar sheet${A.bar ? ` (${A.bar.good})` : ''}, does it have depth, character and professionalism (DESIGN STANCE's PRODUCTION BAR), or does it read flat, gimmicky, or like a UI trend applied to the product? Name the shortfall concretely; (1) fidelity — is the signature memorable, axes and caps respected, the brief's traps avoided, clearly different from the other one-liners; (2) craft — type scale and hierarchy, alignment, rhythm, numerals, computed contrast, targets, safe areas, icons, images, dark mode; (3) generic tells; (4) content exactness and guardrails; (5) the board; (6) technical — scoping, no script, aria, links, icon names.
Write the critique to ${TASK}/round-${R}/notes/v${v.id}-critique.md and return: scores 1–10, must_fix (≤ 10, most important first; screen, element/selector, problem, exact fix), push_further (1–2, no new accessories), remove_one. Don't edit the variant's files.`,
  { label: `critique:v${v.id}`, phase: 'Critique', schema: CRIT, effort: 'high' })

const refine = (crit, v) => agent(`You are the designer-builder of Round ${R} variant V${v.id} "${v.name}" (group ${v.group}) for ${A.product}, finishing it after critique. If your notes already contain a "Changes after critique" section from an interrupted run, only verify and finish what it lists.
${READS(v)}
Your notes: ${TASK}/round-${R}/notes/v${v.id}.md.${ROUND_CRIT ? ` Your must-do list: the round critique's section for V${v.id} in ${RC_FILE} (read its verdict on the round first, and its notes on the others so you don't converge on them).` : ''}${PER_VARIANT ? `
The per-variant critique: ${crit && crit.must_fix ? JSON.stringify(crit) : `(not returned — read ${TASK}/round-${R}/notes/v${v.id}-critique.md if it exists, else review against the guidelines' checklist yourself)`}` : ''}
Apply every item (the round critique's first where two clash); a push-further only where it strengthens the thesis without adding decoration; cut a remove-one unless it's required content. If an item contradicts the content spec, don't apply it and say why in your notes.
${CONTRACT(v)}
${TOOLING(v, 'final')}
FINAL SELF-CHECK: shoot everything and look at it; dom-audit.mjs reports no overlaps or low contrast (eye-check blend-mode text); the mechanical checks above report nothing for V${v.id}; every selector in your CSS starts with .${vid(v)}. Append "Changes after critique" to your notes. Return summary, files, final_shots and known issues left.`,
  { label: `refine:v${v.id}`, phase: 'Refine', schema: RET })

// Round critique (added after Kas pirmas R1, where 15 careful variants read as one grey app and nobody looked at the
// round as a whole until the end): all builds finish, then ONE critic compares them. Since v4 it is the only critique
// in speed mode (Kas pirmas lab R2–R3 ran build → round critique → refine: 21 agents, 35–45 min for ten variants).
const SHOT = (out, h, anchor) => `perl -e 'alarm 200; exec @ARGV' node ${TOOLS}/page-shot.mjs ${ROUND_URL} ${out} ${Math.max(1600, ROW + 380)} ${h} --scroll-to "#${anchor}" --settle 8000`
const stripIds = A.strips || (TG.roundJson ? null : A.screens.map((s) => `compare-${s.n}`))
const strips = stripIds
  ? A.screens.map((s, i) => SHOT(`${SHOTS}/round/strip-${s.n}.png`, 2400, stripIds[i])).join(' ; ')
  : `${SHOT(`${SHOTS}/round/strip-<n>.png`, 2400, '<anchor>')} for each screen, where <anchor> is the third field of that screen's entry in the "screens" list of ${TG.roundJson}`
const roundCritique = () => agent(`You are the round's creative director, judging ${A.variants.length} directions for ${A.product} SIDE BY SIDE — the view a client gets. You did not build any of them.${PER_VARIANT ? '' : ' Yours is the only critique before the builders refine, so besides the side-by-side verdict you name each variant\'s worst faults.'}
Read ${TASK}/round-${R}/brief.md §1–§3 (the round, the ${A.variants.length}, the diversity matrix) and ${TASK}/design-guidelines.md §6.4–6.5${PER_VARIANT ? '' : `; skim ${REFS}/critique-patterns.md §1–§2 (the faults critics found most) and ${REFS}/generic-tells.md's calibration list`}.
1. Assemble the round page: ${ASSEMBLE}${TG.kind === 'lab' ? ` ; sleep 25 (the dev server rebuilds). Check the page's <title> names Round ${R} of this product — a 200 can be another project's fallback page.` : ''}
2. Shoot every compare strip: ${strips}. Then every variant's section (its board above its phones): for id in ${A.variants.map((v) => v.id).join(' ')}; do ${SHOT(`${SHOTS}/round/v$id.png`, 2500, `r${R}-v$id`)}; done. Read every PNG. Then look at the strips desaturated in your head (or convert: sips -s format png, or python PIL if present) — which variants differ ONLY in colour?
3. Judge each variant at thumbnail size: distinct (nobody would confuse it) · look-alike (name the other variant and the shared skeleton) · grey (no colour field where the brief promised one, or the palette reads neutral) · weak signature (you can't point to its one idea on the peak screen) · below the bar (put it next to the bar sheet${A.bar ? ` ${A.bar.good}` : ''}: flat, thin, gimmicky or a trend skin rather than depth, character and professionalism — say what is missing). Be blunt: the Kas pirmas R1 strips looked like one app in 15 costumes and every per-variant critic had missed it.${PER_VARIANT ? '' : ` Then, from its section at full size, its worst faults: generic tells, craft (hierarchy, numerals, contrast you can see, crowded controls, safe areas), content that differs from the brief's content spec, a board that runs long, leaves its own system or misses a block. The builders ran the mechanical checks; don't re-run them.`}
Write ${RC_FILE}: a short verdict on the round, then "### VNN · Name" per variant with its verdict and ${PER_VARIANT ? '1–4 concrete must-diverge changes' : '2–6 concrete changes, must-diverge first'} (structure, colour field, scale, composition — never "add decoration"), naming screens and elements${PER_VARIANT ? '' : ', and for a fault the exact fix'}. Don't edit any variant's files. Return the verdict per variant.`,
  { label: 'round-critique', phase: 'Round critique', effort: 'high', schema: { type: 'object', properties: { verdicts: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, verdict: { type: 'string' }, notes: { type: 'string' } }, required: ['id', 'verdict'] } } }, required: ['verdicts'] } })

// ---- run: build (all) → round critique → per variant: [critique if thorough] → refine ------------------------------
const pre = A.preBuild || []
const waiting = new Set(pre.map((p) => p.group))
const built = {}
const buildOne = (v) => (isDone('build', v) ? Promise.resolve({ summary: '(built in an earlier run)', files: [], known_issues: [] }) : build(v))
  .then((r) => { built[v.id] = r })
const buildAll = (list) => parallel(list.map((v) => () => buildOne(v)))
await Promise.all([
  buildAll(A.variants.filter((v) => !waiting.has(v.group))),
  ...pre.map((p) => (async () => {
    const group = A.variants.filter((v) => v.group === p.group)
    if (!group.every((v) => isDone('build', v))) await agent(p.prompt, { label: `prebuild:${p.group}`, phase: 'Pre-build', effort: 'high' })
    await buildAll(group)
  })()),
])
const missingBuilds = A.variants.filter((v) => !built[v.id]).map((v) => v.id)
if (missingBuilds.length) log(`WARNING: builds returned nothing for ${missingBuilds.join(', ')} — they still get critiqued from their files`)
if (!ROUND_CRIT) log('No round critique (it needs target.roundJson or args.assemble) — every variant gets its own critic instead')
else if (!DONE.roundCritique) await roundCritique()

// pipeline() drops an item whose stage returns null, so a skipped or dead critique resolves a marker instead
const todo = A.variants.filter((v) => !isDone('refine', v))
const out = await pipeline(todo,
  (_, v) => (PER_VARIANT && !isDone('critique', v) ? critique(built[v.id], v) : Promise.resolve(null)).then((c) => c || { fromFile: true }),
  (c, v) => refine(c, v))
const byId = Object.fromEntries(todo.map((v, i) => [v.id, out[i]]))
return A.variants.map((v) => {
  const r = byId[v.id]
  return { id: v.id, name: v.name, ok: isDone('refine', v) || !!r, summary: r?.summary, issues: r?.known_issues, shots: r?.final_shots }
})
