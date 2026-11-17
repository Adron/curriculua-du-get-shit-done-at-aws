# TEKsystems AWS AI Certification Curriculum

Ordered path for the three AWS AI certifications that matter most for TEKsystems’ AWS Premier Tier standing and AI/ML delivery coverage.

| Priority | Certification | Exam | Level | Cost | Curriculum |
|---|---|---|---|---|---|
| **1** | [AWS Certified AI Practitioner](https://aws.amazon.com/certification/certified-ai-practitioner/) | AIF-C01 | Foundational | $100 | [AIF-C01.md](AIF-C01.md) |
| **2** | [AWS Certified Machine Learning Engineer – Associate](https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/) | MLA-C02 | Associate | $150 ($75 beta) | [MLA-C02.md](MLA-C02.md) |
| **3** | [AWS Certified Generative AI Developer – Professional](https://aws.amazon.com/certification/certified-generative-ai-developer-professional/) | AIP-C01 | Professional | $300 | [AIP-C01.md](AIP-C01.md) |

**Do not skip the order.** AIF → MLA → AIP stacks concepts (concepts → pipelines → production GenAI) and matches how AWS recommends progressing after AI Practitioner.

**Out of scope for this path:** Cloud Practitioner, Solutions Architect, Developer Associate, CloudOps, AI Business Strategist. Those count for partnership too, but these three are the AI-specific set TEKsystems needs covered.

---

## Target timeline

Assume ~5–8 hrs/week of focused study plus hands-on. Adjust up if you already ship Bedrock/SageMaker work.

| Phase | Cert | Suggested duration | Exit criteria |
|---|---|---|---|
| 1 | [AIF-C01](AIF-C01.md) | 2–3 weeks | Official practice exam ≥80%; can explain FM vs traditional ML, RAG, responsible AI, and core AWS AI services |
| 2 | [MLA-C02](MLA-C02.md) | 6–8 weeks | Can prepare data, train/tune, deploy, and monitor ML + FM workloads on SageMaker/Bedrock; practice exam ≥80% |
| 3 | [AIP-C01](AIP-C01.md) | 8–10 weeks | Can design, implement, secure, optimize, and troubleshoot production GenAI (RAG, agents, evals) on AWS |

**Rough calendar:** ~4–5 months end-to-end. Compress Phase 1 if you already know GenAI vocabulary; do not compress Phase 3.

---

## Cross-cutting study habits

- **Official sources first:** exam guides + Skill Builder prep plans + official practice exams. Third-party dumps are a liability.
- **Hands-on after AIF:** Console + IaC (CDK/Terraform/CloudFormation) for MLA and AIP; reading alone will not hold.
- **Partner value check:** each of these three counts on the Premier Foundational/Technical scorecard; AIP also strengthens Pro/Specialty mix.
- **Recertification:** each cert lasts 3 years. Passing MLA auto-recertifies AIF — another reason to take them in order.
- **Booking:** Pearson VUE; schedule only after practice-exam threshold, not after “finishing the course.”

---

## Official links

| Resource | URL |
|---|---|
| AI Practitioner | https://aws.amazon.com/certification/certified-ai-practitioner/ |
| ML Engineer – Associate | https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/ |
| Generative AI Developer – Professional | https://aws.amazon.com/certification/certified-generative-ai-developer-professional/ |
| All exam guides | https://docs.aws.amazon.com/aws-certification/latest/examguides/aws-certification-exam-guides.html |
| AWS Skill Builder | https://skillbuilder.aws/ |
| Schedule exams (Pearson VUE) | https://www.pearsonvue.com/us/en/amazon.html |
