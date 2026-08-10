import { expect, test } from "@playwright/test";

const routes = [
  ["home", "/"],
  ["manalogue", "/manalogue"],
  ["teaching", "/teaching"],
  ["consulting", "/consulting"],
  ["research", "/research"]
];

for (const width of [1024, 1440]) {
  for (const [name, route] of routes) {
    test(`${name} desktop reference at ${width}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "chromium", "Desktop references use Chromium.");
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(route, { waitUntil: "networkidle" });
      await page.addStyleTag({
        content: "*, *::before, *::after { animation-delay: 0s !important; animation-duration: 0.001ms !important; transition: none !important; }"
      });
      const deferredInteractives = page.locator(
        ".paper-chip-drop, .consulting-logo-arena, .feature-carousel, .global-map-shell"
      );
      await expect(page).toHaveScreenshot(`${name}-${width}.png`, {
        fullPage: false,
        mask: [deferredInteractives]
      });
    });
  }
}
