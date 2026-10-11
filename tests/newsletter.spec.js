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
        await input.fill("invalid-address");
        if (javaScriptEnabled) {
          await submit.click();
        } else {
          // Native keyboard submission also verifies the static form without hydration.
          await input.press("Enter");
        }
        expect(await input.evaluate((element) => element.validity.valid)).toBe(false);
        expect(submissions).toHaveLength(0);
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
