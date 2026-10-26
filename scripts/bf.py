#!/usr/bin/env python3
"""bf.py — mechanical helpers for the blueprint-feature skill (stdlib only).

Subcommands:
  scaffold <home> --name NAME     create a feature home from the templates (never overwrites)
  lint <home> [--json]            structural checks on FEATURE.md, questions.md, baseline.md
  counts <home> [--json]          fresh counts for reports and status
  anchors <home> [--facts FILE] [--workspace DIR] [--json]
                                  verify code anchors and snippets; report repo drift since the baseline
  quote --text TEXT PATH...       normalised-whitespace match of a quotation in files or folders
  hash FILE                       sha256 (full and first 12)
  ids <home> --sync | --next P    keep record/ids.json; print the next free number for FR/CH/KEEP/D/S/q/B
  lock <home>                     show an open (unclosed) run-log entry and its age
  selftest                        run the script's own checks on a throwaway fixture

Exit codes: 0 ok · 1 findings (lint errors, quote not found, stale anchors) · 2 usage or open lock < 30 min.
"""
import argparse
import datetime as dt
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

FEATURE_HEADINGS = [
    "Summary", "Why", "Who", "Scope", "Today", "Behaviour", "Changes to existing behaviour",
    "Must stay the same", "Edge cases", "Data and compatibility", "Copy and content",
    "Rabbit holes", "Open questions",
]
STATUSES = {"Open", "Answered", "Applied", "Rejected", "Flagged", "Closed"}
MACHINE_WORDS = re.compile(
    r"\b(lens|cold read|router|disposition|carried|run id|run-id|G[1-6]|R[1-5]|W[1-6]|D[1-5] phase|"
    r"funnel|blind check|grill pass)\b", re.I)

ID_DEF = re.compile(r"^\s*(?:[-*]\s+)?\**(FR|CH|KEEP)-(\d+)([a-z])?\**\s*[—–-]")
ID_REF = re.compile(r"\b(FR|CH|KEEP)-(\d+)\b")
B_DEF = re.compile(r"^\s*(?:[-*]\s+)?(?:~~)?\**B-(\d+)\**\s*[—–-]")
B_REF = re.compile(r"\bB-(\d+)\b")
DEFAULT_ANY = re.compile(r"\bDefault D\d+\b|\bDefault \(")
DEFAULT_OK = re.compile(
    r"\bDefault D(\d+) \((existing pattern|keeps today's behaviour|standard practice)\b.*?"
    r"adopted (\d{4}-\d{2}-\d{2})(, unverified)?\):")
SLOT_ANY = re.compile(r"\b(Copy|Content) slot\b", re.I)
SLOT_OK = re.compile(r"\b(Copy|Content) slot S(\d+) —")
MARKER = re.compile(r"\[NEEDS CLARIFICATION:(.*?)\]", re.S)
MARKER_END = re.compile(r"→\s*(q-(\d+)|asked next run)\s*$")
Q_HEAD = re.compile(r"^###\s+q-(\d+)\s*·\s*(.+?)\s*$")
FIELD = re.compile(r"^-\s+\*\*(.+?):\*\*\s*(.*)$")
ANCHOR = re.compile(r"`([A-Za-z0-9_.\-]+/[A-Za-z0-9_.\-/\[\]()@+]+):(\d+)(?:-(\d+))?`(?:\s*«([^»]+)»)?")
STATUS_LINE = re.compile(r"^Status:\s*(.+)$", re.M)
REPO_LINE = re.compile(r"([A-Za-z0-9_.\-]+)\s+([0-9a-f]{7,40})\s*\(([^)]+)\)")


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def write_atomic(path, text):
    d = os.path.dirname(path) or "."
    fd, tmp = tempfile.mkstemp(dir=d, prefix=".bf-")
    with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    os.replace(tmp, path)


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


