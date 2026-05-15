'use client'
import { useEffect, useState, useRef } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Article } from '@/types'

interface Props {
  open: boolean
  onClose: () => void
  articles: Article[]
}

export default function CommandPalette({ open, onClose, articles }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open ? onClose() : null }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [open, onClose])

  const results = query.trim()
    ? articles.filter(a =>
        (a.punchyTitle ?? a.title).toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        a.source.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : articles.filter(a => a.isTrending || a.isHot).slice(0, 6)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [open, results.length])

  if (!open) return null

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh', background: 'oklch(0 0 0 / 0.4)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ width: '100%', maxWidth: 640, margin: '0 1rem', background: 'var(--bg-panel)', border: '1px solid var(--hairline-strong)', borderRadius: 'calc(var(--radius) * 1.5)', overflow: 'hidden', boxShadow: '0 20px 60px -10px oklch(0 0 0 / 0.3)' }}>
        {/* Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1.25rem', borderBottom: '1px solid var(--hairline)' }}>
          <Search size={16} style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0) }}
            placeholder="Search AI news, models, companies..."
            style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: '0.95rem', color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}
          />
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-4)', display: 'flex' }}>
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {!query && (
            <div style={{ padding: '0.5rem 1.25rem 0.25rem', fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)' }}>
              Trending
            </div>
          )}
          {results.map((article, i) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', textDecoration: 'none', background: i === selected ? 'var(--bg-inset)' : 'transparent', transition: 'background 0.1s' }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.88rem', color: 'var(--ink)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {article.punchyTitle ?? article.title}
                </div>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', color: 'var(--ink-4)', marginTop: '0.15rem' }}>
                  {article.source.name} · {article.category}
                </div>
              </div>
              <ArrowRight size={13} style={{ color: 'var(--ink-4)', flexShrink: 0 }} />
            </Link>
          ))}
          {results.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--ink-3)' }}>
              No results for "{query}"
            </div>
          )}
        </div>

        <div style={{ padding: '0.6rem 1.25rem', borderTop: '1px solid var(--hairline)', display: 'flex', gap: '1rem', fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: 'var(--ink-4)' }}>
          <span>↑↓ navigate</span><span>↵ open</span><span>esc close</span>
        </div>
      </div>
    </div>
  )
}
