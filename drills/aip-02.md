---
title: "Drill AIP-02"
---

# Drill AIP-02

The second AIP-C01 drill. Routing and throughput, retrieval behavior, safety edge cases, governance, and debugging, shuffled. Plenty of "which layer is actually broken" in this one.

Closed book. About 30 minutes. Answer all 20 before you open a single answer.

---

### Question 1

The team wants to swap models without a code deploy. What's the pattern?

- **A.** Buy Provisioned Throughput for every model
- **B.** Resolve modelId or the inference profile from AppConfig/Parameter Store, and use the Converse API
- **C.** Fine-tune every candidate model
- **D.** Hardcode provider-specific InvokeModel bodies

<details markdown="1"><summary>Answer</summary>

**B.** Config-driven model IDs plus portable Converse calls make the model a setting, not a deploy.

**Why not D:** Provider-specific bodies tie the code to one model.

Topic: [AIP 02: FM selection and configuration](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/02-fm-selection-and-configuration.md)

</details>

### Question 2

A steady, high-TPS workload with a latency SLA is getting throttled on demand. The team wants Provisioned Throughput on its cross-Region inference profile. What's correct?

- **A.** Run inference on Spot instances
- **B.** Increase Lambda memory
- **C.** Buy Provisioned Throughput Model Units for the model. It isn't usable with inference profiles.
- **D.** Attach Provisioned Throughput to the Global inference profile

<details markdown="1"><summary>Answer</summary>

**C.** PT fits steady high TPS. Inference profiles do not support Provisioned Throughput.

**Why not D:** Assuming PT works with cross-Region inference profiles is the listed trap.

Topic: [AIP 08: Model deployment strategies](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/08-model-deployment-strategies.md)

</details>

### Question 3

A team expected a fully managed Knowledge Base to do semantic-only search. Keyword matches are influencing results. What's going on?

- **A.** The embedding model is doing keyword search
- **B.** Hybrid search (keyword + vector) is the managed default
- **C.** The KB is misconfigured and broken
- **D.** The reranker adds keyword matches

<details markdown="1"><summary>Answer</summary>

**B.** Expecting semantic-only on a managed KB is the listed trap. Hybrid is the default.

**Why not C:** Nothing is broken. That's the documented default.

Topic: [AIP 05: Retrieval mechanisms and RAG](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/05-retrieval-mechanisms-and-rag.md)

</details>

### Question 4

Where can you NOT rely on Bedrock Guardrails?

- **A.** Knowledge Base RetrieveAndGenerate
- **B.** Converse calls
- **C.** Agents
- **D.** Embedding, image-generation, and rerank models

<details markdown="1"><summary>Answer</summary>

**D.** Guardrails on embedding, image-gen, or rerank models is unsupported. That's the listed trap.

**Why not A:** Guardrails attach to KB RetrieveAndGenerate.

Topic: [AIP 12: Input/output safety controls](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/12-input-output-safety-controls.md)

</details>

### Question 5

A semantic cache returned one user's personalized answer to a different user. What went wrong?

- **A.** Prompt caching should have been used instead
- **B.** The TTL is too short
- **C.** The cache is too small
- **D.** Personalized or PII answers were cached without tenancy keys

<details markdown="1"><summary>Answer</summary>

**D.** Caching personalized answers without tenancy keys is a leak, not an optimization.

**Why not B:** TTL controls freshness, not who sees whose data.

Topic: [AIP 16: Cost optimization and resource efficiency](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/16-cost-optimization-and-resource-efficiency.md)

</details>

### Question 6

You need a managed runtime with session-isolated microVMs, identity, and memory for production agents. Which piece?

- **A.** Amazon Bedrock AgentCore Runtime
- **B.** AWS Agent Squad
- **C.** A bare Step Functions state machine
- **D.** Bedrock Prompt Flows

<details markdown="1"><summary>Answer</summary>

**A.** AgentCore Runtime is the managed platform piece: isolation, Identity, Memory, Observability.

**Why not B:** Agent Squad is an open-source router, not a managed control plane. Confusing the two is the listed trap.

Topic: [AIP 07: Agentic AI and tool integrations](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/07-agentic-ai-and-tool-integrations.md)

</details>

### Question 7

Retries in a tight loop are making Bedrock throttling worse. What's the fix?

