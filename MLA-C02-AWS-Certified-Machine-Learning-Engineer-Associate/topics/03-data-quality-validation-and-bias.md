# 03 — Data quality, validation, and bias

**Domain 1 · Task 1.3** · Skills **1.3.1–1.3.7** · Domain weight **28%**

## What it is

Proving data is fit for training/serving: quality rules, labeling, bias detection/mitigation, class imbalance, GenAI corpus integrity, and cleaning (outliers, missingness, dedupe).

## Why it matters for MLA-C02

Garbage in → biased or hallucinating systems. C02 adds **multimodal bias metrics**, **AI training data integrity** (prompt–response validation, content safety screening), and explicit **cleaning** skills.

## Exam-relevant skills map

| Skill | Focus |
|---|---|
| 1.3.1 | Validate with DataBrew / Glue Data Quality |
| 1.3.2 | Label and annotate |
| 1.3.3 | Identify/mitigate bias (split, shuffle, augment) |
| 1.3.4 | Bias metrics across numeric, text, image |
| 1.3.5 | Resolve class imbalance (all modalities) |
| 1.3.6 | AI training integrity (pairs, safety screening) |
| 1.3.7 | Clean: outliers, impute, dedupe |

## Quality tooling

| Tool | Role |
|---|---|
| **AWS Glue Data Quality** | DQDL rules on Catalog/ETL; scores; quarantine bad rows; ML anomaly detection |
| **Glue DataBrew** | Rulesets vs expected metrics; profile → fail/pass gates |
| **SageMaker Clarify** (via Data Wrangler Bias Report) | Pre-training bias metrics on facets |
| **Ground Truth / labeling workflows** | Human + automated annotation |

Glue Data Quality is serverless on DeeQu; “recommend rules” then harden for pipelines.

## Bias & imbalance

**Clarify-style pretraining metrics (know the ideas):**

| Metric | What it flags |
|---|---|
| Class Imbalance (CI) | Facet sample counts unequal |
| Difference in Proportions of Labels (DPL) | Positive label rates differ by facet |
| KL / JSD / TVD | Label distribution divergence across facets |

**Mitigations:** stratified splits, shuffle, augmentation, resampling (over/under), synthetic minority samples, reweighting, collecting more minority data. Apply carefully to text/image as well as tabular.

## AI training data integrity (C02)

- Validate prompt–response pairs (schema, empty targets, truncated answers)
- Screen for toxic/PII/unsafe content before fine-tune
- Deduplicate near-identical prompts to reduce memorization/leakage
- Hold out eval sets that don’t leak into training

## Cleaning checklist

1. Missing values → impute or drop with documented policy  
2. Outliers → detect (IQR/z/robust) → clip/remove/investigate  
3. Deduplicate keys and near-duplicates  
4. Schema / type / range checks in Glue DQ before training jobs  

## AWS services

Glue Data Quality, Glue DataBrew, SageMaker Data Wrangler, SageMaker Clarify, SageMaker Ground Truth, Comprehend (PII/toxicity helpers), Bedrock Guardrails concepts for safety screening of corpora.

## Hands-on practice

1. Author DQDL rules on a Glue table; fail a pipeline on score threshold; inspect failing records.
2. DataBrew profile + ruleset on a training CSV.
3. Data Wrangler Bias Report on a sensitive facet; propose a mitigation and re-measure CI/DPL.
4. Build a fine-tune JSONL validator: required fields, length bounds, toxicity/PII filter pass rate.

## Common traps

- Measuring bias only post-training — exam also wants **pre-training** data bias.
- “Balanced accuracy” without fixing **class imbalance** in the dataset.
- Treating labeling as optional — noisy labels dominate model error.
- Skipping content safety on GenAI corpora then blaming the FM.
- Over-imputing without documenting train/serve consistency.

## Research links

- https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html
- https://docs.aws.amazon.com/databrew/latest/dg/profile.data-quality-rules.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-measure-data-bias.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-data-bias-reports-ui.html
- https://docs.aws.amazon.com/prescriptive-guidance/latest/modern-data-centric-use-cases/data-quality-checks.html
- https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf
