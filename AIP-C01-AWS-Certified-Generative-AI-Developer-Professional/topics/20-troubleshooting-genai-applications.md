# 20 — Troubleshooting GenAI applications

**Exam map:** Domain 5 · Task **5.2** · Skills **5.2.1–5.2.5**

## What it is

Diagnosing GenAI-specific failures: context window overflow, Bedrock API integration errors, prompt defects, retrieval/embedding drift, and agent tool failures—using logs, X-Ray, and systematic refinement.

## Why it matters for AIP-C01

Closing domain: when production breaks, pick the right layer (context vs API vs prompt vs retrieval vs tools).

## Production implementation notes

- **Context overflow:** detect truncation errors; shrink history; dynamic chunking; summarize prior turns; raise to models with larger windows only if needed; analyze truncation-related bad answers.
- **API integration:** validate model IDs/inference profiles, IAM, VPC endpoints, payload schema; SDK errors vs throttles vs timeouts; compare playground vs app credentials/regions.
- **Prompt debugging:** version compare in Prompt Management; Logs Insights on prompt/response pairs; schema validation; isolate system vs user vs tool messages; X-Ray prompt observability.
- **Retrieval/embedding drift:** relevance analysis; re-embed after model change; monitor index freshness; fix chunking/preprocessing; tune hybrid/rerank; detect “wrong neighbor” clusters.
- **Agent/tools:** trace tool args/results; validate MCP schemas; timeouts; IAM denials; infinite loops; Step Functions execution history for ReAct paths.

## AWS services

Amazon CloudWatch Logs Insights, AWS X-Ray, Amazon Bedrock invocation logging / Prompt Management, Amazon OpenSearch, Amazon Bedrock Knowledge Bases, Amazon Bedrock AgentCore Observability, AWS Step Functions, Amazon Q Developer (pattern assistance).

## Exam traps

- Blaming the FM when the vector index is stale or wrong embedding model was used.
- Fixing prompts while API is hitting the wrong region/endpoint.
- Ignoring tool IAM AccessDenied buried in agent traces.
- Increasing max tokens endlessly instead of fixing retrieval noise.

## Hands-on project ideas

1. Force a context overflow; implement history summarization; verify fix with Logs Insights.
2. Break KB by switching embedding model without reindex; diagnose via retrieval relevance drop.
3. Inject bad MCP tool schema; use AgentCore/X-Ray traces to locate the failure span.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html
- https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html
