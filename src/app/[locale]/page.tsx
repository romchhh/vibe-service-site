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
import { getBlogPreviewPosts } from '@/lib/blog'
import { isValidLocale, type Locale } from '@/lib/i18n/config'
import { getHomeSeo } from '@/lib/page-seo'
import { buildPageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isValidLocale(rawLocale) ? rawLocale : 'en'
  const meta = getHomeSeo(locale)

  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: '/',
    locale,
    ogTitle: meta.title,
    keywords: meta.keywords,
    ogImageAlt: meta.ogImageAlt,
  })
}

export default async function Home({ params }: Props) {
  const { locale: rawLocale } = await params
  const locale = (isValidLocale(rawLocale) ? rawLocale : 'en') as Locale
  const blogPreviewPosts = getBlogPreviewPosts(locale, 3)

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
        <ScrollReveal delay={40}>
          <BlogPreviewSection posts={blogPreviewPosts} />
        </ScrollReveal>
        <ScrollReveal delay={40}><TrustpilotSection /></ScrollReveal>
        <ScrollReveal delay={40}><FaqSection /></ScrollReveal>
        <ScrollReveal delay={40}><ContactSection /></ScrollReveal>
        <SeoTextSection />
      </main>
      <Footer />
    </>
  )
}
