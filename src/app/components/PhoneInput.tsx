'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY_ISO,
  buildFullPhone,
  getCountryByIso,
  type CountryCode,
} from '@/data/country-codes'
import styles from './PhoneInput.module.css'

type PhoneInputProps = {
  id: string
  value: string
  onChange: (fullPhone: string) => void
  required?: boolean
  compact?: boolean
}

export default function PhoneInput({
  id,
  value: _value,
  onChange,
  required = false,
  compact = false,
}: PhoneInputProps) {
  const { t } = useTranslation()
  const listId = useId()
  const wrapRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [iso, setIso] = useState(DEFAULT_COUNTRY_ISO)
  const [national, setNational] = useState('')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const country = getCountryByIso(iso)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COUNTRY_CODES
    return COUNTRY_CODES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.iso.toLowerCase().includes(q),
    )
  }, [query])

  const emit = (nextIso: string, nextNational: string) => {
    const nextCountry = getCountryByIso(nextIso)
    onChange(buildFullPhone(nextCountry.dial, nextNational))
  }

  const selectCountry = (next: CountryCode) => {
    setIso(next.iso)
    setOpen(false)
    setQuery('')
    emit(next.iso, national)
  }

  const openList = (focusSearch = false) => {
    setOpen(true)
    if (focusSearch) {
      window.setTimeout(() => searchRef.current?.focus(), 0)
    }
  }

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${compact ? styles.compact : ''}`}
      data-phone-open={open ? 'true' : 'false'}
    >
      <div className={`${styles.control} ${open ? styles.controlOpen : ''}`}>
        <button
          type="button"
          className={styles.codeBtn}
          onClick={() => {
            if (open) {
              setOpen(false)
              setQuery('')
              return
            }
            openList(true)
          }}
          aria-label={t('contact.countryCode')}
          aria-expanded={open}
          aria-controls={listId}
        >
          <span className={styles.flag} aria-hidden="true">{country.flag}</span>
          <span className={styles.dial}>{country.dial}</span>
          <svg
            className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M2 4 L6 8 L10 4" />
          </svg>
        </button>
        <input
          id={id}
          className={styles.numberInput}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={t('contact.phonePlaceholder')}
          value={national}
          required={required}
          onFocus={() => openList(false)}
          onChange={(e) => {
            const next = e.target.value.replace(/[^\d\s()-]/g, '')
            setNational(next)
            emit(iso, next)
          }}
        />
      </div>

      {open && (
        <div className={styles.dropdown} id={listId} role="listbox" aria-label={t('contact.countryCode')}>
          <input
            ref={searchRef}
            className={styles.search}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('contact.countrySearch')}
            aria-label={t('contact.countrySearch')}
          />
          <ul className={styles.list}>
            {filtered.length === 0 ? (
              <li>
                <p className={styles.empty}>{t('contact.countryEmpty')}</p>
              </li>
            ) : (
              filtered.map((item) => (
                <li key={`${item.iso}-${item.dial}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={item.iso === iso}
                    className={`${styles.option} ${item.iso === iso ? styles.optionActive : ''}`}
                    onClick={() => selectCountry(item)}
                  >
                    <span className={styles.flag} aria-hidden="true">{item.flag}</span>
                    <span className={styles.optionName}>{item.name}</span>
                    <span className={styles.optionDial}>{item.dial}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
