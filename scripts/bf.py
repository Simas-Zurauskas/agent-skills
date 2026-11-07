#!/usr/bin/env python3
"""bf.py — mechanical helpers for the blueprint-feature skill (stdlib only).

Subcommands:
  scaffold <home> --name NAME       create a feature home from the templates (never overwrites)
  lint <home> [--json]              structural checks on FEATURE.md, questions.md, baseline.md
  counts <home> [--json]            fresh counts for reports and status
  anchors <home> [--facts FILE] [--workspace DIR] [--json]
                                    verify code anchors by snippet; report repo drift and unreleased facts
  quote --text TEXT|- PATH...       normalised-whitespace match of a quotation in files or folders
  hash FILE | --text TEXT           sha256 (full and first 12)
  ids <home> [--sync] [--next P [--count N]] [--veto ID] [--verified B-1,B-2]
  rowhash <home> q-NN               hash of a question row plus the lines it touches (answer skips unchanged left rows)
                                    keep record/ids.json; next free FR/CH/KEEP/D/S/F/q/B numbers
  lock <home> [--self RUNID]        show an open run-log entry and its age
  snapshot <home> --run RUNID       copy FEATURE.md, questions.md, baseline.md into record/snapshots/RUNID/
  changed <home>                    diff the current files against the newest snapshot (edits made between runs)
  selftest                          run the script's own checks on a throwaway fixture

Exit codes: 0 ok · 1 findings (lint errors, quote not found, stale anchors, changes, ownership unconfirmed)
            · 2 usage error · 3 recent recorded open run (not proof of writer liveness).
"""
import argparse
import datetime as dt
import difflib
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATES = os.path.join(SKILL_DIR, "templates")
PREFIXES = ("FR", "CH", "KEEP", "D", "S", "F", "q", "B")

FEATURE_HEADINGS = [
    "Summary", "Why", "Who", "Scope", "Today", "Behaviour", "Changes to existing behaviour",
    "Must stay the same", "Edge cases", "Data and compatibility", "Copy and content",
    "Rabbit holes", "Open questions",
]
BASELINE_HEADINGS = [
    "Surfaces", "Actors and permissions", "Data", "Patterns to follow", "Constraints", "Project rules",
    "Blast radius", "Not present today", "Drift noticed",
]
STATUSES = {"Open", "Answered", "Applied", "Rejected", "Flagged", "Closed"}
MACHINE_WORDS = re.compile(r"\b(cold read|disposition|run id|run-id|funnel|grill pass|blind check|"
                           r"asked next run|baseline fact|B-\d+ fact)\b", re.I)
PRUNE = {"work", "snapshots", ".git", "node_modules", "dist", "build", ".expo", "Pods", ".next", ".turbo", "coverage", "__pycache__"}

BULLET = r"^\s*(?:[-*]\s+|\d+\.\s+)?"
ID_DEF = re.compile(BULLET + r"\**(FR|CH|KEEP)-(\d+)([a-z])?\**\s+[—–-]\s")
ID_BAD = re.compile(BULLET + r"\**(FR|CH|KEEP)-\d+[a-z]?\**\s*:")
ID_REF = re.compile(r"\b(FR|CH|KEEP)-(\d+)\b")
B_DEF = re.compile(BULLET + r"(?:~~)?\**B-(\d+)\**\s+[—–-]\s")
B_REF = re.compile(r"\bB-(\d+)\b")
DEFAULT_DEF = re.compile(BULLET + r"(?:\**(?:FR|CH|KEEP)-\d+\**\s+[—–-]\s+)?Default\b")
DEFAULT_OK = re.compile(
    r"\bDefault D(\d+) \((existing pattern|keeps today's behaviour|standard practice|chosen design|simplest fit)\b.*?"
    r"adopted (\d{4}-\d{2}-\d{2})(, unverified)?\):")
SLOT_DEF = re.compile(BULLET + r"(Copy|Content|Design) slot\b", re.I)
SLOT_OK = re.compile(r"\b(Copy|Content|Design) slot S(\d+) —")
FIX_REF = re.compile(r"\b(?:Corrected|Added) F(\d+)\b")
PROV = re.compile(r"\*\((?:From|Corrected|Added)\b.*?\)\*")
Q_HEAD = re.compile(r"^###\s+q-(\d+)\s*·\s*(.+?)\s*$")
FIELD = re.compile(r"^-\s+\*\*(.+?):\*\*\s*(.*)$")
LATE_FIELDS = {"Applied", "Why flagged", "Unverified", "Closed"}
ANCHOR = re.compile(r"`([A-Za-z0-9_.\-]+/[A-Za-z0-9_.\-/\[\]()@+]+|[A-Za-z0-9_.\-]+\.[A-Za-z0-9]+):(\d+)(?:-(\d+))?`"
                    r"(?:\s*«(.+?)»(?=\s|$|[,.;)]))?")
ANCHOR_BARE = re.compile(r"(?<![`\w])([A-Za-z0-9_.\-]+/[A-Za-z0-9_.\-/\[\]()@+]+):(\d+)(?:-(\d+))?\s*«(.+?)»")
STATUS_LINE = re.compile(r"^Status:\s*(.+)$", re.M)
REPO_LINE = re.compile(r"^\s*(?:[-*]\s+)?([A-Za-z0-9_.\-]+)\s+([0-9a-f]{7,40})\s*\(([^)]+)\)(?:.*?released:\s*([^\s·,]+))?")
ENTRY_HEAD = re.compile(r"^## (\d{4}-\d{2}-\d{2} \d{2}:\d{2}) · (.+?) · ([0-9a-f]{6})\b")
ABANDONED = re.compile(r"^-\s+note closed as abandoned:\s*([0-9a-f]{6})")


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def write_atomic(path, text):
    d = os.path.dirname(path) or "."
    os.makedirs(d, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=d, prefix=".bf-")
    with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    os.replace(tmp, path)


def norm(s):
    return re.sub(r"\s+", " ", s.replace("’", "'").replace("‘", "'")).strip()


def section(text, heading, level=2):
    m = re.search(rf"^{'#' * level} {re.escape(heading)}\s*$", text, re.M)
    if not m:
        return None
    rest = text[m.end():]
    n = re.search(rf"^#{{1,{level}}} ", rest, re.M)
    return rest[: n.start()] if n else rest


def strip_prov(text):
    """Provenance lines quote old text (markers, defaults); never parse them as live content."""
    return PROV.sub("", text)


def logical_lines(text, keep_prov=False):
    """Join wrapped continuation lines (indented, not a bullet, heading or blank) onto the line they continue."""
    out = []
    if not keep_prov:
        text = strip_prov(text)
    for i, line in enumerate(text.replace("’", "'").splitlines(), 1):
        cont = (line[:1] in (" ", "\t") and line.strip() and not re.match(r"^\s*([-*]\s|\d+\.\s|#)", line))
        if cont and out and out[-1][1].strip():
            out[-1] = (out[-1][0], out[-1][1] + " " + line.strip())
        else:
            out.append((i, line))
    return out


# ---------------------------------------------------------------- parsing

def parse_questions(text):
    rows, cur, in_answer, last_field, malformed = [], None, False, None, []
    for i, line in enumerate(text.splitlines(), 1):
        if line.startswith("### "):
            h = Q_HEAD.match(line)
            in_answer, last_field = False, None
            if h:
                cur = {"n": int(h.group(1)), "id": f"q-{int(h.group(1)):02d}", "title": h.group(2),
                       "line": i, "fields": {}, "answer": ""}
                rows.append(cur)
            else:
                if re.match(r"^###\s+q-\d+", line):
                    malformed.append(i)
                cur = None
            continue
        if cur is None:
            continue
        answer = re.match(r"^(?:- )?\*\*Answer & why:\*\*(.*)$", line)
        if answer:
            in_answer, last_field = True, None
            cur["answer"] = answer.group(1).strip()
            continue
        f = FIELD.match(line)
        if f and (not in_answer or f.group(1).strip() in LATE_FIELDS):
            last_field = f.group(1).strip()
            cur["fields"][last_field] = f.group(2).strip()
            continue
        if in_answer:
            cur["answer"] = (cur["answer"] + "\n" + line).strip()
        elif last_field and line[:1] in (" ", "\t") and line.strip():
            cur["fields"][last_field] += " " + line.strip()
    for r in rows:
        a = r["answer"].strip()
        r["answered"] = bool(a) and a not in ("_(unanswered)_", "(unanswered)")
        r["status"] = r["fields"].get("Status", "").strip()
        r["delegated"] = a.startswith("Delegated answer")
    return rows, malformed


def touched_ids(text):
    """Expand the same requirement references accepted by lint, including same-kind ranges."""
    keys = []
    for token in re.findall(r"\b(?:FR|CH|KEEP)-\d+(?:\s*[–-]\s*(?:FR|CH|KEEP)-\d+)?", text):
        ends = re.findall(r"(FR|CH|KEEP)-(\d+)", token)
        if len(ends) == 2 and ends[0][0] == ends[1][0] and int(ends[0][1]) <= int(ends[1][1]):
            keys.extend(f"{ends[0][0]}-{n}" for n in range(int(ends[0][1]), int(ends[1][1]) + 1))
        else:
            keys.extend(f"{prefix}-{n}" for prefix, n in ends)
    return keys


def feature_ids(text):
    defs, withdrawn, bad = {}, set(), []
    for i, line in logical_lines(text):
        m = ID_DEF.match(line)
        if m:
            key = f"{m.group(1)}-{m.group(2)}"
            defs.setdefault(key, []).append((i, m.group(3), line))
            if re.search(r"\bwithdrawn \d{4}-\d{2}-\d{2}", line, re.I):
                withdrawn.add(key)
        elif ID_BAD.match(line):
            bad.append(i)
    return defs, withdrawn, bad


def markers(text):
    """Find [NEEDS CLARIFICATION: …] allowing nested [..] and wrapped lines; stop at a blank line or heading."""
    text = strip_prov(text)
    out = []
    for m in re.finditer(r"\[needs clarification:", text, re.I):
        depth, j, ok = 1, m.end(), False
        while j < len(text):
            c = text[j]
            if c == "[":
                depth += 1
            elif c == "]":
                depth -= 1
                if depth == 0:
                    ok = True
                    break
            elif c == "\n" and (text[j + 1: j + 2] == "\n" or text[j + 1: j + 3] == "##"):
                break
            j += 1
        body = norm(text[m.end(): j]) if ok else ""
        end = re.search(r"→\s*(q-(\d+)|asked next run)(\s*\([^)]*\))?\s*$", body)
        out.append({"line": text.count("\n", 0, m.start()) + 1, "text": body, "closed": ok,
                    "upper": text[m.start(): m.start() + 20].startswith("[NEEDS CLARIFICATION"),
                    "q": (f"q-{int(end.group(2)):02d}" if end and end.group(2) else None),
                    "waiting": bool(end and not end.group(2)), "ok_end": bool(end),
                    "vetoed": bool(end and end.group(3) and "vetoed" in end.group(3))})
    return out


def baseline_facts(text):
    facts = {}
    for i, line in logical_lines(text):
        m = B_DEF.match(line)
        if m:
            n = int(m.group(1))
            facts.setdefault(n, []).append({"line": i, "text": line, "struck": "~~" in line,
                                            "unverified": "(unverified)" in line,
                                            "unreleased": "(unreleased" in line})
    return facts


def baseline_surfaces(text):
    body = section(text, "Surfaces") or ""
    out, cur = {}, None
    for _, line in logical_lines(body):
        h = re.match(r"^###\s+(.+)$", line)
        if h:
            cur = h.group(1).strip()
            out[cur] = set()
            continue
        m = B_DEF.match(line)
        if m and cur and "~~" not in line:
            out[cur].add(int(m.group(1)))
    return out


def load(home):
    d = {"home": home}
    for k, n in (("feature", "FEATURE.md"), ("questions", "questions.md"), ("baseline", "baseline.md"),
                 ("log", "record/log.md"), ("ledger", "record/defaults.md")):
        p = os.path.join(home, n)
        d[k] = read(p) if os.path.exists(p) else None
    return d


def load_ids(home):
    p = os.path.join(home, "record", "ids.json")
    if not os.path.exists(p):
        return {}, None
    try:
        return json.loads(read(p)), None
    except json.JSONDecodeError as e:
        return {}, f"record/ids.json is not valid JSON ({e}) — restore it from git or rebuild with `ids --sync`"


def unverified_count(d):
    ft, qt, bt = d["feature"] or "", d["questions"] or "", d["baseline"] or ""
    n = len(re.findall(r", unverified\)", ft)) + len(re.findall(r"\(unverified\)", ft))
    n += len(re.findall(r"^-\s+\*\*Unverified:\*\*\s*yes", qt, re.M | re.I))
    n += sum(1 for o in baseline_facts(bt).values() if o[0]["unverified"] and not o[0]["struck"])
    return n


# ---------------------------------------------------------------- lint

