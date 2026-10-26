# questions — grill the feature and dispose of every finding

`questions` grills at the delta scale; `questions full` attacks everything. **G3–G6 are also the shared tail
of `init`, `add`, `resolve` and `ready`** — they point here, and when embedded, G6's report, reply and close
belong to the caller. Read [../reference/rules.md](../reference/rules.md),
[../reference/grill.md](../reference/grill.md) and [../reference/dispositions.md](../reference/dispositions.md).

## G1 — Reconcile what happened since the last run (standalone; embedded callers did it)

SKILL.md's checks; open the entry; save the invocation; record what the owner said in chat
([../reference/record.md](../reference/record.md) §5). Then:

- **The owner's edits:** `bf.py changed <home>` — their edits to `FEATURE.md`, `questions.md` or
  `baseline.md` since the last run are theirs: kept, named in the report, and added to the attack surface.
- **Question rows:** `Open → Answered` with an answer — theirs, left for `resolve`. `Answered` with an empty
  answer — report, leave. `Open → Rejected` — read the reason (record.md §5). `Rejected` with a reason that
  reads like a decision — name it in the reply (*"q-6 reads like an answer — move it to Answered if it is
  one"*), never flip it. An `Open` row whose wording they edited — their wording is the question.
- **Baseline drift:** `bf.py anchors <home>`. Stale facts that the lines under attack cite are re-verified
  (one verifier dispatch) before the grill reads them.

## G2 — Grill

Pick the scale and compute the attack surface (grill.md §1). Nothing changed and not `full` → no passes; say
*"nothing has changed since the last grill"* and go to G6. Otherwise a cost line, a heartbeat, and the passes
concurrently ([../briefs/grill-pass.md](../briefs/grill-pass.md), lenses pasted in). Add as candidates of
their own: every marker ending `→ asked next run` (vetoed ones keep their tag) · every recorded contradiction
not yet asked · every `CH`/`KEEP`/default citing a fact found wrong. `grill` log line: scale, passes, what
was attacked, candidates per pass.

## G3 — Merge, deduplicate, filter

dispositions.md §1–§2, including the reverse sweep of standing `Open` rows. Verify every quote and anchor a
candidate, survey or filter relies on (`bf.py quote`, `bf.py anchors --facts`) — **a failed match voids the
discard**. For a candidate grounded in an absence, also search `sources/` (`grep -rni`): a source that
settles it makes it a FIX. Every discard goes into the report with its evidence and counter-case.

## G4 — Route, blind

1. Apply the gate (§3) and give each survivor a first routing with its evidence. Run the never-list scan
   (§4) on every candidate.
2. Dispatch the routers ([../briefs/router.md](../briefs/router.md)), ≤15 candidates each, without the first
   routing. Combine by §4.
3. Write, one file at a time, re-reading before each write: **PRODUCT** facts into `baseline.md` (and the
   `Today`/`KEEP` lines that cite them) · **FIX** replacements with their provenance · **DEFAULT** lines ·
   **SLOT** lines — IDs from `bf.py ids --next <P> --count N`, ledger lines appended to `record/defaults.md`.
   Remove each marker these settle, naming its route ([../reference/feature-shape.md](../reference/feature-shape.md) §7).
   Log lines in one batch.

## G5 — Draft questions, then the cold read

1. Draft each QUESTION row (dispositions.md §5) with depth, directions with counter-cases, and a recommended
   direction. Run the read-back and bundle gates.
2. Dispatch the cold readers ([../briefs/cold-reader.md](../briefs/cold-reader.md)), ≤10 rows each, without the
   Recommended lines. Apply verdicts by §6; keep a Recommended line only where `would_pick` matches. A demoted
   row goes to its filter's *Instead*.
3. Over the sanity range? Re-gate once (§7), then write what survives.

## G6 — Write, lint, close

1. Write the rows to `questions.md` in impact order with numbers from `bf.py ids --next q --count N`; point
   each marker at its row. Regenerate `FEATURE.md`'s `Open questions` block. If this run changed
   `FEATURE.md`, set its status line back to `Status: Draft`.
2. `bf.py ids <home> --sync`; `bf.py lint <home>` — fix what this run caused.
3. **Standalone only:** `funnel` line, run report, reply ([../reference/record.md](../reference/record.md)
   §6–§7), `bf.py snapshot`, `snapshot` and `closed` lines. Embedded: hand the funnel and findings to the
   caller.

## Reviewing together — on request only

If the owner asks to go through the questions now, offer about ten at a time in impact order, each with its
directions: `[1/2/3] pick · [w] your own answer · [r] reject (why) · [s] skip`. Record each reply as record.md
§5 says. Stop the moment they stop; never start uninvited.
