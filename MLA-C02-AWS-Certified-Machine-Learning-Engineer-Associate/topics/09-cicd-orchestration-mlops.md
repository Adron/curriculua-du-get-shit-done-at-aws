# 09 — CI/CD orchestration and MLOps

**Domain 3 · Task 3.3** · Skills **3.3.1–3.3.11** · Domain weight **24%**

## What it is

Automating train → evaluate → register → deploy → retrain, including GenAI assets: prompts, agents, fine-tuned FM versions, and Knowledge Base refresh pipelines.

## Why it matters for MLA-C02

C02 adds **Prompt Management**, **agent deployment/versioning**, **prompt testing**, **FM deploy automation with fine-tuned versions**, and **RAG/KB refresh orchestration** on top of Code* services and Model Registry/MLflow.

## Exam-relevant skills map

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

## Reference MLOps pipeline

```text
Source (CodeCommit/Git via CodeConnections)
  → Build (CodeBuild: lint, unit tests, image build → ECR)
  → Train / Fine-tune (SageMaker / Bedrock job)
  → Evaluate (gates: metrics, Bedrock eval, prompt tests)
  → Register (MLflow / Model Registry / Prompt version / Agent version)
  → Deploy (CodeDeploy/CFN/SageMaker endpoint update / Bedrock alias)
  → Monitor → EventBridge → Retrain
```

Also in-scope orchestrators: **SageMaker Pipelines**, **Step Functions**, **MWAA**, **EventBridge**.

## Deployment strategies & rollback

| Strategy | Note |
|---|---|
| Blue/green | Two environments; flip traffic |
| Canary / linear | Gradual traffic shift (CodeDeploy style) |
| Shadow | Candidate gets copied traffic (eval topic) |
| Rollback | Keep previous model package / endpoint config / prompt version; automate on alarm |

## Version everything

| Artifact | Registry |
|---|---|
| Model weights | SageMaker Model Registry (+ MLflow sync) |
| Prompts | Bedrock Prompt Management |
| Agents | Agent version IDs / AgentCore harness configs |
| Containers | ECR image digests |
| KB content | Ingest job IDs / data source sync status |

MLflow register can auto-create Model Package versions for auditability.

## Testing in pipelines (ML + AI)

- Unit: transforms, feature code, tool handlers  
- Contract: schema of model I/O / JSON tool calls  
- Offline eval: holdout metrics, BLEU/ROUGE/judge scores vs threshold  
- **Prompt regression suite**: golden prompts must not regress  
- Smoke invoke on staging endpoint / Bedrock alias before prod  

## Retrain triggers

- Schedule (cron / EventBridge)
- Data drift / model quality alarms
- New labeled data volume threshold
- Manual approval step in CodePipeline for prod

## RAG / KB refresh (3.3.11)

Pipeline pattern:

1. New docs land in S3  
2. Validate/ Quarantine (Glue DQ)  
3. Trigger KB ingestion / sync  
4. Optional retrieval eval job (hit@k)  
5. Only then promote app config that points at new index version  

Don’t silently refresh production index without a quality gate.

## AWS services

CodePipeline, CodeBuild, CodeDeploy, CodeCommit, CodeConnections, CodeArtifact, SageMaker Pipelines, Model Registry, MLflow, Step Functions, EventBridge, MWAA, Bedrock Prompt Management, Bedrock Agents/AgentCore, CloudFormation/CDK.

## Hands-on practice

1. CodePipeline: build image → SageMaker train → register if F1 ≥ threshold → deploy.
2. Version two prompts in Prompt Management; CI job fails if judge score drops >X%.
3. EventBridge rule on Model Monitor alarm → start Pipeline execution.
4. S3 → Step Functions → StartIngestionJob on KB → eval step → notify.
5. Blue/green endpoint update with automated rollback alarm.

## Common traps

- Deploying every successful train without an eval gate.
- No rollback path for prompts/agents (only for models).
- Refreshing KB continuously without retrieval regression tests.
- Using CodeCommit-only mental model — CodeConnections to GitHub/etc. is in scope.
- Skipping approval stages for production FM aliases.

## Research links

- https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow-track-experiments-model-registration.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html
- https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines.html
- https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf
