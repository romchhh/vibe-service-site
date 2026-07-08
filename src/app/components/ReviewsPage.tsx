'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { HOME_REVIEW_KEYS, REVIEW_KEYS, REVIEW_PHOTOS } from '@/data/reviews'
import { siteConfig } from '@/lib/site'
import { useContactModal } from './ContactModalProvider'
import styles from './ReviewsPage.module.css'

function ReviewStars() {
  return (
    <div className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.trustBadge}>
          <Image
            src="/images/logos/trust-pilot-stacked-black.svg"
            alt="Trustpilot"
            width={100}
            height={28}
          />
          <span className={styles.trustRating}>
            {t('reviews.trustScore', {
              rating: t('reviews.rating'),
              count: t('reviews.count'),
            })}
          </span>
        </div>
        <h1 className={styles.title}>{t('reviews.pageTitle')}</h1>
        <p className={styles.subtitle}>{t('reviews.pageSubtitle')}</p>
      </header>

      <div className={styles.grid}>
        {REVIEW_KEYS.map((key) => (
          <article key={key} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.avatar}>
                <Image
                  src={REVIEW_PHOTOS[key]}
                  alt={t(`reviews.${key}.author`)}
                  fill
                  sizes="56px"
                  quality={78}
                  className={styles.avatarImage}
                />
              </div>
              <div className={styles.meta}>
                <p className={styles.author}>{t(`reviews.${key}.author`)}</p>
                <p className={styles.company}>{t(`reviews.${key}.company`)}</p>
                <p className={styles.date}>{t(`reviews.${key}.date`)}</p>
              </div>
            </div>
            <ReviewStars />
            <p className={styles.text}>{t(`reviews.${key}.text`)}</p>
          </article>
        ))}
      </div>

      <div className={styles.actions}>
        <a
          href={siteConfig.trustpilotUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnSecondary}
        >
          {t('reviews.readOnTrustpilot')}
        </a>
        <button type="button" className={styles.btnPrimary} onClick={openContactModal}>
          {t('reviews.cta')}
        </button>
      </div>

      <p className={styles.widgetNote}>
        {t('reviews.widgetNote', { count: HOME_REVIEW_KEYS.length })}
      </p>
    </div>
  )
}
