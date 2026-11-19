---
title: "10: FM evaluation methods and metrics"
---

# 10: FM evaluation methods and metrics

**Domain 3 (28%) · Task Statement 3.4**

How you tell whether an FM (and the apps built on it: RAG, agents, workflows) actually meets quality and business goals. Human-in-the-loop, benchmarks, **Amazon Bedrock Model Evaluation**, automatic metrics like ROUGE, BLEU, and BERTScore, and LLM-as-judge.

Picking a model without evaluating it is a wrong answer on this exam, every time. You need the metric names, what each one measures, and when a human beats an automatic score. **"It sounds good" is not an eval.**

## What to know

### Evaluation approaches

| Approach | Use when |
|---|---|
| **Human-in-the-loop (HITL)** | Subjective quality, safety, brand voice, high-risk decisions |
| **Benchmark datasets** | Comparing models on public/standard tasks |
| **Amazon Bedrock Model Evaluation** | Compare and select FMs on custom metrics (accuracy, robustness, toxicity, etc.) |
| **Automatic metrics** | Scalable regression checks on text similarity / overlap |
| **LLM-as-judge** | Another model scores outputs against rubrics |
| **SageMaker Clarify / fmeval** | Bias, explainability, FM eval libraries (ecosystem) |

### Text metrics (memorize the names)

| Metric | Focus |
|---|---|
| **ROUGE** | Overlap with reference summaries (recall-oriented n-grams) |
| **BLEU** | Precision-oriented n-gram overlap (classic machine translation metric) |
| **BERTScore** | Semantic similarity using contextual embeddings |
| **LLM-as-a-judge** | A model grades another model's output |

None of these replace business outcomes or a safety review for high-risk apps.

### Meeting business objectives

Productivity, user engagement, task engineering quality, plus application-level metrics:

| App metric | Meaning |
|---|---|
| Task completion rate | Did the user finish the job? |
| User satisfaction | CSAT / thumbs up-down |
| Cost per interaction | Tokens + infra per successful task |

### Evaluating RAG, agents, and workflows

- **RAG:** retrieval relevance, groundedness and citation correctness, answer faithfulness, latency, cost per query. Use Guardrails contextual grounding scores where they apply.
- **Agents:** tool selection accuracy, step success, end-to-end task completion, unsafe tool use rate, trajectory quality.
- **Workflows:** stage failure rates, human escalation rate, SLA adherence.

Conceptually, you want both **online** (production feedback) and **offline** (golden sets) evaluation.

## AWS services in play

- **Amazon Bedrock Model Evaluation**
- **Amazon Bedrock Guardrails** (grounding and quality signals)
- **SageMaker Clarify**, Model Monitor, Ground Truth (HITL labeling)
- CloudWatch for operational metrics

## Hands-on

- One flashcard: ROUGE / BLEU / BERTScore / LLM-as-judge, and what each one focuses on.
- Always pair an automatic metric with at least one business KPI.
- With the [B2](../../build.md#b2) Knowledge Base, write five questions you already know the answers to and check each response: **is it grounded?** Not just "does it sound right?"

## Exam traps

- Using BLEU alone to judge open-ended chat quality.
- Declaring a model "best" from marketing benchmarks without running it on your task.
- Skipping HITL for regulated or brand-sensitive content.
- Evaluating only the LLM and ignoring retrieval quality in RAG.

## Exam guide mapping

- **Task Statement 3.4**: Methods to evaluate FM performance (HITL, benchmarks, Bedrock Model Evaluation; ROUGE/BLEU/BERTScore/LLM-as-judge; business objectives; eval of RAG/agents/workflows; business alignment metrics).

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html>
- <https://aws.amazon.com/ai/responsible-ai/>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-bias.html>
- <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html>