# 06 — AWS GenAI infrastructure and services

**Domain 2 (24%) · Task Statement 2.3**

## What it is

The AWS GenAI stack you must recognize by name and role: Bedrock, SageMaker AI / JumpStart, AgentCore, Strands, Amazon Quick, Kiro — plus why AWS infra helps (security/compliance) and cost tradeoffs (tokens vs provisioned vs custom).

## Why it matters for AIF-C01

Exam guide explicitly lists these services. Questions are “which AWS service?” by persona and ownership (managed API vs self-hosted vs agent platform vs business UI vs IDE).

## What to know for the exam

### Service map (memorize)

| Service | Role | Reach for it when… |
|---|---|---|
| **Amazon Bedrock** | Fully managed FM APIs + Knowledge Bases, Guardrails, customization | App needs hosted FMs; pay per token; no model infra |
| **Amazon SageMaker AI** | Build, train, deploy ML/FMs with managed infra you size | Custom training, fine-tune host, full MLOps control |
| **SageMaker JumpStart** | Hub of pretrained FMs/algorithms to deploy/fine-tune on SageMaker | Want open weights on *your* endpoints |
| **Amazon Bedrock AgentCore** | Managed platform to deploy/operate agents (runtime, memory, identity, observability, gateway) | Production agents without building agent infra |
| **Strands Agents** | Open-source SDK for model-driven agents (MCP, multi-agent patterns) | You write agent logic in code |
| **Amazon Quick** | Chat-driven BI / business GenAI workspace | Business users ask questions over company data |
| **Kiro** | AI IDE / agentic coding (spec-driven development) | Developers building software with AI assistance |

### Advantages of AWS GenAI services

Accessibility, lower barrier to entry, efficiency, cost-effectiveness vs DIY GPU farms, speed to market, alignment to business objectives, enterprise security/compliance posture.

### Infrastructure benefits

- **Security & compliance** — IAM, encryption, PrivateLink, Artifact reports, shared responsibility
- **Responsibility & safety** — Guardrails, Model Cards/Service Cards, accountable controls
- Data isolation and regional controls for residency

### Cost tradeoffs

| Lever | Effect |
|---|---|
| Token-based pricing | Elastic; spikes with chatty apps / huge contexts |
| Provisioned throughput | Reserved capacity for steady high volume / latency SLAs |
| Custom models / fine-tunes | Training + hosting cost; may reduce prompt size later |
| Responsiveness / availability / redundancy | Multi-AZ/Region costs more |
| Performance / model size | Bigger models → higher $/token and latency |
| Regional coverage | Feature/model availability varies by Region |
| Bedrock vs SageMaker host | Bedrock: managed inference economics; SageMaker: pay for instances even idle (unless serverless patterns) |

**Rule of thumb:** Prototype on Bedrock on-demand tokens → consider provisioned throughput or self-host when volume/latency justify it.

## Practical study tips

- Persona test: business user → Quick; developer coding → Kiro; app backend FM call → Bedrock; custom train/host → SageMaker/JumpStart; production agent platform → AgentCore; agent code framework → Strands.
- Bedrock ≠ “only Amazon models” — multi-provider FMs behind one API.
- AgentCore works with multiple frameworks (Strands, LangGraph, CrewAI, etc.).

## Common exam traps

- Deploying JumpStart “because GenAI” when Bedrock API would suffice.
- Confusing Quick (business assistant/BI) with Bedrock (builder API).
- Ignoring Region model availability and compliance.
- Forgetting provisioned throughput as a cost/performance option.

## Exam guide mapping

- **Task Statement 2.3** — AWS infrastructure and technologies for GenAI (Bedrock, SageMaker AI, JumpStart, Quick, Kiro, Strands, AgentCore; advantages; security/compliance benefits; cost tradeoffs including tokens and provisioned throughput).

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models.html
- https://docs.aws.amazon.com/bedrock-agentcore/
- https://aws.amazon.com/ai/generative-ai/services/
- https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/agentic-ai-frameworks.pdf
- https://aws.amazon.com/ai/generative-ai/security/
