---
layout: default
title: "Workbook 03 — Deployment and orchestration"
---

# Workbook 03 — Deployment and orchestration

**Domain 3 (24%)** · Topics [07](../topics/07-deployment-infrastructure.md) · [08](../topics/08-resource-provisioning-and-configuration.md) · [09](../topics/09-cicd-orchestration-mlops.md)

Builder focus: **where it runs → how it’s provisioned → how it’s shipped**. Prefer SDK/CLI/Boto3/CFN over click-ops; always plan **rollback** and **KB/prompt/agent versioning**.

---

## 1. Learning objectives

By the end of this workbook you can:

- [ ] Select SageMaker real-time, serverless, async, or batch; multi-model vs dedicated; Bedrock on-demand vs provisioned vs Custom Model Import
- [ ] Configure agents, RAG retrieval/rerank, VPC endpoints, containers in ECR, and autoscaling metrics
- [ ] Design CI/CD for models, prompts, agents, and Knowledge Base refresh with automated tests and rollback
- [ ] Express deployments as IaC (SDK scripts, CFN/CDK, Pipelines/Step Functions/CodePipeline)
- [ ] Trade off GPU scaling, cold starts, and Provisioned Throughput against cost and latency SLOs

## 2. Prerequisites + time

| Item | Detail |
|---|---|
| Prerequisites | Workbooks 01–02 recommended; topics 07–09 read |
| Estimated time | **6–8 hours** (weeks 5–6) |
| Materials | SageMaker + Bedrock permissions; ECR optional; paper path OK |

## 3. Activate prior knowledge

1. Async inference vs batch transform — what’s the user-experience difference?
2. Why pin container image digests in production?
3. Name one GenAI artifact besides a model package that needs versioning in CI/CD.

## 4. Concept refresh

| Topic | Refresh focus |
|---|---|
| [07 — Deploy infra](../topics/07-deployment-infrastructure.md) | Inference modes; MME; FM hosting; CMI; agents; RAG retrieve/rerank |
| [08 — Provisioning](../topics/08-resource-provisioning-and-configuration.md) | On-demand vs provisioned; VPC; SDK deploy; autoscaling; KB; agent state; GPU; AgentCore |
| [09 — CI/CD MLOps](../topics/09-cicd-orchestration-mlops.md) | Code* services; Registry/MLflow; Prompt Management; agent versioning; KB refresh; rollback |

**C02 GenAI callouts:** Custom Model Import, Bedrock agents / AgentCore, KB retrieval pipelines, prompt testing in CI, FM fine-tuned version deploy automation, RAG/KB refresh orchestration.

## 5. Closed-book retrieval practice

**R1.** Match workload → inference option: interactive API; spiky idle; 500MB PDF scoring with minutes of compute; nightly score 10M rows.

**R2.** When is multi-model endpoint a cost win? When is it a bad fit?

**R3.** Bedrock on-demand vs Provisioned Throughput — pick for variable hobby traffic vs steady 500 TPS SLA.

**R4.** List three autoscaling signals you might use for a SageMaker endpoint.

**R5.** Sketch the MLOps stages from source → monitor → retrain (include a GenAI-specific stage).

**R6.** Blue/green vs canary vs shadow — one line each.

**R7.** What does a KB refresh pipeline need to orchestrate beyond “upload files to S3”?

## 6. Worked → guided → independent practice

### Worked example — hybrid ML + RAG production path

**Need:** Real-time fraud score (tabular) + support agent (Bedrock + tools).

```text
Fraud model (Registry Approved)
  → SageMaker real-time endpoint (VPC), autoscaling on InvocationsPerInstance
  → CloudFormation change set; previous EndpointConfig retained for rollback

Support agent
  → Bedrock Agent + action group (Lambda) + KB (OpenSearch)
  → Prompt Management version pinned in agent config
  → CodePipeline: prompt tests + eval gate → update agent alias
  → EventBridge nightly: S3 FAQ sync → StartIngestionJob → smoke Retrieve

IaC: CDK stacks for endpoint, agent, KB, IAM; no console-only prod changes
```

### Guided practice

1. Large payload / long-running inference with queue → ______ inference.
2. Cold starts unacceptable for SLA → avoid ______ or pre-warm / use provisioned capacity.
3. Agent multi-step tool use needs ______ management (short/long-term memory / session isolation).
4. CI should fail deploy if ______ CVE scan (Inspector) or prompt eval gate fails.

### Independent practice

Produce an **IaC deployment runbook** (bullets) for one of:

- (A) Promote Model Registry package to endpoint with canary + automatic rollback on 5xx alarm  
- (B) Promote new Prompt Management version + KB ingestion with Retrieve smoke tests  

Include roles, artifact stores (ECR/S3/Registry), and who/what triggers retrain or re-ingest.

## 7. Scenario / decision exercises

**S1.** Ten rarely used SKLearn models; shared framework; cost pressure. Dedicated endpoints or MME?

**S2.** Bedrock app sees bursty traffic with strict p99. On-demand alone throttles. Options?

**S3.** Team deploys agents only from console; last week someone edited instructions live and broke prod. Fix the process.

**S4.** RAG answers worse after doc upload. Ingestion job “succeeded.” What do you check in retrieval config?

**S5.** GPU endpoints at 15% util, high $. Optimization levers before “buy more Savings Plans”?

## 8. Hands-on labs

### Lab A — SageMaker deploy

- [ ] Deploy the same model real-time **or** serverless; note cold start / cost shape
- [ ] (Optional) Async endpoint for a large-input path
- [ ] Update endpoint via SDK/CLI; keep prior config for rollback drill

### Lab B — Bedrock / agent / KB

- [ ] Configure KB retrieve with `numberOfResults` / metadata filter; compare answers
- [ ] Minimal agent with one Lambda tool; invoke multi-turn
- [ ] Trigger a KB ingestion job; document the orchestration steps you would automate

### Lab C — CI/CD paper or CodePipeline sketch

- [ ] Draw CodePipeline (or SageMaker Pipelines) with eval gate + Registry approval
- [ ] Add prompt test step and KB refresh branch
- [ ] Define rollback: previous endpoint config / agent alias / prompt version

## 9. Misconceptions / traps

- [ ] Real-time for everything (batch/async/serverless often cheaper)
- [ ] MME for GPU-saturated heavy models
- [ ] Console-only prod (no IaC, no audit trail)
- [ ] Forgetting VPC endpoints / NAT for private training & invoke paths
- [ ] No rollback artifact (previous model package / alias)
- [ ] KB file upload without re-ingest / sync
- [ ] Unversioned prompts and agent instructions
- [ ] Autoscaling on CPU alone when Invocations/Latency matter more

## 10. Reflection

1. Which inference mode do you underuse today?
2. What’s missing from your real CI/CD for GenAI artifacts?
3. How would you prove rollback works in a drill?

## 11. Mastery checklist

- [ ] Can select and justify SageMaker + Bedrock deploy targets
- [ ] Can provision VPC, containers, autoscaling, KB, agent state thoughtfully
- [ ] Can design CI/CD with tests, versioning, KB refresh, rollback
- [ ] Punch list Domain 3 items marked complete

## 12. Answer key

**Activate**

1. Async: near-real-time queued request/response for one large job; batch: offline job over a dataset.  
2. Reproducibility and avoid floating `latest` breaking prod.  
3. Prompts, agents, Guardrail configs, KB index versions / ingestion jobs.

**Retrieval**

**R1.** Real-time; serverless; async; batch transform.  
**R2.** Win: many sparse models, shared framework. Bad: each model needs saturated dedicated GPU.  
**R3.** On-demand; Provisioned Throughput.  
**R4.** e.g., InvocationsPerInstance, CPUUtilization, Latency, custom ConcurrentRequestsPerModel.  
**R5.** Source → build/test → train/fine-tune → evaluate (incl. prompt/Bedrock eval) → register → deploy → monitor → EventBridge retrain/KB refresh.  
**R6.** Blue/green = flip environments; canary = gradual traffic; shadow = copy traffic no user impact.  
**R7.** Chunk/embed, vector index update, filters/metadata, smoke Retrieve, alias/version pointer, failure alarms.

**Guided**

1. Async  
2. Serverless (cold start)  
3. state / memory / session  
4. critical (or container)

**Scenarios**

**S1.** MME — cost win for sparse shared-framework models.  
**S2.** Provisioned Throughput; caching; smaller/faster FM; async for non-interactive; request batching where valid.  
**S3.** IaC + pipeline; Prompt Management versions; agent aliases; deny console mutate in prod; CloudTrail alerts.  
**S4.** Chunking strategy, metadata filters, embedding model mismatch, top-k/rerank, stale index, sync lag, hybrid search needs.  
**S5.** Rightsize instance, MME/consolidation, serverless for spiky, batch off-peak, quantization/smaller model, scale-in policies — then purchasing options.
