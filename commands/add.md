# add — new material or decisions into the feature

`add <material>` — the owner's new words, notes, files, a design, tester feedback, or *"also, it should
…"*. Runs to the end. By default **new owner material supersedes `FEATURE.md` text it contradicts**,
quoting what it replaced; `add soft` writes each contradiction as a question instead and changes no
existing line. Read [../reference/rules.md](../reference/rules.md).

## A1 — Entry and sources

SKILL.md's five checks; open the entry; record chat answers and vetoes
([../reference/record.md](../reference/record.md) §5); capture the material into `sources/` with a new
number and hash. Reconcile the owner's edits since the last run as [questions.md](questions.md) G1 does.

## A2 — What it touches in the product

List the surfaces, records and flows the new material names. Any not yet in `baseline.md` → dispatch one
cartographer for them and the verifier over its facts ([../reference/baseline.md](../reference/baseline.md)
§4), plus re-verification of stale facts this delta depends on. Skip both when the material touches
nothing new.

## A3 — Draft the delta

For each statement in the new material, one of:

| Case | Written as |
|---|---|
| Adds behaviour | New `FR-n` (next free number), in the right part, with `*(From your note of <date>.)*` |
| Changes behaviour users have today | New `CH-n` citing the baseline fact |
| Says something stays | New `KEEP-n` |
| Contradicts a line in `FEATURE.md` | **Default mode:** the line is rewritten with `*(From your note of <date> — replaces: "<old text>".)*`; a line the owner wrote by hand is listed first in the reply, old and new. **`soft`:** the line stays, a marker and a question with both texts |
| Explicitly drops something | A tombstone on each withdrawn line, and a `Not doing` line if they said why |
| Settles a marker | The answer written in, the marker removed (route 5) |
| Defers or hedges | As [../reference/feature-shape.md](../reference/feature-shape.md) §2 says — marker, or `Tentative` |
| Contradicts another source (not the document) | Both quoted, a marker, a question — never averaged |
| Is not about this feature | Named in the reply; not written. A separate feature gets its own `init` |

Print the delta as a short list before writing it only under `add soft`; the default mode writes and
reports.

## A4 — Write

One write per file, re-read just before (rules.md §3), read back after. `item` lines with depth 1 (or
the source's chain depth). `bf.py ids <home> --sync`. Clear any `Ready for planning` stamp.

## A5 — Check and grill

Dispatch together: the **faithfulness check** over the lines this run wrote
([../briefs/faithfulness.md](../briefs/faithfulness.md)) and the **delta grill** (2 passes). Fix in place
what the check confirms this run got wrong. Then [questions.md](questions.md) G3–G6.
