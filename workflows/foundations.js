export const meta = {
  name: 'mood-board-foundations',
  description: 'Research the product, write and adversarially review its design guidelines, then propose and select divergent directions into a round brief',
  whenToUse: 'Phase 1 of a mood-board-creator round. Run with args (see workflows/README.md).',
  phases: [
    { title: 'Research', detail: 'project-specific lanes (+ generic lanes only if refreshResearch)' },
    { title: 'Guidelines', detail: 'write from the skill template, one critic through three lenses, revise' },
    { title: 'Directions', detail: 'oversupply per group, select for divergence, one critic through two lenses (speed: it writes the binding findings)' },
  ],
}

// ---- args (see workflows/README.md) -------------------------------------------------------------------------------
const A = args || {}
const need = ['product', 'task', 'skill', 'scratch', 'sources', 'screens', 'groups']
const missing = need.filter((k) => !A[k])
if (missing.length) throw new Error(`mood-board-foundations: missing args: ${missing.join(', ')}`)
const R = A.round || 1
const TASK = A.task
const SK = A.skill
const REFS = `${SK}/references`
const TOOLS = `${SK}/scripts`
const GUIDE = `${TASK}/design-guidelines.md`
const BRIEF = `${TASK}/round-${R}/brief.md`
const FINDINGS = `${TASK}/round-${R}/review-findings.md`
const screensText = A.screens.map((s) => `${s.n} ${s.name}${s.wireframe ? ` (from ${s.wireframe})` : ''}`).join(' · ')
const total = A.groups.reduce((n, g) => n + g.want, 0)

const COMMON = `
PRODUCT: ${A.product}
ROUND ${R} of UI explorations: ${total} visual directions (${A.groups.map((g) => `${g.want} ${g.label}`).join(', ')}), each shown as a description board (a style tile) above live hi-fi screens (${screensText}) on one scrolling round page (${A.target && A.target.kind === 'lab' ? `in the Design Lab at ${A.target.lab}` : `a standalone static moodboard at ${(A.target && A.target.out) || 'the output folder'}`}).
Read the task plan first: ${TASK}/PLAN.md. Product sources: ${A.sources}
The skill's distilled knowledge (from earlier rounds; read what your role needs, cite it rather than re-deriving): ${REFS}/README.md indexes generic-tells.md, craft-floors.md, method.md, vernaculars.md, guidelines-template.md, brief-template.md, critique-patterns.md, images.md.
HARD RULES: write only the file(s) your task names; never touch the product's code or the borrowed sources (copy them to scratch to run them); in a Design Lab never run \`yarn build\` or \`yarn dev\` (the user's dev server owns dist/). Scratch space: ${A.scratch}. Screenshot tools: ${TOOLS}/page-shot.mjs, ${TOOLS}/screen-shot.mjs, ${TOOLS}/cdp.mjs (node; read their headers).
`
const WEB = `Use WebSearch and WebFetch (load them via ToolSearch "select:WebSearch,WebFetch" if needed). Prefer primary, credible sources (practising designers, studios, platform guidelines, typographers, NN/g, respected critics), the last three years. Read at least 8 sources in full. Every finding concrete, with its source.`

const NOTE = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    key_findings: { type: 'array', items: { type: 'string' } },
  },
  required: ['file', 'key_findings'],
}

