import { defaultLocale, isValidLocale, type Locale } from './config'

export const LOCALE_COOKIE_NAME = 'vibe_locale'
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export function getLocaleFromCookie(value: string | undefined): Locale | null {
  if (value && isValidLocale(value)) return value
  return null
}

export function setLocaleCookie(locale: Locale) {
  if (typeof document === 'undefined') return
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};SameSite=Lax`
}

function mapLanguageTag(tag: string): Locale | null {
  const lang = tag.toLowerCase()

  if (lang.startsWith('uk') || lang === 'ua') return 'ua'
  if (lang.startsWith('ru')) return 'ru'
  if (lang.startsWith('de')) return 'de'
  if (lang.startsWith('fr')) return 'fr'
  if (lang.startsWith('en')) return 'en'

  return null
}

/** Parse Accept-Language with q-values (highest quality first). */
export function parseAcceptLanguage(header: string): string[] {
  return header
    .split(',')
    .map((part) => {
      const [rawLang, ...params] = part.trim().split(';')
      const qParam = params.find((p) => p.trim().startsWith('q='))
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1

      return {
        lang: rawLang.trim().toLowerCase(),
        q: Number.isFinite(q) ? q : 0,
      }
    })
    .filter(({ lang, q }) => lang && q > 0)
    .sort((a, b) => b.q - a.q)
    .map(({ lang }) => lang)
}

export function detectLocaleFromAcceptLanguage(header: string): Locale {
  for (const tag of parseAcceptLanguage(header)) {
    const base = tag.split('-')[0]
    const match = mapLanguageTag(tag) ?? mapLanguageTag(base)
    if (match) return match
  }

  return defaultLocale
}

export function resolveLocale(options: {
  cookieValue?: string
  acceptLanguage?: string
}): Locale {
  const fromCookie = getLocaleFromCookie(options.cookieValue)
  if (fromCookie) return fromCookie

  if (options.acceptLanguage) {
    return detectLocaleFromAcceptLanguage(options.acceptLanguage)
  }

  return defaultLocale
}
