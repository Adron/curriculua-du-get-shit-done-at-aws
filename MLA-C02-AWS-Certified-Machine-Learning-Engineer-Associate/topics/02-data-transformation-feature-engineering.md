---
title: "02: Data transformation and feature engineering"
---

# 02: Data transformation and feature engineering

**Domain 1 (28%) · Task 1.2 · Skills 1.2.1-1.2.9**

Raw data in, model-ready features and GenAI-ready corpora out. That covers ETL/ELT, classic feature engineering, embeddings, text and RAG preprocessing, PII handling, and building datasets for FM customization.

This sits in the heaviest domain on the exam, and C02 piles on top of the usual Glue/EMR/Data Wrangler/Feature Store material: **embeddings**, **advanced text prep**, **RAG chunking and metadata**, **anonymization**, and **data prep for fine-tuning, continued pre-training, and distillation**.

Honestly, this is where most real ML work goes. The model is the easy part. **Getting the data into a shape you can trust, and doing it the same way at training and inference time, is the job.**

## What to know

### Skills map

| Skill | Focus |
|---|---|
| 1.2.1 | Transform with Glue, DataBrew, EMR Spark, Data Wrangler |
| 1.2.2 | Create/manage features in Feature Store |
| 1.2.3 | Streaming transforms (Lambda, Spark) |
| 1.2.4 | Scaling, standardization, splitting, binning, log, normalization |
| 1.2.5 | Embedding models for text/images → vectors |
| 1.2.6 | Tokenization, domain-specific augmentation |
| 1.2.7 | RAG: chunking strategies, metadata extraction |
| 1.2.8 | Mask, redact, anonymize |
| 1.2.9 | Prep for fine-tuning, continuous pre-training, distillation |

### Tooling cheat sheet

| Tool | Strength |
|---|---|
| **Glue** | Serverless Spark ETL, catalog, merge multi-source |
| **Glue DataBrew** | Visual profiling + recipe transforms (citizen DE) |
| **EMR (Spark)** | Heavy/custom Spark at scale |
| **SageMaker Data Wrangler** | Interactive FE → export Processing / Feature Store |
| **Lambda + Spark streaming** | Event/stream feature transforms |

### Classic feature engineering (still tested)

- Scaling, standardization, and normalization for distance-based and neural models
- Binning and log transforms for skew
- Feature splitting and encoding categoricals
- Avoid train/serve **skew**: same transforms at training and inference. Feature Store helps here.

### Embeddings and RAG prep (C02)

**Embeddings** map text and images to dense vectors for similarity search and RAG. Pick the embedding model by modality, dimension, and cost.

**Bedrock Knowledge Bases chunking:**

| Strategy | Idea | Exam cue |
|---|---|---|
| Default | ~300 tokens, sentence boundaries | Good baseline |
| Fixed-size | Max tokens + overlap % | Tune for domain docs |
| Hierarchical | Child retrieve → parent context | Precision + context tradeoff |
| Semantic | Break on meaning (FM cost) | Better coherence, higher cost |
| No chunking | Whole doc = one chunk | DIY chunking / custom Lambda |

Also extract **metadata** (source, page, product, ACL tags) so you can filter retrieval. For multimodal: audio and video may chunk at the embedding model's duration; the BDA path converts to text first, then text-chunks.

### FM training data prep

| Technique | Data shape |
|---|---|
| Fine-tuning | Task-specific prompt-completion (or chat) pairs |
| Continuous pre-training | Large unlabeled domain corpus |
| Distillation | Teacher outputs → student training set |

Before any job runs: validate JSONL schemas, balance tasks, strip PII, and enforce content safety.

### Anonymization

Mask or redact PII before training or RAG (Macie discovery concepts plus transform recipes). Bedrock Guardrails sensitive-info filters work at inference. **Know the stage difference.** They're not the same control.

## AWS services in play

Glue, Glue DataBrew, EMR, SageMaker Data Wrangler, Feature Store, Lambda, Bedrock embeddings + Knowledge Bases, Comprehend (NLP helpers), and Macie (sensitive data discovery).

## Hands-on

1. Data Wrangler flow: clean, engineer, export to Feature Store or a Processing job.
2. Glue job: join an S3 + RDS extract into a Parquet curated zone. For [B4](../../build.md#b4) it's the same move on blog posts: strip the Jekyll front matter, keep the categories as columns, write Parquet.
3. Create a Bedrock KB and try default vs fixed-size vs hierarchical chunking. Compare retrieval quality. That's the warm-up for [B6](../../build.md#b6).
4. Build a small fine-tune JSONL and validate schema and length before a Bedrock/SageMaker customization job.

## Exam traps

- Engineering features only in notebooks. Not reproducible for inference.
- Huge chunks dilute retrieval; tiny chunks lose context.
- Forgetting overlap or metadata filters on RAG.
- Applying train-only transforms that aren't available at serve time.
- Treating "anonymize in ETL" and "Guardrails at inference" as the same control.

## Exam guide mapping

- **Domain 1 (28%) · Task 1.2 · Skills 1.2.1-1.2.9**: data transformation and feature engineering.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html>
- <https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-fully-managed-bedrock.html>
- <https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html>