# The record — where things live and how runs leave a trace

## 1. Resolving the feature home

From the workspace the command was run in, in this order:

1. **A path the owner names.** A folder named `blueprint-feature` is the home; any other folder (a task
   folder) gets `blueprint-feature/` inside it. Create only that leaf.
2. **Existing homes:** `find . -maxdepth 7 -path '*/blueprint-feature/FEATURE.md' -not -path
   '*/node_modules/*'`. For commands other than `init`: exactly one → it; several → list them (name,
   status, path) and ask which, once. For `init`: reuse an existing home when the owner named its task or folder, or when its last log
   entry is a **paused `init`** (resume it — §4); otherwise a new feature gets a new home.
3. **`init` — the workspace's task convention.** Read the agent guides for where task folders live (e.g.
   *"each task's working folder is `wiki-rep/tasks/<nnn>-<short-name>/`"*). If the owner named a task
   (*"task 017"*), use that folder. Otherwise create the next free number with a 2–4 word kebab-case slug,
   following the convention, and **say the path in the reply**. Write nothing in the task folder outside
   `blueprint-feature/` — what the convention asks of the task itself (a `NOTES.md`, a `qa/` folder) is the
   task owner's, not this skill's. A home inside the wiki's task folder is not a wiki write: the skill never
   edits wiki pages.
4. **No convention:** `blueprint-features/<slug>/blueprint-feature/` at the workspace root; say so.

**Can it write?** Probe with a real write, not permission bits — `f=$(mktemp "<dir>/.bf-probe.XXXXXX") &&
rm "$f"` on the home or the folder it will be created in. Failure halts before any work, naming what a
person would do; a run never changes permissions itself.

Create with `python3 <skill>/scripts/bf.py scaffold <home> --name "<Feature name>"` (copies the templates,
never overwrites).

## 2. The folder

