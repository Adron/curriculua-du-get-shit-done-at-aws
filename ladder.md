---
title: "The concept ladder"
retention: true
retention_order: 2
retention_blurb: "Same concepts, three depths. See what AIF expects, what MLA adds, and what AIP adds on top."
---

# The concept ladder

Here's the thing I noticed going through all three exam guides: **they keep asking about the same handful of ideas.** RAG, Guardrails, evals, agents, IAM. AIF wants you to know what they are. MLA wants you to build them. AIP wants you to defend them in production, at 2 a.m., with a cost number attached.

So instead of treating each cert as a fresh pile of material, this page lines the concepts up as rungs. Each concept gets one row per cert: what that exam expects, plus links to the topic notes that cover it.

Why bother:

- **AIF review becomes early MLA prep.** When I re-read the AIF row I'm one step from the MLA row, and the gap between them *is* the next study session.
- **You see exactly what's new at each level.** The "jump" line under each table is the delta. That's where the new exam questions come from.
- **Spaced review comes for free.** Every time I climb to the next cert, I go back over the lower rungs of the same concept. That's repetition with elaboration, and it sticks better than re-reading.

Links like [AIF 07][aif07] go to the topic notes. "Not tested" means that level doesn't really cover the concept.

---

## Picking the approach

### Traditional ML vs managed AI vs foundation models

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Know when AI helps and when it doesn't (deterministic outcomes, no data, strict explainability). Match regression / classification / clustering to problems. Know when traditional ML beats an FM: clean tabular labels, high explainability, fixed schema. | [AIF 01][aif01], [AIF 02][aif02] |
| MLA-C02 | Walk the builder decision tree: tabular with labels → traditional ML; OCR / vision / speech / entities → managed AI service; language and reasoning → prompt, then RAG, then fine-tune. Trade performance vs train time vs cost for ML, and performance vs latency vs cost for AI. | [MLA 04][mla04] |
| AIP-C01 | Capture non-functional requirements *first* (p95 latency, token budget, residency, tool agency, auditability, HITL), PoC on Bedrock, measure quality and cost before wiring production. Prefer managed inference unless you need custom containers or LoRA ownership. Standardize on the Well-Architected GenAI Lens. | [AIP 01][aip01] |

**The jump:** from "which category of tool fits this problem" to "which tool, and here's the decision tree" to "here are the requirements, the PoC numbers, and the reference architecture."

### Choosing and configuring the model

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Selection factors: modality, quality on *your* data, context length, compliance, cost, latency. Know what temperature, top-p, top-k, max tokens, and stop sequences do. Low temperature for facts, higher for brainstorming. | [AIF 05][aif05], [AIF 07][aif07] |
| MLA-C02 | Select Bedrock FMs by task fit, context window, latency/TPS, token cost, quality on your evals, and compliance. Know when provisioned throughput enters the picture. | [MLA 04][mla04] |
| AIP-C01 | Selection rubric plus **dynamic switching** (model ID from AppConfig / Parameter Store), Converse for portability, cross-Region inference profiles (Geographic for residency, Global for savings), and the fact that inference profiles don't support Provisioned Throughput. A/B decoding params with Prompt Management variants. | [AIP 02][aip02], [AIP 17][aip17] |

**The jump:** from "what the knobs do" to "pick by measured fit" to "make the model a config value you can swap, route, and fail over without a deploy."

---

## Talking to the model

### Prompt engineering and Prompt Management

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Prompt constructs (instruction, context, examples, negative prompts, variables). Zero-shot, few-shot, chain-of-thought, templates. Risks: jailbreaking, hijacking, injection, exposure. Prompt Management basics: variables, variants, versions. | [AIF 08][aif08], [AIF 04][aif04] |
| MLA-C02 | System prompt + few-shot + tool schemas, and **version your prompts**. Fine-tune when prompts can't lock the format. Prompt Management and prompt tests as part of CI/CD. Log the prompt version with every experiment. | [MLA 05][mla05], [MLA 06][mla06], [MLA 09][mla09] |
| AIP-C01 | Prompt governance: Guardrails attached to every inference path, IAM on prompt resources, CloudTrail, invocation logging. Regression on golden prompts whenever models or prompts change. Prompt Flows for chains and branches. Debug by comparing versions and isolating system / user / tool messages. | [AIP 06][aip06], [AIP 20][aip20] |

**The jump:** from "how to write a good prompt" to "a prompt is a versioned artifact" to "a prompt change is a deploy, with gates, audit, and rollback."

