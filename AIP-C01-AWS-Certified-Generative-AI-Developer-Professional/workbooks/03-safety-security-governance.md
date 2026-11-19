---
layout: default
title: "Workbook 03: Safety, Security, and Governance"
---

# Workbook 03: Safety, Security, and Governance

**Domain 3 (20%)** · Topics [12](../topics/12-input-output-safety-controls.md)-[15](../topics/15-responsible-ai-principles.md)  
**Pack:** [Workbooks home](./README.md) · [Punch list](../PUNCH-LIST.md) · [Cert README](../README.md)

Time to wrap the Policy Copilot in **Guardrails**, privacy controls, governance and lineage, and Responsible AI practices. Exam scenarios punish "the model will be careful" designs, and so does production. **Hoping isn't a control.**

---

## 1. Learning objectives

By the end of this workbook you can:

- [ ] Configure Bedrock Guardrails (content filters, denied topics, word/PII filters, contextual grounding, prompt-attack) on Converse, Agents, KB, and Flows.
- [ ] Explain why **user-input tagging** matters for prompt-attack filters on InvokeModel paths.
- [ ] Design defense-in-depth: Comprehend → Guardrails → Lambda schema checks → API filters.
- [ ] Apply VPC endpoints, Lake Formation, Macie/Comprehend PII, masking, and retention for GenAI data paths.
- [ ] Produce model cards, lineage (Glue Catalog), CloudTrail evidence, and bias/drift monitoring hooks.
- [ ] Operationalize transparency (traces), fairness sampling, LLM-as-judge with documented bias risk, and policy-as-Guardrail.

---

## 2. Prerequisites + time

| Item | Expectation |
| --- | --- |
| Prior | Working Converse and/or RAG path from [Workbook 01](./01-fm-integration-data-and-rag.md) |
| Ideal | Agent path from [Workbook 02](./02-agents-and-enterprise-integration.md) to harden |
| Time | **8-12 hours** (weeks 6-7) |
| Artifacts | Guardrail ARN attached everywhere inference runs + privacy ADR addendum |

---

## 3. Activate prior knowledge

1. Name three Guardrails controls beyond “block hate speech.”  
2. Why is a system prompt alone insufficient for jailbreak defense?  
3. What is contextual grounding checking against?  
4. Where does Bedrock inference traffic need to stay for strict private networking?  
5. What belongs in a **model card** for an FM-powered app (not just the base FM)?

<details>
<summary>Quick self-check</summary>

1. Denied topics, PII mask/block, word filters, grounding, prompt-attack, topic detection.  
2. Models can be coerced; need filters, tagging, monitoring, adversarial tests.  
3. Retrieved/source context vs model claims.  
4. VPC interface endpoints to Bedrock (and related) without public egress where required.  
5. Intended use, limitations, eval metrics, data sources, safety controls, owners, update cadence.

</details>

---

## 4. Concept refresh (link topics)

- [ ] [12: Input/output safety controls](../topics/12-input-output-safety-controls.md): Guardrails; grounding; jailbreak  
- [ ] [13: Data security and privacy](../topics/13-data-security-and-privacy.md): VPC; Lake Formation; PII; retention  
- [ ] [14: AI governance and compliance](../topics/14-ai-governance-and-compliance.md): model cards; lineage; CloudTrail; drift  
- [ ] [15: Responsible AI principles](../topics/15-responsible-ai-principles.md): transparency; fairness; judge; policy enforcement  

**Synthesis:** List every inference entrypoint in your copilot (UI, batch, agent tool, Flow). For each, note Guardrail attachment + logging destination.

---

## 5. Closed-book retrieval

### A. Short answer

