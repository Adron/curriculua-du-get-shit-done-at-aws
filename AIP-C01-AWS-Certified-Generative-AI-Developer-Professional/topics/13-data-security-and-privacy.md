# 13 — Data security and privacy

**Exam map:** Domain 3 · Task **3.2** · Skills **3.2.1–3.2.3**

## What it is

Protecting data around FM workloads: network isolation (VPC endpoints), Lake Formation / IAM data access, Macie/Comprehend PII discovery, Bedrock privacy properties, masking/anonymization, and retention/lifecycle.

## Why it matters for AIP-C01

Enterprise scenarios almost always include PII, private networking, and retention. You must combine Bedrock-native controls with broader AWS data security services.

## Production implementation notes

- **Network:** Interface VPC endpoints for `bedrock`, `bedrock-runtime`, `bedrock-agent`, `bedrock-agent-runtime` (and FIPS where required); Private DNS to avoid code changes.
- **Access:** IAM least privilege on `bedrock:InvokeModel` / knowledge-base APIs; Lake Formation for lake permissions; CloudWatch/CloudTrail for access audit.
- **PII pipelines:** Comprehend detect/redact before KB ingest; Macie for discovery/quarantine; Guardrails sensitive-information filters on I/O; BDA sensitive data modes for automation outputs.
- **Bedrock privacy:** understand data handling for inference (provider terms); don’t put secrets in prompts; prefer PrivateLink paths.
- **Retention:** S3 Lifecycle on invocation logs, chat history, and eval datasets; DynamoDB TTLs; minimize prompt/response retention in CloudWatch.

## AWS services

Amazon VPC / PrivateLink, IAM, AWS Lake Formation, Amazon Macie, Amazon Comprehend, Amazon Bedrock Guardrails, Amazon Bedrock Data Automation, Amazon S3 Lifecycle, Amazon CloudWatch, AWS CloudTrail, Amazon Cognito.

## Exam traps

- Logging full prompts with PII to CloudWatch without masking.
- Public NAT path “because PrivateLink is hard.”
- Redacting only outputs while indexing raw PII into the vector store.
- Infinite retention of invocation logs for “debugging.”

## Hands-on project ideas

1. Deploy bedrock-runtime VPC endpoint; force Lambda (no NAT) to call Converse.
2. Comprehend → Macie quarantine pipeline before KB sync (per AWS RAG sensitive-data guidance).
3. Guardrail PII mask + S3 lifecycle 30-day expire on invocation log bucket.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html
- https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html
- https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html
- https://docs.aws.amazon.com/solutions/securing-sensitive-data-in-rag-applications-using-amazon-bedrock/
- https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/bda-sensitive-data.html
