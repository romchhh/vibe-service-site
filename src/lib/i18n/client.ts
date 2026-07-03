'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en.json'
import { localeHtmlLang, type Locale } from './config'
import { localeLoaders } from './locale-loaders'

const loadedLocales = new Set<Locale>(['en'])

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: { en: { translation: en } },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })
}

async function ensureLocaleLoaded(locale: Locale) {
  if (loadedLocales.has(locale)) return

  const loader = localeLoaders[locale]
  const mod = await loader()
  i18n.addResourceBundle(locale, 'translation', mod.default, true, true)
  loadedLocales.add(locale)
}

export async function setI18nLocale(locale: Locale) {
  await ensureLocaleLoaded(locale)

  if (i18n.language !== locale) {
    await i18n.changeLanguage(locale)
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = localeHtmlLang(locale)
  }
}

export function preloadI18nLocale(locale: Locale) {
  void ensureLocaleLoaded(locale)
}

export default i18n
