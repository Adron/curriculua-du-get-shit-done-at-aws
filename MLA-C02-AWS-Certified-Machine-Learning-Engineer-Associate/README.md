# AWS Certified Machine Learning Engineer – Associate (MLA-C02)

Builder-oriented study pack for **MLA-C02** (updated / beta). Use this folder with the official exam guide and AWS Skill Builder — not as a substitute for hands-on labs.

## Cert overview

MLA-C02 validates that you can **build, operationalize, deploy, and maintain** AI/ML solutions and pipelines on AWS — covering **traditional ML and foundation models (FMs)**. Target candidate: ~1 year with **SageMaker AI**, **Amazon Bedrock**, and related ML engineering services, plus experience in a related role (backend, DevOps, data engineer, data scientist) with both traditional ML and GenAI.

Out of scope for the target role (exam expectation): full end-to-end solution architecture strategy, multi-domain deep specialization, or inventing broad new integration patterns.

## C02 vs C01 (study this version)

| | MLA-C01 (retiring English) | MLA-C02 (updated / beta) |
|---|---|---|
| Duration | 130 min | **170 min** |
| Questions | 65 | **~85** (beta format) |
| Cost | $150 | **$75 beta** / $150 GA |
| Focus | Traditional ML engineering | ML + **GenAI** (Bedrock, RAG), **agentic AI**, FM/LLM ops, responsible AI |
| Domains | Same four domain shells | Same shells; skills expanded for AI/FM |

**Key C02 additions:** vector DBs; embeddings & RAG chunking; FM selection/fine-tune; Bedrock Knowledge Bases / agents / Prompt Management / Guardrails; AgentCore Observability; Custom Model Import; RAG/KB refresh pipelines; token/embedding/vector cost patterns.

**Key C02 removals / de-emphasis (vs C01):** edge Neo optimization; some BYOC wording; a few C01-only infra troubleshooting items. Prefer C02-labeled Skill Builder materials.

**Recertification:** Validity **3 years**. Passing MLA also **auto-recertifies AIF-C01** (AI Practitioner).

## Exam snapshot

| Item | Detail |
|---|---|
| Exam code | MLA-C02 (beta exam code listed as ME1-C02 on some AWS pages) |
| Level | Associate |
| Duration | 170 minutes |
| Format | ~85 questions; multiple choice + multiple response |
| Scored / unscored | Typically 50 scored + unscored items (beta may differ; check AWS Certification site) |
| Pass score | Scaled **720** / 1000 |
| Cost | $75 beta / $150 GA |
| Languages (beta) | English only |
| Delivery | Pearson VUE or online proctored |
| Validity | 3 years |

C01 English last day: **2026-09-28**. C02 beta delivery begins **2026-09-29**. Registration for beta opened **2026-09-01**.

## Domain weights

| Domain | Weight |
|---|---|
| 1. Data Preparation for ML and AI | **28%** |
| 2. ML Model and Foundation Model (FM) Development | **24%** |
| 3. Deployment and Orchestration of ML and AI Workflows | **24%** |
| 4. Operating, Monitoring, and Securing ML and AI Solutions | **24%** |

Full task/skill checklist: **[PUNCH-LIST.md](./PUNCH-LIST.md)** → topic notes in [`topics/`](./topics/).

## Study path (hands-on required)

1. Read the [MLA-C02 exam guide (PDF)](https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf).
2. Follow Skill Builder **Exam Prep Plan** for ML Engineer Associate (C02): practice question set → pretest → gap courses → official practice exam.
3. **Hands-on labs (non-negotiable at Associate):**
   - Data: S3 formats, Glue/DataBrew/EMR or Data Wrangler, Feature Store ingest, vector store / KB ingest
   - Train/tune: SageMaker built-in or script mode + AMT; track with MLflow
   - GenAI: Bedrock invoke, Knowledge Bases RAG (chunking + retrieval), Prompt Management, basic agent / AgentCore path
   - Deploy: real-time vs batch/async/serverless endpoint; autoscaling; programmatic deploy (SDK/CLI/Boto3)
   - Ops/secure: CloudWatch + Model Monitor/evals, Guardrails, IAM least privilege, VPC isolation, encryption/secrets
4. Drill by domain using this pack’s topic files; schedule when practice exam is consistently **≥80%**.

Suggested duration from curriculum path: **6–8 weeks** at ~5–8 hrs/week if you already ship some SageMaker/Bedrock work.

## Official links

| Resource | URL |
|---|---|
| Cert page | https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/ |
| Exam guide (HTML) | https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.html |
| Exam guide (PDF) | https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf |
| C01 vs C02 comparison | https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/mla-02-comparison.html |
| Skill Builder | https://skillbuilder.aws/ |
| Schedule (Pearson VUE) | https://www.pearsonvue.com/us/en/amazon.html |
| Curriculum source | https://github.com/Adron/curriculum-2027 |

## How to use this folder

| File | Purpose |
|---|---|
| [PUNCH-LIST.md](./PUNCH-LIST.md) | Checklist of every key topic with links into `topics/` |
| [`topics/*.md`](./topics/) | Dense research notes: skills map, services, practice, traps, research links |
| [`workbooks/`](./workbooks/) | Active learning: retrieval, scenarios, labs, capstone → practice exam ≥80% |

Work Domain 1 first (heaviest), then alternate Domain 2 training topics with Domain 3/4 deploy-ops so GenAI/RAG sticks with operational patterns.

## Workbooks

Hands-on study path (pipelines, IaC mindset, ops tradeoffs, plus MLA-C02 GenAI: Bedrock, RAG, agents, LLMOps):

| Workbook | Covers |
|---|---|
| [workbooks/README.md](./workbooks/README.md) | How to use + **6–8 week** schedule |
| [01 — Data preparation](./workbooks/01-data-preparation-for-ml-and-ai.md) | Topics 01–03 · Domain 1 (28%) |
| [02 — Model and FM development](./workbooks/02-model-and-fm-development.md) | Topics 04–06 · Domain 2 |
| [03 — Deployment and orchestration](./workbooks/03-deployment-and-orchestration.md) | Topics 07–09 · Domain 3 |
| [04 — Operate, monitor, secure](./workbooks/04-operate-monitor-secure.md) | Topics 10–12 · Domain 4 |
| [05 — Capstone E2E pipeline](./workbooks/05-capstone-end-to-end-pipeline.md) | Full data → train/FM → deploy → monitor → secure |

Curriculum overview: [../../index.md](../../index.md).
