---
layout: default
title: "Workbook 04: Optimize, Monitor, Evaluate, Troubleshoot"
---

# Workbook 04: Optimize, Monitor, Evaluate, Troubleshoot

**Domains 4-5 (12% + 11% = 23%)** · Topics [16](../topics/16-cost-optimization-and-resource-efficiency.md)-[20](../topics/20-troubleshooting-genai-applications.md)  
**Pack:** [Workbooks home](./README.md) · [Punch list](../PUNCH-LIST.md) · [Cert README](../README.md)

Make the Policy Copilot **cheap enough, fast enough, observable, and measurable**. Then learn to diagnose failures without blaming the FM first. In my experience the model is rarely the actual culprit; it's the index, the IAM policy, or the Region.

---

## 1. Learning objectives

By the end of this workbook you can:

- [ ] Cut token spend with pruning, tiering, batching, prompt caching, and semantic caching, without leaking cross-tenant data.
- [ ] Optimize p95 latency (streaming, retrieval tuning, decoding params, autoscaling signals).
- [ ] Enable model invocation logging and CloudWatch GenAI metrics; observe agents/tools and vector ops.
- [ ] Run Bedrock model/RAG/agent evaluations, LLM-as-judge, canary/A/B, and CI quality gates.
- [ ] Troubleshoot context overflow, API/IAM/region issues, prompt regressions, embedding drift, and tool failures with a playbook.

---

## 2. Prerequisites + time

| Item | Expectation |
| --- | --- |
| Prior | Workbooks [01](./01-fm-integration-data-and-rag.md)-[03](./03-safety-security-governance.md) stack (or equivalent) |
| Time | **10-14 hours** (weeks 8-9) |
| Artifacts | Cost dashboard + eval gate + troubleshooting runbook |

---

## 3. Activate prior knowledge

1. Name two ways to reduce cost without changing the generator model.  
2. Why might p95 stay high after you switch to a “faster” FM?  
3. What is the difference between **prompt caching** and **semantic caching**?  
4. Why is “accuracy” a weak sole metric for open-ended generation?  
5. Stale answers after a doc update: first three places you look?

<details>
<summary>Quick self-check</summary>

1. Shorter prompts/history, fewer chunks, caching, smaller retrieve k, batch embeddings.  
2. Retrieval or tool latency dominates.  
3. Prompt cache: reuse large prompt prefixes on supported models; semantic: near-duplicate query→answer store.  
4. Open-ended quality needs faithfulness, relevance, harmlessness, citation coverage, etc.  
5. Ingest/sync lag, wrong index, embedding/chunking bug, not only the prompt.

</details>

---

## 4. Concept refresh (link topics)

- [ ] [16: Cost optimization and resource efficiency](../topics/16-cost-optimization-and-resource-efficiency.md)  
- [ ] [17: Application performance optimization](../topics/17-application-performance-optimization.md)  
- [ ] [18: Monitoring GenAI applications](../topics/18-monitoring-genai-applications.md)  
- [ ] [19: Evaluation systems for GenAI](../topics/19-evaluation-systems-for-genai.md)  
- [ ] [20: Troubleshooting GenAI applications](../topics/20-troubleshooting-genai-applications.md)  

**Synthesis:** Write SLO/SLA targets: TTFT, p95 e2e, $/1k queries, faithfulness floor, throttle error budget.

---

## 5. Closed-book retrieval

### A. Cost & performance

1. Prompt caching works with batch inference: true or false?  
2. When is Provisioned Throughput economically justified?  
3. Risk of semantic cache without tenancy keys?  
4. Why lower temperature for grounded FAQ RAG?  
5. Autoscaling GPUs on CPU% alone: why wrong for GenAI?  
6. Fetching top-50 chunks “for safety” hurts what?

### B. Monitoring & evals

7. Model invocation logging covers which API family, and what does it *not* cover?  
8. Three CloudWatch signals you should alarm on.  
9. Retrieve-only vs retrieve-and-generate RAG eval: what differs?  
10. Why canary a new prompt/model instead of big-bang?  
11. Agent eval should measure more than final answer quality: name two metrics.

### C. Troubleshooting

12. Context overflow mitigations (list four).  
13. Playground works, app fails: checklist?  
14. Embedding model changed last week; symptoms?  
15. Agent “does nothing useful”: where do you look in traces?

---

## 6. Worked → guided → independent

### Worked example: Cost/latency loop

**Baseline:** $0.42/query, p95 6.8s, faithfulness 0.71  

| Change | Effect | Keep? |
| --- | --- | --- |
| Explicit prompt `cachePoint` on 2k-token policy preamble | −18% input token $ | Yes |
| Hybrid top-8 → rerank top-4 | −0.9s; faithfulness +0.04 | Yes |
| Cascade: cheap model if FAQ classifier hits | −35% $ on 60% traffic | Yes |
| Provisioned Throughput | Utilization 12% | **No** (wait for steady load) |
| Semantic cache (tenant-keyed) | −22% repeats | Yes |

### Guided practice

- [ ] Enable invocation logging to CloudWatch Logs (masked)  
- [ ] Dashboard: invocations, tokens, throttles, latency by `modelId`  
- [ ] Add prompt caching; compare `cacheReadInputTokens`  
- [ ] Stream responses; measure TTFT vs baseline  
- [ ] Create 50-100 golden prompts; run LLM-as-judge or Bedrock eval job  
- [ ] Set CI gate: block promote if Faithfulness mean &lt; threshold  

