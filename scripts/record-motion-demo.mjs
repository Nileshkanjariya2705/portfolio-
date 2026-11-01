import { chromium } from "@playwright/test";
import { mkdir, rename } from "node:fs/promises";
await mkdir("verification", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
  recordVideo: {
    dir: "verification/motion-recordings",
    size: { width: 1440, height: 1000 },
  },
});
const page = await context.newPage();
await page.goto("http://127.0.0.1:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(200);
await page.screenshot({ path: "verification/motion-entrance.png" });
await page.waitForTimeout(1600);
await page.screenshot({ path: "verification/desktop-hero.png" });
const art = await page.locator(".art-perspective").boundingBox();
await page.mouse.move(art.x + art.width * 0.25, art.y + art.height * 0.3, {
  steps: 20,
});
await page.waitForTimeout(700);
await page.mouse.move(art.x + art.width * 0.8, art.y + art.height * 0.7, {
  steps: 20,
});
await page.waitForTimeout(700);
await page
  .getByRole("navigation", { name: "Main navigation" })
  .getByRole("link", { name: "Services", exact: true })
  .click();
await page.waitForTimeout(1400);
await page.locator(".service-card").first().hover();
await page.waitForTimeout(600);
await page
  .getByRole("navigation", { name: "Main navigation" })
  .getByRole("link", { name: "Projects", exact: true })
  .click();
await page.waitForTimeout(1400);
await page.getByRole("button", { name: "Web experiences" }).click();
await page.waitForTimeout(800);
await page.getByRole("button", { name: /All projects/ }).click();
await page.waitForTimeout(800);
await page.locator(".project-image-link").first().hover();
await page.waitForTimeout(600);
await page.screenshot({ path: "verification/motion-projects.png" });
await page.getByRole("button", { name: "Pause animations" }).click();
await page.waitForTimeout(300);
await page.getByRole("button", { name: "Back to top" }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: "verification/motion-paused.png" });
const video = page.video();
await context.close();
await rename(await video.path(), "verification/animation-demo.webm");
await browser.close();
console.log(
  "Recorded real entrance, pointer movement, scroll, filtering, hover, and pause controls.",
);
