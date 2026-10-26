# ready — the gate before implementation planning

`ready` decides whether the feature is defined well enough to plan. It re-checks the product, grills
everything, and — the test no reader replaces — has a fresh builder try to plan the feature from
`FEATURE.md` alone and report every place it had to guess. It stamps `Ready for planning` only when every
check comes back clean, and never claims completeness: *no known holes after these checks*. Read
[../reference/rules.md](../reference/rules.md).

## D1 — Preconditions (mechanical; stop at the first that fails, and say what to run)

SKILL.md's checks; open the entry; save the invocation; record chat answers. `bf.py counts` and `bf.py lint`:

- an `Answered` row not yet applied → *"run `resolve` first"* (`auto` does this for you);
- `Open` or `Flagged` rows, or markers → **not ready**: list them and stop — the checks below would only find
  what is already known.

Stopping here appends `- closed <time> — not ready: <reason>` to the entry, so the next command is not locked
out.

## D2 — Re-verify the product

`bf.py anchors <home>`. Every **stale** fact, every fact marked **recheck**, and a search for new code that
reads or writes the touched records since the recorded commits go to one baseline verifier
([../briefs/baseline-verifier.md](../briefs/baseline-verifier.md), with its `SINCE_BLOCK` filled). Wrong facts are struck
and corrected; every `CH`/`KEEP`/default citing one becomes a candidate in D4. Then rewrite the header's repo
lines and `FEATURE.md`'s `Product:` line to the current commits. Also list other feature homes whose baselines
cite the same files (baseline.md §4.8) — each becomes a lens-3 input.

## D3 — Four independent attacks (cost line first; waves as the harness allows)

1. **The full grill** — 4 passes, or 2 for a small change ([../reference/grill.md](../reference/grill.md) §1).
2. **The dry-run builder** ([../briefs/dry-run-builder.md](../briefs/dry-run-builder.md)) — a fresh agent given
   `FEATURE.md`, `baseline.md`, the repos and the project guides, **never `questions.md` or the record**. It
   places every line in the code, outlines a plan, and lists every decision it had to make that the spec,
   the code and one obvious convention do not settle.
3. **The red team** ([../briefs/red-team.md](../briefs/red-team.md)) — a different model; the other model
   family's CLI where it works ([../reference/dispatch.md](../reference/dispatch.md) §4).
4. **Faithfulness** ([../briefs/faithfulness.md](../briefs/faithfulness.md)) over the whole of `FEATURE.md`.

## D4 — Dispose everything

Every finding becomes a candidate — dry-run guesses as `lens: dry-run`, red-team defects as `lens: red-team`
— through [questions.md](questions.md) G3–G6. Faithfulness findings on text a run drafted and nobody has
accepted are fixed in place; on text from the owner's words or an applied answer they become questions.

**If D4 wrote anything into `FEATURE.md`** (a fix, a default, a product fact's line) — the usual case, since the
run closes most of what the dry run and red team find itself — that text has not been attacked: run the delta
grill (2 passes) over it and dispose its findings; repeat while a round still writes, **at most twice more**.
A round that writes a question, or a third round that still writes, makes the verdict *not ready*.

## D5 — The verdict

**Ready** when, after D4: no `Open`, `Answered` or `Flagged` rows, no markers, no unverified items
(`bf.py counts`), no stale facts, and `bf.py lint` reports no errors and no coverage gaps. Then write the
status line:

- `Status: Ready for planning — 2026-10-27 · rep-app c41d0e2 (dev)`
- or, when delegated answers or defaults were adopted since the owner last accepted:
  `Status: Ready for planning — pending your review: 6 answers I gave for you, 4 defaults — 2026-10-27 · rep-app c41d0e2 (dev)`

The checks that ran are named in the log's `ready` line, not in the spec.

Log `ready`; **standalone only:** snapshot, `closed`. **Not ready** otherwise: the status stays `Draft`, and the reply lists what
is left — the new questions first.

**Reply on Ready:** the verdict line; what the feature contains (counts); **everything decided on the owner's
behalf** — delegated answers (owner's-list ones first) and defaults, riskiest first, numbered for veto, with
*"say "accept" to clear the pending review, or "q-4: …" / "drop D3" to change any"*; anything the depth bound
discarded; facts the feature relies on that users do not have yet (unreleased); other features in flight on
the same screens; and *"Next: implementation planning — start from `FEATURE.md`; `baseline.md` holds the code
anchors."* If the home is in a scratch folder (record.md §2), say where the project keeps durable docs.

Any later write to `FEATURE.md` resets the status line to `Status: Draft`.
