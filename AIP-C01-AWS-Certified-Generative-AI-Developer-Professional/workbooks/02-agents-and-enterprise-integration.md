---
layout: default
title: "Workbook 02 — Agents and Enterprise Integration"
---

# Workbook 02 — Agents and Enterprise Integration

**Domain 2 (26%)** · Topics [07](../topics/07-agentic-ai-and-tool-integrations.md)–[11](../topics/11-application-integration-patterns.md)  
**Pack:** [Workbooks home](./README.md) · [Punch list](../PUNCH-LIST.md) · [Cert README](../README.md)

Extend the Policy Copilot with **tool-using agents**, deployment strategies, enterprise integration patterns, resilient FM APIs, and application-facing streaming/automation.

---

## 1. Learning objectives

By the end of this workbook you can:

- [ ] Distinguish **Strands Agents**, **Amazon Bedrock AgentCore**, **AWS Agent Squad**, and classic Bedrock Agents—and pick the right combination for a scenario.
- [ ] Expose tools via **MCP** (AgentCore Gateway → Lambda/OpenAPI) with authn/authz, timeouts, and max-iteration safeguards.
- [ ] Design HITL (Step Functions wait-for-task-token / Amplify) for irreversible actions.
- [ ] Choose deployment: Lambda on-demand, Provisioned Throughput, SageMaker hybrid, cascading models.
- [ ] Integrate via API Gateway, EventBridge, GenAI gateway, federation, and CI/CD with eval gates.
- [ ] Implement sync/async/streaming Bedrock calls with backoff, X-Ray/OTEL, and intelligent routing.
- [ ] Apply app patterns: streaming UX, Prompt Flows, Q Developer assist, CRM/docs, Bedrock Data Automation.

---

## 2. Prerequisites + time

| Item | Expectation |
| --- | --- |
| Prior workbook | [01](./01-fm-integration-data-and-rag.md) RAG path working (or equivalent) |
| Skills | IAM least privilege, Step Functions basics, API Gateway |
| Time | **10–14 hours** (weeks 4–5) |
| Artifacts | Agent with ≥2 MCP/Lambda tools + HITL stub + streaming API |

---

## 3. Activate prior knowledge

1. What is the difference between a **chatbot with RAG** and an **agent**?  
2. Why are unlimited tool loops dangerous?  
3. When would you use Step Functions for ReAct instead of a free-form agent loop?  
4. Streaming helps which UX metric more: time-to-first-token or total generation cost?  
5. Name one reason to put a **GenAI gateway** in front of Bedrock for an enterprise.

<details>
<summary>Quick self-check</summary>

1. Agents plan + call tools/side effects; RAG chat primarily retrieves then generates.  
2. Cost runaway, stuck loops, unintended side effects.  
3. Deterministic stops, auditability, compliance-required control flow.  
4. Time-to-first-token / perceived latency.  
5. Central auth, quotas, model routing, audit, prompt/guardrail policy.

</details>

---

## 4. Concept refresh (link topics)

- [ ] [07 — Agentic AI and tool integrations](../topics/07-agentic-ai-and-tool-integrations.md) — Strands, Agent Squad, MCP, HITL, memory  
- [ ] [08 — Model deployment strategies](../topics/08-model-deployment-strategies.md) — on-demand, PT, SageMaker hybrid, cascading  
- [ ] [09 — Enterprise integration architectures](../topics/09-enterprise-integration-architectures.md) — API/event, federation, gateway, CI/CD  
- [ ] [10 — FM API integrations](../topics/10-fm-api-integrations.md) — sync/async, streaming, backoff, routing  
- [ ] [11 — Application integration patterns](../topics/11-application-integration-patterns.md) — Amplify/OpenAPI, Flows, BDA, CRM  

**Synthesis (½ page):** Draw the path: User → API → AgentCore Runtime (Strands) → Gateway MCP tools → KB retrieve + order API → Guardrails → Observability. Label IAM boundaries.

---

## 5. Closed-book retrieval

### A. Matching

Match component → role:

