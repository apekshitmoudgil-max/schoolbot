# SchoolBot — AI Admission Assistant for Schools

## Project Overview
Website-embeddable chatbot that answers parent queries about school admissions, fees, transport, and facilities. Powered by Claude Haiku 4.5 with streaming responses.

## Tech Stack
- **Framework**: Next.js 15 (App Router) + Tailwind CSS v4
- **LLM**: Claude Haiku 4.5 via Anthropic SDK (streaming SSE)
- **Chat History**: Client-side localStorage (last 10 messages)
- **Knowledge Base**: System prompt in `src/lib/school-data.ts`
- **Deploy**: Vercel (planned)

## Commands
```bash
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm run start        # Production server
```

## Key Files
- `src/app/page.tsx` — Landing page (Greenwood International Academy)
- `src/components/chat-widget.tsx` — Chat widget (client component)
- `src/app/api/chat/route.ts` — Streaming API endpoint
- `src/lib/school-data.ts` — System prompt + school knowledge base
- `.env.local` — ANTHROPIC_API_KEY

## Architecture Rules
- System prompt, NOT RAG (see ADR-0001)
- Website embed, NOT WhatsApp (see ADR-0002)
- Client-side history = stateless server
- All chat state lives in the browser (localStorage)
- Server is a pure proxy: receives messages → calls Claude → streams back

## Design System
- **Colors**: Forest #1B4332, Sage #52796F, Cream #FEF9EF, Amber #D4A574, Terracotta #C1440E
- **Fonts**: Crimson Pro (display), Plus Jakarta Sans (body)
- **School**: Greenwood International Academy (fictional, CBSE, Bangalore)
