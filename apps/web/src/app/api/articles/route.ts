import { NextRequest, NextResponse } from 'next/server'
import { getOrSet } from '@/lib/redis'
import { getMockArticles } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const category = searchParams.get('category') ?? 'all'
  const sort = searchParams.get('sort') ?? 'trending'
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 50)
  const skip = (page - 1) * limit

  const cacheKey = `feed:${category}:${sort}:${page}`

  const data = await getOrSet(cacheKey, 300, async () => {
    try {
      const { prisma } = await import('@/lib/prisma')
      const where = category !== 'all' ? { category } : {}
      const orderBy = sort === 'latest' ? { publishedAt: 'desc' as const } : sort === 'impact' ? { impactScore: 'desc' as const } : { trendingScore: 'desc' as const }

      const [articles, total] = await Promise.all([
        prisma.article.findMany({ where, orderBy, skip, take: limit, include: { source: true } }),
        prisma.article.count({ where }),
      ])

      return { articles, total, page, limit }
    } catch {
      const all = getMockArticles()
      const filtered = category !== 'all' ? all.filter(a => a.category === category) : all
      return { articles: filtered.slice(skip, skip + limit), total: filtered.length, page, limit }
    }
  })

  return NextResponse.json(data)
}
