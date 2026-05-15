import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateArticleAI(title: string, text: string) {
  const { SUMMARIZE_PROMPT } = await import('./prompts')
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: SUMMARIZE_PROMPT(title, text) }],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  })
  return JSON.parse(res.choices[0].message.content ?? '{}')
}

export async function generateImpactScore(title: string, summary: string, source: string) {
  const { IMPACT_SCORE_PROMPT } = await import('./prompts')
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: IMPACT_SCORE_PROMPT(title, summary, source) }],
    temperature: 0.1,
    response_format: { type: 'json_object' },
  })
  return JSON.parse(res.choices[0].message.content ?? '{"impactScore":50,"isHot":false,"isTrending":false}')
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.slice(0, 8000),
  })
  return res.data[0].embedding
}
