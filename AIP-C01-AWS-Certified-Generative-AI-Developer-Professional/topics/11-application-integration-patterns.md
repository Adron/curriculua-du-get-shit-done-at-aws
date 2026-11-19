---
title: "11: Application integration patterns"
---

# 11: Application integration patterns

**Domain 2 · Task 2.5 · Skills 2.5.1-2.5.6**

The application-facing side of GenAI: streaming APIs, Amplify/OpenAPI-first UIs, no-code Prompt Flows, Amazon Q Developer for productivity, CRM and document workflows, Bedrock Data Automation, agent orchestration inside apps, and GenAI-aware troubleshooting tooling.

This bridges what the FM can do to the business systems people actually use, plus developer velocity. Expect it as scenario framing: "enhance the CRM," "build a no-code flow," "use Q Developer." The answer is usually the right-sized abstraction, not the most powerful one.

## What to know

- **API Gateway for GenAI:** handle streams, token limits, and model timeouts with retries and queues; validate payloads with models/OpenAPI.
- **Accessible interfaces:** Amplify UI components, OpenAPI specs for API-first clients, Prompt Flows for business-user workflows without custom UI code.
- **Business systems:** Lambda CRM enrichments, Step Functions document pipelines, and **Bedrock Data Automation** for multimodal extraction with optional PII detection/redaction in outputs.
- **Developer productivity:** Amazon Q Developer for codegen, refactoring, security scans, and help with GenAI-specific error patterns. Still review its output for correctness and security.
- **Advanced apps:** Strands / Agent Squad orchestration in the app tier; Bedrock prompt chaining.
- **Troubleshoot faster:** CloudWatch Logs Insights on prompts and responses, X-Ray on FM calls, Q Developer for pattern recognition. Never log secrets or PII unredacted.

## AWS services in play

Amazon API Gateway, AWS Amplify, Amazon Bedrock Prompt Flows, Amazon Bedrock Data Automation, Amazon Q Developer, AWS Lambda, AWS Step Functions, Strands / Agent Squad, Amazon CloudWatch Logs Insights, AWS X-Ray.

## Hands-on

1. An OpenAPI + Amplify chat client against a streaming Bedrock backend. A nice front end for [B9](../../build.md#b9).
2. A Prompt Flow for "intake form, summarize, ticket fields."
3. A BDA project with `DETECTION_AND_REDACTION` on the document modality; feed the redacted JSON to a KB.

## Exam traps

- Using Prompt Flows where complex custom tool auth or MCP is required. Wrong abstraction.
- Assuming BDA PII redaction rewrites the source assets. By default it applies to BDA JSON outputs.
- Shipping Q Developer code without a security review.
- Sync API Gateway for multi-minute document automation. Use async / Step Functions.

## Exam guide mapping

- **Task 2.5**, Skills 2.5.1-2.5.6: implement application integration patterns.

## Research links

- <https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/bda-sensitive-data.html>
- <https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html>
- <https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html>