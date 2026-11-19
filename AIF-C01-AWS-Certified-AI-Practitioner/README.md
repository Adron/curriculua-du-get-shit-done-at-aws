---
title: "AIF-C01: AWS Certified AI Practitioner"
---

# AIF-C01: AWS Certified AI Practitioner

**Step 1 of 3** · Foundational · $100 · 2-3 weeks
**Path:** [home](../index.md) → **AIF-C01** → [MLA-C02](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/) → [AIP-C01](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/)

This is the vocabulary cert. AI, ML, GenAI, foundation models, RAG, responsible AI, and which AWS service does what. It's the base layer that MLA-C02 and AIP-C01 build on, so even though it's the "easy" one, I'm not blowing through it.

The exam is aimed at people who *use* AI on AWS rather than build it: up to ~6 months of exposure, more consumer than builder. You won't be asked to code a model, engineer features, tune hyperparameters, build or deploy pipelines, do deep stats, or implement a full security or governance framework. What you will get asked, constantly, is **what is it, why would you use it, and which AWS service fits.**

**I'm done with this one when** I can answer "what / why / which service" questions cold, without needing pipeline or agent implementation detail.

## Exam snapshot

| Item | Detail |
|---|---|
| Exam code | AIF-C01 |
| Level | Foundational |
| Duration | 90 minutes |
| Questions | 65 total (50 scored + 15 unscored) |
| Formats | Multiple choice, multiple response, ordering, matching |
| Cost | $100 USD |
| Passing score | 700 / 1000 (compensatory scoring) |
| Validity | 3 years |
| Recertification | Retake AIF-C01, **or** pass MLA-C02, which recertifies AIF automatically |
| Delivery | Pearson VUE or online proctored |

## Domain weights

| Domain | Weight | Study focus |
|---|---|---|
| 1. Fundamentals of AI and ML | 20% | Terminology, use cases, lifecycle, MLOps basics |
| 2. Fundamentals of GenAI | 24% | Tokens, embeddings, FMs, capabilities and limits, the AWS GenAI stack |
| 3. Applications of Foundation Models | **28%** | RAG, agents, prompts, fine-tuning, evaluation (heaviest) |
| 4. Guidelines for Responsible AI | 14% | Bias, fairness, Guardrails, transparency, Model Cards |
| 5. Security, Compliance, and Governance | 14% | IAM, encryption, prompt injection, scoping matrix, governance services |

**Domains 2 and 3 are over half the scored content.** That's where the time goes: prompt vs RAG vs fine-tune, eval metrics, agents.

## Study plan

1. Read this page and the [punch list](PUNCH-LIST.md). Skim every topic once, quickly.
2. Read the [official exam guide (PDF)](https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.pdf).
3. Work the topics by exam weight: Domain 3, then 2, then 1, then 4 and 5.
4. Work the [workbooks](workbooks/), closed-book first.
5. Do build milestones [B1-B3](../build.md#b1): playground, first Knowledge Base, first Guardrail. Light console time is all this level needs.
6. AWS Skill Builder **Exam Prep Plan: AWS Certified AI Practitioner**, the official practice question set, and the pretest. Note the weak domains.
7. Official practice exam. Book it when I'm consistently ≥80%.

Budget about **2-3 weeks at 5-8 hrs/week** with cloud experience. Compress it if GenAI vocabulary is already solid.

## What's in here

| Piece | What it's for |
|---|---|
| [PUNCH-LIST.md](PUNCH-LIST.md) | All 14 topics as checkboxes, grouped by domain |
| [topics/](topics/) | One note per topic: what to know, AWS services, a hands-on bit, exam traps, task-statement mapping, research links |
| [workbooks/](workbooks/) | Retrieval practice, scenarios, labs, mastery checklists. Answer keys at the bottom. |

Don't memorize code. Memorize **what / why / which AWS service**, and the tradeoffs: cost, latency, explainability, customization.

### Workbooks

Use these *after* a first skim of the linked topics, and keep the answer keys closed until you've actually tried each section.

| Workbook | Focus | Est. time |
|---|---|---|
| [How to use + schedule](workbooks/README.md) | The 2-3 week plan | n/a |
| [01: AI/ML foundations](workbooks/01-ai-ml-foundations.md) | Topics 01-03 · Domain 1 | 3-4 hrs |
| [02: GenAI fundamentals](workbooks/02-genai-fundamentals.md) | Topics 04-06 · Domain 2 | 4-5 hrs |
| [03: Foundation model applications](workbooks/03-foundation-model-applications.md) | Topics 07-10 · Domain 3 | 6-8 hrs |
| [04: Responsible AI, security, governance](workbooks/04-responsible-ai-security-governance.md) | Topics 11-14 · Domains 4-5 | 3-4 hrs |
| [05: Capstone and exam-ready](workbooks/05-capstone-and-exam-ready.md) | Mixed practice · ≥80% practice-exam gate | 4-6 hrs |

## Progress tracker

- [ ] Exam guide read
- [ ] Every topic skimmed once
- [ ] Workbooks 01-05 done
- [ ] Build: B1 playground, B2 first Knowledge Base, B3 first Guardrail
- [ ] Skill Builder prep plan complete
- [ ] Official practice question set + pretest, weak domains noted
- [ ] Official practice exam ≥80%
- [ ] Exam scheduled
- [ ] Passed

## Official links

| Resource | Link |
|---|---|
| Certification page | <https://aws.amazon.com/certification/certified-ai-practitioner/> |
| Exam guide (HTML) | <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html> |
| Exam guide (PDF) | <https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.pdf> |
| All exam guides | <https://docs.aws.amazon.com/aws-certification/latest/examguides/aws-certification-exam-guides.html> |
| AWS Skill Builder | <https://skillbuilder.aws/> |
| Schedule (Pearson VUE) | <https://www.pearsonvue.com/us/en/amazon.html> |
| Amazon Bedrock | <https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html> |
| Amazon SageMaker AI | <https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html> |
| Responsible AI | <https://aws.amazon.com/ai/responsible-ai/> |
