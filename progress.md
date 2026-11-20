---
title: "Progress sync"
retention: true
retention_order: 7
retention_blurb: "Export checkboxes from one browser, commit them to the repo, and every device starts from the same place."
---

# Progress sync

Checkboxes on this site save to the browser you clicked them in. That's fast and private, but my laptop doesn't know what I checked on my phone. So the repo is the source of truth, and each browser keeps local changes on top of it.

```text
 browser A --export--> progress.json
                            |
                  sync_progress.py --write
                            |
                            v
        markdown [x]  +  _data/progress.json --git push--> site
                                                            |
 browser B, C, ... <---- same baseline everywhere ----------+
```

**How state resolves:** a local change in this browser wins. If there isn't one, whatever is committed to the repo applies. Unchecking something the repo says is done stores an explicit "not done" locally, so it sticks until the next sync.

## This browser

<div class="progress-box" data-progress-tools markdown="0">
  <div class="hdr" data-out>$ loading...</div>
  <p>
    <button type="button" data-export>export progress.json</button>
    <button type="button" data-copy>copy to clipboard</button>
    <label class="btn">import progress.json <input type="file" accept="application/json,.json" data-import hidden></label>
    <button type="button" data-reset>reset local progress</button>
  </p>
</div>

## Commit it to the repo

From a clone of the repo:

```sh
python3 scripts/sync_progress.py ~/Downloads/progress.json          # dry run: shows what would change
python3 scripts/sync_progress.py ~/Downloads/progress.json --write  # updates the markdown + _data/progress.json
git add -A && git commit -m "Progress sync" && git push
```

The script does two things:

1. **Flips the checkboxes in the markdown.** Punch-list items for topics I've marked done, plus the progress-tracker and checklist items on READMEs and workbooks. So GitHub's own view of the repo shows the same progress.
2. **Writes `_data/progress.json`.** That's the baseline every browser loads, including the topic "mark done" toggles and the meters on the home page.

After the push and the Pages rebuild, any browser sees the same progress. Then hit **reset local progress** on the device you exported from, so the repo is the only source again.

It's Python 3 with only the standard library. Nothing to install.

Back to the [curriculum home](index.md).
