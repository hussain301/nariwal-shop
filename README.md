# Nariwal API — nariwal.shop

A production-quality storefront where developers buy API credits and manage
keys for six AI APIs (Chat Completions, Vision, Text-to-Speech, Image
Generation, Embeddings, Transcription).

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. Dark,
modern, OpenRouter-style theme.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # must pass with zero errors
npm start
```

## Environment variables

Copy `.env.example` to `.env` and fill in what you need:

| Variable | Required | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | No | Enables **real** Stripe Checkout. Without it, `/api/checkout` runs in demo mode and returns a simulated `nvsk-` key. |
| `STRIPE_PRICE_STARTER` | Only with Stripe | Stripe Price ID for the $9 Starter pack |
| `STRIPE_PRICE_PRO` | Only with Stripe | Stripe Price ID for the $29 Pro pack |
| `STRIPE_PRICE_SCALE` | Only with Stripe | Stripe Price ID for the $99 Scale pack |
| `NEXT_PUBLIC_APP_URL` | No | Used for Stripe success/cancel URLs (defaults to `http://localhost:3000`) |

Create the three products/prices in the Stripe Dashboard, then paste the
`price_…` IDs into `.env`.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Next.js** (auto-detected). No build overrides needed.
4. Add environment variables (see table above) under *Project → Settings → Environment Variables*.
5. Deploy. Then point `nariwal.shop` at the project via *Settings → Domains*.

## Project structure

```
app/
  page.tsx            Landing (hero with typing demo, catalog, pricing, FAQ)
  apis/page.tsx        Full catalog with search/filter + per-API code tabs
  pricing/page.tsx     Credit packs, comparison table, pricing FAQ
  checkout/page.tsx    Order summary + card form → POST /api/checkout
  playground/page.tsx  Interactive simulated streaming playground
  docs/page.tsx        Quickstart, auth, error codes, rate limits
  dashboard/page.tsx   Demo dashboard: stats, chart, API key management
  auth/signin|signup   Demo auth (localStorage-backed)
  api/
    checkout/route.ts  Stripe Checkout if STRIPE_SECRET_KEY set, else demo mode
    playground/route.ts  Simulated AI responses with realistic latency
    health/route.ts      { ok: true } health check
components/           Navbar, Footer, HeroDemo, CodeTabs, Accordion, AuthForm, Icon
lib/store.ts          Product catalog, credit packs, key generators
```

## Notes

- Auth and API keys in the demo are stored in `localStorage` — wire a real
  database (e.g. Postgres via Prisma/Supabase) before going live.
- Stripe integration is honest-but-stubbed: the route checks for
  `STRIPE_SECRET_KEY` and never crashes without it.
- No emojis in the UI; all copy is written, not lorem ipsum.
