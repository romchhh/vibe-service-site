import { NextResponse } from 'next/server'
import { deliverConsultationLead, isLeadDeliveryConfigured } from '@/lib/lead-delivery'

const MAX_NAME = 120
const MAX_EMAIL = 120
const MAX_PHONE = 80
const MAX_PREFERRED_TIME = 120
const MAX_COMMENT = 2000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactBody = {
  name?: string
  email?: string
  phone?: string
  preferredTime?: string
  comment?: string
  source?: 'section' | 'modal'
}

function trimField(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function scheduleLeadDelivery(payload: Parameters<typeof deliverConsultationLead>[0]) {
  // Fire-and-forget: respond to the user immediately, write to Bitrix/Sheets in background.
  void deliverConsultationLead(payload)
    .then((result) => {
      if (!result.ok) {
        console.error('[Contact] Background lead delivery failed', {
          bitrix: result.bitrix,
          sheets: result.sheets,
        })
        return
      }

      console.log('[Contact] Background lead delivery ok', {
        leadId: result.leadId,
        bitrix: result.bitrix,
        sheets: result.sheets,
      })
    })
    .catch((error) => {
      console.error('[Contact] Background lead delivery error:', error)
    })
}

export async function POST(request: Request) {
  if (!isLeadDeliveryConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  let body: ContactBody

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const name = trimField(body.name, MAX_NAME)
  const email = trimField(body.email, MAX_EMAIL).toLowerCase()
  const phone = trimField(body.phone, MAX_PHONE)
  const preferredTime = trimField(body.preferredTime, MAX_PREFERRED_TIME)
  const comment = trimField(body.comment, MAX_COMMENT)
  const source = body.source === 'modal' ? 'modal' : 'section'

  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  if (!phone || phone.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ error: 'Phone is required' }, { status: 400 })
  }

  if (!preferredTime) {
    return NextResponse.json({ error: 'Preferred time is required' }, { status: 400 })
  }

  scheduleLeadDelivery({
    name,
    email,
    phone,
    preferredTime,
    comment,
    source,
  })

  return NextResponse.json({ ok: true, queued: true })
}
