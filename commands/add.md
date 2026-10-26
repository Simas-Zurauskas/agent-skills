# add — new material or decisions into the feature

`add <material>` — the owner's new words, notes, files, a design, tester feedback, *"also, it should …"*.
Runs to the end. By default **new owner material supersedes `FEATURE.md` text it contradicts**, quoting what
it replaced; `add soft` writes each contradiction as a question instead and changes no existing line. Read
[../reference/rules.md](../reference/rules.md).

## A1 — Entry and sources

SKILL.md's checks; open the entry; save the invocation; record chat answers and vetoes
([../reference/record.md](../reference/record.md) §5); capture the material into `sources/` with the next
number and its hash. Reconcile as [questions.md](questions.md) G1 does (the owner's edits, rows, drift).

## A2 — What it touches in the product

List the surfaces, records and flows the material names. Any not yet in `baseline.md` → one cartographer for
them, then the verifier over its facts ([../reference/baseline.md](../reference/baseline.md) §5); stale facts
this delta depends on go to the same verifier. Skip both when nothing new is touched.

## A3 — Draft the delta

| The material… | Written as |
|---|---|
| adds behaviour | a new `FR` (next free number) in the right part, with `*(From your note of <date>.)*` |
| changes what users have today | a new `CH` citing the baseline fact |
| says something stays | a new `KEEP` |
| contradicts a line in `FEATURE.md` | **default:** the line rewritten, `*(From your note of <date> — replaces: "<old>".)*`; a line that came from the owner's earlier words is listed first in the reply, old and new. **`soft`:** the line stays; a marker and a question with both texts |
| explicitly drops something | a tombstone on each withdrawn line, and a `Not doing` line if they said why |
| settles a marker | the answer written in, the marker removed (route 5), and its question row set `Closed` with `- **Closed:** <date> — settled by your note (sources/NNN)` |
| hedges or defers | as [../reference/feature-shape.md](../reference/feature-shape.md) §2 says |
| contradicts another source (not the document) | both quoted, a marker, a question |
| is not about this feature | named in the reply, not written — a separate feature gets its own `init` |

## A4 — Write

One write per file, re-read just before, read back after; `item` lines at depth 1; `bf.py ids --sync`; the
status line back to `Draft`.

## A5 — Check and grill

One wave: **faithfulness** over the lines this run wrote ([../briefs/faithfulness.md](../briefs/faithfulness.md))
and the **delta grill** (2 passes). Fix in place what the check confirms this run got wrong (never the owner's
own words). Then [questions.md](questions.md) G3–G6; the report, reply, snapshot and `closed` line.
