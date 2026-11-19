---
layout: default
title: "Workbook 04 — Responsible AI, Security, Governance"
---

# Workbook 04 — Responsible AI, Security & Governance

**Covers:** [topics/11](../topics/11-responsible-ai-principles-and-practices.md) · [12](../topics/12-transparency-and-explainability.md) · [13](../topics/13-securing-ai-systems.md) · [14](../topics/14-ai-governance-and-compliance.md)  
**Domains:** 4 (14%) + 5 (14%)  
**Prerequisites:** Workbooks [02](./02-genai-fundamentals.md)–[03](./03-foundation-model-applications.md) (Guardrails/RAG/agents vocabulary).  
**Estimated time:** 3–4 hours  
**Nav:** [Workbooks home](./README.md) · [Punch list](../PUNCH-LIST.md)

---

## Learning objectives

By the end of this workbook you can:

1. Map responsible-AI dimensions (fairness, bias, safety, veracity, etc.) to concrete controls, especially **Bedrock Guardrails** filter types.
2. Choose transparency tools: **Model Cards**, Clarify, Bedrock evaluations, citations; discuss safety vs transparency tradeoffs and human-centered design.
3. Apply security controls: IAM least privilege, encryption/KMS, Macie, PrivateLink, shared responsibility, AgentCore Identity; mitigate prompt injection, leakage, toxicity; ground hallucinations.
4. Select governance services (Config, Inspector, Artifact, CloudTrail, Trusted Advisor) and classify use cases on the **Generative AI Security Scoping Matrix** (Scopes 1–5).
5. Reason about residency, retention, logging, and why erasable PII should not be baked into fine-tunes.

---

## Activate prior knowledge

1. Where have you seen biased or unsafe model outputs in the wild? What control would you want?
2. In AWS shared responsibility, who owns **your** prompts, tool IAM, and S3 training data?
3. Have auditors asked you for CloudTrail or compliance reports (Artifact)? Same need for Bedrock calls?

---

## Concept refresh

| Idea | One-liner | Link |
|---|---|---|
| Guardrails | Content, denied topics, word, PII, prompt attack, grounding, Automated Reasoning | [11](../topics/11-responsible-ai-principles-and-practices.md) |
| Model Cards | Intended use, risk, metrics, caveats — audit doc | [12](../topics/12-transparency-and-explainability.md) |
| Opaque FMs | Compensate with process transparency (cards, cites, HITL) | [12](../topics/12-transparency-and-explainability.md) |
| Secure AI | IAM, encrypt, Macie, PrivateLink, Guardrails, AgentCore Identity | [13](../topics/13-securing-ai-systems.md) |
| Prompt injection | Malicious instructions in user or retrieved content | [13](../topics/13-securing-ai-systems.md) |
| Governance services | Config · Inspector · Artifact · CloudTrail · Trusted Advisor | [14](../topics/14-ai-governance-and-compliance.md) |
| Scoping matrix | 1 consumer → 5 self-trained; higher = more customer ownership | [14](../topics/14-ai-governance-and-compliance.md) |

---

## Retrieval practice (closed-book)

**Responsible AI & transparency**

1. List five responsible-AI dimensions.
2. Name four Guardrails capability types.
3. Contextual grounding checks help with what failure mode?
4. Model Card must capture at least… (three fields).
5. Transparent vs opaque: give one example each.
6. Safety vs transparency tradeoff in one sentence.

**Security**

7. Why can’t you rely on the LLM alone as a row-level ACL?
8. Macie role for AI data lakes?
9. PrivateLink role for Bedrock access patterns?
10. Where should tool credentials live — prompts or Secrets Manager?
11. Guardrails on RetrieveAndGenerate apply to which of: user input, model output, every retrieved chunk?

**Governance**

12. CloudTrail vs Artifact vs Config vs Inspector — one job each.
13. Scope 1 vs Scope 3 vs Scope 5 examples.
14. Why is fine-tuning on PII risky under erasure/retention policies?
15. Name two data governance themes (lifecycle, residency, …).

---

## Worked example → guided → independent

### Worked example — hiring assistant

