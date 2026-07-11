'use client'

import { usePathname } from 'next/navigation'
import { stripLocalePrefix } from '@/lib/i18n/config'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { scrollToSection, sectionHref } from '@/lib/section-link'

type Props = {
  sectionId: string
  children: React.ReactNode
  className?: string
  onNavigate?: () => void
}

export default function SectionLink({ sectionId, children, className, onNavigate }: Props) {
  const pathname = usePathname()
  const lp = useLocalizedPath()
  const isHome = stripLocalePrefix(pathname) === '/'
  const href = sectionHref(lp('/'), sectionId, isHome)

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (!isHome) {
          onNavigate?.()
          return
        }

        event.preventDefault()
        onNavigate?.()

        // If the burger/menu closes with body scroll lock, unlock restores the
        // previous scrollY and would cancel an immediate scrollIntoView.
        // Wait until after React unlocks the body, then scroll to the section.
        const delay = onNavigate ? 100 : 0
        window.setTimeout(() => {
          scrollToSection(sectionId)
          window.history.replaceState(null, '', href)
        }, delay)
      }}
    >
      {children}
    </a>
  )
}
