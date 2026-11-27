# Craft: making the decisions well

The floor makes a page correct. This file is about what makes it read as designed. Most of it is judgement; where
a number exists it is given as a starting value, not a law. The existing system and the direction contract
outrank every default here.

Sections: Hierarchy · Layout, spacing and rhythm · Typography · Colour · Depth and edges · Images and icons · When
there are no photos · The surfaces you did not draw · Motion · Words · Working surfaces · Expressive surfaces.
Read the ones you are deciding on.

## Hierarchy

- Decide the order first: what is seen first, second, third. Then make the page agree. Exactly one primary action
  per view.
- **Emphasise by de-emphasising.** Make the secondary things quieter rather than the main thing louder.
- Use weight and colour before size. Two or three text colours and two weights carry most interfaces.
- Design in grey first when in doubt. If the hierarchy does not hold without colour, colour will not fix it.
- **Squint test**: blur your eyes or the screenshot. The primary thing should still be findable and the groups
  still read as groups. If every block has equal weight, redesign before polishing.
- Prominence follows the task. The most-used or most-important thing is the most visible, not the most
  decorative thing.
- For displayed data, labels are a last resort. "12 left in stock" beats "Stock: 12". When a label is needed,
  keep it quiet. (Form inputs always keep their visible labels; that is the floor.)

## Layout, spacing and rhythm

- Space is the first grouping tool: closer within a group than between groups. Fix ambiguous spacing before
  reaching for a border or a box.
- One spacing scale with visible steps (for example 4, 8, 12, 16, 24, 32, 48, 64, 96). If you are nudging by a
  pixel, the system is missing a step.
- Every gap has one owner (the parent's gap, or one side's margin). Do not patch an awkward transition with a
  one-off margin; fix the owner.
- Start with too much white space and remove it. Do not stretch content to fill a wide screen: a form is 480 to
  640px wide on any monitor.
- Vary the rhythm. Sections that do different jobs should not share one silhouette. Unequal spacing, when it
  encodes grouping, is what makes a page feel composed.
- Everything aligns to something on purpose. Adjust by a pixel where the eye disagrees with the geometry (icons
  beside text, round shapes beside square ones).
- Check phone, laptop and very wide. On wide screens, cap the container and keep the measure.

## Typography

- The typeface carries most of the personality. Choose it from the subject, check it in the product's language at
  the sizes used, and use it decisively. One family is often enough; two must be clearly different in kind.
- A type scale with real steps (for example 12, 14, 16, 18, 20, 24, 30, 36, 48, 60). Peers share one size, weight
  and treatment.
- Measure 45 to 75 characters (`max-width: 65ch` is a good cap). Body line-height 1.4 to 1.6; headings 1.05 to
  1.3; the longer the line and the smaller the text, the more leading.
- Large headings: slightly negative tracking at most (to about -0.03em). All-caps, where used on purpose: +5 to
  12% tracking. Otherwise leave tracking alone.
- `text-wrap: balance` on headings, `pretty` on paragraphs. No single-word last lines in headings.
- Numbers that are compared sit in tabular figures and align right. Check the font actually has them.
- Real typography for the language: proper quotation marks („…“ in Lithuanian and German, “…” in English), real
  apostrophes, an ellipsis character, non-breaking spaces between a number and its unit.
- Not lighter than weight 400 for body text on screens.

## Colour

- Choose the **strategy** before the colours: restrained (neutrals and one accent used sparingly), committed (one
  colour owns a third or more of the surface), full palette, or drenched. Then pick values.
- Define colours as **roles**, not hues: page, subtle surface, element surface, border, strong border, solid
  accent, quiet text, strong text, plus semantic colours for success, warning, danger. Build them in OKLCH so
  steps of lightness look even; keep one hue per ramp and taper chroma at the extremes.
- Neutrals have a temperature. Tint greys, borders and shadows slightly toward the accent or the page hue, and
  keep that one temperature everywhere.
- The accent has a job (the primary action, the current selection, the signature). Scarcity is what makes it
  read. Semantic colours are kept for meaning.
- Interactive states gain contrast: hover, focus and pressed are stronger than rest.
- Dark themes are designed: lower chroma, lighter borders instead of shadows, surfaces that get lighter as they
  rise.

## Depth and edges

- One light source. Shadows fall the same way everywhere.
- Layer shadows: a tight, darker contact shadow plus a wide, soft ambient one. As elevation rises, offset and
  blur grow and opacity drops. Tint the shadow toward the surface's hue; pure transparent black greys the page.
- A named elevation scale (for example flat, raised, overlay, modal), not ad-hoc values.
- Use fewer borders. Separate with space, a shift in surface colour or a shadow. Draw each border once. A
  semi-transparent border reads crisper on varied backgrounds than a solid grey.
- Nested corners are concentric: inner radius = outer radius minus the padding between them.

## Images and icons

- Good photos or none. Text on a photo needs a calm area or a treatment that keeps contrast.
- One icon family, one stroke weight, used at the size it was drawn for. An icon earns its place by speeding
  recognition; unfamiliar icons get a label or tooltip.
- Use the product's real material wherever it exists: its screens, objects, people, documents.

## When there are no photos

Common, and no reason for a weaker page. In order of preference:

1. **Make the product's own working part the visual.** The order form, the calendar, the price list, the map,
   the live result. A page whose hero is the thing people came to use needs no picture.
