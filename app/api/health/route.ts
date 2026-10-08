import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, service: "nariwal-api", time: new Date().toISOString() });
}
