import type { Locale } from './i18n/config'
import type { ServiceSlug } from './services'
import { siteConfig } from './site'

export type PageSeoMeta = {
  title: string
  description: string
  keywords: string[]
  ogImageAlt: string
}

export const HOME_SEO: Record<Locale, PageSeoMeta> = {
  en: {
    title: siteConfig.titleEn,
    description: siteConfig.descriptionEn,
    keywords: siteConfig.keywordsEn,
    ogImageAlt: 'Vibe Services — UK business setup and substance consulting in London',
  },
  de: {
    title: 'UK-Geschäftsaufbau & Substance in 3 Monaten — Vibe Services',
    description:
      'Schlüsselfertiger UK-Markteintritt: Substance, Firmengründung (LTD/LLP), Buchhaltung, VAT, Payroll und Vertriebsaufbau. Von der Idee bis zum ersten Verkauf in 3 Monaten.',
    keywords: [
      'Substance UK',
      'Geschäftsaufbau UK',
      'Firmengründung UK',
      'Buchhaltung UK',
      'Registered Office UK',
      'Vibe Services',
    ],
    ogImageAlt: 'Vibe Services — UK-Geschäftsberatung und Substance in London',
  },
  ru: {
    title: siteConfig.titleRu,
    description: siteConfig.descriptionRu,
    keywords: siteConfig.keywordsRu,
    ogImageAlt: 'Vibe Services — консалтинг по открытию бизнеса в Великобритании',
  },
  ua: {
    title: 'Відкриття бізнесу у Великобританії під ключ — Vibe Services',
    description:
      'Комплексний супровід бізнесу в UK: substance, реєстрація LTD/LLP, бухгалтерія, VAT, payroll та організація продажів. Від ідеї до першого продажу за 3 місяці.',
    keywords: [
      'substance у UK',
      'відкриття бізнесу у Великобританії',
      'реєстрація компанії UK',
      'бухгалтерія UK',
      'юридична адреса UK',
      'Vibe Services',
    ],
    ogImageAlt: 'Vibe Services — консалтинг з відкриття бізнесу у Великобританії',
  },
  fr: {
    title: 'Création d\'entreprise au Royaume-Uni clé en main — Vibe Services',
    description:
      'Entrée sur le marché britannique clé en main : substance, immatriculation LTD/LLP, comptabilité, TVA, paie et organisation commerciale. De l\'idée à la première vente en 3 mois.',
    keywords: [
      'substance UK',
      'création entreprise Royaume-Uni',
      'immatriculation société UK',
      'comptabilité UK',
      'adresse enregistrée UK',
      'Vibe Services',
    ],
    ogImageAlt: 'Vibe Services — conseil en création d\'entreprise au Royaume-Uni',
  },
}

export const BLOG_SEO: Record<Locale, PageSeoMeta> = {
  en: {
    title: siteConfig.pages.blog.titleEn,
    description: siteConfig.pages.blog.descriptionEn,
    keywords: [
      `${siteConfig.name} blog`,
      'UK substance',
      'UK company registration',
      'UK banking non-residents',
      'HMRC compliance',
    ],
    ogImageAlt: 'Vibe Services blog about doing business in the UK',
  },
  de: {
    title: 'Vibe Services Blog — Geschäft im Vereinigten Königreich',
    description:
      'Artikel über Substance in UK, Firmengründung, Bankkonto für Nichtansässige, Steuern und Markteintritt in Großbritannien.',
    keywords: [
      'Vibe Services Blog',
      'Substance UK',
      'Firmengründung UK',
      'UK Bankkonto',
      'HMRC',
    ],
    ogImageAlt: 'Vibe Services Blog — Geschäft in Großbritannien',
  },
  ru: {
    title: siteConfig.pages.blog.title,
    description: siteConfig.pages.blog.description,
    keywords: [
      `блог ${siteConfig.name}`,
      'substance UK',
      'регистрация компании UK',
      'банковский счёт UK',
      'налоги UK',
    ],
    ogImageAlt: 'Блог Vibe Services о бизнесе в Великобритании',
  },
  ua: {
    title: 'Блог Vibe Services — бізнес у Великобританії',
    description:
      'Статті про substance у UK, реєстрацію компаній, банківські рахунки для нерезидентів, податки та вихід на британський ринок.',
    keywords: [
      `блог ${siteConfig.name}`,
      'substance UK',
      'реєстрація компанії UK',
      'банківський рахунок UK',
      'податки UK',
    ],
    ogImageAlt: 'Блог Vibe Services про бізнес у Великобританії',
  },
  fr: {
    title: 'Blog Vibe Services — Entreprendre au Royaume-Uni',
    description:
      'Articles sur la substance au UK, l\'immatriculation, le compte bancaire pour non-résidents, la fiscalité et l\'entrée sur le marché britannique.',
    keywords: [
      `blog ${siteConfig.name}`,
      'substance UK',
      'création société UK',
      'compte bancaire UK',
      'fiscalité UK',
    ],
    ogImageAlt: 'Blog Vibe Services — entreprendre au Royaume-Uni',
  },
}

export const PRIVACY_SEO: Record<Locale, PageSeoMeta> = {
  en: {
    title: siteConfig.pages.privacy.titleEn,
    description: siteConfig.pages.privacy.descriptionEn,
    keywords: [`${siteConfig.name} privacy policy`, 'personal data', 'GDPR', 'UK business'],
    ogImageAlt: 'Vibe Services privacy policy',
  },
  de: {
    title: 'Datenschutzerklärung — Vibe Services',
    description: 'Wie Vibe Services personenbezogene Daten erhebt, nutzt und schützt.',
    keywords: ['Datenschutz Vibe Services', 'personenbezogene Daten', 'DSGVO', 'UK Business'],
    ogImageAlt: 'Vibe Services Datenschutzerklärung',
  },
  ru: {
    title: siteConfig.pages.privacy.title,
    description: siteConfig.pages.privacy.description,
    keywords: [
      `политика конфиденциальности ${siteConfig.name}`,
      'персональные данные',
      'GDPR',
      'UK business',
    ],
    ogImageAlt: 'Политика конфиденциальности Vibe Services',
  },
  ua: {
    title: 'Політика конфіденційності — Vibe Services',
    description: 'Як Vibe Services збирає, використовує та захищає персональні дані.',
    keywords: [
      `політика конфіденційності ${siteConfig.name}`,
      'персональні дані',
      'GDPR',
      'бізнес UK',
    ],
    ogImageAlt: 'Політика конфіденційності Vibe Services',
  },
  fr: {
    title: 'Politique de confidentialité — Vibe Services',
    description: 'Comment Vibe Services collecte, utilise et protège les données personnelles.',
    keywords: [
      `politique de confidentialité ${siteConfig.name}`,
      'données personnelles',
      'RGPD',
      'business UK',
    ],
    ogImageAlt: 'Politique de confidentialité Vibe Services',
  },
}

const SERVICE_META_DE: Record<ServiceSlug, Pick<PageSeoMeta, 'title' | 'description' | 'keywords'>> = {
  'substance-in-uk': {
    title: 'Substance in the UK — echtes Büro & lokale Präsenz | Vibe Services',
    description:
      'Wir schaffen echte operative Präsenz im UK: Registered Office, physisches Büro, lokaler Director und Präsenzmanagement — vollständig HMRC- und bankenkonform.',
    keywords: ['Substance UK', 'Registered Office UK', 'lokaler Director UK', 'Vibe Services'],
  },
  'company-registration': {
    title: 'Firmengründung UK (LTD/LLP) — Vibe Services',
    description:
      'Schlüsselfertige Registrierung einer UK-Gesellschaft: Struktur, Dokumente, Eintragung bei Companies House.',
    keywords: ['Firmengründung UK', 'LTD UK', 'LLP UK', 'Companies House', 'Vibe Services'],
  },
  accounting: {
    title: 'Buchhaltung & Steuern UK — Vibe Services',
    description:
      'Buchhaltung, VAT, Payroll, Jahresabschlüsse und Steuerberatung für UK-Unternehmen mit internationalen Eigentümern.',
    keywords: ['Buchhaltung UK', 'VAT UK', 'Payroll UK', 'HMRC', 'Vibe Services'],
  },
  'sales-organisation': {
    title: 'Vertrieb & Markteintritt UK — Vibe Services',
    description:
      'Marktanalyse, Marketing und Aufbau eines UK-Vertriebsteams — vom Launch bis zum ersten Umsatz.',
    keywords: ['Vertrieb UK', 'Markteintritt UK', 'Sales UK', 'Vibe Services'],
  },
}

