# The grill — lenses, sweeps and sizing

The grill attacks `FEATURE.md` to find what it cannot answer yet. This is the single home of the lenses;
commands point here. Each lens is a separate frame — a reader looking for everything finds the average of
it, a reader trying to break one thing finds it — and each candidate says which lens found it.

## 1. Scales

| Scale | When | Passes (agents, concurrent) |
|---|---|---|
| **Delta** | `add`, `resolve`, bare `questions` | **2** — A: lenses 1 + 2 over the changed text · B: lenses 3 + 4 over the changed text against the baseline. Sweeps only as far as the changed text touches them. Nothing changed → no passes |
| **Full** | `init`, `questions full`, `ready` | **4** — 1: lenses 1 + 2 over every line · 2: lens 3 · 3: lens 4 · 4: lens 5 + the sweeps (§3) |
| **Full, small change** | as Full, when the feature has one `Behaviour` part and at most ~5 requirements | **2** — A: lenses 1 + 2 · B: lenses 3, 4, 5 + sweeps — each lens still worked separately inside its pass |

**Changed text** = the lines the `item` log lines since the last `grill` line name, **plus the owner's
edits since the last run** (`bf.py changed`), plus every line naming a record, surface or actor those lines
name.

Brief: [../briefs/grill-pass.md](../briefs/grill-pass.md). **Paste the full text of the pass's lenses from
§2 (and §3 for the pass with the sweeps) into `{{LENSES}}`** — an agent cannot follow links back into this
skill. Every pass reads all of `FEATURE.md`, `baseline.md` (with its project rules and blast radius),
`questions.md`, `record/defaults.md` and `sources/`, and the repos read-only — **a pass that cannot see the
rest of the document asks what the document already answers.** Only the attack surface narrows.

**Every pass disposes before it emits**: it tries to settle each candidate from the document, the code
(current behaviour only), the product's patterns or one convention, and emits it tagged with what settled
it. **An empty pass is a success.**

## 2. The lenses

**Lens 1 — the builder who must not guess.** Walk each line as if implementing it tomorrow with the
codebase open, forbidden from deciding anything **the owner owns**: scope, money, what users see or are
promised, wording, what is kept or shown to others, legal posture. Every place you would have to stop and
ask the owner is a candidate. Where the code shows how the product behaves **today**, that is a `product`
fact; where you would follow the product's own pattern or the trade's convention for something that is
not the owner's call, a `default`.

**Lens 2 — the hostile tester.** Attack each `FR`, `CH`, `KEEP`:
- **two drafts** — write both behaviours the sentence could mean; where they diverge observably, that is
  the candidate;
- **reachability** — a constructed case counts only if the state is reachable in the product as built
  (check the code) and a requirement hangs on which reading wins;
- **dependency** — every term, event or value a line consumes is produced by another line, a baseline
  fact, or a source; otherwise a candidate;
- **boundary** — limits, counts and thresholds at the exact edge and just past it.

**Lens 3 — collision with the existing product.** For every surface, record and flow in the baseline and
every item in its blast radius:
- does `FEATURE.md` say what happens to it — a `CH` or a `KEEP`? A touched thing with neither is a
  candidate. It may become a `KEEP` default only where no requirement changes its inputs or what it shows;
- where this feature and an existing one act on the same record or screen, which wins and what does each
  actor see? **A real collision is a question** unless the owner's words already settle it;
- does any line break a project rule, an invariant or a contract?
- **search past the baseline**: grep the code for consumers of what the feature touches (share images,
  notifications, home summaries, marketing pages, background jobs). A missed consumer is a candidate and a
  `baseline_gaps` entry;
- another feature home citing the same surfaces (blast radius) — do the two specs disagree?

**Lens 4 — lifecycle and compatibility.** Data that exists on launch day · people on older app versions
beside new ones, and what each sees of the other's actions · the new app against a backend not yet
updated, and release order · an action taken offline and replayed later · sync to other members and to
the same person's other device · leave, removal, rejoin, closing, deletion, account deletion, export ·
switching the feature off or pulling it, and what happens to what users made with it. Every row of the
compatibility table ([feature-shape.md](feature-shape.md) §9) is filled. A state is a candidate only where
the product makes it reachable and two behaviours differ in what someone sees or is promised.

**Lens 5 — who it is for, and what done looks like.** Reconcile `Who` against the requirements both ways:
an actor no requirement serves; an actor the requirements name that `Who` does not; a job no requirement
delivers. Empty and first-run states; discoverability (how does anyone learn the feature exists?); scale
— one item, many, the most a real user has (read limits from the code).

## 3. Sweeps — *which of these does no line cover?*

Worked only where the feature has the thing the item is about, and skipped for anything on the
**Never raise** list:

- **Permissions** — per actor, per new action: who may, who may not, what the others see.
- **Visibility and privacy** — personal or shared? Who sees it, where — notifications, share images,
  previews, other people's screens.
- **Notifications** — does anything new notify, or change what an existing notification says or when?
- **Data lifecycle** — created, shown, changed, exported, deleted, and what deletion takes with it.
- **Platforms and form factors** — the product's actual matrix from the baseline (phone and tablet, each
  OS, light and dark, its themes).
- **Copy** — every new string accounted for in `Copy and content`.
- **Trust** — per thing the feature accepts on faith: what someone gains by abusing it.
- **Undo and mistakes** — the wrong tap, the reversal, the double tap.
- **Time** — day boundaries, time zones and clock changes, wherever the feature counts days or deadlines.
- **Store and OS** — a new permission prompt and its purpose text, privacy labels / data-safety answers,
  rules for content people create.
- **Release and reversal** — what ships first, whether it can be switched off, what happens if it is
  pulled.
- **Cost-bearing volume** — storage, notifications, bandwidth the feature multiplies.

A sweep candidate that nothing in the sources, requirements or product makes bite is discarded (*Generic
checklist*, with its survey). **Never discarded that way:** retention or deletion of what users create, and
permissions on records other people share.

## 4. Bounds

- **Depth.** `resolve` grills the lines it just wrote (the derivative round) — that is allowed. What is
  bounded is the chain: a candidate of **depth 3 or more** (grounded in a line written from an answer to a
  question that itself came from an answer — [feature-shape.md](feature-shape.md) §8) is not written as a
  question **unless it is on the never-list, changes existing behaviour, or is a contradiction** — those stay
  questions at any depth. Others become a default if eligible, a rabbit hole, or a discard; `ready` lists
  every depth-capped discard in its reply.
- **Repeat round** only when the owner asks; two rounds is a budget, never a completeness claim.
- **An empty grill never proves completeness.** `ready` adds a dry-run builder because a builder actually
  trying to plan trips over what readers miss.

## 5. What each pass returns

The fenced JSON in the brief: per candidate `id`, `lens`, `about`, `gap`, `grounding` (verbatim quotes with
where), `settled_by` (or null), `two_answers`, `why_it_matters`, `rabbit_hole`; plus `baseline_gaps` and
`directives`. The orchestrator merges passes and disposes ([dispositions.md](dispositions.md)).
