# Running a round, as the lead

You orchestrate. Agents do the research, writing, building and critiquing inside two workflows. You scout, make the
calls between phases, generate the photos, assemble, verify and report. Keep the user posted with a line or two per
phase. When they change scope mid-run (a source got updated, "speed it up"), fold it in at the next phase boundary and
log it.

Paths used below:

| Name | What it is |
| --- | --- |
| `SK` | This skill's folder |
| `OUT` | The output (standalone folder, or the lab root) |
| `P` | The process folder |
| `SCR` | Your scratchpad |
| `R` / `RR` | The round number, and the same zero-padded (`01`) |

## Step 0: scout and set up (inline, ≈15 min)

1. **Read the material** from the product's workspace (see `SKILL.md`: not simply your current folder):
   - product sources: PRD or features, strategy, brand voice. If there are none, draft the product brief with the user
     (`SKILL.md`, settings table);
   - the wireframes (or screenshots) for the screens;
   - every borrowed source: open the site and look at the images.

   For round ≥ 2, read the previous round's feedback and `next-round.md` first.
2. **The UX layer: what each screen holds** (skip only if wireframes with every block already exist). Write
   `<docs>/ux/screens.md`: per screen, its blocks in priority order with the real strings, the PRD section each comes
   from, the chrome (header icons, tab bar with icons + labels, pinned actions), what must be above the fold, and the
   flow links. Then grayscale wireframes of exactly that (a lab's `src/wireframes/`; one agent can draw them while you
   write the brief). The brief points at both and says: restyle and restructure freely, never drop a block, add any
   real app component. Without this layer builders typeset the content spec into posters (`references/lessons.md`,
   Dream App R1).
2. **Standing rules vs divergence.** If the user has standing design rules (colour bans, light-only, a mood), check
   what they leave legal on luminance, hue family and colour intensity *before* making them binding. If they collapse
   an axis, say so and ask which to relax, showing the cost (Kas pirmas R1: colour bans + light-only + "don't compete
   with the renders" left mono/sage/teal, and the round came out grey; the user relaxed them the moment they were asked).
3. **Settle the settings table in `SKILL.md`.** Ask one short question per missing item that changes the outcome. The
   usual ones are where the output goes and which screens. Use defaults for the rest and say which.
3. **Set the quality bar (step 0.3).** The owner's reference apps decide the level every agent is held to.
   - Ask with options (AskUserQuestion, multi-select): 3–4 families of apps from the category with one line each
     (Dream Catcher: Calm / Headspace / Endel · Day One / Stoic / Reflect · Oura / Rise / Apple Health · Co–Star / The
     Pattern). "Other" lets them name their own.
   - Fetch real screenshots: the App Store page `https://apps.apple.com/us/app/<slug>/id<NNN>` (with a desktop
     Safari User-Agent) lists `https://is1-ssl.mzstatic.com/image/thumb/…/<w>x<h>bb.(jpg|png)`; drop `AppIcon`,
     `Placeholder` and `Features` entries, keep the first 4–5 per app, and fetch each base URL with `/460x0w.jpg`.
     Paste them into one sheet (PIL, one row per app, labelled) and look at it.
   - Use it as `build.js` `bar.good` (and the last rejected strip as `bar.rejected`). It stays in the scratchpad: it
     is an internal reference, never shipped or published.
   - Write the product's **essence** (5–7 truths from the PRD) and the **production bar** (depth, character,
     professionalism; the gimmick list) into the guidelines (`references/guidelines-template.md` §1 and §4.5).
3. **Create `P/PLAN.md` and `P/PROGRESS.md`.** PLAN.md holds:
   - the requirement restated;
   - out of scope, and what's protected (the product's code, borrowed sources and wireframes are read-only);
   - the phases, each with its verify command;
   - the file contract for the target;
   - a **first content spec**: every string and number every variant shows, identical across variants. The numbers
     tell one small story across the screens. Example (Repperoni R1): the crew is at 9,980 / 10,000 on the challenge
     screen, and your 40 reps take it over the line on the finish screen;
   - edge cases;
   - the end-to-end check.

   PROGRESS.md is append-only: date, step, evidence (commands and outputs), notes.
4. **Prepare the target:**
   - **standalone**: create `OUT/`, `OUT/img/` and `OUT/assets/`, and copy `SK/targets/standalone/assets/*` into
     `OUT/assets/`. The assembler refreshes them later, but the probe and the builders' screens need them from the
     start.
   - **design-lab**: read the lab's `CLAUDE.md` and `src/_lab/README.md`. If `src/_lab/sheet/` is missing, install
     sheets and rounds (`targets/design-lab.md` §2) and verify the install. Check that `yarn dev` is running on :1234.
5. **Write `P/round-R/round.json`**, which drives the assembler and checker:

   ```json
   { "target": "standalone", "out": "/abs/OUT", "project": "Name", "round": 1,
     "variants": { "01": "TBD", "02": "TBD" },
     "screens": [["1", "Home", "compare-home"], ["2", "Core", "compare-core"], ["3", "Peak", "compare-peak"]],
     "flow": [["1", "2"], ["2", "3"], ["3", "1"]] }
   ```

   `variants` gets the real names after the brief. For design-lab the file looks like
   `scripts/design-lab/round.example.json`.
6. **Prove the tools once.** Build a probe screen from the target's template with a Google Font, one Lucide icon and
   one image (a `data:` URI, since the library may be empty). Put it where no variant will go: standalone
   `OUT/round-RR/v00/screen-1.html`, lab `src/explorations/screen-r0-v00-1.html`. Run
   `node SK/scripts/screen-shot.mjs <url> SCR/probe` and look at the PNG, then run
   `node SK/scripts/verify-screens.mjs <url>`. Delete the probe.

## Step 1: foundations workflow

**Launching:** the Workflow tool only accepts a `scriptPath` inside the workspace. Copy `workflows/*.js` into the
process folder's `tools/` and launch from there (adapt a copy there if the target's shell differs from the templates).
**A Design Lab's dev server down?** Don't start the user's. Run a scratch one that can't touch their `dist/`:
`npx parcel serve src/index.html '<section globs>' --port <spare> --dist-dir SCR/dist --cache-dir SCR/cache --no-hmr`
(include `src/index.html`, or Parcel roots the output at the section and every URL falls through to its index).

Launch `Workflow({ scriptPath: "SK/workflows/foundations.js", args })`; the args are in `workflows/README.md`. It runs:

- **Research:** one lane per borrowed source (captured with screenshots), the product/content lane (the verified
  content spec, required vs optional, brand rules applied to visuals), and the domain lane (best-in-class apps in the
  category plus the product world's vernaculars). The generic web research (AI tells, craft floors, method) is already
  in `references/`. Set `refreshResearch: true` only to update it.
- **Guidelines:** written from `references/guidelines-template.md`, then critiqued by one agent through three lenses
  (generic output, brand/originality, craft/feasibility), then revised.
- **Directions:**
  - about 1.7× candidates per group;
  - the selector writes `P/round-R/brief.md` per `references/brief-template.md` (the matrix, caps, nearest pairs, the
    content spec, per-variant specs, traps, the photo library);
  - one adversarial review through two lenses (divergence; brand and buildability).
  - In speed mode that reviewer writes `P/round-R/review-findings.md`, which binds the builders. `finalize: true`
    revises the brief instead.

**Between phases, read the brief yourself.** Replace PLAN.md's first content spec with a pointer to the brief's
content spec, so nobody builds from stale numbers. Check that the selector wrote `round-R/strings.json` (the required
strings per screen, used by `check-strings.mjs`); if it's missing, write it from the brief. Then check:
- the ten (or N) are really different (the compare test in your head);
- the content spec matches PLAN.md;
- every variant has a signature that lands on the key number or moment;
- the photo list is small and brand-safe.

**Look at the palette sheet** the selector made (`SCR/palette-sheet.png`, from `round-R/palettes.json` via
`scripts/palette-sheet.py`). It is the round's colour spread before anyone builds: if it reads grey or samey, send the
brief back now, not after two hours of building.

Fill `round.json` → `variants`. Record the per-variant line ranges of the brief (`grep -n "^### V" brief.md`) for the
build args.

**A source changed mid-run?** Recapture it (a one-agent job), then have one agent write
`P/round-R/brief-<group>-update.md`, which supersedes the brief for that group. Pass it as `supplements` and as a
`preBuild` agent so that group starts later while the others build. Never edit `brief.md` under running builders.

## Step 2: photo library (inline, only if the brief lists photos)

Follow `references/images.md`:
- generate each listed image once (avatars on the cheapest model, scenes on a mid-price photo model);
- look at each one and pass it through the realism check **and** the guardrail check (what does it imply?);
- regenerate failures;
- compress into the shared `img/` folder (standalone: `OUT/img/`; lab: `src/explorations/img/`).

Per-variant looks are CSS grades, never extra files. Log the model and cost per image in PROGRESS.md.

## Step 3: build workflow

Launch `Workflow({ scriptPath: "SK/workflows/build.js", args })`; the args are in `workflows/README.md`. It runs:
- **build**, every variant in parallel: plan notes, the files, two or more screenshot passes, the mechanical checks;
- **round critique**, once all builds are in: one agent assembles a round page (keeping the previews), shoots the
  compare strips and every variant's board, and writes `round-R/round-critique.md`: per variant a verdict (distinct,
  look-alike, grey, weak signature) and 2–6 must-dos, must-diverge first, then its worst faults. It is the step that
  would have caught Kas pirmas R1;
- **refine**, every variant: apply the must-dos with judgement, then a final self-check.

The round critique needs `target.roundJson` (a lab too) so the workflow can assemble the page; without it every
variant gets its own critic instead. `thorough: true` adds a fresh-eyes critic per variant between the round critique
and the refine (≤ 10 must-fixes, one push-further, one thing to remove); worth it for ≤ 6 variants. In a lab, assemble
an empty round page (the cover only) before launching, so the dev server already serves it. If an outage kills agents,
relaunch with `done: {build, roundCritique, critique, refine}` listing what's already on file. Concurrency is capped by
the machine, so extra variants queue.

While it runs you can prepare the cover and look at the builders' preview screenshots in `shots/`. **Don't message the
agents.** If one is stuck on something external (a dead dev server), fix the cause or tell the user.

## Step 4: assemble and verify (inline)

1. **The cover** (`OUT/round-RR/cover.html` standalone, `src/explorations/parts/rR-cover.html` lab) is plain and
   neutral: the variants carry the character. Start from the target's `templates/cover*.html`. It holds:
   - the round's goal in two sentences;
   - the groups, each variant linked to `#rR-vNN` with its one-line bet;
   - the diversity matrix, condensed: one row per variant with its main axis positions, so reviewers see the spread;
   - how to read a variant;
   - the feedback wanted: keep / push / kill, one thing to steal, a context test ("would you send this screen to the
     people it's for?"), the best version of each screen;
   - links to the compare strips.
2. **Assemble:**
   - standalone: `python3 SK/scripts/assemble-standalone.py P/round-R/round.json`. It writes `round-RR/index.html` and
     `OUT/index.html`, copies the assets, and deletes the previews;
   - lab: add the tab to `parts/rounds.html`, point `explorations/index.html` at the round, then
     `python3 SK/scripts/design-lab/assemble-round.py round.json`.
3. **Mechanical gates:**
   - both targets, over every screen URL:
     - `node SK/scripts/dom-audit.mjs` reports overlapping tap targets and low contrast, which screenshots can't show.
       In Repperoni R1, 7 of 10 Home feeds failed it after critique;
     - `node SK/scripts/check-strings.mjs P/round-R/strings.json` confirms every variant shows the content spec's
       strings;
     - pass the URLs as a list. zsh won't expand `file://…/v*/…`, so use
       `$(printf 'file://%s ' OUT/round-RR/v*/screen-*.html)`.
   - standalone: `python3 SK/scripts/check-standalone.py round.json`, then `node SK/scripts/verify-screens.mjs` over
     every screen URL.
   - lab: `python3 SK/scripts/design-lab/check-round.py round.json` (it runs `yarn links`), plus the lab's
     `yarn lint`, `yarn typecheck`, `yarn test` and `npx prettier --check .`. Variant CSS usually needs
     `npx prettier --write` on the `rR-v*.css` files. Then a scratch build with a **fresh** cache:
     `npx parcel build --public-url ./ --dist-dir SCR/dist-N --cache-dir SCR/cache-N` and
     `node scripts/fix-nested-urls.mjs SCR/dist-N`.
     check-round.py also fails a variant on the traps that broke earlier rounds: a missing `img/…` (a path renamed
     while copying a parent), an image-file CSS mask, `url()` inside a Tailwind class, an SVG id containing "new".
   - **dom-audit's lowContrast on text over artwork** is often a false positive (it compares against the colour behind
     the art, or misses a panel drawn as `::before`): look at the screen and read the builder's pixel measurements
     before sending it back.
4. **Look — from the static build over `file://`.** Shoot from the scratch production build, not only the dev server:
   some faults appear only there (Chrome drops image-file CSS masks on `file://`; R6 V04's pastel hero went blank).
   Run `node SK/scripts/page-shot.mjs file://SCR/dist-N/explorations/round-RR.html SCR/shots/v01.png <W> 2500
   --scroll-to "#rR-v01" --settle 12000` for every variant, with `<W>` ≥ the board width + 380 (wider boards crop at
   1600), and `--scroll-to "#rR-compare-…"` for each strip. Read the strips side by side:
   - two variants that read as one idea is a finding;
   - a generic tell is a finding;
   - a signature you can't find is a finding;
   - **below the bar** (put the strip next to the quality-bar sheet: flat, gimmicky, a trend skin) is a finding.

   Fix small things yourself. Send big ones back to one agent (a small workflow or an Agent call) with the critique
   text.
5. **Record:** copy a few final screenshots to `P/round-R/shots/` (JPEG), update any docs the target owns (a lab's
   "Current state" lines), and log everything in PROGRESS.md.

## Step 5: hand over

- The link: standalone `file://OUT/index.html` (or wherever the user hosts it); lab
  `http://localhost:1234/explorations/round-RR.html`.
- One line per variant: its bet and its signature.
- The known issues. Include the builders' `known_issues` that matter, such as a family-level decision they flagged
  for the lead.
- What was trimmed or cut and why, and what the images cost.
- The feedback format from the cover.
- Offer the next round.
