# 01 — Data collection and storage

**Domain 1 · Task 1.1** · Skills **1.1.1–1.1.9** · Weight contribution: Domain 1 = **28%**

## What it is

Choosing where ML/AI data lives, how it is ingested (batch vs stream), which file formats fit access patterns, and how to land features and vectors for training and GenAI retrieval.

## Why it matters for MLA-C02

C02 expands C01 storage skills with **vector databases**, **multimodal ingest** (text/image/audio), and **Feature Store** as first-class exam skills. Wrong storage or format choices show up as latency, cost, and RAG quality failures.

## Exam-relevant skills map

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

## Storage decision matrix

| Store | Best for | ML/AI note |
|---|---|---|
| **S3** | Lake/object store, training datasets, offline Feature Store | Default landing zone; Parquet for analytics/training |
| **EBS** | Block for single EC2/SageMaker host scratch | Not shared across instances |
| **EFS** | Shared POSIX for multi-instance training/jobs | Good when many workers need same files |
| **RDS** | Structured OLTP + **pgvector** for embeddings | Vector search with relational metadata |
| **DynamoDB** | Low-latency key-value feature lookups | Pair with online Feature Store patterns |
| **OpenSearch** | Full-text + **k-NN / vector** retrieval | Common Bedrock Knowledge Base backend |
| **S3 (vectors)** | Managed vector index patterns for Bedrock KB | Watch metadata size limits with chunk context |

## Formats

| Format | When to use |
|---|---|
| **Parquet** | Columnar analytics/training; Feature Store offline is Parquet |
| **ORC** | Similar columnar use in Hadoop/Hive ecosystems |
| **JSON / JSONL** | Semi-structured APIs, LLM fine-tune line records, OpenSearch ingest |
| **CSV** | Simple tabular; avoid for huge wide datasets (no compression/schema efficiency) |

## Streaming & Feature Store

- **Kinesis / MSK (Kafka) / Managed Flink**: near-real-time features into online store or lake.
- **Feature Store**: streaming via synchronous `PutRecord`; batch via Spark connector / Processing jobs; offline store append-only Parquet on S3; online store for low-latency inference features.
- Online vs offline: exam loves “freshest features for inference” vs “point-in-time / historical for training.”

## Vector DB patterns (C02 hot topic)

1. Embed documents → store vectors + metadata.
2. Query embedding → ANN/k-NN retrieve top-k → RAG context.
3. Choose OpenSearch (hybrid text+vector), RDS pgvector (SQL + vectors), or S3/Bedrock-managed vector options per latency, ops, and filter needs.

## AWS services to know

S3, EBS, EFS, RDS (pgvector), DynamoDB, OpenSearch Service, Kinesis, Managed Service for Apache Flink, MSK/Kafka, Glue, SageMaker Feature Store, Athena (query offline features).

## Hands-on practice

1. Land a CSV → convert to Parquet on S3; query with Athena.
2. Create a Feature Group; batch-ingest with Spark connector; `PutRecord` a streaming update; contrast online vs offline reads.
3. Index embeddings in OpenSearch (or Bedrock KB with OpenSearch/S3 vectors) and run a similarity query.
4. Stream a Kinesis feed into S3 (Firehose) or a Flink transform.

## Common traps

- Using CSV for large training sets when Parquet is expected.
- Confusing EBS (single attach) with EFS (shared NFS).
- Expecting offline Feature Store to be low-latency serving — that’s the **online** store.
- Ignoring vector **metadata size** limits (esp. S3 vector + rich chunk context).
- Treating DynamoDB as a full vector DB — exam wants OpenSearch/pgvector/S3 for vectors.

## Research links

- https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/batch-ingestion-spark-connector-setup.html
- https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-vector-ingestion.html
- https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-intelligent-ingestion-s3.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-feature-processor-data-sources-sdk.html
- https://docs.aws.amazon.com/pdfs/aws-certification/latest/machine-learning-engineer-associate-02/machine-learning-engineer-associate-02.pdf
