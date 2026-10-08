"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateApiKeyBrowser } from "@/lib/store";
import { Icon } from "@/components/Icon";
import { CopyButton } from "@/components/CodeTabs";

type ApiKey = { id: string; label: string; created: string; prefix: string; revoked?: boolean };

const WEEK = [
  { d: "Mon", v: 42 }, { d: "Tue", v: 68 }, { d: "Wed", v: 55 },
  { d: "Thu", v: 81 }, { d: "Fri", v: 96 }, { d: "Sat", v: 38 }, { d: "Sun", v: 61 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [freshKey, setFreshKey] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem("nariwal_user");
      if (!u) {
        router.replace("/auth/signin?next=/dashboard");
        return;
      }
      setUser(JSON.parse(u));
      setKeys(JSON.parse(localStorage.getItem("nariwal_keys") ?? "[]"));
    } catch {
      router.replace("/auth/signin?next=/dashboard");
      return;
    }
    setReady(true);
  }, [router]);

  const saveKeys = (next: ApiKey[]) => {
    setKeys(next);
    try {
      localStorage.setItem("nariwal_keys", JSON.stringify(next));
    } catch { /* noop */ }
  };

  const createKey = () => {
    const label = newLabel.trim() || `Key ${keys.length + 1}`;
    const key = generateApiKeyBrowser();
    saveKeys([{ id: "key_" + Date.now().toString(36), label, created: new Date().toISOString(), prefix: key.slice(0, 12) }, ...keys]);
    setFreshKey(key);
    setNewLabel("");
    setShowCreate(false);
  };

  const revoke = (id: string) => saveKeys(keys.map((k) => (k.id === id ? { ...k, revoked: true } : k)));
  const remove = (id: string) => saveKeys(keys.filter((k) => k.id !== id));

  const activeKeys = useMemo(() => keys.filter((k) => !k.revoked), [keys]);
  const max = Math.max(...WEEK.map((w) => w.v));

  if (!ready) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-zinc-500">Loading dashboard…</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Here&apos;s what&apos;s happening with your API usage.</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary !px-5 !py-2.5">
          <Icon name="key" className="h-4 w-4" />
          Create key
        </button>
      </div>

      {/* STATS */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Credit balance", value: "3,214", sub: "= $32.14 of usage", icon: "zap" },
          { label: "Requests today", value: "1,842", sub: "+12% vs yesterday", icon: "terminal" },
          { label: "Avg latency", value: "212ms", sub: "P50 across all APIs", icon: "clock" },
          { label: "Active keys", value: String(activeKeys.length), sub: keys.length ? `${keys.length - activeKeys.length} revoked` : "Create your first key", icon: "key" },
        ].map((s) => (
          <div key={s.label} className="card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500">{s.label}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-200">
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{s.value}</p>
            <p className="mt-1 text-xs text-zinc-600">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="card mt-5 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Requests this week</h2>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-400">last 7 days</span>
        </div>
        <div className="mt-6 flex h-48 items-end gap-3 sm:gap-5">
          {WEEK.map((w) => (
            <div key={w.d} className="group flex flex-1 flex-col items-center gap-2">
              <span className="font-mono text-[11px] text-zinc-500 opacity-0 transition group-hover:opacity-100">{w.v * 24}</span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600/60 to-violet-400 transition-all duration-500 group-hover:from-indigo-500 group-hover:to-violet-300"
                style={{ height: `${(w.v / max) * 100}%` }}
              />
              <span className="text-xs text-zinc-600">{w.d}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-zinc-600">Demo data — live usage appears here once you connect a real key.</p>
      </div>

      {/* KEYS */}
      <div className="card mt-5 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-white">API keys</h2>
        <p className="mt-1 text-sm text-zinc-500">Keys are shown in full only once, at creation.</p>

        {freshKey && (
          <div className="pop-in mt-5 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">New key created — copy it now</p>
            <code className="mt-2 block break-all font-mono text-sm text-emerald-200">{freshKey}</code>
            <div className="mt-3 flex gap-2">
              <CopyButton value={freshKey} />
              <button onClick={() => setFreshKey(null)} className="btn-ghost !px-4 !py-2 !text-xs">Dismiss</button>
            </div>
          </div>
        )}

        {showCreate && (
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:flex-row">
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Key label, e.g. production-app"
              className="field flex-1"
            />
            <div className="flex gap-2">
              <button onClick={createKey} className="btn-primary !px-5 !py-2.5 !text-sm">Generate</button>
              <button onClick={() => setShowCreate(false)} className="btn-ghost !px-5 !py-2.5 !text-sm">Cancel</button>
            </div>
          </div>
        )}

        <div className="mt-5 overflow-x-auto">
          {keys.length === 0 && !showCreate ? (
            <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
              <p className="text-sm text-zinc-500">No keys yet.</p>
              <button onClick={() => setShowCreate(true)} className="btn-primary mt-4 !px-5 !py-2.5 !text-sm">
                Create your first key
              </button>
            </div>
          ) : (
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-left">
                  <th className="py-3 font-medium text-zinc-500">Label</th>
                  <th className="py-3 font-medium text-zinc-500">Prefix</th>
                  <th className="py-3 font-medium text-zinc-500">Created</th>
                  <th className="py-3 font-medium text-zinc-500">Status</th>
                  <th className="py-3 text-right font-medium text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((k) => (
                  <tr key={k.id} className="border-b border-white/[0.05]">
                    <td className="py-3.5 font-medium text-white">{k.label}</td>
                    <td className="py-3.5 font-mono text-xs text-zinc-400">{k.prefix}…</td>
                    <td className="py-3.5 text-zinc-500">{new Date(k.created).toLocaleDateString()}</td>
                    <td className="py-3.5">
                      {k.revoked ? (
                        <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs text-red-300">revoked</span>
                      ) : (
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">active</span>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      {!k.revoked && (
                        <button onClick={() => revoke(k.id)} className="mr-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-amber-400/40 hover:text-amber-200">
                          Revoke
                        </button>
                      )}
                      <button onClick={() => remove(k.id)} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-red-400/40 hover:text-red-300" aria-label={`Delete ${k.label}`}>
                        <Icon name="trash" className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/pricing" className="btn-primary">
          Top up credits <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
        <Link href="/docs" className="btn-ghost">
          <Icon name="doc" className="h-4 w-4" /> Read the docs
        </Link>
      </div>
    </div>
  );
}
