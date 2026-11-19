---
title: "Drill AIF-01"
---

# Drill AIF-01

Twenty AIF-C01 questions, all five domains shuffled together. The vocabulary, the "which service" calls, RAG vs fine-tune, responsible AI, and governance, in no particular order. Same as the real exam.

Closed book. About 30 minutes. Answer all 20 before you open a single answer.

---

### Question 1

A support team wants a chatbot that answers questions from about 4,000 internal policy documents. The documents change every week, and every answer has to cite the policy it came from. What's the best approach?

- **A.** Continued pre-training on the full document set
- **B.** Put a few example policy answers in the prompt (few-shot)
- **C.** Retrieval-augmented generation with an Amazon Bedrock Knowledge Base
- **D.** Fine-tune a foundation model on the policy documents once a month

<details markdown="1"><summary>Answer</summary>

**C.** RAG brings current, proprietary facts into the context without touching the model weights, and Knowledge Bases return citations with the answer. Weekly changes just mean a re-sync.

**Why not D:** Fine-tuning changes behavior and style, not facts. With weekly updates you'd be retraining forever, and you still wouldn't get citations.

Topic: [AIF 07: FM application design, RAG and agents](../AIF-C01-AWS-Certified-AI-Practitioner/topics/07-fm-application-design-rag-agents.md)

</details>

### Question 2

A fraud model scores 99% accuracy. Fraud is 0.5% of transactions, and the model misses most of it. Which metric should the team focus on?

- **A.** ROUGE
- **B.** Accuracy
- **C.** BLEU
- **D.** Recall

<details markdown="1"><summary>Answer</summary>

**D.** Recall answers "of the actual fraud cases, how many did we catch?" High accuracy hides terrible recall when the positive class is rare.

**Why not B:** Accuracy is the number that's lying here. Predicting "not fraud" every time gets you 99.5%.

Topic: [AIF 03: AI/ML lifecycle and MLOps basics](../AIF-C01-AWS-Certified-AI-Practitioner/topics/03-ai-ml-lifecycle-and-mlops-basics.md)

</details>

### Question 3

An external auditor asks for AWS's SOC report covering the services your AI application runs on. Where do you get it?

- **A.** AWS Config
- **B.** Amazon Inspector
- **C.** AWS Artifact
- **D.** AWS CloudTrail

<details markdown="1"><summary>Answer</summary>

**C.** Artifact is on-demand access to AWS compliance reports and agreements.

**Why not D:** CloudTrail is the API audit trail (who called what, when). It's evidence about your account, not AWS's compliance reports.

Topic: [AIF 14: AI governance and compliance](../AIF-C01-AWS-Certified-AI-Practitioner/topics/14-ai-governance-and-compliance.md)

</details>

### Question 4

An insurance company needs to pull text and form fields out of scanned claim forms. Which option takes the least effort?

- **A.** Amazon Textract
- **B.** Build a Bedrock agent that reads each form
- **C.** Train a custom computer vision model on SageMaker
- **D.** Fine-tune an LLM on thousands of example claim forms

<details markdown="1"><summary>Answer</summary>

**A.** A purpose-built AI service that already does document extraction. Cheaper, more consistent, and easier to govern than prompting or training something.

**Why not D:** Classic overbuilding. Fine-tuning an LLM for a commodity document task Textract already handles is the trap.

Topic: [AIF 02: AI use cases and technique selection](../AIF-C01-AWS-Certified-AI-Practitioner/topics/02-ai-use-cases-and-technique-selection.md)

</details>

### Question 5

A team pastes an entire 300-page manual into every prompt. Costs are high and requests sometimes hit the context limit. What's the fix?

- **A.** Raise the max tokens setting
- **B.** Raise the temperature
- **C.** Chunk, embed, and retrieve only the relevant passages (RAG)
- **D.** Switch to the biggest model available

<details markdown="1"><summary>Answer</summary>

**C.** Context windows are finite and billed per token. Retrieve the few chunks that matter instead of stuffing the whole corpus in.

**Why not D:** Bigger models cost more per token. The whole manual still doesn't belong in the prompt.

Topic: [AIF 04: GenAI foundational concepts](../AIF-C01-AWS-Certified-AI-Practitioner/topics/04-genai-foundational-concepts.md)

</details>

### Question 6

A hiring screening model produces unequal outcomes across demographic groups. The training data is skewed toward one group. Which actions address it? **(Choose two.)**

- **A.** Curate and rebalance the training dataset
- **B.** Add a Bedrock Guardrails word filter
- **C.** Run SageMaker Clarify to detect and measure the bias
- **D.** Raise the inference temperature

<details markdown="1"><summary>Answer</summary>

**A and C.** Bias that comes from skewed data gets fixed in the data (balance, curation) and measured with Clarify. Then add human audits.

**Why not B:** Guardrails filter content at inference. They don't fix a skewed training set, and fixing bias only at inference is a listed trap.

Topic: [AIF 11: Responsible AI principles and practices](../AIF-C01-AWS-Certified-AI-Practitioner/topics/11-responsible-ai-principles-and-practices.md)

