import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import styles from './not-found.module.css'

export const metadata = buildPageMetadata({
  title: 'Page not found',
  description: `The requested page does not exist. Return to ${siteConfig.name} home or blog.`,
  path: '/404',
  locale: 'en',
  noIndex: true,
})

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.desc}>
          The link may be outdated or the page has been moved.
        </p>
        <div className={styles.actions}>
          <Link href="/en" className={styles.primary}>
            Home
          </Link>
          <Link href="/en/blog" className={styles.secondary}>
            Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
