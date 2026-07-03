import { localeHtmlLang, type Locale } from '@/lib/i18n/config'

export const SCHEDULE_TZ = 'Europe/London'
export const WORK_START_HOUR = 10
export const WORK_END_HOUR = 14
export const SLOT_MINUTES = 30
export const BOOKING_HORIZON_DAYS = 28

type LondonParts = {
  year: number
  month: number
  day: number
  weekday: number
  hour: number
  minute: number
}

const WEEKDAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export function getLondonParts(date: Date): LondonParts {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: SCHEDULE_TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
    hour12: false,
  })

  const parts: Record<string, string> = {}
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== 'literal') parts[part.type] = part.value
  }

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    weekday: WEEKDAY_MAP[parts.weekday] ?? 0,
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  }
}

export function dateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function parseDateKey(key: string): { year: number; month: number; day: number } {
  const [year, month, day] = key.split('-').map(Number)
  return { year, month, day }
}

export function isWeekday(weekday: number): boolean {
  return weekday >= 1 && weekday <= 5
}

export function addCalendarDays(year: number, month: number, day: number, days: number) {
  const anchor = londonLocalToDate(year, month, day, 12, 0)
  anchor.setUTCDate(anchor.getUTCDate() + days)
  const parts = getLondonParts(anchor)
  return { year: parts.year, month: parts.month, day: parts.day, weekday: parts.weekday }
}

export function londonLocalToDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  let guess = new Date(Date.UTC(year, month - 1, day, hour, minute))

  for (let i = 0; i < 5; i++) {
    const parts = getLondonParts(guess)
    if (
      parts.year === year &&
      parts.month === month &&
      parts.day === day &&
      parts.hour === hour &&
      parts.minute === minute
    ) {
      return guess
    }

    const diffMinutes =
      (day - parts.day) * 24 * 60 +
      (hour - parts.hour) * 60 +
      (minute - parts.minute)

    guess = new Date(guess.getTime() + diffMinutes * 60_000)
  }

  return guess
}

export function daysInMonth(year: number, month: number): number {
  for (let day = 31; day >= 28; day--) {
    const probe = londonLocalToDate(year, month, day, 12, 0)
    const parts = getLondonParts(probe)
    if (parts.year === year && parts.month === month && parts.day === day) return day
  }
  return 30
}

export function getBookableDateKeys(): Set<string> {
  const bookable = new Set<string>()
  const today = getLondonParts(new Date())

  let { year, month, day } = today
  let weekday = today.weekday

  for (let i = 0; i < BOOKING_HORIZON_DAYS; i++) {
    if (i > 0) {
      const next = addCalendarDays(year, month, day, 1)
      year = next.year
      month = next.month
      day = next.day
      weekday = next.weekday
    }

    if (!isWeekday(weekday)) continue

    const key = dateKey(year, month, day)
    if (getTimeSlots(key).length > 0) {
      bookable.add(key)
    }
  }

  return bookable
}

export function getTimeSlots(dateKeyValue: string): Array<{ hour: number; minute: number }> {
  const { year, month, day } = parseDateKey(dateKeyValue)
  const today = getLondonParts(new Date())
  const isToday = today.year === year && today.month === month && today.day === day
  const nowMinutes = today.hour * 60 + today.minute

  const slots: Array<{ hour: number; minute: number }> = []

  for (let minutes = WORK_START_HOUR * 60; minutes < WORK_END_HOUR * 60; minutes += SLOT_MINUTES) {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60

    if (isToday && minutes <= nowMinutes) continue

    slots.push({ hour, minute })
  }

  return slots
}

export function formatTimeSlot(hour: number, minute: number, locale: Locale): string {
  const date = londonLocalToDate(2000, 1, 1, hour, minute)
  return new Intl.DateTimeFormat(localeHtmlLang(locale), {
    timeZone: SCHEDULE_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function formatScheduledSlot(
  dateKeyValue: string,
  hour: number,
  minute: number,
  locale: Locale,
): string {
  const { year, month, day } = parseDateKey(dateKeyValue)
  const date = londonLocalToDate(year, month, day, hour, minute)

  return new Intl.DateTimeFormat(localeHtmlLang(locale), {
    timeZone: SCHEDULE_TZ,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(date)
}

export type MonthCell = {
  dateKey: string | null
  day: number | null
  bookable: boolean
}

export function getMonthGrid(year: number, month: number, bookable: Set<string>): MonthCell[] {
  const totalDays = daysInMonth(year, month)
  const firstWeekday = getLondonParts(londonLocalToDate(year, month, 1, 12, 0)).weekday
  const startOffset = (firstWeekday + 6) % 7
  const cells: MonthCell[] = []

  for (let i = 0; i < startOffset; i++) {
    cells.push({ dateKey: null, day: null, bookable: false })
  }

  for (let day = 1; day <= totalDays; day++) {
    const key = dateKey(year, month, day)
    const weekday = getLondonParts(londonLocalToDate(year, month, day, 12, 0)).weekday
    cells.push({
      dateKey: key,
      day,
      bookable: bookable.has(key) && isWeekday(weekday),
    })
  }

  while (cells.length % 7 !== 0) {
    cells.push({ dateKey: null, day: null, bookable: false })
  }

  return cells
}

export function getWeekdayLabels(locale: Locale): string[] {
  const formatter = new Intl.DateTimeFormat(localeHtmlLang(locale), {
    weekday: 'short',
  })

  const monday = new Date(Date.UTC(2024, 0, 1, 12))
  return Array.from({ length: 7 }, (_, index) => formatter.format(new Date(monday.getTime() + index * 86_400_000)))
}

export function formatMonthLabel(year: number, month: number, locale: Locale): string {
  const date = londonLocalToDate(year, month, 1, 12, 0)
  return new Intl.DateTimeFormat(localeHtmlLang(locale), {
    timeZone: SCHEDULE_TZ,
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatSelectedDateLabel(dateKeyValue: string, locale: Locale): string {
  const { year, month, day } = parseDateKey(dateKeyValue)
  const date = londonLocalToDate(year, month, day, 12, 0)

  return new Intl.DateTimeFormat(localeHtmlLang(locale), {
    timeZone: SCHEDULE_TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
}

export function getTodayDateKey(): string {
  const today = getLondonParts(new Date())
  return dateKey(today.year, today.month, today.day)
}
