#!/usr/bin/env bash
# Push one skill's folder to its own standalone repo, keeping its history.
# Needed for wiki-system: other repos call its GitHub Action and reusable workflows
# (Simas-Zurauskas/wiki-system/.github/workflows/...@stable), and GitHub only runs
# those from a repo's root.
#
#   scripts/publish-mirror.sh wiki-system https://github.com/Simas-Zurauskas/wiki-system.git master
#
# Then tag the release in the mirror (e.g. v44) and move `stable` when you are ready.
set -euo pipefail
skill="$1"; remote="$2"; branch="${3:-main}"
cd "$(dirname "$0")/.."
git subtree push --prefix="skills/$skill" "$remote" "$branch"
