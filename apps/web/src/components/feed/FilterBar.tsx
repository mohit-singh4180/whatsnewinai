'use client'
import { useRef, useEffect, useState } from 'react'
import { CATEGORIES, type Category, type SortOption } from '@/types'

interface Props {
  category: Category
  sort: SortOption
  onCategory: (c: Category) => void
  onSort: (s: SortOption) => void
}

const SORTS: { value: SortOption; label: string }[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'latest', label: 'Latest' },
  { value: 'impact', label: 'Impact' },
]

export default function FilterBar({ category, sort, onCategory, onSort }: Props) {
  const segRef = useRef<HTMLDivElement>(null)
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const seg = segRef.current
    if (!seg) return
    const active = seg.querySelector('.seg-btn.active') as HTMLElement | null
    if (active) {
      const segRect = seg.getBoundingClientRect()
      const btnRect = active.getBoundingClientRect()
      setPillStyle({ left: btnRect.left - segRect.left, width: btnRect.width })
    }
  }, [sort])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', padding: '1.25rem 0', borderBottom: '1px solid var(--hairline)' }}>
      {/* Sort control */}
      <div className="seg" ref={segRef}>
        <div className="seg-pill" style={{ left: pillStyle.left, width: pillStyle.width, top: 3, height: 'calc(100% - 6px)' }} />
        {SORTS.map(({ value, label }) => (
          <button
            key={value}
            className={`seg-btn${sort === value ? ' active' : ''}`}
            onClick={() => onSort(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Category chips */}
      <div className="chips-wrap">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            className={`chip${category === value ? ' active' : ''}`}
            onClick={() => onCategory(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
