import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExternalLink, ArrowLeft, Sparkles } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { getMockArticles } from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import type { Article } from '@/types'

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const { prisma } = await import('@/lib/prisma')
    const a = await prisma.article.findUnique({
      where: { slug },
      include: { source: true },
    })
    if (!a) return null
    return { ...a, tags: a.tags ?? [], keyInsights: a.keyInsights ?? [] } as unknown as Article
  } catch {
    return getMockArticles().find(a => a.slug === slug) ?? null
  }
}

async function getRelated(article: Article): Promise<Article[]> {
  try {
    const { prisma } = await import('@/lib/prisma')
    const related = await prisma.article.findMany({
      where: { category: article.category, slug: { not: article.slug } },
      include: { source: true },
      orderBy: { trendingScore: 'desc' },
      take: 4,
    })
    return related as unknown as Article[]
  } catch {
    return getMockArticles()
      .filter(a => a.category === article.category && a.slug !== article.slug)
      .slice(0, 4)
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.metaTitle ?? article.punchyTitle ?? article.title,
    description: article.metaDescription ?? article.tldr ?? article.summary ?? '',
    openGraph: {
      title: article.punchyTitle ?? article.title,
      description: article.tldr ?? article.summary ?? '',
      type: 'article',
      publishedTime: new Date(article.publishedAt).toISOString(),
      authors: [article.author ?? article.source.name],
    },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const related = await getRelated(article)

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="page-body">
        <div className="shell" style={{ maxWidth: 860 }}>
          {/* Back */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ink-3)', textDecoration: 'none', fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', marginBottom: '1.5rem' }}>
            <ArrowLeft size={12} /> Back to feed
          </Link>

          {/* Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', padding: '0.2rem 0.65rem', borderRadius: 99, background: 'var(--bg-inset)', color: 'var(--ink-3)' }}>
                {article.category.toUpperCase()}
              </span>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-4)' }}>{article.source.name}</span>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-4)' }}>{timeAgo(article.publishedAt)}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
              {article.punchyTitle ?? article.title}
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              {article.punchySummary ?? article.summary}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={article.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.25rem', borderRadius: 99, background: 'var(--ink)', color: 'var(--bg)', textDecoration: 'none', fontFamily: 'Geist Mono, monospace', fontSize: '0.8rem', fontWeight: 500 }}
              >
                Read original <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* AI Insight Panel */}
          <div className="ai-panel" style={{ marginBottom: '2rem' }}>
            <div className="ai-panel-label">
              <Sparkles size={11} />
              AI Intelligence Analysis
            </div>

            {article.tldr && (
              <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--hairline)' }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)', marginBottom: '0.4rem' }}>TLDR</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 500, lineHeight: 1.5 }}>{article.tldr}</p>
              </div>
            )}

            {article.keyInsights.length > 0 && (
              <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--hairline)' }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)', marginBottom: '0.75rem' }}>Key Insights</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {article.keyInsights.map((insight, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--accent)', fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', fontWeight: 600, marginTop: '0.1rem', flexShrink: 0 }}>0{i + 1}</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {article.whyItMatters && (
                <div>
                  <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)', marginBottom: '0.35rem' }}>Why It Matters</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{article.whyItMatters}</p>
                </div>
              )}
              {article.developerImpact && (
                <div>
                  <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '0.35rem' }}>Developer Impact</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{article.developerImpact}</p>
                </div>
              )}
              {article.businessImpact && (
                <div>
                  <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: '0.35rem' }}>Business Impact</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.55 }}>{article.businessImpact}</p>
                </div>
              )}
            </div>
          </div>

          {/* Power quote */}
          {article.powerQuote && (
            <blockquote className="power-quote" style={{ margin: '1.5rem 0 2rem' }}>
              "{article.powerQuote}"
            </blockquote>
          )}

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {article.tags.map(tag => (
              <Link key={tag} href={`/tag/${tag}`} style={{ padding: '0.25rem 0.75rem', borderRadius: 99, background: 'var(--bg-inset)', border: '1px solid var(--hairline)', fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-3)', textDecoration: 'none' }}>
                #{tag}
              </Link>
            ))}
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h2 style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)', marginBottom: '1.25rem' }}>Related Stories</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {related.map(r => (
                  <Link key={r.id} href={`/article/${r.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1rem', borderRadius: 'var(--radius)', background: 'var(--bg-elev)', border: '1px solid var(--hairline)', textDecoration: 'none', transition: 'border-color 0.15s' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.35 }}>{r.punchyTitle ?? r.title}</div>
                      <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', color: 'var(--ink-4)', marginTop: '0.2rem' }}>{r.source.name} · {timeAgo(r.publishedAt)}</div>
                    </div>
                    <ExternalLink size={12} style={{ color: 'var(--ink-4)', flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
