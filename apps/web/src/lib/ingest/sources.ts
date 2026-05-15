export interface FeedSource {
  name: string
  url: string
  feedUrl: string
  category: string
}

export const RSS_SOURCES: FeedSource[] = [
  { name: 'OpenAI Blog', url: 'https://openai.com', feedUrl: 'https://openai.com/blog/rss.xml', category: 'ml' },
  { name: 'Anthropic', url: 'https://anthropic.com', feedUrl: 'https://www.anthropic.com/news/rss.xml', category: 'ml' },
  { name: 'Google DeepMind', url: 'https://deepmind.google', feedUrl: 'https://deepmind.google/blog/rss/', category: 'research' },
  { name: 'TechCrunch AI', url: 'https://techcrunch.com', feedUrl: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: 'industry' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com', feedUrl: 'https://venturebeat.com/category/ai/feed/', category: 'industry' },
  { name: 'MIT Tech Review', url: 'https://technologyreview.com', feedUrl: 'https://www.technologyreview.com/feed/', category: 'research' },
  { name: 'Hugging Face', url: 'https://huggingface.co', feedUrl: 'https://huggingface.co/blog/feed.xml', category: 'ml' },
  { name: 'The Verge AI', url: 'https://theverge.com', feedUrl: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml', category: 'industry' },
  { name: 'NVIDIA Blog', url: 'https://blogs.nvidia.com', feedUrl: 'https://blogs.nvidia.com/feed/', category: 'industry' },
]
