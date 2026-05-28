# Kartik Pal Portfolio — PRD

## Original Problem Statement
Build a landing page: portfolio of Kartik Pal using his CV. Make it in such a way that recruiters select him for jobs. Add some interesting things that make recruiters go in awe of his personality and work.

## User Choices
- Dark, futuristic "AI lab" aesthetic with neon accents
- No headshot — stylized AI/abstract visual
- LinkedIn link featured
- All wow features: AI chatbot, animated stats, downloadable CV, hire-me form, publications timeline
- LLM: Gemini 3 Flash (via Emergent Universal Key)

## Architecture
- **Frontend** React + Tailwind + shadcn/ui + Framer Motion. Sections: Navbar, Hero, Stats, Projects (bento), Experience, Skills, Publications, Contact, Footer + ChatWidget.
- **Backend** FastAPI on /api with three core endpoints:
  - `POST /api/chat` — Gemini 3 Flash via `emergentintegrations` LlmChat, multi-turn (history persisted to MongoDB `chat_sessions`)
  - `POST /api/contact` — hire-me form → MongoDB `contacts`
  - `GET /api/contacts` — list submissions
- **DB** MongoDB (collections: chat_sessions, contacts, status_checks)
- **Assets** `/app/frontend/public/Kartik_Pal_CV.pdf`, design hero image, project image

## User Personas
- **Tech recruiters / hiring managers** scanning portfolios for AI/ML talent
- **Engineering leads** evaluating depth on healthcare AI, LLMs, MLOps, cloud

## Core Requirements (Static)
1. Showcase identity, role, location, contact, availability
2. Highlight quantified impact (₹95L funding, 91% accuracy, 7 systems)
3. Project bento with 6 production AI systems
4. Experience timeline + Education
5. Skills toolkit
6. Publications & Research (incl. Elsevier book chapter)
7. Hire-me contact form
8. Live AI chatbot trained on CV ("Ask Kartik's AI")
9. Downloadable CV
10. LinkedIn link

## What's Been Implemented (2025-12-28)
- ✅ All 9 sections live
- ✅ Gemini 3 Flash multi-turn chatbot with session persistence (localStorage + Mongo)
- ✅ Animated stats counter (count-up on scroll)
- ✅ Hire-me form → MongoDB
- ✅ Downloadable CV PDF
- ✅ Mobile-responsive nav with hamburger
- ✅ Sonner toasts for form feedback
- ✅ Tested end-to-end: 8/8 backend pytest pass; full frontend Playwright pass

## Backlog (Prioritized)
- **P1** Replace LinkedIn placeholder URL with the user's real URL (currently `https://www.linkedin.com/in/kartik-pal/`)
- **P1** Add Google Scholar / GitHub links if Kartik provides
- **P2** Optimize chat history replay (currently O(N) LLM calls per turn — switch to single-call history injection)
- **P2** Persist chat assistant turns also (currently replays only user messages)
- **P2** Add OG meta tags / favicon for shareability
- **P3** Add a tiny "live visitor counter" or "recruiters here this week" widget
- **P3** Convert email contact submissions to a real email (Resend / SendGrid integration)
- **P3** Migrate `@app.on_event('shutdown')` to FastAPI lifespan handler

## Next Tasks
- Collect real LinkedIn / GitHub / Scholar URLs from user
- Optionally wire Resend so hire-me submissions email Kartik in real time
