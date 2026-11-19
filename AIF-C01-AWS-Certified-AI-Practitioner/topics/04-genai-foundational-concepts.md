---
title: "04: GenAI foundational concepts"
---

# 04: GenAI foundational concepts

**Domain 2 (24%) · Task Statement 2.1**

The building blocks of generative AI: tokens, embeddings, vectors, chunking, transformers/LLMs/FMs, multimodal and diffusion models, token pricing, context engineering, and the basics of agentic AI and MCP.

Domain 2 is 24% of the exam by itself, and it feeds straight into Domain 3 (28%). If tokens, context windows, and the RAG primitives are fuzzy, you'll whiff the cost, latency, and architecture questions. **Learn this once, properly, and the rest of the GenAI material gets a lot easier.**

## What to know

### Core definitions

| Concept | Know this |
|---|---|
| **Token** | Unit of text the model reads and writes. Billing and context limits are token-based. |
| **Embedding** | Numeric vector representing the meaning of a text or image chunk, used for similarity search. |
| **Vector** | A point in high-dimensional space. Similar meaning ⇒ nearby vectors. |
| **Chunking** | Splitting documents into pieces before embedding/indexing for RAG. |
| **Transformer / LLM** | Attention-based architecture powering modern language FMs. |
| **Foundation model (FM)** | Large pretrained model reused across tasks via prompts, RAG, fine-tuning. |
| **Multimodal** | Accepts or produces multiple modalities (text, image, audio, video). |
| **Diffusion model** | Generative model family common for images (noise → sample). |
| **Prompt engineering** | Designing instructions and context to steer FM output. |
| **Context engineering** | Curating what goes in the context window (system prompt, history, retrieved docs, tools) for quality and cost. |

### FM lifecycle (high level)

Data selection → model selection → pre-training → fine-tuning → evaluation → deployment → feedback.

### Token-based pricing

- Cost scales with **input + output tokens** (and sometimes cached tokens).
- Long prompts, few-shot examples, and big RAG contexts all raise cost and can hit context limits.
- Bigger/better models cost more per token. Smaller models are cheaper but may need more retries or RAG.

### Context engineering

- The context window is finite. Prioritize relevant retrieved chunks, concise instructions, and tool results.
- Bad context means hallucinations, leakage, or wasted spend.
- It complements prompt engineering: it's about *what* goes in the window, not just *how* you word it.

### Agentic AI and MCP basics

| Idea | Exam meaning |
|---|---|
| **AI agent** | FM + planning + tools + memory, working toward a multi-step goal |
| **Multi-agent patterns** | Swarm / graph / workflow collaboration for complex tasks |
| **MCP (Model Context Protocol)** | Standard way to connect agents to external tools and data sources |
| **Tool usage** | Agent calls APIs, DBs, Knowledge Bases, Lambdas |
| **Memory / orchestration** | Persist state, sequence steps, coordinate agents |

On AWS you build agents with frameworks like **Strands Agents**, run them at scale on **Amazon Bedrock AgentCore**, and can expose Knowledge Bases as MCP tools through AgentCore Gateway (the managed KB path).

### GenAI use-case examples

Image/video/audio generation, summarization, AI assistants, translation, code generation, customer service agents, search, recommendations.

## AWS services in play

- **Amazon Bedrock**: FM APIs, Knowledge Bases, Guardrails, the agents ecosystem
- **Amazon Bedrock AgentCore**: deploy and operate agents (runtime, memory, identity, observability)
- **Strands Agents**: open-source agent SDK (MCP-capable)
- **SageMaker AI / JumpStart**: host or fine-tune FMs when you need self-managed models

## Hands-on

- Every time a scenario says "long document in the prompt," translate it in your head to chunk + embed + retrieve (RAG).
- Practice rough estimates: more context tokens = more money and more latency. Don't forget output tokens.
- Keep the line clear between a **chatbot** (single turn or dialog) and an **agent** (tools + multiple steps).
- In the Bedrock playground, paste a long post and watch the token counts climb. That sticks better than any table. (Warm-up for [B1](../../build.md#b1).)

## Exam traps

- Confusing embeddings (retrieval) with fine-tuning (weight updates).
- Ignoring output tokens in cost. Summaries can get expensive too.
- Stuffing an entire corpus into the prompt instead of using RAG.
- Treating MCP as a model. **It's a protocol for tools and context**, not an FM.

## Exam guide mapping

- **Task Statement 2.1**: Explain basic GenAI concepts (tokens, chunking, embeddings, vectors, prompts, transformers/LLMs/FMs, multimodal, diffusion; use cases; FM lifecycle; token pricing; context engineering; agentic AI / MCP / multi-agent / memory / tools / orchestration).

## Research links

- <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-agentcore.html>
- <https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/agentic-ai-frameworks.pdf>
- <https://aws.amazon.com/ai/generative-ai/services/>