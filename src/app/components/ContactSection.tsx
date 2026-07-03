'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import ContactForm from './ContactForm'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="kontakt" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>{t('contact.heading')}</h2>
          <div className={styles.imgWrap}>
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt={t('contact.imageAlt')}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.right}>
          <p className={styles.subheading}>{t('contact.subheading')}</p>
          <a href={siteConfig.phoneTelUrl} className={styles.phone}>
            {siteConfig.phone}
          </a>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
