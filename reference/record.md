# The record — where things live and how runs leave a trace

## 1. Resolving the feature home

From the workspace the command was run in, in this order:

1. **A path the owner names.** A folder named `blueprint-feature` is the home; any other folder (a task
   folder) gets `blueprint-feature/` inside it. Create only that leaf.
2. **An existing home that matches.** `find . -maxdepth 6 -path '*/blueprint-feature/FEATURE.md' -not
   -path '*/node_modules/*'`. For `init`: a home whose feature name or task-folder slug matches this
   feature is reused only if the owner meant it (ask once if unsure). For other commands: exactly one
   home → it; several → list them with their `What it does` and status and ask which, once.
3. **`init` with nothing found — the workspace's task convention.** Read the workspace agent guides for
   where task folders live (e.g. *"each task's working folder is `wiki-rep/tasks/<nnn>-<short-name>/`"*).
   If the owner named a task (*"task 017"*) or exactly one task folder's slug matches the feature, use it.
   Otherwise create the next free number with a 2–4 word kebab-case slug, following the convention's
   format, and **say the path in the reply**. Respect what the convention says about that folder (for
   example *"keep `NOTES.md` there"* applies to the task, not to this home — do not create files outside
   `blueprint-feature/`).
4. **No convention.** `blueprint-features/<slug>/` at the workspace root; say so.

Create with `python3 <skill>/scripts/bf.py scaffold <home> --name "<Feature name>"`, which copies the
templates and refuses to overwrite an existing file.

## 2. The folder

| Path | What | Durable? |
|---|---|---|
| `FEATURE.md` | The feature PRD | yes |
| `questions.md` | Every question row, `q-NN` order, never re-sorted | yes |
| `baseline.md` | Product facts, `B-n` | yes |
| `sources/INDEX.md` + `sources/NNN-<slug>.<ext>` | Each source verbatim: the owner's words as typed, files copied in, with date and sha256 (`bf.py hash`). A revised file is a new number, never an overwrite | yes |
| `record/log.md` | Append-only run log (§3) | yes |
| `record/runs/<run-id>.md` | Each run's full report (§6) | yes |
| `record/ids.json` | Every ID ever issued (`bf.py ids <home> --sync`) | yes |
| `work/<run-id>/` | Frozen briefs (`brief-<name>.md`) and agent returns (`ret-<name>.md`) | scratch — delete freely |

**Nothing secret goes in it** — no tokens, keys, passwords, personal data of real users. Testers and
other people are referred to by role. The skill commits nothing; if the home is inside a repository, it
leaves version control to the owner.

## 3. The run log — `record/log.md`

Append-only, oldest first, never rewritten. **Run id:** six lowercase hex characters
(`openssl rand -hex 3`). One entry per run:

```
## 2026-10-26 14:05 · init · a3f9c2 · blueprint-feature v1 · writer <model> · rep-app a7ca2ba (dev)
- open
- source 001-request.md 9f2c1a0b3d4e
- independence probe: succeeded via Agent tool (general-purpose)
- baseline B-1…B-23 written · verified 21 · corrected 2 · dropped 1
- item FEATURE.md#FR-1…FR-9 written · depth 1
- grill full · passes 4 · candidates 31
- funnel 31 → product 6 → fix 2 → default 5 → slot 1 → questions 7 → discarded 10
- default D1…D5 · question q-01…q-07
- check router 3 of 3 returned · cold read 1 of 1 returned
- closed 2026-10-26 14:41
```

**Line kinds — a closed list:** `open` · `source` · `independence` · `baseline` · `drift` · `item` ·
`grill` · `funnel` · `default` · `fix` · `slot` · `question` · `discard` · `answered` · `left` ·
`applied` · `flagged` · `vetoed` · `check` · `unverified` · `directive` · `ready` · `note` · `paused` ·
`closed`. No paragraphs; explanations go in the run report.

- `item` names what a write touched and the **depth** of what it wrote: 1 from a source or the first
  request, n+1 when written from an answer to a question of depth n.
- The entry is opened (`open`) before the run's first write and closed (`closed` with the time) after
  its last. A run that stops early writes `paused` with what was outstanding.
- Write the lines with one append per phase boundary, not one edit per line.

## 4. The lock

`bf.py lock <home>` prints the newest entry with no `closed`/`paused` line and its age (from the log
file's modification time). Another session's open entry younger than 30 minutes halts a write run with
one plain line. Older, or the owner says that session stopped: append `- note closed as abandoned by
<run-id>` and `- paused` to that entry, then proceed and say so.

## 5. Answers given in chat

At the start of any command, read the owner's invocation for answers: *"q-3: 2"*, *"q-5 — no, keep it
per person"*, *"answer 4: yes"*, *"drop D3"*, *"reject q-6, not needed"*.

- **An answer** → that row's `Answer & why` gets the owner's words **verbatim** (string-matched against
  the message) plus, where they named a direction by number, the direction's text after it:
  `2 — "Closed challenges can stay pinned…" (owner, in chat, 2026-10-26)`. Status → `Answered`.
  `resolve` (or the rest of this command, if it is `resolve` or `auto`) applies it.
- **A rejection** → `Rejected`, with their reason verbatim. *"Not needed"* / *"already decided"* removes
  the marker (feature-shape.md §7 route 2); *"ask it better"* keeps it and the question is redrafted
  next grill.
- **A veto** (*"drop D3"*, *"undo fix 2"*, *"drop S1"*) → the default/fix/slot is removed (a fix reverts
  to the quoted old text), its gap becomes a marker `→ asked next run`, and it is never defaulted again.
  One `vetoed` line quoting their words.
- Words that are not clearly one of these are not recorded; the reply says which ones it did not apply.

## 6. The run report — `record/runs/<run-id>.md`

Written at the end of every write run. Sections, each present (`None.` when empty):

- **Summary** — what the run did, in plain words.
- **Funnel** — candidates by lens and pass; candidates → product → fix → default → slot → questions →
  discarded.
- **Questions written** — `q-NN`, title, why, in impact order.
- **Defaults ledger** — per default: `D-n` · the sentence · grounding (pattern anchor / convention) ·
  (a)(b)(c)(d) one clause each · *does not decide:* the owner-owned thing it leaves alone · router verdict.
- **Fixes** — old text, new text, the evidence.
- **Slots** — the content manifest.
- **Product facts added** — `B-n` lines added because a finding was answered by the code.
- **Discards** — filter, evidence, one-line counter-case each, grouped by filter.
- **Checks** — each agent dispatched: role, model, verdict counts; every non-clean verdict with its
  evidence; cold-read rewordings old → new.
- **Unverified** — every item written without its second check, and the total.
- **Drift and reports for others** — wiki or doc corrections, test/code disagreements.
- **Directives** — any text that tried to steer the run, quoted.

## 7. The reply — what the owner reads in chat

Short, plain, no phase codes or run ids. In this order, skipping empty parts:

1. **First line:** what happened, and the unverified total if any (*"Feature drafted: 9 requirements,
   3 changes to existing behaviour, 7 questions for you."*).
2. **Questions for you** — up to 10, in impact order: `q-NN` — the question — `Recommended: <n>`.
   Then: *"Answer here (e.g. "q-2: 1, q-5: no …"), in questions.md, or say `answer` and I'll answer what I
   safely can."*
3. **Adopted on your behalf** — defaults and fixes by number, one line each, riskiest first; *"say "drop D3"
   to undo one."*
4. **Worth knowing** — wiki drift, a test that disagrees with the code, a contradiction in the sources,
   directives ignored.
5. **Next step** — one line. Where the home was created, its path.
