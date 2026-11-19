# 06 — Model and system evaluation

**Domain 2 · Task 2.3** · Skills **2.3.1–2.3.10** · Domain weight **24%**

## What it is

Proving models and GenAI systems work: reproducible experiments, baselines/drift, shadow traffic, explainability, NLP metrics, human + LLM-as-judge evals, and RAG retrieval monitoring.

## Why it matters for MLA-C02

C02 heavily expands evaluation: **MLflow**, **Bedrock evaluations**, **Prompt Management**, **BLEU/ROUGE/BERTScore**, **LLM-as-judge**, HITL, and **RAG monitoring**.

## Exam-relevant skills map

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

## Experiment tracking

| Tool | Use |
|---|---|
| **Managed MLflow on SageMaker** | Params, metrics, artifacts; register → Model Registry sync |
| **Bedrock Model Evaluation** | Automated + human eval jobs for FMs |
| **Bedrock Prompt Management** | Version prompts; compare variants under eval harnesses |

Log data version, code commit, and prompt version — GenAI regressions are often prompt diffs.

## Traditional ML eval & drift

- Classification: precision/recall/F1/AUC; regression: MAE/RMSE
- **Baselines** with Model Monitor / Clarify; alert on data quality, model quality, bias drift
- **Shadow variants**: send production traffic copy to candidate; compare metrics without user impact

## Explainability

- Feature attributions (Clarify/SHAP-style concepts), partial dependence
- For GenAI: citations from RAG, reasoning traces (where available), Guardrails intervening categories

## NLP & GenAI metrics

| Metric | Good for |
|---|---|
| **BLEU** | Overlap with reference (translation-ish) |
| **ROUGE** | Summarization recall of n-grams |
| **BERTScore** | Semantic similarity via embeddings |
| Semantic similarity | Paraphrase / answer closeness |
| Task-specific | Exact match, tool-call accuracy, JSON schema validity |
| **LLM-as-judge** | Rubrics for helpfulness, faithfulness, safety |

Don’t rely on BLEU alone for open-ended chat — pair with human or judge rubrics.

## RAG monitoring (2.3.10)

Track separately:

1. **Retrieval**: recall@k, MRR, context relevance/coverage  
2. **Generation**: faithfulness/groundedness, citation precision  
3. **End-to-end**: task success, latency, abstain rate  

Bedrock KB eval concepts include retrieve-only vs retrieve-and-generate metric sets (relevance, correctness, faithfulness, citation metrics).

## AWS services

SageMaker MLflow, Model Registry, Model Monitor, Clarify, Debugger; Amazon Bedrock evaluations & Prompt Management; CloudWatch metrics/logs; human review workflows.

## Hands-on practice

1. Track two training runs in MLflow; register the winner; note Model Registry package.
2. Create a Bedrock evaluation dataset; run automated eval; compare two prompts from Prompt Management.
3. Deploy a shadow variant; compare latency + error rate offline.
4. Build a RAG eval sheet: labeled queries with expected doc IDs; compute hit@k before changing the generator.

## Common traps

- One offline accuracy number = “production ready.”
- Changing prompts without versioning.
- Optimizing ROUGE while users care about factuality.
- Shadow traffic without enough volume/time.
- Ignoring retrieval failures when blaming the FM.

## Research links

- https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow-track-experiments-model-registration.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html
- https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf
