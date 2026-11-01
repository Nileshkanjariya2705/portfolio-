import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
const { chromium } = require("@playwright/test");
await mkdir("public/projects", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = [];
for (const [name, url] of [
  ["brainros", "https://brainros.com"],
  ["shred-himalayas", "https://shredhimalayas.com"],
]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1,
  });
  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(4500);
    const title = await page.title();
    if (!response?.ok() || /error|unavailable|not found/i.test(title))
      throw new Error(`HTTP ${response?.status()} ${title}`);
    await page.screenshot({ path: `public/projects/${name}.png` });
    report.push({
      name,
      url: page.url(),
      title,
      status: response.status(),
      captured: true,
    });
  } catch (error) {
    report.push({ name, captured: false, error: String(error) });
  }
  await page.close();
}
await browser.close();
await mkdir("verification", { recursive: true });
await writeFile(
  "verification/project-captures.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
