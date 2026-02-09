

# Client-Side Implementation Plan: UI Fixes & Static "How To" Section

## Overview

This plan addresses your requirements while keeping everything client-side (no backend):

1. Fix card border styling (smooth, rounded corners)
2. Fix the auto-refresh mechanism (currently only updates timestamp, not visual feedback)
3. Update mock article URLs to use verified working links
4. Add a static "How To" section for AI tool setup guides
5. Ensure all filters work correctly

---

## What Will Be Fixed

### 1. Card Border Styling Issues

**Problem**: The `glass-card` class uses `overflow-hidden` which can cause visual clipping issues when elements are positioned outside the card boundaries (like the rank badge at `-top-3 -left-3`).

**Solution**:
- Remove `overflow-hidden` from `.glass-card` 
- Add explicit `overflow-visible` to allow badges to render properly
- Increase padding to accommodate internal spacing
- Add smooth `border-radius` with proper layering

```text
Before: Cards with clipped corners, badges cut off
After:  Smooth rounded corners, badges fully visible
```

### 2. Auto-Refresh Visual Feedback

**Problem**: The current 30-second interval only updates `lastUpdated` timestamp but provides no user feedback.

**Solution**:
- Add a toast notification when refresh occurs
- Add subtle animation to indicate fresh content
- Update the refresh interval display in UI

### 3. Mock Article URLs

**Problem**: Some links may not work as they point to category pages rather than specific articles.

**Solution**:
- Review and update all 50 article URLs to point to verified, stable pages
- Focus on official documentation, blog homepages, and announcement pages that won't change frequently
- Add fallback behavior in UI for broken links (opens source homepage instead)

### 4. Static "How To" Section

**New Feature**: Add a dedicated section with curated AI tool setup guides:

```text
+------------------------------------------+
|  HOW TO: AI TOOLS SETUP GUIDES           |
+------------------------------------------+
|                                          |
|  [Ollama]  [LM Studio]  [ComfyUI]       |
|  [Automatic1111]  [Claude CLI]  [...]   |
|                                          |
|  Each card contains:                     |
|  - Tool name & description               |
|  - Prerequisites                         |
|  - Step-by-step installation             |
|  - Configuration tips                    |
|  - Useful links                          |
+------------------------------------------+
```

Tools to include:
- **Ollama** - Local LLM runner
- **LM Studio** - Desktop app for local models
- **ComfyUI** - Node-based Stable Diffusion UI
- **Automatic1111** - Popular SD WebUI
- **Open Interpreter** - AI-powered CLI
- **LocalAI** - Local OpenAI-compatible API
- **Text Generation WebUI** - Gradio-based LLM interface
- **GPT4All** - Offline chatbot

### 5. Filter Functionality

The filters already work correctly in the current implementation. Will verify and ensure:
- Category filters (ML, NLP, CV, Robotics, Research, Industry)
- Sort filters (Trending, Latest, Top)
- Search functionality
- Proper rank re-ordering when filters change

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/index.css` | Modify | Fix `.glass-card` border styling |
| `src/components/ArticleCard.tsx` | Modify | Adjust positioning for smoother borders |
| `src/data/mockArticles.ts` | Modify | Update URLs to verified working links |
| `src/data/howToGuides.ts` | Create | Static data for setup guides |
| `src/components/HowToSection.tsx` | Create | Display setup guides |
| `src/components/HowToCard.tsx` | Create | Individual guide card component |
| `src/pages/Index.tsx` | Modify | Add HowToSection, improve refresh feedback |
| `src/components/ui/sonner.tsx` | Already exists | Used for toast notifications |

---

## Technical Details

### Border Fix CSS Changes

```css
.glass-card {
  position: relative;
  overflow: visible; /* Changed from hidden */
  border-radius: 1.5rem; /* 24px for smoother curves */
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-card);
}
```

### HowToGuide Data Structure

```typescript
interface HowToGuide {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToComplete: string;
  prerequisites: string[];
  steps: { title: string; description: string }[];
  links: { label: string; url: string }[];
  tags: string[];
}
```

### Refresh Notification

```typescript
// When refresh occurs
toast.success('Content refreshed!', {
  description: 'Latest AI news loaded',
  icon: '🔄'
});
```

---

## Implementation Order

1. **Fix card borders** - CSS changes to `index.css` and minor adjustments to `ArticleCard.tsx`
2. **Update mock URLs** - Review and fix all 50 article links in `mockArticles.ts`
3. **Add refresh feedback** - Toast notification in `Index.tsx`
4. **Create How To section** - New data file, components, and integration

---

## What Won't Change (Client-Side Limitations)

Since we're keeping this client-side only:
- **No real-time scraping** - Will continue using mock/static data
- **No link validation** - Cannot check if external URLs are valid (CORS blocks this)
- **No dynamic content** - How To guides will be static, manually curated content

The mock data will be kept high-quality with verified URLs, and the UI will be polished for the best possible experience.

