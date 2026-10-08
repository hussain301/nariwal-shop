"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/store";
import { Icon } from "@/components/Icon";
import { CodeTabs } from "@/components/CodeTabs";

const CATEGORIES = ["All", "Language", "Vision", "Audio", "Embeddings"] as const;

export default function ApisPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (query === "" ||
            (p.name + p.tagline + p.description).toLowerCase().includes(query.toLowerCase()))
      ),
    [query, cat]
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-32 left-1/3 h-72 w-[520px] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">Catalog</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Every API, <span className="text-gradient">one key.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Six production APIs sharing one credit balance and one auth
            scheme. Search, pick an endpoint, and copy a working snippet.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Icon name="terminal" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search APIs — try “voice” or “embed”"
                className="field !pl-11"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    cat === c
                      ? "bg-violet-500/25 text-violet-100 ring-1 ring-violet-400/50"
                      : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {filtered.length === 0 && (
          <div className="card p-12 text-center text-zinc-500">
            No APIs match “{query}”. Try a different search.
          </div>
        )}
        <div className="space-y-8">
          {filtered.map((p) => (
            <article key={p.slug} id={p.slug} className="card scroll-mt-24 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/25 to-violet-500/25 text-violet-200 ring-1 ring-violet-400/30">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{p.name}</h2>
                    <p className="mt-1 text-sm text-zinc-400">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-400">
                        {p.category}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-emerald-300">
                        {p.method} {p.endpoint}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-300">
                        {p.price} {p.unit}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-400">
                        ~{p.latency} latency
                      </span>
                    </div>
                  </div>
                </div>
                <Link href="/pricing" className="btn-primary !px-4 !py-2 !text-xs">
                  Get key <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Models
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.models.map((m) => (
                    <code key={m} className="rounded-lg bg-violet-500/10 px-3 py-1.5 font-mono text-xs text-violet-200 ring-1 ring-violet-400/20">
                      {m}
                    </code>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Request</p>
                  <CodeTabs
                    tabs={[
                      { label: "cURL", code: p.curl },
                      { label: "Python", code: p.python },
                      { label: "Node.js", code: p.node },
                    ]}
                  />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Response</p>
                  <CodeTabs tabs={[{ label: "JSON", code: p.response }]} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
