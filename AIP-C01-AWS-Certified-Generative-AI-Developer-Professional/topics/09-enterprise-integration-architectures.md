# 09 — Enterprise integration architectures

**Exam map:** Domain 2 · Task **2.3** · Skills **2.3.1–2.3.5**

## What it is

Wiring GenAI into the enterprise: APIs and event-driven patterns, identity federation, edge/on-prem (Outposts/Wavelength), GenAI gateway abstraction, and CI/CD with security scans and rollback.

## Why it matters for AIP-C01

Production GenAI fails at integration boundaries. Exam emphasizes EventBridge, federation/RBAC, hybrid connectivity, CodePipeline, and centralized gateways—not isolated notebooks.

## Production implementation notes

- **API + events:** API Gateway microservices for sync UX; EventBridge/SQS for async enrichment, document ingest, and fan-out. Keep FM calls loosely coupled from systems of record.
- **Identity:** Cognito / IAM Identity Center / federation into Bedrock and AgentCore Identity; least-privilege model invoke and data-plane access; never share long-lived keys in prompts.
- **Hybrid:** Outposts for on-prem data gravity; Wavelength for ultra-low-latency edge; PrivateLink/VPC endpoints for Bedrock control/runtime/agent planes.
- **GenAI gateway:** central abstraction (API Gateway, App Runner, or AgentCore Gateway) for model routing, auth, quotas, guardrails, and observability—enterprise “single door.”
- **CI/CD:** CodePipeline/CodeBuild deploy prompts, agents, IaC; automated evals + security scans; staged rollouts with rollback on quality regression.

## AWS services

Amazon API Gateway, AWS Lambda, Amazon EventBridge, Amazon SQS/SNS, Amazon Cognito, IAM Identity Center, AWS Outposts, AWS Wavelength, AWS PrivateLink / VPC endpoints, Amazon Bedrock AgentCore Gateway, AWS CodePipeline, AWS CodeBuild, AWS CloudFormation / CDK.

## Exam traps

- Direct FM calls from every microservice without a gateway (ungoverned sprawl).
- Public internet paths to Bedrock when VPC endpoints are required.
- Deploying prompt/model changes without eval gates or rollback.
- Over-privileging a single role that can invoke any model and read all S3 corpora.

## Hands-on project ideas

1. EventBridge rule: `DocumentUploaded` → Step Functions ingest → KB sync → notify.
2. GenAI gateway Lambda: authZ + Guardrails + model route + X-Ray subsegment.
3. Pipeline stage that fails deploy if Bedrock evaluation score < threshold.

## Research links

- https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html
- https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html
- https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html
