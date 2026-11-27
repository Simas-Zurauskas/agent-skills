#!/usr/bin/env python3
"""Standalone target: assemble <out>/round-RR/index.html from round.json — a self-contained static page (no build):
cover, one section per variant (its board inlined above its phones), one compare strip per screen, round tabs.
Also writes <out>/index.html (opens the latest round) and copies the skill's page assets into <out>/assets/.
  python3 assemble-standalone.py round.json               # the whole round (deletes preview-*.html)
  python3 assemble-standalone.py round.json --keep-previews  # the whole round, previews kept (mid-build, for the round critic)
  python3 assemble-standalone.py round.json --draft --ready 01,03  # lead-confirmed drafts; early stable pending positions, retain previews
  python3 assemble-standalone.py round.json --final      # require all files and supplied content_specs
  python3 assemble-standalone.py round.json --preview 03  # round-RR/preview-v03.html: one variant, for its builder
Layout: <out>/round-RR/vNN/{head.html, style.css, board.html, screen-<n>.html}, <out>/round-RR/cover.html, <out>/img/."""
import html, json, os, re, sys
from pathlib import Path
from round_support import atomic_write, relocate_html, content_issues, review_status, viewport_css, publication_ids
if len(sys.argv) < 2 or sys.argv[1] in ('-h', '--help') or sys.argv[-1] == '--preview':
    print(__doc__); sys.exit(2)
if not os.path.isfile(sys.argv[1]): sys.exit(f'assemble-standalone.py: round.json not found: {sys.argv[1]}')
cfg = json.load(open(sys.argv[1]))
OUT = cfg['out']; R = cfg['round']; RD = f'{OUT}/round-{R:02d}'; P = f'r{R}-v'
SKILL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
viewport_style = viewport_css(cfg, 'standalone')
preview = sys.argv[sys.argv.index('--preview') + 1] if '--preview' in sys.argv else None

if '--draft' in sys.argv and '--final' in sys.argv:
    sys.exit('--draft and --final are mutually exclusive')
if preview and preview not in cfg['variants']:
    sys.exit(f'unknown preview variant: {preview}')

want = [preview] if preview else list(cfg['variants'])
present = [v for v in want if all(os.path.isfile(f'{RD}/v{v}/{f}') for f in ['board.html', 'head.html', 'style.css'] +
                                  [f'screen-{n}.html' for n, *_ in cfg['screens']])]
ready = publication_ids(cfg, sys.argv)
if ready is not None:
    if ready - set(present): sys.exit('Ready publication refused: incomplete file sets for ' + ', '.join(sorted(ready - set(present))))
    present = [v for v in present if v in ready]
missing = [v for v in want if v not in present]
if '--final' in sys.argv:
    if preview: sys.exit('--final cannot be combined with --preview')
    issues = [f'V{v}: incomplete file set' for v in missing]
    for v in present:
        issues += [f'V{v}: {issue}' for issue in content_issues(cfg, sys.argv[1], lambda n: f'{RD}/v{v}/screen-{n}.html', required=True)]
    if issues: sys.exit('Final assembly refused:\n' + '\n'.join(issues))
if preview and missing:
    sys.exit(f'Preview V{preview}: incomplete file set')

def read(p): return open(p, encoding='utf-8').read()
def figure(v, n):
    f = f'v{v}/screen-{n}.html'
    m = re.search(r'<title>(.*?)</title>', read(f'{RD}/{f}'), re.S)
    if not m: sys.exit(f'{RD}/{f}: no <title> (the caption comes from it; expected "R{R} V{v} · <Screen>")')
    t = m.group(1).strip()
    short = re.sub(r'^[^·]*·\s*', '', t)
    return (f'<figure class="mb-phone"><figcaption><a href="{f}">{html.escape(t, False)}</a></figcaption>'
            f'<div class="mb-frame"><iframe src="{f}" title="{html.escape(short)}" loading="lazy"></iframe></div></figure>')
def board(v):
    b = read(f'{RD}/v{v}/board.html')
    return relocate_html(b, f"v{v}/")

heads = []
for v in present:
    heads.append(read(f'{RD}/v{v}/head.html').strip())
    heads.append(f'<link rel="stylesheet" href="v{v}/style.css">')
