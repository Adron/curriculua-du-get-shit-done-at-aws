---
title: "03: Data quality, validation, and bias"
---

# 03: Data quality, validation, and bias

**Domain 1 (28%) · Task 1.3 · Skills 1.3.1-1.3.7**

This one is about proving the data is fit to train on and serve from: quality rules, labeling, finding and fixing bias, class imbalance, GenAI corpus integrity, and plain old cleaning (outliers, missing values, dedupe).

Garbage in, biased or hallucinating system out. That's been true forever, and C02 leans into it with **multimodal bias metrics**, **AI training data integrity** (prompt-response validation, content safety screening), and explicit **cleaning** skills.

**If you skip this step, the model will tell on you later. Usually in production. Usually in front of someone important.**

## What to know

### Skills map

| Skill | Focus |
|---|---|
| 1.3.1 | Validate with DataBrew / Glue Data Quality |
| 1.3.2 | Label and annotate |
| 1.3.3 | Identify/mitigate bias (split, shuffle, augment) |
| 1.3.4 | Bias metrics across numeric, text, image |
| 1.3.5 | Resolve class imbalance (all modalities) |
| 1.3.6 | AI training integrity (pairs, safety screening) |
| 1.3.7 | Clean: outliers, impute, dedupe |

### Quality tooling

| Tool | Role |
|---|---|
| **AWS Glue Data Quality** | DQDL rules on Catalog/ETL; scores; quarantine bad rows; ML anomaly detection |
| **Glue DataBrew** | Rulesets vs expected metrics; profile → fail/pass gates |
| **SageMaker Clarify** (via Data Wrangler Bias Report) | Pre-training bias metrics on facets |
| **Ground Truth / labeling workflows** | Human + automated annotation |

Glue Data Quality is serverless and built on DeeQu. Let it "recommend rules", then harden those for your pipelines.

### Bias and imbalance

**Clarify-style pre-training metrics (know the ideas):**

| Metric | What it flags |
|---|---|
| Class Imbalance (CI) | Facet sample counts unequal |
| Difference in Proportions of Labels (DPL) | Positive label rates differ by facet |
| KL / JSD / TVD | Label distribution divergence across facets |

**Mitigations:** stratified splits, shuffle, augmentation, resampling (over/under), synthetic minority samples, reweighting, and collecting more minority data. These apply to text and image data too, not just tabular.

### AI training data integrity (C02)

- Validate prompt-response pairs (schema, empty targets, truncated answers)
- Screen for toxic, PII, or unsafe content before fine-tuning
- Deduplicate near-identical prompts to reduce memorization and leakage
- Hold out eval sets that never leak into training

### Cleaning checklist

1. Missing values: impute or drop, with a documented policy
2. Outliers: detect (IQR, z-score, robust methods), then clip, remove, or investigate
3. Deduplicate keys and near-duplicates
4. Schema, type, and range checks in Glue DQ before any training job runs

## AWS services in play

Glue Data Quality, Glue DataBrew, SageMaker Data Wrangler, SageMaker Clarify, SageMaker Ground Truth, Comprehend (PII/toxicity helpers), and Bedrock Guardrails concepts for safety-screening corpora.

## Hands-on

1. Write DQDL rules on a Glue table, fail the pipeline on a score threshold, and dig into the failing records. In [B4](../../build.md#b4) these are the rules for the blog archive: no empty bodies, a date on every post, at least one category.
2. DataBrew profile + ruleset on a training CSV.
3. Run a Data Wrangler Bias Report on a sensitive facet, propose a mitigation, re-measure CI/DPL. For the [B5](../../build.md#b5) tag classifier, the "facet" is just category balance. Fifteen years of posts are not evenly spread across topics, trust me.
4. Build a fine-tune JSONL validator: required fields, length bounds, toxicity/PII filter pass rate.

## Exam traps

- Only measuring bias post-training. The exam also wants **pre-training** data bias.
- Reaching for "balanced accuracy" without fixing the **class imbalance** in the dataset.
- Treating labeling as optional. Noisy labels dominate model error.
- Skipping content safety on GenAI corpora and then blaming the FM.
- Over-imputing without documenting train/serve consistency.

## Exam guide mapping

- **Domain 1 (28%) · Task 1.3 · Skills 1.3.1-1.3.7**: data quality, validation, and bias.

## Research links

- <https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html>
- <https://docs.aws.amazon.com/databrew/latest/dg/profile.data-quality-rules.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-measure-data-bias.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-data-bias-reports-ui.html>
- <https://docs.aws.amazon.com/prescriptive-guidance/latest/modern-data-centric-use-cases/data-quality-checks.html>
- <https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf>