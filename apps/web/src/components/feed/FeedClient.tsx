'use client'
import { useState, useMemo, useEffect } from 'react'
import FilterBar from './FilterBar'
import TrendingRail from './TrendingRail'
import { FeaturedCard } from './ArticleCard'
import ArticleCard from './ArticleCard'
import CommandPalette from './CommandPalette'
import type { Article, Category, SortOption } from '@/types'

interface Props {
  articles: Article[]
  defaultCategory?: Category
}

export default function FeedClient({ articles, defaultCategory = 'all' }: Props) {
  const [category, setCategory] = useState<Category>(defaultCategory)
  const [sort, setSort] = useState<SortOption>('trending')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [shown, setShown] = useState(20)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(p => !p)
      }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const filtered = useMemo(() => {
    let result = category === 'all' ? articles : articles.filter(a => a.category === category)
    if (sort === 'trending') result = [...result].sort((a, b) => b.trendingScore - a.trendingScore)
    else if (sort === 'latest') result = [...result].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    else if (sort === 'impact') result = [...result].sort((a, b) => b.impactScore - a.impactScore)
    return result
  }, [articles, category, sort])

  const visible = filtered.slice(0, shown)
  const featured = visible[0]
  const rest = visible.slice(1)

  return (
    <>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} articles={articles} />
      <TrendingRail />
      <FilterBar category={category} sort={sort} onCategory={(c) => { setCategory(c); setShown(20) }} onSort={setSort} />

      {featured && <FeaturedCard article={featured} />}

      <div style={{ paddingTop: '0.5rem' }}>
        {rest.map((article, i) => (
          <ArticleCard key={article.id} article={article} rank={i + 2} />
        ))}
      </div>

      {shown < filtered.length && (
        <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
          <button
            onClick={() => setShown(s => s + 20)}
            style={{ padding: '0.6rem 2rem', borderRadius: 99, border: '1px solid var(--hairline)', background: 'var(--bg-elev)', color: 'var(--ink-2)', fontFamily: 'Geist Mono, monospace', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            Load more ({filtered.length - shown} remaining)
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--ink-3)', fontFamily: 'Geist Mono, monospace', fontSize: '0.85rem' }}>
          No articles in this category yet.
        </div>
      )}
    </>
  )
}
