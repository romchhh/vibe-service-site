'use client'

import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/lib/site'
import { TelegramIcon, WhatsAppIcon } from './icons/SocialIcons'
import styles from './FloatingMessengerButtons.module.css'

export default function FloatingMessengerButtons() {
  const { t } = useTranslation()

  return (
    <div className={styles.wrap} aria-label={t('float.label')}>
      <a
        href={siteConfig.telegramOperatorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.telegram}`}
        aria-label={t('float.telegram')}
      >
        <TelegramIcon size={26} />
      </a>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.whatsapp}`}
        aria-label={t('float.whatsapp')}
      >
        <WhatsAppIcon size={26} />
      </a>
    </div>
  )
}
