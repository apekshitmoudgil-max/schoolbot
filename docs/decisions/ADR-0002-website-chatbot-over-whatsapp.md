# ADR-0002: Website Chatbot as v1 Over WhatsApp

**Date**: 2026-02-10
**Status**: Accepted
**Context**: Choosing the primary channel for the school chatbot demo and MVP

## Decision

Build the chatbot as a **website embed widget** first. WhatsApp integration is Phase 2.

## Rationale

### Website embed advantages:
- No platform dependency (Meta can't ban you or change pricing overnight)
- No per-message costs (WhatsApp charges per template message)
- No BSP signup, TRAI DLT registration, or WhatsApp Business verification needed
- Simpler compliance (no Meta as data processor in privacy chain)
- Richer UI (forms, buttons, images, custom styling)
- Faster to build (2-3 weeks vs 4-6 weeks with WhatsApp)
- Embeds with a single `<script>` tag on any school website

### Admission funnel is the #1 use case:
- Prospective parents ARE on the school website during admission research
- Chatbot captures leads 24/7 — measurable ROI for schools
- "Your bot converted 15 leads this month" is an easy sell

### WhatsApp for Phase 2:
- Push notifications to existing parents (fee reminders, attendance)
- Requires the school to already be a customer (post-sale)
- Higher complexity but higher stickiness

## Consequences

- Cannot push messages to parents proactively (pull-only)
- School website must have reasonable traffic (admission season = peak)
- WhatsApp integration will require additional work later