def section(text, heading, level=2):
    """Return the text under '## heading' up to the next heading of the same or higher level."""
    marks = "#" * level
    m = re.search(rf"^{marks} {re.escape(heading)}\s*$", text, re.M)
    if not m:
        return None
    rest = text[m.end():]
    n = re.search(rf"^#{{1,{level}}} ", rest, re.M)
    return rest[: n.start()] if n else rest


# ---------------------------------------------------------------- parsing

def parse_questions(text):
    rows, cur, in_answer = [], None, False
    for i, line in enumerate(text.splitlines(), 1):
        h = Q_HEAD.match(line)
        if h:
            cur = {"n": int(h.group(1)), "id": f"q-{int(h.group(1)):02d}", "title": h.group(2),
                   "line": i, "fields": {}, "answer": ""}
            rows.append(cur)
            in_answer = False
            continue
        if cur is None:
            continue
        if line.startswith("**Answer & why:**"):
            in_answer = True
            cur["answer"] = line[len("**Answer & why:**"):].strip()
            continue
        if in_answer:
            if line.startswith("### "):
                in_answer = False
            else:
                cur["answer"] = (cur["answer"] + "\n" + line).strip()
            continue
        f = FIELD.match(line)
        if f:
            cur["fields"][f.group(1).strip()] = f.group(2).strip()
    for r in rows:
        a = r["answer"].strip()
        r["answered"] = bool(a) and a not in ("_(unanswered)_", "(unanswered)")
        r["status"] = r["fields"].get("Status", "").strip()
    return rows


def feature_ids(text):
    defs, withdrawn = {}, set()
    for i, line in enumerate(text.splitlines(), 1):
        m = ID_DEF.match(line)
        if m:
            key = f"{m.group(1)}-{m.group(2)}"
            defs.setdefault(key, []).append((i, m.group(3)))
            if re.search(r"\bwithdrawn \d{4}-\d{2}-\d{2}", line):
                withdrawn.add(key)
    return defs, withdrawn


def markers(text):
    out = []
    for m in MARKER.finditer(text):
        body = m.group(1).strip()
        line = text.count("\n", 0, m.start()) + 1
        end = MARKER_END.search(body)
        out.append({"line": line, "text": norm(body),
                    "q": (f"q-{int(end.group(2)):02d}" if end and end.group(2) else None),
                    "waiting": bool(end and not end.group(2)), "ok_end": bool(end)})
    return out


def baseline_facts(text):
    facts = {}
    for i, line in enumerate(text.splitlines(), 1):
        m = B_DEF.match(line)
        if m:
            n = int(m.group(1))
            facts.setdefault(n, []).append({"line": i, "text": line,
                                            "struck": line.lstrip("- *").startswith("~~"),
                                            "unverified": "(unverified)" in line})
    return facts


def baseline_surfaces(text):
    """Map each ### heading under '## Surfaces' to the B numbers defined beneath it."""
    body = section(text, "Surfaces") or ""
    out, cur = {}, None
    for line in body.splitlines():
        h = re.match(r"^###\s+(.+)$", line)
        if h:
            cur = h.group(1).strip()
            out[cur] = set()
            continue
        m = B_DEF.match(line)
        if m and cur:
            out[cur].add(int(m.group(1)))
    return out


