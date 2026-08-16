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

test("course calendar exposes week and due details to touch and keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/teaching/hoa-730-statistical-analysis", { waitUntil: "domcontentloaded" });

  const week = page.getByRole("button", { name: /week 1.*details/i }).first();
  await week.scrollIntoViewIfNeeded();
  await week.focus();
  await page.keyboard.press("Enter");
  await expect(week).toHaveAttribute("aria-expanded", "true");
  const details = page.locator(`#${await week.getAttribute("aria-controls")}`);
  await expect(details).toBeVisible();
  expect(await details.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);

  const more = details.getByRole("button", { name: "More" });
  if (await more.count()) {
    await more.click();
    await expect(more).toHaveAttribute("aria-expanded", "true");
  }
  await page.keyboard.press("Escape");
  await expect(week).toHaveAttribute("aria-expanded", "false");
});

test("Spain scrollytelling provides progress and keyboard-operable navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/blog/teaching/spain-recap", { waitUntil: "domcontentloaded" });
  const story = page.getByRole("region", { name: "Spain 2025 study-abroad journey" });
  if (await story.count()) {
    const next = story.getByRole("button", { name: "Next" });
    await next.focus();
    await page.keyboard.press("Enter");
    await expect(story.getByText(/Story progress: stop 2 of/)).toBeVisible();
  }
});

test("mobile search opens, accepts input, and returns navigable results", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open search" }).click();

  const search = page.getByRole("searchbox", { name: "Search the site" });
  await search.fill("research");
  await expect(page.getByRole("list").getByRole("listitem").first()).toBeVisible();
});

test("mobile search results are capped near three preview cards", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "load" });
  await page.getByRole("button", { name: "Open search" }).click();

  const results = page.locator(".mobile-search-results");
  await expect(results).toBeVisible();
  const geometry = await results.evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight
  }));
  expect(geometry.clientHeight).toBeLessThanOrEqual(360);
  expect(geometry.scrollHeight).toBeGreaterThan(geometry.clientHeight);
});

test("mobile Manalogue uses a one-line masthead, section dropdown, and readable feed", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto("/manalogue", { waitUntil: "load" });

  const masthead = page.getByRole("heading", { name: "The Manalogue", exact: true });
  const mastheadGeometry = await masthead.evaluate((heading) => ({
    clientWidth: heading.clientWidth,
    scrollWidth: heading.scrollWidth,
    height: heading.getBoundingClientRect().height,
    lineHeight: Number.parseFloat(getComputedStyle(heading).lineHeight)
  }));
  expect(mastheadGeometry.scrollWidth).toBeLessThanOrEqual(mastheadGeometry.clientWidth + 1);
  expect(mastheadGeometry.height).toBeLessThanOrEqual(mastheadGeometry.lineHeight * 1.15);

  await expect(page.getByRole("navigation", { name: "Manalogue sections" })).toBeHidden();
  const sectionSelect = page.getByLabel("Choose Manalogue section");
  await expect(sectionSelect).toBeVisible();
  await expect(page.getByRole("heading", { name: "Top Stories", exact: true })).toHaveCount(0);
  await expect(page.locator(".manalogue-mobile-feed .manalogue-mobile-story")).toHaveCount(4);
  await expect(page.locator(".manalogue-mobile-desk")).toHaveCount(6);
  await expect(page.locator(".manalogue-mobile-desk").first().locator(".manalogue-mobile-story")).toHaveCount(3);
  await expect(page.locator(".manalogue-mobile-desk").first().getByRole("link", { name: "View all →" })).toBeVisible();

  const narrowTitles = await page.locator(".manalogue-mobile-story h3").evaluateAll((titles) => (
    titles.filter((title) => title.getBoundingClientRect().width < 120).map((title) => title.textContent)
  ));
  expect(narrowTitles).toEqual([]);

  await page.evaluate(() => window.scrollTo(0, 120));
  const scrollBeforeNavigation = await page.evaluate(() => window.scrollY);
  await sectionSelect.selectOption("research");
  await expect(page).toHaveURL(/\/manalogue\/research\/?$/);
  await expect(page.getByLabel("Choose Manalogue section")).toHaveValue("research");
  await expect(page.getByRole("heading", { name: "Research", exact: true })).toHaveCount(0);
  await expect.poll(async () => Math.abs((await page.evaluate(() => window.scrollY)) - scrollBeforeNavigation)).toBeLessThanOrEqual(10);
});

