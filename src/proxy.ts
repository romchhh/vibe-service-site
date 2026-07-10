import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, isValidLocale } from '@/lib/i18n/config'

/** Paths that must live at site root, not under /{locale}/ */
function stripLocalePrefix(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean)
  const [first, second, ...rest] = segments

  if (!first || !isValidLocale(first) || !second) return null

  if (second === '_next' || second === 'api' || second === 'images') {
    return `/${[second, ...rest].join('/')}`
  }

  // Root public files: manifest.webmanifest, robots.txt, sitemap.xml, *.txt
  if (segments.length === 2 && second.includes('.')) {
    return `/${second}`
  }

  return null
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public assets must stay at root — Next.js Image optimizer fetches these directly.
  if (pathname.startsWith('/images/')) {
    return NextResponse.next()
  }

  const stripped = stripLocalePrefix(pathname)
  if (stripped) {
    const url = request.nextUrl.clone()
    url.pathname = stripped
    return NextResponse.rewrite(url)
  }

  const segment = pathname.split('/').filter(Boolean)[0]

  if (segment && isValidLocale(segment)) {
    const response = NextResponse.next()
    response.headers.set('x-locale', segment)
    return response
  }

  // Root and locale-less paths always open the English version.
  const locale = defaultLocale
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  const response = NextResponse.redirect(url)
  response.headers.set('x-locale', locale)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files at root (_next, images, etc.)
     * Locale-prefixed static paths are handled via rewrite in proxy().
     */
    '/((?!_next|api|images|favicon.ico|.*\\..*).*)',
  ],
}
