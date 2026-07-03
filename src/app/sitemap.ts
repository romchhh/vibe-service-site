import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { SERVICE_SLUGS } from '@/lib/services'
import { localePath, locales } from '@/lib/i18n/config'
import { buildHreflangLanguages } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

const staticPaths = ['/', '/blog', '/privacy'] as const

function withAlternates(path: string, entry: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>) {
  return locales.map((locale) => ({
    url: `${siteConfig.url}${localePath(path, locale)}`,
    alternates: { languages: buildHreflangLanguages(path) },
    ...entry,
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latestPostDate = posts[0] ? new Date(posts[0].date) : new Date()

  const staticEntries = staticPaths.flatMap((path) =>
    withAlternates(path, {
      lastModified: path === '/blog' ? latestPostDate : new Date(),
      changeFrequency: path === '/privacy' ? 'yearly' : 'weekly',
      priority: path === '/' ? 1 : path === '/blog' ? 0.85 : 0.4,
    }),
  )

  const serviceEntries = SERVICE_SLUGS.flatMap((slug) =>
    withAlternates(`/services/${slug}`, {
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }),
  )

  const postEntries = posts.flatMap((post) =>
    withAlternates(`/blog/${post.slug}`, {
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.75,
    }),
  )

  return [...staticEntries, ...serviceEntries, ...postEntries]
}
