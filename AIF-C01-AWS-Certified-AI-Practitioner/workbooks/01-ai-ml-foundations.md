---
layout: default
title: "Workbook 01 — AI/ML Foundations"
---

# Workbook 01 — AI/ML Foundations

**Covers:** [topics/01](../topics/01-ai-ml-terminology-and-concepts.md) · [02](../topics/02-ai-use-cases-and-technique-selection.md) · [03](../topics/03-ai-ml-lifecycle-and-mlops-basics.md)  
**Domain:** 1 — Fundamentals of AI and ML (20%)  
**Prerequisites:** Read cert [README](../README.md) once; skim topics 01–03. Cloud/SWE background assumed; no ML coding required.  
**Estimated time:** 3–4 hours  
**Nav:** [Workbooks home](./README.md) · [Punch list](../PUNCH-LIST.md)

---

## Learning objectives

By the end of this workbook you can:

1. Distinguish AI, ML, DL, GenAI, and agentic AI in one sentence each, and place them in the hierarchy.
2. Classify a scenario as supervised, unsupervised, or reinforcement learning, and as training vs inference.
3. Choose regression vs classification vs clustering, and pick a purpose-built AWS AI service vs traditional ML vs FM when given a business need.
4. Order lifecycle stages and map Bedrock vs SageMaker hosting; pick precision vs recall for a business story.
5. Spot Domain 1 exam traps (deterministic tasks, accuracy-only on imbalanced data, wrong service persona).

---

## Activate prior knowledge

Answer in 2–3 minutes each (no notes):

1. In your last project that “used AI,” was it **prediction**, **generation**, or **rules**? How do you know?
2. What is one task at work that must be **exact** (not probabilistic)? Would you use ML there?
3. Have you called a managed API (Rekognition, Transcribe, Bedrock, etc.) vs hosted your own model? What ops difference did you feel?

---

## Concept refresh (do not paste notes — skim links)

| Idea | One-liner | Deep dive |
|---|---|---|
| Hierarchy | AI ⊃ ML ⊃ DL → FMs/GenAI → agentic (tools + memory) | [01](../topics/01-ai-ml-terminology-and-concepts.md) |
| Learning types | Labels → supervised; structure → unsupervised; rewards → RL | [01](../topics/01-ai-ml-terminology-and-concepts.md) |
| Technique pick | Continuous → regression; class → classification; groups → clustering | [02](../topics/02-ai-use-cases-and-technique-selection.md) |
| Service heuristic | Narrow perception task → purpose-built API; tabular predict → ML; language/gen → FM | [02](../topics/02-ai-use-cases-and-technique-selection.md) |
| Lifecycle | Problem → prep → train/select → evaluate → deploy → monitor/retrain | [03](../topics/03-ai-ml-lifecycle-and-mlops-basics.md) |
| Hosting | Bedrock = managed FM API; SageMaker = you size/host | [03](../topics/03-ai-ml-lifecycle-and-mlops-basics.md) |
| Metrics | Precision (few false alarms) vs recall (catch rares); pair with business KPIs | [03](../topics/03-ai-ml-lifecycle-and-mlops-basics.md) |

---

## Retrieval practice (closed-book)

Write answers before opening the answer key.

1. Draw or list the AI → ML → DL → FM/GenAI → agentic hierarchy.
2. Training vs inference: which is usually more expensive compute *per run*, and which runs continuously in production APIs?
3. Customer segments with **no** purchase labels: supervised or unsupervised? Technique name?
4. Predict next-quarter revenue (dollars): regression, classification, or clustering?
5. Call-center audio → searchable text: which AWS managed service first?
6. Tax total from line items must match ledger: GenAI, classical ML, or rules/deterministic system?
7. Name four lifecycle stages after “business problem defined.”
8. When would you prefer SageMaker endpoints over Bedrock for an FM-like workload?
9. Fraud is rare. Optimizing accuracy alone is dangerous because…?
10. Precision vs recall in one sentence each, for a spam filter that users hate false positives on.

---

## Worked example → guided → independent