### Independent practice

Fully on your own now:

- [ ] Semantic cache (ElastiCache/MemoryDB) with tenant + ACL key  
- [ ] Cost Anomaly Detection on Bedrock  
- [ ] AgentCore Observability / OTEL for tool error rate alarm  
- [ ] Canary 5% traffic to new prompt version via AppConfig  
- [ ] Write runbook pages for: throttle storm, empty retrieve, AccessDenied on tool, embedding drift  

---

## 7. Architecture defense scenarios

### Scenario D4-1: PT for a hackathon

Team buys Provisioned Throughput “so demos never throttle” for a 3-day event.

Defend the better pattern.

### Scenario D4-2: Cache everything

Proposal: cache all answers globally for 24h to save money.

Defend tenancy, PII, and freshness constraints.

### Scenario D4-3: Latency-only promotion

New model is 40% faster; faithfulness drops 0.12; ship Friday?

Defend release criteria.

### Scenario D4-4: “The model is dumb”

Users report wrong answers after a KB migration. On-call blames the FM.

Defend a troubleshooting order.

---

## 8. Hands-on production-shaped labs

### Lab A: Cost & perf (topics 16-17)

All three labs in this workbook are [B12](../../build.md#b12): cost/latency dashboard, golden set, CI gate, and the troubleshooting runbook.

- [ ] Token budget estimator before send (history trim)  
- [ ] Tiered router + cascade  
- [ ] Prompt cache on supported model  
- [ ] Retrieval k/rerank sweep with latency/quality chart  
- [ ] Decoding param A/B via Prompt Management  

### Lab B: Monitoring (topic 18)

- [ ] Invocation logs + metric alarms  
- [ ] Golden-set sampler nightly  
- [ ] Vector ingest lag metric  
- [ ] Tool success/latency metrics for agent  

### Lab C: Evals + troubleshooting (topics 19-20)

- [ ] Bedrock RAG evaluation (faithfulness, citation coverage)  
- [ ] Agent task-completion eval on 20 trajectories  
- [ ] Inject faults: wrong region, stale index, bad tool IAM, then practice the runbook  
- [ ] Document root cause → fix → regression test for each fault  

---

## 9. Misconceptions / traps

- [ ] Prompt caching + batch  
- [ ] PT for low-duty PoCs  
- [ ] Personalized cache leakage  
- [ ] Ignoring cache-read vs cache-write billing  
- [ ] High temperature on factual RAG  
- [ ] Optimizing model while retrieval dominates p95  
- [ ] Metrics-only debugging without (masked) payloads  
- [ ] Accuracy-only GenAI evals  
- [ ] Big-bang model swap  
- [ ] Blaming FM before index/IAM/region  

---

## 10. Reflection

1. What is your biggest $/query driver today?  
2. Which alarm would wake you at 2am, and is it actionable?  
3. What eval metric would you *not* compromise to ship faster?

---

## 11. Mastery checklist

- [ ] Cost dashboard live; know $/1k queries  
- [ ] TTFT and p95 measured with streaming on  
- [ ] Invocation logging + throttle alarms  
- [ ] Eval gate in CI or documented manual gate  
- [ ] Troubleshooting runbook with ≥4 failure modes  
- [ ] Closed-book ≥80%  

**Next:** [Workbook 05: Capstone](./05-capstone-production-genai-system.md)

---

## 12. Answer key

### Closed-book

1. **False**: prompt caching is on-demand oriented; not for batch.  
2. Steady, predictable load and/or custom model invoke requirements; monitor MU utilization.  
3. Cross-tenant answer leakage / PII bleed.  
4. More deterministic, less creative hallucination risk.  
5. GenAI load correlates with concurrency/tokens/queue depth, not just CPU.  
6. Latency, cost, and often quality (noise in context).  

7. `bedrock-runtime` style invokes (Converse/InvokeModel*); not other endpoints such as `bedrock-mantle`.  
8. Throttles, error rate, latency; also token spikes / cost anomalies.  
9. Retrieve-only: context relevance/coverage; R&G: correctness, faithfulness, citations, harmfulness, etc.  
10. Limits blast radius of quality regressions.  
11. Task completion, tool effectiveness, step count, stop-condition violations.  

12. Shrink history; summarize; dynamic chunking; smaller k; larger context model only if needed; detect truncation.  
13. Model ID/profile, region, IAM, VPC endpoint, payload schema, SDK version, Guardrail blocking.  
14. Relevance collapse / wrong neighbors until re-embed.  
15. Tool IAM AccessDenied, schema validation, timeouts, max-iteration stops, empty tool results.

### Architecture defense (rubric)

**D4-1:** On-demand + retries + smaller model fallback + caching; PT burns money at low utilization.  
**D4-2:** Tenant-keyed cache; short TTL for policies; never cache cross-user PII answers globally.  
**D4-3:** Block ship; faithfulness regression &gt; latency win; canary + gate.  
**D4-4:** Check sync lag → filters → embedding ID → chunking → then prompts/FM.

### Lab self-grade

Pass if you can show a before/after cost or latency chart and a failing CI eval that blocks a bad prompt.
