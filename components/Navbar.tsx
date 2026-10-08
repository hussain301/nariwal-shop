"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const LINKS = [
  { href: "/apis", label: "APIs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/playground", label: "Playground" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 shadow-lg shadow-violet-600/30">
        <Icon name="zap" className="h-5 w-5 text-white" />
      </span>
      <span className="text-[17px] font-bold tracking-tight text-white">
        Nariwal <span className="text-gradient">API</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.07] bg-[#0a0a0f]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Sign in
          </Link>
          <Link href="/pricing" className="btn-primary !px-5 !py-2.5">
            Get API key
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <button
          className="rounded-lg p-2 text-zinc-300 hover:bg-white/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Icon name={open ? "x" : "menu"} className="h-6 w-6" />
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/[0.07] bg-[#0a0a0f]/95 px-4 pb-5 pt-2 backdrop-blur-xl md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-[15px] font-medium text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/auth/signin"
              onClick={() => setOpen(false)}
              className="btn-ghost w-full"
            >
              Sign in
            </Link>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Get API key
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
