# 04 — GenAI foundational concepts

**Domain 2 (24%) · Task Statement 2.1**

## What it is

Building blocks of generative AI: tokens, embeddings, vectors, chunking, transformers/LLMs/FMs, multimodal and diffusion models, token pricing, context engineering, and agentic AI / MCP basics.

## Why it matters for AIF-C01

Domain 2 is 24% and feeds Domain 3 (28%). Misunderstanding tokens/context/RAG primitives causes wrong answers on cost, latency, and architecture questions.

## What to know for the exam

### Core definitions

| Concept | Know this |
|---|---|
| **Token** | Unit of text the model reads/writes; billing and context limits are token-based. |
| **Embedding** | Numeric vector representing meaning of text/image chunk for similarity search. |
| **Vector** | Point in high-dimensional space; similar meaning ⇒ nearby vectors. |
| **Chunking** | Splitting documents into pieces before embedding/indexing for RAG. |
| **Transformer / LLM** | Attention-based architecture powering modern language FMs. |
| **Foundation model (FM)** | Large pretrained model reusable across tasks via prompts, RAG, fine-tuning. |
| **Multimodal** | Accepts/produces multiple modalities (text, image, audio, video). |
| **Diffusion model** | Generative model family common for images (noise → sample). |
| **Prompt engineering** | Designing instructions/context to steer FM outputs. |
| **Context engineering** | Curating what goes in the context window (system prompt, history, retrieved docs, tools) for quality/cost. |

### FM lifecycle (high level)

Data selection → model selection → pre-training → fine-tuning → evaluation → deployment → feedback.

### Token-based pricing

- Cost scales with **input + output tokens** (and sometimes cached tokens).
- Longer prompts, few-shot examples, and large RAG contexts increase cost and can hit context limits.
- Tradeoffs: bigger/better models cost more per token; smaller models cheaper but may need more retries or RAG.

### Context engineering

- Context window is finite — prioritize relevant retrieved chunks, concise instructions, tool results.
- Bad context ⇒ hallucinations, leakage, or wasted spend.
- Complements prompt engineering: *what* you put in the window, not only *how* you word it.

### Agentic AI / MCP basics

| Idea | Exam meaning |
|---|---|
| **AI agent** | FM + planning + tools + memory to complete multi-step goals |
| **Multi-agent patterns** | Swarm / graph / workflow collaboration for complex tasks |
| **MCP (Model Context Protocol)** | Standard way to connect agents to external tools/data sources |
| **Tool usage** | Agent invokes APIs, DBs, Knowledge Bases, Lambdas |
| **Memory / orchestration** | Persist state; sequence steps; coordinate agents |

On AWS: build agents with frameworks like **Strands Agents**; operate at scale with **Amazon Bedrock AgentCore**; expose Knowledge Bases as MCP tools via AgentCore Gateway (managed KB path).

### GenAI use-case examples

Image/video/audio generation; summarization; AI assistants; translation; code generation; customer service agents; search; recommendations.

## AWS services involved

- **Amazon Bedrock** — FM APIs, Knowledge Bases, Guardrails, agents ecosystem
- **Amazon Bedrock AgentCore** — deploy/operate agents (runtime, memory, identity, observability)
- **Strands Agents** — open-source agent SDK (MCP-capable)
- **SageMaker AI / JumpStart** — host/fine-tune FMs when you need self-managed models

## Practical study tips

- Always convert “long document in prompt” → chunk + embed + retrieve (RAG) mentally.
- Practice estimating: more context tokens = more $ and latency.
- Separate **chatbot** (single turn/dialog) from **agent** (tools + multi-step).

## Common exam traps

- Confusing embeddings (retrieval) with fine-tuning (weight updates).
- Ignoring output tokens in cost (summaries can be expensive too).
- Stuffing entire corpora into the prompt instead of RAG.
- Treating MCP as a model — it is a **protocol for tools/context**, not an FM.

## Exam guide mapping

- **Task Statement 2.1** — Explain basic GenAI concepts (tokens, chunking, embeddings, vectors, prompts, transformers/LLMs/FMs, multimodal, diffusion; use cases; FM lifecycle; token pricing; context engineering; agentic AI / MCP / multi-agent / memory / tools / orchestration).

## Research links

- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html
- https://docs.aws.amazon.com/bedrock-agentcore/
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-agentcore.html
- https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/agentic-ai-frameworks.pdf
- https://aws.amazon.com/ai/generative-ai/services/
