'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

const STORAGE_KEY = 'cardproc-lang'

function getInitialLang(): string {
  if (typeof window === 'undefined') return 'ru'
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'en' ? 'en' : 'ru'
}

if (typeof document !== 'undefined') {
  document.documentElement.lang = getInitialLang()
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: getInitialLang(),
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  })

  i18n.on('languageChanged', (lng) => {
    localStorage.setItem(STORAGE_KEY, lng)
    document.documentElement.lang = lng
  })
}

export default i18n
