# 07 — Deployment infrastructure

**Domain 3 · Task 3.1** · Skills **3.1.1–3.1.8** · Domain weight **24%**

## What it is

Selecting where and how models/FMs/agents run: compute targets, multi-model/multi-container patterns, real-time vs batch inference, Bedrock FM hosting options, Custom Model Import, agents, and RAG retrieval/rerank configs.

## Why it matters for MLA-C02

C02 adds **FM deployment options**, **Custom Model Import**, **agents**, **FM hosting/resource allocation**, and **RAG retrieval/reranking** — not just classic SageMaker endpoints.

## Exam-relevant skills map

| Skill | Focus |
|---|---|
| 3.1.1 | Compute environments & deployment targets |
| 3.1.2 | Orchestrators; multi-model / multi-container |
| 3.1.3 | Real-time vs batch (and async/serverless) |
| 3.1.4 | FM deployment options |
| 3.1.5 | Import external models (SageMaker, Bedrock CMI) |
| 3.1.6 | Deploy/configure agents & tool protocols |
| 3.1.7 | FM hosting & resource allocation |
| 3.1.8 | RAG retrieval strategies & reranking |

## SageMaker inference options

| Option | Latency | Ops | Fit |
|---|---|---|---|
| **Real-time endpoint** | Lowest | You size instances | Interactive APIs |
| **Serverless inference** | Cold starts OK | Fully managed scale-to-zero | Spiky/idle traffic |
| **Async inference** | Near-real-time; queue | Large payloads (≤1GB), long jobs (≤1h) | Heavy docs/video |
| **Batch transform** | Offline | Job-based | Score whole datasets |

Also: JumpStart UI deploy for low-code; `ModelBuilder` / Boto3 / CloudFormation for control at scale.

## Multi-model / multi-container

- **Multi-model endpoints (MME)**: many models on shared fleet — cost win when models share framework and traffic is sparse per model.
- **Multi-container / serial inference pipelines**: preprocess → model → postprocess as chained containers.
- Don’t force MME when each model needs dedicated GPU saturation.

## FM deployment options

| Path | Notes |
|---|---|
| **Bedrock on-demand** | API invoke; no servers to manage |
| **Bedrock provisioned throughput** | Reserved capacity for steady high TPS |
| **Bedrock Custom Model Import** | Bring compatible external weights into Bedrock |
| **SageMaker hosting** | Full control of containers/instances for custom/open models |
| **Agents (Bedrock / AgentCore)** | Orchestrate tools, memory, multi-step workflows |

## Agents (3.1.6)

- Define instructions, action groups/tools (Lambda, OpenAPI, MCP via AgentCore Gateway)
- Session isolation, memory (short/long-term), identity
- Protocols: tool calling, MCP, A2A-style multi-agent where in scope
- Exam: pick agent when multi-step tool use beats single RAG call

## RAG retrieval & reranking (3.1.8)

| Lever | Effect |
|---|---|
| Top-k / numberOfResults | Recall vs noise |
| Metadata filters | ACL, tenant, product |
| Hybrid search | Exact + semantic |
| Reranker model | Reorder candidates for precision |
| Hierarchical chunks | Child hit → parent context |

## AWS services

SageMaker Inference (real-time, serverless, async, batch), JumpStart, Bedrock Runtime, Custom Model Import, Bedrock Agents, Bedrock AgentCore (Runtime/Harness/Gateway/Memory), Knowledge Bases, OpenSearch k-NN.

## Hands-on practice

1. Deploy the same model real-time vs serverless; measure cold start vs cost at low TPS.
2. Create an async endpoint for a large-document workload.
3. Import or host a custom model path (SageMaker or Bedrock CMI lab).
4. Configure KB retrieve with filters + reranking; compare answer faithfulness.
5. Deploy a minimal agent with one Lambda tool; exercise multi-turn tool use.

## Common traps

- Real-time GPU endpoint for nightly batch scores.
- Multi-model endpoint when each model is GPU-heavy and always hot.
- Ignoring Custom Model Import constraints (format/architecture compatibility).
- Agent for a single classify call (overkill).
- Retrieval top-k=50 with no rerank → context stuffing and higher token cost.

## Research links

- https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/custom-model-import.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/multi-model-endpoints.html
- https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf
