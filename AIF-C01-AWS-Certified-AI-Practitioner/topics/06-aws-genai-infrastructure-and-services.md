---
title: "06: AWS GenAI infrastructure and services"
---

# 06: AWS GenAI infrastructure and services

**Domain 2 (24%) · Task Statement 2.3**

The AWS GenAI stack you need to recognize by name and by job: Bedrock, SageMaker AI and JumpStart, AgentCore, Strands, Amazon Quick, and Kiro. Plus why running this on AWS helps with security and compliance, and the cost tradeoffs between tokens, provisioned throughput, and custom models.

The exam guide lists every one of these services explicitly. The questions are almost always "which AWS service?" sorted by **persona and ownership**: managed API, self-hosted, agent platform, business UI, or IDE. Once you can put each service in its lane, these are some of the easiest points on the exam.

## What to know

### Service map (memorize this one)

| Service | Role | Reach for it when... |
|---|---|---|
| **Amazon Bedrock** | Fully managed FM APIs + Knowledge Bases, Guardrails, customization | The app needs hosted FMs; pay per token; no model infra |
| **Amazon SageMaker AI** | Build, train, deploy ML/FMs on managed infra you size | Custom training, fine-tune hosting, full MLOps control |
| **SageMaker JumpStart** | Hub of pretrained FMs and algorithms to deploy/fine-tune on SageMaker | You want open weights on *your* endpoints |
| **Amazon Bedrock AgentCore** | Managed platform to deploy and operate agents (runtime, memory, identity, observability, gateway) | Production agents without building agent infra |
| **Strands Agents** | Open-source SDK for model-driven agents (MCP, multi-agent patterns) | You're writing agent logic in code |
| **Amazon Quick** | Chat-driven BI / business GenAI workspace | Business users asking questions over company data |
| **Kiro** | AI IDE / agentic coding (spec-driven development) | Developers building software with AI assistance |

### Advantages of AWS GenAI services

Accessibility, lower barrier to entry, efficiency, cost-effectiveness vs a DIY GPU farm, speed to market, alignment to business objectives, and an enterprise security/compliance posture.

### Infrastructure benefits

- **Security and compliance**: IAM, encryption, PrivateLink, Artifact reports, shared responsibility
- **Responsibility and safety**: Guardrails, Model Cards/Service Cards, accountable controls
- Data isolation and regional controls for residency

### Cost tradeoffs

| Lever | Effect |
|---|---|
| Token-based pricing | Elastic; spikes with chatty apps and huge contexts |
| Provisioned throughput | Reserved capacity for steady high volume or latency SLAs |
| Custom models / fine-tunes | Training + hosting cost; may shrink prompts later |
| Responsiveness / availability / redundancy | Multi-AZ/Region costs more |
| Performance / model size | Bigger models → higher $/token and latency |
| Regional coverage | Feature and model availability varies by Region |
| Bedrock vs SageMaker host | Bedrock: managed inference economics. SageMaker: you pay for instances even when idle (unless serverless patterns) |

**Rule of thumb:** prototype on Bedrock on-demand tokens. Look at provisioned throughput or self-hosting only once volume or latency justify it.

## AWS services in play

All of the above: Bedrock, SageMaker AI, JumpStart, AgentCore, Strands, Quick, and Kiro, plus the security plumbing around them (IAM, KMS encryption, PrivateLink, Artifact).

## Hands-on

- Run the persona test until it's automatic. Business user → **Quick**. Developer writing code → **Kiro**. App backend calling an FM → **Bedrock**. Custom train/host → **SageMaker/JumpStart**. Production agent platform → **AgentCore**. Agent code framework → **Strands**.
- Open the Bedrock model catalog and count the providers. Bedrock is **not** "only Amazon models"; it's multi-provider FMs behind one API.
- Skim the AgentCore docs enough to know it works with multiple frameworks (Strands, LangGraph, CrewAI, etc.).

## Exam traps

- Deploying JumpStart "because GenAI" when a Bedrock API call would do.
- Confusing Quick (business assistant / BI) with Bedrock (the builder API).
- Ignoring Region model availability and compliance.
- Forgetting provisioned throughput as a cost/performance option.

## Exam guide mapping

- **Task Statement 2.3**: AWS infrastructure and technologies for GenAI (Bedrock, SageMaker AI, JumpStart, Quick, Kiro, Strands, AgentCore; advantages; security/compliance benefits; cost tradeoffs including tokens and provisioned throughput).

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/>
- <https://aws.amazon.com/ai/generative-ai/services/>
- <https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/agentic-ai-frameworks.pdf>
- <https://aws.amazon.com/ai/generative-ai/security/>