---
layout: default
title: "Workbook 03 — Foundation Model Applications"
---

# Workbook 03 — Foundation Model Applications

**Covers:** [topics/07](../topics/07-fm-application-design-rag-agents.md) · [08](../topics/08-prompt-engineering-techniques.md) · [09](../topics/09-fm-training-and-fine-tuning.md) · [10](../topics/10-fm-evaluation-methods-and-metrics.md)  
**Domain:** 3 — Applications of Foundation Models (**28%** — heaviest)  
**Prerequisites:** [Workbook 02](./02-genai-fundamentals.md); comfort with tokens/embeddings/Bedrock map.  
**Estimated time:** 6–8 hours (split across 2–3 sessions)  
**Nav:** [Workbooks home](./README.md) · [Punch list](../PUNCH-LIST.md)

---

## Learning objectives

By the end of this workbook you can:

1. Select FMs using cost, modality, latency, context, compliance, and customization criteria; tune temperature/top-p/max tokens for the task.
2. Design a RAG flow with Knowledge Bases, citations, and vector DB options; decide Managed vs customer-managed KB conceptually.
3. Force-rank **prompt → RAG → fine-tune → continued pre-train → train from scratch**; know when agents beat single-shot RAG.
4. Apply zero/few-shot, CoT, templates, negative prompts; name Prompt Management capabilities and prompt risks (jailbreak/injection).
5. Distinguish pre-training, fine-tuning, distillation, RLHF, and data-prep concerns.
6. Choose eval approaches (HITL, Bedrock Model Evaluation, ROUGE/BLEU/BERTScore, LLM-as-judge) and RAG/agent metrics tied to business KPIs.

---

## Activate prior knowledge

1. Last GenAI demo you saw: was knowledge coming from **weights**, **prompt**, or **retrieved docs**?
2. Have you ever written a “few-shot” example in a prompt without calling it that?
3. How would you know a model upgrade is better — gut feel, A/B, or metrics?

---

## Concept refresh

| Idea | One-liner | Link |
|---|---|---|
| Inference params | Lower temp → factual; higher → creative | [07](../topics/07-fm-application-design-rag-agents.md) |
| RAG loop | Ingest → chunk → embed → index → retrieve → generate → cite | [07](../topics/07-fm-application-design-rag-agents.md) |
| Vector stores | OpenSearch, Aurora, Neptune, RDS (pgvector patterns) | [07](../topics/07-fm-application-design-rag-agents.md) |
| Customization ladder | Prompt → RAG → fine-tune → continued PT → scratch | [07](../topics/07-fm-application-design-rag-agents.md) / [09](../topics/09-fm-training-and-fine-tuning.md) |
| Prompt techniques | Zero/few-shot, CoT, templates; Prompt Management versions | [08](../topics/08-prompt-engineering-techniques.md) |
| Training vocab | Fine-tune updates weights; RLHF uses preference ranks; distill = student | [09](../topics/09-fm-training-and-fine-tuning.md) |
| Eval metrics | ROUGE/BLEU/BERTScore/LLM-judge + HITL + business KPIs | [10](../topics/10-fm-evaluation-methods-and-metrics.md) |

---

## Retrieval practice (closed-book)

**Design & RAG**

1. List five FM selection criteria.
2. Temperature high or low for compliance Q&A?
3. Draw the RAG loop in 6–7 boxes.
4. Name three AWS vector DB examples from the exam guide family.
5. Fine-tune vs RAG: which changes weights? Which injects fresh proprietary facts?
6. When is an **agent** justified over a single RetrieveAndGenerate call?

**Prompts**

7. Zero-shot vs few-shot vs CoT — one use each.
8. What does Bedrock Prompt Management give you beyond a text box?
9. Jailbreak vs prompt injection — distinguish briefly.

**Training**

10. Pre-training vs fine-tuning vs continuous pre-training.
11. Distillation goal?
12. Two data-prep concerns before fine-tuning.

**Eval**

