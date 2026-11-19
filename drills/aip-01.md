---
title: "Drill AIP-01"
---

# Drill AIP-01

Twenty AIP-C01 questions mixed across all five domains. At the Professional level the wrong answers aren't silly. They're the thing a reasonable engineer would try first. Read every option before you commit.

Closed book. About 30 minutes. Answer all 20 before you open a single answer.

---

### Question 1

A GenAI app serves EU customers and must keep inference data in the EU. The team picked a Global cross-Region inference profile "for availability." What should they use?

- **A.** A Geographic cross-Region inference profile
- **B.** Keep the Global profile, because availability wins
- **C.** Turn off cross-Region inference and accept the throttles
- **D.** Provisioned Throughput attached to the Global profile

<details markdown="1"><summary>Answer</summary>

**A.** Geographic profiles keep routing within the geography to satisfy residency. Global only fits when compliance allows it.

**Why not B:** Picking Global when the scenario requires EU residency is the listed trap.

Topic: [AIP 02: FM selection and configuration](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/02-fm-selection-and-configuration.md)

</details>

### Question 2

A team fine-tuned a custom model in Bedrock and now wants to invoke it. What do they typically need?

- **A.** A Global inference profile
- **B.** On-demand tokens, as with base models
- **C.** Prompt caching
- **D.** Provisioned Throughput

<details markdown="1"><summary>Answer</summary>

**D.** Custom Bedrock models often require Provisioned Throughput to invoke.

**Why not B:** Assuming custom models run on-demand like base models is the listed trap.

Topic: [AIP 08: Model deployment strategies](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/08-model-deployment-strategies.md)

</details>

### Question 3

A document-processing request runs for several minutes behind a synchronous API Gateway endpoint, and it keeps timing out. What's the fix?

- **A.** Raise the SDK retry count
- **B.** Stream the response
- **C.** Go async: SQS plus Lambda workers, outputs written to S3, and the client polls or gets notified
- **D.** Switch to a bigger model

<details markdown="1"><summary>Answer</summary>

**C.** Don't hold a 29-second API Gateway connection open for a multi-minute job. Queue it.

**Why not B:** Streaming helps perceived latency on chat. It doesn't make a multi-minute job fit inside a sync timeout.

Topic: [AIP 10: FM API integrations](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/10-fm-api-integrations.md)

</details>

### Question 4

PROMPT_ATTACK is enabled in a Guardrail, but injections still get through on an InvokeModel path. What's missing?

- **A.** A word filter for "ignore previous instructions"
- **B.** A higher content filter strength for violence
- **C.** Tagging the user input so the prompt-attack filter evaluates it
- **D.** A contextual grounding check

<details markdown="1"><summary>Answer</summary>

**C.** On InvokeModel paths, user inputs need to be tagged or the attacks may not get filtered.

**Why not A:** A word filter catches one phrase. Attackers just rephrase it.

Topic: [AIP 12: Input/output safety controls](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/12-input-output-safety-controls.md)

</details>

### Question 5

The team switched to a new embedding model, and retrieval quality fell apart overnight. Why?

- **A.** Top-k is too low
- **B.** The generator's temperature is too high
- **C.** The reranker is set to NONE
- **D.** The index still holds vectors from the old model. Re-embed and reindex.

<details markdown="1"><summary>Answer</summary>

**D.** Never mix embedding models in one index without a migration. The query vectors and stored vectors no longer live in the same space.

**Why not A:** More results from a mismatched vector space are still garbage.

Topic: [AIP 05: Retrieval mechanisms and RAG](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/05-retrieval-mechanisms-and-rag.md)

</details>

### Question 6

A team wants prompt caching to cut the cost of a nightly batch inference job with a long shared prefix. What's true?

- **A.** Prompt caching applies to on-demand inference, not batch
- **B.** Prompt caching only works with Global inference profiles
- **C.** Prompt caching works only with batch inference
- **D.** Prompt caching requires Provisioned Throughput

<details markdown="1"><summary>Answer</summary>

**A.** Prompt caching is on-demand only. Using it with batch inference is the listed trap.

**Why not D:** Nothing in the notes ties prompt caching to Provisioned Throughput.

Topic: [AIP 16: Cost optimization and resource efficiency](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/16-cost-optimization-and-resource-efficiency.md)

</details>

### Question 7

An agent autonomously issued a large refund it shouldn't have. Which safeguards belong in the design? **(Choose two.)**

- **A.** Give the agent an admin role so tool calls never fail
- **B.** Max tool iterations, timeouts, and IAM resource boundaries
- **C.** Human-in-the-loop approval (Step Functions wait-for-task-token) for irreversible actions
- **D.** Remove the Guardrails to cut latency

