'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PreferredTimePicker from './PreferredTimePicker'
import styles from './ContactForm.module.css'

type FormState = { name: string; phone: string; preferredTime: string; comment: string; consent: boolean }
type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm({ modal = false, onSuccess }: { modal?: boolean; onSuccess?: () => void }) {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    preferredTime: '',
    comment: '',
    consent: false,
  })
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm(f => ({ ...f, [k]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent) return
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          preferredTime: form.preferredTime,
          comment: form.comment,
          source: modal ? 'modal' : 'section',
        }),
      })

      if (!res.ok) throw new Error('submit failed')

      setStatus('success')
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`${styles.success} ${modal ? styles.successModal : ''}`}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--stripe-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="24" cy="24" r="20"/>
          <path d="M14 24 L21 31 L34 18"/>
        </svg>
        <h3>{t('contact.successTitle')}</h3>
        <p>{t('contact.successText')}</p>
      </div>
    )
  }

  return (
    <form
      className={`${styles.form} ${modal ? styles.formModal : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.field}>
        <label htmlFor="contact-name">{t('contact.name')}</label>
        <input id="contact-name" type="text" placeholder={t('contact.namePlaceholder')} value={form.name} onChange={set('name')} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-phone">{t('contact.phone')}</label>
        <input id="contact-phone" type="text" placeholder={t('contact.phonePlaceholder')} value={form.phone} onChange={set('phone')} required autoComplete="tel email" />
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-time">{t('contact.preferredTime')}</label>
        <PreferredTimePicker
          id="contact-time"
          value={form.preferredTime}
          onChange={(preferredTime) => setForm((f) => ({ ...f, preferredTime }))}
          required
          compact={modal}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-comment">{t('contact.comment')}</label>
        <textarea
          id="contact-comment"
          placeholder={t('contact.commentPlaceholder')}
          rows={modal ? 3 : 4}
          value={form.comment}
          onChange={set('comment')}
        />
      </div>
      <label className={styles.consent}>
        <input type="checkbox" checked={form.consent} onChange={set('consent')} required />
        <span>{t('contact.consent')}</span>
      </label>
      {status === 'error' && (
        <p className={styles.error} role="alert">{t('contact.error')}</p>
      )}
      <button type="submit" className={styles.submit} disabled={!form.consent || status === 'loading'}>
        {status === 'loading' ? t('contact.submitting') : t('contact.submit')}
        {status !== 'loading' && (
          <span className={styles.submitArrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9" />
            </svg>
          </span>
        )}
      </button>
    </form>
  )
}
