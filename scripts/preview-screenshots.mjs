import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("verification", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const checks = [];
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
  ["tablet", 768, 1024],
  ["small-mobile", 320, 750],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  for (const section of await page.locator("main section").all())
    await section.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `verification/${name}.png`, fullPage: true });
  const overflow = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    overflow: [...document.querySelectorAll("body *")]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return (
          r.right > innerWidth + 1 &&
          r.width > 0 &&
          getComputedStyle(e).position !== "absolute"
        );
      })
      .map((e) => e.className)
      .slice(0, 10),
  }));
  checks.push({ name, ...overflow, errors });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(checks, null, 2));
await writeFile(
  "verification/layout-checks.json",
  JSON.stringify(checks, null, 2),
);