def load(home):
    p = lambda n: os.path.join(home, n)
    d = {"home": home}
    for k, n in (("feature", "FEATURE.md"), ("questions", "questions.md"), ("baseline", "baseline.md"),
                 ("log", "record/log.md")):
        d[k] = read(p(n)) if os.path.exists(p(n)) else None
    return d


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
        return errs, warns

    ft, qt, bt = d["feature"], d["questions"], d["baseline"]
    rows = parse_questions(qt)
    qmap = {r["id"]: r for r in rows}
    facts = baseline_facts(bt)

    # headings in order
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
        if body is not None and h not in ("Scope",) and not re.sub(r"<!--.*?-->", "", body, flags=re.S).strip():
            W("FEATURE.md", 0, f"block '## {h}' is empty — write one line saying it does not apply")

    sm = STATUS_LINE.search(ft)
    status = sm.group(1).strip() if sm else ""
    if not sm:
        E("FEATURE.md", 0, "no 'Status:' line")
    elif not (status == "Draft" or status.startswith("Ready for planning")):
        E("FEATURE.md", 0, f"Status must be 'Draft' or 'Ready for planning — …', found '{status}'")

    defs, withdrawn = feature_ids(ft)
    for k, occ in defs.items():
        if len(occ) > 1:
            E("FEATURE.md", occ[1][0], f"{k} defined {len(occ)} times")
        for ln, suffix in occ:
            if suffix:
                E("FEATURE.md", ln, f"{k}{suffix}: IDs are whole numbers — use the next free number")

    for i, line in enumerate(ft.splitlines(), 1):
        if DEFAULT_ANY.search(line) and not DEFAULT_OK.search(line):
            E("FEATURE.md", i, "Default line not in the shape 'Default D<n> (<ground> … — adopted <date>):'")
        if SLOT_ANY.search(line) and not SLOT_OK.search(line) and not line.lstrip().startswith("#"):
            W("FEATURE.md", i, "slot line not in the shape 'Copy slot S<n> — …'")
        for m in B_REF.finditer(line):
            if int(m.group(1)) not in facts:
                E("FEATURE.md", i, f"B-{m.group(1)} cited but not in baseline.md")
        for m in ID_REF.finditer(line):
            k = f"{m.group(1)}-{m.group(2)}"
            if k not in defs:
                W("FEATURE.md", i, f"{k} referenced but not defined")
        stripped = re.sub(r"`[^`]*`", "", line)
        if MACHINE_WORDS.search(stripped) and not line.startswith("<!--"):
            W("FEATURE.md", i, f"machine word in the spec: '{MACHINE_WORDS.search(stripped).group(0)}'")
    dnums = [int(m.group(1)) for m in DEFAULT_OK.finditer(ft)]
    for n in set(dnums):
        if dnums.count(n) > 1:
            E("FEATURE.md", 0, f"D{n} used {dnums.count(n)} times")

    nd = section(ft, "Not doing", level=3) or ""
    for line in nd.splitlines():
        s = line.strip()
        if s.startswith("- ") and not s.startswith("- No ") and "None" not in s:
            W("FEATURE.md", 0, f"Not doing line should read '- No <thing> — because …': {s[:60]}")

    mk = markers(ft)
    for m in mk:
        if not m["ok_end"]:
            E("FEATURE.md", m["line"], "marker must end '→ q-NN' or '→ asked next run'")
        elif m["q"]:
            if m["q"] not in qmap:
                E("FEATURE.md", m["line"], f"marker points at {m['q']}, which does not exist")
            elif qmap[m["q"]]["status"] in ("Applied", "Rejected", "Closed"):
                W("FEATURE.md", m["line"], f"marker still points at {m['q']} ({qmap[m['q']]['status']}) — remove it by its route")

    open_rows = [r for r in rows if r["status"] in ("Open", "Answered", "Flagged")]
    if status.startswith("Ready for planning") and (open_rows or mk):
        E("FEATURE.md", 0, f"Ready stamp with {len(open_rows)} unsettled questions and {len(mk)} markers")

    # questions.md
    nums = [r["n"] for r in rows]
    if len(set(nums)) != len(nums):
        E("questions.md", 0, "duplicate q numbers")
    if nums != sorted(nums):
        E("questions.md", 0, "rows out of q-NN order")
    for r in rows:
        f = r["fields"]
        for need in ("Status", "Touches", "Why asked"):
            if need not in f:
                E("questions.md", r["line"], f"{r['id']} has no '{need}' field")
        if r["status"] and r["status"] not in STATUSES:
            E("questions.md", r["line"], f"{r['id']} status '{r['status']}' is not one of {sorted(STATUSES)}")
        if r["status"] in ("Answered", "Applied") and not r["answered"]:
            E("questions.md", r["line"], f"{r['id']} is {r['status']} with no answer")
        if r["status"] == "Flagged" and not f.get("Why flagged"):
            E("questions.md", r["line"], f"{r['id']} is Flagged with no 'Why flagged'")
        for t in re.split(r"[,\s]+", f.get("Touches", "")):
            t = t.strip()
            if t and t.lower() != "feature" and re.match(r"(FR|CH|KEEP)-\d+$", t) and t not in defs:
                E("questions.md", r["line"], f"{r['id']} touches {t}, which is not in FEATURE.md")
        title = r["title"]
        if title.count("?") != 1:
            W("questions.md", r["line"], f"{r['id']} title should be one question with one '?'")
        if len(title.split()) > 35:
            W("questions.md", r["line"], f"{r['id']} title is {len(title.split())} words (aim ≤ 25)")
        if MACHINE_WORDS.search(title + " " + f.get("Why asked", "")):
            W("questions.md", r["line"], f"{r['id']} uses a machine word: '{MACHINE_WORDS.search(title + ' ' + f.get('Why asked', '')).group(0)}'")

    # baseline.md
    for n, occ in facts.items():
        if len(occ) > 1:
            E("baseline.md", occ[1]["line"], f"B-{n} defined {len(occ)} times")
        line = occ[0]["text"]
        if not occ[0]["struck"] and not ANCHOR.search(line) and "searched:" not in line and "wiki" not in line.lower():
            W("baseline.md", occ[0]["line"], f"B-{n} has no code anchor and no search")

    # coverage: each baseline surface has a CH or KEEP citing one of its facts
    chkeep = "\n".join(l for l in ft.splitlines() if re.match(r"^\s*(?:[-*]\s+)?\**(CH|KEEP)-\d+", l))
    cited = {int(m.group(1)) for m in B_REF.finditer(chkeep)}
    for surf, bs in baseline_surfaces(bt).items():
        if bs and not (bs & cited):
            W("FEATURE.md", 0, f"no CH or KEEP cites the touched surface '{surf}' ({', '.join('B-%d' % b for b in sorted(bs))})")

    # ids.json: IDs never disappear (tombstone instead)
    ids_path = os.path.join(home, "record", "ids.json")
    if os.path.exists(ids_path):
        issued = json.loads(read(ids_path))
        present = current_ids(d)
        for prefix in ("FR", "CH", "KEEP", "q", "B"):
            for k in issued.get(prefix, {}):
                if k not in present.get(prefix, set()):
                    E("record/ids.json", 0, f"{k} was issued and is gone — tombstone it, never delete")
    return errs, warns


