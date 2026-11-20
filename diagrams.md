---
title: "Draw it from memory"
retention: true
retention_order: 4
retention_blurb: "Blank paper, a timer, and nine architectures I should be able to sketch cold."
---

# Draw it from memory

Here's the test I trust more than any flashcard: **can I draw it?** If I can sketch the RAG loop or the agent stack from nothing, with the arrows going the right way, I actually understand it. If I can't, I've just been recognizing words.

The drill:

1. **Blank paper.** Not a whiteboard app with templates. Paper, or an empty text file.
2. **Set a timer.** Five minutes per diagram. The exam doesn't give you time to think it through from scratch, so neither do I.
3. **Draw it** from the "Draw it" prompt only. Don't open the reference.
4. **Compare.** Open the reference, then go down the "people forget" checklist and mark what you missed.
5. **Redraw only what you missed.** Not the whole thing. Just the parts you got wrong, a day or two later, until they stick.

Every diagram is tagged with the cert(s) it shows up in, and links back to the topic notes the details come from. The reference drawings are plain ASCII on purpose. If it's good enough for a terminal, it's good enough for an exam answer in your head.

---

### 1. The RAG loop `AIF` `MLA` `AIP`

**Draw it:** the offline ingest path (docs, chunk, embed, vector store) and the online query path (question, embed the query, retrieve top-k with metadata filters, optional rerank, build the prompt, FM, answer with citations). Show where the two paths meet.

<details markdown="1"><summary>Reference</summary>

```text
 INGEST (offline)
 +---------+   +-------+   +-------+   +--------------+
 | docs    |-->| chunk |-->| embed |-->| vector store |
 | (S3)    |   +-------+   +-------+   | (index)      |
 +---------+                           +--------------+
                                              ^
                                              | similarity search
 QUERY (online)                               |
 +----------+   +-------------+   +-----------+--------+
 | question |-->| embed query |-->| retrieve top-k     |
 +----------+   | (SAME model)|   | + metadata filters |
      |         +-------------+   +--------------------+
      |                                    |
      |                                    v
      |                           +-----------------+
      |                           | rerank (opt.)   |
      |                           +-----------------+
      v                                    |
 +-----------------------------------------v-------+
 | prompt = instructions + question + top chunks   |
 +-------------------------------------------------+
                          |
                          v
                   +-------------+    +--------------------+
                   |     FM      |--->| answer + citations |
                   +-------------+    +--------------------+
```

**People forget:**

- [ ] The query gets embedded with the **same embedding model** as the docs. Never mix embedding models in one index.
- [ ] **Citations.** Grounded enterprise answers point back at their sources.
- [ ] **Metadata filters** (tenant, ACL, product) happen at retrieval time, not after.
- [ ] Guardrails apply to the input and output, **not to the retrieved chunks** at runtime.
- [ ] Retrieval quality gets measured **separately** from generation quality.

</details>

**From:** [AIF 04](AIF-C01-AWS-Certified-AI-Practitioner/topics/04-genai-foundational-concepts.md) · [AIF 07](AIF-C01-AWS-Certified-AI-Practitioner/topics/07-fm-application-design-rag-agents.md) · [MLA 07](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/07-deployment-infrastructure.md) · [AIP 05](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/05-retrieval-mechanisms-and-rag.md)

---

### 2. Knowledge Base ingestion and refresh `MLA` `AIP`

**Draw it:** new docs landing in S3, the event that kicks things off, validation with a quarantine path, KB ingestion/sync (chunk + embed), the vector store with metadata, a retrieval eval, and the promotion step that points the app at the new index.

<details markdown="1"><summary>Reference</summary>

```text
 +-----------+    S3 notification /     +---------------------+
 | new docs  |--- EventBridge --------->| validate            |
 | land in S3|                          | (Glue Data Quality) |
 +-----------+                          +---------------------+
                                          | pass        | fail
                                          v             v
                         +-------------------+   +------------+
                         | KB ingestion/sync |   | quarantine |
                         | chunk + embed     |   +------------+
                         | (incremental)     |
                         +-------------------+
                                   |
                                   v
                 +-----------------------------------+
                 | vector store + metadata           |
                 | (OpenSearch Serverless, Aurora    |
                 |  pgvector, Neptune Analytics, S3  |
                 |  Vectors...) author, ACL, domain, |
                 |  timestamp                        |
                 +-----------------------------------+
                                   |
                                   v
                     +---------------------------+
                     | retrieval eval (hit@k)    |
                     +---------------------------+
                          | pass            | fail
                          v                 v
          +--------------------------+   keep serving
          | promote app config to    |   the old index
          | the new index version    |
          +--------------------------+
```

