# 12 — Transparency and explainability

**Domain 4 (14%) · Task Statement 4.2**

## What it is

Why stakeholders need to understand AI systems: transparent vs opaque models, documentation via **Model Cards** and Bedrock evaluations, human-centered design, and tradeoffs between **safety** and **transparency**.

## Why it matters for AIF-C01

Regulated and high-impact scenarios ask for explainability tools and documentation — not deep SHAP math. Know *what* Model Cards capture and when opaque FMs need compensating controls.

## What to know for the exam

### Transparent / explainable vs not

| More transparent | More opaque |
|---|---|
| Simple linear/logistic models, rule systems | Deep neural nets, large FMs |
| Feature importances / clear decision rules | Distributed representations; hard attribution |
| Open weights + documented training data | Closed models; limited data lineage |
| Easier audit & contestability | Need HITL, evals, Guardrails, monitoring |

FMs are often opaque; transparency then comes from **process** (cards, evals, citations, UI explanations), not full mechanistic interpretability.

### Tools for transparent / explainable models

| Tool | Purpose |
|---|---|
| **Amazon SageMaker Model Cards** | Single place for intended uses, risk rating, training/eval metrics, caveats; exportable for audits; versioned edits |
| **Amazon Bedrock Model Evaluation** | Compare FMs on task metrics before selection |
| **Open-source models / data / licensing** | Inspectability and license clarity |
| **SageMaker Clarify** | Bias detection and prediction explanations |
| **AI Service Cards** (AWS) | Intended uses, limitations, responsible design for AWS AI services |
| **RAG citations** | Show source passages for generated answers |

### Model Cards — capture at least

- Purpose / intended uses / **not** intended uses
- Risk rating (unknown/low/medium/high)
- Training details & metrics
- Evaluation results & observations
- Ethical considerations, caveats, recommendations
- Business problem / stakeholders

### Safety vs transparency tradeoffs

- Strong safety filters may hide intermediate reasoning or refuse to show disallowed content — reducing user-visible “explanation.”
- Highly interpretable models may underperform complex tasks.
- Measure both **interpretability** and **performance**; document tradeoffs on the Model Card.
- For agents, transparency includes tool traces and decision logs (observability), not only model internals.

### Human-centered design for explainable AI

- User-feedback mechanisms (thumbs, corrections)
- AI decision transparency in the UX (why this recommendation?)
- Escalation to humans for high-risk outcomes
- Clear communication of uncertainty and limitations

## AWS services involved

SageMaker Model Cards, Clarify, Bedrock Model Evaluation, Guardrails, AI Service Cards, AgentCore Observability (for agent traces).

## Practical study tips

- If the scenario says “audit / governance / intended use,” answer **Model Cards**.
- Opaque LLM + enterprise Q&A → citations + Guardrails + HITL, not “switch to linear regression” unless explainability is the primary requirement.
- Risk rating field on Model Cards is an easy recall item.

## Common exam traps

- Equating “open-source weights” with “fully explained decisions.”
- Skipping Model Cards because the model is a third-party FM on Bedrock (still document *your* application’s intended use).
- Maximizing safety filters while removing all user-facing explanation (bad human-centered design).
- Demanding full FM interpretability as a hard requirement when process transparency suffices.

## Exam guide mapping

- **Task Statement 4.2** — Transparent and explainable models (transparent vs not; Model Cards, Bedrock evaluations, open source/data/licensing; safety vs transparency tradeoffs; human-centered design principles).

## Research links

- https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html
- https://aws.amazon.com/ai/responsible-ai/
- https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-bias.html
- https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-inference-architecture-and-best-practices-on-aws/implementing-security-rai.html
- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
