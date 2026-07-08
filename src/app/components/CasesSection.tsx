'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PARTNERS } from '@/data/partners'
import styles from './CasesSection.module.css'

const STORY_FIELDS = ['situation', 'task', 'solution', 'result'] as const

export default function CasesSection() {
  const { t } = useTranslation()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section id="cases" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('cases.heading')}</h2>
        <p className={styles.subheading}>{t('cases.subheading')}</p>

        <div className={styles.grid}>
          {PARTNERS.map((partner) => {
            const isExpanded = expandedId === partner.id
            const logo = (
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                sizes="(max-width: 900px) 11vw, 64px"
                quality={80}
                loading="lazy"
                className={styles.logoImage}
              />
            )

            return (
              <article
                key={partner.id}
                className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
              >
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.logo}
                    aria-label={partner.name}
                  >
                    {logo}
                  </a>
                ) : (
                  <div className={styles.logo} aria-hidden="true">
                    {logo}
                  </div>
                )}
                <h3 className={styles.title}>{t(`cases.${partner.id}.title`)}</h3>
                <p className={styles.desc}>{t(`cases.${partner.id}.summary`)}</p>

                {isExpanded && (
                  <dl className={styles.story}>
                    {STORY_FIELDS.map((field) => (
                      <div key={field} className={styles.storyRow}>
                        <dt className={styles.storyLabel}>
                          {t(`cases.labels.${field}`)}
                        </dt>
                        <dd className={styles.storyText}>
                          {t(`cases.${partner.id}.${field}`)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <button
                  type="button"
                  className={styles.toggle}
                  aria-expanded={isExpanded}
                  onClick={() => setExpandedId(isExpanded ? null : partner.id)}
                >
                  {isExpanded ? t('cases.readLess') : t('cases.readMore')}
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
