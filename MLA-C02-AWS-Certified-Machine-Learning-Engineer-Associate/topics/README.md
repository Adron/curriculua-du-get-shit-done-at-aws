---
title: "MLA-C02 topics"
---

# MLA-C02 topics

Every topic note for MLA-C02, in order. The [punch list](../PUNCH-LIST.md) has the same list with checkboxes; this is the plain index.


## Domain 1: Data Preparation for ML and AI (28%)

- [01: Data collection and storage](01-data-collection-and-storage.md): S3/EBS/EFS/RDS/DynamoDB/OpenSearch; Parquet/JSON/CSV/ORC; Kinesis/Flink/Kafka; vector DBs; Feature Store ingest
- [02: Data transformation & feature engineering](02-data-transformation-feature-engineering.md): Glue/DataBrew/EMR/Data Wrangler; Feature Store; embeddings; text prep; RAG chunking; anonymization; FM fine-tune data prep
- [03: Data quality, validation, and bias](03-data-quality-validation-and-bias.md): Glue Data Quality; labeling; bias mitigation; class imbalance; AI training data integrity; cleaning

## Domain 2: ML Model and FM Development (24%)

- [04: Modeling approach selection](04-modeling-approach-selection.md): Bedrock FM selection; fine-tune strategies; ML vs GenAI vs managed AI; RAG patterns; cost/latency tradeoffs
- [05: Train, fine-tune, customize models](05-train-fine-tune-customize-models.md): SageMaker built-ins/script mode; AMT/HPO; distributed training; overfitting/catastrophic forgetting; prompt engineering; retrieval/embedding optimization
- [06: Model and system evaluation](06-model-and-system-evaluation.md): MLflow; Bedrock evaluations/Prompt Management; baselines/drift; shadow variants; explainability; BLEU/ROUGE/BERTScore; LLM-as-judge; RAG monitoring

## Domain 3: Deployment and Orchestration (24%)

- [07: Deployment infrastructure](07-deployment-infrastructure.md): compute/targets; multi-model/container; real-time vs batch; FM deployment; Custom Model Import; agents; RAG retrieval/reranking
- [08: Resource provisioning and configuration](08-resource-provisioning-and-configuration.md): on-demand vs provisioned; containers; VPC endpoints; SDK/CLI/Boto3; autoscaling; Knowledge Bases; agent state; GPU scaling; agentic infra
- [09: CI/CD & orchestration (MLOps)](09-cicd-orchestration-mlops.md): CodePipeline/Build/Deploy; rollback; automated testing; retrain; Model Registry/MLflow; Prompt Management; agent versioning; RAG/KB refresh pipelines

## Domain 4: Operating, Monitoring, Securing (24%)

- [10: Monitoring inference and performance](10-monitoring-inference-and-performance.md): CloudWatch GenAI observability; Bedrock Model Evaluation; drift; A/B; agent coordination failures; FM evals
- [11: Cost and performance optimization](11-cost-and-performance-optimization.md): instance families; AgentCore Observability; X-Ray; dashboards; purchasing options; token/embedding/vector DB cost patterns
- [12: Securing ML/AI workloads](12-securing-ml-ai-workloads.md): Inspector/CodeGuru; least privilege; IAM; CloudTrail/Config; encryption; network isolation; secrets; Guardrails/content safety

Back to the [MLA-C02 README](../README.md)
