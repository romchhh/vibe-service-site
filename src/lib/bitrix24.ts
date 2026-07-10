import { siteConfig } from './site'

const SOURCE_ID = 'WEB'
const SOURCE_DESCRIPTION = 'Lead web B2B — Vibe Services consultation'

export type ConsultationLeadPayload = {
  name: string
  email: string
  phone: string
  preferredTime: string
  comment?: string
  source?: 'section' | 'modal'
}

type BitrixPhone = { VALUE: string; VALUE_TYPE: 'WORK' }
type BitrixEmail = { VALUE: string; VALUE_TYPE: 'WORK' }

function getWebhookBase(): string | null {
  const raw =
    process.env.BITRIX24_WEBHOOK_URL?.trim() ||
    process.env.NEXT_PUBLIC_BITRIX24_WEBHOOK_URL?.trim()

  if (!raw) return null
  return raw.replace(/\/+$/, '')
}

function getAssignedUserId(): number | undefined {
  const raw =
    process.env.BITRIX24_USER_ID?.trim() ||
    process.env.NEXT_PUBLIC_BITRIX24_USER_ID?.trim()

  if (!raw) return undefined
  const id = Number(raw)
  return Number.isFinite(id) && id > 0 ? id : undefined
}

function formatComments(payload: ConsultationLeadPayload): string {
  const sourceLabel =
    payload.source === 'modal'
      ? 'Modal — Book a consultation'
      : 'Contact section — Book a consultation'

  const lines = [
    'Form type: Free consultation — Vibe Services',
    `Source: ${sourceLabel}`,
    `Site: ${siteConfig.url}`,
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Preferred call time: ${payload.preferredTime}`,
  ]

  if (payload.comment?.trim()) {
    lines.push(`Comment: ${payload.comment.trim()}`)
  }

  return lines.join('\n')
}

async function bitrixCall<T>(method: string, params: Record<string, unknown>): Promise<T | null> {
  const base = getWebhookBase()
  if (!base) {
    console.error('[Bitrix24] Webhook URL is not configured')
    return null
  }

  const url = `${base}/${method}.json`
  console.log(`[Bitrix24] Calling: ${method}`)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })

    const data = (await response.json()) as {
      result?: T
      error?: string
      error_description?: string
    }

    if (!response.ok || data.error) {
      console.error(
        `[Bitrix24] ${method} failed:`,
        data.error_description ?? data.error ?? response.status,
      )
      return null
    }

    return data.result ?? null
  } catch (error) {
    console.error(`[Bitrix24] ${method} error:`, error)
    return null
  }
}

async function findContactId(email: string, phone: string): Promise<number | undefined> {
  const byEmail = await bitrixCall<number[] | { ID: string }[]>('crm.contact.list', {
    filter: { EMAIL: email },
    select: ['ID'],
  })

  if (byEmail?.length) {
    const first = byEmail[0]
    const id = typeof first === 'object' && first !== null && 'ID' in first ? Number(first.ID) : Number(first)
    if (Number.isFinite(id)) return id
  }

  const byPhone = await bitrixCall<number[] | { ID: string }[]>('crm.contact.list', {
    filter: { PHONE: phone },
    select: ['ID'],
  })

  if (!byPhone?.length) return undefined

  const first = byPhone[0]
  const id = typeof first === 'object' && first !== null && 'ID' in first ? Number(first.ID) : Number(first)
  return Number.isFinite(id) ? id : undefined
}

async function findCompanyId(email: string, phone: string): Promise<number | undefined> {
  const byEmail = await bitrixCall<number[] | { ID: string }[]>('crm.company.list', {
    filter: { EMAIL: email },
    select: ['ID'],
  })

  if (byEmail?.length) {
    const first = byEmail[0]
    const id = typeof first === 'object' && first !== null && 'ID' in first ? Number(first.ID) : Number(first)
    if (Number.isFinite(id)) return id
  }

  const byPhone = await bitrixCall<number[] | { ID: string }[]>('crm.company.list', {
    filter: { PHONE: phone },
    select: ['ID'],
  })

  if (!byPhone?.length) return undefined

  const first = byPhone[0]
  const id = typeof first === 'object' && first !== null && 'ID' in first ? Number(first.ID) : Number(first)
  return Number.isFinite(id) ? id : undefined
}

async function resolveLeadLinks(
  email: string,
  phone: string,
): Promise<{ contactId?: number; companyId?: number }> {
  const contactId = await findContactId(email, phone)
  if (contactId) return { contactId }

  const companyId = await findCompanyId(email, phone)
  if (companyId) return { companyId }

  return {}
}

export function isBitrixConfigured(): boolean {
  return getWebhookBase() !== null
}

export async function createConsultationLead(
  payload: ConsultationLeadPayload,
): Promise<{ ok: boolean; leadId?: number }> {
  if (!isBitrixConfigured()) {
    return { ok: false }
  }

  const links = await resolveLeadLinks(payload.email, payload.phone)
  const assignedById = getAssignedUserId()

  const fields: Record<string, unknown> = {
    TITLE: `Lead web B2B — ${payload.name} — ${payload.phone}`,
    NAME: payload.name,
    SOURCE_ID,
    SOURCE_DESCRIPTION,
    COMMENTS: formatComments(payload),
    OPENED: 'Y',
    EMAIL: [{ VALUE: payload.email, VALUE_TYPE: 'WORK' } satisfies BitrixEmail],
    PHONE: [{ VALUE: payload.phone, VALUE_TYPE: 'WORK' } satisfies BitrixPhone],
  }

  if (assignedById) {
    fields.ASSIGNED_BY_ID = assignedById
  }

  if (links.contactId) {
    fields.CONTACT_ID = links.contactId
  }

  if (links.companyId) {
    fields.COMPANY_ID = links.companyId
  }

  const leadId = await bitrixCall<number>('crm.lead.add', { fields })

  if (!leadId) {
    return { ok: false }
  }

  console.log(`[Bitrix24] Lead created: ${leadId}`)
  return { ok: true, leadId }
}
