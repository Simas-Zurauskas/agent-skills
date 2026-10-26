# ready — the gate before implementation planning

`ready` decides whether the feature is defined well enough to plan. It re-checks the product, grills
everything, and — the test no reader can replace — has a fresh builder try to plan the feature from
`FEATURE.md` alone and report every place it had to guess. It stamps `Ready for planning` only when every
check comes back clean. It never declares completeness: it says *no known holes after these checks*.
Read [../reference/rules.md](../reference/rules.md).

## D1 — Preconditions (mechanical; stop at the first failure and say what to run)

SKILL.md's five checks; open the entry; record chat answers. Then `bf.py counts` and `bf.py lint`:

- any `Answered` row not applied → run `resolve` first (or, if the owner invoked `ready` after
  `answer`/`auto`, run it now as part of this command);
- `Open` or `Flagged` rows, or markers → **not ready**: list them and stop — the checks below would only
  find what is already known. (Say so plainly; `auto` handles the loop.)

## D2 — Re-verify the product

`bf.py anchors <home>`. Every stale fact, and every fact whose repo moved and whose file changed, goes to
one baseline verifier ([../briefs/baseline-verifier.md](../briefs/baseline-verifier.md)). A wrong fact is
corrected in `baseline.md` and every `CH`/`KEEP`/default citing it becomes a candidate in D4.

## D3 — Four independent attacks, together (cost line first)

Dispatch in one turn:

1. **The full grill** — 4 passes ([../reference/grill.md](../reference/grill.md)).
2. **The dry-run builder** ([../briefs/dry-run-builder.md](../briefs/dry-run-builder.md)) — a fresh agent
   given `FEATURE.md`, `baseline.md` and the repos, never `questions.md` or the record. It drafts the
   outline of an implementation plan (which parts of the code change, in what order, what is tested how)
   and lists **every decision it had to make that `FEATURE.md` does not settle and the code or a
   convention does not settle either**, every requirement it could not place, and every requirement it
   could not see how to test.
3. **The red team** ([../briefs/red-team.md](../briefs/red-team.md)) — a different model, the
   cross-family CLI where available ([../reference/dispatch.md](../reference/dispatch.md) §4): contradictions
   between lines, a line contradicting the baseline or a project rule, an existing behaviour changed with
   no `CH`, a touched thing with neither `CH` nor `KEEP`, scope beyond what the sources asked for,
   requirements that cannot fail.
4. **Faithfulness** ([../briefs/faithfulness.md](../briefs/faithfulness.md)) over the whole of
   `FEATURE.md` — every sentence traces to a source, an answer, a baseline fact, or is a labelled default.

## D4 — Dispose everything

Every finding from D2 and D3 becomes a candidate — the dry run's guesses with `lens: dry-run`, the red
team's with `lens: red-team` — and goes through [questions.md](questions.md) G3–G6. Faithfulness
verdicts confirmed wrong are fixed in place where the text is a run's own draft never accepted by the
owner; text from an applied answer or the owner's words is **not** rewritten — the finding becomes a
question.

## D5 — The verdict

**Ready** when, after D4: no `Open`, `Answered` or `Flagged` rows, no markers, no unverified items, no
stale facts, lint clean. Then write the one status line in `FEATURE.md`'s header:

```
Status: Ready for planning — 2026-10-27 · rep-app c41d0e2 (dev) · checked by grill, dry-run builder, red team, faithfulness
```

and log `ready`. **Not ready** otherwise: the status line stays `Draft`, and the reply lists what is
left in order — the new questions first.

Reply on Ready: one line verdict; what the feature contains (counts of requirements, changes, keeps,
defaults adopted on the owner's behalf); the defaults list (riskiest first — the owner's last chance to
veto cheaply); *"Next: implementation planning — start from `FEATURE.md`; `baseline.md` holds the code
anchors."* Any later write run that changes `FEATURE.md` resets the line to `Status: Draft`.
