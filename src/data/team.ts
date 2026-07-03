import { optimizeRemoteImageUrl } from '@/lib/image-url'

export const TEAM_PHOTOS = {
  alex: '/images/team/alex-valor.webp',
  dmitry: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    320,
    78,
  ),
  geoff: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
    320,
    78,
  ),
} as const

export const TEAM_MEMBERS = ['alex', 'dmitry', 'geoff'] as const

export type TeamMember = (typeof TEAM_MEMBERS)[number]
