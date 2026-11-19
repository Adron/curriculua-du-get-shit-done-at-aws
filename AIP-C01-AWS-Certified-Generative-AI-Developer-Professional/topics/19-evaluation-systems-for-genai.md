---
title: "19: Evaluation systems for GenAI"
---

# 19: Evaluation systems for GenAI

**Domain 5 · Task 5.1 · Skills 5.1.1-5.1.9**

Systematic quality measurement that goes beyond classical ML metrics: Bedrock Model Evaluations (programmatic, human, LLM-as-judge), A/B and canary, RAG evaluations, agent evaluations, regression gates, stakeholder reporting, and deploy-time validation.

This is Domain 5's lead task, and it's the one I'd push hardest on any real team. **Production GenAI needs continuous evals wired into promotion, not vibe checks.** If you can't say whether this week's prompt is better than last week's, you're not engineering it, you're guessing.

## What to know

- **Model evals:** built-in or custom prompt datasets; human workers for nuanced preferences; LLM-as-judge for scalable scoring with explanations; compare cost, latency, and quality.
- **RAG evals:** retrieve-only (context relevance/coverage) vs retrieve-and-generate (correctness, faithfulness, citation precision/coverage, harmfulness, etc.). Evaluate Bedrock KBs or bring your own inference data.
- **User feedback:** ratings and annotation workflows (Ground Truth / A2I); close the loop into prompt and model variants.
- **Agents:** task completion, tool effectiveness, Bedrock Agent evaluations, multi-step reasoning quality.
- **Gates:** CI/CD quality gates; canary traffic to the new prompt/model; synthetic user workflows; block on semantic drift or hallucination rate.
- **Reporting:** S3 eval reports, QuickSight/console histograms, model comparison visuals for stakeholders.

## AWS services in play

Amazon Bedrock Evaluations (model, RAG, judge), Amazon SageMaker Ground Truth / Clarify, Amazon Augmented AI, Amazon S3, AWS CodePipeline, Amazon QuickSight, Amazon CloudWatch, Amazon Bedrock Agents evaluation features.

## Hands-on

All three of these are [B12](../../build.md#b12).

1. An LLM-as-judge job on 100 golden prompts, comparing two generator models.
2. A retrieve-and-generate RAG eval on your KB; track Faithfulness + Citation coverage.
3. A pipeline gate that fails the deploy if the Builtin.Faithfulness mean is below threshold.

## Exam traps

- Accuracy-only metrics on open-ended generation.
- RAG eval without ground truth when you're using coverage metrics that require it.
- Promoting a model on latency wins while faithfulness collapses.
- No canary. A big-bang model swap in production.

## Exam guide mapping

- **Task 5.1**, Skills 5.1.1-5.1.9: implement evaluation systems for GenAI.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-kb.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-metrics.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-judge-create.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/cloudtrail-events-in-model-evaluations.html>