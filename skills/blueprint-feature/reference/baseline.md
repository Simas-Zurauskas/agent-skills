# The baseline — relevant implemented behavior

## 1. Evidence and authority

Code at the inspected checkout establishes implemented behavior. Tests help reveal intended contracts;
a code/test disagreement is a finding to inspect, not an automatic winner. Wiki/docs are the fast index
and may be product authority when genuine project guides designate them; verify present-behavior claims
in code and keep intent separate. A frozen PRD never proves current implementation. Do not silently
override a project's designated authority or claim inaccessible external evidence was read (rules §8).

Real usage, deployed configuration, legal posture and owner intent cannot be inferred from source.
Only ask for such a fact if a material definition actually depends on it.

## 2. Checkout and released behavior

Record each relevant repo's commit, branch and dirty state. Record an actual release/deployment ref only
when supported by project release evidence or an explicit owner statement. A remote default branch or
local main is not proof. Without evidence state `released state: unknown`; do not pass `unknown` as a
git ref or mark facts unreleased merely because release evidence is missing. The checkout is still a
valid inspected baseline; qualify Today/CH and any rollout assumption.

With a known release ref, compare anchored facts there and mark checkout-only facts
`(unreleased — not in <ref>)`. Never silently fetch, choose a different deployment or modify the repo.
A missing release fact blocks ready only when the product definition cannot be settled safely without it.

## 3. Facts

```
- B-4 — Open challenges are newest-activity first. — `rep-app/src/sort.ts:18` «return b.lastSeq - a.lastSeq»
- B-9 — No pin action exists. — searched: rg -i "pin|favou?rite" rep-app/src → PIN-code sign-in only
```

One observable fact per line, in product terms. Cite where behavior is decided with a verbatim snippet
and line/range; inspect surrounding logic, guards and callers. An absence needs bounded paths, command
and result. Stable B-n IDs; strike wrong facts and point at replacements. Mark unavailable required
verification `(unverified)`, never pretend a text anchor independently proves behavior.

## 4. Sections and blast radius

Keep the existing [template](../templates/baseline.md). Fill only relevant evidence; inapplicable sections
say `None touched.`. An inspection date is not a claim of independent verification. Keep pending/completed review status
in the run record, rather than embedding a pending annotation in the governing baseline text.

1. Header: inspection date, repos, dirty state and known/unknown deployment evidence.
2. Surfaces: `### <surface>` under `## Surfaces`; every touched surface needs a CH/KEEP in FEATURE.md.
3. Actors/permissions: actual roles and scope of touched actions.
4. Data: touched records, visibility, current lifecycle and compatible consumers.
5. Patterns: same-kind product behavior that could ground an ordinary default.
6. Constraints: relevant contracts, invariants and supported platform/client/release facts.
7. Project rules: sourced Always ask and Never raise topics.
8. Blast radius: adjacent readers AND writers, automation, combined edits, shared serialization, older
   client entry points and other in-flight feature homes on the same records/surfaces. A helper can
   mutate more than its name suggests. Preserve unrelated fields and access in the feature definition.
9. Not present today: bounded searched absences.
10. Drift noticed: actual code/docs disagreement, with evidence and correction for the maintainer.
    Merely pointing at an authoritative PRD is not drift.

## 5. Who maps and verifies

The author reads relevant guides, wiki index, contracts and code, and writes the baseline directly.
Use [cartographers](../briefs/cartographer.md) only when broad/non-overlapping discovery saves work;
size by source complexity, not a fixed number of requirements. Merge and check their evidence.

The required [substantive review](grill.md) verifies relevant facts and missed neighbours with the rest
of the feature. No compulsory standalone baseline verifier. Record which facts/outcomes were actually
checked; unsupported facts are corrected, dropped or left explicit, never converted into future intent.

## 6. Drift and freshness

`bf.py anchors` flags stale snippets and changed files (recheck). Inspect actual changed logic, not only
the snippet. Compare HEAD and staged/unstaged content, and look for new readers/writers or migrations on
touched records even if anchored files stayed unchanged. Nonignored untracked source and dirty-byte
changes count. Review reuse follows grill §4; file-name status alone is insufficient.

The author refreshes facts; required substantive reviewers cover material changed facts/dependencies.
Use `bf.py ids <home> --verified B-4,B-9` only after that semantic coverage, not to clear a warning by fiat.
Record current commits/dirty state and update Product. A wrong fact reopens affected CH/KEEP/default
decisions for review. No unnecessary new baseline agent for a mechanically moved but unchanged anchor.
