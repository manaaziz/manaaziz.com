import { expect, test } from "@playwright/test";

const routes = [
  ["home", "/"],
  ["about", "/about"],
  ["consulting", "/consulting"],
  ["research", "/research"],
  ["teaching", "/teaching"],
  ["manalogue", "/manalogue"],
  ["course", "/teaching/hoa-730-statistical-analysis"],
  ["materials", "/teaching/hoa-730-statistical-analysis/materials/lectures"]
];

const widths = [320, 375, 390, 430, 768, 1024, 1440];

test.describe("responsive reflow", () => {
  for (const width of widths) {
    for (const [name, route] of routes) {
      test(`${name} has no page overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: width < 600 ? 812 : 900 });
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.locator("main").waitFor();

        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth
        }));

        expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
      });
    }
  }
});

test("ordinary primary controls meet the internal touch-target standard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const undersized = await page.locator(".site-header button, .hero-home .button, .work-mix-card .button").evaluateAll((elements) =>
    elements
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return style.display !== "none" && rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
      })
      .map((element) => ({
        label: element.textContent?.trim() || element.getAttribute("aria-label"),
        minHeight: getComputedStyle(element).minHeight,
        rect: element.getBoundingClientRect().toJSON()
      }))
  );

  expect(undersized).toEqual([]);
});

test("mobile navigation opens and exposes its links", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Touch navigation check runs in the mobile project.");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /menu/i }).click();
  await expect(page.getByRole("navigation", { name: /mobile/i })).toBeVisible();
});

test("tablet Work Mix uses the contained detail layout", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.locator(".work-mix-card-stack-left")).toBeHidden();
  await expect(page.locator(".work-mix-mobile-detail")).toBeVisible();
});

test("course material slider exposes and navigates all sections on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/teaching/hoa-730-statistical-analysis/materials/lectures", { waitUntil: "domcontentloaded" });

  const slider = page.getByRole("navigation", { name: "HOA 730 material sections" });
  await expect(slider.getByRole("link", { name: "Lectures" })).toBeVisible();
  await expect(slider.getByRole("link", { name: "Assignments" })).toBeVisible();
  await expect(slider.getByRole("link", { name: "Code" })).toBeVisible();
  await slider.getByRole("link", { name: "Assignments" }).click();
  await expect(page).toHaveURL(/\/materials\/assignments\/?$/);
  await expect(slider.getByRole("link", { name: "Assignments" })).toHaveAttribute("aria-current", "page");
});

test("mobile search opens, accepts input, and returns navigable results", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open search" }).click();

  const search = page.getByRole("searchbox", { name: "Search the site" });
  await search.fill("research");
  await expect(page.getByRole("list").getByRole("listitem").first()).toBeVisible();
});

test("Work Mix keyboard selection exposes the correct destination", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const researchSlice = page.locator(".work-pie-slice.research");
  await researchSlice.focus();
  await researchSlice.press("Enter");

  const detail = page.locator(".work-mix-mobile-detail");
  await expect(detail.getByRole("heading", { name: /Data-driven/ })).toBeVisible();
  await expect(detail.getByRole("link", { name: "Explore Research" })).toHaveAttribute("href", "/research");
});

test("lazy presentation images load when scrolled into view", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/research", { waitUntil: "domcontentloaded" });
  const finalImage = page.locator(".presentation-photo-card img").last();
  await finalImage.scrollIntoViewIfNeeded();
  await expect.poll(() => finalImage.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
});
