import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { getMockArticles } from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import type { Article } from '@/types'

async function getArticles(): Promise<Article[]> {
  try {
    const { prisma } = await import('@/lib/prisma')
    const articles = await prisma.article.findMany({
      include: { source: true },
      orderBy: { ingestedAt: 'desc' },
      take: 100,
    })
    return articles as unknown as Article[]
  } catch {
    return getMockArticles()
  }
}

export default async function AdminArticlesPage() {
  const articles = await getArticles()

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Articles</h1>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-4)' }}>{articles.length} total</span>
      </div>

      <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-inset)', borderBottom: '1px solid var(--hairline)' }}>
              {['Title', 'Source', 'Category', 'Score', 'Ingested', ''].map(h => (
                <th key={h} style={{ padding: '0.65rem 0.9rem', textAlign: 'left', fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.map((article, i) => (
              <tr key={article.id} style={{ borderTop: i > 0 ? '1px solid var(--hairline)' : 'none', transition: 'background 0.1s' }}>
                <td style={{ padding: '0.65rem 0.9rem', color: 'var(--ink)', maxWidth: 300 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
                    {article.punchyTitle ?? article.title}
                  </div>
                  <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: 'var(--ink-4)', marginTop: '0.15rem' }}>
                    {article.isNew && <span style={{ color: 'var(--accent)', marginRight: '0.35rem' }}>NEW</span>}
                    {article.isHot && <span style={{ color: 'var(--coral)', marginRight: '0.35rem' }}>HOT</span>}
                    /{article.slug}
                  </div>
                </td>
                <td style={{ padding: '0.65rem 0.9rem', color: 'var(--ink-3)', fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>{article.source.name}</td>
                <td style={{ padding: '0.65rem 0.9rem' }}>
                  <span style={{ padding: '0.15rem 0.5rem', borderRadius: 4, background: 'var(--bg-inset)', fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: 'var(--ink-3)' }}>{article.category}</span>
                </td>
                <td style={{ padding: '0.65rem 0.9rem', fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: article.impactScore >= 80 ? 'var(--coral)' : article.impactScore >= 60 ? 'var(--gold)' : 'var(--ink-3)' }}>
                  {article.impactScore.toFixed(0)}
                </td>
                <td style={{ padding: '0.65rem 0.9rem', fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', color: 'var(--ink-4)', whiteSpace: 'nowrap' }}>
                  {timeAgo(article.createdAt)}
                </td>
                <td style={{ padding: '0.65rem 0.9rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link href={`/article/${article.slug}`} style={{ color: 'var(--ink-4)', display: 'flex' }}>
                      <ExternalLink size={13} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
