# AWS Certified Machine Learning Engineer – Associate (MLA-C02)

**Priority:** 2 of 3 · **Level:** Associate · **Cost:** $150 ($75 beta) · **Duration:** 6–8 weeks

**Goal:** Build, deploy, and operate ML and foundation-model solutions on AWS. Counts as **Technical**. Primary builder credential for ML Consulting / AI delivery staff. Auto-recertifies AIF-C01.

**Path:** [curriculum.md](curriculum.md) → [AIF-C01](AIF-C01 AWS Certified AI Practitioner.md) → **MLA-C02** → [AIP-C01](AIP-C01 AWS Certified Generative AI Developer – Professional.md)

> **Version note (late 2026):** Study **MLA-C02**. It adds GenAI (Bedrock, RAG), agentic AI, FM/LLM ops, and responsible AI across traditional ML and GenAI. Prefer current Skill Builder / exam-guide materials labeled MLA-C02.

---

## Exam snapshot

| Item | Detail |
|---|---|
| Duration | 170 minutes (C02) |
| Format | ~85 questions (C02 beta format) |
| Experience AWS recommends | ≥1 year with SageMaker AI, Bedrock, and related ML services |
| Validity | 3 years; also recertifies AI Practitioner |
| Official page | https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/ |
| Exam guide (PDF) | https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf |

### Exit criteria

Can prepare data, train/tune, deploy, and monitor ML + FM workloads on SageMaker/Bedrock; practice exam ≥80%.

---

## Domains (weight)

1. **Data Preparation for ML and AI** — 28%
2. **ML Model and Foundation Model (FM) Development** — 24%
3. **Deployment and Orchestration of ML and AI Workflows** — 24%
4. **Operating, Monitoring, and Securing ML and AI Solutions** — 24%

---

## Study plan

1. Read the [MLA-C02 exam guide (PDF)](https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf).
2. Follow Skill Builder **Exam Prep Plan** for ML Engineer Associate (C02).
3. Hands-on labs (non-negotiable for this level):
   - S3 / Glue / Feature Store style data prep paths
   - SageMaker training, tuning, endpoints, pipelines
   - Bedrock model invocation, Knowledge Bases / RAG, basic agent orchestration
   - CloudWatch / Model Monitor style observability; IAM and network isolation patterns
4. Practice questions by domain; drill weak areas (usually data prep + ops).
5. Official practice exam → schedule at ≥80%.

---

## Focus topics

- Ingest, clean, transform, feature engineering; train/val/test splits; data quality
- Algorithm / FM selection; hyperparameter tuning; fine-tuning vs continued pretraining vs RAG
- Batch vs real-time inference; serverless endpoints; orchestration (Pipelines, Step Functions, EventBridge)
- CI/CD for models; rollback; A/B or shadow deployment concepts
- Drift, latency, cost monitoring; encryption, VPC endpoints, secrets, least privilege
- GenAI additions in C02: Bedrock RAG architectures, agent workflows, LLMOps basics

---

## Done when

You can design a small end-to-end ML or RAG pipeline on AWS and explain how you would deploy, monitor, and secure it.

---

## Study habits for this phase

- **Official sources first:** exam guide + Skill Builder prep plan + official practice exams.
- **Hands-on required:** Console + IaC (CDK/Terraform/CloudFormation); reading alone will not hold.
- **Booking:** Pearson VUE; schedule only after practice-exam threshold.
- Passing this exam auto-recertifies [AIF-C01](AIF-C01 AWS Certified AI Practitioner.md).

---

## Progress tracker

- [ ] Exam guide read (C02)
- [ ] Skill Builder prep plan complete
- [ ] Hands-on: data prep + SageMaker path
- [ ] Hands-on: Bedrock RAG / agent basics
- [ ] Hands-on: deploy + monitor + secure
- [ ] Official practice exam ≥80%
- [ ] Exam scheduled / passed
