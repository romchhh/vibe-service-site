export const siteConfig = {
  name: 'CardProc',
  title: 'CardProc — Stripe Payment Processing',
  titleRu:
    'CardProc — процессинг Stripe от 1.5% | Прогретые аккаунты и приём платежей',
  description:
    'Stripe payment processing for any niche from 1.5%. Warmed-up accounts, 99.9% uptime, CRM access and unlimited withdrawals in EUR, USD, PLN and USDT.',
  descriptionRu:
    'Процессинг Stripe под любые ниши от 1.5%. Прогретые аккаунты с оборотом, аптайм 99.9%, CRM, вывод в EUR/USD/USDT. Бесплатная консультация эксперта.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cardproc.com',
  email: 'hello@cardproc.com',
  telegram: '@cardproc',
  telegramChannelUrl: 'https://t.me/cardproc',
  telegramOperatorUrl: 'https://t.me/cardproc',
  locale: 'ru_RU',
  alternateLocale: 'en_US',
  ogImage: '/images/hero-stripe.png',
  ogImageAlt: 'CardProc — международный процессинг платежей через Stripe',
  themeColor: '#635BFF',
  keywords: [
    'Stripe processing',
    'Stripe payment processing',
    'payment processing',
    'Stripe accounts',
    'warmed Stripe accounts',
    'card processing',
    'international payments',
    'high-risk processing',
    'прогретые Stripe аккаунты',
    'процессинг Stripe',
    'приём платежей',
    'подключение Stripe',
    'международные платежи',
    'процессинг платежей',
    'Stripe для бизнеса',
  ],
  pages: {
    blog: {
      title: 'Блог CardProc — Stripe, процессинг и интеграции',
      titleEn: 'CardProc Blog — Stripe, processing and integrations',
      description:
        'Статьи CardProc о процессинге Stripe, прогретых аккаунтах, интеграциях и приёме международных платежей для бизнеса.',
      descriptionEn:
        'CardProc articles on Stripe processing, warmed accounts, integrations and accepting international payments.',
    },
    privacy: {
      title: 'Политика конфиденциальности CardProc',
      titleEn: 'CardProc Privacy Policy',
      description:
        'Как CardProc собирает, использует и защищает персональные данные при использовании сайта и отправке заявок.',
      descriptionEn:
        'How CardProc collects, uses and protects personal data when you use our website and contact forms.',
    },
  },
}
