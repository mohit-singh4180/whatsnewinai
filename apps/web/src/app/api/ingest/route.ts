import { NextRequest, NextResponse } from 'next/server'
import { RSS_SOURCES } from '@/lib/ingest/sources'
import { parseFeed } from '@/lib/ingest/rss'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.INGEST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = []

  for (const source of RSS_SOURCES) {
    try {
      const items = await parseFeed(source.feedUrl)
      let added = 0

      const { prisma } = await import('@/lib/prisma')

      // Upsert source
      const dbSource = await prisma.source.upsert({
        where: { name: source.name },
        create: { name: source.name, url: source.url, feedUrl: source.feedUrl },
        update: { lastFetched: new Date() },
      })

      for (const item of items) {
        if (!item.originalUrl) continue

        // Check if exists
        const exists = await prisma.article.findUnique({ where: { originalUrl: item.originalUrl } })
        if (exists) continue

        // Generate unique slug
        let slug = item.slug
        const existing = await prisma.article.findUnique({ where: { slug } })
        if (existing) slug = `${slug}-${Date.now()}`

        // AI enrichment (if AI service available)
        let aiData: Record<string, unknown> = {}
        if (process.env.AI_SERVICE_URL && item.summary) {
          try {
            const { generateArticleAI, generateImpactScore } = await import('@/lib/ai/openai')
            const [content, score] = await Promise.allSettled([
              generateArticleAI(item.title, item.summary),
              generateImpactScore(item.title, item.summary, source.name),
            ])
            if (content.status === 'fulfilled') aiData = { ...aiData, ...content.value }
            if (score.status === 'fulfilled') aiData = { ...aiData, ...score.value }
          } catch {}
        }

        await prisma.article.create({
          data: {
            slug,
            title: item.title,
            punchyTitle: (aiData.punchyTitle as string) ?? null,
            originalUrl: item.originalUrl,
            sourceId: dbSource.id,
            author: item.author,
            publishedAt: item.publishedAt,
            summary: item.summary,
            punchySummary: (aiData.punchySummary as string) ?? null,
            tldr: (aiData.tldr as string) ?? null,
            keyInsights: (aiData.keyInsights as string[]) ?? [],
            powerQuote: (aiData.powerQuote as string) ?? null,
            whyItMatters: (aiData.whyItMatters as string) ?? null,
            developerImpact: (aiData.developerImpact as string) ?? null,
            businessImpact: (aiData.businessImpact as string) ?? null,
            impactScore: (aiData.impactScore as number) ?? 50,
            isHot: (aiData.isHot as boolean) ?? false,
            isTrending: (aiData.isTrending as boolean) ?? false,
            ogImageUrl: item.imageUrl ?? null,
            category: source.category,
            trendingScore: (aiData.impactScore as number) ?? 50,
          },
        })
        added++
      }

      await prisma.ingestLog.create({
        data: { sourceId: dbSource.id, status: 'ok', articlesAdded: added },
      })
      results.push({ source: source.name, added })
    } catch (error) {
      results.push({ source: source.name, error: String(error) })
    }
  }

  // Invalidate Redis cache
  try {
    const { redis } = await import('@/lib/redis')
    const keys = await redis.keys('feed:*')
    if (keys.length) await redis.del(...keys)
  } catch {}

  return NextResponse.json({ ok: true, results })
}
