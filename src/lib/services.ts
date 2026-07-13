import servicesData from '@/data/services.json'
import servicesDe from '@/data/services-locales/de.json'
import servicesFr from '@/data/services-locales/fr.json'
import servicesUa from '@/data/services-locales/ua.json'
import { pickLocalized } from './content-locale'
import type { Locale } from './i18n/config'

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
  /** Continuous “Why choose us” copy shown as prose when set */
  whyChooseUs?: string
  faq: ServiceFaqItem[]
  card: {
    title: string
    desc: string
  }
  relatedServices: ServiceSlug[]
  relatedBlogSlugs: string[]
}

type ServiceBase = {
  slug: ServiceSlug
  en: ServiceView
  ru: ServiceView
}

export type Service = ServiceBase & {
  ua: ServiceView
  de: ServiceView
  fr: ServiceView
}

const localeViews = {
  ua: servicesUa,
  de: servicesDe,
  fr: servicesFr,
} as const

function buildServices(): Service[] {
  return (servicesData.services as ServiceBase[]).map((service) => ({
    ...service,
    ua: localeViews.ua[service.slug] as ServiceView,
    de: localeViews.de[service.slug] as ServiceView,
    fr: localeViews.fr[service.slug] as ServiceView,
  }))
}

const services = buildServices()

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
  return pickLocalized(service, locale)
}

export function servicePath(slug: ServiceSlug): string {
  return `/services/${slug}`
}
