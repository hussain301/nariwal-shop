import { randomBytes } from "crypto";

export type ApiProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "Language" | "Vision" | "Audio" | "Embeddings";
  price: string; // per unit
  unit: string;
  endpoint: string;
  method: "POST" | "GET";
  latency: string;
  icon: string; // lucide-style inline svg key
  models: string[];
  curl: string;
  python: string;
  node: string;
  response: string;
};

export const PRODUCTS: ApiProduct[] = [
  {
    slug: "chat-completions",
    name: "Chat Completions",
    tagline: "State-of-the-art conversational AI for chat, agents, and copilots.",
    description:
      "OpenAI-compatible chat API with function calling, JSON mode, and 128K context. Drop-in replacement for existing integrations — just change the base URL.",
    category: "Language",
    price: "$0.40",
    unit: "per 1M tokens",
    endpoint: "/v1/chat/completions",
    method: "POST",
    latency: "0.4s",
    icon: "message",
    models: ["nariwal-1", "nariwal-1-mini", "nariwal-1-think"],
    curl: `curl https://api.nariwal.shop/v1/chat/completions \\
  -H "Authorization: Bearer $NARIWAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "nariwal-1",
    "messages": [{"role": "user", "content": "Explain quantum computing in one sentence."}]
  }'`,
    python: `from nariwal import Nariwal

client = Nariwal()  # reads NARIWAL_API_KEY from env

resp = client.chat.completions.create(
    model="nariwal-1",
    messages=[{"role": "user", "content": "Explain quantum computing in one sentence."}],
)
print(resp.choices[0].message.content)`,
    node: `import Nariwal from "nariwal";

const client = new Nariwal(); // reads NARIWAL_API_KEY from env

const resp = await client.chat.completions.create({
  model: "nariwal-1",
  messages: [{ role: "user", content: "Explain quantum computing in one sentence." }],
});
console.log(resp.choices[0].message.content);`,
    response: `{
  "id": "chatcmpl-9f2k1x",
  "model": "nariwal-1",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Quantum computing uses qubits that exist in superposition to solve certain problems exponentially faster than classical computers."
    },
    "finish_reason": "stop"
  }],
  "usage": { "prompt_tokens": 12, "completion_tokens": 21, "total_tokens": 33 }
}`,
  },
  {
    slug: "vision",
    name: "Vision",
    tagline: "Understand images, screenshots, and documents with multimodal AI.",
    description:
      "Send images by URL or base64 and get rich descriptions, OCR, chart reading, and UI analysis. Perfect for screenshot copilots, document pipelines, and moderation.",
    category: "Vision",
    price: "$1.20",
    unit: "per 1K images",
    endpoint: "/v1/vision/analyze",
    method: "POST",
    latency: "1.1s",
    icon: "eye",
    models: ["nariwal-vision-1", "nariwal-vision-1-mini"],
    curl: `curl https://api.nariwal.shop/v1/vision/analyze \\
  -H "Authorization: Bearer $NARIWAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "nariwal-vision-1",
    "image_url": "https://example.com/dashboard.png",
    "prompt": "Summarize the key metrics in this dashboard."
  }'`,
    python: `from nariwal import Nariwal

client = Nariwal()

resp = client.vision.analyze(
    model="nariwal-vision-1",
    image_url="https://example.com/dashboard.png",
    prompt="Summarize the key metrics in this dashboard.",
)
print(resp.description)`,
    node: `import Nariwal from "nariwal";

const client = new Nariwal();

const resp = await client.vision.analyze({
  model: "nariwal-vision-1",
  imageUrl: "https://example.com/dashboard.png",
  prompt: "Summarize the key metrics in this dashboard.",
});
console.log(resp.description);`,
    response: `{
  "id": "vis-7d21aa",
  "model": "nariwal-vision-1",
  "description": "The dashboard shows 12,480 active users (+8.2% WoW), MRR of $48.2K, and a 2.1% churn rate. The largest traffic source is organic search at 41%.",
  "detected_text": ["Active Users", "12,480", "MRR", "$48.2K"],
  "usage": { "image_units": 1 }
}`,
  },
  {
    slug: "text-to-speech",
    name: "Text-to-Speech",
    tagline: "Lifelike voices in 40+ languages with streaming audio.",
    description:
      "Convert text to studio-quality speech with 12 voice personas, adjustable speed and pitch, and sub-300ms first-byte streaming for real-time voice agents.",
    category: "Audio",
    price: "$6.00",
    unit: "per 1M characters",
    endpoint: "/v1/audio/speech",
    method: "POST",
    latency: "0.3s",
    icon: "wave",
    models: ["nariwal-tts-1", "nariwal-tts-1-hd"],
    curl: `curl https://api.nariwal.shop/v1/audio/speech \\
  -H "Authorization: Bearer $NARIWAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "nariwal-tts-1",
    "voice": "aria",
    "input": "Welcome to Nariwal. Your API is ready."
  }' --output speech.mp3`,
    python: `from nariwal import Nariwal

client = Nariwal()

audio = client.audio.speech.create(
    model="nariwal-tts-1",
    voice="aria",
    input="Welcome to Nariwal. Your API is ready.",
)
audio.stream_to_file("speech.mp3")`,
    node: `import Nariwal from "nariwal";
import fs from "fs";

const client = new Nariwal();

const audio = await client.audio.speech.create({
  model: "nariwal-tts-1",
  voice: "aria",
  input: "Welcome to Nariwal. Your API is ready.",
});
fs.writeFileSync("speech.mp3", Buffer.from(await audio.arrayBuffer()));`,
    response: `// Binary MP3 stream (audio/mpeg)
// Headers: x-request-id: req_88f1, x-latency-ms: 287`,
  },
  {
    slug: "image-generation",
    name: "Image Generation",
    tagline: "Photorealistic and stylized images from text prompts.",
    description:
      "Generate 1024px images in under 8 seconds with prompt enhancement, style presets, and inpainting. Built for marketing teams, game studios, and design tools.",
    category: "Vision",
    price: "$18.00",
    unit: "per 1K images",
    endpoint: "/v1/images/generations",
    method: "POST",
    latency: "6.5s",
    icon: "image",
    models: ["nariwal-img-1", "nariwal-img-1-turbo"],
    curl: `curl https://api.nariwal.shop/v1/images/generations \\
  -H "Authorization: Bearer $NARIWAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "nariwal-img-1",
    "prompt": "A neon-lit cyberpunk bazaar at night, cinematic, ultra detailed",
    "size": "1024x1024"
  }'`,
    python: `from nariwal import Nariwal

client = Nariwal()

img = client.images.generate(
    model="nariwal-img-1",
    prompt="A neon-lit cyberpunk bazaar at night, cinematic, ultra detailed",
    size="1024x1024",
)
print(img.data[0].url)`,
    node: `import Nariwal from "nariwal";

const client = new Nariwal();

const img = await client.images.generate({
  model: "nariwal-img-1",
  prompt: "A neon-lit cyberpunk bazaar at night, cinematic, ultra detailed",
  size: "1024x1024",
});
console.log(img.data[0].url);`,
    response: `{
  "created": 1728307200,
  "data": [{
    "url": "https://cdn.nariwal.shop/img/gen_4f9a2b1c.png",
    "revised_prompt": "A neon-lit cyberpunk bazaar at night, rain-slicked streets, cinematic lighting, ultra detailed"
  }]
}`,
  },
  {
    slug: "embeddings",
    name: "Embeddings",
    tagline: "High-quality vector embeddings for search and RAG.",
    description:
      "Turn text into 1536-dimension vectors tuned for semantic search, recommendations, and retrieval-augmented generation. 8K token context per request.",
    category: "Embeddings",
    price: "$0.08",
    unit: "per 1M tokens",
    endpoint: "/v1/embeddings",
    method: "POST",
    latency: "0.2s",
    icon: "vector",
    models: ["nariwal-embed-1", "nariwal-embed-1-large"],
    curl: `curl https://api.nariwal.shop/v1/embeddings \\
  -H "Authorization: Bearer $NARIWAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "nariwal-embed-1",
    "input": "How do I reset my password?"
  }'`,
    python: `from nariwal import Nariwal

client = Nariwal()

vec = client.embeddings.create(
    model="nariwal-embed-1",
    input="How do I reset my password?",
)
print(len(vec.data[0].embedding), "dimensions")`,
    node: `import Nariwal from "nariwal";

const client = new Nariwal();

const vec = await client.embeddings.create({
  model: "nariwal-embed-1",
  input: "How do I reset my password?",
});
console.log(vec.data[0].embedding.length, "dimensions");`,
    response: `{
  "object": "list",
  "data": [{
    "object": "embedding",
    "index": 0,
    "embedding": [0.0023, -0.0089, 0.0142, "..."],
    "dimensions": 1536
  }],
  "model": "nariwal-embed-1",
  "usage": { "prompt_tokens": 8, "total_tokens": 8 }
}`,
  },
  {
    slug: "transcription",
    name: "Transcription",
    tagline: "Speech-to-text with timestamps, diarization, and 99 languages.",
    description:
      "Upload audio or point at a URL and get accurate transcripts with word-level timestamps and speaker labels. Ideal for meeting notes, subtitles, and call analytics.",
    category: "Audio",
    price: "$3.00",
    unit: "per 1K minutes",
    endpoint: "/v1/audio/transcriptions",
    method: "POST",
    latency: "0.8s",
    icon: "mic",
    models: ["nariwal-whisper-1"],
    curl: `curl https://api.nariwal.shop/v1/audio/transcriptions \\
  -H "Authorization: Bearer $NARIWAL_API_KEY" \\
  -F model="nariwal-whisper-1" \\
  -F file="@meeting.mp3" \\
  -F response_format="verbose_json"`,
    python: `from nariwal import Nariwal

client = Nariwal()

with open("meeting.mp3", "rb") as f:
    tr = client.audio.transcriptions.create(
        model="nariwal-whisper-1",
        file=f,
    )
print(tr.text)`,
    node: `import Nariwal from "nariwal";
import fs from "fs";

const client = new Nariwal();

const tr = await client.audio.transcriptions.create({
  model: "nariwal-whisper-1",
  file: fs.createReadStream("meeting.mp3"),
});
console.log(tr.text);`,
    response: `{
  "task": "transcribe",
  "language": "en",
  "duration": 184.2,
  "text": "Alright team, let's review the Q3 roadmap. First item: the new checkout flow ships on Friday...",
  "segments": [
    { "id": 0, "start": 0.0, "end": 4.2, "text": "Alright team, let's review the Q3 roadmap." }
  ]
}`,
  },
];

export type Pack = {
  id: "starter" | "pro" | "scale";
  name: string;
  price: number;
  credits: number;
  tagline: string;
  features: string[];
  popular?: boolean;
};

export const PACKS: Pack[] = [
  {
    id: "starter",
    name: "Starter",
    price: 9,
    credits: 900,
    tagline: "For side projects and first integrations.",
    features: [
      "900 credits (1 credit = $0.01)",
      "All 6 APIs included",
      "100 requests / minute",
      "Community support",
      "Credits never expire",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    credits: 3200,
    tagline: "For growing apps and production workloads.",
    popular: true,
    features: [
      "3,200 credits (10% bonus included)",
      "All 6 APIs included",
      "600 requests / minute",
      "Priority support (24h response)",
      "Usage analytics dashboard",
      "Credits never expire",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: 99,
    credits: 12000,
    tagline: "For teams running serious volume.",
    features: [
      "12,000 credits (21% bonus included)",
      "All 6 APIs included",
      "3,000 requests / minute",
      "Dedicated support channel",
      "Custom rate limits on request",
      "SSO & team seats (up to 10)",
      "Credits never expire",
    ],
  },
];

/** Generate a demo API key. Server-side uses crypto; keep the `nvsk-` prefix. */
export function generateApiKey(): string {
  const body = randomBytes(24).toString("base64url").replace(/[^a-zA-Z0-9]/g, "");
  return `nvsk-${body.slice(0, 32)}`;
}

/** Browser-safe demo key generator (no node:crypto). */
export function generateApiKeyBrowser(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  let body = "";
  for (const b of arr) body += chars[b % chars.length];
  return `nvsk-${body}`;
}
