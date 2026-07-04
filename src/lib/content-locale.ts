import type { Locale } from './i18n/config'

export type LocalizedRecord<T> = Record<Locale, T>

export function pickLocalized<T>(
  record: Partial<Record<Locale, T>> & { en: T; ru: T },
  locale: Locale,
): T {
  return record[locale] ?? record.en
}
