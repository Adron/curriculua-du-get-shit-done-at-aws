---
layout: default
title: "Workbook 05: Capstone & Exam-Ready"
---

# Workbook 05: Capstone & Exam-Ready

**Covers:** Interleaved practice across topics [01](../topics/01-ai-ml-terminology-and-concepts.md)-[14](../topics/14-ai-governance-and-compliance.md)  
**Domains:** All (weighted toward 2-3)  
**Prerequisites:** Workbooks [01](./01-ai-ml-foundations.md)-[04](./04-responsible-ai-security-governance.md) mastery checklists (or equivalent).  
**Estimated time:** 4-6 hours (+ separate official practice exam)  
**Nav:** [Workbooks home](./README.md) · [Punch list](../PUNCH-LIST.md) · [Cert README](../README.md)

This is where it all gets mixed together, the way the real exam does it. No more one-domain-at-a-time. Every scenario here pulls from two or three domains at once, and the goal is to make the judgment call fast and explain why. It's also the checkpoint for the first leg of [the build](../../build.md): by the end of this workbook I want B1 through B3 actually done, not just read about.

---

## Learning objectives

By the end of this one, I want to be able to:

1. Solve mixed scenarios that combine technique selection, AWS service choice, RAG/agents, responsible AI, and security/governance in one judgment call.
2. Explain tradeoffs out loud under time pressure (exam-style).
3. Identify personal weak domains from error patterns and remediate with targeted topic re-reads.
4. Confirm readiness criteria for scheduling: **official practice exam consistently ≥80%**, plus checklist below.

---

## Activate prior knowledge

Be honest with yourself here. This sets up the rest of the workbook:

1. Which workbook felt hardest: foundations, GenAI stack, FM apps, or RAI/security? Why?
2. Name the heaviest exam domain by weight without looking.
3. What is your personal “default wrong answer” (e.g., always fine-tune)? Write it down to watch for it.

---

## Concept refresh (interleaved pointers only)

Skim only what you flagged weak:

| Domain | Jump |
|---|---|
| 1 | [WB01](./01-ai-ml-foundations.md) · topics [01](../topics/01-ai-ml-terminology-and-concepts.md)-[03](../topics/03-ai-ml-lifecycle-and-mlops-basics.md) |
| 2 | [WB02](./02-genai-fundamentals.md) · [04](../topics/04-genai-foundational-concepts.md)-[06](../topics/06-aws-genai-infrastructure-and-services.md) |
| 3 | [WB03](./03-foundation-model-applications.md) · [07](../topics/07-fm-application-design-rag-agents.md)-[10](../topics/10-fm-evaluation-methods-and-metrics.md) |
| 4-5 | [WB04](./04-responsible-ai-security-governance.md) · [11](../topics/11-responsible-ai-principles-and-practices.md)-[14](../topics/14-ai-governance-and-compliance.md) |

Official: [exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) · [Skill Builder](https://skillbuilder.aws/)

---

## Retrieval practice (closed-book mixed set)

Set a 25-minute timer. Answer all 18 before you touch the key.

1. Hierarchy: AI / ML / DL / GenAI / agentic: one line each.
2. Rare fraud detection: prioritize precision or recall? Why?
3. Speech → text at scale: service?
4. Token vs embedding roles.
5. MCP is not a ________; it is a ________.
6. Business user chat over company metrics: Quick or Bedrock?
7. RAG loop seven words or less.
8. Default customization ladder (4+ steps).
9. Temp for creative vs extraction.
10. ROUGE / BLEU / BERTScore / LLM-as-judge: match each to its purpose.
11. Guardrails: name four filter families.
12. Model Cards: three required-style fields.
13. Prompt injection vs jailbreak.
14. CloudTrail vs Artifact.
15. Scoping matrix Scope 3 vs 4.
16. Bedrock vs SageMaker when you need managed multi-provider FM APIs.
17. Distillation vs continued pre-training.
18. When AI is *wrong* for a problem (one crisp rule).

Score: __ / 18. Revisit topics for misses before scenarios.

---

## Worked example → guided → independent (full systems)

### Worked example: "Contoso Field Service Copilot"

**Requirements:** Techs ask natural-language questions over manuals + work orders; bot may create a parts order; must not invent safety procedures; PII in work orders; auditors need invoke history; Region lock EU.

**Integrated answer sketch:**

| Layer | Choice |
|---|---|
| Knowledge | Bedrock Knowledge Bases (RAG) + citations; low temperature |
| Actions | Agent + parts-order tool; AgentCore Identity / least privilege IAM |
| Safety | Guardrails (content, PII, grounding, prompt attack) |
| Transparency | Model Card; UX “sources” panel; HITL escalate for safety-critical |
| Security | Encrypt stores; Macie on S3; PrivateLink if required; no secrets in prompts |
| Eval | Groundedness, citation accuracy, task completion, CSAT, $/ticket |
| Governance | CloudTrail; Config on buckets; residency EU; Scope 3 |
| Not first | Fine-tune manuals weekly; public Scope 1 chat for confidential WOs |

If this table looks familiar, it should. It's the same shape as "Ask Composite Code" in [the build](../../build.md): RAG over a pile of documents ([B2](../../build.md#b2)), a guardrail in front ([B3](../../build.md#b3)), and later an agent with tools ([B10](../../build.md#b10)). Field manuals instead of blog posts, same architecture.

---

### Guided practice: fill in the architecture

**G1. Retail returns chatbot** (policy PDFs + “approve return” API + brand tone):  
Knowledge = ________ | Tone = ________ first | Actions = ________ | Eval = ________ | Scope = ________

**G2. Factory predictive maintenance** (sensor tables, failure labels):  
Technique = ________ | Host = ________ | GenAI? ________ | Metric trap = ________

**G3. Marketing image gen for social**:  
Model family vibe = ________ | Risk = ________ | Controls = ________ | Service = ________

---

### Independent practice

- [ ] **I1.** Write a one-page design for **your** team's most likely GenAI use case using the Contoso table template. (No team use case handy? Do it for Ask Composite Code. That's what I'm doing.)
- [ ] **I2.** Create 8 flashcards from your retrieval misses only; review tomorrow.
- [ ] **I3.** Timed drill: 10 scenarios below in ≤20 minutes (answers after).

---

## Scenario / decision exercises (exam-style mixed)

For each, pick the **best** primary answer and give a one-line why. Time yourself.

**S1.** Exact payroll tax withholding.  
- [ ] A) LLM  
- [ ] B) Deterministic rules engine  
- [ ] C) Clustering  

**S2.** Weekly-changing HR policy Q&A.  
- [ ] A) Fine-tune monthly  
- [ ] B) RAG + grounding  
- [ ] C) Unsupervised only  

**S3.** Compare two Bedrock FMs for summarization before launch.  
- [ ] A) Model Evaluation + business KPI  
- [ ] B) Marketing blog  
- [ ] C) Only Inspector  

**S4.** Agent must call internal CMDB; credentials?  
- [ ] A) Embed in system prompt  
- [ ] B) Secrets Manager + IAM  
- [ ] C) Put in vector DB text  

**S5.** Need AWS SOC2 report for customer questionnaire.  
- [ ] A) Artifact  
- [ ] B) Transcribe  
- [ ] C) Top-p  

**S6.** Developers want AI IDE assistance.  
- [ ] A) Kiro  
- [ ] B) Amazon Macie  
- [ ] C) Neptune only  

**S7.** Imbalanced fraud model; stakeholders celebrate 99.5% accuracy.  
- [ ] A) Ship immediately  
- [ ] B) Demand recall/precision/F1 + $ prevented  
- [ ] C) Switch to diffusion  

**S8.** Public ChatGPT for drafting confidential M&A memo.  
- [ ] A) Scope 1: high leakage risk; use enterprise controls instead  
- [ ] B) Perfectly fine always  
- [ ] C) Same as Scope 5  

**S9.** Need student model cheaper than teacher for high QPS summarization.  
- [ ] A) Distillation  
- [ ] B) Paste larger contexts  
- [ ] C) Disable Guardrails  

**S10.** Output format must be strict JSON; facts already retrieved.  
- [ ] A) Few-shot/template (+ optional fine-tune if still failing)  
- [ ] B) Clustering  
- [ ] C) Artifact  

**S11.** Hallucinated citations in RAG answers.  
- [ ] A) Grounding checks + citation UX + eval faithfulness  
- [ ] B) Higher temperature  
- [ ] C) Remove IAM  

**S12.** Track whether S3 KB source buckets stay encrypted.  
- [ ] A) AWS Config  
- [ ] B) Polly  
- [ ] C) BLEU  

---

## Hands-on lab: exam readiness simulation

### Option A: Console circuit (60-90 min)

Run a mini "day in the life" without building anything production-grade. If you've been doing the build, most of this is just revisiting [B1](../../build.md#b1) (playground), [B2](../../build.md#b2) (Knowledge Base), and [B3](../../build.md#b3) (Guardrails) with exam eyes on:

- [ ] Bedrock playground: factual Q at low temp  
- [ ] Guardrails test window: blocked topic or PII mask demo  
- [ ] Knowledge Bases overview / sample retrieve  
- [ ] Prompt Management: one versioned prompt  
- [ ] Skim Model Evaluation docs  
- [ ] Note CloudTrail event history filter for `bedrock` if enabled  
- [ ] Re-read scoping matrix page  

### Option B: Paper war-room

- [ ] On one whiteboard/page: draw the Domain weights pie; list the top 10 "which service?" mappings; list the customization ladder; list Scopes 1-5. Take a photo of it for spaced review.

### Build checkpoint

- [ ] [B1](../../build.md#b1) done: same questions across models and temperatures, notes on what changed
- [ ] [B2](../../build.md#b2) done: a Knowledge Base over ~20 posts, citations checked against what I actually wrote
- [ ] [B3](../../build.md#b3) done: Guardrail in front of it, prompt injection attempts logged (what got through, what didn't)
- [ ] Short write-up of what I learned. That's a blog post, honestly.

### Official practice path

- [ ] Complete AWS Skill Builder **Exam Prep Plan: AWS Certified AI Practitioner** modules you haven’t finished  
- [ ] Take official practice question set / pretest  
- [ ] Take full official practice exam under timed conditions  
- [ ] Score ________% · Date ________  
- [ ] Retake weak domains only · Score ________% · Date ________  

**Gate:** Schedule Pearson VUE / online proctoring when practice exams are **consistently ≥80%** ([cert overview](../README.md)).

---

## Common misconceptions / exam traps (the cross-domain greatest hits)

| # | Trap | Reflex |
|---|---|---|
| 1 | Fine-tune for fresh docs | RAG |
| 2 | GenAI for exact calculation | Rules |
| 3 | Accuracy on rare events | Recall/precision |
| 4 | Biggest FM always | Cost/latency/compliance |
| 5 | Quick = Bedrock | Persona split |
| 6 | MCP = model | Protocol |
| 7 | Prompts alone stop attacks | Guardrails + IAM |
| 8 | Artifact = who called API | CloudTrail |
| 9 | Scope 1 for secrets | Don't |
| 10 | Eval only BLEU for chat | HITL + task KPIs |
| 11 | Ignore business metrics | Pair model + business |
| 12 | LLM as ACL | Filter before context |

---

## Reflection / teach it back

Give yourself a **10-minute oral exam**, to a peer or into a voice memo:

1. Domain weights and study priority.  
2. One end-to-end Contoso-style design.  
3. Customization ladder + eval metrics.  
4. Guardrails + scoping matrix.  
5. Your three personal weak spots and how you’ll drill them this week.

---

## Mastery / readiness checklist

### Content mastery

- [ ] Mixed retrieval ≥15/18 (or remediated to that after review)
- [ ] Scenarios S1-S12 ≥10/12 on first timed pass
- [ ] Can teach Contoso-style design without notes
- [ ] Punch list Domains 1-5 items checked ([PUNCH-LIST.md](../PUNCH-LIST.md))

### Exam mechanics readiness

- [ ] Read the official exam guide end to end once  
- [ ] Know formats: multiple choice/response, ordering, matching; 90 minutes; 65 questions; 700/1000 pass  
- [ ] Practice exam ≥80% **more than once** (consistency)  
- [ ] Weak-domain remediation logged  
- [ ] Console familiarity: Bedrock playground, Guardrails, KB concept, Prompt Management  
- [ ] Logistics: account, ID, Pearson VUE/online setup, quiet room  

### Mindset

- [ ] Default to RAG before fine-tune  
- [ ] Pair every model metric with a business metric  
- [ ] Security: least privilege + Guardrails + don't trust the model as an ACL  

**Exit:** Checklist green → schedule exam · Otherwise loop WB02/WB03 retrieval + official practice.

---

## Answer key

<details>
<summary>Retrieval (mixed)</summary>

1. AI broad intelligence tasks; ML learns from data; DL multi-layer NNs; GenAI creates content; agentic plans/tools/memory.  
2. Recall (catch fraud); still monitor precision/cost of false positives.  
3. Amazon Transcribe.  
4. Tokens: bill/context; embeddings: similarity/retrieval.  
5. Not a foundation model; a protocol for tools/context.  
6. Amazon Quick.  
7. Ingest-chunk-embed-index-retrieve-generate-cite.  
8. Prompt → RAG → fine-tune → continued PT → scratch (agents when tools/multi-step).  
9. Higher creative; lower extraction/factual.  
10. ROUGE summaries overlap; BLEU MT precision n-grams; BERTScore semantic; LLM-judge rubric scoring.  
11. Content, denied topics, word, PII/sensitive, grounding, prompt attack, Automated Reasoning…  
12. Intended use, risk rating, metrics/evals, caveats…  
13. Jailbreak: bypass safety; injection: injected instructions override (user or retrieved).  
14. CloudTrail = API who/when; Artifact = compliance reports.  
15. 3: your app + pre-trained FM API; 4: you fine-tune provider FM with your data.  
16. Bedrock.  
17. Distill: compress teacher→student; CPT: more unlabeled domain text into model.  
18. Need deterministic exact outcomes / no viable data / cost>benefit / pure rules required.

</details>

<details>
<summary>Guided</summary>

**G1.** RAG/KB | few-shot/Prompt Management | agent tool | groundedness + CSAT/$ | Scope 3.  
**G2.** Supervised regression/classification on sensors | SageMaker | only if docs assistant sidecar | accuracy-only on rare failures.  
**G3.** Diffusion/image FM | IP/brand/safety | Guardrails + human review | Bedrock image models (or similar managed FM).

</details>

<details>
<summary>Scenarios</summary>

**S1** B · **S2** B · **S3** A · **S4** B · **S5** A · **S6** A · **S7** B · **S8** A · **S9** A · **S10** A · **S11** A · **S12** A

</details>
