import Link from 'next/link'
import { LayoutDashboard, Newspaper, Rss, Mail } from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/articles', label: 'Articles', icon: Newspaper },
  { href: '/admin/feeds', label: 'Feeds', icon: Rss },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: 220, borderRight: '1px solid var(--hairline)', padding: '1.5rem 1rem', flexShrink: 0, background: 'var(--bg-elev)' }}>
        <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--hairline)' }}>
          <Link href="/" style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink)', textDecoration: 'none' }}>
            ← AI Pulse
          </Link>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', color: 'var(--ink-4)', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Admin</div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', color: 'var(--ink-2)', transition: 'background 0.15s, color 0.15s' }}
            >
              <Icon size={14} style={{ color: 'var(--ink-4)' }} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