**People forget:**

- [ ] The **quarantine** path. Bad docs don't get to fail silently.
- [ ] **Incremental** ingestion. A full reindex only when the embedding model changes.
- [ ] **Deletes and updates** have to be detected, not just new files.
- [ ] Metadata attributes go in at ingest, or there's nothing to filter on later.
- [ ] **No quality gate, no promotion.** Never silently refresh a production index.

</details>

**From:** [MLA 03](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/03-data-quality-validation-and-bias.md) · [MLA 09](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md) · [AIP 04](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/04-vector-store-solutions.md)

---

### 3. Picking an inference option `MLA` `AIP`

**Draw it:** a decision path from "a request needs a prediction" to the four SageMaker inference options, with the deciding question on each branch. Then a second small tree for foundation models: Bedrock on-demand, provisioned throughput, Custom Model Import, SageMaker hosting.

<details markdown="1"><summary>Reference</summary>

```text
 SageMaker: "I need predictions"
   |
   +-- whole dataset, offline? -------------> BATCH TRANSFORM
   |                                          (job-based)
   |
   +-- big payload (<=1GB) or long job
   |   (<=1h), a queue is fine? ------------> ASYNC INFERENCE
   |                                          (queue, near-real-time)
   |
   +-- spiky or idle traffic,
   |   cold starts are OK? -----------------> SERVERLESS INFERENCE
   |                                          (scale to zero)
   |
   +-- interactive, lowest latency? --------> REAL-TIME ENDPOINT
                                              (you size instances)

 Foundation models: "I need an FM behind my app"
   |
   +-- just call it, no servers? -----------> Bedrock ON-DEMAND
   +-- steady, high TPS? -------------------> Bedrock PROVISIONED
   |                                          THROUGHPUT
   +-- my own compatible weights? ----------> Bedrock CUSTOM
   |                                          MODEL IMPORT
   +-- full control of containers? ---------> SAGEMAKER HOSTING
```

**People forget:**

- [ ] The async limits: payloads **up to 1GB**, jobs **up to 1h**.
- [ ] Serverless means **cold starts**. Fine for spiky traffic, wrong for strict latency.
- [ ] **Multi-model endpoints** for many sparse models sharing a framework, but not when each model needs its own saturated GPU.
- [ ] Provisioned throughput is for **steady** high TPS, not "just in case."

</details>

**From:** [AIF 01](AIF-C01-AWS-Certified-AI-Practitioner/topics/01-ai-ml-terminology-and-concepts.md) · [MLA 07](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/07-deployment-infrastructure.md) · [AIP 08](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/08-model-deployment-strategies.md)

---

### 4. The MLOps pipeline, with its gates `MLA` `AIP`

**Draw it:** source → build/test → train or fine-tune → evaluate (a gate) → register and approve → deploy with a traffic strategy → monitor → retrain trigger, and the loop back. Mark every gate and where rollback lives.

<details markdown="1"><summary>Reference</summary>

```text
 +---------+   +---------+   +-------------+   +-------------+
 | source  |-->| build   |-->| train /     |-->| evaluate    |
 | Git via |   | lint,   |   | fine-tune   |   | GATE:       |
 | CodeCon.|   | tests,  |   | (SageMaker/ |   | metrics,    |
 +---------+   | image   |   |  Bedrock)   |   | Bedrock     |
      ^        | -> ECR  |   +-------------+   | eval,prompt |
      |        +---------+          ^          | tests       |
      |                             |          +-------------+
      |                             |                 | pass
      |                             |                 v
      |      +---------+   +--------+-----+   +-------------+
      |      | monitor |   | retrain      |   | register    |
      |      | drift,  |-->| trigger:     |   | Model Reg./ |
      |      | quality |   | schedule,    |   | MLflow, +   |
      |      +---------+   | drift alarm, |   | MANUAL      |
      |           ^        | new labels   |   | APPROVAL    |
      |           |        +--------------+   +-------------+
      |           |                                  |
      |      +---------------------------+           |
      |      | deploy: blue/green,       |<----------+
      |      | canary/linear, shadow     |
      |      | ROLLBACK on alarm         |
      |      +---------------------------+
      |
      +-- code and prompt changes start the whole loop again
```

**People forget:**

- [ ] **Version everything**, not just weights: prompts, agent versions, container digests, KB ingest jobs.
- [ ] The **manual approval** before prod.
- [ ] Rollback means keeping the **previous** model package, endpoint config, or prompt version ready.
- [ ] A **prompt regression suite** sits in the evaluate gate next to the ML metrics.
- [ ] Retraining has **three** kinds of trigger: schedule, drift or quality alarms, new labeled data.

</details>

**From:** [AIF 03](AIF-C01-AWS-Certified-AI-Practitioner/topics/03-ai-ml-lifecycle-and-mlops-basics.md) · [MLA 09](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md) · [AIP 09](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/09-enterprise-integration-architectures.md)

---

### 5. A SageMaker training and tuning job `MLA`

**Draw it:** the three inputs (S3 channels, hyperparameters, your training code or a built-in algorithm), an Automatic Model Tuning job running several trials, early stopping, the winning artifact, and where it gets registered.

<details markdown="1"><summary>Reference</summary>

```text
 S3 input channels      hyperparameter      train.py (script mode)
 (train / validation)   ranges              or a built-in algorithm
        |                    |                       |
        +--------------------+-----------------------+
                             |
                             v
         +----------------------------------------+
         | Automatic Model Tuning (AMT) job       |
         |  strategy: random / Bayesian /         |
         |            Hyperband-style             |
         |  objective metric: matches the goal    |
         |                    (AUC, loss, custom) |
         |                                        |
         |  +---------+  +---------+  +---------+ |
         |  | trial 1 |  | trial 2 |  | trial n | |
         |  +---------+  +---------+  +---------+ |
         |  early stopping kills trials that      |
         |  aren't improving                      |
         +----------------------------------------+
                             |
                             v
           best trial --> model.tar.gz in S3
                             |
                             v
               compare against the baseline
                             |
                             v
            SageMaker Model Registry (version)
```

**People forget:**

- [ ] The **objective metric** has to match the business goal, not just "lowest loss."
- [ ] **Early stopping** on trials that aren't improving.
- [ ] **Spot + checkpointing** for cost.
- [ ] Get a **single-node** job right before going distributed (data parallel shards data; model parallel shards the model).
- [ ] Compare against a **baseline**. Train loss alone isn't a win.

</details>

**From:** [MLA 05](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/05-train-fine-tune-customize-models.md) · [MLA 06](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/06-model-and-system-evaluation.md) · [MLA 09](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md)

---

### 6. Guardrails, defense in depth `AIF` `AIP`

**Draw it:** a request travelling from the user to the FM and back, with every layer that can stop it: a pre-filter, Guardrails on the way in, the FM with its retrieved context, Guardrails on the way out (including grounding), business-rule validation, the response filter, and the monitoring off to the side.

<details markdown="1"><summary>Reference</summary>

```text
 user input (TAGGED as user input)
     |
     v
 +-----------------------------------+
 | Comprehend: toxicity / PII        |   pre-filter
 +-----------------------------------+
     |
     v
 +-----------------------------------+
 | Guardrails, INPUT                 |
 |  content filters, denied topics,  |
 |  word filters, PII, PROMPT_ATTACK |
 +-----------------------------------+
     |
     v
 +-----------------------------------+      +------------------+
 | FM (Converse with guardrailConfig,|<-----| retrieved chunks |
 | Agents, KB RetrieveAndGenerate)   |      | (NOT filtered at |
 +-----------------------------------+      |  runtime)        |
     |                                      +------------------+
     v
 +-----------------------------------+
 | Guardrails, OUTPUT                |
 |  content, PII, contextual         |
 |  grounding vs retrieved passages  |
 +-----------------------------------+
     |
     v
 +-----------------------------------+
 | Lambda: JSON schema + business    |
 | rules                             |
 +-----------------------------------+
     |
     v
 +-----------------------------------+
 | API Gateway response filters      |
 +-----------------------------------+
     |
     v
   user          side channel: CloudWatch blocked-input rate
                 and false positives, jailbreak suite in CI
```

