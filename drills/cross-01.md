---
title: "Drill CROSS-01"
---

# Drill CROSS-01

This one mixes all three certs, each question at its own cert's level. It's for once you're into MLA and beyond: the same ideas (RAG, Guardrails, versioning, cost) come back at increasing depth, and switching between levels is the point. The answer to each question names the topic note, which tells you which cert it came from.

Closed book. About 30 minutes. Answer all 20 before you open a single answer.

---

### Question 1

A startup's product FAQ changes every month, and the support bot has to cite its answers. Which customization approach?

- **A.** Fine-tuning
- **B.** Pre-training from scratch
- **C.** Distillation
- **D.** RAG with a Bedrock Knowledge Base

<details markdown="1"><summary>Answer</summary>

**D.** RAG for current, proprietary facts with citations. Prompt first, add RAG for knowledge, and fine-tune only if that's still not enough.

**Why not A:** Fine-tuning changes behavior, not facts.

Topic: [AIF 07: FM application design, RAG and agents](../AIF-C01-AWS-Certified-AI-Practitioner/topics/07-fm-application-design-rag-agents.md)

</details>

### Question 2

A team needs historical, point-in-time feature values to build a training set. Which Feature Store side?

- **A.** EBS snapshots
- **B.** The online store
- **C.** DynamoDB directly
- **D.** The offline store

<details markdown="1"><summary>Answer</summary>

**D.** Historical, point-in-time data for training means the offline store (append-only Parquet on S3).

**Why not B:** The online store serves the freshest values for low-latency inference, not history.

Topic: [MLA 01: Data collection and storage](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/01-data-collection-and-storage.md)

</details>

### Question 3

An architect plans to put Provisioned Throughput behind a cross-Region inference profile for resilience. What's the catch?

- **A.** It only works with Global profiles
- **B.** Inference profiles don't support Provisioned Throughput. Plan fallbacks instead (retry, degrade, queue).
- **C.** No catch. That's the recommended pattern.
- **D.** It requires prompt caching

<details markdown="1"><summary>Answer</summary>

**B.** PT and inference profiles don't mix. That's a listed trap.

**Why not A:** It doesn't work with any inference profile, Global included.

Topic: [AIP 02: FM selection and configuration](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/02-fm-selection-and-configuration.md)

</details>

### Question 4

A hospital fine-tunes a provider FM on its own clinical notes to build a domain summarizer. Which scope on the Generative AI Security Scoping Matrix?

- **A.** Scope 4: fine-tuned models
- **B.** Scope 3: pre-trained models
- **C.** Scope 2: enterprise app
- **D.** Scope 5: self-trained models

<details markdown="1"><summary>Answer</summary>

**A.** Fine-tuning a provider FM with your own data is Scope 4.

**Why not B:** Scope 3 is calling a third-party FM through an API with no weight changes.

Topic: [AIF 14: AI governance and compliance](../AIF-C01-AWS-Certified-AI-Practitioner/topics/14-ai-governance-and-compliance.md)

</details>

### Question 5

A team versions model weights in Model Registry and container images in ECR. Which other artifacts need versions and a rollback path? **(Choose two.)**

- **A.** Prompts (Prompt Management)
- **B.** IAM user passwords
- **C.** CloudWatch dashboards
- **D.** Agent configurations (agent versions)

<details markdown="1"><summary>Answer</summary>

**A and D.** If it changes the system's behavior, it gets a version and a gate. That includes prompts and agents.

**Why not C:** Dashboards don't change what the system does.

Topic: [MLA 09: CI/CD orchestration and MLOps](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md)

</details>

### Question 6

Half the documents in an index were embedded with model A and half with model B. Retrieval is erratic. What's the rule?

- **A.** Never mix embedding models in one index without a migration
- **B.** Mixing models is fine if you add a reranker
- **C.** Mixing models is fine with hybrid search on
- **D.** Mixing models is fine as long as the dimensions match

<details markdown="1"><summary>Answer</summary>

**A.** Each embedding model defines its own vector space. Re-embed after a model change.

**Why not D:** Matching dimensions doesn't mean the vectors live in the same space.

Topic: [AIP 05: Retrieval mechanisms and RAG](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/05-retrieval-mechanisms-and-rag.md)

</details>

### Question 7

Which metric is precision-oriented n-gram overlap, the classic for machine translation?

- **A.** ROUGE
- **B.** BLEU
- **C.** BERTScore
- **D.** LLM-as-a-judge

<details markdown="1"><summary>Answer</summary>

**B.** BLEU is precision-oriented. ROUGE is the recall-oriented summarization metric.

**Why not A:** ROUGE is recall-oriented and summarization-flavored.

Topic: [AIF 10: FM evaluation methods and metrics](../AIF-C01-AWS-Certified-AI-Practitioner/topics/10-fm-evaluation-methods-and-metrics.md)

</details>

### Question 8

A Knowledge Base goes stale because nobody re-syncs it after S3 updates. Which service pattern automates the refresh?

- **A.** Manually recreating the KB
- **B.** Raising top-k
- **C.** S3 event, then Step Functions or Lambda, then the KB ingest API
- **D.** CloudTrail alarms

<details markdown="1"><summary>Answer</summary>

**C.** An event-driven ingest pipeline keeps the KB current. Add a retrieval eval gate before you promote.

**Why not A:** Manual recreation is the "created once, never refreshed" trap with extra steps.

Topic: [MLA 08: Resource provisioning and configuration](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/08-resource-provisioning-and-configuration.md)

</details>

### Question 9

An agent's tool returns text that contains hostile instructions. The team assumes the Guardrail's prompt-attack filter will catch it. What's true?

- **A.** The prompt-attack filter evaluates every tool result automatically
- **B.** Word filters handle it
- **C.** Tool results and tool specs aren't evaluated by the prompt-attack filter. Validate in the tool layer too.
- **D.** Contextual grounding blocks it

<details markdown="1"><summary>Answer</summary>

**C.** The prompt-attack filter doesn't see tool results. Defense in depth means validating at the tool layer too.

**Why not A:** This is the exact assumption the AIP notes warn against.

Topic: [AIP 12: Input/output safety controls](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/12-input-output-safety-controls.md)

</details>

### Question 10

Someone says Amazon Bedrock only offers Amazon's own models. Correct?

- **A.** Yes, unless you use SageMaker JumpStart inside Bedrock
- **B.** Yes. Bedrock is Amazon models only.
- **C.** No, but only open-source models
- **D.** No. Bedrock offers FMs from multiple providers behind one API.

<details markdown="1"><summary>Answer</summary>

**D.** Bedrock is multi-provider FMs behind one API. Open the model catalog and count the providers.

**Why not B:** Plain wrong, and a common misconception.

Topic: [AIF 06: AWS GenAI infrastructure and services](../AIF-C01-AWS-Certified-AI-Practitioner/topics/06-aws-genai-infrastructure-and-services.md)

</details>

### Question 11

Compliance wants to catch any model bucket that loses encryption or becomes public. Which service tracks that configuration drift?

- **A.** AWS X-Ray
- **B.** AWS Config
- **C.** Amazon Inspector
- **D.** Amazon Macie

<details markdown="1"><summary>Answer</summary>

**B.** Config tracks drift on encryption, public access, and security group rules.

**Why not C:** Inspector finds vulnerabilities in images and compute, not bucket configuration drift.

Topic: [MLA 12: Securing ML and AI workloads](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/12-securing-ml-ai-workloads.md)

</details>

### Question 12

A cost-sensitive app with no data residency constraints wants cheaper Bedrock inference. Which option do the notes call out?

- **A.** Provisioned Throughput for the spiky traffic
- **B.** Prompt caching on batch jobs
- **C.** Global cross-Region inference profiles, about 10% savings when residency allows
- **D.** Raising max tokens

<details markdown="1"><summary>Answer</summary>

**C.** Global profiles save about 10% when compliance allows.

**Why not A:** PT for spiky, low-duty workloads means paying for idle.

Topic: [AIP 16: Cost optimization and resource efficiency](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/16-cost-optimization-and-resource-efficiency.md)

</details>

### Question 13

A Guardrail is attached to a Knowledge Base RetrieveAndGenerate call. What does it apply to?

- **A.** The user input and the model output, not every retrieved chunk
- **B.** Every retrieved chunk before it reaches the model
- **C.** Only the embeddings
- **D.** Only the vector store

<details markdown="1"><summary>Answer</summary>

**A.** Guardrails on RetrieveAndGenerate cover input and output. Retrieved chunks aren't filtered automatically.

**Why not B:** This is the specific misconception the AIF notes call out.

Topic: [AIF 13: Securing AI systems](../AIF-C01-AWS-Certified-AI-Practitioner/topics/13-securing-ai-systems.md)

</details>

### Question 14

When should data bias be measured?

