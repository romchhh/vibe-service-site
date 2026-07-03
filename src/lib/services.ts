import servicesData from '@/data/services.json'
import { contentLocale, type Locale } from './i18n/config'

export const SERVICE_SLUGS = [
  'substance-in-uk',
  'company-registration',
  'accounting',
  'sales-organisation',
] as const

import { optimizeRemoteImageUrl } from './image-url'

export const SERVICE_IMAGES: Record<ServiceSlug, string> = {
  'substance-in-uk': optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1497366216548-37526070297c',
    640,
    75,
  ),
  'company-registration': optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    640,
    75,
  ),
  accounting: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
    640,
    75,
  ),
  'sales-organisation': optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1552664730-d307ca884978',
    640,
    75,
  ),
}

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export type ServiceFaqItem = {
  question: string
  answer: string
}

export type ServiceSection = {
  title: string
  paragraphs: string[]
}

export type ServiceOffer = {
  badge: string
  highlight: string
  sub: string
}

export type ServiceView = {
  meta: {
    title: string
    description: string
    keywords: string[]
  }
  h1: string
  lead: string
  offer: ServiceOffer
  sections: ServiceSection[]
  benefits: string[]
  faq: ServiceFaqItem[]
  card: {
    title: string
    desc: string
  }
  relatedServices: ServiceSlug[]
  relatedBlogSlugs: string[]
}

export type Service = {
  slug: ServiceSlug
  ru: ServiceView
  en: ServiceView
}

const services = servicesData.services as Service[]

export function isValidServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(slug)
}

export function getAllServices(): Service[] {
  return services
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getServiceView(service: Service, locale: Locale): ServiceView {
  return service[contentLocale(locale)]
}

export function servicePath(slug: ServiceSlug): string {
  return `/services/${slug}`
}
