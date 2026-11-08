# The Design Lab target (optional): sheets, rounds and the variant file contract

Use this target when explicitly selected (`design-lab`, with `lab` alias), or when the product workspace has one unambiguous existing Design Lab and no explicit destination overrides it. Otherwise use
[standalone.md](standalone.md). The shared execution contract governs all targets; this file defines the HTML mechanics.

The skill shows a round in a **Design Lab**: an HTML + Tailwind v4 workbench built with Parcel and posthtml
`<include>`, with its system in `src/_lab/` and its designs in `src/<section>/`. The template lives at
`~/dev/ai/design-lab`; projects copy it (e.g. `rep-ui-lab`). This file covers three things:

1. what a lab needs before a round can be shown (**sheets + rounds**);
2. how to add that to a lab that lacks it;
3. the file contract every variant follows.

Read the lab's own `CLAUDE.md` and `src/_lab/README.md` first. Its rules (links, toggles, aria-labels, Lucide icons,
no scripts in designs) apply to every screen.

## 1. Does this lab have sheets and rounds?

```sh
ls <LAB>/src/_lab/sheet/sheet.js <LAB>/src/_lab/shell/controls.html && grep -q 'round-\*' <LAB>/package.json && echo "ready"
```

"ready" means skip to §3. Otherwise install (§2). It's a workbench change, so tell the user you're making it (they
asked for rounds by asking for this skill) and keep it to the edits below.

**Why a sheet, not the canvas.** The lab's sections are pan/zoom canvases. For moodboards that's overkill: people read
a board, then compare phones. A **sheet** is a scrolling page with the same pieces (`.lab-board`,
`figure.lab-screen`, `.lab-row`) and the same lab tools (Hotspots, ↺ reset, full-screen viewer), with one round per
page and tabs to switch rounds.

## 2. Install sheets + rounds into a lab (≈15 min)

Copy `targets/design-lab/sheet/` from this skill to `<LAB>/src/_lab/sheet/`: `sheet.css`, `sheet.js`, `sheet.html`. What they do:

- **`sheet.css`** styles:
  - `.lab-sheet`, the scroller, a size container;
  - `.lab-sheet-body`;
  - `.lab-sheet-section`;
  - `.lab-sheet-fit`: a board and its row zoom down together in steps when the window is narrow;
  - `.lab-sheet-title` and `.lab-sheet-grid`: the compare strips, five phones to a row at ~55 %.
- **`sheet.js`** answers each framed screen's `canvas:hello` with `canvas:host`, so the screen's bridge passes wheel
  and middle-drag up. A wheel over a screen then scrolls the page instead of trapping in the screen, dragging scrolls
  inside the screen, and ⌥-scroll works natively.
- **`sheet.html`** loads `sheet.js` and `canvas/gallery.js` (the ↺ reset buttons).

If `<LAB>/src/_lab/shell/controls.html` is missing (labs made from the template before 2026-09-25 put the header controls inline in each section page), copy `targets/design-lab/controls.html` there. It holds the header's Groups switch, Hotspots switch and ↺ Reset all. Delete its `_lab/toc/toggle.html` include if the lab has no `src/_lab/toc/`. Round pages and previews include it.

Then make these edits. The file names are the lab's; if a lab version differs, apply the intent.

| File | Edit | Why |
| --- | --- | --- |
| `src/_lab/lab.css` | after the canvas import: `@import "./sheet/sheet.css";` | sheet styles reuse canvas.css's screen/board pieces |
| `src/_lab/core/lab.js` (`hostedByLab`) | `frame.closest('[data-canvas], .lab-viewer')` → `frame.closest('[data-canvas], [data-lab-sheet], .lab-viewer')` | a screen framed by a sheet is shown BY the lab: its own lab bar and viewer stay off |
| `src/_lab/shell/sidebar.js` | after marking the current section, add the snippet below | marks the current round tab |
| `src/_lab/shell/shell.css` | `.lab-header > div:first-child` gets `display:flex; align-items:center; gap:16px`, and add the `.lab-seg > a` rules below | the title row holds the tabs; tabs are links styled as the segmented pill |
| `src/_lab/screen/chrome.html` | the bar's `<a href="index.html" class="lab-btn">‹ Gallery</a>` gets `data-lab-gallery` | viewer.js retargets it |
| `src/_lab/screen/viewer.js` | the gallery-return snippet below | ‹ Gallery returns to the round the screen was opened from, not always the latest |
| `package.json` → `source` | add `"src/*/round-*.html"` | round pages are build entries |
| `<LAB>/scripts/links.mjs` (`analyze`) | check every `round-*.html` of a section like its `index.html` canvas (snippet below) | `yarn links` catches caption / title drift on round pages |
| `test/links.test.mjs` | a fixture `other/round-01.html` with a wrong caption, asserting `round-01.html: caption "…" ≠ <title> "…"` | keeps the check honest |
| Docs (`CLAUDE.md`, `README.md`, `src/_lab/README.md`) | Explorations = rounds on sheets; the sheet row in the map; `lab:gallery` storage; "new round" recipe | the lab's docs must stay true |

