---
title: "12: Transparency and explainability"
---

# 12: Transparency and explainability

**Domain 4 (14%) · Task Statement 4.2**

Why the people affected by an AI system need to understand it. Transparent vs opaque models, documenting things with **Model Cards** and Bedrock evaluations, human-centered design, and the real tradeoffs between **safety** and **transparency**.

Regulated and high-impact scenarios ask for explainability tools and documentation. They don't ask for SHAP math. Know *what* a Model Card captures, and know that when you're using an opaque FM, **transparency comes from process**: cards, evals, citations, and a UI that explains itself.

## What to know

### Transparent vs opaque

| More transparent | More opaque |
|---|---|
| Simple linear/logistic models, rule systems | Deep neural nets, large FMs |
| Feature importances / clear decision rules | Distributed representations; hard attribution |
| Open weights + documented training data | Closed models; limited data lineage |
| Easier to audit and contest | Needs HITL, evals, Guardrails, monitoring |

FMs are usually opaque. Transparency then comes from **process** (cards, evals, citations, UI explanations), not full mechanistic interpretability.

### Tools for transparent and explainable models

| Tool | Purpose |
|---|---|
| **Amazon SageMaker Model Cards** | One place for intended uses, risk rating, training/eval metrics, caveats; exportable for audits; versioned edits |
| **Amazon Bedrock Model Evaluation** | Compare FMs on task metrics before you pick one |
| **Open-source models / data / licensing** | Inspectability and license clarity |
| **SageMaker Clarify** | Bias detection and prediction explanations |
| **AI Service Cards** (AWS) | Intended uses, limitations, responsible design for AWS AI services |
| **RAG citations** | Show the source passages behind generated answers |

### What a Model Card captures (at least)

- Purpose, intended uses, and **not** intended uses
- Risk rating (unknown / low / medium / high)
- Training details and metrics
- Evaluation results and observations
- Ethical considerations, caveats, recommendations
- Business problem and stakeholders

### Safety vs transparency tradeoffs

- Strong safety filters may hide intermediate reasoning or refuse to show disallowed content, which reduces the user-visible "explanation."
- Highly interpretable models may underperform on complex tasks.
- Measure **interpretability** and **performance** both, and document the tradeoff on the Model Card.
- For agents, transparency includes tool traces and decision logs (observability), not just model internals.

### Human-centered design for explainable AI

- User feedback mechanisms (thumbs, corrections)
- Decision transparency in the UX ("why this recommendation?")
- Escalation to humans for high-risk outcomes
- Clear communication of uncertainty and limitations

## AWS services in play

SageMaker Model Cards, Clarify, Bedrock Model Evaluation, Guardrails, AI Service Cards, and AgentCore Observability for agent traces.

## Hands-on

- Open the SageMaker Model Cards console and look at the fields. The **risk rating** field alone is an easy recall item.
- Look at the citations your [B2](../../build.md#b2) Knowledge Base returns. That's process transparency in action.
- Rule of thumb for scenarios: "audit / governance / intended use" → **Model Cards**. Opaque LLM + enterprise Q&A → citations + Guardrails + HITL, not "switch to linear regression" (unless explainability really is the primary requirement).

## Exam traps

- Equating "open-source weights" with "fully explained decisions."
- Skipping Model Cards because the model is a third-party FM on Bedrock. You still document *your* application's intended use.
- Cranking safety filters to the max and removing every user-facing explanation. That's bad human-centered design.
- Demanding full FM interpretability as a hard requirement when process transparency is enough.

## Exam guide mapping

- **Task Statement 4.2**: Transparent and explainable models (transparent vs not; Model Cards, Bedrock evaluations, open source/data/licensing; safety vs transparency tradeoffs; human-centered design principles).

## Research links

- <https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html>
- <https://aws.amazon.com/ai/responsible-ai/>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-bias.html>
- <https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-inference-architecture-and-best-practices-on-aws/implementing-security-rai.html>
- <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html>