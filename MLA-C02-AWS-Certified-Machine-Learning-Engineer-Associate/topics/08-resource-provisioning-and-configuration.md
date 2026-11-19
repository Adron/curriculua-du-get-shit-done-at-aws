---
title: "08: Resource provisioning and configuration"
---

# 08: Resource provisioning and configuration

**Domain 3 (24%) · Task 3.2 · Skills 3.2.1-3.2.11**

Topic 07 was "where does it run". This one is "how much of it, wired up how". On-demand vs provisioned, containers, VPC placement, programmatic deploys (SDK, CLI, Boto3), autoscaling metrics, Knowledge Bases, retrieval pipelines, agent state, GPU scaling, and agentic infrastructure.

C02 stretches provisioning to cover **Bedrock Knowledge Bases**, **retrieval pipelines**, **agent state**, **GPU scaling**, and **agentic workflow infra** (AgentCore Runtime, Harness, and friends).

**Treat all of it like any other prod service.** Pinned images, private networking, IaC, and scaling on metrics that actually mean something. The ML part doesn't get a pass.

## What to know

### Skills map

| Skill | Focus |
|---|---|
| 3.2.1 | On-demand vs provisioned for cost/perf |
| 3.2.2 | Automate provisioning across stacks/orchestrators |
| 3.2.3 | Build/maintain containers for ML/AI |
| 3.2.4 | SageMaker endpoints in VPC |
| 3.2.5 | Deploy via SageMaker Python SDK, CLI, Boto3 |
| 3.2.6 | Autoscaling metrics selection |
| 3.2.7 | Bedrock Knowledge Bases (vectors, indexing, retrieval) |
| 3.2.8 | Retrieval pipelines |
| 3.2.9 | Agent state management |
| 3.2.10 | GPU resource scaling |
| 3.2.11 | Deploy agentic workflow infrastructure |

### On-demand vs provisioned

| Pattern | Use |
|---|---|
| SageMaker on-demand instances | Variable training/inference |
| SageMaker Serverless | Spiky inference, accept cold start |
| Bedrock on-demand tokens | Variable GenAI traffic |
| Bedrock **Provisioned Throughput** | Steady high QPS / latency SLOs |
| Reserved / Savings Plans (EC2 layer) | Long-lived GPU fleets |

### Containers

- Store images in **ECR** and pin digests for prod.
- SageMaker-compatible containers implement the serving contract (`/ping`, `/invocations`), or use the framework DLCs.
- Rebuild when dependencies change; scan with Inspector (topic 12).

### VPC endpoints and network

- Deploy SageMaker endpoints into private subnets with tight security groups.
- Interface VPC endpoints for SageMaker Runtime, S3 gateway endpoints, and Bedrock endpoints as required. Avoid public data paths.
- Training and inference jobs need a route to S3 and ECR (endpoints or NAT).

### Programmatic deploy

```text
# Mental model: know which tool when
sagemaker.Model(...).deploy(...)     # Python SDK / ModelBuilder
aws sagemaker create-endpoint ...    # CLI / IaC pipelines
boto3.client("sagemaker")            # Automation, CI
bedrock-runtime invoke_model         # FM calls (no endpoint mgmt)
```

### Autoscaling metrics (3.2.6)

Pick metrics that reflect **saturation**, not vanity:

| Target | Example metric |
|---|---|
| Real-time CPU/GPU endpoint | `InvocationsPerInstance`, model latency, GPU util |
| Async | Queue depth / backlog |
| Custom | CloudWatch metric math on business TPS |

Scale-in cool-downs matter a lot for spiky GenAI traffic.

### Knowledge Bases and retrieval pipelines

1. Connect a data source (S3, etc.)
2. Choose an embedding model + vector store (OpenSearch, Aurora pgvector, S3 vectors, ...)
3. Chunk and index; schedule **sync/ingest** jobs
4. `Retrieve` or `RetrieveAndGenerate`; add filters and rerank
5. Refresh pipeline: S3 event, then Step Functions/Lambda, then the KB ingest API (ties to 3.3.11)

### Agent state and agentic infra

| Concern | Approach |
|---|---|
| Short-term conversation | Session memory / chat history |
| Long-term facts | AgentCore Memory or external store |
| Tools | Gateway/MCP, Lambda action groups |
| Isolation | Per-session microVM / Runtime isolation |
| Observability | AgentCore Observability → CloudWatch (topic 10/11) |

Provision Runtime/Harness resources, IAM for tools, and memory stores just like any other prod service.

### GPU scaling

- Match the instance family to the framework (see topic 11).
- Horizontal: more replicas behind the endpoint. Vertical: a bigger GPU.
- Batch size and concurrency caps prevent OOM under autoscaling.

## AWS services in play

EC2/SageMaker instances, Auto Scaling, ECR/ECS/EKS (container ops), VPC, SageMaker SDK/CLI/Boto3, Bedrock Knowledge Bases, Step Functions/EventBridge, and Bedrock AgentCore (Runtime, Memory, Gateway, Harness).

## Hands-on

1. Deploy an endpoint with the SDK, recreate it with the CLI, tear it down. Then do it properly in IaC, which is the [B7](../../build.md#b7) way.
2. Put the endpoint in a VPC, call it over a private path, and confirm the SG and endpoint policies. Part of [B8](../../build.md#b8).
3. Create a KB with OpenSearch or S3 vectors, sync it, query with a metadata filter. In [B6](../../build.md#b6) the filter is post category or year.
4. Configure endpoint autoscaling on `InvocationsPerInstance`.
5. Stand up a minimal AgentCore/Bedrock agent with memory enabled and inspect session state.

## Exam traps

- Provisioned Bedrock capacity for bursty hobby traffic. That's a lot of money for nothing.
- Autoscaling on CPU when GPU memory is the bottleneck.
- A public SageMaker endpoint for sensitive models.
- Creating a KB once and never refreshing it after S3 updates.
- Stateless agents that "forget" mid-workflow because nobody designed memory.

## Exam guide mapping

- **Domain 3 (24%) · Task 3.2 · Skills 3.2.1-3.2.11**: resource provisioning and configuration.

## Research links

- <https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling.html>
- <https://docs.aws.amazon.com/vpc/latest/userguide/vpc-endpoints.html>