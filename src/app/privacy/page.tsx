import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import PrivacyPage from '../components/PrivacyPage'
import Footer from '../components/Footer'
import JsonLdScript from '../components/seo/JsonLdScript'
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.pages.privacy.title,
  description: siteConfig.pages.privacy.description,
  path: '/privacy',
})

const breadcrumb = buildBreadcrumbJsonLd([
  { name: 'CardProc', path: '/' },
  { name: 'Политика конфиденциальности', path: '/privacy' },
])

const webPage = buildWebPageJsonLd({
  title: siteConfig.pages.privacy.title,
  description: siteConfig.pages.privacy.description,
  path: '/privacy',
})

export default function Privacy() {
  return (
    <>
      <JsonLdScript data={buildGraphJsonLd([breadcrumb, webPage])} />
      <Navbar />
      <main>
        <PrivacyPage />
      </main>
      <Footer />
    </>
  )
}
