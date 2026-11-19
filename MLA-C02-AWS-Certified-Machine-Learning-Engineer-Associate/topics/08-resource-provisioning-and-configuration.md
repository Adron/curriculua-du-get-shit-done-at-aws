# 08 — Resource provisioning and configuration

**Domain 3 · Task 3.2** · Skills **3.2.1–3.2.11** · Domain weight **24%**

## What it is

Provisioning the right capacity and wiring: on-demand vs provisioned, containers, VPC placement, programmatic deploy (SDK/CLI/Boto3), autoscaling metrics, Knowledge Bases, retrieval pipelines, agent state, GPU scaling, agentic infrastructure.

## Why it matters for MLA-C02

C02 expands provisioning into **Bedrock Knowledge Bases**, **retrieval pipelines**, **agent state**, **GPU scaling**, and **agentic workflow infra** (AgentCore Runtime/Harness/etc.).

## Exam-relevant skills map

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

## On-demand vs provisioned

| Pattern | Use |
|---|---|
| SageMaker on-demand instances | Variable training/inference |
| SageMaker Serverless | Spiky inference, accept cold start |
| Bedrock on-demand tokens | Variable GenAI traffic |
| Bedrock **Provisioned Throughput** | Steady high QPS / latency SLOs |
| Reserved / Savings Plans (EC2 layer) | Long-lived GPU fleets |

## Containers

- Store images in **ECR**; pin digests for prod.
- SageMaker-compatible containers: implement serving contract (`/ping`, `/invocations`) or use framework DLCs.
- Rebuild when deps change; scan with Inspector (topic 12).

## VPC endpoints & network

- Deploy SageMaker endpoints into private subnets; restrict SGs.
- Interface VPC endpoints for SageMaker Runtime, S3 gateway endpoints, Bedrock endpoints as required — avoid public data paths.
- Training/inference jobs need route to S3/ECR (endpoints or NAT).

## Programmatic deploy

```text
# Mental model — know which tool when
sagemaker.Model(...).deploy(...)     # Python SDK / ModelBuilder
aws sagemaker create-endpoint ...    # CLI / IaC pipelines
boto3.client("sagemaker")            # Automation, CI
bedrock-runtime invoke_model         # FM calls (no endpoint mgmt)
```

## Autoscaling metrics (3.2.6)

Pick metrics that reflect **saturation**, not vanity:

| Target | Example metric |
|---|---|
| Real-time CPU/GPU endpoint | `InvocationsPerInstance`, model latency, GPU util |
| Async | Queue depth / backlog |
| Custom | CloudWatch metric math on business TPS |

Scale-in cool-downs matter for spiky GenAI traffic.

## Knowledge Bases & retrieval pipelines

1. Connect data source (S3, etc.)  
2. Choose embedding model + vector store (OpenSearch, Aurora pgvector, S3 vectors, …)  
3. Chunk/index; schedule **sync/ingest** jobs  
4. `Retrieve` or `RetrieveAndGenerate`; add filters/rerank  
5. Pipeline: S3 event → Step Functions/Lambda → KB ingest API for refresh (ties to 3.3.11)

## Agent state & agentic infra

| Concern | Approach |
|---|---|
| Short-term conversation | Session memory / chat history |
| Long-term facts | AgentCore Memory or external store |
| Tools | Gateway/MCP, Lambda action groups |
| Isolation | Per-session microVM / Runtime isolation |
| Observability | AgentCore Observability → CloudWatch (topic 10/11) |

Provision Runtime/Harness resources, IAM for tools, and memory stores like any other prod service.

## GPU scaling

- Match instance family to framework (see topic 11).
- Horizontal: more replicas behind endpoint; vertical: larger GPU.
- Batch size and concurrency caps prevent OOM under autoscaling.

## AWS services

EC2/SageMaker instances, Auto Scaling, ECR/ECS/EKS (container ops), VPC, SageMaker SDK/CLI/Boto3, Bedrock Knowledge Bases, Step Functions/EventBridge, Bedrock AgentCore (Runtime, Memory, Gateway, Harness).

## Hands-on practice

1. Deploy an endpoint with SDK; recreate with CLI; tear down.
2. Place endpoint in VPC; call via private path; confirm SG/endpoint policies.
3. Create a KB with OpenSearch or S3 vectors; sync; query with metadata filter.
4. Configure endpoint autoscaling on `InvocationsPerInstance`.
5. Stand up a minimal AgentCore/Bedrock agent with memory enabled; inspect session state.

## Common traps

- Provisioned Bedrock capacity for bursty hobby traffic ($$).
- Autoscaling on CPU when GPU memory is the bottleneck.
- Public SageMaker endpoint for sensitive models.
- Creating a KB once and never refreshing after S3 updates.
- Stateless agents that “forget” mid-workflow without memory design.

## Research links

- https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling.html
- https://docs.aws.amazon.com/vpc/latest/userguide/vpc-endpoints.html
