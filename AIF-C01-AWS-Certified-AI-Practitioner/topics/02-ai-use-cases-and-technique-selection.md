# 02 — AI use cases and technique selection

**Domain 1 (20%) · Task Statement 1.2**

## What it is

When AI/ML adds value, when it does not, which classical technique fits (regression / classification / clustering), and which **AWS managed AI service** or **FM** to pick for a business scenario.

## Why it matters for AIF-C01

High volume of “which approach / which service?” questions. You must distinguish **purpose-built AI services** vs **traditional ML** vs **foundation models**.

## What to know for the exam

### When AI/ML helps

- Assist human decision-making at scale (risk scores, recommendations).
- Automation of repetitive perception tasks (transcribe, translate, extract).
- Scalability: same model serves millions of similar decisions.
- Personalization, forecasting, fraud detection, knowledge search, agentic workflows.

### When AI/ML is **not** appropriate

- Cost > benefit (tiny volume; rules already accurate).
- Need a **deterministic, exact** outcome (tax calculation, ledger balance) — not a probabilistic prediction.
- No usable data / labels and no acceptable FM shortcut.
- Regulatory requirement for fully explainable rules that an opaque model cannot meet (prefer rules or transparent classical ML).

### Technique selection

| Technique | Output | Typical use |
|---|---|---|
| **Regression** | Continuous number | Price, demand, remaining useful life |
| **Classification** | Discrete class(es) | Spam, fraud, sentiment polarity |
| **Clustering** | Groups without labels | Segmentation, anomaly grouping |

### Real-world application map

| Application | Often solved with |
|---|---|
| Computer vision | Rekognition or custom CV on SageMaker |
| NLP understanding (entities, sentiment) | Comprehend or LLM |
| Speech ↔ text | Transcribe / Polly |
| Conversational bots (intents) | Lex |
| Recommendations | Personalize or custom ML |
| Forecasting | Traditional ML / time-series |
| Enterprise Q&A over docs | Knowledge Bases / RAG (Bedrock) or Quick |
| Open-ended generation / agents | Bedrock + agents / AgentCore |

### Traditional ML vs foundation models

| Factor | Prefer traditional ML | Prefer FM / GenAI |
|---|---|---|
| Data | Clean tabular labels | Unstructured text/images; few labels |
| Explainability | High need | Lower need or HITL review |
| Task | Fixed prediction schema | Language, summarization, generation |
| Ops / cost | Smaller models, predictable | Token/API cost; latency variance |
| Regulation | Strict audit of features | Needs Guardrails + governance |

## AWS managed AI/ML services (exam map)

| Service | Capability |
|---|---|
| **Amazon SageMaker AI** | Build, train, deploy custom ML/FM workloads |
| **Amazon Transcribe** | Speech → text |
| **Amazon Translate** | Language translation |
| **Amazon Comprehend** | NLP: entities, sentiment, PII, topics |
| **Amazon Lex** | Chatbots / voice bots (NLU + dialog) |
| **Amazon Polly** | Text → speech |
| Also know (in-scope ecosystem) | Rekognition (vision), Textract (docs), Personalize, Bedrock (FMs) |

**Selection heuristic:** If a purpose-built API already solves a narrow task (transcribe audio), prefer it over prompting an LLM — usually cheaper, more consistent, easier to govern.

## Practical study tips

- Drill scenarios: “call center transcript → insights” = Transcribe + Comprehend (or Bedrock for free-form summary).
- Always ask: prediction vs generation vs retrieval vs agent tools.
- Remember exam guide examples: assist decisions, scalability, automation; reject AI when a specific deterministic outcome is required.

## Common exam traps

- Using an LLM for a job Comprehend/Textract/Rekognition already does well.
- Picking clustering for a labeled classification problem (or vice versa).
- Forcing GenAI when regulations demand classical explainable models.
- Assuming SageMaker is required for every AI use case (Bedrock / managed AI often enough).

## Exam guide mapping

- **Task Statement 1.2** — Identify practical use cases for AI (value vs not appropriate; regression/classification/clustering; real-world apps; AWS managed AI capabilities; traditional ML vs FMs).

## Research links

- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html
- https://aws.amazon.com/ai/services/
- https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html
- https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html
- https://docs.aws.amazon.com/transcribe/latest/dg/what-is-transcribe.html
- https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html
- https://aws.amazon.com/certification/certified-ai-practitioner/
