'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { scrollToSection } from '@/lib/section-link'

export default function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) return

    let attempts = 0
    let timer = 0

    const tryScroll = () => {
      attempts += 1
      if (scrollToSection(hash) || attempts >= 10) return
      timer = window.setTimeout(tryScroll, 80)
    }

    timer = window.setTimeout(tryScroll, 40)

    return () => window.clearTimeout(timer)
  }, [pathname])

  return null
}
