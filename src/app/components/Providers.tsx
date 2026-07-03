'use client'

import '@/lib/i18n/client'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n/client'
import { ContactModalProvider } from './ContactModalProvider'
import FloatingMessengerButtons from './FloatingMessengerButtons'
import HashScrollHandler from './HashScrollHandler'
import LangSync from './LangSync'

export default function Providers({ children }: { children: React.ReactNode }) {
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
