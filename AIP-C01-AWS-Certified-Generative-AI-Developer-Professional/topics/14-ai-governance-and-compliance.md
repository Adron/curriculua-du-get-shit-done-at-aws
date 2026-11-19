---
title: "14: AI governance and compliance"
---

# 14: AI governance and compliance

**Domain 3 · Task 3.3 · Skills 3.3.1-3.3.4**

The organizational control plane for GenAI: model cards, data lineage, Glue Catalog attribution, CloudTrail and decision logs, continuous monitoring for misuse/drift/bias, and output policy filters.

Governance is what separates a hobby RAG project from a production one. The exam expects lineage + audit + policy filters, not just "we use Guardrails." I'll admit governance isn't the part of a project that gets me out of bed in the morning, but it's the part that keeps the project alive once a compliance team finds it.

## What to know

- **Model cards:** SageMaker programmatic model cards documenting intended use, limitations, and training/eval data notes for customized models. Link them to Model Registry versions.
- **Lineage:** register corpora in the Glue Data Catalog; metadata tags for source attribution in generated content; KB metadata flowing through to citations in answers.
- **Audit:** CloudTrail for management and data events around evals and config changes; CloudWatch Logs for decision traces; AgentCore Observability for agent steps.
- **Continuous controls:** detect misuse, policy violations, and bias drift; automate alerts and remediation; token-level redaction; AI output policy filters; scheduled Clarify/fairness jobs where applicable.
- **Org frameworks:** map controls to policies and regulations; Service Catalog for approved GenAI products; prevent shadow-IT model keys.

## AWS services in play

Amazon SageMaker Model Cards / Model Registry / Clarify, AWS Glue Data Catalog, AWS CloudTrail, Amazon CloudWatch, Amazon Bedrock Guardrails, AWS Service Catalog, Amazon Bedrock AgentCore Observability, AWS Config (supporting).

## Hands-on

1. Glue Catalog tables for each KB data source; propagate `source_id` metadata into chunks. For Ask Composite Code, every answer should cite the post it came from.
2. A model card + registry approval gate before an endpoint update. The model card is part of [B11](../../build.md#b11).
3. A CloudWatch metric filter + alarm on a spike in Guardrail `INTERVENED`.

## Exam traps

- No source attribution on RAG answers in a regulated scenario.
- Changing production prompts or models with zero CloudTrail-friendly change control.
- Bias monitoring only at launch, never continuously.
- Treating model cards as optional fluff for customized models that are under audit.

## Exam guide mapping

- **Task 3.3**, Skills 3.3.1-3.3.4: implement AI governance and compliance mechanisms.

## Research links

- <https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html>
- <https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html>
- <https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/cloudtrail-events-in-model-evaluations.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-data-bias.html>