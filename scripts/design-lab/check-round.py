#!/usr/bin/env python3
"""Mechanical checks for every variant of a round (round.json): the file set, CSS scoped to .rR-vNN, no <script>,
no @import/@font-face, prefixed keyframes, Lucide icon names that exist, <title> pattern, the flow links
(screen 1 → 2 → 3 → 1), then `yarn links` (read-only). Exit 1 on any problem.
usage: python3 check-round.py round.json [--draft|--final]
--final rejects every missing declared variant; --draft checks complete variants, reports incomplete as pending.
Legacy no-flag behavior skips entirely absent variants. Supplied content_specs is checked against static text."""
import json, os, re, subprocess, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from round_support import content_issues
if len(sys.argv) < 2 or sys.argv[1] in ('-h', '--help'): print(__doc__); sys.exit(2)
if not os.path.isfile(sys.argv[1]): sys.exit(f'check-round.py: round.json not found: {sys.argv[1]}')
cfg = json.load(open(sys.argv[1])); LAB = cfg['lab']; R = cfg['round']; EX = f'{LAB}/src/explorations'; P = f'r{R}-v'
ICONS = f'{LAB}/node_modules/lucide/dist/esm/icons'  # one <name>.mjs per icon
screens = [n for n, *_ in cfg['screens']]
bad_any = False
if '--draft' in sys.argv and '--final' in sys.argv: sys.exit('--draft and --final are mutually exclusive')
for v in cfg['variants']:
    vid = f'{P}{v}'; issues = []
    files = [f'screen-{vid}-{n}.html' for n in screens] + [f'{vid}.css', f'parts/{vid}-board.html', f'parts/{vid}-head.html']
    if '--draft' in sys.argv and not all(os.path.isfile(f'{EX}/{f}') for f in files):
        print(f'V{v}: pending (incomplete file set)'); continue
    if not any(os.path.exists(f'{EX}/{f}') for f in files):
        print(f'V{v}: not built'); bad_any |= '--final' in sys.argv; continue
    issues += [f'missing {f}' for f in files if not os.path.exists(f'{EX}/{f}')]
    css_path = f'{EX}/{vid}.css'
    if os.path.exists(css_path):
        css = re.sub(r'/\*.*?\*/', '', open(css_path).read(), flags=re.S)
        if re.search(r'@import|@font-face', css): issues.append('@import / @font-face in the CSS (fonts go in the head part)')
        issues += [f'keyframes not prefixed {vid}-: {k}' for k in re.findall(r'@keyframes\s+([\w-]+)', css) if not k.startswith(f'{vid}-')]
        for m in re.finditer(r'([^{};]+)\{', css):
            sel = m.group(1).strip()
            if not sel or sel.startswith('@') or re.fullmatch(r'(from|to|[\d.]+%)(\s*,\s*(from|to|[\d.]+%))*', sel): continue
            # split on top-level commas only (not inside :is()/:where())
            parts, depth, cur = [], 0, ''
            for ch in sel:
                depth += ch == '('; depth -= ch == ')'
                if ch == ',' and depth == 0: parts.append(cur); cur = ''
                else: cur += ch
            parts.append(cur)
            issues += [f'unscoped selector: {p.strip()[:60]}' for p in parts if f'.{vid}' not in p]
    html = {f: open(f'{EX}/{f}').read() for f in files if f.endswith('.html') and os.path.exists(f'{EX}/{f}')}
    issues += [f'<script> in {f}' for f, t in html.items() if '<script' in t]
    # build traps that broke whole-lab builds or static renders (Dream Catcher Rounds 5–7)
    css_raw = open(css_path).read() if os.path.exists(css_path) else ''
    srcs = {f'{vid}.css': css_raw, **html}
    for f, t in srcs.items():
        for img in sorted(set(re.findall(r'img/[\w.-]+\.(?:jpe?g|png|webp|svg|avif)', t))):
            if not os.path.exists(f'{EX}/{img}'): issues.append(f'{f}: missing image {img} (renamed when copying a parent?)')
        if re.search(r'mask(?:-image)?\s*:[^;{}]*url\(\s*["\']?img/', t):
            issues.append(f'{f}: CSS mask from an image file (Chrome drops it on file://): inline it as a data URI')
    for f, t in html.items():
        if re.search(r'class="[^"]*\[url\(', t):
            issues.append(f'{f}: url() inside a Tailwind class (resolves from src/styles.css and breaks the lab build)')
        issues += [f'{f}: SVG id "{i}" contains "new" (the minifier rewrites it; rename)'
                   for i in re.findall(r'\sid="([^"]*new[^"]*)"', t)]
    icons = sorted({i for t in html.values() for i in re.findall(r'data-lucide="([^"]+)"', t)})
    issues += [f'unknown Lucide icon: {i}' for i in icons if not os.path.exists(f'{ICONS}/{i}.mjs')]
    for n in screens:
        t = html.get(f'screen-{vid}-{n}.html', '')
        if t and not re.search(rf'<title>R{R} V{v} · ', t): issues.append(f'screen {n}: <title> is not "R{R} V{v} · …"')
    flow = cfg.get('flow') or list(zip(screens, screens[1:] + screens[:1]))  # round.json's flow, else 1→2→…→1
    for a, b in flow:
        t = html.get(f'screen-{vid}-{a}.html', '')
        if t and f'href="screen-{vid}-{b}.html"' not in t: issues.append(f'screen {a} has no link to screen {b}')
    issues += content_issues(cfg, sys.argv[1], lambda n: f'{EX}/screen-{vid}-{n}.html', required='--final' in sys.argv)
    bad_any |= bool(issues)
    print(f'V{v}: ok' if not issues else f'V{v}:\n' + '\n'.join(f'   - {i}' for i in issues))
res = subprocess.run(['yarn', '-s', 'links'], cwd=LAB, capture_output=True, text=True)
probs = [l for l in (res.stdout + res.stderr).splitlines() if f'R{R} V' in l and ('✗' in l or '≠' in l or 'no such' in l or 'no accessible' in l)]
print('yarn links:', 'exit', res.returncode, *(['\n  ' + '\n  '.join(probs)] if probs else []))
sys.exit(1 if bad_any or res.returncode else 0)
