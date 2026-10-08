import Link from "next/link";
import { PRODUCTS, PACKS } from "@/lib/store";
import { Icon } from "@/components/Icon";
import { HeroDemo } from "@/components/HeroDemo";
import { Accordion } from "@/components/Accordion";

const FAQS = [
  {
    q: "How does credit-based pricing work?",
    a: "You buy credits once — 1 credit equals $0.01 of API usage. Every API call deducts credits based on its published rate (for example, chat costs $0.40 per million tokens). Credits never expire, so you only pay for what you actually use.",
  },
  {
    q: "Is Nariwal API OpenAI-compatible?",
    a: "Yes. Our chat, embeddings, image, and audio endpoints follow the OpenAI request/response shape. In most cases you can switch by changing only the base URL to https://api.nariwal.shop/v1 and your API key.",
  },
  {
    q: "Do I need a subscription?",
    a: "No. There are no monthly plans and no seat fees. Buy a credit pack once and top up whenever you run low. The Scale pack adds team seats and higher rate limits for organizations.",
  },
  {
    q: "How fast can I get started?",
    a: "About two minutes: create an account, buy a Starter pack, copy your API key from the dashboard, and make your first curl request. The docs page has copy-paste quickstart snippets in curl, Python, and Node.",
  },
  {
    q: "What happens when my credits run out?",
    a: "API calls return a 402 Payment Required error and nothing is charged. Top up from the pricing page at any time — your keys, usage history, and settings stay exactly as they were.",
  },
  {
    q: "Is my data used for training?",
    a: "No. Requests sent through Nariwal API are never used to train models. Traffic is encrypted in transit, keys are stored as salted hashes, and you can revoke any key instantly from the dashboard.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="animate-fade-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-200">
                <Icon name="sparkle" className="h-3.5 w-3.5" />
                New: Vision &amp; Image Generation APIs are live
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Production AI APIs,
                <br />
                <span className="text-gradient">priced for builders.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                Chat, vision, voice, and image APIs behind one key and one
                credit balance. OpenAI-compatible endpoints, 99.99% uptime,
                and no subscription — top up only when you need to.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/pricing" className="btn-primary">
                  Get an API key
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
                <Link href="/playground" className="btn-ghost">
                  <Icon name="play" className="h-4 w-4" />
                  Try the playground
                </Link>
              </div>
              <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.07] pt-6">
                {[
                  ["99.99%", "Uptime SLA"],
                  ["0.4s", "Median latency"],
                  ["6", "APIs, one key"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-2xl font-bold text-white">{v}</div>
                    <div className="mt-1 text-xs text-zinc-500">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-float">
              <HeroDemo />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-6 sm:px-6 lg:px-8">
          {[
            ["shield", "SOC 2-ready infrastructure"],
            ["terminal", "OpenAI-compatible endpoints"],
            ["zap", "Streaming on every model"],
            ["globe", "Edge network in 12 regions"],
            ["check", "No data used for training"],
          ].map(([icon, label]) => (
            <span key={label} className="flex items-center gap-2 text-sm text-zinc-500">
              <Icon name={icon} className="h-4 w-4 text-violet-300/80" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* API CATALOG */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">Catalog</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Six APIs. One key. Zero config.
          </h2>
          <p className="mt-4 text-zinc-400">
            Every product shares the same auth, billing, and rate-limit
            system. Pick what you need — credits work across all of them.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/apis#${p.slug}`}
              className="card card-hover group p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/25 to-violet-500/25 text-violet-200 ring-1 ring-violet-400/30">
                <Icon name={p.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.tagline}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                <span className="font-mono text-xs text-zinc-500">
                  <span className="text-zinc-200">{p.price}</span> {p.unit}
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-violet-300 transition group-hover:gap-2">
                  View docs <Icon name="arrowRight" className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-white/[0.06] bg-[#0c0c12]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Live in under two minutes
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Get your API key",
                d: "Create an account and generate a key from the dashboard. Each key can be scoped, labeled, and revoked independently.",
              },
              {
                n: "02",
                t: "Top up credits",
                d: "Buy a credit pack once — 1 credit equals $0.01 of usage. Credits never expire and work across all six APIs.",
              },
              {
                n: "03",
                t: "Call the API",
                d: "Send a request with your key in the Authorization header. OpenAI-compatible, so existing code needs one line changed.",
              },
            ].map((s) => (
              <div key={s.n} className="card p-7">
                <div className="font-mono text-sm font-semibold text-violet-300">{s.n}</div>
                <h3 className="mt-3 text-lg font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/docs" className="btn-ghost">
              <Icon name="doc" className="h-4 w-4" />
              Read the quickstart
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">Pricing</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple credit packs. No subscription.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            1 credit = $0.01 of API usage. Buy once, use across every API,
            top up whenever you like.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`card p-7 ${pack.popular ? "relative border-violet-400/50 shadow-[0_0_60px_-15px_rgba(139,92,246,0.5)]" : ""}`}
            >
              {pack.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-white">{pack.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">${pack.price}</span>
                <span className="text-sm text-zinc-500">one-time</span>
              </div>
              <p className="mt-2 text-sm text-violet-200/90">
                {pack.credits.toLocaleString()} credits included
              </p>
              <p className="mt-3 text-sm text-zinc-400">{pack.tagline}</p>
              <Link href={`/checkout?pack=${pack.id}`} className={`mt-6 w-full ${pack.popular ? "btn-primary" : "btn-ghost"}`}>
                Buy {pack.name}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-zinc-500">
          Need custom volume? <Link href="/pricing" className="text-violet-300 hover:text-violet-200">Compare all plans</Link> or talk to us about Scale.
        </p>
      </section>

      {/* STATS BAND */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-gradient-to-r from-indigo-950/60 via-[#0c0c14] to-violet-950/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ["48M+", "API calls served / month"],
            ["3,200+", "Developers building"],
            ["99.99%", "Uptime over 12 months"],
            ["190ms", "P50 global latency"],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl font-extrabold text-white sm:text-4xl">{v}</div>
              <div className="mt-2 text-sm text-zinc-500">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Questions, answered
          </h2>
        </div>
        <Accordion items={FAQS} />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-violet-400/25 bg-gradient-to-br from-indigo-600/20 via-[#101018] to-violet-600/20 p-10 text-center sm:p-16">
          <div className="bg-grid absolute inset-0 opacity-60" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ship your AI feature <span className="text-gradient">this week.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Grab a Starter pack, copy your key, and make your first API
              call before your coffee cools.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/pricing" className="btn-primary">
                Get an API key
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link href="/docs" className="btn-ghost">
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
