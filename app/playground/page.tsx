"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";

const MODELS = [
  { id: "nariwal-1", label: "nariwal-1", desc: "Flagship chat model" },
  { id: "nariwal-1-mini", label: "nariwal-1-mini", desc: "Fast & cheap" },
  { id: "nariwal-vision-1", label: "nariwal-vision-1", desc: "Multimodal" },
];

const SUGGESTIONS = [
  "Explain REST vs GraphQL in 3 sentences.",
  "Write a Python function that debounces API calls.",
  "Why is my fetch() returning a CORS error?",
  "Draft a launch announcement for a developer API.",
];

export default function PlaygroundPage() {
  const [model, setModel] = useState(MODELS[0].id);
  const [prompt, setPrompt] = useState(SUGGESTIONS[0]);
  const [running, setRunning] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [stats, setStats] = useState<{ tokens: number; latency: number } | null>(null);
  const [error, setError] = useState("");
  const outRef = useRef<HTMLDivElement>(null);
  const runId = useRef(0);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight, behavior: "smooth" });
  }, [displayed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") run();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt, model]);

  async function run() {
    if (!prompt.trim() || running) return;
    const id = ++runId.current;
    setRunning(true);
    setError("");
    setDisplayed("");
    setStats(null);
    try {
      const t0 = performance.now();
      const res = await fetch("/api/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed.");
      if (id !== runId.current) return;

      // Typewriter effect over the returned text
      const text: string = data.reply;
      let i = 0;
      const step = () => {
        if (id !== runId.current) return;
        i = Math.min(text.length, i + 3 + Math.floor(Math.random() * 6));
        setDisplayed(text.slice(0, i));
        if (i < text.length) {
          setTimeout(step, 14);
        } else {
          setRunning(false);
          setStats({ tokens: data.usage.total_tokens, latency: Math.round(performance.now() - t0) });
        }
      };
      step();
    } catch (err) {
      if (id !== runId.current) return;
      setError(err instanceof Error ? err.message : "Request failed.");
      setRunning(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">Playground</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Try it <span className="text-gradient">before you buy it.</span>
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        This demo runs against our response simulator — pick a model, type a
        prompt, and watch the streaming output. The real API behaves the same
        way, with live inference.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* INPUT */}
        <div className="card p-6">
          <label className="text-sm font-semibold text-zinc-200">Model</label>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m.id)}
                className={`rounded-xl border px-3 py-3 text-left transition ${
                  model === m.id
                    ? "border-violet-400/60 bg-violet-500/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <span className="block font-mono text-xs font-semibold text-white">{m.label}</span>
                <span className="mt-1 block text-[11px] text-zinc-500">{m.desc}</span>
              </button>
            ))}
          </div>

          <label className="mt-6 block text-sm font-semibold text-zinc-200">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            maxLength={4000}
            className="field mt-3 resize-none"
            placeholder="Ask anything…"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 transition hover:border-violet-400/40 hover:text-violet-200"
              >
                {s.length > 42 ? s.slice(0, 42) + "…" : s}
              </button>
            ))}
          </div>

          <button onClick={run} disabled={running || !prompt.trim()} className="btn-primary mt-6 w-full !py-3.5">
            {running ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating…
              </>
            ) : (
              <>
                <Icon name="play" className="h-4 w-4" />
                Run
                <kbd className="rounded bg-white/15 px-1.5 py-0.5 font-mono text-[10px]">⌘↵</kbd>
              </>
            )}
          </button>
          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        </div>

        {/* OUTPUT */}
        <div className="code-window flex min-h-[420px] flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
            <span className="font-mono text-xs text-zinc-500">output · {model}</span>
            {stats && (
              <span className="font-mono text-[11px] text-zinc-500">
                {stats.tokens} tok · {stats.latency}ms
              </span>
            )}
          </div>
          <div ref={outRef} className="max-h-[560px] flex-1 overflow-y-auto p-5 text-sm leading-relaxed text-zinc-300">
            {!displayed && !running && (
              <p className="text-zinc-600">
                Output will stream here. Hit <span className="text-zinc-400">Run</span> to simulate a request.
              </p>
            )}
            {running && !displayed && (
              <span className="flex items-center gap-2 text-zinc-500">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-300" />
                contacting model…
              </span>
            )}
            <p className="whitespace-pre-wrap">
              {displayed}
              {running && displayed && <span className="animate-blink text-violet-300">▍</span>}
            </p>
          </div>
          <div className="border-t border-white/[0.07] px-4 py-2.5">
            <p className="text-[11px] text-zinc-600">Simulated response — no real inference ran.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
