---
title: "10: Monitoring inference and performance"
---

# 10: Monitoring inference and performance

**Domain 4 (24%) · Task 4.1 · Skills 4.1.1-4.1.6**

Watching ML and GenAI in production: CloudWatch GenAI observability, Bedrock Model Evaluation, drift pipelines, workflow anomalies, A/B tests, agent coordination failures, and FM-specific eval monitoring.

C02 goes past classic Model Monitor here and adds **agent performance and coordination monitoring** (tool failures, truncated streaming, coordination failures) plus **FM-specific evaluation monitoring**.

**An HTTP 200 is not a success.** The endpoint can be green across the board while the model quietly drifts, retrieval comes back empty, and the agent loops through its token budget. Monitor what the system is *for*, not just whether it's up.

## What to know

### Skills map

| Skill | Focus |
|---|---|
| 4.1.1 | CloudWatch GenAI observability, Bedrock Model Evaluation, drift pipelines |
| 4.1.2 | Anomalies in data processing or inference workflows |
| 4.1.3 | Data distribution change detection |
| 4.1.4 | A/B testing in production |
| 4.1.5 | Agent performance & coordination failures |
| 4.1.6 | FM performance monitoring / Bedrock evaluations |

### Monitoring stack

| Layer | What to watch |
|---|---|
| **Infra** | CPU/GPU, memory, disk, instance health |
| **Endpoint / API** | Invocations, errors (4xx/5xx), latency p50/p99, saturation |
| **Model quality** | Accuracy vs baseline, residual error |
| **Data quality / drift** | Feature distributions vs training baseline |
| **GenAI** | Token usage, throttles, stop reasons, Guardrail interventions |
| **Agents** | Step success, tool error rate, truncated streams, session duration |
| **RAG** | Retrieval empty-rate, citation presence, faithfulness scores |

### Drift and baselines

- Capture a baseline with Model Monitor (data quality, model quality, bias, feature attribution drift).
- Schedule monitoring jobs; EventBridge routes to an alert or a retrain pipeline.
- Keep **data drift** (input distribution) separate from **concept drift** (the label relationship).

### A/B testing (4.1.4)

- SageMaker production variants with traffic weights (e.g., 90/10).
- Compare business and technical metrics over equal duration and sample size.
- Promote the winner and keep rollback weights ready.
- For Bedrock: dual prompts or models behind an app router or aliases. Same discipline.

### Agent coordination failures (4.1.5): C02 hot topic

| Failure | Symptom | Monitor |
|---|---|---|
| Tool failure | Exception / timeout from Lambda/MCP | Tool error %, latency |
| Coordination failure | Multi-agent handoff drop | Incomplete workflows |
| Truncated streaming | Partial user-visible output | Stop reason, byte length vs expected |
| Looping | Token burn without progress | Steps/session, max-iteration hits |

AgentCore Observability emits OTEL-compatible traces and metrics into CloudWatch. Use dashboards for session count, latency, tokens, and errors.

### FM evals in production (4.1.6)

- Periodic Bedrock Model Evaluation jobs on sampled prod prompts (privacy-safe).
- Online metrics: user thumbs, task success, Guardrail block rate.
- Offline golden sets for regression after any prompt or model change.

## AWS services in play

CloudWatch (metrics, logs, alarms, GenAI observability), SageMaker Model Monitor, Bedrock Model Evaluation, Bedrock AgentCore Observability, EventBridge, SNS, and X-Ray for deeper traces (topic 11).

## Hands-on

1. Enable detailed endpoint metrics and alarm on p99 latency and 5xx rate.
2. Create a Model Monitor baseline + schedule, inject drifted data, and confirm the alarm fires. With the [B5](../../build.md#b5) classifier, the drift is real: what I write about in 2026 doesn't look like what I wrote about in 2011. This is the monitoring half of [B8](../../build.md#b8).
3. Split traffic 80/20 across two variants and read invocation metrics per variant.
4. Enable AgentCore/CloudWatch observability, force a tool failure, and find it in the traces.
5. Schedule a weekly Bedrock eval on a sampled prompt set.

## Exam traps

- Alarms only on host CPU, missing a model quality collapse entirely.
- A/B tests without enough traffic, or confounded releases (prompt + model changed the same day).
- Ignoring Guardrail block spikes. That's either a safety incident or a UX incident.
- Treating an agent's HTTP 200 as task success.
- No separate RAG retrieval metrics.

## Exam guide mapping

- **Domain 4 (24%) · Task 4.1 · Skills 4.1.1-4.1.6**: monitoring inference and performance.

## Research links

- <https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html>
- <https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/model-ab-testing.html>
- <https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf>