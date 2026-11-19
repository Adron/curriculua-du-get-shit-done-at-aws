---
title: "The Build: Ask Composite Code"
---

# The Build: Ask Composite Code

Reading about RAG doesn't stick. Building one does. So instead of a pile of disconnected lab exercises, I'm running one project through all three certs and growing it as I go.

**The project:** a question-answering assistant, and eventually an agent, over my own blog. [Composite Code](https://compositecode.blog) has 15+ years of posts about databases, distributed systems, AWS, Go, JavaScript, bikes, transit, and a lot of other stuff I've forgotten I wrote. It's a solid corpus for this:

- **It's real data I own.** No licensing questions, and I can dump the whole thing into S3 without a second thought.
- **It's messy in useful ways.** WordPress export cruft, front matter, dead links, code blocks, posts that contradict posts from 2011. That's exactly the kind of mess real ingestion pipelines deal with.
- **It already has labels.** Every post has categories and tags. That gives me a supervised ML problem (predict the category from the text) sitting right next to the GenAI problem.
- **I can tell when it's wrong.** I wrote the source material, so I'll know when it hallucinates something I never said. That makes eval work honest.

Each milestone below maps to topics in the study packs. The topic notes link back here from their **Hands-on** sections, so you can jump either way.

```
 AIF-C01           MLA-C02                         AIP-C01
 ───────           ───────                         ───────
 B1 playground     B4 ingest pipeline              B9  production RAG API
 B2 first KB  ───▶ B5 tag classifier         ───▶  B10 the agent
 B3 guardrail      B6 retrieval lab                B11 safety + governance
                   B7 ship it (CI/CD)              B12 evals + ops
                   B8 monitor + lock down
```

**Ground rules for the build:**

1. **Everything in IaC from B4 on.** CDK or Terraform, take your pick. Click-ops is fine for poking around in AIF, not after.
2. **Tear it down.** OpenSearch Serverless, endpoints, and provisioned throughput all bill by the hour whether you're using them or not. Destroy the stack when you're done for the day.
3. **Write it up.** Each milestone gets a short write-up (what I built, what broke, what it cost). Those become blog posts, and writing them is the best retrieval practice there is.
4. **Keep a golden question set from day one.** Twenty-ish questions I know the answers to, with the posts that answer them. It starts as a gut check in B2 and turns into a real eval suite by B12.

---

## AIF-C01: get the shape of it

Light touch. Console and playground only. The point is to understand the moving parts well enough to answer *what / why / which service* questions.

<a id="b1"></a>
### B1: Playground

Open the Bedrock playground. Ask three or four models the same handful of questions about topics I've blogged on. Then change the temperature and ask again. Notice which ones make things up about "Adron Hall" with total confidence. (Spoiler: most of them.)

- **Exercises:** [AIF 04](AIF-C01-AWS-Certified-AI-Practitioner/topics/04-genai-foundational-concepts.md), [AIF 05](AIF-C01-AWS-Certified-AI-Practitioner/topics/05-genai-capabilities-limitations-selection.md), [AIF 07](AIF-C01-AWS-Certified-AI-Practitioner/topics/07-fm-application-design-rag-agents.md), [AIF 08](AIF-C01-AWS-Certified-AI-Practitioner/topics/08-prompt-engineering-techniques.md)
- **Done when:** I can explain why temperature 0.9 made it worse at facts, and why none of them knew anything about my posts.

<a id="b2"></a>
### B2: First Knowledge Base

Drop ~20 posts into an S3 bucket and point a Bedrock Knowledge Base at it. Ask the same questions from B1. Look at the citations. Then ask something the 20 posts *don't* cover and see what happens.

- **Exercises:** [AIF 04](AIF-C01-AWS-Certified-AI-Practitioner/topics/04-genai-foundational-concepts.md) (chunking, embeddings), [AIF 06](AIF-C01-AWS-Certified-AI-Practitioner/topics/06-aws-genai-infrastructure-and-services.md), [AIF 07](AIF-C01-AWS-Certified-AI-Practitioner/topics/07-fm-application-design-rag-agents.md), [AIF 10](AIF-C01-AWS-Certified-AI-Practitioner/topics/10-fm-evaluation-methods-and-metrics.md)
- **Done when:** the golden question set v0 exists, and I can draw the RAG loop from memory.

<a id="b3"></a>
### B3: First Guardrail

Put a Bedrock Guardrail in front of the B2 setup: a denied topic or two, the PII filter, and contextual grounding. Then try to break it. Prompt injection, "ignore previous instructions", a post with hostile instructions planted in it.

- **Exercises:** [AIF 11](AIF-C01-AWS-Certified-AI-Practitioner/topics/11-responsible-ai-principles-and-practices.md), [AIF 13](AIF-C01-AWS-Certified-AI-Practitioner/topics/13-securing-ai-systems.md), [AIF 14](AIF-C01-AWS-Certified-AI-Practitioner/topics/14-ai-governance-and-compliance.md)
- **Done when:** I know what the guardrail caught, what it missed, and why the planted-post attack is the scary one.

---

## MLA-C02: build the pipes

Now it gets real. The whole archive, real pipelines, a real model, deployed and watched. All IaC.

<a id="b4"></a>
### B4: Ingest pipeline

Full archive (the Jekyll markdown from the blog repo) lands in S3. A Glue job strips the front matter into columns (title, date, categories, tags), cleans the body, and writes Parquet. Glue Data Quality rules catch the junk: empty bodies, missing dates, posts that are just an embed.

- **Exercises:** [MLA 01](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/01-data-collection-and-storage.md), [MLA 02](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/02-data-transformation-feature-engineering.md), [MLA 03](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/03-data-quality-validation-and-bias.md)
- **Done when:** one Parquet dataset, a DQ ruleset with a pass rate I can explain, and the pipeline re-runs cleanly when a new post shows up.

<a id="b5"></a>
### B5: Tag classifier

Classic supervised ML. Predict a post's primary category from its text. The labels already exist, and they're imbalanced in an interesting way (I wrote a *lot* about some things). SageMaker script mode, then Automatic Model Tuning against a baseline.

- **Exercises:** [MLA 03](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/03-data-quality-validation-and-bias.md) (class imbalance), [MLA 04](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/04-modeling-approach-selection.md), [MLA 05](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/05-train-fine-tune-customize-models.md), [MLA 06](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/06-model-and-system-evaluation.md)
- **Done when:** the tuned model beats the baseline on a held-out split, and I can say whether a Bedrock zero-shot classifier would've just been better. (It might. That's a legit exam question too.)

<a id="b6"></a>
### B6: Retrieval lab

Rebuild the knowledge base properly on the full archive with OpenSearch Serverless. Try a few chunking strategies and two embedding models. Measure recall@k against the golden question set, not vibes.

- **Exercises:** [MLA 02](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/02-data-transformation-feature-engineering.md), [MLA 05](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/05-train-fine-tune-customize-models.md), [MLA 06](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/06-model-and-system-evaluation.md), [MLA 08](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/08-resource-provisioning-and-configuration.md)
- **Done when:** a small results table, chunking x embedding model x recall@5, and a decision I can defend.

<a id="b7"></a>
### B7: Ship it

Deploy the B5 classifier to an endpoint (serverless first; real-time if latency says so). Wrap training, evaluation, and registration in SageMaker Pipelines with Model Registry approval. CI/CD so a merged change retrains and redeploys, and a bad model rolls back.

- **Exercises:** [MLA 07](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/07-deployment-infrastructure.md), [MLA 08](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/08-resource-provisioning-and-configuration.md), [MLA 09](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/09-cicd-orchestration-mlops.md)
- **Done when:** `git push` to a deployed, versioned model, and I've watched a rollback actually happen.

<a id="b8"></a>
### B8: Watch it and lock it down

Model Monitor and CloudWatch on the endpoint and the KB. Then a security pass: least-privilege IAM for every role, VPC endpoints so nothing hits the public internet, KMS on the buckets and the vector store, secrets out of code.

