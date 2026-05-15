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
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
