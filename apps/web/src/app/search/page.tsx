'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ArticleCard from '@/components/feed/ArticleCard'
import { getMockArticles } from '@/lib/mock-data'
import { Search } from 'lucide-react'
import type { Article } from '@/types'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SearchContent() {
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [results, setResults] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    setLoading(true)
    const timer = setTimeout(() => {
      const all = getMockArticles()
      const q = query.toLowerCase()
      const found = all.filter(a =>
        (a.punchyTitle ?? a.title).toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.source.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.punchySummary ?? a.summary ?? '').toLowerCase().includes(q)
      )
      setResults(found)
      setLoading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <>
      <div style={{ padding: '1rem 0 0.5rem', marginBottom: '0.5rem' }}>
        <div style={{ position: 'relative', maxWidth: 600 }}>
          <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)' }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search AI news, models, companies..."
            autoFocus
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: 99, border: '1px solid var(--hairline)', background: 'var(--bg-elev)', color: 'var(--ink)', fontSize: '0.95rem', outline: 'none', fontFamily: 'Geist, sans-serif' }}
          />
        </div>
      </div>

      {loading && (
        <div style={{ padding: '2rem 0', color: 'var(--ink-4)', fontFamily: 'Geist Mono, monospace', fontSize: '0.82rem' }}>Searching...</div>
      )}

      {!loading && query && results.length === 0 && (
        <div style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--ink-3)', fontFamily: 'Geist Mono, monospace', fontSize: '0.85rem' }}>
          No results for &ldquo;{query}&rdquo;
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-4)', padding: '0.75rem 0', borderBottom: '1px solid var(--hairline)' }}>
            {results.length} results for &ldquo;{query}&rdquo;
          </div>
          {results.map((article, i) => (
            <ArticleCard key={article.id} article={article} rank={i + 1} />
          ))}
        </>
      )}

      {!query && (
        <div style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--ink-4)', fontFamily: 'Geist Mono, monospace', fontSize: '0.82rem' }}>
          Type to search across all AI news
        </div>
      )}
    </>
  )
}

export default function SearchPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="page-body">
        <div className="shell">
          <Suspense fallback={null}>
            <SearchContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
