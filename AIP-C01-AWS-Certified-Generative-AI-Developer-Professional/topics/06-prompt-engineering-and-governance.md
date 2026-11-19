---
title: "06: Prompt engineering and governance"
---

# 06: Prompt engineering and governance

**Domain 1 · Task 1.6 · Skills 1.6.1-1.6.6**

Designing, versioning, approving, and regression-testing prompts at enterprise scale. That means Bedrock Prompt Management, Guardrails attached to prompts and flows, Prompt Flows for multi-step chains, CoT and structured outputs, and an audit trail for all of it.

**Prompts are production artifacts.** Treat them like code: versioned, reviewed, tested, logged. The exam expects parameterized templates, approval workflows, CloudTrail/CloudWatch logging, and Prompt Flows, not a string somebody pasted out of the playground last Tuesday.

## What to know

- **Prompt Management:** variables, variants, model/inference profile binding, versioning. Integrate via Converse or Prompt Flow nodes (`promptArn`).
- **Safety in prompts:** attach Guardrails to inference, agents, KB RetrieveAndGenerate, and Flow prompt/KB nodes.
- **Interactive systems:** Step Functions clarification loops, Comprehend for intent, DynamoDB conversation history with TTL.
- **Governance:** S3 template repos, IAM least privilege on prompt resources, CloudTrail on management APIs, invocation logging for runtime prompts and responses.
- **QA:** Lambda expected-output checks, Step Functions edge-case suites, CloudWatch regression metrics on golden prompts whenever models or prompts change.
- **Advanced prompting:** CoT, structured schemas/JSON, few-shot libraries, feedback loops. Prompt Flows for sequential chains, conditional branches, reusable components, and pre/post-processing.

## AWS services in play

Amazon Bedrock Prompt Management, Amazon Bedrock Prompt Flows, Amazon Bedrock Guardrails, AWS Step Functions, Amazon Comprehend, Amazon DynamoDB, Amazon S3, AWS CloudTrail, Amazon CloudWatch Logs, AWS Lambda.

## Hands-on

1. A versioned Prompt Management template with variables, approved through a CodePipeline manual stage. Ask Composite Code's prompts live here starting in [B9](../../build.md#b9).
2. A Prompt Flow: classify, retrieve, answer, with a Guardrail on the prompt node.
3. Golden-prompt regression: a Lambda that compares embedding similarity of outputs against a baseline. That's the seed of the CI checks in [B12](../../build.md#b12).

## Exam traps

- Editing production prompts with no versions or approvals.
- Assuming Guardrails apply on a Flow KB node without `RetrieveAndGenerate` / modelId where required.
- CoT everywhere (cost and latency) when a structured extract would do.
- No regression suite when you swap models behind the same prompt ARN.

## Exam guide mapping

- **Task 1.6**, Skills 1.6.1-1.6.6: implement prompt engineering strategies and governance.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/flows-guardrails.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-create.html>
- <https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html>