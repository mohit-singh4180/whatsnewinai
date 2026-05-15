import Link from 'next/link'

const SOURCES = ['OpenAI', 'Anthropic', 'DeepMind', 'Meta AI', 'NVIDIA', 'Hugging Face', 'TechCrunch AI', 'VentureBeat', 'MIT Tech Review', 'The Verge', 'arXiv', 'Google Research']

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--hairline)', marginTop: '5rem', background: 'var(--bg-elev)' }}>
      {/* Marquee */}
      <div style={{ borderBottom: '1px solid var(--hairline)', padding: '0.75rem 0', overflow: 'hidden' }}>
        <div className="marquee-track" style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', color: 'var(--ink-4)' }}>
          {[...SOURCES, ...SOURCES].map((s, i) => (
            <span key={i} style={{ flexShrink: 0 }}>
              <span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>◆</span>{s}
            </span>
          ))}
        </div>
      </div>

      <div className="shell" style={{ padding: '2.5rem var(--shell-pad)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)', display: 'block' }} />
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink)' }}>AI PULSE</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', lineHeight: 1.65, maxWidth: 220 }}>
              AI news intelligence. Real-time coverage of models, research, startups, and industry.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)', marginBottom: '0.75rem' }}>Coverage</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { label: 'Models', slug: 'ml' },
                { label: 'Agents', slug: 'agents' },
                { label: 'Research', slug: 'research' },
                { label: 'Industry', slug: 'industry' },
                { label: 'Chips', slug: 'chips' },
                { label: 'Regulation', slug: 'regulation' },
                { label: 'Robotics', slug: 'robotics' },
              ].map(cat => (
                <Link key={cat.slug} href={`/category/${cat.slug}`} style={{ fontSize: '0.82rem', color: 'var(--ink-3)', textDecoration: 'none', cursor: 'pointer' }}>{cat.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-4)', marginBottom: '0.75rem' }}>Daily Digest</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', marginBottom: '0.75rem' }}>AI intelligence delivered daily. No noise.</p>
            <Link href="/newsletter" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: 99, background: 'var(--accent)', color: 'white', textDecoration: 'none', fontSize: '0.8rem', fontFamily: 'Geist Mono, monospace', fontWeight: 500 }}>
              Subscribe →
            </Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-4)' }}>© 2026 AI Pulse</span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-4)' }}>Intelligence, not noise.</span>
        </div>
      </div>
    </footer>
  )
}
