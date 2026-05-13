# AI Pulse Today — Product & Design Brief

> **Purpose of this document:** A complete knowledge base of the product — every page, section, feature, and interaction — written for a designer or non-technical collaborator. Use this to fully understand what the app does before redesigning it.

---

## What Is This Product?

**AI Pulse Today** is a news aggregator website that collects and displays the top 50 most important AI and machine learning news stories from around the internet. Think of it like a curated front page of the internet, but focused entirely on artificial intelligence.

- **Website:** [aipulse.c7corp.com](https://aipulse.c7corp.com)
- **Built by:** Mohit Singh, Dubai, UAE 🇦🇪
- **Who it's for:** AI enthusiasts, developers, researchers, and tech-savvy professionals who want to stay current on AI without visiting dozens of websites
- **Core promise:** "Never miss an AI breakthrough — we curate so you don't have to"

---

## The Big Picture: Page Layout (Top to Bottom)

The entire app is a single, long page. Here is everything on it, in order:

```
┌─────────────────────────────┐
│  1. HEADER (sticky/fixed)   │
├─────────────────────────────┤
│  2. HERO SECTION            │
├─────────────────────────────┤
│  3. STATS BAR               │
├─────────────────────────────┤
│  4. FILTER BAR (sticky)     │
├─────────────────────────────┤
│  5. ARTICLE GRID            │
│     (infinite scroll)       │
├─────────────────────────────┤
│  6. HOW TO SECTION          │
├─────────────────────────────┤
│  7. FOOTER                  │
└─────────────────────────────┘
   + Scroll Progress Bar (top)
   + Back to Top Button (floating)
```

---

## Section 1: Header

**Always visible at the top — sticks as you scroll.**

### What's inside:
| Element | Description |
|---|---|
| **Logo** | A lightning bolt icon (⚡) + "AI Pulse Today" brand name in gradient text. The icon gently rocks back and forth with a subtle animation. Has a glowing halo behind it. |
| **Tagline** | "By Mohit Singh \| Dubai, UAE 🇦🇪" — shown below the logo on desktop |
| **Live Indicator** | A green pulsing dot + "LIVE" text + "Updated X mins ago" timestamp + "Auto-refresh: ON". Communicates to users the feed is active. |
| **Search button** | A magnifying glass icon. Clicking it expands into a search input field. Clicking X collapses it back. |
| **Theme toggle** | A sun icon (☀️) switches to light mode. A moon icon (🌙) switches back to dark mode. |
| **Mobile menu** | On phones, a hamburger menu (☰) reveals the live indicator, search field, and theme toggle in a dropdown. |

### Visual style:
- Background is semi-transparent (frosted glass effect) — you can slightly see the page behind it as you scroll
- Sits on top of all other content (z-index: highest)
- Slides in from the top when page loads

---

## Section 2: Hero Section

**The welcome/intro area — the first thing users see.**

### What's inside:

**Live Badge**
- A pill-shaped badge at the top center
- Contains a green animated ping dot + "Live • Auto-updating every 30 minutes"

**Main Headline**
- Large, dominant text in two lines:
  - Line 1: `Top 50 AI & ML News` — in gradient color (cyan to purple)
  - Line 2: `Updated in Real-Time` — in plain white/dark text
- Very large font (up to 7xl / ~72px on desktop)

**Subheadline**
- `"Your real-time window to AI innovation. We curate the most impactful stories from 50+ trusted sources so you never miss a breakthrough."`

**Attribution**
- `Crafted with ❤️ by Mohit Singh in Dubai, UAE 🇦🇪`

**Search Bar**
- The main search input is placed here, centered, below the headline
- Placeholder: "Search articles, sources, tags..."
- Has a keyboard shortcut hint: `⌘ K` (on Mac) / `Ctrl K` (on Windows) to focus it
- When focused, the bar slightly scales up and glows
- Typing shows a dropdown hint: "Searching for 'X' in titles, sources, and tags..."
- An X button appears to clear the search
- Search is live/instant (results update as you type, with a 200ms delay to avoid flickering)
- Searches across: article title, punchy title, source name, tags, and summary text

**Background**
- A subtle radial glow emanating from the center (like a cosmic light source)

---

## Section 3: Stats Bar

**Four metric cards displayed in a 2×2 grid (mobile) or 1×4 row (desktop).**

| Stat | Icon | Value | What It Means |
|---|---|---|---|
| Trending Stories | 📰 Newspaper | Dynamic count (reflects current filter) | How many articles are showing |
| Trusted Sources | 📈 TrendingUp | ~50 | Number of news sources we pull from |
| Auto-Refresh | 🕐 Clock | 30 min | How often the feed updates |
| Live Updates | ⚡ Zap | 24/7 | The service runs around the clock |

Each card:
- Has a glass/frosted card background
- Slightly scales up on hover
- Numbers animate in from zero on page load (count-up effect)
- Icon is tinted with a unique color (cyan, purple, green, gold)

---

## Section 4: Filter Bar

**Sticky — sticks below the header as you scroll. Two rows of filters.**

### Row 1 — Sort Mode (how articles are ordered):

| Button | What It Does |
|---|---|
| 🔥 **Trending** | Default. Shows articles in editorial rank order (manually curated best-to-worst) |
| ⚡ **Latest** | Sorts articles by publish time, newest first |
| 📈 **Top** | Sorts by engagement score (comments + shares + overall score), highest first |

### Row 2 — Category Filter (what topic area):

| Button | Category |
|---|---|
| 🌐 All | Show everything |
| 🤖 Machine Learning | Core ML algorithms, models, training |
| 💬 NLP | Language models, chatbots, text AI |
| 👁️ Computer Vision | Image recognition, video AI, visual models |
| 🦾 Robotics | Physical robots, automation, movement |
| 🔬 Research | Academic papers, lab breakthroughs |
| 🏢 Industry | Business news, product launches, enterprise AI |

**Behavior:**
- Active filter button is highlighted (fills with primary color / glow effect)
- Both rows scroll horizontally on mobile (no wrapping, hidden scrollbar)
- Filters combine: you can pick "Latest" + "NLP" at the same time
- When filters change, the article count updates and ranks reset (e.g., article #3 under "All Trending" may become #1 under "NLP Trending")

---

## Section 5: Article Grid (The Main Feed)

**This is the core product — the list of news stories.**

### Result count bar
Above the articles:
- Left: "Showing **10** of **50** trending stories" (or "Found **3** results for 'GPT-5'" when searching)
- Right: "Last updated: 2:45:03 PM" (timestamp of last auto-refresh)

### Article Cards

Each article is displayed as a tall card. Here is every element on a card, from top to bottom:

---

#### Rank Badge
- Positioned in the **top-left corner**, slightly overlapping outside the card boundary
- A square badge showing `#1`, `#2`, `#3`, etc.
- **Top 3 have special colors:**
  - `#1` → Gold-to-coral gradient (most prominent)
  - `#2` → Silver/muted gradient
  - `#3` → Coral-to-purple gradient
  - `#4+` → Plain muted/grey
- Spins into place with a spring animation on load

#### Engagement Score (Flame)
- Positioned in the **top-right corner**, overlapping outside the card
- A 🔥 flame icon + a number (e.g., `12.4K`)
- The number = total engagement score (composite of views, shares, comments)
- Numbers over 1,000 are shown as `1.0K`, `12.4K`, etc.

#### Status Badges (left-aligned, below the rank area)
Up to 3 animated badges can appear:
- `✨ NEW` — Article published recently. Pulses with a subtle scale animation continuously.
- `🔥 TRENDING` — Actively gaining lots of engagement
- `⚡ HOT` — Breaking or extremely high engagement

#### Punchy Title
- The main headline of the card — **bold, large (xl/2xl font)**
- This is the "tabloid-style" rewritten version of the article title
- Example: Instead of "OpenAI releases GPT-5 model", it says: **"OpenAI Drops GPT-5 — And It's Not Playing Around"**
- On hover, title color transitions to the primary accent color (cyan)

#### Meta Info Row
Three pieces of info separated by bullet `•` dots:
1. **Source name** — e.g., "OpenAI", "TechCrunch", "MIT News"
2. **Time ago** — e.g., "45 mins ago", "2 hours ago", "3 days ago" (with a clock icon)
3. **Comment count** — e.g., "1.2K comments" (with a speech bubble icon)

#### Punchy Summary
- 2–4 sentence description of the story, written in an exciting, opinionated voice
- Often includes emojis for impact
- Example: *"🚀 The AI world just shifted gears. OpenAI's GPT-5 isn't just an upgrade — it's a paradigm shift. Smarter reasoning. Fewer hallucinations. This is the model we've been waiting for."*

#### Key Insights Box
- A distinct inset box (slightly lighter background, subtle border)
- Header: ✨ "KEY INSIGHTS" label
- A bullet list of 3–5 short, scannable facts about the article
- Example bullets:
  - "10x faster inference than GPT-4"
  - "Native multimodal understanding across text, image, and audio"
  - "Reduced hallucinations by 90% in benchmark tests"

#### Power Quote (optional)
- Not every article has this
- A blockquote with a large decorative `"` behind it, a left border accent
- Contains a notable quote from a person mentioned in the story
- Example: *"This isn't just an upgrade — it's a paradigm shift." — Sam Altman, CEO*

#### Tags
- 2–5 hashtag-style chips showing topic keywords
- Example: `#GPT-5` `#OpenAI` `#AGI` `#LLM`
- Color-coded by category (e.g., NLP tags are cyan-ish, Robotics tags are coral)

#### Action Bar (bottom of card)
Two buttons:
- **Bookmark** (🔖 icon) — Toggles saved state. When active, fills solid. (Currently visual-only, no persistence across page reloads)
- **Share** (↗ icon) — Share button (currently visual-only)
- **"Read Original"** button → Opens the source article in a new browser tab

#### Attribution Footer
- Very small text at the bottom: "Content via **[Source Name]** | Curated by AI Pulse Today"

---

### Infinite Scroll / Load More

- Initially shows **10 articles**
- As you scroll to the bottom, more articles automatically load in batches of **10**
- A small loading indicator ("Loading more stories...") appears briefly between batches (simulated 300ms delay)
- When all articles are loaded, a message appears: "You've seen all [N] stories"
- The total count and displayed count are always shown in the results bar above

---

## Section 6: How To Section

**Educational guides for running AI tools locally — after the news feed.**

### Section Header
- A purple "Setup Guides" pill badge
- Title: `How To: Run AI Locally` (gradient + plain text)
- Subtitle: "Step-by-step guides to set up the most popular AI tools on your local machine."

### Guide Cards (2-column grid on desktop, 1-column on mobile)

Each card covers one AI tool. Current tools included:

| Tool | Icon | Difficulty | Time |
|---|---|---|---|
| Ollama | 🦙 | Beginner | 10 min |
| LM Studio | 🖥️ | Beginner | 15 min |
| ComfyUI | 🎨 | Intermediate | 30 min |
| Automatic1111 | 🖼️ | Intermediate | 45 min |
| Open Interpreter | 💻 | Intermediate | 20 min |
| LocalAI | 🔧 | Advanced | 45 min |
| Text Generation WebUI | 🌐 | Advanced | 30 min |
| GPT4All | 💬 | Beginner | 10 min |

### Card Structure
Each card has two states: **collapsed** (default) and **expanded** (user clicks "Show Setup Guide"):

**Collapsed view shows:**
- Tool emoji + name
- Difficulty badge (color-coded: green=beginner, yellow=intermediate, red=advanced)
- Time to complete
- Short description paragraph
- Topic tags (e.g., `#local-llm`, `#privacy`, `#offline`)
- "Show Setup Guide" expand button (▼)

**Expanded view adds:**
- **Prerequisites box** — what you need before starting (OS, RAM, disk space, etc.)
- **Numbered installation steps** — each step has a title + command/instruction in a monospace code style
- **Useful links** — clickable pills that open official docs, GitHub repos, etc. in new tabs
- "Hide Setup Guide" collapse button (▲)

---

## Section 7: Footer

**The bottom of the page.**

### Sources Marquee
- An infinitely scrolling horizontal ticker of all news source names
- Scrolls left continuously and loops seamlessly
- Examples: OpenAI, DeepMind, MIT News, TechCrunch, Wired, IEEE Spectrum, etc.

### Three-column layout (desktop):

**Column 1 — Brand**
- Logo + "AI Pulse Today" name
- Brand description paragraph
- Location: "Dubai, UAE 🇦🇪" with a pin icon

**Column 2 — Daily AI Digest (Newsletter)**
- Heading with mail icon
- Description: "Get the top 10 AI stories delivered to your inbox every morning."
- Email input field + "Subscribe" button
- *(Currently visual only — no backend email service connected)*

**Column 3 — Connect (Social)**
- Twitter, LinkedIn, GitHub icon buttons
- Content removal request: "dmca@aipulsetoday.com"

### Bottom Bar
- Copyright: "© 2024 AI Pulse Today. Crafted with ❤️ by Mohit Singh in Dubai"
- Legal links: Privacy Policy, Terms of Service, Content Policy, DMCA, Contact
- Disclaimer: "All content is attributed to original creators. We do not claim ownership of any external content."

---

## Floating / Always-Present UI Elements

These exist at the page level — not tied to any section:

### Scroll Progress Bar
- A thin 4px bar running along the very **top edge** of the screen (above everything, including the header)
- Fills left to right as you scroll down the page
- Color: gradient from cyan → purple → green
- Powered by a spring physics animation (feels slightly elastic/bouncy)

### Back to Top Button
- A round floating button in the **bottom-right corner**
- Shows an upward arrow (↑)
- **Only appears when you've scrolled past 30% of the page**
- Smooth-scrolls back to top when clicked
- Animates in/out with scale + fade

---

## Theme System (Dark / Light Mode)

The site defaults to **dark mode** (deep space aesthetic).

| Aspect | Dark Mode | Light Mode |
|---|---|---|
| Background | Very dark navy/blue (`#0e0f1c` approx) | Pure white |
| Cards | Dark navy with slight transparency | White with subtle shadow |
| Text | Near-white | Near-black |
| Primary accent | Electric cyan (`#00f0ff`) | Electric cyan |
| Secondary accent | Vivid purple (`#9933ff`) | Vivid purple |
| Logo icon | Glow effect | Subtle shadow |
| Header toggle icon | ☀️ Sun (gold) in dark mode | 🌙 Moon (purple) in light mode |

The toggle is instant — no transition delay between modes.

---

## Auto-Refresh Behavior

- Every **30 seconds** (demo speed; production would be 30 minutes), the app simulates a content refresh
- The "Last updated" timestamp in the results header updates
- A **toast notification** pops up in the bottom-left: green checkmark + "Content refreshed!" + "Latest AI news loaded" — disappears after 3 seconds
- The Live Indicator in the header also shows the new "Updated X mins ago" time

---

## Article Data Model

Every article in the feed has the following fields (useful context for designing cards):

| Field | Example |
|---|---|
| `rank` | 1, 2, 3 … 50 |
| `title` | "OpenAI Announces GPT-5 with Unprecedented Reasoning Capabilities" |
| `punchyTitle` | "OpenAI Drops GPT-5 — And It's Not Playing Around" |
| `source` | "OpenAI" |
| `timeAgo` | "45 mins ago" / "2 hours ago" / "3 days ago" |
| `punchySummary` | Exciting 2–4 sentence take, often with emojis |
| `keyInsights` | Array of 3–5 short bullet facts |
| `powerQuote` | Optional — a notable quote from someone in the story |
| `tags` | ["GPT-5", "OpenAI", "AGI", "LLM"] |
| `category` | ml / nlp / cv / robotics / research / industry |
| `engagement.score` | 15400 (total points) |
| `engagement.comments` | 2341 |
| `engagement.shares` | 1892 |
| `isNew` | true/false |
| `isTrending` | true/false |
| `isHot` | true/false |
| `originalUrl` | Link to the actual source article |

---

## Current Design Language (for Reference / Redesign Baseline)

### Color palette
| Name | Use |
|---|---|
| Electric Cyan | Primary: buttons, active states, glows, links |
| Vivid Purple | Secondary: category highlights, decorative |
| Neon Green | Live indicator dot, accent |
| Coral/Orange-Red | Flame/engagement score, rank #3, hot badge |
| Gold | Rank #1 badge, star elements |

### Typography
- **Body font:** Inter (sans-serif) — used for all text
- **Monospace font:** JetBrains Mono — used for timestamps, counts, code in How To guides

### Cards
- All cards use a "glassmorphism" style: semi-transparent dark background, blurred backdrop, thin border
- Large border radius (24px / 1.5rem)
- Rank badge and engagement score float slightly **outside** the card boundary (this is intentional)

### Animations (every element animates)
- Page load: everything fades up from below (staggered)
- Cards: scale up very slightly on hover (1.01x)
- Buttons: scale slightly on click (spring physics)
- Filters: instant color change + glow on active
- Scroll progress: spring-physics fill
- How To cards: expand/collapse with smooth height animation
- Live indicator dot: continuous breathing pulse + expanding ring
- Logo icon: continuous gentle rocking
- Footer sources: infinite horizontal scroll ticker

---

## What Does NOT Exist Yet (Opportunities for Redesign)

- No user accounts or login
- Bookmarks are not saved (lost on page refresh)
- Share button does nothing yet
- Newsletter subscription is visual only (no backend)
- Social links are placeholder `#` hrefs
- No individual article detail/modal page
- No notifications or push alerts
- No mobile app

---

## Summary: User Journey

1. User lands on page → hero section loads with animation
2. Live badge + auto-refresh timer visible immediately — conveys credibility
3. Stats bar reinforces trust (50 sources, 24/7, 30-min refresh)
4. User can immediately search via the search bar or `Ctrl+K`
5. User can filter by category and sort order
6. User scrolls through ranked article cards, reading punchy summaries and key insights
7. User clicks "Read Original" to go to the source in a new tab
8. Scrolling continues, more articles auto-load
9. At the bottom, user finds How To guides if they want to run AI tools locally
10. Footer newsletter CTA for daily email digest
