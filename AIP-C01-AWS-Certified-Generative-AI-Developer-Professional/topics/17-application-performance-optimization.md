# 17 — Application performance optimization

**Exam map:** Domain 4 · Task **4.2** · Skills **4.2.1–4.2.6**

## What it is

Tuning GenAI UX and systems for latency and throughput: streaming, precompute, latency-optimized models, hybrid search performance, inference parameters (temperature/top-k/top-p), concurrency, and GenAI-aware autoscaling.

## Why it matters for AIP-C01

Users feel TTFT (time-to-first-token). Exam pairs latency-cost tradeoffs with retrieval and parameter tuning.

## Production implementation notes

- **Latency:** stream responses; parallelize independent tool/LLM calls; precompute FAQs; pick latency-optimized Bedrock models when SLA-critical; benchmark p50/p95 end-to-end (not just model latency).
- **Retrieval perf:** index tuning (HNSW params, shards), query preprocessing, hybrid scoring; cache hot embeddings/queries; avoid over-fetching k.
- **Throughput:** batch where UX allows; manage concurrent invokes vs account quotas; cascade to shed load.
- **Decoding params:** lower temperature / nucleus for factual RAG; higher for creative; A/B systematically via Prompt Management variants.
- **Autoscaling:** scale on queue depth, concurrent streams, or token rate—not only CPU. AgentCore Runtime consumption model vs provisioned GPU pools differ—choose deliberately.
- **Profile:** X-Ray/OTEL for prompt→retrieve→generate spans; optimize the slowest stage first.

## AWS services

Amazon Bedrock (streaming, latency-optimized models), Amazon OpenSearch, Amazon API Gateway WebSocket, AWS Lambda, Application Auto Scaling / AWS Auto Scaling, Amazon SageMaker endpoints, AWS X-Ray, Amazon CloudWatch, Amazon Bedrock AgentCore Runtime.

## Exam traps

- High temperature on grounded FAQ answers.
- Optimizing model latency while KB retrieval dominates p95.
- Autoscaling GPUs on CPU% alone.
- Fetching top-50 chunks into context “for safety” (hurts latency and cost).

## Hands-on project ideas

1. Compare buffered vs streamed Converse for TTFT.
2. Tune OpenSearch hybrid weights; measure recall@k vs latency.
3. A/B temperature 0 vs 0.7 on the same golden set (faithfulness + preference).

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html
- https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html
- https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html
- https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html
