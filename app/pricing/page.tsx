import Link from "next/link";
import { PACKS } from "@/lib/store";
import { Icon } from "@/components/Icon";
import { Accordion } from "@/components/Accordion";

export const metadata = {
  title: "Pricing — Nariwal API",
  description:
    "Simple credit packs: Starter $9, Pro $29, Scale $99. 1 credit = $0.01 of API usage. No subscription, credits never expire.",
};

const FAQS = [
  {
    q: "What is a credit?",
    a: "A credit is $0.01 of API usage. Every endpoint has a published per-unit price, and each call deducts the exact amount from your balance. You can always see per-call costs in the dashboard.",
  },
  {
    q: "Do credits expire?",
    a: "Never. Credits stay on your account until you spend them, whether that's next week or next year.",
  },
  {
    q: "Can I get a refund?",
    a: "Unused credits are refundable within 14 days of purchase. Contact support with your order email and we'll process it — no questions asked.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards via Stripe, plus Apple Pay and Google Pay where available. Invoices are issued for every purchase.",
  },
  {
    q: "Is there a free tier?",
    a: "New accounts start with 50 free credits — enough for roughly 125,000 chat tokens — so you can integrate before paying anything.",
  },
  {
    q: "Do you offer custom volume pricing?",
    a: "Yes. If you're spending over $500/month, reach out for volume discounts, committed-use pricing, and private deployments.",
  },
];

const INCLUDED = [
  ["All six APIs", true, true, true],
  ["Credits never expire", true, true, true],
  ["OpenAI-compatible endpoints", true, true, true],
  ["Requests per minute", "100", "600", "3,000"],
  ["Support", "Community", "Priority (24h)", "Dedicated channel"],
  ["Usage analytics", "Basic", "Advanced", "Advanced + exports"],
  ["Team seats", "1", "3", "10"],
  ["SSO", "—", "—", "Included"],
  ["Custom rate limits", "—", "—", "On request"],
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">Pricing</p>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Buy credits once. <span className="text-gradient">Use them anywhere.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
            1 credit = $0.01 of API usage. No subscription, no seat fees,
            no expiry. Every account starts with 50 free credits.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`card flex flex-col p-8 ${
                pack.popular
                  ? "relative border-violet-400/50 shadow-[0_0_80px_-20px_rgba(139,92,246,0.55)]"
                  : ""
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h2 className="text-xl font-bold text-white">{pack.name}</h2>
              <p className="mt-1 text-sm text-zinc-500">{pack.tagline}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white">${pack.price}</span>
                <span className="text-sm text-zinc-500">one-time</span>
              </div>
              <div className="mt-3 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-100">
                {pack.credits.toLocaleString()} credits
                <span className="ml-2 text-xs text-violet-300/70">= ${pack.credits / 100} of usage</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {pack.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/checkout?pack=${pack.id}`} className={`mt-8 w-full ${pack.popular ? "btn-primary" : "btn-ghost"}`}>
                Buy now
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="card mx-auto mt-8 flex max-w-3xl items-start gap-4 p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200">
            <Icon name="zap" className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Prefer pure pay-as-you-go?</h3>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              Start with the 50 free credits on every new account. When you
              need more, any pack tops up the same balance — there&apos;s no
              separate metered plan to manage. Volume discounts kick in
              automatically above $500/month of spend.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">Compare packs</h2>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-6 py-4 text-left font-medium text-zinc-500" />
                {PACKS.map((p) => (
                  <th key={p.id} className="px-6 py-4 text-center font-semibold text-white">
                    {p.name}
                    <span className="block text-xs font-normal text-zinc-500">${p.price} one-time</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INCLUDED.map((row, i) => (
                <tr key={i} className={i % 2 ? "bg-white/[0.015]" : ""}>
                  <td className="px-6 py-3.5 text-zinc-400">{row[0]}</td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j} className="px-6 py-3.5 text-center text-zinc-200">
                      {cell === true ? (
                        <Icon name="check" className="mx-auto h-4 w-4 text-emerald-400" />
                      ) : cell === "—" ? (
                        <span className="text-zinc-600">—</span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">Pricing FAQ</h2>
        <Accordion items={FAQS} />
      </section>
    </>
  );
}
