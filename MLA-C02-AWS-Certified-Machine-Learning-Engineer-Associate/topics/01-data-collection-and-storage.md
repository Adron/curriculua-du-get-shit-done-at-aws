---
title: "01: Data collection and storage"
---

# 01: Data collection and storage

**Domain 1 (28%) · Task 1.1 · Skills 1.1.1-1.1.9**

This is the "where does the data live and how does it get there" topic. Batch vs stream ingest, which file format fits which access pattern, and how you land features and vectors so training jobs and GenAI retrieval can actually use them.

C02 takes the C01 storage skills and bolts on **vector databases**, **multimodal ingest** (text, image, audio), and **Feature Store** as first-class exam skills. That matters because bad storage or format choices don't fail loudly. They show up later as latency, cost, and lousy RAG quality, and by then you've forgotten it was a storage decision.

**My rule of thumb: S3 is the landing zone, Parquet is the format, and everything else needs a reason.**

## What to know

### Skills map

| Skill | What to be able to do |
|---|---|
| 1.1.1 | Extract from S3, EBS, EFS, RDS, DynamoDB, OpenSearch |
| 1.1.2 | Pick storage by cost, performance, structure, compliance |
| 1.1.3 | Debug capacity/scalability on ingest paths |
| 1.1.4 | Stream ingest with Kinesis, Flink, Kafka |
| 1.1.5 | Choose Parquet / JSON / CSV / ORC for access patterns |
| 1.1.6 | Merge sources (code, Glue, Spark) |
| 1.1.7 | Configure vector stores (OpenSearch, RDS pgvector, S3 vectors) |
| 1.1.8 | Ingest diverse modalities for AI/ML |
| 1.1.9 | Ingest into SageMaker Feature Store |

### Storage decision matrix

| Store | Best for | ML/AI note |
|---|---|---|
| **S3** | Lake/object store, training datasets, offline Feature Store | Default landing zone; Parquet for analytics/training |
| **EBS** | Block for single EC2/SageMaker host scratch | Not shared across instances |
| **EFS** | Shared POSIX for multi-instance training/jobs | Good when many workers need same files |
| **RDS** | Structured OLTP + **pgvector** for embeddings | Vector search with relational metadata |
| **DynamoDB** | Low-latency key-value feature lookups | Pair with online Feature Store patterns |
| **OpenSearch** | Full-text + **k-NN / vector** retrieval | Common Bedrock Knowledge Base backend |
| **S3 (vectors)** | Managed vector index patterns for Bedrock KB | Watch metadata size limits with chunk context |

### Formats

| Format | When to use |
|---|---|
| **Parquet** | Columnar analytics/training; Feature Store offline is Parquet |
| **ORC** | Similar columnar use in Hadoop/Hive ecosystems |
| **JSON / JSONL** | Semi-structured APIs, LLM fine-tune line records, OpenSearch ingest |
| **CSV** | Simple tabular; avoid for huge wide datasets (no compression/schema efficiency) |

### Streaming and Feature Store

- **Kinesis / MSK (Kafka) / Managed Flink**: near-real-time features into the online store or the lake.
- **Feature Store**: streaming via synchronous `PutRecord`; batch via the Spark connector or Processing jobs. The offline store is append-only Parquet on S3. The online store serves low-latency inference features.
- The exam loves this split: **"freshest features for inference" means online. "Point-in-time / historical for training" means offline.**

### Vector DB patterns (C02 hot topic)

1. Embed documents, then store vectors + metadata.
2. Embed the query, ANN/k-NN retrieve top-k, hand that to the model as RAG context.
3. Pick OpenSearch (hybrid text + vector), RDS pgvector (SQL + vectors), or S3/Bedrock-managed vector options based on latency, ops overhead, and filter needs.

## AWS services in play

S3, EBS, EFS, RDS (pgvector), DynamoDB, OpenSearch Service, Kinesis, Managed Service for Apache Flink, MSK/Kafka, Glue, SageMaker Feature Store, and Athena for querying offline features.

## Hands-on

1. Land a CSV, convert it to Parquet on S3, query it with Athena. This is step one of [B4](../../build.md#b4): the blog archive goes into S3 and comes out the other side as Parquet.
2. Create a Feature Group, batch-ingest with the Spark connector, then `PutRecord` a streaming update. Read from online and offline and feel the difference.
3. Index embeddings in OpenSearch (or a Bedrock KB backed by OpenSearch/S3 vectors) and run a similarity query.
4. Stream a Kinesis feed into S3 (Firehose) or through a Flink transform.

## Exam traps

- Using CSV for large training sets when Parquet is the expected answer.
- Confusing EBS (single attach) with EFS (shared NFS).
- Expecting the offline Feature Store to serve low-latency lookups. That's the **online** store.
- Ignoring vector **metadata size** limits, especially S3 vectors with rich chunk context.
- Treating DynamoDB as a full vector DB. The exam wants OpenSearch, pgvector, or S3 for vectors.

## Exam guide mapping

- **Domain 1 (28%) · Task 1.1 · Skills 1.1.1-1.1.9**: data collection and storage.

## Research links

- <https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/batch-ingestion-spark-connector-setup.html>
- <https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-vector-ingestion.html>
- <https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-intelligent-ingestion-s3.html>
- <https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-feature-processor-data-sources-sdk.html>
- <https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf>