import Redis from 'ioredis'

const globalForRedis = globalThis as unknown as { redis: Redis }

export const redis = globalForRedis.redis ?? new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
})

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis

export async function getOrSet<T>(key: string, ttlSec: number, fn: () => Promise<T>): Promise<T> {
  try {
    const cached = await redis.get(key)
    if (cached) return JSON.parse(cached) as T
    const data = await fn()
    await redis.setex(key, ttlSec, JSON.stringify(data))
    return data
  } catch {
    return fn()
  }
}