def lint(home):
    d = load(home)
    errs, warns = [], []
    E = lambda f, l, m: errs.append(f"{f}:{l}: {m}")
    W = lambda f, l, m: warns.append(f"{f}:{l}: {m}")
    for k, n in (("feature", "FEATURE.md"), ("questions", "questions.md"), ("baseline", "baseline.md")):
        if d[k] is None:
            E(n, 0, "missing")
    if errs:
        return errs, warns, []

    ft, qt, bt = d["feature"], d["questions"], d["baseline"]
    rows, malformed = parse_questions(qt)
    qmap = {r["id"]: r for r in rows}
    facts = baseline_facts(bt)
    struck = {n for n, o in facts.items() if o[0]["struck"]}
    coverage = []

    pos = []
    for h in FEATURE_HEADINGS:
        m = re.search(rf"^## {re.escape(h)}\s*$", ft, re.M)
        if not m:
            E("FEATURE.md", 0, f"missing block '## {h}'")
        else:
            pos.append((m.start(), h))
    if [h for _, h in sorted(pos)] != [h for _, h in pos]:
        E("FEATURE.md", 0, "blocks out of order")
    for h in FEATURE_HEADINGS:
        body = section(ft, h)
        if body is not None and h != "Scope" and not re.sub(r"<!--.*?-->", "", body, flags=re.S).strip():
            W("FEATURE.md", 0, f"block '## {h}' is empty — write one line saying it does not apply")

    sm = STATUS_LINE.search(ft)
    status = sm.group(1).strip() if sm else ""
    ready = status.startswith("Ready for planning")
    if not sm:
        E("FEATURE.md", 0, "no 'Status:' line")
    elif not (status == "Draft" or ready):
        E("FEATURE.md", 0, f"Status must be 'Draft' or 'Ready for planning — …', found '{status}'")

    defs, withdrawn, bad = feature_ids(ft)
    for ln in bad:
        E("FEATURE.md", ln, "write an ID definition as '<ID> — <text>', not '<ID>:'")
    for k, occ in defs.items():
        if len(occ) > 1:
            E("FEATURE.md", occ[1][0], f"{k} defined {len(occ)} times")
        for ln, suffix, _ in occ:
            if suffix:
                E("FEATURE.md", ln, f"{k}{suffix}: IDs are whole numbers — use the next free number")

    dnums = []
    for i, line in logical_lines(ft):
        labels = [mm.start() for mm in re.finditer(r"\bDefault (?:D-?\d+ )?\(", line)]
        if DEFAULT_DEF.match(line) and not labels:
            labels = [0]
        for pos in labels:
            m = DEFAULT_OK.match(line, pos) if pos else DEFAULT_OK.search(line)
            if not m:
                E("FEATURE.md", i, "Default not in the shape 'Default D<n> (<ground> … — adopted <date>): …'")
            else:
                dnums.append(int(m.group(1)))
        if SLOT_DEF.match(line) and not SLOT_OK.search(line):
            E("FEATURE.md", i, "slot not in the shape '<Copy|Content|Design> slot S<n> — …'")
        for m in B_REF.finditer(line):
            n = int(m.group(1))
            if n not in facts:
                E("FEATURE.md", i, f"B-{n} cited but not in baseline.md")
            elif n in struck:
                W("FEATURE.md", i, f"B-{n} is struck as wrong in baseline.md — re-ground this line")
        for m in ID_REF.finditer(line):
            k = f"{m.group(1)}-{m.group(2)}"
            if k not in defs:
                W("FEATURE.md", i, f"{k} referenced but not defined")
        stripped = re.sub(r"`[^`]*`|<!--.*?-->", "", line)
        mw = MACHINE_WORDS.search(stripped)
        if mw and not re.match(r"^\s*\[needs clarification", stripped, re.I) and "asked next run" not in mw.group(0):
            W("FEATURE.md", i, f"machine word in the spec: '{mw.group(0)}'")
    for n in set(dnums):
        if dnums.count(n) > 1:
            E("FEATURE.md", 0, f"D{n} used {dnums.count(n)} times")

    nd = section(ft, "Not doing", level=3) or ""
    for line in nd.splitlines():
        s = line.strip()
        if s.startswith("- ") and not s.startswith("- No ") and "None" not in s:
            W("FEATURE.md", 0, f"Not doing line should read '- No <thing> — because …': {s[:60]}")

    dc = section(ft, "Data and compatibility") or ""
    if dc.strip() and "|" not in dc and not re.search(r"^\s*None\b", dc, re.M):
        W("FEATURE.md", 0, "Data and compatibility has no compatibility table and does not say 'None —'")

    mk = markers(ft)
    for m in mk:
        if not m["closed"]:
            E("FEATURE.md", m["line"], "marker is not closed with ']' before a blank line or heading")
        elif not m["upper"]:
            E("FEATURE.md", m["line"], "write markers as '[NEEDS CLARIFICATION: …]'")
        elif not m["ok_end"]:
            E("FEATURE.md", m["line"], "marker must end '→ q-NN' or '→ asked next run'")
        elif m["q"]:
            if m["q"] not in qmap:
                E("FEATURE.md", m["line"], f"marker points at {m['q']}, which does not exist")
            elif qmap[m["q"]]["status"] in ("Applied", "Rejected", "Closed"):
                W("FEATURE.md", m["line"], f"marker still points at {m['q']} ({qmap[m['q']]['status']}) — remove it by its route, or re-point it")

    # coverage: each touched surface has a CH or KEEP citing one of its live facts; facts an FR cites have a CH/KEEP
    chkeep = " ".join(l for _, l in logical_lines(ft) if re.match(BULLET + r"\**(CH|KEEP)-\d+", l))
    cited = {int(m.group(1)) for m in B_REF.finditer(chkeep)}
    for surf, bs in baseline_surfaces(bt).items():
        if bs and not (bs & cited):
            coverage.append(f"FEATURE.md:0: no CH or KEEP cites the touched surface '{surf}' "
                            f"({', '.join('B-%d' % b for b in sorted(bs))})")
    fr_text = " ".join(l for _, l in logical_lines(ft) if re.match(BULLET + r"\**FR-\d+", l))
    for n in sorted({int(m.group(1)) for m in B_REF.finditer(fr_text)} - cited - struck):
        if n in facts:
            coverage.append(f"FEATURE.md:0: a requirement relies on B-{n} but no CH or KEEP says what happens to it")
    warns.extend(coverage)

    open_rows = [r for r in rows if r["status"] in ("Open", "Answered", "Flagged")]
    if ready:
        live_fr = [k for k in defs if k.startswith("FR-") and k not in withdrawn]
        problems = []
        if open_rows:
            problems.append(f"{len(open_rows)} unsettled questions")
        if mk:
            problems.append(f"{len(mk)} markers")
        if not live_fr:
            problems.append("no requirements")
        if re.search(r"^\*\*What it does:\*\*\s*_|^Product:\s*_", ft, re.M):
            problems.append("unfilled header placeholders")
        if unverified_count(d):
            problems.append(f"{unverified_count(d)} unverified items")
        if coverage:
            problems.append(f"{len(coverage)} coverage gaps")
        nc = [h for h in FEATURE_HEADINGS if re.search(r"^\s*Not covered yet", section(ft, h) or "", re.M)]
        if nc:
            problems.append("blocks not covered yet: " + ", ".join(nc))
        if dc.strip() and "|" not in dc and not re.search(r"^\s*None\b", dc, re.M):
            problems.append("no compatibility table")
        if problems:
            E("FEATURE.md", 0, "Ready stamp with " + ", ".join(problems))

    # questions.md
    for ln in malformed:
        E("questions.md", ln, "question heading must be '### q-NN · <question>'")
    nums = [r["n"] for r in rows]
    if len(set(nums)) != len(nums):
        E("questions.md", 0, "duplicate q numbers")
    if nums != sorted(nums):
        E("questions.md", 0, "rows out of q-NN order")
    for r in rows:
        f = r["fields"]
        for need in ("Status", "Depth", "Touches", "Why asked"):
            if need not in f:
                (E if need != "Depth" else W)("questions.md", r["line"], f"{r['id']} has no '{need}' field")
        if r["status"] and r["status"] not in STATUSES:
            E("questions.md", r["line"], f"{r['id']} status '{r['status']}' is not one of {sorted(STATUSES)}")
        if r["status"] in ("Answered", "Applied") and not r["answered"]:
            E("questions.md", r["line"], f"{r['id']} is {r['status']} with no answer")
        if r["status"] == "Applied" and not f.get("Applied"):
            W("questions.md", r["line"], f"{r['id']} is Applied with no '- **Applied:** <date>' field")
        for dep in re.findall(r"q-\d+", f.get("Depends on", "")):
            dep = f"q-{int(dep[2:]):02d}"
            if dep not in qmap:
                E("questions.md", r["line"], f"{r['id']} depends on {dep}, which does not exist")
        if r["status"] == "Open" and r["answered"] and not r["delegated"]:
            W("questions.md", r["line"], f"{r['id']} has an answer but is still Open — the owner may mean Answered")
        if r["status"] == "Flagged" and not f.get("Why flagged"):
            E("questions.md", r["line"], f"{r['id']} is Flagged with no 'Why flagged'")
        for k in touched_ids(f.get("Touches", "")):
            if k not in defs:
                E("questions.md", r["line"], f"{r['id']} touches {k}, which is not in FEATURE.md")
            elif k in withdrawn and r["status"] in ("Open", "Answered"):
                W("questions.md", r["line"], f"{r['id']} touches {k}, which is withdrawn")
        title = r["title"]
        if title.count("?") != 1:
            W("questions.md", r["line"], f"{r['id']} title should be one question with one '?'")
        if len(title.split()) > 35:
            W("questions.md", r["line"], f"{r['id']} title is {len(title.split())} words (aim ≤ 25)")
        mw = MACHINE_WORDS.search(title + " " + f.get("Why asked", ""))
        if mw:
            W("questions.md", r["line"], f"{r['id']} uses a machine word: '{mw.group(0)}'")

    # baseline.md
    for m in re.finditer(r"^## (.+?)\s*$", bt, re.M):
        if m.group(1) not in BASELINE_HEADINGS:
            E("baseline.md", bt.count("\n", 0, m.start()) + 1,
              f"unexpected section '## {m.group(1)}' — surfaces are '### <name>' under '## Surfaces'")
    for h in BASELINE_HEADINGS:
        if not re.search(rf"^## {re.escape(h)}\s*$", bt, re.M):
            E("baseline.md", 0, f"missing section '## {h}'")
    for n, occ in facts.items():
        if len(occ) > 1:
            E("baseline.md", occ[1]["line"], f"B-{n} defined {len(occ)} times")
        line = occ[0]["text"]
        if not occ[0]["struck"] and not ANCHOR.search(line) and "searched:" not in line:
            W("baseline.md", occ[0]["line"], f"B-{n} has no code anchor and no search")

    issued, ierr = load_ids(home)
    if ierr:
        E("record/ids.json", 0, ierr)
    present = current_ids(d)
    for prefix in ("FR", "CH", "KEEP", "q", "B"):
        for k in issued.get(prefix, {}):
            if k not in present.get(prefix, set()):
                E("record/ids.json", 0, f"{k} was issued and is gone — tombstone it, never delete")
    return errs, warns, coverage


