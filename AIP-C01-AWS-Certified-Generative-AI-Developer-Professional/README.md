---
title: "AIP-C01: AWS Certified Generative AI Developer – Professional"
---

# AIP-C01: AWS Certified Generative AI Developer – Professional

**Step 3 of 3** · Professional · $300 · 8-10 weeks
**Path:** [home](../index.md) → [AIF-C01](../AIF-C01-AWS-Certified-AI-Practitioner/) → [MLA-C02](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/) → **AIP-C01**

This is the one the first two are building toward. Production GenAI on AWS: foundation models wired into real applications, RAG and vector stores, agents (AgentCore and Strands), safety and governance, cost and performance, and evaluation and troubleshooting when it all goes sideways.

**Don't compress this phase.** Production depth is the point. Knowing the service menu won't get you through it. You have to be able to defend a design under security, cost, and reliability pressure.

**I'm done with this one when** I can defend the architecture of a production GenAI system under those constraints, not just describe the services in it.

## Exam snapshot

| Item | Detail |
|---|---|
| Level | Professional |
| Duration | 180 minutes |
| Questions | 75 (65 scored + 10 unscored) |
| Format | Multiple choice / multiple response |
| Cost | $300 USD |
| Pass score | 750 / 1000 (compensatory scoring) |
| Validity | 3 years |
| Target | 2+ years building production apps on AWS (or OSS), plus ~1 year hands-on GenAI |

## Domain weights

| Domain | Weight | Focus |
|---|---|---|
| 1. Foundation Model Integration, Data Management, and Compliance | **31%** | Design, FM selection, data pipelines, vectors, RAG, prompts |
| 2. Implementation and Integration | **26%** | Agents and tools, deployment, enterprise integration, FM APIs, app patterns |
| 3. AI Safety, Security, and Governance | **20%** | Guardrails, privacy, governance, responsible AI |
| 4. Operational Efficiency and Optimization | **12%** | Cost, latency and throughput, GenAI monitoring |
| 5. Testing, Validation, and Troubleshooting | **11%** | Evaluations, RAG and agent evals, failure diagnosis |

## How I'm studying this one

