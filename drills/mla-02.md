---
title: "Drill MLA-02"
---

# Drill MLA-02

The second MLA-C02 drill. More storage and format calls, more drift and deployment strategy, and more of the GenAI pieces C02 added on top of classic ML engineering.

Closed book. About 30 minutes. Answer all 20 before you open a single answer.

---

### Question 1

Many training instances need to read the same files at the same time. Which storage fits?

- **A.** Amazon EFS
- **B.** Amazon DynamoDB
- **C.** Amazon EBS
- **D.** Feature Store online store

<details markdown="1"><summary>Answer</summary>

**A.** EFS is shared POSIX storage that many workers can mount at once.

**Why not C:** EBS is block storage for a single host. It isn't shared across instances.

Topic: [MLA 01: Data collection and storage](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/01-data-collection-and-storage.md)

</details>

### Question 2

A scaling transform runs in a notebook during training, but it's never applied at inference. Predictions in production are off. What's this?

- **A.** Concept drift
- **B.** Catastrophic forgetting
- **C.** Class imbalance
- **D.** Train/serve skew

<details markdown="1"><summary>Answer</summary>

**D.** Different transforms at training and serving time is train/serve skew. Feature Store helps keep them identical.

**Why not A:** Concept drift is the real-world label relationship changing. Here the pipeline itself is inconsistent.

Topic: [MLA 02: Data transformation and feature engineering](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/02-data-transformation-feature-engineering.md)

</details>

### Question 3

A side project has bursty, low GenAI traffic. Someone proposes Bedrock Provisioned Throughput. What should they use?

- **A.** Provisioned Throughput
- **B.** Bedrock on-demand tokens
- **C.** Reserved Instances
- **D.** A multi-model endpoint

<details markdown="1"><summary>Answer</summary>

**B.** On-demand tokens fit variable traffic.

**Why not A:** Provisioned capacity for bursty hobby traffic is a listed trap: you pay for idle.

Topic: [MLA 08: Resource provisioning and configuration](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/08-resource-provisioning-and-configuration.md)

</details>

### Question 4

The pipeline should fail when a container image has critical CVEs. Which service scans the images?

- **A.** Amazon Macie
- **B.** AWS CloudTrail
- **C.** Amazon Inspector
- **D.** AWS Config

<details markdown="1"><summary>Answer</summary>

**C.** Inspector scans ECR images and integrates with CI/CD. Fail the build on critical findings.

**Why not D:** Config tracks configuration drift (encryption, public access). It doesn't scan images for CVEs.

Topic: [MLA 12: Securing ML and AI workloads](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/12-securing-ml-ai-workloads.md)

</details>

### Question 5

You want to shift traffic to a new model gradually and roll back automatically if an alarm fires. Which deployment strategy?

- **A.** Blue/green with an instant full flip
- **B.** Redeploy over the existing endpoint in place
- **C.** Shadow
- **D.** Canary or linear

<details markdown="1"><summary>Answer</summary>

**D.** Canary and linear shift traffic gradually (CodeDeploy style). Pair them with alarm-driven rollback.

**Why not C:** Shadow traffic never reaches users, so you aren't shifting anything.

Topic: [MLA 09: CI/CD orchestration and MLOps](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md)

</details>

### Question 6

Enterprise documents change daily and every answer must cite its source. Which approach?

- **A.** A managed AI API
- **B.** Prompt engineering only
- **C.** RAG
- **D.** Fine-tuning

<details markdown="1"><summary>Answer</summary>

**C.** RAG fits docs that change often and need citations.

**Why not D:** Fine-tuning is the wrong tool when knowledge changes daily.

Topic: [MLA 04: Modeling approach selection](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/04-modeling-approach-selection.md)

</details>

### Question 7

Input feature distributions look the same as at training time, but the relationship between features and the label has changed. Which kind of drift?

- **A.** Bias drift
- **B.** Concept drift
- **C.** Data drift
- **D.** Train/serve skew

<details markdown="1"><summary>Answer</summary>

**B.** Concept drift is a change in the label relationship. Keep it separate from data drift.

**Why not C:** Data drift is a shift in the input distribution, which didn't happen here.