def current_ids(d):
    out = {p: set() for p in PREFIXES}
    ft = d.get("feature") or ""
    defs, _, _ = feature_ids(ft)
    for k in defs:
        out[k.split("-")[0]].add(k)
    for _, line in logical_lines(ft):
        for m in DEFAULT_OK.finditer(line):
            out["D"].add(f"D{m.group(1)}")
        for m in SLOT_OK.finditer(line):
            out["S"].add(f"S{m.group(2)}")
        for m in FIX_REF.finditer(line):
            out["F"].add(f"F{m.group(1)}")
    if d.get("ledger"):
        for m in re.finditer(r"^-\s+(D|S|F)(\d+)\b", d["ledger"], re.M):
            out[m.group(1)].add(f"{m.group(1)}{m.group(2)}")
    if d.get("questions"):
        for r in parse_questions(d["questions"])[0]:
            out["q"].add(r["id"])
    if d.get("baseline"):
        for n in baseline_facts(d["baseline"]):
            out["B"].add(f"B-{n}")
    return out


# ---------------------------------------------------------------- counts

def counts(home):
    d = load(home)
    ft, qt, bt = d["feature"] or "", d["questions"] or "", d["baseline"] or ""
    rows, _ = parse_questions(qt)
    by = {s: 0 for s in sorted(STATUSES)}
    for r in rows:
        by[r["status"]] = by.get(r["status"], 0) + 1
    defs, withdrawn, _ = feature_ids(ft)
    live = lambda p: sum(1 for k in defs if k.startswith(p + "-") and k not in withdrawn)
    mk = markers(ft)
    dl = [m for _, l in logical_lines(ft) for m in DEFAULT_OK.finditer(l)]
    facts = baseline_facts(bt)
    sm = STATUS_LINE.search(ft)
    last_grill = last_ready = None
    if d["log"]:
        cur = None
        for line in d["log"].splitlines():
            h = ENTRY_HEAD.match(line)
            if h:
                cur = h.group(1)
            elif line.startswith("- grill") and cur:
                last_grill = cur
            elif line.startswith("- ready") and cur:
                last_ready = cur
    return {
        "status": sm.group(1).strip() if sm else None,
        "questions": by, "questions_total": len(rows),
        "delegated_not_applied": sum(1 for r in rows if r["status"] == "Answered" and r["delegated"]),
        "requirements": live("FR"), "changes": live("CH"), "keeps": live("KEEP"), "withdrawn": len(withdrawn),
        "markers": len(mk), "markers_linked": sum(1 for m in mk if m["q"]),
        "markers_waiting": sum(1 for m in mk if m["waiting"]),
        "defaults": len(dl), "defaults_unverified": sum(1 for m in dl if m.group(4)),
        "slots": sum(1 for _, l in logical_lines(ft) for _ in SLOT_OK.finditer(l)),
        "facts": sum(1 for o in facts.values() if not o[0]["struck"]),
        "facts_unverified": sum(1 for o in facts.values() if o[0]["unverified"] and not o[0]["struck"]),
        "facts_unreleased": sum(1 for o in facts.values() if o[0]["unreleased"] and not o[0]["struck"]),
        "facts_struck": sum(1 for o in facts.values() if o[0]["struck"]),
        "unverified_total": unverified_count(d),
        "last_grill": last_grill, "last_ready": last_ready,
    }


# ---------------------------------------------------------------- anchors

def git(repo, *args):
    try:
        p = subprocess.run(["git", "-C", repo, *args], capture_output=True, text=True, timeout=60)
        return p.stdout.strip() if p.returncode == 0 else None
    except Exception:
        return None


def find_workspace(home, sample_path):
    cur = os.path.abspath(home)
    first = sample_path.split("/")[0]
    while True:
        if os.path.isdir(os.path.join(cur, first)):
            return cur
        parent = os.path.dirname(cur)
        if parent == cur:
            return None
        cur = parent


def header_repos(bt):
    out = []
    for line in bt.splitlines()[:20]:
        m = REPO_LINE.match(line)
        if m:
            out.append({"repo": m.group(1), "baseline": m.group(2), "branch": m.group(3), "released": m.group(4)})
    return out


