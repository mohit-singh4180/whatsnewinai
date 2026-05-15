'use client'
import { useState } from 'react'
import { RSS_SOURCES } from '@/lib/ingest/sources'
import { RefreshCw, CheckCircle } from 'lucide-react'

export default function AdminFeedsPage() {
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<any>(null)

  const triggerIngest = async () => {
    setRunning(true)
    try {
      const secret = prompt('Enter INGEST_SECRET:')
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { Authorization: `Bearer ${secret}` },
      })
      setResult(await res.json())
    } catch (e) {
      setResult({ error: String(e) })
    }
    setRunning(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Feed Sources</h1>
        <button
          onClick={triggerIngest}
          disabled={running}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: 99, background: 'var(--accent)', color: 'white', border: 'none', fontFamily: 'Geist Mono, monospace', fontSize: '0.8rem', cursor: 'pointer', opacity: running ? 0.7 : 1 }}
        >
          <RefreshCw size={13} style={{ animation: running ? 'spin 1s linear infinite' : 'none' }} />
          {running ? 'Running...' : 'Run Ingest'}
        </button>
      </div>

      {result && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-inset)', borderRadius: 'var(--radius)', border: '1px solid var(--hairline)', fontFamily: 'Geist Mono, monospace', fontSize: '0.78rem' }}>
          <pre style={{ margin: 0, color: 'var(--ink-2)', overflow: 'auto' }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {RSS_SOURCES.map(source => (
          <div key={source.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1rem', background: 'var(--bg-elev)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius)' }}>
            <CheckCircle size={14} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink)' }}>{source.name}</div>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.68rem', color: 'var(--ink-4)', marginTop: '0.1rem' }}>{source.feedUrl}</div>
            </div>
            <span style={{ padding: '0.15rem 0.6rem', borderRadius: 4, background: 'var(--bg-inset)', fontFamily: 'Geist Mono, monospace', fontSize: '0.65rem', color: 'var(--ink-3)' }}>
              {source.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