def current_ids(d):
    out = {p: set() for p in ("FR", "CH", "KEEP", "D", "S", "q", "B")}
    if d.get("feature"):
        defs, _ = feature_ids(d["feature"])
        for k in defs:
            out[k.split("-")[0]].add(k)
        for m in DEFAULT_OK.finditer(d["feature"]):
            out["D"].add(f"D{m.group(1)}")
        for m in SLOT_OK.finditer(d["feature"]):
            out["S"].add(f"S{m.group(2)}")
    if d.get("questions"):
        for r in parse_questions(d["questions"]):
            out["q"].add(r["id"])
    if d.get("baseline"):
        for n in baseline_facts(d["baseline"]):
            out["B"].add(f"B-{n}")
    return out


# ---------------------------------------------------------------- counts

def counts(home):
    d = load(home)
    ft, qt, bt = d["feature"] or "", d["questions"] or "", d["baseline"] or ""
    rows = parse_questions(qt)
    by = {s: 0 for s in sorted(STATUSES)}
    for r in rows:
        by[r["status"]] = by.get(r["status"], 0) + 1
    delegated = sum(1 for r in rows if r["status"] == "Answered" and r["answer"].startswith("Delegated answer"))
    defs, withdrawn = feature_ids(ft)
    live = lambda p: sum(1 for k in defs if k.startswith(p + "-") and k not in withdrawn)
    mk = markers(ft)
    dl = list(DEFAULT_OK.finditer(ft))
    facts = baseline_facts(bt)
    sm = STATUS_LINE.search(ft)
    last_grill = None
    if d["log"]:
        cur = None
        for line in d["log"].splitlines():
            if line.startswith("## "):
                cur = line[3:].split(" · ")[0]
            elif line.startswith("- grill") and cur:
                last_grill = cur
    return {
        "status": sm.group(1).strip() if sm else None,
        "questions": by, "questions_total": len(rows), "delegated_unapplied": delegated,
        "requirements": live("FR"), "changes": live("CH"), "keeps": live("KEEP"), "withdrawn": len(withdrawn),
        "markers": len(mk), "markers_linked": sum(1 for m in mk if m["q"]),
        "markers_waiting": sum(1 for m in mk if m["waiting"]),
        "defaults": len(dl), "defaults_unverified": sum(1 for m in dl if m.group(4)),
        "slots": len(list(SLOT_OK.finditer(ft))),
        "facts": sum(1 for n, o in facts.items() if not o[0]["struck"]),
        "facts_unverified": sum(1 for n, o in facts.items() if o[0]["unverified"] and not o[0]["struck"]),
        "facts_struck": sum(1 for n, o in facts.items() if o[0]["struck"]),
        "last_grill": last_grill,
    }


