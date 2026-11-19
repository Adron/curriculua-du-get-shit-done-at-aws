# AIF-C01 Punch List

Checklist of all key topics for AWS Certified AI Practitioner. Each item links to a study note in [`topics/`](./topics/).

Mark items done as you study. Prefer Domain 3 → 2 → 1 → 4/5 by exam weight.

---

## Domain 1 — Fundamentals of AI and ML (20%)

- [ ] [01 — AI/ML terminology and concepts](./topics/01-ai-ml-terminology-and-concepts.md) — AI vs ML vs DL vs GenAI vs agentic AI; models, algorithms, training vs inference; data types
- [ ] [02 — AI use cases and technique selection](./topics/02-ai-use-cases-and-technique-selection.md) — when AI helps / does not; regression/classification/clustering; AWS managed AI services map
- [ ] [03 — AI/ML lifecycle and MLOps basics](./topics/03-ai-ml-lifecycle-and-mlops-basics.md) — pipeline stages; FM sources; production hosting; metrics; MLOps concepts

## Domain 2 — Fundamentals of GenAI (24%)

- [ ] [04 — GenAI foundational concepts](./topics/04-genai-foundational-concepts.md) — tokens, embeddings, vectors, chunking, transformers/LLMs/FMs, multimodal, diffusion, pricing, context engineering, agentic AI/MCP
- [ ] [05 — GenAI capabilities, limitations, selection](./topics/05-genai-capabilities-limitations-selection.md) — advantages/disadvantages; hallucinations; selection factors; business value metrics
- [ ] [06 — AWS GenAI infrastructure and services](./topics/06-aws-genai-infrastructure-and-services.md) — Bedrock, SageMaker AI/JumpStart, AgentCore, Strands, Quick, Kiro; cost tradeoffs; security/compliance

## Domain 3 — Applications of Foundation Models (28%)

- [ ] [07 — FM application design: RAG and agents](./topics/07-fm-application-design-rag-agents.md) — FM selection; inference params; RAG + Knowledge Bases; vector DBs; customization tradeoffs; AI agents
- [ ] [08 — Prompt engineering techniques](./topics/08-prompt-engineering-techniques.md) — CoT, zero/few-shot, templates; risks; Bedrock Prompt Management
- [ ] [09 — FM training and fine-tuning](./topics/09-fm-training-and-fine-tuning.md) — pre-training, fine-tuning, continuous pre-training, distillation, RLHF, data prep
- [ ] [10 — FM evaluation methods and metrics](./topics/10-fm-evaluation-methods-and-metrics.md) — Bedrock Model Evaluation; ROUGE/BLEU/BERTScore/LLM-as-judge; HITL; RAG/agents eval

## Domain 4 — Guidelines for Responsible AI (14%)

- [ ] [11 — Responsible AI principles and practices](./topics/11-responsible-ai-principles-and-practices.md) — bias/fairness/safety/veracity; Guardrails; legal risks; datasets; bias tools
- [ ] [12 — Transparency and explainability](./topics/12-transparency-and-explainability.md) — transparent vs opaque models; Model Cards; Bedrock evaluations; human-centered design; safety vs transparency

## Domain 5 — Security, Compliance, and Governance (14%)

- [ ] [13 — Securing AI systems](./topics/13-securing-ai-systems.md) — IAM, encryption, Macie, PrivateLink, shared responsibility, Guardrails, AgentCore Identity; prompt injection; data leakage; grounding
- [ ] [14 — AI governance and compliance](./topics/14-ai-governance-and-compliance.md) — Config/Inspector/Artifact/CloudTrail/Trusted Advisor; data residency/retention; Generative AI Security Scoping Matrix

---

## Quick completion status

| Domain | Items | Done when |
|---|---|---|
| D1 | 3 | Can define AI/ML/GenAI/agentic and pick technique + service |
| D2 | 3 | Can explain tokens/embeddings/RAG pricing and AWS GenAI stack |
| D3 | 4 | Can choose prompt vs RAG vs fine-tune; name eval metrics |
| D4 | 2 | Can map responsible AI dims to Guardrails / Model Cards |
| D5 | 2 | Can map threats to IAM/encryption/Guardrails/scoping matrix |

Back to [README.md](./README.md)
