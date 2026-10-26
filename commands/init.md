# init — from a feature idea to a grilled FEATURE.md

`init <the feature in words> [files, a task folder, a design]`. Runs end to end; `init soft` stops
after the draft (I4) for the owner's look. Read [../reference/rules.md](../reference/rules.md) first.

Progress: print one line at each phase boundary — *"Mapping the parts of the app this touches (3 agents)…"*
— never phase codes.

## I1 — Home, entry, sources

1. Run SKILL.md's five checks. Resolve and scaffold the home ([../reference/record.md](../reference/record.md)
   §1). If a `FEATURE.md` with requirements already exists there, this is not an `init`: say so and
   offer `add`.
2. Run id; open the log entry (`open`, writer model, each repo's commit).
3. **Capture sources** into `sources/`: the owner's words exactly as typed (`001-request.md`), each
   file they named copied in, the task folder's brief or notes if the owner pointed at the task, a design
   they named (record its path and commit; copy screenshots, not whole apps). `INDEX.md`: number, what it
   is, where from, date, sha256. One `source` line each.
4. **Too little to go on?** If the request does not say what the feature does for whom, ask **one
   message with at most three questions** — *what should it do, and what should it not do? · who is it
   for, and what are they trying to get done? · anything already decided, or anything it must not
   change?* — and wait. The reply is a source (`002-interview.md`). This is the only stop on a plain
   `init`.
5. Probe dispatch now ([../reference/dispatch.md](../reference/dispatch.md) §3) with the first real
   dispatch in I2.

## I2 — Map the product (baseline)

Follow [../reference/baseline.md](../reference/baseline.md) §4:

1. Read the workspace guides, the wiki index, the invariants and contracts pages the feature plausibly
   touches. Record the project rules (rules.md §8). List the likely surfaces, records, flows, and the
   search words.
2. Print the cost line, then dispatch **2–4 cartographers** concurrently
   ([../briefs/cartographer.md](../briefs/cartographer.md)), split by area.
3. Merge, number `B-n`, `bf.py anchors <home> --facts work/<run-id>/facts-draft.md`; fix or drop
   broken anchors.
4. Dispatch the **baseline verifier** ([../briefs/baseline-verifier.md](../briefs/baseline-verifier.md)).
   Apply its corrections (re-anchor, re-check). Write `baseline.md`. `baseline` log line with counts.
5. Note the cartographers' **blast radius** (other features sharing records or surfaces) for lens 3.

## I3 — Draft FEATURE.md

The orchestrator drafts every block of [../templates/FEATURE.md](../templates/FEATURE.md) from the
sources and the baseline, by [../reference/feature-shape.md](../reference/feature-shape.md):

- **Only what a source says** goes into Summary, Why, Who, Scope, Behaviour and `CH` lines. The baseline
  fills `Today`, the *Today* halves of `CH` lines, and `KEEP` lines the owner's words imply (*"everything
  else stays as it is"* is a source for `KEEP`).
- A gap is a marker `→ asked next run`, never prose. A contradiction between sources is a marker naming
  both, quoted verbatim in the run's notes (`work/<run-id>/contradictions.md`).
- Name actors and things with the product's own terms from the baseline.
- If the material describes several features that do not depend on each other, draft them as parts and
  say so in the reply — the owner may split them into separate homes; a run never splits on its own.
- Write `FEATURE.md` (one write, read back). `item` lines, depth 1. Sync IDs: `bf.py ids <home> --sync`.

**`init soft`:** print the Summary, Scope and the list of requirements, changes and keeps, and stop:
*"Look it over — say go, or tell me what to change."* Their reply is a source; apply it as `add` would,
then continue at I4.

## I4 — Faithfulness check and the full grill, together

Dispatch in one turn (cost line first):

- **Faithfulness** ([../briefs/faithfulness.md](../briefs/faithfulness.md)) over every sentence in
  `FEATURE.md`: traces to a source span, a baseline fact, or is a labelled default or a marker. Every
  non-clean verdict quotes the exact words. Fix in place what it confirms wrong (this run wrote it and
  nobody has accepted it yet): remove or narrow the unsupported clause, or replace it with a marker.
  One retry of the check on a contested item, never an override.
- **The full grill** — 4 passes ([../reference/grill.md](../reference/grill.md) §1).

## I5 — Dispose and write

Run [questions.md](questions.md) phases G3–G6 (dedupe → filters → gate → router → defaults, fixes, slots,
product facts → question drafting → cold read → write → lint → report). When I4's faithfulness fixes
changed a line a candidate quotes, re-ground that candidate against the new text before routing it.

## I6 — Close

`bf.py lint <home>` must pass (fix what this run caused; report what a human caused). Write the run
report and the reply ([../reference/record.md](../reference/record.md) §6–§7). `closed` line.
