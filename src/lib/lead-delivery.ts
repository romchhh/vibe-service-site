import { createConsultationLead, isBitrixConfigured, type ConsultationLeadPayload } from './bitrix24'
import { appendConsultationLead, isGoogleSheetsConfigured } from './google-sheets'

export type LeadPayload = ConsultationLeadPayload

export function isLeadDeliveryConfigured(): boolean {
  return isBitrixConfigured() || isGoogleSheetsConfigured()
}

export async function deliverConsultationLead(payload: LeadPayload): Promise<{
  ok: boolean
  leadId?: number
  bitrix: boolean
  sheets: boolean
}> {
  const [bitrixResult, sheetsResult] = await Promise.all([
    isBitrixConfigured() ? createConsultationLead(payload) : Promise.resolve({ ok: false as const }),
    isGoogleSheetsConfigured()
      ? appendConsultationLead(payload)
      : Promise.resolve({ ok: false as const }),
  ])

  const bitrix = bitrixResult.ok
  const sheets = sheetsResult.ok

  return {
    ok: bitrix || sheets,
    leadId: 'leadId' in bitrixResult ? bitrixResult.leadId : undefined,
    bitrix,
    sheets,
  }
}
