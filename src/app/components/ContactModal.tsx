'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ContactForm from './ContactForm'
import { useContactModal } from './ContactModalProvider'
import styles from './ContactModal.module.css'

const SUCCESS_CLOSE_DELAY_MS = 3500

export default function ContactModal() {
  const { t } = useTranslation()
  const { isOpen, close } = useContactModal()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false)
      return
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', onKeyDown)
    dialogRef.current?.focus()

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close])

  useEffect(() => {
    if (!submitted) return
    const timer = window.setTimeout(close, SUCCESS_CLOSE_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [submitted, close])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={close} role="presentation">
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label={t('contact.close')}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4 L18 18 M18 4 L4 18" />
          </svg>
        </button>

        {!submitted && (
          <div className={styles.header}>
            <h2 id="contact-modal-title" className={styles.title}>{t('contact.modalTitle')}</h2>
            <p className={styles.subtitle}>{t('contact.subheading')}</p>
          </div>
        )}
        <div className={styles.body}>
          <ContactForm modal onSuccess={() => setSubmitted(true)} />
        </div>
      </div>
    </div>
  )
}
