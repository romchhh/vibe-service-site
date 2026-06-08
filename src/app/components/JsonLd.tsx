import ru from '@/locales/ru.json'
import { siteConfig } from '@/lib/site'
import { absoluteUrl } from '@/lib/seo'
import JsonLdScript from './seo/JsonLdScript'

const faqItems = ru.seo.faq

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 900,
        },
        description: siteConfig.descriptionRu,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: siteConfig.email,
            url: siteConfig.telegramOperatorUrl,
            availableLanguage: ['Russian', 'English'],
            areaServed: 'Worldwide',
          },
        ],
        sameAs: [siteConfig.telegramChannelUrl, siteConfig.telegramOperatorUrl],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.descriptionRu,
        publisher: { '@id': `${siteConfig.url}/#organization` },
        inLanguage: ['ru', 'en'],
        potentialAction: {
          '@type': 'CommunicateAction',
          target: absoluteUrl('/#kontakt'),
          name: 'Оставить заявку',
        },
      },
      {
        '@type': 'FinancialService',
        '@id': `${siteConfig.url}/#service`,
        name: `${siteConfig.name} — процессинг Stripe`,
        description: siteConfig.descriptionRu,
        url: siteConfig.url,
        provider: { '@id': `${siteConfig.url}/#organization` },
        areaServed: {
          '@type': 'Place',
          name: 'Worldwide',
        },
        serviceType: [
          'Stripe payment processing',
          'Stripe account setup',
          'Payment routing',
          'International payment acceptance',
        ],
        offers: {
          '@type': 'Offer',
          name: 'Процессинг Stripe от 1.5%',
          description:
            'Подключение Stripe-аккаунта, прогретые аккаунты, CRM и вывод средств без ограничений.',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '1.5',
            priceCurrency: 'USD',
            unitText: 'percent commission',
          },
          availability: 'https://schema.org/InStock',
          url: absoluteUrl('/#kontakt'),
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.titleRu,
        description: siteConfig.descriptionRu,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        about: { '@id': `${siteConfig.url}/#service` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl(siteConfig.ogImage),
        },
        inLanguage: 'ru',
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteConfig.url}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${siteConfig.url}/#services-list`,
        name: 'Услуги CardProc',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Компания + банк + Stripe под ключ',
            url: absoluteUrl('/#services'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Процессинг платежей от 1.5%',
            url: absoluteUrl('/#services'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Прогретые Stripe-аккаунты',
            url: absoluteUrl('/#accounts'),
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Бесплатная консультация эксперта',
            url: absoluteUrl('/#kontakt'),
          },
        ],
      },
    ],
  }

  return <JsonLdScript data={schema} />
}
