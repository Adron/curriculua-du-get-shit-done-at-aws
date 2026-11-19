---
title: "09: Enterprise integration architectures"
---

# 09: Enterprise integration architectures

**Domain 2 · Task 2.3 · Skills 2.3.1-2.3.5**

Wiring GenAI into the enterprise: APIs and event-driven patterns, identity federation, edge and on-prem (Outposts/Wavelength), a GenAI gateway abstraction, and CI/CD with security scans and rollback.

Production GenAI rarely fails inside the model. It fails at the integration boundaries, same as every other distributed system I've ever worked on. The exam leans on EventBridge, federation/RBAC, hybrid connectivity, CodePipeline, and centralized gateways. Isolated notebooks don't count.

## What to know

- **API + events:** API Gateway microservices for sync UX; EventBridge/SQS for async enrichment, document ingest, and fan-out. Keep FM calls loosely coupled from systems of record.
- **Identity:** Cognito / IAM Identity Center / federation into Bedrock and AgentCore Identity. Least-privilege model invoke and data-plane access. Never put long-lived keys in prompts.
- **Hybrid:** Outposts for on-prem data gravity; Wavelength for ultra-low-latency edge; PrivateLink/VPC endpoints for the Bedrock control, runtime, and agent planes.
- **GenAI gateway:** a central abstraction (API Gateway, App Runner, or AgentCore Gateway) for model routing, auth, quotas, guardrails, and observability. The enterprise's "single door."
- **CI/CD:** CodePipeline/CodeBuild deploy prompts, agents, and IaC, with automated evals and security scans, staged rollouts, and rollback on quality regression.

## AWS services in play

Amazon API Gateway, AWS Lambda, Amazon EventBridge, Amazon SQS/SNS, Amazon Cognito, IAM Identity Center, AWS Outposts, AWS Wavelength, AWS PrivateLink / VPC endpoints, Amazon Bedrock AgentCore Gateway, AWS CodePipeline, AWS CodeBuild, AWS CloudFormation / CDK.

## Hands-on

1. EventBridge rule: `DocumentUploaded` kicks off a Step Functions ingest, then KB sync, then a notification. For Ask Composite Code that's "new post published, re-sync the KB."
2. A GenAI gateway Lambda: authZ + Guardrails + model route + an X-Ray subsegment.
3. A pipeline stage that fails the deploy if the Bedrock evaluation score drops below a threshold. That's the eval gate in [B12](../../build.md#b12).

## Exam traps

- Direct FM calls from every microservice with no gateway (ungoverned sprawl).
- Public internet paths to Bedrock when VPC endpoints are required.
- Shipping prompt or model changes without eval gates or rollback.
- One over-privileged role that can invoke any model and read every S3 corpus.

## Exam guide mapping

- **Task 2.3**, Skills 2.3.1-2.3.5: design enterprise integration architectures.

## Research links

- <https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html>
- <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html>
- <https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html>
- <https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html>