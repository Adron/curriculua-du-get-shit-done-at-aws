---
title: "Drill AIF-02"
---

# Drill AIF-02

The second AIF-C01 drill. It's a different set of scenarios across the same five domains, and it leans a little harder on the traps: overbuilding, confusing the services, and trusting a confident answer.

Closed book. About 30 minutes. Answer all 20 before you open a single answer.

---

### Question 1

A finance team has to compute tax amounts exactly, and auditors need the same answer every time. Which approach fits?

- **A.** Deterministic rules. This isn't an AI problem.
- **B.** A classification model
- **C.** Clustering
- **D.** An LLM with chain-of-thought prompting

<details markdown="1"><summary>Answer</summary>

**A.** When you need a deterministic, exact outcome (tax, ledger balances), AI's probabilistic answers are the wrong tool.

**Why not D:** Chain-of-thought makes reasoning visible. It doesn't make an LLM deterministic or exact.

Topic: [AIF 02: AI use cases and technique selection](../AIF-C01-AWS-Certified-AI-Practitioner/topics/02-ai-use-cases-and-technique-selection.md)

</details>

### Question 2

What is MCP (Model Context Protocol)?

- **A.** A foundation model from AWS
- **B.** An evaluation metric
- **C.** A vector database
- **D.** A standard way to connect agents to external tools and data sources

<details markdown="1"><summary>Answer</summary>

**D.** MCP is a protocol for tools and context.

**Why not A:** Treating MCP as a model is the listed trap. It's plumbing, not an FM.

Topic: [AIF 04: GenAI foundational concepts](../AIF-C01-AWS-Certified-AI-Practitioner/topics/04-genai-foundational-concepts.md)

</details>

### Question 3

A team building a customer-managed Knowledge Base already runs PostgreSQL on RDS and wants to keep its embeddings there. Is that one of the exam guide's vector store examples?

- **A.** No. Embeddings can only live in S3.
- **B.** Yes. Amazon RDS for PostgreSQL (pgvector-style patterns) is on the list.
- **C.** No. Vector stores are only available with Managed Knowledge Bases.
- **D.** No. Only Amazon OpenSearch Service can store embeddings.

<details markdown="1"><summary>Answer</summary>

**B.** The exam guide's vector DB examples are OpenSearch, Aurora, Neptune, and RDS for PostgreSQL.

**Why not D:** OpenSearch is the common choice, not the only one.

Topic: [AIF 07: FM application design, RAG and agents](../AIF-C01-AWS-Certified-AI-Practitioner/topics/07-fm-application-design-rag-agents.md)

</details>

### Question 4

Marketing wants to know whether generated ad copy matches the brand voice and is safe to publish. What's the right evaluation approach?

- **A.** Human-in-the-loop review
- **B.** BLEU score only
- **C.** ROUGE score only
- **D.** Public benchmark datasets

<details markdown="1"><summary>Answer</summary>

**A.** Subjective quality, brand voice, and safety call for human review.

**Why not B:** BLEU alone can't judge brand voice or open-ended quality. Using it that way is a listed trap.

Topic: [AIF 10: FM evaluation methods and metrics](../AIF-C01-AWS-Certified-AI-Practitioner/topics/10-fm-evaluation-methods-and-metrics.md)

</details>

### Question 5

What data does RLHF rely on?

- **A.** A teacher model's outputs
- **B.** Retrieved document chunks
- **C.** Human preference rankings of model outputs
- **D.** Massive unlabeled text corpora

<details markdown="1"><summary>Answer</summary>

**C.** RLHF uses human raters ranking outputs to align a model with preferred behavior.

**Why not A:** Teacher outputs are distillation, where a student learns to mimic a teacher.

Topic: [AIF 09: FM training and fine-tuning](../AIF-C01-AWS-Certified-AI-Practitioner/topics/09-fm-training-and-fine-tuning.md)

</details>

### Question 6

Under the shared responsibility model, who secures the prompts, the application config, and the data for a Bedrock app?

- **A.** Nobody, once Guardrails are enabled
- **B.** AWS
- **C.** The customer
- **D.** The model provider

<details markdown="1"><summary>Answer</summary>

**C.** AWS secures the cloud. You secure your data, identity, app configuration, prompts, and tools.

**Why not B:** Misreading shared responsibility is a listed trap. AWS doesn't own your prompts or your app.

Topic: [AIF 13: Securing AI systems](../AIF-C01-AWS-Certified-AI-Practitioner/topics/13-securing-ai-systems.md)

</details>

### Question 7

A team fine-tuned a model on customer records. A customer now invokes their GDPR right to erasure. What's the problem, and what should the team have done?