rounds = sorted({d.name for d in Path(OUT).glob('round-*') if d.is_dir() and re.fullmatch(r'round-\d\d', d.name)} | {f'round-{R:02d}'})
tabs = '\n'.join(f'      <a href="../{d}/index.html">Round {int(d[6:])}</a>' for d in rounds)
sections = [f'''    <section class="mb-section" id="{P}{v}">
      <p class="mb-status">V{v} · {review_status(cfg, v).title()}</p>
      <div class="mb-fit">
{board(v)}
        <div class="mb-row">
''' + '\n'.join(f'          {figure(v, n)}' for n, *_ in cfg['screens']) + '''
        </div>
      </div>
    </section>''' for v in present]
if '--draft' in sys.argv and not preview:
    built = dict(zip(present, sections))
    sections = [built[v] if v in built else f'<section class="mb-section" id="{P}{v}" data-status="pending"><h2>V{v} · {html.escape(str(cfg["variants"][v]))}</h2><p>Pending</p></section>' for v in want]
compare = [] if preview else [f'''    <section class="mb-section" id="{cid}">
      <h2 class="mb-title">Compare · {html.escape(label)}</h2>
      <p>The same screen in all {len(present)} variants, at about half size. Click a name to open it full size.</p>
      <div class="mb-grid">
''' + '\n'.join(f'        {figure(v, n)}' for v in present) + '''
      </div>
    </section>''' for n, label, cid in cfg['screens']]
cover = ''
if not preview and os.path.exists(f'{RD}/cover.html'):
    cover = f'''    <section class="mb-section" id="r{R}-cover">
      <div class="mb-fit">
{read(f"{RD}/cover.html")}
      </div>
    </section>
'''
title = f'{cfg.get("project", "Moodboards")} · Round {R}' + (f' · preview V{preview}' if preview else '')
page = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)}</title>
  <link rel="stylesheet" href="../assets/moodboard.css">
  {chr(10).join("  " + h if i else h for i, h in enumerate(heads))}
  {viewport_style}
</head>
<body class="mb-page">
  <header class="mb-header">
    <h1>{html.escape(cfg.get("project", "Moodboards"))} · Explorations</h1>
    <nav class="mb-tabs" aria-label="Rounds">
{tabs}
    </nav>
  </header>
  <main class="mb-body">
{cover}{chr(10).join(sections)}
{chr(10).join(compare)}
  </main>
  <script src="../assets/moodboard.js"></script>
</body>
</html>
'''
target = f'{RD}/preview-v{preview}.html' if preview else f'{RD}/index.html'
# Only the lead's round assembly initializes shared assets. Existing user assets
# are never overwritten; independent builders publish only their preview file.
if not preview:
    for name in ('moodboard.css', 'moodboard.js', 'phone.js'):
        asset = Path(OUT) / 'assets' / name
        if not asset.exists():
            atomic_write(asset, read(f'{SKILL}/targets/standalone/assets/{name}'))
atomic_write(target, page)
if not preview:
    for f in os.listdir(RD):
        if f in {f'preview-v{v}.html' for v in cfg['variants']} and '--keep-previews' not in sys.argv and '--draft' not in sys.argv: os.remove(f'{RD}/{f}')
    # every earlier round's page gets the new tab list too, so each round links to every other
    nav = re.compile(r'(<nav class="mb-tabs" aria-label="Rounds">\n).*?(\n    </nav>)', re.S)
    for d in rounds:
        p2 = f'{OUT}/{d}/index.html'
        if d != f'round-{R:02d}' and os.path.exists(p2):
            old_page = read(p2); new_page = nav.sub(lambda m: m.group(1) + tabs + m.group(2), old_page)
            if new_page != old_page: atomic_write(p2, new_page)
    latest = rounds[-1] if rounds else f'round-{R:02d}'
    atomic_write(f'{OUT}/index.html', f'<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url={latest}/index.html">'
                                         f'<title>{html.escape(cfg.get("project", "Moodboards"))} · Explorations</title><a href="{latest}/index.html">Latest round</a>\n')
print(f'{os.path.relpath(target, OUT)}: {len(present)} variant(s) {" ".join(present)}; missing: {" ".join(missing) or "none"}')
