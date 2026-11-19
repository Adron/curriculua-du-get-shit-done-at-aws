# 11 — Cost and performance optimization

**Domain 4 · Task 4.2** · Skills **4.2.1–4.2.10** · Domain weight **24%**

## What it is

Right-sizing inference/training spend and performance: instance families, AgentCore Observability, X-Ray, dashboards, capacity, purchasing options, FM inference cost, agent resource use, and AI-specific cost patterns (tokens, embeddings, vector DB).

## Why it matters for MLA-C02

C02 adds **FM inference cost**, **agent resource consumption**, **token/embedding/vector DB cost patterns**, and calls out **AgentCore Observability** beside CloudWatch/X-Ray.

## Exam-relevant skills map

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

## Instance family intuition

| Family cue | Workload |
|---|---|
| CPU (m/c/r) | Classic SKLearn/XGB, light transformers |
| GPU (g/p) | Deep learning train/infer, large embeddings |
| Inferentia / Trainium (where applicable) | Cost-optimized DL infer/train |
| Memory-optimized | Large feature joins, big batch |

Match framework, batch size, and concurrency — oversized GPUs idle = wasted $.

## Observability for optimization

| Tool | Role |
|---|---|
| **CloudWatch** | Metrics, logs, alarms, GenAI dashboards |
| **AgentCore Observability** | Agent traces, tokens/session, latency, errors |
| **X-Ray** | Distributed trace across API → Lambda → SageMaker/Bedrock |
| **Compute Optimizer / Trusted Advisor** | Rightsizing hints (in-scope management tools) |

Dashboards should show **$/request**, latency SLO, error rate, GPU util, token burn.

## Purchasing & capacity

| Option | When |
|---|---|
| On-demand | Bursty, unknown |
| Spot (+ checkpoints) | Fault-tolerant training |
| Savings Plans / Reserved | Steady 24/7 endpoints |
| Serverless inference | Idle-heavy endpoints |
| Bedrock provisioned throughput | Sustained FM TPS |
| Autoscaling + scale-to-zero patterns | Diurnal traffic |

Budgets + Cost Explorer + Billing alarms for quotas (4.2.5).

## FM & GenAI cost patterns (C02)

| Lever | Optimization |
|---|---|
| **Tokens** | Shorter prompts, summarization, caching, smaller model routing |
| **Output length** | Max tokens caps; stop sequences |
| **Embeddings** | Cache doc embeddings; re-embed only deltas |
| **Vector DB** | Right dimension/index; TTL/lifecycle cold vectors; avoid oversharding |
| **RAG** | Lower top-k after rerank; don’t stuff unused context |
| **Agents** | Cap max tool loops; cheaper model for routing, stronger for final answer |

## Agent resource consumption (4.2.8)

Monitor sessions × average steps × tokens/step × tool invocations. A “cheap” FM becomes expensive with 20 tool loops. Set budgets per agent and alert on outliers.

## AWS services

CloudWatch, X-Ray, Bedrock AgentCore Observability, Cost Explorer, Budgets, Compute Optimizer, Auto Scaling, SageMaker Inference recommender concepts, Bedrock pricing dimensions (input/output tokens, embeddings, provisioned).

## Hands-on practice

1. Compare two instance types for same endpoint TPS/latency; pick Pareto winner.
2. Build a CloudWatch dashboard: p99, Invocations, GPU util, estimated cost metric.
3. Trace a request with X-Ray across API Gateway → Lambda → Bedrock.
4. Measure token cost before/after prompt compression + top-k reduction.
5. Enable AgentCore observability; chart tokens per successful task.

## Common traps

- Optimizing instance $ while RAG context doubles token spend.
- Provisioned throughput for spiky demos.
- No max-tokens on agents (runaway loops).
- Re-embedding entire corpus nightly.
- Dashboards without alarms or owners.

## Research links

- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html
- https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html
- https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html
- https://aws.amazon.com/bedrock/pricing/
