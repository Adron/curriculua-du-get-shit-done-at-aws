# 10 — FM API integrations

**Exam map:** Domain 2 · Task **2.4** · Skills **2.4.1–2.4.4**

## What it is

Correct, resilient use of Bedrock runtime APIs: synchronous Converse/InvokeModel, async via SQS, streaming (ConverseStream / InvokeModelWithResponseStream), SDK backoff, rate limits, X-Ray tracing, and intelligent model routing.

## Why it matters for AIP-C01

Integration bugs (wrong endpoint, no stream, naive retries, no routing) are classic Professional-level distractors.

## Production implementation notes

- **Sync:** Converse for portable chat/tooling; InvokeModel when you need raw model bodies. Always use `bedrock-runtime` for inference.
- **Async:** SQS/SNS + Lambda workers for batch and long-running; store outputs in S3; don’t hold API Gateway 29s for multi-minute jobs.
- **Streaming:** ConverseStream / response streams to WebSocket API Gateway or SSE clients; improves perceived latency.
- **Resilience:** AWS SDK exponential backoff + jitter; map throttles (`ThrottlingException`) to queues; circuit-break to smaller models; X-Ray across gateway→Lambda→Bedrock.
- **Routing:** static config, Step Functions content-based routing, or metrics-driven routing (latency/error/cost). API Gateway request transforms for header-based model selection.

## AWS services

Amazon Bedrock Runtime (Converse, ConverseStream, InvokeModel*), Amazon API Gateway (REST/WebSocket), AWS Lambda, Amazon SQS, AWS Step Functions, AWS X-Ray, AWS SDKs.

## Exam traps

- Calling control-plane `bedrock` endpoint for inference.
- Busy-loop retries without backoff (amplifies throttles).
- Buffering full stream server-side before returning to client (defeats streaming).
- Ignoring `responseStreamingSupported` when selecting models.

## Hands-on project ideas

1. WebSocket API that proxies ConverseStream chunks to the browser.
2. SQS worker with SDK retry config; inject throttles and verify DLQ behavior.
3. X-Ray service map for API Gateway → Lambda → Bedrock with annotation `modelId`.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html
- https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/inference-invoke.html
- https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html
- https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html
- https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html
