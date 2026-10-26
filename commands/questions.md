# questions — grill the feature and dispose of every finding

`questions` grills at the delta scale; `questions full` attacks everything. Phases G3–G6 are also the
shared tail of `init`, `add`, `resolve` and `ready` — they point here. Read
[../reference/rules.md](../reference/rules.md), [../reference/grill.md](../reference/grill.md) and
[../reference/dispositions.md](../reference/dispositions.md).

## G1 — Reconcile what the owner did since the last run (standalone runs only; embedded runs did it)

Run SKILL.md's five checks, open the log entry, and record any answers, rejections or vetoes in the
invocation ([../reference/record.md](../reference/record.md) §5). Then read every question row:

- `Open → Answered` with an answer: theirs; leave it for `resolve`. `Answered` with an empty answer: a
  discrepancy — report it, leave it.
- `Open → Rejected`: read the reason; a marker waiting on it is removed (*not needed*, *already decided*)
  or kept (*ask it better* → the gap is redrafted at G5).
- `Rejected` but the reason reads like a decision: name it in the reply (*"q-6 reads like an answer —
  move it to Answered if it is one"*); never flip it.
- An `Open` row whose wording the owner edited: their wording is the question.
- Edits to `FEATURE.md` the run did not make: theirs (rules.md §3). Name what changed in the run report.
- **Baseline drift:** `bf.py anchors <home>`. Stale facts that changed lines depend on are re-verified
  (one verifier dispatch) before the grill reads them.

## G2 — Grill

Pick the scale (delta, or full when asked) and compute the attack surface ([../reference/grill.md](../reference/grill.md)
§1). Nothing changed and not `full` → no passes; go to G6 and say *"nothing has changed since the last
grill."* Otherwise print the cost line and dispatch the passes concurrently
([../briefs/grill-pass.md](../briefs/grill-pass.md)). Also add, as candidates of their own:

- every marker reading `→ asked next run`;
- every contradiction recorded and not yet asked;
- every `KEEP`/`CH`/default citing a fact the drift check found wrong.

`grill` log line: scale, passes, what was attacked, candidates per pass.

## G3 — Merge, deduplicate, filter

[../reference/dispositions.md](../reference/dispositions.md) §1–§2. Verify every quote and anchor a
candidate or filter relies on (`bf.py quote`, `bf.py anchors`) — **a failed match voids the discard**.
For every candidate grounded in an absence, search `sources/` too (`grep -rni`): a source that settles it
makes it a FIX. Each discard: one `discard` line, and its entry in the report with evidence and
counter-case.

## G4 — Route, blind

1. Apply the gate (§3) to each survivor and give it a first routing with its evidence.
2. Dispatch the routers ([../briefs/router.md](../briefs/router.md)), ≤15 candidates each, concurrently,
   without the first routing. Combine the verdicts by §4. The never-list check runs on every DEFAULT
   draft (§4).
3. Write, through one serial path, re-reading each file before writing: **PRODUCT** facts into
   `baseline.md` (a new `B-n` with its anchor, verified by the router's own anchor check plus
   `bf.py anchors`) and any line that cites it · **FIX** replacements · **DEFAULT** lines (`D-n` from
   `bf.py ids <home> --next D`) · **SLOT** lines. Remove each marker these settle, naming its route
   ([../reference/feature-shape.md](../reference/feature-shape.md) §7). One log line per write
   (`default`, `fix`, `slot`, `baseline`, `item` with depth).

## G5 — Draft questions, then the cold read

1. Draft each QUESTION row ([../reference/dispositions.md](../reference/dispositions.md) §5), with
   directions and a recommendation. Run the read-back and bundle gates.
2. Dispatch the cold readers ([../briefs/cold-reader.md](../briefs/cold-reader.md)), ≤10 rows each,
   concurrently. Apply verdicts by §6; a demoted row goes to its filter's `Instead` (a FIX, a PRODUCT
   fact, a duplicate link).
3. Over the sanity range? Re-gate the batch once (§7), then write what survives.

## G6 — Write, lint, report, close

1. Write the surviving rows to `questions.md` in impact order, `q-NN` assigned now; point each marker at
   its row. Regenerate `FEATURE.md`'s `Open questions` block from the rows. Clear a `Ready for planning`
   status line if this run wrote anything to `FEATURE.md` (back to `Status: Draft`).
2. `bf.py ids <home> --sync`, then `bf.py lint <home>` — fix what this run caused.
3. `funnel` line; the run report; the reply ([../reference/record.md](../reference/record.md) §6–§7);
   `closed` line (standalone runs; an embedding run closes its own entry).

## Reviewing together — on request only

If the owner asks to go through the questions now, offer them about ten at a time in impact order, one
per message block, with the directions:
`[1/2/3] pick a direction · [w] write your own answer · [r] reject (say why) · [s] skip`.
Record each reply as §5 of the record says, verbatim. Stop the moment they stop; never start uninvited.
