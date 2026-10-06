# Lessons from past runs (read before starting a round)

Each entry is: what happened, then what to do. Newest run first. Add a section after every round.

## Dream Catcher Rounds 2–7 (2026-10-05): trend skins rejected; essence + a real quality bar won

Six rounds in one day (10, 10, 6 + 6 + 6, 10 variants) in a Design Lab. R2 ("friendly, modern" — bento, sticker pop,
clay, Material Expressive, Wrapped, a mascot…) was rejected: "not very good". Asked why (two multiple-choice
questions), the owner picked **gimmicky / childish, not rich enough, felt like UI trend skins**, and named four families
of reference apps. R3 rebuilt the guidelines around the product's **essence** and **production bar** and compared every
build with **real App Store screenshots** of those apps: the owner loved two of its ten (Dawn, Painted nights). R4–R6
explored them as families (photography only / painted only / blends) and R7 converged on the artworks plus the
clearest screens from earlier rounds.

| What happened | Do instead |
| --- | --- |
| R2's directions were contemporary UI styles applied to the product; each was well built and the round still failed | Directions start from a product truth (the essence) at the level of named reference apps; trends and gimmicks are banned unless the brief licenses one (`SKILL.md` 0b, guidelines §4.5, `foundations.js`) |
| "Not very good" with no reason | Ask two multiple-choice questions (what felt wrong · which apps feel right) before writing a word (`next-round.md` §1) |
| Builders had a realism bar but no quality bar | Fetch App Store screenshots of the picked apps into one sheet and pass it as `bar.good` (`run.md` step 0.3); critics judge "below the bar" first |
| Feedback named the best screens across rounds ("R1 V02's buttons and Journal data", "R6 V04's playbar") | Make them binding round-wide references (guidelines row + the file to open); every R7 variant met them |
| "The moon shouldn't be the main focus" | Turn a feedback "never" into a measurable rule (glyph or ≤ 6 % of image width) and a never-list line; replace parent images that break it |
| R6 V04's pastel hero rendered blank in the static build: Chrome drops `mask-image: url(img/…)` on `file://` | Inline masks as data URIs (once, in a custom property); shoot the final strips from the static build; `check-round.py` now fails image-file masks |
| An SVG `<symbol id="…new…">` was rewritten to `id=new` by the minifier and `<use>` broke (R1 V08, R5 V03) | No ids containing "new"; `check-round.py` flags them |
| An R7 builder copied its parent's CSS and renamed `img/r5-v01-*.jpg` to `img/r7-v01-*` → the whole lab build failed | Rename selectors and keyframes only; `check-round.py` fails missing images |
| A half-written `bg-[url(img/…)]` Tailwind class broke the lab build, and the dev server kept the stale class after the file was fixed | Never `url()` in Tailwind classes; restart the scratch server with a fresh cache when an error outlives its cause |
| A Round 4 builder found the server down and started its own narrower one on the same port: later builders' previews were never served | No agent starts, stops or restarts servers (`build.js`); the lead checks what a port serves before each launch |
| :1234 was another project's lab; the lead noticed only from a wrong `<title>` | Check the title on every port before trusting it; run a scratch server with its own dist and cache |
| An account switch killed R6's round critic ("Not logged in"); the refines ran without it | Relaunch with `done: {build, critique}` so only the round critique and a second refine run |
| check-strings failed variants that used real apostrophes (’) | `check-strings.mjs` now treats ’ “ ” as ' " |
| The lead made the hybrids' images before the build (13 images, parent prefixes copied from notes) — two rejected (a stray dot, a paper border), two cropped | Keep it: one hand per variant, checked once, no builder generating images |

**Numbers:** thorough rounds of 10 (R3, R7): 31 agents, 6.5–7.1 M tokens, 1 h 28 m–1 h 53 m. Family rounds of 6 in
parallel (R4–R6, five screens): 19 agents each, about 4.9 M tokens and 2 h 10 m–2 h 30 m each. Images: Seedream 4 at
$0.027; 13–25 per round.

## Dream App Round 1 (2026-10-04): 20 typographic posters rejected, then 10 real apps from a UX layer

