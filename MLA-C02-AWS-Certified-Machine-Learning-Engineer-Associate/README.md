---
title: "MLA-C02: AWS Certified Machine Learning Engineer – Associate"
---

# MLA-C02: AWS Certified Machine Learning Engineer – Associate

**Step 2 of 3** · Associate · $150 ($75 beta) · 6-8 weeks
**Path:** [home](../index.md) → [AIF-C01](../AIF-C01-AWS-Certified-AI-Practitioner/) → **MLA-C02** → [AIP-C01](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/)

This is where it stops being vocabulary and starts being plumbing. MLA-C02 checks that you can **build, operationalize, deploy, and maintain** ML and AI solutions on AWS, covering both traditional ML and foundation models. Data in, model trained, endpoint up, monitored, locked down.

The target candidate has about a year with **SageMaker AI**, **Amazon Bedrock**, and the related services, plus time in a neighboring role (backend, DevOps, data engineer, data scientist) touching both traditional ML and GenAI. Out of scope: full end-to-end solution architecture strategy, deep specialization across many domains, or inventing new integration patterns. That's AIP territory.

**This pack is not a substitute for hands-on labs.** At Associate level, reading alone won't hold. I'm doing all of it in IaC.

**I'm done with this one when** I can design a small end-to-end ML or RAG pipeline on AWS and explain how I'd deploy, monitor, and secure it.

## C02, not C01

Study **C02**. It's the updated version and it adds a lot of GenAI. Use C02-labeled Skill Builder and exam-guide materials.

| | MLA-C01 (retiring in English) | MLA-C02 (updated / beta) |
|---|---|---|
| Duration | 130 min | **170 min** |
| Questions | 65 | **~85** (beta format) |
| Cost | $150 | **$75 beta** / $150 GA |
| Focus | Traditional ML engineering | ML + **GenAI** (Bedrock, RAG), **agentic AI**, FM/LLM ops, responsible AI |
| Domains | Same four domain shells | Same shells, skills expanded for AI/FM |

**Added in C02:** vector DBs; embeddings and RAG chunking; FM selection and fine-tuning; Bedrock Knowledge Bases, agents, Prompt Management, Guardrails; AgentCore Observability; Custom Model Import; RAG/KB refresh pipelines; token, embedding, and vector cost patterns.

**Dropped or de-emphasized vs C01:** edge Neo optimization, some BYOC wording, a few C01-only infra troubleshooting items.

**Dates:** C01 English last day **2026-09-28**. C02 beta delivery started **2026-09-29**; beta registration opened **2026-09-01**.

## Exam snapshot

| Item | Detail |
|---|---|
| Exam code | MLA-C02 (beta code shows as ME1-C02 on some AWS pages) |
| Level | Associate |
| Duration | 170 minutes |
| Format | ~85 questions; multiple choice + multiple response |
| Scored / unscored | Typically 50 scored plus unscored items (beta may differ; check the AWS Certification site) |
| Pass score | Scaled **720** / 1000 |
| Cost | $75 beta / $150 GA |
| Languages (beta) | English only |
| Delivery | Pearson VUE or online proctored |
| Validity | 3 years, and passing **recertifies AIF-C01** too |

## Domain weights

| Domain | Weight |
|---|---|
| 1. Data Preparation for ML and AI | **28%** |
| 2. ML Model and Foundation Model (FM) Development | **24%** |
| 3. Deployment and Orchestration of ML and AI Workflows | **24%** |
| 4. Operating, Monitoring, and Securing ML and AI Solutions | **24%** |

Data prep is the heaviest, and in my experience it's where people get surprised. Do Domain 1 first, then alternate Domain 2 training topics with Domain 3/4 deploy-and-ops topics so the GenAI and RAG material sticks to the operational patterns around it.

## Study plan

1. Read the [MLA-C02 exam guide (PDF)](https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf).
2. Follow the Skill Builder **Exam Prep Plan** for ML Engineer Associate (C02): practice question set, pretest, gap courses, official practice exam.
3. Work the [punch list](PUNCH-LIST.md) and the [workbooks](workbooks/) domain by domain.
4. **Hands-on, non-negotiable.** This is build milestones [B4-B8](../build.md#b4):
   - **Data:** S3 formats, Glue/DataBrew/EMR or Data Wrangler, Feature Store ingest, vector store / KB ingest
   - **Train/tune:** SageMaker built-in or script mode + AMT; track it with MLflow
   - **GenAI:** Bedrock invoke, Knowledge Bases RAG (chunking + retrieval), Prompt Management, a basic agent / AgentCore path
   - **Deploy:** real-time vs batch, async, and serverless endpoints; autoscaling; deploy from SDK/CLI/Boto3
   - **Ops and security:** CloudWatch + Model Monitor and evals, Guardrails, IAM least privilege, VPC isolation, encryption, secrets
5. Drill by domain. The usual weak spots are data prep and ops.
6. Book it when the practice exam is consistently **≥80%**.

Budget **6-8 weeks at 5-8 hrs/week** if you already ship some SageMaker or Bedrock work.

## What's in here

| Piece | What it's for |
|---|---|
| [PUNCH-LIST.md](PUNCH-LIST.md) | All 12 topics as checkboxes, grouped by domain |
| [topics/](topics/) | One note per topic: skills map, services, hands-on, traps, research links |
| [workbooks/](workbooks/) | Retrieval, scenarios, labs, capstone, all pointed at a ≥80% practice exam |

### Workbooks

| Workbook | Covers |
|---|---|
| [How to use + schedule](workbooks/README.md) | The **6-8 week** plan |
| [01: Data preparation](workbooks/01-data-preparation-for-ml-and-ai.md) | Topics 01-03 · Domain 1 (28%) |
| [02: Model and FM development](workbooks/02-model-and-fm-development.md) | Topics 04-06 · Domain 2 |
| [03: Deployment and orchestration](workbooks/03-deployment-and-orchestration.md) | Topics 07-09 · Domain 3 |
| [04: Operate, monitor, secure](workbooks/04-operate-monitor-secure.md) | Topics 10-12 · Domain 4 |
| [05: Capstone, end-to-end pipeline](workbooks/05-capstone-end-to-end-pipeline.md) | Data → train/FM → deploy → monitor → secure |

## Progress tracker

- [ ] Exam guide read (C02)
- [ ] Skill Builder prep plan complete
- [ ] Workbooks 01-05 done
- [ ] Build: B4 ingest pipeline, B5 tag classifier
- [ ] Build: B6 retrieval lab (Bedrock RAG basics)
- [ ] Build: B7 ship it, B8 monitor and lock down
- [ ] Official practice exam ≥80%
- [ ] Exam scheduled
- [ ] Passed (and AIF-C01 recertified for free)

## Official links

| Resource | Link |
|---|---|
| Cert page | <https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/> |
| Exam guide (HTML) | <https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.html> |
| Exam guide (PDF) | <https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf> |
| C01 vs C02 comparison | <https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/mla-02-comparison.html> |
| Skill Builder | <https://skillbuilder.aws/> |
| Schedule (Pearson VUE) | <https://www.pearsonvue.com/us/en/amazon.html> |
