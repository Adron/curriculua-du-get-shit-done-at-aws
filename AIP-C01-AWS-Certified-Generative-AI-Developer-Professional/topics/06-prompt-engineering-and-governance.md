# 06 — Prompt engineering and governance

**Exam map:** Domain 1 · Task **1.6** · Skills **1.6.1–1.6.6**

## What it is

Designing, versioning, approving, and regression-testing prompts at enterprise scale: Bedrock Prompt Management, Guardrails attached to prompts/flows, Prompt Flows for multi-step chains, CoT and structured outputs, and auditability.

## Why it matters for AIP-C01

Prompts are production artifacts. Exam expects parameterized templates, approval workflows, CloudTrail/CloudWatch logging, and Prompt Flows—not one-off playground strings.

## Production implementation notes

- **Prompt Management:** variables, variants, model/inference profile binding, versioning; integrate via Converse or Prompt Flow nodes (`promptArn`).
- **Safety in prompts:** attach Guardrails to inference, agents, KB RetrieveAndGenerate, and Flow prompt/KB nodes.
- **Interactive systems:** Step Functions clarification loops; Comprehend intent; DynamoDB conversation history with TTL.
- **Governance:** S3 template repos, IAM least privilege on prompt resources, CloudTrail on management APIs, invocation logging for runtime prompts/responses.
- **QA:** Lambda expected-output checks; Step Functions edge-case suites; CloudWatch regression metrics on golden prompts when models/prompts change.
- **Advanced prompting:** CoT, structured schemas/JSON, few-shot libraries, feedback loops. Prompt Flows for sequential chains, conditional branches, reusable components, pre/post-processing.

## AWS services

Amazon Bedrock Prompt Management, Amazon Bedrock Prompt Flows, Amazon Bedrock Guardrails, AWS Step Functions, Amazon Comprehend, Amazon DynamoDB, Amazon S3, AWS CloudTrail, Amazon CloudWatch Logs, AWS Lambda.

## Exam traps

- Editing production prompts without versions/approvals.
- Assuming Guardrails on a Flow KB node without `RetrieveAndGenerate` / modelId where required.
- CoT everywhere (cost/latency) when a structured extract would do.
- No regression suite when swapping models behind the same prompt ARN.

## Hands-on project ideas

1. Versioned Prompt Management template with variables; approval via CodePipeline manual stage.
2. Prompt Flow: classify → retrieve → answer with Guardrail on prompt node.
3. Golden-prompt regression: Lambda compares embeddings/similarity of outputs vs baseline.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/flows-guardrails.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-create.html
- https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html
