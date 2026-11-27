# Maintaining blueprint-feature — read before editing

`SKILL.md` is consumed by agents. This file is maintainer guidance, not another workflow. Preserve the
shared source directory and Claude/Codex installation symlinks. No CLAUDE.md is added to this skill.

## Gate for changes

1. `python3 scripts/bf.py selftest` must print `selftest: ok`.
2. Every linked file and cited numbered section exists. Check command/reference/brief links together.
3. A rule has one home. Commands link to it; a brief restates only what a fresh agent needs. Change any
   necessary brief restatement with the rule. Do not restore retired routing/cold-reader/checker stages
   through a stale prompt or README.
4. Bump VERSION for behavior changes; explain evidence and limits in HISTORY.md.
5. Keep Claude Code and Codex routes in reference/dispatch.md. Do not require unavailable model aliases,
   assume a history fork is blind or claim a same-model check was different-model verification.
6. Preserve existing homes, schemas, IDs, snapshots and owner decisions. Mechanical helpers do not prove
   substantive coverage. For workflow changes, use focused independent forward-testing in an isolated
   workspace when authorized; test actual behavior, including scope control and readiness reuse.

## Single homes

| Topic | File |
|---|---|
| Authority, provenance, serious decisions, scope test, protections | reference/rules.md |
| Output blocks, IDs, defaults/slots/markers and compatibility | reference/feature-shape.md |
| Current behavior, blast radius, deployment evidence and drift | reference/baseline.md |
| Risk tiers, review timing/coverage, correction bound and reuse | reference/grill.md |
| Finding settlement and question format | reference/dispositions.md |
| Home, compact log/report, chat answers, lock and legacy compatibility | reference/record.md |
| Actual fresh-context dispatch on both harnesses | reference/dispatch.md |
| Read-only substantive review / optional mapping | briefs/review.md, briefs/cartographer.md |
| Deterministic existing-home checks | scripts/bf.py |

Read HISTORY.md for lineage and prior evidence. The whole-product blueprint skill remains separate.
