import { readFileSync } from 'fs'
import path from 'path'
import { google, type sheets_v4 } from 'googleapis'
import { siteConfig } from './site'
import type { ConsultationLeadPayload } from './bitrix24'

const SHEET_HEADERS = [
  'Timestamp',
  'Name',
  'Phone',
  'Email',
  'Preferred time',
  'Comment',
  'Source',
  'Site',
] as const

const HEADER_RANGE = 'A1:H1'

function getSpreadsheetId(): string | null {
  const fromEnv = process.env.GOOGLE_SHEETS_ID?.trim()
  if (fromEnv) return fromEnv

  const url = process.env.GOOGLE_SHEETS_URL?.trim()
  if (!url) return null

  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  return match?.[1] ?? null
}

function loadServiceAccountCredentials(): Record<string, unknown> | null {
  const jsonInline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim()
  if (jsonInline) {
    try {
      return JSON.parse(jsonInline) as Record<string, unknown>
    } catch (error) {
      console.error('[Google Sheets] Invalid GOOGLE_SERVICE_ACCOUNT_JSON:', error)
      return null
    }
  }

  const keyPath =
    process.env.GOOGLE_SERVICE_ACCOUNT_PATH?.trim() ||
    path.join(process.cwd(), 'credentials', 'google-service-account.json')

  try {
    const raw = readFileSync(keyPath, 'utf8')
    return JSON.parse(raw) as Record<string, unknown>
  } catch (error) {
    console.error('[Google Sheets] Failed to load service account file:', error)
    return null
  }
}

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(getSpreadsheetId() && loadServiceAccountCredentials())
}

async function getSheetsClient(): Promise<sheets_v4.Sheets | null> {
  const credentials = loadServiceAccountCredentials()
  if (!credentials) return null

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return google.sheets({ version: 'v4', auth })
}

function formatSource(source?: ConsultationLeadPayload['source']): string {
  return source === 'modal' ? 'Modal — Book a consultation' : 'Contact section — Book a consultation'
}

function formatTimestamp(date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(date)
}

async function ensureHeaders(sheets: sheets_v4.Sheets, spreadsheetId: string): Promise<boolean> {
  try {
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: HEADER_RANGE,
    })

    const firstRow = existing.data.values?.[0]
    const hasHeaders =
      Array.isArray(firstRow) &&
      firstRow.length >= SHEET_HEADERS.length &&
      SHEET_HEADERS.every((header, index) => firstRow[index] === header)

    if (hasHeaders) return true

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [Array.from(SHEET_HEADERS)],
      },
    })

    console.log('[Google Sheets] Headers initialized')
    return true
  } catch (error) {
    console.error('[Google Sheets] Failed to ensure headers:', error)
    return false
  }
}

export async function appendConsultationLead(
  payload: ConsultationLeadPayload,
): Promise<{ ok: boolean }> {
  const spreadsheetId = getSpreadsheetId()
  if (!spreadsheetId) {
    console.error('[Google Sheets] Spreadsheet ID is not configured')
    return { ok: false }
  }

  const sheets = await getSheetsClient()
  if (!sheets) return { ok: false }

  const headersReady = await ensureHeaders(sheets, spreadsheetId)
  if (!headersReady) return { ok: false }

  const row = [
    formatTimestamp(),
    payload.name,
    payload.phone,
    payload.email,
    payload.preferredTime,
    payload.comment?.trim() || '',
    formatSource(payload.source),
    siteConfig.url,
  ]

  try {
    console.log('[Google Sheets] Appending lead row')
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:H',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    })

    console.log('[Google Sheets] Lead saved')
    return { ok: true }
  } catch (error) {
    console.error('[Google Sheets] Failed to append lead:', error)
    return { ok: false }
  }
}

/** One-off helper: create header row if missing */
export async function initializeGoogleSheetHeaders(): Promise<{ ok: boolean; message: string }> {
  const spreadsheetId = getSpreadsheetId()
  if (!spreadsheetId) {
    return { ok: false, message: 'GOOGLE_SHEETS_ID is not configured' }
  }

  const sheets = await getSheetsClient()
  if (!sheets) {
    return { ok: false, message: 'Google service account credentials are missing or invalid' }
  }

  const ok = await ensureHeaders(sheets, spreadsheetId)
  return {
    ok,
    message: ok ? 'Headers are ready' : 'Failed to write headers — check sheet sharing with the service account',
  }
}
