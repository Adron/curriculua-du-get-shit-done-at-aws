# 10 — Monitoring inference and performance

**Domain 4 · Task 4.1** · Skills **4.1.1–4.1.6** · Domain weight **24%**

## What it is

Watching production ML/GenAI: CloudWatch GenAI observability, Bedrock Model Evaluation, drift pipelines, workflow anomalies, A/B tests, agent coordination failures, and FM-specific eval monitoring.

## Why it matters for MLA-C02

C02 adds **agent performance/coordination monitoring** (tool failures, truncated streaming, coordination failures) and **FM-specific evaluation monitoring** beyond classic Model Monitor.

## Exam-relevant skills map

| Skill | Focus |
|---|---|
| 4.1.1 | CloudWatch GenAI observability, Bedrock Model Evaluation, drift pipelines |
| 4.1.2 | Anomalies in data processing or inference workflows |
| 4.1.3 | Data distribution change detection |
| 4.1.4 | A/B testing in production |
| 4.1.5 | Agent performance & coordination failures |
| 4.1.6 | FM performance monitoring / Bedrock evaluations |

## Monitoring stack

| Layer | What to watch |
|---|---|
| **Infra** | CPU/GPU, memory, disk, instance health |
| **Endpoint / API** | Invocations, errors (4xx/5xx), latency p50/p99, saturation |
| **Model quality** | Accuracy vs baseline, residual error |
| **Data quality / drift** | Feature distributions vs training baseline |
| **GenAI** | Token usage, throttles, stop reasons, Guardrail interventions |
| **Agents** | Step success, tool error rate, truncated streams, session duration |
| **RAG** | Retrieval empty-rate, citation presence, faithfulness scores |

## Drift & baselines

- Capture baseline with Model Monitor (data quality, model quality, bias, feature attribution drift).
- Schedule monitoring jobs; EventBridge → alert / retrain pipeline.
- Separate **data drift** (input distribution) from **concept drift** (label relationship).

## A/B testing (4.1.4)

- SageMaker production variants with traffic weights (e.g., 90/10).
- Compare business + technical metrics for equal duration / sample size.
- Promote winner; keep rollback weights ready.
- For Bedrock: dual prompts/models behind app router or aliases; same discipline.

## Agent coordination failures (4.1.5) — C02 hot

| Failure | Symptom | Monitor |
|---|---|---|
| Tool failure | Exception / timeout from Lambda/MCP | Tool error %, latency |
| Coordination failure | Multi-agent handoff drop | Incomplete workflows |
| Truncated streaming | Partial user-visible output | Stop reason, byte length vs expected |
| Looping | Token burn without progress | Steps/session, max-iteration hits |

AgentCore Observability emits OTEL-compatible traces/metrics into CloudWatch — use dashboards for session count, latency, tokens, errors.

## FM evals in production (4.1.6)

- Periodic Bedrock Model Evaluation jobs on sampled prod prompts (privacy-safe).
- Online metrics: user thumbs, task success, Guardrail block rate.
- Offline golden sets for regression after prompt/model changes.

## AWS services

CloudWatch (metrics, logs, alarms, GenAI observability), SageMaker Model Monitor, Bedrock Model Evaluation, Bedrock AgentCore Observability, EventBridge, SNS, X-Ray (deeper traces — topic 11).

## Hands-on practice

1. Enable detailed endpoint metrics; alarm on p99 latency and 5xx rate.
2. Create Model Monitor baseline + schedule; inject drifted data; confirm alarm.
3. Split traffic 80/20 across two variants; read invocation metrics per variant.
4. Enable AgentCore/CloudWatch observability; force a tool failure; find it in traces.
5. Schedule a weekly Bedrock eval on a sampled prompt set.

## Common traps

- Alarms only on host CPU — missing model quality collapse.
- A/B without enough traffic or with confounded releases (prompt + model same day).
- Ignoring Guardrail block spikes (safety or UX incident).
- Treating agent “success HTTP 200” as task success.
- No separate RAG retrieval metrics.

## Research links

- https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/model-ab-testing.html
- https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf
