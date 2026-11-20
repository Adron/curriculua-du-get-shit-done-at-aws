---
title: "Drill MLA-01"
---

# Drill MLA-01

Twenty MLA-C02 questions across all four domains: data prep, model development, deployment and orchestration, and ops and security. Most of these come down to the same move: match the tool to the traffic shape, the data shape, or the stage of the pipeline.

Closed book. About 30 minutes. Answer all 20 before you open a single answer.

---

### Question 1

A training job reads a huge, wide table stored as CSV in S3. It's slow and expensive. What format should the data be in?

- **A.** JSON
- **B.** CSV split into smaller files
- **C.** Parquet
- **D.** Plain text

<details markdown="1"><summary>Answer</summary>

**C.** Parquet is columnar. It's the default for analytics and training, and the Feature Store offline store uses it.

**Why not A:** JSON fits semi-structured API data and fine-tuning line records, not big columnar training scans.

Topic: [MLA 01: Data collection and storage](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/01-data-collection-and-storage.md)

</details>

### Question 2

Every night the team scores 50 million rows. Someone proposes a real-time GPU endpoint. What's the better fit?

- **A.** A multi-model endpoint
- **B.** Serverless inference
- **C.** SageMaker batch transform
- **D.** A real-time endpoint

<details markdown="1"><summary>Answer</summary>

**C.** Batch transform is the job-based, offline way to score whole datasets.

**Why not D:** A real-time GPU endpoint for nightly batch scoring is a listed trap. You pay for instances that sit idle all day.

Topic: [MLA 07: Deployment infrastructure](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/07-deployment-infrastructure.md)

</details>

### Question 3

A multi-tenant RAG app has Bedrock Guardrails configured. A user from tenant A still got a chunk from tenant B's documents. What fixes it?

- **A.** A higher contextual grounding threshold
- **B.** Retrieval metadata filters and app-level authorization that enforce tenant isolation
- **C.** A stronger content filter setting
- **D.** A Guardrails word filter listing tenant B's product names

<details markdown="1"><summary>Answer</summary>

**B.** Guardrails aren't access control. Tenant isolation is IAM, app authorization, and retrieval filters.

**Why not A:** Grounding checks whether the answer matches the retrieved source. It happily grounds on the wrong tenant's chunk.

Topic: [MLA 12: Securing ML and AI workloads](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/12-securing-ml-ai-workloads.md)

</details>

### Question 4

Before training, the team wants to know whether the rate of positive labels differs between demographic groups. Which Clarify-style metric?

- **A.** Difference in Proportions of Labels (DPL)
- **B.** recall@k
- **C.** RMSE
- **D.** BLEU

<details markdown="1"><summary>Answer</summary>

**A.** DPL flags when positive label rates differ by facet. It's a pre-training bias metric.

**Why not B:** recall@k measures retrieval quality, not label bias.

Topic: [MLA 03: Data quality, validation, and bias](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/03-data-quality-validation-and-bias.md)

</details>

### Question 5

Training metrics look great. Validation metrics are poor. What's happening, and what's a reasonable fix?

- **A.** Overfitting. Add data, regularize (dropout, weight decay), or stop early.
- **B.** Data drift. Retrain on production data.
- **C.** Catastrophic forgetting. Mix in replay data.
- **D.** Underfitting. Train longer with less regularization.

<details markdown="1"><summary>Answer</summary>

**A.** Train much better than validation is the overfitting signal.

**Why not D:** Underfitting shows poor metrics on both sets. Training longer would make this worse.

Topic: [MLA 05: Train, fine-tune, and customize models](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/05-train-fine-tune-customize-models.md)

</details>

### Question 6

New documents land in S3 and a pipeline refreshes the production Knowledge Base. What has to happen before the app config switches to the new index?

- **A.** A retrieval eval job (hit@k) passes its quality gate
- **B.** Glue Data Quality is skipped to save time
- **C.** Top-k is raised to compensate
- **D.** The old index is deleted

<details markdown="1"><summary>Answer</summary>

**A.** Validate, sync, run a retrieval eval, and only then promote. Don't silently refresh a production index without a quality gate.

**Why not D:** Deleting the old index first removes your rollback path.

Topic: [MLA 09: CI/CD orchestration and MLOps](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md)

</details>

### Question 7

The team moved to a cheaper instance type and saved 20%, but the GenAI bill went up anyway. What should the dashboard have been watching?

- **A.** CPU utilization only
- **B.** Cost per request and token burn
- **C.** Instance count
- **D.** Disk throughput

<details markdown="1"><summary>Answer</summary>

**B.** With GenAI the bill hides in the tokens. RAG context doubling outweighs any instance savings.

**Why not A:** CPU tells you nothing about the tokens that are driving the bill.

Topic: [MLA 11: Cost and performance optimization](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/11-cost-and-performance-optimization.md)

</details>

### Question 8

A model needs the freshest feature values at inference time, with low-latency lookups. Which store serves them?

- **A.** Parquet files in S3
- **B.** SageMaker Feature Store offline store
- **C.** Amazon EFS
- **D.** SageMaker Feature Store online store

<details markdown="1"><summary>Answer</summary>

**D.** Freshest features for inference means the online store.

**Why not B:** The offline store is append-only Parquet on S3, built for point-in-time training data, not low-latency lookups.

Topic: [MLA 01: Data collection and storage](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/01-data-collection-and-storage.md)

</details>

### Question 9

You want to compare a candidate model against production on real traffic, with zero impact on users. What do you use?

- **A.** An A/B test at 50/50
- **B.** A shadow variant
- **C.** A 10% canary
- **D.** A blue/green flip

<details markdown="1"><summary>Answer</summary>

**B.** Shadow sends a copy of production traffic to the candidate. Users only ever see production responses.

**Why not C:** A canary sends real users to the candidate. That's real user impact, even at 10%.

Topic: [MLA 06: Model and system evaluation](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/06-model-and-system-evaluation.md)

</details>

### Question 10

A GPU inference endpoint keeps running out of GPU memory under load, but it autoscales on CPU utilization. What should it scale on?

- **A.** Buy Bedrock Provisioned Throughput
- **B.** Move the endpoint to batch transform
- **C.** Keep CPU utilization and lower the threshold
- **D.** Saturation metrics: InvocationsPerInstance, model latency, or GPU utilization

<details markdown="1"><summary>Answer</summary>

**D.** Scale on metrics that reflect real saturation. Autoscaling on CPU when GPU memory is the bottleneck is a listed trap.

**Why not C:** A lower CPU threshold still measures the wrong resource.

Topic: [MLA 08: Resource provisioning and configuration](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/08-resource-provisioning-and-configuration.md)

</details>

### Question 11

The business needs OCR on invoices, quickly and with low custom effort. Which approach?

- **A.** Amazon Textract
- **B.** Fine-tune an LLM on invoices
- **C.** Train a custom CV model with SageMaker
- **D.** A Bedrock agent

<details markdown="1"><summary>Answer</summary>

**A.** OCR is a commodity perception task, so use the managed AI service.

**Why not B:** Most wrong answers here are overbuilding. A fine-tuned LLM for OCR is the classic one.

Topic: [MLA 04: Modeling approach selection](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/04-modeling-approach-selection.md)

</details>

### Question 12

A RAG corpus needs precise matches at retrieval time but broader context in the prompt. Which Knowledge Base chunking strategy fits?

- **A.** Fixed-size chunks with zero overlap
- **B.** Hierarchical chunking
- **C.** No chunking
- **D.** One giant chunk per folder

<details markdown="1"><summary>Answer</summary>

**B.** Hierarchical retrieves the small child chunk, then hands the model the parent for context.

**Why not C:** No chunking makes each whole doc one chunk. Huge chunks dilute retrieval.

Topic: [MLA 02: Data transformation and feature engineering](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/02-data-transformation-feature-engineering.md)

</details>

### Question 13

An agent's endpoint returns HTTP 200 on every call, yet sessions burn through their token budgets without finishing. What should you monitor?

- **A.** 5xx error rate only
- **B.** Host CPU
- **C.** Disk space
- **D.** Steps per session and max-iteration hits

<details markdown="1"><summary>Answer</summary>

**D.** That's looping: token burn without progress. Track steps per session and max-iteration hits.

**Why not A:** An HTTP 200 isn't success. The error rate looks perfect while the agent loops.

Topic: [MLA 10: Monitoring inference and performance](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/10-monitoring-inference-and-performance.md)

</details>

### Question 14

A Lambda function calls Bedrock using a long-lived API key in a plaintext environment variable. What's the better pattern?