| Path | What | Durable? |
|---|---|---|
| `FEATURE.md` | The feature PRD | yes |
| `questions.md` | Every question row, `q-NN` order, never re-sorted | yes |
| `baseline.md` | Product facts, `B-n` | yes |
| `sources/INDEX.md` + `sources/NNN-<slug>.<ext>` | Each source verbatim: the owner's words as typed, files copied in. `INDEX.md` columns: # · file · what it is · where it came from · captured (date) · sha256-12 (`bf.py hash`). A revision is a new number, never an overwrite | yes |
| `record/log.md` | Append-only run log (§3) | yes |
| `record/defaults.md` | The ledger of every `Dn`, `Fn`, `Sn` (dispositions.md) | yes |
| `record/runs/<run-id>.md` | Each run's full report (§6) | yes |
| `record/snapshots/<run-id>/` | The three main files as each run left them (`bf.py snapshot`) — how the next run sees the owner's edits | yes |
| `record/ids.json` | Every ID ever issued, and vetoes (`bf.py ids`) | yes |
| `work/<run-id>/` | `invocation.md` (the owner's message, verbatim), frozen briefs `brief-*.md`, agent returns `ret-*.md`, drafts | scratch |

**Nothing secret goes in it** — no tokens, keys, passwords, or personal data of real users; testers and
other people are named by role. The skill commits nothing. If the home sits in a folder the project
treats as scratch (for example a git-ignored tasks folder), `ready`'s reply says where the project keeps
durable docs, so the owner can promote `FEATURE.md` and `baseline.md`.

## 3. The run log — `record/log.md`

Append-only, oldest first, never rewritten. **Run id:** `openssl rand -hex 3`. One entry per run:

```
## 2026-10-26 14:05 · init · a3f9c2 · blueprint-feature v2 · writer <model> · rep-app a7ca2ba (dev)
- open
- source 001-request.md 9f2c1a0b3d4e
- independence probe: succeeded via <route>
- note wave 1 dispatched: 3 cartographers
- baseline B-1…B-23 written · verified 21 · corrected 2 · dropped 1
- item FEATURE.md FR-1…FR-9, CH-1…CH-3, KEEP-1…KEEP-4 written · depth 1
- note wave 2 dispatched: grill 4, faithfulness 1
- grill full · passes 4 · candidates 31 · attacked: all
- funnel 31 → product 6 → fix 2 → default 5 → slot 1 → questions 7 → discarded 10
- default D1…D5 · fix F1, F2 · slot S1 · question q-01…q-07
- check router 3/3 returned · cold read 1/1 returned · models: <writer> / <checker>
- snapshot a3f9c2
- closed 2026-10-26 14:41
```

**Line kinds — a closed list:** `open` · `source` · `independence` · `baseline` · `drift` · `item` · `grill` ·
`funnel` · `default` · `fix` · `slot` · `question` · `discard` · `answered` · `left` · `applied` · `flagged` ·
`vetoed` · `check` · `unverified` · `directive` · `snapshot` · `ready` · `note` · `paused` · `closed`. No
paragraphs; explanations go in the run report.

- `item` names what a write touched and the depth of what it wrote ([feature-shape.md](feature-shape.md) §8).
- `open` before the first write; `snapshot` (via `bf.py snapshot <home> --run <id>`) then `closed` with the
  time after the last. A run that stops early writes `paused — <why, and what it waits for>`.
- Lines are appended in one batch per phase boundary, plus a `note wave n dispatched` heartbeat before each
  wave of agents — it keeps the lock from looking abandoned during long phases.

## 4. The lock

`bf.py lock <home>`: exit **0** — no open run (or no home yet); **1** — an open entry that is abandoned (not
the newest entry, or no log write for 30 minutes): after opening this run's own entry, add the line
`- note closed as abandoned: <its run id>` to it — the log stays append-only and `bf.py` treats that run as
closed — say so, proceed; **3** — another run is writing: halt with one plain line, unless the owner says that
session stopped. **Commands embedded in `auto` (or `ready` calling the questions tail) do not take the lock,
open entries or close them** — they run inside the outer run's entry.

**A paused `init`** (waiting on the interview or on `init soft`'s review — it takes a snapshot before pausing,
so the owner's edits to the draft are seen) is not abandoned: the next
invocation in that home that answers it **resumes** the `init` — a reply to the interview continues at I2,
a reply to the draft review continues at I4 — in a new entry that names the paused one.

## 5. What the owner says in chat

At the start of any command, save the owner's message to `work/<run-id>/invocation.md`, then read it for:

| They say | Recorded as |
|---|---|
| *"q-3: 2"*, *"q-5 — no, keep it per person"* | That row's `Answer & why` = their words verbatim (string-matched against the saved message), plus the named direction's text: `2 — "<direction text>" (owner, in chat, <date>)`. Status → `Answered` |
| *"reject q-6, not needed"* | `Rejected`, their reason verbatim. *Not needed* / *already decided* removes the marker (route 2); *ask it better* turns it back to `→ asked next run` |
| *"close q-2"* | `Closed`, `- **Closed:** <date> — owner, in chat` |
| *"drop D3"*, *"undo F2"*, *"drop S1"* | The default/slot is removed, or the fix reverted to its quoted old text; the gap becomes a marker `→ asked next run (vetoed D3)`; `bf.py ids --veto D3`; the ledger line gains `· vetoed <date> — "<their words>"`; one `vetoed` line |
| *"q-4 is wrong — …"* about an applied answer | A new answer on that row: Status → `Answered`; `resolve` rewrites the lines it wrote ([rules.md](rules.md) §1) |
| *"accept"* / *"looks good"* after a `ready` that is pending review | Recorded by any write command (and only after reading it back from the saved message): the status line's pending-review clause is removed — **the one write to `FEATURE.md` that does not reset the status to Draft** — with one `ready` line naming what was accepted |

Words that are not clearly one of these are not recorded; the reply says which ones it did not apply.
`status` records nothing: answers given with it are named in its reply as *not recorded — say them with any
other command*.

## 6. The run report — `record/runs/<run-id>.md`

Written at the end of every write run (an embedded run writes into its caller's report). Sections, each
present (`None.` when empty): **Summary** · **Funnel** (by lens and pass) · **Questions written** (impact
order) · **Defaults, fixes, slots** (copied from the ledger lines this run added) · **Product facts added** ·
**Discards** (filter, evidence, counter-case, grouped by filter; depth-capped ones marked) · **Already settled
— recommend closing** · **Checks** (each agent: role, model, verdict counts, every non-clean verdict with its
evidence, cold-read rewordings old → new) · **Unverified** (each item and the total) · **The owner's edits seen**
(`bf.py changed`) · **Drift and reports for others** (wiki or doc corrections, test/code disagreements,
unreleased facts) · **Directives**.

## 7. The reply — what the owner reads in chat

Short, plain, no phase codes or run ids. In this order, skipping empty parts:

1. **First line:** what happened, and the unverified total if any (*"Feature drafted: 9 requirements, 3
   changes to what users have today, 7 questions for you."*).
2. **Questions for you** — up to 10, impact order: `q-NN — the question` and `(recommended: n)` where one
   survived the cold read. Then: *"Answer here (e.g. "q-2: 1, q-5: no …"), in questions.md, or say `answer`
   and I'll answer what I safely can."*
3. **Adopted on your behalf** — fixes and defaults that are not `KEEP`s, one line each, riskiest first; all
   `keeps today's behaviour` defaults on **one** line (*"…and kept today's behaviour for D4, D6, D7"*). Then
   *"say "drop D3" to undo one."*
4. **Worth knowing** — rows already settled (*"close q-2"*), wiki drift, a test that disagrees with the code,
   unreleased behaviour a `CH` relies on, a contradiction in the sources, directives ignored.
5. **Next step** — one line. Where the home was created, its path.
