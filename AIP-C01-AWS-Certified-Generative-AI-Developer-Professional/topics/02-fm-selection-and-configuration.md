---
title: "02: FM selection and configuration"
---

# 02: FM selection and configuration

**Domain 1 · Task 1.2 · Skills 1.2.1-1.2.4**

Pick the right foundation model for capability, Region, cost, and risk. Then build so you can swap that model out, survive regional capacity limits, and manage customized models (LoRA/adapters, registries, rollbacks) over their whole life.

The skill questions here hinge on benchmarks, dynamic routing (Lambda/API Gateway/AppConfig), Bedrock **cross-Region inference** profiles, and the SageMaker/Bedrock customization paths. **"Biggest model wins" is never the answer.** The model you pick today won't be the model you run in six months, so the real question is how cheaply you can change your mind.

## What to know

- **Selection rubric:** modality (text/vision/embed), context window, tool-use support, latency class, price per 1M tokens, Region availability, safety posture. Prefer Converse for model-portable app code.
- **Dynamic switching:** resolve `modelId` or the inference profile from AWS AppConfig or Parameter Store and route through API Gateway + Lambda. Don't hardcode provider-specific InvokeModel bodies when Converse works.
- **Resilience:** Geographic cross-Region inference for residency; Global profiles for roughly 10% cost savings when compliance allows. Inference profiles do **not** support Provisioned Throughput, so plan fallbacks (retry, degrade to a smaller model, queue).
- **Customization:** Bedrock supervised fine-tuning, distillation, or reinforcement fine-tuning where supported; SageMaker LoRA (`lora_rank`, `lora_alpha`, optional `merge_weights`) for PEFT. Custom Bedrock models typically need Provisioned Throughput to invoke.
- **Lifecycle:** SageMaker Model Registry for versions, approval stages, and deploy/rollback. Automate retirement of superseded adapters.

## AWS services in play

Amazon Bedrock (models, inference profiles, custom models, Provisioned Throughput), AWS AppConfig, Amazon API Gateway, AWS Lambda, AWS Step Functions (circuit breakers), Amazon SageMaker AI (LoRA, Model Registry), Amazon CloudWatch.

## Hands-on

1. Build an AppConfig-driven model router that A/B's a Haiku-class vs a Sonnet-class model on the same Converse payload. This is the model-routing piece of [B12](../../build.md#b12).
2. Invoke through a US Geographic inference profile. Document CloudTrail source-Region logging and the SCP implications.
3. Register a SageMaker LoRA adapter version, simulate a failed deploy, and roll back to the previous Model Registry stage.

## Exam traps

- Assuming Provisioned Throughput works with cross-Region inference profiles. It doesn't.
- Choosing Global inference when the scenario requires EU/US data residency.
- Deploying LoRA adapters with no registry, approval, or rollback story.
- Forgetting that customized Bedrock models often need Provisioned Throughput.

## Exam guide mapping

- **Task 1.2**, Skills 1.2.1-1.2.4: select and configure FMs.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/models.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/customizing-models-lora.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html>