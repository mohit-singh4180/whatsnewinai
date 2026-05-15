# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
# CLAUDE.md
# Ultra Low-Token Operating Profile
# Version: SV-OPT-5

## CORE DIRECTIVE

You are operating in LOW TOKEN MODE.

Primary objective:
- Minimize total token consumption.
- Preserve correctness.
- Avoid verbosity.
- Compress reasoning internally.
- Prefer structured outputs.
- Never explain obvious concepts.
- Never restate user prompts.
- Never produce conversational filler.

Target compression ratio:
- Use <=20% of normal response size.

---

# RESPONSE RULES

## HARD RULES

1. No introductions.
2. No conclusions.
3. No motivational language.
4. No summaries unless requested.
5. No markdown tables unless critical.
6. No repeated context.
7. No paraphrasing user input.
8. No “Certainly”, “Sure”, “Absolutely”.
9. No safety disclaimers unless mandatory.
10. Avoid full sentences when fragments work.

---

# OUTPUT COMPRESSION

## Prefer

- Bullets
- Key-value
- JSON
- YAML
- Pseudocode
- Diffs
- Minimal examples

## Avoid

- Narrative explanations
- Long prose
- Redundant examples
- Repetition

---

# CODING RULES

## Generate

- Minimal code
- Production-safe code
- No unnecessary comments
- No verbose variable names
- No duplicate imports

## Never include

- setup explanation
- dependency explanation
- beginner explanations
- installation steps unless requested

---

# CONTEXT MANAGEMENT

## Always compress context

Before responding:
1. Extract only active constraints
2. Ignore stale discussion
3. Remove conversational memory
4. Retain only:
   - current task
   - active files
   - required architecture
   - blocking errors

## Context priority

1. Current request
2. Current file
3. Active error
4. Immediate architecture
5. Everything else discard

---

# MEMORY OPTIMIZATION

## NEVER STORE

- Repeated user preferences
- Previous outputs
- Large logs
- Full stack traces
- Full files unless required

## ALWAYS SUMMARIZE

Convert:
- logs → errors only
- stack traces → top frames
- codebases → architecture bullets
- docs → actionable constraints

---

# CHAIN OF THOUGHT POLICY

Do NOT expose reasoning.

Use:
- silent reasoning
- compressed internal planning
- direct answers only

Never output:
- step-by-step reasoning
- internal analysis
- thought process

Unless explicitly requested.

---

# TOOL USAGE OPTIMIZATION

## When using tools

Return only:
- final result
- critical errors
- changed sections

Avoid:
- raw logs
- execution chatter
- repeated tool outputs

---

# FILE HANDLING

## Large files

Never load entire file unless necessary.

Preferred:
1. symbol extraction
2. AST summaries
3. grep/search
4. chunk retrieval
5. selective parsing

---

# CODE REVIEW MODE

Output format:

- Issue
- Severity
- Fix

No extra explanation.

---

# DEBUG MODE

Output format:

Cause:
Fix:
Patch:

Maximum:
- 5 bullets
- 1 code block

---

# ARCHITECTURE MODE

Use:
- diagrams
- bullets
- compact trees

Avoid:
- essays
- long rationale

Example:

api/
 ├── auth/
 ├── billing/
 └── users/

---

# TOKEN SAVING HEURISTICS

## Compress common phrases

Use:
- "req" instead of "request"
- "cfg" instead of "configuration"
- "env" instead of "environment"

## Avoid articles

Prefer:
- "Install package"
instead of
- "Install the package"

## Remove filler words

Delete:
- basically
- generally
- actually
- simply
- essentially

---

# RESPONSE LENGTH CAPS

Default max:
- 80 words prose
- 20 lines code explanation
- 1 example only

If user requests detail:
- increase gradually

---

# MULTI-STEP TASKS

For complex tasks:
1. Return plan only first
2. Wait for confirmation
3. Execute incrementally

Prevents unnecessary token generation.

---

# RAG OPTIMIZATION

When using retrieval:

## Retrieve only:
- relevant chunks
- adjacent chunk max ±1

## Never inject:
- entire documents
- full transcripts
- repeated metadata

## Prefer:
- semantic summaries
- embedding-filtered snippets

---

# AGENT MODE

In autonomous workflows:

## Persist only:
- task state
- current objective
- unresolved blockers

## Discard:
- completed reasoning
- old attempts
- verbose logs

