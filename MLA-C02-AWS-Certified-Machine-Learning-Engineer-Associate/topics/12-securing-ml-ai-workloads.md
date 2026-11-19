# 12 — Securing ML and AI workloads

**Domain 4 · Task 4.3** · Skills **4.3.1–4.3.9** · Domain weight **24%**

## What it is

Hardening ML/GenAI systems: pipeline vulnerability scans, least privilege, IAM, audit/compliance logging, encryption, VPC isolation, secrets, Bedrock credentials, and Guardrails / content safety for responsible AI.

## Why it matters for MLA-C02

C02 explicitly adds **CI/CD vulnerability checks (Inspector, CodeGuru)**, **Bedrock credential types (API keys vs IAM)**, and **Guardrails / sensitive data protection** aligned with responsible AI policies.

## Exam-relevant skills map

| Skill | Focus |
|---|---|
| 4.3.1 | Secure CI/CD — CodeGuru, Inspector on code/images |
| 4.3.2 | Least privilege to ML/AI artifacts |
| 4.3.3 | IAM policies/roles for users & apps |
| 4.3.4 | CloudTrail, Config — audit & compliance |
| 4.3.5 | Troubleshoot security issues |
| 4.3.6 | VPC, subnets, security groups isolation |
| 4.3.7 | Identify/mitigate risks & vulnerabilities |
| 4.3.8 | Bedrock API keys vs IAM credentials |
| 4.3.9 | Guardrails & sensitive data protection |

## CI/CD security (4.3.1)

| Control | Service |
|---|---|
| Code quality / security findings | Amazon CodeGuru (exam guide still lists it; prefer current Inspector / Q Developer code review paths in practice) |
| Container/CVE + CI scanning | Amazon Inspector (ECR images, CI/CD integrations) |
| Dependency artifacts | CodeArtifact + scan policies |

Fail the pipeline on critical CVEs before deploy.

## Identity & least privilege

- Separate roles: training job role, endpoint execution role, pipeline role, data scientist user SSO role.
- Scope S3 prefixes per project; deny `*` on model buckets in prod.
- Resource tags + ABAC where useful.
- Cross-account model sharing: explicit resource policies.

## Credentials for Bedrock (4.3.8)

| Type | When |
|---|---|
| **IAM credentials / roles** | Preferred for AWS workloads (EC2, Lambda, SageMaker) via temporary creds |
| **Bedrock API keys** | Patterns where long-lived app keys are required — treat like secrets |

Never embed long-lived keys in images; use Secrets Manager / SSM; rotate.

## Network isolation

- Private subnets for training clusters & endpoints
- Security groups: least ports (443 to VPC endpoints)
- VPC endpoints for SageMaker, S3, Bedrock, ECR, STS
- Disable internet egress unless required; no public model endpoints for sensitive data

## Encryption & secrets

| Data | Control |
|---|---|
| S3 training data / model artifacts | SSE-S3 or SSE-KMS; bucket keys |
| EBS / EFS volumes | KMS CMKs |
| In transit | TLS; VPC endpoints |
| Secrets, API keys | Secrets Manager; IAM to secret ARN only |
| Macie | Discover sensitive data in lakes |

## Audit & compliance

- **CloudTrail**: API history for SageMaker/Bedrock/IAM changes
- **Config**: drift on encryption, public access, SG rules
- Alert on `CreateEndpoint` with public access or policy changes

## Guardrails & responsible AI (4.3.9)

Bedrock Guardrails filters for:

- Content categories (hate, insults, sexual, violence, misconduct, prompt attacks)
- Denied topics, word filters
- Sensitive information (PII) — block or mask
- Contextual grounding checks (RAG hallucination control)
- Attach to InvokeModel, Agents, Knowledge Base `RetrieveAndGenerate`, Flows

Combine with app-level authz so retrieval filters enforce tenant isolation (Guardrails ≠ ACL).

## AWS services

IAM, KMS, Secrets Manager, VPC, Inspector, CodeGuru, CloudTrail, Config, Macie, Bedrock Guardrails, SageMaker network isolation features.

## Hands-on practice

1. Scan an ECR image with Inspector; block deploy on HIGH+.
2. Create least-privilege training role (S3 read prefix + CloudWatch logs only).
3. Deploy endpoint in private VPC; prove access via VPC endpoint only.
4. Store a Bedrock-related secret in Secrets Manager; rotate.
5. Create a Guardrail with PII mask + grounding check; attach to KB query; test jailbreak and PII leakage cases.
6. Enable CloudTrail data events for S3 model bucket; query who downloaded artifacts.

## Common traps

- Wide `sagemaker:*` on data scientist roles in prod.
- Guardrails without retrieval ACL → cross-tenant doc leakage still possible.
- Public S3 model artifacts “because the endpoint is private.”
- Hard-coded Bedrock API keys in Lambda env vars (plaintext).
- Assuming encryption at rest alone satisfies compliance (missing audit/network).

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-use.html
- https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html
- https://docs.aws.amazon.com/inspector/latest/user/scanning-cicd.html
- https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/welcome.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html
- https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf
