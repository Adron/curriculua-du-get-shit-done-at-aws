---
layout: default
title: "Workbook 04 — Operate, monitor, secure"
---

# Workbook 04 — Operate, monitor, and secure

**Domain 4 (24%)** · Topics [10](../topics/10-monitoring-inference-and-performance.md) · [11](../topics/11-cost-and-performance-optimization.md) · [12](../topics/12-securing-ml-ai-workloads.md)

Builder focus: **observe → optimize → harden**. Production MLA work is alarms, token economics, least privilege, and Guardrails — not only a green endpoint.

---

## 1. Learning objectives

By the end of this workbook you can:

- [ ] Design CloudWatch / Model Monitor / Bedrock eval / AgentCore observability stacks for ML and GenAI
- [ ] Detect data vs concept drift; run A/B or variant traffic; spot agent coordination failures
- [ ] Optimize instance families, purchasing options, and token/embedding/vector DB cost patterns
- [ ] Apply IAM least privilege, VPC isolation, encryption, secrets, Bedrock credential patterns
- [ ] Wire Guardrails / content safety and CI vulnerability scans (Inspector) into pipelines

## 2. Prerequisites + time

| Item | Detail |
|---|---|
| Prerequisites | Workbook 03 recommended; topics 10–12 read |
| Estimated time | **5–7 hours** (week 7) |
| Materials | Deployed endpoint or Bedrock app (or paper); CloudWatch access |

## 3. Activate prior knowledge

1. Why is “CPU alarm only” insufficient for an ML endpoint?
2. What’s the difference between data drift and concept drift?
3. Prefer IAM roles or long-lived Bedrock API keys for a Lambda caller — why?

## 4. Concept refresh

| Topic | Refresh focus |
|---|---|
| [10 — Monitoring](../topics/10-monitoring-inference-and-performance.md) | GenAI observability; drift; A/B; agent failures; FM evals |
| [11 — Cost / perf](../topics/11-cost-and-performance-optimization.md) | Instance families; AgentCore Observability; X-Ray; tokens/embeddings/vectors |
| [12 — Security](../topics/12-securing-ml-ai-workloads.md) | Inspector; least privilege; CloudTrail/Config; VPC; Guardrails; Bedrock creds |

**C02 GenAI callouts:** agent coordination monitoring, FM eval monitoring, AgentCore Observability, token/embedding/vector cost, Bedrock API keys vs IAM, Guardrails / sensitive data protection.

## 5. Closed-book retrieval practice

**R1.** List monitoring layers from infra → GenAI/agents (at least five).

**R2.** SageMaker production variants 90/10 — what are you measuring and for how long (qualitatively)?

**R3.** Agent failure modes: tool failure, coordination failure, truncated streaming, looping — one symptom each.

**R4.** Name three GenAI cost drivers beyond “EC2 instance hours.”

**R5.** Map control → service: container CVE scan; audit API calls; config drift of IAM; secret for API key; block toxic output.

**R6.** Encryption at rest and in transit — where do keys and TLS show up for S3 + SageMaker + Bedrock paths?

## 6. Worked → guided → independent practice

### Worked example — ops pack for fraud endpoint + Bedrock agent

```text
Fraud endpoint
  · CloudWatch: Invocations, 4xx/5xx, Latency p99, GPU/CPU
  · Model Monitor: data quality + model quality baselines; EventBridge → SNS + retrain pipeline
  · Variants: 90/10 canary for new package; auto rollback on alarm

Bedrock agent
  · Guardrails: PII redact + topic deny + toxicity
  · AgentCore/CloudWatch: tool error %, tokens/session, step count, truncated stops
  · Weekly Bedrock Model Evaluation on privacy-safe prompt sample
  · Budgets: token + embedding + OpenSearch; alarm on $ / successful task

Security
  · Separate train / endpoint / agent-Lambda roles; S3 prefix ABAC
  · Private subnets + interface endpoints; no public model buckets
  · Inspector scan on ECR in CodePipeline; fail on critical CVE
  · CloudTrail + Config rules for public S3 / overly open SG
```

### Guided practice

1. Empty RAG retrievals spiking → alarm on ______ rate, not only 200 OK from the API.
2. Rightsizing starts with ______ util and latency SLO, then purchasing options.
3. Bedrock credentials for AWS compute: prefer ______ roles with temporary creds.
4. Guardrails belong ______ the model response path (pre/post), not only in docs.

### Independent practice