- **A.** SDK exponential backoff with jitter, and queue work on ThrottlingException
- **B.** Retry immediately in a busy loop
- **C.** Send the requests to the control-plane bedrock endpoint
- **D.** Raise the client timeout

<details markdown="1"><summary>Answer</summary>

**A.** Backoff plus jitter, queue the throttled work, and circuit-break to smaller models.

**Why not C:** The control-plane endpoint is the wrong place for inference. Always use bedrock-runtime.

Topic: [AIP 10: FM API integrations](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/10-fm-api-integrations.md)

</details>

### Question 8

A single document gets a small edit, and the pipeline re-embeds the entire corpus. The embedding model hasn't changed. What should it do?

- **A.** Keep the full re-embed so everything stays consistent
- **B.** Create a new index for every edit
- **C.** Incremental sync triggered by EventBridge or S3 notifications
- **D.** Turn off sync and reindex quarterly

<details markdown="1"><summary>Answer</summary>

**C.** Incremental ingestion. A full reindex is only needed when the embedding model changes.

**Why not A:** A full re-embed on every doc tweak is the listed trap.

Topic: [AIP 04: Vector store solutions](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/04-vector-store-solutions.md)

</details>

### Question 9

Outputs are redacted, but raw PII is sitting in the vector store. What's the fix?

- **A.** Shorten the S3 lifecycle on the source bucket
- **B.** Attach a Guardrail to the embedding model
- **C.** Add more output redaction
- **D.** Detect and redact with Comprehend before KB ingest, and use Macie for discovery and quarantine

<details markdown="1"><summary>Answer</summary>

**D.** Redacting only outputs while indexing raw PII is the listed trap. Clean the data before ingest.

**Why not C:** The PII is still indexed and retrievable. Output redaction only hides the symptom.

Topic: [AIP 13: Data security and privacy](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/13-data-security-and-privacy.md)

</details>

### Question 10

The team upgraded the model and only watched CPU and latency graphs afterward. What did they skip?

- **A.** Disk metrics
- **B.** More CPU graphs
- **C.** A golden-set regression check on output quality
- **D.** Endpoint instance health

<details markdown="1"><summary>Answer</summary>

**C.** No golden-set regression after a model upgrade is the listed trap.

**Why not B:** Infra graphs say nothing about whether the answers got worse.

Topic: [AIP 18: Monitoring GenAI applications](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/18-monitoring-genai-applications.md)

</details>

### Question 11

Grounded FAQ answers are coming back creative and inconsistent. What changes first?

- **A.** Lower the temperature / nucleus sampling
- **B.** Raise the temperature
- **C.** Fetch the top 50 chunks
- **D.** Raise max tokens

<details markdown="1"><summary>Answer</summary>

**A.** Factual RAG wants lower temperature. High temperature on grounded FAQ answers is the listed trap.

**Why not C:** Over-fetching hurts latency, cost, and usually quality.

Topic: [AIP 17: Application performance optimization](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/17-application-performance-optimization.md)

</details>

### Question 12

Business users want a multi-step workflow without custom UI code. There's no complex tool auth involved. What's the right-sized abstraction?

- **A.** A Strands multi-agent swarm
- **B.** Agent Squad routing
- **C.** Bedrock Prompt Flows
- **D.** A custom MCP server on ECS

<details markdown="1"><summary>Answer</summary>

**C.** Prompt Flows exist for business-user workflows without custom UI code.

**Why not D:** Custom MCP is for complex tool auth. That's overbuilding here.

Topic: [AIP 11: Application integration patterns](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/11-application-integration-patterns.md)

</details>

### Question 13

Regulated data has to stay on-premises because of data gravity, and the app still needs GenAI capabilities. Which hybrid option fits?

- **A.** AWS Wavelength
- **B.** A Global cross-Region inference profile
- **C.** AWS Outposts
- **D.** Public Bedrock endpoints over the internet

<details markdown="1"><summary>Answer</summary>

**C.** Outposts is the on-prem data-gravity option.

**Why not A:** Wavelength is for ultra-low-latency edge, not keeping data on-prem.

Topic: [AIP 09: Enterprise integration architectures](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/09-enterprise-integration-architectures.md)

</details>

### Question 14

A RAG evaluation uses coverage metrics, but nobody provided ground truth. What's the problem?

- **A.** Switch to latency as the metric
- **B.** Coverage metrics require ground truth. Supply reference answers.
- **C.** Use accuracy instead
- **D.** No problem. Coverage doesn't need references.

