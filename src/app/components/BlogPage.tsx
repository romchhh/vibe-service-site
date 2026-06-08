'use client'

import { useTranslation } from 'react-i18next'
import styles from './BlogPage.module.css'

export default function BlogPage() {
  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('blog.title')}</h1>
          <p className={styles.subtitle}>{t('blog.subtitle')}</p>
        </header>

        <div className={styles.filters}>
          <button type="button" className={`${styles.filter} ${styles.filterActive}`}>
            {t('blog.category')}
          </button>
        </div>

        <div className={styles.empty}>
          <div className={styles.emptyIcon} aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2 H6 A2 2 0 0 0 4 4 V20 A2 2 0 0 0 6 22 H18 A2 2 0 0 0 20 20 V8 Z" />
              <path d="M14 2 V8 H20 M8 13 H16 M8 17 H13" />
            </svg>
          </div>
          <h2 className={styles.emptyTitle}>{t('blog.emptyTitle')}</h2>
          <p className={styles.emptyDesc}>{t('blog.emptyDesc')}</p>
        </div>
      </div>
    </div>
  )
}
