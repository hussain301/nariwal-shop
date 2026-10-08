import { CodeTabs } from "@/components/CodeTabs";
import { Icon } from "@/components/Icon";
import Link from "next/link";

export const metadata = {
  title: "Docs — Nariwal API",
  description: "Quickstart guide: authentication, code samples in curl, Python and Node, error codes, and rate limits.",
};

const ERRORS = [
  ["400", "Bad Request", "The request body is malformed. Check the JSON shape against the reference."],
  ["401", "Unauthorized", "Missing or invalid API key. Make sure the Authorization header uses Bearer <key>."],
  ["402", "Payment Required", "Your credit balance is empty. Top up from the pricing page."],
  ["404", "Not Found", "The endpoint or model name doesn't exist. See the catalog for valid values."],
  ["429", "Too Many Requests", "You've hit your rate limit. Back off and retry with exponential backoff."],
  ["500", "Internal Error", "Something failed on our side. Retry once; if it persists, contact support with the x-request-id header."],
];

const LIMITS = [
  ["Starter", "100 req/min", "5 concurrent", "128K tokens"],
  ["Pro", "600 req/min", "25 concurrent", "128K tokens"],
  ["Scale", "3,000 req/min", "100 concurrent", "200K tokens"],
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">Documentation</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Quickstart
      </h1>
      <p className="mt-2 text-zinc-400">
        From zero to your first API call in about two minutes.
      </p>

      {/* STEP 1 */}
      <section className="mt-12">
        <h2 className="flex items-center gap-3 text-xl font-bold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 font-mono text-sm text-violet-200">1</span>
          Get an API key
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Create an account, buy any credit pack, and generate a key from the{" "}
          <Link href="/dashboard" className="text-violet-300 hover:text-violet-200">dashboard</Link>.
          Keys look like <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-emerald-300">nvsk-…</code> and
          are shown only once — store yours somewhere safe.
        </p>
      </section>

      {/* STEP 2 */}
      <section className="mt-10">
        <h2 className="flex items-center gap-3 text-xl font-bold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 font-mono text-sm text-violet-200">2</span>
          Authenticate
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Pass your key as a Bearer token on every request. All traffic goes
          to the base URL <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-zinc-200">https://api.nariwal.shop/v1</code>.
        </p>
        <div className="mt-4">
          <CodeTabs
            tabs={[
              {
                label: "cURL",
                code: `export NARIWAL_API_KEY="nvsk-your-key-here"

curl https://api.nariwal.shop/v1/chat/completions \\
  -H "Authorization: Bearer $NARIWAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "nariwal-1", "messages": [{"role": "user", "content": "Hello!"}]}'`,
              },
            ]}
          />
        </div>
      </section>

      {/* STEP 3 */}
      <section className="mt-10">
        <h2 className="flex items-center gap-3 text-xl font-bold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 font-mono text-sm text-violet-200">3</span>
          Install an SDK
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Official SDKs handle auth, retries, and streaming for you.
        </p>
        <div className="mt-4">
          <CodeTabs
            tabs={[
              { label: "Python", code: `pip install nariwal\n\n# then:\nfrom nariwal import Nariwal\nclient = Nariwal()  # reads NARIWAL_API_KEY` },
              { label: "Node.js", code: `npm install nariwal\n\n// then:\nimport Nariwal from "nariwal";\nconst client = new Nariwal(); // reads NARIWAL_API_KEY` },
            ]}
          />
        </div>
      </section>

      {/* STEP 4 */}
      <section className="mt-10">
        <h2 className="flex items-center gap-3 text-xl font-bold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 font-mono text-sm text-violet-200">4</span>
          Make your first call
        </h2>
        <div className="mt-4">
          <CodeTabs
            tabs={[
              {
                label: "cURL",
                code: `curl https://api.nariwal.shop/v1/chat/completions \\
  -H "Authorization: Bearer $NARIWAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "nariwal-1",
    "messages": [{"role": "user", "content": "Give me 3 tagline ideas for a coffee brand."}],
    "temperature": 0.8
  }'`,
              },
              {
                label: "Python",
                code: `resp = client.chat.completions.create(
    model="nariwal-1",
    messages=[{"role": "user", "content": "Give me 3 tagline ideas for a coffee brand."}],
    temperature=0.8,
)\nprint(resp.choices[0].message.content)`,
              },
              {
                label: "Node.js",
                code: `const resp = await client.chat.completions.create({
  model: "nariwal-1",
  messages: [{ role: "user", content: "Give me 3 tagline ideas for a coffee brand." }],
  temperature: 0.8,
});\nconsole.log(resp.choices[0].message.content);`,
              },
            ]}
          />
        </div>
      </section>

      {/* ERRORS */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-white">Error codes</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Errors follow standard HTTP semantics. The response body always
          includes <code className="font-mono text-xs text-zinc-200">error.code</code> and a human-readable message.
        </p>
        <div className="card mt-5 overflow-hidden">
          {ERRORS.map(([code, name, desc], i) => (
            <div key={code} className={`flex gap-4 px-6 py-4 ${i % 2 ? "bg-white/[0.015]" : ""}`}>
              <code className="w-14 shrink-0 font-mono text-sm font-semibold text-red-300">{code}</code>
              <div>
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="mt-0.5 text-sm text-zinc-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RATE LIMITS */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-white">Rate limits</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Limits are per API key and reset every 60 seconds. Responses include{" "}
          <code className="font-mono text-xs text-zinc-200">x-ratelimit-remaining</code> headers.
        </p>
        <div className="card mt-5 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-left">
                <th className="px-6 py-4 font-medium text-zinc-500">Pack</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Requests</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Concurrent</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Max context</th>
              </tr>
            </thead>
            <tbody>
              {LIMITS.map((r, i) => (
                <tr key={r[0]} className={i % 2 ? "bg-white/[0.015]" : ""}>
                  <td className="px-6 py-3.5 font-semibold text-white">{r[0]}</td>
                  <td className="px-6 py-3.5 font-mono text-xs text-zinc-300">{r[1]}</td>
                  <td className="px-6 py-3.5 font-mono text-xs text-zinc-300">{r[2]}</td>
                  <td className="px-6 py-3.5 font-mono text-xs text-zinc-300">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="card mt-12 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200">
          <Icon name="play" className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">Prefer to experiment first?</h3>
          <p className="text-sm text-zinc-400">The playground simulates streaming responses with zero setup.</p>
        </div>
        <Link href="/playground" className="btn-primary !px-5 !py-2.5">Open playground</Link>
      </div>
    </div>
  );
}
