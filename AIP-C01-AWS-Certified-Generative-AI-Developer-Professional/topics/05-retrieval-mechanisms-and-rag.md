---
title: "05: Retrieval mechanisms and RAG"
---

# 05: Retrieval mechanisms and RAG

**Domain 1 · Task 1.5 · Skills 1.5.1-1.5.6**

Everything between the user's query and the augmented prompt: chunking strategies, embedding model choice, vector and hybrid search, reranking, query expansion and decomposition, and standardized retrieval interfaces (function calling / MCP).

This is the core GenAI developer skill, and it's where most RAG apps quietly fall over. When an answer is wrong, my first suspect is retrieval, not the model. The exam punishes naive fixed chunking, mismatched embedding dimensions, semantic-only search when hybrid is required, and skipping rerankers or query rewriting.

## What to know

- **Chunking (Bedrock KB):** default (~300 tokens, sentence-aware), fixed-size + overlap, hierarchical (retrieve child, expand to parent), semantic chunking, or no chunking for pre-split docs. Tables and figures may return broader context, so watch metadata limits.
- **Embeddings:** Amazon Titan Text / Multimodal, Cohere Embed, etc. Match dimensionality to the vector index, batch with Lambda, and **never mix embedding models in one index** without a migration.
- **Search:** semantic plus **hybrid** (keyword + vector). Managed KBs use hybrid by default; custom KB configs differ. Use Aurora pgvector or OpenSearch depending on architecture.
- **Rerankers:** Bedrock reranker models or the managed KB reranker (`MANAGED` / `CUSTOM` / `NONE`). Custom embeddings can disable the managed reranker, so plan for it.
- **Query handling:** Bedrock query expansion, Lambda decomposition of multi-hop questions, Step Functions for transform pipelines.
- **MCP / function calling:** expose retrieval as tools so agents and apps share one access pattern. Validate parameters and enforce ACL in the tool layer.

## AWS services in play

Amazon Bedrock Knowledge Bases, Amazon Titan embeddings, Amazon Bedrock rerankers, Amazon OpenSearch Service, Amazon Aurora (pgvector), AWS Lambda, AWS Step Functions, MCP clients/servers (AgentCore Gateway).

## Hands-on

1. A/B default vs hierarchical chunking on the same corpus and measure faithfulness with a RAG eval. Same experiment as [B6](../../build.md#b6), now graded on answers instead of just recall.
2. Hybrid search + a custom reranker; log the top-k before and after reranking.
3. MCP retrieval server (Lambda) wrapping `Retrieve` with tenant metadata filters. This becomes the "search posts" tool in [B10](../../build.md#b10).

## Exam traps

- Changing the embedding model without reindexing.
- Expecting semantic-only on a fully managed KB. Hybrid is the managed default.
- Hierarchical chunking returning fewer results than the `numberOfResults` you asked for (parent collapse).
- Letting agents call vector search without metadata ACL filters.

## Exam guide mapping

- **Task 1.5**, Skills 1.5.1-1.5.6: implement retrieval mechanisms for FM augmentation.

## Research links

- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/kb-build-managed.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html>
- <https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/protocol-based-tools.html>