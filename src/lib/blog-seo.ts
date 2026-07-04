import type { BlogPost } from './blog'
import { localePath, type Locale } from './i18n/config'
import { pickLocalized } from './content-locale'
import { absoluteUrl } from './seo'
import { siteConfig } from './site'

const postKeywords: Record<string, Partial<Record<Locale, string[]>>> = {
  'what-is-substance-in-uk': {
    ru: ['substance в UK', 'реальное присутствие UK', 'юрадрес Великобритания', 'HMRC substance', 'Vibe Services'],
    en: ['substance in UK', 'UK real presence', 'registered office UK', 'HMRC substance', 'Vibe Services'],
    ua: ['substance у UK', 'реальна присутність UK', 'юридична адреса UK', 'HMRC substance', 'Vibe Services'],
    de: ['Substance UK', 'echte Präsenz UK', 'Registered Office UK', 'HMRC Substance', 'Vibe Services'],
    fr: ['substance UK', 'présence réelle UK', 'adresse enregistrée UK', 'HMRC substance', 'Vibe Services'],
  },
  'uk-bank-account-non-resident': {
    ru: ['банковский счёт UK', 'счёт нерезиденту', 'открыть счёт Великобритания', 'UK banking', 'Vibe Services'],
    en: ['UK bank account', 'non-resident bank account', 'open UK account', 'UK banking', 'Vibe Services'],
    ua: ['банківський рахунок UK', 'рахунок нерезиденту', 'відкрити рахунок UK', 'UK banking', 'Vibe Services'],
    de: ['UK Bankkonto', 'Konto Nichtansässiger', 'Konto UK eröffnen', 'UK Banking', 'Vibe Services'],
    fr: ['compte bancaire UK', 'compte non-résident', 'ouvrir compte UK', 'banque UK', 'Vibe Services'],
  },
  'risks-no-real-office-uk': {
    ru: ['риски без офиса UK', 'блокировка счёта UK', 'HMRC претензии', 'substance UK', 'Vibe Services'],
    en: ['no office UK risks', 'UK account freeze', 'HMRC compliance', 'UK substance', 'Vibe Services'],
    ua: ['ризики без офісу UK', 'блокування рахунку UK', 'перевірки HMRC', 'substance UK', 'Vibe Services'],
    de: ['Risiken ohne Büro UK', 'Kontosperrung UK', 'HMRC Compliance', 'Substance UK', 'Vibe Services'],
    fr: ['risques sans bureau UK', 'gel de compte UK', 'conformité HMRC', 'substance UK', 'Vibe Services'],
  },
  'choose-uk-business-structure': {
    ru: ['структура бизнеса UK', 'LTD или LLP', 'регистрация компании UK', 'холдинг UK', 'Vibe Services'],
    en: ['UK business structure', 'LTD vs LLP', 'UK company registration', 'UK holding', 'Vibe Services'],
    ua: ['структура бізнесу UK', 'LTD чи LLP', 'реєстрація компанії UK', 'холдинг UK', 'Vibe Services'],
    de: ['Unternehmensstruktur UK', 'LTD oder LLP', 'Firmengründung UK', 'Holding UK', 'Vibe Services'],
    fr: ['structure entreprise UK', 'LTD ou LLP', 'immatriculation société UK', 'holding UK', 'Vibe Services'],
  },
  'patent-box-uk-tech-companies': {
    ru: ['Patent Box UK', 'налоговые льготы tech', 'corporation tax UK', 'R&D UK', 'Vibe Services'],
    en: ['Patent Box UK', 'UK tech tax relief', 'corporation tax UK', 'R&D tax credits', 'Vibe Services'],
    ua: ['Patent Box UK', 'податкові пільги tech', 'corporation tax UK', 'R&D UK', 'Vibe Services'],
    de: ['Patent Box UK', 'Steuervorteile Tech', 'Corporation Tax UK', 'F&E UK', 'Vibe Services'],
    fr: ['Patent Box UK', 'avantages fiscaux tech', 'impôt sociétés UK', 'R&D UK', 'Vibe Services'],
  },
}

const BLOG_LIST_NAMES: Record<Locale, string> = {
  en: `${siteConfig.name} Blog Articles`,
  de: `${siteConfig.name} Blog-Artikel`,
  ru: `Статьи блога ${siteConfig.name}`,
  ua: `Статті блогу ${siteConfig.name}`,
  fr: `Articles du blog ${siteConfig.name}`,
}

export function getPostKeywords(post: BlogPost, locale: Locale): string[] {
  const custom = postKeywords[post.slug]?.[locale]
  if (custom) return custom
  const view = pickLocalized(post, locale)
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
  const view = pickLocalized(post, locale)
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
  const blogPath = localePath('/blog', locale)
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(blogPath)}#itemlist`,
    name: BLOG_LIST_NAMES[locale],
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: pickLocalized(post, locale).title,
      url: absoluteUrl(localePath(`/blog/${post.slug}`, locale)),
    })),
  }
}
