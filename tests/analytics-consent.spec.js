import { expect, test } from "@playwright/test";

test("analytics requires consent and preferences remain reversible", async ({ page }) => {
  test.skip(!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, "PostHog is not configured for this test run.");

  await page.route("https://us.i.posthog.com/**", (route) => route.abort());
  await page.addInitScript(() => {
    window.localStorage.removeItem("mana_analytics_consent");
    window.localStorage.removeItem("mana_analytics_replay_sample");
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const consentPanel = page.getByRole("region", { name: "Analytics preferences" });
  await expect(consentPanel).toBeVisible();
  await consentPanel.getByRole("button", { name: "Sure, help out" }).click();
  await expect(consentPanel).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.localStorage.getItem("mana_analytics_consent"))).toBe("accepted");

  await page.getByRole("button", { name: "Analytics preferences" }).click();
  const preferencesDialog = page.getByRole("dialog", { name: "Analytics preferences" });
  await expect(preferencesDialog).toBeVisible();
  await preferencesDialog.getByRole("button", { name: "No thanks" }).click();
  await expect.poll(() => page.evaluate(() => window.localStorage.getItem("mana_analytics_consent"))).toBe("declined");

  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("region", { name: "Analytics preferences" })).toBeHidden();
  await expect(page.getByRole("button", { name: "Analytics preferences" })).toBeVisible();
});
