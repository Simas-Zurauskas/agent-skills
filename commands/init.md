# init — from a feature idea to a grilled FEATURE.md

`init <the feature in words> [files, a task folder, a design]`. Runs end to end; `init soft` stops after
the draft for the owner's look. Read [../reference/rules.md](../reference/rules.md) first.

Progress: one plain line at each phase boundary — *"Mapping the parts of the app this touches (3 agents)…"*.

## I1 — Home, entry, sources

1. Resolve the home ([../reference/record.md](../reference/record.md) §1) and probe that it can be written.
   A home whose `FEATURE.md` already has requirements is not an `init`: offer `add`. A home with a **paused
   `init`** is resumed (record.md §4).
2. `bf.py scaffold <home> --name "<Feature name>"`, then SKILL.md checks 3–5 (lock, product, lint).
3. Run id; save the message to `work/<run-id>/invocation.md`; open the log entry (writer model, each repo's
   commit).
4. **Capture sources** into `sources/`: the owner's words exactly as typed (`001-request.md`), each file they
   named, the task folder's brief or notes if they pointed at the task, a design they named (path, commit,
   the frames they mean — copy screenshots, not whole apps). `INDEX.md`: number, what, from where, date,
   sha256-12 (record.md §2 has the columns). One `source` line each.
5. **Too little to go on?** If the request does not say what the feature does for whom, ask **one message,
   at most three questions** — *what should it do, and what should it not do? · who is it for, and what are
   they trying to get done? · anything already decided, or anything it must not change?* — log
   `paused — awaiting the owner's description`, and stop. Their reply resumes at I2 as source
   `002-interview.md`. This is the only stop on a plain `init`.

## I2 — Map the product (baseline)

[../reference/baseline.md](../reference/baseline.md) §5:

1. Read the guides, the owner's standing rules (rules.md §8), the wiki index, the invariants and the
   contracts the feature plausibly touches. Write `work/<run-id>/rules.md`. List the likely surfaces,
   records, flows and search words. Decide: small change (one cartographer) or 2–4.
2. Cost line, heartbeat, dispatch the cartographers concurrently
   ([../briefs/cartographer.md](../briefs/cartographer.md)) — the first is the probe.
3. Merge into `<home>/work/<run-id>/facts-draft.md`; `bf.py anchors <home> --facts <that path>`; fix or drop
   broken anchors. Number with `bf.py ids --next B --count N`.
4. Dispatch the **baseline verifier** ([../briefs/baseline-verifier.md](../briefs/baseline-verifier.md)). Apply
   its corrections, re-check them, write `baseline.md` (header with commits and `released:` refs; project
   rules with *Always ask* / *Never raise*; blast radius; other feature homes on the same files). Run
   `bf.py anchors <home>` and mark facts absent from the released ref `(unreleased — not in <ref>)`.
   `baseline` log line.

## I3 — Draft FEATURE.md

Draft every block of the template by [../reference/feature-shape.md](../reference/feature-shape.md):

- **Only what a source says** goes into Summary, Why, Who, Scope, Behaviour and the *After* half of `CH`
  lines. The baseline fills `Today`, the *Today* halves, and `KEEP` lines the owner's words imply
  (*"don't change anything else about the lists"* is a source for those `KEEP`s).
- **No defaults, fixes or slots in the draft** — those come only from the blind routing in I5, so every
  router judges text it has not seen settled. A gap the draft notices is a marker (if it is in what the
  owner said) or left for the grill.
- **Markers only for gaps in what the owner said** (an undecided choice, a hedge, a contradiction — both
  sides quoted in `work/<run-id>/contradictions.md`). A block the sources do not address yet reads
  `Not covered yet.`; the grill fills it.
- Use the product's own terms. Fill the header's `What it does` and `Product:` lines.
- Several independent features in the material → draft them as parts and say so in the reply; the owner
  may split them; a run never splits on its own.
- Write `FEATURE.md` (one write, read back); `item` lines at depth 1; `bf.py ids <home> --sync`.

**`init soft`:** print the Summary, Scope and the list of requirements, changes and keeps;
`bf.py snapshot <home> --run <id>` (so their edits to the draft are seen); log
`paused — awaiting the owner's look at the draft`; stop. Their reply is a source, applied as `add` would
apply it, and the run continues at I4.

## I4 — Faithfulness check and the full grill, together

One cost line, then one wave (two if the harness has fewer slots):

- **Faithfulness** ([../briefs/faithfulness.md](../briefs/faithfulness.md)) over every sentence of
  `FEATURE.md`. Fix in place what it confirms wrong — this run wrote it and nobody has accepted it yet:
  narrow the unsupported words, or replace them with a marker. One re-check of a contested item, never an
  override.
- **The full grill** — 4 passes, or 2 for a small change ([../reference/grill.md](../reference/grill.md) §1).

## I5 — Dispose and write

[questions.md](questions.md) G3–G6. A candidate that quotes a line the faithfulness fixes changed is
re-grounded on the new text first.

## I6 — Close

`bf.py lint <home>` — fix what this run caused; report what a human caused. Run report and reply
([../reference/record.md](../reference/record.md) §6–§7). `bf.py snapshot <home> --run <id>`; `snapshot` and
`closed` lines.
