import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import FeedClient from '@/components/feed/FeedClient'
import { getMockArticles } from '@/lib/mock-data'
import { CATEGORIES } from '@/types'

const VALID_CATS = CATEGORIES.map(c => c.value).filter(v => v !== 'all')

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = CATEGORIES.find(c => c.value === params.slug)
  if (!cat) return { title: 'Not Found' }
  return {
    title: `${cat.label} AI News`,
    description: `Latest ${cat.label} AI news, research, and analysis.`,
  }
}

async function getByCategory(category: string) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const articles = await prisma.article.findMany({
      where: { category },
      include: { source: true },
      orderBy: { trendingScore: 'desc' },
      take: 50,
    })
    return articles as any[]
  } catch {
    return getMockArticles().filter(a => a.category === category)
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  if (!VALID_CATS.includes(params.slug as any)) notFound()
  const cat = CATEGORIES.find(c => c.value === params.slug)!
  const articles = await getByCategory(params.slug)

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="page-body">
        <div className="shell">
          <div style={{ paddingTop: '1rem', paddingBottom: '0.5rem' }}>
            <h1 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
              {cat.label}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)' }}>{articles.length} articles in this category</p>
          </div>
          <FeedClient articles={articles} defaultCategory={params.slug as any} />
        </div>
      </main>
      <Footer />
    </>
  )
}
