# 14 — AI governance and compliance

**Domain 5 (14%) · Task Statement 5.2**

## What it is

Organizational controls for AI: AWS governance services (Config, Inspector, Artifact, CloudTrail, Trusted Advisor), data lifecycle/residency/retention strategies, and the **Generative AI Security Scoping Matrix** as a governance framework.

## Why it matters for AIF-C01

Questions ask which AWS service supports audit/compliance evidence, or which scoping matrix level matches a use case (consumer chat vs fine-tuned vs self-trained).

## What to know for the exam

### AWS services for governance & compliance

| Service | AI governance use |
|---|---|
| **AWS Config** | Track configuration compliance of AI-related resources over time |
| **Amazon Inspector** | Vulnerability findings for compute hosting models/agents |
| **AWS Artifact** | On-demand access to AWS compliance reports / agreements |
| **AWS CloudTrail** | API audit trail (who called Bedrock/SageMaker, when) |
| **AWS Trusted Advisor** | Best-practice checks (cost, security, performance, quotas) |
| Also useful | CloudWatch (ops), Well-Architected Tool, IAM Access Analyzer concepts |

### Data governance strategies

| Theme | Exam points |
|---|---|
| **Data lifecycle** | Ingest → use in train/RAG → archive → delete |
| **Logging** | Model invocations, guardrail interventions, agent tool calls |
| **Residency** | Keep data/models in required Regions; check feature availability |
| **Monitoring / observation** | Quality, drift, safety metrics, cost |
| **Retention** | Align logs and vector stores with policy; GDPR erasure tension with fine-tunes |

**GDPR-style erasure:** removing personal data from a fine-tuned model may require deleting training data and retraining — often impractical; prefer not embedding erasable PII in weights (use RAG).

### Governance protocols & frameworks

- Policies, review cadence, review strategies
- Team training requirements
- Transparency standards
- **Generative AI Security Scoping Matrix** (AWS) — classify use cases by ownership of model/data

### Generative AI Security Scoping Matrix (memorize scopes)

| Scope | Ownership | Example |
|---|---|---|
| **1 Consumer app** | Use public third-party GenAI; no model/data ownership | Employee uses public chat site for ideas |
| **2 Enterprise app** | Vendor enterprise app with GenAI features + business contract | SaaS scheduler drafts agendas |
| **3 Pre-trained models** | Your app calls third-party FM via API (e.g., Bedrock + RAG) | Support bot on Claude via Bedrock |
| **4 Fine-tuned models** | You fine-tune provider FM with your data | Domain-tuned medical summarizer |
| **5 Self-trained models** | You train from scratch; own the model | Custom video model trained on your corpus |

**Disciplines across scopes:** governance/compliance, legal/privacy, risk management, controls, resilience.

Priority pattern: Scopes 1–2 emphasize TOS and data-sharing; Scopes 3–5 emphasize threat modeling (prompt injection), IAM before context, Guardrails, and residency. Higher scope ⇒ more customer ownership of security.

There is also an **Agentic AI Security Scoping Matrix** for autonomous agents (identity, memory, behavioral monitoring) — know it exists alongside the GenAI matrix.

## Practical study tips

- Map every practice scenario to scopes 1–5 in 10 seconds.
- CloudTrail = “who invoked the model”; Artifact = “auditor needs AWS SOC report”; Config = “is encryption enabled on the bucket?”
- Governance ≠ only security tools — include policies, training, review boards.

## Common exam traps

- Treating Scope 1 public chat as safe for confidential data.
- Fine-tuning on PII then expecting easy “right to be forgotten.”
- Picking Inspector when the need is compliance *reports* (Artifact) or API *audit* (CloudTrail).
- Ignoring resilience (timeouts, quotas, multi-Region) as part of secure GenAI design.

## Exam guide mapping

- **Task Statement 5.2** — Governance and compliance for AI (Config, Inspector, Artifact, CloudTrail, Trusted Advisor; data lifecycles/logging/residency/monitoring/retention; governance protocols including Generative AI Security Scoping Matrix, transparency standards, team training).

## Research links

- https://aws.amazon.com/ai/security/generative-ai-scoping-matrix/
- https://aws.amazon.com/ai/generative-ai/security/
- https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html
- https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html
- https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html
- https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html
- https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/strategy-enterprise-ready-gen-ai-platform/strategy-enterprise-ready-gen-ai-platform.pdf
