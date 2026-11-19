# 04 — Modeling approach selection

**Domain 2 · Task 2.1** · Skills **2.1.1–2.1.8** · Domain weight **24%**

## What it is

Picking the right solution class: traditional ML, GenAI/FM on Bedrock, fine-tuning vs RAG vs prompts, or a managed AI API (Textract, Rekognition, etc.) — under latency, cost, interpretability, and domain constraints.

## Why it matters for MLA-C02

C02 centers **Bedrock FM selection**, **fine-tune strategy identification**, **RAG architecture patterns**, and **AI latency/cost tradeoffs** alongside classic algorithm choice.

## Exam-relevant skills map

| Skill | Decision |
|---|---|
| 2.1.1 | Select Bedrock FMs by task & performance |
| 2.1.2 | Identify fine-tuning strategies for FMs |
| 2.1.3 | Compare ML vs GenAI models/algorithms/templates |
| 2.1.4 | Custom vs managed vs pretrained vs FM |
| 2.1.5 | Select RAG architecture patterns |
| 2.1.6 | ML: performance vs train time vs cost |
| 2.1.7 | AI: performance vs latency vs cost |
| 2.1.8 | Apply Textract, Rekognition, Comprehend, Transcribe, etc. |

## Decision tree (builder view)

```
Need structured prediction on tabular/time-series with labeled data?
  → Traditional ML (SageMaker built-ins / your framework)
Need OCR / vision labels / speech / NLP entities with low custom effort?
  → Managed AI service (Textract, Rekognition, Transcribe, Comprehend…)
Need language generation / reasoning over knowledge?
  → Prompt-only FM → if grounding needed: RAG → if style/task lock-in: fine-tune
```

## Bedrock FM selection criteria

| Criterion | Questions |
|---|---|
| Task fit | Chat, summarization, code, embeddings, multimodal? |
| Context window | Long docs / multi-turn? |
| Latency / TPS | Real-time UX vs batch |
| Cost | Input/output tokens; provisioned throughput |
| Quality | Arena/evals on **your** data |
| Compliance | Data residency, logging, model providers |

## Fine-tune vs RAG vs prompt

| Approach | Use when | Avoid when |
|---|---|---|
| **Prompt engineering** | Fast iteration, tool use, light style | Need private knowledge grounding |
| **RAG** | Enterprise docs change often; citations | Tiny static style-only problem |
| **Fine-tune** | Consistent format/tone/domain language | Knowledge changes daily (prefer RAG) |
| **Managed AI API** | Commodity perception tasks | Heavy custom business logic |

## RAG architecture patterns

| Pattern | Notes |
|---|---|
| Fully managed KB (`RetrieveAndGenerate`) | Fastest path; Bedrock owns retrieve+generate |
| Retrieve-only + custom generate | Control ranking, guards, multi-step agents |
| Hybrid search | Keyword + vector for IDs, codes, rare terms |
| Hierarchical / multi-index | Different corpora or chunk granularities |
| Agentic RAG | Agent decides when/what to retrieve |

## Cost / latency tradeoffs

- Smaller/faster FM + good retrieval often beats giant FM with weak RAG.
- Batch inference / async for non-interactive workloads.
- Managed AI services: pay per API call vs owning training ops.
- Training time vs accuracy: more HPO / larger data ≠ always worth $ for marginal lift.

## AWS services

Amazon Bedrock (FMs, Knowledge Bases), SageMaker AI (algorithms, JumpStart), Textract, Rekognition, Comprehend, Transcribe, Translate, Personalize, Lex, Polly.

## Hands-on practice

1. Same prompt on two Bedrock models; compare latency, tokens, quality.
2. Prototype: prompt-only vs KB RAG on a private PDF set; measure groundedness.
3. Map three business problems to: ML model / Bedrock FM / managed AI service — write the tradeoff table.
4. Design a hybrid search RAG (filters + k-NN) for a product catalog.

## Common traps

- Fine-tuning when RAG would keep knowledge fresh.
- Ignoring managed AI services for OCR/vision/speech (overbuilding).
- Choosing largest FM without latency/cost constraints.
- RAG without citation/filter requirements clarified.
- Treating interpretability as free — tree models vs deep nets vs LLM opacity.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html
- https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-fully-managed-bedrock.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html
- https://docs.aws.amazon.com/textract/latest/dg/what-is.html
- https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf
