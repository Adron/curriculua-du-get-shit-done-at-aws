---
title: "11: Cost and performance optimization"
---

# 11: Cost and performance optimization

**Domain 4 (24%) · Task 4.2 · Skills 4.2.1-4.2.10**

Right-sizing spend and performance for training and inference: instance families, AgentCore Observability, X-Ray, dashboards, capacity, purchasing options, FM inference cost, agent resource use, and the AI-specific cost patterns (tokens, embeddings, vector DBs).

C02 adds **FM inference cost**, **agent resource consumption**, **token/embedding/vector DB cost patterns**, and calls out **AgentCore Observability** right next to CloudWatch and X-Ray.

**With GenAI, the bill hides in the tokens, not the instances.** You can shave 20% off an instance type and still lose because the RAG context doubled. Watch $/request, not just $/hour.

## What to know

### Skills map

| Skill | Focus |
|---|---|
| 4.2.1 | Inference instance families |
| 4.2.2 | CloudWatch, AgentCore Observability, X-Ray |
| 4.2.3 | Performance dashboards |
| 4.2.4 | Capacity for cost/perf/reliability |
| 4.2.5 | Cost quotas / management tools |
| 4.2.6 | Purchasing options |
| 4.2.7 | FM inference cost implications |
| 4.2.8 | Agent resource consumption |
| 4.2.9 | FM usage optimization |
| 4.2.10 | Token, embedding, vector DB cost patterns |

### Instance family intuition

| Family cue | Workload |
|---|---|
| CPU (m/c/r) | Classic SKLearn/XGB, light transformers |
| GPU (g/p) | Deep learning train/infer, large embeddings |
| Inferentia / Trainium (where applicable) | Cost-optimized DL infer/train |
| Memory-optimized | Large feature joins, big batch |

Match the framework, batch size, and concurrency. An oversized GPU sitting idle is just money on fire.

### Observability for optimization

| Tool | Role |
|---|---|
| **CloudWatch** | Metrics, logs, alarms, GenAI dashboards |
| **AgentCore Observability** | Agent traces, tokens/session, latency, errors |
| **X-Ray** | Distributed trace across API → Lambda → SageMaker/Bedrock |
| **Compute Optimizer / Trusted Advisor** | Rightsizing hints (in-scope management tools) |

Dashboards should show **$/request**, latency SLO, error rate, GPU util, and token burn.

### Purchasing and capacity

| Option | When |
|---|---|
| On-demand | Bursty, unknown |
| Spot (+ checkpoints) | Fault-tolerant training |
| Savings Plans / Reserved | Steady 24/7 endpoints |
| Serverless inference | Idle-heavy endpoints |
| Bedrock provisioned throughput | Sustained FM TPS |
| Autoscaling + scale-to-zero patterns | Diurnal traffic |

Budgets, Cost Explorer, and billing alarms cover quotas (4.2.5).

### FM and GenAI cost patterns (C02)

| Lever | Optimization |
|---|---|
| **Tokens** | Shorter prompts, summarization, caching, smaller model routing |
| **Output length** | Max tokens caps; stop sequences |
| **Embeddings** | Cache doc embeddings; re-embed only deltas |
| **Vector DB** | Right dimension/index; TTL/lifecycle cold vectors; avoid oversharding |
| **RAG** | Lower top-k after rerank; don't stuff unused context |
| **Agents** | Cap max tool loops; cheaper model for routing, stronger for final answer |

### Agent resource consumption (4.2.8)

The math: sessions × average steps × tokens per step × tool invocations. A "cheap" FM gets expensive fast with 20 tool loops. Set budgets per agent and alert on outliers.

## AWS services in play

CloudWatch, X-Ray, Bedrock AgentCore Observability, Cost Explorer, Budgets, Compute Optimizer, Auto Scaling, SageMaker Inference Recommender concepts, and Bedrock pricing dimensions (input/output tokens, embeddings, provisioned).

## Hands-on

1. Compare two instance types at the same endpoint TPS/latency and pick the Pareto winner.
2. Build a CloudWatch dashboard: p99, Invocations, GPU util, an estimated cost metric. Put one on the [B8](../../build.md#b8) stack.
3. Trace a request with X-Ray across API Gateway, Lambda, and Bedrock.
4. Measure token cost before and after prompt compression + top-k reduction.
5. Enable AgentCore observability and chart tokens per successful task.

Bonus for the build: the archive only changes when I publish a post, so [B4](../../build.md#b4)/[B6](../../build.md#b6) should embed the delta, never the whole corpus. Easy money.

## Exam traps

- Optimizing instance cost while RAG context doubles the token spend.
- Provisioned throughput for spiky demos.
- No max-tokens limit on agents (runaway loops).
- Re-embedding the entire corpus nightly.
- Dashboards without alarms or owners.

## Exam guide mapping

- **Domain 4 (24%) · Task 4.2 · Skills 4.2.1-4.2.10**: cost and performance optimization.

## Research links

- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html>
- <https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html>
- <https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html>
- <https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html>
- <https://aws.amazon.com/bedrock/pricing/>