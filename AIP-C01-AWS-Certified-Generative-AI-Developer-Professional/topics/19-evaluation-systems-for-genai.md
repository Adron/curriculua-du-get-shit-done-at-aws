# 19 — Evaluation systems for GenAI

**Exam map:** Domain 5 · Task **5.1** · Skills **5.1.1–5.1.9**

## What it is

Systematic quality measurement beyond classical ML metrics: Bedrock Model Evaluations (programmatic, human, LLM-as-judge), A/B/canary, RAG evaluations, agent evaluations, regression gates, stakeholder reporting, and deploy-time validation.

## Why it matters for AIP-C01

Domain 5 lead task. Production GenAI needs continuous evals wired into promotion—not vibe checks.

## Production implementation notes

- **Model evals:** built-in or custom prompt datasets; human workers for nuanced prefs; LLM-as-judge for scalable scoring with explanations; compare cost/latency/quality.
- **RAG evals:** retrieve-only (context relevance/coverage) vs retrieve-and-generate (correctness, faithfulness, citation precision/coverage, harmfulness, etc.). Evaluate Bedrock KBs or BYO inference data.
- **User feedback:** ratings, annotation workflows (Ground Truth / A2I), close the loop into prompt/model variants.
- **Agents:** task completion, tool effectiveness, Bedrock Agent evaluations, multi-step reasoning quality.
- **Gates:** CI/CD quality gates; canary traffic to new prompt/model; synthetic user workflows; block on semantic drift/hallucination rate.
- **Reporting:** S3 eval reports, QuickSight/console histograms, model comparison visuals for stakeholders.

## AWS services

Amazon Bedrock Evaluations (model, RAG, judge), Amazon SageMaker Ground Truth / Clarify, Amazon Augmented AI, Amazon S3, AWS CodePipeline, Amazon QuickSight, Amazon CloudWatch, Amazon Bedrock Agents evaluation features.

## Exam traps

- Accuracy-only metrics on open-ended generation.
- RAG eval without ground-truth when using coverage metrics that require it.
- Promoting models on latency wins while faithfulness collapses.
- No canary—big-bang model swap in production.

## Hands-on project ideas

1. LLM-as-judge job on 100 golden prompts; compare two generator models.
2. Retrieve-and-generate RAG eval on your KB; track Faithfulness + Citation coverage.
3. Pipeline gate: fail deploy if Builtin.Faithfulness mean < threshold.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-kb.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-metrics.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-judge-create.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/cloudtrail-events-in-model-evaluations.html
