import { NextResponse } from "next/server";

/**
 * Simulated AI endpoint for the playground.
 * Returns a canned-but-smart response: it detects code, questions, and long
 * prompts, and tailors the template. A small delay makes it feel alive.
 */
const TEMPLATES = {
  code: (prompt: string) =>
    `Here's a clean implementation based on your request:\n\n\`\`\`python\ndef solve():\n    # Generated for: "${truncate(prompt, 60)}"\n    result = []\n    # Your logic would go here — this is a simulated response\n    # from the Nariwal playground (no real inference ran).\n    return result\n\`\`\`\n\nTip: in production this call would stream tokens from \`nariwal-1\` with sub-second latency. Try the real API with your key for actual reasoning.`,
  question: (prompt: string) =>
    `Great question. Here's the short version:\n\n**${truncate(prompt, 80)}** — the key idea is that this depends on your constraints. In practice:\n\n1. Start with the simplest approach that satisfies the requirement\n2. Measure before optimizing\n3. Prefer well-tested libraries over hand-rolled solutions\n\nThis is a simulated playground response. Connect your API key to get real, in-depth answers from \`nariwal-1\`.`,
  long: (prompt: string) =>
    `I received a detailed prompt (${prompt.split(/\s+/).length} words). A real model would:\n\n- Break this into sub-tasks and plan the response\n- Retrieve relevant context if RAG is enabled\n- Generate a structured answer with headings and examples\n\nSince this is the Nariwal demo playground, the full reasoning engine is a key away — grab one from the pricing page and this same interface will call the live model.`,
  short: (prompt: string) =>
    `You said: "${truncate(prompt, 120)}"\n\nHere's the thing — this playground runs a simulator, not the real model. The good news: the real \`nariwal-1\` API would answer this in about 0.4 seconds with a full, nuanced response.\n\nTry a longer prompt to see more of the simulated behavior, or get an API key to go live.`,
};

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n).trimEnd() + "..." : s;
}

function pickTemplate(prompt: string): (p: string) => string {
  const p = prompt.toLowerCase();
  const codeish = /```|def |function|class |import |error|traceback|sql|api|bug|debug/.test(p);
  if (codeish) return TEMPLATES.code;
  if (prompt.trim().length > 280) return TEMPLATES.long;
  if (/\?$/.test(prompt.trim()) || /^(what|why|how|when|where|which|who|can|should|is|are|do|does)\b/.test(p)) {
    return TEMPLATES.question;
  }
  return TEMPLATES.short;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      prompt?: string;
      model?: string;
    };
    const prompt = (body.prompt ?? "").trim();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }
    if (prompt.length > 4000) {
      return NextResponse.json({ error: "Prompt is too long (max 4000 characters)." }, { status: 400 });
    }

    const model = body.model || "nariwal-1";
    const template = pickTemplate(prompt);

    // Simulate network + inference latency (400–1400ms)
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 1000));

    const tokens = Math.round(prompt.length / 4) + Math.round(template(prompt).length / 4);
    return NextResponse.json({
      model,
      simulated: true,
      reply: template(prompt),
      usage: {
        prompt_tokens: Math.round(prompt.length / 4),
        completion_tokens: tokens,
        total_tokens: tokens + Math.round(prompt.length / 4),
      },
      latency_ms: 380 + Math.round(Math.random() * 600),
    });
  } catch (err) {
    console.error("playground error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
