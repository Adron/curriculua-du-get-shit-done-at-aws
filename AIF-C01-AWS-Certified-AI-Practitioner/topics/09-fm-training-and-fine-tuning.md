# 09 — FM training and fine-tuning

**Domain 3 (28%) · Task Statement 3.3**

## What it is

How foundation models are trained and adapted: pre-training, fine-tuning, continuous pre-training, distillation, RLHF, and how to prepare data for fine-tuning — at conceptual (not coding) depth.

## Why it matters for AIF-C01

You must pick the right adaptation method and know data-prep qualities. Distinguishing fine-tuning from RAG/prompting is a repeated trap.

## What to know for the exam

### Key training elements

| Method | What happens | Notes |
|---|---|---|
| **Pre-training** | Train on massive unlabeled corpora; learn general representations | Extremely expensive; done by model providers |
| **Fine-tuning** | Further train pretrained FM on labeled/task data; **updates weights** | Domain style, instruction following |
| **Continuous / continued pre-training** | More unlabeled domain text before/around task tuning | Broad domain language adaptation |
| **Distillation** | Train smaller “student” to mimic larger “teacher” | Cheaper/faster inference |
| **Instruction tuning** | Fine-tune on prompt→response instruction pairs | Improves zero-shot task following |
| **Transfer learning** | Reuse pretrained knowledge for a new task | Fine-tuning is a form of this |
| **RLHF** | Reinforcement learning from human feedback to align preferences | Ranking/preference data; human raters |

### Fine-tuning methods (exam language)

- Instruction tuning
- Adapting models for specific domains
- Transfer learning
- Continuous pre-training

On AWS: fine-tune via **Bedrock customization** options and/or **SageMaker JumpStart** (instruction-based fine-tuning for supported FMs; hyperparameters like epochs, learning rate, LoRA-related settings on JumpStart).

### Data prep for fine-tuning

| Concern | Why it matters |
|---|---|
| **Curation** | Garbage in → biased/wrong model |
| **Governance** | Rights to use data; PII policy; audit |
| **Size** | Enough examples; not always “more is better” if noisy |
| **Labeling** | Quality labels / preference pairs for RLHF |
| **Representativeness** | Cover languages, demographics, edge cases |
| **RLHF data** | Human preference rankings for alignment |

Avoid baking rapidly changing or erasable personal data into weights when RAG can inject at inference (also a governance theme).

## AWS services involved

- **Amazon SageMaker AI / JumpStart** — fine-tune and deploy FMs
- **Amazon Bedrock** — managed FM access; model customization features
- **S3** — training data/artifacts storage
- Human feedback tooling concepts (e.g., Ground Truth for labeling programs)

## Practical study tips

- Decision tree: prompts → RAG → fine-tune → continued pre-train → train from scratch.
- Fine-tuning changes **behavior/style**; RAG adds **facts**.
- RLHF = humans ranking outputs to shape preferred behavior — not the same as supervised labels only.

## Common exam traps

- Fine-tuning to fix hallucinations about company policies (use RAG + grounding).
- Ignoring dataset bias/representativeness.
- Assuming practitioner must run training jobs (know *what/why*, not hyperparameters tuning craft).
- Confusing distillation (compress model) with RAG (retrieve docs).

## Exam guide mapping

- **Task Statement 3.3** — Training and fine-tuning process for FMs (pre-training, fine-tuning, continuous pre-training, distillation; instruction tuning / domain adaptation / transfer learning; data prep including RLHF).

## Research links

- https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-fine-tune.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-fine-tuning.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-fine-tuning-instruction-based.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models.html
- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
