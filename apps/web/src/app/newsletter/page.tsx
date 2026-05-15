'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ScrollProgress'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="page-body">
        <div className="shell" style={{ maxWidth: 540, paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.5rem' }}>⚡</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: '0.75rem' }}>Daily AI Digest</h1>
            <p style={{ color: 'var(--ink-3)', lineHeight: 1.65, fontSize: '0.95rem' }}>
              The top 5 AI stories, insights, and breakthroughs — delivered every morning. No noise. No spam. Just signal.
            </p>
          </div>

          {status === 'done' ? (
            <div className="ai-panel" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✓</div>
              <p style={{ color: 'var(--ink-2)', fontWeight: 500 }}>You're subscribed.</p>
              <p style={{ color: 'var(--ink-3)', fontSize: '0.82rem', marginTop: '0.35rem' }}>First digest arrives tomorrow morning.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ flex: 1, padding: '0.65rem 1rem', borderRadius: 99, border: '1px solid var(--hairline)', background: 'var(--bg-inset)', color: 'var(--ink)', fontSize: '0.9rem', outline: 'none', fontFamily: 'Geist, sans-serif' }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{ padding: '0.65rem 1.5rem', borderRadius: 99, background: 'var(--accent)', color: 'white', border: 'none', fontFamily: 'Geist Mono, monospace', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p style={{ color: 'var(--coral)', fontSize: '0.82rem', textAlign: 'center', marginTop: '0.75rem', fontFamily: 'Geist Mono, monospace' }}>
              Something went wrong. Try again.
            </p>
          )}

          <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[['5', 'Top stories daily'], ['0', 'No spam, ever'], ['∞', 'AI intelligence']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center', padding: '1rem', background: 'var(--bg-elev)', borderRadius: 'var(--radius)', border: '1px solid var(--hairline)' }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.25rem' }}>{num}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
