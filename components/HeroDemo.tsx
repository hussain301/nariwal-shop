"use client";

import { useEffect, useState } from "react";

const REQUEST = `curl https://api.nariwal.shop/v1/chat/completions \\
  -H "Authorization: Bearer nvsk-••••••••••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "nariwal-1",
    "messages": [
      {"role": "user", "content": "Write a haiku about APIs."}
    ]
  }'`;

const RESPONSE = `{
  "id": "chatcmpl-9f2k1x",
  "model": "nariwal-1",
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Endpoints awake,\\nJSON flows like morning light—\\nYour app dreams in code."
    },
    "finish_reason": "stop"
  }],
  "usage": { "total_tokens": 41 }
}`;

export function HeroDemo() {
  const [reqText, setReqText] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [phase, setPhase] = useState<"typing" | "waiting" | "done">("typing");

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      if (i <= REQUEST.length) {
        setReqText(REQUEST.slice(0, i));
        i += 2;
        timer = setTimeout(type, 18);
      } else {
        setPhase("waiting");
        timer = setTimeout(() => {
          setShowResponse(true);
          setPhase("done");
        }, 700);
      }
    };
    timer = setTimeout(type, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="code-window overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <span className="code-dot bg-[#ff5f57]" />
        <span className="code-dot bg-[#febc2e]" />
        <span className="code-dot bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-zinc-500">terminal — live request</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          200 OK
        </span>
      </div>
      <div className="min-h-[300px] p-5 font-mono text-[12.5px] leading-relaxed sm:min-h-[320px]">
        <pre className="whitespace-pre-wrap text-violet-200/90">
          {reqText}
          {phase === "typing" && <span className="animate-blink text-violet-300">▍</span>}
        </pre>
        {phase === "waiting" && (
          <div className="mt-3 flex items-center gap-2 text-zinc-500">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-300" />
            streaming response…
          </div>
        )}
        {showResponse && (
          <pre className="pop-in mt-3 whitespace-pre-wrap border-t border-white/[0.07] pt-3 text-emerald-200/80">
            {RESPONSE}
          </pre>
        )}
      </div>
    </div>
  );
}
