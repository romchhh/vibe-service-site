import blogData from '@/data/blog.json'
import blogDe from '@/data/blog-locales/de.json'
import blogFr from '@/data/blog-locales/fr.json'
import blogUa from '@/data/blog-locales/ua.json'
import { pickLocalized } from './content-locale'
import type { Locale } from './i18n/config'
import { optimizeRemoteImageUrl } from './image-url'

export type BlogLocalePost = {
  title: string
  excerpt: string
  category: string
  readTime: string
  imageAlt: string
  body: string
}

type BlogPostBase = {
  slug: string
  date: string
  image: string
  en: BlogLocalePost
  ru: BlogLocalePost
}

export type BlogPost = BlogPostBase & {
  ua: BlogLocalePost
  de: BlogLocalePost
  fr: BlogLocalePost
}

export type BlogPostView = BlogLocalePost & {
  slug: string
  date: string
  image: string
}

export type BlogPostPreview = Omit<BlogPostView, 'body'>

const localePosts = {
  ua: blogUa,
  de: blogDe,
  fr: blogFr,
} as const

function buildPosts(): BlogPost[] {
  return (blogData.posts as BlogPostBase[]).map((post) => ({
    ...post,
    ua: localePosts.ua[post.slug as keyof typeof localePosts.ua] as BlogLocalePost,
    de: localePosts.de[post.slug as keyof typeof localePosts.de] as BlogLocalePost,
    fr: localePosts.fr[post.slug as keyof typeof localePosts.fr] as BlogLocalePost,
  }))
}

const posts = buildPosts()

export function localizePost(post: BlogPost, locale: Locale): BlogPostView {
  const localized = pickLocalized(post, locale)
  return {
    slug: post.slug,
    date: post.date,
    image: optimizeRemoteImageUrl(post.image, 800, 75),
    ...localized,
  }
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllPostViews(locale: Locale): BlogPostView[] {
  return getAllPosts().map((post) => localizePost(post, locale))
}

export function getPostView(slug: string, locale: Locale): BlogPostView | undefined {
  const post = getPostBySlug(slug)
  return post ? localizePost(post, locale) : undefined
}

export function getBlogPreviewPosts(locale: Locale, limit = 3): BlogPostPreview[] {
  return getAllPosts().slice(0, limit).map((post) => {
    const { body: _body, ...preview } = localizePost(post, locale)
    return preview
  })
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return getAllPosts().filter((post) => post.slug !== slug).slice(0, limit)
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug)
}

const DATE_LOCALE_MAP: Record<Locale, string> = {
  en: 'en-GB',
  de: 'de-DE',
  ru: 'ru-RU',
  ua: 'uk-UA',
  fr: 'fr-FR',
}

export function formatBlogDate(date: string, locale: Locale): string {
  const [year, month, day] = date.split('-').map(Number)
  const parsed = new Date(year, month - 1, day)
  return parsed.toLocaleDateString(DATE_LOCALE_MAP[locale], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
