# Images: photos, avatars, grades, mascots

> Current interpretation: [design diagnostics](design-diagnostics.md) and [execution contract](execution-contract.md) govern. Historical product-specific bans, caps, screen formulas and timings below are examples, not universal requirements. Use only the sections relevant to this product and target.

Read this before you write the brief's photo-library section, and again before you generate anything: when a round
needs images, the shared library, prompts, the checks, compression, per-variant CSS grades, and mascots.

## 1. Decide whether photos belong at all

Imagery is a diversity axis like any other (none · illustration or mascot · photo). Keep photos rare: a round judges
systems, and a photo can carry the mood that type, color and layout should be carrying. Example (Repperoni R1): 3 of
10 variants used a scene image, and only one put a photo in a screen. Photos earn a place in three spots only:

| Place | Rule | Why |
| --- | --- | --- |
| Avatars | Only for the people the content spec says have a photo. Everyone else gets initials | The real product will be mostly initials. Design that as the normal state, not a broken fallback |
| Board mood image | At most one per variant, and only when the direction's vernacular is a place or a scene | It shows the world the direction borrows from. It is never decoration |
| One photo inside a screen | Only when the photo *is* the direction's idea (one variant per round, a capped device) | One photograph spent once reads as a decision. Photos on every card read as a template |
| Content photos the product really has | Only when the product's content is photographic (dishes on a menu, listings, products for sale). They are part of the content spec: the same files in every variant, and only the crop, grade and frame vary | Removing them would misstate the product; varying them would break the comparison |

- Never add photos the product can't have (covers on user-made items users can't upload, stock hero banners, photo
  cards on a feed). Example (Repperoni R1): no photos on challenges, a product rule. Photos of people and scenes are
  still capped; content photos (the fourth row) follow the content spec, not the cap.
- One avatar system: photos and initials share one size, shape and ring. A 1 px inner ring at about 8–10 % ink
  stops light photos bleeding into light surfaces and dark ones into dark surfaces. Initials fills come from a fixed
  tonal set keyed to the name, letters at 4.5:1, no gradients. Photos get the person's name as `alt`.
