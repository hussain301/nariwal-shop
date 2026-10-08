"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PACKS, generateApiKeyBrowser } from "@/lib/store";
import { Icon } from "@/components/Icon";
import { CopyButton } from "@/components/CodeTabs";

type Phase = "form" | "processing" | "success" | "error";

function formatCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return d.slice(0, 2) + "/" + d.slice(2);
}

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();
  const packId = params.get("pack") ?? "pro";
  const pack = useMemo(() => PACKS.find((p) => p.id === packId) ?? PACKS[1], [packId]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState("");
  const [demoKey, setDemoKey] = useState("");
  const [isDemo, setIsDemo] = useState(true);

  const cardValid = card.replace(/\s/g, "").length === 16;
  const expiryValid = /^\d{2}\/\d{2}$/.test(expiry);
  const cvcValid = /^\d{3,4}$/.test(cvc);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canPay = emailValid && name.trim().length > 1 && cardValid && expiryValid && cvcValid;

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    if (!canPay || phase !== "form") return;
    setPhase("processing");
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack: pack.id, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Payment failed.");

      if (data.demo === false && data.url) {
        // Real Stripe session — hand off to Stripe.
        window.location.href = data.url;
        return;
      }
      // Demo mode: key from server, or generate client-side as fallback.
      setDemoKey(data.key ?? generateApiKeyBrowser());
      setIsDemo(true);
      try {
        localStorage.setItem("nariwal_user", JSON.stringify({ name: name || "Developer", email }));
        const keys = JSON.parse(localStorage.getItem("nariwal_keys") ?? "[]");
        keys.unshift({ id: "key_" + Date.now().toString(36), label: "Checkout key", created: new Date().toISOString(), prefix: (data.key ?? "").slice(0, 12) });
        localStorage.setItem("nariwal_keys", JSON.stringify(keys));
      } catch { /* storage unavailable */ }
      setPhase("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed.");
      setPhase("error");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Checkout</h1>
      <p className="mt-2 text-zinc-400">One-time purchase. Credits never expire.</p>

      {phase === "success" ? (
        <div className="pop-in card mx-auto mt-10 max-w-2xl p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40">
            <Icon name="check" className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-white">Payment successful</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
            {pack.credits.toLocaleString()} credits were added to{" "}
            <span className="text-zinc-200">{email}</span>. Your API key is
            shown once — copy it now.
          </p>
          {isDemo && (
            <p className="mx-auto mt-3 max-w-md rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-2.5 text-xs text-amber-200">
              Demo mode — no real charge was made. Set STRIPE_SECRET_KEY to enable live payments.
            </p>
          )}
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Your API key</p>
            <code className="mt-2 block break-all font-mono text-sm text-emerald-300">{demoKey}</code>
            <div className="mt-4 flex justify-center gap-3">
              <CopyButton value={demoKey} label="Copy key" />
              <Link href="/dashboard" className="btn-primary !px-4 !py-2 !text-xs">
                Open dashboard
              </Link>
            </div>
          </div>
          <button onClick={() => router.push("/")} className="mt-6 text-sm text-zinc-500 hover:text-zinc-300">
            Back to home
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* FORM */}
          <form onSubmit={pay} className="card p-7 sm:p-8">
            <h2 className="text-lg font-semibold text-white">Payment details</h2>

            <label className="mt-6 block text-sm font-medium text-zinc-300">
              Full name
              <input className="field mt-2" placeholder="Ada Lovelace" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="mt-4 block text-sm font-medium text-zinc-300">
              Email
              <input className="field mt-2" type="email" placeholder="ada@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </label>

            <div className="mt-6 border-t border-white/[0.07] pt-6">
              <h3 className="text-sm font-semibold text-zinc-200">Card</h3>
              <label className="mt-4 block text-sm font-medium text-zinc-300">
                Card number
                <input
                  className="field mt-2 font-mono"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={card}
                  onChange={(e) => setCard(formatCard(e.target.value))}
                  autoComplete="cc-number"
                />
              </label>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-zinc-300">
                  Expiry
                  <input className="field mt-2 font-mono" inputMode="numeric" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} autoComplete="cc-exp" />
                </label>
                <label className="block text-sm font-medium text-zinc-300">
                  CVC
                  <input className="field mt-2 font-mono" inputMode="numeric" placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} autoComplete="cc-csc" />
                </label>
              </div>
            </div>

            {phase === "error" && (
              <p className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}{" "}
                <button type="button" onClick={() => setPhase("form")} className="underline">
                  Try again
                </button>
              </p>
            )}

            <button type="submit" disabled={!canPay || phase === "processing"} className="btn-primary mt-7 w-full !py-3.5">
              {phase === "processing" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing payment…
                </>
              ) : (
                <>
                  <Icon name="shield" className="h-4 w-4" />
                  Pay ${pack.price}.00
                </>
              )}
            </button>
            <p className="mt-4 text-center text-xs text-zinc-600">
              Secured by Stripe · This demo form never stores card details
            </p>
          </form>

          {/* SUMMARY */}
          <aside className="card h-fit p-7">
            <h2 className="text-lg font-semibold text-white">Order summary</h2>
            <div className="mt-5 space-y-2">
              {PACKS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => router.replace(`/checkout?pack=${p.id}`)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                    p.id === pack.id
                      ? "border-violet-400/60 bg-violet-500/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  }`}
                >
                  <span>
                    <span className="font-semibold text-white">{p.name}</span>
                    <span className="block text-xs text-zinc-500">{p.credits.toLocaleString()} credits</span>
                  </span>
                  <span className="font-bold text-white">${p.price}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-2 border-t border-white/[0.07] pt-5 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>{pack.name} pack</span>
                <span>${pack.price}.00</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Taxes</span>
                <span>Calculated at payment</span>
              </div>
              <div className="flex justify-between border-t border-white/[0.07] pt-3 text-base font-bold text-white">
                <span>Total</span>
                <span>${pack.price}.00</span>
              </div>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-zinc-600">
              1 credit = $0.01 of usage. Your {pack.credits.toLocaleString()} credits work across all six APIs and never expire.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-14 text-zinc-500">Loading checkout…</div>}>
      <CheckoutInner />
    </Suspense>
  );
}
