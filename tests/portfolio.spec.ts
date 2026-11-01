import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage, project filtering, and the real navigation flow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(/Nilesh Kanjariya/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "I build digital",
  );
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.getByRole("button", { name: "Web experiences" }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("Shred Himalayas");
  await page.getByRole("button", { name: "SaaS & platforms" }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.getByRole("button", { name: /All projects/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.getByRole("link", { name: "View Brainros case study" }).click();
  await expect(page).toHaveURL(/projects\/brainros/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Brainros");
  await expect(
    page.getByRole("link", { name: "Visit live website" }),
  ).toHaveAttribute("href", "https://brainros.com");
  await expect(page.locator(".case-preview-note")).toContainText(
    "illustrative interface concept",
  );
  await page.getByRole("link", { name: "Back to selected work" }).click();
  await expect(page).toHaveURL(/#projects$/);
  expect(errors).toEqual([]);
});

test("all case studies and supporting routes render", async ({
  page,
  request,
}) => {
  for (const [slug, name] of [
    ["brainros", "Brainros"],
    ["property-platform", "Property & vacation rentals"],
    ["procurement-platform", "S&S Procurement"],
    ["shred-himalayas", "Shred Himalayas"],
  ]) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(name);
    await expect(page.locator(".case-feature-list li")).not.toHaveCount(0);
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
      await expect(img).not.toHaveJSProperty("naturalWidth", 0);
    }
  }
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "privacy",
  );
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "projects/brainros",
  );
  expect((await request.get("/robots.txt")).status()).toBe(200);
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
  expect((await page.goto("/this-page-does-not-exist"))?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Back to the portfolio" }),
  ).toBeVisible();
});

test("mobile menu, Escape, keyboard navigation, and contact anchor", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-nav")).toHaveCount(0);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#mobile-nav")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Send project inquiry" }),
  ).toBeVisible();
});

test("client validation keeps invalid inquiries from reaching the server", async ({
  page,
}) => {
  let requests = 0;
  page.on("request", (r) => {
    if (r.url().endsWith("/api/contact")) requests++;
  });
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#details-error")).toBeVisible();
  await expect(page.locator("input[name=name]")).toBeFocused();
  expect(requests).toBe(0);
});

async function fillInquiry(page: import("@playwright/test").Page) {
  await page.goto("/#contact");
  await page.locator("input[name=name]").fill("Test Visitor");
  await page.locator("input[name=email]").fill("visitor@example.com");
  await page.locator("select[name=projectType]").selectOption("SaaS product");
  await page
    .locator("textarea[name=details]")
    .fill(
      "I would like to discuss a SaaS application for managing a small business and its daily operations.",
    );
}

test("unconfigured delivery provides an honest, correctly addressed email draft", async ({
  page,
}) => {
  await fillInquiry(page);
  await page.waitForTimeout(2700);
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "It has not been sent yet",
  );
  const draft = page.getByRole("link", { name: "Open inquiry in email app" });
  const href = await draft.getAttribute("href");
  expect(href).toContain("mailto:nileshkanjariya2705@gmail.com");
  expect(decodeURIComponent(href!)).toContain("visitor@example.com");
  await expect(page.locator("input[name=name]")).toHaveValue("Test Visitor");
  await expect(page.locator(".form-success")).toHaveCount(0);
});

test("success and provider failure UI states preserve correct behavior (mocked responses)", async ({
  page,
}) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({
        error: "Email delivery is temporarily unavailable.",
      }),
    }),
  );
  await fillInquiry(page);
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "temporarily unavailable",
  );
  await expect(page.locator("textarea[name=details]")).not.toHaveValue("");
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }),
  );
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.locator(".form-success")).toContainText(
    "Your idea is on its way",
  );
  await page.getByRole("button", { name: "Send another inquiry" }).click();
  await expect(page.locator("input[name=name]")).toHaveValue("");
});

test("server rejects invalid, cross-origin, oversized, and spam requests and throttles repeated attempts", async ({
  request,
  baseURL,
}) => {
  // Isolate the rate-limit bucket across repeated runs on the same server.
  const runId = Date.now().toString(16).slice(-8);
  const headers = {
    origin: baseURL!,
    "x-forwarded-for": `2001:db8::${runId.slice(0, 4)}:${runId.slice(4)}`,
  };
  const data = {
    name: "Test Visitor",
    email: "visitor@example.com",
    company: "",
    projectType: "SaaS product",
    budget: "",
    details: "A sample project inquiry for server-side validation checks only.",
    website: "",
    startedAt: Date.now() - 10000,
  };
  expect(
    (
      await request.post("/api/contact", {
        headers: { origin: "https://untrusted.example" },
        data,
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/contact", {
        headers,
        data: { ...data, email: "invalid" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        headers,
        data: { ...data, website: "spam.example" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        headers,
        data: { ...data, startedAt: Date.now() },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        headers,
        data: { ...data, details: "a".repeat(22000) },
      })
    ).status(),
  ).toBe(413);
  const response = await request.post("/api/contact", { headers, data });
  expect(response.status()).toBe(503);
  expect((await response.json()).code).toBe("EMAIL_NOT_CONFIGURED");
  await request.post("/api/contact", { headers, data });
  const limited = await request.post("/api/contact", { headers, data });
  expect(limited.status()).toBe(429);
  expect(limited.headers()["retry-after"]).toBeTruthy();
});

test("layouts fit 320, 390, 768, 1024, and 1440px viewports", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/projects/property-platform"]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  }
});

test("essential content remains visible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000");
  await expect(
    page.getByRole("heading", { name: "Custom web applications" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /nileshkanjariya2705@gmail.com/ }),
  ).toBeVisible();
  await context.close();
});

test("homepage and case study pass automated WCAG 2.2 AA checks", async ({
  page,
}) => {
  for (const path of ["/", "/projects/property-platform"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    await test
      .info()
      .attach(`accessibility-${path === "/" ? "home" : "case"}`, {
        body: JSON.stringify(results.violations, null, 2),
        contentType: "application/json",
      });
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  }
});
