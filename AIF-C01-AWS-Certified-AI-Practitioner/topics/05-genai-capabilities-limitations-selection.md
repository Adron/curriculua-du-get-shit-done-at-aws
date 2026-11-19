---
title: "05: GenAI capabilities, limitations, and selection"
---

# 05: GenAI capabilities, limitations, and selection

**Domain 2 (24%) · Task Statement 2.2**

An honest look at what GenAI is good at, where it falls over (hallucinations, mainly), how to pick a model for a real business problem, and which business metrics prove it was worth it.

The exam keeps setting up "use GenAI vs don't" and "which model factors matter" scenarios. The trick is to name the limitations **without** throwing GenAI out entirely. The right answer is usually "yes, and mitigate it": RAG, Guardrails, human-in-the-loop, evals. That's also how I'd pitch it to a client.

## What to know

### Advantages of GenAI

- **Adaptability**: one FM, many tasks, just by changing the prompt.
- **Responsive, conversational** UX.
- **Content generation**: drafts, code, media, summaries.
- Fast experimentation and a much lower barrier than training from scratch.

### Disadvantages and limitations

| Limitation | Implication |
|---|---|
| **Hallucinations** | Fluent, confident, false |
| Interpretability | Hard to explain why a given token was chosen |
| Inaccuracy | Needs grounding, validation, citations |
| Nondeterminism | Same prompt can vary (temperature/sampling) |
| Data leakage / IP / privacy risks | Needs controls (see Domains 4-5) |
| Cost and latency at scale | Token bills; long contexts |

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

**Pair model metrics (toxicity, groundedness) with business KPIs.** The exam guide expects both, and so does anyone signing the check.

## AWS services in play

- **Amazon Bedrock**: pick from many FMs, evaluate with Model Evaluation, ground with Knowledge Bases, filter with Guardrails.
- **SageMaker AI**: when you need custom hosting, fine-tuning, or eval pipelines.
- **Amazon Quick**: business-user GenAI over enterprise data (selection by persona).

## Hands-on

- For every GenAI proposal you read, write down one advantage, one limitation, and one mitigation.
- Run the same factual question through two or three models in the Bedrock playground and compare answers, latency, and cost. That's [B1](../../build.md#b1).
- Cheat sheet: compliance-sensitive + enterprise data → Bedrock + RAG + Guardrails, **before** you even think about fine-tuning.

## Exam traps

- Claiming GenAI is accurate because it "sounds confident."
- Picking the biggest model and ignoring cost and latency.
- Skipping business metrics ("model accuracy is enough").
- Using GenAI where a deterministic system or purpose-built AI service is required.
- Treating nondeterminism as a bug. It isn't. Control it with temperature/top-p and eval harnesses.

## Exam guide mapping

- **Task Statement 2.2**: Capabilities and limitations of GenAI (advantages; disadvantages including hallucinations; selection factors; business value metrics).

## Research links

- <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html>
- <https://aws.amazon.com/ai/responsible-ai/>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html>
- <https://aws.amazon.com/certification/certified-ai-practitioner/>