import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StatsSection from '../components/StatsSection'
import ServicesSection from '../components/ServicesSection'
import HowWeWorkSection from '../components/HowWeWorkSection'
import TeamSection from '../components/TeamSection'
import CasesSection from '../components/CasesSection'
import BlogPreviewSection from '../components/BlogPreviewSection'
import TrustpilotSection from '../components/TrustpilotSection'
import FaqSection from '../components/FaqSection'
import ContactSection from '../components/ContactSection'
import SeoTextSection from '../components/SeoTextSection'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import JsonLd from '../components/JsonLd'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: string }> }

const META_BY_LOCALE: Record<Locale, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: siteConfig.titleEn,
    description: siteConfig.descriptionEn,
    keywords: siteConfig.keywordsEn,
  },
  de: {
    title: 'UK-Geschäftsaufbau schlüsselfertig — Vibe Services',
    description: siteConfig.descriptionEn,
    keywords: siteConfig.keywordsEn,
  },
  ru: {
    title: siteConfig.titleRu,
    description: siteConfig.descriptionRu,
    keywords: siteConfig.keywordsRu,
  },
  ua: {
    title: 'Відкриття бізнесу у UK під ключ — Vibe Services',
    description: siteConfig.descriptionRu,
    keywords: siteConfig.keywordsRu,
  },
  fr: {
    title: 'Création d\'entreprise au Royaume-Uni — Vibe Services',
    description: siteConfig.descriptionEn,
    keywords: siteConfig.keywordsEn,
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isValidLocale(rawLocale) ? rawLocale : 'en'
  const meta = META_BY_LOCALE[locale]

  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: '/',
    locale,
    ogTitle: meta.title,
    keywords: meta.keywords,
  })
}

export default async function Home({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'en') as Locale

  return (
    <>
      <JsonLd locale={locale} />
      <Navbar transparent />
      <main>
        <Hero />
        <StatsSection />
        <ServicesSection />
        <HowWeWorkSection />
        <ScrollReveal><TeamSection /></ScrollReveal>
        <ScrollReveal delay={40}><CasesSection /></ScrollReveal>
        <ScrollReveal delay={40}><BlogPreviewSection /></ScrollReveal>
        <ScrollReveal delay={40}><TrustpilotSection /></ScrollReveal>
        <ScrollReveal delay={40}><FaqSection /></ScrollReveal>
        <ScrollReveal delay={40}><ContactSection /></ScrollReveal>
        <SeoTextSection />
      </main>
      <Footer />
    </>
  )
}