const SERVICE_META_FR: Record<ServiceSlug, Pick<PageSeoMeta, 'title' | 'description' | 'keywords'>> = {
  'substance-in-uk': {
    title: 'Substance in the UK — bureau réel & présence locale | Vibe Services',
    description:
      'Nous créons une présence opérationnelle réelle au UK : adresse enregistrée, bureau physique, directeur local et gestion de présence — pleinement conforme HMRC et banques.',
    keywords: ['substance UK', 'adresse enregistrée UK', 'directeur local UK', 'Vibe Services'],
  },
  'company-registration': {
    title: 'Création de société UK (LTD/LLP) — Vibe Services',
    description:
      'Immatriculation clé en main au Royaume-Uni : structure, documents et dépôt auprès de Companies House.',
    keywords: ['création société UK', 'LTD UK', 'LLP UK', 'Companies House', 'Vibe Services'],
  },
  accounting: {
    title: 'Comptabilité & fiscalité UK — Vibe Services',
    description:
      'Comptabilité, TVA, paie, comptes annuels et conseil fiscal pour sociétés UK à propriétaires internationaux.',
    keywords: ['comptabilité UK', 'TVA UK', 'paie UK', 'HMRC', 'Vibe Services'],
  },
  'sales-organisation': {
    title: 'Organisation commerciale UK — Vibe Services',
    description:
      'Analyse de marché, marketing et montée d\'une équipe commerciale UK — du lancement au premier chiffre d\'affaires.',
    keywords: ['ventes UK', 'entrée marché UK', 'commercial UK', 'Vibe Services'],
  },
}

const SERVICE_META_UA: Record<ServiceSlug, Pick<PageSeoMeta, 'title' | 'description' | 'keywords'>> = {
  'substance-in-uk': {
    title: 'Substance in the UK — реальний офіс і присутність | Vibe Services',
    description:
      'Створюємо реальну операційну присутність у UK: юрадреса, фізичний офіс, локальний директор і управління присутністю — повна відповідність HMRC і банкам.',
    keywords: ['substance у UK', 'юрадреса UK', 'директор UK', 'Vibe Services'],
  },
  'company-registration': {
    title: 'Реєстрація компанії UK (LTD/LLP) — Vibe Services',
    description:
      'Реєстрація UK-компанії під ключ: структура, документи та подання в Companies House.',
    keywords: ['реєстрація компанії UK', 'LTD UK', 'LLP UK', 'Companies House', 'Vibe Services'],
  },
  accounting: {
    title: 'Бухгалтерія та податки UK — Vibe Services',
    description:
      'Облік, VAT, payroll, річна звітність і податковий супровід для UK-компаній з міжнародними власниками.',
    keywords: ['бухгалтерія UK', 'VAT UK', 'payroll UK', 'HMRC', 'Vibe Services'],
  },
  'sales-organisation': {
    title: 'Організація продажів у UK — Vibe Services',
    description:
      'Аналіз ринку, маркетинг і побудова команди продажів у UK — від запуску до першого доходу.',
    keywords: ['продажі UK', 'вихід на ринок UK', 'sales UK', 'Vibe Services'],
  },
}

export function getHomeSeo(locale: Locale): PageSeoMeta {
  return HOME_SEO[locale]
}

export function getBlogSeo(locale: Locale): PageSeoMeta {
  return BLOG_SEO[locale]
}

export function getPrivacySeo(locale: Locale): PageSeoMeta {
  return PRIVACY_SEO[locale]
}

