import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/consulting",
  "/research",
  "/teaching",
  "/manalogue",
  "/teaching/hoa-730-statistical-analysis",
  "/teaching/hoa-730-statistical-analysis/materials/lectures"
];

for (const route of routes) {
  test(`${route} has a clear document outline and landmark structure`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);

    const landmarkProblems = await page.evaluate(() => {
      const visible = (element) => {
        const style = getComputedStyle(element);
        return style.display !== "none" && style.visibility !== "hidden";
      };
      const name = (element) =>
        element.getAttribute("aria-label") ||
        document.getElementById(element.getAttribute("aria-labelledby") || "")?.textContent?.trim() ||
        "";

      return [...document.querySelectorAll("nav, aside, section[aria-label], section[aria-labelledby]")]
        .filter((element) => visible(element) && !element.closest('[aria-hidden="true"]'))
        .filter((element) => !name(element))
        .map((element) => element.outerHTML.slice(0, 180));
    });

    expect(landmarkProblems).toEqual([]);
  });
}

test("course materials follow heading order in source order", async ({ page }) => {
  await page.goto("/teaching/hoa-730-statistical-analysis/materials/lectures", { waitUntil: "domcontentloaded" });

  const levels = await page.locator("main h1, main h2, main h3, main h4, main h5, main h6").evaluateAll((headings) =>
    headings.map((heading) => Number(heading.tagName.slice(1)))
  );

  const skippedLevel = levels.some((level, index) => index > 0 && level > levels[index - 1] + 1);
  expect(skippedLevel).toBe(false);
});
