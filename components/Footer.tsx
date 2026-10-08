import Link from "next/link";
import { Logo } from "./Navbar";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Chat Completions", href: "/apis#chat-completions" },
      { label: "Vision", href: "/apis#vision" },
      { label: "Text-to-Speech", href: "/apis#text-to-speech" },
      { label: "Image Generation", href: "/apis#image-generation" },
      { label: "Embeddings", href: "/apis#embeddings" },
      { label: "Transcription", href: "/apis#transcription" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Playground", href: "/playground" },
      { label: "Pricing", href: "/pricing" },
      { label: "Status", href: "/#status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Sign in", href: "/auth/signin" },
      { label: "Create account", href: "/auth/signup" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#08080c]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              Developer-first APIs for chat, vision, voice, and images.
              OpenAI-compatible, priced per use, and built for production.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-500 transition hover:text-zinc-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Nariwal API · nariwal.shop — Built by Hussain Ali
          </p>
          <div className="flex gap-6 text-xs text-zinc-600">
            <span className="cursor-pointer hover:text-zinc-300">Terms</span>
            <span className="cursor-pointer hover:text-zinc-300">Privacy</span>
            <span className="cursor-pointer hover:text-zinc-300">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
