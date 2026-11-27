#!/usr/bin/env bash
# Link every skill in this repo into the folders AI tools read, so edits here are live.
#   ~/.agents/skills  - Codex, Cursor, Gemini CLI, Copilot (VS Code), OpenCode, Amp, Goose, Devin
#   ~/.claude/skills  - Claude Code
# Safe to re-run. Never replaces a real folder, only symlinks.
# Use this OR the plugin marketplace on a machine, not both, or skills show up twice.
set -euo pipefail
repo="$(cd "$(dirname "$0")/.." && pwd)"
for target in "$HOME/.agents/skills" "$HOME/.claude/skills"; do
  mkdir -p "$target"
  for skill in "$repo"/skills/*/; do
    name="$(basename "$skill")"
    dest="$target/$name"
    if [ -e "$dest" ] && [ ! -L "$dest" ]; then
      echo "skip  $dest (real folder, not a symlink - move it away first)"
      continue
    fi
    ln -sfn "${skill%/}" "$dest"
    echo "link  $dest -> ${skill%/}"
  done
done
