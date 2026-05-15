import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

const DEFAULT_TOPICS = ['GPT-5', 'Claude 4', 'Gemini 2.5', 'AI Agents', 'Open Source LLMs', 'AI Chips', 'Robotics AI', 'Multimodal', 'AI Regulation', 'Agentic RAG']

export default function TrendingRail({ topics = DEFAULT_TOPICS }: { topics?: string[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', overflowX: 'auto', scrollbarWidth: 'none' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', color: 'var(--ink-4)', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        <TrendingUp size={11} /> Trending
      </span>
      {topics.map(topic => (
        <Link
          key={topic}
          href={`/search?q=${encodeURIComponent(topic)}`}
          style={{ flexShrink: 0, padding: '0.25rem 0.75rem', borderRadius: 99, background: 'var(--bg-inset)', border: '1px solid var(--hairline)', fontFamily: 'Geist Mono, monospace', fontSize: '0.72rem', color: 'var(--ink-2)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'border-color 0.15s, color 0.15s' }}
        >
          {topic}
        </Link>
      ))}
    </div>
  )
}
