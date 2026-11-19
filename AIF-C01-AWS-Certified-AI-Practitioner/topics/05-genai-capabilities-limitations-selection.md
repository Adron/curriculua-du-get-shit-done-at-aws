# 05 — GenAI capabilities, limitations, and selection

**Domain 2 (24%) · Task Statement 2.2**

## What it is

Honest appraisal of what GenAI does well, where it fails (especially hallucinations), how to choose a model for a business problem, and which business metrics prove value.

## Why it matters for AIF-C01

Scenario questions pit “use GenAI” vs “don’t” and “which model factors matter.” You must cite limitations without rejecting GenAI entirely — mitigate with RAG, Guardrails, HITL, evals.

## What to know for the exam

### Advantages of GenAI

- **Adaptability** — one FM → many tasks via prompts
- **Responsiveness / conversational** UX
- **Content generation** — drafts, code, media, summaries
- Fast experimentation; lower barrier vs training from scratch

### Disadvantages / limitations

| Limitation | Implication |
|---|---|
| **Hallucinations** | Fluent but false statements |
| Interpretability | Hard to explain why a token was chosen |
| Inaccuracy | Needs grounding, validation, citations |
| Nondeterminism | Same prompt can vary (temperature/sampling) |
| Data leakage / IP / privacy risks | Need controls (see Domains 4–5) |
| Cost & latency at scale | Token bills; long contexts |

**Hallucination mitigation (preview of D3/D5):** RAG grounding, citations, Guardrails contextual grounding checks, output validation, human review, lower temperature for factual tasks.

### Selection factors for GenAI models

| Factor | Questions to ask |
|---|---|
| Model type / modality | Text only? Image? Multimodal? |
| Performance / quality | Accuracy on *your* eval set |
| Capabilities | Reasoning, tools, languages, code |
| Constraints | Context length, rate limits |
| Compliance | Data residency, training-data use, licenses |
| Cost | $/1K tokens; provisioned throughput |
| Latency | Interactive vs batch |
| Complexity | Ops burden of custom vs managed |

### Business value metrics

Cross-domain performance, **ROI**, efficiency, conversion rate, ARPU, accuracy, customer lifetime value, task completion, CSAT, cost per interaction.

Pair **model metrics** (toxicity, groundedness) with **business KPIs** — exam guide expects both.

## AWS services involved

- **Amazon Bedrock** — choose among many FMs; evaluate with Model Evaluation; ground with Knowledge Bases; filter with Guardrails
- **SageMaker AI** — when you need custom host/fine-tune/eval pipelines
- **Amazon Quick** — business-user GenAI over enterprise data (selection by persona)

## Practical study tips

- For every “GenAI proposal,” list one advantage, one limitation, one mitigation.
- Selection cheat sheet: compliance-sensitive + enterprise data → Bedrock + RAG + Guardrails before fine-tuning.
- Nondeterminism ≠ bug; control with temperature/top-p and eval harnesses.

## Common exam traps

- Claiming GenAI is always accurate because it “sounds confident.”
- Picking the largest model ignoring cost/latency.
- Skipping business metrics (“model accuracy is enough”).
- Using GenAI where a deterministic system or purpose-built AI service is required.

## Exam guide mapping

- **Task Statement 2.2** — Capabilities and limitations of GenAI (advantages; disadvantages including hallucinations; selection factors; business value metrics).

## Research links

- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html
- https://aws.amazon.com/ai/responsible-ai/
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
- https://aws.amazon.com/certification/certified-ai-practitioner/
