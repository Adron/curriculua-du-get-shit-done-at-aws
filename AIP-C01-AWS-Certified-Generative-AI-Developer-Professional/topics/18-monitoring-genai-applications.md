# 18 — Monitoring GenAI applications

**Exam map:** Domain 4 · Task **4.3** · Skills **4.3.1–4.3.6**

## What it is

GenAI-specific observability: CloudWatch model invocation metrics/dashboards, Bedrock invocation logs (CW/S3), quality/hallucination signals, tool/agent traces, vector store ops, and golden-dataset drift detection.

## Why it matters for AIP-C01

You cannot operate what you cannot see. Exam expects invocation logging nuances (runtime endpoint only), token/throttle metrics, and agent/tool observability—not just EC2 CPU.

## Production implementation notes

- **Enable Model Invocation Logging** to CloudWatch Logs and/or S3; covers Converse/ConverseStream/InvokeModel*; **not** calls via other endpoints such as `bedrock-mantle`. Mask sensitive fields.
- **CloudWatch GenAI views:** invocation count, latency, input/output tokens by model, throttles, errors; alarms on throttle/error spikes and cost anomalies.
- **Quality signals:** sample outputs vs golden sets; hallucination/judge scores as custom metrics; response drift alarms.
- **Agents/tools:** AgentCore Observability (OTEL); track tool call success/latency, multi-agent coordination; baseline anomalies.
- **Vector ops:** monitor query latency, ingest lag, index health, embedding failure rates; validate data quality on refresh.
- **Forensics:** request IDs → Logs Insights; correlate with X-Ray; retain per policy.

## AWS services

Amazon Bedrock invocation logging, Amazon CloudWatch / Logs Insights, AWS X-Ray, Amazon Bedrock AgentCore Observability, Amazon OpenSearch metrics, AWS Cost Anomaly Detection, Amazon Managed Grafana (optional).

## Exam traps

- Expecting invocation logs for non-`bedrock-runtime` endpoints.
- Metrics-only without payload logging when debugging prompt failures (and the inverse: logging secrets).
- No golden-set regression after model upgrade.
- Ignoring tool-error rates while only watching model latency.

## Hands-on project ideas

1. Turn on CW invocation logging; open Model Invocations dashboard; alarm on Throttles.
2. Custom metric `hallucination_flag` from grounding check failures.
3. AgentCore/OTEL trace of a tool-failing agent; identify bottleneck span.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/model-invocations.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html
- https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html
- https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/design-principles.html
