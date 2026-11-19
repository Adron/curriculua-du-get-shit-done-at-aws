---
title: "04: Modeling approach selection"
---

# 04: Modeling approach selection

**Domain 2 (24%) · Task 2.1 · Skills 2.1.1-2.1.8**

Before you train anything, pick the right kind of solution. Traditional ML, a foundation model on Bedrock, fine-tuning vs RAG vs prompting, or just a managed AI API like Textract or Rekognition. And you pick it under real constraints: latency, cost, interpretability, and the domain.

C02 puts **Bedrock FM selection**, **fine-tune strategy**, **RAG architecture patterns**, and **AI latency/cost tradeoffs** right next to classic algorithm choice. Expect a lot of "which approach" scenario questions.

**Most of the wrong answers on these questions are overbuilding.** Somebody wants OCR and the distractor is a fine-tuned LLM. Don't take the bait.

## What to know

### Skills map

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

### Decision tree (builder view)

```
Need structured prediction on tabular/time-series with labeled data?
  → Traditional ML (SageMaker built-ins / your framework)
Need OCR / vision labels / speech / NLP entities with low custom effort?
  → Managed AI service (Textract, Rekognition, Transcribe, Comprehend…)
Need language generation / reasoning over knowledge?
  → Prompt-only FM → if grounding needed: RAG → if style/task lock-in: fine-tune
```

### Bedrock FM selection criteria

| Criterion | Questions |
|---|---|
| Task fit | Chat, summarization, code, embeddings, multimodal? |
| Context window | Long docs / multi-turn? |
| Latency / TPS | Real-time UX vs batch |
| Cost | Input/output tokens; provisioned throughput |
| Quality | Arena/evals on **your** data |
| Compliance | Data residency, logging, model providers |

### Fine-tune vs RAG vs prompt

| Approach | Use when | Avoid when |
|---|---|---|
| **Prompt engineering** | Fast iteration, tool use, light style | Need private knowledge grounding |
| **RAG** | Enterprise docs change often; citations | Tiny static style-only problem |
| **Fine-tune** | Consistent format/tone/domain language | Knowledge changes daily (prefer RAG) |
| **Managed AI API** | Commodity perception tasks | Heavy custom business logic |

### RAG architecture patterns

| Pattern | Notes |
|---|---|
| Fully managed KB (`RetrieveAndGenerate`) | Fastest path; Bedrock owns retrieve+generate |
| Retrieve-only + custom generate | Control ranking, guards, multi-step agents |
| Hybrid search | Keyword + vector for IDs, codes, rare terms |
| Hierarchical / multi-index | Different corpora or chunk granularities |
| Agentic RAG | Agent decides when/what to retrieve |

### Cost and latency tradeoffs

- A smaller, faster FM with good retrieval often beats a giant FM with weak RAG.
- Use batch or async inference for non-interactive workloads.
- Managed AI services: you pay per API call instead of owning training ops.
- Training time vs accuracy: more HPO or more data isn't always worth the money for a marginal lift.

## AWS services in play

Amazon Bedrock (FMs, Knowledge Bases), SageMaker AI (algorithms, JumpStart), Textract, Rekognition, Comprehend, Transcribe, Translate, Personalize, Lex, and Polly.

## Hands-on

1. Run the same prompt on two Bedrock models and compare latency, tokens, and quality.
2. Prototype prompt-only vs KB RAG on a private PDF set and measure groundedness.
3. Map three business problems to ML model / Bedrock FM / managed AI service and write out the tradeoff table. Start with the build itself: "tag this post" is a supervised classifier ([B5](../../build.md#b5)), "answer questions about the archive" is RAG ([B6](../../build.md#b6)). Same data, two very different approaches.
4. Design a hybrid search RAG (filters + k-NN) for a product catalog.

## Exam traps

- Fine-tuning when RAG would keep the knowledge fresh.
- Ignoring managed AI services for OCR, vision, or speech (overbuilding).
- Choosing the largest FM with no latency or cost constraint in mind.
- RAG without clarifying the citation and filter requirements.
- Treating interpretability as free. Tree models vs deep nets vs LLM opacity are very different stories.

## Exam guide mapping

- **Domain 2 (24%) · Task 2.1 · Skills 2.1.1-2.1.8**: modeling approach selection.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html>
- <https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-fully-managed-bedrock.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html>
- <https://docs.aws.amazon.com/textract/latest/dg/what-is.html>
- <https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf>