---
title: "07: Deployment infrastructure"
---

# 07: Deployment infrastructure

**Domain 3 (24%) · Task 3.1 · Skills 3.1.1-3.1.8**

Where and how do models, FMs, and agents actually run? Compute targets, multi-model and multi-container patterns, real-time vs batch inference, Bedrock FM hosting options, Custom Model Import, agents, and RAG retrieval/rerank configs.

C02 goes well past classic SageMaker endpoints here. It adds **FM deployment options**, **Custom Model Import**, **agents**, **FM hosting and resource allocation**, and **RAG retrieval and reranking**.

**Match the inference option to the traffic shape.** Nearly every question in this topic is that sentence wearing a different outfit.

## What to know

### Skills map

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

### SageMaker inference options

| Option | Latency | Ops | Fit |
|---|---|---|---|
| **Real-time endpoint** | Lowest | You size instances | Interactive APIs |
| **Serverless inference** | Cold starts OK | Fully managed scale-to-zero | Spiky/idle traffic |
| **Async inference** | Near-real-time; queue | Large payloads (≤1GB), long jobs (≤1h) | Heavy docs/video |
| **Batch transform** | Offline | Job-based | Score whole datasets |

Also: JumpStart UI deploy for low-code, and `ModelBuilder` / Boto3 / CloudFormation when you want control at scale.

### Multi-model / multi-container

- **Multi-model endpoints (MME)**: many models on a shared fleet. A cost win when the models share a framework and per-model traffic is sparse.
- **Multi-container / serial inference pipelines**: preprocess, model, postprocess as chained containers.
- Don't force MME when each model needs a dedicated, saturated GPU.

### FM deployment options

| Path | Notes |
|---|---|
| **Bedrock on-demand** | API invoke; no servers to manage |
| **Bedrock provisioned throughput** | Reserved capacity for steady high TPS |
| **Bedrock Custom Model Import** | Bring compatible external weights into Bedrock |
| **SageMaker hosting** | Full control of containers/instances for custom/open models |
| **Agents (Bedrock / AgentCore)** | Orchestrate tools, memory, multi-step workflows |

### Agents (3.1.6)

- Define instructions and action groups/tools (Lambda, OpenAPI, MCP via AgentCore Gateway)
- Session isolation, memory (short- and long-term), identity
- Protocols: tool calling, MCP, A2A-style multi-agent where in scope
- On the exam: pick an agent when multi-step tool use beats a single RAG call

### RAG retrieval and reranking (3.1.8)

| Lever | Effect |
|---|---|
| Top-k / numberOfResults | Recall vs noise |
| Metadata filters | ACL, tenant, product |
| Hybrid search | Exact + semantic |
| Reranker model | Reorder candidates for precision |
| Hierarchical chunks | Child hit → parent context |

## AWS services in play

SageMaker Inference (real-time, serverless, async, batch), JumpStart, Bedrock Runtime, Custom Model Import, Bedrock Agents, Bedrock AgentCore (Runtime/Harness/Gateway/Memory), Knowledge Bases, and OpenSearch k-NN.

## Hands-on

1. Deploy the same model to a real-time and a serverless endpoint and measure cold start vs cost at low TPS. The [B5](../../build.md#b5) tag classifier is perfect for this: it gets maybe a few calls a day, which is exactly the traffic shape serverless was made for ([B7](../../build.md#b7)).
2. Create an async endpoint for a large-document workload.
3. Import or host a custom model (SageMaker or Bedrock CMI lab).
4. Configure KB retrieve with filters + reranking and compare answer faithfulness ([B6](../../build.md#b6)).
5. Deploy a minimal agent with one Lambda tool and exercise multi-turn tool use.

## Exam traps

- A real-time GPU endpoint for nightly batch scoring.
- A multi-model endpoint when every model is GPU-heavy and always hot.
- Ignoring Custom Model Import constraints (format and architecture compatibility).
- An agent for a single classify call. Overkill.
- Retrieval top-k=50 with no rerank. That's context stuffing and a bigger token bill.

## Exam guide mapping

- **Domain 3 (24%) · Task 3.1 · Skills 3.1.1-3.1.8**: deployment infrastructure.

## Research links

- <https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/custom-model-import.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/multi-model-endpoints.html>
- <https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf>