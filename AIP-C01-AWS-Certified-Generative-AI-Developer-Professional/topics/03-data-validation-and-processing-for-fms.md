# 03 — Data validation and processing for FMs

**Exam map:** Domain 1 · Task **1.3** · Skills **1.3.1–1.3.4**

## What it is

Pipelines that make data *safe and usable* for FM consumption: quality gates, multimodal prep, model-specific request formatting, and enrichment (entity extraction/normalization) before inference or RAG ingestion.

## Why it matters for AIP-C01

Garbage-in dominates GenAI failures. Exam expects Glue Data Quality / Data Wrangler / Lambda checks, multimodal handling (Bedrock multimodal, Transcribe, Processing), and correct Bedrock JSON / conversation formatting.

## Production implementation notes

- **Quality at rest and in motion:** Glue Data Quality (DQDL rulesets on Data Catalog tables and in ETL). Fail or quarantine bad rows before KB sync. Emit CloudWatch metrics on DQ scores.
- **Multimodal:** documents/images/audio → Textract/Transcribe/BDA → normalized text + metadata → embeddings or multimodal models. Keep modality-specific parsers; don’t force everything through one tokenizer blindly.
- **Request formatting:** prefer Converse message blocks over ad-hoc InvokeModel bodies when portability matters; still know model-specific fields when required. Structure dialog history for multi-turn apps.
- **Enrichment:** Comprehend entities/PII → normalize units/dates/IDs in Lambda → optional Bedrock rewrite for formatting. Store lineage (source URI, transform version) for governance.

## AWS services

AWS Glue (Data Quality, Data Catalog, ETL), Amazon SageMaker Data Wrangler / Processing, Amazon Bedrock (multimodal + Data Automation), Amazon Comprehend, Amazon Transcribe, Amazon Textract, AWS Lambda, Amazon CloudWatch, Amazon S3.

## Exam traps

- Skipping DQ on RAG corpora (“we’ll fix it in the prompt”).
- Sending raw binary/large payloads without respecting API limits / S3 references.
- Mixing system vs user roles incorrectly in conversation formatting.
- Treating classical feature engineering as in-scope (it is largely out of exam scope).

## Hands-on project ideas

1. DQDL ruleset: `IsComplete`, `IsUnique`, row-count thresholds on a cataloged FAQ table; block Glue job on fail.
2. Multimodal pipeline: PDF + image → Textract/BDA → S3 JSONL ready for KB ingestion.
3. Lambda normalizer: Comprehend entities → canonical JSON fields before Converse.

## Research links

- https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html
- https://docs.aws.amazon.com/glue/latest/dg/dqdl.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/bda-sensitive-data.html
- https://docs.aws.amazon.com/comprehend/latest/dg/how-entities.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html
