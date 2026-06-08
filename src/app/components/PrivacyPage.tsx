'use client'

import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import styles from './PrivacyPage.module.css'

const SECTIONS = [
  'general',
  'dataCollected',
  'purposes',
  'legalBasis',
  'sharing',
  'retention',
  'cookies',
  'rights',
  'security',
  'transfers',
  'children',
  'changes',
  'contact',
] as const

export default function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <article className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('privacy.title')}</h1>
          <p className={styles.updated}>{t('privacy.updated')}</p>
        </header>

        <p className={styles.intro}>{t('privacy.intro')}</p>

        <div className={styles.sections}>
          {SECTIONS.map((key) => {
            const paragraphs = t(`privacy.sections.${key}.paragraphs`, {
              returnObjects: true,
              email: siteConfig.email,
              site: siteConfig.url.replace(/^https?:\/\//, ''),
            }) as string[]

            const listRaw = t(`privacy.sections.${key}.list`, { returnObjects: true })
            const list = Array.isArray(listRaw) ? (listRaw as string[]) : []

            return (
              <section key={key} id={key} className={styles.section}>
                <h2 className={styles.sectionTitle}>{t(`privacy.sections.${key}.title`)}</h2>
                <div className={styles.paragraphs}>
                  {paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {list.length > 0 && (
                    <ul className={styles.list}>
                      {list.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {key === 'contact' && (
                    <p>
                      <a href={`mailto:${siteConfig.email}`} className={styles.contactLink}>
                        {siteConfig.email}
                      </a>
                    </p>
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </article>
    </div>
  )
}
