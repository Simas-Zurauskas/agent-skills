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
const A = { ...(args || {}) }
if (A.target?.kind === 'design-lab') A.target = { ...A.target, kind: 'lab' }
const VIEW = A.viewport || { width: 390, height: 844 }
if (![VIEW.width, VIEW.height].every((n) => Number.isInteger(n) && n > 0)) throw new Error('viewport needs positive integer width and height')
const DESKTOP = A.platform === 'desktop' || VIEW.width > 600
const MODE = A.mode === 'speed' ? 'normal' : (A.mode || (A.thorough ? 'thorough' : 'normal'))
if (MODE === 'lite') throw new Error('Lite is not released in v8: its quality comparison failed; use normal or thorough')
if (!['normal', 'thorough'].includes(MODE)) throw new Error(`Unknown mode: ${MODE}`)
if (A.target?.kind === 'figma') throw new Error('Figma requires the native workflow: read targets/figma.md; legacy HTML workflows do not support this target')
if (A.target && !['lab', 'standalone'].includes(A.target.kind)) throw new Error(`Unknown target: ${A.target.kind}`)
const count = A.count ?? (A.groups?.reduce((n, g) => n + g.want, 0) || 6)
if (!Number.isInteger(count) || count < 1) throw new Error('count must be a positive integer')
if (!A.groups) A.groups = [{ key: 'A', label: 'Product-appropriate directions', kind: 'original', want: count }]
if (A.groups.reduce((n, g) => n + g.want, 0) !== count) throw new Error('count conflicts with group quotas')
const checkedAgent = async (prompt, options) => {
  const result = await agent(prompt, options)
  if (result == null) throw new Error(`Required stage returned no result: ${options.label}`)
  return result
}
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
const validateSelection = (selection) => {
  const chosen = selection?.selected
  if (!Array.isArray(chosen) || chosen.length !== count) throw new Error('Selection does not match requested count')
  const ids = chosen.map(v => typeof v?.vid === 'string' ? v.vid.replace(/^V/i, '') : '')
  if (ids.some(id => !/^\d+$/.test(id)) || new Set(ids).size !== ids.length) throw new Error('Selected directions require distinct numeric IDs')
  // Older hosts may return the displayed label. Accept only an exact, unique correspondence.
  const keys = chosen.map(v => {
    if (A.groups.some(g => g.key === v.group)) return v.group
    const matches = A.groups.filter(g => g.label === v.group || `${g.key} · ${g.label}` === v.group)
    return matches.length === 1 ? matches[0].key : null
  })
  if (keys.some(k => k === null) || A.groups.some(g => keys.filter(k => k === g.key).length !== g.want)) throw new Error('Selected directions do not match the declared group quotas')
  chosen.forEach((v, i) => { v.group = keys[i] })
}

