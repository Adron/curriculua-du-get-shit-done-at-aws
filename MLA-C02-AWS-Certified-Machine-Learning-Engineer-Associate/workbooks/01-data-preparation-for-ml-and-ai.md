---
layout: default
title: "Workbook 01: Data preparation for ML and AI"
---

# Workbook 01: Data preparation for ML and AI

**Domain 1 (28%)** · Topics [01](../topics/01-data-collection-and-storage.md) · [02](../topics/02-data-transformation-feature-engineering.md) · [03](../topics/03-data-quality-validation-and-bias.md)

Builder focus: **ingest → transform → validate**, as a pipeline you could actually express in Glue jobs, Feature Store ingest, and Bedrock Knowledge Base sync. Not a pile of one-off console clicks.

Domain 1 is the heaviest chunk of the exam at 28%, and it's where most real ML work lives anyway. For me this whole workbook is [B4](../../build.md#b4): getting fifteen years of blog posts into a shape I can trust.

---

## 1. Learning objectives

By the end of this workbook you can:

- [ ] Choose storage (S3, EBS, EFS, RDS/pgvector, DynamoDB, OpenSearch) and formats (Parquet/JSON/CSV/ORC) for ML and RAG workloads
- [ ] Design Feature Store online vs offline ingest paths and streaming vs batch landings
- [ ] Select Glue / DataBrew / EMR / Data Wrangler for transforms; design RAG chunking + embeddings prep
- [ ] Apply Glue Data Quality / bias / imbalance gates before training or FM customization
- [ ] Defend pipeline + IaC choices under cost, latency, and compliance constraints

## 2. Prerequisites + time

| Item | Detail |
|---|---|
| Prerequisites | Read topics 01-03; basic S3 + IAM; optional AWS account |
| Estimated time | **6-8 hours** (split across weeks 1-2) |
| Materials | Topic notes, this workbook, optional Glue/SageMaker/Bedrock console or CLI |

## 3. Activate prior knowledge

Answer in 1-2 sentences each. No notes, no peeking:

1. Why might Parquet beat CSV for a wide training table on S3?
2. When would you pick **online** Feature Store over the offline Parquet store?
3. Name one reason RAG chunking strategy matters as much as the embedding model.

## 4. Concept refresh

Skim them. Do **not** paste the topic notes in here. Follow the links, then close them before §5.

| Topic | Refresh focus |
|---|---|
| [01: Collection & storage](../topics/01-data-collection-and-storage.md) | Storage matrix; Kinesis/Flink/Kafka; vector DBs; Feature Store ingest |
| [02: Transform & FE](../topics/02-data-transformation-feature-engineering.md) | Glue/EMR/Wrangler; embeddings; RAG chunking; PII; fine-tune data prep |
| [03: Quality, bias](../topics/03-data-quality-validation-and-bias.md) | Glue DQ; Clarify-style bias; imbalance; AI training integrity |

**C02 GenAI callouts:** vector stores (OpenSearch / pgvector / S3 vectors), embedding models, Bedrock KB chunking + metadata, anonymization for FM corpora, prompt-response pair validation.

## 5. Closed-book retrieval practice

Cover §12. Write the answers from memory. Getting it wrong here is the point; that's what makes it stick.

**R1.** Map each need to a store: (a) shared POSIX for multi-worker training scratch, (b) low-latency key-value features, (c) hybrid text + k-NN for RAG, (d) lake landing for Athena + offline Feature Store.

**R2.** Online Feature Store updates via `PutRecord` vs batch Spark connector: which for near-real-time inference features? Which for historical point-in-time training?

**R3.** List three transform tools and one strength each (Glue, DataBrew, EMR, Data Wrangler).

**R4.** Fixed-size vs semantic vs hierarchical chunking: one exam cue for each.

**R5.** Name two pre-training bias ideas (e.g., CI, DPL) and one imbalance mitigation that works for text as well as tabular.

**R6.** What does “AI training data integrity” add beyond classic DQ (C02)?

## 6. Worked → guided → independent practice

### Worked example: fraud features + RAG corpus (same product)

**Scenario:** You need (1) tabular fraud features for XGBoost and (2) a support-doc RAG index for a Bedrock agent.

**Worked solution (pipeline mindset):**

```text
Raw: S3 landing (JSONL events + PDF/HTML docs)
  → Glue ETL: events → Parquet partitions; docs → text extract + PII redact
  → Feature Store: offline Parquet for train; online PutRecord for live risk scores
  → Glue Data Quality: completeness, uniqueness, schema; fail → quarantine
  → Bedrock KB: semantic chunking + metadata (product, locale); OpenSearch vectors
  → IaC: Glue jobs + Feature Group + KB sync via CFN/CDK + EventBridge schedule
```

Tradeoffs called out: Parquet for analytics train; OpenSearch for hybrid retrieve; redact before embed so PII never enters the vector index.

### Guided practice

Fill the blanks:

1. Multi-instance training needs the same file tree → prefer ______ over EBS.
2. DynamoDB is great for ______ lookups but is **not** the exam’s primary ______ store.
3. Train/serve skew is reduced when inference reads the same transforms via ______.
4. Before fine-tune JSONL lands in Bedrock/SageMaker, validate ______-______ pairs and run content safety screening.

### Independent practice

Design a **one-page pipeline** (bullet IaC resources) for: nightly CSV drops from external vendors → cleaned training set + daily KB refresh for product FAQ. Include DQ gate, format choice, vector backend, and rollback if DQ fails.

