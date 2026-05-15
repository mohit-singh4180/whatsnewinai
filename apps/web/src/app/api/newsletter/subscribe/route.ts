import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email } = schema.parse(body)

  try {
    const { prisma } = await import('@/lib/prisma')
    await prisma.subscriber.upsert({
      where: { email },
      create: { email },
      update: {},
    })
  } catch {
    // Fallback: if DB unavailable, still return success
    console.log(`Newsletter signup: ${email}`)
  }

  return NextResponse.json({ ok: true })
}