**App:** Internal chatbot helps screen resumes. Uses Bedrock + RAG over job descriptions. HR worries about bias and leakage of candidate PII into logs.

| Concern | Control |
|---|---|
| Bias | Balanced eval sets; SageMaker Clarify; HITL for final decisions; dataset review |
| Safety/toxicity | Guardrails content filters; denied topics |
| PII | Guardrails sensitive info filters; Macie on S3; minimize PII in fine-tunes; redact logs |
| Transparency | Model Card for intended use (“assist HR, not auto-reject”); UX explanation + escalation |
| Security | IAM least privilege; encrypt KB store; no secrets in prompts |
| Scope | Scope 3 (app calls pre-trained FM via API + your data in RAG) |
| Audit | CloudTrail on invoke; Config on bucket encryption |

---

### Guided practice

**G1.** Auditor needs AWS SOC report PDF → ________. Who invoked Bedrock yesterday → ________. Is the KB bucket still encrypted → ________.

**G2.** Employee pastes source code into a public chatbot → Scope ________ risk theme: ________.

**G3.** Support bot on Claude via Bedrock + company KB → Scope ________.

**G4.** You fine-tune a provider FM on clinical notes → Scope ________; prefer ________ over embedding erasable patient IDs in weights.

**G5.** Users demand “why was I denied?” but model is an opaque LLM → compensate with ________ + ________ + ________.

---

### Independent practice

- [ ] **I1.** Draft a one-page Model Card outline for a fictional RAG bot (purpose, not-intended uses, risk rating, metrics, caveats).
- [ ] **I2.** Threat-model a Bedrock agent with three tools: list prompt injection path, data leakage path, over-privileged tool path — and one control each.
- [ ] **I3.** Classify five real or invented GenAI uses into Scopes 1–5.
- [ ] **I4.** Write a Guardrails config checklist for a consumer-facing chatbot (filters you would enable and why).

---

## Scenario / decision exercises

**S1.** Need to block hate/violence and mask SSN in outputs.  
- [ ] A) Bedrock Guardrails content + sensitive info filters  
- [ ] B) Raise temperature  
- [ ] C) Amazon Translate  

**S2.** Document intended uses and risk for audit.  
- [ ] A) SageMaker Model Cards  
- [ ] B) Amazon Polly  
- [ ] C) Top-k only  

**S3.** Discover PII in S3 corpora feeding a KB.  
- [ ] A) Amazon Macie  
- [ ] B) Amazon Lex intents  
- [ ] C) BLEU  

**S4.** Private connectivity to Bedrock without public internet.  
- [ ] A) AWS PrivateLink patterns  
- [ ] B) Higher top-p  
- [ ] C) QuickSight only  

**S5.** Vulnerability findings on hosts running custom model endpoints.  
- [ ] A) Amazon Inspector  
- [ ] B) Prompt Management  
- [ ] C) Diffusion  

**S6.** Best-practice checks for cost/security quotas across accounts.  
- [ ] A) AWS Trusted Advisor  
- [ ] B) RLHF  
- [ ] C) Chunking  

**S7.** Opaque FM but enterprise Q&A must be trustworthy.  
- [ ] A) Citations + Guardrails grounding + HITL + Model Card  
- [ ] B) Claim full mechanistic interpretability or refuse to ship  
- [ ] C) Delete CloudTrail  

**S8.** “Right to be forgotten” for customers whose data was fine-tuned into weights.  
- [ ] A) Easy delete one row from weights  
- [ ] B) Painful retrain/delete strategy — avoid putting erasable PII in weights; prefer RAG  
- [ ] C) Ignore governance  

---

## Hands-on lab

### Option A — Console

