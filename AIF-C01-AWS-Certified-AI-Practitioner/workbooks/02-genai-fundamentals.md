---
layout: default
title: "Workbook 02: GenAI Fundamentals"
---

# Workbook 02: GenAI Fundamentals

**Covers:** [topics/04](../topics/04-genai-foundational-concepts.md) · [05](../topics/05-genai-capabilities-limitations-selection.md) · [06](../topics/06-aws-genai-infrastructure-and-services.md)  
**Domain:** 2, Fundamentals of GenAI (24%)  
**Prerequisites:** [Workbook 01](./01-ai-ml-foundations.md) mastery checklist (or equivalent Domain 1 comfort).  
**Estimated time:** 4-5 hours  
**Nav:** [Workbooks home](./README.md) · [Punch list](../PUNCH-LIST.md)

Tokens, embeddings, context windows, and the AWS GenAI service map. This is the plumbing under everything in Domain 3, and it's where the cost and latency questions come from. If "just paste the whole PDF in the prompt" still sounds reasonable to you, this workbook is going to fix that.

---

## Learning objectives

By the end of this one, I want to be able to:

1. Define tokens, embeddings, vectors, chunking, transformers/LLMs/FMs, multimodal, and diffusion at exam depth.
2. Explain token-based pricing and context engineering tradeoffs (cost, latency, quality).
3. Contrast chatbots vs agentic AI; state what MCP is (and is not).
4. List GenAI advantages/limits (esp. hallucinations) and selection factors + business value metrics.
5. Map Bedrock, SageMaker AI/JumpStart, AgentCore, Strands, Quick, and Kiro to personas and cost levers (on-demand tokens vs provisioned throughput).

---

## Activate prior knowledge

Think about what you've already done with these tools before learning anything new:

1. Last time you used ChatGPT/Claude/Bedrock: what went in the **prompt**, and what else might belong in the **context window** (history, docs, tools)?
2. Have you ever hit a context length or bill shock from a long prompt? What would you cut first?
3. Name one internal system an **agent** might call via tools that a single-turn chatbot would not.

---

## Concept refresh

| Idea | One-liner | Deep dive |
|---|---|---|
| Token | Billing + context unit for text in/out | [04](../topics/04-genai-foundational-concepts.md) |
| Embedding / vector | Meaning as numbers; nearby = similar | [04](../topics/04-genai-foundational-concepts.md) |
| Chunking | Split docs before embed/index for RAG | [04](../topics/04-genai-foundational-concepts.md) |
| Context engineering | Curate *what* enters the window | [04](../topics/04-genai-foundational-concepts.md) |
| Agent / MCP | Plan + tools + memory; MCP = tool/context protocol | [04](../topics/04-genai-foundational-concepts.md) |
| Hallucinations | Fluent falsehoods; mitigate with grounding/Guardrails/HITL | [05](../topics/05-genai-capabilities-limitations-selection.md) |
| Selection factors | Modality, quality, cost, latency, compliance, ops | [05](../topics/05-genai-capabilities-limitations-selection.md) |
| Service map | Bedrock API · SageMaker/JumpStart host · AgentCore ops · Strands code · Quick BI · Kiro IDE | [06](../topics/06-aws-genai-infrastructure-and-services.md) |

---

## Retrieval practice (closed-book)

Answers on paper first. No peeking.

1. Token vs embedding: which drives **similarity search**, which drives **billing limits**?
2. Why does stuffing an entire PDF into the prompt fail at scale?
3. Diffusion models are most associated with which modality?
4. Context engineering vs prompt engineering: one sentence each.
5. MCP is: (a) a foundation model, (b) a protocol for tools/context, (c) a vector DB.
6. Three advantages of GenAI; three limitations.
7. Name four model selection factors besides “accuracy.”
8. Pair one **model** metric and one **business** metric for a support summarizer.
9. Business analyst asks questions over warehouse data in chat UI → which AWS GenAI service persona?
10. Developer wants AI-assisted coding in an IDE → ?
11. Production agent platform (runtime, memory, identity) without building infra → ?
12. Steady high-volume Bedrock traffic with latency SLAs: on-demand tokens or ________?

---

## Worked example → guided → independent

### Worked example

**Scenario:** Legal wants a bot that answers from 10 years of contracts. Lawyers paste whole contracts into ChatGPT today (slow, leaky, expensive).

**Design direction:**

| Concern | Choice |
|---|---|
| Knowledge | Chunk → embed → vector index → **RAG** (not paste-all) |
| Cost | Pay for retrieved chunks + answer tokens, not full corpus every call |
| Hallucinations | Citations + grounding checks; lower temperature |
| AWS | Bedrock Knowledge Bases + Guardrails; not JumpStart “because GenAI” |
| Scope later | Enterprise app calling pre-trained FMs (scoping matrix Scope 3; see WB04) |

---

### Guided practice

**G1.** Image generation from text prompts → often ________ models; text Q&A → ________ / LLM.

**G2.** Agent that books travel: needs ________ + ________ + ________, not only a system prompt.

**G3.** Few labels, lots of PDFs, need current policy answers → prefer RAG over ________.

**G4.** Match persona → service: (a) BI chat (b) FM API backend (c) open weights on your endpoints (d) agent SDK in code.

---

### Independent practice

