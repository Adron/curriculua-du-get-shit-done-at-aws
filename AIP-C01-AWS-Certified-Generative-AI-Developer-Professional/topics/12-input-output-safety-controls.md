# 12 — Input/output safety controls

**Exam map:** Domain 3 · Task **3.1** · Skills **3.1.1–3.1.5**

## What it is

Defense layers that keep harmful prompts/outputs out of production FMs: Bedrock Guardrails (content, topics, words, PII, grounding, prompt attack), custom moderation workflows, hallucination grounding, and adversarial/jailbreak detection.

## Why it matters for AIP-C01

Domain 3 opens with safety. Expect Guardrails configs, grounding for RAG, defense-in-depth (Comprehend → Guardrails → Lambda post-checks → API filters), and prompt-attack tagging nuances.

## Production implementation notes

- **Guardrails everywhere inference happens:** Converse/`guardrailConfig`, Agents, KB RetrieveAndGenerate, Flow nodes. Tune filter strength per category; Standard tier adds stronger prompt-attack/code-domain protections.
- **Prompt attacks:** enable `PROMPT_ATTACK`; **tag user inputs** for InvokeModel paths or attacks may not filter; tool results/tool specs are not evaluated by the prompt-attack filter.
- **Grounding:** contextual grounding checks vs retrieved passages; JSON Schema / constrained decoding for deterministic shapes (e.g., text-to-SQL allowlists).
- **Defense-in-depth:** Comprehend toxicity/PII pre-filter → Guardrails at model → Lambda schema/business-rule validation → API Gateway response filters.
- **Adversarial testing:** automated jailbreak suites in CI; monitor blocked-input rates and false positives.

## AWS services

Amazon Bedrock Guardrails, Amazon Bedrock Knowledge Bases, Amazon Comprehend, AWS Lambda, AWS Step Functions, Amazon API Gateway, Amazon CloudWatch.

## Exam traps

- Guardrails on embeddings/image-gen/rerank models (unsupported).
- No user-input tags → prompt injection slips through on InvokeModel.
- Relying only on model “please be safe” system prompts.
- Grounding check without actually retrieving source context.

## Hands-on project ideas

1. Guardrail with hate/violence + prompt attack + PII mask; attach to Converse and a Flow prompt node.
2. RAG app with contextual grounding; log grounding scores.
3. Red-team pack of jailbreak prompts; assert Block actions in automated tests.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-supported.html
