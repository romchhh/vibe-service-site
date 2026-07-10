import { optimizeRemoteImageUrl } from '@/lib/image-url'

export const REVIEW_KEYS = [
  'review1',
  'review2',
  'review3',
  'review4',
  'review5',
  'review6',
  'review7',
] as const

export type ReviewKey = (typeof REVIEW_KEYS)[number]

/** First five shown in the homepage carousel widget */
export const HOME_REVIEW_KEYS: ReviewKey[] = [
  'review1',
  'review2',
  'review3',
  'review4',
  'review5',
]

export const REVIEW_PHOTOS: Record<ReviewKey, string> = {
  review1: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    120,
    78,
  ),
  review2: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    120,
    78,
  ),
  review3: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    120,
    78,
  ),
  review4: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    120,
    78,
  ),
  review5: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    120,
    78,
  ),
  review6: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
    120,
    78,
  ),
  review7: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    120,
    78,
  ),
}
