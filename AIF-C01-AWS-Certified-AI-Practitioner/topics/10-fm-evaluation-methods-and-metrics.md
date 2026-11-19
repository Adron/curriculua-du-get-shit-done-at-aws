# 10 — FM evaluation methods and metrics

**Domain 3 (28%) · Task Statement 3.4**

## What it is

How to judge whether an FM (and apps built on it — RAG, agents, workflows) meet quality and business goals: human-in-the-loop, benchmarks, **Amazon Bedrock Model Evaluation**, automatic metrics (ROUGE/BLEU/BERTScore), and LLM-as-judge.

## Why it matters for AIF-C01

Selecting a model without evaluation is a wrong answer. You need metric names and when HITL beats automatic scores.

## What to know for the exam

### Evaluation approaches

| Approach | Use when |
|---|---|
| **Human-in-the-loop (HITL)** | Subjective quality, safety, brand voice, high-risk decisions |
| **Benchmark datasets** | Compare models on public/standard tasks |
| **Amazon Bedrock Model Evaluation** | Compare/select FMs on custom metrics (accuracy, robustness, toxicity, etc.) |
| **Automatic metrics** | Scalable regression checks on text similarity / overlap |
| **LLM-as-judge** | Another model scores outputs against rubrics |
| **SageMaker Clarify / fmeval** | Bias, explainability, FM eval libraries (ecosystem) |

### Text metrics (memorize names)

| Metric | Focus |
|---|---|
| **ROUGE** | Overlap with reference summaries (recall-oriented n-grams) |
| **BLEU** | Precision-oriented n-gram overlap (classic MT metric) |
| **BERTScore** | Semantic similarity using contextual embeddings |
| **LLM-as-a-judge** | Model grades another model’s output |

None replace business outcomes or safety review for high-risk apps.

### Meeting business objectives

Productivity, user engagement, task engineering quality; plus application-level metrics:

| App metric | Meaning |
|---|---|
| Task completion rate | Did the user finish the job? |
| User satisfaction | CSAT / thumbs |
| Cost per interaction | Tokens + infra / successful task |

### Evaluating RAG, agents, workflows

- **RAG:** retrieval relevance, groundedness/citation correctness, answer faithfulness, latency, cost per query; use Guardrails contextual grounding scores where applicable.
- **Agents:** tool selection accuracy, step success, end-to-end task completion, unsafe tool use rate, trajectory quality.
- **Workflows:** stage failure rates, human escalation rate, SLA adherence.

Online (production feedback) + offline (golden sets) both matter conceptually.

## AWS services involved

- **Amazon Bedrock Model Evaluation**
- **Amazon Bedrock Guardrails** (grounding/quality signals)
- **SageMaker Clarify**, Model Monitor, Ground Truth (HITL labeling)
- CloudWatch for operational metrics

## Practical study tips

- Memorize ROUGE / BLEU / BERTScore / LLM-as-judge in one flashcard.
- Always pair automatic metrics with at least one business KPI.
- For RAG answers, ask “is it grounded?” not only “does it sound good?”

## Common exam traps

- Using BLEU alone for open-ended chat quality.
- Declaring a model “best” from marketing benchmarks without your task eval.
- Ignoring HITL for regulated or brand-sensitive content.
- Evaluating only the LLM while ignoring retrieval quality in RAG.

## Exam guide mapping

- **Task Statement 3.4** — Methods to evaluate FM performance (HITL, benchmarks, Bedrock Model Evaluation; ROUGE/BLEU/BERTScore/LLM-as-judge; business objectives; eval of RAG/agents/workflows; business alignment metrics).

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html
- https://aws.amazon.com/ai/responsible-ai/
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-bias.html
- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
