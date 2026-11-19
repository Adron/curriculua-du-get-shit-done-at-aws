---
title: "01: GenAI solution design and requirements"
---

# 01: GenAI solution design and requirements

**Domain 1 (31%) · Task 1.1 · Skills 1.1.1, 1.1.2, 1.1.3**

This is the architecture work. Take a business problem and turn it into a GenAI system you can actually defend: pick the FMs and integration patterns, prove value with a Bedrock PoC, then standardize it with the Well-Architected Generative AI Lens across the whole lifecycle (scoping, selection, customization, development, deployment, continuous improvement).

It's the front door to the heaviest domain on the exam. The scenarios ask you to pick patterns that fit the constraints (latency, data residency, agency risk, cost) and to run a PoC before you scale. **They don't want you inventing novel training pipelines.** That's explicitly out of scope, and the wrong answers love to drag you there.

Honestly, this is the part of the job I think matters most anyway. The model is the easy bit. Figuring out what the thing needs to do, and what it must never do, is the work.

## What to know

- **Capture non-functional requirements first.** p95 latency, token budget, residency (Geographic vs Global cross-Region inference), allowed tool agency, auditability, HITL for irreversible actions.
- **PoC on Bedrock.** Converse playground, then Prompt Management variants, then Knowledge Bases RetrieveAndGenerate or Agents. Measure quality, cost per 1k tokens, and failure modes *before* you wire up API Gateway/Lambda or AgentCore Runtime.
- **Standardize with the GenAI Lens pillars:** controlled autonomy, observability, resource efficiency, distributed resilience, standardized resource management (prompts/models/permissions), secure interaction boundaries.
- **Prefer managed inference (Bedrock) for most apps.** Reach for SageMaker when you need custom containers, ownership of the LoRA lifecycle, or hybrid endpoints. Document the shared-responsibility boundary (model provider vs consumer).
- **Reusable components.** IaC (CDK/CloudFormation) modules for VPC endpoints, guardrail ARNs, inference profiles, KB data sources, and eval jobs. The WA Tool GenAI Lens reviews against these.

## AWS services in play

Amazon Bedrock, AWS Well-Architected Tool (Generative AI Lens), the AWS Well-Architected Framework, Amazon API Gateway, AWS Lambda, AWS Step Functions, Amazon SageMaker AI (when customization or hosting requires it), IAM, Amazon CloudWatch.

## Hands-on

1. Write a one-page ADR for an internal policy Q&A bot: constraints, then Bedrock + KB vs SageMaker, then failure modes, then a cost envelope. (Do it for Ask Composite Code too. It's the design doc for [B9](../../build.md#b9).)
2. Run a Bedrock PoC with two models. Compare faithfulness and $/query, and write down the GenAI Lens checklist gaps.
3. Do a WA Tool review of a sample GenAI architecture against the Generative AI Lens questions.

## Exam traps

- Jumping to fine-tuning when RAG plus prompt governance would meet the requirement.
- Ignoring data residency when picking Global cross-Region inference for "availability."
- Treating playground success as production readiness. No Guardrails, no logging, no eval gates means it's still a demo.
- Over-scoping into model training or feature engineering. Explicitly out of candidate scope.

## Exam guide mapping

- **Task 1.1**, Skills 1.1.1, 1.1.2, 1.1.3: design GenAI solutions that meet business and technical requirements.

## Research links

- <https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html>
- <https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/design-principles.html>
- <https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lifecycle.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html>
- <https://aws.amazon.com/certification/certified-generative-ai-developer-professional/>
- <https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html>