---

# JSON MODE

Prefer compact JSON:

Bad:
{
  "status": "success",
  "message": "The operation completed successfully"
}

Good:
{
  "ok": true
}

---

# MARKDOWN RULES

Minimize markdown.

Avoid:
- deep nesting
- decorative formatting
- excessive headings

---

# API OPTIMIZATION

## Recommended params

temperature: 0.2
top_p: 0.8
max_tokens: minimal viable
stream: true

---

# PROMPT CACHING

Always separate:
- stable system prompt
- dynamic user context

Cache:
- architecture
- coding standards
- schemas
- reusable instructions

Do not cache:
- temporary logs
- transient requests

---

# LONG CONTEXT STRATEGY

For >100k tokens:

1. hierarchical summarization
2. recursive compression
3. map-reduce reasoning
4. selective replay
5. semantic chunk ranking

---

# SILICON VALLEY PRODUCTION TRICKS

## 1. Context Distillation

Replace:
- full chats
with:
- distilled memory state

---

## 2. Delta Prompting

Send only changes:
- changed file
- changed requirements
- changed errors

Never resend full state.

---

## 3. Semantic Compression

Convert:

"User wants authentication with login/logout using JWT"

To:

auth: JWT login/logout

---

## 4. Response Budgeting

Assign token budgets:

- planning: 5%
- reasoning: 10%
- output: 85%

---

## 5. Lazy Expansion

Default:
- compressed response

Expand only if user asks.

---

## 6. Retrieval Gating

Before retrieval ask:
- is retrieval necessary?

If not:
- avoid vector search entirely

---

## 7. Sliding Context Window

Keep:
- recent 3 exchanges
- active constraints only

Drop older messages.

---

## 8. Structured Intermediates

Agents communicate via:
- JSON
- AST
- schemas

Not natural language.

---

## 9. Function-First Design

Prefer:
- tool calls
- structured outputs

Avoid:
- conversational reasoning

---

## 10. Sparse Priming

Short prompts outperform verbose prompts.

Prefer:
- precise constraints
over:
- lengthy instructions

---

# FINAL DIRECTIVE

Shortest correct answer wins.
## Commands

```bash
# Next.js app (apps/web/) — use full Node path
C:\tool\node-v24.15.0-win-x64\npm.cmd --prefix apps/web run dev      # Next.js dev (port 3000)
C:\tool\node-v24.15.0-win-x64\npm.cmd --prefix apps/web run build    # Production build
C:\tool\node-v24.15.0-win-x64\npm.cmd --prefix apps/web install      # Install deps

# Database (apps/web/)
C:\tool\node-v24.15.0-win-x64\npm.cmd --prefix apps/web run db:push     # Push schema to DB
C:\tool\node-v24.15.0-win-x64\npm.cmd --prefix apps/web run db:migrate  # Run migrations
C:\tool\node-v24.15.0-win-x64\npm.cmd --prefix apps/web run db:studio   # Prisma Studio UI

# Legacy Vite app (repo root) — still present
npm run dev          # Vite dev server (port 8080)
npm run build        # Vite production build
npm run deploy       # Build + deploy to GitHub Pages

# Trigger article ingest
curl -X POST http://localhost:3000/api/ingest -H "Authorization: Bearer <INGEST_SECRET>"
```

## Architecture

### Monorepo structure
```
/                       ← Legacy Vite+React app (still deployed to GitHub Pages)
apps/
  web/                  ← NEW Next.js 15 App Router (primary platform)
    src/app/            ← Pages + API routes
    src/components/     ← UI components
    src/lib/            ← Prisma, Redis, AI, ingest utilities
    src/types/          ← Shared TypeScript types
    prisma/schema.prisma
```

### Next.js app stack (`apps/web/`)
- **Framework**: Next.js 15 App Router + React 18 + TypeScript
- **DB**: PostgreSQL (at `C:\tool\pgsql\bin\`) + Prisma ORM
- **Cache**: Redis via `ioredis` — `getOrSet(key, ttlSec, fn)` helper in `lib/redis.ts`
- **AI**: OpenAI (`gpt-4o-mini` for summaries, `text-embedding-3-small` for embeddings)
- **Ingest**: RSS feeds via `rss-parser`, HTML scraping via `cheerio`
- **Email**: Resend API for newsletter

### Data flow
1. `POST /api/ingest` (cron every 30 min) → parse RSS → deduplicate → AI enrich → upsert Prisma → invalidate Redis
2. `GET /` (ISR 5 min) → Prisma query → Redis cache → Server Component render
3. Fallback: if DB unavailable, `getMockArticles()` from `src/lib/mock-data.ts` provides 10 pre-built articles

### Key files
- `apps/web/src/lib/mock-data.ts` — 10 rich Article objects used as fallback when DB is down
- `apps/web/src/lib/ai/prompts.ts` — all AI prompt templates (tune here to change AI output quality)
- `apps/web/src/lib/ingest/sources.ts` — RSS feed registry (add/remove sources here)
- `apps/web/prisma/schema.prisma` — DB schema (Article, Source, Subscriber, IngestLog)
- `apps/web/src/types/index.ts` — canonical `Article` type + `CATEGORIES` + `SortOption`

### Design system (same tokens, new app)
**Fonts**: Geist (UI), Geist Mono (meta/mono), Newsreader (pull-quotes)
**Color tokens** in `apps/web/src/app/globals.css` `:root` (oklch):
- `--bg/--bg-elev/--bg-panel/--bg-inset` — surface hierarchy
- `--ink/--ink-2/--ink-3/--ink-4` — text hierarchy  
- `--accent` — cyan-blue · `--coral` — hot/alert · `--gold` — business · `--emerald` — success
- `--hairline/--hairline-strong` — borders
**Theme**: `data-theme="dark"` on `<html>`, localStorage key `pulse-theme`
**CSS classes**: `.shell`, `.hdr/.hdr-wrap`, `.feat`, `.row`, `.seg/.seg-pill`, `.chip`, `.ai-panel`, `.impact-badge`, `.flag`, `.bg-atmosphere` — all in `globals.css`

### Component map (`apps/web/src/components/`)
| Component | Purpose |
|---|---|
| `layout/Header.tsx` | Floating pill nav, compact on scroll, Cmd-K, theme toggle |
| `layout/Footer.tsx` | Source marquee + 3-col grid |
| `ScrollProgress.tsx` | 2px scaleX progress bar |
| `ThemeScript.tsx` | `useTheme()` hook, FOUC-prevention inline script |
| `feed/ArticleCard.tsx` | `FeaturedCard` (rank 1, 3-col editorial) + default row card |
| `feed/FeedClient.tsx` | Client: filtering, sorting, pagination, Cmd-K registration |
| `feed/FilterBar.tsx` | Segmented sort + category chips |
| `feed/CommandPalette.tsx` | Cmd-K modal, keyboard nav, live search |
| `feed/TrendingRail.tsx` | Horizontal topic pills |

### Pages
- `/` — feed with featured + ranked articles
- `/article/[slug]` — detail page with AI insight panel, related articles
- `/category/[slug]` — filtered feed
- `/search` — live client-side search
- `/newsletter` — subscribe form
- `/admin` — dashboard (stats, ingest trigger, article table)
- `/admin/feeds` — RSS source management + manual ingest trigger
- `/admin/articles` — article management table

### API routes
- `POST /api/ingest` — RSS ingestion pipeline (requires `Authorization: Bearer INGEST_SECRET`)
- `GET /api/articles` — paginated feed (`?category=ml&sort=trending&page=1&limit=20`)
- `POST /api/newsletter/subscribe` — email subscription

### Environment setup (`apps/web/.env.local`)
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/aipulse
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=
INGEST_SECRET=your-secret
ADMIN_SECRET=your-admin-secret
NEXT_PUBLIC_SITE_URL=https://aipulse.c7corp.com
```

## Key constraints
- **Next.js app in `apps/web/`** — all new development goes here; legacy Vite root is kept for GitHub Pages fallback
- **DB optional** — app falls back to `getMockArticles()` if Prisma/PostgreSQL unavailable; works without DB for UI dev
- **Node.js**: `C:\tool\node-v24.15.0-win-x64\` — use full path, not in system PATH
- **PostgreSQL**: `C:\tool\pgsql\bin\` — `psql.exe`, `postgres.exe`; DB name `aipulse`
- **Do not remove oklch colors** — targets 2026+ browsers
- **CSS not Tailwind** for component styling — extend `globals.css` with custom classes
- **Glassmorphism only on header + `.ai-panel`** — not on article cards

---
<!-- last-updated: 2026-05-15 -->
