---
title: "03: Data validation and processing for FMs"
---

# 03: Data validation and processing for FMs

**Domain 1 · Task 1.3 · Skills 1.3.1-1.3.4**

These are the pipelines that make data *safe and usable* before an FM ever sees it: quality gates, multimodal prep, model-specific request formatting, and enrichment (entity extraction and normalization) ahead of inference or RAG ingestion.

Garbage in still means garbage out. A shiny model doesn't change that, it just makes the garbage sound confident. The exam expects Glue Data Quality, Data Wrangler, or Lambda checks; multimodal handling (Bedrock multimodal, Transcribe, Processing); and correct Bedrock JSON and conversation formatting.

## What to know

- **Quality at rest and in motion.** Glue Data Quality (DQDL rulesets on Data Catalog tables and inside ETL). Fail or quarantine bad rows before a KB sync. Emit CloudWatch metrics on DQ scores.
- **Multimodal.** Documents, images, and audio go through Textract/Transcribe/BDA into normalized text + metadata, then into embeddings or multimodal models. Keep modality-specific parsers; don't blindly force everything through one tokenizer.
- **Request formatting.** Prefer Converse message blocks over ad-hoc InvokeModel bodies when portability matters, but still know the model-specific fields when they're required. Structure dialog history properly for multi-turn apps.
- **Enrichment.** Comprehend entities/PII, then normalize units/dates/IDs in Lambda, then optionally a Bedrock rewrite for formatting. Store lineage (source URI, transform version) for governance.

## AWS services in play

AWS Glue (Data Quality, Data Catalog, ETL), Amazon SageMaker Data Wrangler / Processing, Amazon Bedrock (multimodal + Data Automation), Amazon Comprehend, Amazon Transcribe, Amazon Textract, AWS Lambda, Amazon CloudWatch, Amazon S3.

## Hands-on

1. Write a DQDL ruleset (`IsComplete`, `IsUnique`, row-count thresholds) on a cataloged FAQ table, and block the Glue job on fail. The blog archive version of this lives in [B4](../../build.md#b4).
2. Multimodal pipeline: PDF + image through Textract/BDA into S3 JSONL ready for KB ingestion.
3. Lambda normalizer: Comprehend entities into canonical JSON fields before calling Converse.

## Exam traps

- Skipping DQ on RAG corpora ("we'll fix it in the prompt"). You won't.
- Sending raw binary or large payloads without respecting API limits or using S3 references.
- Mixing up system vs user roles in conversation formatting.
- Treating classical feature engineering as in scope. It's largely out of exam scope.

## Exam guide mapping

- **Task 1.3**, Skills 1.3.1-1.3.4: validate and process data for FM consumption.

## Research links

- <https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html>
- <https://docs.aws.amazon.com/glue/latest/dg/dqdl.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/bda-sensitive-data.html>
- <https://docs.aws.amazon.com/comprehend/latest/dg/how-entities.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html>