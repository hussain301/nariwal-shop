"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Navbar";

function AuthFormInner({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const valid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length >= 6 &&
    (mode === "signin" || name.trim().length > 1);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    try {
      const displayName =
        mode === "signup"
          ? name.trim()
          : email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      localStorage.setItem("nariwal_user", JSON.stringify({ name: displayName, email }));
    } catch {
      setError("Browser storage is unavailable — cannot sign in on this device.");
      return;
    }
    router.push(next);
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-16">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute left-1/2 top-10 h-72 w-[520px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="card relative w-full max-w-md p-8 sm:p-10">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-6 text-center text-2xl font-bold text-white">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-500">
          {mode === "signin"
            ? "Sign in to manage keys, credits, and usage."
            : "Get 50 free credits and your first API key in seconds."}
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <label className="block text-sm font-medium text-zinc-300">
              Full name
              <input className="field mt-2" placeholder="Ada Lovelace" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
          )}
          <label className="block text-sm font-medium text-zinc-300">
            Email
            <input className="field mt-2" type="email" placeholder="ada@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label className="block text-sm font-medium text-zinc-300">
            Password
            <input className="field mt-2" type="password" placeholder="Minimum 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
          </label>

          {error && <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

          <button type="submit" disabled={!valid} className="btn-primary w-full !py-3.5">
            {mode === "signin" ? "Sign in" : "Create account"}
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          {mode === "signin" ? (
            <>New to Nariwal? <Link href="/auth/signup" className="font-medium text-violet-300 hover:text-violet-200">Create an account</Link></>
          ) : (
            <>Already have an account? <Link href="/auth/signin" className="font-medium text-violet-300 hover:text-violet-200">Sign in</Link></>
          )}
        </p>
        <p className="mt-4 text-center text-[11px] text-zinc-600">
          Demo auth — your profile is stored locally in this browser only.
        </p>
      </div>
    </div>
  );
}

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  return (
    <Suspense fallback={<div className="py-24 text-center text-zinc-500">Loading…</div>}>
      <AuthFormInner mode={mode} />
    </Suspense>
  );
}
