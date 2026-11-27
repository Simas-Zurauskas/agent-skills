export const meta = {
  name: 'mood-board-build',
  description: 'Build every variant of a round: build → one side-by-side round critique → refine (thorough: + a fresh-eyes critique per variant before the refine); groups that wait on a brief supplement start later',
  whenToUse: 'Phase 3 of a mood-board-creator round, after the brief (and any supplements) exist. Run with args (see workflows/README.md).',
  phases: [
    { title: 'Pre-build', detail: 'optional per-group agents (e.g. a brief supplement after a source changed)' },
    { title: 'Build', detail: 'one designer-builder per variant: plan, files, rendered self-check and verification of actual repairs' },
    { title: 'Round critique', detail: 'one critic judges all variants side by side (compare strips + every board): content, craft, product fit and meaningful differentiation' },
    { title: 'Critique', detail: 'thorough only: fresh eyes per variant, own screenshots, must-fix list' },
    { title: 'Refine', detail: 'apply the critique, final self-check' },
  ],
}

// ---- args (see workflows/README.md) -------------------------------------------------------------------------------
const A = args || {}
if (A.target?.kind === 'design-lab') A.target = { ...A.target, kind: 'lab' }
const VIEW = A.viewport || { width: 390, height: 844 }
if (![VIEW.width, VIEW.height].every((n) => Number.isInteger(n) && n > 0)) throw new Error('viewport needs positive integer width and height')
const DESKTOP = A.platform === 'desktop' || VIEW.width > 600
const MODE = A.mode === 'speed' ? 'normal' : (A.mode || (A.thorough ? 'thorough' : 'normal'))
if (MODE === 'lite') throw new Error('Lite is not released in v8: its quality comparison failed; use normal or thorough')
if (!['normal', 'thorough'].includes(MODE)) throw new Error(`Unknown mode: ${MODE}`)
const CAPACITY = Math.max(1, Math.min(3, Number.isInteger(A.maxBuilders) ? A.maxBuilders : 3))
const checkedAgent = async (prompt, options) => {
  const result = await agent(prompt, options)
  if (result == null) throw new Error(`Required stage returned no result: ${options.label}`)
  return result
}
const need = ['product', 'task', 'skill', 'shots', 'variants', 'screens', 'flow', 'target']
const missing = need.filter((k) => !A[k])
if (missing.length) throw new Error(`mood-board-build: missing args: ${missing.join(', ')}`)
if (!Array.isArray(A.variants) || !A.variants.length || A.variants.some(v => !v || typeof v.id !== 'string' || !/^\d+$/.test(v.id)) || new Set(A.variants.map(v => v.id)).size !== A.variants.length) throw new Error('variants require distinct numeric-string IDs before assigning writers')
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
if (!['standalone', 'lab'].includes(TG.kind)) throw new Error(TG.kind === 'figma' ? 'Figma requires native editable canvas execution; read targets/figma.md' : `Unknown target: ${TG.kind}`)
if (TG.kind === 'standalone' && !(TG.out && TG.roundJson)) throw new Error('target standalone needs out and roundJson')
if (TG.kind === 'lab' && !TG.lab) throw new Error('target lab needs lab')
const DEV = TG.devUrl || 'http://localhost:1234'
// The round critique shoots a viewable round page: the assembler (keeping the builders' previews) and the page's URL.
const ASSEMBLE = A.assemble || (TG.roundJson && (TG.kind === 'lab'
  ? `python3 ${TOOLS}/design-lab/assemble-round.py ${TG.roundJson} --draft --keep-previews`
  : `python3 ${TOOLS}/assemble-standalone.py ${TG.roundJson} --draft --keep-previews`))
const ROUND_URL = A.roundUrl || (TG.kind === 'lab' ? `${DEV}/explorations/round-${RR}.html` : `file://${TG.out}/round-${RR}/index.html`)
const ROUND_CRIT = A.roundCritique !== false && !!ASSEMBLE
// Speed (default): the round critique is the only critique. Thorough, or no round page: a critic per variant too.
const PER_VARIANT = MODE === 'thorough' || !ROUND_CRIT
// After an outage: the stages already on file, e.g. { build: ["01", …], roundCritique: true, critique: [], refine: [] }
const DONE = A.done || {}
const isDone = (stage, v) => (DONE[stage] || []).includes(v.id)
const EX = TG.kind === 'lab' ? `${TG.lab}/src/explorations` : null
const VDIR = (v) => (TG.kind === 'lab' ? EX : `${TG.out}/round-${RR}/v${v.id}`)

// a board lines up with its row of phones: N × 402 (390 + 2 × 6 bezel) + (N − 1) × 40 gaps (1286 for three)
const ROW = DESKTOP ? Math.max(1286, VIEW.width + 12) : A.screens.length * (VIEW.width + 12) + (A.screens.length - 1) * 40
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
    ? `the variant stylesheet link <link rel="stylesheet" href="${vid(v)}.css"> plus external font links only when the approved faces need them; system/installed faces need no Google Fonts link`
    : `external font links only when approved faces need them; an empty head fragment is valid for approved system/installed faces (the round page adds your style.css itself)`),
  board_root: (v) => (TG.kind === 'lab' ? `<div class="lab-board ${vid(v)} w-[${ROW}px] …">` : `<div class="mb-board ${vid(v)} board" style="width:${ROW}px">`),
  preview: (v) => (TG.kind === 'lab'
    ? `- ${EX}/round-preview-${vid(v)}.html — your private preview (deleted at assembly): copy ${A.skill}/targets/design-lab/templates/preview.html and fill it (R=${R}, NN=${v.id}, the variant name), one figure per screen: ${A.screens.map((s) => `"${title(v, s)}" (frame title "${s.name}")`).join(', ')}.`
    : `- Your preview is generated, not written: python3 ${TOOLS}/assemble-standalone.py ${TG.roundJson} --preview ${v.id}  (re-run it after changing the board or a title; it writes ${TG.out}/round-${RR}/preview-v${v.id}.html).`),
  screens_rules: TG.kind === 'lab'
    ? `Screens: copy ${A.skill}/targets/design-lab/templates/screen.html (${VIEW.width} × ${VIEW.height}; status bar only for the agreed phone platform; <body class="VID">; last line the lab chrome include; never a <script>). Tailwind v4 utilities are fine (arbitrary values too); bespoke styling in your scoped CSS. Images only from ${EX}/img/ (src="img/<file>"). Icons: Lucide only (<i data-lucide="name" class="h-5 w-5"></i>); check a name exists before using it: ls ${TG.lab}/node_modules/lucide/dist/esm/icons/<name>.mjs — a wrong name breaks the dev build for everyone. Follow ${TG.lab}/CLAUDE.md's rules on links, toggles and aria-labels.`
    : `Screens: copy ${A.skill}/targets/standalone/templates/screen.html (${VIEW.width} × ${VIEW.height}; status bar only for the agreed phone platform; <body class="VID" style="margin:0">; keep its three scripts — Lucide, lucide.createIcons(), ../../assets/phone.js — and add no other script; the Tailwind v4 browser build is optional). Style everything in style.css. Images only from ${TG.out}/img/ (src="../../img/<file>"). Icons: Lucide (<i data-lucide="name"></i>, sized in CSS); a wrong name simply doesn't render — verify-screens.mjs reports it. Icon-only links/controls get aria-label; on/off controls are <button aria-pressed="false">.`,
  links: (v) => (TG.kind === 'lab'
    ? `cd ${TG.lab} && yarn -s links 2>&1 | grep -B1 -A4 "R${R} V${v.id}"`
    : `python3 ${TOOLS}/check-standalone.py ${TG.roundJson} 2>&1 | sed -n '/^V${v.id}/,/^V[0-9]/p'  and  node ${TOOLS}/verify-screens.mjs ${A.screens.map((s) => `file://${VDIR(v)}/screen-${s.n}.html`).join(' ')}`),
  images: TG.kind === 'lab' ? `${EX}/img/` : `${TG.out}/img/`,
}

