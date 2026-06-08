import type { Metadata } from 'next'
import { siteConfig } from './site'

type PageMetaInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogTitle?: string
  noIndex?: boolean
}

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogTitle,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    keywords: keywords ?? siteConfig.keywords,
    alternates: {
      canonical: path,
      languages: {
        'ru-RU': path,
        'en-US': path,
        'x-default': path,
      },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      alternateLocale: [siteConfig.alternateLocale],
      url,
      siteName: siteConfig.name,
      title: ogTitle ?? title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 900,
          alt: siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? title,
      description,
      images: [siteConfig.ogImage],
    },
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildGraphJsonLd(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.map(({ '@context': _context, ...node }) => node),
  }
}

export function buildWebPageJsonLd({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#service` },
    inLanguage: ['ru', 'en'],
  }
}