# ---------------------------------------------------------------- anchors

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


def git(repo, *args):
    try:
        return subprocess.run(["git", "-C", repo, *args], capture_output=True, text=True, timeout=30).stdout.strip()
    except Exception:
        return ""


def check_anchors(home, texts, workspace=None, window=6):
    found = []
    for name, text in texts:
        for i, line in enumerate(text.splitlines(), 1):
            for m in ANCHOR.finditer(line):
                fid = None
                b = B_DEF.match(line)
                if b:
                    fid = f"B-{b.group(1)}"
                found.append({"in": f"{name}:{i}", "fact": fid, "path": m.group(1), "line": int(m.group(2)),
                              "snippet": m.group(4)})
    if not found:
        return {"workspace": workspace, "anchors": [], "repos": []}
    ws = workspace or find_workspace(home, found[0]["path"]) or os.getcwd()
    for a in found:
        fp = os.path.join(ws, a["path"])
        if not os.path.isfile(fp):
            a["state"] = "missing-file"
            continue
        try:
            lines = read(fp).splitlines()
        except UnicodeDecodeError:
            a["state"] = "binary"
            continue
        if a["line"] > len(lines):
            a["state"] = "line-out-of-range"
        else:
            a["state"] = "ok"
        if a["snippet"]:
            sn = norm(a["snippet"])
            lo, hi = max(0, a["line"] - 1 - window), min(len(lines), a["line"] + window)
            if any(sn in norm(l) for l in lines[lo:hi]) or sn in norm(" ".join(lines[lo:hi])):
                a["state"] = "ok"
            else:
                hits = [j + 1 for j, l in enumerate(lines) if sn in norm(l)]
                a["state"] = f"moved-to:{hits[0]}" if hits else "snippet-missing"
    # repo drift
    repos = []
    bt = next((t for n, t in texts if n == "baseline.md"), "")
    header = "\n".join(bt.splitlines()[:12])
    for rm in REPO_LINE.finditer(header):
        name, sha, branch = rm.group(1), rm.group(2), rm.group(3)
        rp = os.path.join(ws, name)
        if not os.path.isdir(os.path.join(rp, ".git")) and not os.path.isfile(os.path.join(rp, ".git")):
            continue
        head = git(rp, "rev-parse", "--short", "HEAD")
        changed = []
        if head and not head.startswith(sha[: len(head)]) and not sha.startswith(head):
            files = git(rp, "diff", "--name-only", f"{sha}..HEAD").splitlines()
            dirty = git(rp, "diff", "--name-only").splitlines()
            changed = sorted(set(files) | set(dirty))
        else:
            changed = git(rp, "diff", "--name-only").splitlines()
        anchored = {a["path"][len(name) + 1:] for a in found if a["path"].startswith(name + "/")}
        repos.append({"repo": name, "baseline": sha, "head": head, "branch_recorded": branch,
                      "anchored_files_changed": sorted(anchored & set(changed))})
    for a in found:
        for r in repos:
            if a["path"].startswith(r["repo"] + "/") and a["path"][len(r["repo"]) + 1:] in r["anchored_files_changed"]:
                a["file_changed_since_baseline"] = True
    return {"workspace": ws, "anchors": found, "repos": repos}


