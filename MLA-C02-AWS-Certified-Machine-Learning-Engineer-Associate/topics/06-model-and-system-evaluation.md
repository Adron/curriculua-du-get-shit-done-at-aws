---
title: "06: Model and system evaluation"
---

# 06: Model and system evaluation

**Domain 2 (24%) · Task 2.3 · Skills 2.3.1-2.3.10**

How do you prove the thing works? Reproducible experiments, baselines and drift, shadow traffic, explainability, NLP metrics, human and LLM-as-judge evals, and monitoring RAG retrieval.

C02 expands evaluation a lot: **MLflow**, **Bedrock evaluations**, **Prompt Management**, **BLEU/ROUGE/BERTScore**, **LLM-as-judge**, human-in-the-loop, and **RAG monitoring**.

**"It looked good when I tried it" is not an evaluation.** It's a vibe. The exam wants numbers, versions, and baselines, and so does anybody who has to run the thing in production.

## What to know

### Skills map

| Skill | Focus |
|---|---|
| 2.3.1 | Reproducible experiments (MLflow, Bedrock evals, Prompt Management) |
| 2.3.2 | Performance baselines + drift detection |
| 2.3.3 | Shadow vs production variants |
| 2.3.4 | Explain model outputs |
| 2.3.5 | Debug convergence |
| 2.3.6 | Comprehensive eval for ML + GenAI |
| 2.3.7 | Human-in-the-loop quality assessment |
| 2.3.8 | BLEU, ROUGE, BERTScore, semantic similarity |
| 2.3.9 | LLM-as-judge, bias, content quality |
| 2.3.10 | RAG monitoring / retrieval accuracy |

### Experiment tracking

| Tool | Use |
|---|---|
| **Managed MLflow on SageMaker** | Params, metrics, artifacts; register → Model Registry sync |
| **Bedrock Model Evaluation** | Automated + human eval jobs for FMs |
| **Bedrock Prompt Management** | Version prompts; compare variants under eval harnesses |

Log the data version, the code commit, and the prompt version. GenAI regressions are very often just a prompt diff.

### Traditional ML eval and drift

- Classification: precision, recall, F1, AUC. Regression: MAE, RMSE.
- **Baselines** with Model Monitor / Clarify. Alert on data quality, model quality, and bias drift.
- **Shadow variants**: send a copy of production traffic to the candidate and compare metrics with zero user impact.

### Explainability

- Feature attributions (Clarify/SHAP-style concepts), partial dependence
- For GenAI: citations from RAG, reasoning traces (where available), and which Guardrails categories intervened

### NLP and GenAI metrics

| Metric | Good for |
|---|---|
| **BLEU** | Overlap with reference (translation-ish) |
| **ROUGE** | Summarization recall of n-grams |
| **BERTScore** | Semantic similarity via embeddings |
| Semantic similarity | Paraphrase / answer closeness |
| Task-specific | Exact match, tool-call accuracy, JSON schema validity |
| **LLM-as-judge** | Rubrics for helpfulness, faithfulness, safety |

Don't rely on BLEU alone for open-ended chat. Pair it with human or judge rubrics.

### RAG monitoring (2.3.10)

Track these separately:

1. **Retrieval**: recall@k, MRR, context relevance and coverage
2. **Generation**: faithfulness/groundedness, citation precision
3. **End-to-end**: task success, latency, abstain rate

Bedrock KB eval concepts include retrieve-only vs retrieve-and-generate metric sets (relevance, correctness, faithfulness, citation metrics).

## AWS services in play

SageMaker MLflow, Model Registry, Model Monitor, Clarify, Debugger; Amazon Bedrock evaluations and Prompt Management; CloudWatch metrics and logs; human review workflows.

## Hands-on

1. Track two training runs in MLflow, register the winner, and note the Model Registry package. Do it with the [B5](../../build.md#b5) classifier runs.
2. Create a Bedrock evaluation dataset, run an automated eval, and compare two prompts from Prompt Management.
3. Deploy a shadow variant and compare latency and error rate offline.
4. Build a RAG eval sheet: labeled queries with the expected doc IDs. Compute hit@k **before** touching the generator. For [B6](../../build.md#b6) that's my hand-written question set: "which posts cover X?" where I already know the answer.

## Exam traps

- One offline accuracy number does not mean "production ready".
- Changing prompts without versioning them.
- Optimizing ROUGE while users actually care about factuality.
- Running shadow traffic without enough volume or time.
- Blaming the FM while ignoring retrieval failures.

## Exam guide mapping

- **Domain 2 (24%) · Task 2.3 · Skills 2.3.1-2.3.10**: model and system evaluation.

## Research links

- <https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow-track-experiments-model-registration.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html>
- <https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf>