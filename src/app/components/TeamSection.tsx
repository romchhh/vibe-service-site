'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { TEAM_MEMBERS, TEAM_PHOTOS } from '@/data/team'
import { useContactModal } from './ContactModalProvider'
import styles from './TeamSection.module.css'

export default function TeamSection() {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()

  return (
    <section id="team" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('team.heading')}</h2>
        <p className={styles.description}>{t('team.description')}</p>

        <div className={styles.grid}>
          {TEAM_MEMBERS.map((key) => (
            <article key={key} className={styles.card}>
              <div className={styles.avatar}>
                <Image
                  src={TEAM_PHOTOS[key]}
                  alt={t(`team.members.${key}.name`)}
                  fill
                  sizes="140px"
                  className={styles.avatarImage}
                />
              </div>
              <h3 className={styles.name}>{t(`team.members.${key}.name`)}</h3>
              <p className={styles.role}>{t(`team.members.${key}.role`)}</p>
              <p className={styles.bio}>{t(`team.members.${key}.bio`)}</p>
            </article>
          ))}
        </div>

        <button type="button" className={styles.cta} onClick={openContactModal}>
          {t('team.cta')}
          <span className={styles.ctaArrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  )
}