const COMMON = `
PRODUCT: ${A.product}
CANVAS: ${VIEW.width} × ${VIEW.height}; ${DESKTOP ? 'desktop product UI: retain its navigation, table/workspace structure and desktop controls; no forced phone chrome' : 'the agreed product platform'}. Owner platform constraints outrank historical mobile examples.
ROUND ${R} of UI explorations: ${total} visual directions (${A.groups.map((g) => `${g.want} in group ${g.key} (${g.label})`).join(', ')}), each shown as a description board (a style tile) above live hi-fi screens (${screensText}) on one scrolling round page (${A.target && A.target.kind === 'lab' ? `in the Design Lab at ${A.target.lab}` : `a standalone static moodboard at ${(A.target && A.target.out) || 'the output folder'}`}).
Read ${REFS}/execution-contract.md and ${REFS}/design-diagnostics.md first; they govern all historical examples and aesthetic advice. Owner/product constraints outrank critic preferences; no universal font, saturation, hero, surface-count or screen-formula bans. Read the task plan first: ${TASK}/PLAN.md. Product sources: ${A.sources}
The skill's distilled knowledge (from earlier rounds; read what your role needs, cite it rather than re-deriving): ${REFS}/README.md indexes generic-tells.md, craft-floors.md, method.md, vernaculars.md, guidelines-template.md, brief-template.md, critique-patterns.md, images.md.
HARD RULES: write only the file(s) your task names; never touch the product's code or the borrowed sources (copy them to scratch to run them); in a Design Lab never run \`yarn build\` or \`yarn dev\` (the user's dev server owns dist/). Scratch space: ${A.scratch}. Screenshot tools: ${TOOLS}/page-shot.mjs, ${TOOLS}/screen-shot.mjs, ${TOOLS}/cdp.mjs (node; read their headers).
`
const WEB = `Use the harness's available search/fetch tools for current facts. Prefer primary credible sources; reuse relevant verified notes and screenshots. Research enough to support decisions, not a source quota. Every finding concrete, with its source.`

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
If it is a live URL: screenshot it directly (and its key states with cdp.mjs). If it is a site you can run from source: copy it to scratch (never touch the original — rsync without .git and node_modules), request an owned scratch preview from the lead (researchers do not start or stop servers), screenshot it with ${TOOLS}/page-shot.mjs (1440 wide + full page; interactive states with cdp.mjs), save shots into ${TASK}/research/source-${g.key.toLowerCase()}-shots/, and LOOK at them; the lead owns server cleanup. If it is a folder of images: look at every board and crop, and measure. Record the commit / date you captured.
Document: tokens (hex, both modes), type (families, weights, sizes, casing — and the closest Google Fonts if the originals aren't free), layout habits, radius hierarchy, textures, logo/wordmark, components, how it already depicts the app (if it does), imagery policy, motion, copy tone. End with 5 facets a family of directions could lean into and the invariants that keep them one family; flag the risk of looking like "coloured wireframes" if the wireframes already copy its structure.`,
}))
lanes.push({
  key: 'product',
  file: `${TASK}/research/0${lanes.length + 1}-product-content-brand.md`,
  web: true,
  prompt: `TOPIC: Product truth, audience, brand rules and the exact content for the round's screens (${screensText}). Read the product sources, the brand/voice notes and the wireframes (and the parts they include). If there is no PRD or no wireframes, PLAN.md's product brief is the source: say so, and mark everything you add "proposed" rather than "verified". Deliver: (1) the AUDIENCE and MARKET — who uses it and where (locale, currency, spelling), what they already use, what the category promises them (use current sources only where needed for decisions); (2) a CONTENT SPEC — start from PLAN.md's, check every string and number against the sources (cite requirement ids when they exist), mark required vs optional per screen, and make the numbers tell one small story across the screens; (3) the brand rules a visual direction must never break, applied to VISUALS (what imagery, iconography or a ranking would imply something the brand rejects — e.g. when this product explicitly rejects competition, do not imply a ranking or race); (4) microcopy for any gap, in the brand's voice; (5) THE ESSENCE — 5–7 truths of this product, each one sentence from the sources (its core promise, its ritual or loop, its differentiators, its principles), with what each could mean visually. Every direction will start from one of them, so they must be specific to this product, never generic adjectives.`,
})
lanes.push({
  key: 'domain',
  file: `${TASK}/research/0${lanes.length + 1}-domain-references-and-vernaculars.md`,
  web: true,
  prompt: `TOPIC: This product's own world, for the ORIGINAL directions and for craft references. Start from ${REFS}/vernaculars.md (the catalogue and the method) and ${REFS}/craft-floors.md (reference apps). Then research: (1) a focused set of relevant apps in this product's category and adjacent ones, with 2–4 transferable techniques each (what exactly makes them good); (2) where useful for this product, plausible real-world visual vernaculars from this product's world (its objects, places, rituals, record-keeping, signage) — for each: materials, type genres, colour habits, layout devices, appropriate type choices (including approved system fonts; verify availability rather than requiring external fonts), a 5-colour palette with hex, how it would show the product's selected task, data or moment at the declared canvas, brand fit and limits, the cliché trap. Rank by fit × distinctiveness. Reuse catalogue entries where they fit; add new ones. (3) THE CATEGORY'S DEFAULT KIT: the recurring moves relevant to these screens (colors, progress forms, icons, illustration, card patterns, copy lines — e.g. finance: progress rings, "money green", piggy banks, confetti at the goal, "You're on track!"); evaluate whether these help or weaken this product; record contextual questions, not automatic bans or quotas, in the guidelines (see ${REFS}/generic-tells.md). (4) THE CATEGORY'S DEFAULT SCREEN for each screen role (${screensText}): what the typical app shows and how — the structural baseline critics compare against when there are no wireframes.`,
})
if (A.refreshResearch) {
  lanes.push(
    { key: 'tells', file: `${TASK}/research/refresh-generic-tells.md`, web: true, prompt: `TOPIC: What's new since ${REFS}/generic-tells.md was written about why AI-generated/templated UI looks generic and how designers counter it. Read that file first; research only what's new or wrong; write the delta.` },
    { key: 'craft', file: `${TASK}/research/refresh-craft.md`, web: true, prompt: `TOPIC: What's new since ${REFS}/craft-floors.md in applicable product craft checks (platform guidelines, contrast standards, type, appearances and requested motion). Read it first; research only the delta.` },
  )
}

phase('Research')
const notes = (await parallel(lanes.map((l) => () =>
  checkedAgent(`${COMMON}\nYou are a researcher. ${l.web ? WEB : ''}\n${l.prompt}\nWrite your note to ${l.file} (create folders). Return the file and 8–15 decision-relevant findings.`,
    { label: `research:${l.key}`, phase: 'Research', schema: NOTE })
))).filter(Boolean)
log(`Research: ${notes.length}/${lanes.length} notes`)
const noteIndex = notes.map((n) => `- ${n.file}\n  ${n.key_findings.slice(0, 5).join('\n  ')}`).join('\n')

// ---- Guidelines ----------------------------------------------------------------------------------------------------
phase('Guidelines')
await checkedAgent(`${COMMON}
You are the design director writing this product's design guidelines for exploration rounds. Start from the skill's template ${REFS}/guidelines-template.md: use only applicable sections and derive decisions from this product's research. Read ${REFS}/generic-tells.md and ${REFS}/craft-floors.md, and every research note below in full.
${noteIndex}
Write ${GUIDE}. It must be specific to this product (a reader could not paste it onto another one), opinionated, and usable as a checklist by an agent building a variant from screenshots. Keep it proportional to the actual product decisions; do not expand to a line quota. Return a 10-line summary of the principles.`,
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
  { key: 'generic', prompt: `GENERIC-OUTPUT HUNTER. Imagine ten agents following these guidelines literally: would they still produce generic AI-looking UI? Which rules are platitudes that constrain nothing? Which tells from ${REFS}/generic-tells.md are missing? Where do the guidelines smuggle in a default without a brand reason? THEN THE OPPOSITE FAILURE — over-constraint: run the expression audit (${REFS}/design-diagnostics.md). Which guardrails were translated into global caps (a chroma ceiling, a mood default, "no ground change") instead of the narrowest rule? Count the legal positions left on luminance, hue family, colour intensity, display genre and peak mode; narrow axes are a finding only when they defeat the owner's intended comparison; never relax owner constraints without authorization (Kas pirmas R1 shipped 15 grey look-alikes because nobody counted).` },
  { key: 'brand', prompt: `BRAND GUARDIAN + ORIGINALITY. Check against the product's brand/voice sources and the product research note. Is every rule specific to this product? Would a reader know which product this is? Any rule that conflicts with a guardrail? Anything that would make the directions converge instead of diverge?` },
  { key: 'craft', prompt: `SENIOR PRODUCT DESIGNER + USABILITY + FEASIBILITY. Are the applicable checks correct and observable for the declared platform and owner scope? Anything infeasible in the output target (${A.target && A.target.kind === 'lab' ? `the Design Lab — read ${A.target.lab}/CLAUDE.md` : 'the selected target, approved fonts/assets and its actual runtime requirements'})? Is the self-critique checklist answerable from a screenshot? Are the board requirements clear enough that every board comes out comparable?` },
]
const lensText = (lenses) => `Work through ${lenses.length} lenses in turn and give every finding its lens (${lenses.map((l) => l.key).join(' / ')}):\n${lenses.map((l, i) => `${i + 1}. ${l.prompt}`).join('\n')}`
const fmt = (c) => (c
  ? `Verdict: ${c.verdict}\n` + c.findings.map((f) => `- [${f.severity}]${f.lens ? ` (${f.lens})` : ''} ${f.where}: ${f.problem} → FIX: ${f.fix}`).join('\n')
  : '(the review agent returned nothing — revise only what you can see is wrong yourself)')
const gcrit = await checkedAgent(`${COMMON}\nYou are an adversarial reviewer. Read ${GUIDE} in full. ${lensText(GLENSES)}\nReport only real problems with concrete fixes; default to skepticism.`,
  { label: 'guidelines:critic', phase: 'Guidelines', schema: CRIT, effort: 'high' })
await checkedAgent(`${COMMON}\nRevise ${GUIDE} using the review below. Fold in what you accept; for each rejection write one line why. Then write ${TASK}/research/guidelines-review.md (findings with accepted/rejected + why).\nREVIEW:\n${fmt(gcrit)}`,
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
          type: { type: 'array', items: { type: 'object', properties: { family: { type: 'string' }, role: { type: 'string' }, google_fonts_css2_family: { type: 'string' } }, required: ['family', 'role'] } },
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
  original: ['the core task and usage context: choose a product-specific visual approach from the verified brief', 'information hierarchy, navigation and interaction rhythm appropriate to this content', 'identity and distinguishing character within owner constraints; choose relevant visual references, with physical sources only when useful', 'density and emphasis trade-offs for this audience and form factor'],
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
  return checkedAgent(`${COMMON}
You are a senior brand/UI designer at a studio famous for giving every client a distinct identity. Read ${GUIDE} (follow it), PLAN.md's content spec, the product research note, ${REFS}/method.md (grounding, oversupply and useful differentiation) and ${REFS}/vernaculars.md (the direction patterns from earlier rounds — reuse a device only if it genuinely fits, and say so).
GROUP ${g.key} — "${g.label}": propose ${j.count} candidates${j.lens ? ` through this lens: ${j.lens} (other proposers cover other lenses — stay inside yours)` : ''}. ${g.kind === 'borrowed'
    ? `In the family of ${g.source}: read the research note on it in ${TASK}/research/ and look at its screenshots. Each candidate leans into a DIFFERENT facet while staying recognisably the same family. ${g.guidance || ''}`
    : `Originals: ground each direction in product truth and relevant visual references. Use a physical-world vernacular only when it helps this product; it is not a quota. Distinguish the directions through meaningful available axes (structure, typography, density, shape, imagery or color), preserving owner-fixed axes. ${g.guidance || ''}`}
Every candidate's thesis starts from a relevant essence truth (the product research note's ESSENCE list; name it) and is pitched at the quality bar in PLAN.md (the reference apps the owner named, if any): depth, character, professionalism, App Store level. Styles and familiar components are allowed when they serve this product; judge purpose and execution, not a genre blacklist.
Mix routes (safe / adventurous / scary). For each: buildable specs — palette hex with roles (check text contrast), available fonts that fit owner constraints (exact family names; css2 strings only for Google Fonts actually needed), a layout concept and one ASCII sketch per screen at ${VIEW.width} px, the ONE signature element, shape language, texture/imagery (photos only if the direction needs them), a motion moment only when requested in scope, why it isn't a default, risks. Work through ${REFS}/generic-tells.md's calibration list and revise anything that reads as a default before returning.`,
    { label: `directions:propose-${g.key}${jobs.filter((x) => x.g === g).length > 1 ? `-${j.part + 1}` : ''}`, phase: 'Directions', schema: CAND, effort: 'high' })
}))
const pool = A.groups.map((g) => ({ group: g.key, label: g.label, want: g.want, candidates: jobs.flatMap((j, i) => (j.g === g ? proposalsRaw[i]?.candidates || [] : [])) }))
log(`Pool: ${pool.map((p) => `${p.group}=${p.candidates.length}`).join(', ')}`)

const SEL = {
  type: 'object',
  properties: {
    selected: { type: 'array', items: { type: 'object', properties: { vid: { type: 'string' }, name: { type: 'string' }, group: { type: 'string', enum: A.groups.map(g => g.key) }, mode: { type: 'string' }, first_line: { type: 'integer' }, last_line: { type: 'integer' } }, required: ['vid', 'name', 'group', 'mode'] } },
    photo_needs: { type: 'array', items: { type: 'object', properties: { file: { type: 'string' }, subject: { type: 'string' }, size: { type: 'string' }, used_by: { type: 'array', items: { type: 'string' } } }, required: ['file', 'subject', 'used_by'] } },
  },
  required: ['selected', 'photo_needs'],
}
await checkedAgent(`${COMMON}
You are the creative director selecting Round ${R}. Read ${GUIDE}, ${REFS}/method.md and ${REFS}/brief-template.md (its shared-content and selection checks apply). The candidate pool (JSON) is below. Select exactly ${A.groups.map((g) => `${g.want} from ${g.key}`).join(', ')}, maximising divergence across the matrix axes while each stays strong alone; merge or sharpen candidates as needed. Number them V01… in group order.
Write ${BRIEF} following brief-template.md: the round in one page; the ten (or N) and why; what was cut and why; what was sharpened; the diversity matrix; product-appropriate shared or distinct devices; nearest pairs with meaningful differences relevant to the requested comparison; the corrected CONTENT SPEC (from the product research note — identical for every variant); one section per variant ("### VNN · Name") with every field plus per-screen notes and 2–4 "the builder must not…" traps; the photo library. Measure what the checklist says to measure (fonts at the specified sizes, contrast pairs). Also write ${TASK}/round-${R}/palettes.json — {"V01": {"name", "mode", "colours": [{"hex", "role", "share"}]}} with share = the colour's rough share of a typical screen — and run python3 ${TOOLS}/palette-sheet.py ${TASK}/round-${R}/palettes.json ${A.scratch}/palette-sheet.html; then node ${TOOLS}/page-shot.mjs file://${A.scratch}/palette-sheet.html ${A.scratch}/palette-sheet.png 1400 2400 and LOOK at it. Palette statistics are diagnostic only; do not recolor a sound product direction to meet saturation or neutral quotas. Also write ${TASK}/round-${R}/strings.json: the content spec's required strings per screen number, e.g. {"1": ["…", "…"], "2": [...]} — scripts/check-strings.mjs checks every variant against it.
POOL:
${JSON.stringify(pool)}`,
  { label: 'directions:select', phase: 'Directions', effort: 'high' })

// One critic, two lenses (v4). Speed: it writes the binding findings itself; finalize: a reviser folds them into the brief
const DLENSES = [
  { key: 'divergence', prompt: `DIVERGENCE + GENERIC TELLS. Any two variants too alike (same energy, same skeleton with a new palette, same display genre)? Would a client see N directions or N/2 twice? Any variant built on a calibration default without a brand reason? Do actual typography choices fit the product and render correctly? Familiarity alone is not a failure.` },
  { key: 'buildable', prompt: `BRAND + BUILDABILITY. Does each direction pass the brand guardrails, including what its imagery implies? Is each specified enough to build without guessing (hex, fonts that exist — check the actual provider or system availability; sizes that fit ${VIEW.width} px — measure; touch targets on dense layouts; any mascot or illustration specified or cut)? Does the content spec match the product research note? Are the photo needs realistic and brand-safe?` },
]
const DREVIEW = `${COMMON}\nYou are an adversarial reviewer. Read ${BRIEF} in full and ${GUIDE}. ${lensText(DLENSES)}\nReport only real problems with concrete fixes, each naming the variant(s). For substantive findings propose a bounded fix consistent with owner constraints; preference-only suggestions do not bind builders.`
let final
if (A.finalize) {
  const dcrit = await checkedAgent(DREVIEW, { label: 'directions:critic', phase: 'Directions', schema: CRIT, effort: 'high' })
  final = await checkedAgent(`${COMMON}\nRevise ${BRIEF} using the review below; fold in accepted findings and add a short "Review notes" section listing rejected ones with a reason. Keep every variant sharp and buildable. Return the final selection (vid, name, group, mode, and the first and last line number of each "### VNN · …" section in the revised brief) and photo needs.\nREVIEW:\n${fmt(dcrit)}`,
    { label: 'directions:finalize', phase: 'Directions', schema: SEL })
} else {
  final = await checkedAgent(`${DREVIEW}
The brief is not being revised (speed), so your substantive review informs the builders, subject to owner/product constraints. Write it to ${FINDINGS}, starting with: "Builders apply substantive findings consistent with owner/product constraints and the exact content spec; preference-only suggestions are optional." Then the findings grouped by lens, each as "- **[severity] where** — problem. **Fix:** fix".
Return the brief's final selection (vid, name, group, mode, and the first and last line number of each "### VNN · …" section — take them from grep -n) and its photo library.`,
    { label: 'directions:critic', phase: 'Directions', schema: SEL, effort: 'high' })
}

validateSelection(final)
return { mode: MODE, guidelines: GUIDE, brief: BRIEF, findings: A.finalize ? null : FINDINGS, notes: notes.map((n) => n.file), selection: final }
