'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PARTNERS } from '@/data/partners'
import { IMAGE_QUALITY, optimizeRemoteImageUrl } from '@/lib/image-url'
import { siteConfig } from '@/lib/site'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { useContactModal } from './ContactModalProvider'
import styles from './Hero.module.css'

const HERO_IMAGE = optimizeRemoteImageUrl(
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
  1600,
  IMAGE_QUALITY.hero,
)

export default function Hero() {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const lp = useLocalizedPath()

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image
          src={HERO_IMAGE}
          alt={t('seo.heroImageAlt')}
          fill
          priority
          fetchPriority="high"
          quality={IMAGE_QUALITY.hero}
          sizes="100vw"
          className={styles.bgImage}
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.body}>
        <div className={styles.mainRow}>
          <div className={styles.textBlock}>
            <h1 className={styles.headline}>
              {t('hero.headline')}
              {t('hero.accent') ? (
                <>
                  {' '}
                  <em className={styles.accent}>{t('hero.accent')}</em>
                </>
              ) : null}
            </h1>

            <p className={styles.subtitle}>{t('hero.badge')}</p>

            <div className={styles.logosStrip}>
              <p className={styles.logosLabel}>{t('hero.trustedBy')}</p>
              <div className={styles.logos}>
                {PARTNERS.map((partner) => {
                  const logo = (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={44}
                      height={44}
                      quality={80}
                      loading="lazy"
                      className={styles.logoImage}
                    />
                  )

                  return partner.url ? (
                    <a
                      key={partner.id}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.logoItem}
                      aria-label={partner.name}
                    >
                      {logo}
                    </a>
                  ) : (
                    <span key={partner.id} className={styles.logoItem} aria-label={partner.name}>
                      {logo}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className={styles.trustRow}>
              <a
                href={siteConfig.trustpilotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.trustpilot}
                aria-label={`Trustpilot ${t('hero.trustpilotRating')} · ${t('hero.trustpilotReviews')}`}
              >
                <span className={styles.trustLogoWrap}>
                  <Image
                    src="/images/logos/trust-pilot-stacked-black.svg"
                    alt=""
                    width={88}
                    height={20}
                    className={styles.trustLogo}
                    aria-hidden="true"
                  />
                </span>
                <span className={styles.trustStars} aria-hidden="true">★★★★★</span>
                <span className={styles.trustRating}>
                  {t('hero.trustpilotRating')} · {t('hero.trustpilotReviews')}
                </span>
              </a>
            </div>
          </div>

          <div className={styles.ctaColumn}>
            <button type="button" className={styles.card} onClick={openContactModal}>
              <div className={styles.cardText}>
                <p className={styles.cardHighlight}>{t('hero.cta')}</p>
              </div>
              <div className={styles.cardArrow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 14 L14 2 M6 2 H14 V10" />
                </svg>
              </div>
            </button>
            <div className={styles.secondaryCtas}>
              <button type="button" className={styles.secondaryBtn} onClick={openContactModal}>
                {t('hero.ctaPricing')}
              </button>
              <a href={lp('/blog/what-is-substance-in-uk')} className={styles.secondaryBtnOutline}>
                {t('hero.ctaGuide')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