**sidebar.js**:

```js
  // page tabs sit in the header, after this script: mark them once the page is parsed
  document.addEventListener('DOMContentLoaded', () => {
    for (const a of document.querySelectorAll('[data-lab-pages] a[href]')) {
      if (Lab.path(a.getAttribute('href')) === Lab.path(location.href)) a.setAttribute('aria-current', 'page');
    }
  });
```

**shell.css** (after the `.lab-seg > button[aria-pressed="true"]` rule):

```css
.lab-seg > a { padding: 3px 10px; border-radius: 999px; white-space: nowrap; }
.lab-seg > a:hover { color: var(--lab-text); }
.lab-seg > a[aria-current="page"] { background-color: var(--lab-strong); color: var(--lab-on-strong); }
```

**viewer.js**: replace the entry block. "From a screen" now means a `screen-*` page, because a round page isn't a
screen:

```js
  const KEY = 'lab:entry';
  const GALLERY = 'lab:gallery';
  const nav = Lab.navType();
  const from = document.referrer && new URL(document.referrer);
  const inSection = !!from && from.origin === location.origin && Lab.dir(from.href) === Lab.dir(location.href);
  const fromScreen = inSection && !!from && /(^|\/)screen-[^/]*$/.test(Lab.path(from.href) ?? '');
  let entry = Lab.session.get(KEY);
  if (!entry || Lab.dir(entry) !== Lab.dir(location.href) || (nav === 'navigate' && !fromScreen)) {
    entry = location.href;
    Lab.session.set(KEY, entry);
    Lab.session.set(GALLERY, inSection && from ? from.href : ''); // the page this viewing was opened from
  }
  const gallery = Lab.session.get(GALLERY);
  const back = bar?.querySelector('[data-lab-gallery]');
  if (back instanceof HTMLAnchorElement && gallery && Lab.dir(gallery) === Lab.dir(location.href)) back.href = gallery;
```

**links.mjs** (in `analyze`, replacing the `readCanvas(join(dir, 'index.html'))` loop):

```js
      const pages = ['index.html', ...readdirSync(dir).filter((f) => /^round-.*\.html$/.test(f)).sort()];
      for (const page of pages) {
        const where = page === 'index.html' ? 'canvas' : page;
        for (const f of readCanvas(join(dir, page))) {
          // …the existing body, with every `canvas:` prefix in the messages replaced by `${where}:`
        }
      }
```

**Content files** (`src/explorations/`):
- `index.html` becomes `targets/design-lab/templates/index-redirect.html`, a meta refresh to the latest round.
- `parts/rounds.html` is `targets/design-lab/templates/rounds.html`, the tabs `<nav data-lab-pages class="lab-seg">`.

**Verify the install:**
- `yarn lint && yarn typecheck && yarn test && yarn links`.
- A scratch build: `npx parcel build --public-url ./ --dist-dir <scratch>/dist --cache-dir <scratch>/cache-<fresh>`,
  then `node scripts/fix-nested-urls.mjs <scratch>/dist`.
- With a probe screen on a probe round page, drive it with `scripts/cdp.mjs` and check:
  - `index.html` redirects to the round;
  - the tab has `aria-current="page"`;
  - the framed screen has `Lab.hosted === true`;
  - a wheel over the screen scrolls the sheet, and a drag scrolls inside it;
  - the caption opens the viewer, and ‹ Gallery returns to the round.

  Delete the probe.

## 3. The variant file contract (round R, variant NN → prefix `rR-vNN`)