**People forget:**

- [ ] **Tag user inputs** on InvokeModel paths, or prompt attacks may not get filtered.
- [ ] **Tool results and tool specs** aren't evaluated by the prompt-attack filter.
- [ ] Retrieved chunks aren't filtered by Guardrails at runtime. Clean the corpus and filter by ACL **before** it reaches the context.
- [ ] **"Please be safe" in the system prompt is not a control.**
- [ ] Watch **false positives**, not just blocks.

</details>

**From:** [AIF 11](AIF-C01-AWS-Certified-AI-Practitioner/topics/11-responsible-ai-principles-and-practices.md) · [AIF 13](AIF-C01-AWS-Certified-AI-Practitioner/topics/13-securing-ai-systems.md) · [AIP 12](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/12-input-output-safety-controls.md) · [AIP 13](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/13-data-security-and-privacy.md)

---

### 7. An agent on AgentCore, with a human in the loop `AIP`

**Draw it:** a Strands agent loop running in AgentCore Runtime, and the four AgentCore services around it (Identity, Memory, Gateway, Observability). Show the tools behind Gateway as MCP (light tools vs heavy ones), the guardrails, the safety stops, and the human approval on any action that writes.

<details markdown="1"><summary>Reference</summary>

```text
 user / app
     |
     v
 +----------------------------------------------------+
 | AgentCore Runtime (session-isolated microVM)       |
 |                                                    |
 |   Strands agent loop:                              |
 |   plan -> call tool -> observe -> repeat           |
 |   STOPS: timeout, max tool iterations,             |
 |          circuit breaker                           |
 |   Guardrails on agent prompts and responses        |
 +----------------------------------------------------+
     |              |               |             |
     v              v               v             v
 +----------+  +-----------+  +-----------+  +---------------+
 | Identity |  | Memory    |  | Gateway   |  | Observability |
 | who it   |  | short:    |  | Lambda /  |  | traces for    |
 | is, what |  |  session  |  | OpenAPI / |  | every tool    |
 | it can   |  | long:     |  | Smithy -> |  | and agent     |
 | touch    |  |  AgentCore|  | MCP tools |  | step          |
 +----------+  |  Memory   |  | (authn in |  +---------------+
               +-----------+  |  + out)   |
                              +-----------+
                                    |
                 +------------------+------------------+
                 |                                     |
                 v                                     v
        read-only tools                       tools that WRITE
        (Lambda for light,                    (refunds, deletes,
         ECS for heavy)                        external sends)
                                                       |
                                                       v
                                          +-------------------------+
                                          | HITL approval           |
                                          | Step Functions          |
                                          | wait-for-task-token     |
                                          +-------------------------+
```

**People forget:**

- [ ] **Max tool iterations and timeouts.** An unbounded loop is a cost bug and a safety bug.
- [ ] **Authn/authz on MCP tools**, or you've built a confused deputy.
- [ ] **Least-privilege IAM** per tool, not one fat role.
- [ ] **HITL** for anything irreversible.
- [ ] Agent Squad is an open-source **router**. AgentCore is the managed **platform**. Don't swap them.

</details>

**From:** [AIF 04](AIF-C01-AWS-Certified-AI-Practitioner/topics/04-genai-foundational-concepts.md) · [MLA 07](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/07-deployment-infrastructure.md) · [AIP 07](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/07-agentic-ai-and-tool-integrations.md)

---

### 8. The GenAI eval gate in CI `MLA` `AIP`

**Draw it:** what can change (prompt, model, index, agent config), the CI run against a golden set, the three kinds of eval (retrieval, generation, agent) plus cost and latency, the block/pass decision, canary, and the way back to rollback.

<details markdown="1"><summary>Reference</summary>