def check_anchors(home, texts, workspace=None, window=6, far=40):
    found = []
    for name, text in texts:
        for i, line in logical_lines(text):
            b = B_DEF.match(line)
            if b and "~~" in line:
                continue
            ms = list(ANCHOR.finditer(line)) or list(ANCHOR_BARE.finditer(line))
            for m in ms:
                found.append({"in": f"{name}:{i}", "fact": f"B-{b.group(1)}" if b else None, "path": m.group(1),
                              "line": int(m.group(2)), "end": int(m.group(3) or m.group(2)), "snippet": m.group(4)})
    bt = next((t for n, t in texts if n == "baseline.md"), "")
    hdr = header_repos(bt)
    if not found:
        return {"workspace": workspace, "anchors": [], "repos": [], "notes": []}
    ws = workspace or next((w for w in (find_workspace(home, r["repo"] + "/x") for r in hdr) if w), None) \
        or find_workspace(home, found[0]["path"]) or os.getcwd()
    verified = load_ids(home)[0].get("verified", {})
    notes, repos = [], []
    for r in hdr:
        rp, prefix = os.path.join(ws, r["repo"]), r["repo"] + "/"
        if not os.path.exists(os.path.join(rp, ".git")):
            top = git(ws, "rev-parse", "--show-toplevel")
            if top and os.path.basename(top) == r["repo"]:
                rp, prefix = top, ""
            else:
                notes.append(f"repo {r['repo']}: not found under {ws} — drift not checked")
                continue
        head = git(rp, "rev-parse", "--short", "HEAD") or ""
        known = git(rp, "cat-file", "-e", r["baseline"] + "^{commit}") is not None
        changed = set((git(rp, "diff", "--name-only", "HEAD") or "").splitlines())
        changed |= set((git(rp, "ls-files", "--others", "--exclude-standard") or "").splitlines())
        if known and not head.startswith(r["baseline"][:7]) and not r["baseline"].startswith(head):
            changed |= set((git(rp, "diff", "--name-only", f"{r['baseline']}..HEAD") or "").splitlines())
        mine = [a for a in found if a["path"].startswith(prefix)]
        rel = {a["path"][len(prefix):] for a in mine}
        entry = {"repo": r["repo"], "baseline": r["baseline"], "head": head, "branch_recorded": r["branch"],
                 "baseline_commit_known": known, "released": r["released"],
                 "anchored_files_changed": sorted(rel if not known else rel & changed)}
        if not known:
            notes.append(f"repo {r['repo']}: baseline commit {r['baseline']} not found — every anchored file needs a recheck")
        if r["released"]:
            up = git(rp, "rev-parse", "--abbrev-ref", r["released"] + "@{upstream}")
            behind = git(rp, "rev-list", "--count", f"{r['released']}..{up}") if up else None
            age = git(rp, "log", "-1", "--format=%cr", r["released"])
            if behind and behind != "0":
                notes.append(f"repo {r['repo']}: released ref {r['released']} is {behind} commits behind {up} — "
                             f"use '{up}' as the released ref (last commit {age}); a run never fetches")
            elif age:
                entry["released_age"] = age
        repos.append(entry)
        for a in mine:
            a["repo_root"], a["rel"] = rp, a["path"][len(prefix):]
            a["recheck"] = a["rel"] in entry["anchored_files_changed"]
            vf = verified.get(a["fact"] or "", {}).get(a["path"])
            if a["recheck"] and vf and os.path.isfile(os.path.join(rp, a["rel"])) and \
                    sha_bytes(open(os.path.join(rp, a["rel"]), "rb").read())[:12] == vf:
                a["recheck"] = False
            a["released_ref"] = r["released"]
    show_cache = {}
    for a in found:
        root = a.get("repo_root") or ws
        rel = a.get("rel") or a["path"]
        fp = os.path.join(root, rel)
        if not os.path.isfile(fp):
            fp2 = os.path.join(ws, a["path"])
            fp = fp2 if os.path.isfile(fp2) else fp
        if not os.path.isfile(fp):
            a["state"] = "stale:missing-file"
            continue
        try:
            lines = read(fp).splitlines()
        except (UnicodeDecodeError, OSError):
            a["state"] = "ok:binary"
            continue
        if not a["snippet"]:
            a["state"] = "stale:line-out-of-range" if a["end"] > len(lines) else "ok:no-snippet"
            continue
        sn = norm(a["snippet"])
        lo, hi = max(0, a["line"] - 1 - window), min(len(lines), a["end"] + window)
        if any(sn in norm(l) for l in lines[lo:hi]) or sn in norm(" ".join(lines[lo:hi])):
            a["state"] = "ok"
        else:
            hits = [j + 1 for j, l in enumerate(lines) if sn in norm(l)]
            if not hits:
                a["state"] = "stale:snippet-missing"
            else:
                near = min(hits, key=lambda h: abs(h - a["line"]))
                a["state"] = f"ok:moved-to:{near}" if abs(near - a["line"]) <= far else f"stale:moved-far-to:{near}"
        if a.get("released_ref") and a.get("repo_root"):
            key = (a["repo_root"], a["released_ref"], a["rel"])
            if key not in show_cache:
                show_cache[key] = git(a["repo_root"], "show", f"{a['released_ref']}:{a['rel']}")
            txt = show_cache[key]
            a["in_released"] = bool(txt) and sn in norm(txt)
    return {"workspace": ws, "anchors": found, "repos": repos, "notes": notes}


# ---------------------------------------------------------------- ids, lock, quote, hash, snapshots

def mark_verified(home, facts, workspace=None):
    """Record each fact's anchored files as verified now (sha256-12), so 'recheck' clears until they change again."""
    bt = read(os.path.join(home, "baseline.md"))
    r = check_anchors(home, [("baseline.md", bt)], workspace)
    issued, err = load_ids(home)
    if err:
        raise SystemExit(err)
    ver = issued.setdefault("verified", {})
    done = []
    for a in r["anchors"]:
        if a["fact"] in facts and a.get("repo_root") and str(a.get("state", "")).startswith("ok"):
            fp = os.path.join(a["repo_root"], a["rel"])
            if os.path.isfile(fp):
                ver.setdefault(a["fact"], {})[a["path"]] = sha_bytes(open(fp, "rb").read())[:12]
                done.append(a["fact"])
    write_atomic(os.path.join(home, "record", "ids.json"), json.dumps(issued, indent=1, sort_keys=True) + "\n")
    return sorted(set(done))


def row_hash(home, qid):
    """sha256-12 of a question row's text plus the current text of every line it touches."""
    qt = read(os.path.join(home, "questions.md"))
    m = re.search(rf"^### {re.escape(qid)} ·.*?(?=^### |\Z)", qt, re.M | re.S)
    if not m:
        return None
    row = m.group(0)
    ft = read(os.path.join(home, "FEATURE.md"))
    parsed, _ = parse_questions(row)
    touched = touched_ids(parsed[0]["fields"].get("Touches", "")) if parsed else []
    lines = [l for _, l in logical_lines(ft) if any(re.match(BULLET + r"\**" + re.escape(t) + r"\**\s", l) for t in touched)]
    return sha_bytes((norm(row) + "\n" + "\n".join(norm(l) for l in lines)).encode("utf-8"))[:12]


def ids(home, sync=False, nxt=None, count=1, veto=None):
    path = os.path.join(home, "record", "ids.json")
    issued, err = load_ids(home)
    if err:
        raise SystemExit(err)
    present = current_ids(load(home))
    today = dt.date.today().isoformat()
    if sync or veto:
        for p, keys in present.items():
            for k in keys:
                issued.setdefault(p, {}).setdefault(k, today)
        if veto:
            issued.setdefault("vetoed", {})[veto] = today
        write_atomic(path, json.dumps(issued, indent=1, sort_keys=True) + "\n")
    if nxt:
        nums = [int(re.sub(r"\D", "", k)) for k in list(issued.get(nxt, {})) + list(present.get(nxt, set()))]
        start = (max(nums) if nums else 0) + 1
        fmt = {"FR": "FR-{}", "CH": "CH-{}", "KEEP": "KEEP-{}", "D": "D{}", "S": "S{}", "F": "F{}",
               "q": "q-{:02d}", "B": "B-{}"}[nxt]
        return [fmt.format(n) for n in range(start, start + count)]
    return issued


