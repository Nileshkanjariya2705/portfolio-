import { test, expect } from "@playwright/test";

test.describe("motion experience", () => {
  test.use({ reducedMotion: "no-preference" });

  test("normal motion animates the scene and scroll reveals without breaking project navigation", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Pause animations" }),
    ).toBeEnabled();
    const architecture = page.locator(".architecture");
    const first = await architecture.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await expect
      .poll(() =>
        architecture.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe(first);
    await expect
      .poll(() =>
        page
          .locator(".hero-title-line > span")
          .last()
          .evaluate((element) => Number(getComputedStyle(element).opacity)),
      )
      .toBe(1);
    const art = page.locator(".art-perspective");
    const bounds = await art.boundingBox();
    await page.mouse.move(
      bounds!.x + bounds!.width * 0.8,
      bounds!.y + bounds!.height * 0.25,
    );
    await expect
      .poll(() => page.locator(".art-tilt").getAttribute("style"))
      .toContain("rotate");
    await page.locator(".service-card").first().scrollIntoViewIfNeeded();
    await expect(page.locator(".service-card").first()).toHaveAttribute(
      "data-revealed",
      "true",
    );
    await expect
      .poll(() =>
        page
          .locator(".service-card")
          .first()
          .evaluate((element) => Number(getComputedStyle(element).opacity)),
      )
      .toBe(1);
    await expect(
      page.getByRole("button", { name: "Back to top" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Web experiences" }).click();
    await expect(page.locator(".project-card")).toHaveCount(1);
    await page.getByRole("button", { name: /All projects/ }).click();
    await expect(page.locator(".project-card")).toHaveCount(4);
    await page.getByRole("link", { name: "View Brainros case study" }).click();
    await expect(page).toHaveURL(/projects\/brainros/);
    expect(errors).toEqual([]);
  });

  test("motion can be paused, persists after reload, resumes, and returns to the top", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Pause animations" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
    expect(
      await page
        .locator(".architecture")
        .evaluate((element) => getComputedStyle(element).animationName),
    ).toBe("none");
    await expect
      .poll(() =>
        page
          .locator(".hero-title-line > span")
          .first()
          .evaluate((element) => getComputedStyle(element).opacity),
      )
      .toBe("1");
    await page.reload();
    await expect(
      page.getByRole("button", { name: "Resume animations" }),
    ).toBeEnabled();
    await page.getByRole("button", { name: "Resume animations" }).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-motion",
      "running",
    );
    expect(
      await page
        .locator(".architecture")
        .evaluate((element) => getComputedStyle(element).animationName),
    ).toBe("float-stack");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("button", { name: "Back to top" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Back to top" }).click();
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeLessThan(3);
    await expect(page.locator(".brand")).toBeFocused();
  });

  test("mobile motion stays within the viewport and preserves usable navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Pause animations" }),
    ).toBeEnabled();
    await expect
      .poll(() =>
        page
          .locator(".hero-title-line > span")
          .last()
          .evaluate((element) => getComputedStyle(element).opacity),
      )
      .toBe("1");
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(390);
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Projects" })
      .click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator("#mobile-nav")).toHaveCount(0);
    await page.getByRole("button", { name: "Pause animations" }).click();
    await expect(
      page.getByRole("button", { name: "Resume animations" }),
    ).toBeVisible();
  });
});

test("device reduced-motion settings disable decorative animation and keep all content readable", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", {
      name: "Animations disabled by your device settings",
    }),
  ).toBeDisabled();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  const styles = await page
    .locator(".architecture, .floating-code, .hero-title-line > span")
    .evaluateAll((elements) =>
      elements.map((element) => ({
        animation: getComputedStyle(element).animationName,
        opacity: getComputedStyle(element).opacity,
      })),
    );
  expect(
    styles.every(
      (style) => style.animation === "none" && style.opacity === "1",
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Web experiences" }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  expect(
    await page
      .locator(".project-card")
      .evaluate((element) => getComputedStyle(element).opacity),
  ).toBe("1");
});