- **A.** Only in production
- **B.** Only after training, on model outputs
- **C.** Never, if the data is large enough
- **D.** Before training (pre-training metrics like CI and DPL) as well as after

<details markdown="1"><summary>Answer</summary>

**D.** Measuring bias only post-training is the listed trap. The exam wants pre-training data bias too.

**Why not B:** Post-training only misses bias that's baked into the data.

Topic: [MLA 03: Data quality, validation, and bias](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/03-data-quality-validation-and-bias.md)

</details>

### Question 15

Most queries are simple classification and routing. A few need deep reasoning. What's the cost pattern?

- **A.** Cascade: small models for routing and classification, escalate to bigger ones only when needed
- **B.** Send everything to the smallest model
- **C.** Buy Provisioned Throughput for the biggest model
- **D.** Send everything to the biggest model

<details markdown="1"><summary>Answer</summary>

**A.** Cascading is one of the biggest cost levers there is.

**Why not D:** The biggest model for everything is maximum cost for minimum gain.

Topic: [AIP 08: Model deployment strategies](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/08-model-deployment-strategies.md)

</details>

### Question 16

Which statement is the one-line summary of Bedrock vs SageMaker?

- **A.** Bedrock trains models. SageMaker only serves them.
- **B.** Bedrock is the managed FM API. SageMaker is where you train and host.
- **C.** They're the same service with different names
- **D.** SageMaker is only for BI dashboards

<details markdown="1"><summary>Answer</summary>

**B.** Bedrock = managed FM API. SageMaker = you train and host.

**Why not A:** Backwards.

Topic: [AIF 03: AI/ML lifecycle and MLOps basics](../AIF-C01-AWS-Certified-AI-Practitioner/topics/03-ai-ml-lifecycle-and-mlops-basics.md)

</details>

### Question 17

A pipeline re-embeds the whole corpus every night, though only a few docs change. What's the cost fix?

- **A.** Move the vectors to EBS
- **B.** Cache document embeddings and re-embed only the deltas
- **C.** Use a bigger embedding model
- **D.** Re-embed twice a night for freshness

<details markdown="1"><summary>Answer</summary>

**B.** Re-embedding the entire corpus nightly is the listed trap. Only re-embed what changed.

**Why not C:** A bigger embedding model raises the cost of the waste.

Topic: [MLA 11: Cost and performance optimization](../MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/11-cost-and-performance-optimization.md)

</details>

### Question 18

A backend streams the model response but buffers the whole thing before sending it to the browser. What's wrong?

- **A.** Buffering server-side defeats the point of streaming. Pass the stream through (WebSocket or SSE).
- **B.** Streaming only works with batch inference
- **C.** Streaming requires Provisioned Throughput
- **D.** Nothing. Buffering improves latency.

<details markdown="1"><summary>Answer</summary>

**A.** Streaming improves perceived latency only if the client actually receives tokens as they arrive.

**Why not D:** Buffering throws away the time-to-first-token win.

Topic: [AIP 10: FM API integrations](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/10-fm-api-integrations.md)

</details>

### Question 19

The team uses a third-party FM on Bedrock and decides it doesn't need its own Model Card, since the provider documents the model. Right call?

- **A.** Yes. The provider's documentation covers it.
- **B.** Yes. Model Cards only apply to open-source models.
- **C.** No. You still document your application's intended use.
- **D.** Only if the model was fine-tuned

<details markdown="1"><summary>Answer</summary>

**C.** Skipping Model Cards for a third-party FM is a listed trap.

**Why not A:** The provider documents their model. You own your app's intended and not-intended uses.

Topic: [AIF 12: Transparency and explainability](../AIF-C01-AWS-Certified-AI-Practitioner/topics/12-transparency-and-explainability.md)

</details>

### Question 20

Answers got worse this week. The model is unchanged. The vector index hasn't refreshed in a month, and it was built with an older embedding model. Where's the problem?

- **A.** The temperature is too low
- **B.** The FM degraded
- **C.** Retrieval: a stale index and an embedding mismatch. Re-embed and refresh.
- **D.** The API is in the wrong Region

<details markdown="1"><summary>Answer</summary>

**C.** Blaming the FM when the index is stale or the wrong embedding model was used is the listed trap.

**Why not B:** Nothing changed on the model side.

Topic: [AIP 20: Troubleshooting GenAI applications](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/20-troubleshooting-genai-applications.md)

</details>

---

**Score: __/20. Under 16? Redo the misses in 3 days.**

Log every miss: the topic, what I picked, and why it was wrong. Back to the [drills index](README.md).
