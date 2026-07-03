'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getAllPostViews } from '@/lib/blog'
import { useLocale, useLocalizedPath } from '@/lib/i18n/use-locale'
import BlogCard from './BlogCard'
import styles from './BlogPreviewSection.module.css'

const PREVIEW_COUNT = 3

export default function BlogPreviewSection() {
  const { t } = useTranslation()
  const locale = useLocale()
  const lp = useLocalizedPath()
  const posts = getAllPostViews(locale).slice(0, PREVIEW_COUNT)

  if (posts.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('homeBlog.heading')}</h2>
        <p className={styles.subheading}>{t('homeBlog.subheading')}</p>

        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              href={lp(`/blog/${post.slug}`)}
              titleAs="h3"
            />
          ))}
        </div>

        <div className={styles.actions}>
          <Link href={lp('/blog')} className={styles.viewAll}>
            {t('homeBlog.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
