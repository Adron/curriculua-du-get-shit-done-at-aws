---
layout: default
title: "Workbook 05 — Capstone: end-to-end pipeline"
---

# Workbook 05 — Capstone: end-to-end ML or RAG pipeline

**All domains** · Integrates topics [01](../topics/01-data-collection-and-storage.md)–[12](../topics/12-securing-ml-ai-workloads.md)

Builder focus: ship a **small but complete** path — **data → train/tune or FM customize → deploy → monitor → secure** — with IaC mindset and ops tradeoffs. This is your readiness gate before the official practice exam (**≥80%**).

Pick **one** track (or a thin hybrid):

| Track | Core path |
|---|---|
| **A — Traditional ML** | S3/Feature Store → SageMaker train/AMT → Registry → endpoint → Model Monitor |
| **B — RAG / FM** | S3 corpus → chunk/embed/KB → Bedrock FM (+ optional agent) → eval → Guardrails → observability |
| **C — Hybrid** | Tabular model for routing + Bedrock RAG/agent for generation |

---

## 1. Learning objectives

By the end of this capstone you can:

- [ ] Design and defend an end-to-end MLA-C02 architecture with concrete AWS services
- [ ] Express the pipeline as stages you could implement with Glue/SageMaker/Bedrock + CI/CD
- [ ] Call out latency, cost, reliability, and security tradeoffs at each stage
- [ ] Include C02 GenAI pieces where relevant (Bedrock, RAG, agents, LLMOps)
- [ ] Self-assess exam readiness and close remaining punch-list gaps

## 2. Prerequisites + time

| Item | Detail |
|---|---|
| Prerequisites | Workbooks 01–04 substantially complete; punch list mostly checked |
| Estimated time | **8–12 hours** (week 8; can span two weekends) |
| Exit criteria | Capstone design + lab/paper done; Skill Builder practice **≥80%** |

## 3. Activate prior knowledge

Without notes, list in order the stages of a production ML **or** RAG pipeline from raw data to secure monitoring. Star (*) stages that are GenAI-specific.

## 4. Concept refresh

Revisit only what your track needs — links, not paste:

| Domain | Topics | Capstone use |
|---|---|---|
| 1 | [01](../topics/01-data-collection-and-storage.md) [02](../topics/02-data-transformation-feature-engineering.md) [03](../topics/03-data-quality-validation-and-bias.md) | Lake, FE/chunking, DQ gates |
| 2 | [04](../topics/04-modeling-approach-selection.md) [05](../topics/05-train-fine-tune-customize-models.md) [06](../topics/06-model-and-system-evaluation.md) | Approach, train/FM, eval gates |
| 3 | [07](../topics/07-deployment-infrastructure.md) [08](../topics/08-resource-provisioning-and-configuration.md) [09](../topics/09-cicd-orchestration-mlops.md) | Deploy, provision, CI/CD |
| 4 | [10](../topics/10-monitoring-inference-and-performance.md) [11](../topics/11-cost-and-performance-optimization.md) [12](../topics/12-securing-ml-ai-workloads.md) | Observe, cost, secure |

## 5. Closed-book retrieval practice

**R1.** For your track, name storage format + vector/feature store choice and why.

**R2.** What is your promote gate (metrics/tests) before production traffic?

**R3.** Inference/API mode and why (real-time / serverless / async / batch / Bedrock on-demand / PT).

**R4.** Three alarms you will page on.

**R5.** Three security controls that must exist on day one.

**R6.** One rollback unit (model package, endpoint config, prompt version, agent alias, KB index).

## 6. Worked → guided → independent practice

### Worked example — Track C mini hybrid (support product)

```text
Data
  · S3 raw tickets (Parquet) + FAQ HTML
  · Glue: clean tickets → Feature Store; FAQ → redact PII → KB sync
  · Glue DQ fail → stop train + stop ingest

Model / FM
  · SageMaker: ticket urgency classifier (script mode + AMT on F1)
  · Bedrock: KB RetrieveAndGenerate + Prompt Management; optional agent for order tools
  · Eval: classifier F1 gate; Bedrock eval + faithfulness sample; prompt tests in CI

Deploy
  · Classifier: real-time endpoint in VPC, autoscaling InvocationsPerInstance
  · FM: Bedrock on-demand + Guardrails; agent alias pinned
  · CodePipeline: build → train/eval → Registry approval → deploy; parallel KB refresh

Operate / secure
  · Model Monitor + empty-retrieval + tool-error alarms
  · Token/$ dashboard; OpenSearch size lifecycle
  · Least-privilege roles; Inspector on ECR; KMS; CloudTrail
```

**Tradeoffs noted:** Classifier stays classic ML (cheaper/interpretable routing); knowledge stays RAG (weekly churn); no full FM fine-tune until style metrics demand it.

### Guided practice — fill your architecture canvas

Copy and complete:

1. **Problem / users / SLO:** ______  
2. **Track (A/B/C):** ______  
3. **Data plane:** sources → transforms → DQ → features/vectors ______  
4. **Model plane:** train or FM customize + eval ______  
5. **Deploy plane:** targets + IaC tool ______  
6. **Ops plane:** metrics, cost, security ______  
7. **Top risk + mitigation:** ______  

