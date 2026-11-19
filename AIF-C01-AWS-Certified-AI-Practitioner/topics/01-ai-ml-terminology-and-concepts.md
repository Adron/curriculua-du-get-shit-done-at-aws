# 01 — AI/ML terminology and concepts

**Domain 1 (20%) · Task Statement 1.1**

## What it is

Core vocabulary for the exam: how AI, ML, deep learning (DL), generative AI (GenAI), and agentic AI relate; what a model and algorithm are; training vs inference; data shapes; learning paradigms.

| Term | Plain meaning |
|---|---|
| **AI** | Systems that perform tasks that typically need human intelligence (perception, language, decision support). |
| **ML** | Subset of AI: systems that learn patterns from data rather than only hardcoded rules. |
| **Deep learning (DL)** | ML using multi-layer neural networks; strong on images, speech, text. |
| **Neural network** | Layered compute graph of connected units that learn representations from data. |
| **GenAI** | Models that create new content (text, images, code, audio, video) from prompts/context. |
| **LLM** | Large language model: transformer-based FM specialized for language. |
| **Foundation model (FM)** | Large pretrained model adaptable to many downstream tasks. |
| **Agentic AI** | Systems that plan, use tools, maintain memory, and take multi-step actions toward goals. |
| **Model** | Learned representation that maps inputs → outputs (predictions or generated content). |
| **Algorithm** | Procedure used to train or update a model from data. |
| **Training** | Fitting model parameters on data (offline, expensive). |
| **Inference (inferencing)** | Using a trained model to produce outputs for new inputs (online or batch). |
| **Bias / fairness** | Systematic skew that harms groups or accuracy; fairness = equitable impact across stakeholders. |
| **Fit** | How well the model matches training vs unseen data (underfit / good fit / overfit). |
| **CV / NLP** | Computer vision (images/video); natural language processing (text/speech language tasks). |

### Hierarchy (exam mental model)

```
AI
└── ML
    └── Deep learning
        └── Foundation models / LLMs  →  GenAI applications
                                          └── Agentic AI (tools + memory + orchestration)
```

GenAI and agentic AI sit on top of FMs; traditional ML (regression, trees) remains valid when you need tabular prediction, strong explainability, or deterministic rules plus simple models.

## Why it matters for AIF-C01

Almost every scenario question assumes this vocabulary. Wrong answers often confuse **training vs inference**, **supervised vs unsupervised**, or **GenAI vs purpose-built AWS AI services**.

## What to know for the exam

### Learning types

| Type | Data | Goal | Example |
|---|---|---|---|
| Supervised | Labeled | Predict known target | Fraud yes/no, house price |
| Unsupervised | Unlabeled | Structure / groups | Customer segments (clustering) |
| Reinforcement | Rewards from environment | Learn policy / actions | Game agents, some alignment (RLHF) |

### Inference modes

| Mode | When |
|---|---|
| Real-time | Low-latency interactive (chat, API) |
| Batch | Large offline jobs (nightly scoring) |
| Asynchronous | Longer jobs; results later (queue/callback) |
| Serverless | Scale-to-zero / pay per request managed endpoints |

### Data types in AI models

- **Labeled vs unlabeled** — drives supervised vs unsupervised.
- **Structured** (tables, schemas) vs **unstructured** (free text, images, audio).
- **Tabular**, **time-series**, **image**, **text** — match technique and AWS service.
- Multimodal FMs accept more than one modality (text+image, etc.).

## AWS services involved

Conceptual only at this depth: **Amazon SageMaker AI** (train/host traditional ML and custom FMs), **Amazon Bedrock** (managed FM APIs for GenAI/agentic apps). Purpose-built services (Rekognition, Comprehend, Transcribe, etc.) appear in topic 02.

## Practical study tips

- Flashcard the hierarchy table until you can explain each edge in one sentence.
- For any scenario: ask “prediction on labels?” → supervised ML; “create content?” → GenAI; “multi-step tools?” → agentic.
- Remember: practitioner exam does **not** require implementing training loops.

## Common exam traps

- Calling GenAI “just ML” without noting content generation / FMs.
- Mixing **training cost** (fit model) with **inference cost** (serve predictions/tokens).
- Assuming every problem needs an LLM when a classifier or managed AI service fits better.
- Treating agentic AI as “chatbot only” — agents use tools, memory, orchestration.

## Exam guide mapping

- **Task Statement 1.1** — Explain basic AI concepts and terminologies (definitions; AI/ML/GenAI/DL/agentic similarities & differences; inference types; data types; supervised/unsupervised/reinforcement).

## Research links

- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html
- https://aws.amazon.com/certification/certified-ai-practitioner/
- https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html
- https://aws.amazon.com/machine-learning/
- https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.pdf
