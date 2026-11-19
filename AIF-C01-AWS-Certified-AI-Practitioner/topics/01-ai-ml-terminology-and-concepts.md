---
title: "01: AI/ML terminology and concepts"
---

# 01: AI/ML terminology and concepts

**Domain 1 (20%) · Task Statement 1.1**

This is the vocabulary layer. How AI, ML, deep learning, generative AI, and agentic AI stack on top of each other, what a model actually is versus an algorithm, training versus inference, what shape the data comes in, and the three ways a model learns.

It sounds basic, and it is. That's exactly why it matters. Almost every scenario question on AIF-C01 assumes you've got this down cold, and a lot of the wrong answers are built to catch people who blur **training vs inference**, **supervised vs unsupervised**, or **GenAI vs the purpose-built AWS AI services**. Get the words right and half the distractors fall away on their own.

## What to know

### The terms

| Term | Plain meaning |
|---|---|
| **AI** | Systems that do tasks that usually need human intelligence (perception, language, decision support). |
| **ML** | Subset of AI: systems that learn patterns from data instead of only hardcoded rules. |
| **Deep learning (DL)** | ML using multi-layer neural networks. Strong on images, speech, text. |
| **Neural network** | Layered compute graph of connected units that learn representations from data. |
| **GenAI** | Models that create new content (text, images, code, audio, video) from prompts and context. |
| **LLM** | Large language model: a transformer-based FM specialized for language. |
| **Foundation model (FM)** | Large pretrained model you can adapt to many downstream tasks. |
| **Agentic AI** | Systems that plan, use tools, keep memory, and take multi-step actions toward a goal. |
| **Model** | The learned thing that maps inputs to outputs (predictions or generated content). |
| **Algorithm** | The procedure used to train or update a model from data. |
| **Training** | Fitting model parameters on data. Offline, expensive. |
| **Inference (inferencing)** | Using a trained model to produce outputs for new inputs, online or batch. |
| **Bias / fairness** | Systematic skew that harms groups or accuracy. Fairness = equitable impact across stakeholders. |
| **Fit** | How well the model matches training data vs unseen data (underfit / good fit / overfit). |
| **CV / NLP** | Computer vision (images, video); natural language processing (text and speech language tasks). |

### The hierarchy (the mental model I keep in my head)

```
AI
└── ML
    └── Deep learning
        └── Foundation models / LLMs  →  GenAI applications
                                          └── Agentic AI (tools + memory + orchestration)
```

GenAI and agentic AI sit on top of FMs. **Traditional ML (regression, trees) is still the right call** when you need tabular prediction, strong explainability, or deterministic rules plus a simple model. Not everything needs an LLM.

### Learning types

| Type | Data | Goal | Example |
|---|---|---|---|
| Supervised | Labeled | Predict a known target | Fraud yes/no, house price |
| Unsupervised | Unlabeled | Find structure or groups | Customer segments (clustering) |
| Reinforcement | Rewards from an environment | Learn a policy / actions | Game agents, some alignment (RLHF) |

### Inference modes

| Mode | When |
|---|---|
| Real-time | Low-latency interactive work (chat, API) |
| Batch | Big offline jobs (nightly scoring) |
| Asynchronous | Longer jobs; results come back later (queue/callback) |
| Serverless | Scale-to-zero, pay-per-request managed endpoints |

### Data types in AI models

- **Labeled vs unlabeled**: this is what drives supervised vs unsupervised.
- **Structured** (tables, schemas) vs **unstructured** (free text, images, audio).
- **Tabular**, **time-series**, **image**, **text**: match the data to the technique and the AWS service.
- Multimodal FMs accept more than one modality (text + image, etc.).

## AWS services in play

Conceptual only at this level. **Amazon SageMaker AI** is where you train and host traditional ML and custom FMs. **Amazon Bedrock** is the managed FM API for GenAI and agentic apps. The purpose-built services (Rekognition, Comprehend, Transcribe, and friends) show up in [topic 02](./02-ai-use-cases-and-technique-selection.md).

## Hands-on

- Flashcard the hierarchy and the terms table until you can explain each edge in one sentence. No notes.
- Run every scenario through a quick triage: **prediction on labels?** Supervised ML. **Create content?** GenAI. **Multi-step with tools?** Agentic.
- Remember the practitioner exam does **not** ask you to implement training loops. Know the what and why, skip the how.

## Exam traps

- Calling GenAI "just ML" without noting content generation and FMs.
- Mixing up **training cost** (fitting the model) with **inference cost** (serving predictions or tokens).
- Assuming every problem needs an LLM when a classifier or managed AI service fits better.
- Treating agentic AI as "a chatbot." Agents use tools, memory, and orchestration.

## Exam guide mapping

- **Task Statement 1.1**: Explain basic AI concepts and terminologies (definitions; AI/ML/GenAI/DL/agentic similarities and differences; inference types; data types; supervised/unsupervised/reinforcement).

## Research links

- <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html>
- <https://aws.amazon.com/certification/certified-ai-practitioner/>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html>
- <https://aws.amazon.com/machine-learning/>
- <https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.pdf>