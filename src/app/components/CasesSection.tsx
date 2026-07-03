'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PARTNERS } from '@/data/partners'
import styles from './CasesSection.module.css'

export default function CasesSection() {
  const { t } = useTranslation()

  return (
    <section id="cases" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('cases.heading')}</h2>
        <p className={styles.subheading}>{t('cases.subheading')}</p>

        <div className={styles.grid}>
          {PARTNERS.map((partner) => {
            const logo = (
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                sizes="(max-width: 900px) 11vw, 64px"
                className={styles.logoImage}
              />
            )

            return (
              <article key={partner.id} className={styles.card}>
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
                <p className={styles.desc}>{t(`cases.${partner.id}.desc`)}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