### Worked example (study this)

**Scenario:** An insurer wants to flag claims that are likely fraudulent *before* adjusters review them. Historical claims have “fraud / not fraud” labels. Volume is high; false negatives are costly.

**Reasoning:**

| Question | Answer |
|---|---|
| AI type? | Traditional supervised ML (classification), not GenAI |
| Why not GenAI? | Fixed binary prediction on structured claims features |
| Metric priority? | High **recall** (catch fraud) with tunable precision; track $ prevented (business) |
| Lifecycle gap risk? | Deploy without monitoring drift in claim patterns |
| AWS direction? | Train/host on **SageMaker AI**; not Transcribe/Lex |

---

### Guided practice

Complete the blanks, then check the answer key.

**G1.** A retailer wants groups of shoppers who “behave alike” for campaigns. No target label exists.  
Technique: ________ | Learning type: ________ | Trap to avoid: ________

**G2.** Product images must detect “damaged packaging” at warehouse cameras. Prefer purpose-built ________ or custom CV on ________. Prefer GenAI only if ________.

**G3.** Nightly score 50M users for churn probability → batch ________. Live chatbot reply → ________ inference.

**G4.** Team says “accuracy is 99%” on fraud (0.5% base rate). Ask them for ________ and ________, plus business metric ________.

---

### Independent practice

- [ ] **I1.** Write a 5-row decision table: business need → technique (reg/clf/cluster/GenAI/agentic) → AWS service → one reason *not* to use an FM.
- [ ] **I2.** Map your current (or a fictional) product through the six lifecycle stages. Mark where metrics are defined and where monitoring lives.
- [ ] **I3.** For each: Transcribe, Comprehend, Lex, Polly, Bedrock, SageMaker — write one sentence “reach for this when…”.

---

## Scenario / decision exercises

Mark your choice, then justify in one line.

**S1.** CFO wants an AI that “always calculates the correct VAT.”  
- [ ] A) Fine-tune an LLM on tax docs  
- [ ] B) Deterministic rules / tax engine  
- [ ] C) Unsupervised clustering of invoices  

**S2.** Support wants summaries of long ticket threads for agents.  
- [ ] A) Bedrock / GenAI summarization (with review)  
- [ ] B) K-means clustering  
- [ ] C) Regression on ticket IDs  

**S3.** Marketing has unlabeled clickstream and wants “natural” segments.  
- [ ] A) Classification  
- [ ] B) Clustering  
- [ ] C) RLHF  

**S4.** Startup needs speech → text for podcasts, cheap and reliable.  
- [ ] A) Prompt Claude to “listen”  
- [ ] B) Amazon Transcribe  
- [ ] C) JumpStart image model  

**S5.** You need custom model weights, VPC-only endpoints, and full MLOps control.  
- [ ] A) Bedrock on-demand only  
- [ ] B) SageMaker AI hosting  
- [ ] C) Amazon Quick  

**S6.** Model metric F1 is good, but CSAT dropped. Next step?  
- [ ] A) Ignore CSAT — F1 is enough for AIF  
- [ ] B) Investigate business/UX metrics and monitoring  
- [ ] C) Immediately pre-train a new FM from scratch  

---

## Hands-on lab

### Option A — AWS Console (~45–60 min)

Prereq: AWS account with permission to open service consoles (read-only is fine).

- [ ] **L1.** Open [Amazon SageMaker AI](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html) console → note Studio / JumpStart entry points (do not need to launch training).
- [ ] **L2.** Open [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) → Model access / playground area; list 3 model providers you see (or note Region availability).
- [ ] **L3.** From the console search bar, open Transcribe, Comprehend, Lex, Polly pages (or docs). For each, write the one-line capability in your notes.
- [ ] **L4.** Sketch on paper: “Call recording → Transcribe → Comprehend sentiment → dashboard.” Label which stages are AI services vs your app.

### Option B — Paper architecture (no account)

- [ ] Draw a system that: (1) predicts equipment failure days remaining (regression), (2) clusters plants by failure pattern, (3) offers a GenAI assistant over maintenance manuals. Label technique + AWS service per box. Mark training vs inference paths.

