# 13 — Securing AI systems

**Domain 5 (14%) · Task Statement 5.1**

## What it is

Security controls for AI workloads: IAM, encryption, Macie, PrivateLink, shared responsibility, Bedrock Guardrails, **AgentCore Identity**, plus AI-specific threats — prompt injection, data leakage, toxicity — and hallucination detection / grounding.

## Why it matters for AIF-C01

Domain 5 scenarios mix classic AWS security with LLM-specific attacks. FMs have **no built-in row-level ACL over training knowledge** — you must filter data *before* it enters context.

## What to know for the exam

### AWS services & features to secure AI

| Control | Role in AI |
|---|---|
| **IAM** roles/policies/permissions | Least privilege to invoke models, read KB data, call tools |
| **Encryption** (KMS) | At rest (S3, vector stores) and in transit (TLS) |
| **Amazon Macie** | Discover/protect sensitive data (e.g., PII in S3 training/KB corpora) |
| **AWS PrivateLink** | Private connectivity to Bedrock/APIs without public internet exposure |
| **Shared responsibility model** | AWS secures cloud; you secure data, identity, app config, prompts/tools |
| **Amazon Bedrock Guardrails** | Content, PII, prompt attack, grounding filters |
| **Bedrock AgentCore Identity / Policy** | AuthZ for agents, tool access, agent identity |
| **Secrets Manager** | Credentials for tools — never in prompts |
| **CloudTrail / CloudWatch** | Audit AI API calls; monitor anomalies |

### Data lineage & documentation

- Source citation; data origins; cataloging
- **SageMaker Model Cards** for model lineage/intended use
- Know where training vs RAG context data came from

### Secure data engineering practices

Assess data quality; privacy-enhancing techniques; access control; integrity; minimize sensitive data in fine-tunes (prefer RAG for volatile/PII).

### AI-specific security & privacy considerations

| Topic | Know |
|---|---|
| Application security | Validate inputs/outputs; protect endpoints |
| Threat detection / vuln management | Treat prompt injection like injection attacks |
| Infrastructure protection | VPC, security groups, PrivateLink |
| **Prompt injection** | Malicious instructions in user or retrieved content |
| Encryption at rest/in transit | Standard + KMS CMKs where required |
| **Data leakage prevention** | Mask PII; don’t log raw prompts with secrets |
| Output filtering / validation | Guardrails + app checks |
| Audit trail / logging | Who invoked which model with what policy |
| Toxicity | Filter harmful content |

### Hallucination detection & grounding

- **RAG grounding** with citations
- Guardrails **contextual grounding** (grounding + relevance scores/thresholds)
- Output validation / confidence-style scoring
- Automated Reasoning checks against rules
- HITL for high-impact answers

**Remember:** Guardrails on RetrieveAndGenerate apply to user input and model output — not automatically to every retrieved chunk.

## Practical study tips

- Threat model Scope 3+ apps (see topic 14): prompt injection is first-class.
- “Employee pastes secret into chatbot” → DLP, Macie on stores, Guardrails sensitive info, logging controls.
- Agent security = identity + tool least privilege + memory protection + Guardrails.

## Common exam traps

- Relying on the LLM to “not reveal” secrets without IAM/tool filters.
- Public Bedrock access when PrivateLink/VPC patterns are required.
- Logging full prompts containing PII.
- Confusing shared responsibility (customer still owns prompt/app/data security).

## Exam guide mapping

- **Task Statement 5.1** — Methods to secure AI systems (IAM, encryption, Macie, PrivateLink, shared responsibility, AgentCore Identity/Policy, Guardrails; lineage/Model Cards; secure data engineering; prompt injection/leakage/toxicity/logging; hallucination detection & grounding).

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
- https://aws.amazon.com/ai/security/generative-ai-scoping-matrix/
- https://aws.amazon.com/ai/generative-ai/security/
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html
- https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html
- https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html
