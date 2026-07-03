'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { setI18nLocale } from '@/lib/i18n/client'
import { defaultLocale, getLocaleFromPathname } from '@/lib/i18n/config'

export default function LangSync() {
  const pathname = usePathname()

  useEffect(() => {
    const locale = getLocaleFromPathname(pathname) ?? defaultLocale
    void setI18nLocale(locale)
  }, [pathname])

  return null
}
