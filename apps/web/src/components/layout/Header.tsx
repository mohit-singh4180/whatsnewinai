'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, Moon, Search } from 'lucide-react'
import { useTheme } from '@/components/ThemeScript'
import CommandPalette from '@/components/feed/CommandPalette'
import { getMockArticles } from '@/lib/mock-data'
import type { Article } from '@/types'

const NAV = [
  { href: '/', label: 'Feed' },
  { href: '/category/ml', label: 'Models' },
  { href: '/category/research', label: 'Research' },
  { href: '/category/agents', label: 'Agents' },
]

export default function Header() {
  const [compact, setCompact] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const { theme, toggle } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setCompact(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Global Cmd+K
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

  // Load articles for search
  useEffect(() => {
    fetch('/api/articles?limit=50')
      .then(r => r.json())
      .then(d => setArticles(d.articles ?? []))
      .catch(() => setArticles(getMockArticles()))
  }, [])

  return (
    <>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} articles={articles} />

      <div className="hdr-wrap">
        <nav className={`hdr${compact ? ' compact' : ''}`}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-flex' }}>
              <span className="ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--coral)', opacity: 0.6 }} />
              <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)', display: 'block' }} />
            </span>
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>AI PULSE</span>
          </Link>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', marginLeft: '1.25rem' }}>
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 99,
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  color: pathname === href ? 'var(--ink)' : 'var(--ink-3)',
                  background: pathname === href ? 'var(--bg-inset)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'color 0.15s, background 0.15s',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
            <button
              onClick={() => setPaletteOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.3rem 0.75rem', borderRadius: 99,
                background: 'var(--bg-inset)', border: 'none', cursor: 'pointer',
                fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: 'var(--ink-3)',
              }}
            >
              <Search size={12} />
              <span>Search</span>
              <kbd style={{ fontSize: '0.65rem', opacity: 0.6 }}>⌘K</kbd>
            </button>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--bg-inset)', color: 'var(--ink-3)',
              }}
            >
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}
