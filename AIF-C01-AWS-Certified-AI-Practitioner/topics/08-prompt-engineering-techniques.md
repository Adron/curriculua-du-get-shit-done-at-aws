# 08 — Prompt engineering techniques

**Domain 3 (28%) · Task Statement 3.2**

## What it is

How to construct prompts (context, instructions, negative prompts), standard techniques (CoT, zero/few-shot, templates), benefits/risks (jailbreak, hijacking), and **Amazon Bedrock Prompt Management** for versioning.

## Why it matters for AIF-C01

Cheapest customization lever. Exam tests technique names, when to use them, and prompt security risks — not creative writing skill.

## What to know for the exam

### Prompt constructs

| Element | Role |
|---|---|
| **Instruction** | What the model should do |
| **Context** | Background, retrieved docs, state |
| **Examples** | Demonstrations of desired I/O |
| **Negative prompts** | What to avoid (style, topics, formats) |
| **Variables** | Placeholders filled at runtime (Prompt Management) |

### Techniques

| Technique | Definition | When |
|---|---|---|
| **Zero-shot** | Instruction only, no examples | Simple, well-known tasks |
| **Single-shot** | One example | Light steering |
| **Few-shot** | Several examples | Format/style consistency |
| **Chain-of-thought (CoT)** | Ask model to reason step-by-step | Multi-step reasoning, math/logic |
| **Prompt templates** | Reusable structured prompts with variables | Apps, flows, consistency |

### Benefits & best practices

- Better response quality via specificity and concision
- Experimentation / discovery of what works
- Guardrails + clear boundaries in the prompt
- Multiple comments/sections for structure
- Version and A/B compare variants

### Risks and limitations

| Risk | Meaning |
|---|---|
| **Jailbreaking** | User tricks model into ignoring safety/policy |
| **Hijacking** | Injected instructions override system intent |
| **Prompt injection / poisoning** | Malicious content in user or retrieved data alters behavior |
| **Exposure** | Sensitive system prompts or secrets leaked in outputs |

Mitigate with Bedrock Guardrails (incl. prompt attack filters), least privilege on tools, input/output filtering, don’t put secrets in prompts.

### Amazon Bedrock Prompt Management

- Create, edit, save reusable prompts with **variables**
- Select model / inference profile; set inference configs
- Create **variants**, test side-by-side, save **versions**
- Integrate via inference APIs or **Amazon Bedrock Flows** (prompt node)
- Console **prompt builder** for visual iteration

## AWS services involved

Bedrock Prompt Management, Bedrock Flows, Guardrails, underlying FMs via Converse/Invoke APIs.

## Practical study tips

- Map each technique to a one-line scenario (CoT for multi-step; few-shot for JSON format).
- Remember: Prompt Management = versioning + variants + variables — not a different model.
- Pair with Guardrails whenever prompts are user-facing.

## Common exam traps

- Using few-shot when RAG is needed for fresh facts (examples ≠ knowledge base).
- Assuming prompts alone stop jailbreaks (need Guardrails + app controls).
- Confusing negative prompts with Guardrails denied topics (related idea, different control plane).
- Forgetting versioning when multiple teams edit production prompts.

## Exam guide mapping

- **Task Statement 3.2** — Choose effective prompt engineering techniques (constructs; CoT/zero/few-shot/templates; benefits/best practices; risks including jailbreak/hijacking; Bedrock Prompt Management versioning).

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
- https://aws.amazon.com/ai/responsible-ai/
- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
