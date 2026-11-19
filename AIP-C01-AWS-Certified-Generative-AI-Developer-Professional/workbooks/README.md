---
layout: default
title: AIP-C01 Workbooks
---

# AIP-C01 Workbooks

Active study for **AWS Certified Generative AI Developer – Professional (AIP-C01)**. The topic notes tell you what the services are. These workbooks are where that turns into production judgment: defending FM, RAG, agent, safety, cost, and eval choices under real constraints. **Memorizing service names won't get you through a Professional exam.** Being able to say *why* will.

**Back:** [Cert README](../README.md) · [Punch list](../PUNCH-LIST.md) · [Curriculum index](../../index.md)

## How to use

Here's how I'm working through these:

1. Read the mapped `../topics/*.md` notes, and actually open the Research links.
2. Do the **closed-book** sections before peeking at the answer key. Peeking first feels productive. It isn't.
3. Do the labs on a real AWS account (Bedrock model access, Guardrails, KB, AgentCore where available).
4. After each workbook, write a one-page ADR: constraints, options, choice, failure modes, cost envelope.
5. The capstone ships a vertical slice. Schedule the exam only when Skill Builder practice is **≥80%**.

Every workbook follows the same learning design, so once you've done one you know the shape of the rest:

1. Learning objectives  
2. Prerequisites + time  
3. Activate prior knowledge  
4. Concept refresh (links to topics)  
5. Closed-book retrieval  
6. Worked, guided, then independent practice  
7. Architecture defense scenarios (security / cost / reliability)  
8. Hands-on production-shaped labs  
9. Misconceptions / traps  
10. Reflection  
11. Mastery checklist  
12. Answer key (at the end)

## Production project framing (carry through all weeks)

Build one system and harden it every week. Don't build five throwaway demos.

> **Internal Policy & Ops Copilot**: multi-tenant RAG over policy PDFs + runbooks; a tool-using agent for ticket triage / order lookup; Guardrails + grounding; eval gates in CI; cost/latency controls; CloudWatch + AgentCore Observability.

That's the generic framing the workbooks use. My version of it is **Ask Composite Code**, the RAG assistant and agent over my blog archive, and the AIP slices of it are build milestones [B9](../../build.md#b9) through [B12](../../build.md#b12). Same shape, different corpus. Swap "policy PDFs" for "blog posts" and "order lookup" for "GitHub repo lookup" as you go.

