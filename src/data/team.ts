export const TEAM_PHOTOS = {
  alex: '/images/team/alex-valor.jpg',
  dmitry: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
  geoff: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
} as const

export const TEAM_MEMBERS = ['alex', 'dmitry', 'geoff'] as const

export type TeamMember = (typeof TEAM_MEMBERS)[number]
