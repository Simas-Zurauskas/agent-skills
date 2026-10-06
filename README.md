# mood-board-creator — skill README

> **For humans browsing this folder.** The agent's entry point is [`SKILL.md`](SKILL.md).

Makes **rounds of UI/UX moodboards** for any app:
- researched **design guidelines** first;
- then N clearly different **visual directions**, each a style-tile **board** above **live hi-fi phone screens**;
- built by agents that design from real screenshots, and critiqued side by side by an agent that didn't build them;
- shown on one scrolling **round page** with compare strips, and round tabs for later rounds.

It was distilled from Repperoni Round 1 (2026-09-25).

## TL;DR

- **Ask for it in plain words:** "make moodboards / visual directions / design variants for <app>", "run round 2 from
  this feedback". Say where the output should go, or accept the default (`./moodboards/`, static HTML).
- **Two workflows do the work:** `foundations` (research → guidelines → directions brief) and `build` (build →
  one side-by-side round critique → refine per variant). The lead agent handles scouting, photos, assembly and checks.
- **Knowledge is reused**, not re-researched every time: the generic research (AI tells, craft floors, method,
  vernaculars) lives in [`references/`](references/). Each run researches only the project itself.
- **Output targets:**
  - **standalone**: a folder of static HTML that opens from disk or any static host;
  - **design-lab**: round pages inside a Design Lab workbench.
- **Speed:** the build workflow takes about 35–45 min for 10 variants in speed mode (21 agents), since agents run in
  parallel; research and the brief come on top. **Thorough** adds a fresh-eyes critique per variant.

## Layout

| Path | What |
| --- | --- |
| `SKILL.md` | Entry point: what makes the moodboards excellent, settings, the run, the map |
| `run.md` / `next-round.md` | The lead's playbook / converging later rounds from feedback |
| `workflows/` | `foundations.js`, `build.js` + `README.md` (every arg, examples) |
| `references/` | The knowledge base (index in `references/README.md`) |
| `scripts/` | Screenshot and verify tools (headless Chrome over CDP), assemblers and checkers per target |
| `targets/` | `standalone.md` + assets/templates; `design-lab.md` + the sheet/rounds kit |

## Requirements

- Claude Code with the Workflow tool, and the user's go-ahead for multi-agent runs (asking for moodboards counts).
- Node 22+ (global WebSocket/fetch), Python 3 (PIL for photo compression), and Google Chrome (set `CHROME_PATH` for
  another Chromium).
- Optional: an image API (WaveSpeed through the `myapis` skill) for the photo library.
