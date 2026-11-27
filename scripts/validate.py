#!/usr/bin/env python3
"""Check every skill in skills/ against the Agent Skills spec and this repo's rules.

Fails (exit 1) on: missing SKILL.md, bad or mismatched name, missing or over-long
description, a skill missing from .claude-plugin/marketplace.json (or listed but
absent), or a hard-coded home-directory path. Warns on frontmatter fields outside
the spec, which claude.ai and the Skills API reject on upload.

Standard library only, so it runs anywhere: python3 scripts/validate.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SPEC_FIELDS = {"name", "description", "license", "compatibility", "metadata", "allowed-tools"}
NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
ABS_PATH_RE = re.compile(r"/Users/[A-Za-z0-9._-]+/|/home/[A-Za-z0-9._-]+/")
TEXT_SUFFIXES = {".md", ".mjs", ".js", ".ts", ".py", ".sh", ".json", ".yml", ".yaml", ".toml", ".txt", ".html"}

errors, warnings = [], []


def frontmatter(text):
    if not text.startswith("---"):
        return None
    end = text.find("\n---", 3)
    if end == -1:
        return None
    fields = {}
    for line in text[3:end].splitlines():
        m = re.match(r"^([A-Za-z_-]+):\s*(.*)$", line)
        if m:
            value = m.group(2).strip()
            if len(value) >= 2 and value[0] == value[-1] and value[0] in "'\"":
                value = value[1:-1].replace("''", "'")
            fields[m.group(1)] = value
    return fields


skills = sorted(p for p in (ROOT / "skills").iterdir() if p.is_dir())
for skill in skills:
    rel = skill.relative_to(ROOT)
    md = skill / "SKILL.md"
    if not md.is_file():
        errors.append(f"{rel}: no SKILL.md")
        continue
    fm = frontmatter(md.read_text())
    if fm is None:
        errors.append(f"{rel}/SKILL.md: no YAML frontmatter")
        continue
    name, desc = fm.get("name", ""), fm.get("description", "")
    if name != skill.name:
        errors.append(f"{rel}: name '{name}' must match folder '{skill.name}'")
    if not NAME_RE.match(name) or len(name) > 64:
        errors.append(f"{rel}: name '{name}' must be 1-64 chars of a-z, 0-9 and single hyphens")
    if not desc or desc in "|>":
        errors.append(f"{rel}: description missing (or multi-line, which this check does not parse)")
    elif len(desc) > 1024:
        errors.append(f"{rel}: description is {len(desc)} chars (max 1024)")
    extra = sorted(set(fm) - SPEC_FIELDS)
    if extra:
        warnings.append(f"{rel}: non-spec frontmatter {extra} (Claude Code only; rejected by claude.ai upload)")
    lines = md.read_text().count("\n")
    if lines > 500:
        warnings.append(f"{rel}/SKILL.md: {lines} lines (spec recommends under 500)")
    for f in skill.rglob("*"):
        if f.is_file() and f.suffix in TEXT_SUFFIXES and ".git" not in f.parts and "node_modules" not in f.parts:
            for n, line in enumerate(f.read_text(errors="ignore").splitlines(), 1):
                if ABS_PATH_RE.search(line):
                    errors.append(f"{f.relative_to(ROOT)}:{n}: hard-coded home path")

listed = set()
mkt = ROOT / ".claude-plugin" / "marketplace.json"
for p in json.loads(mkt.read_text())["plugins"]:
    for s in p.get("skills", []):
        listed.add(Path(s).name)
present = {s.name for s in skills}
for missing in sorted(present - listed):
    errors.append(f"skills/{missing}: not listed in marketplace.json")
for ghost in sorted(listed - present):
    errors.append(f"marketplace.json lists '{ghost}' but skills/{ghost} does not exist")

for w in warnings:
    print(f"warn  {w}")
for e in errors:
    print(f"error {e}")
print(f"{len(skills)} skills checked: {len(errors)} errors, {len(warnings)} warnings")
sys.exit(1 if errors else 0)
