---
layout: default
title: MLA-C02 Workbooks
---

# MLA-C02 Workbooks

This is where the reading stops and the practice starts for **AWS Certified Machine Learning Engineer – Associate (MLA-C02)**. The topic notes tell you what's on the exam. These workbooks make you pull it back out of your head: retrieval drills, pipeline decisions, and hands-on labs (or paper architecture when there's no account handy).

MLA is a **builder** exam, so every workbook leans on the same three things: **pipelines**, an **IaC mindset** (SDK/CLI/CFN/CDK, not click-ops), and **ops tradeoffs** (latency, cost, reliability, security). The C02 GenAI material (**Bedrock**, **RAG**, **agents**, **LLMOps**) is woven through all four domains. It is not a sidecar, and I'm not treating it like one.

The labs line up with my running project, [Ask Composite Code](../../build.md), milestones [B4](../../build.md#b4) through [B8](../../build.md#b8). If you'd rather build your own thing, swap it in. Just build *something*.

## How to use

Same loop every time:

1. Read the linked [`../topics/`](../topics/) notes for the workbook. Open book, quick refresh.
2. Close the notes. Do the **retrieval practice** from memory. Yes, really closed.
3. Work **worked → guided → independent**, then the **scenarios**.
4. Run the **hands-on lab** (SageMaker / Bedrock / Glue), or the **paper architecture** fallback if you can't.
5. Only check the **answer key at the end** after you've actually attempted the answers.
6. Tick the **mastery checklist**, then mark the matching items in [`../PUNCH-LIST.md`](../PUNCH-LIST.md).

**Book the official practice exam once you're consistently at ≥80%.** Capstone workbook 05 is the readiness gate. Don't skip it.

| Resource | Link |
|---|---|
| Cert study pack | [../README.md](../README.md) |
| Punch list | [../PUNCH-LIST.md](../PUNCH-LIST.md) |
| Curriculum path | [../../index.md](../../index.md) |

## Workbook index

| # | Workbook | Topics | Domain |
|---|---|---|---|
| 01 | [Data preparation for ML and AI](./01-data-preparation-for-ml-and-ai.md) | 01-03 | Domain 1 (28%) |
| 02 | [Model and FM development](./02-model-and-fm-development.md) | 04-06 | Domain 2 (24%) |
| 03 | [Deployment and orchestration](./03-deployment-and-orchestration.md) | 07-09 | Domain 3 (24%) |
| 04 | [Operate, monitor, secure](./04-operate-monitor-secure.md) | 10-12 | Domain 4 (24%) |
| 05 | [Capstone: end-to-end pipeline](./05-capstone-end-to-end-pipeline.md) | 01-12 | All domains |

## Suggested 6-8 week schedule

I'm planning on **~5-8 hrs/week**. If you already ship SageMaker/Bedrock work, compress it. Just **don't** skip Domain 1 (it's the heaviest weight) or the capstone.

| Week | Focus | Workbook / action | Exit criteria |
|---|---|---|---|
| 1 | Storage, formats, Feature Store, vectors | [01](./01-data-preparation-for-ml-and-ai.md) §1-6 + Glue/Parquet lab | Can choose S3/EFS/OpenSearch/pgvector and online vs offline features |
| 2 | Transforms, RAG chunking, DQ & bias | Finish [01](./01-data-preparation-for-ml-and-ai.md) | Can design ETL + chunking + Glue DQ gate |
| 3 | Approach selection + train/tune | [02](./02-model-and-fm-development.md) §1-6 | Can defend ML vs Bedrock vs RAG vs fine-tune |
| 4 | Eval, MLflow, RAG/FM metrics | Finish [02](./02-model-and-fm-development.md) | Can pick metrics + shadow/eval gates |
| 5 | Deploy targets + provisioning | [03](./03-deployment-and-orchestration.md) §1-6 | Can pick real-time/async/serverless/batch + Bedrock PT |
| 6 | CI/CD, registry, KB refresh, agents | Finish [03](./03-deployment-and-orchestration.md) | Can sketch IaC pipeline with rollback |
| 7 | Monitor, cost, secure, Guardrails | [04](./04-operate-monitor-secure.md) | Can design alarms, token cost controls, least privilege |
| 8 | Capstone + practice exam | [05](./05-capstone-end-to-end-pipeline.md) + Skill Builder practice | E2E design complete; practice **≥80%** → schedule |

**Faster path (6 weeks):** Weeks 1-2 = Domains 1-2; Weeks 3-4 = Domains 3-4; Weeks 5-6 = capstone + practice exam loops. Domain 1 still goes first.

## Learning structure (every workbook)

Every workbook follows the same twelve-section shape, so once you've done one you know where everything is:

1. Learning objectives  
2. Prerequisites + time  
3. Activate prior knowledge  
4. Concept refresh (links to topics, not a full paste)  
5. Closed-book retrieval practice  
6. Worked → guided → independent practice  
7. Scenario / decision exercises  
8. Hands-on labs (SageMaker / Bedrock / Glue) + paper fallback  
9. Misconceptions / traps  
10. Reflection  
11. Mastery checklist  
12. Answer key (**at the end**)

## Lab hygiene

- Deploy **programmatically** (SDK / CLI / Boto3 / CloudFormation). Console-only paths don't count.
- Tear down endpoints, Provisioned Throughput, and OpenSearch domains when you're done. **That bill shows up whether you're studying or not.**
- Paper architecture is legit exam prep when you don't have account access. Still write down concrete service choices and IaC steps. "Use SageMaker" is not an architecture.
