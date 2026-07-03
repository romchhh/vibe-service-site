import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import BlogPage from '../../components/BlogPage'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/seo/Breadcrumbs'
import JsonLdScript from '../../components/seo/JsonLdScript'
import { buildBlogItemListJsonLd } from '@/lib/blog-seo'
import { getAllPosts, localizePost } from '@/lib/blog'
import { isValidLocale, localePath, localeSchemaLanguage, locales, type Locale } from '@/lib/i18n/config'
import { BREADCRUMB_LABELS, getBlogSeo } from '@/lib/page-seo'
import { absoluteUrl, buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'en') as Locale
  const meta = getBlogSeo(locale)
  const pageMeta = buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: '/blog',
    locale,
    keywords: meta.keywords,
    ogImageAlt: meta.ogImageAlt,
  })

  return {
    ...pageMeta,
    alternates: {
      ...pageMeta.alternates,
      types: {
        'application/rss+xml': locales.map((loc) => ({
          url: localePath('/blog/feed.xml', loc),
          title: `${siteConfig.name} Blog RSS (${loc.toUpperCase()})`,
        })),
      },
    },
  }
}

export default async function Blog({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'en') as Locale
  const meta = getBlogSeo(locale)
  const posts = getAllPosts()
  const blogPath = localePath('/blog', locale)

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: siteConfig.name, path: '/' },
      { name: BREADCRUMB_LABELS.blog[locale], path: '/blog' },
    ],
    locale,
  )

  const webPage = buildWebPageJsonLd({
    title: meta.title,
    description: meta.description,
    path: '/blog',
    locale,
  })

  const blogSchema = {
    '@type': 'Blog',
    '@id': `${absoluteUrl(blogPath)}#blog`,
    url: absoluteUrl(blogPath),
    name: meta.title,
    description: meta.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${absoluteUrl(localePath(`/blog/${post.slug}`, locale))}#article`,
      headline: localizePost(post, locale).title,
      description: localizePost(post, locale).excerpt,
      datePublished: post.date,
      url: absoluteUrl(localePath(`/blog/${post.slug}`, locale)),
    })),
    inLanguage: localeSchemaLanguage(locale),
  }

  const itemList = buildBlogItemListJsonLd(posts, locale)

  return (
    <>
      <JsonLdScript data={buildGraphJsonLd([breadcrumb, webPage, blogSchema, itemList])} />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: siteConfig.name, path: localePath('/', locale) },
          { name: BREADCRUMB_LABELS.blog[locale], path: blogPath },
        ]}
      />
      <main>
        <BlogPage />
      </main>
      <Footer />
    </>
  )
}
