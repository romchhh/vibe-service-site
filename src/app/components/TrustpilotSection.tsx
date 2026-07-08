'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { HOME_REVIEW_KEYS, REVIEW_PHOTOS } from '@/data/reviews'
import { siteConfig } from '@/lib/site'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { useContactModal } from './ContactModalProvider'
import SectionLink from './SectionLink'
import styles from './TrustpilotSection.module.css'

const AUTO_PLAY_MS = 6000

function ReviewStars() {
  return (
    <div className={styles.reviewStars} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" />
        </svg>
      ))}
    </div>
  )
}

function ArrowIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === 'prev' ? <path d="M11 3 L5 9 L11 15" /> : <path d="M7 3 L13 9 L7 15" />}
    </svg>
  )
}

export default function TrustpilotSection() {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const lp = useLocalizedPath()
  const rating = t('reviews.rating')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const reviewKey = HOME_REVIEW_KEYS[activeIndex]
  const author = t(`reviews.${reviewKey}.author`)

  const goTo = useCallback((index: number) => {
    setIsAnimating(true)
    setActiveIndex((index + HOME_REVIEW_KEYS.length) % HOME_REVIEW_KEYS.length)
  }, [])

  const goNext = useCallback(() => {
    goTo(activeIndex + 1)
  }, [activeIndex, goTo])

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1)
  }, [activeIndex, goTo])

  useEffect(() => {
    const timer = window.setTimeout(() => setIsAnimating(false), 280)
    return () => window.clearTimeout(timer)
  }, [activeIndex])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HOME_REVIEW_KEYS.length)
      setIsAnimating(true)
    }, AUTO_PLAY_MS)

    return () => window.clearInterval(interval)
  }, [activeIndex])

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('trustpilot.heading')}</h2>

        <div className={styles.widget}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <Image
                src="/images/logos/trust-pilot-stacked-black.svg"
                alt="Trustpilot"
                width={110}
                height={32}
                className={styles.brandLogo}
              />
              <a
                href={siteConfig.trustpilotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
                aria-label={t('trustpilot.cta')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 5h5v5" />
                  <path d="M10 14 19 5" />
                  <path d="M19 14v5H5V5h5" />
                </svg>
              </a>
            </div>

            <div className={styles.carousel}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={goPrev}
                aria-label={t('trustpilot.prevReview')}
              >
                <ArrowIcon direction="prev" />
              </button>

              <div
                className={`${styles.reviewBody} ${isAnimating ? styles.reviewBodyFade : ''}`}
                aria-live="polite"
              >
                <div className={styles.avatar}>
                  <Image
                    src={REVIEW_PHOTOS[reviewKey]}
                    alt={author}
                    fill
                    sizes="(max-width: 768px) 44px, 52px"
                    quality={78}
                    loading="lazy"
                    className={styles.avatarImage}
                  />
                </div>
                <div className={styles.reviewContent}>
                  <div className={styles.reviewMeta}>
                    <ReviewStars />
                    <span className={styles.timeAgo}>{t(`reviews.${reviewKey}.date`)}</span>
                  </div>
                  <p className={styles.reviewText}>{t(`reviews.${reviewKey}.text`)}</p>
                  <p className={styles.author}>
                    {author} • {t(`reviews.${reviewKey}.company`)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={styles.navBtn}
                onClick={goNext}
                aria-label={t('trustpilot.nextReview')}
              >
                <ArrowIcon direction="next" />
              </button>
            </div>

            <div className={styles.dots} role="tablist" aria-label={t('trustpilot.heading')}>
              {HOME_REVIEW_KEYS.map((key, index) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`${index + 1} / ${HOME_REVIEW_KEYS.length}`}
                  className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>

            <div className={styles.cardFooter}>
              <p className={styles.trustScore}>
                {t('trustpilot.trustScore', { rating, reviews: t('reviews.count') })}
              </p>
              <p className={styles.ratedOn}>
                {t('trustpilot.ratedOn', { rating })}
              </p>
              <Link href={lp('/reviews')} className={styles.viewAllLink}>
                {t('trustpilot.viewAll')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 7 H12 M8 3 L12 7 L8 11" />
                </svg>
              </Link>
            </div>
          </article>

          <div className={styles.actions}>
            <button type="button" className={styles.btnPrimary} onClick={openContactModal}>
              {t('trustpilot.ctaQuote')}
              <span className={styles.btnArrow} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12 L12 2 M5 2 H12 V9" />
                </svg>
              </span>
            </button>
            <SectionLink sectionId="kontakt" className={styles.btnSecondary}>
              {t('trustpilot.ctaContact')}
            </SectionLink>
          </div>
        </div>
      </div>
    </section>
  )
}
