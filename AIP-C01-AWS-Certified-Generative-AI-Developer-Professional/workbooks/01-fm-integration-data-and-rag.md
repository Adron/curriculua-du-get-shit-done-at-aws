---
layout: default
title: "Workbook 01 — FM Integration, Data, and RAG"
---

# Workbook 01 — FM Integration, Data, and RAG

**Domain 1 (31%)** · Topics [01](../topics/01-genai-solution-design-and-requirements.md)–[06](../topics/06-prompt-engineering-and-governance.md)  
**Pack:** [Workbooks home](./README.md) · [Punch list](../PUNCH-LIST.md) · [Cert README](../README.md)

This workbook builds the highest-weight domain: turn a business problem into a defendable Bedrock + RAG system with governed prompts—before agents and enterprise wiring.

---

## 1. Learning objectives

By the end of this workbook you can:

- [ ] Capture non-functional requirements (latency, residency, agency, audit, cost) and map them to a GenAI architecture using the Well-Architected Generative AI Lens.
- [ ] Select and switch FMs via Converse + AppConfig/inference profiles; explain Geographic vs Global cross-Region inference and Provisioned Throughput limits.
- [ ] Design data quality gates (Glue DQ) and multimodal preprocessing before Knowledge Base sync.
- [ ] Choose a vector store (Bedrock KB / OpenSearch / Aurora pgvector / DynamoDB vectors) and defend metadata ACL + incremental refresh.
- [ ] Configure chunking, hybrid search, reranking, and MCP-style retrieval tools for production RAG.
- [ ] Version prompts in Prompt Management, attach Guardrails in the prompt path, and set approval/regression gates.

---

## 2. Prerequisites + time

| Item | Expectation |
| --- | --- |
| Background | Comfortable with IAM, S3, Lambda, API Gateway; Bedrock model access enabled |
| Prior certs | AIF-C01 vocabulary helpful; not required |
| AWS access | Account with Bedrock, OpenSearch Serverless or Aurora option, Glue |
| Time | **12–18 hours** across weeks 1–3 (or one intensive weekend + follow-ups) |
| Artifacts | One ADR + working RetrieveAndGenerate (or Retrieve + Converse) path |

---

## 3. Activate prior knowledge

Answer briefly **before** opening topic notes (2–3 sentences each):

1. When would you choose **RAG** over fine-tuning for an internal policy Q&A bot?
2. What is the difference between **semantic** search and **hybrid** search?
3. Why might a playground Converse success still be unsafe for production?
4. Name three non-functional requirements that should appear in a GenAI ADR.
5. What breaks if you change the embedding model but keep the same vector index?

<details>
<summary>Quick self-check (not the full answer key)</summary>

1. Policies change often; RAG updates corpus without retraining; fine-tune is for style/task specialization with stable data.  
2. Semantic = vectors/similarity; hybrid = keyword (BM25) + vectors.  
3. Missing Guardrails, logging, eval gates, IAM, residency, cost controls.  
4. e.g. p95 latency, data residency, token budget, HITL for irreversible actions, auditability.  
5. Embedding space mismatch → garbage retrieval until full re-embed/reindex.

</details>

---

## 4. Concept refresh (link topics)

Read in order; mark complete after Research links + one hands-on idea from each note:

- [ ] [01 — GenAI solution design and requirements](../topics/01-genai-solution-design-and-requirements.md) — GenAI Lens lifecycle; PoC before scale  
- [ ] [02 — FM selection and configuration](../topics/02-fm-selection-and-configuration.md) — selection rubric; cross-Region; LoRA/registry  
- [ ] [03 — Data validation and processing for FMs](../topics/03-data-validation-and-processing-for-fms.md) — Glue DQ; Converse formatting; enrichment  
- [ ] [04 — Vector store solutions](../topics/04-vector-store-solutions.md) — KB backends; metadata; incremental sync  
- [ ] [05 — Retrieval mechanisms and RAG](../topics/05-retrieval-mechanisms-and-rag.md) — chunking; hybrid; rerank; MCP retrieval  
- [ ] [06 — Prompt engineering and governance](../topics/06-prompt-engineering-and-governance.md) — Prompt Management; Flows; CoT; approvals  

**Synthesis prompt (write ½ page):** For the Policy Copilot, which vector store and chunking strategy do you pick, and what residency/inference profile constraints apply?

---

## 5. Closed-book retrieval