- Text on a photo always sits on a backing, and you measure contrast on the *lightest* pixels under it. The options,
  from heaviest to subtlest: a full overlay (about 35 % black), a semi-opaque strip, blur, a floor fade (transparent
  to about 20 % black), an elliptical scrim (40 % black to transparent), or copy space where the photo is calm
  ([Learn UI Design](https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-2.html),
  [Smashing](https://www.smashingmagazine.com/2023/08/designing-accessible-text-over-images-part1/)). Never bake
  text into an image ([Apple HIG, Images](https://developer.apple.com/design/human-interface-guidelines/images)).
- A raw, unedited treatment can itself be a brand stance (BeReal: no filters, no editing;
  [Spectr](https://www.spectr.to/gallery/bereal)). "As sent" is a legitimate grade.
- No image budget: skip generation. Variants carry initials plus the vernacular's typographic and graphic devices.

## 2. One shared library, generated once

- **Generate only what the brief lists.** The brief's photo-library table is the whole shopping list: file, subject
  and style, size, which variants use it, and each variant's grade. Nothing gets generated "in case". Example
  (Repperoni R1): of 5 scenes, 2 ended up unused (one failed the check, and the builder never placed the other).
- **One folder, shared by every variant**: `<OUT>/img/` in the standalone target, `src/explorations/img/` in the
  Design Lab. Builders read from it and never add to it unless the brief assigns them an image.
- **Per-variant looks are CSS grades on the same files** (§7), not baked per-variant images. The same faces graded
  ten ways let a reviewer compare grades rather than photos, at no cost, with each variant still one diff.
- **Avatars: generate a tight head-and-shoulders crop** (the face filling half the frame or more). Heavy grades
  (halftone, mosaic, flash falloff) destroy anything small. Example (Repperoni R1): in the 480 px sources the face
  filled about a third of the frame. At 36 px under a mosaic it got about 3 blocks and read as nobody. V08 had to
  crop 2.3–2.4× in CSS, and V07 had to enlarge the avatar.
- Keep avatar backgrounds simple and tonally apart from the face; busy, bright backgrounds fight every heavy grade.
  Example (Repperoni R1): Sam's lamp-lit kitchen and Maya's green park showed through the CSS flash grade, and the
  halftone needed per-photo exposure to keep Sam's skin off the kitchen's tone.

## 3. Models and cost (WaveSpeed via the `myapis` skill)

Model ids and prices change: rediscover them every run, and never guess a parameter (most schemas reject unknown keys).

If the `myapis` skill is not installed, use whatever image generation the session has (for example a WaveSpeed
MCP server) or licensed stock photos, keep the same rules, and say which in the handover.

```bash
S=$(ls -d ~/.agents/skills/myapis/scripts ~/.claude/skills/myapis/scripts 2>/dev/null | head -1)
$S/ws.sh models --type text-to-image --cheap            # cheapest first
$S/ws.sh schema bytedance/seedream-v4                   # exact params before any run
$S/ws.sh run bytedance/seedream-v4 '{"prompt":"…","size":"2400*1800"}' --out "$RAW/scenes"
```

`size` is `"W*H"` with an asterisk. Keep the whole payload in single quotes: in zsh a bare `2400*1800` is a glob and
fails with "no matches found". Run scene jobs in parallel, one `--out` dir each, into the scratchpad, never the output folder (only the checked, compressed files go into `img/`).

| Job | Model (price per image, 2026-09) | Notes |
| --- | --- | --- |
| Avatars | `wavespeed-ai/flux-schnell` ($0.003), `wavespeed-ai/z-image/turbo` ($0.005) | Shown at 32–44 px under a grade: a believable face is enough |
| Scenes, mood images | `bytedance/seedream-v4` ($0.027, ~8 s) | Good candid realism; `size` 512–8192 per side |
| Same person relit (only if assigned) | `bytedance/seedream-v4/edit` ($0.027) after `ws.sh upload` | Image-to-image keeps the face. Ask first (§7) |
| Not worth it here | `google/nano-banana-2/text-to-image` ($0.07, ~40 s) | Excellent avatars, overkill at avatar size |

Example (Repperoni R1): 2 avatars on Nano Banana 2 plus 8 Seedream scene runs (5 plus 3 regenerated) came to about
$0.36. Cheap avatars would have brought it to about $0.23. Put the actual cost in the handover.

## 4. The prompt recipe: a phone snapshot, not a campaign

Image models default to the stock-photo median: young, slim, athletic, symmetrical, centered, level, lit at golden
hour. Every slot below exists to pull the image off that median. Name things concretely; adjectives don't do it.

| Slot | Write | Example (Repperoni R1) |
| --- | --- | --- |
| Who | Count, then mix: gender, ethnicity, **build and age named per person** | "two women and three men, one heavier, one older" |
| Wearing | The garments themselves | "jeans, a hoodie, an old T-shirt". "Everyday training clothes" still produced sports bras and leggings |
| Doing | The action, and **where every phone points** | "phones held up showing a screen to each other" |
| Where | An ordinary, specific, slightly messy place | "a shared flat's living room, cluttered shelves, a pizza box on the floor" |
| Light | One named, ordinary source | "hard on-camera phone flash, background falling to black" / "flat overcast afternoon" / "fluorescent overhead" |
| Camera | Phone snapshot habits | "shot on a phone from waist height, slightly crooked, imperfect framing, a little noise, someone's arm in the way" |
| Exclude | What the check will fail anyway | "no readable text, signage or logos" |

What pulls toward stock (from the research and this run): golden hour, sunset, "warm light", lens flare, a silhouette
against the sky, a heroic low angle, sweat-and-sunrise motivation, posed athletes, glossy editorial, a crew posed from
behind arm in arm, everyone facing the lens with the same grin. Example (Repperoni R1): "a crew from behind, arms up
cheering" came back as four slim people in sports bras, framed level and centered: a "squad goals" lifestyle post.

**Objects and food.** The same logic applies off people. The stock median for food is the overhead flat-lay: glossy,
steam, scattered garnish, a marble or dark-slate board, shallow depth of field. For products it is the floating
pack shot on a gradient. Name the real container, the real surface, the light and the mess ("a takeaway tray on a
counter under fluorescent light, a receipt spike behind it"), and decide in the brief whether the shot is the
product's own photography style or the vernacular's.

Negative instructions are weak. Example (Repperoni R1): "no signage, no text" in the pool prompt still produced
garbled lettering on the wall, and the park scene grew warped sign plates. Choose scenes without sign-bearing
surfaces, or plan a crop that clears them (V10 cropped its pool photo clear of the lettering).

## 5. Three checks before any image is used

Build a contact sheet (all candidates side by side) and look at each image at full size *and* at its display size.
Run all three checks. Any fail: rewrite the prompt and regenerate once, or drop the image. Every image slot needs a
no-photo fallback in the brief, so dropping one never blocks a builder.

**a. Realism.** Hands and fingers right. No warped text, signage or logos. Skin with texture and uneven light (no
plastic sheen). Eyes and teeth consistent. One light direction. No melting background. A little noise and
imperfect framing. No golden hour, lens flare or silhouette against the sky.

**b. Genre and cast.** Would it pass as an ad? Then it fails. Is the cast mixed the way the brief asked, *build
and age included*? Build is what the model dropped in R1. Example (Repperoni R1): the builder passed the finish photo
("four backs, arms up, no phone aimed at anyone") and the critic failed it on build and genre. Give the checker the
cast list and the genre question explicitly; "looks real" isn't the test.

**c. Brand guardrails: what does the image imply?** Read the picture as a story about the product and hold it
against every guardrail in the guidelines, not just the visual ones. The model does literally what the prompt
says, so run this check on the *prompt* before you spend, and again on the result.

> Example (Repperoni R1). The brand runs on trust: no proof, no one watched or checked ("Receipts never"; no camera
> near logging). Three scene prompts had friends filming someone mid-rep, and the model obeyed. A phone aimed at a
> person exercising *is* video proof, so the images sold the surveillance the product rejects; a lone woman at night
> under a streetlight, filmed while a third person laughs, also reads as mocked or watched. "Phones out" meant the
> group chat. New rule: no phone aimed at the person doing the activity; phones show a screen to each other or take
> an arm's-length crew selfie, and the person repping laughs *with* the others.

Generalized: does anyone look watched, judged, mocked, excluded or turned into a before/after? Does it show a
behavior the product refuses, or break the audience rules (R1's: alpha posturing, body talk, five identical people;
a finance product might rule out cash piles and luxury props, a food product diet shaming)?

## 6. Compression

Generate larger than needed in the target aspect ratio (scenes `2400*1800`, portrait `1560*2240`, avatars
`1024*1024`), then fit-crop and compress. The R1 files came out at 60–190 KB each.

```python
# compress.py RAW OUT: python3 compress.py raw/finish-crew.jpeg img/finish-crew-flash.jpg portrait
import sys
from PIL import Image, ImageOps
SIZES = {"scene": (1200, 900), "portrait": (780, 1120), "avatar": (480, 480)}  # portrait = 2x a 390 x 560 slot
src, dst, kind = sys.argv[1], sys.argv[2], sys.argv[3]
im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
im = ImageOps.fit(im, SIZES[kind], Image.LANCZOS, centering=(0.5, 0.5))  # set centering to steer the crop
im.save(dst, "JPEG", quality=80, optimize=True, progressive=True)
```

Serve in-screen art at 2× its CSS size. Keep the raw generations in the scratchpad until the round ships.

## 7. Per-variant grades in CSS

One grade per variant, drawn from its vernacular and stated on its board; no two variants share one. The board shows
a graded photo avatar beside an initials avatar. Grade the `img`, and draw the ring as an `::after` above it. Shipped
R1 values, as starting points to tune on screenshots:

| Look | CSS on the `img` | Extra layer / note |
| --- | --- | --- |
| Tungsten (pub, lamp-lit room) | `sepia(.3) saturate(1.1) contrast(1.08) brightness(.95)` | — |
| One-ink print (flexo, a single brown ink) | `grayscale(1) contrast(1.22) brightness(1.06)` | `mix-blend-mode: multiply` over the tinted paper ground |
| Photocopy | `grayscale(.85) contrast(.85) brightness(1.15)` | — |
| B/W print (match program, newspaper) | `grayscale(1) contrast(1.35)` | — |
| Floodlit night (cold LED) | `grayscale(.55) contrast(1.25) brightness(.92)` | `::before` of `rgb(127 156 201 / .28)` with `mix-blend-mode: color` lays a blue cast over the photo's own light and dark |
| Fluorescent (leisure center) | `saturate(.82) hue-rotate(-12deg) brightness(1.06) contrast(.9)` | Cool cast, lifted shadows |
| On-camera flash | `contrast(1.45) brightness(1.2) saturate(.85)`, scaled 1.18 from 50% 38% | `::before` `radial-gradient(closest-side at 50% 42%, transparent 54%, rgb(0 0 0/.93) 100%)`. See the limit below |
| As sent | none | True color is a stance too |

**Limit: CSS can't relight.** It can shift tone, color and print process. It can't turn a lamp-lit kitchen behind
a face into flash falloff. Example (Repperoni R1): the critic called the CSS flash grade "a vignette, not flash" at
44 px. Default to CSS anyway. If a grade that needs relighting is the variant's signature, say so on the board as a
trade-off and ask the user before baking an image-to-image pair.

**Posterized mosaic (teletext, pixel).** Pixelation alone reads as TV face-censoring. The blocks have to snap to
the page's own inks. Put the SVG filter at the top of the screen and apply it to a wrapper around the `img` (so the
blocks lock to the avatar box), with `contrast(1.4)` on the `img` itself. The feComposite `width`/`height` sets the
block size in px, and the dilate radius is about (block − 1) / 2:

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="mosaic" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
  <feFlood x="1" y="1" width="0.9867" height="0.875"/><feComposite width="2.9867" height="2.875"/><feTile result="a"/>
  <feComposite in="SourceGraphic" in2="a" operator="in"/><feMorphology operator="dilate" radius="1 1"/>
  <feComponentTransfer><feFuncR type="discrete" tableValues="0 1"/><feFuncG type="discrete" tableValues="0 1"/><feFuncB type="discrete" tableValues="0 1"/></feComponentTransfer>
  <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  -1 1 2 0 0  0 0 0 1 0"/></filter></svg>
```

The discrete transfer snaps to 8 inks; the last matrix (B' = 2B + G − R) folds green into cyan for a palette that
bans green. Crop to the face first; if faces still don't read, make the avatar bigger, not the blocks smaller.

**Coarse one-color halftone (print).** A fixed dot pattern laid over a gray photo reads as a screen door, because
the dots never grow with the tone. Use a thresholded AM screen instead:

```css
/* markup: <span class="av photo"><span class="ht"><img src="img/avatar-a.jpg" alt="…"></span></span> */
.av.photo { position: relative; isolation: isolate; overflow: hidden; }
.av.photo::before { content: ""; position: absolute; inset: 0; z-index: 1;   /* pure black -> the press ink */
  background: var(--ink); mix-blend-mode: lighten; }
.ht { position: absolute; inset: 0; overflow: hidden; background: #fff; filter: contrast(20); } /* thresholds */
.ht img { display: block; width: 100%; height: 100%; object-fit: cover;
  transform: scale(var(--s, 1.7)); transform-origin: var(--o, 50% 30%);
  filter: grayscale(1) brightness(var(--e, 1)) contrast(var(--c, 1.25)) brightness(var(--b, .6)) blur(.5px); }
.ht::after { content: ""; position: absolute; inset: -50%; transform: rotate(45deg); mix-blend-mode: color-dodge;
  background: radial-gradient(circle, #000 0 25%, #fff 75%) 0 0 / var(--dot, 2.5px) var(--dot, 2.5px); }
```

The final `brightness(.6)` pulls the image into the lower half of the tonal range. Without it, everything lighter
than 50 % gray prints as bare white. Give each photo its own exposure and crop (`--e`, `--c`, `--b`, `--s`, `--o`;
R1 used scales of 2.3–2.4×), as a printer does per negative. Pitch: 2.5 px on a 40 px avatar (3 px broke faces
into patches at DPR 2), and 6 px for a board image. State the pitch on the board.

## 8. Mascots and illustrations: spec them or cut them

A mascot with no source asset gets drawn freehand in SVG by a builder under time pressure, and it is the element most
likely to tip a direction into kitsch (stock 3D and Corporate Memphis figures are a known generic tell). So either:

- **Spec it as a build**: the shape, a parts list, face rules, the inks (read from the variant's tokens), stroke
  width, size, where it may appear, and one shared SVG in `img/` reviewed at 1× and 3× before use. Add a kill rule on
  the board ("tested here; cut if it reads as kiddie"). It never sits above the hero number, near it, or at a
  comparable size, and it stays off Home and chrome.
- **Or cut it** from the round, and note on the board that it gets tested later.

The spec goes into the brief's asset library as a table. Example (Repperoni R1, `mascot-slice.svg`, the finish screen
only, below the facts):

| Part | Spec |
| --- | --- |
| Canvas | `viewBox="0 0 64 72"`, rendered 64 × 72. Upright, no rotation, no shadow |
| Body | Triangle, point down at (32, 70), crust arc (4, 10) → (32, 4) → (60, 10). Cheese fill, 2 px espresso outline |
| Details | Tomato band 10 px deep along the crust (the sweatband). Exactly 3 discs, r 5.5, at fixed coordinates. Two dot eyes, r 2.5 |
| Inks | Espresso, tomato, cheese. Nothing else |
| Never | Limbs, a mouth, a pose, drips, sweat drops, speed lines, a tilt |
| Markup | `<img src="img/mascot-slice.svg" alt="" width="64" height="72">`, decorative |
| Kill rule | If the 120 px thumbnail lands on the mascot before the hero number, or a reviewer calls it a kids' game, remove it |

Texture follows the same logic: grain, paper and ink bleed are becoming the next default, so use them only as the
material of the idea ([Lindsay Marsh, 2025](https://lindsaymarsh.substack.com/p/design-trends-2026-imperfection-rebellion)).
