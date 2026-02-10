# ADR-0001: System Prompt Over RAG for School Knowledge Base

**Date**: 2026-02-10
**Status**: Accepted
**Context**: Deciding how the chatbot accesses school-specific information

## Decision

Use a **system prompt** containing the full school knowledge base rather than RAG (Retrieval Augmented Generation) with vector embeddings.

## Rationale

- A school's FAQ, fee structure, admission process, and facilities fit comfortably within ~2,000 words — well under any LLM's context window
- System prompt approach requires zero additional infrastructure (no vector DB, no embedding pipeline)
- Every query gets the full context — no risk of missing relevant information due to poor retrieval
- Simpler to update: school admin changes a text block, not a vector store
- RAG adds latency (embedding + search + retrieval) for no benefit at this data size
- Cost difference is negligible at this token count

## Consequences

- If a school has 50+ pages of detailed policies, may need to upgrade to RAG
- System prompt must be maintained manually (no auto-ingestion from school website)
- Token cost per query is slightly higher than RAG (sending full context every time)

## When to Revisit

- If school data exceeds ~5,000 words
- If multiple schools share the same deployment and per-school context needs isolation
- If we add document upload (prospectus PDFs, etc.)
