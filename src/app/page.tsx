import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SpecialistsSection from './components/SpecialistsSection'
import StatsSection from './components/StatsSection'
import ServicesSection from './components/ServicesSection'
import AdvantagesSection from './components/AdvantagesSection'
import AccountsSection from './components/AccountsSection'
import HowWeWorkSection from './components/HowWeWorkSection'
import ClientsSection from './components/ClientsSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { buildPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.titleRu,
  description: siteConfig.descriptionRu,
  path: '/',
  ogTitle: siteConfig.titleRu,
})

export default function Home() {
  return (
    <>
      <Navbar transparent />
      <main>
        <Hero />
        <StatsSection />
        <ServicesSection />
        <AdvantagesSection />
        <HowWeWorkSection />
        <AccountsSection />
        <SpecialistsSection />
        <ClientsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