```text
 change: prompt version | model | KB index | agent config
                         |
                         v
          +-------------------------------+
          | CI pipeline                   |
          |  1. unit + contract tests     |
          |  2. run the GOLDEN SET        |
          +-------------------------------+
                         |
                         v
 +-------------------------------------------------------+
 | evaluate                                              |
 |  retrieval:  context relevance, coverage, hit@k       |
 |  generation: correctness, faithfulness, citation      |
 |              precision (LLM-as-judge)                 |
 |  agents:     task completion, tool effectiveness      |
 |  plus:       cost and latency                         |
 +-------------------------------------------------------+
                         |
          below threshold? -- yes --> BLOCK
                         |            report to S3
                         | no
                         v
          canary traffic to the new version
                         |
          hallucination rate or drift up? -- yes --> ROLLBACK
                         |
                         | no
                         v
                      PROMOTE
                         |
                         v
     user feedback (ratings, annotation) --> grows the golden set
```

**People forget:**

- [ ] Evaluate **retrieval separately** from generation, or you'll tune the wrong half.
- [ ] The golden set is **versioned and fixed**, or scores can't be compared.
- [ ] **Cost and latency** belong in the gate, not just quality.
- [ ] **Canary**, not 100% of traffic on day one.
- [ ] A **prompt edit is a deploy.** It goes through the same gate.

</details>

**From:** [AIF 10](AIF-C01-AWS-Certified-AI-Practitioner/topics/10-fm-evaluation-methods-and-metrics.md) · [MLA 06](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/06-model-and-system-evaluation.md) · [MLA 09](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md) · [AIP 19](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/19-evaluation-systems-for-genai.md)

---

### 9. Ask Composite Code, production version `AIP` · build B9-B12

**Draw it:** the whole [build](build.md#b9) as it ends up: the API, the streaming RAG path with versioned prompts and the knowledge base, the agent path with its three tools and the approval step, Guardrails, routing and caching, and the ops layer wrapped around everything. Tag each piece with its milestone.

<details markdown="1"><summary>Reference</summary>

```text
                 client (curl / web)
                          |
                          v
                 +-----------------+
                 |  API Gateway    |
                 +-----------------+
                   |             |
        /ask  (B9) |             | /agent  (B10)
                   v             v
 +-------------------+     +--------------------------+
 | Lambda, streaming |     | AgentCore Runtime        |
 +-------------------+     | Strands agent            |
   |       |               | hard stop on tool calls  |
   |       v               +--------------------------+
   |  Prompt Management       |                  |
   |  (versioned prompts)     v                  v
   |                     Gateway (MCP)     human approval
   v                       |               for anything
 Knowledge Base            +-> search posts      that writes
 (OpenSearch               |   (the B9 path)
  Serverless, B6)          +-> tag a draft
   |                       |   (B5 endpoint)
   |                       +-> GitHub repo lookup
   v
 +------------------------------------------------------+
 | Bedrock Converse                                     |
 |  Guardrails: contextual grounding, PII       (B11)   |
 |  prompt caching, model routing: cheap model  (B12)   |
 |  first, escalate when needed                         |
 +------------------------------------------------------+

 wrapped around all of it:
   invocation logging (no PII in the logs)          (B11)
   model card: what it's for, what it isn't         (B11)
   golden-set evals in CI, gating changes           (B12)
   CloudWatch cost + latency dashboard              (B12)
```

**People forget:**

- [ ] Swapping the model or prompt version **without a code deploy**. That's the point of Prompt Management.
- [ ] The **approval step actually blocks.** Test it.
- [ ] The **B3 attacks** get re-run against the production stack.
- [ ] A short **ADR** for every decision on this diagram.
- [ ] **Tear it down** at the end of the day. OpenSearch Serverless and endpoints bill whether you use them or not.

</details>

**From:** [build.md](build.md) · [AIP 01](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/01-genai-solution-design-and-requirements.md) · [AIP 06](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/06-prompt-engineering-and-governance.md) · [AIP 10](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/10-fm-api-integrations.md) · [AIP 16](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/16-cost-optimization-and-resource-efficiency.md)

---

Back to the [curriculum home](index.md) · the [build](build.md)