<details markdown="1"><summary>Answer</summary>

**B and C.** High-impact side effects get a human approval step. Runaway agency gets caps, timeouts, and tight IAM.

**Why not A:** An admin role on an agent is exactly the incident waiting for a date.

Topic: [AIP 07: Agentic AI and tool integrations](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/07-agentic-ai-and-tool-integrations.md)

</details>

### Question 8

Model Invocation Logging is on, but calls made through a different Bedrock endpoint never show up in the logs. Why?

- **A.** Logs only go to S3, never CloudWatch
- **B.** Invocation logging covers the runtime APIs (Converse, InvokeModel and friends), not other endpoints
- **C.** Guardrails suppress the log entries
- **D.** Logging needs Provisioned Throughput

<details markdown="1"><summary>Answer</summary>

**B.** Invocation logging covers Converse/ConverseStream/InvokeModel*. It does not cover calls through other endpoints.

**Why not A:** Invocation logging can go to CloudWatch Logs and/or S3.

Topic: [AIP 18: Monitoring GenAI applications](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/18-monitoring-genai-applications.md)

</details>

### Question 9

The data already lives in DynamoDB. An agent needs sub-10ms memory lookups, and there's no keyword or hybrid search requirement. Which vector option?

- **A.** DynamoDB native vectors
- **B.** S3 Vectors with hierarchical chunking
- **C.** OpenSearch hybrid BM25 + vector
- **D.** Neptune GraphRAG

<details markdown="1"><summary>Answer</summary>

**A.** DynamoDB native vectors fit sub-10ms operational RAG or agent memory when the data already lives there.

**Why not C:** OpenSearch is the pick when you need lexical *and* semantic search. Nobody asked for that here.

Topic: [AIP 04: Vector store solutions](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/04-vector-store-solutions.md)

</details>

### Question 10

Bedrock calls must stay off the public internet, and the team can't change application code. What do you set up?

- **A.** A NAT gateway
- **B.** Interface VPC endpoints for the Bedrock APIs, with private DNS
- **C.** The public endpoint with an IP allowlist
- **D.** AWS Wavelength

<details markdown="1"><summary>Answer</summary>

**B.** Interface endpoints for bedrock, bedrock-runtime, and the agent planes, with private DNS so the code doesn't change.

**Why not A:** A public NAT path "because PrivateLink is hard" is the listed trap.

Topic: [AIP 13: Data security and privacy](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/13-data-security-and-privacy.md)

</details>

### Question 11

Every microservice calls FMs directly, each with its own auth, quotas, and logging. What's the architectural fix?

- **A.** Move the services to AWS Outposts
- **B.** A central GenAI gateway for routing, auth, quotas, guardrails, and observability
- **C.** More IAM roles, one per microservice
- **D.** Prompt Flows in every service

<details markdown="1"><summary>Answer</summary>

**B.** The gateway is the enterprise's single door to the models.

**Why not C:** More roles doesn't fix the sprawl. It just makes it more complicated.

Topic: [AIP 09: Enterprise integration architectures](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/09-enterprise-integration-architectures.md)

</details>

### Question 12

p95 latency is dominated by Knowledge Base retrieval, but the team keeps tuning the model. What should they do?

- **A.** Switch to a smaller model
- **B.** Raise the temperature
- **C.** Trace prompt, retrieve, and generate with X-Ray/OTEL spans, and fix the slowest stage first
- **D.** Turn on streaming and call it done

<details markdown="1"><summary>Answer</summary>

**C.** Optimize the slowest stage. Tuning model latency while retrieval dominates p95 is the listed trap.

**Why not A:** A faster model doesn't touch the part that's actually slow.

Topic: [AIP 17: Application performance optimization](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/17-application-performance-optimization.md)

</details>

### Question 13

A new model got promoted because its latency was better. Faithfulness collapsed. What would have prevented it?

- **A.** A CI/CD quality gate that includes faithfulness evals, plus a canary
- **B.** A latency-only gate
- **C.** Accuracy as the only metric
- **D.** A big-bang swap during a quiet hour

<details markdown="1"><summary>Answer</summary>

**A.** Gates have to cover quality, not just speed. Canary the change before full rollout.

**Why not B:** Promoting on latency while faithfulness collapses is exactly the listed trap.

Topic: [AIP 19: Evaluation systems for GenAI](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/19-evaluation-systems-for-genai.md)

</details>

### Question 14

The team swapped the model behind the same prompt ARN, and outputs quietly regressed. What was missing?

