---
title: "02: AI use cases and technique selection"
---

# 02: AI use cases and technique selection

**Domain 1 (20%) · Task Statement 1.2**

When does AI actually add value, and when is it the wrong tool? If it fits, which classic technique (regression, classification, clustering) matches the problem, and which **AWS managed AI service** or **FM** do you reach for?

This is the "which approach, which service?" topic, and the exam asks a lot of those. The skill is telling apart **purpose-built AI services**, **traditional ML**, and **foundation models**. In my experience that's also the skill that matters most on real projects. Half the job is talking someone out of an LLM when Textract already does the thing.

## What to know

### When AI/ML helps

- Assisting human decisions at scale (risk scores, recommendations).
- Automating repetitive perception tasks (transcribe, translate, extract).
- Scalability: one model serves millions of similar decisions.
- Personalization, forecasting, fraud detection, knowledge search, agentic workflows.

### When AI/ML is **not** the answer

- Cost outweighs benefit (tiny volume; rules are already accurate).
- You need a **deterministic, exact** outcome (tax calculation, ledger balance), not a probabilistic prediction.
- No usable data or labels, and no acceptable FM shortcut.
- Regulation demands fully explainable rules an opaque model can't meet. Use rules or transparent classical ML.

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
| NLP understanding (entities, sentiment) | Comprehend or an LLM |
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
| Explainability | High need | Lower need, or HITL review |
| Task | Fixed prediction schema | Language, summarization, generation |
| Ops / cost | Smaller models, predictable | Token/API cost; latency variance |
| Regulation | Strict audit of features | Needs Guardrails + governance |

## AWS services in play

| Service | Capability |
|---|---|
| **Amazon SageMaker AI** | Build, train, deploy custom ML/FM workloads |
| **Amazon Transcribe** | Speech → text |
| **Amazon Translate** | Language translation |
| **Amazon Comprehend** | NLP: entities, sentiment, PII, topics |
| **Amazon Lex** | Chatbots and voice bots (NLU + dialog) |
| **Amazon Polly** | Text → speech |
| Also know (in-scope ecosystem) | Rekognition (vision), Textract (docs), Personalize, Bedrock (FMs) |

**My rule of thumb:** if a purpose-built API already solves a narrow task (transcribe this audio), use it instead of prompting an LLM. Usually cheaper, more consistent, and easier to govern.

## Hands-on

- Drill scenarios out loud. "Call center transcript → insights" = Transcribe + Comprehend (or Bedrock for a free-form summary).
- For every scenario ask: is this **prediction**, **generation**, **retrieval**, or **agent tools**?
- Keep the exam guide's own examples handy: assist decisions, scalability, automation. Reject AI when a specific deterministic outcome is required.

## Exam traps

- Using an LLM for a job Comprehend, Textract, or Rekognition already does well.
- Picking clustering for a labeled classification problem (or the reverse).
- Forcing GenAI when regulations demand classical, explainable models.
- Assuming SageMaker is required for every AI use case. Bedrock or a managed AI service is often enough.

## Exam guide mapping

- **Task Statement 1.2**: Identify practical use cases for AI (value vs not appropriate; regression/classification/clustering; real-world apps; AWS managed AI capabilities; traditional ML vs FMs).

## Research links

- <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html>
- <https://aws.amazon.com/ai/services/>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html>
- <https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html>
- <https://docs.aws.amazon.com/transcribe/latest/dg/what-is-transcribe.html>
- <https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html>
- <https://aws.amazon.com/certification/certified-ai-practitioner/>