if (TG.kind === 'lab' && TG.roundJson) T.preview = (v) => `- Your private preview is generated by the viewport-aware assembler: python3 ${TOOLS}/design-lab/assemble-round.py ${TG.roundJson} --preview ${v.id}. Re-run after board/title changes; never write the shared round page yourself.`
if (TG.kind === 'standalone') T.links = () => `python3 ${TOOLS}/check-standalone.py ${TG.roundJson} (shared files outside your variant remain the lead's responsibility); use the combined capture in TOOLING for browser checks`
if (DESKTOP) T.screens_rules = `Screens are native-looking desktop HTML at ${VIEW.width} × ${VIEW.height}. Build the actual desktop product navigation, workspace, table/detail composition and controls from the brief. Do not copy phone status bars, bottom tabs or home indicators unless the product explicitly requests them. Use the selected target's includes/scripts and scoped CSS requirements, but override mobile template dimensions with the declared viewport. Preserve exact strings, meaningful flow, real icons and image paths. The shared assembler is configured with the same viewport. Every screen <title> follows the declared contract.`

const STANCE = `Read ${REFS}/execution-contract.md and ${REFS}/design-diagnostics.md. Canvas ${VIEW.width} × ${VIEW.height}; product platform ${DESKTOP ? 'desktop' : (A.platform || 'mobile')}. Platform and owner constraints override historical phone recipes. Owner/product constraints outrank critic preferences. Create finished, coherent UI with the agreed content and a meaningful direction. Fit and readable hierarchy matter; no universal font bans, saturation floors, mandatory heroes, three-surface stacks, list-first formulas or mockup bans. Familiar components and quiet palettes can be right. Inspect rendered work and the reference bar, not a style checklist. Preserve the product's meaning, actual controls, image implications and requested distinctness. Remove an accessory only when it weakens the result; never remove required content.`


