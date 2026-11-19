---
title: "10: FM API integrations"
---

# 10: FM API integrations

**Domain 2 · Task 2.4 · Skills 2.4.1-2.4.4**

Using the Bedrock runtime APIs correctly and resiliently: synchronous Converse/InvokeModel, async via SQS, streaming (ConverseStream / InvokeModelWithResponseStream), SDK backoff, rate limits, X-Ray tracing, and intelligent model routing.

This is plumbing, and plumbing is where Professional-level distractors live: the wrong endpoint, no streaming, naive retries, no routing. If you've built anything against a rate-limited API before, most of this will feel familiar. The trick is knowing the Bedrock-specific names for it.

## What to know

- **Sync:** Converse for portable chat and tool use; InvokeModel when you need raw model bodies. Always use `bedrock-runtime` for inference.
- **Async:** SQS/SNS + Lambda workers for batch and long-running work; store outputs in S3. Don't hold an API Gateway 29s connection open for a multi-minute job.
- **Streaming:** ConverseStream / response streams out to WebSocket API Gateway or SSE clients. It makes perceived latency much better.
- **Resilience:** AWS SDK exponential backoff + jitter; map throttles (`ThrottlingException`) to queues; circuit-break to smaller models; X-Ray across gateway, Lambda, and Bedrock.
- **Routing:** static config, Step Functions content-based routing, or metrics-driven routing (latency/error/cost). API Gateway request transforms for header-based model selection.

## AWS services in play

Amazon Bedrock Runtime (Converse, ConverseStream, InvokeModel*), Amazon API Gateway (REST/WebSocket), AWS Lambda, Amazon SQS, AWS Step Functions, AWS X-Ray, AWS SDKs.

## Hands-on

1. A WebSocket API that proxies ConverseStream chunks to the browser. This is the streaming front end of [B9](../../build.md#b9).
2. An SQS worker with SDK retry config. Inject throttles and verify the DLQ behavior.
3. X-Ray service map for API Gateway, Lambda, and Bedrock, with a `modelId` annotation.

## Exam traps

- Calling the control-plane `bedrock` endpoint for inference.
- Busy-loop retries without backoff. That amplifies throttles instead of fixing them.
- Buffering the full stream server-side before returning it to the client, which defeats the point of streaming.
- Ignoring `responseStreamingSupported` when selecting models.

## Exam guide mapping

- **Task 2.4**, Skills 2.4.1-2.4.4: implement FM API integrations.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html>
- <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/inference-invoke.html>
- <https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html>
- <https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html>
- <https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html>