Write an **ops + security checklist** (one page) for a system you choose (ML endpoint or RAG agent). Include: metrics, alarms, cost caps, IAM roles, network, encryption, Guardrails, and CI scans.

## 7. Scenario / decision exercises

**S1.** Accuracy looks fine in weekly batch eval, but users report worse fraud catches this week. What drift checks do you run?

**S2.** Agent burns tokens, never finishes. Metrics to inspect and mitigations?

**S3.** Vector DB cost exploded after “embed entire wiki nightly.” Cost controls?

**S4.** Data scientist role can `s3:*` on prod models and `bedrock:*`. Harden without blocking their Studio work.

**S5.** Leadership wants A/B on two FMs in production. How do you run it safely?

## 8. Hands-on labs

### Lab A — Monitor

- [ ] Enable detailed endpoint or Bedrock/app metrics; create p99 latency + error alarms
- [ ] (Optional) Model Monitor baseline + schedule; or document how you would inject drift
- [ ] Split traffic or simulate dual prompt route; compare metrics

### Lab B — Cost / observability

- [ ] Build a simple dashboard: latency, errors, $/day or token count
- [ ] Trace one request path (X-Ray or AgentCore/CloudWatch traces)
- [ ] Estimate token + embedding + vector storage cost for a stated QPS

### Lab C — Secure

- [ ] Draft least-privilege IAM policy sketches for train job vs invoke Lambda
- [ ] Enable or describe Guardrail on a Bedrock app; test a blocked prompt
- [ ] Paper: Inspector gate in pipeline + CloudTrail alert on role changes

## 9. Misconceptions / traps

- [ ] Infra-only monitoring (miss model/GenAI quality collapse)
- [ ] Confusing shadow with A/B
- [ ] Optimizing instance $ while ignoring token burn
- [ ] Shared god-role for Studio, training, and prod invoke
- [ ] Public endpoints / open S3 for “ease of demo” left in prod
- [ ] API keys in plaintext notebooks
- [ ] Guardrails as a substitute for IAM (different layer)
- [ ] No baseline → cannot detect drift

## 10. Reflection

1. Which alarm would have saved you in a past incident?
2. What’s your biggest GenAI cost blind spot (tokens, embeds, vectors, agents)?
3. Where is least privilege still “TODO” in your mental model?

## 11. Mastery checklist

- [ ] Can design full observability for ML + agents + RAG
- [ ] Can optimize cost across instances and GenAI unit economics
- [ ] Can secure pipelines with IAM, VPC, encryption, secrets, Guardrails, CI scans
- [ ] Punch list Domain 4 items marked complete

## 12. Answer key

**Activate**

1. Model quality, drift, latency SLO, GenAI tokens/Guardrails can fail while CPU is fine.  
2. Data drift = input distribution shift; concept drift = relationship to label/outcome changes.  
3. IAM roles — temporary creds, no long-lived secrets in compute.

**Retrieval**

**R1.** Infra; endpoint/API; model quality; data quality/drift; GenAI tokens/throttles/Guardrails; agents; RAG retrieval.  
**R2.** Business + technical metrics per variant over comparable traffic/time; then promote/rollback.  
**R3.** Tool exception/timeout; incomplete multi-agent handoff; partial output/stop reason; steps/token burn without progress.  
**R4.** Input/output tokens; embedding jobs; vector storage/query; Provisioned Throughput; agent step fan-out.  
**R5.** Inspector; CloudTrail; Config; Secrets Manager; Bedrock Guardrails.  
**R6.** S3 SSE-KMS; TLS to endpoints; SageMaker volume/KMS; Bedrock encryption/logging settings per account policy.

**Guided**

1. empty-retrieval (or retrieval miss)  
2. resource / GPU  
3. IAM  
4. in / on (inline in the invoke path)

**Scenarios**

**S1.** Feature distribution vs baseline; label delay / concept drift; segment performance; data pipeline bugs; adversary shift.  
**S2.** Max iterations, tool error loops, missing stop conditions — cap steps, fix tools, add Guardrails/timeouts, monitor tokens/session.  
**S3.** Incremental ingest, dedupe, chunk wisely, cheaper embed model, lifecycle delete, smaller index, cache, sync only changed docs.  
**S4.** Separate SSO roles; project prefixes; Studio in dev account; prod invoke via pipeline roles; SCPs; no `bedrock:*` in prod human role.  
**S5.** Router or aliases with traffic split; equal samples; Guardrails both arms; eval metrics + business KPI; rollback plan; privacy-safe logging.
