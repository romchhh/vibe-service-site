'use client'

import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import styles from './MapSection.module.css'

export default function MapSection() {
  const { t } = useTranslation()
  const { office } = siteConfig

  return (
    <section id="find-us" className={styles.section} aria-labelledby="map-heading">
      <div className={styles.inner}>
        <h2 id="map-heading" className={styles.heading}>
          {t('map.heading')}
        </h2>

        <div className={styles.layout}>
          <div className={styles.mapWrap}>
            <iframe
              title={t('map.iframeTitle', { company: siteConfig.name })}
              src={siteConfig.googleMapsEmbedUrl}
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className={styles.details}>
            <p className={styles.company}>{siteConfig.name}</p>
            <address className={styles.address}>
              {office.streetAddress}
              <br />
              {office.locality}
              <br />
              {office.postalCode}
            </address>
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapsLink}
            >
              {t('map.openInMaps', { company: siteConfig.name })}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 7 H12 M8 3 L12 7 L8 11" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