Don't memorize service menus. **Build one vertical slice and defend every choice in it.** For me that's build milestones [B9-B12](../build.md#b9), the production version of Ask Composite Code. The slice covers:

1. **PoC to production.** Bedrock playground and Prompt Management → API Gateway + Lambda (or AgentCore Runtime) → CI/CD with eval gates.
2. **RAG with governance.** S3 corpus → Glue Data Quality → Knowledge Bases (or OpenSearch / Aurora pgvector) → hybrid search + rerank → Guardrails grounding checks → invocation logging.
3. **An agent with tools.** Strands (or Agent Squad routing) + MCP tools through AgentCore Gateway → Step Functions stop conditions and human-in-the-loop → Observability traces.
4. **A cost and latency loop.** Tiered models, prompt and semantic caching, streaming, provisioned throughput only where it's justified, CloudWatch dashboards for tokens and throttles.
5. **Eval gates.** Bedrock model and RAG evaluations (LLM-as-judge), golden datasets, canary before any model or prompt gets promoted.

After each domain I write a one-page ADR: constraints → options → choice → failure modes → cost envelope. That's the exam's thinking pattern, written down.

**Out of scope, don't over-index:** training FMs from scratch, advanced classical ML, deep feature engineering.

### The steps

1. Read the [exam guide (PDF)](https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-professional-01/ai-professional-01.pdf).
2. Walk the [punch list](PUNCH-LIST.md) domain by domain, Domain 1 first since it's the heaviest. For each item: read the topic note, click through the research links, do the hands-on.
3. Work the matching [workbook](workbooks/): closed-book retrieval, labs, then the mastery checklist. Answer keys stay at the bottom where they belong.
4. Skill Builder Exam Prep Plan for Generative AI Developer – Professional.
5. Optional: the Skill Builder **AWS Agentic AI Demonstrated** microcredential, for hands-on AgentCore proof.
6. Close with [capstone workbook 05](workbooks/05-capstone-production-genai-system.md): ship the slice, then practice exams until I'm steady at ≥80%.

## AgentCore and Strands (exam-critical)

These show up explicitly in Domain 2 and leak into the ops and safety skills too. Know which piece does what.

| Piece | Role in production GenAI |
|---|---|
| **Amazon Bedrock AgentCore** | The enterprise platform around agents: **Runtime** (session-isolated microVMs), **Gateway** (APIs/Lambda → MCP tools), **Memory**, **Identity**, **Observability**, Browser and Code Interpreter. Framework-agnostic (Strands, LangGraph, CrewAI, custom). |
| **Strands Agents** | AWS-initiated open-source SDK for **model-driven** agents: agent loop, tools, MCP, multi-agent patterns (swarm, graph, workflow). You write the agent; AgentCore runs, secures, and observes it. |
| **AWS Agent Squad** | Lightweight open-source **multi-agent router** (intent classification + shared context). An orchestration pattern, not a managed AWS control plane. |
| **MCP** | The standard protocol for tools and context. Expect MCP clients and servers (Lambda for light tools, ECS for heavy ones) and AgentCore Gateway targets. |

Be ready to defend: isolated sessions, least-privilege tool IAM, timeouts and circuit breakers, human-in-the-loop for anything irreversible, and OTEL-style traces across tool and agent steps.

## What's in here

| Piece | What it's for |
|---|---|
| [PUNCH-LIST.md](PUNCH-LIST.md) | All 20 topics as checkboxes, grouped by domain, with task and skill IDs |
| [topics/](topics/) | One note per topic: production implementation notes, services, hands-on, traps, research links |
| [workbooks/](workbooks/) | 8-10 weeks of practice: retrieval, architecture defense, production-shaped labs |

### Workbooks

Each one has learning objectives, prerequisites and time, a warm-up, topic refresh links, closed-book retrieval, worked → guided → independent practice, security/cost/reliability defense scenarios, labs, traps, reflection, a mastery checklist, and an answer key at the end.

| Workbook | Focus | Topics |
|---|---|---|
| [How to use + schedule](workbooks/README.md) | The 8-10 week plan | n/a |
| [01: FM integration, data, and RAG](workbooks/01-fm-integration-data-and-rag.md) | Domain 1 (31%) | 01-06 |
| [02: Agents and enterprise integration](workbooks/02-agents-and-enterprise-integration.md) | Domain 2 (26%) | 07-11 |
| [03: Safety, security, and governance](workbooks/03-safety-security-governance.md) | Domain 3 (20%) | 12-15 |
| [04: Optimize, monitor, evaluate, troubleshoot](workbooks/04-optimize-monitor-evaluate-troubleshoot.md) | Domains 4-5 (23%) | 16-20 |
| [05: Capstone, production GenAI system](workbooks/05-capstone-production-genai-system.md) | Ship the slice; practice exam ≥80% | All |

## Progress tracker

- [ ] Exam guide read
- [ ] Skill Builder prep plan complete
- [ ] Workbooks 01-05 done
- [ ] Build: B9 production RAG API
- [ ] Build: B10 the agent (AgentCore + Strands + MCP)
- [ ] Build: B11 safety and governance
- [ ] Build: B12 evals and ops
- [ ] One ADR per domain
- [ ] Official practice exam ≥80%
- [ ] Exam scheduled
- [ ] Passed

## Official links

| Resource | Link |
|---|---|
| Certification page | <https://aws.amazon.com/certification/certified-generative-ai-developer-professional/> |
| Exam guide (HTML) | <https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html> |
| Exam guide (PDF) | <https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-professional-01/ai-professional-01.pdf> |
| Amazon Bedrock User Guide | <https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html> |
| Well-Architected Generative AI Lens | <https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html> |
| Amazon Bedrock AgentCore | <https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html> |
| Strands Agents (Prescriptive Guidance) | <https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/strands-agents.html> |
| Skill Builder: AIP-C01 prep | <https://skillbuilder.aws/category/exam-prep/generative-ai-developer-professional-aip-c01> |
| Schedule (Pearson VUE) | <https://www.pearsonvue.com/us/en/amazon.html> |
