---
title: "03: AI/ML lifecycle and MLOps basics"
---

# 03: AI/ML lifecycle and MLOps basics

**Domain 1 (20%) · Task Statement 1.3**

The end-to-end path: data, model, production, then monitor and retrain. Plus where FMs come from, how you host them, the MLOps habits that keep it all from turning into a pile of notebooks, and the metrics that prove the model (and the business case) actually work.

For AIF-C01 you need to describe the lifecycle stages and pick the AWS service for each stage. You don't need to build the pipeline. That comes later in MLA-C02. But the MLOps vocabulary (monitoring, retraining, repeatability) shows up all over the scenario distractors, so it's worth getting straight now.

## What to know

### Pipeline stages (conceptual)

1. **Business problem and data**: define success metrics; collect, label, curate.
2. **Prep and features**: clean, split train/val/test. At this level know *why*, not how to code it.
3. **Train or select a model**: traditional training, or pick an FM via JumpStart or Bedrock.
4. **Evaluate**: accuracy-family metrics plus business KPIs; human review when needed.
5. **Deploy**: managed API or self-hosted endpoint.
6. **Monitor and retrain**: drift, quality, cost; feedback loops.

### FM sources

| Source | Meaning |
|---|---|
| Open-source / provider pretrained | Use through Bedrock or deploy with SageMaker JumpStart |
| Custom trained | Train your own (expensive; rare at practitioner scope) |
| Fine-tuned / customized | Adapt a pretrained FM to domain data |

### Production hosting methods

| Method | Tradeoff |
|---|---|
| **Managed API service** (e.g., Bedrock) | Lowest ops; pay per token/request; AWS runs the infra |
| **Self-hosted API** (e.g., SageMaker endpoint) | More control over instance, networking, model artifacts; you size and pay for capacity |

### MLOps fundamentals

- Experimentation with tracked results
- Repeatable processes (same data + code = same outcome)
- Scalable systems
- Managing technical debt (ad-hoc notebooks → production)
- Production readiness (latency, security, rollback)
- **Model monitoring** and **retraining** triggers

### Model vs business metrics

| Model metrics | Business metrics |
|---|---|
| Accuracy | Cost per user |
| Precision | Development costs |
| Recall | Customer feedback / CSAT |
| F1 score | ROI |

**Precision** = of the predicted positives, how many were right. **Recall** = of the actual positives, how many did you find. **F1** = the harmonic mean of the two. **High accuracy can hide terrible recall on rare fraud.** The exam loves this one.

### AWS services by stage

| Stage | Services (examples from the exam guide) |
|---|---|
| Build / train / host ML | **Amazon SageMaker AI**, JumpStart |
| GenAI apps / FMs | **Amazon Bedrock**, AgentCore |
| BI / business assistants | **Amazon Quick** |
| Developer AI IDE | **Kiro** |
| Data prep (ecosystem) | Glue, S3, Lake Formation (know they exist) |
| Monitor | CloudWatch; Model Monitor concepts |

## AWS services in play

SageMaker AI and JumpStart for build/train/host, Bedrock and AgentCore for FM apps, Quick and Kiro as the business and developer assistants, Glue/S3/Lake Formation for data, CloudWatch and Model Monitor for watching it all.

## Hands-on

- Memorize the one-liner: **Bedrock = managed FM API. SageMaker = you train and host.**
- Tie each metric to a business story. Fraud: optimize recall. Spam filter UX: balance precision.
- Sketch the six stages on paper and write one AWS service next to each.

## Exam traps

- Deploying without defining business success metrics.
- Optimizing accuracy alone on imbalanced data.
- Choosing self-hosted SageMaker when Bedrock's managed API meets the need (or the reverse, when you really do need custom weights or VPC control).
- Thinking FMs eliminate the lifecycle. You still select, evaluate, deploy, and monitor.
- Treating MLOps as "just CI/CD." It includes monitoring, retraining, and repeatability.

## Exam guide mapping

- **Task Statement 1.3**: Describe the AI/ML development lifecycle (pipeline components; FM sources; production methods; AWS services per stage; MLOps concepts; model + business metrics).

## Research links

- <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html>
- <https://aws.amazon.com/ai/generative-ai/services/>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html>