# Records and existing-home compatibility

## 1. Home and writes

Use the owner's named home, or `<task folder>/blueprint-feature/`, then the project's task convention,
then `blueprint-features/<slug>/blueprint-feature/`. Reuse a matching paused home; ask only when multiple
homes are plausible. One feature per home. `bf.py scaffold` never overwrites existing files.
Probe a real temporary write inside the home, not permission bits. Do not change permissions to force it.
All writes stay inside the feature home; no surrounding wiki/task changes.

## 2. Files

Keep FEATURE.md, questions.md, baseline.md, sources/INDEX.md, record/log.md, defaults.md, ids.json,
runs/, snapshots/ and work/. Existing v6 homes, IDs, statuses, provenance and pending-review labels stay
readable. No migration, renumbering or deletion of owner records. Old process reports are history;
reuse only review evidence that meets current coverage/freshness requirements, never infer approval.

Sources are immutable numbered copies with file, origin, captured date and sha256-12 in INDEX.md.
Capture the invocation verbatim under work/<id>/invocation.md. New source revisions get new numbers.
Never copy personal secrets or real users' private data. Work holds frozen briefs and raw returns;
keep any relied-on return at its referenced path. If the task home is scratch, ready names where the
project keeps durable documents without moving/committing them.

## 3. One compact log

Append only. Headers MUST use the actual clock formatted `YYYY-MM-DD HH:MM` (for example
`date '+%Y-%m-%d %H:%M'`), not ISO timestamps with T/seconds/offset: the checker parses this exact
minute format. Include a six-hex run ID, current skill VERSION and reported writer model:

```
## 2026-11-05 15:00 · init + ready · a3f9c2 · blueprint-feature v7 · writer <reported model>
- open
- source 001-request.md <hash>
- baseline B-1…B-6 inspected · product <commit> clean · release unknown
- item FEATURE.md FR-1…FR-5, CH-1, KEEP-1…KEEP-2 written · depth 1
- note tier small: local/reversible, known consumers; 1 combined review
- check combined · <actual route/model> · clean · coverage and inputs in run report
- grill full · combined review 1 · attacked: all
- ready no known material definition defects after recorded checks
- snapshot a3f9c2
- closed 2026-11-05 15:08
```

Keep existing line kinds for compatibility: open, source, independence, baseline, drift, item, grill,
funnel, default, fix, slot, question, discard, answered, left, applied, flagged, vetoed, check,
unverified, directive, snapshot, ready, note, paused, closed. Old counters can still find grill/ready.
Use only meaningful lines; no per-finding heartbeat or full process transcript. Log actual dispatches
and a heartbeat per wave. Do not log a planned review as completed. Nested/chained operations share
one entry and report, closing only once.

## 4. Lock and resume

`bf.py lock` is a read-only log inspection, not an atomic lock or proof of process liveness.
Exit codes remain: 0 no other recorded open run, 3 recent recorded open run, 1 older or age-unknown
open run whose ownership needs checking. Keep one writer per home; inspect immediately before opening
an entry and preserve concurrent edits under rules §3. Verify a prior writer stopped before
closing it; age alone is not proof. Never overwrite an active writer. Record a confirmed stopped run by
appending `- note closed as abandoned: <old id>` in the new entry. An explicit owner's statement that
the session stopped is sufficient. Otherwise report/ask only when ownership cannot be established.

A paused interview/draft-review/owner-decision run resumes from its artifacts in a new entry naming
the prior run. Material supplied on resume is captured and applied before expensive review. Embedded
commands never take another lock, close the outer entry or treat the outer writer as somebody else.

## 5. Chat decisions and vetoes

- `q-3: 2` or an explicit behavioral answer: save the owner's exact words and selected option text,
  set Answered, then apply when authorized by the command/sequence. Empty or ambiguous answers remain
  visible; Flagged needs a reason. Do not overwrite an owner's populated answer with an AI answer.
- Explicit new owner material that settles a question can close it with the source and update the spec
  in one coherent add. Explicit supersession quotes the replaced line; unexplained conflict asks.
- `reject q-N`/`close q-N`: record the reason and status. A settled/no-longer-needed question can remove
  its marker; ask-it-better restores a narrower gap. Do not silently close merely because a model prefers it.
- `D3: <choice>`: record that owner replacement; `drop D3`/`undo F2`/`drop S1`: preserve IDs, restore the
  gap, record the veto (`bf.py ids --veto D3`) and its consequences. Do not re-adopt the same default.
- Overruling an applied answer reopens it and dependent rows; resolve updates all provenance-linked lines.
- `accept`/`looks good` explicitly clears a genuine pending-owner-review clause after reading what was
  accepted. Ordinary defaults need no new acceptance gate. Legacy delegated serious choices do not become
  owner-approved merely because the current skill no longer asks for ordinary approval.

`status` records nothing: name supplied decisions as not recorded. Unsupported/unclear chat edits are
reported rather than guessed. Defaults/AI answers are labelled as such, never quoted as the owner's.

## 6. A proportional run report

In record/runs/<id>.md record the input/product state, risk rationale, meaningful changes, questions,
visible defaults, material findings and evidence-based resolution, actual coverage, and residuals. Keep per-run pending/pass annotations here and in the log, not in governing baseline
facts or default decision text that would need rewriting after the return.
One compact Checks table identifies role/scope, actual model/route, brief/return paths, verdict and input
hash evidence per grill §4. Include reused coverage and why it remains valid. No per-finding certificates,
mandatory empty sections, copied ledgers or full discard surveys. Keep significant disagreements,
unverified work, owner edits and source drift visible. Author inspection is not independent review.

Finish a write run with fresh counts/lint, ID sync, `bf.py snapshot <home> --run <id>`, snapshot and
closed lines. If genuinely paused, state why and what coverage remains. Do not perform another write
after an instruction to stop all edits. A metadata-only status stamp/explicit acceptance does not require
another substantive review when governing inputs remain unchanged.

## 7. Reply

Lead with outcome and any missing review/blocker. Link FEATURE.md; list serious owner questions and
the visible ordinary defaults for veto; report actual checks and residuals. Group routine preserved
defaults. State planning readiness precisely, not build/release readiness. Recommend one next useful
action instead of demanding a chain of intermediate commands. For planning handoff, link the existing
FEATURE.md and relevant baseline/source evidence, highlighting accepted decisions, exclusions, required
preservation and unresolved constraints. Do not duplicate the definition into a new mandatory plan or
imply that planning readiness verifies implementation. No phase codes or internal routing jargon.
