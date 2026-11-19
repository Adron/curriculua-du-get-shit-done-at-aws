---
title: "12: Input/output safety controls"
---

# 12: Input/output safety controls

**Domain 3 · Task 3.1 · Skills 3.1.1-3.1.5**

The defense layers that keep harmful prompts and outputs away from production FMs: Bedrock Guardrails (content, topics, words, PII, grounding, prompt attack), custom moderation workflows, hallucination grounding, and adversarial/jailbreak detection.

Domain 3 opens with safety, and it's specific. Expect Guardrails configs, grounding for RAG, defense-in-depth (Comprehend, then Guardrails, then Lambda post-checks, then API filters), and the nuances of prompt-attack tagging. **A system prompt that says "please be safe" is not a control.** It's a wish.

## What to know

- **Guardrails everywhere inference happens:** Converse (`guardrailConfig`), Agents, KB RetrieveAndGenerate, Flow nodes. Tune filter strength per category; the Standard tier adds stronger prompt-attack and code-domain protections.
- **Prompt attacks:** enable `PROMPT_ATTACK`, and **tag user inputs** on InvokeModel paths or attacks may not get filtered. Tool results and tool specs are not evaluated by the prompt-attack filter.
- **Grounding:** contextual grounding checks against retrieved passages; JSON Schema / constrained decoding for deterministic shapes (for example, text-to-SQL allowlists).
- **Defense-in-depth:** Comprehend toxicity/PII pre-filter, then Guardrails at the model, then Lambda schema and business-rule validation, then API Gateway response filters.
- **Adversarial testing:** automated jailbreak suites in CI; monitor blocked-input rates and false positives.

## AWS services in play

Amazon Bedrock Guardrails, Amazon Bedrock Knowledge Bases, Amazon Comprehend, AWS Lambda, AWS Step Functions, Amazon API Gateway, Amazon CloudWatch.

## Hands-on

1. A Guardrail with hate/violence + prompt attack + PII masking, attached to Converse and to a Flow prompt node. This is the grown-up version of [B3](../../build.md#b3), and it lands in [B11](../../build.md#b11).
2. A RAG app with contextual grounding; log the grounding scores.
3. A red-team pack of jailbreak prompts, with automated tests asserting Block actions.

## Exam traps

- Guardrails on embedding, image-gen, or rerank models (unsupported).
- No user-input tags, so prompt injection slips through on InvokeModel.
- Relying only on "please be safe" system prompts.
- A grounding check without actually retrieving source context.

## Exam guide mapping

- **Task 3.1**, Skills 3.1.1-3.1.5: implement input and output safety controls.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-supported.html>