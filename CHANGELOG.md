# Changelog — mood-board-creator

`VERSION` holds one integer. Add an entry per change: what changed, and why (the run or feedback that taught it).

## 8 — 2026-11-08

- Normal remains default (`speed` alias); hold optional `lite` out of the release: it reduced effort but failed the operational required-note quality gate. `thorough` retains per-direction critique.
- Default to six distinct directions with three product-selected screens, comparable content and contextual design guidance. Preserve owner constraints, next-round survivors and undecided feedback.
- Publish ready drafts progressively to Design Lab or standalone; support native editable Figma with capability checks. One publisher, at most three builders, explicit ready IDs, artifact fingerprints and reconciled resume.
- Repair URL relocation, shared-preview writes, incomplete final assembly, metadata identity handling, desktop composition and browser failure/cleanup. Add batch capture/checks and conservative reuse of unchanged evidence.
- Replace compulsory style prescriptions and long entry instructions with focused role/target references. Keep feedback/extraction compatibility and existing browser-selection and lessons edits.
- Validation: two matched six-direction normal/lite cases with actual rendered output and fresh anonymous evaluation; targeted repairs and raw failures retained. Thirty-one focused helper/workflow regressions and a real six-board editable Figma pilot. Detailed evidence is preserved in the sibling mood-board-lab/v8-20261108T093057Z folder; post-trial mechanical corrections are distinguished from the frozen creative trial revision.

## 7 — 2026-10-06

From Dream Catcher Rounds 2–7 (six rounds in one day): R2's "friendly, modern" round of contemporary UI styles was
rejected as gimmicky, thin "trend skins"; R3, rebuilt around the product's essence and compared with real App Store
screenshots of the owner's reference apps, gave the owner's favourites, and R4–R7 converged from them. The owner's own
summary: results improved when every round demanded depth, character, professionalism and production level.

- **Production bar** (`SKILL.md` 0b, `references/guidelines-template.md` §1 + §4.5, `build.js` STANCE and both
  critics): depth, character, professionalism and restraint defined as pass/fail; gimmicks banned unless licensed;
  critics judge "below the bar" first.
- **Essence-led directions** (`foundations.js`): the product lane extracts 5–7 product truths; every candidate starts
  from one and names its reference level; a default proposer lens is the essence; UI trends as directions are banned.
  The brief template gains an "Essence · level" field.
- **Quality bar from real apps** (`run.md` step 0.3, settings table): ask which app families feel right, fetch their
  App Store screenshots into one sheet, pass it as `bar.good`.
- **Converging rounds** (`next-round.md`): two multiple-choice questions when a round is rejected without reasons;
  best-of-screen references as binding rows; feedback "nevers" made measurable; unmentioned = kill; family rounds
  (ladder, fences, blends); added screens; lead-made images for hybrids; several rounds in parallel; relaunching a
  round whose critic died.
- **Build traps made mechanical** (`check-round.py`): missing `img/…` paths, image-file CSS masks (dropped on
  `file://`), `url()` in Tailwind classes, SVG ids containing "new". `build.js` names the same traps, forbids agents
  to start or restart servers, sizes previews and critic shots to the board width, and states the real board width.
- **`check-strings.mjs`** treats ’ “ ” as ' ".
- **`run.md` step 4:** shoot the final strips from the static build over `file://`; dom-audit's lowContrast on text
  over art can be a false positive.
- **`references/lessons.md`:** the Dream Catcher R2–R7 entry.

## 6 — 2026-10-04

From Dream App Round 1: a by-the-book 20-variant run came out as typographic posters and was rejected; a redo from a
UX layer and a short lead-written brief gave ten real-looking apps on the first build.

- **UX layer before the brief** (`run.md` step 0.2, `SKILL.md` principle 0): `screens.md` with every block per screen
  plus grayscale wireframes; briefs ask for real app components instead of banning them.
- **`build.js` `bar`** (`{good, rejected}` screenshots): the realism level builders compare against at every pass.
- **Any screen count:** `build.js` sizes boards to N × 402 + (N − 1) × 40; `assemble-round.py` adds zoom steps for
  rows that aren't three wide (a four-screen round rendered „very zoomed in").

## 5 — 2026-10-03

From Kas pirmas: the process docs of lab Rounds 2–7 lived in task folders that were removed from the working tree on
2026-10-01, so the verdict tables and the extraction that chose the design system survive only in git history, where
nothing points to them.

- **Process docs default to a committed folder beside the output** (a Design Lab's `process/`, else
  `<output>-process/`), and a docs/tasks folder only on request. Either way, each round's `feedback.md` and the final
  `extraction.md` stay committed with the design repo (SKILL.md settings table, `next-round.md` §4).

## 4 — 2026-09-28

From Kas pirmas lab Rounds 2–3, which ran a leaner build (21 agents, 35–45 min, about 3 M tokens for ten variants)
than v3's default (31 agents), and from the user: too many critics and rounds at the end.

- **`build.js` speed mode = build → round critique → refine.** The round critic now also judges every board and names
  each variant's worst faults (2–6 must-dos, must-diverge first); the per-variant critic runs only with `thorough`,
  which no longer adds a second critique/refine loop. Ten variants: 21 agents, not 31 (thorough: 31, not 51).
- **The round critique is on by default:** it assembles the page from `target.roundJson` (now accepted for a lab
  too); `assemble` and `roundUrl` became overrides. Without a round page every variant gets its own critic instead.