// ---- Research ------------------------------------------------------------------------------------------------------
const lanes = []
A.groups.filter((g) => g.kind === 'borrowed').forEach((g, i) => lanes.push({
  key: `source-${g.key}`,
  file: `${TASK}/research/0${i + 1}-source-${g.key.toLowerCase()}.md`,
  prompt: `TOPIC: Extract the complete visual system of "${g.label}" (${g.source}) so ${g.want} directions can be built in its family, each leaning into a DIFFERENT facet. ${g.guidance || ''}
If it is a live URL: screenshot it directly (and its key states with cdp.mjs). If it is a site you can run from source: copy it to scratch (never touch the original — rsync without .git and node_modules), install, build, serve on a spare port in the background, screenshot it with ${TOOLS}/page-shot.mjs (1440 wide + full page; interactive states with cdp.mjs), save shots into ${TASK}/research/source-${g.key.toLowerCase()}-shots/, and LOOK at them; stop the server. If it is a folder of images: look at every board and crop, and measure. Record the commit / date you captured.
Document: tokens (hex, both modes), type (families, weights, sizes, casing — and the closest Google Fonts if the originals aren't free), layout habits, radius hierarchy, textures, logo/wordmark, components, how it already depicts the app (if it does), imagery policy, motion, copy tone. End with 5 facets a family of directions could lean into and the invariants that keep them one family; flag the risk of looking like "coloured wireframes" if the wireframes already copy its structure.`,
}))
lanes.push({
  key: 'product',
  file: `${TASK}/research/0${lanes.length + 1}-product-content-brand.md`,
  web: true,
  prompt: `TOPIC: Product truth, audience, brand rules and the exact content for the round's screens (${screensText}). Read the product sources, the brand/voice notes and the wireframes (and the parts they include). If there is no PRD or no wireframes, PLAN.md's product brief is the source: say so, and mark everything you add "proposed" rather than "verified". Deliver: (1) the AUDIENCE and MARKET — who uses it and where (locale, currency, spelling), what they already use, what the category promises them (use the web: 4–6 sources); (2) a CONTENT SPEC — start from PLAN.md's, check every string and number against the sources (cite requirement ids when they exist), mark required vs optional per screen, and make the numbers tell one small story across the screens; (3) the brand rules a visual direction must never break, applied to VISUALS (what imagery, iconography or a ranking would imply something the brand rejects — e.g. for two-person products, never rank or race the people); (4) microcopy for any gap, in the brand's voice; (5) THE ESSENCE — 5–7 truths of this product, each one sentence from the sources (its core promise, its ritual or loop, its differentiators, its principles), with what each could mean visually. Every direction will start from one of them, so they must be specific to this product, never generic adjectives.`,
})
lanes.push({
  key: 'domain',
  file: `${TASK}/research/0${lanes.length + 1}-domain-references-and-vernaculars.md`,
  web: true,
  prompt: `TOPIC: This product's own world, for the ORIGINAL directions and for craft references. Start from ${REFS}/vernaculars.md (the catalogue and the method) and ${REFS}/craft-floors.md (reference apps). Then research: (1) 6–10 best-in-class apps in this product's category and adjacent ones, with 2–4 transferable techniques each (what exactly makes them good); (2) 10–14 real-world visual vernaculars from this product's world (its objects, places, rituals, record-keeping, signage) — for each: materials, type genres, colour habits, layout devices, 2–3 Google Fonts that evoke it (verify each exists; exact family name), a 5-colour palette with hex, how it would show the product's hero number / key moment on a phone, brand fit and limits, the cliché trap. Rank by fit × distinctiveness. Reuse catalogue entries where they fit; add new ones. (3) THE CATEGORY'S DEFAULT KIT: the 10–15 moves nearly every app in this category makes (colors, progress forms, icons, illustration, card patterns, copy lines — e.g. finance: progress rings, "money green", piggy banks, confetti at the goal, "You're on track!"); these become anti-generic rows and caps in the guidelines (see ${REFS}/generic-tells.md). (4) THE CATEGORY'S DEFAULT SCREEN for each screen role (${screensText}): what the typical app shows and how — the structural baseline critics compare against when there are no wireframes.`,
})
if (A.refreshResearch) {
  lanes.push(
    { key: 'tells', file: `${TASK}/research/refresh-generic-tells.md`, web: true, prompt: `TOPIC: What's new since ${REFS}/generic-tells.md was written about why AI-generated/templated UI looks generic and how designers counter it. Read that file first; research only what's new or wrong; write the delta.` },
    { key: 'craft', file: `${TASK}/research/refresh-craft.md`, web: true, prompt: `TOPIC: What's new since ${REFS}/craft-floors.md in mobile craft floors (platform guidelines, contrast standards, type, dark mode, motion). Read it first; research only the delta.` },
  )
}

phase('Research')
const notes = (await parallel(lanes.map((l) => () =>
  agent(`${COMMON}\nYou are a researcher. ${l.web ? WEB : ''}\n${l.prompt}\nWrite your note to ${l.file} (create folders). Return the file and 8–15 decision-relevant findings.`,
    { label: `research:${l.key}`, phase: 'Research', schema: NOTE })
))).filter(Boolean)
log(`Research: ${notes.length}/${lanes.length} notes`)
const noteIndex = notes.map((n) => `- ${n.file}\n  ${n.key_findings.slice(0, 5).join('\n  ')}`).join('\n')

// ---- Guidelines ----------------------------------------------------------------------------------------------------
phase('Guidelines')
await agent(`${COMMON}
You are the design director writing this product's design guidelines for exploration rounds. Start from the skill's template ${REFS}/guidelines-template.md: sections marked KEEP need only light adaptation; sections marked WRITE come from this product's research. Read ${REFS}/generic-tells.md and ${REFS}/craft-floors.md, and every research note below in full.
${noteIndex}
Write ${GUIDE}. It must be specific to this product (a reader could not paste it onto another one), opinionated, and usable as a checklist by an agent building a variant from screenshots. Keep it tight (350–550 lines). Return a 10-line summary of the principles.`,
  { label: 'guidelines:write', phase: 'Guidelines' })

