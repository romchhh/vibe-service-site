'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '@/lib/i18n/client'
import styles from './LangSwitcher.module.css'

const LANGUAGES = [
  { code: 'ru' as const, label: 'Русский' },
  { code: 'en' as const, label: 'English' },
]

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12 H21" />
      <path d="M12 3 C14.5 6 15.8 9 16 12 C15.8 15 14.5 18 12 21 C9.5 18 8.2 15 8 12 C8.2 9 9.5 6 12 3 Z" />
    </svg>
  )
}

type LangSwitcherProps = {
  variant?: 'header' | 'drawer'
  light?: boolean
}

export default function LangSwitcher({ variant = 'header', light = false }: LangSwitcherProps) {
  const { t, i18n: i18nInstance } = useTranslation()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const locale = i18nInstance.language

  const switchLang = (lang: 'ru' | 'en') => {
    i18n.changeLanguage(lang)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return

    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${styles[variant]} ${light ? styles.light : ''}`}
    >
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('nav.language')}
      >
        <GlobeIcon />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label={t('nav.language')}>
          {LANGUAGES.map(({ code, label }) => (
            <li key={code} role="option" aria-selected={locale === code}>
              <button
                type="button"
                className={locale === code ? styles.active : ''}
                onClick={() => switchLang(code)}
              >
                <span className={styles.code}>{code.toUpperCase()}</span>
                <span className={styles.label}>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