### Independent practice — deliverables (required)

Produce all four:

- [ ] **Architecture diagram** (boxes/arrows; services labeled)
- [ ] **Pipeline stages** as a numbered runbook (including CI/CD and rollback)
- [ ] **Tradeoff memo** (½ page): latency vs cost vs quality vs security — three decisions you made
- [ ] **Gap list**: punch-list items still weak → schedule drills before practice exam

## 7. Scenario / decision exercises

Defend decisions under pressure (exam-style):

**S1.** CFO freezes GPU spend. How does your design degrade gracefully for two weeks?

**S2.** Security finds a public S3 model bucket. Immediate and systemic fixes?

**S3.** KB sync succeeds but faithfulness drops 20%. Debug order?

**S4.** Canary shows better AUC but worse business fraud dollars. Ship or not?

**S5.** Product wants an agent that can refund orders. What Guardrails + IAM + monitoring do you demand first?

## 8. Hands-on labs

### Lab — build the thinnest vertical slice

**Track A**

- [ ] Parquet dataset on S3 + one Glue or Processing transform  
- [ ] One training job + Registry entry  
- [ ] One endpoint (or local inference script if account limits)  
- [ ] One CloudWatch alarm + written Monitor plan  

**Track B**

- [ ] S3 docs → Knowledge Base ingest  
- [ ] Prompt Management version + RetrieveAndGenerate path  
- [ ] Guardrail attached; blocked example recorded  
- [ ] Dashboard or written metrics: latency, empty retrieve, tokens  

**Track C**

- [ ] Minimal classifier **or** mock router + one Bedrock RAG call behind the same API sketch  
- [ ] Document how traffic would split and how you’d evaluate both arms  

### Paper architecture fallback

- [ ] Full diagram + IAM role list + EventBridge triggers  
- [ ] Pseudo-CDK/CFN resource names  
- [ ] Tabletop drill: DQ fail, deploy fail, drift alarm, Guardrail spike — who gets paged, what rolls back  

## 9. Misconceptions / traps

- [ ] Capstone that only trains a notebook model (no deploy/monitor/secure)
- [ ] RAG without DQ/PII and refresh automation
- [ ] Fine-tune as default for knowledge
- [ ] No rollback artifact
- [ ] Monitoring only host metrics
- [ ] Security bolted on after “it works”
- [ ] Skipping practice exam because “architecture feels solid”

## 10. Reflection

1. Which domain slowed you down in the capstone?
2. What would you automate first if this went to a real team repo tomorrow?
3. Are you **≥80%** on practice exams? If not, which workbook do you revisit?

## 11. Mastery checklist — exam readiness

- [ ] End-to-end design complete for Track A, B, or C
- [ ] Can explain every service choice in one sentence
- [ ] IaC + rollback + DQ/eval gates included
- [ ] GenAI C02 topics covered if Track B/C (KB, prompts, agents, Guardrails, LLMOps)
- [ ] Punch list Domains 1–4 reviewed; weak items drilled
- [ ] Official Skill Builder practice exam **≥80%** on two attempts (or rising trend to ≥80%)
- [ ] Schedule exam only after the above

## 12. Answer key

**Activate (sample ML):** collect → validate/transform → train/tune → evaluate → register → deploy → monitor → retrain. **GenAI *:** embed/chunk, KB sync, prompt version, Guardrails, FM/agent eval, token cost.

**Retrieval (rubric — answers vary by track)**

**R1.** Must justify Parquet/Feature Store and/or OpenSearch/pgvector/S3 vectors vs access pattern.  
**R2.** Numeric/task thresholds + automated tests; GenAI adds prompt/eval/faithfulness gates.  
**R3.** Must match latency/payload/TPS (not default real-time).  
**R4.** Mix infra + quality + GenAI (e.g., 5xx, p99, drift, empty retrieve, tool errors, $ tokens).  
**R5.** Least privilege, encryption, network isolation, secrets, Guardrails/CI scan as applicable.  
**R6.** Named prior artifact you can re-point traffic to.

**Guided:** Any complete canvas that ties Domains 1–4 without hand-wavy “use SageMaker” is acceptable; review against worked hybrid.

**Scenarios**

**S1.** Prefer Bedrock on-demand / smaller FM / more caching / CPU models / batch deferral; pause PT/GPU HPO; keep RAG quality via retrieval not larger models.  
**S2.** Block public access immediately; KMS; bucket policies; Config rule; CloudTrail; pipeline prevent; rotate credentials if exposed.  
**S3.** Chunking/metadata/filters → embedding mismatch → top-k/rerank → stale docs → prompt regression → model change.  
**S4.** Do not ship on AUC alone — business metric wins; investigate threshold/calibration/segment harm.  
**S5.** Least-privilege refund tool; human approval over amount X; Guardrails for policy; full audit trail; tool-error + fraud alarms; rate limits.

**Independent deliverables:** Use the mastery checklist as the grading rubric; revisit workbooks 01–04 for any blank domain in your diagram.