def lock(home, self_id=None):
    path = os.path.join(home, "record", "log.md")
    if not os.path.exists(path):
        return None
    entries, cur, abandoned = [], None, set()
    for line in read(path).splitlines():
        h = ENTRY_HEAD.match(line)
        if h:
            cur = {"header": line[3:], "run": h.group(3), "closed": False}
            entries.append(cur)
        elif cur and re.match(r"^-\s+(closed|paused)(\s|$)", line):
            cur["closed"] = True
        ab = ABANDONED.match(line)
        if ab:
            abandoned.add(ab.group(1))
    openings = [e for e in entries if not e["closed"] and e["run"] != self_id and e["run"] not in abandoned]
    if not openings:
        return None
    last_is_open = entries and entries[-1] is openings[-1]
    age = (time.time() - os.path.getmtime(path)) / 60 if last_is_open else float("inf")
    return {"open": openings[-1]["header"], "run": openings[-1]["run"], "minutes_since_last_write": round(age, 1),
            "older_open_entries": len(openings) - 1}


def iter_files(p):
    if os.path.isfile(p):
        yield p
        return
    for root, dirs, names in os.walk(p):
        dirs[:] = [x for x in dirs if x not in PRUNE]
        for n in names:
            yield os.path.join(root, n)


def quote(text, paths):
    q = norm(text)
    if not q:
        return []
    hits = []
    for p in paths:
        for f in iter_files(p):
            try:
                t = read(f)
            except (UnicodeDecodeError, OSError):
                continue
            nt = norm(t)
            if q in nt:
                head = q[:30]
                lines = t.splitlines()
                ln = next((i + 1 for i, l in enumerate(lines) if head in norm(l)), 0)
                hits.append(f"{f}:{ln}")
    return hits


def sha_bytes(b):
    return hashlib.sha256(b).hexdigest()


def snapshot(home, run):
    dst = os.path.join(home, "record", "snapshots", run)
    os.makedirs(dst, exist_ok=True)
    for n in ("FEATURE.md", "questions.md", "baseline.md"):
        if os.path.exists(os.path.join(home, n)):
            shutil.copy2(os.path.join(home, n), os.path.join(dst, n))
    return dst


def changed(home):
    sd = os.path.join(home, "record", "snapshots")
    if not os.path.isdir(sd):
        return None, []
    snaps = sorted((os.path.getmtime(os.path.join(sd, s)), s) for s in os.listdir(sd)
                   if os.path.isdir(os.path.join(sd, s)))
    if not snaps:
        return None, []
    last = snaps[-1][1]
    diffs = []
    for n in ("FEATURE.md", "questions.md", "baseline.md"):
        a, b = os.path.join(sd, last, n), os.path.join(home, n)
        a_exists, b_exists = os.path.exists(a), os.path.exists(b)
        if a_exists != b_exists:
            diffs.append(f"{n}: {'deleted' if a_exists else 'added'} since snapshot {last}")
        elif a_exists and b_exists:
            dl = list(difflib.unified_diff(read(a).splitlines(), read(b).splitlines(), f"{n} @ {last}", f"{n} now",
                                           lineterm="", n=1))
            if dl:
                diffs.append("\n".join(dl))
    return last, diffs


# ---------------------------------------------------------------- scaffold

def scaffold(home, name):
    for sub in ("sources", "record/runs", "record/snapshots", "work"):
        os.makedirs(os.path.join(home, sub), exist_ok=True)
    made = []
    for src, dst in (("FEATURE.md", "FEATURE.md"), ("questions.md", "questions.md"),
                     ("baseline.md", "baseline.md"), ("README.md", "README.md"),
                     ("INDEX.md", "sources/INDEX.md"), ("log.md", "record/log.md"),
                     ("defaults.md", "record/defaults.md")):
        out = os.path.join(home, dst)
        if os.path.exists(out):
            continue
        write_atomic(out, read(os.path.join(TEMPLATES, src)).replace("{{NAME}}", name))
        made.append(dst)
    return made


# ---------------------------------------------------------------- selftest