- **Exercises:** [MLA 10](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/10-monitoring-inference-and-performance.md), [MLA 11](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/11-cost-and-performance-optimization.md), [MLA 12](MLA-C02-AWS-Certified-Machine-Learning-Engineer-Associate/topics/12-securing-ml-ai-workloads.md)
- **Done when:** one dashboard, one alarm that's actually fired, an IAM policy I'm not embarrassed by, and a cost number for the month.

---

## AIP-C01: make it production

This is the part that matters. Same corpus, now shaped like something I'd hand to a client: an API, an agent, safety controls, evals, and an ops story. Every decision gets a short ADR (constraints, options, choice, failure modes, cost).

<a id="b9"></a>
### B9: Production RAG API

API Gateway + Lambda with streaming responses, the Bedrock Converse API underneath, the B6 knowledge base for retrieval. Prompts live in Bedrock Prompt Management with versions, not in string literals.

- **Exercises:** [AIP 01](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/01-genai-solution-design-and-requirements.md) through [AIP 06](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/06-prompt-engineering-and-governance.md), [AIP 10](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/10-fm-api-integrations.md), [AIP 11](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/11-application-integration-patterns.md)
- **Done when:** `curl` streams a cited answer, and I can swap the model or the prompt version without a code deploy.

<a id="b10"></a>
### B10: The agent

A Strands agent running on AgentCore Runtime, with tools exposed through AgentCore Gateway as MCP: search posts (the B9 retrieval), tag a draft (the B5 endpoint), and look up my GitHub repos. Anything that *writes* (opening an issue, drafting a post) waits for a human to approve it. Hard stop on tool-call count.

- **Exercises:** [AIP 07](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/07-agentic-ai-and-tool-integrations.md), [AIP 08](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/08-model-deployment-strategies.md), [AIP 09](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/09-enterprise-integration-architectures.md)
- **Done when:** "find my posts about Cassandra, and the repo that goes with the 2015 one" works end to end, and the approval step actually blocks.

<a id="b11"></a>
### B11: Safety and governance

Guardrails on the API and the agent, contextual grounding thresholds tuned against the golden set, PII handling, invocation logging that doesn't log anything it shouldn't. A model card that says what this thing is for and what it isn't.

- **Exercises:** [AIP 12](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/12-input-output-safety-controls.md) through [AIP 15](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/15-responsible-ai-principles.md)
- **Done when:** the B3 attacks all fail against the production stack, and I can show the audit trail for any answer.

<a id="b12"></a>
### B12: Evals and ops

The golden question set becomes a real eval suite: LLM-as-judge plus retrieval metrics, run in CI, gating prompt and model changes. Cost and latency dashboard. Prompt caching and model routing (cheap model first, escalate when needed). A troubleshooting runbook written from the things that actually broke along the way.

- **Exercises:** [AIP 16](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/16-cost-optimization-and-resource-efficiency.md) through [AIP 20](AIP-C01-AWS-Certified-Generative-AI-Developer-Professional/topics/20-troubleshooting-genai-applications.md)
- **Done when:** a prompt change that makes answers worse gets blocked by CI, and I know what a thousand questions cost.

---

## Build log

| Milestone | Status | Write-up |
|---|---|---|
| B1 Playground | not started | |
| B2 First Knowledge Base | not started | |
| B3 First Guardrail | not started | |
| B4 Ingest pipeline | not started | |
| B5 Tag classifier | not started | |
| B6 Retrieval lab | not started | |
| B7 Ship it | not started | |
| B8 Watch it and lock it down | not started | |
| B9 Production RAG API | not started | |
| B10 The agent | not started | |
| B11 Safety and governance | not started | |
| B12 Evals and ops | not started | |

Back to the [curriculum home](index.md).
