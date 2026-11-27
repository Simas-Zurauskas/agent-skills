# Run a round

Read [the shared contract](references/execution-contract.md) first. Paths: `SK` skill, `OUT` destination, `P` durable
process folder, `SCR` owned scratch, `R` round number, `RR` zero-padded number. Native agent orchestration is preferred;
[the legacy scripts](workflows/README.md) remain available where a real Workflow tool exists.

## 1. Scout and freeze the comparison

Read product sources, existing screens/wireframes, relevant owner feedback and the selected target guide. Record mode
(default normal, speed alias), count (six), target and three product-selected screens in `PLAN.md`. Reuse good existing
UX/content notes; where missing, write a compact list of required blocks, exact strings, relationships, flow and what
must fit. A separate grayscale wireframe deliverable is optional, not a universal preparation gate.

Use supplied quality references. Otherwise choose a small relevant reference set and state the assumption; ask only
when preference materially changes the outcome. Research current facts when needed and capture actual reference
screenshots once. Share their paths and provenance; do not repeatedly research the same sources. Read
[lessons.md](references/lessons.md) selectively for the chosen target and known failure risks.

Create `P/round-R/`, `PROGRESS.md` and target config/state. Preserve current source fingerprints and declared direction
slots. Prepare a destination now: HTML draft assembler or native Figma page/frame. Give the owner the destination and
make pending status clear. Verify one small target rendering/capture probe before scaling up.

## 2. Prepare directions

**Normal / thorough:** scoped product, source and domain research feeds [guidelines](references/guidelines-template.md).
An independent prep reviewer checks product fit, usable craft and overconstraint; revise concrete findings. Proposers
oversupply by complementary lenses/groups, then the selector writes [the brief](references/brief-template.md). One
fresh preparation reviewer checks divergence and buildability. Retain explicit decisions; critic preferences cannot
replace owner constraints. Preparation findings travel with the brief or an explicit supplement.

All modes freeze identical content in `strings.json` (screen number → required strings) and point HTML `round.json`
`content_specs` to it. Record optional imagery before building. Generate only needed assets, inspect meaning and
quality, compress once, and share; builders use the agreed library. Consult [images.md](references/images.md) only
when needed. Never mutate a brief already in use; publish a scoped supplement and pause only affected work.

## 3. Build and publish drafts

Dispatch at most three builders (or available capacity, whichever is lower), at the same configured effort in every
mode. Each gets the shared brief, its direction card, owner constraints, target contract and exact reference paths.
Use [diagnostics](references/design-diagnostics.md) and relevant [craft checks](references/craft-floors.md); do not ask
builders to read every historical reference. They make serious finished-looking screens, inspect actual renders,
repair substantive issues and return files/node specifications, screenshots, verification and known issues.

The lead alone publishes each ready variant while the next ones build. HTML: run the target assembler with `--draft --ready <completed-IDs>
--keep-previews` (use `--ready ""` before any builder has returned); declared slots stay visible as pending until ready. `review_status` may mark independently reviewed
slots. Builders use private previews and never edit shared assets/pages. Figma: one native writer applies each approved
spec to stable node IDs and captures its actual frames (see target guide); no parallel canvas mutations.

HTML screen captures may combine checks in one browser session:

```sh
node <SK>/scripts/screen-shot.mjs --batch <SCR>/screens.json --strings <P>/round-R/strings.json --verify --audit
node <SK>/scripts/page-shot.mjs --batch <SCR>/pages.json
```

Screen jobs are `[{"url":"file:///…/screen-1.html","prefix":"/…/shots/v01-s1"}]`. Page jobs are
`[{"url":"file:///…/round-01/index.html","out":"/…/shots/v01.png","width":1600,"height":2500,"selector":"#r1-v01","settle":8000}]`.
Existing single-capture commands still work. Inspect PNGs; tool success alone is not a visual review. Keep one
consistent screen size across variants; current HTML templates default to 390×844 but desktop products use their declared canvas (for example 1366×900), desktop chrome and `page-shot` captures. Pass the same `viewport: {width, height}` to workflows and assembly config, with `platform: "desktop"` when appropriate; run viewport-aware content/DOM checks. Figma uses its agreed product canvas too.

## 4. Review, repair and verify

After all ready variants are published, dispatch one fresh independent round critic. Give an explicit evidence
packet without build conversation history. It reviews every board and screen, plus matching screens side by side,
against owner constraints and [diagnostics](references/design-diagnostics.md). Reuse screenshots/check records tied to unchanged source, shared assets and the declared viewport; capture missing or stale views. The critic independently inspects them and verifies doubtful claims rather than inheriting builder verdicts. Critic writes findings; only the lead
publishes. **Thorough only:** add fresh per-variant critics for details the comparison could miss.

Repair only variants with substantive findings. One bounded targeted pass, then verification of affected screens and
shared comparisons. If unresolved issues or a failed required agent remain, retain draft/incomplete status and report
it. No all-variant rewrite after a clean review and no compulsory aesthetic scoring.

For HTML run the target static checker and `--final --keep-previews` assembler after every declared variant and screen
exists; validate images, fonts, fit, required strings, scoped CSS and links using batch checks. Inspect cover, every
board and compare strips. Final strict assembly proves declared completeness, not visual quality. Figma requires
actual frame screenshots and editability inspection; HTML checks do not apply there.

## 5. Handoff and resume

Share the destination link/path, one sentence per direction (bet/signature), known issues, actual review route and
validation evidence. State draft/incomplete if any required evidence is missing. Record any trimmed stage and actual
cost/time only when measured. Ask for keep/push/kill with reasons or specific parts to retain; silence is undecided.

On interruption reconcile state, files/node IDs and screenshots before dispatching remaining work. Legacy `done`
arguments are hints to verify, not authority to claim evidence. For later rounds read [next-round.md](next-round.md).
Preserve local feedback and final extraction for Ameriks, even with a Figma destination. No public deployment, commit
or implementation follows automatically from completing a moodboard round.

## Optional durable state helper

```sh
python3 <SK>/scripts/run-state.py init --state <P>/round-R/run-state.json --input <P>/round-R/round.json --input <P>/round-R/brief.md
python3 <SK>/scripts/run-state.py record --state <P>/round-R/run-state.json --variant 01 --assignment "builder owns V01" --native-observation "builder returned" --artifact <OUT>/round-01/v01/board.html --status draft
python3 <SK>/scripts/run-state.py reconcile --state <P>/round-R/run-state.json
```

Repeat `--input` and `--artifact` as needed. Figma records may add `--target-id` and repeated `--node-id`; keep
screenshot evidence as local artifacts. The lead alone records state. Reconcile compares input/artifact fingerprints
read-only; stale input refuses reuse rather than overwriting history. Record actual native observations, never infer
stopped/failed from elapsed time. Changed artifact sets demote reviewed to draft. Preserve an old stale state and
create a new state path for changed inputs, then explicitly reconcile still-valid work.

Desktop screen capture/checks use the same batch helper with `--width W --height H --desktop --dpr 1 --verify --audit --strings FILE`; per-job `width`/`height` can override batch dimensions. Defaults remain 390×844 mobile. Match the round config `viewport` and inspect actual top/scrolled renders.

For progressive shared assembly, pass `--draft --ready 01,03 --keep-previews` with the lead's currently
ready IDs (or `--ready ""` for the initial pending page). An active builder may already have partial files; their
presence is not permission to publish that direction. The ready list controls visibility only; final assembly still
checks every declared direction and does not accept `--ready`. Private `--preview NN` is independent of this list.
Legacy draft calls without a ready list retain file-discovery behavior.
