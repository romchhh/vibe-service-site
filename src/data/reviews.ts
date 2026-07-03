export const REVIEW_PHOTOS = {
  testimonial1: 'https://images.unsplash.com/photo-1573496359142-b8d87734a21a?w=200&q=80',
  testimonial2: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  testimonial3: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
} as const

export type ReviewKey = keyof typeof REVIEW_PHOTOS