</details>

### Question 7

A compliance Q&A app gives different answers to the same question and sometimes embellishes them. Which inference parameter change helps most?

- **A.** Lower the temperature
- **B.** Remove the stop sequences
- **C.** Raise Top K
- **D.** Raise the temperature

<details markdown="1"><summary>Answer</summary>

**A.** Lower temperature is more deterministic and focused. That's what you want for factual and compliance answers.

**Why not D:** Higher temperature means more random and more creative. That's the opposite of what compliance needs.

Topic: [AIF 07: FM application design, RAG and agents](../AIF-C01-AWS-Certified-AI-Practitioner/topics/07-fm-application-design-rag-agents.md)

</details>

### Question 8

Business analysts want to ask questions about company data in a chat-driven BI workspace. They don't write code. Which service?

- **A.** Kiro
- **B.** SageMaker JumpStart
- **C.** Amazon Bedrock
- **D.** Amazon Quick

<details markdown="1"><summary>Answer</summary>

**D.** Quick is the chat-driven BI and business GenAI workspace for business users.

**Why not C:** Bedrock is the builder API that app backends call. Analysts asking questions is the Quick persona.

Topic: [AIF 06: AWS GenAI infrastructure and services](../AIF-C01-AWS-Certified-AI-Practitioner/topics/06-aws-genai-infrastructure-and-services.md)

</details>

### Question 9

Policy says traffic to Amazon Bedrock must never cross the public internet. What do you use?

- **A.** Amazon Bedrock Guardrails
- **B.** AWS PrivateLink
- **C.** AWS Trusted Advisor
- **D.** Amazon Macie

<details markdown="1"><summary>Answer</summary>

**B.** PrivateLink gives private connectivity to Bedrock and other APIs with no public internet exposure.

**Why not A:** Guardrails filter content. They have nothing to say about network paths.

Topic: [AIF 13: Securing AI systems](../AIF-C01-AWS-Certified-AI-Practitioner/topics/13-securing-ai-systems.md)

</details>

### Question 10

You want a smaller, cheaper model that behaves like a large model, so high-volume inference costs less. Which technique?

- **A.** Distillation
- **B.** RAG
- **C.** Continued pre-training
- **D.** RLHF

<details markdown="1"><summary>Answer</summary>

**A.** Distillation trains a smaller "student" to mimic a larger "teacher". Cheaper, faster inference.

**Why not D:** RLHF aligns a model to human preferences using rankings. It doesn't shrink anything.

Topic: [AIF 09: FM training and fine-tuning](../AIF-C01-AWS-Certified-AI-Practitioner/topics/09-fm-training-and-fine-tuning.md)

</details>

### Question 11

You're scoring generated summaries against reference summaries and want a recall-oriented n-gram overlap metric. Which one?

- **A.** ROUGE
- **B.** F1 score
- **C.** BLEU
- **D.** BERTScore

<details markdown="1"><summary>Answer</summary>

**A.** ROUGE measures n-gram overlap with reference summaries, recall-oriented. It's the summarization metric.

**Why not C:** BLEU is precision-oriented n-gram overlap, the classic machine translation metric.

Topic: [AIF 10: FM evaluation methods and metrics](../AIF-C01-AWS-Certified-AI-Practitioner/topics/10-fm-evaluation-methods-and-metrics.md)

</details>

### Question 12

An employee uses a public GenAI chat website to brainstorm marketing slogans. Where does this sit on the Generative AI Security Scoping Matrix?

- **A.** Scope 3: pre-trained models
- **B.** Scope 4: fine-tuned models
- **C.** Scope 2: enterprise app
- **D.** Scope 1: consumer app

<details markdown="1"><summary>Answer</summary>

**D.** Public third-party GenAI with no model or data ownership is Scope 1. The concerns are mostly terms of service and what data gets shared.

**Why not B:** Scope 3 is your own app calling a third-party FM through an API (Bedrock + RAG, for example). Nobody built anything here.

Topic: [AIF 14: AI governance and compliance](../AIF-C01-AWS-Certified-AI-Practitioner/topics/14-ai-governance-and-compliance.md)

</details>

### Question 13

A model groups customers into segments from purchase history. Nobody labeled the data. What kind of learning is this?

- **A.** Supervised
- **B.** Unsupervised
- **C.** Transfer learning
- **D.** Reinforcement

<details markdown="1"><summary>Answer</summary>

**B.** No labels, and the goal is finding structure or groups. That's unsupervised learning (clustering).

**Why not A:** Supervised learning needs labeled data with a known target to predict.

Topic: [AIF 01: AI/ML terminology and concepts](../AIF-C01-AWS-Certified-AI-Practitioner/topics/01-ai-ml-terminology-and-concepts.md)

</details>

### Question 14

A model has to return output in one exact JSON shape, every time. Which prompting technique fits?

- **A.** Chain-of-thought prompting
- **B.** Few-shot prompting with examples of the target JSON
- **C.** Zero-shot prompting
- **D.** A higher Top P

