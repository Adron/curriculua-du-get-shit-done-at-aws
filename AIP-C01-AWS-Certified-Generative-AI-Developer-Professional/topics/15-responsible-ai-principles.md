---
title: "15: Responsible AI principles"
---

# 15: Responsible AI principles

**Domain 3 · Task 3.4 · Skills 3.4.1-3.4.3**

Operationalizing transparency, fairness, and policy compliance: reasoning traces, confidence and uncertainty signals, fairness evaluations, LLM-as-judge, and policy-aligned Guardrails plus model cards.

**Responsible AI isn't a slide in a deck.** At this level it's testable skills: show the traces, measure fairness, automate the judges, and encode the policy in Guardrails so it's actually enforced in the inference path.

## What to know

- **Transparency:** surface citations and evidence; Bedrock agent / AgentCore tracing for reasoning and tool steps; CloudWatch confidence or judge-score metrics; disclose limitations in the UX.
- **Fairness:** predefine metrics; A/B via Prompt Management/Flows across demographic slices where applicable; Bedrock LLM-as-judge evaluation jobs; SageMaker Clarify for bias where classical signals apply.
- **Policy compliance:** encode org policies as Guardrails (denied topics, word filters, grounding); model cards for limits; Lambda automated compliance checks in CI (eval thresholds, required guardrail ARN).
- **Human oversight:** Amazon A2I / Step Functions HITL for contested decisions.

## AWS services in play

Amazon Bedrock (Guardrails, Prompt Management, Prompt Flows, Model Evaluations / LLM-as-judge, agent tracing), Amazon Bedrock AgentCore Observability, Amazon CloudWatch, Amazon SageMaker Clarify / Model Cards, Amazon Augmented AI, AWS Lambda.

## Hands-on

1. Enable agent tracing and build a CloudWatch dashboard of tool errors vs successes. Point it at the [B10](../../build.md#b10) agent.
2. An LLM-as-judge job scoring helpfulness + harmfulness on a fairness-slice dataset.
3. A CI check that rejects the deploy if the Guardrail ARN is missing or the eval score is below the floor. That's a [B12](../../build.md#b12) gate.

## Exam traps

- A "black box" agent with no traces in a high-stakes workflow.
- Fairness eval only on aggregate accuracy, which hides subgroup harm.
- The policy PDF lives in SharePoint, but there's no Guardrail enforcing it in the inference path.
- Using the same model as generator and judge without acknowledging the bias risk. Still common, so document your mitigations.

## Exam guide mapping

- **Task 3.4**, Skills 3.4.1-3.4.3: implement responsible AI principles.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-judge-create.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-configure-processing-jobs.html>
- <https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/design-principles.html>