const CRIT = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['sound', 'needs_changes'] },
    findings: { type: 'array', items: { type: 'object', properties: { lens: { type: 'string' }, severity: { type: 'string', enum: ['high', 'medium', 'low'] }, where: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['severity', 'where', 'problem', 'fix'] } },
  },
  required: ['verdict', 'findings'],
}
// One critic, three lenses (v4; three parallel critics each re-read the guidelines and the references)
const GLENSES = [
  { key: 'generic', prompt: `GENERIC-OUTPUT HUNTER. Imagine ten agents following these guidelines literally: would they still produce generic AI-looking UI? Which rules are platitudes that constrain nothing? Which tells from ${REFS}/generic-tells.md are missing? Where do the guidelines smuggle in a default without a brand reason? THEN THE OPPOSITE FAILURE — over-constraint: run the expression audit (${REFS}/guidelines-template.md §6.5). Which guardrails were translated into global caps (a chroma ceiling, a mood default, "no ground change") instead of the narrowest rule? Count the legal positions left on luminance, hue family, colour intensity, display genre and peak mode; fewer than 3 on any is a HIGH finding (Kas pirmas R1 shipped 15 grey look-alikes because nobody counted).` },
  { key: 'brand', prompt: `BRAND GUARDIAN + ORIGINALITY. Check against the product's brand/voice sources and the product research note. Is every rule specific to this product? Would a reader know which product this is? Any rule that conflicts with a guardrail? Anything that would make the directions converge instead of diverge?` },
  { key: 'craft', prompt: `SENIOR MOBILE DESIGNER + ACCESSIBILITY + FEASIBILITY. Are the floors correct and measurable (platform, WCAG numbers)? Anything infeasible in the output target (${A.target && A.target.kind === 'lab' ? `the Design Lab — read ${A.target.lab}/CLAUDE.md` : 'static HTML + CSS, Google Fonts, Lucide icons, no build step'})? Is the self-critique checklist answerable from a screenshot? Are the board requirements clear enough that every board comes out comparable?` },
]
const lensText = (lenses) => `Work through ${lenses.length} lenses in turn and give every finding its lens (${lenses.map((l) => l.key).join(' / ')}):\n${lenses.map((l, i) => `${i + 1}. ${l.prompt}`).join('\n')}`
const fmt = (c) => (c
  ? `Verdict: ${c.verdict}\n` + c.findings.map((f) => `- [${f.severity}]${f.lens ? ` (${f.lens})` : ''} ${f.where}: ${f.problem} → FIX: ${f.fix}`).join('\n')
  : '(the review agent returned nothing — revise only what you can see is wrong yourself)')
const gcrit = await agent(`${COMMON}\nYou are an adversarial reviewer. Read ${GUIDE} in full. ${lensText(GLENSES)}\nReport only real problems with concrete fixes; default to skepticism.`,
  { label: 'guidelines:critic', phase: 'Guidelines', schema: CRIT, effort: 'high' })
await agent(`${COMMON}\nRevise ${GUIDE} using the review below. Fold in what you accept; for each rejection write one line why. Then write ${TASK}/research/guidelines-review.md (findings with accepted/rejected + why).\nREVIEW:\n${fmt(gcrit)}`,
  { label: 'guidelines:revise', phase: 'Guidelines' })

// ---- Directions ----------------------------------------------------------------------------------------------------
phase('Directions')
const CAND = {
  type: 'object',
  properties: {
    candidates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' }, one_liner: { type: 'string' }, thesis: { type: 'string' }, lineage: { type: 'string' },
          route: { type: 'string', enum: ['safe', 'adventurous', 'scary'] },
          mode: { type: 'string', enum: ['light', 'dark', 'mixed'] },
          palette: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, hex: { type: 'string' }, role: { type: 'string' } }, required: ['name', 'hex', 'role'] } },
          type: { type: 'array', items: { type: 'object', properties: { family: { type: 'string' }, role: { type: 'string' }, google_fonts_css2_family: { type: 'string' } }, required: ['family', 'role', 'google_fonts_css2_family'] } },
          layout_concept: { type: 'string' },
          ascii_per_screen: { type: 'array', items: { type: 'string' } },
          signature_element: { type: 'string' }, shape_language: { type: 'string' }, texture_imagery: { type: 'string' },
          photo_subjects: { type: 'array', items: { type: 'string' } },
          motion_moment: { type: 'string' }, not_default_because: { type: 'string' }, risks: { type: 'string' },
        },
        required: ['name', 'one_liner', 'thesis', 'lineage', 'route', 'mode', 'palette', 'type', 'layout_concept', 'ascii_per_screen', 'signature_element', 'shape_language', 'texture_imagery', 'photo_subjects', 'motion_moment', 'not_default_because', 'risks'],
      },
    },
  },
  required: ['candidates'],
}
// A group proposes ≈1.7× its slots. More than 5 candidates from one agent drift into sameness, so big groups are split
// across proposers, each with its own lens (g.lenses, or defaults for originals / facets for borrowed families).
const DEFAULT_LENSES = {
  original: ['the product\'s essence: one truth of the product made visible at the level of the best apps in its category', 'places and their furniture (the venues of this product\'s world)', 'record-keeping objects and instruments (how this world writes things down)', 'crafts, print processes and materials'],
  borrowed: ['the facets research found most characteristic', 'the facets research found least used so far', 'a facet pushed to its extreme'],
}
const jobs = A.groups.flatMap((g) => {
  const total = g.propose || Math.ceil(g.want * 1.7)
  const parts = Math.max(1, Math.ceil(total / 4))
  const lenses = g.lenses || DEFAULT_LENSES[g.kind] || DEFAULT_LENSES.original
  return Array.from({ length: parts }, (_, i) => ({ g, count: Math.ceil(total / parts), lens: parts > 1 ? lenses[i % lenses.length] : null, part: i }))
})
const proposalsRaw = await parallel(jobs.map((j) => () => {
  const g = j.g
  return agent(`${COMMON}
You are a senior brand/UI designer at a studio famous for giving every client a distinct identity. Read ${GUIDE} (follow it), PLAN.md's content spec, the product research note, ${REFS}/method.md (routes, oversupply, what makes directions divergent) and ${REFS}/vernaculars.md (the direction patterns from earlier rounds — reuse a device only if it genuinely fits, and say so).
GROUP ${g.key} — "${g.label}": propose ${j.count} candidates${j.lens ? ` through this lens: ${j.lens} (other proposers cover other lenses — stay inside yours)` : ''}. ${g.kind === 'borrowed'
    ? `In the family of ${g.source}: read the research note on it in ${TASK}/research/ and look at its screenshots. Each candidate leans into a DIFFERENT facet while staying recognisably the same family. ${g.guidance || ''}`
    : `Originals: each grounded in one real-world vernacular (the domain research note + ${REFS}/vernaculars.md), clearly unlike the borrowed families and unlike each other (vary luminance, hue family, type genre, density, shape, imagery). ${g.guidance || ''}`}
Every candidate's thesis starts from ONE essence truth (the product research note's ESSENCE list; name it) and is pitched at the quality bar in PLAN.md (the reference apps the owner named, if any): depth, character, professionalism, App Store level. Never a UI trend or a style applied on top of the product (bento, glass, clay, stickers, neo-brutalism, a mascot, "Wrapped" stat cards): a round of those was rejected as gimmicky, thin trend skins (Dream Catcher R2, references/lessons.md).
Mix routes (safe / adventurous / scary). For each: buildable specs — palette hex with roles (check text contrast), Google Fonts that exist (exact css2 family strings), a layout concept and one ASCII sketch per screen at 390 pt, the ONE signature element, shape language, texture/imagery (photos only if the direction needs them), one motion moment, why it isn't a default, risks. Work through ${REFS}/generic-tells.md's calibration list and revise anything that reads as a default before returning.`,
    { label: `directions:propose-${g.key}${jobs.filter((x) => x.g === g).length > 1 ? `-${j.part + 1}` : ''}`, phase: 'Directions', schema: CAND, effort: 'high' })
}))
const pool = A.groups.map((g) => ({ group: g.key, label: g.label, want: g.want, candidates: jobs.flatMap((j, i) => (j.g === g ? proposalsRaw[i]?.candidates || [] : [])) }))
log(`Pool: ${pool.map((p) => `${p.group}=${p.candidates.length}`).join(', ')}`)