Topic: [MLA 10: Monitoring inference and performance](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/10-monitoring-inference-and-performance.md)

</details>

### Question 8

Automatic Model Tuning keeps spending money on trials that stopped improving long ago. What should be on?

- **A.** Early stopping
- **B.** More epochs per trial
- **C.** Turn off tuning entirely
- **D.** A larger batch size

<details markdown="1"><summary>Answer</summary>

**A.** AMT supports early stopping for non-improving trials. Also check that the objective metric matches the business goal.

**Why not B:** More epochs per trial makes each wasted trial cost more.

Topic: [MLA 05: Train, fine-tune, and customize models](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/05-train-fine-tune-customize-models.md)

</details>

### Question 9

Video files are large, processing takes a long time, and near-real-time results are fine. Which SageMaker inference option?

- **A.** Serverless inference
- **B.** Batch transform
- **C.** Async inference
- **D.** Real-time endpoint

<details markdown="1"><summary>Answer</summary>

**C.** Async queues requests and handles large payloads and long jobs. Heavy docs and video are the fit.

**Why not B:** Batch transform scores whole datasets offline. Requests are arriving one at a time here.

Topic: [MLA 07: Deployment infrastructure](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/07-deployment-infrastructure.md)

</details>

### Question 10

You want serverless data quality rules on Glue Data Catalog tables that quarantine bad rows. Which service?

- **A.** SageMaker Model Monitor
- **B.** SageMaker Ground Truth
- **C.** SageMaker Clarify
- **D.** AWS Glue Data Quality

<details markdown="1"><summary>Answer</summary>

**D.** Glue DQ runs DQDL rules on the Catalog and in ETL, scores the data, and quarantines bad rows.

**Why not C:** Clarify measures bias. It doesn't enforce row-level quality rules.

Topic: [MLA 03: Data quality, validation, and bias](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/03-data-quality-validation-and-bias.md)

</details>

### Question 11

Agent costs are spiking. Each session runs many tool loops on one big model. What's the biggest lever?

- **A.** Remove the max-tokens limit so sessions finish faster
- **B.** Cap max tool loops, and use a cheaper model for routing
- **C.** Move every step to a bigger model
- **D.** Re-embed the corpus nightly

<details markdown="1"><summary>Answer</summary>

**B.** Agent cost is sessions times steps times tokens per step. Cap loops, and route with a cheaper model.

**Why not A:** No max-tokens limit on agents is the runaway-loop trap.

Topic: [MLA 11: Cost and performance optimization](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/11-cost-and-performance-optimization.md)

</details>

### Question 12

You want to track parameters, metrics, and artifacts for every training run, and sync registered models to Model Registry. Which tool?

- **A.** SageMaker Data Wrangler
- **B.** Bedrock Prompt Management
- **C.** AWS CloudTrail
- **D.** Managed MLflow on SageMaker

<details markdown="1"><summary>Answer</summary>

**D.** Managed MLflow tracks experiments and syncs registrations to Model Registry.

**Why not B:** Prompt Management versions prompts, not training runs.

Topic: [MLA 06: Model and system evaluation](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/06-model-and-system-evaluation.md)

</details>

### Question 13

In production, data scientists have a role with sagemaker:* on everything. What should replace it?

- **A.** Separate least-privilege roles (training, endpoint execution, pipeline, SSO) scoped to project S3 prefixes
- **B.** Give everyone a shared admin role instead
- **C.** Keep it, and add a CloudTrail trail
- **D.** Use a Guardrail to block risky actions

<details markdown="1"><summary>Answer</summary>

**A.** Least privilege means separate roles with scoped prefixes.

**Why not D:** Guardrails filter model content. They don't restrict SageMaker API permissions.

Topic: [MLA 12: Securing ML and AI workloads](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/12-securing-ml-ai-workloads.md)

</details>

### Question 14

Retrieval needs keyword matching for product codes and vector similarity for meaning. Where should the vectors live?

- **A.** Amazon EBS
- **B.** Amazon EFS
- **C.** Amazon OpenSearch
- **D.** Amazon DynamoDB

<details markdown="1"><summary>Answer</summary>

