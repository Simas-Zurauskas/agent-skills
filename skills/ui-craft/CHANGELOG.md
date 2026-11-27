# Changelog — ui-craft

`VERSION` holds one integer. Add an entry per change: what changed, and why (the project or feedback that taught it).

## 1 — 2026-11-25

- First version, built from the 2026-11 research in `references/research/` (Anthropic, OpenAI, Google, Vercel,
  community anti-slop skills, benchmarks and judge studies, human craft authorities).
- One router `SKILL.md` that sizes the work and separates expressive from working surfaces; references for
  direction, tells, floor, craft and review; a `DESIGN.md` template; lessons carried over from earlier design rounds.
- `scripts/check.mjs`: rendered floor checks, tells and a style inventory at phone and desktop width, with
  fixtures and a regression test.
- Revised the same day after three trial builds by fresh agents (a bakery landing page with and without the
  skill, a guest-list screen with it). Two separate bakery builds converged on royal blue, condensed sans and
  amber, so the working-alone rule now strikes the default and its predictable opposites and builds the least
  typical direction that still does the job. Added a light path for single working screens, the solo second
  look, `scripts/act.mjs` for operating a page, guidance for pages with no photos, and scoped the states rule to
  states a thing can reach. Fixed the font check to test the weight in use and the target check to apply the
  WCAG spacing exception. Trial notes are in `references/lessons.md`.
- Two more builds after that still shared one skeleton (headline left, order card right), so directions now start
  from `scripts/deal.mjs`, which deals lens, composition, containment, colour strategy and density from outside
  the model; alone, the deal order decides which direction is built, and a hand check compares the first screen
  with its hand. `act.mjs` gained `zoom=` and no longer misclicks on pages with smooth scrolling.
- Stated how this skill sits beside the round-based design skills: a direction picked in a moodboard round
  (`extraction.md`) is an existing design, and a builder or critic inside such a round keeps its assigned
  direction and that skill's scope and checks. Needed once the global instruction files told every agent doing
  visual work to load this skill, which includes the builders of a moodboard round.
- Fixed: run through the `~/.claude/skills` symlink, `check.mjs` exited 0 with no output, which reads as a pass.
  `cdp.mjs`'s entry-point check now compares real paths. Found by a builder in the 2026-11-25 hero trials.

## 2 — 2026-11-25

- Five hero trials (five products, each built with and without the skill) looked worse visually with it: correct
  and specific, but flat. Four of five became one flat colour field, a heavy grotesque, hairline rules and boxes.
  The skill now holds work to two bars, specific and finished: "Edit" became "Edit and finish" with a default test
  (if the generic version would look better, it is not done); "Specific is not plain"; craft.md asks expressive
  first screens for an anchor that is not text, depth and composed space, and treats a careful SVG drawing of the
  real subject as a strong option; tells.md lists the flat house style and narrows the illustration tell to crude
  or generic drawing; review.md gains "Finish and appeal".
- Working alone, the builder now builds the strongest dealt direction rather than the first hand, may depart from
  a hand that makes a weaker page if it says why, and keeps a concept as a trace rather than dressing the whole
  page as the object.
- `check.mjs` probes fonts with the element's own text.
- `check.mjs`: a family counts as loaded when any of its faces has loaded (Google's CJK faces load as many
  subsets and failed the old probe), and text hidden for screen readers is no longer reported as cut off.

## 3 — 2026-11-25

- Version 2 builds looked finished but still lost four of five blind order-swapped comparisons to plain builds:
  each was organised around one concept that pushed the main action below the phone fold. Expressive surfaces
  now take structure from the job (the category's proven arrangement, the main action in the first phone screen)
  and character from the source. Working alone on one build, the builder no longer deals compositions; the deal
  is for showing a person several directions. The client's feeling words are the test for the look.
- `check.mjs`: new `action-below-fold` check (no button outside the header in the first 390 × 844 screen). It
  flagged exactly the three builds the blind reviewer marked down for it.
- Version 3 trial: two wins, one tie, two losses in blind comparison (version 2: one win in five); the reviewer
  called the plain builds a template and the skill builds particular to each brief. Both losses were misread
  feeling words, so SKILL.md now asks to translate each feeling word into temperature, weight and density first.