const READS = (v) => `READ FIRST, in full:
- The guidelines ${TASK}/design-guidelines.md (product principles, guardrails and relevant craft checks).
- The round brief ${TASK}/round-${R}/brief.md: the round in one page, the diversity matrix (your axis positions and assigned caps are binding), the content spec (every string exact; the fixed strings; the never-list; the links), the photo library, and YOUR section${v.lines ? `, lines ${v.lines}` : ''} ("### V${v.id} · ${v.name}"). Skim the other variants' one-liners only, so you don't drift into them.${supplements[v.group] ? `\n- ${supplements[v.group]} — it SUPERSEDES your brief section wherever they differ.` : ''}
- Binding review findings: ${findings} (if it exists) — apply substantive findings naming V${v.id} or all variants only when consistent with owner/product constraints and the fixed content spec.
- ${REFS}/design-diagnostics.md; consult historical critique-patterns only for a relevant concrete defect.${ROUND_CRIT ? `
- The round critique ${RC_FILE} (once it exists; the builder won't have it yet): how your variant reads NEXT TO THE OTHERS at thumbnail size, and its worst faults. Accept substantive items for V${v.id} only when consistent with owner/product constraints; preference-only suggestions are optional. Neutral palettes and shared axes are not automatic failures.` : ''}
- For structure/content only (not their grey look), the wireframes: ${A.screens.map((s) => s.wireframe).filter(Boolean).join(', ') || `none — the content spec is the source, and the domain research note's "category's default screen" per role (in ${TASK}/research/) is the structural baseline to compare against`}.`

const CONTRACT = (v) => `FILES YOU OWN (create/edit ONLY these — other variants are being built in parallel):
- ${T.head(v)} — ${T.headLine(v)}
- ${T.css(v)} — every selector under .${vid(v)} (the round page loads every variant's CSS at once); custom properties on .${vid(v)}; @keyframes ${vid(v)}-*; no @import, no @font-face, no :root / html / bare body.
${A.screens.map((s) => `- ${T.screen(v, s)}  <title>${title(v, s)}</title>`).join('\n')}
- ${T.board(v)} — the style tile: ONE root ${T.board_root(v)} (${ROW} px wide; ${DESKTOP ? 'desktop screens stack below the board at their declared viewport' : `${A.screens.length} × ${VIEW.width + 12} px frames + ${A.screens.length - 1} × 40 px gaps, aligned above the row`}), height proportional to its content and readable comparison, in the variant's own system, no links or buttons. Reading order: a header (the name as display type; number, group and route as separate elements), then six blocks — thesis + the question it tests ("<Product> as ___, because ___"); the signature, large, on real content; palette swatches that read your own tokens, with roles and the contrast pairs that matter; type and numeral specimens on real strings (the longest name, the hero figures, a tabular check such as 1,111 over 8,888); rejected defaults; trade-offs and where they bite. Optional: 2–3 "feedback we want" questions. Board guidance: ${REFS}/method.md.
${T.preview(v)}
${T.screens_rules.replace(/VID/g, vid(v))} Images only from the shared library ${T.images} (${A.images || "see the brief's photo library"}); per-variant looks are CSS grades, no new images.
Links: ${A.flow}. Also wire visible navigation to existing in-scope destinations (for example a section rail returns to its existing list); do not leave those as href="#". For destinations outside this exploration, preserve required labels as clearly noninteractive placeholders rather than inventing pages. Use a toggle (<button aria-pressed="false">) only for an authorized local-state prototype. Temporary placeholder links while files are being created must be reconciled before handoff.
BUILD TRAPS (each broke a whole round's build or render before): (1) copying a parent variant's files: rename only selector and keyframe prefixes, NEVER image paths — every img/… you reference must exist (ls it); (2) no CSS mask from an image file (mask-image: url(img/…)): Chrome drops it on file://, so inline the mask as a data URI (once, in a custom property on .${vid(v)}); (3) never generate images unless the brief tells you to — use the shared library.${TG.kind === 'lab' ? ' (4) never put url(…) inside a Tailwind class (bg-[url(img/…)]): it resolves from src/styles.css and breaks the lab build for everyone; (5) no SVG id containing "new" (the minifier rewrites it to "new" and the <use> breaks).' : ''}`

const TOOLING = (v, pass) => `SEE YOUR WORK (design from screenshots, not imagination). mkdir -p ${SHOTS}/v${v.id} first. ${TG.kind === 'lab' ? `The dev server is on ${DEV} (hot reload). NEVER run yarn build or yarn dev, and NEVER start, stop or restart any server yourself, on any port (an agent once replaced the shared server with its own narrower one and broke previews for every later builder); if it's down, wait 60 s, retry, then say so in your return and do what you can. A new file can take ~5 s to be served; a build error naming ANOTHER variant's file means wait 30 s and retry — never edit their files.` : 'The standalone target needs no server: screens open from file://.'}
- Batch the declared screens into one JSON job list [{"url":"...","prefix":"..."}], then run node ${TOOLS}/screen-shot.mjs --batch <jobs.json> --width ${VIEW.width} --height ${VIEW.height} ${DESKTOP ? '--desktop --dpr 1' : '--dpr 2'} --verify --audit --strings ${TASK}/round-${R}/strings.json. Inspect every top/scrolled capture and check result. Existing URL/prefix positional form remains available for one affected screen.
- Board + screens as the round page shows them: node ${TOOLS}/page-shot.mjs ${T.previewUrl(v)} ${SHOTS}/v${v.id}/${pass}-preview.png ${Math.max(1600, ROW + 380)} 2600
- Read every PNG you make.
- The combined capture already runs content, DOM and viewport checks; investigate actual findings without repeating clean browser visits.
- Mechanical checks for your variant: ${T.links(v)}${BAR}`

const RET = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    files: { type: 'array', items: { type: 'string' } },
    final_shots: { type: 'array', items: { type: 'string' } },
    known_issues: { type: 'array', description: 'Unresolved material defects or missing evidence required from this role. Put authorized prototype limitations and later-stage notices in summary/notes, not here.', items: { type: 'string' } },
  },
  required: ['summary', 'files', 'final_shots', 'known_issues'],
}
const CRIT = {
  type: 'object',
  properties: {
    must_fix: { type: 'array', items: { type: 'object', properties: { screen: { type: 'string' }, where: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['screen', 'where', 'problem', 'fix'] } },
    push_further: { type: 'array', items: { type: 'string' } },
    remove_one: { type: 'string' },
  },
  required: ['must_fix', 'push_further'],
}

const build = (v) => checkedAgent(`You are the designer-builder of Round ${R} variant V${v.id} "${v.name}" (group ${v.group}) for ${A.product}. You design AND build it as live HTML screens (${TG.kind === "lab" ? "in the Design Lab" : "a standalone static moodboard"}). If your files already exist from an interrupted run, continue from them instead of starting over.
${READS(v)}
${STANCE}
PLAN (short): write ${TASK}/round-${R}/notes/v${v.id}.md — tokens (hex + roles), type scale, spacing, the signature and how each screen expresses it, one ASCII sketch per screen, and the choices that distinguish this direction. Keep this compact and proportional; no line quota. Then build.
${CONTRACT(v)}
${TOOLING(v, '<pass>')}
RENDERED SELF-CHECK: after the first full build capture and inspect every screen + preview. Fix substantive defects and capture changed output once more; no duplicate clean pass or indefinite polish loop. Verify reduced-motion behavior only when motion is in this round's applicable scope. Check doubtful contrast pairs, ${DESKTOP ? 'usable desktop pointer targets (none overlapping)' : 'usable mobile targets (none overlapping)'}, ${DESKTOP ? 'the desktop viewport, navigation and workspace boundaries' : 'the status-bar and home-indicator zones'}, every content-spec string, and that scrolled content is as considered as the top. Exercise implemented prototype interactions and inspect their visible result (for example nonmatching rows actually disappear), not only aria/hidden attributes or button state. Do not invent persistence or other excluded behavior.
Return summary, files, final_shots (actual inspected screenshot paths) and known_issues: unresolved material defects or missing evidence required from your role. Disclose authorized prototype limitations and later-stage review notices in summary/notes instead; do not hide real issues. Missing screenshots mean incomplete work.`,
  { label: `build:v${v.id}`, phase: 'Build', schema: RET, effort: 'high' })

const critique = (built, v) => checkedAgent(`You are a demanding design critic with fresh eyes — you did not build this. Round ${R} variant V${v.id} "${v.name}" (group ${v.group}) for ${A.product}.
${READS(v)}
The builder says: ${built ? built.summary : '(no summary — inspect the files)'} Known issues: ${built ? JSON.stringify(built.known_issues) : '[]'}${ROUND_CRIT ? `
The round critique's items for V${v.id} already bind the refiner: don't repeat them — find what a side-by-side look can't see.` : ''}
${TOOLING(v, 'crit')}
Take your own screenshots of every screen (top + scrolled where content scrolls; motion checks only where applicable) and the preview; run the viewport-appropriate checks in TOOLING (overlapping controls, content and contrast); read the variant's files. Judge: (0) the production bar first — next to the bar sheet${A.bar ? ` (${A.bar.good})` : ''}, does it have coherent hierarchy, product fit and competent execution, or does it read flat, gimmicky, or like a UI trend applied to the product? Name the shortfall concretely; (1) fidelity — is the signature memorable, axes and caps respected, the brief's traps avoided, clearly different from the other one-liners; (2) craft — type scale and hierarchy, alignment, rhythm, numerals, computed contrast, targets, safe areas, icons, images, dark mode; (3) generic tells; (4) content exactness and guardrails; (5) the board; (6) technical — scoping, no script, aria, links, icon names.
Write the critique to ${TASK}/round-${R}/notes/v${v.id}-critique.md and return: must_fix (≤ 10, most important first; screen, element/selector, problem, exact fix), push_further (optional preference-only suggestions; empty is valid). No scoring or removal quota. Don't edit the variant's files.`,
  { label: `critique:v${v.id}`, phase: 'Critique', schema: CRIT, effort: 'high' })

const refine = (crit, v) => checkedAgent(`You are the designer-builder of Round ${R} variant V${v.id} "${v.name}" (group ${v.group}) for ${A.product}, finishing it after critique. If notes already contain prior changes, preserve them but reconcile the current substantive findings against actual files and captures; never skip new findings based only on an old section.
${READS(v)}
Your notes: ${TASK}/round-${R}/notes/v${v.id}.md.${ROUND_CRIT ? ` Your must-do list: the round critique's section for V${v.id} in ${RC_FILE} (read its verdict on the round first, and its notes on the others so you don't converge on them).` : ''}${PER_VARIANT ? `
The per-variant critique: ${crit && crit.must_fix ? JSON.stringify(crit) : `(required critique missing: report incomplete; self-review cannot replace it)`}` : ''}
Apply substantive items consistent with owner/product constraints and exact content; a push-further is optional and must strengthen the agreed thesis; remove only an actual harmful accessory. If an item contradicts the content spec, don't apply it and say why in your notes.
${CONTRACT(v)}
${TOOLING(v, 'final')}
FINAL SELF-CHECK: capture and inspect affected screens and shared output. Reuse earlier captures/checks only for demonstrably unchanged source, shared assets and viewport; uncertainty requires recapture. Inspect the complete final evidence set; the viewport-appropriate audit reports no unresolved substantive overlap or readability defects (eye-check blend-mode text); the mechanical checks above report nothing for V${v.id}; every selector in your CSS starts with .${vid(v)}. Append "Changes after critique" to your notes. Return summary, files, final_shots and known_issues containing unresolved material defects or missing required evidence. Disclose authorized prototype limitations in summary/notes; do not hide real issues.`,
  { label: `refine:v${v.id}`, phase: 'Refine', schema: RET, effort: 'high' })

// Round critique (added after Kas pirmas R1, where 15 careful variants read as one grey app and nobody looked at the
// round as a whole until the end): all builds finish, then ONE critic compares them. Since v4 it is the only critique
// in speed mode (Kas pirmas lab R2–R3 ran build → round critique → refine: 21 agents, 35–45 min for ten variants).
const SHOT = (out, h, anchor) => `perl -e 'alarm 200; exec @ARGV' node ${TOOLS}/page-shot.mjs ${ROUND_URL} ${out} ${Math.max(1600, ROW + 380)} ${h} --scroll-to "#${anchor}" --settle 8000`
const stripIds = A.strips || (TG.roundJson ? null : A.screens.map((s) => `compare-${s.n}`))
const strips = stripIds
  ? A.screens.map((s, i) => SHOT(`${SHOTS}/round/strip-${s.n}.png`, 2400, stripIds[i])).join(' ; ')
  : `${SHOT(`${SHOTS}/round/strip-<n>.png`, 2400, '<anchor>')} for each screen, where <anchor> is the third field of that screen's entry in the "screens" list of ${TG.roundJson}`
const ROUND_SCHEMA = { type: 'object', properties: { complete: { type: 'boolean' }, screenshots: { type: 'array', items: { type: 'string' } }, verdicts: { type: 'array', items: { type: 'object', properties: { id: { type: 'string', enum: A.variants.map(v => v.id) }, verdict: { type: 'string' }, notes: { type: 'string' }, must_fix: { type: 'array', items: { type: 'string' } } }, required: ['id', 'verdict', 'must_fix'] } } }, required: ['complete', 'screenshots', 'verdicts'] }
const roundCritique = () => checkedAgent(`You are the independent round critic for ${A.product}. You built none of these variants. Review all ${A.variants.length} directions using actual screenshots. Read ${REFS}/execution-contract.md, ${REFS}/design-diagnostics.md, ${TASK}/PLAN.md and ${TASK}/round-${R}/brief.md and ${TASK}/design-guidelines.md. Owner/product constraints outrank critic preference. No aesthetic scores or blanket style rules.
The lead has published ${ROUND_URL}. Do not assemble or edit shared output. Evidence paths from the builders (not their conclusions): ${JSON.stringify(A.variants.map(v => ({ id: v.id, files: built[v.id]?.files || [], screenshots: built[v.id]?.final_shots || [] })))}. Reuse screenshots and mechanical checks only when the lead/source-state records tie them to unchanged current source, shared assets and the declared viewport; otherwise capture/check the missing or uncertain views. Inspect every board and screen independently at useful full size and compare identical screens across all variants. Capture comparison views when not already current: ${strips}. Batch compatible capture jobs; no repeated clean visits. Check doubtful behavior/content claims directly; a builder pass is not your verdict. The bar: ${A.bar?.good || 'the agreed product references in the brief'}. Verify exact content, actual fit/controls, coherence with the board, useful distinctness and product fit. Name evidence and consequence for every finding. Neutral palettes, familiar fonts, lists, lack of a hero or shared owner-constrained axes are not failures by themselves.
Write ${RC_FILE} with a short verdict then a section per VNN. Return complete=true only after actually inspecting every declared board/screen and comparison; include the screenshot paths. Return exactly one verdict for each declared variant using these exact IDs: ${A.variants.map(v => v.id).join(", ")} (no V prefix). Return must_fix containing only substantive actionable findings, each naming screen/element, consequence and minimal repair. An empty must_fix is valid. Keep preference-only suggestions in notes; do not invent changes to fill a quota. Do not edit variant files. Missing screenshots mean incomplete review, never pass.`,
  { label: 'round-critique', phase: 'Round critique', effort: 'high', schema: ROUND_SCHEMA })

// Bounded workers share one queue. The callback is a supplied host capability, never an invented tool.
const bounded = async (items, work) => {
  const results = new Array(items.length)
  const failures = []
  let next = 0
  await Promise.all(Array.from({ length: Math.min(CAPACITY, items.length) }, async () => {
    while (next < items.length && failures.length === 0) {
      const i = next++
      try { results[i] = await work(items[i]) }
      catch (error) { failures.push(error) }
    }
  }))
  // Active native calls must settle before the workflow reports failure. Retain
  // their partial artifacts/publications; a resume reconciles them explicitly.
  if (failures.length) throw new AggregateError(failures, 'Worker failure; active calls settled, remaining assignments stopped: ' + failures.map(e => e?.message || String(e)).join('; '))
  return results
}
const pendingRepairs = new Set()
let publication = Promise.resolve()
const publish = (v, result, stage) => {
  publication = publication.then(async () => {
    const readyIds = A.variants.filter(item => built[item.id] && !pendingRepairs.has(item.id)).map(item => item.id)
    const packet = { id: v.id, name: v.name, stage, result, readyIds }
    const assemblyCommand = A.assemble ? ASSEMBLE : `${ASSEMBLE} --ready ${readyIds.join(',')}`
    if (typeof A.onVariantReady === 'function') await A.onVariantReady(packet)
    else if (ASSEMBLE) await checkedAgent(`You are the sole round publisher. Run this existing assembly command after V${v.id} ${stage}: ${assemblyCommand}. Publish only returned assignments ${readyIds.join(", ")}; files from active builders are not ready. Preserve declared pending slots and other variants; do not edit designs or start/stop servers. Confirm the page exists and report failures honestly.`, { label: `publish:${stage}:v${v.id}`, phase: 'Publish', schema: { type: 'object', properties: { published: { type: 'boolean' }, evidence: { type: 'string' } }, required: ['published', 'evidence'] } }).then((r) => { if (!r.published) throw new Error(`Publication failed for V${v.id}`) })
    else if (ROUND_CRIT) throw new Error('No shared publisher available')
  })
  return publication
}
const pre = A.preBuild || []
if (new Set(pre.map(p => p.group)).size !== pre.length) throw new Error('preBuild requires one preparation owner per group')
const preparations = new Map(pre.map((p) => [p.group, checkedAgent(p.prompt, { label: `prebuild:${p.group}`, phase: 'Pre-build', effort: 'high' })]))
const preparationSettlement = Promise.allSettled([...preparations.values()])
const built = {}
try {
await bounded(A.variants, async (v) => {
  if (preparations.has(v.group)) await preparations.get(v.group)
  // done is a resume hint: the builder verifies existing files and evidence instead of rewriting them.
  const result = await build(v)
  if (!result?.files?.length || !result?.final_shots?.length) throw new Error(`V${v.id} build has no artifact or screenshot evidence`)
  built[v.id] = result
  await publish(v, result, isDone('build', v) ? 'resume-verified' : 'draft')
})
await publication
const reviewed = ROUND_CRIT ? await roundCritique() : null
// Preserve zero padding; never guess IDs or collapse duplicate aliases into one review.
if (reviewed?.verdicts) {
  const verdicts = reviewed.verdicts.map(r => ({ ...r, id: typeof r.id === 'string' ? r.id.replace(/^V(?=\d+$)/i, '') : r.id }))
  if (new Set(verdicts.map(r => r.id)).size !== verdicts.length) throw new Error('Round critique contains duplicate variant IDs')
  reviewed.verdicts = verdicts
}
if (ROUND_CRIT && (reviewed?.complete !== true || !reviewed?.screenshots?.length || !reviewed?.verdicts || reviewed.verdicts.length !== A.variants.length || A.variants.some((v) => !reviewed.verdicts.some((r) => r.id === v.id && Array.isArray(r.must_fix))))) throw new Error('Round critique missing declared variants or repair findings')
// Exclude queued repairs too: publication may overlap the next worker starting.
if (PER_VARIANT) A.variants.forEach(v => pendingRepairs.add(v.id))
for (const verdict of reviewed?.verdicts || []) if (verdict.must_fix.length) pendingRepairs.add(verdict.id)
const results = await bounded(A.variants, async (v) => {
  const roundFinding = reviewed?.verdicts.find((r) => r.id === v.id)
  const detail = PER_VARIANT ? await critique(built[v.id], v) : null
  if (PER_VARIANT && !Array.isArray(detail?.must_fix)) throw new Error(`Required critique incomplete for V${v.id}`)
  const needsRepair = !!(roundFinding?.must_fix.length || detail?.must_fix.length)
  if (needsRepair) pendingRepairs.add(v.id)
  else pendingRepairs.delete(v.id)
  const result = needsRepair ? await refine(detail || { must_fix: roundFinding.must_fix }, v) : built[v.id]
  if (needsRepair && !result?.final_shots?.length) throw new Error(`Repair verification screenshots missing for V${v.id}`)
  if (needsRepair) {
    if (!result?.files?.length) throw new Error(`V${v.id} repair has no artifact evidence`)
    built[v.id] = result
    pendingRepairs.delete(v.id)
    await publish(v, result, 'repaired')
  }
  const issues = result.known_issues || []
  return { id: v.id, name: v.name, ok: issues.length === 0, status: issues.length ? 'incomplete' : 'reviewed', summary: result.summary, issues, shots: result.final_shots, repaired: needsRepair }
})
await publication
const preparationResults = await preparationSettlement
const preparationFailures = preparationResults.filter(r => r.status === 'rejected').map(r => r.reason)
if (preparationFailures.length) throw new AggregateError(preparationFailures, 'Preparation failed; all recorded calls settled')
return results
} catch (error) {
  await preparationSettlement
  await publication.catch(() => {})
  throw error
}
