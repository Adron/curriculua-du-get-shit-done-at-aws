# 08 — Model deployment strategies

**Exam map:** Domain 2 · Task **2.2** · Skills **2.2.1–2.2.3**

## What it is

How FMs are invoked and hosted: serverless on-demand Bedrock via Lambda, Provisioned Throughput, SageMaker hybrid endpoints, container/GPU LLM hosting, and cascading smaller→larger models.

## Why it matters for AIP-C01

You must match deployment to traffic shape and LLM constraints (memory, GPU, tokens/min)—not treat GenAI like a tiny classical sklearn endpoint.

## Production implementation notes

- **On-demand Bedrock + Lambda:** default for bursty, variable traffic; pay per token; watch concurrency and account quotas; use async (SQS) for long jobs.
- **Provisioned Throughput:** buy Model Units for steady high TPS or **required** for many custom models; commitment discounts (none/1mo/6mo). Not usable with inference profiles.
- **SageMaker hybrid:** Bedrock for general FM calls + SageMaker endpoints for domain LoRA/custom containers; single app router chooses backend.
- **Container/GPU hosting:** ECS/EKS/Fargate or SageMaker with optimized loading, token capacity, and memory; plan cold start and model weight caching.
- **Cascading:** Micro/Lite/Haiku-class for classification/routing; escalate to Pro/Sonnet-class only when needed—major cost lever.

## AWS services

Amazon Bedrock (on-demand, Provisioned Throughput), AWS Lambda, Amazon SageMaker AI endpoints, Amazon ECS / EKS, Amazon ECR, Amazon API Gateway, Amazon SQS, AWS Auto Scaling.

## Exam traps

- Buying Provisioned Throughput for spiky low-duty workloads (waste).
- Hosting a 70B model on undersized GPU memory without quantization/cascade strategy.
- Forgetting custom Bedrock models may require Provisioned Throughput.
- No graceful degradation when the large model throttles.

## Hands-on project ideas

1. Cascade router: cheap model classifies complexity → expensive model only if needed.
2. Load-test on-demand vs 1 MU provisioned; chart throttle rate vs cost.
3. SageMaker endpoint for a LoRA adapter behind the same OpenAPI as Bedrock Converse.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-use.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-supported.html
- https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html
