# The shape of FEATURE.md

`FEATURE.md` is the feature's PRD: what changes for whom, against what the product does today. It is
read by whoever plans and builds the feature, and by the owner. The template is
[../templates/FEATURE.md](../templates/FEATURE.md); this file is the single home of what each block
holds and how lines in it are written.

## 1. Blocks, in order

| Block | Holds | Cap |
|---|---|---|
| Header | Title, one-line `What it does`, `Status:` line, `Product:` line (repos and commits the baseline was verified at) | 4 lines |
| `## Summary` | What changes, for whom, in plain words | 2–3 sentences |
| `## Why` | The problem, who has it, why now — only as far as a source says | 1–4 sentences |
| `## Who` | Each actor the feature affects, using **the product's existing role names** (from the baseline), one line each: the actor and what they get or lose. An actor the requirements name must appear here | 1 line per actor |
| `## Scope` | `### In` — the capabilities, one line each, each pointing at its `Behaviour` part. `### Not doing` — decided exclusions (§4) | — |
| `## Today` | The existing surfaces, data and flows this feature touches, one line each, pointing at baseline facts (`B-n`). Context, not requirements | ≤ 10 lines |
| `## Behaviour` | Numbered requirements `FR-n`, grouped under `### <part>` headings when the feature has parts | — |
| `## Changes to existing behaviour` | `CH-n` lines: what users experience today (cited) and what they experience after | — |
| `## Must stay the same` | `KEEP-n` lines: existing behaviour this feature touches and must not change | — |
| `## Edge cases` | Empty, first-run, error, offline, slow, many, permissions, ties and ordering, concurrent edits by two people — each a decision, written | — |
| `## Data and compatibility` | What happens to records that exist before the feature ships · people on older app versions · offline queue and sync to other members · leaving, removal, closing, deleting, account deletion · what is stored, who can see it, how long it lives | — |
| `## Copy and content` | Every new user-visible string or asset: where it shows, when, what it must say. Wording is illustrative unless the owner gave it; final wording is a content slot (§6) | — |
| `## Rabbit holes` | Implementation traps and the call already made about each — never a call nobody made. Empty: `None yet.` | — |
| `## Open questions` | Generated list of the open `q-NN` rows that touch this feature (title + status), rebuilt at every write — never typed under | — |

Blocks that do not apply carry one line saying so (`None — the feature stores nothing new.`), never a
bare heading. A missing block is reported, never filled with invented content.

## 2. Requirements

**`FR-n` — one trigger, one actor, one observable outcome**, condition first: *"When a member pins a
challenge, it moves to the top of their Challenges list."* Three tests:

1. You can picture it failing. If you cannot, it is a wish and does not belong.
2. *And* between two outcomes means two requirements.
3. It reads on its own — never *"FR-4: the same, offline"*.

