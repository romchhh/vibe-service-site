export const locales = ['en', 'de', 'ru', 'ua', 'fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

const OG_LOCALE_MAP: Record<Locale, string> = {
  en: 'en_GB',
  de: 'de_DE',
  ru: 'ru_RU',
  ua: 'uk_UA',
  fr: 'fr_FR',
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localePath(path: string, locale: Locale): string {
  const [pathname, hash = ''] = path.split('#')
  const normalized =
    !pathname || pathname === '/' ? '' : pathname.startsWith('/') ? pathname : `/${pathname}`
  const localized = normalized === '' ? `/${locale}` : `/${locale}${normalized}`
  return hash ? `${localized}#${hash}` : localized
}

export function localeHashPath(hash: string, locale: Locale): string {
  const id = hash.startsWith('#') ? hash.slice(1) : hash
  return `${localePath('/', locale)}#${id}`
}

export function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1)
    }
  }
  return pathname
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split('/').filter(Boolean)[0]
  return segment && isValidLocale(segment) ? segment : null
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return localePath(stripLocalePrefix(pathname), locale)
}

export function localeOgLocale(locale: Locale): string {
  return OG_LOCALE_MAP[locale]
}

const HTML_LANG_MAP: Record<Locale, string> = {
  en: 'en',
  de: 'de',
  ru: 'ru',
  ua: 'uk',
  fr: 'fr',
}

export function localeHreflang(locale: Locale): string {
  return localeOgLocale(locale).replace('_', '-')
}

export function localeHtmlLang(locale: Locale): string {
  return HTML_LANG_MAP[locale]
}

export function localeSchemaLanguage(locale: Locale): string {
  return HTML_LANG_MAP[locale]
}

/** Locale used for JSON content (services, blog) — one variant per UI locale */
export function contentLocale(locale: Locale): Locale {
  return locale
}
