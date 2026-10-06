---
name: mood-board-creator
description: 'Create premium, genuinely creative UI/UX moodboards for an app: a researched design-guidelines document, then a round of clearly different visual directions. Each direction is a style-tile board plus live hi-fi mobile screens, built and critiqued from real screenshots, and all of them sit on one scrolling round page with compare strips. Use this whenever the user wants moodboards, visual directions, design explorations, style tiles, art direction, "variants of the app", "different design possibilities", a design round, or a next round from feedback (keep / push / kill), or wants an app to look premium and not AI-generic, even if they never say "moodboard". Works for any product. Output goes wherever the user says (a standalone static HTML folder by default, or a Design Lab workbench). Not for implementing a chosen design in production code or maintaining a design system.'
---

# mood-board-creator

Runs **rounds of divergent visual directions** for an app and presents them as moodboards people can judge. A round
is:
- **design guidelines** written for this product before any pixels, researched and adversarially reviewed;
- **N directions** chosen for maximum divergence. Each has a **board** (a style tile stating its bet, signature, palette,
  type, the defaults it refused, and its costs) above **live hi-fi screens** at true phone size, built from screenshots and
  critiqued by fresh eyes;
- one **round page**: a cover, every variant, and compare strips (the same screen across all variants), with tabs to
  later rounds.

It's multi-agent work: two workflows plus inline glue. The Repperoni Round 1 run (10 directions, 30 screens,
2026-09-25) is the worked example it was distilled from. See `references/critique-patterns.md` and
`references/vernaculars.md`.

## What makes these moodboards excellent

This is the core of the skill. Everything else is plumbing.

0. **Real apps, not posters.** Every variant is an app someone could download: status bar, header icons, rows,
   chips, a tab bar with icons and labels, pressable buttons, images where its world has them. That comes from a **UX
   layer** written before the brief (`run.md` step 0.2: every block per screen, plus grayscale wireframes) and from a
   brief that asks for components instead of banning them. Two rounds failed on this alone (`references/lessons.md`).
0b. **Production level: depth, character, professionalism.** The owner judges at App Store level, next to the apps
   they admire, so say that out loud in every round and hold everyone to it:
   - **A real quality bar.** Ask which apps have the feel they want (a multiple-choice question with 3–4 app families
     from the category), fetch real screenshots of those apps (`run.md` step 0.3), and pass the sheet to the build as
     `bar.good`; the last rejected strip is `bar.rejected`.
   - **Directions grow from the product's essence**: 5–7 truths of the product (its promise, its ritual, its
     differentiators), each direction starting from one. Never a UI trend or style applied on top (bento, glass,
     clay, stickers, a mascot, stat-card "Wrapped"): Dream Catcher R2 did that and was rejected as gimmicky, thin and
     "trend skins"; R3, rebuilt from the essence against real reference screenshots, gave the owner's favourites.
   - **Depth** (a hero moment, three surface levels, imagery in one consistent hand), **character** (one idea in a
     sentence) and **professionalism** (a real type pairing, disciplined palette, pressable buttons, data that reads
     at a glance) are written into the guidelines as the bar, and every critic judges against it first
     (`references/guidelines-template.md` §4.5).
1. **Guidelines before pixels.** Generic output is the default for AI design. It's avoided by writing, for this
   product, what "good" and "off-limits" mean: principles with tension, guardrails, the anti-generic calibration list,
   and measurable craft floors. Only then does anything get drawn. `references/guidelines-template.md` gives most of
   it pre-written; only the product-specific parts need research.
2. **Room to diverge, audited.** Every guardrail subtracts. Translate each into its narrowest rule (never a global
   chroma cap or a mood default), then count what's still legal on luminance, hue, colour intensity, display genre
   and peak mode; fewer than 3 positions on any, loosen or ask. Kas pirmas R1 skipped this and 15 variants came out
   one grey app (`references/guidelines-template.md` §6.5).
3. **Divergence is designed, not hoped for.**
   - Over-supply candidates (about 1.7× the slots), then select against a **diversity matrix** (luminance, hue family,
     display genre, number treatment, containment, density, imagery, texture, peak mode, energy…).
   - **Cap** shared devices (e.g. at most 3 dark-first, 1 mascot).
   - Prove the **nearest pairs** differ on at least 3 axes.
   - See `references/method.md`.