export function getServiceSeoMeta(
  slug: ServiceSlug,
  locale: Locale,
  fallback: PageSeoMeta,
): PageSeoMeta {
  if (locale === 'de' && SERVICE_META_DE[slug]) {
    return { ...fallback, ...SERVICE_META_DE[slug] }
  }
  if (locale === 'fr' && SERVICE_META_FR[slug]) {
    return { ...fallback, ...SERVICE_META_FR[slug] }
  }
  if (locale === 'ua' && SERVICE_META_UA[slug]) {
    return { ...fallback, ...SERVICE_META_UA[slug] }
  }
  return fallback
}

export const REVIEWS_SEO: Record<Locale, PageSeoMeta> = {
  en: {
    title: 'Client Reviews — Vibe Services UK Business Consulting',
    description:
      'Read verified client reviews about UK business setup, substance, accounting and market entry. Rated 4.9/5 on Trustpilot.',
    keywords: [
      'Vibe Services reviews',
      'UK business setup reviews',
      'Trustpilot Vibe Services',
      'substance UK testimonials',
    ],
    ogImageAlt: 'Vibe Services client reviews',
  },
  de: {
    title: 'Kundenbewertungen — Vibe Services UK-Geschäftsberatung',
    description:
      'Echte Kundenbewertungen zu UK-Geschäftsaufbau, Substance, Buchhaltung und Markteintritt. 4,9/5 auf Trustpilot.',
    keywords: ['Vibe Services Bewertungen', 'UK Geschäftsaufbau', 'Trustpilot'],
    ogImageAlt: 'Vibe Services Kundenbewertungen',
  },
  ru: {
    title: 'Отзывы клиентов — Vibe Services консалтинг по бизнесу в UK',
    description:
      'Отзывы клиентов об открытии бизнеса в Великобритании: substance, регистрация, бухгалтерия. Рейтинг 4.9/5 на Trustpilot.',
    keywords: ['отзывы Vibe Services', 'открытие бизнеса UK отзывы', 'Trustpilot'],
    ogImageAlt: 'Отзывы клиентов Vibe Services',
  },
  ua: {
    title: 'Відгуки клієнтів — Vibe Services консалтинг з бізнесу у UK',
    description:
      'Відгуки клієнтів про відкриття бізнесу у Великобританії: substance, реєстрація, бухгалтерія. Рейтинг 4.9/5 на Trustpilot.',
    keywords: ['відгуки Vibe Services', 'відкриття бізнесу UK', 'Trustpilot'],
    ogImageAlt: 'Відгуки клієнтів Vibe Services',
  },
  fr: {
    title: 'Avis clients — Vibe Services conseil business UK',
    description:
      'Avis clients sur la création d\'entreprise au UK : substance, immatriculation, comptabilité. Note 4,9/5 sur Trustpilot.',
    keywords: ['avis Vibe Services', 'création entreprise UK', 'Trustpilot'],
    ogImageAlt: 'Avis clients Vibe Services',
  },
}

export function getReviewsSeo(locale: Locale): PageSeoMeta {
  return REVIEWS_SEO[locale]
}

export const BREADCRUMB_LABELS = {
  blog: { en: 'Blog', de: 'Blog', ru: 'Блог', ua: 'Блог', fr: 'Blog' },
  reviews: { en: 'Reviews', de: 'Bewertungen', ru: 'Отзывы', ua: 'Відгуки', fr: 'Avis' },
  services: { en: 'Services', de: 'Leistungen', ru: 'Услуги', ua: 'Послуги', fr: 'Services' },
  privacy: {
    en: 'Privacy Policy',
    de: 'Datenschutz',
    ru: 'Политика конфиденциальности',
    ua: 'Політика конфіденційності',
    fr: 'Politique de confidentialité',
  },
  readAlso: { en: 'Read also', de: 'Lesen Sie auch', ru: 'Читайте также', ua: 'Читайте також', fr: 'À lire aussi' },
} as const satisfies Record<string, Record<Locale, string>>
