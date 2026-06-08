import type { Metadata, Viewport } from 'next'
import './globals.css'
import Providers from './components/Providers'
import JsonLd from './components/JsonLd'
import { siteConfig } from '@/lib/site'

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.titleRu,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.descriptionRu,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    languages: {
      'ru-RU': '/',
      'en-US': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    alternateLocale: [siteConfig.alternateLocale],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.titleRu,
    description: siteConfig.descriptionRu,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 900,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.titleRu,
    description: siteConfig.descriptionRu,
    images: [siteConfig.ogImage],
  },
  category: 'finance',
  icons: {
    icon: siteConfig.ogImage,
    apple: siteConfig.ogImage,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" type="text/plain" href="/ai.txt" title="AI information" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM information" />
        <JsonLd />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
