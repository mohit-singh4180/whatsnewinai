import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ArticleCard from '@/components/feed/ArticleCard'
import { getMockArticles } from '@/lib/mock-data'
import type { Article } from '@/types'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `#${params.slug} — AI Pulse`,
    description: `AI news tagged with #${params.slug}`,
  }
}

async function getByTag(tag: string): Promise<Article[]> {
  try {
    const { prisma } = await import('@/lib/prisma')
    const articles = await prisma.article.findMany({
      where: { tags: { has: tag } },
      include: { source: true },
      orderBy: { trendingScore: 'desc' },
      take: 50,
    })
    return articles as unknown as Article[]
  } catch {
    return getMockArticles().filter(a => a.tags.includes(tag))
  }
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const articles = await getByTag(params.slug)

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="page-body">
        <div className="shell">
          <div style={{ paddingTop: '1rem', paddingBottom: '0.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600 }}>TAG</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
              #{params.slug}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)' }}>
              {articles.length} article{articles.length !== 1 ? 's' : ''} tagged with #{params.slug}
            </p>
          </div>

          {articles.length === 0 ? (
            <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--ink-4)', fontFamily: 'Geist Mono, monospace', fontSize: '0.85rem' }}>
              No articles found for #{params.slug}
            </div>
          ) : (
            <div style={{ paddingTop: '0.5rem' }}>
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article} rank={i + 1} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