### Customization: fine-tuning, distillation, and friends

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | The customization ladder: prompt → RAG → fine-tune → continued pre-training → pre-training from scratch, plus distillation. Know which ones change weights and what they cost. Pre-training vs fine-tuning vs RLHF vs instruction tuning. Data prep concerns before fine-tuning. | [AIF 07][aif07], [AIF 09][aif09] |
| MLA-C02 | Actually run it: SageMaker script mode, JumpStart or Bedrock customization, AMT for hyperparameters. Spot overfitting, underfitting, and **catastrophic forgetting** (lower LR, fewer epochs, replay data, LoRA). Prep prompt-response pairs and screen them for PII and toxicity. | [MLA 05][mla05], [MLA 02][mla02], [MLA 03][mla03] |
| AIP-C01 | Bedrock fine-tuning, distillation, or reinforcement fine-tuning where supported; SageMaker LoRA for PEFT. Model Registry for versions, approvals, rollback, and retiring superseded adapters. Know which custom models need Provisioned Throughput. | [AIP 02][aip02], [AIP 08][aip08] |

**The jump:** from "which rung of the ladder" to "run the training job without breaking the base model" to "manage adapters as a versioned, approved, retirable fleet."

---

## The RAG stack

### Embeddings and chunking

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Define tokens, embeddings, vectors, and chunking. Similar meaning means nearby vectors. Context engineering: the window is finite, so what goes in matters. | [AIF 04][aif04] |
| MLA-C02 | Pick an embedding model by modality, dimension, and cost. Bedrock KB chunking strategies (default ~300 tokens, fixed-size + overlap, hierarchical, semantic, none) and when to use each. Extract metadata for filtering. A/B chunk sizes and measure recall@k. | [MLA 02][mla02], [MLA 05][mla05] |
| AIP-C01 | Same strategies, now with production consequences: match dimensionality to the index, batch embedding jobs, and **never mix embedding models in one index** without a migration. Re-embed after a model change; watch for embedding drift. | [AIP 05][aip05], [AIP 20][aip20] |

**The jump:** from vocabulary to "tune it and measure it" to "it's a migration if you change it."

### Vector stores

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Name the exam guide's examples: OpenSearch, Aurora, Neptune, RDS for PostgreSQL (pgvector). Managed vs customer-managed Knowledge Bases at a conceptual level. | [AIF 07][aif07] |
| MLA-C02 | Configure them: OpenSearch (hybrid text + vector), RDS pgvector (SQL + vectors), S3 / Bedrock-managed vector options. Choose by latency, ops overhead, and filter needs. Watch metadata size limits with chunk context. | [MLA 01][mla01], [MLA 08][mla08] |
| AIP-C01 | Design them: OpenSearch hybrid BM25 + vector and sharding, Aurora pgvector with HNSW / IVFFlat, DynamoDB native vectors for operational RAG, a metadata framework for tenant isolation, and **incremental ingestion** instead of full reindexes. Monitor ingest lag and index health. | [AIP 04][aip04], [AIP 18][aip18] |

**The jump:** from "name the services" to "configure the right one" to "design for freshness, tenancy, and scale."

### RAG and retrieval

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | The RAG loop: ingest → chunk → embed → index → retrieve → generate → cite. Why RAG beats fine-tuning for current or proprietary facts. Bedrock Knowledge Bases and RetrieveAndGenerate. | [AIF 07][aif07] |
| MLA-C02 | RAG architecture patterns (fully managed KB, retrieve-only + custom generate, hybrid search, hierarchical / multi-index, agentic RAG). Retrieval levers: top-k, metadata filters, hybrid, rerankers, hierarchical chunks. | [MLA 04][mla04], [MLA 07][mla07], [MLA 08][mla08] |
| AIP-C01 | Hybrid search and rerankers (and the gotcha that custom embeddings can disable the managed reranker), query expansion and multi-hop decomposition, retrieval exposed as MCP tools with ACL enforced in the tool layer. Index tuning and not over-fetching k. | [AIP 05][aip05], [AIP 17][aip17] |

**The jump:** from "what RAG is" to "which RAG pattern and which levers" to "retrieval as a shared, access-controlled, tuned service."

