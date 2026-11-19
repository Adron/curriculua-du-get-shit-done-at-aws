---
title: "14: AI governance and compliance"
---

# 14: AI governance and compliance

**Domain 5 (14%) · Task Statement 5.2**

The organizational controls around AI. The AWS governance services (Config, Inspector, Artifact, CloudTrail, Trusted Advisor), data lifecycle, residency, and retention strategies, and the **Generative AI Security Scoping Matrix** as the framework that ties it together.

The questions here come in two flavors. Either "which AWS service gives me this audit or compliance evidence?" or "which scoping matrix level is this use case?" (consumer chat vs fine-tuned vs self-trained). **Learn the five scopes cold.** It's the most reusable mental model in this whole domain.

## What to know

### AWS services for governance and compliance

| Service | AI governance use |
|---|---|
| **AWS Config** | Track configuration compliance of AI-related resources over time |
| **Amazon Inspector** | Vulnerability findings for the compute hosting models and agents |
| **AWS Artifact** | On-demand access to AWS compliance reports and agreements |
| **AWS CloudTrail** | API audit trail (who called Bedrock/SageMaker, and when) |
| **AWS Trusted Advisor** | Best-practice checks (cost, security, performance, quotas) |
| Also useful | CloudWatch (ops), Well-Architected Tool, IAM Access Analyzer concepts |

### Data governance strategies

| Theme | Exam points |
|---|---|
| **Data lifecycle** | Ingest → use in training/RAG → archive → delete |
| **Logging** | Model invocations, guardrail interventions, agent tool calls |
| **Residency** | Keep data and models in required Regions; check feature availability |
| **Monitoring / observation** | Quality, drift, safety metrics, cost |
| **Retention** | Align logs and vector stores with policy; GDPR erasure is in tension with fine-tunes |

**GDPR-style erasure:** pulling personal data out of a fine-tuned model may mean deleting the training data and retraining. That's often impractical. Better plan: don't put erasable PII into weights in the first place. Use RAG.

### Governance protocols and frameworks

- Policies, review cadence, review strategies
- Team training requirements
- Transparency standards
- **Generative AI Security Scoping Matrix** (AWS): classify use cases by who owns the model and data

### Generative AI Security Scoping Matrix (memorize the scopes)

| Scope | Ownership | Example |
|---|---|---|
| **1 Consumer app** | Public third-party GenAI; no model/data ownership | Employee uses a public chat site for ideas |
| **2 Enterprise app** | Vendor enterprise app with GenAI features + business contract | SaaS scheduler drafts agendas |
| **3 Pre-trained models** | Your app calls a third-party FM via API (e.g., Bedrock + RAG) | Support bot on Claude via Bedrock |
| **4 Fine-tuned models** | You fine-tune a provider FM with your data | Domain-tuned medical summarizer |
| **5 Self-trained models** | You train from scratch and own the model | Custom video model trained on your corpus |

**Disciplines across every scope:** governance and compliance, legal and privacy, risk management, controls, resilience.

The priority pattern: Scopes 1-2 are mostly about TOS and data sharing. Scopes 3-5 are about threat modeling (prompt injection), IAM before context, Guardrails, and residency. **Higher scope ⇒ more of the security is on you.**

There's also an **Agentic AI Security Scoping Matrix** for autonomous agents (identity, memory, behavioral monitoring). Know it exists alongside the GenAI matrix.

## AWS services in play

Config, Inspector, Artifact, CloudTrail, and Trusted Advisor for governance evidence, with CloudWatch, the Well-Architected Tool, and IAM Access Analyzer in the supporting cast.

## Hands-on

- Take every practice scenario and place it on scopes 1-5 in ten seconds or less.
- One-liners to drill: **CloudTrail** = "who invoked the model." **Artifact** = "the auditor needs the AWS SOC report." **Config** = "is encryption enabled on that bucket?"
- Place your own [B2](../../build.md#b2) Knowledge Base on the matrix. (Scope 3: your app calling a third-party FM via Bedrock + RAG.)
- Remember governance isn't only security tooling. It's also policies, training, and review boards.

## Exam traps

- Treating Scope 1 public chat as safe for confidential data.
- Fine-tuning on PII, then expecting an easy "right to be forgotten."
- Picking Inspector when the need is compliance *reports* (Artifact) or an API *audit trail* (CloudTrail).
- Ignoring resilience (timeouts, quotas, multi-Region) as part of secure GenAI design.

## Exam guide mapping

- **Task Statement 5.2**: Governance and compliance for AI (Config, Inspector, Artifact, CloudTrail, Trusted Advisor; data lifecycles/logging/residency/monitoring/retention; governance protocols including Generative AI Security Scoping Matrix, transparency standards, team training).

## Research links

- <https://aws.amazon.com/ai/security/generative-ai-scoping-matrix/>
- <https://aws.amazon.com/ai/generative-ai/security/>
- <https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html>
- <https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html>
- <https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html>
- <https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html>
- <https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/strategy-enterprise-ready-gen-ai-platform/strategy-enterprise-ready-gen-ai-platform.pdf>