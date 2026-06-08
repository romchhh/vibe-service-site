import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import BlogPage from '../components/BlogPage'
import Footer from '../components/Footer'
import JsonLdScript from '../components/seo/JsonLdScript'
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageMetadata, buildWebPageJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.pages.blog.title,
  description: siteConfig.pages.blog.description,
  path: '/blog',
})

const breadcrumb = buildBreadcrumbJsonLd([
  { name: 'CardProc', path: '/' },
  { name: 'Блог', path: '/blog' },
])

const webPage = buildWebPageJsonLd({
  title: siteConfig.pages.blog.title,
  description: siteConfig.pages.blog.description,
  path: '/blog',
})

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${siteConfig.url}/blog#blog`,
  url: `${siteConfig.url}/blog`,
  name: siteConfig.pages.blog.title,
  description: siteConfig.pages.blog.description,
  publisher: { '@id': `${siteConfig.url}/#organization` },
  inLanguage: ['ru', 'en'],
}

export default function Blog() {
  return (
    <>
      <JsonLdScript data={buildGraphJsonLd([breadcrumb, webPage, blogSchema])} />
      <Navbar />
      <main>
        <BlogPage />
      </main>
      <Footer />
    </>
  )
}
