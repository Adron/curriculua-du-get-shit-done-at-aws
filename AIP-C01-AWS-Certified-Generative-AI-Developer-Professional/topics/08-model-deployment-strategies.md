---
title: "08: Model deployment strategies"
---

# 08: Model deployment strategies

**Domain 2 · Task 2.2 · Skills 2.2.1-2.2.3**

How FMs actually get invoked and hosted: serverless on-demand Bedrock via Lambda, Provisioned Throughput, SageMaker hybrid endpoints, container/GPU LLM hosting, and cascading from smaller to larger models.

Match the deployment to the traffic shape and to LLM constraints (memory, GPU, tokens per minute). Don't treat GenAI like a tiny sklearn endpoint. A 70B parameter model has opinions about the box you put it in.

## What to know

- **On-demand Bedrock + Lambda:** the default for bursty, variable traffic. Pay per token, watch concurrency and account quotas, and go async (SQS) for long jobs.
- **Provisioned Throughput:** buy Model Units for steady high TPS, or because many custom models **require** it. Commitment discounts: none, 1 month, 6 months. Not usable with inference profiles.
- **SageMaker hybrid:** Bedrock for general FM calls plus SageMaker endpoints for domain LoRA or custom containers; one app-level router picks the backend.
- **Container/GPU hosting:** ECS/EKS/Fargate or SageMaker with optimized loading, token capacity, and memory. Plan for cold starts and model weight caching.
- **Cascading:** Micro/Lite/Haiku-class models for classification and routing; escalate to Pro/Sonnet-class only when needed. **This is one of the biggest cost levers you have.**

## AWS services in play

Amazon Bedrock (on-demand, Provisioned Throughput), AWS Lambda, Amazon SageMaker AI endpoints, Amazon ECS / EKS, Amazon ECR, Amazon API Gateway, Amazon SQS, AWS Auto Scaling.

## Hands-on

1. Cascade router: a cheap model classifies complexity, and the expensive model only runs if needed. Ask Composite Code gets this in [B12](../../build.md#b12).
2. Load-test on-demand vs 1 MU provisioned; chart throttle rate against cost.
3. A SageMaker endpoint for a LoRA adapter behind the same OpenAPI as Bedrock Converse.

## Exam traps

- Buying Provisioned Throughput for spiky, low-duty workloads. That's just paying for idle.
- Hosting a 70B model on undersized GPU memory with no quantization or cascade strategy.
- Forgetting custom Bedrock models may require Provisioned Throughput.
- No graceful degradation when the large model throttles.

## Exam guide mapping

- **Task 2.2**, Skills 2.2.1-2.2.3: implement model deployment strategies.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-use.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-supported.html>
- <https://docs.aws.amazon.com/lambda/latest/dg/welcome.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html>