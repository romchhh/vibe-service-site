import type { BlogPost } from './blog'
import { contentLocale, localePath, type Locale } from './i18n/config'
import { absoluteUrl } from './seo'
import { siteConfig } from './site'

const postKeywords: Record<string, { ru: string[]; en: string[] }> = {
  'what-is-substance-in-uk': {
    ru: ['substance в UK', 'реальное присутствие UK', 'юрадрес Великобритания', 'HMRC substance', 'Vibe Services'],
    en: ['substance in UK', 'UK real presence', 'registered office UK', 'HMRC substance', 'Vibe Services'],
  },
  'uk-bank-account-non-resident': {
    ru: ['банковский счёт UK', 'счёт нерезиденту', 'открыть счёт Великобритания', 'UK banking', 'Vibe Services'],
    en: ['UK bank account', 'non-resident bank account', 'open UK account', 'UK banking', 'Vibe Services'],
  },
  'risks-no-real-office-uk': {
    ru: ['риски без офиса UK', 'блокировка счёта UK', 'HMRC претензии', 'substance UK', 'Vibe Services'],
    en: ['no office UK risks', 'UK account freeze', 'HMRC compliance', 'UK substance', 'Vibe Services'],
  },
  'choose-uk-business-structure': {
    ru: ['структура бизнеса UK', 'LTD или LLP', 'регистрация компании UK', 'холдинг UK', 'Vibe Services'],
    en: ['UK business structure', 'LTD vs LLP', 'UK company registration', 'UK holding', 'Vibe Services'],
  },
  'patent-box-uk-tech-companies': {
    ru: ['Patent Box UK', 'налоговые льготы tech', 'corporation tax UK', 'R&D UK', 'Vibe Services'],
    en: ['Patent Box UK', 'UK tech tax relief', 'corporation tax UK', 'R&D tax credits', 'Vibe Services'],
  },
}

export function getPostKeywords(post: BlogPost, locale: Locale): string[] {
  const lang = contentLocale(locale)
  const custom = postKeywords[post.slug]?.[lang]
  if (custom) return custom
  const view = post[lang]
  return [view.title, view.category, 'UK business', siteConfig.name]
}

export function getPostImageUrl(image: string): string {
  return image.startsWith('http') ? image : absoluteUrl(image)
}

export function estimateWordCount(body: string): number {
  return body.split(/\s+/).filter(Boolean).length
}

function excerptArticleBody(body: string, maxLength = 500): string {
  const plain = body.replace(/[#*_`[\]]/g, '').replace(/\n+/g, ' ').trim()
  return plain.length <= maxLength ? plain : `${plain.slice(0, maxLength).trim()}…`
}

export function buildBlogPostingJsonLd(post: BlogPost, locale: Locale = 'en') {
  const lang = contentLocale(locale)
  const view = post[lang]
  const path = `/blog/${post.slug}`
  const localizedPath = localePath(path, locale)
  const url = absoluteUrl(localizedPath)
  const blogPath = localePath('/blog', locale)

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: view.title,
    description: view.excerpt,
    image: [getPostImageUrl(post.image)],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
    },
    articleSection: view.category,
    keywords: getPostKeywords(post, locale).join(', '),
    wordCount: estimateWordCount(view.body),
    articleBody: excerptArticleBody(view.body),
    about: getPostKeywords(post, locale).slice(0, 4).map((name) => ({
      '@type': 'Thing',
      name,
    })),
    inLanguage: locale === 'ua' ? 'uk-UA' : locale === 'en' ? 'en-GB' : locale,
    isAccessibleForFree: true,
    isPartOf: { '@id': `${absoluteUrl(blogPath)}#blog` },
    url,
  }
}

export function buildBlogItemListJsonLd(posts: BlogPost[], locale: Locale = 'en') {
  const lang = contentLocale(locale)
  const blogPath = localePath('/blog', locale)
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(blogPath)}#itemlist`,
    name: lang === 'en' ? `${siteConfig.name} Blog Articles` : `Статьи блога ${siteConfig.name}`,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post[lang].title,
      url: absoluteUrl(localePath(`/blog/${post.slug}`, locale)),
    })),
  }
}
