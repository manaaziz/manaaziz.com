import { spawn } from "node:child_process";
import { access, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const exportRoot = path.join(root, "out");
const port = Number(process.env.PERF_PORT || 4173);
const baseURL = process.env.PERF_BASE_URL || `http://127.0.0.1:${port}`;
const shouldWrite = process.argv.includes("--write");
const routes = ["/", "/manalogue/", "/teaching/", "/research/", "/teaching/hoa-730-statistical-analysis/"];
const profiles = [
  { name: "mobile", viewport: { width: 390, height: 844 }, cpuRate: 4, latency: 75, download: 4_000_000 / 8 },
  { name: "desktop", viewport: { width: 1440, height: 900 }, cpuRate: 1, latency: 20, download: 20_000_000 / 8 }
];

await access(path.join(exportRoot, "index.html"));

let server;
if (!process.env.PERF_BASE_URL) {
  server = spawn("python3", ["-m", "http.server", String(port), "--directory", exportRoot, "--bind", "127.0.0.1"], {
    cwd: root,
    stdio: "ignore"
  });

  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) break;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const profile of profiles) {
    for (const route of routes) {
      const context = await browser.newContext({ viewport: profile.viewport, reducedMotion: "reduce" });
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      await session.send("Emulation.setCPUThrottlingRate", { rate: profile.cpuRate });
      await session.send("Network.enable");
      await session.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: profile.latency,
        downloadThroughput: profile.download,
        uploadThroughput: profile.download / 4,
        connectionType: profile.name === "mobile" ? "cellular4g" : "wifi"
      });
      await page.addInitScript(() => {
        window.__sitePerformance = { cls: 0, lcp: 0, longTasks: 0, longestTask: 0, interactionLatency: 0 };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) window.__sitePerformance.lcp = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__sitePerformance.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__sitePerformance.longTasks += 1;
            window.__sitePerformance.longestTask = Math.max(window.__sitePerformance.longestTask, entry.duration);
          }
        }).observe({ type: "longtask", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__sitePerformance.interactionLatency = Math.max(window.__sitePerformance.interactionLatency, entry.duration);
          }
        }).observe({ type: "event", buffered: true, durationThreshold: 16 });
      });

      await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(750);
      await page.getByRole("button", { name: "Spin the Dr. Mana poker chip logo" }).click();
      await page.waitForTimeout(250);
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        const resources = performance.getEntriesByType("resource");
        const paint = Object.fromEntries(performance.getEntriesByType("paint").map((entry) => [entry.name, entry.startTime]));
        const bytesFor = (pattern) => resources
          .filter((entry) => pattern.test(new URL(entry.name).pathname))
          .reduce((total, entry) => total + (entry.transferSize || entry.encodedBodySize || 0), 0);
        return {
          ttfb: navigation.responseStart,
          domContentLoaded: navigation.domContentLoadedEventEnd,
          load: navigation.loadEventEnd,
          fcp: paint["first-contentful-paint"] || 0,
          lcp: window.__sitePerformance.lcp,
          cls: window.__sitePerformance.cls,
          longTasks: window.__sitePerformance.longTasks,
          longestTask: window.__sitePerformance.longestTask,
          interactionLatency: window.__sitePerformance.interactionLatency,
          transferredBytes: resources.reduce((total, entry) => total + (entry.transferSize || entry.encodedBodySize || 0), 0),
          javascriptBytes: bytesFor(/\.js$/),
          imageBytes: bytesFor(/\.(?:avif|gif|jpe?g|png|webp)$/i),
          requests: resources.length
        };
      });
      results.push({ profile: profile.name, route, ...metrics });
      await context.close();
    }
  }
} finally {
  await browser.close();
  server?.kill("SIGTERM");
}

const report = {
  generatedAt: new Date().toISOString(),
  note: "Local static-export lab measurements; compare trends using the same machine and settings.",
  results
};

console.table(results.map((result) => ({
  profile: result.profile,
  route: result.route,
  lcpMs: Math.round(result.lcp),
  cls: result.cls.toFixed(3),
  jsKb: Math.round(result.javascriptBytes / 1024),
  imageKb: Math.round(result.imageBytes / 1024),
  longestTaskMs: Math.round(result.longestTask),
  interactionMs: Math.round(result.interactionLatency)
})));

if (shouldWrite) {
  const output = path.join(root, "performance-baseline.json");
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wrote ${path.relative(root, output)}.`);
}