- **A.** Deleting the chat logs fully satisfies the request.
- **B.** Getting data out of the weights may mean deleting it from the training set and retraining. Erasable PII should have stayed out of the weights and gone through RAG.
- **C.** A Guardrails PII mask erases the data from the model.
- **D.** AWS Artifact handles erasure requests automatically.

<details markdown="1"><summary>Answer</summary>

**B.** Fine-tuned weights can't selectively forget. Keeping erasable PII in a retrieval store means you can delete it at the source.

**Why not C:** Masking hides PII in outputs. The data is still baked into the weights.

Topic: [AIF 14: AI governance and compliance](../AIF-C01-AWS-Certified-AI-Practitioner/topics/14-ai-governance-and-compliance.md)

</details>

### Question 8

A developer wants spec-driven, agentic AI help while writing software. Which AWS offering is built for that persona?

- **A.** Amazon Quick
- **B.** Amazon Bedrock AgentCore
- **C.** Kiro
- **D.** Bedrock Knowledge Bases

<details markdown="1"><summary>Answer</summary>

**C.** Kiro is the AI IDE for agentic, spec-driven development.

**Why not B:** AgentCore runs production agents. It's not a developer's IDE.

Topic: [AIF 06: AWS GenAI infrastructure and services](../AIF-C01-AWS-Certified-AI-Practitioner/topics/06-aws-genai-infrastructure-and-services.md)

</details>

### Question 9

A chatbot's monthly bill spikes whenever usage spikes, even though nobody trained a new model. Which cost is growing?

- **A.** Inference cost
- **B.** Labeling cost
- **C.** Training cost
- **D.** Pre-training cost

<details markdown="1"><summary>Answer</summary>

**A.** Serving predictions or tokens to users is inference, and it scales with usage.

**Why not C:** Training cost is fitting the model. Nothing was trained here.

Topic: [AIF 01: AI/ML terminology and concepts](../AIF-C01-AWS-Certified-AI-Practitioner/topics/01-ai-ml-terminology-and-concepts.md)

</details>

### Question 10

A workflow has to look up an order, check the refund policy, and then call a refund API. Several steps, several tools. What fits?

- **A.** Fine-tuning
- **B.** A zero-shot prompt
- **C.** An AI agent with tools and memory
- **D.** A single RAG call

<details markdown="1"><summary>Answer</summary>

**C.** Agents plan, call tools, keep memory, and finish multi-step workflows like this one.

**Why not D:** One RAG call retrieves and answers. It can't call the refund API or chain the steps.

Topic: [AIF 07: FM application design, RAG and agents](../AIF-C01-AWS-Certified-AI-Practitioner/topics/07-fm-application-design-rag-agents.md)

</details>

### Question 11

Several teams edit production prompts. They want variables, side-by-side variants, and saved versions. Which feature?

- **A.** Amazon Bedrock Prompt Management
- **B.** Amazon Bedrock Guardrails
- **C.** SageMaker Model Cards
- **D.** AWS CloudTrail

<details markdown="1"><summary>Answer</summary>

**A.** Prompt Management does variables, variants compared side by side, and versions.

**Why not B:** Guardrails filter content. They don't version prompts.

Topic: [AIF 08: Prompt engineering techniques](../AIF-C01-AWS-Certified-AI-Practitioner/topics/08-prompt-engineering-techniques.md)

</details>

### Question 12

You're choosing a model for an interactive chat app that must keep EU customer data in the EU. Which selection factors decide it? **(Choose two.)**

- **A.** Compliance and data residency
- **B.** Vendor marketing benchmarks
- **C.** Latency
- **D.** Largest parameter count

<details markdown="1"><summary>Answer</summary>

**A and C.** Residency is compliance. Interactive chat makes latency matter.

**Why not D:** "Biggest model" ignores cost and latency, and it says nothing about residency.

Topic: [AIF 05: GenAI capabilities, limitations, and selection](../AIF-C01-AWS-Certified-AI-Practitioner/topics/05-genai-capabilities-limitations-selection.md)

</details>

### Question 13

A bank uses an opaque FM for internal policy Q&A. Stakeholders want transparency. What's the practical answer?

- **A.** Replace the FM with linear regression
- **B.** Require full mechanistic interpretability of the FM
- **C.** Process transparency: citations, Guardrails, human review, and a Model Card
- **D.** Turn off safety filters so users can see the reasoning

<details markdown="1"><summary>Answer</summary>

**C.** With opaque FMs, transparency comes from process: cards, evals, citations, and a UI that explains itself.

**Why not A:** Switching to linear regression only makes sense if explainability is the primary requirement. Here it's Q&A over policy docs.

Topic: [AIF 12: Transparency and explainability](../AIF-C01-AWS-Certified-AI-Practitioner/topics/12-transparency-and-explainability.md)

</details>

