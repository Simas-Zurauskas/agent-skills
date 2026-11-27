# blueprint-feature

Define one feature or change against an existing product. FEATURE.md describes failable behavior,
what changes, what stays, material edge cases and compatibility. baseline.md cites relevant implemented
behavior; questions.md keeps decisions only the owner can take. Stable sources/IDs and existing homes
are preserved.

## Usage

```
/blueprint-feature init Let authors save private drafts and publish them later …
/blueprint-feature add <new notes or decisions>
/blueprint-feature questions          # independent scrutiny of changed behavior
/blueprint-feature answer             # delegated ordinary/settled answers for veto
/blueprint-feature resolve            # apply recorded answers
/blueprint-feature ready              # check or reuse actual review, then planning gate
/blueprint-feature auto               # one authorized sequence through ready
/blueprint-feature status             # read-only
```

In Codex use `$blueprint-feature` or plain language. Commands can be chained without paying for a new
review at each boundary. `init soft` stops at the draft; `questions full` explicitly requests fresh full
scrutiny. Apply supplied decisions before final review. Serious unknowns are surfaced early; ordinary
choices are labelled, reversible defaults you can veto with `drop D3` or replace with `D3: …`.

## Quality and effort

One fresh combined reviewer for small local reversible changes; builder and adversary for interacting
or consequential features; focused specialist/mapping help only where actual breadth or hazard needs it.
No mandatory per-finding routers, cold readers or answer checkers. Required review still examines intent,
source facts, access/data preservation, lifecycle and whether planning would need a product guess.

Each new promise must protect a requested outcome against a concrete reachable failure. Optional
hardening/scalability or conflict policies are not automatically scope. Keep engineering mechanisms for
planning/building. Evidence of a real threat to the requested guarantee is not waived for cost.

`ready` reuses coverage only when final inputs and risk still match; material corrections get targeted
independent rechecks. No known material definition gaps after the recorded checks is not implementation,
runtime security, deployment or release certification. Actual project authority is respected; code
proves implemented behavior, not intent, and a default branch does not prove deployed state.

## Install and checks

Install from the agent-skills library (see its top-level README), then:

```
python3 scripts/bf.py selftest
```

Requires Python 3 (stdlib only), git and a real independent-agent route on the current harness.
No code, plans, tickets, commits or external document writes are produced by this skill. See SKILL.md
and HISTORY.md. Existing v6 homes require no migration.