---

## Common misconceptions / exam traps

| Trap | Better mental model |
|---|---|
| GenAI for every problem | Prefer purpose-built APIs for narrow perception; ML for tabular prediction |
| Training = inference | Training fits weights; inference serves predictions/generations |
| Clustering needs labels | Unsupervised — labels would make it classification |
| Accuracy alone | Imbalanced data: check precision/recall/F1 + business KPI |
| Bedrock when you need custom host control | SageMaker / JumpStart for self-hosted weights |
| Skip business metrics | Model metrics ≠ ROI / CSAT / cost per decision |
| AI for deterministic ledgers | Rules / exact calculation systems |

---

## Reflection / teach it back

Without notes, explain to a teammate (or record yourself, 3–5 min):

1. The hierarchy and when you’d pick GenAI vs classical ML.  
2. One service-selection story (Transcribe vs LLM).  
3. Precision vs recall with a fraud or spam example.  
4. Why MLOps includes monitoring and retraining, not only deploy.

---

## Mastery checklist

- [ ] Can define AI/ML/DL/GenAI/agentic without peeking
- [ ] Correctly classifies 5 new scenarios as supervised/unsupervised/RL
- [ ] Maps regression/classification/clustering correctly
- [ ] Names ≥6 purpose-built AI services and when to use each
- [ ] Orders lifecycle and contrasts Bedrock vs SageMaker hosting
- [ ] Explains precision/recall and why accuracy can mislead
- [ ] Retrieval section ≥8/10 correct before answer key review
- [ ] Hands-on or paper lab complete

**Exit:** Checklist done → mark Domain 1 items on [PUNCH-LIST.md](../PUNCH-LIST.md) → proceed to [Workbook 02](./02-genai-fundamentals.md).

---

## Answer key

<details>
<summary>Retrieval practice</summary>

1. AI → ML → DL → FMs/LLMs/GenAI apps → agentic (tools, memory, orchestration).  
2. Training is expensive per job; inference runs ongoing (real-time/batch/async) — both cost money, but production inference is continuous.  
3. Unsupervised; clustering.  
4. Regression (continuous).  
5. Amazon Transcribe (optionally + Comprehend/Bedrock later).  
6. Rules / deterministic system — not probabilistic AI.  
7. Prep/features → train/select → evaluate → deploy → monitor/retrain (wording may vary).  
8. Need custom weights, instance control, VPC/network posture, or JumpStart open models you host.  
9. Majority class dominates accuracy; you can miss almost all fraud and still look “accurate.”  
10. Precision: of flagged spam, how many truly spam (users hate false positives → prioritize precision). Recall: of all spam, how much you catch.

</details>

<details>
<summary>Guided practice</summary>

**G1.** Clustering | Unsupervised | Don’t force classification without labels; don’t use GenAI “segments” as a substitute for clustering analysis without a plan.  
**G2.** Rekognition | SageMaker | You need open-ended multimodal reasoning or custom labels Rekognition can’t cover well.  
**G3.** Inference (batch) | Real-time inference.  
**G4.** Precision, recall (and/or F1); $ loss prevented / fraud catch rate / investigator hours.

</details>

<details>
<summary>Scenarios</summary>

**S1.** B — exact VAT is deterministic.  
**S2.** A — generation/summarization; HITL for quality.  
**S3.** B — unlabeled segments = clustering.  
**S4.** B — purpose-built speech-to-text.  
**S5.** B — SageMaker control plane.  
**S6.** B — pair model + business metrics; investigate.

</details>

<details>
<summary>Independent practice (sample direction)</summary>

**I1 example rows:** price forecast → regression → SageMaker → FM overkill; entity extraction from tickets → Comprehend or LLM → if schema fixed prefer Comprehend; policy Q&A → Bedrock RAG → not Transcribe; warehouse vision defect → Rekognition → not clustering; multi-step ops bot → agentic/Bedrock agents → not pure regression.

</details>