### Question 14

Six months after launch, a model's input data looks different from its training data and quality drops. Which lifecycle stage handles this?

- **A.** Pre-training
- **B.** Labeling
- **C.** Defining the business problem
- **D.** Monitor and retrain

<details markdown="1"><summary>Answer</summary>

**D.** Drift, quality, and cost are watched in monitoring, which triggers retraining.

**Why not A:** Pre-training is the provider's massive initial training. It's not how you respond to drift.

Topic: [AIF 03: AI/ML lifecycle and MLOps basics](../AIF-C01-AWS-Certified-AI-Practitioner/topics/03-ai-ml-lifecycle-and-mlops-basics.md)

</details>

### Question 15

A model does great on its training data and badly on new data. What's going on?

- **A.** Underfitting
- **B.** Too much inclusivity in the dataset
- **C.** Label noise
- **D.** High variance / overfitting

<details markdown="1"><summary>Answer</summary>

**D.** It memorized the training data and fails to generalize.

**Why not A:** Underfitting means it's too simple and inaccurate everywhere, training data included.

Topic: [AIF 11: Responsible AI principles and practices](../AIF-C01-AWS-Certified-AI-Practitioner/topics/11-responsible-ai-principles-and-practices.md)

</details>

### Question 16

An agent calls internal APIs that require credentials. Where do the credentials go?

- **A.** In the Model Card
- **B.** AWS Secrets Manager
- **C.** In the system prompt
- **D.** In vector store metadata

<details markdown="1"><summary>Answer</summary>

**B.** Tool credentials live in Secrets Manager. Never in prompts.

**Why not C:** Anything in the context can come out in an answer. Secrets in prompts get leaked.

Topic: [AIF 13: Securing AI systems](../AIF-C01-AWS-Certified-AI-Practitioner/topics/13-securing-ai-systems.md)

</details>

### Question 17

A summarization app writes long outputs, and the bill is higher than the team expected. How is Bedrock token pricing calculated?

- **A.** Number of API keys
- **B.** Input tokens plus output tokens
- **C.** Input tokens only
- **D.** Embedding vector dimension

<details markdown="1"><summary>Answer</summary>

**B.** Cost scales with input and output tokens. Long summaries cost money too.

**Why not C:** Ignoring output tokens is the listed trap.

Topic: [AIF 04: GenAI foundational concepts](../AIF-C01-AWS-Certified-AI-Practitioner/topics/04-genai-foundational-concepts.md)

</details>

### Question 18

A call center wants call audio turned into transcripts, then sentiment and entities pulled from the transcripts. Which services?

- **A.** Amazon Translate + Amazon Personalize
- **B.** Amazon Polly + Amazon Lex
- **C.** Amazon Rekognition + Amazon Textract
- **D.** Amazon Transcribe + Amazon Comprehend

<details markdown="1"><summary>Answer</summary>

**D.** Transcribe does speech to text. Comprehend does entities and sentiment.

**Why not B:** Polly is text to speech, which is backwards. Lex is for building bots.

Topic: [AIF 02: AI use cases and technique selection](../AIF-C01-AWS-Certified-AI-Practitioner/topics/02-ai-use-cases-and-technique-selection.md)

</details>

### Question 19

An assistant keeps hallucinating details about company policies. Someone proposes fine-tuning it. What's the better fix?

- **A.** RAG with grounding against the policy docs
- **B.** Distill it into a smaller model
- **C.** Fine-tune with more epochs
- **D.** Raise the temperature

<details markdown="1"><summary>Answer</summary>

**A.** Fine-tuning changes behavior. RAG adds facts. Grounded retrieval plus citations is the fix for policy facts.

**Why not C:** Fine-tuning to fix policy hallucinations is a listed trap. The facts still aren't in the context.

Topic: [AIF 09: FM training and fine-tuning](../AIF-C01-AWS-Certified-AI-Practitioner/topics/09-fm-training-and-fine-tuning.md)

</details>

### Question 20

Security wants to know exactly who invoked a Bedrock model, and when. Which service?

- **A.** Amazon Inspector
- **B.** AWS CloudTrail
- **C.** AWS Trusted Advisor
- **D.** AWS Artifact

<details markdown="1"><summary>Answer</summary>

**B.** CloudTrail is the API audit trail. It's the "who invoked the model" service.

**Why not A:** Inspector produces vulnerability findings on compute. It doesn't record API calls.

Topic: [AIF 14: AI governance and compliance](../AIF-C01-AWS-Certified-AI-Practitioner/topics/14-ai-governance-and-compliance.md)

</details>

---

**Score: __/20. Under 16? Redo the misses in 3 days.**

Log every miss: the topic, what I picked, and why it was wrong. Back to the [drills index](README.md).