<details markdown="1"><summary>Answer</summary>

**B.** Few-shot examples are the tool for format and style consistency.

**Why not A:** Chain-of-thought is for multi-step reasoning, not locking down an output format.

Topic: [AIF 08: Prompt engineering techniques](../AIF-C01-AWS-Certified-AI-Practitioner/topics/08-prompt-engineering-techniques.md)

</details>

### Question 15

A regulated lender has to document a model's intended uses, risk rating, and evaluation results for an audit. Which tool?

- **A.** Amazon Bedrock Prompt Management
- **B.** Amazon Bedrock Guardrails
- **C.** Amazon SageMaker Model Cards
- **D.** Amazon CloudWatch dashboards

<details markdown="1"><summary>Answer</summary>

**C.** Model Cards hold intended and not-intended uses, risk rating, training and eval metrics, and caveats in one exportable, versioned place.

**Why not B:** Guardrails enforce content filters at runtime. They don't document anything.

Topic: [AIF 12: Transparency and explainability](../AIF-C01-AWS-Certified-AI-Practitioner/topics/12-transparency-and-explainability.md)

</details>

### Question 16

An executive says the GenAI assistant is accurate "because it always sounds confident." What's the right response?

- **A.** Agreed. Confidence is a good proxy for accuracy.
- **B.** Hallucinations are fluent and false. Ground it with RAG and citations, and measure it with evals.
- **C.** Switch to the largest model and the problem goes away.
- **D.** Nondeterminism is the only issue. Set temperature to 0 and it's solved.

<details markdown="1"><summary>Answer</summary>

**B.** Confidence isn't accuracy. The fix is grounding, citations, Guardrails grounding checks, evals, and human review where it matters.

**Why not C:** Picking the biggest model while ignoring cost, latency, and grounding is a listed trap. Big models hallucinate too.

Topic: [AIF 05: GenAI capabilities, limitations, and selection](../AIF-C01-AWS-Certified-AI-Practitioner/topics/05-genai-capabilities-limitations-selection.md)

</details>

### Question 17

An attacker plants instructions inside a document that later gets retrieved into a RAG prompt. What is this?

- **A.** Model drift
- **B.** A jailbreak by the end user
- **C.** A data residency violation
- **D.** Prompt injection through retrieved content

<details markdown="1"><summary>Answer</summary>

**D.** Prompt injection is malicious instructions in user input *or* retrieved content. A poisoned document is the second kind.

**Why not B:** A jailbreak is the user directly tricking the model into ignoring its policy. Here the attack rode in on the data.

Topic: [AIF 13: Securing AI systems](../AIF-C01-AWS-Certified-AI-Practitioner/topics/13-securing-ai-systems.md)

</details>

### Question 18

A team needs to choose its own instance type, control networking, and host custom model artifacts. Which hosting method fits?

- **A.** Amazon Quick
- **B.** A self-hosted API on a SageMaker endpoint
- **C.** Bedrock on-demand managed API
- **D.** Kiro

<details markdown="1"><summary>Answer</summary>

**B.** A SageMaker endpoint gives control over instance, networking, and model artifacts. You size and pay for the capacity.

**Why not C:** Bedrock's managed API is the lowest-ops option, but you give up control over the infrastructure.

Topic: [AIF 03: AI/ML lifecycle and MLOps basics](../AIF-C01-AWS-Certified-AI-Practitioner/topics/03-ai-ml-lifecycle-and-mlops-basics.md)

</details>

### Question 19

A steady, high-volume Bedrock app has a strict latency SLA, and on-demand capacity is too variable. Which cost and performance lever fits?

- **A.** Provisioned throughput
- **B.** Move every call to a bigger model
- **C.** Switch the app to Amazon Quick
- **D.** Raise max tokens

<details markdown="1"><summary>Answer</summary>

**A.** Provisioned throughput reserves capacity for steady high volume or latency SLAs.

**Why not B:** A bigger model raises cost per token and latency. It doesn't buy you predictable capacity.

Topic: [AIF 06: AWS GenAI infrastructure and services](../AIF-C01-AWS-Certified-AI-Practitioner/topics/06-aws-genai-infrastructure-and-services.md)

</details>

### Question 20

A consumer chatbot must refuse to discuss competitor pricing and must mask customer PII. Which Guardrails features do that? **(Choose two.)**

- **A.** Sensitive information filters
- **B.** Contextual grounding checks
- **C.** Automated Reasoning checks
- **D.** Denied topics

<details markdown="1"><summary>Answer</summary>

**A and D.** Denied topics block application-specific subjects. Sensitive information filters block or mask PII.

**Why not B:** Contextual grounding checks catch hallucination against the source. They don't block topics or mask PII.

Topic: [AIF 11: Responsible AI principles and practices](../AIF-C01-AWS-Certified-AI-Practitioner/topics/11-responsible-ai-principles-and-practices.md)

</details>

---

**Score: __/20. Under 16? Redo the misses in 3 days.**

Log every miss: the topic, what I picked, and why it was wrong. Back to the [drills index](README.md).
