---
title: "09: CI/CD orchestration and MLOps"
---

# 09: CI/CD orchestration and MLOps

**Domain 3 (24%) · Task 3.3 · Skills 3.3.1-3.3.11**

Automating the loop: train, evaluate, register, deploy, retrain. And in C02 that loop includes the GenAI pieces too: prompts, agents, fine-tuned FM versions, and Knowledge Base refresh pipelines.

On top of the Code* services and Model Registry/MLflow, C02 adds **Prompt Management**, **agent deployment and versioning**, **prompt testing**, **FM deploy automation with fine-tuned versions**, and **RAG/KB refresh orchestration**.

**If it can change the behavior of the system, it gets a version and a gate.** Model weights, prompts, agent configs, container images, the index. All of it. A prompt edit is a deploy, whether anybody admits it or not.

## What to know

### Skills map

| Skill | Focus |
|---|---|
| 3.3.1 | Deploy strategies + rollback |
| 3.3.2 | CodeBuild, CodeCommit, CodeDeploy, CodePipeline, CodeConnections |
| 3.3.3 | Configure training & inference jobs |
| 3.3.4 | Automated testing in CI/CD (ML + AI) |
| 3.3.5 | Retrain mechanisms |
| 3.3.6 | Model versions (Model Registry, MLflow) |
| 3.3.7 | Prompt Management |
| 3.3.8 | Agent deploy pipelines & versioning |
| 3.3.9 | AI testing incl. prompt tests |
| 3.3.10 | FM deploy automation + fine-tuned versioning |
| 3.3.11 | RAG/KB refresh pipeline orchestration |

### Reference MLOps pipeline

```text
Source (CodeCommit/Git via CodeConnections)
  → Build (CodeBuild: lint, unit tests, image build → ECR)
  → Train / Fine-tune (SageMaker / Bedrock job)
  → Evaluate (gates: metrics, Bedrock eval, prompt tests)
  → Register (MLflow / Model Registry / Prompt version / Agent version)
  → Deploy (CodeDeploy/CFN/SageMaker endpoint update / Bedrock alias)
  → Monitor → EventBridge → Retrain
```

Other in-scope orchestrators: **SageMaker Pipelines**, **Step Functions**, **MWAA**, **EventBridge**.

### Deployment strategies and rollback

| Strategy | Note |
|---|---|
| Blue/green | Two environments; flip traffic |
| Canary / linear | Gradual traffic shift (CodeDeploy style) |
| Shadow | Candidate gets copied traffic (eval topic) |
| Rollback | Keep previous model package / endpoint config / prompt version; automate on alarm |

### Version everything

| Artifact | Registry |
|---|---|
| Model weights | SageMaker Model Registry (+ MLflow sync) |
| Prompts | Bedrock Prompt Management |
| Agents | Agent version IDs / AgentCore harness configs |
| Containers | ECR image digests |
| KB content | Ingest job IDs / data source sync status |

Registering in MLflow can auto-create Model Package versions, which is handy for auditability.

### Testing in pipelines (ML + AI)

- Unit: transforms, feature code, tool handlers
- Contract: schema of model I/O and JSON tool calls
- Offline eval: holdout metrics, BLEU/ROUGE/judge scores vs a threshold
- **Prompt regression suite**: golden prompts must not regress
- Smoke-invoke the staging endpoint or Bedrock alias before prod

### Retrain triggers

- Schedule (cron / EventBridge)
- Data drift or model quality alarms
- New labeled data crossing a volume threshold
- Manual approval step in CodePipeline for prod

### RAG / KB refresh (3.3.11)

Pipeline pattern:

1. New docs land in S3
2. Validate / quarantine (Glue DQ)
3. Trigger KB ingestion / sync
4. Optional retrieval eval job (hit@k)
5. Only then promote the app config that points at the new index version

**Don't silently refresh a production index without a quality gate.**

## AWS services in play

CodePipeline, CodeBuild, CodeDeploy, CodeCommit, CodeConnections, CodeArtifact, SageMaker Pipelines, Model Registry, MLflow, Step Functions, EventBridge, MWAA, Bedrock Prompt Management, Bedrock Agents/AgentCore, and CloudFormation/CDK.

## Hands-on

1. CodePipeline: build image, SageMaker train, register if F1 ≥ threshold, deploy. This is the backbone of [B7](../../build.md#b7) for the tag classifier.
2. Version two prompts in Prompt Management. The CI job fails if the judge score drops more than X%.
3. EventBridge rule on a Model Monitor alarm starts a Pipeline execution.
4. S3, then Step Functions, then StartIngestionJob on the KB, then an eval step, then notify. For the build: a new blog post lands, the archive pipeline from [B4](../../build.md#b4) picks it up, the KB re-syncs, and the [B6](../../build.md#b6) question set runs before anything gets promoted.
5. Blue/green endpoint update with an automated rollback alarm.

## Exam traps

- Deploying every successful training run without an eval gate.
- Having a rollback path for models but not for prompts or agents.
- Refreshing the KB continuously without retrieval regression tests.
- A CodeCommit-only mental model. CodeConnections to GitHub and friends is in scope.
- Skipping approval stages for production FM aliases.

## Exam guide mapping

- **Domain 3 (24%) · Task 3.3 · Skills 3.3.1-3.3.11**: CI/CD orchestration and MLOps.

## Research links

- <https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow-track-experiments-model-registration.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html>
- <https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines.html>
- <https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf>