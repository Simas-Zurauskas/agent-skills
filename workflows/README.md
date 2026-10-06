# The two workflows and their args

Both are Workflow-tool scripts. Launch them with `Workflow({ scriptPath: "<skill>/workflows/<name>.js", args: {…} })`
and pass `args` as a JSON **object**, not a string. They can't read files, so everything project-specific comes in
through `args`. The prompts inside are the agent instructions: read them before a run and adjust per project if you
need to.

Neither script writes the round page. That's the lead's assembler step (see `run.md`).

## foundations.js: research → guidelines → directions

| Arg | Req | What |
| --- | --- | --- |
| `product` | ✓ | One paragraph: what the product is, for whom, its voice, and its key number or moment |
| `task` | ✓ | The process folder (absolute). Holds `PLAN.md`, and receives `research/`, `design-guidelines.md`, `round-N/` |
| `skill` | ✓ | This skill's folder (absolute) |
| `scratch` | ✓ | A scratch folder for copies of sources, servers, screenshots |
| `sources` | ✓ | Free text: where the PRD, brand voice, strategy and wireframes are |
| `screens` | ✓ | `[{ n: "1", name: "Home", wireframe: "/abs/…/screen-14.html" }, …]` (wireframe optional) |
| `groups` | ✓ | `[{ key, label, want, propose?, kind: "borrowed" \| "original", source?, guidance?, lenses? }]`. `propose` defaults to ⌈1.7 × want⌉. More than 4 candidates are split across proposers (≤ 4 each), each with a lens from `lenses` or the defaults, so no single agent invents a whole group |
| `target` |  | `{ kind: "standalone", out }` or `{ kind: "lab", lab }`: only used to tell agents what's feasible |
| `round` |  | Default 1 |
| `refreshResearch` |  | `true` adds web lanes that update the skill's generic references (tells, craft) as deltas |
| `finalize` |  | `true` revises the brief with the direction review. Default (speed): the reviewer writes `round-N/review-findings.md`, binding on builders |

It returns `{ guidelines, brief, findings, notes, selection: { selected: [{vid, name, group, mode, first_line,
last_line}], photo_needs } }`.

## build.js: build → round critique → refine

| Arg | Req | What |
| --- | --- | --- |
| `product` | ✓ | One line (it goes into every prompt) |
| `task` | ✓ | The process folder (it holds `design-guidelines.md` and `round-N/brief.md`) |
| `skill` | ✓ | This skill's folder |
| `shots` | ✓ | Where builders and critics save screenshots (a scratch folder) |
| `target` | ✓ | `{ kind: "standalone", out: "/abs/OUT", roundJson: "/abs/…/round.json" }` or `{ kind: "lab", lab: "/abs/lab", roundJson: "/abs/…/round.json", devUrl?: "http://localhost:1234" }`. `roundJson` is what lets the round critic assemble the round page; a lab without it gets a critic per variant instead |
| `variants` | ✓ | `[{ id: "01", name: "Specials board", group: "A", lines: "350-558" }, …]`. `lines` = the variant's section in the brief |
| `screens` | ✓ | `[{ n: "1", name: "Home", wireframe? }, …]`. The names become `<title>R1 V01 · Home</title>` |
| `flow` | ✓ | The links, in words: "Home's X rows → screen 2; 2 Back → 1, primary → 3; 3 Close → 1" |
| `round` |  | Default 1 |
| `images` |  | The files in the shared library, listed for the builders |
| `findings` |  | Default `task/round-N/review-findings.md` |
| `supplements` |  | `{ A: "/abs/…/brief-A-update.md" }`. Supersedes that group's brief sections |
| `preBuild` |  | `[{ group: "A", prompt: "…" }]`. An agent that must finish before that group builds (e.g. writing the supplement). The other groups start at once |
| `bar` |  | `{ good: "/abs/real-app.png", rejected?: "/abs/rejected.png" }`: a screenshot of the realism and density wanted (any product; builders take the level, not the style) and optionally one of an attempt the owner rejected. Builders compare their shots against it at every pass, and critics judge "below the bar" first. Best: the **quality-bar sheet** — real App Store screenshots of the reference apps the owner picked (`run.md` step 0.3); in later rounds, a sheet of the screens the owner named as references |
| `thorough` |  | `true` adds a fresh-eyes critique per variant between the round critique and the refine |
| `assemble` |  | Override: the shell command that writes a viewable round page from the files built so far. Default: the target's assembler on `target.roundJson` with `--keep-previews` |
| `roundUrl` |  | Override: the round page URL the round critic shoots. Default: `file://OUT/round-RR/index.html`, or `devUrl/explorations/round-RR.html` in a lab |
| `strips` |  | The compare-strip anchor ids, one per screen, in screen order. Default: the critic reads them from `round.json` |
| `roundCritique` |  | `false` skips it; every variant then gets its own critic |
| `done` |  | After an outage, what's already on file: `{ build: ["01", …], roundCritique: true, critique: ["03"], refine: ["02"] }`. Those stages are skipped; builders and refiners also continue from files an interrupted agent left |

It returns one `{ id, name, ok, summary, issues, shots }` per variant. `ok: false` means that variant's pipeline died: rerun just that variant.

## Example: a standalone round for a new product

```js
Workflow({ scriptPath: "/Users/me/dev/ai/SKILLS/mood-board-creator/workflows/foundations.js", args: {
  product: "Potluck — a shared grocery and meal-plan app for flatmates; warm, practical, a bit cheeky; the key number is who owes what this week",
  task: "/Users/me/dev/potluck/moodboards-process",
  skill: "/Users/me/dev/ai/SKILLS/mood-board-creator",
  scratch: "/tmp/potluck-scratch",
  sources: "PRD /Users/me/dev/potluck/docs/prd.md; brand voice /Users/me/dev/potluck/docs/voice.md; wireframes /Users/me/dev/potluck/wireframes/*.png",
  screens: [{ n: "1", name: "This week" }, { n: "2", name: "The list" }, { n: "3", name: "Settle up" }],
  groups: [
    { key: "A", label: "From the landing page", want: 2, kind: "borrowed", source: "https://potluck.example" },
    { key: "B", label: "Originals", want: 4, kind: "original" },
  ],
  target: { kind: "standalone", out: "/Users/me/dev/potluck/moodboards" },
} })
```

## Example: the run this skill was distilled from (Design Lab target)

Repperoni Round 1 used `groups`:
- A "From the marketing site" (3 of 5): borrowed, `source: rep-marketing`;
- B "From the inspiration board (Finest)" (3 of 5): borrowed, `source: ui-inspire/*.png`;
- C "Originals" (4 of 8).

It ran with `screens` Home / The push-up war / Finish line and `target: { kind: "lab", lab: ".../rep-ui-lab" }`. The
marketing site changed mid-run, so A ran with `supplements: { A: ".../brief-A-update.md" }` and a `preBuild` agent
that wrote the supplement.