## 7. Scenario / decision exercises

**S1.** Spiky clickstream must update online features within seconds for a real-time SageMaker endpoint. Batch Glue nightly is too slow. What ingest path do you propose?

**S2.** Legal requires no raw PII in the RAG index. Docs in S3 contain emails and account IDs. Where in the pipeline do you redact, and which tools are plausible?

**S3.** Class positive rate for “churn” is 2%. Stakeholders want F1 on the minority class. What data steps before modeling?

**S4.** Team wants “just dump everything as CSV into OpenSearch for RAG.” What’s wrong, and what do you recommend instead?

**S5.** Offline Feature Store query is slow for live scoring. Engineer proposes reading offline Parquet from the endpoint. Defend or reject.

## 8. Hands-on labs

### Lab A: SageMaker / Glue path (preferred)

My version: the blog archive markdown is the "small CSV", Glue strips the front matter, and the DQ rules are things like "every post has a date and a category" ([B4](../../build.md#b4)).

- [ ] Land a small CSV on S3; convert to Parquet (Glue job or Wrangler); query with Athena
- [ ] Create a Feature Group; batch ingest; `PutRecord` one update; contrast online vs offline read
- [ ] Add a Glue Data Quality ruleset (completeness + uniqueness); intentionally fail one rule

### Lab B: Bedrock / RAG path

Chunk the archive and look at what comes back. This is the start of [B6](../../build.md#b6).

- [ ] Create or use a Knowledge Base over S3 docs; note chunking strategy and vector store
- [ ] Run `Retrieve` / `RetrieveAndGenerate`; inspect chunk metadata
- [ ] Change chunking or metadata filters; observe answer grounding change

### Lab C: Paper architecture fallback (no account)

- [ ] Draw the fraud + RAG dual pipeline from the worked example as a diagram
- [ ] List CFN/CDK resource types you would create (S3, Glue Job, Feature Group, OpenSearch/KB, IAM roles)
- [ ] Write a DQ fail path: EventBridge → SNS → skip train/KB sync

## 9. Misconceptions / traps

- [ ] CSV for huge wide training sets (prefer Parquet/ORC)
- [ ] EBS mistaken for shared storage (need EFS or S3)
- [ ] Offline Feature Store treated as low-latency serving
- [ ] DynamoDB as full vector DB (prefer OpenSearch / pgvector / S3 vectors)
- [ ] Ignoring metadata size limits on vector chunks
- [ ] Embedding PII without redaction
- [ ] Fixing imbalance only with accuracy (misleading on rare classes)
- [ ] Skipping prompt-response validation for FM fine-tune sets

## 10. Reflection

1. Which Domain 1 decision still feels fuzzy (storage vs transform vs DQ)?
2. Where would you insist on IaC first in your next real pipeline?
3. What GenAI data prep skill (chunking, embeddings, integrity) needs another lab?

## 11. Mastery checklist

- [ ] Storage/format decisions are automatic for lake, stream, feature, and vector paths
- [ ] Can explain online vs offline Feature Store with an ingest method each
- [ ] Can pick Glue vs EMR vs Wrangler vs DataBrew for a stated constraint
- [ ] Can design RAG chunking + metadata + PII handling
- [ ] Can place Glue DQ / bias / imbalance gates in a pipeline
- [ ] Punch list Domain 1 items marked after hands-on or paper lab

## 12. Answer key

**Activate**

1. Columnar compression + predicate pushdown / schema efficiency for analytics and training reads.  
2. Online: low-latency inference features; offline: historical / point-in-time training.  
3. Chunk boundaries control retrieval precision/recall and context window waste.

**Retrieval**

**R1.** (a) EFS (b) DynamoDB / online Feature Store patterns (c) OpenSearch (d) S3 + Parquet.  
**R2.** `PutRecord` / streaming → online near-real-time; Spark/batch → offline historical.  
**R3.** Glue = serverless Spark ETL/catalog; DataBrew = visual recipes; EMR = heavy custom Spark; Wrangler = interactive FE → Processing/Feature Store.  
**R4.** Fixed-size = simple/token windows; semantic = meaning-aware splits; hierarchical = child hit → parent context.  
**R5.** CI / DPL (or KL/JSD/TVD); stratified split, augment, resample, reweight, collect minority data.  
**R6.** Validate prompt-response pairs, empty/truncated targets, content safety screening for GenAI corpora.

**Guided**

1. EFS  
2. key-value feature; vector  
3. Feature Store (shared transform definitions / online features)  
4. prompt-response

**Scenarios**

**S1.** Kinesis/MSK → Flink/Lambda/Spark streaming → Feature Store `PutRecord` (or sync path) → online store for endpoint.  
**S2.** Redact in Glue/Wrangler/Comprehend-PII **before** embedding/KB sync; never embed raw objects.  
**S3.** Stratify splits; oversample/augment minority or class weights; track minority recall/F1 not raw accuracy.  
**S4.** CSV+OpenSearch skips embeddings, chunking, schema, and cost control: use Parquet lake + embed + KB/OpenSearch k-NN with metadata.  
**S5.** Reject for live scoring: use **online** store; offline is for training/analytics.

**Independent (rubric):** Nightly vendor CSV → S3 → Glue to Parquet → DQ gate → train Feature Store offline; FAQ docs → redact → KB sync EventBridge; on DQ fail, SNS + skip downstream; IaC for jobs, roles, Feature Group, KB.
