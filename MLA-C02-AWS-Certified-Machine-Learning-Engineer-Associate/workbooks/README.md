---
layout: default
title: MLA-C02 Workbooks
---

# MLA-C02 Workbooks

Active practice for **AWS Certified Machine Learning Engineer – Associate (MLA-C02)**. These workbooks turn the punch-list topic notes into retrieval drills, pipeline decisions, and hands-on / paper-architecture labs.

MLA is **builder-heavy**: every workbook stresses **pipelines**, an **IaC mindset** (SDK/CLI/CFN/CDK over click-ops), and **ops tradeoffs** (latency, cost, reliability, security). MLA-C02 GenAI additions — **Bedrock**, **RAG**, **agents**, **LLMOps** — are woven through Domains 1–4, not treated as a sidecar.

## How to use

1. Read the linked [`../topics/`](../topics/) notes for the workbook (open-book refresh).
2. Close the notes. Do **retrieval practice** from memory.
3. Work **worked → guided → independent**, then **scenarios**.
4. Run the **hands-on lab** (SageMaker / Bedrock / Glue) or the **paper architecture** fallback.
5. Check the **answer key at the end** only after you attempt answers.
6. Tick the **mastery checklist**; mark matching items in [`../PUNCH-LIST.md`](../PUNCH-LIST.md).

**Schedule the official practice exam when you are consistently ≥80%.** Capstone workbook 05 is the readiness gate.

| Resource | Link |
|---|---|
| Cert study pack | [../README.md](../README.md) |
| Punch list | [../PUNCH-LIST.md](../PUNCH-LIST.md) |
| Curriculum path | [../../index.md](../../index.md) |

## Workbook index

| # | Workbook | Topics | Domain |
|---|---|---|---|
| 01 | [Data preparation for ML and AI](./01-data-preparation-for-ml-and-ai.md) | 01–03 | Domain 1 (28%) |
| 02 | [Model and FM development](./02-model-and-fm-development.md) | 04–06 | Domain 2 (24%) |
| 03 | [Deployment and orchestration](./03-deployment-and-orchestration.md) | 07–09 | Domain 3 (24%) |
| 04 | [Operate, monitor, secure](./04-operate-monitor-secure.md) | 10–12 | Domain 4 (24%) |
| 05 | [Capstone: end-to-end pipeline](./05-capstone-end-to-end-pipeline.md) | 01–12 | All domains |

## Suggested 6–8 week schedule

Assume **~5–8 hrs/week**. Compress if you already ship SageMaker/Bedrock work; do **not** skip Domain 1 (heaviest weight) or the capstone.

| Week | Focus | Workbook / action | Exit criteria |
|---|---|---|---|
| 1 | Storage, formats, Feature Store, vectors | [01](./01-data-preparation-for-ml-and-ai.md) §1–6 + Glue/Parquet lab | Can choose S3/EFS/OpenSearch/pgvector and online vs offline features |
| 2 | Transforms, RAG chunking, DQ & bias | Finish [01](./01-data-preparation-for-ml-and-ai.md) | Can design ETL + chunking + Glue DQ gate |
| 3 | Approach selection + train/tune | [02](./02-model-and-fm-development.md) §1–6 | Can defend ML vs Bedrock vs RAG vs fine-tune |
| 4 | Eval, MLflow, RAG/FM metrics | Finish [02](./02-model-and-fm-development.md) | Can pick metrics + shadow/eval gates |
| 5 | Deploy targets + provisioning | [03](./03-deployment-and-orchestration.md) §1–6 | Can pick real-time/async/serverless/batch + Bedrock PT |
| 6 | CI/CD, registry, KB refresh, agents | Finish [03](./03-deployment-and-orchestration.md) | Can sketch IaC pipeline with rollback |
| 7 | Monitor, cost, secure, Guardrails | [04](./04-operate-monitor-secure.md) | Can design alarms, token cost controls, least privilege |
| 8 | Capstone + practice exam | [05](./05-capstone-end-to-end-pipeline.md) + Skill Builder practice | E2E design complete; practice **≥80%** → schedule |

**Alternate path (6 weeks):** Weeks 1–2 = Domains 1–2; Weeks 3–4 = Domains 3–4; Weeks 5–6 = Capstone + practice exam loops. Still do Domain 1 first.

## Learning structure (every workbook)

1. Learning objectives  
2. Prerequisites + time  
3. Activate prior knowledge  
4. Concept refresh (links to topics — not full paste)  
5. Closed-book retrieval practice  
6. Worked → guided → independent practice  
7. Scenario / decision exercises  
8. Hands-on labs (SageMaker / Bedrock / Glue) + paper fallback  
9. Misconceptions / traps  
10. Reflection  
11. Mastery checklist  
12. Answer key (**at the end**)

## Lab hygiene

- Prefer **programmatic** deploy (SDK / CLI / Boto3 / CloudFormation) over console-only paths.
- Tear down endpoints, Provisioned Throughput, and OpenSearch domains when done.
- Paper architecture is valid exam prep when you lack account access — still write concrete service choices and IaC steps.
