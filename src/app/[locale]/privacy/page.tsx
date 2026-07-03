import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import PrivacyPage from '../../components/PrivacyPage'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { isValidLocale, localePath, type Locale } from '@/lib/i18n/config'
import { BREADCRUMB_LABELS, getPrivacySeo } from '@/lib/page-seo'
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'en') as Locale
  const meta = getPrivacySeo(locale)

  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: '/privacy',
    locale,
    keywords: meta.keywords,
    ogImageAlt: meta.ogImageAlt,
  })
}

export default async function Privacy({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'en') as Locale
  const meta = getPrivacySeo(locale)
  const privacyLabel = BREADCRUMB_LABELS.privacy[locale]

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: siteConfig.name, path: '/' },
      { name: privacyLabel, path: '/privacy' },
    ],
    locale,
  )

  const webPage = buildWebPageJsonLd({
    title: meta.title,
    description: meta.description,
    path: '/privacy',
    locale,
    pageType: 'PrivacyPolicy',
  })

  return (
    <>
      <JsonLdScript data={buildGraphJsonLd([breadcrumb, webPage])} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: privacyLabel, path: localePath('/privacy', locale) },
        ]}
      />
      <main>
        <PrivacyPage />
      </main>
      <Footer />
    </>
  )
}
