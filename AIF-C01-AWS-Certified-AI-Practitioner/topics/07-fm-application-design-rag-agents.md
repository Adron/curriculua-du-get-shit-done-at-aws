# 07 — FM application design: RAG and agents

**Domain 3 (28%) · Task Statement 3.1**

## What it is

How to design applications on foundation models: pick an FM, tune inference parameters, ground with **RAG / Knowledge Bases**, store embeddings in vector DBs, choose customization approach (prompt / RAG / fine-tune / distill), and when to use **AI agents**.

## Why it matters for AIF-C01

Heaviest domain. Most scored questions live here. RAG vs fine-tuning vs prompting is the #1 tradeoff pattern on the exam.

## What to know for the exam

### FM selection criteria

Cost, modality, latency, multi-lingual support, model size/complexity, customization options, input/output length, **prompt caching**, licensing/compliance.

### Inference parameters (effect on responses)

| Parameter | Lower | Higher |
|---|---|---|
| **Temperature** | More deterministic, focused | More random, creative |
| **Top P** | Smaller nucleus; safer | Broader token pool |
| **Top K** | Fewer candidates | More candidates |
| **Max tokens / length** | Shorter outputs; lower cost | Longer outputs; higher cost |
| **Stop sequences** | Hard stop at markers | — |

For factual Q&A / extraction: lower temperature. For brainstorming: higher temperature.

### RAG and Amazon Bedrock Knowledge Bases

**RAG** = retrieve relevant enterprise chunks → stuff into context → generate answer (often with **citations**).

Bedrock Knowledge Bases:

- Connect data sources; embed/index; retrieve; optionally **RetrieveAndGenerate**
- **Managed Knowledge Base** — AWS manages ingestion/index/storage; multimodal; agentic multi-hop retrieval; AgentCore Gateway / MCP integration
- **Customer-managed** — you pick vector store (OpenSearch, Aurora, Neptune, etc.) and own more pipeline config
- Guardrails can apply to input/output (not retrieved chunks themselves at runtime)

Business uses: enterprise search Q&A, support copilots, grounded summarization, policy assistants.

### Vector databases (store embeddings)

Exam guide examples:

- Amazon OpenSearch Service
- Amazon Aurora
- Amazon Neptune
- Amazon RDS for PostgreSQL (pgvector-style patterns)

### Customization cost tradeoffs

| Approach | Changes weights? | Cost profile | Best when |
|---|---|---|---|
| **In-context learning / prompting** | No | Token cost only | Fast iteration; general tasks |
| **RAG** | No | Embed + store + retrieve + tokens | Need current/proprietary facts |
| **Fine-tuning** | Yes | Training + host + tokens | Style/domain format; stable task |
| **Continued / continuous pre-training** | Yes (broader) | High | Large domain corpus adaptation |
| **Pre-training from scratch** | Yes | Very high | Rare; own model IP |
| **Distillation** | Student model | Train student; cheaper inference | Compress teacher into smaller model |

**Default path:** prompt → add RAG if knowledge/grounding → fine-tune only if still insufficient.

### AI agents

Agents use an FM to **plan**, call **tools**, keep **memory**, and complete multi-step business workflows (ticket resolution, ops runbooks, research). On AWS: Bedrock agents ecosystem + **AgentCore** for production runtime/identity/memory; frameworks like **Strands**.

## AWS services involved

Bedrock (FMs, Knowledge Bases, Agents), AgentCore, OpenSearch / Aurora / Neptune / RDS, SageMaker (custom host/fine-tune), Guardrails for safe generation.

## Practical study tips

- Draw the RAG loop once from memory: ingest → chunk → embed → index → retrieve → generate → cite.
- For each scenario, force-rank: prompt / RAG / fine-tune / agent.
- Know Managed vs customer-managed KB at a conceptual level.

## Common exam traps

- Fine-tuning to “add company docs” when RAG is the right fix.
- High temperature for compliance-critical answers.
- Forgetting citations/grounding for enterprise Q&A.
- Building an agent when a single RAG call would do.

## Exam guide mapping

- **Task Statement 3.1** — Design considerations for FM apps (selection criteria; inference parameters; RAG + Knowledge Bases; vector DB services; customization cost tradeoffs; AI agents).

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve-generate.html
- https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InferenceConfiguration.html
- https://docs.aws.amazon.com/bedrock-agentcore/
- https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html
- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