The first run went by the book (two research lanes, 54 KB of guidelines, a 1,429-line brief, 20 builders) and the
owner called the drafts „absolutely awful… really low quality". Next to a round the owner liked, the cause was plain:
ours were typographic pages (big generic serifs, walls of text, bare word tab bars, no rows, no icons, no imagery). It
was Kas pirmas R4's lesson again, which this file already held and nothing enforced. The redo — a UX layer first, a
~200-line lead-written brief, no foundations workflow — gave ten screens that read as real apps on the first build.

| What happened | Do instead |
| --- | --- |
| No wireframes or per-screen inventory existed, so the brief invented structure, and builders read „the content spec" as a list of strings to typeset | **UX layer before any brief** (`run.md` step 0.2): `docs/ux/screens.md` — every block per screen in priority order, PRD pointers, chrome, tabs, flow — plus grayscale wireframes. Variants restyle and may restructure; leaving a block out is not allowed, adding real app components is |
| The brief banned what apps are made of („nothing else goes on a screen", tab icons, imagery) and measured everything | Ask for components (rows, chips, segmented controls, icon tab bars, imagery where the world has it); ban almost nothing. A short brief the lead writes beat the long selected one |
| Directions were object metaphors drawn *as typography* (a glass of water, a woven inscription), so the UI became the poster | Each direction states its chrome (tab bar, cards, chips) and how its world shows in material, colour, type and one signature — never by replacing the UI |
| Builders never saw what „good" looked like | `build.js` `bar: {good, rejected}`: one screenshot of the realism level wanted (any product) and one of the rejected attempt; builders compare at every pass |
| 4 screens (Today, Capture, Journal, Reading) made the boards 1728 px; the lab sheet only steps down rows of three, so the page rendered „very zoomed in" | `assemble-round.py` now writes zoom steps for any screen count; `build.js` sizes boards to N × 402 + (N − 1) × 40 |
| The rejected round's 3 screens had no list screen; the app's journal and night capture were missing | Pick screens so the round shows the app's real kinds of screen: a tab root with a list, the core action, the peak; 4 is fine |

## Kas pirmas lab Round 4 (2026-09-28): „the top-tier modern standard" — dull first drafts, fixed in one pass

The full run (three benchmark research lanes, guidelines, a 2,161-line measured brief: 2 h 40 min, 4.2 M tokens) gave
ten builds the user called „absolutely dull and ugly", and none had tab navigation. A lead-written fix brief and one
parallel fix pass (27 min, 2.0 M tokens) turned them into real apps.

| What happened | Do instead |
| --- | --- |
| The brief banned or capped most of what real apps are made of (tab bar, charts, weakest topics, „nothing else goes on a screen", icons in buttons, entrance motion) and measured everything; builders complied instead of designing: ten question screens with one skeleton, homes as a number in a void, verdicts as text stacks | Give each screen its product's real content and chrome (read the product spec for what each screen holds). Cap sameness, never ban components. A long, measured brief is not a better brief |
| A copied „navigation … (or none)" in PLAN became a round-wide „no tab bar on home", and the lead passed it at the check | Tab roots show the product's real navigation. Check the brief's round-wide decisions against the product spec before building |
| The refine stage would only have polished dull screens | When the builds read dull, stop the workflow, name the causes, and run one parallel fix pass: a lead-written fix brief that overrides the brief, and each fixer putting its screens next to its benchmark's screenshots |
| The lead's scratch Parcel server died mid-run (FSEvents dropped events); fixers worked around it on static copies | Check the server between phases; tell agents to report a dead server at once |

## Kas pirmas lab Rounds 2–3 (2026-09-27/28): ten each, build → round critique → refine

Lead-written briefs with a palette-sheet gate before building, then a lean build: ten builders, one round critic,
ten refiners, no per-variant critic. Each round: 21 agents, 0 errors, about 3.0 M tokens, 35 min (R2) and 45 min (R3,
sharing the machine with R2's gates), all gates green. This became the default build in v4.

| What happened | Do instead |
| --- | --- |
| Both briefs failed the palette sheet first ("too grey") and were recoloured before anyone built | Keep the gate before the build; it is the cheapest critic in the run |
| The side-by-side critic's 2–6 changes per variant did the work the ten per-variant critics used to; Homes came out ten different characters | Speed mode = build → round critique → refine. Keep the per-variant critic for `thorough` |
| The question screen converged in all ten (scene on top, stacked option cards): the round critic named it, but refiners changed material, not structure | Structure is set in the brief, not in the refine. Sketch every screen per variant in the brief (not only Home), so the shared skeleton is caught before anyone builds |
| Prompts said `--settle 6` / `--settle 10` meaning seconds; `page-shot.mjs` reads milliseconds, and only the home strip loaded from the busy server | `--settle 8000`. Shoot the final strips from a scratch production build over `file://` |

## Repperoni Rounds 2–6 (2026-09-25/26): four family rounds of 6 + a bonus round of 10, in one run

The user kept four Round 1 directions and asked for "a deeper exploration of possibilities" of each, plus ten fresh
ones. 34 variants, 102 screens, all gates green; one foundations workflow for all five rounds, then two build
workflows in parallel (8 agents each). Process docs: `wiki-rep/tasks/004-ui-explorations/` (PLAN "Rounds 2–6",
`content-spec.md`, `tools/build-rounds.js` — this skill's build.js extended to several rounds).

**What made the family rounds work**

| Device | Why it mattered |
| --- | --- |
| A **distance ladder** per family (1–2 near · 2–3 mid · 1–2 far) and "keeps / changes" on every board | Six variants of one idea stay six ideas: the near one is the parent done right, the far ones are neighbouring objects of the same world |
| **The parent's Round 1 screens open every compare strip** (the assembler takes a `control`) | The round critic judged "reads as the parent re-coloured" directly; it caught R2's Homes as one skeleton on four grounds |
| **Fences between families** (chalkboards / scorecards / whiteboards / pools) and a bonus round that uses none of them | No family drifted into another's world |
| One shared `content-spec.md` for all rounds (R1 §4 + the review findings that changed content) + one `strings.json` | Rounds compare across each other; builders read one file, not three |
| 1–2 **crew-led** rooms per round (an open question from R1 answered by showing it) | Turns a board's "feedback we want" into a real alternative |

**What went wrong, and the fix**

| What happened | Do instead |
| --- | --- |
| Family briefs were selected in parallel and **two rounds picked the same display faces** (Bevan, Special Gothic); the finding offered either round the change and only one round's findings mentioned it | Keep a cross-round face registry in PLAN before the selectors run; when a finding offers options, the lead picks one at once and writes it into *both* rounds' findings |
| **A "200" was not the right app.** The user's :1234 went down and another project's Design Lab (same template, its own `screen-r2-v05.html` in Lithuanian) took the port; Parcel also answers unknown paths with a fallback page | Check the page's `<title>` / `lang` / a known string, never the status code. Tell agents the product name to expect in titles; the critics here noticed and discarded the wrong pages, the lead's first check didn't |
| `parcel serve` **exits right after its first build** when stdin closes (a background shell) | Feed it `tail -f /dev/null \| npx parcel serve …` |
| Assembly deleted the builders' preview pages and the running **scratch server broke on the deleted glob entries** — a restart on the same cache kept failing | After `--final` assembly, restart the scratch server with a **fresh `--cache-dir`** before the lead's gates |
| The user switched servers twice mid-build (kill the scratch one → use theirs → kill theirs → back to scratch). Running agents keep the URL in their prompts | Make the server URL an arg; relaunch with a "done" list per stage (builds, round critiques, critiques, refines) so nothing finished reruns. Ask the user once what agents should use, with options |
| The relaunch resolved "critique already on file" as `null`, and **`pipeline()` drops an item whose stage returns null** — 17 refines silently never ran (`ok:false`) | Never resolve null for a skipped stage; resolve a marker (`{fromFile: true}`). After every workflow, check the files (each refine appends "Changes after critique") against the variant list, not only the return value |
| zsh does not word-split `$ids` in `for id in $ids` — a 13-shot loop wrote one file named after all of them | Run list loops under `bash -c` or use `${=ids}` |
| A heavy round page (20+ live phones) **hung `page-shot.mjs`** while agents loaded the same server | Shoot from the scratch production build over `file://` (no server load), with a time limit (`perl -e 'alarm 150; exec @ARGV' …`) and `--settle 8000`–`12000` (milliseconds: `--settle 8` waits 8 ms) |

**Numbers worth reusing**

- Foundations for five rounds at once (11 proposers, 5 selectors, 10 reviewers, 5 findings writers): 31 agents,
  7.7 M tokens, 1 h 52 m. Family briefs came out at 1,500–1,700 lines, the bonus at 2,300.
- Build → critique → refine for 34 variants plus 5 round critiques, split over four relaunches: the completed
  workflows alone used 12.5 M tokens (the stopped runs aren't reported); critiques and refines take 20–50 min each
  under load.
- Photos: 7 board mood images on Seedream 4 at $0.027 = $0.19; one needed a crop (a garbled brand script on an oven).

## Kas pirmas Round 1 (2026-09-25): 15 directions, judged "really poor" next to Repperoni's

Everything mechanical passed (15/15 checker, 45/45 strings, no tap-target or contrast faults, a clean production
build), and the round still failed: at thumbnail size the 15 read as one grey app in 15 costumes. The process ran as
designed; the guidelines had removed the room it needed.

**Why it came out grey**

| What happened | Do instead |
| --- | --- |
| The guidelines writer turned product guardrails ("never compete with the scene renders", "no signal colours as decoration", no purple/brown families, no deep navy) into **global caps**: "no UI colour above OKLCH C 0.10 on screens 2–3", "allowed chroma lives in the cool arc at low C", "full-screen ground change 0", "calm is the default register". Each rule was defensible; together they deleted the hue, saturation and luminance axes | Translate a guardrail into the **narrowest** rule that protects it (ban the signal hue ranges, frame the scene with a keyline) — never a chroma cap or a mood default. Then run the **expression audit** (guidelines-template §6.5): list the legal positions left on luminance, hue family and colour intensity; fewer than 3 on any of them means over-constrained — loosen, or ask the user which rule to relax |
| The lead passed the user's standing rules (light only, colour bans) into PLAN.md as binding without asking whether they still fit a *divergent* round | When standing rules would collapse an axis, show the user the cost before foundations run ("these rules leave mono/sage/teal only — keep them?"). Here the user relaxed them at once when asked after the fact |
| The diversity matrix measured subtle axes (rail, bar, frame, containment) and let 13 of 15 be mono or tonal; the "energy floor" counted only type size and weight contrast | The matrix has a **colour-intensity** axis with a floor: ≥ N/2 variants carry a saturated field (OKLCH C ≥ 0.12 over ≥ 30 % of one screen); neutral/mono ≤ N/4 unless the user asked for quiet. The selector writes `palettes.json` and the lead looks at `palette-sheet.py`'s sheet before any build |
| A very dense content spec (28 required strings on Home) plus a text-heavy peak (a 200-character legal quote) left little room for a hero; every Home became a list | Keep the content identical, but mark what may collapse behind one row; give the peak one thing that can be big |
| No one looked at the round as a whole until the lead's final strips. Repperoni's hand-run process had a whole-round critique before fixes | `build.js` now runs a **round critique** after all builds: one agent shoots the compare strips and names look-alikes and grey variants; each variant's critic and refiner must act on it |
| An auth drop ("Not logged in") killed 12 of 43 agents at the end | The journal shows it; relaunch only the lost stages with a restart note (continue from the current files). `build.js` takes `done: {build, roundCritique, critique, refine}` (the stages already on file) |
| `verify-screens.mjs` failed any screen that links a font it doesn't use (one head part serves all of a variant's screens), so builders hid glyphs to pass it | Fixed: only a family some element on the screen uses must be loaded |
| The Workflow tool refused a `scriptPath` inside the skill folder | Copy the workflow into the process folder's `tools/` and launch it from there |

## Repperoni Round 1 (2026-09-25): 10 directions, 30 screens, ~5 h wall-clock incl. research

**What made it good**

- **Guidelines before any pixels**, reviewed through three lenses. Critics later scored fidelity and originality high
  wherever the builder had followed the guidelines' anti-generic rules closely.
- **18 candidates for 10 slots**, selected with a diversity matrix, capped devices and a nearest-pairs table. In the
  compare strips the ten Finish lines were ten different ideas.
- **One content spec with a story** (9,980 / 10,000, then your 40 reps take it over). Reviewers compared looks, not
  data.
- **Builders designed from phone-true screenshots** (two passes), then a fresh critic re-shot and returned ≤ 10
  must-fixes. Most of the jump in quality came from the critique.
- **The board as a style tile with a thesis and costs.** It made each variant arguable in one read.

**What went wrong, and the fix**

| What happened | Do instead |
| --- | --- |
| **A usage/session limit killed two running workflows** mid-flight | Before relaunching: read each journal (which agents finished), check the target files' mtimes for half-written edits, and TaskStop the dead workflow so no stray agent writes alongside the relaunch. Relaunch with a resume guard in each prompt ("if the notes already record this change, only verify"). If an old `scriptPath` is refused, relaunch inline with the same script. Completed agents replay from cache with `resumeFromRunId` |
| **7 of 10 Home screens had overlapping 44 pt tap targets** in a dense feed (two links per row, the challenge and the person, stacked 5–20 px apart). Screenshots can't show it, and only one critic caught it by eye | Run `scripts/dom-audit.mjs` in the builder's self-check, the critique and the lead's gates. When the content spec puts 2+ links in a row, the brief budgets 44 pt per link line (or a row-level link) |
| Three generated photos showed friends **filming** someone's rep. For this brand that reads as "proof" and surveillance, and a direction review caught it | Check every image for what it implies (the guardrail check in `images.md`), not only realism. Write "nobody is filming or photographing anyone" into scene prompts when the brand is about trust |
| The prompt told builders Lucide icon files are `.js`. They're **`.mjs`**, so every name looked missing (the builders worked it out) | Use `ls …/lucide/dist/esm/icons/<name>.mjs`, or in standalone let `verify-screens.mjs` report icons that didn't render |
| **A borrowed source changed mid-run** (11 commits to the marketing site) | Recapture it with one agent, write a group supplement that supersedes the brief, and start that group later (`preBuild`). Don't edit the brief under builders |
| The brief's finalize step ran 20+ min while the user wanted speed | In speed mode skip finalize: write the direction reviews to `review-findings.md` and make them binding on builders |
| 2 critique rounds + a verifier per variant was too slow for 10 variants | Speed mode = build → critique → refine, with checks by script. Keep `thorough` for ≤ 5 variants |
| **The user's dev server stopped** mid-build. Builders fell back to an offline renderer, and the lead wasn't allowed to restart it | Say so to the user at once and ask them to restart it. The standalone target needs no server at all |
| A scratch production build **reused a stale Parcel cache** and reported phantom unresolved refs | Always build with a fresh `--cache-dir` |
| Headless Chrome's `--screenshot` **never exited** while the dev server's live-reload socket was open; `?bare` in a plain window wasn't 390 wide | Use `screen-shot.mjs` / `page-shot.mjs` (CDP, device emulation, own profile per run) |
| Variant **fonts via CSS `@import`** would break when a production build merges stylesheets | Fonts only via `<link>` (`head.html`) |
| **DM Mono's slashed zero** struck through a "0" score, and three variants from one family hit it | Check the face's zero (and 1/7 shapes) at the size a score will use. Tabular alternatives: `references/craft-floors.md` |
| Stencil / condensed faces **broke letters** at small sizes (a stencil "4" read as "4·0", a "d" split) | Stencil and heavy display faces go to ≥ 48 px only; smaller figures use the text face with `tnum` |
| **Boards ran long** (1,126–1,629 px against the build prompt's 560–760 aim, which six mandatory blocks can't meet) | Give builders the real numbers: six blocks in order, 13–15 px text, aim for about 1,100–1,400 px, hard cap 1,800 ([method.md](method.md) §10); let the critic cut |
| A scratch build, the dev server and a user's `yarn build` would all have written `dist/` | Nobody but the user runs the dev server or `yarn build` in a lab; verification builds go to a scratch `--dist-dir` |
| The lead messaged a running workflow agent by id (an earlier task) and got a duplicate agent on the same files | Never SendMessage a workflow agent. Stop the workflow, or pass files to the next phase |

**Numbers worth reusing**

- **Per-variant pipeline (speed):**
  - build 25–45 min, critique 10–15 min, refine 15–25 min;
  - 8 run at once on a 10-core Mac;
  - 10 variants ≈ 2 h;
  - the whole run ≈ 8.4 M subagent tokens for the build workflow alone.
- **Image costs:** Seedream 4 scenes $0.027 each; Nano Banana 2 avatars $0.07 (overkill; use z-image/turbo or
  flux-schnell at ~$0.005).
