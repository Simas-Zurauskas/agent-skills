# The baseline — what the product does today

`baseline.md` holds the facts about the existing product that this feature touches, each cited to where it
is true and checked by a second agent. It is what makes *"how does the list sort today?"* a lookup instead
of a question to the owner, and what every `CH`/`KEEP` line cites. It describes **today only** — never what
the feature should do ([rules.md](rules.md) §4).

## 1. Product sources, in order of authority

| Rank | Source | Use |
|---|---|---|
| 1 | **The code** — app, backend, migrations, copy files, config — at the checked-out commit | The reference. Every fact is confirmed here |
| 2 | **Tests** | State intended behaviour. A test that disagrees with the code is a finding (report it), not a fact |
| 3 | **The project's generated wiki / agent docs** (an agents track, contracts, invariants, flow maps) | The fast index into the code. A wiki statement becomes a fact only once confirmed in code — cite both |
| 4 | **Hand-written docs** — design system, changelog, recent task notes, the design lab | Context and patterns; the app wins where they differ |
| 5 | **Agent guides and the owner's standing rules** | *Project rules* ([rules.md](rules.md) §8) |
| — | **A sealed or frozen PRD; Notion** | **Not a product source.** At most history, labelled as such; never evidence of current behaviour |

**What the code cannot tell you** — real usage and volumes, store settings, legal posture — is not a
product fact. If a requirement turns on one, it is a question for the owner (*a fact only you have*).

## 2. Two versions of "today"

The feature will be built on the checked-out code, but users run what was released. The header records
both for each repo:

```
Verified: 2026-10-26
Repos (…):
- rep-app a7ca2ba (dev) · released: main
- rep-marketing ecb8541 (main) · released: main
- wiki-rep 6966213 (main)
```

`released:` names the ref users have — **the remote-tracking ref** of the release branch the guides name
(`git rev-parse --abbrev-ref main@{upstream}` → `origin/main`), never a local branch that may be stale; with no
guide, the remote's default branch. A run never fetches: `bf.py anchors` says how old the ref is and warns when
a local ref lags its upstream. `bf.py anchors` checks each fact's snippet against
that ref too: a fact true on the checked-out code but absent from the released ref is marked
`(unreleased — not in main)` at the end of its line. A `CH` line built on an unreleased fact says so in its
*Today* half, because users have never seen that behaviour. Uncommitted work in the checkout is noted in the
run report.

## 3. Fact format

```
## Surfaces

### Challenges list
- B-4 — Open challenges are ordered by most recent activity, newest first. — `rep-app/src/features/challenges/sort.ts:18` «return b.lastSeq - a.lastSeq»
- B-5 — Closed challenges are listed after all open ones. — `rep-app/src/features/challenges/list.tsx:41` «closed.length > 0 &&»
```

- **One fact per line, as observable behaviour** in the product's own terms, then one or more anchors:
  `` `<repo>/<path>:<line>` `` (or `:<from>-<to>`) and a short verbatim snippet in «» from that range — the
  snippet is what `bf.py anchors` re-finds when lines move. Surfaces are `###` headings under `## Surfaces`.
- **An absence is a fact only with its search:** `- B-9 — Nothing lets a member pin or favourite a
  challenge. — searched: rg -i "pin|favou?rite" rep-app/src rep-app/supabase → only "PIN code" in sign-in`.
  Name the paths searched; don't rely only on a tool that honours ignore files.
- `B-n` numbers come from `bf.py ids --next B`; a fact proved wrong is struck and points at its
  correction (`- ~~B-4 — …~~ wrong — see B-14`), never renumbered.
- A fact written with no second agent available ends `(unverified)`.

## 4. Sections (the template's, in order; a section that does not apply says `None touched.`)

1. **Header** — date verified; each repo with commit, branch and `released:` ref.
2. **Surfaces** — one `###` per screen, sheet, flow, notification, share image or page the feature touches.
3. **Actors and permissions** — the roles that exist, by their product names, and what each can do on the
   touched surfaces.
4. **Data** — the records the feature reads or changes: what is stored, who can read it, how it syncs,
   how it is deleted, how older app versions read it.
5. **Patterns to follow** — how the product already does the same *kind* of thing (sheets, confirmations,
   ordering, toggles, per-person preferences, empty states, motion, copy location, errors, offline). The
   ground for `existing pattern` defaults: cite where the pattern is defined, not one instance.
6. **Constraints** — invariants, contracts, platform and version rules (older app versions in use,
   minimum supported version, contract-break checks, release order), each cited.
7. **Project rules** — [rules.md](rules.md) §8, each quoted with its file; with `### Always ask` and
   `### Never raise`.
8. **Blast radius** — every other feature, screen, notification, share image, page or job that reads or
   writes the same records or shows on the same surfaces, each anchored. Lens 3 reads this on every grill.
   It also names **other feature homes in the workspace** whose baselines cite the same files (`grep -l`
   their `baseline.md` for this feature's anchored paths) — two features in flight on one surface.
9. **Not present today** — searched absences.
10. **Drift noticed** — where the wiki, a doc or a guide disagrees with the code (or points at a frozen
    PRD), with the exact correction, for whoever maintains them. The skill never edits them. Each item is
    written once per home and re-reported only when it changes.

## 5. How it is built — cartographers, then a blind verifier

**Scope it first (orchestrator, no agents).** Read the guides, the owner's rules (rules.md §8), the wiki
index, and the invariants and contracts pages. Write the project rules to `work/<run-id>/rules.md`. From
the request, list the surfaces, records and flows the feature plausibly touches and the words to search
for.

**Size the work.** A **small change** ([grill.md](grill.md) §1 is the one definition) gets one cartographer
covering every area. Otherwise **2–4 cartographers**, concurrent
([../briefs/cartographer.md](../briefs/cartographer.md)), split so their reading does not overlap:
screens and flows · data and backend · cross-cutting (notifications, realtime and offline, sharing and
links, older versions, other repos) · patterns and rules. Each returns facts, blast radius, patterns,
drift and unknowns.

**Merge (orchestrator).** Deduplicate, number, write the draft to `<home>/work/<run-id>/facts-draft.md` in
the §3 format, then `bf.py anchors <home> --facts <home>/work/<run-id>/facts-draft.md`: a missing file or
snippet is fixed by reading the code, or the fact is dropped.

**Verify (1 agent, fresh, blind, a different model where available)**
([../briefs/baseline-verifier.md](../briefs/baseline-verifier.md)): `confirmed`, `wrong` (with the correct
statement and anchor) or `unsupported` per fact. Corrections are re-anchored and re-checked by the script;
unsupported facts are dropped or re-derived once. Then write `baseline.md`.

## 6. Keeping it true while the code moves

`bf.py anchors <home>` compares each fact with the code now:

- **stale** — the file is gone, the snippet is gone, or it moved far: the fact may be wrong. A write run
  re-verifies stale facts its own work depends on (one verifier dispatch); `ready` re-verifies all.
- **recheck** — the file changed since the recorded commit but the snippet is still there: probably fine,
  but the logic around it may have moved. `ready` sends these to the verifier too.
- New code can change behaviour without touching an anchored file (a new migration, a new server function
  on a touched table): the verifier at `ready` searches for new writers and readers of the touched records
  since the recorded commit (`git log --since`, `git diff --name-only <commit>..HEAD`).

After a verification, record the confirmed facts with `bf.py ids <home> --verified B-4,B-9` (their files' hashes —
a *recheck* clears until the file changes again), rewrite the header's repo lines to the current commits, and
update `FEATURE.md`'s `Product:` line. An `(unverified)` fact is re-sent to the verifier by the next run that has
one available, and the tag removed on `confirmed`. A fact found wrong is struck; every `CH`, `KEEP` or default citing it becomes a candidate
for the next grill.