- **A.** Use an IAM role with temporary credentials, and keep any required key in Secrets Manager with rotation
- **B.** Pass the key in the prompt
- **C.** Keep the env var but rotate it once a year
- **D.** Bake the key into the container image

<details markdown="1"><summary>Answer</summary>

**A.** IAM roles with temporary creds are preferred for AWS workloads. Keys that must exist are secrets.

**Why not D:** Baking long-lived keys into images is explicitly called out as a never.

Topic: [MLA 12: Securing ML and AI workloads](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/12-securing-ml-ai-workloads.md)

</details>

### Question 15

After fine-tuning, an FM is great at the new task but has forgotten how to follow general instructions. Which mitigations help? **(Choose two.)**

- **A.** Lower the learning rate and use fewer epochs
- **B.** Use LoRA/adapters and mix in replay data from the earlier tasks
- **C.** Raise the learning rate
- **D.** Train for more epochs

<details markdown="1"><summary>Answer</summary>

**A and B.** Catastrophic forgetting is mitigated with gentler training, adapters, replay data, and evals on the old tasks.

**Why not D:** More epochs pushes the model further from what it used to know.

Topic: [MLA 05: Train, fine-tune, and customize models](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/05-train-fine-tune-customize-models.md)

</details>

### Question 16

A bad prompt edit broke production. Models have a rollback path. Prompts don't. What was missing?

- **A.** A larger endpoint instance
- **B.** More MLflow runs
- **C.** Prompt versions in Bedrock Prompt Management with a rollback path
- **D.** A new ECR image

<details markdown="1"><summary>Answer</summary>

**C.** If it changes behavior, it gets a version and a gate. Prompts included.

**Why not B:** MLflow tracks experiments and model versions. It doesn't roll back a prompt.

Topic: [MLA 09: CI/CD orchestration and MLOps](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md)

</details>

### Question 17

A fraud dataset is 1% positive. The team reports balanced accuracy and leaves the data alone. What should they do?

- **A.** Shuffle the rows and retrain
- **B.** Drop the minority class
- **C.** Fix the class imbalance: resampling, reweighting, or synthetic minority samples
- **D.** Report plain accuracy instead

<details markdown="1"><summary>Answer</summary>

**C.** Reaching for balanced accuracy without fixing the imbalance is the listed trap. Fix the data.

**Why not A:** Shuffling is good hygiene, but it doesn't change a 1% class ratio.

Topic: [MLA 03: Data quality, validation, and bias](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/03-data-quality-validation-and-bias.md)

</details>

### Question 18

A company has hundreds of small per-customer models on the same framework, each with sparse traffic. How should they be hosted?

- **A.** Batch transform
- **B.** One real-time endpoint per model
- **C.** Bedrock Provisioned Throughput
- **D.** A multi-model endpoint

<details markdown="1"><summary>Answer</summary>

**D.** MME shares a fleet across many models. It's a cost win when they share a framework and per-model traffic is sparse.

**Why not B:** Hundreds of mostly idle endpoints is a lot of money for nothing.

Topic: [MLA 07: Deployment infrastructure](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/07-deployment-infrastructure.md)

</details>

### Question 19

A long training job can tolerate interruption, and the team wants to cut its cost. What's the purchasing option?

- **A.** Savings Plans
- **B.** Spot instances with checkpointing
- **C.** Bedrock Provisioned Throughput
- **D.** On-demand instances

<details markdown="1"><summary>Answer</summary>

**B.** Spot plus checkpoints is the classic fault-tolerant training cost lever.

**Why not A:** Savings Plans and Reserved fit steady 24/7 endpoints, not one-off training runs.

Topic: [MLA 11: Cost and performance optimization](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/11-cost-and-performance-optimization.md)

</details>

### Question 20

A RAG app gives wrong answers, and the team keeps rewriting the generator prompt. What should they check first?

- **A.** Optimize ROUGE
- **B.** Swap to a bigger FM
- **C.** Retrieval quality on its own (recall@k, MRR)
- **D.** Raise the temperature

<details markdown="1"><summary>Answer</summary>

**C.** Measure retrieval separately from generation. Blaming the FM while retrieval fails is a listed trap.

**Why not B:** A bigger generator can't answer from chunks it never received.

Topic: [MLA 06: Model and system evaluation](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/06-model-and-system-evaluation.md)

</details>

---

**Score: __/20. Under 16? Redo the misses in 3 days.**

Log every miss: the topic, what I picked, and why it was wrong. Back to the [drills index](README.md).