- [ ] **L1.** Bedrock Guardrails: create/test a guardrail in the test window — enable a content filter and a sensitive info filter. ([Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html))
- [ ] **L2.** If available, toggle contextual grounding and test a grounded vs ungrounded answer. ([Grounding check](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html))
- [ ] **L3.** Skim Model Cards console/docs; note risk rating field. ([Model Cards](https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html))
- [ ] **L4.** Confirm CloudTrail is logging (or note how you’d verify Bedrock API calls). Open Artifact home to see report categories. ([Artifact](https://docs.aws.amazon.com/artifact/latest/ug/what-is-artifact.html))
- [ ] **L5.** Read the [Generative AI Security Scoping Matrix](https://aws.amazon.com/ai/security/generative-ai-scoping-matrix/) page; write Scope 1–5 in your own words.

### Option B — Paper

- [ ] Draw shared-responsibility swimlane: AWS vs customer for a Scope 3 Bedrock+RAG app. Place IAM, KMS, Guardrails, Macie, CloudTrail, Model Card on the customer side where appropriate.

---

## Common misconceptions / exam traps

| Trap | Fix |
|---|---|
| Guardrails optional for risky chat | Core control for content/PII/prompt attack/grounding |
| Open weights = explained decisions | Still need cards, evals, UX transparency |
| LLM won’t leak secrets if asked nicely | IAM, DLP, filters, don’t put secrets in context |
| Shared responsibility = AWS owns prompts | You own data, identity, app, tool authZ |
| Scope 1 OK for confidential IP | Public consumer apps are high data-sharing risk |
| Artifact when you need API audit | CloudTrail = who called; Artifact = compliance reports |
| Inspector for encryption drift | Config tracks configuration compliance |
| Fine-tune PII then GDPR-delete easily | Prefer RAG; document retention |

---

## Reflection / teach it back

5–7 minutes to a security-minded peer:

1. Guardrails filter map.  
2. Model Cards + human-centered explainability.  
3. Prompt injection + grounding.  
4. Scoping matrix 1–5 with one example each.  
5. CloudTrail / Artifact / Config / Inspector / Trusted Advisor cheat sheet.

---

## Mastery checklist

- [ ] Lists responsible-AI dims and Guardrails types
- [ ] Writes a Model Card outline from memory
- [ ] Maps IAM/encrypt/Macie/PrivateLink/Guardrails/AgentCore Identity to threats
- [ ] Classifies Scopes 1–5 correctly
- [ ] Picks correct governance service for audit scenarios
- [ ] Retrieval ≥12/15 before answer key
- [ ] Lab or paper done

**Exit:** Mark Domains 4–5 punch items → [Workbook 05 Capstone](./05-capstone-and-exam-ready.md).

---

## Answer key

<details>
<summary>Retrieval</summary>

1. Fairness, bias, inclusivity, robustness/veracity, safety, privacy/security, controllability, governance/transparency, explainability…  
2. Content filters, denied topics, word filters, sensitive info (PII), contextual grounding, prompt attack, Automated Reasoning…  
3. Hallucinations / ungrounded or irrelevant answers in RAG.  
4. Intended uses / not-intended, risk rating, training/eval metrics, ethical caveats…  
5. Transparent: linear/rules; opaque: deep nets/LLMs.  
6. Strong filters may hide detail; interpretable models may underperform — document tradeoffs.  
7. Models don’t enforce your data ACLs; filter before context; IAM on tools/data.  
8. Discover/classify sensitive data in S3 corpora.  
9. Private connectivity to service without public internet exposure.  
10. Secrets Manager (never prompts).  
11. User input and model output — not automatically every retrieved chunk.  
12. CloudTrail: API audit; Artifact: compliance reports; Config: config compliance over time; Inspector: vuln findings on compute.  
13. 1: public ChatGPT-like use; 3: your app + Bedrock API + RAG; 5: you train from scratch.  
14. Hard to erase from weights; may need full retrain/delete — prefer RAG for volatile/PII.  
15. Lifecycle, logging, residency, monitoring, retention…

</details>

<details>
<summary>Guided</summary>

**G1.** Artifact; CloudTrail; Config.  
**G2.** Scope 1; TOS/data leakage/confidentiality.  
**G3.** Scope 3.  
**G4.** Scope 4; RAG.  
**G5.** Citations / Model Card / HITL escalation / UX explanations / Clarify (any solid trio).

</details>

<details>
<summary>Scenarios</summary>

**S1** A · **S2** A · **S3** A · **S4** A · **S5** A · **S6** A · **S7** A · **S8** B

</details>
