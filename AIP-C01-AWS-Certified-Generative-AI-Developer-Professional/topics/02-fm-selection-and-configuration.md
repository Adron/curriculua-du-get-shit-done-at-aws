# 02 — FM selection and configuration

**Exam map:** Domain 1 · Task **1.2** · Skills **1.2.1–1.2.4**

## What it is

Selecting the right foundation model for capability, region, cost, and risk—then building architectures that can switch models, survive regional capacity limits, and manage customized model lifecycles (LoRA/adapters, registries, rollbacks).

## Why it matters for AIP-C01

Skill questions hinge on benchmarks, dynamic routing (Lambda/API Gateway/AppConfig), Bedrock **cross-Region inference** profiles, and SageMaker/Bedrock customization paths—not “biggest model wins.”

## Production implementation notes

- **Selection rubric:** modality (text/vision/embed), context window, tool-use support, latency class, price/1M tokens, region availability, safety posture. Prefer Converse for model-portable app code.
- **Dynamic switching:** resolve `modelId` / inference profile from AWS AppConfig or Parameter Store; route via API Gateway + Lambda. Avoid hardcoding provider-specific InvokeModel bodies when Converse works.
- **Resilience:** Geographic cross-Region inference for residency; Global profiles for ~10% cost savings when compliance allows. Inference profiles do **not** support Provisioned Throughput—plan fallbacks (retry, degrade to smaller model, queue).
- **Customization:** Bedrock supervised fine-tuning / distillation / reinforcement fine-tuning where supported; SageMaker LoRA (`lora_rank`, `lora_alpha`, optional `merge_weights`) for PEFT. Custom Bedrock models typically require Provisioned Throughput to invoke.
- **Lifecycle:** SageMaker Model Registry for versions, approval stages, deploy/rollback; automate retirement of superseded adapters.

## AWS services

Amazon Bedrock (models, inference profiles, custom models, Provisioned Throughput), AWS AppConfig, Amazon API Gateway, AWS Lambda, AWS Step Functions (circuit breakers), Amazon SageMaker AI (LoRA, Model Registry), Amazon CloudWatch.

## Exam traps

- Assuming Provisioned Throughput works with cross-Region inference profiles (it does not).
- Choosing Global inference when the scenario requires EU/US data residency.
- Deploying LoRA adapters without a registry/approval/rollback story.
- Forgetting customized Bedrock models often need Provisioned Throughput.

## Hands-on project ideas

1. AppConfig-driven model router that A/B’s Haiku-class vs Sonnet-class on the same Converse payload.
2. Invoke via a US Geographic inference profile; document CloudTrail source-Region logging and SCP implications.
3. Register a SageMaker LoRA adapter version; simulate failed deploy → rollback to previous Model Registry stage.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/models.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/customizing-models-lora.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html
