---
title: "13: Data security and privacy"
---

# 13: Data security and privacy

**Domain 3 · Task 3.2 · Skills 3.2.1-3.2.3**

Protecting the data around FM workloads: network isolation (VPC endpoints), Lake Formation / IAM data access, Macie and Comprehend for PII discovery, Bedrock's privacy properties, masking and anonymization, and retention/lifecycle.

Enterprise scenarios almost always include PII, private networking, and retention. You have to combine the Bedrock-native controls with the broader AWS data security services. None of this is new if you've done cloud security before. What's new is that the prompt itself is now a data path, and people paste *everything* into prompts.

## What to know

- **Network:** interface VPC endpoints for `bedrock`, `bedrock-runtime`, `bedrock-agent`, `bedrock-agent-runtime` (and FIPS where required). Private DNS so you don't need code changes.
- **Access:** IAM least privilege on `bedrock:InvokeModel` and the knowledge-base APIs; Lake Formation for lake permissions; CloudWatch/CloudTrail for access audit.
- **PII pipelines:** Comprehend detect/redact before KB ingest; Macie for discovery and quarantine; Guardrails sensitive-information filters on input and output; BDA sensitive-data modes for automation outputs.
- **Bedrock privacy:** understand how inference data is handled (provider terms); don't put secrets in prompts; prefer PrivateLink paths.
- **Retention:** S3 Lifecycle on invocation logs, chat history, and eval datasets; DynamoDB TTLs; keep prompt/response retention in CloudWatch to a minimum.

## AWS services in play

Amazon VPC / PrivateLink, IAM, AWS Lake Formation, Amazon Macie, Amazon Comprehend, Amazon Bedrock Guardrails, Amazon Bedrock Data Automation, Amazon S3 Lifecycle, Amazon CloudWatch, AWS CloudTrail, Amazon Cognito.

## Hands-on

1. Deploy a bedrock-runtime VPC endpoint and force a Lambda (no NAT) to call Converse. Same lockdown pattern as [B8](../../build.md#b8), applied to the AIP stack.
2. A Comprehend-to-Macie quarantine pipeline before KB sync (per AWS's RAG sensitive-data guidance).
3. Guardrail PII masking + a 30-day S3 lifecycle expiry on the invocation log bucket. Both belong in [B11](../../build.md#b11).

## Exam traps

- Logging full prompts with PII to CloudWatch without masking.
- A public NAT path "because PrivateLink is hard."
- Redacting only outputs while indexing raw PII into the vector store.
- Keeping invocation logs forever "for debugging."

## Exam guide mapping

- **Task 3.2**, Skills 3.2.1-3.2.3: implement data security and privacy controls.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html>
- <https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html>
- <https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html>
- <https://docs.aws.amazon.com/solutions/securing-sensitive-data-in-rag-applications-using-amazon-bedrock/>
- <https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/bda-sensitive-data.html>