#!/usr/bin/env python3
"""palette-sheet.py PALETTES.json OUT.html [--quiet-round]  — every variant's palette on one sheet, before any build.

PALETTES.json (the selector writes it next to the brief):
  { "V01": { "name": "Specials board", "mode": "dark", "colours": [ {"hex": "#1f3b2d", "role": "ground", "share": 0.6}, … ] }, … }
`share` = the colour's rough share of a typical screen (they need not sum to 1).

Each variant's intensity is taken from its colours with share ≥ 0.25 (the fields you actually see):
neutral (max OKLCH C < 0.03) · tinted (< 0.12) · saturated (≥ 0.12, or a dark coloured ground: L < 0.5 with C ≥ 0.04). Prints the counts and exits 1 when the round is
too grey (saturated < N/2, or neutral > N/4) unless --quiet-round (the user asked for a quiet round).
Open the sheet with page-shot.mjs (file://OUT.html) and LOOK at it: the colour spread you see here is the spread the
compare strips will show."""
import json, math, sys, html

def oklch(hexs):
    h = hexs.lstrip('#')
    if len(h) == 3: h = ''.join(c * 2 for c in h)
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    lin = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = lin(r), lin(g), lin(b)
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l, m, s = (x ** (1 / 3) for x in (l, m, s))
    L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s
    a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s
    bb = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
    return L, math.hypot(a, bb), (math.degrees(math.atan2(bb, a)) + 360) % 360

if len(sys.argv) < 3 or sys.argv[1] in ('-h', '--help'): print(__doc__); sys.exit(2)
data = json.load(open(sys.argv[1]))
rows, counts = [], {'neutral': 0, 'tinted': 0, 'saturated': 0}
for vid, v in data.items():
    cols = v.get('colours', [])
    seen = [c for c in cols if c.get('share', 0) >= 0.25] or cols[:1]
    cmax = max((oklch(c['hex'])[1] for c in seen), default=0)
    # a dark coloured ground (board green, petrol) is a strong field at low chroma: count it by chroma relative to L
    dark_colour = any(oklch(c['hex'])[0] < 0.5 and oklch(c['hex'])[1] >= 0.04 for c in seen)
    kind = 'neutral' if cmax < 0.03 else 'saturated' if cmax >= 0.12 or dark_colour else 'tinted'
    counts[kind] += 1
    total = sum(max(c.get('share', 0.05), 0.02) for c in cols) or 1
    bar = ''.join(f'<div title="{html.escape(c["role"])} {c["hex"]}" style="flex:{max(c.get("share", 0.05), 0.02) / total:.3f};background:{c["hex"]}"></div>' for c in cols)
    chips = ''.join(f'<span><i style="background:{c["hex"]}"></i>{html.escape(c["role"])} {c["hex"]} · C {oklch(c["hex"])[1]:.2f}</span>' for c in cols)
    rows.append(f'<section><h2>{html.escape(vid)} · {html.escape(v.get("name", ""))} <small>{html.escape(v.get("mode", ""))} · {kind} (C {cmax:.2f})</small></h2><div class="bar">{bar}</div><p>{chips}</p></section>')
n = len(data)
too_grey = counts['saturated'] < n / 2 or counts['neutral'] > n / 4
summary = f'{n} variants: {counts["saturated"]} saturated · {counts["tinted"]} tinted · {counts["neutral"]} neutral'
page = f'''<!doctype html><meta charset="utf-8"><title>Palette sheet</title><style>
body{{margin:0;padding:40px;background:#e9eaec;font:14px/1.4 system-ui,sans-serif;color:#15171a}}
h1{{font-size:24px;margin:0 0 24px}} section{{margin:0 0 22px}} h2{{font-size:15px;margin:0 0 6px}} small{{color:#5d6167;font-weight:400}}
.bar{{display:flex;height:56px;border-radius:6px;overflow:hidden;box-shadow:0 0 0 1px #0002}}
p{{display:flex;flex-wrap:wrap;gap:4px 14px;margin:6px 0 0;color:#3d4147;font-size:12px}} i{{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:4px;box-shadow:0 0 0 1px #0003}}
</style><h1>{summary}{" — TOO GREY" if too_grey else ""}</h1>{"".join(rows)}'''
open(sys.argv[2], 'w').write(page)
print(summary + (' — too grey: saturated < N/2 or neutral > N/4' if too_grey else ' — ok'))
sys.exit(1 if too_grey and '--quiet-round' not in sys.argv else 0)
