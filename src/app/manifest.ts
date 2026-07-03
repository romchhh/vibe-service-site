import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.titleEn,
    short_name: siteConfig.name,
    description: siteConfig.descriptionEn,
    start_url: '/en',
    display: 'standalone',
    background_color: '#0A2540',
    theme_color: siteConfig.themeColor,
    lang: 'en',
    categories: ['finance', 'business'],
    icons: [
      {
        src: siteConfig.ogImage,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