- [ ] **I1.** Estimate mentally: 2K input + 500 output tokens, $X per 1K (pick any published Bedrock price from docs for one model). Compare to embedding 50 chunks of 400 tokens each vs one 20K-token paste. Which wins on cost/latency narrative?
- [ ] **I2.** Write a one-page “GenAI go / no-go” checklist for your org (advantages, limits, mitigations, selection factors, KPIs).
- [ ] **I3.** Flashcard the six-service map until you can recite without notes.

---

## Scenario / decision exercises

**S1.** “We’ll fine-tune so the model memorizes our wiki.” Better first step?  
- [ ] A) RAG over the wiki  
- [ ] B) Pre-train from scratch  
- [ ] C) Raise temperature  

**S2.** Outputs vary wildly on the same factual prompt. First knobs?  
- [ ] A) Lower temperature / top-p; add eval harness  
- [ ] B) Delete Guardrails  
- [ ] C) Switch to clustering  

**S3.** Need private FM API, multi-provider models, no GPU fleet.  
- [ ] A) Amazon Bedrock  
- [ ] B) Only self-built EC2 GPUs  
- [ ] C) Amazon Macie  

**S4.** Product managers want natural-language dashboards on Redshift/Glue data.  
- [ ] A) Kiro  
- [ ] B) Amazon Quick  
- [ ] C) Polly  

**S5.** Team writes multi-agent workflows in Python with MCP tools.  
- [ ] A) Strands Agents (+ AgentCore to operate)  
- [ ] B) Amazon Translate alone  
- [ ] C) Trusted Advisor  

**S6.** Compliance requires not sending prompts over public internet to Bedrock. Control pattern to research:  
- [ ] A) PrivateLink / VPC patterns  
- [ ] B) Higher temperature  
- [ ] C) BLEU score  

---

## Hands-on lab

### Option A: Console

L1 is basically [B1](../../build.md#b1), and L3 sets up [B2](../../build.md#b2). If you're doing the build, knock them out together.

- [ ] **L1.** Bedrock playground: send the same factual question at temperature 0 vs ~1. Note variance. ([Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html))
- [ ] **L2.** Count rough tokens (words×1.3 heuristic or console token estimate if shown) for a short vs long prompt; relate to pricing docs.
- [ ] **L3.** Browse Knowledge Bases overview in docs/console: locate data source → embedding → retrieve flow. ([Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html))
- [ ] **L4.** Open SageMaker JumpStart FM list (or docs) and contrast “deploy endpoint” vs Bedrock invoke.
- [ ] **L5.** Skim [AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/) “what is” page; list runtime / memory / identity / observability in your notes.

### Option B: Paper

- [ ] Draw context window layers: system prompt | retrieved chunks | user message | tool results. Annotate cost drivers and a hallucination risk if a layer is missing.

---

## Common misconceptions / exam traps

| Trap | Fix |
|---|---|
| Embeddings = fine-tuning | Embeddings retrieve; fine-tuning updates weights |
| Ignore output tokens | Summaries/code can dominate cost |
| MCP is a model | Protocol for connecting tools/data |
| Biggest model always | Cost/latency/compliance may win with smaller + RAG |
| Quick = Bedrock | Quick = business GenAI/BI; Bedrock = builder FM APIs |
| JumpStart default for all GenAI | Bedrock often enough for managed API |
| GenAI always accurate | Hallucinations. Ground, evaluate, HITL. |

---

## Reflection / teach it back

Give a 5-minute "GenAI on AWS" briefing to a teammate, a rubber duck, or your phone's voice recorder:

1. Tokens, embeddings, chunking, RAG loop.  
2. Hallucination + one mitigation.  
3. Service map by persona.  
4. When provisioned throughput beats pure on-demand.

---

## Mastery checklist

- [ ] Defines token/embedding/chunk/FM/agent/MCP correctly
- [ ] Explains pricing + context engineering tradeoffs
- [ ] Lists advantages, limits, selection factors, business metrics
- [ ] Maps all six named GenAI stack services to use cases
- [ ] Retrieval ≥10/12 before answer key
- [ ] Lab or paper architecture done

**Exit:** Mark Domain 2 punch items → [Workbook 03](./03-foundation-model-applications.md) (heaviest domain).

---

## Answer key

<details>
<summary>Retrieval</summary>

1. Embedding → similarity; tokens → billing/context limits (both can matter for RAG cost).  
2. Context limits, cost, latency, noise → chunk + retrieve instead.  
3. Images (generative image models).  
4. Prompt eng = wording/instructions; context eng = selecting/prioritizing window contents.  
5. (b) protocol.  
6. Advantages: adaptability, generation, conversational UX, fast experiment… Limits: hallucinations, opacity, nondeterminism, cost/latency, leakage risks…  
7. Cost, latency, modality, context length, compliance/licensing, customization, ops complexity…  
8. e.g. groundedness/toxicity + CSAT or handle time / cost per ticket.  
9. Amazon Quick.  
10. Kiro.  
11. Amazon Bedrock AgentCore.  
12. Provisioned throughput.

</details>

<details>
<summary>Guided</summary>

**G1.** Diffusion; transformers/LLMs/FMs.  
**G2.** Planning, tools, memory (orchestration).  
**G3.** Fine-tuning (for facts).  
**G4.** (a) Quick (b) Bedrock (c) JumpStart/SageMaker (d) Strands.

</details>

<details>
<summary>Scenarios</summary>

**S1** A · **S2** A · **S3** A · **S4** B · **S5** A · **S6** A

</details>
