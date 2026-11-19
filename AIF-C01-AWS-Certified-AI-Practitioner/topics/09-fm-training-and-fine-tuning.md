---
title: "09: FM training and fine-tuning"
---

# 09: FM training and fine-tuning

**Domain 3 (28%) · Task Statement 3.3**

How foundation models get trained and adapted: pre-training, fine-tuning, continuous pre-training, distillation, RLHF, and how to prep data for fine-tuning. All at the conceptual level. No coding required here.

What you need is the judgment to pick the right adaptation method and to know what good fine-tuning data looks like. The repeated trap is mixing up fine-tuning with RAG and prompting. **Fine-tuning changes behavior. RAG adds facts.** Tattoo that somewhere.

## What to know

### Key training elements

| Method | What happens | Notes |
|---|---|---|
| **Pre-training** | Train on massive unlabeled corpora to learn general representations | Extremely expensive; done by model providers |
| **Fine-tuning** | Further train a pretrained FM on labeled/task data; **updates weights** | Domain style, instruction following |
| **Continuous / continued pre-training** | More unlabeled domain text before or around task tuning | Broad domain language adaptation |
| **Distillation** | Train a smaller "student" to mimic a larger "teacher" | Cheaper, faster inference |
| **Instruction tuning** | Fine-tune on prompt → response instruction pairs | Better zero-shot task following |
| **Transfer learning** | Reuse pretrained knowledge for a new task | Fine-tuning is a form of this |
| **RLHF** | Reinforcement learning from human feedback to align with preferences | Ranking/preference data; human raters |

### Fine-tuning methods (exam language)

- Instruction tuning
- Adapting models for specific domains
- Transfer learning
- Continuous pre-training

On AWS you fine-tune through **Bedrock customization** options and/or **SageMaker JumpStart** (instruction-based fine-tuning for supported FMs, with hyperparameters like epochs, learning rate, and LoRA-related settings on JumpStart).

### Data prep for fine-tuning

| Concern | Why it matters |
|---|---|
| **Curation** | Garbage in → biased or wrong model |
| **Governance** | Rights to use the data; PII policy; audit |
| **Size** | Enough examples; "more" isn't better if it's noisy |
| **Labeling** | Quality labels / preference pairs for RLHF |
| **Representativeness** | Cover languages, demographics, edge cases |
| **RLHF data** | Human preference rankings for alignment |

Don't bake rapidly changing or erasable personal data into weights when RAG can inject it at inference time. That's a governance theme too.

## AWS services in play

- **Amazon SageMaker AI / JumpStart**: fine-tune and deploy FMs
- **Amazon Bedrock**: managed FM access and model customization features
- **S3**: training data and artifacts
- Human feedback tooling concepts (e.g., Ground Truth for labeling programs)

## Hands-on

- Write out the decision ladder from memory: **prompts → RAG → fine-tune → continued pre-train → train from scratch.** Each rung costs more than the last.
- Browse the Bedrock customization and JumpStart fine-tuning pages just enough to see the knobs (epochs, learning rate, LoRA). You won't run a job for this exam.
- Remember RLHF is humans **ranking** outputs to shape preferred behavior. It's not the same thing as plain supervised labels.

## Exam traps

- Fine-tuning to fix hallucinations about company policies. Use RAG + grounding.
- Ignoring dataset bias and representativeness.
- Assuming a practitioner has to run training jobs. Know the *what* and *why*, not the hyperparameter craft.
- Confusing distillation (compress a model) with RAG (retrieve docs).

## Exam guide mapping

- **Task Statement 3.3**: Training and fine-tuning process for FMs (pre-training, fine-tuning, continuous pre-training, distillation; instruction tuning / domain adaptation / transfer learning; data prep including RLHF).

## Research links

- <https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-fine-tune.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-fine-tuning.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-fine-tuning-instruction-based.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models.html>
- <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html>