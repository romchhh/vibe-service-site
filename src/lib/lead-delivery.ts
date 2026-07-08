import { createConsultationLead, isBitrixConfigured, type ConsultationLeadPayload } from './bitrix24'

export type LeadPayload = ConsultationLeadPayload

export function isLeadDeliveryConfigured(): boolean {
  return isBitrixConfigured()
}

export async function deliverConsultationLead(payload: LeadPayload): Promise<{ ok: boolean; leadId?: number }> {
  const result = await createConsultationLead(payload)
  return { ok: result.ok, leadId: result.leadId }
}
