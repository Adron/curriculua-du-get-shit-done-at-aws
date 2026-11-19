---
title: "05: Train, fine-tune, and customize models"
---

# 05: Train, fine-tune, and customize models

**Domain 2 (24%) · Task 2.2 · Skills 2.2.1-2.2.9**

This is the actual training part. SageMaker built-in algorithms and script mode, hyperparameter tuning with AMT, distributed training, fighting overfitting, underfitting, and catastrophic forgetting, prompt customization, and tuning retrieval and embeddings.

It's still the core "how do you train" domain, but C02 adds **prompt engineering / fine-tuning customization** and **retrieval + embedding optimization** for GenAI quality.

**Get a single-node job correct before you scale anything.** I've watched plenty of people throw a cluster at a training script that was broken on one box. It's still broken. It's just broken faster and on a bigger bill.

## What to know

### Skills map

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

### SageMaker training modes

| Mode | When |
|---|---|
| **Built-in algorithms** | Standard tabular/vision/text problems; less glue code |
| **Script mode** | Your PyTorch/TF/HF/SKLearn training script in managed containers |
| **JumpStart / Bedrock customize** | Start from pretrained FM; fine-tune or adapters per service capabilities |

Script mode: bring `train.py`, set hyperparameters, point input channels at S3, get `model.tar.gz` out.

### HPO / AMT

SageMaker Automatic Model Tuning launches many training jobs (random, Bayesian, Hyperband-style strategies). Use **early stopping** for trials that aren't improving. The objective metric has to match the business goal (AUC vs loss vs custom).

### Distributed training

- **Data parallelism**: shard the data across workers (large datasets).
- **Model parallelism**: shard the model itself (huge nets).
- Watch for OOM and networking issues, and make sure jobs are stable before scaling out.
- Spot + **checkpointing** for cost (a C01/C02 cost theme).

### Regularization and GenAI forgetting

| Problem | Signals | Mitigations |
|---|---|---|
| Overfitting | Train ≫ val metrics | More data, dropout, weight decay, early stop, simpler model |
| Underfitting | Both metrics poor | Capacity, features, longer train, less regularization |
| Catastrophic forgetting | Fine-tune kills prior skills | Lower LR, fewer epochs, mix replay data, LoRA/adapters, eval old tasks |

### Prompt engineering and customization

- System prompt + few-shot + tool schemas. Version your prompts (Prompt Management, see topics 06 and 09).
- Fine-tune when prompts can't lock down the format or domain language.
- Combine them: RAG for facts, a light fine-tune for style.

### Retrieval and embedding optimization (2.2.9)

- Embedding model choice (dimension, multilingual, multimodal)
- Chunk size and overlap (topic 02)
- Top-k, score thresholds, hybrid search, **reranking**
- Query rewriting / HyDE-style expansions where appropriate
- **Measure retrieval hit rate separately from generation quality.**

### Hyperparameters to recite

Epochs / max steps, batch size (memory vs stability), learning rate, warmup, weight decay, and how they interact with distributed world size (effective batch).

## AWS services in play

SageMaker Training, AMT, distributed training libraries, Debugger (convergence), Bedrock model customization, JumpStart, and Feature Store (feature inputs).

## Hands-on

1. Script-mode SKLearn or PyTorch job on S3 data, logging metrics. This is [B5](../../build.md#b5): post text in, categories out.
2. AMT job with early stopping. Compare the best trial against your baseline.
3. Fine-tune or continue-customize a small Bedrock/JumpStart model. Eval before and after on held-out data **and** on "old skill" prompts.
4. A/B chunk sizes and embedding models and measure retrieval recall@k. That's the whole point of [B6](../../build.md#b6).

## Exam traps

- Tuning batch size without adjusting learning rate or steps.
- Declaring victory on training loss alone.
- Fine-tuning so hard the base model forgets how to follow general instructions.
- Optimizing the generator when retrieval is the real failure.
- Going distributed before the single-node job is correct.

## Exam guide mapping

- **Domain 2 (24%) · Task 2.2 · Skills 2.2.1-2.2.9**: train, fine-tune, and customize models.

## Research links

- <https://docs.aws.amazon.com/sagemaker/latest/dg/train-model.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/distributed-training-options.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html>
- <https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf>