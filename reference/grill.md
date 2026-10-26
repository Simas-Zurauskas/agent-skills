# The grill — lenses, sweeps and sizing

The grill attacks `FEATURE.md` to find what it cannot answer yet. It is the single home of the lenses;
commands point here. Each lens is a separate frame — a reader looking for everything finds the average
of it; a reader trying to break one thing finds it — and each candidate says which lens found it.

## 1. Two scales

| Scale | When | Passes (agents, concurrent) |
|---|---|---|
| **Delta** | `add`, `resolve`, bare `questions` | **2** — pass A: lenses 1 + 2 over the changed text; pass B: lenses 3 + 4 over the changed text against the baseline. The sweeps run only as far as the changed text touches them, inside those passes. Nothing changed → no passes |
| **Full** | `init`, `questions full`, `ready` | **4** — pass 1: lenses 1 + 2 over every requirement; pass 2: lens 3 (collisions) with code access; pass 3: lens 4 (lifecycle and compatibility) with code access; pass 4: lens 5 + the absence sweeps |

**Changed text** = every line a write since the last `grill` log line added or changed (the log's `item`
lines name them), plus every line naming a record, surface or actor the changed lines name.

Brief: [../briefs/grill-pass.md](../briefs/grill-pass.md). Every pass gets the whole of `FEATURE.md`,
`baseline.md`, every question row with its status and answer, the defaults ledger, the project rules,
and read-only access to the product's repos — **a pass that cannot see the rest of the document asks
what the document already answers.** Only the attack surface narrows at the delta scale.

**Every pass disposes before it emits:** it first tries to settle each candidate from the document, the
baseline, the code, or one dominant convention, and emits it tagged with what settled it (`product`,
`default`, `fix`) rather than as a question. **An empty pass is a success,** never something to
compensate for.

## 2. The lenses

**Lens 1 — the builder who must not guess.** Walk each requirement as if implementing it tomorrow with
the codebase open, forbidden from deciding anything **the owner owns**: scope, money, user-visible
promises, wording, data kept or shown to others, legal posture. Every place you would have to stop and
ask the owner is a candidate. A place where the codebase already shows the answer is a `product`
candidate; where you would simply follow the product's existing pattern or the trade's convention, a
`default` candidate.

**Lens 2 — the hostile tester.** Attack each `FR`, `CH`, `KEEP`:
- **two drafts** — write both behaviours the sentence could mean; where they diverge observably, the
  divergence names the candidate;
- **reachability** — a constructed case counts only if the state is reachable in the product as it is
  (check the code) and a requirement hangs on which reading wins; unreachable hypotheticals are discarded;
- **dependency** — every term, event or value a requirement consumes is produced by another requirement,
  a baseline fact, or a source; otherwise a candidate;
- **boundary** — limits, counts and thresholds at the exact edge and just past it.

**Lens 3 — collision with the existing product.** The lens this skill adds, and the one that finds what
breaks. For every surface, record and flow in the baseline — and every other feature the cartographers
named in the blast radius:
- does `FEATURE.md` say what happens to it — a `CH` or a `KEEP`? A touched thing with neither is a
  candidate (often a `KEEP` default);
- where this feature and an existing one act on the same record or screen, which wins, and what does
  each actor see?
- does any requirement break a project rule, an invariant or a contract in the baseline?
- **search past the baseline**: grep the code for the records and surfaces the feature touches and name
  any consumer the baseline missed (a share card that renders the same row, a notification that names
  the same thing, a marketing page that shows it). A missed consumer is a candidate and a baseline gap.

**Lens 4 — lifecycle and compatibility.** What exists on the day it ships: records created before the
feature, in-flight states, defaults for old data · people on older app versions alongside new ones, and
what each sees of the other's actions · offline: an action queued without a connection, replayed later ·
sync to other members, and to the same person's other device · leave, removal, rejoin, closing,
deletion, account deletion, data export · release order (a backend that ships before the app update).
A state is a candidate only where the product makes it reachable and two plausible behaviours differ in
what someone sees or is promised.

**Lens 5 — who it is for, and what done looks like.** Reconcile `Who` against the requirements both ways:
an actor no requirement serves; an actor the requirements name that `Who` does not; a job no requirement
delivers. Empty and first-run states, discoverability (how does anyone learn the feature exists?), and
scale (one item, many items, the most a real user has — read limits from the code).

## 3. Absence sweeps (in the full pass 4, and in delta passes only where the change touches them)

*Which of these does no line cover?* — worked only where the feature has the thing the checklist is about:

- **Permissions** — per actor, per new action: who may, who may not, what the others see.
- **Visibility and privacy** — is the new thing personal or shared? Who sees it, in which surfaces,
  including notifications, share images, previews.
- **Notifications** — does anything new notify, or change what an existing notification says or when?
- **Data lifecycle** — created, shown, changed, exported, deleted, and what deletion takes with it.
- **Platforms and form factors** — the product's actual matrix (read it from the baseline): phone and
  tablet, each OS, light and dark, the product's themes.
- **Copy** — every new string accounted for in `Copy and content`.
- **Trust** — per thing the feature accepts on faith: what someone gains by abusing it.
- **Undo and mistakes** — the wrong tap, the reversal, the double tap.

**A project rule that excludes a topic removes its sweep** (rules.md §8), and the report says which.
Generic checklist candidates that no source, requirement or product fact makes bite are discarded
(*Generic checklist*).

## 4. Bounds

- **Depth.** Text a run wrote from an answer is attacked by later runs, not by the same run. A candidate
  grounded in text written from an answer to a question that was itself derived from an answer
  (depth 3) is never written as a question — it becomes a default, a rabbit hole, or a discard. The
  depth is read from the `item` lines in the log.
- **Repeat round** only when the owner asks; two rounds is a budget, never a completeness claim.
- **An empty grill never proves completeness.** It is evidence; `ready` adds the dry run because a
  builder actually trying to plan finds what readers miss.

## 5. What each pass returns

A fenced JSON array, one object per candidate:
`{ "id": "A7", "lens": 3, "about": "FR-5" | "CH-2" | "feature", "gap": "<one sentence>",
"grounding": ["<verbatim quote from FEATURE.md / baseline / source, with where>"],
"settled_by": null | {"kind": "product"|"default"|"fix", "evidence": "<quote or anchor>"},
"two_answers": ["<spec sentence if answered one way>", "<the other way>"], "why_it_matters": "<what
someone would see or be promised differently>" }`.
The orchestrator merges passes, then disposes ([dispositions.md](dispositions.md)).