4. **Every direction is grounded.** It borrows from a named source (the brand's site, an inspiration board) or one
   real-world object's system (a teletext page, a pool, a show card). It states its bet as
   "<Product> as ___, because ___". Vernaculars give it type, colour and layout habits that aren't defaults. See
   `references/vernaculars.md`.
5. **One signature per variant, landing on the product's key number or moment.** Everything else stays quiet. Before
   handing in, remove one accessory.
6. **Identical content in every variant**, and the numbers tell one small story across the screens, so reviewers
   compare the look and not the data.
7. **Real screens, true size, designed from screenshots.** Builders look at phone-accurate captures (390×844 @2x) at
   least twice and run the mechanical checks themselves. Then a **round critic** who built none of them looks at all
   variants side by side (the compare strips, desaturated, and every board) and gives each its must-dos: look-alike,
   too grey or weak signature first, then its worst faults. Each builder refines from that. See
   `references/craft-floors.md` and `references/critique-patterns.md`.
8. **Imagery is judged for what it implies**, not only for realism. In Repperoni's case, "friends filming a rep" read
   as proof and surveillance, which the brand rejects. See `references/images.md`.

## Before you start: settle these (ask only for what's missing)

**The workspace is the product's folder**: where its code, docs or brand live. Usually that's the folder the user
points at, or the parent of the output folder they named. It is not simply your current working folder, which may
belong to another project. Only take sources from a folder that is clearly about this product. If none exist, say so
and use the no-sources path below.

| Setting | Default if the user doesn't say |
| --- | --- |
| **Where the moodboards go** (the target) | A Design Lab if the workspace has one and the user wants it there. Otherwise **standalone**: a folder the user names, else `<workspace>/moodboards/` |
| **Where the process docs go** (PLAN, PROGRESS, research, guidelines, brief, notes) | A committed folder in the repo that holds the output: a Design Lab's `process/`, else a sibling `<output>-process/` folder. It stays outside the output, so it never ships with the moodboards. Use a docs/tasks folder only if the user asks: task folders get cleaned up, and each round's `feedback.md` and the final `extraction.md` are the design system's decision record. If the user does pick a tasks folder, copy those two files into the output's repo when the round closes |
| **Product sources** | Find the PRD, strategy, brand voice and wireframes in the workspace, then list what you found and confirm it. **No sources?** Draft a short *product brief* in PLAN.md and have the user confirm it: audience, market, voice (plus 3 words it never uses), the product's never-rules, the key number, the tabs, what the peak moment is. It then counts as the source |
| **Market, locale, currency** | Ask if it changes the content (money, dates, spelling). Otherwise infer it from the brief and state it |
| **Quality bar** (reference apps) | Ask: "Which apps have the feel you want?" (multi-select, 3–4 families from the category, e.g. atmospheric wellbeing · polished journaling · premium insight · editorial). Fetch real screenshots of the picks into one sheet (`run.md` step 0.3) and use it as `bar.good`. Without an answer, pick the category's best-reviewed apps and say so |
| **Who is on screen** | The viewer plus the other people the product shows (a crew, a partner, nobody). This decides whether anything ranks people: for two-person or cooperative products, nothing ever ranks or races them |
| Screens + the flow between them | **3 or 4**: a tab root with a list (home), the core screen or action, and the **peak**, the moment the key number changes state (a goal reached, an order placed, a result). The peak's mode can be loud or quiet per variant. Board width = N × 402 + (N − 1) × 40 (1286 for three, 1728 for four); `build.js` and the lab assembler size boards and the page's zoom from `screens` |
| Groups and count | e.g. 10 = 3 from the brand's own site + 3 from an inspiration source + 4 originals. With no sources, 5–8 originals split into 2–3 groups by lens (places, record-keeping objects, contemporary systems…), so no single proposer invents them all |
| Mode | **speed**: build → one side-by-side round critique → refine, with mechanical checks by script. **thorough**: adds a fresh-eyes critique per variant before the refine (worth it for ≤ 6 variants, and for any round that follows a rejection on quality: Dream Catcher R3 and R7 ran 10 variants thorough, about 1.5–2 h and 6.5–7 M tokens, and produced the owner's picks) |
| Images | Only if a direction needs them. Cheapest model for avatars, mid-price for scenes (`references/images.md`) |

The output target changes only file paths and the page shell. The design process is identical.

## The run

Full step-by-step, with commands for both targets: **`run.md`**. Summary:

0. **Scout and set up** (inline).
   - Read the sources and settle the table above.
   - Write `PLAN.md` / `PROGRESS.md` in the process folder, including a first content spec.
   - Prepare the target (standalone: create the folder and copy the page assets. Design Lab: check it has sheets and
     rounds, else install them from `targets/design-lab.md`).
   - Prove the tools with one probe screen.
1. **Foundations workflow** (`workflows/foundations.js`):
   - research lanes for the project only (each borrowed source, the product and content, the product's domain and
     vernaculars);
   - guidelines from the template, reviewed by one critic through three lenses, then revised;
   - directions: oversupply per group → select into `round-N/brief.md` → one critic through two lenses. In speed mode
     it writes its findings as binding on the builders.
2. **Photo library** (inline, optional): generate only what the brief lists, check each image, compress it once, and
   share it.
3. **Build workflow** (`workflows/build.js`): every variant builds in parallel, one round critic judges them side by
   side, then every variant refines from it. Groups that wait on a brief supplement start later.
4. **Assemble and verify** (inline):
   - the cover board, then the assembler;
   - the static checks, `verify-screens.mjs`, `dom-audit.mjs` and `check-strings.mjs`;
   - screenshots of the cover, every variant and the compare strips. Look at the strips side by side.
5. **Hand over:** the round's URL or path, one line per variant (bet + signature), the known issues, what was trimmed,
   the image cost, and the feedback format.

Later rounds converge from the user's keep / push / kill feedback: **`next-round.md`**.

## Output targets

| Target | What you get | Read |
| --- | --- | --- |
| **standalone** (default) | `<out>/round-NN/index.html` + `vNN/` folders + `assets/` + `img/`. Static HTML/CSS, Google Fonts, Lucide from a CDN, no build step. It opens from disk or any static host, and phones scroll like the lab's. | `targets/standalone.md` |
| **design-lab** | Round pages inside a Design Lab workbench (`src/explorations/round-NN.html`), using its hot reload, `yarn links` and hosted gallery | `targets/design-lab.md` |

## What's in this skill (read on demand)

| Path | Read it when |
| --- | --- |
| `run.md` | Running a round, as the lead |
| `next-round.md` | Running Round 2+ from feedback |
| `workflows/README.md` | Launching either workflow: every arg, with examples |
| `workflows/foundations.js`, `workflows/build.js` | The workflow scripts. Run them with `Workflow({ scriptPath, args })`; their prompts are the agent instructions |
| `references/README.md` | The index of the knowledge base: which file each role reads |
| `references/generic-tells.md` | Anyone designing or critiquing: the AI-default calibration list and the alternatives |
| `references/craft-floors.md` | Builders and critics: measurable mobile quality floors and reference apps |
| `references/method.md` | The lead, selector and board writers: principles, the diversity matrix, caps, the board, judging, convergence |
| `references/vernaculars.md` | Proposers of original directions: vernacular catalogue plus direction patterns from earlier rounds |
| `references/guidelines-template.md` | The guidelines writer |
| `references/brief-template.md` | The selector, plus anyone writing a mid-run supplement |
| `references/critique-patterns.md` | Builders (to pre-empt) and critics (to calibrate) |
| `references/images.md` | Whoever makes the photo library |
| `references/lessons.md` | The lead, before starting: what went wrong last time and how to avoid it |
| `scripts/` | `screen-shot.mjs` (phone-true capture), `page-shot.mjs` (board + phones / round page), `verify-screens.mjs` (runtime checks), `dom-audit.mjs` (overlapping tap targets, contrast, small text), `check-strings.mjs` (the content spec's strings on every screen), `palette-sheet.py` (every variant's palette on one sheet; fails a too-grey round), `cdp.mjs` (headless Chrome driver), `assemble-standalone.py` + `check-standalone.py`, `design-lab/assemble-round.py` + `check-round.py` |
| `targets/` | The two output targets: their contracts, templates and assets |

## Rules that protect the run

- **Workflows need the user's go-ahead for multi-agent work.** Asking for this skill ("create moodboards…") is that
  go-ahead unless they say otherwise. Tell them what a round costs. Repperoni R1 (10 variants) took about
  5 h end to end including research, about 2 h of that in the build workflow, and roughly 10 M subagent tokens. The
  leaner build (round critique only, since v4) took 35–45 min and about 3 M tokens for ten variants. Fewer
  variants scale down roughly linearly; research is fixed.
- **Parallel agents own disjoint files.** Only the assembler writes the round page. Never edit the brief while
  builders read it; write a supplement instead.
- **Never message a running workflow agent by its id.** It resumes a duplicate. Stop the workflow and pass a file to
  the next phase instead.
- **Nothing outside the output and process folders gets written**, except a Design Lab's sheet install when that's the
  target. No commits unless asked.
- **Dev servers belong to the user.** In a Design Lab, never run `yarn build` or `yarn dev`. Verify with a scratch
  build and a fresh cache. If the server stops, ask the user to restart it. **Check what a port serves** before using
  it (another project's lab can hold :1234); if you run a scratch server, it is yours alone — **no agent ever starts,
  stops or restarts a server** (an R4 builder replaced the lead's with a narrower one and later builders lost their
  previews). After a final assembly deletes previews, or when a build error persists after its cause is gone,
  restart your scratch server with a fresh `--cache-dir` (Tailwind keeps stale classes from half-written files).
- **Log every phase in PROGRESS.md** with evidence (commands and their output). A trimmed step is logged as trimmed.
- **If a run is interrupted** (a usage limit, a crash), lose nothing:
  - read each workflow's journal to see which agents finished;
  - check the target files' modified times for half-written edits;
  - stop the dead workflow before relaunching;
  - relaunch with a resume guard in each prompt.

  See `references/lessons.md`.
