---
title: "AIP-C01 punch list"
---

# AIP-C01 punch list

Every AIP-C01 topic, mapped to its exam task and skills, with a link to the note in [topics/](topics/).

The bar here is higher: a box gets checked when I've done the research **and** built the hands-on piece for it, ideally as part of the [build](../build.md#b9). This is the production cert. If I haven't built it, I don't really know it.

The checkboxes are live on the site. They save to your browser and feed the progress meter on the [home page](../index.md).

---

## Domain 1: Foundation Model Integration, Data Management, and Compliance (31%)

- [ ] [01: GenAI solution design and requirements](./topics/01-genai-solution-design-and-requirements.md): architecture; Bedrock PoCs; Well-Architected Generative AI Lens (Tasks **1.1**, Skills **1.1.1-1.1.3**)
- [ ] [02: FM selection and configuration](./topics/02-fm-selection-and-configuration.md): selection; dynamic switching; cross-Region inference; LoRA/adapters; Model Registry (Task **1.2**, Skills **1.2.1-1.2.4**)
- [ ] [03: Data validation and processing for FMs](./topics/03-data-validation-and-processing-for-fms.md): Glue Data Quality; multimodal pipelines; Bedrock request formatting; entity extraction (Task **1.3**, Skills **1.3.1-1.3.4**)
- [ ] [04: Vector store solutions](./topics/04-vector-store-solutions.md): Knowledge Bases; OpenSearch Neural; RDS/pgvector; DynamoDB+vectors; metadata; incremental refresh (Task **1.4**, Skills **1.4.1-1.4.5**)
- [ ] [05: Retrieval mechanisms and RAG](./topics/05-retrieval-mechanisms-and-rag.md): chunking; embeddings; hybrid search; rerankers; query expansion; MCP retrieval (Task **1.5**, Skills **1.5.1-1.5.6**)
- [ ] [06: Prompt engineering and governance](./topics/06-prompt-engineering-and-governance.md): Prompt Management; Guardrails in prompts; Prompt Flows; CoT; regression; approvals (Task **1.6**, Skills **1.6.1-1.6.6**)

---

## Domain 2: Implementation and Integration (26%)

- [ ] [07: Agentic AI and tool integrations](./topics/07-agentic-ai-and-tool-integrations.md): Strands; Agent Squad; MCP; ReAct; memory/state; safeguards; HITL (Task **2.1**, Skills **2.1.1-2.1.7**)
- [ ] [08: Model deployment strategies](./topics/08-model-deployment-strategies.md): Lambda on-demand; provisioned throughput; SageMaker hybrid; container/GPU; cascading (Task **2.2**, Skills **2.2.1-2.2.3**)
- [ ] [09: Enterprise integration architectures](./topics/09-enterprise-integration-architectures.md): API/event-driven; EventBridge; federation; Outposts/Wavelength; GenAI gateway; CI/CD (Task **2.3**, Skills **2.3.1-2.3.5**)
- [ ] [10: FM API integrations](./topics/10-fm-api-integrations.md): sync/async Bedrock; streaming; backoff/rate limits; X-Ray; intelligent routing (Task **2.4**, Skills **2.4.1-2.4.4**)
- [ ] [11: Application integration patterns](./topics/11-application-integration-patterns.md): API Gateway streaming; Amplify/OpenAPI; Prompt Flows; Q Developer; CRM/docs; Data Automation (Task **2.5**, Skills **2.5.1-2.5.6**)

---

## Domain 3: AI Safety, Security, and Governance (20%)

- [ ] [12: Input/output safety controls](./topics/12-input-output-safety-controls.md): Guardrails; moderation; grounding; defense-in-depth; injection/jailbreak (Task **3.1**, Skills **3.1.1-3.1.5**)
- [ ] [13: Data security and privacy](./topics/13-data-security-and-privacy.md): VPC endpoints; Lake Formation; Macie/Comprehend PII; Bedrock privacy; masking; retention (Task **3.2**, Skills **3.2.1-3.2.3**)
- [ ] [14: AI governance and compliance](./topics/14-ai-governance-and-compliance.md): model cards; lineage; Glue Catalog; CloudTrail; bias drift; output filters (Task **3.3**, Skills **3.3.1-3.3.4**)
- [ ] [15: Responsible AI principles](./topics/15-responsible-ai-principles.md): transparency/traces; fairness; LLM-as-judge; policy Guardrails (Task **3.4**, Skills **3.4.1-3.4.3**)

---

## Domain 4: Operational Efficiency and Optimization (12%)

- [ ] [16: Cost optimization and resource efficiency](./topics/16-cost-optimization-and-resource-efficiency.md): tokens; tiered models; batching; provisioned throughput; semantic/prompt caching (Task **4.1**, Skills **4.1.1-4.1.4**)
- [ ] [17: Application performance optimization](./topics/17-application-performance-optimization.md): latency tradeoffs; streaming; hybrid search; throughput; temperature/top-k/p; autoscaling (Task **4.2**, Skills **4.2.1-4.2.6**)
- [ ] [18: Monitoring GenAI applications](./topics/18-monitoring-genai-applications.md): CloudWatch GenAI metrics; invocation logs; quality; tool/agent obs; vector ops; golden sets (Task **4.3**, Skills **4.3.1-4.3.6**)

---

## Domain 5: Testing, Validation, and Troubleshooting (11%)

- [ ] [19: Evaluation systems for GenAI](./topics/19-evaluation-systems-for-genai.md): Bedrock Model Evaluations; A/B/canary; RAG/agent evals; regression gates; reporting (Task **5.1**, Skills **5.1.1-5.1.9**)
- [ ] [20: Troubleshooting GenAI applications](./topics/20-troubleshooting-genai-applications.md): context overflow; API failures; prompt debug; retrieval/embedding drift; agent tool failures (Task **5.2**, Skills **5.2.1-5.2.5**)

---

## Suggested order

Not straight down the list. This order keeps one stack in my head and layers onto it:

1. **Domain 1 (31%) end to end:** design → FM → data → vectors → RAG → prompts. ([B9](../build.md#b9))
2. **Domain 3 safety** layered onto that same stack. ([B11](../build.md#b11))
3. **Domain 2** agents and enterprise integration. ([B10](../build.md#b10))
4. **Domain 4** cost, performance, monitoring. ([B12](../build.md#b12))
5. **Domain 5** evals and troubleshooting playbooks. ([B12](../build.md#b12))

Back to the [AIP-C01 README](README.md) · Practice: [workbooks](workbooks/)
