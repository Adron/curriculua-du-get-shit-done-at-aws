---
title: "17: Application performance optimization"
---

# 17: Application performance optimization

**Domain 4 · Task 4.2 · Skills 4.2.1-4.2.6**

Tuning GenAI UX and systems for latency and throughput: streaming, precompute, latency-optimized models, hybrid search performance, inference parameters (temperature/top-k/top-p), concurrency, and GenAI-aware autoscaling.

Users feel TTFT (time-to-first-token) more than anything else. A chat window that sits there blank for four seconds feels broken, even when the answer is great. The exam pairs latency/cost tradeoffs with retrieval and parameter tuning, so think end to end.

## What to know

- **Latency:** stream responses; parallelize independent tool/LLM calls; precompute FAQs; pick latency-optimized Bedrock models when the SLA is critical; benchmark p50/p95 end to end, not just model latency.
- **Retrieval perf:** index tuning (HNSW params, shards), query preprocessing, hybrid scoring; cache hot embeddings and queries; don't over-fetch k.
- **Throughput:** batch where the UX allows; manage concurrent invokes against account quotas; cascade to shed load.
- **Decoding params:** lower temperature / nucleus for factual RAG; higher for creative work. A/B them systematically with Prompt Management variants.
- **Autoscaling:** scale on queue depth, concurrent streams, or token rate, not only CPU. The AgentCore Runtime consumption model and provisioned GPU pools behave differently, so choose deliberately.
- **Profile:** X-Ray/OTEL spans for prompt, retrieve, generate. **Optimize the slowest stage first.**

## AWS services in play

Amazon Bedrock (streaming, latency-optimized models), Amazon OpenSearch, Amazon API Gateway WebSocket, AWS Lambda, Application Auto Scaling / AWS Auto Scaling, Amazon SageMaker endpoints, AWS X-Ray, Amazon CloudWatch, Amazon Bedrock AgentCore Runtime.

## Hands-on

1. Compare buffered vs streamed Converse for TTFT on the [B9](../../build.md#b9) API.
2. Tune OpenSearch hybrid weights; measure recall@k against latency.
3. A/B temperature 0 vs 0.7 on the same golden set (faithfulness + preference). Reuse the [B12](../../build.md#b12) golden questions.

## Exam traps

- High temperature on grounded FAQ answers.
- Optimizing model latency while KB retrieval dominates p95.
- Autoscaling GPUs on CPU% alone.
- Fetching the top 50 chunks into context "for safety." It hurts latency and cost, and usually quality too.

## Exam guide mapping

- **Task 4.2**, Skills 4.2.1-4.2.6: optimize application performance.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html>
- <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html>
- <https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html>
- <https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html>
- <https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html>