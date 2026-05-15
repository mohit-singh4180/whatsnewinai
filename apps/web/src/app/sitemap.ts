import type { MetadataRoute } from 'next'
import { getMockArticles } from '@/lib/mock-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aipulse.c7corp.com'

  let articles: { slug: string; updatedAt: Date }[] = []
  try {
    const { prisma } = await import('@/lib/prisma')
    articles = await prisma.article.findMany({ select: { slug: true, updatedAt: true } })
  } catch {
    articles = getMockArticles().map(a => ({ slug: a.slug, updatedAt: a.createdAt }))
  }

  const articleUrls: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${base}/article/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
    { url: `${base}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...['ml', 'agents', 'research', 'industry', 'chips', 'robotics', 'regulation'].map(cat => ({
      url: `${base}/category/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.7,
    })),
    ...articleUrls,
  ]
}
