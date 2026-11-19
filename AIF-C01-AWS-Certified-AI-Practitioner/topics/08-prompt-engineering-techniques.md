---
title: "08: Prompt engineering techniques"
---

# 08: Prompt engineering techniques

**Domain 3 (28%) · Task Statement 3.2**

How to build a prompt (context, instructions, negative prompts), the standard techniques (chain-of-thought, zero/few-shot, templates), the benefits and the risks (jailbreaking, hijacking), and **Amazon Bedrock Prompt Management** for keeping versions straight.

Prompting is the cheapest customization lever you've got, so it's always the first one to pull. The exam isn't testing whether you write pretty prompts. It's testing whether you know the **technique names**, **when to use each**, and **how prompts get attacked**.

## What to know

### Prompt constructs

| Element | Role |
|---|---|
| **Instruction** | What the model should do |
| **Context** | Background, retrieved docs, state |
| **Examples** | Demonstrations of the desired input/output |
| **Negative prompts** | What to avoid (style, topics, formats) |
| **Variables** | Placeholders filled at runtime (Prompt Management) |

### Techniques

| Technique | Definition | When |
|---|---|---|
| **Zero-shot** | Instruction only, no examples | Simple, well-known tasks |
| **Single-shot** | One example | Light steering |
| **Few-shot** | Several examples | Format/style consistency |
| **Chain-of-thought (CoT)** | Ask the model to reason step by step | Multi-step reasoning, math/logic |
| **Prompt templates** | Reusable structured prompts with variables | Apps, flows, consistency |

### Benefits and best practices

- Better responses through specificity and concision
- Experimentation to discover what actually works
- Guardrails plus clear boundaries in the prompt
- Multiple comments/sections for structure
- Version and A/B compare variants

### Risks and limitations

| Risk | Meaning |
|---|---|
| **Jailbreaking** | User tricks the model into ignoring safety/policy |
| **Hijacking** | Injected instructions override the system's intent |
| **Prompt injection / poisoning** | Malicious content in user input or retrieved data changes behavior |
| **Exposure** | Sensitive system prompts or secrets leak into output |

Mitigate with Bedrock Guardrails (including prompt attack filters), least privilege on tools, input/output filtering, and **never putting secrets in prompts**.

### Amazon Bedrock Prompt Management

- Create, edit, and save reusable prompts with **variables**
- Select a model or inference profile; set inference configs
- Create **variants**, test them side by side, save **versions**
- Integrate through the inference APIs or **Amazon Bedrock Flows** (prompt node)
- Console **prompt builder** for visual iteration

## AWS services in play

Bedrock Prompt Management, Bedrock Flows, Guardrails, and the underlying FMs through the Converse/Invoke APIs.

## Hands-on

- Map each technique to a one-line scenario: CoT for multi-step reasoning, few-shot for locking in a JSON format.
- In Prompt Management, build one prompt with a variable, make two variants, and compare them side by side. Ten minutes and you'll never forget what the feature does: **versioning + variants + variables**, not a different model.
- Any prompt a user can touch gets a Guardrail. Trying to break one is part of [B3](../../build.md#b3).

## Exam traps

- Using few-shot when you need RAG for fresh facts. Examples are not a knowledge base.
- Assuming prompts alone stop jailbreaks. You need Guardrails and app-level controls.
- Confusing negative prompts with Guardrails denied topics. Related idea, different control plane.
- Forgetting versioning when multiple teams edit production prompts.

## Exam guide mapping

- **Task Statement 3.2**: Choose effective prompt engineering techniques (constructs; CoT/zero/few-shot/templates; benefits/best practices; risks including jailbreak/hijacking; Bedrock Prompt Management versioning).

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html>
- <https://aws.amazon.com/ai/responsible-ai/>
- <https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html>