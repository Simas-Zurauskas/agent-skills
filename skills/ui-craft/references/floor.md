# The floor: what every surface must get right

A failure here is a defect, not a style choice. No direction, brand or deadline waives it. Items marked
**[check]** are measured by `scripts/check.mjs`; the rest need you to operate the page.

The standard behind the accessibility numbers is WCAG 2.2 level AA. APCA is a useful second opinion for thin or
light text and dark themes, but it is not yet a standard, so WCAG decides pass or fail.

## Seeing and reading

- **[check]** Text contrast at least 4.5:1; large text (24px and up, or 18.66px bold) at least 3:1. In every
  theme the page ships.
- Borders of inputs, focus rings, icons that carry meaning and state indicators at least 3:1 against what is
  next to them.
- **[check]** No text under 12px. Body text 16px or more on phones.
- **[check]** Body lines no longer than about 75 characters; aim for 45 to 75.
- Meaning never carried by colour alone: add text, an icon or a shape.
- **[check]** `lang` set on the document. Every glyph the language needs renders in the chosen face. A font that
  merely contains a glyph can still draw it badly; look at real words with diacritics at display size.

## Keyboard and assistive technology

- **[check]** Every focusable element shows a visible focus style (`:focus-visible`), never removed without a
  replacement, never hidden under a sticky header or footer.
- Everything works by keyboard, in a sensible order. Native elements first: `button`, `a`, `label`, `select`,
  `dialog`. A `role` is a promise to implement that role's keyboard behaviour.
- Dialogs move focus in, trap it, and return it on close. Tabs, menus, comboboxes and other composite widgets
  follow the WAI-ARIA Authoring Practices pattern; paste the pattern's key and state list into your plan before
  building one.
- **[check]** Icon-only buttons and links have an accessible name. **[check]** Images have `alt` (empty for
  decoration).
- **[check]** One `h1`; heading levels do not skip.
- Changes that happen without a page load (saved, error, loading done) are announced politely.

## Pointer and touch

- **[check]** Targets at least 24 by 24 CSS px, or with enough space that a 24px box centred on each touches no
  other target. On touch layouts aim for 44 by 44; the script lists anything smaller as "to check".
- If it looks clickable it is clickable, and the whole visible control is the target.
- Anything done by dragging or a gesture can also be done with a click or key.
- Hover effects only where there is a pointer that hovers (`@media (hover: hover)`); nothing depends on hover.

## Layout

- **[check]** No horizontal scrolling of the page at any width from 320px up. **[check]** No scroll containers
  nobody intended. Headless screenshots hide scroll bars, so the script finds these by measuring; a person
  checking by eye should set the OS to always show scroll bars.
- **[check]** No clipped or overflowing text. Text survives 200% zoom and user spacing overrides (line height
  1.5, letter spacing 0.12em).
- **[check]** Zoom is never disabled (`user-scalable=no`, `maximum-scale=1`).
- **[check]** On an expressive page with a main action, that action is visible in the first phone screen
  (390 × 844) without scrolling, outside the header menu.
- Works with short, average and very long content; with zero, one and hundreds of items; with a missing image.
- **[check]** Images load, and carry dimensions so the layout does not jump.
- Content is visible without JavaScript-driven reveal finishing: if an entrance animation fails, the page still
  shows. **[check]**

## States

- Design the states each thing can actually reach, no more. Every control: rest, hover, focus, pressed, with
  hover, focus and pressed more prominent than rest. Disabled and loading only where they can happen (a submit
  button, yes; a navigation link, no).
- Every view of data that can vary has empty, loading, error, sparse and dense states. An empty state says what
  belongs here and offers the next action. No dead ends. A static landing page has few of these; an app screen
  has all of them.
- Feedback for every action within about 400ms: a state change, or a progress indicator for anything slower.
  Spinners appear after a short delay (150–300ms) and then stay long enough to read (300–500ms) so they do not
  flash. Skeletons match the layout they stand in for.
- Destructive actions are named for what they do ("Delete invitation", never "OK" or "Confirm") and are either
  confirmed or undoable.
- Errors say what happened and how to fix it, in plain words, next to the thing that failed.

## Forms

- **[check]** Every input has a visible label that stays visible while typing. A placeholder is an example, never
  the label. The one common exception is a search field with a search icon, which may carry its label for
  assistive technology only.
- Correct `type`, `inputmode` and `autocomplete`. **[check]** Input text at least 16px on phones, so the page
  does not zoom on focus.
- Never block paste. Do not disable the submit button to signal errors; let people submit and show what is wrong.
- Validation next to the field; on submit, focus goes to the first error.
- Ask for as few fields as possible, in one column, and say why any surprising field is required.

## Motion

- **[check]** `prefers-reduced-motion` is honoured: movement, scaling and parallax go; fades and colour changes
  may stay.
- Nothing moves by itself for more than five seconds without a way to pause it.
- **[check]** No `transition: all`. Animate `transform` and `opacity`; other properties only when the effect
  needs them.
- Motion can be interrupted; nothing makes the user wait for an animation to finish.

## System

- **[check: inventory]** Values come from a system: one type scale, one spacing scale, one radius family, one
  shadow scale, colours as named roles. The inventory in the check output shows the truth: a dozen font sizes or
  twenty greys means there is no system.
- Dark mode, where it exists, is designed (surfaces, contrast, shadows rethought), not inverted. Add one only
  when the brief asks or the system already has one; otherwise ship one theme done well and record that choice.
- **[check]** No console errors on load.

## Truth

- No invented metrics, testimonials, logos, prices, customer counts or capabilities. Demo content is labelled.
- No placeholder text left in. **[check]**
