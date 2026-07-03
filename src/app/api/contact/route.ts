import { NextResponse } from 'next/server'
import { isTelegramConfigured, sendLeadToTelegram } from '@/lib/telegram'

const MAX_NAME = 120
const MAX_PHONE = 80
const MAX_PREFERRED_TIME = 120
const MAX_COMMENT = 2000

type ContactBody = {
  name?: string
  phone?: string
  preferredTime?: string
  comment?: string
  source?: 'section' | 'modal'
}

function trimField(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export async function POST(request: Request) {
  if (!isTelegramConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  let body: ContactBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const name = trimField(body.name, MAX_NAME)
  const phone = trimField(body.phone, MAX_PHONE)
  const preferredTime = trimField(body.preferredTime, MAX_PREFERRED_TIME)
  const comment = trimField(body.comment, MAX_COMMENT)
  const source = body.source === 'modal' ? 'modal' : 'section'

  if (!name || !phone || !preferredTime) {
    return NextResponse.json({ error: 'Name, contact and preferred time are required' }, { status: 400 })
  }

  const sent = await sendLeadToTelegram({ name, phone, preferredTime, comment, source })

  if (!sent) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