2. **Let type and colour carry it.** A committed colour field and a well-set headline are a complete first
   screen.
3. **Real data as image.** Dates, a timetable, a tally, a route, set large and true.
4. **A drawing, made well.** An SVG illustration of the real thing (the bikes, the lake and the church, the
   counter) is a strong anchor when it is drawn with care: one construction and line weight, the direction's
   palette, one light, real proportions and some detail at close range. It is the crude or generic drawing that
   reads as filler (blobs, a lone clip-art object, an icon blown up to hero size), not drawing itself. Check it
   zoomed in; if it looks like a placeholder, improve it or choose another option.
5. **A labelled slot.** Where a photo truly belongs, leave an art-directed placeholder that says what goes
   there ("Photo: the Saturday counter, morning light") and list it as open. Never fake a photograph.

## The surfaces you did not draw

Text selection colour, the caret, scroll bars, focus rings, link underline offset and thickness, form control
accent colour, the browser theme colour. Styling these to match the direction is the cheapest sign that a page
was built with care, and the one most often skipped.

## Motion

- **Ask how often it will be seen.** Hundreds of times a day (shortcuts, typing, list navigation): no animation.
  Tens of times (hover, toggles): minimal or none. Occasionally (dialogs, drawers, toasts): a standard
  transition. Rarely or once (first run, a celebration): room for delight.
- Each animation has a purpose: showing where something came from, what changed, or that an action registered.
  "It looks nice" is not one when people see it daily.
- Never animate an action started from the keyboard.
- Easing: ease-out for things entering or responding; ease-in-out for things moving on screen; never ease-in for
  interface feedback. The built-in curves are weak; a stronger ease-out such as `cubic-bezier(0.23, 1, 0.32, 1)`
  feels more responsive.
- Durations: press feedback 100–160ms; tooltips and small popovers 125–200ms; dropdowns 150–250ms; dialogs and
  drawers 200–500ms. Keep interface motion under 300ms unless it moves something large. Exits a little faster
  than entrances.
- Details that read as care: a pressed control scales to about 0.97; things appear from 0.95 scale and zero
  opacity, never from nothing; a popover grows from its trigger; the second tooltip in a row appears instantly;
  list items stagger by 30–80ms without blocking interaction.
- On an expressive page: one authored moment (the opening, or one reveal) that belongs to the direction. Then
  stillness.
- The mood of the motion matches the product. An invitation can be slower and softer than a dashboard.

## Words

- Write from the user's side of the screen, in their vocabulary, not the system's. People manage notifications,
  not webhook configuration.
- Buttons say what happens: "Save changes", "Send invitation". The same action keeps the same name through the
  whole flow, so "Publish" leads to "Published".
- Sentence case. Active voice. No filler. If cutting a third of the copy improves the page, keep cutting.
- A number never stands alone. Say what it counts: "17 people in 10 invitations", not "17".
- Errors state the problem and the way out, without apology and without codes. Empty states invite the first
  action.
- A text element stays only if it informs, helps someone act or helps them find their way. Remove headings that
  restate the obvious and copy that narrates the interface.
- Pick the voice for this product and these people. Do not reuse one voice everywhere.

## Working surfaces (apps, admin, tools)

- Open on the task. Navigation, the main object, the main action. No hero, no marketing copy, no decorative
  imagery.
- Familiar controls used correctly: segmented control for a few modes, toggle for on/off, menu for a set of
  options, tabs for views, radio buttons instead of a select for two or three choices.
- Density is a feature, organised by alignment and grouping. Tables for comparable rows; right-aligned numbers;
  column headers aligned with their cells; one shared scale for comparable bars.
- Stable dimensions: hover, loading and data changes never shift the layout.
- Distinctiveness comes from the type, the colour roles, the spacing rhythm, the quality of the states and the
  wording. It does not come from re-inventing controls; people already know how the standard ones work.

## Expressive surfaces (landing, marketing, invitations)

- **Structure from the job.** Lay the first screen out the way the best products in the category do for this
  task: a headline that says plainly what this is, one supporting line, the main action, the two or three facts a
  visitor needs to act (hours and address, dates and price, install command). On a phone the main action is in
  the first screen. Familiar structure is not the default to avoid; the defaults are the surface habits in
  tells.md. Originality goes into colour, type, drawing, words and one signature.
- The first screen opens with the most characteristic thing in the subject's world, in the form that suits it: a
  headline, an image, the product itself, a live moment. If the first screen could belong to another brand once
  the logo is hidden, it is too weak.
- One composition in the first viewport: the name or offer, one supporting sentence, the action, one visual
  anchor. No strip of badges, stats or logos crowding it. When the action is a form too tall for one screen, its
  first choice is visible and the rest follows; do not shrink it to fit.
- Say each thing once per screenful. Repeating a fact at the point of decision (the hours beside the day picker)
  is help; repeating it in three sections is padding.
- Each section has one job. The page should make sense from its headings alone.
- Make the one key action large, high in contrast and easy to reach. That is where expression pays; familiar
  patterns and visible labels stay.
- **Finish.** The first screen has a visual anchor that is not text (the product, a drawing, real data drawn
  large, a rendered object). Type alone carries a page only when the type is exceptional, which a model rarely
  manages. Give it depth: a ground, a surface and something in front, with one light. A single flat colour with
  text and hairline rules reads as unfinished, not restrained.
- Empty space must be composed. A tile or column that is mostly empty because the grid demanded it is a hole,
  not air.