No notes. Write answers, then check the [answer key](#12-answer-key).

### A. Short answer

1. List six Generative AI Lens–aligned concerns you would review before promoting a PoC.  
2. Why prefer **Converse** over model-specific `InvokeModel` bodies for most apps?  
3. Do Bedrock **inference profiles** support Provisioned Throughput? Implication?  
4. Glue Data Quality’s role *before* KB sync?  
5. When is **Aurora pgvector** preferable to OpenSearch for RAG?  
6. Managed KB default search mode (semantic-only vs hybrid)?  
7. Hierarchical chunking: why might you get fewer results than `numberOfResults`?  
8. Where should prompt versions and approvals live for production?

### B. Fill the blank

9. Geographic cross-Region inference prioritizes __________; Global profiles often trade that for __________ (~10% cost per docs when allowed).  
10. Never mix __________ models in one vector index without migration.  
11. Custom Bedrock models typically require __________ to invoke.  
12. Expose retrieval as __________ / MCP tools so agents and apps share one ACL-aware access pattern.

### C. True / false (correct the false)

13. DynamoDB native vectors are ideal when you need full hybrid BM25+vector without OpenSearch.  
14. Prompt Management + regression tests can gate prompt promotion.  
15. Skipping DQ on the corpus is fine if the system prompt says “only use reliable sources.”

---

## 6. Worked → guided → independent

### Worked example — Policy Q&A ADR (annotated)

**Problem:** Employees ask HR/security policy questions. Answers must cite sources; EU residency; p95 &lt; 4s; no irreversible tools in v1.

**Decision path:**

| Constraint | Option rejected | Option chosen | Why |
| --- | --- | --- | --- |
| Fresh policies | Fine-tune weekly | RAG on S3 → Bedrock KB | Corpus churn; citations |
| Residency | Global inference | Geographic (EU) profile | Data residency |
| Latency | Top-50 chunks + large model always | Hybrid retrieve top-k + rerank + mid-tier FM | Cost + p95 |
| Safety (v1) | Agent with write tools | RetrieveAndGenerate + Guardrails grounding | Controlled autonomy |

**Failure modes:** stale index after S3 updates; embedding model swap without reindex; prompt injection via uploaded docs; throttle storms at month-end.

**Cost envelope:** on-demand Converse + KB embeddings; no Provisioned Throughput until steady QPS; prompt caching on large system prompt if model supports it.

### Guided practice

Complete with your account (checkboxes):

- [ ] Write the ADR table above for *your* corpus (replace HR with your domain).  
- [ ] Enable two Bedrock models; call both via **Converse** with the same message shape.  
- [ ] Create an S3 prefix with 10–20 docs; add `tenant_id` / `acl` metadata.  
- [ ] Stand up a Knowledge Base; sync; call `Retrieve` with a metadata filter.  
- [ ] A/B default vs fixed-size+overlap chunking on 20 golden questions (manual score is OK).  
- [ ] Store the winning system prompt in **Prompt Management**; note version ID in the ADR.

**Scaffold questions while you build:**

1. If Legal requires citations, which API/response fields will you surface in the UI?  
2. If a tenant must never see another tenant’s chunks, where is the filter enforced—KB query, tool layer, or both?  
3. If QPS is spiky, why is Provisioned Throughput a poor first move?

### Independent practice

Without scaffolding, design and partially implement:

- [ ] AppConfig (or SSM Parameter) driven `modelId` / inference profile resolver in Lambda.  
- [ ] Glue DQ ruleset that quarantines empty/corrupt objects before sync.  
- [ ] Hybrid retrieve + reranker; log pre/post-rerank document IDs.  
- [ ] Prompt variant A/B with a 30-item golden set; record faithfulness/cost per query.  
- [ ] One-page GenAI Lens gap list (observability, secure boundaries, resource efficiency).

---

## 7. Architecture defense scenarios

For each scenario, pick an approach and defend **security, cost, and reliability** (bullet ADR). Suggested answers in the [answer key](#12-answer-key).

### Scenario D1 — Multi-region capacity

Sales wants “always available” GenAI. Compliance requires US data residency. Peak is 2 hours/day.

Defend: inference profile choice, fallback when the primary region throttles, and whether Provisioned Throughput belongs in the design.

### Scenario D2 — Vector store bake-off

Team debates OpenSearch Serverless vs Aurora pgvector vs DynamoDB vectors for product FAQ + order metadata joins.

Defend: store choice, hybrid needs, tenancy filters, and incremental refresh.

### Scenario D3 — “Just fine-tune it”

Stakeholder sees wrong answers and demands fine-tuning tomorrow. Corpus is messy PDFs; no DQ; no eval set.

Defend: whether you fine-tune, what you fix first, and how you prove improvement.

### Scenario D4 — Embedding upgrade

Vendor recommends a new embedding model with different dimensions. Prod KB serves three apps.

Defend: migration plan, dual-running, and rollback.

---

## 8. Hands-on production-shaped labs

### Lab A — PoC → production path (topics 01–02)

- [ ] Bedrock playground / Converse for 15 representative prompts  
- [ ] Measure: subjective quality, input/output tokens, latency  
- [ ] Promote to API Gateway + Lambda using Converse + inference profile ARN  
- [ ] AppConfig flag for model tier (cheap vs capable)  
- [ ] Document GenAI Lens gaps before calling it “prod”

### Lab B — Governed corpus → KB (topics 03–04)

- [ ] S3 inventory of source docs; Glue Catalog table  
- [ ] Glue Data Quality rules (completeness, freshness, schema)  
- [ ] KB data source with metadata attributes for ACL  
- [ ] EventBridge/S3 notification → incremental ingestion path (even if stubbed)  
- [ ] Prove a filtered retrieve cannot return another tenant’s chunk

### Lab C — RAG quality loop (topics 05–06)

- [ ] Compare chunking strategies on the same corpus  
- [ ] Enable hybrid + managed/custom reranker; capture logs  
- [ ] Wire Prompt Management; attach Guardrail config on Converse  
- [ ] Add contextual grounding check; log scores  
- [ ] MCP or Lambda “retrieve” tool wrapper with parameter validation  

**Lab exit:** screenshot or notes showing Retrieve hits → grounded answer → prompt version ID → guardrail trace.

---

## 9. Misconceptions / traps

- [ ] I can name and avoid: fine-tune-first when RAG + prompts suffice  
- [ ] Global inference ≠ residency-safe  
- [ ] Inference profiles ≠ Provisioned Throughput  
- [ ] Playground success ≠ production readiness  
- [ ] Semantic-only assumption on managed KB (hybrid is typical default)  
- [ ] Embedding model change without reindex  
- [ ] DynamoDB vectors as a drop-in hybrid search replacement  
- [ ] Hierarchical chunking parent-collapse surprise  
- [ ] Agent retrieval without metadata ACL  
- [ ] “Fix quality in the system prompt” instead of Glue DQ  

Write one exam-style wrong answer you almost fell for: _______________________

---

## 10. Reflection

1. Which Domain 1 skill felt weakest after the labs?  
2. What production risk in *your* ADR is still unmitigated?  
3. If you had one more day, would you spend it on retrieval quality, prompt governance, or cost controls—why?

---

## 11. Mastery checklist

- [ ] Can whiteboard Policy Copilot: S3 → DQ → KB → hybrid retrieve → Converse → Guardrails → logs  
- [ ] Can explain Geographic vs Global vs Provisioned Throughput constraints  
- [ ] Can defend vector store choice with tenancy + hybrid requirements  
- [ ] Can describe chunking/rerank tradeoffs with metrics  
- [ ] Prompt Management version + approval story is clear  
- [ ] Closed-book section ≥80% correct on first or second pass  
- [ ] ADR filed next to this workbook  

**Next:** [Workbook 02 — Agents and enterprise integration](./02-agents-and-enterprise-integration.md) *(or [03 — Safety](./03-safety-security-governance.md) if following punch-list safety-first order)*

---

## 12. Answer key

### Closed-book retrieval

1. Examples: controlled autonomy, observability, resource efficiency, distributed resilience, standardized resource management (prompts/models/permissions), secure interaction boundaries; plus residency, eval gates, HITL where needed.  
2. Portable message schema across models; easier dynamic switching; less provider-specific payload drift.  
3. **No.** Plan retries, degrade to on-demand smaller model, or queue—do not assume PT on the profile.  
4. Fail/quarantine bad rows before embedding/sync; emit DQ metrics; prevent garbage-in retrieval.  
5. When SQL + vector joins / transactional metadata matter more than pure lexical+vector search at OpenSearch scale.  
6. **Hybrid** is the managed KB default (custom configs can differ).  
7. Child hits collapse to parent chunks → fewer unique parents than requested `numberOfResults`.  
8. Bedrock **Prompt Management** (versions, variants) with approval/regression gates—not only git strings in Lambda.

9. data residency / regional control; cost/availability flexibility (Global ~10% savings when compliance allows).  
10. embedding  
11. Provisioned Throughput  
12. function-calling  

13. **False** — DynamoDB vectors shine for low-latency operational data already in DDB; pair with OpenSearch for full hybrid/full-text.  
14. **True**  
15. **False** — prompts cannot fix a polluted corpus; use DQ + curation.

### Architecture defense (rubric)

**D1:** Prefer **US Geographic** inference profiles; fallback = retry/backoff → secondary US region in the geographic set → degrade model tier or queue. Avoid Global. PT only if steady load justifies MUs—not for 2-hour spikes (use on-demand + caching + tiering). Security: CloudTrail/SCP for region; Reliability: circuit breaker; Cost: on-demand + prompt cache.

**D2:** FAQ + keyword → OpenSearch/KB hybrid; order joins → Aurora pgvector or hybrid architecture; DynamoDB vectors if micro-latency agent memory on existing DDB. Always metadata ACL; incremental sync via S3 events.

**D3:** Refuse fine-tune-first. Fix DQ, chunking, hybrid/rerank, prompts, golden evals. Fine-tune only if evals show systematic style/task gap after RAG is healthy.

**D4:** Dual index or blue/green KB; batch re-embed; switch apps via config; keep old index until faithfulness holds; never mix dims in one index.

### Lab self-grade

Pass if you can demo filtered retrieve, show prompt version ID, and articulate three failure modes from your ADR without notes.