| Component | Role |
| --- | --- |
| 1. AgentCore Runtime | A. Intent router + shared context (OSS) |
| 2. AgentCore Gateway | B. Session-isolated microVM execution |
| 3. Strands | C. APIs/Lambda → MCP tools |
| 4. Agent Squad | D. Model-driven agent SDK/loop |

### B. Short answer

5. Lambda vs ECS for MCP tool servers—when each?  
6. Three safeguards every production agent needs.  
7. Why Provisioned Throughput for custom Bedrock models?  
8. Cascading model pattern: what is the success criterion to escalate?  
9. EventBridge’s role in a GenAI enterprise design?  
10. What should intelligent routing consider besides “largest model”?  
11. Why tag/correlation IDs with X-Ray for FM calls?  
12. Prompt Flows vs free-form agent—when prefer Flows?

### C. True / false

13. Agent Squad is a managed AWS control-plane service like AgentCore.  
14. Tool results are always evaluated by Bedrock prompt-attack filters.  
15. Async Bedrock jobs fit long-running batch summarization better than sync Converse in a user request path.

---

## 6. Worked → guided → independent

### Worked example — Ticket triage agent

**Goal:** Classify ticket, retrieve policy, optionally look up order status; escalate refunds to a human.

```
User → API Gateway → AgentCore Runtime (Strands)
         ├─ MCP: kb_retrieve (tenant filter)
         ├─ MCP: get_order (read-only IAM)
         └─ MCP: propose_refund → Step Functions HITL → finance API
```

**Defense notes:**

- **Security:** separate IAM roles per tool; Gateway auth; no write tools without HITL; Guardrails on agent I/O.  
- **Cost:** max 5 tool iterations; cheap classifier model → capable model only if needed; cache policy retrieves.  
- **Reliability:** tool timeouts; circuit breaker on order API; session isolation in Runtime; Observability traces for each tool span.

### Guided practice

- [ ] Implement `kb_retrieve` Lambda with mandatory `tenant_id` (reject if missing).  
- [ ] Implement `get_order` with read-only IAM and 3s timeout.  
- [ ] Wire Strands (or Bedrock Agents) with max iterations = 5.  
- [ ] Add Step Functions state: `Wait for refund approval` (task token).  
- [ ] Emit one OTEL/X-Ray trace spanning retrieve → generate → tool.  
- [ ] Document Agent Squad alternative: billing vs tech intents.

### Independent practice

- [ ] Deploy agent to AgentCore Runtime (or document gaps if unavailable; use ECS/Lambda stand-in).  
- [ ] AgentCore Gateway OpenAPI target for a mock CRM.  
- [ ] Streaming ConverseStream (or agent stream) through API Gateway WebSocket/HTTP.  
- [ ] Cascade: Haiku-class → Sonnet-class when judge/confidence low.  
- [ ] CI job that runs 10 synthetic agent trajectories and fails on loop/timeout.

---

## 7. Architecture defense scenarios

### Scenario D2-1 — Confused deputy tools

An agent can call any Lambda in the account via a wildcard IAM role “for speed.”

Defend a redesign covering Gateway, IAM, and tenancy.

### Scenario D2-2 — GPU forever

Team wants always-on SageMaker GPU endpoints for a spiky internal chatbot.

Defend Bedrock on-demand vs PT vs SageMaker; include cost and cold-start reliability.

### Scenario D2-3 — Multi-agent chaos

Product asks for five specialized agents chatting freely with shared memory and no router.

Defend Agent Squad vs Strands multi-agent patterns vs single agent + tools; reliability and cost.

### Scenario D2-4 — Sync in the critical path

A UI waits 90s for a 200-page contract summary via sync Lambda → Converse.

Defend sync vs async (Step Functions / batch) vs streaming progressive UX.

---

## 8. Hands-on production-shaped labs

### Lab A — Strands + MCP + HITL (topic 07)

- [ ] Define tools as MCP or function tools with JSON schemas  
- [ ] AgentCore Gateway (or API Gateway) auth for tool ingress  
- [ ] Memory: short-term session vs long-term (AgentCore Memory / DynamoDB)  
- [ ] HITL path for delete/refund/send-email  
- [ ] Red-team: prompt that tries to force `propose_refund` without approval—must fail

### Lab B — Deployment + enterprise edge (topics 08–09)

- [ ] On-demand path for chat; optional PT only if you measure steady MU utilization  
- [ ] GenAI gateway Lambda: authZ, model allowlist, guardrail ARN injection  
- [ ] EventBridge rule: `doc.ingested` → reindex / notify agent memory refresh  
- [ ] CI/CD: deploy prompts/agents only after eval job succeeds  

### Lab C — FM API + app patterns (topics 10–11)

- [ ] ConverseStream to a simple web client; measure TTFT  
- [ ] Exponential backoff on `ThrottlingException`; jitter; fallback model  
- [ ] Prompt Flow for a deterministic intake form → summary → ticket create  
- [ ] Optional: Bedrock Data Automation for multimodal intake docs  

---

## 9. Misconceptions / traps

- [ ] Agent Squad ≠ AgentCore  
- [ ] Unlimited tool loops  
- [ ] MCP without authn/authz  
- [ ] Skipping HITL for high-impact side effects  
- [ ] PT on cross-Region inference profiles  
- [ ] Always-on GPU for spiky chat  
- [ ] Streaming as a cost optimization (it is primarily UX/latency)  
- [ ] Hardcoding InvokeModel bodies when Converse portability matters  
- [ ] No correlation IDs → untraceable tool failures  
- [ ] Treating playground Agents as production without Runtime isolation / obs  

---

## 10. Reflection

1. Where does *your* agent’s agency need to stop?  
2. Which tool is highest blast radius, and how is it constrained?  
3. Would you bet the exam question on Strands+AgentCore or Step Functions ReAct for regulated workflows—why?

---

## 11. Mastery checklist

- [ ] Diagram AgentCore Runtime / Gateway / Memory / Identity / Observability from memory  
- [ ] Explain Strands vs Agent Squad vs Bedrock Agents in one paragraph each  
- [ ] Show IAM boundaries per tool  
- [ ] Defend cascading + streaming choices with numbers from your lab  
- [ ] Closed-book ≥80%  
- [ ] Agent trajectory demo (happy path + HITL path + throttle path)  

**Next:** [Workbook 03 — Safety, security, and governance](./03-safety-security-governance.md)

---

## 12. Answer key

### Matching

1-B, 2-C, 3-D, 4-A

### Short answer

5. Lambda: lightweight/stateless tools; ECS: heavy/long/CPU-intensive tools.  
6. Examples: max iterations, timeouts/circuit breakers, least-privilege IAM, Guardrails, HITL for irreversible actions.  
7. Custom Bedrock models typically require Provisioned Throughput to invoke.  
8. Low confidence, failed validation, complex intent class, or quality judge below threshold.  
9. Decouple ingestion, async summarization, fan-out notifications, saga-style enterprise events.  
10. Latency class, cost, tool-use support, residency, modality, throttle capacity.  
11. Tie user request → model invoke → tool calls for debugging and SLOs.  
12. When the workflow is mostly deterministic/orchestrated with fixed nodes; agents when planning varies.

### True / false

13. **False** — Agent Squad is OSS routing; AgentCore is the managed platform.  
14. **False** — prompt-attack filters do not evaluate tool results/tool specs the same way; tag user inputs; defense-in-depth.  
15. **True** for long jobs; keep user-facing paths streaming/sync with strict timeouts.

### Architecture defense (rubric)

**D2-1:** Per-tool roles; Gateway with authN/Z; resource ARNs not `*`; tenant claims in context; deny by default.  
**D2-2:** Prefer Bedrock on-demand; PT if steady; SageMaker for custom containers/LoRA ownership—not default for spiky chat.  
**D2-3:** Start single agent + tools; add Agent Squad router for clear domains; Strands graph/workflow with shared context only with budgets and stop conditions.  
**D2-4:** Async job + notify for 90s work; or chunked map-reduce; streaming for partial progress—not sync API Gateway 29s trap.

### Lab self-grade

Pass if refund cannot execute without HITL and traces show each tool span.
