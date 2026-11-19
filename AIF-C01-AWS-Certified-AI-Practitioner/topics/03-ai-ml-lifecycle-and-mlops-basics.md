# 03 — AI/ML lifecycle and MLOps basics

**Domain 1 (20%) · Task Statement 1.3**

## What it is

End-to-end path from data → model → production → monitor/retrain, including where FMs come from, how you host them, MLOps habits, and which metrics prove the model (and business) work.

## Why it matters for AIF-C01

You must describe lifecycle stages and pick AWS services per stage — without implementing pipelines. MLOps vocabulary (monitoring, retraining, repeatability) shows up in scenario distractors.

## What to know for the exam

### Pipeline stages (conceptual)

1. **Business problem & data** — define success metrics; collect/label/curate.
2. **Prep & features** — clean, split train/val/test (practitioner: know *why*, not how to code).
3. **Train / select model** — traditional training, or select FM / JumpStart / Bedrock model.
4. **Evaluate** — accuracy family + business KPIs; human review when needed.
5. **Deploy** — managed API or self-hosted endpoint.
6. **Monitor & retrain** — drift, quality, cost; feedback loops.

### FM sources

| Source | Meaning |
|---|---|
| Open-source / provider pretrained | Use via Bedrock or deploy via SageMaker JumpStart |
| Custom trained | Train your own (expensive; rare for practitioner scope) |
| Fine-tuned / customized | Adapt a pretrained FM to domain data |

### Production hosting methods

| Method | Tradeoff |
|---|---|
| **Managed API service** (e.g., Bedrock) | Lowest ops; pay per token/request; AWS runs infra |
| **Self-hosted API** (e.g., SageMaker endpoint) | More control over instance, networking, model artifacts; you size/pay for capacity |

### MLOps fundamentals

- Experimentation with tracked results
- Repeatable processes (same data/code → same outcome)
- Scalable systems
- Managing technical debt (ad-hoc notebooks → production)
- Production readiness (latency, security, rollback)
- **Model monitoring** and **re-training** triggers

### Model vs business metrics

| Model metrics | Business metrics |
|---|---|
| Accuracy | Cost per user |
| Precision | Development costs |
| Recall | Customer feedback / CSAT |
| F1 score | ROI |

**Precision** = of predicted positives, how many correct. **Recall** = of actual positives, how many found. **F1** = harmonic mean. High accuracy can hide poor recall on rare fraud — exam loves this.

## AWS services by stage (exam examples)

| Stage | Services (examples from exam guide) |
|---|---|
| Build / train / host ML | **Amazon SageMaker AI**, JumpStart |
| GenAI apps / FMs | **Amazon Bedrock**, AgentCore |
| BI / business assistants | **Amazon Quick** |
| Developer AI IDE | **Kiro** |
| Data prep (ecosystem) | Glue, S3, Lake Formation (know existence) |
| Monitor | CloudWatch; Model Monitor concepts |

## Practical study tips

- Memorize: Bedrock = managed FM API; SageMaker = you train/host.
- Tie each metric to a business story (fraud: optimize recall; spam filter UX: balance precision).
- MLOps ≠ “CI/CD only” — include monitoring + retraining + repeatability.

## Common exam traps

- Deploying without defining business success metrics.
- Optimizing accuracy alone on imbalanced data.
- Choosing self-hosted SageMaker when Bedrock’s managed API meets the need (or reverse when you need custom weights/VPC control).
- Thinking FMs eliminate the lifecycle (still: select → evaluate → deploy → monitor).

## Exam guide mapping

- **Task Statement 1.3** — Describe the AI/ML development lifecycle (pipeline components; FM sources; production methods; AWS services per stage; MLOps concepts; model + business metrics).

## Research links

- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
- https://aws.amazon.com/ai/generative-ai/services/
- https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html
