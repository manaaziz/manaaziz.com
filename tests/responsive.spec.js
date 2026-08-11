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

test("mobile hero preserves the complete 3D button edge", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const geometry = await page.locator(".hero-home .button-row").evaluate((row) => {
    const rowBounds = row.getBoundingClientRect();
    const lowestButtonBottom = Math.max(
      ...Array.from(row.querySelectorAll(".button"), (button) => button.getBoundingClientRect().bottom)
    );
    return { clearance: rowBounds.bottom - lowestButtonBottom };
  });

  expect(geometry.clearance).toBeGreaterThanOrEqual(5);
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
  await page.waitForFunction(() => {
    const slice = document.querySelector(".work-pie-slice.research");
    return slice && Object.keys(slice).some((key) => key.startsWith("__reactProps"));
  });
  await researchSlice.focus();
  await researchSlice.press("Enter");

  const detail = page.locator(".work-mix-mobile-detail");
  await expect(detail.getByRole("heading", { name: /Data-driven/ })).toBeVisible();
  await expect(detail.getByRole("link", { name: "Explore Research" })).toHaveAttribute("href", "/research");
});

for (const width of [320, 390]) {
  test(`selected Work Mix slice stays inside the ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/", { waitUntil: "load" });
    const researchSlice = page.locator(".work-pie-slice.research");
    await expect.poll(async () => {
      await researchSlice.focus();
      await researchSlice.press("Enter");
      return researchSlice.getAttribute("data-active");
    }).toBe("true");

    const bounds = await researchSlice.evaluate((slice) => slice.getBoundingClientRect().toJSON());
    expect(bounds.left).toBeGreaterThanOrEqual(0);
    expect(bounds.right).toBeLessThanOrEqual(width);
  });
}

test("mobile blog carousel uses the compact shared card height", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const card = page.locator(".feature-carousel-card-blog.is-active");
  await card.scrollIntoViewIfNeeded();

  await expect(card).toBeVisible();
  const bounds = await card.boundingBox();
  expect(bounds.height).toBeLessThanOrEqual(320);
});

test("lazy presentation images load when scrolled into view", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/research", { waitUntil: "domcontentloaded" });
  const finalImage = page.locator(".presentation-photo-card img").last();
  await finalImage.scrollIntoViewIfNeeded();
  await expect.poll(() => finalImage.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
});

test("mobile research map keeps its reduced topic set draggable and connected", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/research", { waitUntil: "load" });

  const graph = page.locator(".research-word-graph");
  const node = graph.getByRole("button", { name: "machine learning", exact: true });
  await node.scrollIntoViewIfNeeded();
  const before = await node.boundingBox();
  await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2);
  await page.mouse.down();
  await page.mouse.move(before.x + before.width / 2 + 32, before.y + before.height / 2 + 18, { steps: 4 });
  await page.mouse.up();
  const after = await node.boundingBox();

  expect(Math.abs(after.x - before.x)).toBeGreaterThan(8);
  await expect(graph.locator(".research-word-graph-lines line[data-mobile-visible='true']").first()).toBeVisible();
});

test("mobile paper hexagons reveal publication actions only after opening", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/research", { waitUntil: "load" });

  const firstPaper = page.locator(".paper-tile").first();
  await firstPaper.scrollIntoViewIfNeeded();
  await expect(firstPaper.locator(".paper-tile-actions")).toBeHidden();
  await firstPaper.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".paper-focus-actions").getByRole("link").first()).toBeVisible();
});

test("home map initializes only as its section approaches the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const placeholder = page.locator(".global-experience-loading");
  await expect(placeholder).toBeAttached();
  await placeholder.scrollIntoViewIfNeeded();
  await expect(page.locator(".global-experience:not(.global-experience-loading)")).toBeVisible();
  await expect(page.locator(".world-map").first()).toBeAttached();
});

test("mobile map detail uses the shared header-style close control", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "load" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55));
  await expect(page.locator(".region-overview-map")).toBeVisible({ timeout: 15_000 });
  await page.getByRole("button", { name: /^Open Europe:/ }).click();
  await page.getByRole("button", { name: /^United Kingdom:/ }).click();

  const closeButton = page.getByRole("button", { name: "Close map details" });
  await expect(closeButton).toBeVisible();
  await expect(closeButton.locator("svg")).toBeVisible();
  await closeButton.click();
  await expect(closeButton).toBeHidden();
});
