'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { SERVICE_IMAGES, type ServiceSlug } from '@/lib/services'
import styles from './ServiceCard.module.css'

type Props = {
  slug: ServiceSlug
  title: string
  description: string
  href: string
  titleAs?: 'h2' | 'h3'
}

export default function ServiceCard({ slug, title, description, href, titleAs: TitleTag = 'h3' }: Props) {
  const { t } = useTranslation()

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.cardLink}>
        <div className={styles.cardMedia}>
          <Image
            src={SERVICE_IMAGES[slug]}
            alt={title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            quality={72}
            loading="lazy"
            className={styles.cardImage}
          />
          <div className={styles.cardOverlay} aria-hidden="true" />
          <div className={styles.cardContent}>
            <TitleTag className={styles.title}>{title}</TitleTag>
            <p className={styles.desc}>{description}</p>
            <span className={styles.cta}>
              {t('services.more')}
              <span className={styles.ctaArrow} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7 H12 M8 3 L12 7 L8 11" />
                </svg>
              </span>
            </span>
            <span className={styles.hint}>{t('services.clickHint')}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
