---
title: "18: Monitoring GenAI applications"
---

# 18: Monitoring GenAI applications

**Domain 4 · Task 4.3 · Skills 4.3.1-4.3.6**

GenAI-specific observability: CloudWatch model invocation metrics and dashboards, Bedrock invocation logs (CloudWatch/S3), quality and hallucination signals, tool and agent traces, vector store ops, and golden-dataset drift detection.

You can't operate what you can't see. That's been true of every system I've ever run, and it's doubly true when the system's output is non-deterministic text. The exam expects invocation logging nuances (runtime endpoint only), token and throttle metrics, and agent/tool observability. EC2 CPU graphs aren't going to cut it.

## What to know

- **Enable Model Invocation Logging** to CloudWatch Logs and/or S3. It covers Converse/ConverseStream/InvokeModel*, but **not** calls through other endpoints such as `bedrock-mantle`. Mask sensitive fields.
- **CloudWatch GenAI views:** invocation count, latency, input/output tokens by model, throttles, errors. Alarm on throttle/error spikes and cost anomalies.
- **Quality signals:** sample outputs against golden sets; hallucination/judge scores as custom metrics; response drift alarms.
- **Agents/tools:** AgentCore Observability (OTEL); track tool-call success and latency and multi-agent coordination; baseline the anomalies.
- **Vector ops:** monitor query latency, ingest lag, index health, and embedding failure rates; validate data quality on refresh.
- **Forensics:** request IDs into Logs Insights; correlate with X-Ray; retain per policy.

## AWS services in play

Amazon Bedrock invocation logging, Amazon CloudWatch / Logs Insights, AWS X-Ray, Amazon Bedrock AgentCore Observability, Amazon OpenSearch metrics, AWS Cost Anomaly Detection, Amazon Managed Grafana (optional).

## Hands-on

1. Turn on CloudWatch invocation logging, open the Model Invocations dashboard, and alarm on Throttles. This is the dashboard half of [B12](../../build.md#b12).
2. A custom metric `hallucination_flag` driven by grounding-check failures.
3. An AgentCore/OTEL trace of a tool-failing agent; find the bottleneck span.

## Exam traps

- Expecting invocation logs for non-`bedrock-runtime` endpoints.
- Metrics only, with no payload logging, when you're debugging prompt failures. (And the inverse: logging secrets.)
- No golden-set regression after a model upgrade.
- Ignoring tool-error rates while only watching model latency.

## Exam guide mapping

- **Task 4.3**, Skills 4.3.1-4.3.6: implement monitoring for GenAI applications.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html>
- <https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/model-invocations.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html>
- <https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html>
- <https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html>
- <https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/design-principles.html>