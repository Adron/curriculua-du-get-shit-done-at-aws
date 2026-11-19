---
title: "04: Vector store solutions"
---

# 04: Vector store solutions

**Domain 1 · Task 1.4 · Skills 1.4.1-1.4.5**

Where do the embeddings and metadata live? Options: managed Knowledge Bases, OpenSearch neural/hybrid indexes, Aurora/RDS pgvector, DynamoDB vectors (plus OpenSearch zero-ETL), Neptune GraphRAG, and S3 Vectors. On top of that you need a metadata framework and an incremental refresh story.

This carries real Domain 1 weight. You have to defend the store you pick by QPS, whether you need hybrid search, whether SQL co-location matters, cost at scale, and who owns operations (managed KB vs customer-managed vector DB). I've spent a lot of years around databases, and the rule hasn't changed: **pick the store for the queries you'll actually run, not the one with the best marketing.**

## What to know

- **Start with Bedrock Knowledge Bases** when you want managed chunking, embeddings, and connectors. Back it with OpenSearch Serverless, OpenSearch managed, Aurora PostgreSQL, Neptune Analytics, or S3 Vectors.
- **OpenSearch:** neural plugin / k-NN, hybrid BM25 + vector, sharding and multi-index by domain. The best default for RAG at scale when you need lexical *and* semantic.
- **Aurora/RDS pgvector:** SQL and vectors together; HNSW/IVFFlat. Good when joins against transactional metadata matter.
- **DynamoDB native vectors:** sub-10ms operational RAG or agent memory when the data already lives in DynamoDB. Pair with OpenSearch zero-ETL if you need full-text or hybrid.
- **Metadata framework:** S3 object metadata, custom attributes (author, ACL, domain, timestamp), filterable fields for tenant isolation. Hierarchical KB organization for large corpora.
- **Freshness:** EventBridge/S3 notifications into incremental ingestion; scheduled sync for connectors; detect deletes and updates. Avoid a full reindex unless the embedding model changes.

## AWS services in play

Amazon Bedrock Knowledge Bases, Amazon OpenSearch Service / Serverless, Amazon Aurora PostgreSQL (pgvector), Amazon RDS, Amazon DynamoDB, Amazon Neptune Analytics, Amazon S3 / S3 Vectors, Amazon EventBridge, AWS Lambda.

## Hands-on

1. KB on S3 docs with OpenSearch Serverless, plus metadata filters for `department`. (For Ask Composite Code, filter on category and year. That's [B6](../../build.md#b6) carried forward into production.)
2. Aurora pgvector index of product SKUs; join SQL inventory with similarity search.
3. Incremental pipeline: S3 ObjectCreated to Lambda to embed to upsert; ObjectRemoved deletes the vector.

## Exam traps

- Picking DynamoDB vectors when the scenario needs hybrid keyword + semantic search without OpenSearch.
- Ignoring metadata filters for multi-tenant ACL. Retrieval happily returns chunks the user should never see.
- Full re-embed on every doc tweak instead of incremental sync.
- Hierarchical chunking with S3 Vectors without checking metadata size limits.

## Exam guide mapping

- **Task 1.4**, Skills 1.4.1-1.4.5: design and implement vector store solutions.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-data.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-create.html>
- <https://docs.aws.amazon.com/decision-guides/latest/decision-guides/vector-database-guide.html>
- <https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-an-aws-vector-database-for-rag-use-cases/vector-db-options.html>
- <https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html>
- <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL.Extensions.html>