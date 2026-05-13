# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **npm path**: Node.js is at `C:\tool\node-v24.15.0-win-x64\`. Use full path or add to PATH before running npm commands.

---
<!-- last-updated: 2026-05-13 -->
