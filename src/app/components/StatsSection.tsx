'use client'

import { useTranslation } from 'react-i18next'
import { useContactModal } from './ContactModalProvider'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import styles from './StatsSection.module.css'

const STATS = ['stat1', 'stat2', 'stat3'] as const

export default function StatsSection() {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const lp = useLocalizedPath()

  return (
    <section id="stats" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('stats.heading')}</h2>
        {t('stats.subheading') ? (
          <p className={styles.subheading}>{t('stats.subheading')}</p>
        ) : null}

        <div className={styles.grid}>
          {STATS.map((key) => (
            <div key={key} className={styles.item}>
              <p className={styles.value}>{t(`stats.${key}.value`)}</p>
              <p className={styles.desc}>{t(`stats.${key}.desc`)}</p>
              <p className={styles.detail}>{t(`stats.${key}.detail`)}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <button type="button" className={styles.cta} onClick={openContactModal}>
            {t('stats.cta')}
            <span className={styles.ctaArrow} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12 L12 2 M5 2 H12 V9" />
              </svg>
            </span>
          </button>
          <button type="button" className={styles.ctaSecondary} onClick={openContactModal}>
            {t('stats.ctaPricing')}
          </button>
          <a href={lp('/blog/what-is-substance-in-uk')} className={styles.ctaOutline}>
            {t('stats.ctaGuide')}
          </a>
        </div>
      </div>
    </section>
  )
}
