# The shape of FEATURE.md

`FEATURE.md` is the feature's PRD: what changes for whom, against what the product does today. It is
read by whoever plans and builds the feature, and by the owner. Template:
[../templates/FEATURE.md](../templates/FEATURE.md). This file is the single home of what each block
holds and how its lines are written; `bf.py lint` checks the shapes.

## 1. Blocks, in order

| Block | Holds | Cap |
|---|---|---|
| Header | Title, `**What it does:**` one line, `Status:` line, `Product:` line — each repo and commit the baseline was last verified at (rewritten whenever the baseline is re-verified) | 4 lines |
| `## Summary` | What changes, for whom, in plain words | 2–3 sentences |
| `## Why` | The problem, who has it, why now — only as far as a source says | 1–4 sentences |
| `## Who` | Each actor the feature affects, using **the product's own role names** (from the baseline), one line each: the actor and what they get or lose. Every actor a requirement names appears here | 1 line per actor |
| `## Scope` | `### In` — the capabilities, one line each, pointing at their `Behaviour` part. `### Not doing` — decided exclusions (§4) | — |
| `## Today` | The existing surfaces, data and flows this feature touches, one line each, pointing at baseline facts (`B-n`). Context, not requirements | ≤ 10 lines |
| `## Behaviour` | Numbered requirements `FR-n`, under `### <part>` headings when the feature has parts | — |
| `## Changes to existing behaviour` | `CH-n` lines: what users have today (cited) and what they have after | — |
| `## Must stay the same` | `KEEP-n` lines: existing behaviour this feature touches and must not change | — |
| `## Edge cases` | Empty, first-run, error, offline, slow, many, permissions, ties and ordering, two people acting at once, day boundaries and time zones where time matters — each a decision, written | — |
| `## Data and compatibility` | **The compatibility table** (§9), then: what is stored, who can see it, how long it lives, what deletion takes with it | — |
| `## Copy and content` | Every new user-visible string or asset: where, when, what it must say. Use supplied or delegated wording; a genuinely owed asset is a bounded slot (§6) | — |
| `## Rabbit holes` | Implementation traps and the call already made about each — never a call nobody made. Empty: `None yet.` | — |
| `## Open questions` | Generated from `questions.md` at every write: each `Open`/`Answered`/`Flagged` row touching the feature, `q-NN — title (status)`. Never typed under | — |

A block that does not apply carries one line saying so (`None — the feature stores nothing new.`). A
block with a real unresolved definition gap carries `Not covered yet.` or a linked marker. Draft ordinary
behavior directly; do not leave it blank solely to make another agent fill it. No marker per empty block.

## 2. Requirements

**`FR-n` — one trigger, one actor, one observable outcome**, condition first: *"When a member pins a
challenge, it moves to the top of their Challenges list."* Three tests:

1. You can picture it failing. If you cannot, it is a wish and does not belong.
2. *And* between two outcomes means two requirements.
3. It reads on its own — never *"FR-4: the same, offline"*.

