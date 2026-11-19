# 01 — GenAI solution design and requirements

**Exam map:** Domain 1 (31%) · Task **1.1** · Skills **1.1.1, 1.1.2, 1.1.3**

## What it is

Architecture work that turns a business problem into a defendable GenAI system: choose FMs and integration patterns, prove value with a Bedrock PoC, then standardize with Well-Architected Generative AI Lens practices across the lifecycle (scoping → selection → customization → development → deployment → continuous improvement).

## Why it matters for AIP-C01

Highest-weight domain starts here. Exam scenarios ask you to pick patterns that fit constraints (latency, data residency, agency risk, cost) and to use PoCs before scale—not to invent novel training pipelines (out of scope).

## Production implementation notes

- **Capture non-functional requirements first:** p95 latency, token budget, residency (Geographic vs Global cross-Region inference), allowed tool agency, auditability, HITL for irreversible actions.
- **PoC on Bedrock:** Converse playground → Prompt Management variants → Knowledge Bases RetrieveAndGenerate or Agents. Measure quality, cost/1k tokens, and failure modes before API Gateway/Lambda or AgentCore Runtime.
- **Standardize with GenAI Lens pillars:** controlled autonomy, observability, resource efficiency, distributed resilience, standardized resource management (prompts/models/permissions), secure interaction boundaries.
- **Prefer managed inference (Bedrock) for most apps;** use SageMaker when you need custom containers, LoRA lifecycle ownership, or hybrid endpoints. Document the shared-responsibility boundary (model provider vs consumer).
- **Reusable components:** IaC (CDK/CloudFormation) modules for VPC endpoints, guardrail ARNs, inference profiles, KB data sources, and eval jobs—WA Tool GenAI Lens reviews against these.

## AWS services

Amazon Bedrock, AWS Well-Architected Tool (Generative AI Lens), AWS WA Framework, Amazon API Gateway, AWS Lambda, AWS Step Functions, Amazon SageMaker AI (when customization/hosting requires it), IAM, Amazon CloudWatch.

## Exam traps

- Jumping to fine-tuning when RAG + prompt governance would meet the requirement.
- Ignoring data residency when choosing Global cross-Region inference for “availability.”
- Treating PoC playground success as production readiness (no Guardrails, no logging, no eval gates).
- Over-scoping into model training / feature engineering (explicitly out of candidate scope).

## Hands-on project ideas

1. One-page ADR for an internal policy Q&A bot: constraints → Bedrock+KB vs SageMaker → failure modes → cost envelope.
2. Run a Bedrock PoC with two models; compare faithfulness + $/query; record GenAI Lens checklist gaps.
3. WA Tool review of a sample GenAI architecture against Generative AI Lens questions.

## Research links

- https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html
- https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/design-principles.html
- https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lifecycle.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
- https://aws.amazon.com/certification/certified-generative-ai-developer-professional/
- https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html
