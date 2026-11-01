import { after, test } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/contact/route";

// All provider traffic is intercepted in this isolated process. No real email
// or production credential is used by these integration tests.
const realFetch = globalThis.fetch;
const initialKey = process.env.RESEND_API_KEY;
const initialFrom = process.env.CONTACT_FROM_EMAIL;
process.env.RESEND_API_KEY = "test-key-never-sent";
process.env.CONTACT_FROM_EMAIL = "Portfolio <portfolio@example.com>";
after(() => {
  globalThis.fetch = realFetch;
  if (initialKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = initialKey;
  if (initialFrom === undefined) delete process.env.CONTACT_FROM_EMAIL;
  else process.env.CONTACT_FROM_EMAIL = initialFrom;
});

function request(index: number) {
  return new NextRequest("https://portfolio.example.com/api/contact", {
    method: "POST",
    headers: {
      origin: "https://portfolio.example.com",
      host: "portfolio.example.com",
      "x-forwarded-proto": "https",
      "x-forwarded-for": `198.51.100.${index}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: "Example Visitor",
      email: "visitor@example.com",
      company: "Example",
      projectType: "SaaS product",
      budget: "Let's discuss",
      details:
        "A test inquiry for a SaaS product to manage day-to-day business operations.",
      website: "",
      startedAt: Date.now() - 10000,
    }),
  });
}

test("configured contact sends the correct recipient, reply address, and plain-text inquiry to Resend", async () => {
  let called = false;
  globalThis.fetch = (async (url, options) => {
    called = true;
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(options?.method, "POST");
    const headers = options?.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer test-key-never-sent");
    const body = JSON.parse(options?.body as string);
    assert.deepEqual(body.to, ["nileshkanjariya2705@gmail.com"]);
    assert.equal(body.reply_to, "visitor@example.com");
    assert.equal(body.from, "Portfolio <portfolio@example.com>");
    assert.equal(body.subject, "Portfolio inquiry: SaaS product");
    assert.match(body.text, /Example Visitor/);
    assert.match(body.text, /day-to-day business operations/);
    return Response.json({ id: "test-provider-message-id" });
  }) as typeof fetch;
  const response = await POST(request(31));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(called, true);
});

test("provider rejection does not claim success or expose provider details", async () => {
  globalThis.fetch = (async () =>
    Response.json(
      { message: "internal provider diagnostic" },
      { status: 403 },
    )) as typeof fetch;
  const response = await POST(request(32));
  assert.equal(response.status, 502);
  const result = await response.json();
  assert.equal(result.success, undefined);
  assert.match(result.error, /temporarily unavailable/);
  assert.doesNotMatch(JSON.stringify(result), /internal provider diagnostic/);
});

test("provider timeout returns a recoverable error", async () => {
  globalThis.fetch = (async () => {
    throw new DOMException("Test timeout", "TimeoutError");
  }) as typeof fetch;
  const response = await POST(request(33));
  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /timed out/);
});
