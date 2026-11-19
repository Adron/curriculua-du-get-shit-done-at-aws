# 14 — AI governance and compliance

**Exam map:** Domain 3 · Task **3.3** · Skills **3.3.1–3.3.4**

## What it is

Organizational control planes for GenAI: model cards, data lineage, Glue Catalog attribution, CloudTrail/decision logs, continuous misuse/drift/bias monitoring, and output policy filters.

## Why it matters for AIP-C01

Governance questions separate hobby RAG from production. Expect lineage + audit + policy filters, not just “we use Guardrails.”

## Production implementation notes

- **Model cards:** SageMaker programmatic model cards documenting intended use, limitations, training/eval data notes for customized models; link to Model Registry versions.
- **Lineage:** Glue Data Catalog registration of corpora; metadata tags for source attribution in generated content; KB metadata → citations in answers.
- **Audit:** CloudTrail for management/data events around evals and config changes; CloudWatch Logs for decision traces; AgentCore Observability for agent steps.
- **Continuous controls:** detect misuse, policy violations, bias drift; automate alerts/remediation; token-level redaction; AI output policy filters; scheduled Clarify/fairness jobs where applicable.
- **Org frameworks:** map controls to policies/regulations; Service Catalog for approved GenAI products; prevent shadow IT model keys.

## AWS services

Amazon SageMaker Model Cards / Model Registry / Clarify, AWS Glue Data Catalog, AWS CloudTrail, Amazon CloudWatch, Amazon Bedrock Guardrails, AWS Service Catalog, Amazon Bedrock AgentCore Observability, AWS Config (supporting).

## Exam traps

- No source attribution on RAG answers in a regulated scenario.
- Changing production prompts/models with zero CloudTrail-friendly change control.
- Bias monitoring only at launch, never continuously.
- Treating model cards as optional fluff for customized models under audit.

## Hands-on project ideas

1. Glue Catalog tables for each KB data source; propagate `source_id` metadata into chunks.
2. Model card + registry approval gate before endpoint update.
3. CloudWatch metric filter + alarm on Guardrail `INTERVENED` spike.

## Research links

- https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html
- https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html
- https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/cloudtrail-events-in-model-evaluations.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-data-bias.html
