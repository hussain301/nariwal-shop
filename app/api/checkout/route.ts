import { NextResponse } from "next/server";
import { PACKS, generateApiKey } from "@/lib/store";

/**
 * Checkout endpoint.
 *
 * If STRIPE_SECRET_KEY is set, this creates a REAL Stripe Checkout Session
 * and the client redirects the buyer to Stripe. The price IDs are read from
 * STRIPE_PRICE_STARTER / STRIPE_PRICE_PRO / STRIPE_PRICE_SCALE.
 *
 * Without the env vars (local demo), it returns a demo confirmation with a
 * freshly generated `nvsk-` API key. Never crashes when keys are missing.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      pack?: string;
      email?: string;
    };

    const pack = PACKS.find((p) => p.id === body.pack);
    if (!pack) {
      return NextResponse.json({ error: "Unknown pack." }, { status: 400 });
    }
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const priceId =
      pack.id === "starter"
        ? process.env.STRIPE_PRICE_STARTER
        : pack.id === "pro"
          ? process.env.STRIPE_PRICE_PRO
          : process.env.STRIPE_PRICE_SCALE;

    if (stripeKey && priceId) {
      // Real Stripe path
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(stripeKey);
      const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: body.email,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${appUrl}/checkout?session_id={CHECKOUT_SESSION_ID}&pack=${pack.id}&email=${encodeURIComponent(body.email)}`,
        cancel_url: `${appUrl}/checkout?pack=${pack.id}&cancelled=1`,
        metadata: { pack: pack.id, credits: String(pack.credits) },
      });
      return NextResponse.json({ demo: false, url: session.url });
    }

    // Demo path — no Stripe configured. Simulate a short processing delay.
    await new Promise((r) => setTimeout(r, 1200));
    const key = generateApiKey();
    return NextResponse.json({
      demo: true,
      key,
      pack: pack.id,
      credits: pack.credits,
      email: body.email,
      note: "Demo mode — no charge was made. Set STRIPE_SECRET_KEY to enable real payments.",
    });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json({ error: "Checkout failed. Please try again." }, { status: 500 });
  }
}
