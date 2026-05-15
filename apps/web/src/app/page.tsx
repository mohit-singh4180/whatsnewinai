import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import FeedClient from '@/components/feed/FeedClient'
import { getMockArticles } from '@/lib/mock-data'

export const revalidate = 300 // 5 min ISR

async function getArticles() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const articles = await prisma.article.findMany({
      include: { source: true },
      orderBy: { trendingScore: 'desc' },
      take: 50,
    })
    return articles.map(a => ({
      ...a,
      tags: a.tags ?? [],
      keyInsights: a.keyInsights ?? [],
    }))
  } catch {
    // Fallback to mock data if DB not available
    return getMockArticles()
  }
}

export default async function HomePage() {
  const articles = await getArticles()

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="page-body">
        <div className="shell">
          {/* Hero headline */}
          <div style={{ paddingTop: '1rem', paddingBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                AI Intelligence Feed
              </h1>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-4)' }}>
                {articles.length} stories
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)' }}>
              Real-time coverage of AI models, research, startups, and industry.
            </p>
          </div>

          <Suspense fallback={<FeedSkeleton />}>
            <FeedClient articles={articles as any} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}

function FeedSkeleton() {
  return (
    <div style={{ padding: '2rem 0' }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ height: 80, background: 'var(--bg-elev)', borderRadius: 8, marginBottom: '1rem', opacity: 1 - i * 0.15 }} />
      ))}
    </div>
  )
}
