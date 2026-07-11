'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import type { BlogPostPreview } from '@/lib/blog'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import BlogCard from './BlogCard'
import styles from './BlogPreviewSection.module.css'

type Props = {
  posts: BlogPostPreview[]
}

export default function BlogPreviewSection({ posts }: Props) {
  const { t } = useTranslation()
  const lp = useLocalizedPath()

  if (posts.length === 0) return null

  return (
    <section id="blog" className={styles.section}>
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
            <span className={styles.viewAllArrow} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12 L12 2 M5 2 H12 V9" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
