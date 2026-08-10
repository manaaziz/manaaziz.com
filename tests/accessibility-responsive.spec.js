import { expect, test } from "@playwright/test";

async function tabTo(page, locator, maximumTabs = 12) {
  for (let index = 0; index < maximumTabs; index += 1) {
    await page.keyboard.press("Tab");
    if (await locator.evaluate((element) => element === document.activeElement)) return;
  }
  throw new Error(`Element was not reached within ${maximumTabs} Tab presses.`);
}

test("desktop navigation is keyboard reachable and visibly focused", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-webkit", "iOS Safari does not enable hardware Tab traversal by default.");
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });

  const aboutLink = page.locator(".nav-links").getByRole("link", { name: "About", exact: true });
  await tabTo(page, aboutLink);
  await expect(aboutLink).toBeFocused();
  await expect(aboutLink).toMatchAriaSnapshot(`- link "About"`);

  const focusIndicator = await aboutLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return style.outlineStyle !== "none" || style.boxShadow !== "none" || style.textDecorationLine !== "none";
  });
  expect(focusIndicator).toBe(true);

  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/about\/?$/);
});

test("mobile navigation supports keyboard open, Escape, and focus return", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-webkit", "iOS Safari does not enable hardware Tab traversal by default.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const menuButton = page.getByRole("button", { name: "Open menu" });
  await tabTo(page, menuButton);
  await page.keyboard.press("Enter");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test("focused main content is not obscured by the sticky header", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const target = page.getByRole("link", { name: "Open The Manalogue" });
  await target.focus();
  await target.scrollIntoViewIfNeeded();
  const positions = await page.evaluate(() => {
    const header = document.querySelector(".site-header").getBoundingClientRect();
    const focused = document.activeElement.getBoundingClientRect();
    return { focusedTop: focused.top, headerBottom: header.bottom };
  });
  expect(positions.focusedTop).toBeGreaterThanOrEqual(positions.headerBottom - 1);
});

for (const [width, height] of [[667, 375], [844, 390]]) {
  test(`landscape layouts remain contained at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    for (const route of ["/", "/manalogue", "/teaching", "/research"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth
      }));
      expect(dimensions.scrollWidth, route).toBeLessThanOrEqual(dimensions.clientWidth + 1);
      await expect(page.locator("main")).toBeVisible();
    }
  });
}

test("pages reflow at the 320px CSS-width equivalent of 200% zoom", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const route of ["/", "/manalogue", "/teaching", "/teaching/hoa-730-statistical-analysis"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const audit = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      mainRight: document.querySelector("main").getBoundingClientRect().right,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(audit.clientWidth).toBe(320);
    expect(audit.scrollWidth, route).toBeLessThanOrEqual(321);
    expect(audit.mainRight, route).toBeLessThanOrEqual(321);
  }
});