### Data quality and preparation

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Pipeline stages at a *why* level: collect, label, curate, clean, split. Curation and representativeness for fine-tuning data. | [AIF 03][aif03], [AIF 09][aif09] |
| MLA-C02 | Glue Data Quality and DataBrew rulesets, labeling workflows, Clarify-style bias metrics, class imbalance fixes, cleaning (missing values, outliers, dedupe), and training-data integrity for FM fine-tunes. | [MLA 03][mla03], [MLA 02][mla02] |
| AIP-C01 | Quality gates *before* a KB sync (fail or quarantine bad rows), multimodal parsing through Textract / Transcribe / BDA, enrichment with Comprehend, and lineage (source URI, transform version) for governance. | [AIP 03][aip03] |

**The jump:** from "why clean data matters" to "build the checks" to "gate production ingestion on them and keep the lineage."

---

## Agents

### Agents, tools, and MCP

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | An agent is FM + planning + tools + memory. MCP connects agents to tools and data. Strands to build, AgentCore to run. Don't build an agent when a single RAG call would do. | [AIF 04][aif04], [AIF 07][aif07], [AIF 06][aif06] |
| MLA-C02 | Deploy and configure them: instructions, action groups / tools (Lambda, OpenAPI, MCP via AgentCore Gateway), session isolation, memory, identity, agent state management. Monitor tool failures, coordination failures, truncated streams, and loops. | [MLA 07][mla07], [MLA 08][mla08], [MLA 10][mla10] |
| AIP-C01 | Strands patterns (swarm, graph, workflow, agents-as-tools), Agent Squad routing, AgentCore Gateway MCP tools with auth, Step Functions ReAct for deterministic stops, safeguards (timeouts, max iterations, circuit breakers), HITL for irreversible actions, short- vs long-term memory. | [AIP 07][aip07], [AIP 20][aip20] |

**The jump:** from "what an agent is" to "stand one up and watch it" to "constrain it so it can't loop, overspend, or act without permission."

---

## Shipping it

### Deployment and inference options

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Inference modes (real-time, batch, async, serverless). Managed API (Bedrock) vs self-hosted (SageMaker endpoint) tradeoffs. Prototype on on-demand tokens; provisioned throughput only when volume justifies it. | [AIF 01][aif01], [AIF 03][aif03], [AIF 06][aif06] |
| MLA-C02 | SageMaker real-time, serverless, async, and batch transform; multi-model and multi-container endpoints; Bedrock on-demand vs provisioned throughput vs Custom Model Import. Containers in ECR, endpoints in VPCs, deploy via SDK / CLI / Boto3, autoscaling. | [MLA 07][mla07], [MLA 08][mla08] |
| AIP-C01 | On-demand Bedrock + Lambda by default, Provisioned Throughput for steady load or custom models, SageMaker hybrid behind an app router, GPU container hosting, and **model cascading**. Sync vs async vs streaming APIs, backoff and jitter, routing. | [AIP 08][aip08], [AIP 10][aip10] |

**The jump:** from "these modes exist" to "deploy each one" to "pick and combine them under real traffic, failure, and cost."

### MLOps and CI/CD

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | MLOps fundamentals: experiment tracking, repeatability, scalability, technical debt, production readiness, monitoring and retraining. | [AIF 03][aif03] |
| MLA-C02 | The reference pipeline: source → build → train → evaluate → register → deploy → monitor → retrain. Blue/green, canary, shadow, rollback. **Version everything**: weights, prompts, agents, containers. KB refresh pipelines. | [MLA 09][mla09] |
| AIP-C01 | CI/CD for prompts, agents, and IaC with automated evals and security scans, staged rollouts, rollback on quality regression. Eval gates and canaries before any model or prompt promotion. | [AIP 09][aip09], [AIP 19][aip19] |

**The jump:** from "MLOps is a thing" to "build the pipeline" to "the pipeline blocks a bad prompt on quality, not just a failed test."

### Evaluation

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Eval approaches (HITL, benchmarks, Bedrock Model Evaluation, LLM-as-judge). ROUGE, BLEU, BERTScore by name. RAG and agent eval dimensions. Pair model metrics with business KPIs. | [AIF 10][aif10], [AIF 05][aif05] |
| MLA-C02 | MLflow experiment tracking, baselines, shadow variants, explainability. Classic metrics (precision, recall, F1, AUC, MAE, RMSE) plus NLP and judge metrics. Track retrieval, generation, and end-to-end separately for RAG. | [MLA 06][mla06] |
| AIP-C01 | Full eval systems: model evals with human workers and judges, retrieve-only vs retrieve-and-generate RAG evals, agent evals, user feedback loops, CI/CD gates, canaries, stakeholder reporting. | [AIP 19][aip19], [AIP 15][aip15] |

