import { optimizeRemoteImageUrl } from '@/lib/image-url'

export const siteConfig = {
  name: 'Vibe Services',
  title: 'Vibe Services — UK Business Setup & Substance',
  titleRu:
    'Открытие бизнеса в Великобритании под ключ — Vibe Services',
  titleEn:
    'UK Business Setup & Substance in 3 Months — Vibe Services',
  description:
    'Full UK market entry: company registration, real office substance, accounting, and sales setup. From idea to first sale in 3 months.',
  descriptionRu:
    'Комплексное сопровождение бизнеса в UK: substance, регистрация LTD/LLP, бухгалтерия и организация продаж. От идеи до первой продажи за 3 месяца.',
  descriptionEn:
    'Turnkey UK business setup: substance, company registration, accounting and sales organisation. From idea to first sale in 3 months.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vibe-service.co.uk',
  email: 'info@vibe-service.co.uk',
  phone: '+44 7441 429829',
  phoneE164: '+447441429829',
  phoneTelUrl: 'tel:+447441429829',
  telegram: '+447771656297',
  telegramChannelUrl: 'https://t.me/+447771656297',
  telegramOperatorUrl: 'https://t.me/+447771656297',
  whatsappPhone: '+447771656297',
  whatsappUrl:
    'https://api.whatsapp.com/send/?phone=447771656297&text&type=phone_number&app_absent=0',
  trustpilotUrl: 'https://www.trustpilot.com/review/vibe-service.co.uk',
  office: {
    company: 'Vibe Services',
    streetAddress: 'Unit A3, Riverside Industrial Estate',
    locality: 'Littlehampton, West Sussex',
    postalCode: 'BN17 5DF',
    country: 'GB',
    formatted: 'Unit A3, Riverside Industrial Estate, Littlehampton, West Sussex, BN17 5DF',
    googleMapsQuery: 'Unit A3, Riverside Industrial Estate, Littlehampton, West Sussex, BN17 5DF',
  },
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Unit+A3%2C+Riverside+Industrial+Estate%2C+Littlehampton%2C+West+Sussex%2C+BN17+5DF',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Unit+A3%2C+Riverside+Industrial+Estate%2C+Littlehampton%2C+West+Sussex%2C+BN17+5DF&output=embed',
  locale: 'en_GB',
  alternateLocale: 'ru_RU',
  ogImage: optimizeRemoteImageUrl(
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
    1200,
    75,
  ),
  ogImageAlt: 'Vibe Services — UK business consulting and substance services',
  themeColor: '#0A2540',
  keywordsRu: [
    'substance в UK',
    'открытие бизнеса в Великобритании',
    'регистрация компании UK',
    'бухгалтерия UK',
    'юридический адрес UK',
    'Vibe Services',
  ],
  keywordsEn: [
    'substance in UK',
    'UK business setup',
    'company registration UK',
    'UK accounting services',
    'registered office UK',
    'Vibe Services',
  ],
  keywords: [
    'substance in UK',
    'UK business setup',
    'открытие бизнеса в Великобритании',
    'substance в UK',
    'Vibe Services',
  ],
  seo: {
    slogan: 'UK business setup in 3 months — not 12',
    disclaimer:
      'Vibe Services — консалтинговая компания по сопровождению международного бизнеса в Великобритании.',
    disclaimerEn:
      'Vibe Services is a UK consulting firm helping international businesses establish real substance and operations in Great Britain.',
    contentLanguages: 'en, de, ru, ua, fr',
    knowsAbout: [
      'UK company registration',
      'Substance in UK',
      'HMRC compliance',
      'UK VAT registration',
      'Registered office UK',
      'UK sales organisation',
      'LTD company setup',
      'LLP registration UK',
      'UK accounting',
      'Payroll UK',
      'International business UK',
    ],
    stats: {
      monthsToLaunch: 3,
      casesCompleted: 6,
      jurisdictions: 'UK',
      teamSize: 3,
    },
    areaServed: ['United Kingdom', 'European Union', 'Asia', 'Middle East', 'Worldwide'],
  },
  pages: {
    blog: {
      title: 'Блог Vibe Services — бизнес в Великобритании',
      titleEn: 'Vibe Services Blog — Doing Business in the UK',
      description:
        'Статьи о substance в UK, регистрации компаний, налогах и открытии бизнеса в Великобритании.',
      descriptionEn:
        'Articles on UK substance, company registration, tax compliance and market entry.',
    },
    privacy: {
      title: 'Политика конфиденциальности Vibe Services',
      titleEn: 'Vibe Services Privacy Policy',
      description:
        'Как Vibe Services собирает, использует и защищает персональные данные.',
      descriptionEn:
        'How Vibe Services collects, uses and protects personal data.',
    },
  },
}