13. ROUGE vs BLEU vs BERTScore vs LLM-as-judge — one phrase each.
14. Why HITL for brand-sensitive content?
15. Name two RAG-specific eval dimensions and one agent-specific dimension.

---

## Worked example → guided → independent

### Worked example — customization ladder

**Need:** Support bot must answer from product manuals updated weekly; tone should match brand (short, friendly); sometimes call “create ticket” API.

| Layer | Decision |
|---|---|
| Facts | **RAG** on manuals (weekly ingest) — not fine-tune for weekly changes |
| Tone/format | Start with **few-shot + Prompt Management**; fine-tune only if still failing |
| Actions | **Agent** with ticket tool + least privilege |
| Params | Low temperature; max tokens capped |
| Safety | Guardrails + citations |
| Eval | Groundedness, citation correctness, task completion, CSAT, $/ticket |

---

### Guided practice

**G1.** Rank approaches for “model writes JSON in our schema”: ( ) fine-tune ( ) few-shot template ( ) RAG. Default order: ________ → ________ → ________.

**G2.** Parameter: creative marketing slogans → temp ________; extract invoice fields → temp ________.

**G3.** Metric for summary overlap with reference: ________; semantic similarity: ________; translation classic: ________.

**G4.** Preference ranking by humans to align model behavior: ________.

**G5.** Cheaper/faster student mimicking teacher: ________.

---

### Independent practice

- [ ] **I1.** Build a decision tree (flowchart) for prompt / RAG / fine-tune / agent. Use it on three scenarios you invent.
- [ ] **I2.** Write one Prompt Management versioning plan: variables, variants A/B, who approves production version.
- [ ] **I3.** Design an offline eval set (10 items) for a RAG bot: query, expected citation doc id, pass/fail rubric.
- [ ] **I4.** For a latency-sensitive mobile summarizer, argue for distillation vs larger teacher model.

---

## Scenario / decision exercises

**S1.** Company docs change daily; bot invents policies. First fix?  
- [ ] A) Fine-tune weekly  
- [ ] B) RAG + grounding/citations  
- [ ] C) Raise temperature  

**S2.** Need multi-step: look up order, check inventory, draft email.  
- [ ] A) Single zero-shot prompt only  
- [ ] B) Agent with tools + memory  
- [ ] C) Clustering  

**S3.** Team edits production prompts in Slack with no history.  
- [ ] A) Bedrock Prompt Management versions/variants  
- [ ] B) Store secrets in the prompt  
- [ ] C) Disable Guardrails  

**S4.** Compare two FMs for your summarization task before launch.  
- [ ] A) Bedrock Model Evaluation (+ business KPI)  
- [ ] B) Pick the famous name  
- [ ] C) Only measure CPU  

**S5.** Want smaller model for edge inference cost.  
- [ ] A) Distillation  
- [ ] B) Continuous pre-training on PII  
- [ ] C) Delete embeddings  

**S6.** BLEU is high but users hate chat quality.  
- [ ] A) Trust BLEU alone  
- [ ] B) Add HITL / LLM-judge / task completion / CSAT  
- [ ] C) Increase top-k randomly  

**S7.** Jailbreak attempts in user messages.  
- [ ] A) Prompt wording alone is enough forever  
- [ ] B) Guardrails prompt-attack filters + app controls  
- [ ] C) Fine-tune on jailbreaks only  

**S8.** Need domain writing style stable across 50k examples; facts already in RAG.  
- [ ] A) Fine-tune / instruction tune for style  
- [ ] B) Stuff more docs in context forever  
- [ ] C) Use Polly  

---

## Hands-on lab

### Option A — Console (plan 90+ min; can split)

- [ ] **L1.** Bedrock playground: same question at temp 0 vs 1; change max tokens; note length/cost behavior. ([Inference parameters](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html))
- [ ] **L2.** Knowledge Bases: create or open a sample KB (or follow docs tutorial). Run retrieve vs retrieve-and-generate if available. ([KB guide](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html))
- [ ] **L3.** Prompt Management: create a prompt with a `{{variable}}`, save a version, optionally create a variant. ([Prompt Management](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html))
- [ ] **L4.** Skim Model Evaluation docs; list metrics you could score. ([Evaluation](https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html))
- [ ] **L5.** Optional: JumpStart fine-tune docs — note that epochs/LR exist but you won’t tune them for this exam. ([JumpStart fine-tune](https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-fine-tune.html))

