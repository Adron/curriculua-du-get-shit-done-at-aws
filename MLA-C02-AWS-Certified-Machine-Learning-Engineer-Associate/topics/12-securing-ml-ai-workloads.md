---
title: "12: Securing ML and AI workloads"
---

# 12: Securing ML and AI workloads

**Domain 4 (24%) · Task 4.3 · Skills 4.3.1-4.3.9**

Hardening ML and GenAI systems: vulnerability scans in the pipeline, least privilege, IAM, audit and compliance logging, encryption, VPC isolation, secrets, Bedrock credentials, and Guardrails / content safety for responsible AI.

C02 explicitly adds **CI/CD vulnerability checks (Inspector, CodeGuru)**, **Bedrock credential types (API keys vs IAM)**, and **Guardrails / sensitive data protection** aligned with responsible AI policies.

**Guardrails are not access control.** That's the one I'd tattoo on the back of my hand for this topic. A Guardrail filters what goes in and out of the model. It does not decide who gets to see which documents. That's IAM and retrieval filters, and if you skip them you will leak data across tenants with a perfectly polite, well-filtered response.

## What to know

### Skills map

| Skill | Focus |
|---|---|
| 4.3.1 | Secure CI/CD: CodeGuru, Inspector on code/images |
| 4.3.2 | Least privilege to ML/AI artifacts |
| 4.3.3 | IAM policies/roles for users & apps |
| 4.3.4 | CloudTrail, Config: audit & compliance |
| 4.3.5 | Troubleshoot security issues |
| 4.3.6 | VPC, subnets, security groups isolation |
| 4.3.7 | Identify/mitigate risks & vulnerabilities |
| 4.3.8 | Bedrock API keys vs IAM credentials |
| 4.3.9 | Guardrails & sensitive data protection |

### CI/CD security (4.3.1)

| Control | Service |
|---|---|
| Code quality / security findings | Amazon CodeGuru (exam guide still lists it; prefer current Inspector / Q Developer code review paths in practice) |
| Container/CVE + CI scanning | Amazon Inspector (ECR images, CI/CD integrations) |
| Dependency artifacts | CodeArtifact + scan policies |

Fail the pipeline on critical CVEs before deploy.

### Identity and least privilege

- Separate roles: training job role, endpoint execution role, pipeline role, data scientist SSO role.
- Scope S3 prefixes per project; deny `*` on model buckets in prod.
- Resource tags + ABAC where useful.
- Cross-account model sharing: explicit resource policies.

### Credentials for Bedrock (4.3.8)

| Type | When |
|---|---|
| **IAM credentials / roles** | Preferred for AWS workloads (EC2, Lambda, SageMaker) via temporary creds |
| **Bedrock API keys** | Patterns where long-lived app keys are required; treat like secrets |

Never bake long-lived keys into images. Use Secrets Manager or SSM, and rotate.

### Network isolation

- Private subnets for training clusters and endpoints
- Security groups: least ports (443 to VPC endpoints)
- VPC endpoints for SageMaker, S3, Bedrock, ECR, STS
- Disable internet egress unless required; no public model endpoints for sensitive data

### Encryption and secrets

| Data | Control |
|---|---|
| S3 training data / model artifacts | SSE-S3 or SSE-KMS; bucket keys |
| EBS / EFS volumes | KMS CMKs |
| In transit | TLS; VPC endpoints |
| Secrets, API keys | Secrets Manager; IAM to secret ARN only |
| Macie | Discover sensitive data in lakes |

### Audit and compliance

- **CloudTrail**: API history for SageMaker, Bedrock, and IAM changes
- **Config**: drift on encryption, public access, SG rules
- Alert on `CreateEndpoint` with public access, or on policy changes

### Guardrails and responsible AI (4.3.9)

Bedrock Guardrails filter for:

- Content categories (hate, insults, sexual, violence, misconduct, prompt attacks)
- Denied topics and word filters
- Sensitive information (PII): block or mask
- Contextual grounding checks (RAG hallucination control)
- Attach to InvokeModel, Agents, Knowledge Base `RetrieveAndGenerate`, and Flows

Combine with app-level authz so retrieval filters enforce tenant isolation (Guardrails ≠ ACL).

## AWS services in play

IAM, KMS, Secrets Manager, VPC, Inspector, CodeGuru, CloudTrail, Config, Macie, Bedrock Guardrails, and SageMaker network isolation features.

## Hands-on

Items 1 through 4 and 6 are the lock-it-down half of [B8](../../build.md#b8).

1. Scan an ECR image with Inspector and block the deploy on HIGH+.
2. Create a least-privilege training role (S3 read on one prefix + CloudWatch Logs, nothing else).
3. Deploy an endpoint in a private VPC and prove it's reachable only via the VPC endpoint.
4. Store a Bedrock-related secret in Secrets Manager and rotate it.
5. Create a Guardrail with PII masking + a grounding check, attach it to a KB query, and test jailbreak and PII leakage cases.
6. Enable CloudTrail data events on the S3 model bucket and query who downloaded artifacts.

## Exam traps

- Wide `sagemaker:*` on data scientist roles in prod.
- Guardrails without retrieval ACLs. Cross-tenant doc leakage is still possible.
- Public S3 model artifacts "because the endpoint is private".
- Hard-coded Bedrock API keys in Lambda env vars (plaintext).
- Assuming encryption at rest alone satisfies compliance (you're still missing audit and network).

## Exam guide mapping

- **Domain 4 (24%) · Task 4.3 · Skills 4.3.1-4.3.9**: securing ML and AI workloads.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use.html>
- <https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html>
- <https://docs.aws.amazon.com/inspector/latest/user/scanning-cicd.html>
- <https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/welcome.html>
- <https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html>
- <https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf>