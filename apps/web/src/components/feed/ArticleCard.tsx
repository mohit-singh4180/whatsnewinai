'use client'
import Link from 'next/link'
import { ExternalLink, TrendingUp, Flame, Sparkles } from 'lucide-react'
import { timeAgo, scoreColor } from '@/lib/utils'
import type { Article } from '@/types'

function ImpactBadge({ score }: { score: number }) {
  const color = scoreColor(score)
  return (
    <span className="impact-badge" style={{ color, borderColor: `color-mix(in oklch, ${color} 40%, transparent)` }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, display: 'inline-block' }} />
      {score.toFixed(0)}
    </span>
  )
}

function Flags({ article }: { article: Article }) {
  return (
    <span style={{ display: 'inline-flex', gap: '0.35rem', alignItems: 'center' }}>
      {article.isNew && <span className="flag flag-new">NEW</span>}
      {article.isHot && <span className="flag flag-hot">HOT</span>}
      {article.isTrending && !article.isHot && <span className="flag flag-trending">TRENDING</span>}
    </span>
  )
}

export function FeaturedCard({ article }: { article: Article }) {
  return (
    <article className="feat">
      {/* Rank column */}
      <div>
        <span className={`rank ${article.isHot ? 'hot' : article.isTrending ? 'trending' : ''}`}>01</span>
      </div>

      {/* Main content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <Flags article={article} />
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-4)' }}>
            {article.source.name}
          </span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-4)' }}>
            {timeAgo(article.publishedAt)}
          </span>
          <ImpactBadge score={article.impactScore} />
        </div>

        <Link href={`/article/${article.slug}`} style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, lineHeight: 1.2, color: 'var(--ink)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            {article.punchyTitle ?? article.title}
          </h1>
        </Link>

        <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '1rem', maxWidth: '60ch' }}>
          {article.punchySummary ?? article.summary}
        </p>

        {article.powerQuote && (
          <blockquote className="power-quote">"{article.powerQuote}"</blockquote>
        )}

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Link
            href={`/article/${article.slug}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1.1rem', borderRadius: 99, background: 'var(--ink)', color: 'var(--bg)', textDecoration: 'none', fontSize: '0.8rem', fontFamily: 'Geist Mono, monospace', fontWeight: 500 }}
          >
            Read analysis →
          </Link>
          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--ink-3)', textDecoration: 'none', fontFamily: 'Geist Mono, monospace' }}
          >
            Source <ExternalLink size={11} />
          </a>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {article.tags.slice(0, 3).map(tag => (
              <Link key={tag} href={`/tag/${tag}`} style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', color: 'var(--accent)', textDecoration: 'none' }}>#{tag}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Aside — key insights */}
      <aside className="feat-aside">
        <div className="ai-panel" style={{ position: 'sticky', top: 80 }}>
          <div className="ai-panel-label">
            <Sparkles size={11} />
            Key Insights
          </div>
          {article.keyInsights.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {article.keyInsights.slice(0, 4).map((insight, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', marginTop: '0.15rem', flexShrink: 0 }}>0{i + 1}</span>
                  {insight}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)' }}>
              {article.tldr ?? 'Analysis available in full article.'}
            </p>
          )}
          {article.whyItMatters && (
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--hairline)' }}>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-4)', marginBottom: '0.4rem' }}>Why it matters</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{article.whyItMatters}</p>
            </div>
          )}
        </div>
      </aside>
    </article>
  )
}

export default function ArticleCard({ article, rank }: { article: Article; rank: number }) {
  return (
    <article className="row">
      {/* Rank */}
      <div>
        <span className={`rank${article.isHot ? ' hot' : article.isTrending ? ' trending' : ''}`}>
          {String(rank).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
          <Flags article={article} />
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', color: 'var(--ink-4)' }}>{article.source.name}</span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', color: 'var(--ink-4)' }}>·</span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', color: 'var(--ink-4)' }}>{timeAgo(article.publishedAt)}</span>
        </div>

        <Link href={`/article/${article.slug}`} style={{ textDecoration: 'none' }}>
          <h2 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: '0.35rem', letterSpacing: '-0.01em' }}>
            {article.punchyTitle ?? article.title}
          </h2>
        </Link>

        <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {article.punchySummary ?? article.summary}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          {article.tags.slice(0, 3).map(tag => (
            <Link key={tag} href={`/tag/${tag}`} style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: 'var(--ink-4)', textDecoration: 'none' }}>#{tag}</Link>
          ))}
        </div>
      </div>

      {/* Metrics sidebar */}
      <div className="row-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', paddingTop: '0.2rem' }}>
        <ImpactBadge score={article.impactScore} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
          {article.isTrending && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: 'var(--accent)' }}>
              <TrendingUp size={10} /> trending
            </span>
          )}
          {article.isHot && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: 'var(--coral)' }}>
              <Flame size={10} /> hot
            </span>
          )}
        </div>
        <a
          href={article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: 'var(--ink-4)', textDecoration: 'none' }}
        >
          source <ExternalLink size={10} />
        </a>
      </div>
    </article>
  )
}