| Slice | What you ship | Build milestone |
| --- | --- | --- |
| RAG core | S3 corpus → Glue DQ → Bedrock KB (hybrid + rerank) → Converse + citations | [B9](../../build.md#b9) |
| Agent layer | Strands (or Agent Squad) + MCP tools via AgentCore Gateway → HITL for irreversible actions | [B10](../../build.md#b10) |
| Safety | Guardrails (content, PII, prompt attack, grounding) + VPC endpoints + logging | [B11](../../build.md#b11) |
| Ops | Token/throttle dashboards, prompt caching, tiered models, eval regression gates | [B12](../../build.md#b12) |

Defend every decision in writing. The exam rewards *why*, not *which logo*.

## 8-10 week schedule

Plan on **6-10 hours a week**. Only compress if you already run Bedrock RAG + agents in production, and even then don't skip Domain 1 (31%) or the Domain 3 safety overlay.

| Week | Focus | Workbook | Topics | Exit criteria |
| --- | --- | --- | --- | --- |
| 1 | Design + FM selection | [01](./01-fm-integration-data-and-rag.md) (Part A) | [01](../topics/01-genai-solution-design-and-requirements.md)-[02](../topics/02-fm-selection-and-configuration.md) | ADR + AppConfig model router sketch |
| 2 | Data → vectors | 01 (Part B) | [03](../topics/03-data-validation-and-processing-for-fms.md)-[04](../topics/04-vector-store-solutions.md) | Glue DQ + KB with metadata ACLs |
| 3 | RAG + prompts | 01 (Part C) | [05](../topics/05-retrieval-mechanisms-and-rag.md)-[06](../topics/06-prompt-engineering-and-governance.md) | Hybrid retrieve + Prompt Management + grounding |
| 4 | Agents + tools | [02](./02-agents-and-enterprise-integration.md) (Part A) | [07](../topics/07-agentic-ai-and-tool-integrations.md)-[08](../topics/08-model-deployment-strategies.md) | Strands/AgentCore path + stop conditions |
| 5 | Enterprise + APIs | 02 (Part B) | [09](../topics/09-enterprise-integration-architectures.md)-[11](../topics/11-application-integration-patterns.md) | Gateway/event pattern + streaming Converse |
| 6 | Safety + privacy | [03](./03-safety-security-governance.md) (Part A) | [12](../topics/12-input-output-safety-controls.md)-[13](../topics/13-data-security-and-privacy.md) | Guardrails on all inference paths |
| 7 | Governance + RAI | 03 (Part B) | [14](../topics/14-ai-governance-and-compliance.md)-[15](../topics/15-responsible-ai-principles.md) | Model card + lineage + fairness sample |
| 8 | Cost / perf / monitor | [04](./04-optimize-monitor-evaluate-troubleshoot.md) (Part A) | [16](../topics/16-cost-optimization-and-resource-efficiency.md)-[18](../topics/18-monitoring-genai-applications.md) | Cost dashboard + invocation logging |
| 9 | Evals + troubleshoot | 04 (Part B) | [19](../topics/19-evaluation-systems-for-genai.md)-[20](../topics/20-troubleshooting-genai-applications.md) | RAG/agent eval gate + playbook |
| 10 | Capstone + exam | [05](./05-capstone-production-genai-system.md) | All | Ship vertical slice; practice exam ≥80% |

**9-week compression:** merge weeks 6-7 and 8-9, and keep week 10 for the capstone + practice exams.

**10-week stretch:** add a buffer week after week 3 to iterate on RAG quality before you start on agents. If retrieval is shaky, an agent on top of it just fails faster.

## Workbook index

| # | File | Domains | Weight covered |
| --- | --- | --- | --- |
| 01 | [FM integration, data, and RAG](./01-fm-integration-data-and-rag.md) | Domain 1 | 31% |
| 02 | [Agents and enterprise integration](./02-agents-and-enterprise-integration.md) | Domain 2 | 26% |
| 03 | [Safety, security, and governance](./03-safety-security-governance.md) | Domain 3 | 20% |
| 04 | [Optimize, monitor, evaluate, troubleshoot](./04-optimize-monitor-evaluate-troubleshoot.md) | Domains 4-5 | 23% |
| 05 | [Capstone: production GenAI system](./05-capstone-production-genai-system.md) | All | Practice ≥80% |

## Suggested domain order (aligned with punch list)

1. Domain 1 end to end (design, FM, data, vectors, RAG, prompts)  
2. Domain 3 safety overlay on the same stack  
3. Domain 2 agents + enterprise integration  
4. Domain 4 cost / perf / monitoring  
5. Domain 5 eval + troubleshooting playbooks  

The weekly table above puts Domain 2 before Domain 3 to keep the project moving. If you'd rather follow punch-list order, do workbook 03 before 02 and shuffle weeks 4-7 to match.

## Exit criteria for the cert

- [ ] All five workbooks' mastery checklists complete  
- [ ] Capstone ADR + demo path documented  
- [ ] Skill Builder / practice exam **≥80%** twice (or once ≥85%)  
- [ ] Can explain AgentCore vs Strands vs Agent Squad without notes  
- [ ] Can defend Geographic vs Global inference, Guardrails tagging, and Provisioned Throughput limits  

Official prep: [Skill Builder AIP-C01](https://skillbuilder.aws/category/exam-prep/generative-ai-developer-professional-aip-c01) · [Exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html)