- **`done`** replaces `resume`: the stages already on file (`build`, `roundCritique`, `critique`, `refine`); builders
  and refiners continue from files an interrupted agent left.
- **`foundations.js`: one critic per review.** The guidelines get one critic through the three lenses (slop, brand,
  craft) instead of three critics; the brief gets one critic through the two lenses, which in speed mode writes
  `review-findings.md` itself (the separate findings writer is gone) and picks one fix where a finding offers options
  (`lessons.md`, Repperoni R2–6: an either/or finding left the choice open). Ten variants: 15 agents, not 19.
- **`assemble-standalone.py --keep-previews`** (the workflow README already promised it); **`page-shot.mjs`**
  documents `--settle` in milliseconds (prompts had passed seconds).
- **Variant themes (design-lab target):** an optional `round.json` `"themes"` key (1–4 palette names per variant) makes
  `assemble-round.py` add a theme switch per variant and one round-wide switch above the compare strips; the lab's
  sheet drives them. Designs follow a CSS contract: theme 1 on `.rR-vNN`, themes 2–3 under `[data-vt="N"] .rR-vNN`;
  `#vt=N` opens a screen in a theme. From the user (Kas pirmas, before Round 5): "per each variant have 3 theme options
  able to select in the UI". Without the key, the output is byte-identical to before.

## 3 — 2026-09-25

From Kas pirmas Round 1: 15 directions that passed every mechanical check and still read as one grey app next to
Repperoni's round (`references/lessons.md`).

- **Expression audit** (`guidelines-template.md` §6.5): guardrails get their narrowest translation, never a global
  chroma cap or mood default; the guidelines count the legal positions left on luminance, hue family, colour
  intensity, display genre and peak mode, and fewer than 3 on any means loosen or ask the user. The slop critic now
  also hunts over-constraint.
- **Colour intensity is a matrix axis** with a floor (≥ N/2 saturated field or ground, neutral ≤ N/4) in `method.md`
  and the template.
- **`scripts/palette-sheet.py`**: the selector writes `palettes.json`; the sheet shows every palette as a proportional
  strip and exits 1 when the round is too grey. The lead looks at it before building.
- **Round critique** in `build.js`: after all builds, one critic shoots the compare strips (and desaturated) and writes
  per-variant must-diverge verdicts that bind the critics and refiners. Builds now finish before critiques start.
- **`resume`** arg in `build.js` for outages (an auth drop killed 12 of 43 agents).
- **`verify-screens.mjs`** no longer fails a screen for a font it links but doesn't use (builders were hiding glyphs to
  pass it).
- **`run.md`**: ask before standing rules collapse an axis; copy workflows into the workspace (the Workflow tool
  refuses a skill-folder `scriptPath`); a scratch dev server rooted at `src/index.html` when the user's is down.

## 2 — 2026-09-25

From an adversarial review: a fresh agent dry-ran the skill for a very different product (a calm savings app, no PRD,
no wireframes, no borrowed sources), and an integrity pass checked every path and script.

- **Any product, any folder.** "Workspace" means the product's folder, not the current directory. A **product brief**
  path covers products with no sources. New settings: market/locale/currency, who is on screen (two-person and
  cooperative products never rank or race people). Process docs default to a sibling `<output>-process/`, so they never
  ship with the moodboards.
- **The peak, redefined:** the moment the key number changes state. Each variant gets a peak mode (loud or quiet), and
  one rule in `references/method.md` replaces three contradictory "the celebration must be loudest" rules.
- **Category clichés:** the domain lane lists the category's default kit and default screens (`generic-tells.md` §2.5).
  They become anti-generic rows and caps, and the no-wireframes baseline for critics.
- **Less sameness:** groups proposing more than 4 candidates are split across proposers, each with its own lens.
- **Checks that check:**
  - new `check-strings.mjs` (identical content across variants);
  - new `dom-audit.mjs` (overlapping tap targets, contrast; R1 had 7 of 10 Homes with overlapping targets that no
    screenshot showed), now run by builders, critics and the lead;
  - `verify-screens.mjs` catches pages that never load, misspelled Google Fonts and console errors;
  - no script crashes without arguments;
  - unbuilt variants fail the check.
- **Rounds:** assembling a round rewrites the tabs on every earlier round. The lab checker reads the round's flow, and
  build results carry their variant id.
- Caps scale with round size (`cap_N = max(1, floor(cap_10 × N / 10))`). Board width is given for 2 or 4 screens. One
  title format: `R{R} V{NN} · <Screen>`. The Design Lab install adds the header-controls include that template-made labs
  lack. Recovering from interruptions is in `lessons.md`.

## 1 — 2026-09-25

First version, distilled from Repperoni Round 1 (10 directions, 30 screens, Design Lab target):
- the process (`run.md`, `next-round.md`);
- two args-driven workflows (`foundations.js`, `build.js`);
- the knowledge base in `references/`: generic tells, craft floors, method, vernaculars and direction patterns, the
  guidelines and brief templates, critique patterns, images, lessons;
- phone-true screenshot and verification tools;
- two output targets: **standalone** (new, the default: static HTML anywhere, no build) and **design-lab** (sheets +
  rounds, with an install guide for labs that lack them).

Target-agnostic by design: the user decides where the moodboards and the process docs go.
