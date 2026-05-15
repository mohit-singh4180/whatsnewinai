'use client'
import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('pulse-theme') as 'light' | 'dark' | null
    setTheme(stored ?? (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'))
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (next === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('pulse-theme', next)
  }

  return { theme, toggle }
}