**C.** OpenSearch does full-text and k-NN together, which is hybrid search.

**Why not D:** Treating DynamoDB as a full vector DB is the listed trap. The exam wants OpenSearch, pgvector, or S3 vectors.

Topic: [MLA 01: Data collection and storage](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/01-data-collection-and-storage.md)

</details>

### Question 15

A Knowledge Base was created once. The S3 docs behind it change weekly, and answers are going stale. What's the fix?

- **A.** Raise top-k
- **B.** A refresh pipeline: S3 event, then Step Functions or Lambda, then the KB ingest/sync API
- **C.** Recreate the SageMaker endpoint
- **D.** Switch to a bigger generator model

<details markdown="1"><summary>Answer</summary>

**B.** Schedule or trigger ingest jobs. Creating a KB once and never refreshing it is a listed trap.

**Why not A:** More results from a stale index are still stale.

Topic: [MLA 08: Resource provisioning and configuration](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/08-resource-provisioning-and-configuration.md)

</details>

### Question 16

PII has to be removed from a fine-tuning dataset. Which control does that?

- **A.** Mask or redact in ETL before training
- **B.** A CloudTrail trail
- **C.** A Bedrock Guardrails sensitive information filter
- **D.** KMS encryption on the bucket

<details markdown="1"><summary>Answer</summary>

**A.** Anonymization happens in the data pipeline before training. Know the stage difference.

**Why not C:** Guardrails filter at inference. The PII would already be in the training set, and in the weights.

Topic: [MLA 02: Data transformation and feature engineering](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/02-data-transformation-feature-engineering.md)

</details>

### Question 17

An A/B test showed a lift, but the prompt and the model both changed on the same day. What's wrong?

- **A.** Use host CPU as the deciding metric.
- **B.** Shorten the test so it finishes before more changes land.
- **C.** The result is confounded. Change one thing, then compare over equal duration and sample size.
- **D.** Nothing. Ship both changes.

<details markdown="1"><summary>Answer</summary>

**C.** Confounded releases make A/B results meaningless.

**Why not B:** Shorter tests make the sample problem worse, not better.

Topic: [MLA 10: Monitoring inference and performance](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/10-monitoring-inference-and-performance.md)

</details>

### Question 18

Which of these are good retraining triggers? **(Choose two.)**

- **A.** New labeled data crossing a volume threshold
- **B.** A CPU spike on the endpoint
- **C.** A data drift or model quality alarm
- **D.** Every successful training run auto-deploys

<details markdown="1"><summary>Answer</summary>

**A and C.** Schedules, drift and quality alarms, and new labeled data volume are all listed triggers.

**Why not D:** Deploying every successful run with no eval gate is a listed trap.

Topic: [MLA 09: CI/CD orchestration and MLOps](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md)

</details>

### Question 19

A chat feature has a tight latency budget. The team is debating a giant FM against a smaller one with good retrieval. Which usually wins?

- **A.** The smaller, faster FM with good retrieval
- **B.** Chain-of-thought on every request
- **C.** The largest FM available
- **D.** Fine-tuning the giant FM

<details markdown="1"><summary>Answer</summary>

**A.** A smaller FM with solid RAG often beats a giant FM with weak retrieval, at lower latency and cost.

**Why not C:** The largest FM with no regard for latency or cost is a listed trap.

Topic: [MLA 04: Modeling approach selection](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/04-modeling-approach-selection.md)

</details>

### Question 20

Retrieval returns the top 50 chunks with no reranking. Answers are noisy and the token bill is high. What's the fix?

- **A.** Raise top-k to 100
- **B.** Lower top-k and add a reranker
- **C.** Switch to a longer-context model
- **D.** Remove the metadata filters

<details markdown="1"><summary>Answer</summary>

**B.** A reranker reorders candidates for precision, so you can send fewer, better chunks.

**Why not C:** A bigger window lets you stuff in more noise for more money.

Topic: [MLA 07: Deployment infrastructure](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/07-deployment-infrastructure.md)

</details>

---

**Score: __/20. Under 16? Redo the misses in 3 days.**

Log every miss: the topic, what I picked, and why it was wrong. Back to the [drills index](README.md).
