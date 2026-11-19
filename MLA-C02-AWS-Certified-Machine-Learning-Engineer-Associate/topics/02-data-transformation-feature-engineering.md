# 02 — Data transformation and feature engineering

**Domain 1 · Task 1.2** · Skills **1.2.1–1.2.9** · Domain weight **28%**

## What it is

Turning raw data into model-ready features and GenAI-ready corpora: ETL/ELT, classic FE, embeddings, text/RAG preprocessing, PII handling, and FM customization datasets.

## Why it matters for MLA-C02

Largest domain. C02 adds **embeddings**, **advanced text prep**, **RAG chunking/metadata**, **anonymization**, and **FM fine-tune / CPT / distillation data prep** on top of Glue/EMR/Data Wrangler/Feature Store.

## Exam-relevant skills map

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

## Tooling cheat sheet

| Tool | Strength |
|---|---|
| **Glue** | Serverless Spark ETL, catalog, merge multi-source |
| **Glue DataBrew** | Visual profiling + recipe transforms (citizen DE) |
| **EMR (Spark)** | Heavy/custom Spark at scale |
| **SageMaker Data Wrangler** | Interactive FE → export Processing / Feature Store |
| **Lambda + Spark streaming** | Event/stream feature transforms |

## Classic feature engineering (still tested)

- Scaling / standardization / normalization for distance-based & neural models
- Binning, log transforms for skew
- Feature splitting / encoding categoricals
- Train/serve **skew** avoidance: same transforms at training and inference (Feature Store helps)

## Embeddings & RAG prep (C02)

**Embeddings:** map text/images to dense vectors for similarity search and RAG. Choose embedding model for modality, dimension, and cost.

**Bedrock Knowledge Bases chunking:**

| Strategy | Idea | Exam cue |
|---|---|---|
| Default | ~300 tokens, sentence boundaries | Good baseline |
| Fixed-size | Max tokens + overlap % | Tune for domain docs |
| Hierarchical | Child retrieve → parent context | Precision + context tradeoff |
| Semantic | Break on meaning (FM cost) | Better coherence, higher cost |
| No chunking | Whole doc = one chunk | DIY chunking / custom Lambda |

Also extract **metadata** (source, page, product, ACL tags) for filtered retrieval. Multimodal: audio/video may chunk at embedding-model duration; BDA path converts to text then text-chunks.

## FM training data prep

| Technique | Data shape |
|---|---|
| Fine-tuning | Task-specific prompt–completion (or chat) pairs |
| Continuous pre-training | Large unlabeled domain corpus |
| Distillation | Teacher outputs → student training set |

Validate JSONL schemas, balance tasks, strip PII, enforce content safety before jobs.

## Anonymization

Mask/redact PII before training or RAG (Macie discovery concepts + transform recipes; Bedrock Guardrails sensitive-info filters at inference — know the **stage** difference).

## AWS services

Glue, Glue DataBrew, EMR, SageMaker Data Wrangler, Feature Store, Lambda, Bedrock embeddings + Knowledge Bases, Comprehend (NLP helpers), Macie (sensitive data discovery).

## Hands-on practice

1. Data Wrangler flow: clean → engineer → export to Feature Store / Processing job.
2. Glue job: join S3 + RDS extract → Parquet curated zone.
3. Create a Bedrock KB; try default vs fixed-size vs hierarchical chunking; compare retrieval quality.
4. Build a small fine-tune JSONL and validate schema/length before a Bedrock/SageMaker customization job.

## Common traps

- Engineering features only in notebooks — not reproducible for inference.
- Huge chunks → diluted retrieval; tiny chunks → lost context.
- Forgetting overlap / metadata filters on RAG.
- Applying train-only transforms that aren’t available at serve time.
- Mixing “anonymize in ETL” with “Guardrails at inference” as the same control.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html
- https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-fully-managed-bedrock.html
- https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html
