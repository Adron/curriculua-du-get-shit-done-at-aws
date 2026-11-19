# 05 — Train, fine-tune, and customize models

**Domain 2 · Task 2.2** · Skills **2.2.1–2.2.9** · Domain weight **24%**

## What it is

Executing training and customization: SageMaker built-ins and script mode, HPO/AMT, distributed training, regularization against over/underfit and catastrophic forgetting, prompt customization, and retrieval/embedding optimization.

## Why it matters for MLA-C02

Still the core “how do you train” domain, with C02 adding **prompt engineering / fine-tuning customization** and **retrieval + embedding optimization** for GenAI quality.

## Exam-relevant skills map

| Skill | Focus |
|---|---|
| 2.2.1 | SageMaker built-in algorithms + common ML libs |
| 2.2.2 | Script mode with supported frameworks |
| 2.2.3 | HPO via Automatic Model Tuning (AMT) |
| 2.2.4 | Early stopping, distributed training |
| 2.2.5 | Overfitting, underfitting, catastrophic forgetting |
| 2.2.6 | Ensembles / multi-model combine |
| 2.2.7 | Epochs, steps, batch size |
| 2.2.8 | Prompt engineering + fine-tuning |
| 2.2.9 | Optimize retrieval & embedding models |

## SageMaker training modes

| Mode | When |
|---|---|
| **Built-in algorithms** | Standard tabular/vision/text problems; less glue code |
| **Script mode** | Your PyTorch/TF/HF/SKLearn training script in managed containers |
| **JumpStart / Bedrock customize** | Start from pretrained FM; fine-tune or adapters per service capabilities |

Script mode: bring `train.py`, set hyperparameters, input channels on S3, output `model.tar.gz`.

## HPO / AMT

SageMaker Automatic Model Tuning launches many training jobs (random, Bayesian, Hyperband-style strategies). Use **early stopping** for non-improving trials. Objective metric must match business goal (AUC vs loss vs custom).

## Distributed training

- **Data parallelism**: shard data across workers (large datasets).
- **Model parallelism**: shard model for huge nets.
- Watch OOM, networking, and that jobs are stable before scaling out.
- Spot + **checkpointing** for cost (C01/C02 cost theme).

## Regularization & GenAI forgetting

| Problem | Signals | Mitigations |
|---|---|---|
| Overfitting | Train ≫ val metrics | More data, dropout, weight decay, early stop, simpler model |
| Underfitting | Both metrics poor | Capacity, features, longer train, less regularization |
| Catastrophic forgetting | Fine-tune kills prior skills | Lower LR, fewer epochs, mix replay data, LoRA/adapters, eval old tasks |

## Prompt engineering & customization

- System + few-shot + tool schemas; version prompts (Prompt Management — see topic 06/09).
- Fine-tune when prompts can’t lock format/domain language.
- Combine: RAG for facts + light fine-tune for style.

## Retrieval & embedding optimization (2.2.9)

- Embedding model choice (dimension, multilingual, multimodal)
- Chunk size/overlap (topic 02)
- Top-k, score thresholds, hybrid search, **reranking**
- Query rewriting / HyDE-style expansions where appropriate
- Measure retrieval hit-rate separately from generation quality

## Hyperparameters to recite

Epochs / max steps, batch size (memory vs stability), learning rate, warmup, weight decay — and how they interact with distributed world size (effective batch).

## AWS services

SageMaker Training, AMT, distributed training libraries, Debugger (convergence), Bedrock model customization, JumpStart, Feature Store (feature inputs).

## Hands-on practice

1. Script-mode SKLearn or PyTorch job on S3 data; log metrics.
2. AMT job with early stopping; compare best trial vs baseline.
3. Fine-tune or continued customize a small Bedrock/JumpStart model; eval before/after on held-out + “old skill” prompts.
4. A/B chunk sizes and embedding models; measure retrieval recall@k.

## Common traps

- Tuning batch size without adjusting LR / steps.
- Declaring victory on train loss only.
- Fine-tuning so hard the base model forgets general instruction following.
- Optimizing the generator while retrieval is the real failure mode.
- Distributed training before single-node job is correct.

## Research links

- https://docs.aws.amazon.com/sagemaker/latest/dg/train-model.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/distributed-training-options.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html
- https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf
