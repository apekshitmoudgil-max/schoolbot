# Session: SchoolBot Initial Build

**Date**: 2026-02-10
**Duration**: ~1 session
**Phase**: Discovery + MVP Build

## Problem Addressed

Friend's contact is looking for a chatbot for schools in India. Need a production-grade working demo to secure first-mover advantage. Must impress enough that the school commits.

## What Was Done

### 1. Deep Market Research (4 parallel sub-agents)
- **Market analysis**: Competitors (ConveGenius, SparkleBot, ChatOnDesk), pricing models (INR 2K-15K/month), WhatsApp-first channel preference, private school market gap
- **Regulatory**: DPDPA 2023 (under-18 = child, parental consent required), WhatsApp Jan 2026 ban on general-purpose bots, POCSO mandatory reporting, data localization
- **Tech stack for indie builders**: BSP options (AiSensy, Gupshup), LLM costs (Gemini Flash ~$12/50K msgs), total MVP cost under $25/month
- **Risks**: 6-18 month sales cycle, 3-Year Fizzle pattern, support burden, AllHere $6M collapse case study

### 2. Architecture Decision: Website Chatbot First
- User challenged WhatsApp-first assumption
- Analysis showed website chatbot is better v1: no platform dependency, no per-message costs, admission funnel is the #1 use case, parents ARE on the website during admission research
- WhatsApp = Phase 2 for push notifications to existing parents

### 3. MVP Built from Scratch
- **Stack**: Next.js 15 + Tailwind CSS v4 + Claude Haiku 4.5 (streaming SSE)
- **3 parallel sub-agents**: Landing page, chat widget, backend API
- **Build succeeded**: Zero errors, zero warnings
- **Live tested**: Chat widget works, streaming responses, multi-turn context, lead capture triggers after 3+ messages

### 4. Bug Fixes
- Raw markdown (`**bold**`) showing as text — added markdown renderer
- Text overflow on long emails/URLs — added word-break CSS
- Responses too long — updated system prompt for brevity + reduced max_tokens to 300

## Files Created

### Project Config
- `package.json` — Next.js 15, Anthropic SDK, Lucide React, Tailwind v4
- `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`
- `.env.local` — Anthropic API key (shared from ContentVault)
- `.gitignore`

### Source Files
- `src/app/layout.tsx` — Root layout, Crimson Pro + Plus Jakarta Sans fonts
- `src/app/page.tsx` — Full landing page (10 sections, 600+ lines)
- `src/app/globals.css` — Tailwind v4 theme, custom animations
- `src/components/chat-widget.tsx` — Chat widget with streaming SSE, localStorage history, markdown renderer (~530 lines)
- `src/app/api/chat/route.ts` — Streaming API route calling Claude Haiku
- `src/lib/school-data.ts` — Comprehensive school knowledge base (~211 lines)

### Discovery Docs (in main ClaudeWorkbook)
- `docs/discovery/2026-02-10-india-school-chatbot-market-research.md`
- `docs/discovery/2026-02-10-india-school-chatbot-regulatory-landscape.md`
- `docs/discovery/2026-02-10-school-chatbot-analysis.md`

## Test Results

- **Build**: Clean — zero errors, zero warnings
- **Landing page**: All 10 sections render correctly (hero, stats, programs, features, testimonials, CTA, footer, chat)
- **Chat widget**: Opens/closes, welcome message + quick action chips work
- **Fee Structure query**: Responded with correct fees, conversational tone, ends with follow-up question
- **Multi-turn**: Correctly references previous context ("your daughter", grade interest)
- **Lead capture**: Triggers after 3+ engaged messages — asks for name and phone
- **Streaming**: SSE streaming works, text appears progressively
- **Brevity fix**: Responses are now 2-4 sentences, no raw markdown

## Open Issues

1. **Deployment**: Not yet deployed to Vercel (needs `vercel login`)
2. **First fee response still lists all grades**: Should ask which grade first, then give specific fee
3. **API key balance**: Using ContentVault's key ($3.44 remaining) — need dedicated key for production
4. **No favicon**: Minor — 404 on /favicon.ico
5. **Mobile testing**: Not yet tested on mobile viewport
6. **Images**: User offered to generate via Nano Banana — prompts provided but not yet added

## Key Decisions

- System prompt over RAG (school data fits in one prompt — simpler, faster)
- Client-side history via localStorage (no database needed for demo)
- Streaming SSE for real-time feel
- Claude Haiku 4.5 for speed + low cost
- Website embed over WhatsApp for v1 (no platform dependency)
