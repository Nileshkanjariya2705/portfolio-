import { NextRequest, NextResponse } from "next/server";
import { inquirySchema, inquiryText } from "@/lib/inquiry";
import { person } from "@/lib/content";

export const runtime = "nodejs";
const attempts = new Map<string, { count: number; expires: number }>();
const WINDOW = 10 * 60 * 1000;

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  let sameOrigin = false;
  try {
    // Next.js can normalize nextUrl's hostname behind a proxy. The Host header
    // retains the browser-facing hostname on local Next.js and Vercel.
    const source = new URL(origin || "");
    const protocol =
      request.headers.get("x-forwarded-proto") ||
      request.nextUrl.protocol.replace(":", "");
    sameOrigin =
      source.host === request.headers.get("host") &&
      source.protocol === `${protocol}:`;
  } catch {
    /* A missing or malformed origin is rejected below. */
  }
  if (!sameOrigin)
    return NextResponse.json(
      { error: "This request was not accepted. Please use the website form." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { error: "Unsupported request format." },
      { status: 415 },
    );
  if (Number(request.headers.get("content-length") || 0) > 20000)
    return NextResponse.json(
      { error: "Your message is too long." },
      { status: 413 },
    );
  // Best-effort per-instance throttle. Add Vercel Firewall rate limiting before a public launch.
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires < now) attempts.delete(key);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const prior = attempts.get(ip);
  if (prior && prior.count >= 5)
    return NextResponse.json(
      {
        error:
          "Too many requests. Please try again in 10 minutes, or email me directly.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((prior.expires - now) / 1000)),
        },
      },
    );
  if (attempts.size > 10000) attempts.delete(attempts.keys().next().value!);
  attempts.set(ip, {
    count: (prior?.count || 0) + 1,
    expires: prior?.expires || now + WINDOW,
  });
  let input: unknown;
  try {
    const body = await request.text();
    if (body.length > 16000)
      return NextResponse.json(
        { error: "Your message is too long." },
        { status: 413 },
      );
    input = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
  const result = inquirySchema.safeParse(input);
  if (!result.success)
    return NextResponse.json(
      { error: "Please check your name, email, project type, and message." },
      { status: 400 },
    );
  const data = result.data;
  if (
    data.website ||
    now - data.startedAt < 2500 ||
    data.startedAt > now ||
    now - data.startedAt > 24 * 60 * 60 * 1000
  )
    return NextResponse.json(
      { error: "Please take a moment to review your details and try again." },
      { status: 400 },
    );
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from)
    return NextResponse.json(
      {
        code: "EMAIL_NOT_CONFIGURED",
        error: "Please send your inquiry using your email app.",
      },
      { status: 503 },
    );
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [person.email],
        reply_to: data.email,
        subject: `Portfolio inquiry: ${data.projectType}`,
        text: inquiryText(data),
      }),
    });
    if (!response.ok)
      return NextResponse.json(
        {
          error:
            "Email delivery is temporarily unavailable. Please try again or email me directly.",
        },
        { status: 502 },
      );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Email delivery timed out. Please email me directly or try again later.",
      },
      { status: 502 },
    );
  }
}
