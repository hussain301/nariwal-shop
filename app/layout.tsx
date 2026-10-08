import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const favicon = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0a0a0f"/><path d="M34 8L14 36h12l-2 20 20-24H32l2-24z" fill="url(#g)"/><defs><linearGradient id="g" x1="0" y1="0" x2="64" y2="64"><stop stop-color="#818cf8"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs></svg>`
)}`;

export const metadata: Metadata = {
  title: "Nariwal API — Developer APIs for Chat, Vision, Voice & Images",
  description:
    "Buy API credits once, call production-ready AI APIs: chat completions, vision, text-to-speech, image generation, embeddings, and transcription. OpenAI-compatible, pay as you go.",
  metadataBase: new URL("https://nariwal.shop"),
  openGraph: {
    title: "Nariwal API — AI APIs for builders",
    description:
      "Chat, vision, voice, and image APIs with simple credit-based pricing. OpenAI-compatible endpoints, 99.99% uptime.",
    url: "https://nariwal.shop",
    siteName: "Nariwal API",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nariwal API — AI APIs for builders",
    description:
      "Chat, vision, voice, and image APIs with simple credit-based pricing.",
  },
  icons: { icon: favicon },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0f] text-zinc-100">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
