import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import ua from '@/locales/ua.json'
import de from '@/locales/de.json'
import fr from '@/locales/fr.json'
import { buildFaqPageJsonLd } from './service-seo'
import { SERVICE_SLUGS, getServiceBySlug, getServiceView } from './services'
import { contentLocale, localePath, type Locale } from './i18n/config'
import { absoluteUrl } from './seo'
import { siteConfig } from './site'

const COPY_BY_LOCALE: Record<Locale, typeof en> = { en, ru, ua, de, fr }
const HOW_WE_WORK_STEPS = ['step1', 'step2', 'step3', 'step4'] as const

export function buildHomeJsonLd(locale: Locale) {
  const copy = COPY_BY_LOCALE[locale] ?? en
  const faqItems = copy.seo.faq
  const homePath = localePath('/', locale)
  const isRu = contentLocale(locale) === 'ru'
  const title = isRu ? siteConfig.titleRu : siteConfig.titleEn
  const description = isRu ? siteConfig.descriptionRu : siteConfig.descriptionEn

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.name,
        url: siteConfig.url,
        slogan: siteConfig.seo.slogan,
        email: siteConfig.email,
        telephone: siteConfig.phoneE164,
        description,
        knowsAbout: siteConfig.seo.knowsAbout,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: siteConfig.email,
            telephone: siteConfig.phoneE164,
            url: siteConfig.telegramOperatorUrl,
            availableLanguage: ['English', 'German', 'Russian', 'Ukrainian', 'French'],
            areaServed: siteConfig.seo.areaServed,
          },
        ],
        sameAs: [siteConfig.telegramChannelUrl, siteConfig.trustpilotUrl],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description,
        publisher: { '@id': `${siteConfig.url}/#organization` },
        inLanguage: ['en', 'de', 'ru', 'uk', 'fr'],
        potentialAction: [
          {
            '@type': 'CommunicateAction',
            target: absoluteUrl(`${homePath}#kontakt`),
            name: isRu ? 'Записаться на консультацию' : 'Book a consultation',
          },
          {
            '@type': 'ReadAction',
            target: absoluteUrl(localePath('/blog', locale)),
            name: `Read ${siteConfig.name} blog`,
          },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteConfig.url}/#service`,
        name: `${siteConfig.name} — UK business consulting`,
        description,
        url: absoluteUrl(homePath),
        provider: { '@id': `${siteConfig.url}/#organization` },
        areaServed: siteConfig.seo.areaServed.map((name) => ({
          '@type': 'Place',
          name,
        })),
        serviceType: siteConfig.seo.knowsAbout,
        termsOfService: absoluteUrl(localePath('/privacy', locale)),
      },
      {
        '@type': 'WebPage',
        '@id': `${absoluteUrl(homePath)}#webpage`,
        url: absoluteUrl(homePath),
        name: title,
        description,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        about: { '@id': `${siteConfig.url}/#service` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl(siteConfig.ogImage),
        },
        inLanguage: locale === 'ua' ? 'uk' : locale,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '#faq-heading'],
        },
      },
      buildFaqPageJsonLd(faqItems, absoluteUrl(homePath), '#faq'),
      {
        '@type': 'ItemList',
        '@id': `${absoluteUrl(homePath)}#services-list`,
        name: `${siteConfig.name} services`,
        itemListElement: SERVICE_SLUGS.map((slug, index) => {
          const service = getServiceBySlug(slug)
          if (!service) return null
          const view = getServiceView(service, locale)
          return {
            '@type': 'ListItem',
            position: index + 1,
            name: view.card.title,
            url: absoluteUrl(localePath(`/services/${slug}`, locale)),
          }
        }).filter(Boolean),
      },
      {
        '@type': 'HowTo',
        '@id': `${absoluteUrl(homePath)}#how-to`,
        name: copy.howWeWork.heading,
        description: siteConfig.seo.slogan,
        totalTime: 'P3M',
        step: HOW_WE_WORK_STEPS.map((key, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: copy.howWeWork[key].title,
          text: copy.howWeWork[key].desc,
          url: absoluteUrl(`${homePath}#how-we-work`),
        })),
      },
    ],
  }
}
