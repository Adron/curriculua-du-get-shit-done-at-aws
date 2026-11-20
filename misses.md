---
title: "Miss logs"
retention: true
retention_order: 5
retention_blurb: "Every wrong answer, why I picked it, and when I redo it. The honest exam-readiness signal."
---

# Miss logs

A practice score tells me *how much* I got wrong. The miss log tells me *what* and *why*, and that's the part worth studying.

Every time I miss a question (a drill, a workbook, Skill Builder, the official practice exam, doesn't matter) it goes in the log for that cert. Three things get written down, and the third is the one that counts:

1. **The topic.** Which note it lives in.
2. **What I picked.** The wrong answer, exactly.
3. **Why I picked it.** Not "I didn't know." The actual reason: I confused training cost with inference cost, I reached for fine-tuning when RAG was the fix, I didn't read "least operational overhead." That reason is usually a pattern, and patterns repeat across questions.

| Cert | Miss log |
|---|---|
| AIF-C01 | [AIF-C01 misses](AIF-C01-AWS-Certified-AI-Practitioner/MISSES.md) |
| MLA-C02 | [MLA-C02 misses](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/MISSES.md) |
| AIP-C01 | [AIP-C01 misses](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/MISSES.md) |

## The weekly loop

- **Same day:** log it. Re-read the topic section it came from. Don't redo the question yet. Fresh off the answer key, it proves nothing.
- **3 days later:** redo it cold. Right, with the right reason? Mark it fixed. Wrong again? New redo date, and it goes in the *patterns* section.
- **Weekly:** read the patterns section top to bottom. If the same "why" shows up three times, that's a gap in understanding, not a gap in memory. Go back to the topic note and the workbook, not the flashcards.

## Booking rule

I book the exam when **both** are true:

- The official practice exam is consistently **≥80%**.
- **No open misses older than a week** in that cert's log.

The second rule is the one that keeps me honest. 80% with a pile of unresolved misses means I'm getting lucky on the same weak spots.

## Doing it in git

The logs are plain markdown in the repo, so every miss is a commit. `git log -p -- '*/MISSES.md'` is a study journal for free, and a fixed miss is a one-line diff from `no` to `yes`.

Back to the [curriculum home](index.md).
