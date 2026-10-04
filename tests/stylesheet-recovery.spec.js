import { expect, test } from "@playwright/test";
import { failedStylesheetUrl, installStylesheetRecovery } from "../src/lib/stylesheet_recovery";

const origin = "https://manaaziz.com";
const cssError = (href = `${origin}/_next/static/chunks/example.css`) => ({
  type: "error", target: { tagName: "LINK", rel: "stylesheet", href }
});

test("a rejected CSS load recovers the page without hiding the original error", async ({ page }) => {
  let navigations = 0;
  const errors = [];
  page.on("request", (request) => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) navigations += 1;
  });
  page.on("pageerror", (error) => errors.push(error));
  await page.route("**/_next/static/chunks/test-only-failure.css", (route) => route.abort());
  await page.goto("/", { waitUntil: "networkidle" });
  const initialNavigations = navigations;
  async function rejectStylesheet() {
    await page.evaluate(() => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/_next/static/chunks/test-only-failure.css";
      // Match React's stylesheet-loading promise, including its native Event.
      void new Promise((resolve, reject) => { link.onload = resolve; link.onerror = reject; });
      document.head.appendChild(link);
    });
  }
  await rejectStylesheet();
  await expect.poll(() => navigations).toBe(initialNavigations + 1);
  await page.waitForLoadState("networkidle");
  expect(errors.length).toBeGreaterThan(0);
  await rejectStylesheet();
  await page.waitForTimeout(1500);
  expect(navigations).toBe(initialNavigations + 1);
});

test("stylesheet diagnostics identify only local Next CSS and omit query data", () => {
  expect(failedStylesheetUrl(cssError(`${origin}/_next/static/chunks/example.css?private=value#fragment`), origin))
    .toBe(`${origin}/_next/static/chunks/example.css`);
  for (const reason of [new Error("unrelated"), cssError("https://external.example/a.css"), cssError(`${origin}/assets/a.css`),
    { type: "error", target: { tagName: "IMG" } }, { type: "error", target: { tagName: "LINK", rel: "preload" } }]) {
    expect(failedStylesheetUrl(reason, origin)).toBeNull();
  }
});

test("stylesheet recovery reloads once per tab, including after reinstallation", () => {
  const values = new Map();
  const listeners = new Set();
  const timers = [];
  let reloads = 0;
  const browser = {
    location: { origin, reload: () => { reloads += 1; } },
    sessionStorage: { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) },
    setTimeout: (callback) => timers.push(callback),
    addEventListener: (_, callback) => listeners.add(callback),
    removeEventListener: (_, callback) => listeners.delete(callback)
  };
  const emit = (reason) => listeners.forEach((listener) => listener({ reason }));
  const cleanup = installStylesheetRecovery(browser);
  emit(new Error("unrelated"));
  expect(timers).toHaveLength(0);
  emit(cssError());
  emit(cssError());
  expect(timers).toHaveLength(1);
  timers[0]();
  expect(reloads).toBe(1);
  cleanup();
  installStylesheetRecovery(browser);
  emit(cssError(`${origin}/_next/static/chunks/another.css`));
  expect(timers).toHaveLength(1);
});

test("blocked session storage does not trigger a reload loop or another error", () => {
  let listener;
  let reloadScheduled = false;
  installStylesheetRecovery({
    location: { origin },
    get sessionStorage() { throw new Error("Storage disabled"); },
    addEventListener: (_, callback) => { listener = callback; },
    setTimeout: () => { reloadScheduled = true; }
  });
  expect(() => listener({ reason: cssError() })).not.toThrow();
  expect(reloadScheduled).toBe(false);
});
