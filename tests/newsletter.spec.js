import { expect, test } from "@playwright/test";

for (const javaScriptEnabled of [true, false]) {
  test.describe(`JavaScript ${javaScriptEnabled ? "enabled" : "disabled"}`, () => {
    test.use({ javaScriptEnabled });

    for (const width of [390, 1440]) {
      test(`newsletter validates and posts to Mailchimp at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        const submissions = [];
        // Never send test addresses to the real audience.
        await page.route("https://*.list-manage.com/**", async (route) => {
          submissions.push(route.request());
          await route.fulfill({ contentType: "text/html", body: "<h1>Mailchimp test response</h1>" });
        });
        await page.goto("/", { waitUntil: "load" });
        const form = page.locator('form[data-provider="mailchimp"]');
        await expect(form).toHaveClass(/ph-no-capture/);
        await expect(form).toHaveAttribute("method", "post");
        const action = new URL(await form.getAttribute("action"));
        expect(action.protocol).toBe("https:");
        expect(action.hostname).toMatch(/\.list-manage\.com$/);
        expect(action.pathname).toBe("/subscribe/post");
        const honeypot = `b_${action.searchParams.get("u")}_${action.searchParams.get("id")}`;
        await expect(form.locator(`input[name="${honeypot}"]`)).toHaveAttribute("tabindex", "-1");
        const input = form.getByRole("textbox", { name: "Email address" });
        const submit = form.getByRole("button", { name: "Join newsletter" });
        await expect(submit).toBeEnabled();
        await expect(input).toHaveAttribute("maxlength", "254");
        for (const value of [
          "", "invalid-address", "person@localhost", "person@@example.com",
          ".person@example.com", "person..name@example.com", "person.@example.com",
          "person@-example.com", "person@example-.com", "person@example..com",
          "person name@example.com", "<script>alert(1)</script>@example.com",
          "x'); DROP TABLE subscribers;--@example.com",
          `${"a".repeat(65)}@example.com`,
          `person@${"a".repeat(64)}.com`
        ]) {
          await input.fill(value);
          await input.press("Enter");
          expect(await input.evaluate((element) => element.validity.valid), value).toBe(false);
          expect(submissions).toHaveLength(0);
        }
        // Some browsers truncate fills to maxlength. Set the value directly to
        // verify the pattern also bounds programmatically populated values.
        await input.evaluate((element) => {
          element.value = `${"a".repeat(64)}@${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(63)}.com`;
        });
        expect(await input.evaluate((element) => element.validity.valid)).toBe(false);
        for (const value of ["name+updates@example.co.uk", "o'connor@example.com", "first.last@sub.example.com"]) {
          await input.fill(value);
          expect(await input.evaluate((element) => element.validity.valid), value).toBe(true);
        }
        await input.fill("newsletter-test@example.com");
        if (javaScriptEnabled) {
          await submit.click();
        } else {
          // Native keyboard submission also verifies the static form without hydration.
          await input.press("Enter");
        }
        await expect(page.getByRole("heading", { name: "Mailchimp test response" })).toBeVisible();
        expect(submissions).toHaveLength(1);
        const request = submissions[0];
        expect(request.method()).toBe("POST");
        const body = new URLSearchParams(request.postData());
        expect(body.get("EMAIL")).toBe("newsletter-test@example.com");
        expect(body.get(honeypot)).toBe("");
        expect(new URL(request.url()).searchParams.has("EMAIL")).toBe(false);
      });
    }
  });
}

test("search bounds input and treats markup and SQL as text", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open search" }).click();
  const input = page.getByRole("searchbox", { name: "Search the site" });
  await expect(input).toHaveAttribute("maxlength", "200");
  await input.fill("<img src=x onerror=window.searchInjected=true>");
  await expect(page.locator(".mobile-search-empty")).toBeVisible();
  expect(await page.evaluate(() => window.searchInjected)).toBeUndefined();
  await expect(page.locator("#mobile-site-search-panel img")).toHaveCount(0);
  await input.fill("' OR 1=1; DROP TABLE posts;--");
  await expect(page.locator(".mobile-search-empty")).toBeVisible();
  await input.fill("x".repeat(250));
  expect((await input.inputValue()).length).toBeLessThanOrEqual(200);
  await input.fill("Manila");
  await expect(page.locator(".mobile-search-result").first()).toBeVisible();
});