**What, never how.** No table names, components, functions or libraries in `Behaviour`, `CH` or `KEEP`
lines. Name things as users and the product name them (the baseline's terms). A mechanism the owner
insists on is a `Rabbit holes` line.

**Hedged source words.** An undecided choice (*"maybe by colour, or by pattern"*) is a marker and a
question; no requirement commits either option. A tentative wish (*"would be nice if"*) is written with
the owner's words as its label:
`- FR-6 — Tentative (your note: "maybe a one-tap Log right on a pinned row"): a pinned row offers Log without opening the challenge.`
A hedged quantity keeps its hedge word and gains a marker asking for the number.

## 3. Changes and keeps

```
- CH-2 — Today: the Challenges list orders open challenges by most recent activity (B-4).
  After: pinned challenges come first, in the order they were pinned; the rest keep today's order.
- KEEP-1 — Closed challenges still sit below open ones, pinned or not (B-5).
- KEEP-3 — Default D4 (keeps today's behaviour — B-7 — adopted 2026-10-26): leaving a challenge removes it from the list, as today.
```

- **Every existing surface, record or flow a requirement touches has a `CH` or a `KEEP`** (lens 3, lint's
  coverage check). That is how this document says what the feature must not break.
- A `CH` line's *Today* half cites a baseline fact; its *After* half comes from the owner's words, an
  answer, or — where the request necessarily changes that surface — the run's default making the smallest
  change that delivers it. A change that takes away what users have is serious: a question
  ([rules.md](rules.md) §4).
- A `KEEP` cites the fact it keeps. It is sourced, or a default in the form above.

## 4. Not doing

`- No <thing> — because <why>; revisit if <condition>.` The *why* and *revisit if* come from a source; a
refusal with no stated why stands without one; a run never invents either. A part the owner places later
(*"phase 2"*, *"not now"*) is one `Not doing` line — no requirements for it.

## 5. Defaults

One labelled sentence, one decision, in the block where it bites — as its own bullet, or as the text of a
`KEEP` line:

```
- Default D3 (existing pattern — every sheet in the app opens and closes the same way, B-12 — adopted 2026-10-26): the unpin confirmation uses the app's standard bottom sheet.
- Default D5 (standard practice — adopted 2026-10-26): pinning and unpinning take effect on screen at once, without a confirmation step.
- Default D6 (chosen design — rep-ui-lab themes F1, frame "pin list" — adopted 2026-10-26): the pin mark sits at the row's trailing edge.
```

- **Grounds**, named in the label, strongest first: `existing pattern` (cite the baseline fact or anchor),
  `keeps today's behaviour` (cite), `chosen design` (a design the owner named as chosen; cite file and
  frame), `standard practice`, and **`simplest fit`** — the run's own call when nothing stronger applies: the
  option that delivers what the owner asked with the least to build, the fewest new promises and the least
  change to what users have, naming the option it passed over:
  `- Default D8 (simplest fit — over "pins also sync live to open screens" — adopted 2026-10-26): a pin made on one device shows on the others the next time their list loads.`
- `Dn` numbers come from `bf.py ids --next D` and are never reused; *"drop D3"* is the owner's veto.
- Add `, unverified` when required substantive review was unavailable/incomplete. Planned review of a
  Draft is recorded as pending; it is never claimed complete merely because counts are zero.
- Every default has one concise `record/defaults.md` entry: decision, ground, scope/reversibility
  evidence. Record per-run review status in the report/log. Apply rules §4; no per-item reviewer or
  attestation form.
- A default never overrides existing text, never adds a capability, actor, permission, channel or state
  beyond the gap it fills, and never names a figure, vendor or standard no source or product fact gives.

## 6. Slots

```
- Copy slot S2 — the empty state of the Pinned group · one line under 60 characters · owner writes or approves at build · illustrative: "Pin a challenge to keep it on top."
- Design slot S3 — the pin mark's glyph and its pressed state · owner picks in the design lab before build.
```

A slot says what is actually owed, its shape/bounds and supplier. Honor supplied/delegated content and
design choices; do not require another owner approval when they already authorized the run to choose.
Decisions about whether a message exists or when it shows are behavior, not content slots. A bounded
future asset does not block planning when its required behavior and constraints are defined.

## 7. Markers

```
[NEEDS CLARIFICATION: FR-5 — which collaborators may see the new notes? → q-03]
```

- Names the entity (requirement, block, actor), then the gap.
- Ends `→ q-NN`, or `→ asked next run` between the run that found the gap and the run that writes its
  question. A gap whose default the owner vetoed ends `→ asked next run (vetoed D3)` and is never
  defaulted again.
- A marker blocks planning readiness until settled; it need not prevent unrelated definition work.

**A marker is removed only by one of these, and the log line names which:**

1. its answer is applied (`resolve`) — removing it and writing the answer are one act;
2. its question was rejected as *not needed* or *already decided*, or closed by the owner — an *ask it
   better* rejection turns it back to `→ asked next run`;
3. it became a `Not doing` line;
4. it became a default or a slot (cite `Dn` / `Sn`);
5. new owner material settled it (`add`, cite the source);
6. a verified baseline fact settles it — **only for a gap about current behaviour** ([rules.md](rules.md) §4);
7. the run that minted it discarded its gap on a filter that writes the resolution into the document
   (cite the discard).

Every other outcome keeps the marker, linked to a question. A run never removes a marker without one of
these. Question answers retain their rows; supplied new material and eligible defaults do not need
manufactured question rows.

## 8. IDs, provenance and depth

- `FR-n`, `CH-n`, `KEEP-n`, `B-n`, `q-NN`, `Dn`, `Sn`, `Fn` are whole numbers, issued once, **never
  renumbered or reused** (`record/ids.json`, `bf.py ids`). No `FR-3a`. An ID line is written
  `- FR-3 — text`.
- Withdrawing a line leaves a tombstone: `- FR-4 — withdrawn 2026-10-27, replaced by FR-9.`
- **Provenance** — one line under each line a run adds or changes after `init`:
  - `*(From your note of 2026-10-27.)*` — new owner material;
  - `*(From q-04, 2026-10-27 — replaces: "<old text>".)*` — the owner's answer;
  - `*(From q-04 — delegated answer, 2026-10-27.)*` — a delegated answer (never with `replaces`);
  - `*(Corrected F2, 2026-10-27 — was: "<old text>".)*` — a fix that replaced text;
  - `*(Added F3, 2026-10-27 — from sources/002-notes.md.)*` — a fix that added a missing sourced fact.
  When the old text held a marker or a default label, quote it with that part shortened to `[…]` — `bf.py`
  ignores everything inside a provenance line either way.
  Lines `init` writes from the first request carry none; the request is their source.
- **Depth** of a line: 1 for `init` lines and owner material; for a line from `q-NN`, that row's `Depth`
  plus 1. A question's `Depth` is the deepest line its grounding quotes (1 for a gap grounded in an
  absence). Depth is legacy traceability; correction rounds are bounded by [grill §4](grill.md), never by
  silently dropping a real serious decision.
- No run id, phase code or check name ever appears in `FEATURE.md` ([rules.md](rules.md) §9).

## 9. Relevant compatibility decisions

Use a small table covering actual supported combinations and affected lifecycle, such as existing data,
old/new clients or servers, different actors, deletion/export and reversal. Every relevant cell needs
observable behavior, sourced intent or an eligible default; a serious unknown links its question.
Do not copy a universal matrix of unreachable combinations. State why omitted dimensions are irrelevant.
When none apply, `None — <why>` is valid. No blanket promise of offline/rolling-version support that the
product does not have. Keep deployment unknowns separate from implemented facts (baseline §2).