**What, never how.** No table names, components, functions or libraries in `Behaviour`, `CH` or `KEEP`
lines — those belong to planning. Name things as users and the product name them (the baseline's terms).
A mechanism the owner insists on is a `Rabbit holes` line.

**Hedged source words.** A deferred or undecided choice (*"maybe by colour, or by pattern, need to
think"*) is a marker and a question; no requirement commits either option. A tentative wish (*"would be
nice if"*) is written labelled with the owner's words:
`FR-6 — Tentative (your note: "maybe a little wiggle when you pin it"): pinning plays a short motion on the row.`
A hedged quantity keeps its hedge word and gains a marker asking for the number.

## 3. Changes and keeps

```
CH-2 — Today: the Challenges list orders open challenges by most recent activity (B-4).
       After: pinned challenges come first, in the order they were pinned; the rest keep today's order.
KEEP-1 — Closed challenges still sit below open ones, pinned or not (B-5).
```

- **Every existing surface, record or flow the feature's requirements touch has a `CH` or a `KEEP`** —
  the lens 3 check ([grill.md](grill.md)) enforces it. That is how this document says what the feature
  must not break.
- A `CH` line's *Today* half cites a baseline fact; its *After* half is sourced (the owner, an answer) —
  never a default ([rules.md](rules.md) §4).
- A `KEEP` line cites the fact it keeps. It is sourced, or a default (`Default D4 (keeps today's
  behaviour — adopted <date>)`), since keeping is the conservative choice.

## 4. Not doing

`- No <thing> — because <why>; revisit if <condition>.` The *why* and *revisit if* come from a source; a
refusal with no stated why stands without one and the report names it; a run never invents either. A
feature the owner places later (*"phase 2"*, *"not now"*) is one `Not doing` line — no requirements for it.

## 5. Defaults

One labelled sentence, one decision, in the block where it bites:

```
Default D3 (existing pattern — sheets open and close the same way everywhere, B-12 — adopted 2026-10-26): the pin confirmation uses the app's standard bottom sheet.
Default D5 (standard practice — adopted 2026-10-26): a pin made offline shows at once and is sent when the connection returns.
Default D6 (keeps today's behaviour — B-7 — adopted 2026-10-26): leaving a challenge removes it from the list whether it was pinned or not.
```

- Three grounds, named in the label: **existing pattern** (cite the baseline fact or code anchor — the
  strongest ground), **keeps today's behaviour** (cite), **standard practice**.
- `D-n` numbers are issued once and never reused; *"drop D3"* is how the owner vetoes one.
- Add `, unverified` after the date when no second agent checked the routing.
- Every default has a ledger line in that run's report ([record.md](record.md) §6): grounding, the four
  attestations, and what owner-owned thing it does not decide.
- A default never overrides existing text, never adds a capability, actor, permission or channel beyond
  the gap it fills, and never names a figure, vendor or standard no source or product fact gives.

## 6. Content slots

```
Copy slot S2 — the empty state of the Pinned group · one line under 60 characters · owner writes, or approves at build · illustrative: "Pin a challenge to keep it on top."
```

A slot says what is owed, its shape and bounds, and who supplies it. Decisions *about* content — whether
a message exists, when it shows — are requirements or questions, not slots.

## 7. Markers

```
[NEEDS CLARIFICATION: FR-5 — is there a limit to how many challenges one person can pin? → q-03]
```

- Names the entity (requirement, block, actor), then the gap. *"Is this right?"* is not a marker.
- Points at its question (`→ q-03`) — or reads `→ asked next run` between the run that found it and the
  run that writes its question. No other ending.
- A marker blocks nothing; it is counted by `status` and `ready`.

**A marker is removed only by one of these, and the log line names which:**

1. its answer is applied (`resolve`) — removing it and writing the answer are one act;
2. its question was rejected as *not a real gap* or *already decided*, or closed;
3. it became a `Not doing` line (a decided exclusion);
4. it became a default or a content slot (cite the `D-n` / `S-n`);
5. new owner material settled it (`add`, cite the source);
6. the product settles it — a verified baseline fact answers it (cite `B-n`);
7. the run that minted it discarded its gap on a filter that writes the resolution into the document
   (cite the discard line).

A run never removes a marker without one of these, and never writes an answer in without a question row.

## 8. IDs and provenance

- `FR-n`, `CH-n`, `KEEP-n`, `D-n`, `S-n`, `q-NN`, `B-n` are whole numbers, issued once, **never
  renumbered or reused** (`record/ids.json`, kept by `bf.py ids`). No `FR-3a`.
- Withdrawing a line leaves a tombstone: `FR-4 — withdrawn 2026-10-27, replaced by FR-9.`
- A line a run changed or added from an answer or new material gets one provenance line under it:
  `*(From q-04, 2026-10-27 — replaces: "pinned challenges sort by name".)*` or
  `*(From your note of 2026-10-27.)*`. Lines written by `init` from the first request carry none — the
  request is their source.
- No run id, lens, phase code or check name ever appears in `FEATURE.md` ([rules.md](rules.md) §9).

## 9. Single home, with one exception

Each fact lives in one place: product facts in `baseline.md`, decisions in `FEATURE.md`, questions and
answers in `questions.md`. **The exception:** a requirement must be buildable from `FEATURE.md` itself,
so where a link would leave it underspecified, the governing fact is restated inline with its `B-n`.

## 10. The acceptance test

Hand `FEATURE.md` and `baseline.md` to someone who has never seen the project, with the code. They
should be able to say what changes, what must not, what each part must and must not do — and the only
things they would still have to guess are the open questions, listed. `ready` runs exactly this test
with a fresh agent ([../commands/ready.md](../commands/ready.md)).
