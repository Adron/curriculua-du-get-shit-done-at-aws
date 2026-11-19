# 15 — Responsible AI principles

**Exam map:** Domain 3 · Task **3.4** · Skills **3.4.1–3.4.3**

## What it is

Operationalizing transparency, fairness, and policy compliance: reasoning traces, confidence/uncertainty signals, fairness evaluations, LLM-as-judge, and policy-aligned Guardrails + model cards.

## Why it matters for AIP-C01

Responsible AI is not a slide—it's testable skills: show traces, measure fairness, automate judges, encode policy in Guardrails.

## Production implementation notes

- **Transparency:** surface citations/evidence; Bedrock agent/AgentCore tracing for reasoning/tool steps; CloudWatch confidence or judge-score metrics; disclose limitations in UX.
- **Fairness:** predefine metrics; A/B via Prompt Management/Flows across demographic slices where applicable; Bedrock LLM-as-judge evaluation jobs; SageMaker Clarify for bias where classical signals apply.
- **Policy compliance:** encode org policies as Guardrails (denied topics, word filters, grounding); model cards for limits; Lambda automated compliance checks in CI (eval thresholds, required guardrail ARN).
- **Human oversight:** Amazon A2I / Step Functions HITL for contested decisions.

## AWS services

Amazon Bedrock (Guardrails, Prompt Management, Prompt Flows, Model Evaluations / LLM-as-judge, agent tracing), Amazon Bedrock AgentCore Observability, Amazon CloudWatch, Amazon SageMaker Clarify / Model Cards, Amazon Augmented AI, AWS Lambda.

## Exam traps

- “Black box” agent with no traces in a high-stakes workflow.
- Fairness eval only on aggregate accuracy (hides subgroup harm).
- Policy PDF in SharePoint but no Guardrail/enforcement in the inference path.
- Using the same model as generator and judge without acknowledging bias risk (still common—document mitigations).

## Hands-on project ideas

1. Enable agent tracing; build a CloudWatch dashboard of tool-error vs success.
2. LLM-as-judge job scoring helpfulness + harmfulness on a fairness slice dataset.
3. CI check: reject deploy if Guardrail ARN missing or eval score below floor.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-judge-create.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-configure-processing-jobs.html
- https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/design-principles.html