1. Which Bedrock surfaces should share the same Guardrail policy in a consistent app?  
2. Prompt-attack filter nuance for InvokeModel: what must you do with user inputs?  
3. Are tool results covered the same way by prompt-attack filters?  
4. Name a Guardrails unsupported modality/use that trips candidates.  
5. Defense-in-depth chain for toxic input (4 layers).  
6. How do VPC endpoints change the Bedrock shared-responsibility story for networking?  
7. Macie vs Comprehend for PII in a RAG corpus: when each?  
8. Why retain model invocation logs carefully (and when not to log raw prompts)?  
9. Glue Catalog’s governance role for RAG sources?  
10. Fairness eval trap when you only report aggregate accuracy?

### B. Scenario micro-prompts

11. HR bot must never invent a termination policy clause. Which Guardrail feature + RAG design?  
12. User uploads a doc containing SSN into the corpus bucket. Controls?  
13. Regulator asks “who changed the system prompt on 12 March?” Evidence trail?  
14. Same model judges its own outputs in CI. Risk and mitigation?

### C. True / false

15. Enabling Guardrails on the embedding model path is a best practice.  
16. Policy PDFs in SharePoint alone satisfy Responsible AI enforcement.  
17. CloudTrail + invocation logging together support audit investigations.

---

## 6. Worked → guided → independent

### Worked example: Guardrail for Policy Copilot

| Control | Setting | Rationale |
| --- | --- | --- |
| Content filters | Hate/insults/violence medium-high | Employee UX + brand |
| Denied topics | Medical diagnosis, legal advice as counsel | Out of scope |
| PII | Block/mask SSN, credit card on I/O | Privacy |
| Prompt attack | Enabled; user inputs tagged | Jailbreak resistance |
| Grounding | On for RAG answers | Reduce hallucinations |
| Tier | Standard where prompt-attack/code protections needed | Higher assurance |

Attach it via `guardrailConfig` on Converse, KB RetrieveAndGenerate, Agent, and Flow prompt nodes. Then watch blocked-input rate and false positives weekly; a Guardrail nobody monitors drifts into either useless or annoying.

### Guided practice

- [ ] Create Guardrail version; attach to Converse  
- [ ] Send a jailbreak pack (10 prompts); record Block vs None  
- [ ] Enable contextual grounding on RAG; log grounding scores  
- [ ] Add Comprehend PII pre-check before KB ingest  
- [ ] Restrict Bedrock to VPC endpoint; deny public route in test SG/NACL notes  
- [ ] Draft a one-page model card for the copilot application  

### Independent practice

Fully on your own now:

- [ ] Lambda post-validator: JSON schema / citation required / refuse if no retrieve hits  
- [ ] Macie job on corpus bucket; quarantine findings  
- [ ] CloudTrail Lake query for Guardrail/policy changes  
- [ ] Fairness sample: slice golden set by user segment; compare refusal/quality rates  
- [ ] Automate red-team suite in CI (fail deploy if jailbreak success &gt; 0)

---

## 7. Architecture defense scenarios

### Scenario D3-1: “Safety in the prompt”

Exec asks to skip Guardrails to reduce latency/cost; system prompt says “follow company policy.”

Defend keeping Guardrails; quantify latency tradeoff vs risk.

### Scenario D3-2: Multi-tenant leakage

Retrieve returns another tenant’s policy chunk; answer cites it.

Defend metadata filters, tool-layer ACL, logging, and incident response.

### Scenario D3-3: Private network mandate

Bank requires no public internet for inference.

Defend VPC endpoints, PrivateLink patterns, logging sinks, and break-glass.

### Scenario D3-4: Governance theater

Team has a Responsible AI slide deck but no lineage, no model card owner, no eval gates.

Defend a minimal viable governance operating model.

---

## 8. Hands-on production-shaped labs

### Lab A: Guardrails everywhere (topic 12)

