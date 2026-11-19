# 16 — Cost optimization and resource efficiency

**Exam map:** Domain 4 · Task **4.1** · Skills **4.1.1–4.1.4**

## What it is

Reducing GenAI spend without gutting quality: token efficiency, tiered models, batching/utilization, Provisioned Throughput economics, semantic caching and Bedrock prompt caching.

## Why it matters for AIP-C01

Domain 4 is smaller but dense. Wrong caching/throughput choices are classic traps; Global inference cost tradeoffs appear with residency constraints.

## Production implementation notes

- **Tokens:** estimate before send; prune history; compress prompts; cap `maxTokens`; retrieve fewer, better chunks; avoid dumping entire docs into context.
- **Tiered models:** classify query complexity; cascade cheap→expensive; distill where Bedrock distillation fits.
- **Throughput:** batch embeddings/inference; right-size Provisioned Throughput MUs only for steady load/custom models; monitor utilization.
- **Caching:**
  - **Prompt caching** (implicit/explicit cache points on supported models)—on-demand only, not batch; works with cross-Region but may increase cache writes under routing.
  - **Semantic cache** (ElastiCache/MemoryDB/OpenSearch) for near-duplicate queries.
  - Deterministic request hashing for identical prompts.
- **Architecture:** prefer serverless on-demand for spiky apps; Global inference profiles when residency allows (~10% savings per docs).

## AWS services

Amazon Bedrock (prompt caching, Provisioned Throughput, distillation, inference profiles), Amazon ElastiCache / MemoryDB, Amazon OpenSearch, Amazon CloudWatch, AWS Cost Explorer / Cost Anomaly Detection, AWS Lambda.

## Exam traps

- Prompt caching with batch inference (unsupported).
- Provisioned Throughput for low-duty PoCs.
- Caching personalized/PII answers without tenancy keys (leakage).
- Ignoring cache-read vs cache-write token billing semantics.

## Hands-on project ideas

1. Add explicit `cachePoint` to a large system prompt; compare `cacheReadInputTokens` vs baseline cost.
2. Semantic cache in front of Converse keyed by embedding similarity threshold.
3. Cost dashboard: tokens by modelId + throttle rate; set Cost Anomaly Detection.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/model-invocations.html
- https://docs.aws.amazon.com/cost-management/latest/userguide/cost-anomaly-detect-get-started.html
