# AWS Certified AI Practitioner (AIF-C01)

Foundational study pack for mid-2027: AI/ML/GenAI vocabulary, AWS AI service selection, foundation-model applications, responsible AI, and security/governance. You use AI on AWS; you do not need to build pipelines or train models from scratch.

## Cert overview

AWS Certified AI Practitioner validates foundational knowledge of artificial intelligence (AI), machine learning (ML), and generative AI concepts and use cases on AWS. It is the first cert in this study path (AIF → MLA → AIP). Target candidate: up to ~6 months exposure to AI/ML on AWS; uses solutions more than builds them.

Out of scope for the exam role: coding models, feature engineering, hyperparameter tuning, building/deploying pipelines, deep statistical analysis, implementing security/governance frameworks end-to-end.

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
| Recertification | Retake AIF-C01, **or** earn AWS Certified Machine Learning Engineer – Associate (MLA), which automatically recertifies AIF |
| Delivery | Pearson VUE or online proctored |

## Domain weights

| Domain | Weight | Study focus |
|---|---|---|
| 1. Fundamentals of AI and ML | 20% | Terminology, use cases, lifecycle, MLOps basics |
| 2. Fundamentals of GenAI | 24% | Tokens/embeddings/FMs, capabilities/limits, AWS GenAI stack |
| 3. Applications of Foundation Models | **28%** | RAG, agents, prompts, fine-tuning, evaluation (heaviest) |
| 4. Guidelines for Responsible AI | 14% | Bias, fairness, Guardrails, transparency, Model Cards |
| 5. Security, Compliance, and Governance | 14% | IAM, encryption, prompt injection, scoping matrix, governance services |

Domains 2 + 3 are over half the scored content. Prioritize FM applications (RAG vs fine-tune vs prompt; eval metrics; agents).

## Study path

1. Read this README + [PUNCH-LIST.md](./PUNCH-LIST.md); skim every topic once.
2. Read the [official exam guide (PDF)](https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.pdf).
3. Work punch-list topics by domain weight (3 → 2 → 1 → 4/5). Check boxes as you finish each topic doc.
4. AWS Skill Builder **Exam Prep Plan: AWS Certified AI Practitioner** + official practice question set / pretest.
5. Light Console time: Bedrock playground, Knowledge Bases overview, Guardrails test window, Prompt Management.
6. Official practice exam → schedule when consistently ≥80%.

Suggested duration: **2–3 weeks** at ~5–8 hrs/week if you already ship cloud work; compress if GenAI vocabulary is strong.

## How to use the topics docs

Each file under [`topics/`](./topics/) maps to one punch-list item and includes:

- What it is / why it matters for AIF-C01
- Exam-ready facts (tables, service maps, traps)
- Mapped exam-guide **task statements**
- **Research links** (official AWS docs used for that note)

Use punch-list checkboxes as your completion tracker. Do not memorize code; memorize *what / why / which AWS service* and tradeoffs (cost, latency, explainability, customization).

## Workbooks

Practice packs under [`workbooks/`](./workbooks/) turn topic notes into retrieval, judgment, and hands-on reps. Use them **after** a first skim of the linked topics; keep answer keys closed until you attempt each section.

| Workbook | Focus | Est. time |
|---|---|---|
| [00 — How to use / schedule](./workbooks/README.md) | Learning design, 2–3 week plan | — |
| [01 — AI/ML foundations](./workbooks/01-ai-ml-foundations.md) | Topics 01–03 · Domain 1 | 3–4 hrs |
| [02 — GenAI fundamentals](./workbooks/02-genai-fundamentals.md) | Topics 04–06 · Domain 2 | 4–5 hrs |
| [03 — Foundation model applications](./workbooks/03-foundation-model-applications.md) | Topics 07–10 · Domain 3 | 6–8 hrs |
| [04 — Responsible AI, security, governance](./workbooks/04-responsible-ai-security-governance.md) | Topics 11–14 · Domains 4–5 | 3–4 hrs |
| [05 — Capstone and exam-ready](./workbooks/05-capstone-and-exam-ready.md) | Mixed practice · ≥80% practice-exam gate | 4–6 hrs |

Suggested flow: topics skim → matching workbook → punch-list checkboxes → Skill Builder → official practice exam.

## Official links

| Resource | URL |
|---|---|
| Certification page | https://aws.amazon.com/certification/certified-ai-practitioner/ |
| Exam guide (HTML) | https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html |
| Exam guide (PDF) | https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.pdf |
| All exam guides | https://docs.aws.amazon.com/aws-certification/latest/examguides/aws-certification-exam-guides.html |
| AWS Skill Builder | https://skillbuilder.aws/ |
| Schedule (Pearson VUE) | https://www.pearsonvue.com/us/en/amazon.html |
| Amazon Bedrock | https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html |
| Amazon SageMaker AI | https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html |
| Responsible AI | https://aws.amazon.com/ai/responsible-ai/ |

## Tracker

Master checklist: **[PUNCH-LIST.md](./PUNCH-LIST.md)**
