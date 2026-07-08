import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import ReviewsPage from '../../components/ReviewsPage'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { REVIEW_KEYS } from '@/data/reviews'
import { isValidLocale, localePath, localeSchemaLanguage, type Locale } from '@/lib/i18n/config'
import { BREADCRUMB_LABELS, getReviewsSeo } from '@/lib/page-seo'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'en') as Locale
  const meta = getReviewsSeo(locale)

  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: '/reviews',
    locale,
    keywords: meta.keywords,
    ogImageAlt: meta.ogImageAlt,
  })
}

export default async function Reviews({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'en') as Locale
  const meta = getReviewsSeo(locale)
  const reviewsPath = localePath('/reviews', locale)

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: siteConfig.name, path: '/' },
      { name: BREADCRUMB_LABELS.reviews[locale], path: '/reviews' },
    ],
    locale,
  )

  const webPage = buildWebPageJsonLd({
    title: meta.title,
    description: meta.description,
    path: '/reviews',
    locale,
  })

  const reviewSchema = {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(reviewsPath)}#reviews`,
    name: meta.title,
    itemListElement: REVIEW_KEYS.map((key, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Client' },
        reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
        publisher: { '@type': 'Organization', name: siteConfig.name },
      },
    })),
    inLanguage: localeSchemaLanguage(locale),
  }

  return (
    <>
      <JsonLdScript data={buildGraphJsonLd([breadcrumb, webPage, reviewSchema])} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: BREADCRUMB_LABELS.reviews[locale], path: reviewsPath },
        ]}
      />
      <main>
        <ReviewsPage />
      </main>
      <Footer />
    </>
  )
}