The grown-up version of [B3](../../build.md#b3). All three labs here roll up into [B11](../../build.md#b11).

- [ ] One Guardrail ARN reused across Converse, Flow, Agent  
- [ ] Prompt-attack + input tagging verified on InvokeModel test path  
- [ ] Grounding scores dashboard (even a Logs Insights query)  
- [ ] Adversarial suite checked into repo  

### Lab B: Privacy hard path (topic 13)

- [ ] Corpus bucket: SSE-KMS, block public, Macie  
- [ ] Mask PII in invocation logs  
- [ ] Retention: S3 lifecycle on logs; KB sync deletes propagate  
- [ ] Lake Formation (or IAM ABAC) notes for who can sync/retrieve  

### Lab C: Governance + RAI (topics 14-15)

- [ ] Model card in repo + owner  
- [ ] Lineage fields: source URI, transform version, embedding model ID, prompt version  
- [ ] Bias/fairness sample report  
- [ ] LLM-as-judge job with separate judge model when possible; document residual bias  

---

## 9. Misconceptions / traps

- [ ] Guardrails on embeddings/image-gen/rerank (unsupported)  
- [ ] No user-input tags → injection slips through  
- [ ] Grounding without retrieved context  
- [ ] Safety via system prompt only  
- [ ] Logging secrets/PII in plaintext  
- [ ] Expecting invocation logs from non-runtime endpoints  
- [ ] Fairness only as aggregate accuracy  
- [ ] Policy document without enforcement in the inference path  
- [ ] Same model as generator and judge with no mitigation notes  
- [ ] Ignoring false-positive Guardrail cost (UX + support load)  

---

## 10. Reflection

1. Which safety control would fail first under a motivated insider threat?  
2. What PII still flows through your system “for debugging”?  
3. Who is the human owner of the model card when the prompt changes?

---

## 11. Mastery checklist

- [ ] Guardrail attached on every production inference path  
- [ ] Can explain prompt-attack tagging without notes  
- [ ] Privacy ADR addendum (VPC, KMS, retention, PII)  
- [ ] Model card + lineage fields exist  
- [ ] Red-team CI or scheduled job exists  
- [ ] Closed-book ≥80%  

**Next:** [Workbook 04: Optimize, monitor, evaluate, troubleshoot](./04-optimize-monitor-evaluate-troubleshoot.md)

---

## 12. Answer key

### Short answer

1. Converse/ConverseStream, Agents, Knowledge Bases RetrieveAndGenerate, Prompt Flow nodes. Consistency matters.  
2. **Tag user inputs** so prompt-attack filters evaluate them.  
3. **No**: tool results/tool specs are not evaluated the same way; validate tools separately.  
4. Applying Guardrails to embeddings / image generation / rerank models (unsupported).  
5. Comprehend toxicity/PII → Guardrails → Lambda business/schema checks → API Gateway response filters.  
6. Traffic stays on AWS private network via interface endpoints; still manage IAM, encryption, logging.  
7. Macie: discovery/classification at rest in S3; Comprehend: NLP PII detection in text pipelines/realtime.  
8. Forensics and quality debug; avoid raw logs when prompts contain secrets/PII; mask or sample.  
9. Catalog sources, ownership, schemas, DQ; lineage for audits.  
10. Hides subgroup harm/refusal disparities.

### Micro-prompts

11. Contextual grounding + require citations + retrieve-or-abstain; denied topic for invented legal counsel as needed.  
12. Macie/Comprehend detection; block ingest; Guardrails PII on I/O; bucket policies; quarantine.  
13. Prompt Management versions + CloudTrail + CI commit SHA + change ticket.  
14. Self-preference bias; use different judge model, human spot checks, multiple metrics.

### True / false

15. **False**  
16. **False**: enforce via Guardrails/code/IAM in the path  
17. **True**

### Architecture defense (rubric)

**D3-1:** Keep Guardrails; measure added latency; risk of unauditable harm &gt; small TTFT gain; use tier tuning not removal.  
**D3-2:** Mandatory metadata filters + tool ACL; dual enforcement; audit logs; rotate/reindex if needed; customer notification process.  
**D3-3:** Bedrock VPC endpoints; private subnets; private log sinks; controlled CI egress.  
**D3-4:** Owner, model card, lineage fields, eval gate, quarterly RAI review. That's minimum viable ops.

### Lab self-grade

Pass if a jailbreak is blocked, a PII string is masked/blocked, and the model card names an owner.
