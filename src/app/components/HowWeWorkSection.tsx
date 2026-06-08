'use client'

import { useTranslation } from 'react-i18next'
import styles from './HowWeWorkSection.module.css'

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const

export default function HowWeWorkSection() {
  const { t } = useTranslation()

  return (
    <section id="how-we-work" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('howWeWork.heading')}</h2>

        <div className={styles.steps}>
          {STEPS.map((key, index) => (
            <article key={key} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={styles.content}>
                <h3 className={styles.title}>{t(`howWeWork.${key}.title`)}</h3>
                <p className={styles.desc}>{t(`howWeWork.${key}.desc`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