**The jump:** from "know the metric names" to "measure the right layer" to "evals are a system that gates releases."

### Monitoring and drift

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Monitor and retrain is a lifecycle stage: drift, quality, cost, feedback loops. | [AIF 03][aif03] |
| MLA-C02 | The monitoring stack (infra, endpoint, model quality, data drift, GenAI tokens and throttles, agents, RAG). Model Monitor baselines, data drift vs concept drift, A/B production variants, AgentCore Observability traces into CloudWatch. | [MLA 10][mla10] |
| AIP-C01 | Model Invocation Logging (and what it doesn't cover), CloudWatch GenAI views, quality signals as custom metrics, tool and agent observability, vector ops health, forensics with request IDs and X-Ray. | [AIP 18][aip18], [AIP 20][aip20] |

**The jump:** from "you should monitor" to "here's every layer to watch" to "here's how I'll find the one bad answer from Tuesday."

### Cost optimization

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Token-based pricing: input + output tokens, and long contexts cost more. The cost levers: on-demand vs provisioned, model size, custom models, redundancy, Region. | [AIF 04][aif04], [AIF 06][aif06] |
| MLA-C02 | Instance family intuition, purchasing options (spot + checkpoints, Savings Plans, serverless, provisioned throughput), dashboards with $/request, and token / embedding / vector DB cost patterns. | [MLA 11][mla11] |
| AIP-C01 | Token hygiene (prune history, cap maxTokens, retrieve fewer and better chunks), tiered models and cascading, batching, prompt caching vs semantic caching, Global inference profiles where residency allows. | [AIP 16][aip16], [AIP 08][aip08] |

**The jump:** from "tokens cost money" to "right-size the infrastructure" to "engineer the request path so most queries never hit the expensive model."

---

## Safety, security, and trust

### Guardrails and safety controls

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Guardrails filter types: content (including prompt attack), denied topics, word filters, sensitive information, contextual grounding, Automated Reasoning. Guardrails on RetrieveAndGenerate apply to input and output, not to every retrieved chunk. | [AIF 11][aif11], [AIF 13][aif13] |
| MLA-C02 | Guardrails and sensitive data protection as part of securing the workload. **Guardrails are not access control**: IAM and retrieval filters decide who sees which documents. | [MLA 12][mla12] |
| AIP-C01 | Guardrails on every inference path (Converse, Agents, KB, Flows), prompt-attack tagging on InvokeModel paths, grounding plus schema-constrained outputs, defense-in-depth (Comprehend → Guardrails → Lambda validation → API filters), adversarial testing in CI. | [AIP 12][aip12] |

**The jump:** from "what the filters are" to "what they aren't" to "layered controls with attack testing in the pipeline."

### Security: identity, network, and data privacy

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | IAM least privilege, KMS encryption, Macie, PrivateLink, shared responsibility, AgentCore Identity, Secrets Manager, CloudTrail. Prompt injection and data leakage as AI-specific threats. | [AIF 13][aif13] |
| MLA-C02 | Separate roles per job and endpoint, scoped S3 prefixes, private subnets and VPC endpoints, encryption for data and artifacts, IAM roles vs Bedrock API keys, Inspector scans in CI/CD. | [MLA 12][mla12], [MLA 08][mla08] |
| AIP-C01 | Interface VPC endpoints for every Bedrock plane, Lake Formation, PII pipelines (Comprehend redaction before ingest, Macie, Guardrails filters), retention policies on logs and history, federated identity into Bedrock and AgentCore. | [AIP 13][aip13], [AIP 09][aip09] |

**The jump:** from "name the controls" to "configure them per workload" to "every data path is private, minimal, and expires on schedule."

### Governance and responsible AI

| Level | What's expected | Notes |
|---|---|---|
| AIF-C01 | Responsible AI dimensions, bias and variance, Model Cards and AI Service Cards, transparency tradeoffs, governance services (Config, Inspector, Artifact, CloudTrail, Trusted Advisor), and the Generative AI Security Scoping Matrix. | [AIF 11][aif11], [AIF 12][aif12], [AIF 14][aif14] |
| MLA-C02 | Bias metrics and mitigation in the data (class imbalance, DPL, resampling), Clarify bias baselines and drift, explainability for both ML and GenAI outputs. | [MLA 03][mla03], [MLA 06][mla06] |
| AIP-C01 | Model cards linked to registry versions, lineage through the Glue Data Catalog into citations, audit trails, continuous controls for bias drift and policy violations, fairness evals across slices, policies encoded as Guardrails, human oversight with A2I or Step Functions. | [AIP 14][aip14], [AIP 15][aip15] |

**The jump:** from "know the principles and the scoping matrix" to "measure bias in the data" to "prove compliance continuously, with lineage and audit for any answer."

---

## How I use this

1. **Before starting a new cert, review the rows bottom-up.** Re-read the lower rungs for every concept before I open the new cert's punch list. Ten minutes per concept, tops. The gap between the rows is my study plan.
2. **When studying an AIP topic, read its AIF and MLA rows first.** Find the concept, read the two lower rungs, *then* open the AIP topic note. The new material lands on something already there.
3. **Use "The jump" as a self-test.** Cover the table and explain the jump out loud. If I can't say what changes between levels, I don't own the concept yet.
4. **After passing a cert, keep its rows warm.** A monthly skim of the rungs I've already climbed keeps them from fading before the next exam.

Back to the [curriculum home](index.md) · [The build](build.md)

[aif01]: AIF-C01-AWS-Certified-AI-Practitioner/topics/01-ai-ml-terminology-and-concepts.md
[aif02]: AIF-C01-AWS-Certified-AI-Practitioner/topics/02-ai-use-cases-and-technique-selection.md
[aif03]: AIF-C01-AWS-Certified-AI-Practitioner/topics/03-ai-ml-lifecycle-and-mlops-basics.md
[aif04]: AIF-C01-AWS-Certified-AI-Practitioner/topics/04-genai-foundational-concepts.md
[aif05]: AIF-C01-AWS-Certified-AI-Practitioner/topics/05-genai-capabilities-limitations-selection.md
[aif06]: AIF-C01-AWS-Certified-AI-Practitioner/topics/06-aws-genai-infrastructure-and-services.md
[aif07]: AIF-C01-AWS-Certified-AI-Practitioner/topics/07-fm-application-design-rag-agents.md
[aif08]: AIF-C01-AWS-Certified-AI-Practitioner/topics/08-prompt-engineering-techniques.md
[aif09]: AIF-C01-AWS-Certified-AI-Practitioner/topics/09-fm-training-and-fine-tuning.md
[aif10]: AIF-C01-AWS-Certified-AI-Practitioner/topics/10-fm-evaluation-methods-and-metrics.md
[aif11]: AIF-C01-AWS-Certified-AI-Practitioner/topics/11-responsible-ai-principles-and-practices.md
[aif12]: AIF-C01-AWS-Certified-AI-Practitioner/topics/12-transparency-and-explainability.md
[aif13]: AIF-C01-AWS-Certified-AI-Practitioner/topics/13-securing-ai-systems.md
[aif14]: AIF-C01-AWS-Certified-AI-Practitioner/topics/14-ai-governance-and-compliance.md
[mla01]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/01-data-collection-and-storage.md
[mla02]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/02-data-transformation-feature-engineering.md
[mla03]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/03-data-quality-validation-and-bias.md
[mla04]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/04-modeling-approach-selection.md
[mla05]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/05-train-fine-tune-customize-models.md
[mla06]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/06-model-and-system-evaluation.md
[mla07]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/07-deployment-infrastructure.md
[mla08]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/08-resource-provisioning-and-configuration.md
[mla09]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md
[mla10]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/10-monitoring-inference-and-performance.md
[mla11]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/11-cost-and-performance-optimization.md
[mla12]: MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/12-securing-ml-ai-workloads.md
[aip01]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/01-genai-solution-design-and-requirements.md
[aip02]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/02-fm-selection-and-configuration.md
[aip03]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/03-data-validation-and-processing-for-fms.md
[aip04]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/04-vector-store-solutions.md
[aip05]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/05-retrieval-mechanisms-and-rag.md
[aip06]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/06-prompt-engineering-and-governance.md
[aip07]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/07-agentic-ai-and-tool-integrations.md
[aip08]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/08-model-deployment-strategies.md
[aip09]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/09-enterprise-integration-architectures.md
[aip10]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/10-fm-api-integrations.md
[aip12]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/12-input-output-safety-controls.md
[aip13]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/13-data-security-and-privacy.md
[aip14]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/14-ai-governance-and-compliance.md
[aip15]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/15-responsible-ai-principles.md
[aip16]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/16-cost-optimization-and-resource-efficiency.md
[aip17]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/17-application-performance-optimization.md
[aip18]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/18-monitoring-genai-applications.md
[aip19]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/19-evaluation-systems-for-genai.md
[aip20]: AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/20-troubleshooting-genai-applications.md
