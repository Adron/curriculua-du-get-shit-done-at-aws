---
layout: default
title: "Workbook 05 — Capstone: Production GenAI System"
---

# Workbook 05 — Capstone: Production GenAI System

**All domains** · Integrates topics [01](../topics/01-genai-solution-design-and-requirements.md)–[20](../topics/20-troubleshooting-genai-applications.md)  
**Pack:** [Workbooks home](./README.md) · [Punch list](../PUNCH-LIST.md) · [Cert README](../README.md) · [Curriculum index](../../index.md)

Ship (or fully design + stub) a **production-shaped** GenAI vertical slice: RAG + agent + Guardrails + eval harness + cost/latency controls. Then prove **practice-exam readiness ≥80%**.

---

## 1. Learning objectives

By the end of this capstone you can:

- [ ] Deliver an end-to-end Policy/Ops Copilot (or equivalent domain) that you can demo and defend.
- [ ] Produce a complete ADR covering security, cost, reliability, and agency boundaries.
- [ ] Show eval evidence (RAG + agent) wired to a promotion gate.
- [ ] Walk a failure drill using your troubleshooting runbook.
- [ ] Score ≥80% on official/practice exams and explain every miss mapped to a topic note.

---

## 2. Prerequisites + time

| Item | Expectation |
| --- | --- |
| Prior | Workbooks [01](./01-fm-integration-data-and-rag.md)–[04](./04-optimize-monitor-evaluate-troubleshoot.md) substantially complete |
| Time | **12–20 hours** (week 10 + buffer) |
| Mode | Build in AWS **or** architecture-complete with stubs if account limits block AgentCore—document gaps honestly |
| Exit | Demo script + ADR + practice exam ≥80% |

---

## 3. Activate prior knowledge

Before building, dump from memory (timer: 25 minutes):

1. Whiteboard the full architecture (boxes and arrows).  
2. List top 5 exam traps across Domains 1–5.  
3. Write the difference: AgentCore vs Strands vs Agent Squad.  
4. State Geographic vs Global vs Provisioned Throughput rules.  
5. Name your faithfulness gate threshold and why.

If any item is fuzzy, revisit the linked topic before Lab day.

---

## 4. Concept refresh (link topics)

Skim for gaps only—do not re-read everything:

| Capstone slice | Topics |
| --- | --- |
| Design + FM | [01](../topics/01-genai-solution-design-and-requirements.md), [02](../topics/02-fm-selection-and-configuration.md) |
| Data + vectors + RAG + prompts | [03](../topics/03-data-validation-and-processing-for-fms.md)–[06](../topics/06-prompt-engineering-and-governance.md) |
| Agents + integration | [07](../topics/07-agentic-ai-and-tool-integrations.md)–[11](../topics/11-application-integration-patterns.md) |
| Safety + governance | [12](../topics/12-input-output-safety-controls.md)–[15](../topics/15-responsible-ai-principles.md) |
| Cost/perf/monitor/eval/debug | [16](../topics/16-cost-optimization-and-resource-efficiency.md)–[20](../topics/20-troubleshooting-genai-applications.md) |

**Punch list sweep:** mark remaining `[ ]` items in [PUNCH-LIST.md](../PUNCH-LIST.md) that block the capstone.

---

## 5. Closed-book retrieval (exam warm-up)