test("mobile Podcasts gives both shows equal feature treatment", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/manalogue/podcasts", { waitUntil: "load" });

  const features = page.locator(".manalogue-mobile-feed.is-podcasts .manalogue-mobile-story[data-variant='lead']");
  await expect(features).toHaveCount(2);
  const widths = await features.evaluateAll((cards) => cards.map((card) => card.getBoundingClientRect().width));
  expect(Math.abs(widths[0] - widths[1])).toBeLessThanOrEqual(1);
  await expect(features.nth(0).locator(".manalogue-mobile-story-image")).toBeVisible();
  await expect(features.nth(1).locator(".manalogue-mobile-story-image")).toBeVisible();
});

test("mobile Gallery keeps two columns with compact city and country captions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/manalogue/gallery", { waitUntil: "load" });

  const wall = page.locator(".manalogue-gallery-wall");
  await expect(wall).toBeVisible();
  await expect(wall).toHaveCSS("column-count", "2");
  await expect(page.getByText("Macau, SAR", { exact: true })).toHaveCount(2);
  await expect(page.getByText("Nashville, USA", { exact: true })).toBeVisible();
  await expect(page.getByText("Madrid, Spain", { exact: true })).toHaveCount(2);

  const titleSizes = await wall.locator("span strong").evaluateAll((titles) => (
    titles.map((title) => Number.parseFloat(getComputedStyle(title).fontSize))
  ));
  expect(Math.max(...titleSizes)).toBeLessThanOrEqual(15.1);
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
  await expect(detail.getByRole("link", { name: "Explore Research" })).toHaveAttribute("href", "/research/");
});

for (const destination of ["Consulting", "Research", "Teaching"]) {
  test(`mobile Work Mix Explore ${destination.toLowerCase()} link navigates`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const slug = destination.toLowerCase();
    const slice = page.locator(`.work-pie-slice.${slug}`);
    await page.waitForFunction((selector) => {
      const element = document.querySelector(selector);
      return element && Object.keys(element).some((key) => key.startsWith("__reactProps"));
    }, `.work-pie-slice.${slug}`);
    await slice.focus();
    await slice.press("Enter");

    const detail = page.locator(".work-mix-mobile-detail");
    await detail.getByRole("link", { name: `Explore ${destination}` }).click();
    await expect(page).toHaveURL(new RegExp(`/${slug}/?$`));
  });
}

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

test("mobile feature carousels share one default card size and reviews fit", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const blogCard = page.locator(".feature-carousel-card-blog.is-active");
  await blogCard.scrollIntoViewIfNeeded();
  const blogBounds = await blogCard.boundingBox();

  await page.goto("/teaching", { waitUntil: "domcontentloaded" });
  const reviewCard = page.locator(".feature-carousel-card-quote.is-active");
  await reviewCard.scrollIntoViewIfNeeded();
  const reviewBounds = await reviewCard.boundingBox();
  const reviewFits = await reviewCard.evaluate((card) => card.scrollHeight <= card.clientHeight);

  expect(Math.abs(reviewBounds.width - blogBounds.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(reviewBounds.height - blogBounds.height)).toBeLessThanOrEqual(1);
  expect(reviewFits).toBe(true);
});