const SEL = {
  type: 'object',
  properties: {
    selected: { type: 'array', items: { type: 'object', properties: { vid: { type: 'string' }, name: { type: 'string' }, group: { type: 'string' }, mode: { type: 'string' }, first_line: { type: 'integer' }, last_line: { type: 'integer' } }, required: ['vid', 'name', 'group', 'mode'] } },
    photo_needs: { type: 'array', items: { type: 'object', properties: { file: { type: 'string' }, subject: { type: 'string' }, size: { type: 'string' }, used_by: { type: 'array', items: { type: 'string' } } }, required: ['file', 'subject', 'used_by'] } },
  },
  required: ['selected', 'photo_needs'],
}
await agent(`${COMMON}
You are the creative director selecting Round ${R}. Read ${GUIDE}, ${REFS}/method.md and ${REFS}/brief-template.md (its structure and its SELECTOR CHECKLIST are binding). The candidate pool (JSON) is below. Select exactly ${A.groups.map((g) => `${g.want} from ${g.key}`).join(', ')}, maximising divergence across the matrix axes while each stays strong alone; merge or sharpen candidates as needed. Number them V01… in group order.
Write ${BRIEF} following brief-template.md: the round in one page; the ten (or N) and why; what was cut and why; what was sharpened; the diversity matrix; capped devices assigned to named variants; nearest pairs (each separated on ≥ 3 axes); the corrected CONTENT SPEC (from the product research note — identical for every variant); one section per variant ("### VNN · Name") with every field plus per-screen notes and 2–4 "the builder must not…" traps; the photo library. Measure what the checklist says to measure (fonts at the specified sizes, contrast pairs). Also write ${TASK}/round-${R}/palettes.json — {"V01": {"name", "mode", "colours": [{"hex", "role", "share"}]}} with share = the colour's rough share of a typical screen — and run python3 ${TOOLS}/palette-sheet.py ${TASK}/round-${R}/palettes.json ${A.scratch}/palette-sheet.html; then node ${TOOLS}/page-shot.mjs file://${A.scratch}/palette-sheet.html ${A.scratch}/palette-sheet.png 1400 2400 and LOOK at it. If it exits 1 (too grey: fewer than half saturated, or more than a quarter neutral) and the user did not ask for a quiet round, reselect or re-colour before you finish. Also write ${TASK}/round-${R}/strings.json: the content spec's required strings per screen number, e.g. {"1": ["…", "…"], "2": [...]} — scripts/check-strings.mjs checks every variant against it.
POOL:
${JSON.stringify(pool)}`,
  { label: 'directions:select', phase: 'Directions', effort: 'high' })

// One critic, two lenses (v4). Speed: it writes the binding findings itself; finalize: a reviser folds them into the brief
const DLENSES = [
  { key: 'divergence', prompt: `DIVERGENCE + GENERIC TELLS. Any two variants too alike (same energy, same skeleton with a new palette, same display genre)? Would a client see N directions or N/2 twice? Any variant built on a calibration default without a brand reason? Any typeface choice that is itself a default?` },
  { key: 'buildable', prompt: `BRAND + BUILDABILITY. Does each direction pass the brand guardrails, including what its imagery implies? Is each specified enough to build without guessing (hex, fonts that exist — check doubtful ones on fonts.google.com; sizes that fit 390 pt — measure; touch targets on dense layouts; any mascot or illustration specified or cut)? Does the content spec match the product research note? Are the photo needs realistic and brand-safe?` },
]
const DREVIEW = `${COMMON}\nYou are an adversarial reviewer. Read ${BRIEF} in full and ${GUIDE}. ${lensText(DLENSES)}\nReport only real problems with concrete fixes, each naming the variant(s). When a fix could go more than one way, pick one: builders can't choose.`
let final
if (A.finalize) {
  const dcrit = await agent(DREVIEW, { label: 'directions:critic', phase: 'Directions', schema: CRIT, effort: 'high' })
  final = await agent(`${COMMON}\nRevise ${BRIEF} using the review below; fold in accepted findings and add a short "Review notes" section listing rejected ones with a reason. Keep every variant sharp and buildable. Return the final selection (vid, name, group, mode, and the first and last line number of each "### VNN · …" section in the revised brief) and photo needs.\nREVIEW:\n${fmt(dcrit)}`,
    { label: 'directions:finalize', phase: 'Directions', schema: SEL })
} else {
  final = await agent(`${DREVIEW}
The brief is not being revised (speed), so your review binds the builders. Write it to ${FINDINGS}, starting with: "Builders apply every finding that names their variant (or all variants), unless it contradicts the brief's content spec — then the content spec wins." Then the findings grouped by lens, each as "- **[severity] where** — problem. **Fix:** fix".
Return the brief's final selection (vid, name, group, mode, and the first and last line number of each "### VNN · …" section — take them from grep -n) and its photo library.`,
    { label: 'directions:critic', phase: 'Directions', schema: SEL, effort: 'high' })
}

return { guidelines: GUIDE, brief: BRIEF, findings: A.finalize ? null : FINDINGS, notes: notes.map((n) => n.file), selection: final }
