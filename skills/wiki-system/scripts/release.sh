#!/usr/bin/env bash
# Release wiki-system version N from the agent-skills repo: set VERSION, pin the update workflow to
# action tag wiki-system/vN, commit, tag wiki-system/vN, move wiki-system/stable and push.
# Update CHANGELOG.md first. Usage: skills/wiki-system/scripts/release.sh 44
set -euo pipefail
N="${1:?usage: scripts/release.sh <version number>}"
skill="$(cd "$(dirname "$0")/.." && pwd)"
root="$(git -C "$skill" rev-parse --show-toplevel)"
workflow="$root/.github/workflows/wiki-system-update.yml"
cd "$skill"
[ -z "$(git status --porcelain)" ] || { echo "commit or stash your changes first (CHANGELOG included)"; exit 1; }
grep -q "^## v$N " CHANGELOG.md || { echo "CHANGELOG.md has no '## v$N' entry"; exit 1; }
python3 -B -m unittest discover -s tests >/dev/null 2>&1 || { echo "tests fail; not releasing"; exit 1; }
printf '%s\n' "$N" > VERSION
python3 - "$N" "$workflow" <<'PY'
import re, sys
n_ver, p = sys.argv[1], sys.argv[2]
s = open(p).read()
new, n = re.subn(r"(uses: Simas-Zurauskas/agent-skills/skills/wiki-system)@wiki-system/v\d+", rf"\1@wiki-system/v{n_ver}", s)
assert n == 1, "expected exactly one action pin in wiki-system-update.yml"
open(p, "w").write(new)
PY
git add VERSION "$workflow"
git commit -q -m "wiki-system v$N"
git tag -a "wiki-system/v$N" -m "wiki-system v$N"
git tag -f -a wiki-system/stable -m "wiki-system stable: v$N" >/dev/null
git push -q origin HEAD
git push -q origin "wiki-system/v$N"
git push -q -f origin wiki-system/stable
echo "released wiki-system v$N; wiki-system/stable -> $(git rev-parse --short HEAD)"
