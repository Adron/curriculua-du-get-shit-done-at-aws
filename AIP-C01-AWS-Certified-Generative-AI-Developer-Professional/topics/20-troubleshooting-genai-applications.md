---
title: "20: Troubleshooting GenAI applications"
---

# 20: Troubleshooting GenAI applications

**Domain 5 · Task 5.2 · Skills 5.2.1-5.2.5**

Diagnosing GenAI-specific failures: context window overflow, Bedrock API integration errors, prompt defects, retrieval/embedding drift, and agent tool failures, using logs, X-Ray, and systematic refinement.

This closes out the exam, and it's really one question asked many ways: **when production breaks, which layer is it?** Context, API, prompt, retrieval, or tools. Debugging is debugging. Isolate the layer, check the logs, change one thing at a time. The difference here is that half the failures look like "the model said something dumb" when the real cause is three layers down.

## What to know

- **Context overflow:** detect truncation errors; shrink history; dynamic chunking; summarize prior turns; move to a larger-window model only if needed; analyze truncation-related bad answers.
- **API integration:** validate model IDs/inference profiles, IAM, VPC endpoints, and payload schema. Tell SDK errors from throttles from timeouts. Compare playground vs app credentials and Regions.
- **Prompt debugging:** compare versions in Prompt Management; Logs Insights on prompt/response pairs; schema validation; isolate system vs user vs tool messages; X-Ray prompt observability.
- **Retrieval/embedding drift:** relevance analysis; re-embed after a model change; monitor index freshness; fix chunking/preprocessing; tune hybrid/rerank; detect "wrong neighbor" clusters.
- **Agent/tools:** trace tool args and results; validate MCP schemas; timeouts; IAM denials; infinite loops; Step Functions execution history for ReAct paths.

## AWS services in play

Amazon CloudWatch Logs Insights, AWS X-Ray, Amazon Bedrock invocation logging / Prompt Management, Amazon OpenSearch, Amazon Bedrock Knowledge Bases, Amazon Bedrock AgentCore Observability, AWS Step Functions, Amazon Q Developer (pattern assistance).

## Hands-on

Break things on purpose, then write down how you found them. That write-up is the troubleshooting runbook in [B12](../../build.md#b12).

1. Force a context overflow; implement history summarization; verify the fix with Logs Insights.
2. Break the KB by switching embedding models without a reindex; diagnose it through the drop in retrieval relevance.
3. Inject a bad MCP tool schema into the [B10](../../build.md#b10) agent; use AgentCore/X-Ray traces to locate the failing span.

## Exam traps

- Blaming the FM when the vector index is stale or the wrong embedding model was used.
- Fixing prompts while the API is hitting the wrong Region or endpoint.
- Missing a tool IAM AccessDenied buried in agent traces.
- Raising max tokens endlessly instead of fixing retrieval noise.

## Exam guide mapping

- **Task 5.2**, Skills 5.2.1-5.2.5: troubleshoot GenAI applications.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html>
- <https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html>
- <https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html>