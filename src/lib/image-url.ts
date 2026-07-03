const UNSPLASH_HOST = 'images.unsplash.com'

/** Tune remote Unsplash URLs for faster delivery (format + size). */
export function optimizeRemoteImageUrl(
  url: string,
  width: number,
  quality = 75,
): string {
  if (!url.includes(UNSPLASH_HOST)) return url

  try {
    const parsed = new URL(url)
    parsed.searchParams.set('w', String(width))
    parsed.searchParams.set('q', String(quality))
    parsed.searchParams.set('auto', 'format')
    return parsed.toString()
  } catch {
    return url
  }
}

export const IMAGE_QUALITY = {
  hero: 75,
  card: 72,
  avatar: 78,
  cover: 78,
} as const