- **A.** A regression suite on golden prompts that runs whenever the model or prompt changes
- **B.** More chain-of-thought in the prompt
- **C.** A denied-topic Guardrail
- **D.** Deleting old prompt versions

<details markdown="1"><summary>Answer</summary>

**A.** No regression suite when you swap models behind the same prompt ARN is the listed trap.

**Why not B:** CoT adds cost and latency. It doesn't tell you anything regressed.

Topic: [AIP 06: Prompt engineering and governance](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/06-prompt-engineering-and-governance.md)

</details>

### Question 15

In a regulated deployment, auditors find RAG answers with no source attribution. What fixes it?

- **A.** A larger model
- **B.** Lineage: corpora registered in the Glue Data Catalog, with KB metadata carried through to citations
- **C.** A model card, and nothing else
- **D.** A word filter on the output

<details markdown="1"><summary>Answer</summary>

**B.** Governance means lineage plus audit. Source metadata has to flow through to the answer.

**Why not C:** Model cards matter, but they don't put citations on individual answers.

Topic: [AIP 14: AI governance and compliance](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/14-ai-governance-and-compliance.md)

</details>

### Question 16

A team turned on Bedrock Data Automation PII redaction and assumes the original PDFs in S3 are now clean. Are they?

- **A.** Only if Macie is enabled on the bucket
- **B.** Only if a Guardrail is attached to the bucket
- **C.** Yes. BDA rewrites the source files in place.
- **D.** No. By default the redaction applies to the BDA JSON outputs, not the source assets.

<details markdown="1"><summary>Answer</summary>

**D.** Assuming BDA redaction rewrites the source is the listed trap.

**Why not C:** BDA doesn't rewrite source assets by default.

Topic: [AIP 11: Application integration patterns](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/11-application-integration-patterns.md)

</details>

### Question 17

PDFs, images, and call recordings all need to feed a RAG corpus. What's the right prep?

- **A.** Push the raw binaries through one tokenizer
- **B.** Skip data quality and fix it in the prompt
- **C.** Run them through Textract/Transcribe/BDA into normalized text plus metadata, then embed
- **D.** Fine-tune a model on the raw files

<details markdown="1"><summary>Answer</summary>

**C.** Keep modality-specific parsers that produce normalized text plus metadata, then embed.

**Why not B:** "We'll fix it in the prompt" is the listed trap. You won't.

Topic: [AIP 03: Data validation and processing for FMs](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/03-data-validation-and-processing-for-fms.md)

</details>

### Question 18

The fairness evaluation reports only aggregate accuracy. What's wrong?

- **A.** Run fairness checks once, at launch
- **B.** Aggregates hide subgroup harm. Slice metrics by subgroup and use judge or Clarify jobs.
- **C.** Nothing. Aggregate accuracy is the standard.
- **D.** Use the same model as generator and judge, and skip documenting it

<details markdown="1"><summary>Answer</summary>

**B.** Fairness eval on aggregate accuracy alone hides subgroup harm.

**Why not A:** Checking only at launch misses drift. Bias monitoring has to be continuous.

Topic: [AIP 15: Responsible AI principles](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/15-responsible-ai-principles.md)

</details>

### Question 19

An agent keeps giving wrong answers. The trace shows a tool call failing with AccessDenied. What's the fix?

- **A.** Raise max tokens
- **B.** Rewrite the system prompt
- **C.** Switch to a bigger model
- **D.** Fix the tool's IAM permissions

<details markdown="1"><summary>Answer</summary>

**D.** Missing a tool IAM AccessDenied buried in agent traces is the listed trap. Fix the layer that's actually broken.

**Why not B:** No prompt fixes a permissions failure.

Topic: [AIP 20: Troubleshooting GenAI applications](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/20-troubleshooting-genai-applications.md)

</details>

### Question 20

A Bedrock playground PoC looks great, and a stakeholder wants to call it production. What's missing? **(Choose two.)**

- **A.** A bigger model
- **B.** Eval gates
- **C.** Fine-tuning
- **D.** Guardrails and invocation logging

<details markdown="1"><summary>Answer</summary>

**B and D.** Playground success isn't production readiness. With no Guardrails, no logging, and no eval gates, it's still a demo.

**Why not C:** Jumping to fine-tuning is a listed trap when RAG plus prompt governance meets the requirement.

Topic: [AIP 01: GenAI solution design and requirements](../AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/01-genai-solution-design-and-requirements.md)

</details>

---

**Score: __/20. Under 16? Redo the misses in 3 days.**

Log every miss: the topic, what I picked, and why it was wrong. Back to the [drills index](README.md).
