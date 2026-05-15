'use client'
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [p, setP] = useState(0)

  useEffect(() => {
    const fn = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setP(scrollTop / (scrollHeight - clientHeight) || 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 100,
        transformOrigin: 'left', transform: `scaleX(${p})`,
        background: 'var(--accent)', transition: 'transform 0.1s linear',
      }}
    />
  )
}
