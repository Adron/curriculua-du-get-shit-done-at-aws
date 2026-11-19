---
title: "16: Cost optimization and resource efficiency"
---

# 16: Cost optimization and resource efficiency

**Domain 4 · Task 4.1 · Skills 4.1.1-4.1.4**

Cutting GenAI spend without gutting quality: token efficiency, tiered models, batching and utilization, Provisioned Throughput economics, semantic caching, and Bedrock prompt caching.

Domain 4 is small but dense. Wrong caching and throughput choices are classic traps, and Global inference cost tradeoffs show up alongside residency constraints. Tokens are the new cloud bill line item that nobody watched until the invoice showed up. **Watch them from day one.**

## What to know

- **Tokens:** estimate before you send; prune history; compress prompts; cap `maxTokens`; retrieve fewer, better chunks. Don't dump entire docs into context.
- **Tiered models:** classify query complexity; cascade cheap to expensive; distill where Bedrock distillation fits.
- **Throughput:** batch embeddings and inference; right-size Provisioned Throughput MUs only for steady load or custom models; monitor utilization.
- **Caching:**
  - **Prompt caching** (implicit/explicit cache points on supported models): on-demand only, not batch. Works with cross-Region, but routing may increase cache writes.
  - **Semantic cache** (ElastiCache/MemoryDB/OpenSearch) for near-duplicate queries.
  - Deterministic request hashing for identical prompts.
- **Architecture:** prefer serverless on-demand for spiky apps; Global inference profiles when residency allows (about 10% savings per the docs).

## AWS services in play

Amazon Bedrock (prompt caching, Provisioned Throughput, distillation, inference profiles), Amazon ElastiCache / MemoryDB, Amazon OpenSearch, Amazon CloudWatch, AWS Cost Explorer / Cost Anomaly Detection, AWS Lambda.

## Hands-on

1. Add an explicit `cachePoint` to a large system prompt; compare `cacheReadInputTokens` against the baseline cost. Ask Composite Code's system prompt is a perfect candidate in [B12](../../build.md#b12).
2. A semantic cache in front of Converse, keyed on an embedding similarity threshold.
3. A cost dashboard: tokens by modelId + throttle rate, with Cost Anomaly Detection set up.

## Exam traps

- Prompt caching with batch inference (unsupported).
- Provisioned Throughput for low-duty PoCs.
- Caching personalized or PII answers without tenancy keys. That's a leak, not an optimization.
- Ignoring cache-read vs cache-write token billing semantics.

## Exam guide mapping

- **Task 4.1**, Skills 4.1.1-4.1.4: optimize cost and resource efficiency.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html>
- <https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/model-invocations.html>
- <https://docs.aws.amazon.com/cost-management/latest/userguide/cost-anomaly-detect-get-started.html>