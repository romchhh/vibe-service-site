export type Partner = {
  id: string
  name: string
  logo: string
  url?: string
}

export const PARTNERS: Partner[] = [
  { id: 'alteg', name: 'Alteg', logo: '/images/logos/alteg.png', url: 'https://alteg.co.uk/' },
  { id: 'alpengold', name: 'Alpengold', logo: '/images/logos/alpengold.jpg', url: 'https://alpengold.me/' },
  { id: 'greenup', name: 'Green Up', logo: '/images/logos/greenup.jpg' },
  { id: 'beehave', name: 'Beehave', logo: '/images/logos/beehave.png' },
  { id: 'mirax', name: 'Mirax', logo: '/images/logos/mirax.jpg' },
  { id: 'braz', name: 'Braz', logo: '/images/logos/braz.png', url: 'https://braz.ua/' },
]
