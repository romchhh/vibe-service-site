'use client'

import { useEffect } from 'react'
import i18n from '@/lib/i18n/client'

export default function LangSync() {
  useEffect(() => {
    document.documentElement.lang = i18n.language

    const handleChange = (lng: string) => {
      document.documentElement.lang = lng
    }

    i18n.on('languageChanged', handleChange)
    return () => {
      i18n.off('languageChanged', handleChange)
    }
  }, [])

  return null
}
