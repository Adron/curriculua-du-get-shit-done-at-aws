---
title: "13: Securing AI systems"
---

# 13: Securing AI systems

**Domain 5 (14%) · Task Statement 5.1**

Security controls for AI workloads: IAM, encryption, Macie, PrivateLink, the shared responsibility model, Bedrock Guardrails, and **AgentCore Identity**. Then the AI-specific threats: prompt injection, data leakage, toxicity, plus hallucination detection and grounding.

Domain 5 scenarios mix classic AWS security with LLM-specific attacks. Here's the one thing to internalize: **an FM has no row-level access control over what it knows.** If it's in the context, it can come out in the answer. So you filter data *before* it goes into the context, not after.

## What to know

### AWS services and features to secure AI

| Control | Role in AI |
|---|---|
| **IAM** roles/policies/permissions | Least privilege to invoke models, read KB data, call tools |
| **Encryption** (KMS) | At rest (S3, vector stores) and in transit (TLS) |
| **Amazon Macie** | Discover and protect sensitive data (e.g., PII in S3 training/KB corpora) |
| **AWS PrivateLink** | Private connectivity to Bedrock/APIs without public internet exposure |
| **Shared responsibility model** | AWS secures the cloud; you secure data, identity, app config, prompts/tools |
| **Amazon Bedrock Guardrails** | Content, PII, prompt attack, and grounding filters |
| **Bedrock AgentCore Identity / Policy** | AuthZ for agents, tool access, agent identity |
| **Secrets Manager** | Credentials for tools. Never in prompts. |
| **CloudTrail / CloudWatch** | Audit AI API calls; monitor anomalies |

### Data lineage and documentation

- Source citation, data origins, cataloging
- **SageMaker Model Cards** for model lineage and intended use
- Know where training data vs RAG context data came from

### Secure data engineering practices

Assess data quality; use privacy-enhancing techniques; enforce access control and integrity; minimize sensitive data in fine-tunes (prefer RAG for volatile data and PII).

### AI-specific security and privacy considerations

| Topic | Know |
|---|---|
| Application security | Validate inputs and outputs; protect endpoints |
| Threat detection / vuln management | Treat prompt injection like any other injection attack |
| Infrastructure protection | VPC, security groups, PrivateLink |
| **Prompt injection** | Malicious instructions in user input or retrieved content |
| Encryption at rest/in transit | Standard + KMS CMKs where required |
| **Data leakage prevention** | Mask PII; don't log raw prompts that contain secrets |
| Output filtering / validation | Guardrails + app checks |
| Audit trail / logging | Who invoked which model, under which policy |
| Toxicity | Filter harmful content |

### Hallucination detection and grounding

- **RAG grounding** with citations
- Guardrails **contextual grounding** (grounding + relevance scores and thresholds)
- Output validation / confidence-style scoring
- Automated Reasoning checks against rules
- HITL for high-impact answers

**Remember:** Guardrails on RetrieveAndGenerate apply to the user input and the model output. They don't automatically apply to every retrieved chunk.

## AWS services in play

IAM, KMS, Macie, PrivateLink, Secrets Manager, Bedrock Guardrails, AgentCore Identity/Policy, SageMaker Model Cards, CloudTrail, and CloudWatch.

## Hands-on

- Try to break your own Guardrail. Put one in front of the [B2](../../build.md#b2) Knowledge Base and throw prompt injections at it: "ignore your instructions," instructions hidden inside a document, the works. That's [B3](../../build.md#b3).
- Threat model anything Scope 3 and up (see [topic 14](./14-ai-governance-and-compliance.md)). Prompt injection is a first-class threat, not an edge case.
- Walk the scenario "employee pastes a secret into the chatbot": DLP, Macie on the stores, Guardrails sensitive info filters, logging controls.
- Agent security = identity + least-privilege tools + memory protection + Guardrails.

## Exam traps

- Relying on the LLM to "not reveal" secrets instead of IAM and tool filters.
- Public Bedrock access when the scenario requires PrivateLink/VPC patterns.
- Logging full prompts that contain PII.
- Misreading shared responsibility. You still own prompt, app, and data security.

## Exam guide mapping

- **Task Statement 5.1**: Methods to secure AI systems (IAM, encryption, Macie, PrivateLink, shared responsibility, AgentCore Identity/Policy, Guardrails; lineage/Model Cards; secure data engineering; prompt injection/leakage/toxicity/logging; hallucination detection and grounding).

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html>
- <https://aws.amazon.com/ai/security/generative-ai-scoping-matrix/>
- <https://aws.amazon.com/ai/generative-ai/security/>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html>
- <https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html>
- <https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html>
- <https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html>