Do this **timed (45–60 min)** without notes. Grade with the [answer key](#12-answer-key).

1. Custom Bedrock model invoke prerequisite?  
2. Managed KB default search mode?  
3. Prompt-attack + InvokeModel critical step?  
4. Inference profiles + Provisioned Throughput?  
5. When HITL is mandatory in an agent design?  
6. Prompt caching + batch?  
7. RAG eval metric that catches “fluent but ungrounded”?  
8. First suspects when playground works but Lambda fails?  
9. Agent Squad vs AgentCore one-liner each?  
10. Three GenAI Lens themes you would cite in an ADR?

**Stretch (multi-response style):** Pick all that apply—defense-in-depth for jailbreaks: (a) Guardrails prompt-attack (b) input tagging (c) tool IAM (d) system prompt only (e) CI red-team (f) grounding checks for RAG claims.

---

## 6. Worked → guided → independent

### Worked example — Capstone definition of done

A passing capstone includes:

| Capability | Evidence |
| --- | --- |
| RAG | Hybrid retrieve + citations + tenant filter demo |
| Agent | ≥2 tools (retrieve + read API); max iterations; one HITL path |
| Safety | Guardrail on all inference; jailbreak blocked; PII masked |
| Evals | Golden set ≥50; faithfulness gate; one agent trajectory eval |
| Ops | Invocation logs; throttle alarm; $/query note; TTFT measured |
| Docs | ADR + model card + runbook (4 failures) |

### Guided build order (checklist)

**Day 1 — Harden RAG**

- [ ] Corpus + Glue DQ gate  
- [ ] KB sync + metadata ACL proof  
- [ ] Prompt Management version pinned  
- [ ] Guardrails + grounding on  

**Day 2 — Agent + enterprise edge**

- [ ] MCP/Lambda tools with least privilege  
- [ ] Stop conditions + HITL for write/refund  
- [ ] Streaming API to UI or curl client  
- [ ] AppConfig model router  

**Day 3 — Ops + evals**

- [ ] Dashboards + logging  
- [ ] Prompt cache / tiering applied  
- [ ] Bedrock RAG eval job; record scores  
- [ ] CI gate (or documented manual gate with owner)  

**Day 4 — Defense + exam**

- [ ] Failure drills (4)  
- [ ] ADR final  
- [ ] Practice exam #1; map misses → topics  
- [ ] Remediate weak domains; practice exam #2 ≥80%  

### Independent stretch

- [ ] Multi-agent router (Agent Squad) for billing vs policy intents  
- [ ] Cross-Region Geographic profile with documented SCP  
- [ ] Canary 5% prompt promotion  
- [ ] QuickSight or notebook report for stakeholders  

---

## 7. Architecture defense scenarios (capstone panel)

Treat these as a mock oral defense. Write answers, then compare to the key.

### Panel Q1 — Security

“Show how a hostile prompt cannot exfiltrate another tenant’s documents or trigger a refund.”

### Panel Q2 — Cost

“Finance says Bedrock spend doubled MoM. Walk your investigation and two durable controls.”

### Panel Q3 — Reliability

“Primary region is throttling during a peak. What happens to users in the next 60 seconds?”

### Panel Q4 — Change management

“We want to swap embedding models Friday. What is your migration plan?”

### Panel Q5 — Scope control

“Leadership wants online fine-tuning of a new FM from scratch before launch.” Respond with exam-correct scope judgment.

---

## 8. Hands-on production-shaped labs

### Lab Capstone A — Vertical slice demo script

Rehearse a **10-minute demo**:

1. Ask a policy question → grounded answer + citation  
2. Cross-tenant question → denied / empty  
3. Jailbreak → Guardrail block  
4. Agent order lookup → tool trace  
5. Refund request → HITL wait  
6. Show dashboard + last eval score  

### Lab Capstone B — Eval harness

- [ ] Golden JSONL in S3  
- [ ] Model/RAG evaluation job  
- [ ] Thresholds documented in ADR  
- [ ] Failed prompt version retained for regression  

### Lab Capstone C — Chaos / troubleshoot day

Inject and fix:

- [ ] Wrong inference profile / region  
- [ ] Stale KB (doc updated, sync paused)  
- [ ] Tool IAM denial  
- [ ] Context overflow via huge pasted PDF  

Record root cause → fix → prevention for each.

### Lab Capstone D — Practice exam readiness

- [ ] Skill Builder AIP-C01 practice (or equivalent) **≥80%**  
- [ ] Miss log: question theme → topic file → workbook section  
- [ ] Second attempt ≥80% or first ≥85%  
- [ ] Schedule exam only after exit criteria below  

Official: [Skill Builder AIP-C01](https://skillbuilder.aws/category/exam-prep/generative-ai-developer-professional-aip-c01)

---

## 9. Misconceptions / traps (final sweep)

Confirm you will not fall for:

- [ ] Fine-tune / train-from-scratch as default  
- [ ] Global inference under residency constraints  
- [ ] PT + inference profiles  
- [ ] Agent Squad = AgentCore  
- [ ] Guardrails on embeddings/rerank  
- [ ] Untagged user input for prompt-attack  
- [ ] Prompt cache on batch  
- [ ] Semantic cache without tenancy  
- [ ] Accuracy-only eval gates  
- [ ] Blame the FM before retrieval/IAM  

---

## 10. Reflection

1. What would you rebuild first with another week?  
2. Which domain still feels thinnest for the exam?  
3. Can you teach AgentCore/Strands/MCP to a colleague in 15 minutes using your diagram?

---

## 11. Mastery checklist (cert exit)

- [ ] Capstone demo completed (or architecture-complete with explicit stubs)  
- [ ] ADR + model card + runbook committed next to study notes  
- [ ] All workbook mastery checklists done  
- [ ] Punch list ≥90% researched + exercised  
- [ ] Practice exam **≥80%** (twice, or once ≥85%)  
- [ ] Weak-topic remediation notes written  
- [ ] Exam scheduled  

**Back:** [Workbooks home](./README.md) · [Cert README](../README.md)

---

## 12. Answer key

### Closed-book warm-up

1. Custom Bedrock models typically need **Provisioned Throughput** to invoke.  
2. **Hybrid** (managed default).  
3. **Tag user inputs** for prompt-attack evaluation.  
4. Inference profiles do **not** support Provisioned Throughput.  
5. Irreversible / high-impact side effects (refunds, deletes, external sends).  
6. **Unsupported / not the pattern**—caching is for on-demand prompt reuse.  
7. **Faithfulness** / grounding-related metrics (also citation precision).  
8. Region, IAM, model ID/profile, VPC/endpoint, payload, Guardrail blocks.  
9. Agent Squad: OSS intent router + shared context; AgentCore: managed runtime/gateway/memory/identity/obs platform.  
10. Examples: controlled autonomy, observability, resource efficiency, secure interaction boundaries, standardized resource management, resilience.

**Stretch:** (a)(b)(c)(e)(f) — not (d) alone.

### Panel defense (rubric)

**Q1:** Tenant metadata filters + tool ACL; no cross-tenant cache keys; Guardrails; refund tool requires HITL + separate IAM; traces prove denial.  
**Q2:** Break down tokens by modelId/feature; check loop/iteration spikes, cache misses, k too high; controls = tiering, cache, max iterations, retrieve less.  
**Q3:** Retry/backoff → Geographic secondary → degrade model → queue/friendly error; never silently jump to non-compliant Global if residency binds.  
**Q4:** Dual-index re-embed; config switch; eval gate; keep rollback index; never mix dimensions.  
**Q5:** Out of AIP-C01 candidate scope / poor first move; prefer RAG + prompts + evals; fine-tune/PEFT only with clear gap and lifecycle (registry/PT).

### Capstone self-grade

| Grade | Criteria |
| --- | --- |
| Ship | All DoD rows evidenced; practice ≥80% |
| Design-complete | ADR + stubs + eval plan solid; account gaps documented; practice ≥80% |
| Not ready | Missing Guardrails or evals or practice &lt;80% |

Stop building new features once DoD is green—spend remaining time on practice exams and weak-topic drills.
