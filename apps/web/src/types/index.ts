export interface Article {
  id: string
  slug: string
  title: string
  punchyTitle: string | null
  originalUrl: string
  source: { name: string; url: string }
  author: string | null
  publishedAt: Date
  summary: string | null
  punchySummary: string | null
  keyInsights: string[]
  powerQuote: string | null
  tldr: string | null
  whyItMatters: string | null
  developerImpact: string | null
  businessImpact: string | null
  impactScore: number
  metaTitle: string | null
  metaDescription: string | null
  ogImageUrl: string | null
  category: string
  tags: string[]
  trendingScore: number
  isNew: boolean
  isTrending: boolean
  isHot: boolean
  viewCount: number
  shareCount: number
  createdAt: Date
}

export type Category = 'all' | 'ml' | 'nlp' | 'cv' | 'robotics' | 'research' | 'industry' | 'agents' | 'chips' | 'regulation'

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'ml', label: 'Models' },
  { value: 'agents', label: 'Agents' },
  { value: 'industry', label: 'Industry' },
  { value: 'research', label: 'Research' },
  { value: 'chips', label: 'Chips' },
  { value: 'robotics', label: 'Robotics' },
  { value: 'regulation', label: 'Regulation' },
  { value: 'nlp', label: 'NLP' },
]

export type SortOption = 'trending' | 'latest' | 'impact'
