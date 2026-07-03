import { optimizeRemoteImageUrl } from '@/lib/image-url'

export const REVIEW_PHOTOS = {
  testimonial1: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1573496359142-b8d87734a21a',
    120,
    78,
  ),
  testimonial2: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    120,
    78,
  ),
  testimonial3: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    120,
    78,
  ),
} as const

export type ReviewKey = keyof typeof REVIEW_PHOTOS
