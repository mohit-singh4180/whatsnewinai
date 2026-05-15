import Parser from 'rss-parser'
import { slugify } from '@/lib/utils'

const parser = new Parser({
  customFields: {
    item: ['media:content', 'media:thumbnail', 'enclosure'],
  },
})

export interface ParsedItem {
  title: string
  originalUrl: string
  author?: string
  publishedAt: Date
  summary: string
  imageUrl?: string
  slug: string
}

export async function parseFeed(feedUrl: string): Promise<ParsedItem[]> {
  try {
    const feed = await parser.parseURL(feedUrl)
    return feed.items.slice(0, 20).map((item) => ({
      title: item.title ?? 'Untitled',
      originalUrl: item.link ?? '',
      author: item.creator ?? item.author,
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      summary: stripHtml(item.contentSnippet ?? item.summary ?? '').slice(0, 500),
      imageUrl: extractImage(item),
      slug: slugify(item.title ?? `article-${Date.now()}`),
    })).filter((i) => i.originalUrl)
  } catch {
    return []
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function extractImage(item: Record<string, unknown>): string | undefined {
  const mc = item['media:content'] as { $?: { url?: string } } | undefined
  const enc = item['enclosure'] as { url?: string } | undefined
  return mc?.$?.url ?? enc?.url
}
