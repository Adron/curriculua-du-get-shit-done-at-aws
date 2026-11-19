# AWS Certified Generative AI Developer – Professional (AIP-C01)

Production-depth study pack for integrating foundation models into AWS applications: Bedrock, RAG/vector stores, agents (AgentCore / Strands), safety/governance, cost/perf, and evaluation/troubleshooting.

## Exam snapshot

| Attribute | Value |
| --- | --- |
| Level | Professional |
| Duration | 180 minutes |
| Questions | 75 (65 scored + 10 unscored) |
| Format | Multiple choice / multiple response |
| Cost | USD $300 |
| Pass score | 750 / 1000 (compensatory scoring) |
| Validity | 3 years |
| Target | 2+ years building production apps on AWS (or OSS), plus ~1 year hands-on GenAI |

Official pages:

- [Certification overview](https://aws.amazon.com/certification/certified-generative-ai-developer-professional/)
- [Exam guide (HTML)](https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html)
- [Exam guide (PDF)](https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-professional-01/ai-professional-01.pdf)
- Curriculum source: [Adron/curriculum-2027](https://github.com/Adron/curriculum-2027)

## Domain weights

| Domain | Weight | Focus |
| --- | --- | --- |
| 1 — Foundation Model Integration, Data Management, and Compliance | **31%** | Design, FM selection, data pipelines, vectors, RAG, prompts |
| 2 — Implementation and Integration | **26%** | Agents/tools, deployment, enterprise integration, FM APIs, app patterns |
| 3 — AI Safety, Security, and Governance | **20%** | Guardrails, privacy, governance, Responsible AI |
| 4 — Operational Efficiency and Optimization | **12%** | Cost, latency/throughput, GenAI monitoring |
| 5 — Testing, Validation, and Troubleshooting | **11%** | Evaluations, RAG/agent evals, failure diagnosis |

Study checklist: **[PUNCH-LIST.md](./PUNCH-LIST.md)** → deep notes under [`topics/`](./topics/).

## Production-project study approach

Do not memorize service menus. Build one vertical slice and defend every choice under **security, cost, and reliability**:

1. **PoC → production path** — Bedrock playground / Prompt Management → API Gateway + Lambda (or AgentCore Runtime) → CI/CD with eval gates.
2. **RAG with governance** — S3 corpus → Glue Data Quality → Knowledge Bases (or OpenSearch / Aurora pgvector) → hybrid search + rerank → Guardrails grounding checks → invocation logging.
3. **Agent with tools** — Strands (or Agent Squad routing) + MCP tools via AgentCore Gateway → Step Functions stop conditions / HITL → Observability traces.
4. **Cost/latency loop** — tiered models, prompt/semantic caching, streaming, provisioned throughput only where justified; CloudWatch token/throttle dashboards.
5. **Eval gates** — Bedrock Model / RAG evaluations (LLM-as-judge), golden datasets, canary before model or prompt promotion.

Out of exam scope (do not over-index): training FMs from scratch, advanced classical ML, deep feature engineering.

## AgentCore and Strands (exam-critical)

These appear explicitly in Domain 2 (and supporting ops/safety skills):

| Piece | Role in production GenAI |
| --- | --- |
| **Amazon Bedrock AgentCore** | Enterprise platform around agents: **Runtime** (session-isolated microVMs), **Gateway** (APIs/Lambda → MCP tools), **Memory**, **Identity**, **Observability**, Browser/Code Interpreter. Framework-agnostic (Strands, LangGraph, CrewAI, custom). |
| **Strands Agents** | AWS-initiated open-source SDK for **model-driven** agents (agent loop, tools, MCP, multi-agent patterns: swarm/graph/workflow). Write the agent; AgentCore runs/secures/observes it. |
| **AWS Agent Squad** | Lightweight **multi-agent router** (intent classification + shared context). Open-source orchestration pattern—not a managed AWS control-plane service. |
| **MCP** | Standard tool/context protocol for retrieval and tool calling; exam expects MCP clients/servers (Lambda for light tools, ECS for heavy) and AgentCore Gateway targets. |

Defend: isolate sessions, least-privilege tool IAM, timeouts/circuit breakers, human-in-the-loop for irreversible actions, and OTEL-style traces for tool/agent steps.

## How to use this pack

1. Walk [PUNCH-LIST.md](./PUNCH-LIST.md) domain by domain (Domain 1 first—highest weight).
2. For each item, read `topics/*.md`, click **Research links**, then implement the hands-on project idea.
3. After each domain, write a one-page architecture decision record (ADR): constraints → options → choice → failure modes → cost envelope.
4. Close with Domain 5: wire evaluations and troubleshooting playbooks into the same project.

## Official links (bookmark)

- [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
- [Well-Architected Generative AI Lens](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html)
- [Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- [Strands Agents (AWS Prescriptive Guidance)](https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/strands-agents.html)
- [Skill Builder: AIP-C01 prep](https://skillbuilder.aws/category/exam-prep/generative-ai-developer-professional-aip-c01)