| File | Rules |
| --- | --- |
| `src/explorations/parts/rR-vNN-head.html` | The variant stylesheet `<link rel="stylesheet" href="rR-vNN.css">`, plus font links only when the approved faces need them; system fonts need no external font link (`targets/design-lab/templates/head.html`). Screens, the preview and the round page all include it, so one file owns the variant's fonts. |
| `src/explorations/rR-vNN.css` | Every selector under `.rR-vNN`. Custom properties go on `.rR-vNN`, keyframes are named `rR-vNN-*`. No `@import` (a production build may merge stylesheets and silently drop an `@import` that is no longer first), no `@font-face`, no `:root` / `html` / bare `body`. |
| `src/explorations/screen-rR-vNN-<n>.html` | One per screen (`targets/design-lab/templates/screen.html`). `<title>R{R} V{NN} · <Screen name></title>`, and `yarn links` checks it against the round page's caption. `<body class="rR-vNN">`, status bar only for an applicable phone platform, no `<script>`. Use the declared product canvas. |
| `src/explorations/parts/rR-vNN-board.html` | The style tile: ONE root `<div class="lab-board rR-vNN …">`, sized to the configured screen composition. The compatibility phone default is 1286 px for three 402 px frames and two 40 px gaps (1728 px for four). Desktop screens stack below the board at their declared viewport. No links or buttons inside. |
| `src/explorations/round-preview-rR-vNN.html` | The builder's private preview (`targets/design-lab/templates/preview.html`), deleted by `scripts/design-lab/assemble-round.py`. |
| `src/explorations/img/*` | The shared photo library (see `references/images.md`). |

**Screens:**
- Tailwind v4 utilities work, including arbitrary values like `bg-(--ink)` and `text-[17px]`; Tailwind picks up
  classes in new files.
- Bespoke styling lives in the scoped CSS.
- Links follow the round's FLOW. Everything else is `href="#"` or a toggle (`<button aria-pressed>`).
- Icon-only controls get an `aria-label` and a size.
- Icons are Lucide only: `<i data-lucide="name" class="h-5 w-5"></i>`, inlined at build. A wrong name fails the build
  for everyone. Check first with `ls <LAB>/node_modules/lucide/dist/esm/icons/<name>.mjs` (the files are `.mjs`).
  Lucide renames icons between versions (`history` became `rotate-ccw-clock`).
- **Build traps** (each broke a round; `check-round.py` fails the first four):
  - every `img/…` path must exist — survivors that copy a parent's files rename selectors, never image paths;
  - no CSS mask from an image file (`mask-image: url(img/…)`): Chrome drops it on `file://`, where `yarn build` output
    is meant to work — inline it as a data URI in a custom property;
  - no `url()` inside a Tailwind class (`bg-[url(img/…)]`): Tailwind resolves it from `src/styles.css` and the whole
    build fails; a running dev server keeps the stale class until restarted with a fresh cache;
  - no SVG `id` containing "new": the minifier rewrites it to `new` and every `<use href="#…">` breaks;
  - link to a screen only once its file exists: a missing target fails the shared build while builders work.

**Round page:** `scripts/design-lab/assemble-round.py round.json` writes `round-RR.html`:
- a head with every variant's head part;
- the sidebar, and the header with the round tabs;
- the cover board (`parts/rR-cover.html`, see `targets/design-lab/templates/cover.example.html`);
- one `.lab-sheet-section#rR-vNN` per variant (board above a `.lab-row` of screens);
- one compare strip per screen (`.lab-sheet-grid`).

**Variant themes (optional).** A round can give each variant up to four palettes the user switches in the UI:
`round.json` gets `"themes": {"01": ["Diena", "Vakaras", "Naktis"], "02": […], …}` (1–4 names per variant, theme 1
first). The assembler then puts a theme switch at the top of each such variant's section and one round-wide switch
(Tema 1…N) above the compare strips; without the key the page is exactly as before. The lab does the rest (its
`sheet/sheet.js` and `screen/variant-theme.js`, from 2026-09-28 — a lab without them needs those files and the
`variant:theme` message first). The CSS contract, no script: the variant's theme-1 tokens stay on `.rR-vNN`; themes 2
and 3 override the same custom properties under `[data-vt="2"] .rR-vNN` and `[data-vt="3"] .rR-vNN`, which matches in
the screens (`<html data-vt>`) and on the board (its section's `data-vt`), and passes `check-round.py`'s scoping. A
screen opens in a theme with `#vt=N` in its URL (`screen-rR-vNN-1.html#vt=2`, also for `screen-shot.mjs`).

`scripts/design-lab/check-round.py round.json` is the mechanical gate.

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

Font links are optional when the approved direction uses available system/installed faces. Do not add Google Fonts
just to fill a head template; preserve the required variant stylesheet include.

Desktop screen capture/checks use the same batch helper with `--width W --height H --desktop --dpr 1 --verify --audit --strings FILE`; per-job `width`/`height` can override batch dimensions. Defaults remain 390×844 mobile. Match the round config `viewport` and inspect actual top/scrolled renders.

For progressive shared assembly, pass `--draft --ready 01,03 --keep-previews` with the lead's currently
ready IDs (or `--ready ""` for the initial pending page). An active builder may already have partial files; their
presence is not permission to publish that direction. The ready list controls visibility only; final assembly still
checks every declared direction and does not accept `--ready`. Private `--preview NN` is independent of this list.
Legacy draft calls without a ready list retain file-discovery behavior.
