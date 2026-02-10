# SchoolBot — Architecture

## Overview

SchoolBot is an AI-powered admission assistant that embeds on school websites as a chat widget. It answers parent queries about fees, admissions, transport, and facilities using Claude Haiku with a school-specific knowledge base.

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js 15 + Tailwind CSS v4 | Modern React framework, instant deploys |
| Chat Widget | React client component | Self-contained, embeddable |
| API | Next.js App Router API routes | Serverless, no separate backend |
| LLM | Claude Haiku 4.5 (streaming) | Fast, cheap (~$0.001/msg), good quality |
| Chat History | localStorage (client-side) | No database needed, stateless server |
| Knowledge Base | System prompt | School data fits in one prompt (~2K words) |
| Hosting | Vercel (planned) | Free tier, auto-scaling, edge network |
| Fonts | Crimson Pro + Plus Jakarta Sans | Warm, premium, distinctive |

## Architecture Diagram

```
Parent Browser
  ├── Landing Page (Server Component)
  └── Chat Widget (Client Component)
        ├── localStorage (last 10 messages)
        └── POST /api/chat
              ├── Validate request
              ├── Build messages array (system prompt + history)
              ├── Call Claude Haiku 4.5 (streaming)
              └── Return SSE stream
```

## Key Design Decisions

- **ADR-0001**: System prompt over RAG (school data is small enough)
- **ADR-0002**: Website chatbot over WhatsApp (no platform dependency)
- Client-side history = stateless server = infinite scalability
- Streaming SSE for real-time response feel

## File Structure

```
schoolbot/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # Streaming API endpoint
│   │   ├── globals.css          # Tailwind v4 theme
│   │   ├── layout.tsx           # Root layout + fonts
│   │   └── page.tsx             # Landing page (10 sections)
│   ├── components/
│   │   └── chat-widget.tsx      # Chat widget (client component)
│   └── lib/
│       └── school-data.ts       # System prompt + knowledge base
├── docs/
│   ├── architecture.md          # This file
│   ├── STATUS.md                # Current state
│   ├── decisions/               # ADRs
│   └── sessions/                # Session logs
└── package.json
```

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run start        # Start production server
vercel               # Deploy to Vercel
```