<details markdown="1"><summary>Answer</summary>

**B.** RAG eval without ground truth when the coverage metrics need it is the listed trap.

**Why not D:** Those coverage metrics depend on reference answers.

Topic: [AIP 19: Evaluation systems for GenAI](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/19-evaluation-systems-for-genai.md)

</details>

### Question 15

A Guardrail on a Prompt Flow's Knowledge Base node doesn't seem to apply. What's a likely cause?

- **A.** The node isn't using RetrieveAndGenerate with a modelId where the Guardrail requires it
- **B.** Flows only support word filters
- **C.** The Guardrail needs Provisioned Throughput
- **D.** Guardrails never work in Flows

<details markdown="1"><summary>Answer</summary>

**A.** Guardrails on a Flow KB node need RetrieveAndGenerate / a modelId where required.

**Why not D:** Guardrails do attach to Flow prompt and KB nodes.

Topic: [AIP 06: Prompt engineering and governance](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/06-prompt-engineering-and-governance.md)

</details>

### Question 16

Bias was measured once at launch and never again. What's the governance fix?

- **A.** Continuous controls: scheduled Clarify/fairness jobs with automated alerts
- **B.** Re-run the launch check every two years
- **C.** Document it in the model card and stop
- **D.** Add a word filter

<details markdown="1"><summary>Answer</summary>

**A.** Bias monitoring only at launch is the listed trap. Monitor continuously.

**Why not C:** A model card documents limits. It doesn't detect drift.

Topic: [AIP 14: AI governance and compliance](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/14-ai-governance-and-compliance.md)

</details>

### Question 17

Long conversations hit context-window errors and give truncated answers. Which fixes come first? **(Choose two.)**

- **A.** Dynamic chunking, with fewer and better retrieved chunks
- **B.** Always move to the largest-window model first
- **C.** Summarize prior turns and shrink the history
- **D.** Keep raising max tokens

<details markdown="1"><summary>Answer</summary>

**A and C.** Shrink history, summarize turns, chunk dynamically. Move to a larger window only if you still need it.

**Why not D:** Raising max tokens endlessly instead of fixing retrieval noise is the listed trap.

Topic: [AIP 20: Troubleshooting GenAI applications](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/20-troubleshooting-genai-applications.md)

</details>

### Question 18

A multi-turn chat app sends its system instructions inside the user role, and behavior is erratic. What's the fix?

- **A.** Raise the temperature
- **B.** Put everything in one giant user message
- **C.** Switch to InvokeModel with a raw body
- **D.** Use Converse message blocks with system and user roles kept separate

<details markdown="1"><summary>Answer</summary>

**D.** Mixing up system and user roles in conversation formatting is the listed trap.

**Why not B:** Collapsing everything into one message makes the role problem worse.

Topic: [AIP 03: Data validation and processing for FMs](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/03-data-validation-and-processing-for-fms.md)

</details>

### Question 19

The same model generates the answers and also judges them in LLM-as-judge evals. What's the right stance?

- **A.** It's prohibited by Bedrock
- **B.** It's common, but it carries bias risk. Acknowledge it and document the mitigations.
- **C.** It's fine with no caveats
- **D.** Judges have to be human, always

<details markdown="1"><summary>Answer</summary>

**B.** Using the same model as generator and judge without acknowledging the bias risk is the trap. The fix is transparency about it.

**Why not C:** Ignoring the self-judging bias is exactly what the trap describes.

Topic: [AIP 15: Responsible AI principles](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/15-responsible-ai-principles.md)

</details>

### Question 20

A team needs custom containers and wants to own the full LoRA adapter lifecycle. Where should those models run?

- **A.** Bedrock on-demand
- **B.** SageMaker
- **C.** Bedrock Prompt Flows
- **D.** Amazon Quick

<details markdown="1"><summary>Answer</summary>

**B.** Prefer Bedrock for most apps, and reach for SageMaker when you need custom containers or LoRA lifecycle ownership.

**Why not A:** Bedrock on-demand is managed inference. It doesn't give you custom containers.

Topic: [AIP 01: GenAI solution design and requirements](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/01-genai-solution-design-and-requirements.md)

</details>

---

**Score: __/20. Under 16? Redo the misses in 3 days.**

Log every miss: the topic, what I picked, and why it was wrong. Back to the [drills index](README.md).
