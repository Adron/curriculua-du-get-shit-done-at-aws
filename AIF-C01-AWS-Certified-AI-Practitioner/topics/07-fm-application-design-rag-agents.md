---
title: "07: FM application design, RAG and agents"
---

# 07: FM application design, RAG and agents

**Domain 3 (28%) · Task Statement 3.1**

How you design an application on top of a foundation model. Pick the FM, tune the inference parameters, ground it with **RAG and Knowledge Bases**, store embeddings in a vector database, choose a customization approach (prompt, RAG, fine-tune, distill), and decide when an **AI agent** is actually warranted.

This is the heaviest domain on the exam, and this topic is the center of it. **RAG vs fine-tuning vs prompting is the #1 tradeoff pattern on AIF-C01.** It's also the call I see people get wrong most often in real projects, so it's worth knowing well past the exam.

## What to know

### FM selection criteria

Cost, modality, latency, multilingual support, model size/complexity, customization options, input/output length, **prompt caching**, licensing and compliance.

### Inference parameters (and what they do to responses)

| Parameter | Lower | Higher |
|---|---|---|
| **Temperature** | More deterministic, focused | More random, creative |
| **Top P** | Smaller nucleus; safer | Broader token pool |
| **Top K** | Fewer candidates | More candidates |
| **Max tokens / length** | Shorter outputs; lower cost | Longer outputs; higher cost |
| **Stop sequences** | Hard stop at markers | n/a |

Factual Q&A and extraction: low temperature. Brainstorming: higher temperature.

### RAG and Amazon Bedrock Knowledge Bases

**RAG** = retrieve relevant enterprise chunks → put them in the context → generate an answer (often with **citations**).

Bedrock Knowledge Bases:

- Connect data sources; embed and index; retrieve; optionally **RetrieveAndGenerate**
- **Managed Knowledge Base**: AWS manages ingestion, index, and storage; multimodal; agentic multi-hop retrieval; AgentCore Gateway / MCP integration
- **Customer-managed**: you pick the vector store (OpenSearch, Aurora, Neptune, etc.) and own more of the pipeline config
- Guardrails can apply to input and output (not to the retrieved chunks themselves at runtime)

Business uses: enterprise search Q&A, support copilots, grounded summarization, policy assistants.

### Vector databases (where embeddings live)

The exam guide's examples:

- Amazon OpenSearch Service
- Amazon Aurora
- Amazon Neptune
- Amazon RDS for PostgreSQL (pgvector-style patterns)

### Customization cost tradeoffs

| Approach | Changes weights? | Cost profile | Best when |
|---|---|---|---|
| **In-context learning / prompting** | No | Token cost only | Fast iteration; general tasks |
| **RAG** | No | Embed + store + retrieve + tokens | You need current or proprietary facts |
| **Fine-tuning** | Yes | Training + hosting + tokens | Style/domain format; stable task |
| **Continued / continuous pre-training** | Yes (broader) | High | Large domain corpus adaptation |
| **Pre-training from scratch** | Yes | Very high | Rare; you want to own the model IP |
| **Distillation** | Student model | Train a student; cheaper inference | Compress a teacher into a smaller model |

**Default path:** prompt → add RAG if you need knowledge or grounding → fine-tune only if that still isn't enough.

### AI agents

Agents use an FM to **plan**, call **tools**, keep **memory**, and finish multi-step business workflows (ticket resolution, ops runbooks, research). On AWS that's the Bedrock agents ecosystem plus **AgentCore** for production runtime, identity, and memory, with frameworks like **Strands**.

## AWS services in play

Bedrock (FMs, Knowledge Bases, Agents), AgentCore, OpenSearch / Aurora / Neptune / RDS for vectors, SageMaker for custom hosting and fine-tuning, and Guardrails for safe generation.

## Hands-on

- Draw the RAG loop from memory: **ingest → chunk → embed → index → retrieve → generate → cite.** Then go build it for real in [B2](../../build.md#b2): a handful of my blog posts in S3, a Knowledge Base on top, and a look at the citations that come back.
- Ask the same factual question at temperature 0 and temperature 1 in the playground. See [B1](../../build.md#b1).
- For each practice scenario, force-rank the options: prompt / RAG / fine-tune / agent. Know managed vs customer-managed Knowledge Bases at a conceptual level.

## Exam traps

- Fine-tuning to "add the company docs." That's what RAG is for.
- High temperature for compliance-critical answers.
- Forgetting citations and grounding for enterprise Q&A.
- Building an agent when a single RAG call would do the job.

## Exam guide mapping

- **Task Statement 3.1**: Design considerations for FM apps (selection criteria; inference parameters; RAG + Knowledge Bases; vector DB services; customization cost tradeoffs; AI agents).

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve-generate.html>
- <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InferenceConfiguration.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/>
- <https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html>
- <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html>