# The standalone target (default)

A self-contained folder of static HTML, wherever the user wants it. There's no build step and no server: it opens
from disk (`file://`), and any static host serves it (Netlify drop, S3, GitHub Pages, a zip in Slack). Fonts may come
from Google Fonts or approved system faces and icons from the Lucide CDN. The only local code is two tiny scripts that make the phones behave
well.

## Layout

```
<OUT>/
  index.html                  opens the latest round (the assembler writes it)
  assets/                     copied from the skill by the assembler: moodboard.css, moodboard.js, phone.js
  img/                        the shared photo library (references/images.md)
  round-01/
    index.html                the round page (assembled): cover, variants, compare strips, round tabs
    cover.html                the cover board (you write it; templates/cover.html)
    preview-v03.html          a builder's preview (generated; deleted at assembly)
    v01/
      head.html               optional external font links; empty for approved system fonts
      style.css               everything visual, every selector under .r1-v01
      board.html              the style tile (templates/board.html): one root <div class="mb-board r1-v01 board" style="width:1286px">
      screen-1.html …         one per screen (templates/screen.html)
  round-02/ …
```

## The variant contract (round R, variant NN → class `rR-vNN`)

- **`style.css` is scoped.** The round page loads every variant's stylesheet together, so every selector starts with
  `.rR-vNN`. The screens' `<body>` and the board's root carry that class.
  - Keyframes are named `rR-vNN-*`.
  - No `@import` or `@font-face`: fonts go in `head.html` and the screens' `<head>`.
  - No `:root`, `html` or bare `body`.
- **Screens** start from `templates/screen.html`. Each screen:
  - uses the declared product canvas (390 × 844 is the compatibility default), with `<title>R{R} V{NN} · <Screen></title>` (the round page's caption comes from it);
  - carries `<body class="rR-vNN" style="margin:0">` and a status bar only for an applicable phone platform;
  - keeps exactly three scripts: Lucide UMD, `lucide.createIcons()`, and `../../assets/phone.js`. The Tailwind v4
    browser build is an optional fourth, if a builder prefers utilities;
  - loads images with `src="../../img/<file>"`;
  - links per the round's flow (`href="screen-2.html"`). Everything else is `href="#"` or `<button
    aria-pressed="false">` for on/off, and icon-only controls get an `aria-label`.
- **`board.html`** is ONE root element sized to the configured screen composition (1286 px for three default phone frames). Desktop screens stack below it; use the configured canvas rather than forcing phone geometry. It's static (no links or buttons) and styled in `style.css` under `.rR-vNN.board`. Relative
  `src`s inside it are rewritten by the assembler, so write them relative to the variant folder
  (`../../img/x.jpg`).

## Commands

```sh
# a builder's preview of one variant (board + its phones), re-run after changes
python3 <SK>/scripts/assemble-standalone.py <P>/round-R/round.json --preview 03
node <SK>/scripts/page-shot.mjs file://<OUT>/round-01/preview-v03.html shots/v03-preview.png 1600 1800

# one screen as a phone shows it (390×844 @2x, top + scrolled)
node <SK>/scripts/screen-shot.mjs file://<OUT>/round-01/v03/screen-1.html shots/v03-s1

# the round
python3 <SK>/scripts/assemble-standalone.py <P>/round-R/round.json      # writes round-RR/index.html + OUT/index.html
python3 <SK>/scripts/check-standalone.py <P>/round-R/round.json         # files, scoping, titles, flow, local refs
# (a glob can't follow "file://", so printf turns the matched paths into URLs)
node <SK>/scripts/verify-screens.mjs $(printf 'file://%s ' <OUT>/round-01/v*/screen-*.html)  # icons rendered, images, overflow, fonts
node <SK>/scripts/dom-audit.mjs $(printf 'file://%s ' <OUT>/round-01/v*/screen-*.html)       # overlapping tap targets, contrast, small text
node <SK>/scripts/page-shot.mjs file://<OUT>/round-01/index.html shots/v01.png 1600 2500 --scroll-to "#r1-v01"
```

## How the page behaves

- Round tabs sit in a sticky header, and the current one is marked by `assets/moodboard.js`. Assembling a new round
  rewrites the tabs on every earlier round's page too.
- Sections fit the window: a board and its phones zoom down together in steps below about 1370 px of width.
- Compare strips show five phones to a row at about 55 %.
- Over a phone, the wheel scrolls the page, not the phone (`phone.js` forwards it; ⌥/Alt+wheel scrolls the phone). A
  mouse drag scrolls inside the phone, the way a finger would.
- Clicking a phone's caption opens that screen on its own, full size.
- The page chrome follows the system's light or dark mode. Boards and screens never change with it.

## Sharing

The process folder (research, guidelines, brief, notes) lives outside `OUT/` (a sibling `<OUT>-process/` by default),
so zipping or uploading `OUT/` never ships it.

Zip `OUT/` or upload it anywhere static; relative paths keep working. On `file://` everything works except anything
a browser blocks for local files (nothing here needs it).

## Progressive publication and strict completion

The lead is the single shared publisher. Initialize the declared round early, then assemble with `--draft
--keep-previews` after each ready variant. Every declared slot stays visible in stable order; missing slots remain
pending and ready work is visibly draft. Optional `review_status` maps variant IDs to `reviewed` only after evidence.
Use `--final --keep-previews` after every declared variant, stylesheet and screen exists; it rejects missing declared
work. Explicit `--final` requires `content_specs`; point it to `strings.json` for static content completeness, and still run rendered content
checks. Existing no-flag partial assembly remains compatible; it does not establish completion.

Builders may generate private `--preview NN` pages but never shared assets or the round page. The lead initializes
missing shared assets; existing customized assets are preserved. Keep the user's server untouched. Only the lead may
start and later clean up an owned scratch server. Follow [run.md](../run.md) for batched captures and one bounded
repair pass. Figma uses [its native target guide](figma.md), not this HTML contract.

## Product canvas

The HTML templates default to 390×844 for compatibility. For desktop or another product canvas, set
`"viewport": {"width": 1366, "height": 900}` in `round.json` and pass the same viewport to the workflows. Owner
platform constraints govern the screen layout and chrome. Screens wider than 600 px stack within each variant and use
neutral frames, with paired comparisons; mobile defaults keep their existing rows. Capture desktop screens using
`page-shot.mjs URL OUT.png 1366 900` and run checks at the actual viewport
through the shared check exports or supplied adapter. Never treat mobile captures as desktop evidence.

Desktop screen capture/checks use the same batch helper with `--width W --height H --desktop --dpr 1 --verify --audit --strings FILE`; per-job `width`/`height` can override batch dimensions. Defaults remain 390×844 mobile. Match the round config `viewport` and inspect actual top/scrolled renders.

For progressive shared assembly, pass `--draft --ready 01,03 --keep-previews` with the lead's currently
ready IDs (or `--ready ""` for the initial pending page). An active builder may already have partial files; their
presence is not permission to publish that direction. The ready list controls visibility only; final assembly still
checks every declared direction and does not accept `--ready`. Private `--preview NN` is independent of this list.
Legacy draft calls without a ready list retain file-discovery behavior.
