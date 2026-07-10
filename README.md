# Vibe Services — Website

Multilingual marketing site for [Vibe Services](https://vibe-service.co.uk) — UK business consulting (substance, registration, accounting, sales).

## Stack

Next.js 14 · TypeScript · CSS Modules · i18next (en, de, ru, ua, fr)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3002](http://localhost:3002)

## Configuration

- Site metadata & contacts: `src/lib/site.ts`
- Translations: `src/locales/*.json`
- Services content: `src/data/services.json`
- Blog posts: `src/data/blog.json`
- Contact form → Telegram: set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env`

## Build

```bash
npm run build
npm start
```
