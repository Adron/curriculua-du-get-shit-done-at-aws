#!/usr/bin/env python3
"""Sync a progress.json export from the site back into the repo.

    python3 scripts/sync_progress.py progress.json           # dry run
    python3 scripts/sync_progress.py progress.json --write   # apply

Keys in the export look like:
    done:/curriculum-2027/AIF-C01-.../topics/01-ai-ml-terminology-and-concepts   -> "1" | "0"
    task:/curriculum-2027/AIF-C01-.../#3                                         -> "1" | "0"
    task:/curriculum-2027/AIF-C01-.../workbooks/03-foundation-model-applications#12

"done:" keys flip the matching topic line in that cert's PUNCH-LIST.md.
"task:" keys flip the Nth task-list item ("- [ ]") in the page's source markdown.
Everything also lands in _data/progress.json, which every browser loads as its baseline.
Standard library only.
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TASK_RE = re.compile(r"^(\s*[-*+] )\[( |x|X)\]")


def load_base():
    m = re.search(r'^baseurl:\s*"?([^"\n]*)"?', (ROOT / "_config.yml").read_text(), re.M)
    return (m.group(1) if m else "").rstrip("/")


def source_for(path, base):
    """Map a site path (no .html) to its markdown source file, or None."""
    if base and path.startswith(base):
        path = path[len(base):]
    path = path.lstrip("/")
    if path == "":
        return ROOT / "index.md"
    if path.endswith("/"):
        for name in ("README.md", "index.md"):
            if (ROOT / path / name).exists():
                return ROOT / path / name
        return None
    f = ROOT / (path + ".md")
    return f if f.exists() else None


def is_on(v):
    return v in ("1", 1, True)


def set_mark(line, on):
    return TASK_RE.sub(lambda m: m.group(1) + ("[x]" if on else "[ ]"), line, count=1)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("export", help="progress.json exported from the site")
    ap.add_argument("--write", action="store_true", help="apply changes (default is a dry run)")
    args = ap.parse_args()

    base = load_base()
    data = json.loads(Path(args.export).read_text())
    items = data.get("items", data)

    files = {}      # Path -> list of lines
    changes = []    # (file, line no, before, after)
    skipped = []

    def lines_of(f):
        if f not in files:
            files[f] = f.read_text().split("\n")
        return files[f]

    def flip(f, idx, on, why):
        lines = lines_of(f)
        new = set_mark(lines[idx], on)
        if new != lines[idx]:
            changes.append((f, idx + 1, lines[idx].strip(), new.strip(), why))
            lines[idx] = new

    for key, value in sorted(items.items()):
        on = is_on(value)
        kind, _, rest = key.partition(":")
        if kind == "done":
            topic = rest.rstrip("/").rsplit("/", 1)[-1]
            cert_dir = source_for(rest.rsplit("/topics/", 1)[0] + "/", base)
            punch = cert_dir.parent / "PUNCH-LIST.md" if cert_dir else None
            if not punch or not punch.exists():
                skipped.append((key, "no punch list"))
                continue
            hits = [i for i, l in enumerate(lines_of(punch)) if TASK_RE.match(l) and f"topics/{topic}.md" in l]
            if not hits:
                skipped.append((key, "topic not on punch list"))
            for i in hits:
                flip(punch, i, on, key)
        elif kind == "task":
            path, _, n = rest.rpartition("#")
            src = source_for(path, base)
            if not src or not n.isdigit():
                skipped.append((key, "no source page"))
                continue
            tasks = [i for i, l in enumerate(lines_of(src)) if TASK_RE.match(l)]
            n = int(n)
            if n < 1 or n > len(tasks):
                skipped.append((key, f"page has {len(tasks)} task items"))
                continue
            flip(src, tasks[n - 1], on, key)
        else:
            skipped.append((key, "unknown key"))

    # Baseline for browsers: keep only "done" entries that are on, plus task entries that are on.
    baseline_path = ROOT / "_data" / "progress.json"
    baseline = {k: "1" for k, v in sorted(items.items()) if is_on(v) and k.split(":", 1)[0] in ("done", "task")}
    old_baseline = json.loads(baseline_path.read_text()) if baseline_path.exists() else {}

    for f, ln, before, after, _ in changes:
        print(f"{f.relative_to(ROOT)}:{ln}\n  - {before}\n  + {after}")
    for key, why in skipped:
        print(f"skip {key}: {why}", file=sys.stderr)
    print(f"\n{len(changes)} checkbox change(s); _data/progress.json: {len(old_baseline)} -> {len(baseline)} entries")

    if not args.write:
        print("dry run. re-run with --write to apply.")
        return
    for f, lines in files.items():
        f.write_text("\n".join(lines))
    baseline_path.parent.mkdir(exist_ok=True)
    baseline_path.write_text(json.dumps(baseline, indent=2) + "\n")
    print("written. now: git add -A && git commit -m 'Progress sync' && git push")


if __name__ == "__main__":
    main()
