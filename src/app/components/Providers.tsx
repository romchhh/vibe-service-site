'use client'

import '@/lib/i18n/client'
import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import dynamic from 'next/dynamic'
import i18n, { preloadI18nLocale, setI18nLocale } from '@/lib/i18n/client'
import type { Locale } from '@/lib/i18n/config'
import { ContactModalProvider } from './ContactModalProvider'
import HashScrollHandler from './HashScrollHandler'
import LangSync from './LangSync'

const FloatingMessengerButtons = dynamic(
  () => import('./FloatingMessengerButtons'),
  { ssr: false },
)

type Props = {
  children: React.ReactNode
  initialLocale: Locale
}

export default function Providers({ children, initialLocale }: Props) {
  useEffect(() => {
    preloadI18nLocale(initialLocale)
    void setI18nLocale(initialLocale)
  }, [initialLocale])

  return (
    <I18nextProvider i18n={i18n}>
      <LangSync />
      <HashScrollHandler />
      <ContactModalProvider>
        {children}
        <FloatingMessengerButtons />
      </ContactModalProvider>
    </I18nextProvider>
  )
}