def selftest():
    ws = tempfile.mkdtemp(prefix="bf-selftest-")
    G = ["-c", "user.email=t@t", "-c", "user.name=t"]
    try:
        repo = os.path.join(ws, "app")
        os.makedirs(os.path.join(repo, "src"))
        with open(os.path.join(repo, "src", "sort.ts"), "w") as f:
            f.write("export function sort(a, b) {\n  // newest first\n  return b.lastSeq - a.lastSeq;\n}\n")
        subprocess.run(["git", "init", "-q", "-b", "main", repo], check=True)
        subprocess.run(["git", "-C", repo, *G, "add", "-A"], check=True)
        subprocess.run(["git", "-C", repo, *G, "commit", "-qm", "x"], check=True)
        head = git(repo, "rev-parse", "--short", "HEAD")
        home = os.path.join(ws, "tasks", "001-pin", "blueprint-feature")
        assert lock(home) is None
        made = scaffold(home, "Pin a challenge")
        assert "FEATURE.md" in made and "record/defaults.md" in made, made
        e0, _, _ = lint(home)
        assert not e0, e0
        ft = read(os.path.join(home, "FEATURE.md"))
        ft = ft.replace("## Behaviour\n", "## Behaviour\n\n- FR-1 — When a member pins a challenge, it shows first\n"
                        "  in their list (B-1).\n"
                        "- FR-2 — Pinned challenges show a mark. [NEEDS CLARIFICATION: FR-2 — which mark on\n"
                        "  `app/[id]` rows? → q-01]\n"
                        "- FR-2a — bad id\n- FR-1–FR-2 apply offline too.\n- FR-3 — withdrawn 2026-10-27, replaced by FR-4.\n"
                        "- FR-4 — Pins sync. [NEEDS CLARIFICATION: FR-4 — how fast? → asked next run (vetoed D2)]\n")
        ft = ft.replace("## Must stay the same\n", "## Must stay the same\n\n- KEEP-1 — Default D1 (keeps today’s behaviour — B-1 —\n"
                        "  adopted 2026-10-26): unpinned challenges keep today's order.\n"
                        "- KEEP-2 — Default (made up): broken.\n- Copy slot S-1 — wrong shape.\n")
        write_atomic(os.path.join(home, "FEATURE.md"), ft)
        qt = read(os.path.join(home, "questions.md")) + (
            "\n### q-01 · Which mark shows on a pinned challenge?\n- **Status:** Flagged\n- **Depth:** 1\n- **Touches:** FR-2\n"
            "- **Why asked:** The note says pinned ones should stand out.\n- **Created:** 2026-10-26\n\n"
            "**Answer & why:** a star\n- **Why flagged:** the answer does not say where.\n"
            "\n### q-02 — malformed heading\n- **Status:** Open\n")
        write_atomic(os.path.join(home, "questions.md"), qt)
        bt = read(os.path.join(home, "baseline.md")).replace("- _repo commit (branch) · released: ref — one line per repo_",
                                                             f"- app {head} (main) · released: main")
        bt = bt.replace("## Surfaces\n", "## Surfaces\n\n### Challenges list\n- B-1 — Open challenges are newest first. —\n"
                        "  `app/src/sort.ts:3` «return b.lastSeq - a.lastSeq»\n"
                        "- B-2 — Something drifted. — `app/src/sort.ts:1-2` «this text is not there»\n"
                        "- ~~B-3 — Wrong fact.~~ wrong — see B-1\n")
        write_atomic(os.path.join(home, "baseline.md"), bt)
        errs, warns, cov = lint(home)
        txt = "\n".join(errs)
        assert "FR-2a" in txt and "whole numbers" in txt, errs
        assert "Default not in the shape" in txt and "slot not in the shape" in txt, errs
        assert "question heading must be" in txt, errs
        assert "FR-1 defined" not in txt, errs
        assert "marker must end" not in txt and "not closed" not in txt, errs
        assert not any("Flagged with no" in e for e in errs), errs
        c = counts(home)
        assert c["requirements"] == 3 and c["withdrawn"] == 1 and c["keeps"] == 2, c
        assert c["markers"] == 2 and c["markers_linked"] == 1 and c["defaults"] == 1 and c["facts"] == 2, c
        assert c["questions"]["Flagged"] == 1 and c["questions_total"] == 1, c
        r = check_anchors(home, [("baseline.md", read(os.path.join(home, "baseline.md")))])
        states = {a["fact"]: a["state"] for a in r["anchors"]}
        assert states == {"B-1": "ok", "B-2": "stale:snippet-missing"}, states
        assert r["repos"] and r["repos"][0]["head"] == head and r["anchors"][0]["in_released"], r
        with open(os.path.join(repo, "src", "sort.ts"), "a") as f:
            f.write("// touched\n")
        r = check_anchors(home, [("baseline.md", read(os.path.join(home, "baseline.md")))])
        assert r["anchors"][0]["recheck"] and r["anchors"][0]["state"] == "ok", r["anchors"][0]
        ids(home, sync=True)
        assert ids(home, nxt="FR") == ["FR-5"], ids(home, nxt="FR")
        assert ids(home, nxt="D", count=2) == ["D2", "D3"]
        assert ids(home, nxt="q") == ["q-02"]
        assert quote("return  b.lastSeq -\n a.lastSeq", [repo]) and not quote("return a.lastSeq", [repo])
        assert quote("   ", [repo]) == []
        snapshot(home, "abc123")
        assert changed(home)[1] == []
        with open(os.path.join(home, "FEATURE.md"), "a") as f:
            f.write("\nowner edit\n")
        assert changed(home)[1], "owner edit not detected"
        with open(os.path.join(home, "record", "log.md"), "a") as f:
            f.write("\n## 2026-10-20 10:00 · init · aaa111 · blueprint-feature v2\n- open\n"
                    "\n## 2026-10-26 10:00 · add · bbb222 · blueprint-feature v2\n- open\n- closed 2026-10-26 10:20\n"
                    "\n## 2026-10-26 11:00 · questions · ccc333 · blueprint-feature v2\n- open\n- closed-loop note\n")
        lk = lock(home)
        assert lk["run"] == "ccc333" and lk["minutes_since_last_write"] < 30, lk
        lk = lock(home, self_id="ccc333")
        assert lk["run"] == "aaa111" and lk["minutes_since_last_write"] == float("inf"), lk
        # CLI advice must not turn log age into authority to close another writer.
        import contextlib
        import io
        log_path = os.path.join(home, "record", "log.md")
        original_log = read(log_path)
        original_mtime = os.path.getmtime(log_path)
        for age, own_id, expected in ((0, None, 3), (3600, None, 1), (0, "ccc333", 1)):
            os.utime(log_path, (original_mtime - age, original_mtime - age))
            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                result = main(["lock", home] + (["--self", own_id] if own_id else []))
            assert result == expected, (result, output.getvalue())
            assert "abandoned run:" not in output.getvalue(), output.getvalue()
            assert "do not proceed over an active writer" in output.getvalue(), output.getvalue()
            if expected == 1:
                assert "Age alone is not proof" in output.getvalue(), output.getvalue()
            assert read(log_path) == original_log, "lock command modified the record"
        os.utime(log_path, (original_mtime, original_mtime))
        # provenance quotes are not live content
        ft = read(os.path.join(home, "FEATURE.md"))
        ft = ft.replace("## Edge cases\n", "## Edge cases\n\n- Pins sync at once.\n  *(From q-01, 2026-10-27 — replaces: \"[NEEDS CLARIFICATION: FR-2 — which mark? → q-01] and Default D9 (standard practice — adopted 2026-10-20): old\".)*\n")
        write_atomic(os.path.join(home, "FEATURE.md"), ft)
        c2 = counts(home)
        assert c2["markers"] == c["markers"] and c2["defaults"] == c["defaults"], (c, c2)
        # abandoned note frees the old entry
        with open(os.path.join(home, "record", "log.md"), "a") as f:
            f.write("- note closed as abandoned: aaa111\n")
        assert lock(home, self_id="ccc333") is None
        # header with a mode
        with open(os.path.join(home, "record", "log.md"), "a") as f:
            f.write("\n## 2026-10-26 12:00 · init soft · ddd444 · blueprint-feature v3\n- open\n")
        assert lock(home)["run"] == "ddd444"
        # recheck clears once verified
        assert mark_verified(home, ["B-1"]) == ["B-1"]
        r = check_anchors(home, [("baseline.md", read(os.path.join(home, "baseline.md")))])
        assert not r["anchors"][0]["recheck"], r["anchors"][0]
        assert row_hash(home, "q-01") and row_hash(home, "q-09") is None
        # ready stamp refuses uncovered blocks
        ft = read(os.path.join(home, "FEATURE.md")).replace("Status: Draft", "Status: Ready for planning — 2026-10-27")
        ft = ft.replace("## Why\n", "## Why\n\nNot covered yet.\n")
        write_atomic(os.path.join(home, "FEATURE.md"), ft)
        assert any("not covered yet" in e for e in lint(home)[0])
        # Previously documented bullet-form answers remain readable without migration.
        for marker in ("**Answer & why:**", "- **Answer & why:**"):
            rows, malformed = parse_questions("### q-01 · Which order?\n- **Status:** Answered\n" +
                marker + " Delegated answer: newest first.\n- **Applied:** pending\n")
            assert not malformed and rows[0]["answered"] and rows[0]["delegated"], rows
            assert rows[0]["answer"] == "Delegated answer: newest first.", rows
        regression = os.path.join(ws, "range-and-deletion")
        scaffold(regression, "Range and deletion")
        feature_path = os.path.join(regression, "FEATURE.md")
        question_path = os.path.join(regression, "questions.md")
        body = "- FR-1 — First.\n- FR-2 — Middle.\n- FR-3 — Last.\n- KEEP-1 — Preserve.\n- FR-4 — Unrelated.\n"
        write_atomic(feature_path, body)
        write_atomic(question_path, "### q-01 · Which order?\n- **Touches:** FR-1–FR-3,\n  KEEP-1\n")
        initial = row_hash(regression, "q-01")
        original_question = read(question_path)
        write_atomic(question_path, original_question.replace("FR-1–FR-3", "FR-3–FR-1"))
        reversed_hash = row_hash(regression, "q-01")
        write_atomic(feature_path, body.replace("First.", "Changed endpoint."))
        assert row_hash(regression, "q-01") != reversed_hash, "descending range lost endpoint dependency"
        write_atomic(question_path, original_question)
        write_atomic(feature_path, body.replace("Middle.", "Changed middle."))
        assert row_hash(regression, "q-01") != initial, "range middle missing from row hash"
        write_atomic(feature_path, body.replace("Preserve.", "Changed preservation."))
        assert row_hash(regression, "q-01") != initial, "wrapped Touches missing from row hash"
        write_atomic(feature_path, body.replace("Unrelated.", "Changed unrelated."))
        assert row_hash(regression, "q-01") == initial, "unrelated requirement invalidates row hash"
        snapshot(regression, "eee555")
        original = read(question_path)
        os.remove(question_path)
        assert changed(regression)[1], "deleted governing file reported unchanged"
        write_atomic(question_path, original)
        assert not changed(regression)[1], "restored exact file reported changed"
        os.remove(os.path.join(regression, "record", "snapshots", "eee555", "questions.md"))
        assert changed(regression)[1], "added governing file reported unchanged"
        print("selftest: ok")
        return 0
    finally:
        shutil.rmtree(ws, ignore_errors=True)


# ---------------------------------------------------------------- main

def main(argv=None):
    ap = argparse.ArgumentParser(prog="bf.py", description=__doc__.split("\n")[0])
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("scaffold"); s.add_argument("home"); s.add_argument("--name", required=True)
    s = sub.add_parser("lint"); s.add_argument("home"); s.add_argument("--json", action="store_true")
    s = sub.add_parser("counts"); s.add_argument("home"); s.add_argument("--json", action="store_true")
    s = sub.add_parser("anchors"); s.add_argument("home"); s.add_argument("--facts"); s.add_argument("--workspace")
    s.add_argument("--json", action="store_true")
    s = sub.add_parser("quote"); s.add_argument("--text", required=True); s.add_argument("paths", nargs="+")
    s = sub.add_parser("hash"); s.add_argument("file", nargs="?"); s.add_argument("--text")
    s = sub.add_parser("ids"); s.add_argument("home"); s.add_argument("--sync", action="store_true")
    s.add_argument("--next", choices=list(PREFIXES)); s.add_argument("--count", type=int, default=1)
    s.add_argument("--veto"); s.add_argument("--verified", help="comma-separated B-n facts just confirmed by a verifier")
    s = sub.add_parser("rowhash"); s.add_argument("home"); s.add_argument("q")
    s = sub.add_parser("lock"); s.add_argument("home"); s.add_argument("--self")
    s = sub.add_parser("snapshot"); s.add_argument("home"); s.add_argument("--run", required=True)
    s = sub.add_parser("changed"); s.add_argument("home")
    sub.add_parser("selftest")
    a = ap.parse_args(argv)

    if a.cmd == "selftest":
        return selftest()
    if a.cmd == "hash":
        if a.text is not None:
            h = sha_bytes(a.text.encode("utf-8"))
        elif a.file and os.path.isfile(a.file):
            h = sha_bytes(open(a.file, "rb").read())
        else:
            print("hash: give a FILE that exists or --text", file=sys.stderr)
            return 2
        print(h, h[:12])
        return 0
    if a.cmd == "quote":
        text = sys.stdin.read() if a.text == "-" else a.text
        hits = quote(text, a.paths)
        print("\n".join(hits) if hits else "not found")
        return 0 if hits else 1
    home = os.path.abspath(a.home)
    if a.cmd == "scaffold":
        made = scaffold(home, a.name)
        print(f"home: {home}")
        print("created: " + (", ".join(made) if made else "nothing (all files existed)"))
        return 0
    if a.cmd == "lock":
        l = lock(home, a.self) if os.path.isdir(home) else None
        if not l:
            print("no open run" if os.path.isdir(home) else "no feature home yet")
            return 0
        if l["minutes_since_last_write"] == float("inf") or l["minutes_since_last_write"] >= 30:
            print(f"ownership unconfirmed: {l['open']} — older or age-unknown open run; confirm the writer stopped before closing it. Age alone is not proof; do not proceed over an active writer.")
            return 1
        print(f"recorded open run: {l['open']} · last log write {l['minutes_since_last_write']} min ago — check writer ownership; do not proceed over an active writer")
        return 3
    if not os.path.isdir(home):
        print(f"no feature home at {home}", file=sys.stderr)
        return 2
    if a.cmd == "lint":
        errs, warns, cov = lint(home)
        if a.json:
            print(json.dumps({"errors": errs, "warnings": warns, "coverage": cov}, indent=1))
        else:
            for e in errs:
                print("ERROR  " + e)
            for w in warns:
                print("warn   " + w)
            print(f"lint: {len(errs)} errors, {len(warns)} warnings ({len(cov)} coverage)")
        return 1 if errs else 0
    if a.cmd == "counts":
        c = counts(home)
        print(json.dumps(c, indent=1) if a.json else "\n".join(f"{k}: {v}" for k, v in c.items()))
        return 0
    if a.cmd == "anchors":
        texts = []
        if a.facts:
            fp = a.facts if os.path.isabs(a.facts) or os.path.exists(a.facts) else os.path.join(home, a.facts)
            if not os.path.exists(fp):
                print(f"anchors: facts file not found: {a.facts}", file=sys.stderr)
                return 2
            ft_ = read(fp)
            if not (ANCHOR.search(ft_) or ANCHOR_BARE.search(ft_)):
                print("anchors: no anchor in the facts file — write them as `<repo>/<path>:<line>` «snippet»", file=sys.stderr)
                return 2
            texts.append(("facts", ft_))
        for n in ("baseline.md", "FEATURE.md"):
            p = os.path.join(home, n)
            if os.path.exists(p):
                texts.append((n, read(p)))
        r = check_anchors(home, texts, a.workspace)
        stale = [x for x in r["anchors"] if str(x.get("state", "")).startswith("stale")]
        if a.json:
            print(json.dumps(r, indent=1, default=str))
        else:
            print(f"workspace: {r['workspace']}")
            for n in r["notes"]:
                print("note   " + n)
            for rp in r["repos"]:
                moved = "" if rp["head"].startswith(rp["baseline"][:7]) else f" → HEAD {rp['head']}"
                print(f"repo {rp['repo']}: baseline {rp['baseline']}{moved}; anchored files changed: "
                      f"{', '.join(rp['anchored_files_changed']) or 'none'}")
            for x in r["anchors"]:
                tags = []
                if x.get("recheck"):
                    tags.append("file changed since baseline — recheck")
                if x.get("in_released") is False:
                    tags.append(f"not in released {x.get('released_ref')}")
                if str(x["state"]).startswith("stale"):
                    print(f"STALE  {x['in']} {x.get('fact') or ''} `{x['path']}:{x['line']}` — {x['state']}")
                elif tags:
                    print(f"info   {x['in']} {x.get('fact') or ''} `{x['path']}:{x['line']}` — {x['state']} · {'; '.join(tags)}")
            print(f"anchors: {len(r['anchors'])} checked, {len(stale)} stale, "
                  f"{sum(1 for x in r['anchors'] if x.get('recheck'))} to recheck, "
                  f"{sum(1 for x in r['anchors'] if x.get('in_released') is False)} not in the released code")
        return 1 if stale else 0
    if a.cmd == "rowhash":
        h = row_hash(home, a.q)
        print(h or "no such row")
        return 0 if h else 1
    if a.cmd == "ids" and a.verified:
        done = mark_verified(home, [x.strip() for x in a.verified.split(",") if x.strip()], None)
        print("verified: " + (", ".join(done) or "none (no checkable anchors)"))
        return 0
    if a.cmd == "ids":
        if a.next:
            print(" ".join(ids(home, sync=a.sync, nxt=a.next, count=a.count, veto=a.veto)))
        else:
            r = ids(home, sync=a.sync, veto=a.veto)
            print(json.dumps({p: len(v) for p, v in r.items()}))
        return 0
    if a.cmd == "snapshot":
        print(snapshot(home, a.run))
        return 0
    if a.cmd == "changed":
        last, diffs = changed(home)
        if last is None:
            print("no snapshot yet")
            return 0
        print("\n\n".join(diffs) if diffs else f"no changes since snapshot {last}")
        return 1 if diffs else 0
    return 2


if __name__ == "__main__":
    sys.exit(main())
