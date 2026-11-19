# 04 — Vector store solutions

**Exam map:** Domain 1 · Task **1.4** · Skills **1.4.1–1.4.5**

## What it is

Designing where embeddings and metadata live for FM augmentation: managed Knowledge Bases, OpenSearch neural/hybrid indexes, Aurora/RDS pgvector, DynamoDB vectors (+ OpenSearch zero-ETL), Neptune GraphRAG, S3 Vectors—plus metadata frameworks and incremental refresh.

## Why it matters for AIP-C01

Heavy Domain 1 weight. You must defend store choice by QPS, hybrid search need, SQL co-location, cost at scale, and operational ownership (managed KB vs customer-managed vector DB).

## Production implementation notes

- **Start with Bedrock Knowledge Bases** when you want managed chunking/embeddings/connectors; choose OpenSearch Serverless, OpenSearch managed, Aurora PostgreSQL, Neptune Analytics, or S3 Vectors as backing stores.
- **OpenSearch:** neural plugin / k-NN, hybrid BM25+vector, sharding and multi-index by domain. Best default for RAG at scale with lexical+semantic needs.
- **Aurora/RDS pgvector:** SQL + vectors together; HNSW/IVFFlat; good when transactional metadata joins matter.
- **DynamoDB native vectors:** sub-10ms operational RAG/agent memory when data already lives in DynamoDB; pair with OpenSearch zero-ETL if you need full-text/hybrid.
- **Metadata framework:** S3 object metadata, custom attributes (author, ACL, domain, timestamp), filterable fields for tenant isolation. Hierarchical KB organization for large corpora.
- **Freshness:** EventBridge/S3 notifications → incremental ingestion; scheduled sync for connectors; detect deletes/updates; avoid full reindex unless embedding model changes.

## AWS services

Amazon Bedrock Knowledge Bases, Amazon OpenSearch Service / Serverless, Amazon Aurora PostgreSQL (pgvector), Amazon RDS, Amazon DynamoDB, Amazon Neptune Analytics, Amazon S3 / S3 Vectors, Amazon EventBridge, AWS Lambda.

## Exam traps

- Picking DynamoDB vectors when the scenario needs hybrid keyword+semantic search without OpenSearch.
- Ignoring metadata filters for multi-tenant ACL (retrieval returns forbidden chunks).
- Full re-embed on every doc tweak instead of incremental sync.
- Hierarchical chunking with S3 Vectors without checking metadata size limits.

## Hands-on project ideas

1. KB on S3 docs with OpenSearch Serverless; add metadata filters for `department`.
2. Aurora pgvector index of product SKUs; join SQL inventory with similarity search.
3. Incremental pipeline: S3 ObjectCreated → Lambda → embed → upsert; ObjectRemoved → delete vector.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-data.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-create.html
- https://docs.aws.amazon.com/decision-guides/latest/decision-guides/vector-database-guide.html
- https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-an-aws-vector-database-for-rag-use-cases/vector-db-options.html
- https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL.Extensions.html
