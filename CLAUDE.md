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
# Development
npm run dev          # Start Vite dev server (port 5173)
npm run build        # Production build
npm run preview      # Preview production build locally

# Quality
npm run lint         # ESLint check
npm run test         # Run all tests (Vitest)
npm run test:watch   # Watch mode for tests

# Deployment
npm run deploy       # Build + deploy to GitHub Pages (gh-pages)
```

To run a single test file: `npx vitest run src/test/example.test.ts`

## Architecture

### Data layer (fully static, no backend)
All content is hardcoded in two files:
- [`src/data/mockArticles.ts`](src/data/mockArticles.ts) — 50 `Article` objects. Key fields: `punchyTitle`, `punchySummary`, `keyInsights`, `powerQuote?`, `engagement`, `category`, `tags`, `isNew/isTrending/isHot`. The `Article` interface is the canonical type.
- [`src/data/howToGuides.ts`](src/data/howToGuides.ts) — Static `HowToGuide` objects for AI tool setup guides, each with `steps`, `prerequisites`, `links`, `difficulty`, and `tags`.

### State and filtering (`Index.tsx` only)
No global state manager. All filter/theme/pagination state lives in `src/pages/Index.tsx`. The flow:
1. `mockArticles` → filtered/sorted by `useMemo` (category + sort) → `filteredArticles`
2. `filteredArticles` → paginated locally (`shown` counter, load-more button) → `visible`
3. `visible[0]` → `FeaturedCard` (editorial layout); `visible.slice(1)` → `ArticleCard` rows

Ranks are re-computed after filtering: `.map((a, i) => ({ ...a, rank: i + 1 }))`.

### Design system — editorial minimal (2026 redesign)
The UI was redesigned from glassmorphism/cyberpunk to a premium editorial aesthetic. Key decisions:

**Fonts** (loaded via Google Fonts in `index.html`):
- `Geist` — all UI text, headings, display type
- `Geist Mono` — timestamps, metadata, rank numbers, tags, monospace labels
- `Newsreader` — italic pull-quotes only (`.feat-quote .q`)

**Color tokens** (oklch, in `src/index.css` `:root`):
- `--bg / --bg-elev / --bg-panel / --bg-inset` — layered surface hierarchy (light to inset)
- `--ink / --ink-2 / --ink-3 / --ink-4` — text hierarchy (primary → ghost)
- `--accent / --accent-ink / --accent-soft` — intelligent cyan-blue
- `--violet / --emerald / --coral / --gold` — supporting accents
- `--hairline / --hairline-strong` — borders and dividers

**Theme system**: `data-theme="dark"` attribute on `<html>` (not a class). Default is **light**. Preference is persisted to `localStorage` under key `pulse-theme`. Tailwind's `darkMode` is set to `["selector", '[data-theme="dark"]']`.

**CSS architecture**: All component styles are custom CSS classes in `src/index.css` (`.shell`, `.hdr`, `.feat`, `.row`, `.seg`, `.chip`, `.guides`, etc.) — **not** Tailwind utilities. Tailwind is kept only for layout primitives. Do not use Tailwind for visual styling of these components; extend `index.css` instead.

**Key CSS classes**:
- `.shell` — max-width container (1280px, 32px padding)
- `.hdr-wrap` / `.hdr` — floating pill header; adds `.compact` class on scroll > 80px
- `.feat` — 3-column featured article grid (rank column / content / insights aside)
- `.row` — 3-column article row (rank / content / metrics sidebar)
- `.seg` / `.seg-pill` — segmented sort control with spring-animated pill indicator
- `.chip` — category filter pill
- `.guide` — how-to guide tile in hairline grid
- `.bg-atmosphere` — fixed radial glow behind content (pointer-events: none)

### Component map
| Component | Purpose |
|---|---|
| `Header.tsx` | Floating pill header; collapses on scroll; live indicator; Cmd-K trigger; theme toggle |
| `HeroSide.tsx` | SVG sparkline + 4-row metrics card (replaces old stats bar) |
| `ArticleCard.tsx` | Exports `FeaturedCard` (rank 1, editorial) and default `ArticleCardWrapper` (rows 2+) |
| `CommandPalette.tsx` | Cmd-K command palette; keyboard nav (↑↓ Enter Esc); live search across articles |
| `FilterBar.tsx` | Segmented sort control + scrollable category chips; animated pill indicator via `getBoundingClientRect` |
| `HowToSection.tsx` | Hairline 2-col grid of tool setup guides (no accordion — static display) |
| `Footer.tsx` | CSS marquee of sources + 3-col grid (brand / newsletter / connect) |
| `ScrollProgress.tsx` | 2px fixed top bar; scaleX driven by scroll position |

### Removed / superseded components
`HeroStats`, `SearchBar`, `BackToTop`, `LiveIndicator`, `InfiniteScrollTrigger`, `LoadingSkeleton`, `NavLink`, `HowToCard` — all replaced inline or by new components. Files remain on disk but are not imported anywhere.

## Token Optimization

Operate in compact mode by default:

**Response rules:** concise · direct · bullets over prose · structured output (JSON/YAML/diff) preferred · ≤80 words prose · ≤10 bullets · 1 example max

**Never say:** Certainly / Absolutely / Sure / Here's what I found / Let me explain / As an AI

**Code output:** minimal · production-safe · no tutorial comments · no setup instructions

**Context:** keep only active task + blocking errors. Discard completed reasoning, verbose logs, stale history.

**File access:** grep/symbol-extract before full-read. Never load entire files unless required.

**Abbreviate freely:** cfg · env · req · auth · impl · (remove: basically / actually / simply / essentially)

**Chain of thought:** silent. No step-by-step reasoning traces unless user asks.

**Shortest correct answer wins. High information density always.**

## Key constraints
- **No backend, no API calls.** Adding real data: replace `mockArticles` with a fetch, update the `Article` interface if fields change.
- **Deployment target is GitHub Pages** at `aipulse.c7corp.com` (CNAME file present). The `homepage` field in `package.json` must stay set correctly for asset paths post-deploy.
- **Package manager**: both `bun.lockb` and `package-lock.json` exist — use `npm` to match the scripts.
- **Do not add glassmorphism** (`backdrop-filter`, `blur`, heavy borders on cards). The design deliberately avoids it. Use tonal surface layering (`--bg-elev`, `--bg-inset`) for depth instead.
- **Do not remove oklch colors** — they require a modern browser. The design targets 2026+ browsers where this is universally supported.
- **Node.js**: `C:\tool\node-v24.15.0-win-x64\npm.cmd` — use full path or prepend to PATH
- **PostgreSQL**: `C:\tool\pgsql\bin\` — `psql.exe`, `postgres.exe` available here

---
<!-- last-updated: 2026-05-15 -->