test("feature carousel Previous mirrors the Next card movement", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "load" });
  const carousel = page.locator(".feature-carousel-blog .feature-carousel");
  await carousel.scrollIntoViewIfNeeded();

  await page.getByRole("button", { name: "Next item" }).click();
  await expect(carousel.locator(".student-review-card.is-previous")).toHaveCSS("animation-name", "carousel-card-next-depart");
  await expect(carousel.locator(".student-review-card.is-active")).toHaveCSS("animation-name", "carousel-card-next-arrive");

  await page.waitForTimeout(850);
  await page.getByRole("button", { name: "Previous item" }).click();
  await expect(carousel.locator(".student-review-card.is-next")).toHaveCSS("animation-name", "carousel-card-previous-depart");
  await expect(carousel.locator(".student-review-card.is-active")).toHaveCSS("animation-name", "carousel-card-previous-arrive");
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
  const mosaic = page.locator(".paper-mosaic");
  await firstPaper.scrollIntoViewIfNeeded();
  const firstPaperBox = await firstPaper.boundingBox();
  const secondPaperBox = await page.locator(".paper-tile").nth(1).boundingBox();
  const thirdPaperBox = await page.locator(".paper-tile").nth(2).boundingBox();
  const fourthPaperBox = await page.locator(".paper-tile").nth(3).boundingBox();
  expect(firstPaperBox.width).toBeGreaterThan(150);
  expect(Math.abs(firstPaperBox.width - secondPaperBox.width)).toBeLessThan(1);
  expect(secondPaperBox.x).toBeGreaterThan(firstPaperBox.x);
  expect(secondPaperBox.y).toBeGreaterThan(firstPaperBox.y + firstPaperBox.height * 0.4);
  expect(secondPaperBox.y).toBeLessThan(firstPaperBox.y + firstPaperBox.height * 0.6);
  const halfStep = firstPaperBox.height / 2;
  expect(Math.abs((secondPaperBox.y - firstPaperBox.y) - halfStep)).toBeLessThanOrEqual(1);
  expect(Math.abs((thirdPaperBox.y - firstPaperBox.y) - firstPaperBox.height)).toBeLessThanOrEqual(1);
  expect(Math.abs((fourthPaperBox.y - thirdPaperBox.y) - halfStep)).toBeLessThanOrEqual(1);
  const mobileGutter = await firstPaper.evaluate((tile) => {
    const tileBounds = tile.getBoundingClientRect();
    const innerBounds = tile.querySelector(".paper-tile-inner").getBoundingClientRect();
    const chipWidth = Number.parseFloat(getComputedStyle(tile.closest(".paper-mosaic-wrap").querySelector(".paper-chip-drop span")).width);
    return {
      horizontal: (innerBounds.left - tileBounds.left) * Math.sqrt(3),
      vertical: (innerBounds.top - tileBounds.top) * 2,
      chipWidth
    };
  });
  expect(Math.abs(mobileGutter.horizontal - mobileGutter.vertical)).toBeLessThanOrEqual(1);
  expect(mobileGutter.vertical).toBeGreaterThan(mobileGutter.chipWidth);
  await expect(firstPaper.locator(".paper-tile-actions")).toBeHidden();
  await firstPaper.press("Enter");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const titleJournalOrder = await dialog.evaluate((element) => {
    const children = Array.from(element.children);
    return children.indexOf(element.querySelector("h3")) < children.indexOf(element.querySelector("small"));
  });
  expect(titleJournalOrder).toBe(true);
  await expect(dialog.locator(".paper-focus-actions").getByRole("link").first()).toBeVisible();
  const closeButton = dialog.getByRole("button", { name: "Close paper details" });
  await expect(closeButton).toBeVisible();
  await closeButton.click();
  await expect(dialog).toBeHidden();
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
  const panelFitsMap = await page.locator(".map-detail-card").evaluate((panel) => {
    const panelBounds = panel.getBoundingClientRect();
    const mapBounds = panel.closest(".global-map-shell").getBoundingClientRect();
    return panelBounds.top >= mapBounds.top - 1 && panelBounds.bottom <= mapBounds.bottom + 1;
  });
  expect(panelFitsMap).toBe(true);
  await page.locator(".collaboration-tile").first().click();
  const selectedPanel = page.locator(".map-detail-card.has-selected-work");
  await expect(selectedPanel).toBeVisible();
  const selectedGeometry = await selectedPanel.evaluate((panel) => {
    const panelBounds = panel.getBoundingClientRect();
    const mapBounds = panel.closest(".global-map-shell").getBoundingClientRect();
    return {
      fitsMap: panelBounds.top >= mapBounds.top - 1 && panelBounds.bottom <= mapBounds.bottom + 1,
      hasInternalScroll: panel.scrollHeight > panel.clientHeight + 1
    };
  });
  expect(selectedGeometry.fitsMap).toBe(true);
  expect(selectedGeometry.hasInternalScroll).toBe(false);
  await expect(closeButton.locator("svg")).toBeVisible();
  await closeButton.click();
  await expect(closeButton).toBeHidden();
});
