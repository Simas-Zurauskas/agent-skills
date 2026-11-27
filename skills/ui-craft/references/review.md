# Reviewing UI

Use this to critique existing UI, to brief an independent reviewer after a build, and to choose between versions.
A review reports; it changes nothing unless the person asked for fixes.

## Evidence first

Review the rendered surface, never the code alone and never the builder's description of it. Models state design
intentions they did not implement about a quarter of the time.

1. Run `scripts/check.mjs` at phone and desktop width. Open the screenshots.
2. Operate the page with `scripts/act.mjs`: every control, the keyboard, the scroll, each state you can reach
   (empty, error, loading, long content). Take a screenshot of each state and look at it.
3. Stills hide two things: scroll bars and motion. Look once with scroll bars always visible, and watch any
   motion live or recorded.
4. Read the brief and `DESIGN.md` if they exist. A review judges the page against its own job and direction, not
   against your taste.

If the page cannot be rendered, say the review is incomplete. Do not review from source and present it as visual.

## What to look at, in order

1. **First read.** Five seconds on the first screen: what is this, who is it for, what do I do next? Write down
   what you actually saw first. Then: does it feel like the words the client used? On a phone, is the main
   action visible without scrolling?
2. **Job and flow.** Can the person finish the task without guessing? Is anything missing that the task needs,
   or present that it does not? Right pattern for this job?
3. **Hierarchy.** Squint. Does prominence follow importance? One primary action? Do related things sit together?
   Anything said twice?
4. **States.** Empty, loading, error, long, few, many. Hover, focus, pressed, disabled.
5. **Floor.** The check output plus what only operation shows (keyboard order, focus visibility, dead ends).
6. **System.** The inventory: too many sizes, colours, radii or shadows means one-off values. Compare with
   `DESIGN.md` for drift.
7. **Specificity.** Could an unrelated product use this page unchanged? Which choices come from this subject, and
   which are defaults? Scan [tells.md](tells.md); for each hit decide whether it is earned.
8. **Finish and appeal.** Does it look finished and inviting, as if a good studio made it? Is there a visual
   anchor, depth, detail at close range? Picture the generic version of this page: if it would look better, that
   is a P1 finding.
9. **Restraint.** What could be removed without losing meaning? Is boldness spent in one place or scattered?
10. **Words.** Plain, specific, consistent names, true facts.

## Findings

Each finding has:

- **Where**: screen, element, width.
- **Evidence**: the screenshot region, selector or check line.
- **Consequence**: what goes wrong for the person using it.
- **Fix**: the smallest change that solves it, written as an edit ("heading 32px → 24px so the total reads
  first"), not as a grade.
- **Priority**: P0 blocks use or breaks the floor · P1 hurts the task or the direction · P2 visible craft flaw ·
  P3 polish.

Rules for findings:

- Prefer no finding to an unsupported one. An empty list is a valid result.
- A tell is a finding only when it is unearned here. Familiar fonts, a quiet palette, a list, or the absence of a
  hero are not defects by themselves.
- Preference without consequence goes in a short optional note, separate from findings.
- The person's pinned choices and the documented direction are not up for review unless they ask.
- Do not pad to a quota, and do not give scores. Concrete edits carry more signal than ratings.

End with what was not checked.

## Briefing an independent reviewer

After a new direction or a large build, hand the review to a fresh agent that did not build it. Self-review is
lenient; a sceptical outsider is far easier to get than a self-critical builder.

- Give it: the brief, `DESIGN.md` or the direction contract, the screenshots and the live URL, and this file.
- Do not give it: your reasoning, your opinion of the result, or a description of what it should see.
- Ask it to write its first-read and specificity judgements **from the screenshots before reading the check
  output**. Shown the mechanical findings first, a reviewer anchors on them and stops looking.
- Ask for findings in the format above, and for the one change that would most improve the page.

The builder then fixes P0 and P1, re-renders, and verifies. One or two rounds. If a round makes the page worse,
go back; the best version is not always the last.

## The solo second look

When no fresh reviewer is available, review your own build in a way that breaks your memory of what you meant.
Do the steps in this order, and do not read the check output until step 4 (send it to a file when you run the
script: `check.mjs … > check.txt`).

1. Open the **phone** first-viewport screenshot. Look for five seconds. Write down what you saw first, what the
   page says it is, and what it asks you to do. Compare with the job in the brief.
2. Open every screenshot at full size, one at a time, including a width you did not design at (320 or 1024).
   Ask only: what is broken or odd here? A line that wraps badly, a column that overflows, an element at an
   arbitrary position, crowding, an orphaned word, an icon that reads as something else, a number with no unit.
   Full-page screenshots are shown to you scaled down; before judging a glyph or a small detail, zoom it with
   `act.mjs zoom=SELECTOR::file.png`.
3. Hide the logo in your mind. Could this be another product's page? Which single thing would a person remember?
   Then the other way round: does it look finished and inviting, or bare? Would the generic version of this page
   look better? If so, add the finish back (craft.md, Expressive surfaces) before anything else.
4. Now read the check output and the tells, and operate the states with `act.mjs`.
5. Fix what you found, render into a new folder, and compare the two rounds side by side.

In trials this second look found real defects that the builder and the script had both missed: a column wrapping
to three lines on a phone, controls overflowing their card at desktop width, a pictogram that looked like a close
button.

## Choosing between versions

Model judges have known biases. Design around them:

- They prefer the **busier** screen far more often than people do, and call it "informative". Do not let "more
  on the page" win by itself.
- They favour output that looks like their own family's work, and judges from different labs share most biases,
  so a panel does not cancel them.
- Absolute scores against a rubric agree with designers poorly. **Side-by-side comparison** does better: show
  both, ask which serves the brief, then swap the order and ask again. Count the pick only if it is the same
  both times.
- Criteria wording steers the result. Words like "premium", "award-winning" or "museum quality" pull every
  version toward one look. Ask about the job and the brief instead.
- A model cannot judge originality or taste reliably. Use it for defects and for coarse choices. Direction
  belongs to the person or the brief.

When a person is available, the choice between directions is theirs. Show the versions at the same size with the
same content and say what each is betting on.
