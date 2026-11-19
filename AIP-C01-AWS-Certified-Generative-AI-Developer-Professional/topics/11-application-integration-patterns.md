# 11 — Application integration patterns

**Exam map:** Domain 2 · Task **2.5** · Skills **2.5.1–2.5.6**

## What it is

Application-facing GenAI patterns: streaming APIs, Amplify/OpenAPI-first UIs, no-code Prompt Flows, Amazon Q Developer productivity, CRM/document workflows, Bedrock Data Automation, agent orchestration in apps, and GenAI-aware troubleshooting tooling.

## Why it matters for AIP-C01

Bridges FM capabilities to business systems and developer velocity—frequent scenario framing (“enhance CRM,” “no-code flow,” “use Q Developer”).

## Production implementation notes

- **API Gateway for GenAI:** handle streams, token limits, model timeouts with retries/queues; validate payloads via models/OpenAPI.
- **Accessible interfaces:** Amplify UI components; OpenAPI specs for API-first clients; Prompt Flows for business-user workflows without custom UI code.
- **Business systems:** Lambda CRM enrichments; Step Functions document pipelines; **Bedrock Data Automation** for multimodal extraction with optional PII detection/redaction in outputs.
- **Developer productivity:** Amazon Q Developer for codegen, refactor, security scans, and GenAI-specific error pattern help—still review for correctness/security.
- **Advanced apps:** Strands / Agent Squad orchestration inside the app tier; Bedrock prompt chaining.
- **Troubleshoot faster:** CloudWatch Logs Insights on prompts/responses; X-Ray on FM calls; Q Developer for pattern recognition—never log secrets/PII unredacted.

## AWS services

Amazon API Gateway, AWS Amplify, Amazon Bedrock Prompt Flows, Amazon Bedrock Data Automation, Amazon Q Developer, AWS Lambda, AWS Step Functions, Strands / Agent Squad, Amazon CloudWatch Logs Insights, AWS X-Ray.

## Exam traps

- Using Prompt Flows where complex custom tool auth/MCP is required (wrong abstraction).
- Assuming BDA PII redaction rewrites source assets (it applies to BDA JSON outputs by default).
- Shipping Q Developer code without security review.
- Sync API Gateway for multi-minute document automation (use async/Step Functions).

## Hands-on project ideas

1. OpenAPI + Amplify chat client against a streaming Bedrock backend.
2. Prompt Flow for “intake form → summarize → ticket fields.”
3. BDA project with `DETECTION_AND_REDACTION` on document modality; feed redacted JSON to KB.

## Research links

- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/bda-sensitive-data.html
- https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html
- https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html