# ---------------------------------------------------------------- ids, lock, quote, hash

def ids(home, sync=False, nxt=None):
    path = os.path.join(home, "record", "ids.json")
    issued = json.loads(read(path)) if os.path.exists(path) else {}
    present = current_ids(load(home))
    today = dt.date.today().isoformat()
    if sync:
        for p, keys in present.items():
            for k in keys:
                issued.setdefault(p, {}).setdefault(k, today)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        write_atomic(path, json.dumps(issued, indent=1, sort_keys=True) + "\n")
    if nxt:
        p = nxt
        nums = [int(re.sub(r"\D", "", k)) for k in list(issued.get(p, {})) + list(present.get(p, set()))]
        n = (max(nums) if nums else 0) + 1
        return {"FR": f"FR-{n}", "CH": f"CH-{n}", "KEEP": f"KEEP-{n}", "D": f"D{n}", "S": f"S{n}",
                "q": f"q-{n:02d}", "B": f"B-{n}"}[p]
    return issued


def lock(home):
    path = os.path.join(home, "record", "log.md")
    if not os.path.exists(path):
        return None
    entries, cur = [], None
    for line in read(path).splitlines():
        if line.startswith("## "):
            cur = {"header": line[3:], "closed": False}
            entries.append(cur)
        elif cur and re.match(r"^-\s+(closed|paused)\b", line):
            cur["closed"] = True
    openings = [e for e in entries if not e["closed"]]
    if not openings:
        return None
    age = (time.time() - os.path.getmtime(path)) / 60
    return {"open": openings[-1]["header"], "minutes_since_last_write": round(age, 1)}


def quote(text, paths):
    q = norm(text)
    hits = []
    for p in paths:
        files = []
        if os.path.isdir(p):
            for root, _, names in os.walk(p):
                files += [os.path.join(root, n) for n in names]
        elif os.path.isfile(p):
            files = [p]
        for f in files:
            try:
                t = read(f)
            except (UnicodeDecodeError, OSError):
                continue
            if q in norm(t):
                lines = t.splitlines()
                ln = next((i + 1 for i, l in enumerate(lines) if q[:40] in norm(l)), 0)
                hits.append(f"{f}:{ln}")
    return hits


def sha(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


# ---------------------------------------------------------------- scaffold

def scaffold(home, name):
    os.makedirs(os.path.join(home, "sources"), exist_ok=True)
    os.makedirs(os.path.join(home, "record", "runs"), exist_ok=True)
    os.makedirs(os.path.join(home, "work"), exist_ok=True)
    made = []
    for src, dst in (("FEATURE.md", "FEATURE.md"), ("questions.md", "questions.md"),
                     ("baseline.md", "baseline.md"), ("README.md", "README.md"),
                     ("INDEX.md", "sources/INDEX.md"), ("log.md", "record/log.md")):
        out = os.path.join(home, dst)
        if os.path.exists(out):
            continue
        write_atomic(out, read(os.path.join(TEMPLATES, src)).replace("{{NAME}}", name))
        made.append(dst)
    return made


# ---------------------------------------------------------------- selftest

def selftest():
    ws = tempfile.mkdtemp(prefix="bf-selftest-")
    try:
        repo = os.path.join(ws, "app")
        os.makedirs(os.path.join(repo, "src"))
        with open(os.path.join(repo, "src", "sort.ts"), "w") as f:
            f.write("export function sort(a, b) {\n  // newest first\n  return b.lastSeq - a.lastSeq;\n}\n")
        subprocess.run(["git", "init", "-q", repo], check=True)
        subprocess.run(["git", "-C", repo, "-c", "user.email=t@t", "-c", "user.name=t", "add", "-A"], check=True)
        subprocess.run(["git", "-C", repo, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "x"], check=True)
        head = git(repo, "rev-parse", "--short", "HEAD")
        home = os.path.join(ws, "tasks", "001-pin", "blueprint-feature")
        made = scaffold(home, "Pin a challenge")
        assert "FEATURE.md" in made, made
        ft = read(os.path.join(home, "FEATURE.md"))
        ft = ft.replace("## Behaviour\n", "## Behaviour\n\n- FR-1 — When a member pins a challenge, it shows first in their list.\n"
                        "- FR-2 — Pinned challenges show a pin mark. [NEEDS CLARIFICATION: FR-2 — which mark? → q-01]\n"
                        "- FR-2a — bad id\n")
        ft = ft.replace("## Must stay the same\n", "## Must stay the same\n\n- KEEP-1 — Unpinned challenges keep today's order (B-1).\n"
                        "Default D1 (existing pattern — B-1 — adopted 2026-10-26): ties keep today's order.\n"
                        "Default (made up): broken.\n")
        write_atomic(os.path.join(home, "FEATURE.md"), ft)
        qt = read(os.path.join(home, "questions.md")) + (
            "\n### q-01 · Which mark shows on a pinned challenge?\n- **Status:** Open\n- **Touches:** FR-2\n"
            "- **Why asked:** The note says pinned ones should stand out.\n- **Created:** 2026-10-26\n\n**Answer & why:** _(unanswered)_\n")
        write_atomic(os.path.join(home, "questions.md"), qt)
        bt = read(os.path.join(home, "baseline.md")).replace("_repo commit (branch), one per line_", f"app {head} (main)")
        bt = bt.replace("## Surfaces\n", "## Surfaces\n\n### Challenges list\n- B-1 — Open challenges are newest first. — `app/src/sort.ts:3` «return b.lastSeq - a.lastSeq»\n"
                        "- B-2 — Something drifted. — `app/src/sort.ts:1` «this text is not there»\n")
        write_atomic(os.path.join(home, "baseline.md"), bt)
        errs, warns = lint(home)
        assert any("FR-2a" in e or "FR-2" in e and "whole numbers" in e for e in errs), errs
        assert any("Default line not in the shape" in e for e in errs), errs
        assert not any("q-01" in e for e in errs), errs
        c = counts(home)
        assert c["requirements"] == 2 and c["keeps"] == 1 and c["markers_linked"] == 1 and c["defaults"] == 1, c
        r = check_anchors(home, [("baseline.md", bt)])
        states = {a["fact"]: a["state"] for a in r["anchors"]}
        assert states == {"B-1": "ok", "B-2": "snippet-missing"}, states
        assert r["repos"] and r["repos"][0]["head"] == head, r["repos"]
        ids(home, sync=True)
        assert ids(home, nxt="FR") == "FR-3", ids(home, nxt="FR")
        assert ids(home, nxt="q") == "q-02"
        assert quote("return  b.lastSeq -\n a.lastSeq", [repo])
        assert not quote("return a.lastSeq", [repo])
        os.makedirs(os.path.join(home, "record"), exist_ok=True)
        with open(os.path.join(home, "record", "log.md"), "a") as f:
            f.write("\n## 2026-10-26 10:00 · init · abc123 · blueprint-feature v1\n- open\n")
        assert lock(home)["open"].startswith("2026-10-26 10:00 · init")
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
    s = sub.add_parser("hash"); s.add_argument("file")
    s = sub.add_parser("ids"); s.add_argument("home"); s.add_argument("--sync", action="store_true")
    s.add_argument("--next", choices=["FR", "CH", "KEEP", "D", "S", "q", "B"])
    s = sub.add_parser("lock"); s.add_argument("home")
    sub.add_parser("selftest")
    a = ap.parse_args(argv)

    if a.cmd == "selftest":
        return selftest()
    if a.cmd == "hash":
        h = sha(a.file)
        print(h, h[:12])
        return 0
    if a.cmd == "quote":
        hits = quote(a.text, a.paths)
        print("\n".join(hits) if hits else "not found")
        return 0 if hits else 1
    home = os.path.abspath(a.home)
    if a.cmd == "scaffold":
        made = scaffold(home, a.name)
        print(f"home: {home}")
        print("created: " + (", ".join(made) if made else "nothing (all files existed)"))
        return 0
    if not os.path.isdir(home):
        print(f"no feature home at {home}", file=sys.stderr)
        return 2
    if a.cmd == "lint":
        errs, warns = lint(home)
        if a.json:
            print(json.dumps({"errors": errs, "warnings": warns}, indent=1))
        else:
            for e in errs:
                print("ERROR  " + e)
            for w in warns:
                print("warn   " + w)
            print(f"lint: {len(errs)} errors, {len(warns)} warnings")
        return 1 if errs else 0
    if a.cmd == "counts":
        c = counts(home)
        if a.json:
            print(json.dumps(c, indent=1))
        else:
            for k, v in c.items():
                print(f"{k}: {v}")
        return 0
    if a.cmd == "anchors":
        texts = []
        if a.facts:
            texts.append(("facts", read(a.facts)))
        for n in ("baseline.md", "FEATURE.md"):
            p = os.path.join(home, n)
            if os.path.exists(p):
                texts.append((n, read(p)))
        r = check_anchors(home, texts, a.workspace)
        bad = [x for x in r["anchors"] if x.get("state") != "ok" or x.get("file_changed_since_baseline")]
        if a.json:
            print(json.dumps(r, indent=1))
        else:
            print(f"workspace: {r['workspace']}")
            for rp in r["repos"]:
                moved = "" if rp["head"] and rp["baseline"].startswith(rp["head"][:7]) else f" → HEAD {rp['head']}"
                print(f"repo {rp['repo']}: baseline {rp['baseline']}{moved}; anchored files changed: "
                      f"{', '.join(rp['anchored_files_changed']) or 'none'}")
            for x in r["anchors"]:
                flag = x.get("state", "?") + (" · file changed since baseline" if x.get("file_changed_since_baseline") else "")
                if x in bad:
                    print(f"STALE  {x['in']} {x.get('fact') or ''} `{x['path']}:{x['line']}` — {flag}")
            print(f"anchors: {len(r['anchors'])} checked, {len(bad)} need attention")
        return 1 if bad else 0
    if a.cmd == "ids":
        if a.next:
            print(ids(home, sync=a.sync, nxt=a.next))
        else:
            r = ids(home, sync=a.sync)
            print(json.dumps({p: len(v) for p, v in r.items()}))
        return 0
    if a.cmd == "lock":
        l = lock(home)
        if not l:
            print("no open run")
            return 0
        print(f"open run: {l['open']} · last log write {l['minutes_since_last_write']} min ago")
        return 2 if l["minutes_since_last_write"] < 30 else 1
    return 2


if __name__ == "__main__":
    sys.exit(main())
