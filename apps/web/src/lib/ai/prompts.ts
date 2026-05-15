export const SUMMARIZE_PROMPT = (title: string, text: string) => `
You are an AI news editor. Given this article, generate:
1. punchyTitle: A compelling, short title (under 70 chars). Be specific, not clickbait.
2. punchySummary: 2-3 sentence summary. Original language, no copying source text.
3. tldr: Single sentence. Start with the key fact.
4. keyInsights: Array of 3-4 specific, actionable insights (strings).
5. powerQuote: Most quotable sentence from the insights (or null).
6. whyItMatters: 1-2 sentences explaining the broader significance.
7. developerImpact: 1 sentence on what this means for developers (or null).
8. businessImpact: 1 sentence on business/enterprise implications (or null).

Title: ${title}
Content: ${text.slice(0, 3000)}

Respond with valid JSON only. No markdown wrapper.`

export const IMPACT_SCORE_PROMPT = (title: string, summary: string, source: string) => `
Score this AI news article's importance from 0-100.
Consider: novelty, industry impact breadth, recency signals, source authority.

Title: ${title}
Summary: ${summary}
Source: ${source}

Respond: {"impactScore": number, "isHot": boolean, "isTrending": boolean}
isHot = score > 85, isTrending = score > 65

JSON only.`

export const SEO_META_PROMPT = (title: string, summary: string) => `
Generate SEO metadata for this AI news article.
- metaTitle: 50-60 chars, include primary keyword
- metaDescription: 140-160 chars, compelling, includes CTA

Title: ${title}
Summary: ${summary}

JSON only: {"metaTitle": "...", "metaDescription": "..."}`
