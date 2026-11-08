#!/usr/bin/env python3
"""Assemble <lab>/src/explorations/round-NN.html from round.json: a cover board, one section per variant (its board
above its screens), then one compare strip per screen (that screen across every variant).
Optional "themes": {"01": ["Diena", "Vakaras", "Naktis"], …} (1–4 names per variant) adds a theme switch over each
such variant's board and one round-wide switch above the compare strips (the lab's sheet.js drives them); without it
the page is exactly as before.
usage: python3 assemble-round.py round.json [--draft [--ready 01,03]|--final] [--preview NN] [--keep-previews] [--dry [--print]]
  --draft keeps every declared position visible; --final requires all files and supplied content_specs.
  --preview NN writes only round-preview-rR-vNN.html.
  --dry writes nothing (--print sends the page to stdout); --keep-previews keeps round-preview-rR-v*.html."""
import html, json, os, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from round_support import atomic_write, content_issues, review_status, viewport_css, publication_ids
if len(sys.argv) < 2 or sys.argv[1] in ('-h', '--help'): print(__doc__); sys.exit(2)
if not os.path.isfile(sys.argv[1]): sys.exit(f'assemble-round.py: round.json not found: {sys.argv[1]}')
cfg = json.load(open(sys.argv[1]))
R = cfg['round']; EX = os.path.join(cfg['lab'], 'src/explorations'); P = f'r{R}-v'
viewport_style = viewport_css(cfg, 'lab')
preview = sys.argv[sys.argv.index('--preview') + 1] if '--preview' in sys.argv else None
if '--draft' in sys.argv and '--final' in sys.argv: sys.exit('--draft and --final are mutually exclusive')
if preview and preview not in cfg['variants']: sys.exit(f'unknown preview variant: {preview}')
want = [preview] if preview else list(cfg['variants'])
present = [v for v in want if all(os.path.isfile(f'{EX}/screen-{P}{v}-{n}.html') for n, *_ in cfg['screens'])
           and all(os.path.isfile(f'{EX}/parts/{P}{v}-{p}.html') for p in ('board', 'head'))
           and os.path.isfile(f'{EX}/{P}{v}.css')]
ready = publication_ids(cfg, sys.argv)
if ready is not None:
    if ready - set(present): sys.exit('Ready publication refused: incomplete file sets for ' + ', '.join(sorted(ready - set(present))))
    present = [v for v in present if v in ready]
missing = [v for v in want if v not in present]
if '--final' in sys.argv:
    if preview: sys.exit('--final cannot be combined with --preview')
    issues = [f'V{v}: incomplete file set' for v in missing]
    for v in present:
        issues += [f'V{v}: {issue}' for issue in content_issues(cfg, sys.argv[1], lambda n: f'{EX}/screen-{P}{v}-{n}.html', required=True)]
    if cfg.get('cover') and not (Path(cfg['lab']) / 'src' / cfg['cover']).is_file():
        issues.append('declared cover file missing')
    if issues: sys.exit('Final assembly refused:\n' + '\n'.join(issues))
if preview and missing: sys.exit(f'Preview V{preview}: incomplete file set')
themes = cfg.get('themes') or {}
if not isinstance(themes, dict): sys.exit('assemble-round.py: "themes" must be {"01": ["Theme 1", …], …}')
for v, names in themes.items():
    if v not in cfg['variants'] or not isinstance(names, list) or not 1 <= len(names) <= 4 \
            or not all(isinstance(n, str) and n.strip() for n in names):
        sys.exit(f'assemble-round.py: "themes" → "{v}": expected 1–4 theme names for a variant of this round')
themes = {v: themes[v] for v in present if v in themes}

def switch(names, attr, label, indent):
    """a theme switch (the lab's .lab-seg pill): theme N = data-vt="N", the first pressed"""
    buttons = ''.join(f'<button type="button" data-vt="{i}" aria-pressed="{"true" if i == 1 else "false"}">'
                      f'{html.escape(n)}</button>' for i, n in enumerate(names, 1))
    return f'{indent}<div class="lab-seg lab-themes" {attr} role="group" aria-label="{label}">{buttons}</div>\n'

def figure(v, n):
    f = f'screen-{P}{v}-{n}.html'
    m = re.search(r'<title>(.*?)</title>', open(f'{EX}/{f}').read(), re.S)
    if not m: sys.exit(f'{EX}/{f}: no <title> (the caption comes from it; expected "R{R} V{v} · <Screen>")')
    t = m.group(1).strip()
    short = re.sub(r'^[^·]*·\s*', '', t)  # the frame title is the <title> after its first "·" (yarn links checks)
    return (f'<figure class="lab-screen"><figcaption><a href="{f}">{html.escape(t)}</a><button data-reset class="lab-btn" '
            f'title="Reset this screen">↺</button></figcaption><div class="phone-frame"><iframe src="{f}" '
            f'title="{html.escape(short, quote=True)}" class="phone-screen" loading="lazy"></iframe></div></figure>')

# The lab sheet's zoom steps are tuned for rows of three devices (1286 px). Any other screen count gets its own steps
# here: a row is N × 402 + (N − 1) × 40 px, and each step is the largest zoom that still fits (sheet width − 80 padding).
N = len(cfg['screens']); ROW = N * 402 + (N - 1) * 40
fit = ''
if N != 3:
    steps, prev = [], 1.0
    for z in (0.88, 0.78, 0.68, 0.58, 0.48, 0.4):
        steps.append(f'    @container lab-sheet (width < {int(ROW * prev + 80) + 1}px) {{ .lab-sheet .lab-sheet-fit {{ zoom: {z}; }} }}')
        prev = z
    fit = (f'  <!-- {N} screens per row ({ROW} px; boards w-[{ROW}px]): the lab sheet steps down for three, so this round\n'
           f'       steps its blocks down itself -->\n  <style>\n    .lab-sheet .lab-sheet-fit {{ zoom: 1; }}\n'
           + '\n'.join(steps) + '\n  </style>\n')
heads = '\n'.join(f'  <include src="explorations/parts/{P}{v}-head.html"></include>' for v in present)
sections = [f'''          <section class="lab-sheet-section" id="{P}{v}">
            <p>V{v} · {review_status(cfg, v).title()}</p>
{switch(themes[v], "data-lab-themes", "Tema", " " * 12) if v in themes else ""}            <div class="lab-sheet-fit">
              <include src="explorations/parts/{P}{v}-board.html"></include>
              <div class="lab-row">
''' + '\n'.join(f'                {figure(v, n)}' for n, *_ in cfg['screens']) + '''
              </div>
            </div>
          </section>''' for v in present]
if '--draft' in sys.argv and not preview:
    built = dict(zip(present, sections))
    sections = [built[v] if v in built else f'<section class="lab-sheet-section" id="{P}{v}" data-status="pending"><h2>V{v} · {html.escape(str(cfg["variants"][v]))}</h2><p>Pending</p></section>' for v in want]
compare = [f'''          <section class="lab-sheet-section" id="{cid}">
            <h2 class="lab-sheet-title">Compare · {label}</h2>
            <p>The same screen in all {len(present)} variants, at about half size. Click a name to open it full size.</p>
            <div class="lab-sheet-grid">
''' + '\n'.join(f'              {figure(v, n)}' for v in present) + '''
            </div>
          </section>''' for n, label, cid in cfg['screens']]
themes_all = switch([f'Tema {i}' for i in range(1, max(map(len, themes.values())) + 1)], 'data-lab-themes-all',
                    'Visų variantų tema', ' ' * 10) if themes else ''
cover = f'''          <section class="lab-sheet-section" id="r{R}-cover">
            <div class="lab-sheet-fit">
              <include src="{cfg['cover']}"></include>
            </div>
          </section>
''' if cfg.get('cover') else ''
page = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Explorations · Round {R} — Design Lab</title>
  <link rel="stylesheet" href="../styles.css">
  <!-- each variant's fonts + stylesheet: its board is styled by them -->
{heads}
{fit}{viewport_style}</head>
<body data-section="explorations" class="lab-page">
  <div class="lab-shell">
    <include src="_lab/shell/sidebar.html"></include>
    <main class="lab-main">
      <header class="lab-header">
        <div>
          <h1>Explorations</h1>
          <include src="explorations/parts/rounds.html"></include>
        </div>
        <include src="_lab/shell/controls.html"></include>
      </header>

      <!-- LAB CHROME sheet: [data-lab-sheet] and every lab-* class are workbench components (_lab/sheet/,
           _lab/canvas/canvas.css for screens and boards). The CONTENT is the round: its cover board, one
           .lab-sheet-section per variant (its board, parts/{P}NN-board.html, above its screens), then one
           screen compared across all the variants (.lab-sheet-grid). -->
      <div data-lab-sheet class="lab-sheet">
        <div class="lab-sheet-body">
{cover}{chr(10).join(sections)}
{themes_all}{chr(10).join(compare)}
        </div>
        <include src="_lab/sheet/sheet.html"></include>
      </div>
    </main>
  </div>
</body>
</html>
'''
if preview:
    # The variant preview is self-contained within the existing lab shell.
    page = page.replace(chr(10).join(compare), '')
out = f'{EX}/round-preview-{P}{preview}.html' if preview else f'{EX}/round-{R:02d}.html'
if '--dry' in sys.argv:
    if '--print' in sys.argv: print(page)
else:
    atomic_write(out, page)
if not preview and '--draft' not in sys.argv and '--keep-previews' not in sys.argv and '--dry' not in sys.argv:
    for f in os.listdir(EX):
        if f in {f'round-preview-{P}{v}.html' for v in cfg['variants']}: os.remove(f'{EX}/{f}')
print(f'round-{R:02d}.html: {len(present)} variants ({" ".join(present)}); missing: {" ".join(missing) or "none"}', file=sys.stderr)
