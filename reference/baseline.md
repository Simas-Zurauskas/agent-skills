# The baseline — what the product does today

`baseline.md` holds the facts about the existing product that this feature touches, each cited to where
it is true and verified by a second agent. It is what makes a question like *"how does the list sort
today?"* a lookup instead of a question to the owner, and what every `CH`/`KEEP` line cites.

## 1. Product sources, in order of authority

| Rank | Source | Use |
|---|---|---|
| 1 | **The code at the checked-out commit** — app, backend, migrations, copy files, config | The reference. A fact that bears on a requirement is confirmed here |
| 2 | **Tests** | State intended behaviour. A test that disagrees with the code is a finding (report it), not a fact |
| 3 | **The project's generated wiki / agent docs** (an `AGENTS/` track, contracts, invariants, flow maps) | The fast index into the code. A wiki fact is used as is only where its page's verified commit matches the code's for the files it cites; otherwise it is re-confirmed in code |
| 4 | **Hand-written docs** — design system, changelog, recent task notes, the design lab | Context and patterns. The app wins where they differ |
| 5 | **The workspace's agent guides and standing project rules** | *Project rules* (rules.md §8) |
| — | **A sealed or frozen PRD; Notion** | **Not a product source.** History at most, labelled as such; never evidence of current behaviour |

**Things the code cannot tell you** — production data volumes, store settings, what users actually do,
legal posture — are not product facts. If a requirement turns on one, it is a question for the owner,
class *a fact only you have*.

## 2. Fact format

```
## Challenges list
- B-4 — Open challenges are ordered by most recent activity, newest first. — `rep-app/src/features/challenges/sort.ts:18` «return b.lastSeq - a.lastSeq»
- B-5 — Closed challenges are listed after all open ones. — `rep-app/src/features/challenges/list.tsx:41` «closed.length > 0 &&»
```

- **One fact per line, written as observable behaviour** in the product's own terms, then one or more
  anchors: `` `<repo>/<path>:<line>` `` and a short verbatim snippet in «» from at or near that line. The
  snippet is what `bf.py anchors` re-finds when line numbers drift.
- A wiki-sourced fact cites the wiki page **and** the code anchor it gives.
- **An absence is a fact only with its search:** `B-9 — Nothing in the app lets a member pin or favourite
  a challenge. — searched: rg -i "pin|favou?rite|star" rep-app/src rep-app/supabase → no match for a
  challenge pin (only "PIN code" in sign-in)`. A search names its paths; a search tool that honours ignore
  files must not be the only one used on ignored folders.
- `B-n` numbers are issued once; a fact proved wrong is struck (`~~…~~ wrong — see B-14`), never
  renumbered.

## 3. Sections

The template ([../templates/baseline.md](../templates/baseline.md)) has these sections; a section that
does not apply says `None touched.`

1. **Header** — each repo with branch and short commit; the wiki and the commit it was verified at; the
   date verified.
2. **Surfaces** — one `##` per screen, sheet, flow or notification the feature touches.
3. **Actors and permissions** — the roles that exist (their names in the product) and what each can do
   on the touched surfaces.
4. **Data** — the records the feature reads or changes, what is stored, who can read it, how it syncs,
   how it is deleted.
5. **Patterns to follow** — how the product already does the same *kind* of thing (sheets, confirmations,
   ordering, empty states, motion, copy location, error handling, offline behaviour). The ground for
   `existing pattern` defaults — so cite the place the pattern is defined, not one instance of it.
6. **Constraints** — invariants, contracts, platform and version rules the feature must respect (old
   app versions coexisting, minimum supported version, release order), each cited.
7. **Project rules** — standing rules from the agent guides that bound the feature (rules.md §8), each
   cited to the file and line.
8. **Not present today** — searched absences.
9. **Drift noticed** — places the wiki or a doc disagrees with the code, with the exact correction, for
   whoever maintains them. The skill never edits them.

## 4. How it is built — cartographers, then a blind verifier

**Scope it first (orchestrator, no agents).** Read the workspace guides and the wiki's index. From the
request, list the surfaces, records and flows the feature plausibly touches, and the words to search
for. Freeze this as the shared part of the cartographer brief.

**Cartographers (2–4 agents, concurrent)** — [../briefs/cartographer.md](../briefs/cartographer.md).
Split by area so their reading does not overlap, typically:
- **Screens and flows** — every surface the user sees that the feature touches, how it behaves today;
- **Data and backend** — records, reads and writes, permissions, sync, deletion, invariants, contracts;
- **Cross-cutting** — notifications, realtime and offline, sharing and links, older app versions,
  other repos (a marketing site, a design lab) the feature reaches;
- **Patterns and rules** — how the product does this kind of thing elsewhere; project rules.

Each returns facts in the §2 shape plus **blast radius**: other features that read or write the same
records or show on the same surfaces — the collisions lens 3 needs.

**Merge (orchestrator).** Deduplicate, number `B-n`, run `bf.py anchors <home> --facts <file>` on the
draft: an anchor whose file is missing or whose snippet is not found is sent back to its fact — fixed by
the orchestrator reading the code, or dropped.

**Verify (1 agent, fresh, blind)** — [../briefs/baseline-verifier.md](../briefs/baseline-verifier.md).
Given the facts with anchors and nothing about how they were found, it confirms each against the code:
`confirmed`, `wrong` (with the correct statement and anchor) or `unsupported`. Wrong facts are corrected
from its evidence (re-anchored and re-checked by the script); unsupported ones are dropped or re-derived
once. Facts written with no second agent available are marked `(unverified)` at the end of the line.

## 5. Keeping it true while the code moves

The header records the commits. On every later run, `bf.py anchors <home>` compares them with each
repo's current `HEAD` and lists the anchored files that changed since. A fact whose anchored file
changed is re-checked by the snippet; where the snippet is gone or moved far, the fact is **stale**:
`status` names it; a write run re-verifies stale facts that its work depends on (one verifier dispatch),
and `ready` re-verifies all of them. A stale fact that turns out wrong takes any `CH`/`KEEP`/default
citing it back to a finding for the grill.

## 6. Questions about the product are never asked of the owner

A finding whose answer is in the code is answered from the code: the orchestrator (or the router agent)
reads it, writes the `B-n` fact, and the finding becomes a **product fact** disposition
([dispositions.md](dispositions.md)). Asking the owner how their own app works today wastes their
attention and invites a guess where the code is certain.
