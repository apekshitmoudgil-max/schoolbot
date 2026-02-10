# SchoolBot — Status

**Last Updated**: 2026-02-10
**Phase**: MVP Built, Pre-Deployment

## Current State

### Working
- Landing page: 10-section school website for "Greenwood International Academy"
- Chat widget: Floating bubble, opens to full chat panel
- Streaming responses: SSE from Claude Haiku 4.5
- Chat history: Last 10 messages persisted in localStorage
- School knowledge base: Comprehensive system prompt (fees, admissions, transport, facilities, programs, results)
- Lead capture: Bot asks for contact info after 3+ engaged messages
- Quick action chips: Fee Structure, Admission Process, Transport Routes, School Facilities
- Markdown rendering: Basic bold/list parsing in chat bubbles
- Responsive: Mobile-first with md/lg breakpoints
- Build: Clean — zero errors, zero warnings

### Not Yet Done
- Vercel deployment (needs `vercel login`)
- Dedicated Anthropic API key (currently sharing ContentVault's — $3.44 balance)
- Favicon
- Mobile viewport testing
- Hero/campus images (user has Nano Banana prompts ready)
- Multi-tenant support (currently hardcoded to one school)
- Admin dashboard for school to manage their data
- Analytics (query count, lead conversion)

## Open Issues

1. First fee response still lists all grades instead of asking which grade first
2. API key balance is low — need dedicated key before demoing externally
3. Not tested on slow networks or with API failures beyond basic error handling

## Next Steps

1. Deploy to Vercel + set ANTHROPIC_API_KEY env variable
2. Add hero images (user generating via Nano Banana)
3. Test on mobile
4. Get dedicated Anthropic API key
5. Share demo URL with friend's contact
6. Gather feedback → iterate

## Recent Sessions
- [2026-02-10: Initial Build](sessions/2026-02-10-initial-build.md)

## ADRs
- [ADR-0001: System Prompt Over RAG](decisions/ADR-0001-system-prompt-over-rag.md)
- [ADR-0002: Website Chatbot Over WhatsApp](decisions/ADR-0002-website-chatbot-over-whatsapp.md)