### Option B — Paper architecture

- [ ] Diagram: User → API → Guardrails → Agent planner → (KB retrieve | Ticket tool) → FM generate → citations → logs. Annotate where eval probes attach (retrieval, faithfulness, tool success).

---

## Common misconceptions / exam traps

| Trap | Fix |
|---|---|
| Fine-tune to “add the PDF corpus” | RAG for proprietary/changing facts |
| High temp for legal answers | Lower temp; ground; cite |
| Few-shot = knowledge base | Examples steer format; they don’t replace retrieval |
| Prompts stop jailbreaks alone | Guardrails + architecture |
| Agent for every FAQ | Single RAG call may suffice |
| BLEU for open chat | Wrong metric family; use HITL/task metrics |
| Eval only the LLM in RAG | Measure retrieval + groundedness |
| Practitioner must train from scratch | Know concepts; providers do pre-training |
| Distillation = RAG | Compress model ≠ retrieve docs |

---

## Reflection / teach it back

Record a 7-minute talk:

1. Customization ladder with one example each.  
2. RAG loop + one vector store.  
3. Prompt techniques + Prompt Management.  
4. Eval stack: automatic + HITL + business.

---

## Mastery checklist

- [ ] Force-ranks prompt/RAG/fine-tune/agent correctly on new scenarios
- [ ] Explains inference params and RAG architecture
- [ ] Names prompt techniques, risks, Prompt Management features
- [ ] Defines pre-train / fine-tune / CPT / distill / RLHF
- [ ] Maps ROUGE/BLEU/BERTScore/LLM-judge and RAG/agent eval ideas
- [ ] Retrieval ≥12/15 before answer key
- [ ] Lab or paper complete

**Exit:** Mark Domain 3 punch items → [Workbook 04](./04-responsible-ai-security-governance.md).

---

## Answer key

<details>
<summary>Retrieval</summary>

1. Cost, modality, latency, context length, compliance/licensing, customization, multilingual, prompt caching…  
2. Low.  
3. Ingest → chunk → embed → index → retrieve → generate → cite.  
4. OpenSearch, Aurora, Neptune, RDS PostgreSQL (pgvector-style).  
5. Fine-tune changes weights; RAG injects facts at inference.  
6. Multi-step goals needing tools/memory/orchestration.  
7. Zero: simple known task; few-shot: format/style; CoT: multi-step reasoning.  
8. Variables, variants, versions, model/inference config, test side-by-side, Flows integration.  
9. Jailbreak: user tricks model past safety; injection: malicious instructions in user/retrieved content override intent.  
10. PT: massive unlabeled general learning; FT: task/domain labeled adaptation; CPT: more unlabeled domain text.  
11. Smaller/faster/cheaper student mimicking teacher.  
12. Curation, governance/rights, size, labeling quality, representativeness, RLHF preference data…  
13. ROUGE: summary n-gram recall overlap; BLEU: precision n-gram (MT); BERTScore: embedding semantic similarity; LLM-judge: model grades outputs.  
14. Subjective quality, safety, brand, high-risk — autoscores miss nuance.  
15. RAG: retrieval relevance, groundedness/faithfulness, citation correctness… Agent: tool selection accuracy, step success, unsafe tool use, trajectory quality…

</details>

<details>
<summary>Guided</summary>

**G1.** Few-shot/template → (RAG if facts) → fine-tune.  
**G2.** Higher; lower.  
**G3.** ROUGE; BERTScore; BLEU.  
**G4.** RLHF.  
**G5.** Distillation.

</details>

<details>
<summary>Scenarios</summary>

**S1** B · **S2** B · **S3** A · **S4** A · **S5** A · **S6** B · **S7** B · **S8** A

</details>
