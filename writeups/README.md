---
title: "Build write-ups"
retention: true
retention_order: 6
retention_blurb: "One post per build milestone. Explaining it in public is the strongest retention tool there is."
---

# Build write-ups

Explaining something in public is the best retrieval practice I know of. I can't hand-wave past the parts I don't understand, because the post has a hole where they should be. So every [build milestone](../build.md) gets a write-up, and the write-ups go to [Composite Code](https://compositecode.blog).

**The rule:** write it within a day or two of finishing the milestone, from memory first. Then go back to the notes and fix what I got wrong. The fixes are the study session.

## How to use the template

1. Copy [TEMPLATE.md](TEMPLATE.md) to `writeups/YYYY-MM-DD-bN-short-slug.md`.
2. Fill in **What broke** and **What it cost** before anything else. Those are the parts I'll forget fastest.
3. Answer the milestone's three questions below. If I can't answer one without peeking, that's a gap. Note it in the cert's miss log too.
4. Draft the rest, publish it on the blog, and add the link to the build log table in [build.md](../build.md).

## The three questions per milestone

Each write-up has to answer these, in my own words, without the notes open.

| Milestone | Questions the post must answer |
|---|---|
| **B1** Playground | Why did higher temperature make factual answers worse? Why did none of the models know my posts? What would fix that, and why isn't the answer "a bigger model"? |
| **B2** First Knowledge Base | What happens between "file in S3" and "chunk in the index"? What did the citations show that the answers alone didn't? What did it do with a question the posts don't cover? |
| **B3** First Guardrail | Which attacks did the guardrail catch, and which got through? Why is the planted-instruction post scarier than a user typing "ignore previous instructions"? What does a guardrail *not* protect? |
| **B4** Ingest pipeline | Why Parquet? Which Data Quality rules caught real junk, and what was it? What happens on re-run when one new post lands? |
| **B5** Tag classifier | How imbalanced were the labels, and what did I do about it? Did tuning beat the baseline, and by how much on held-out data? Would a zero-shot FM have been the better call? |
| **B6** Retrieval lab | Which chunking and embedding combo won on recall@k, and by how much? Why measure retrieval separately from generation? What would I change for a corpus ten times bigger? |
| **B7** Ship it | Why that endpoint type? What gates the pipeline before a model gets registered and deployed? What did the rollback actually look like? |
| **B8** Watch it and lock it down | What's on the dashboard, and which alarm fired? What did least privilege cost me in debugging time? What's the monthly bill, and where does most of it go? |
| **B9** Production RAG API | How does a prompt version change reach production without a code deploy? How does streaming change the user's experience, and the error handling? What's the request path, box by box? |
| **B10** The agent | What stops it from looping forever? Where exactly does the human approval step block, and how did I prove it? Why MCP through Gateway instead of calling the tools directly? |
| **B11** Safety and governance | Which B3 attacks fail now, and which layer stops each one? What's logged, and what's deliberately *not*? What does the model card say this thing is not for? |
| **B12** Evals and ops | Show the CI run that blocked a bad prompt. What does a thousand questions cost, before and after caching and routing? Which troubleshooting runbook entry came from a real failure? |

## Write-ups so far

| Milestone | Post |
|---|---|
| _none yet_ | |

Back to [the build](../build.md).
