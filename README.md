# agent-skills

Simas's shared agent skills, in the open [Agent Skills](https://agentskills.io/specification) format.
One folder per skill under `skills/`. The same repo works as a Claude Code and Codex plugin marketplace,
an `npx skills` source for every other tool, and a claude.ai organization sync source.

| Skill | What it does |
|---|---|
| [blueprint](skills/blueprint) | Define a whole product before development |
| [blueprint-feature](skills/blueprint-feature) | Define one feature or change for an existing app |
| [eng-rulebook](skills/eng-rulebook) | Engineering guidance, change checks and codebase audits |
| [mood-board-creator](skills/mood-board-creator) | Visual directions as moodboards and realistic screens |
| [ui-craft](skills/ui-craft) | Design judgement for anything a person sees |
| [wiki-system](skills/wiki-system) | Source-backed codebase maps for coding agents |

Each skill is its own plugin, so it can be installed or shared on its own.

## Install

**Claude Code**
```
/plugin marketplace add Simas-Zurauskas/agent-skills
/plugin install ui-craft@simas-skills
```

**Codex**
```
codex plugin marketplace add Simas-Zurauskas/agent-skills
```

**Cursor, Gemini CLI, Copilot (VS Code), OpenCode, Amp, Goose and others**
```
npx skills add Simas-Zurauskas/agent-skills -g            # all skills, for you
npx skills add Simas-Zurauskas/agent-skills --skill ui-craft   # one skill, this project
```
Pin a version with `Simas-Zurauskas/agent-skills@<tag or commit>`. Commit `skills-lock.json` in projects.

**A whole project** (everyone who opens it in Claude Code gets the skills): add to the project's
`.claude/settings.json`:
```json
{
  "extraKnownMarketplaces": {
    "simas-skills": { "source": { "source": "github", "repo": "Simas-Zurauskas/agent-skills" } }
  },
  "enabledPlugins": { "ui-craft@simas-skills": true, "eng-rulebook@simas-skills": true }
}
```

**A company** (claude.ai Team or Enterprise): an owner adds this repo under Organization settings →
Plugins & skills → sync from GitHub, then sets each skill to Available, Installed by default or Required.

## Editing (author machine)

Skills are edited here and linked into the tools, so changes are live:
```
scripts/link.sh
```
It links every skill into `~/.agents/skills` (Codex, Cursor, Gemini and the rest) and `~/.claude/skills`
(Claude Code). Use the links or the plugin install on a machine, not both, or skills appear twice.

## Rules

- Frontmatter uses only spec fields (`name`, `description`, `license`, `compatibility`, `metadata`,
  `allowed-tools`). Other fields work in Claude Code but are rejected by claude.ai and the API.
- Paths inside a skill are relative to the skill folder. No `/Users/...` or `~/.claude/skills/...`.
- No secrets in the repo. Skills read keys from the environment or 1Password.
- A new skill goes in `skills/<name>/` and gets an entry in `.claude-plugin/marketplace.json`.

`python3 scripts/validate.py` checks all of this, and CI runs it with a secret scan on every pull request.

## Releasing

- Bump the skill's `VERSION` and its changelog in the same commit as the change.
- `master` is what people get: claude.ai sync reads it, and unpinned installs follow it. Work on a branch
  and merge when ready.
- Tag releases per skill: `ui-craft/v4`. Older tags were imported the same way (`wiki-system/v43`).

### wiki-system in CI

Projects run wiki-system unattended through two reusable workflows at this repo's root (GitHub only
runs reusable workflows from there) and the action in `skills/wiki-system/action.yml`:
```yaml
uses: Simas-Zurauskas/agent-skills/.github/workflows/wiki-system-update.yml@wiki-system/stable  # docs repo
uses: Simas-Zurauskas/agent-skills/.github/workflows/wiki-system-signal.yml@wiki-system/stable  # source repos
```
Release with `skills/wiki-system/scripts/release.sh <N>`: it pins the action to `wiki-system/vN`, tags it
and moves `wiki-system/stable`, which every project follows.
