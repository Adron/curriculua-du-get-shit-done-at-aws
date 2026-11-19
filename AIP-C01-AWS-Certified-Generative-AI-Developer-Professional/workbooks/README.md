---
layout: default
title: AIP-C01 Workbooks
---

# AIP-C01 Workbooks

Active study for **AWS Certified Generative AI Developer – Professional (AIP-C01)**. These workbooks turn topic notes into production judgment: defend FM, RAG, agent, safety, cost, and eval choices under real constraints—not service memorization.

**Back:** [Cert README](../README.md) · [Punch list](../PUNCH-LIST.md) · [Curriculum index](../../index.md)

## How to use

1. Read the mapped `../topics/*.md` notes (open Research links).
2. Work the workbook **closed-book** sections before peeking at the answer key.
3. Complete labs on a real AWS account (Bedrock model access, Guardrails, KB, AgentCore where available).
4. After each workbook, write a one-page ADR: constraints → options → choice → failure modes → cost envelope.
5. Capstone ships a vertical slice; schedule the exam only when Skill Builder practice is **≥80%**.

Every workbook follows the same learning design:

1. Learning objectives  
2. Prerequisites + time  
3. Activate prior knowledge  
4. Concept refresh (links to topics)  
5. Closed-book retrieval  
6. Worked → guided → independent practice  
7. Architecture defense scenarios (security / cost / reliability)  
8. Hands-on production-shaped labs  
9. Misconceptions / traps  
10. Reflection  
11. Mastery checklist  
12. Answer key (at the end)

## Production project framing (carry through all weeks)

Build one system and harden it weekly:

> **Internal Policy & Ops Copilot** — multi-tenant RAG over policy PDFs + runbooks; a tool-using agent for ticket triage / order lookup; Guardrails + grounding; eval gates in CI; cost/latency controls; CloudWatch + AgentCore Observability.

| Slice | What you ship |
| --- | --- |
| RAG core | S3 corpus → Glue DQ → Bedrock KB (hybrid + rerank) → Converse + citations |
| Agent layer | Strands (or Agent Squad) + MCP tools via AgentCore Gateway → HITL for irreversible actions |
| Safety | Guardrails (content, PII, prompt attack, grounding) + VPC endpoints + logging |
| Ops | Token/throttle dashboards, prompt caching, tiered models, eval regression gates |

Defend every decision in writing. The exam rewards *why*, not *which logo*.

## 8–10 week schedule

Assume **6–10 hours/week**. Compress only if you already run Bedrock RAG + agents in production; do not skip Domain 1 (31%) or Domain 3 safety overlay.

| Week | Focus | Workbook | Topics | Exit criteria |
| --- | --- | --- | --- | --- |
| 1 | Design + FM selection | [01](./01-fm-integration-data-and-rag.md) (Part A) | [01](../topics/01-genai-solution-design-and-requirements.md)–[02](../topics/02-fm-selection-and-configuration.md) | ADR + AppConfig model router sketch |
| 2 | Data → vectors | 01 (Part B) | [03](../topics/03-data-validation-and-processing-for-fms.md)–[04](../topics/04-vector-store-solutions.md) | Glue DQ + KB with metadata ACLs |
| 3 | RAG + prompts | 01 (Part C) | [05](../topics/05-retrieval-mechanisms-and-rag.md)–[06](../topics/06-prompt-engineering-and-governance.md) | Hybrid retrieve + Prompt Management + grounding |
| 4 | Agents + tools | [02](./02-agents-and-enterprise-integration.md) (Part A) | [07](../topics/07-agentic-ai-and-tool-integrations.md)–[08](../topics/08-model-deployment-strategies.md) | Strands/AgentCore path + stop conditions |
| 5 | Enterprise + APIs | 02 (Part B) | [09](../topics/09-enterprise-integration-architectures.md)–[11](../topics/11-application-integration-patterns.md) | Gateway/event pattern + streaming Converse |
| 6 | Safety + privacy | [03](./03-safety-security-governance.md) (Part A) | [12](../topics/12-input-output-safety-controls.md)–[13](../topics/13-data-security-and-privacy.md) | Guardrails on all inference paths |
| 7 | Governance + RAI | 03 (Part B) | [14](../topics/14-ai-governance-and-compliance.md)–[15](../topics/15-responsible-ai-principles.md) | Model card + lineage + fairness sample |
| 8 | Cost / perf / monitor | [04](./04-optimize-monitor-evaluate-troubleshoot.md) (Part A) | [16](../topics/16-cost-optimization-and-resource-efficiency.md)–[18](../topics/18-monitoring-genai-applications.md) | Cost dashboard + invocation logging |
| 9 | Evals + troubleshoot | 04 (Part B) | [19](../topics/19-evaluation-systems-for-genai.md)–[20](../topics/20-troubleshooting-genai-applications.md) | RAG/agent eval gate + playbook |
| 10 | Capstone + exam | [05](./05-capstone-production-genai-system.md) | All | Ship vertical slice; practice exam ≥80% |

**9-week compression:** merge weeks 6–7 and 8–9; keep week 10 for capstone + practice exams.

**10-week stretch:** add a buffer week after week 3 for RAG quality iteration before agents.

## Workbook index

| # | File | Domains | Weight covered |
| --- | --- | --- | --- |
| 01 | [FM integration, data, and RAG](./01-fm-integration-data-and-rag.md) | Domain 1 | 31% |
| 02 | [Agents and enterprise integration](./02-agents-and-enterprise-integration.md) | Domain 2 | 26% |
| 03 | [Safety, security, and governance](./03-safety-security-governance.md) | Domain 3 | 20% |
| 04 | [Optimize, monitor, evaluate, troubleshoot](./04-optimize-monitor-evaluate-troubleshoot.md) | Domains 4–5 | 23% |
| 05 | [Capstone: production GenAI system](./05-capstone-production-genai-system.md) | All | Practice ≥80% |

## Suggested domain order (aligned with punch list)

1. Domain 1 end-to-end (design → FM → data → vectors → RAG → prompts)  
2. Domain 3 safety overlay on the same stack  
3. Domain 2 agents + enterprise integration  
4. Domain 4 cost / perf / monitoring  
5. Domain 5 eval + troubleshooting playbooks  

The weekly table above interleaves Domain 2 before Domain 3 for project momentum; if you prefer punch-list order, do workbook 03 before 02 and adjust weeks 4–7.

## Exit criteria for the cert

- [ ] All five workbooks mastery checklists complete  
- [ ] Capstone ADR + demo path documented  
- [ ] Skill Builder / practice exam **≥80%** twice (or once ≥85%)  
- [ ] Can explain AgentCore vs Strands vs Agent Squad without notes  
- [ ] Can defend Geographic vs Global inference, Guardrails tagging, and Provisioned Throughput limits  

Official prep: [Skill Builder AIP-C01](https://skillbuilder.aws/category/exam-prep/generative-ai-developer-professional-aip-c01) · [Exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html)
