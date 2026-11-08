#!/usr/bin/env python3
"""Standalone target: static checks for every variant of a round (round.json) — the file set, CSS scoped to .rR-vNN
(the round page loads every variant's CSS at once), fonts only via head.html (no @import / @font-face), prefixed
keyframes, <title> "R{R} V{NN} · …", the flow links, and every local href/src resolving to a file. Exit 1 on a problem.
Runtime checks (icons that didn't render, broken images, overflow, console errors) are verify-screens.mjs's job.
usage: python3 check-standalone.py round.json [--draft|--final]
--draft checks complete variants while reporting incomplete positions as pending; final/default requires all.
Optional content_specs (JSON path relative to round.json or inline mapping) is checked against static text."""
import json, os, re, sys
from round_support import content_issues
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

class References(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs = []
    def handle_starttag(self, tag, attrs):
        self.refs.extend(value for name, value in attrs if name in ("src", "href", "poster", "xlink:href") and value)
if len(sys.argv) < 2 or sys.argv[1] in ('-h', '--help'): print(__doc__); sys.exit(2)
if not os.path.isfile(sys.argv[1]): sys.exit(f'check-standalone.py: round.json not found: {sys.argv[1]}')
cfg = json.load(open(sys.argv[1])); OUT = cfg['out']; R = cfg['round']; RD = f'{OUT}/round-{R:02d}'
screens = [n for n, *_ in cfg['screens']]
flow = cfg.get('flow') or [[a, b] for a, b in zip(screens, screens[1:] + screens[:1])]
bad_any = False
if '--draft' in sys.argv and '--final' in sys.argv: sys.exit('--draft and --final are mutually exclusive')

def selectors_unscoped(css, cls):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S); out = []
    for m in re.finditer(r'([^{};]+)\{', css):
        sel = m.group(1).strip()
        if not sel or sel.startswith('@') or re.fullmatch(r'(from|to|[\d.]+%)(\s*,\s*(from|to|[\d.]+%))*', sel): continue
        parts, depth, cur = [], 0, ''
        for ch in sel:
            depth += ch == '('; depth -= ch == ')'
            if ch == ',' and depth == 0: parts.append(cur); cur = ''
            else: cur += ch
        parts.append(cur)
        out += [p.strip()[:60] for p in parts if f'.{cls}' not in p]
    return out

for v in cfg['variants']:
    d = f'{RD}/v{v}'; cls = f'r{R}-v{v}'; issues = []
    files = ['head.html', 'style.css', 'board.html'] + [f'screen-{n}.html' for n in screens]
    if '--draft' in sys.argv and not all(os.path.isfile(f'{d}/{f}') for f in files):
        print(f'V{v}: pending (incomplete file set)'); continue
    if not os.path.isdir(d): print(f'V{v}: not built'); bad_any = True; continue
    issues += [f'missing v{v}/{f}' for f in files if not os.path.exists(f'{d}/{f}')]
    if os.path.exists(f'{d}/style.css'):
        css = open(f'{d}/style.css').read()
        if re.search(r'@import|@font-face', css): issues.append('@import / @font-face in style.css (fonts belong in head.html)')
        issues += [f'keyframes not prefixed {cls}-: {k}' for k in re.findall(r'@keyframes\s+([\w-]+)', css) if not k.startswith(f'{cls}-')]
        issues += [f'unscoped selector: {s}' for s in selectors_unscoped(css, cls)]
    if os.path.exists(f'{d}/board.html'):
        b = re.sub(r'<!--.*?-->', '', open(f'{d}/board.html').read(), flags=re.S).strip()
        if cls not in b.split('>', 1)[0]: issues.append(f'board root element lacks class {cls}')
        if re.search(r'<(a|button)\b', b): issues.append('board contains a link or button (boards are static)')
    for n in screens:
        p = f'{d}/screen-{n}.html'
        if not os.path.exists(p): continue
        t = open(p).read()
        if not re.search(rf'<title>R{R} V{v} · ', t): issues.append(f'screen-{n}: <title> is not "R{R} V{v} · …"')
        if f'class="{cls}' not in t and f' {cls}' not in t: issues.append(f'screen-{n}: <body> lacks class {cls}')
        if 'phone.js' not in t: issues.append(f'screen-{n}: missing ../../assets/phone.js')
    for filename in [f for f in files if f.endswith('.html') and os.path.isfile(f'{d}/{f}')]:
        parser = References(); parser.feed(open(f'{d}/{filename}').read())
        for ref in parser.refs:
            url = urlsplit(ref)
            if url.scheme or url.netloc or not url.path: continue
            local = os.path.join(OUT, unquote(url.path).lstrip('/')) if url.path.startswith('/') else os.path.join(d, unquote(url.path))
            if not os.path.isfile(local): issues.append(f'{filename}: {ref} resolves nowhere')
    issues += content_issues(cfg, sys.argv[1], lambda n: f'{d}/screen-{n}.html', required='--final' in sys.argv)
    for a, b2 in flow:
        p = f'{d}/screen-{a}.html'
        if os.path.exists(p) and f'href="screen-{b2}.html"' not in open(p).read(): issues.append(f'screen-{a} has no link to screen-{b2}')
    bad_any |= bool(issues)
    print(f'V{v}: ok' if not issues else f'V{v}:\n' + '\n'.join(f'   - {i}' for i in issues))
sys.exit(1 if bad_any else 0)
