# 05 — Retrieval mechanisms and RAG

**Exam map:** Domain 1 · Task **1.5** · Skills **1.5.1–1.5.6**

## What it is

Everything between user query and augmented prompt: chunking strategies, embedding model choice, vector/hybrid search, reranking, query expansion/decomposition, and standardized retrieval interfaces (function calling / MCP).

## Why it matters for AIP-C01

Core GenAI developer skill. Exam scenarios punish naive fixed chunking, wrong embedding dims, semantic-only when hybrid is required, and missing rerankers/query rewriting.

## Production implementation notes

- **Chunking (Bedrock KB):** default (~300 tokens, sentence-aware), fixed-size + overlap, hierarchical (child retrieve → parent expand), semantic chunking, or no-chunk for pre-split docs. Tables/figures may return broader context—watch metadata limits.
- **Embeddings:** Amazon Titan Text / Multimodal, Cohere Embed, etc. Match dimensionality to the vector index; batch with Lambda; never mix embedding models in one index without migration.
- **Search:** semantic + **hybrid** (keyword+vector). Managed KBs use hybrid by default; custom KB configs differ. Use Aurora pgvector or OpenSearch per architecture.
- **Rerankers:** Bedrock reranker models or managed KB reranker (`MANAGED` / `CUSTOM` / `NONE`). Custom embeddings can disable managed reranker—plan accordingly.
- **Query handling:** Bedrock query expansion; Lambda decomposition of multi-hop questions; Step Functions for transform pipelines.
- **MCP / function calling:** expose retrieval as tools so agents and apps share one access pattern; validate parameters and enforce ACL in the tool layer.

## AWS services

Amazon Bedrock Knowledge Bases, Amazon Titan embeddings, Amazon Bedrock rerankers, Amazon OpenSearch Service, Amazon Aurora (pgvector), AWS Lambda, AWS Step Functions, MCP clients/servers (AgentCore Gateway).

## Exam traps

- Changing embedding model without reindexing.
- Expecting semantic-only on fully managed KB (hybrid is the managed default).
- Hierarchical chunking returning fewer results than `numberOfResults` requested (parent collapse).
- Letting agents call vector search without metadata ACL filters.

## Hands-on project ideas

1. A/B default vs hierarchical chunking on the same corpus; measure faithfulness via RAG eval.
2. Hybrid + custom reranker; log pre/post-rerank top-k.
3. MCP retrieval server (Lambda) wrapping `Retrieve` with tenant metadata filters.

## Research links

- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-build-managed.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html
- https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/protocol-based-tools.html
