import type { Locale } from './config'

export type LocaleMessages = Record<string, unknown>

export const localeLoaders: Record<Locale, () => Promise<{ default: LocaleMessages }>> = {
  en: () => import('@/locales/en.json'),
  de: () => import('@/locales/de.json'),
  ru: () => import('@/locales/ru.json'),
  ua: () => import('@/locales/ua.json'),
  fr: () => import('@/locales/fr.json'),
}
