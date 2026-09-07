import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const exportRoot = path.join(root, "out");
const siteOrigin = "https://manaaziz.com";
const htmlFiles = [];
const failures = [];
const pages = new Map();

async function collectHtml(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectHtml(entryPath);
    else if (entry.name.endsWith(".html")) htmlFiles.push(entryPath);
  }
}

function exportedTarget(urlPath) {
  const decoded = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const relative = decoded.replace(/^\//, "");
  if (!relative) return path.join(exportRoot, "index.html");
  if (path.extname(relative)) return path.join(exportRoot, relative);
  return path.join(exportRoot, relative, "index.html");
}

function normalizeRoute(urlPath) {
  const decoded = decodeURIComponent(urlPath).replace(/\/{2,}/g, "/");
  return decoded === "/" ? decoded : decoded.replace(/\/$/, "");
}

function pageRoute(htmlFile) {
  const relative = path.relative(exportRoot, htmlFile).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return normalizeRoute(`/${relative.slice(0, -"/index.html".length)}`);
  return normalizeRoute(`/${relative.replace(/\.html$/, "")}`);
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] ?? null;
}

function canonicalUrls(html) {
  return (html.match(/<link\b[^>]*>/gi) || [])
    .filter((tag) => (attribute(tag, "rel") || "").toLowerCase().split(/\s+/).includes("canonical"))
    .map((tag) => attribute(tag, "href"))
    .filter(Boolean);
}

function hasNoindex(html) {
  return (html.match(/<meta\b[^>]*>/gi) || []).some((tag) =>
    (attribute(tag, "name") || "").toLowerCase() === "robots"
      && (attribute(tag, "content") || "").toLowerCase().split(/[\s,]+/).includes("noindex")
  );
}

function validateSiteUrl(rawUrl, context) {
  let url;
  try {
    url = new URL(rawUrl, siteOrigin);
  } catch {
    failures.push(`${context} has an invalid URL: ${rawUrl}`);
    return null;
  }

  if (url.origin !== siteOrigin) failures.push(`${context} must use ${siteOrigin}: ${rawUrl}`);
  if (url.search || url.hash) failures.push(`${context} must not contain a query or fragment: ${rawUrl}`);
  if (url.pathname !== url.pathname.toLowerCase()) failures.push(`${context} must use a lowercase path: ${rawUrl}`);
  return url;
}

async function targetExists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

await collectHtml(exportRoot);

for (const htmlFile of htmlFiles) {
  const relativeFile = path.relative(exportRoot, htmlFile);
  const route = pageRoute(htmlFile);
  const html = await readFile(htmlFile, "utf8");
  const redirect = html.includes("NEXT_REDIRECT;");
  const special = relativeFile === "404.html" || route === "/404" || route.startsWith("/_not-found");
  const noindex = hasNoindex(html);
  const canonicals = canonicalUrls(html);
  const references = [...html.matchAll(/\b(href|src)=["']([^"']+)["']/g)]
    .map((match) => ({ attribute: match[1], value: match[2] }));
  const srcsets = [...html.matchAll(/\bsrcset=["']([^"']+)["']/g)]
    .flatMap((match) => match[1].split(",").map((candidate) => candidate.trim().split(/\s+/)[0]));

  for (const { attribute: referenceType, value: reference } of references) {
    if (!reference.startsWith("/") || reference.startsWith("//")) continue;
    const target = exportedTarget(reference);
    if (!(await targetExists(target))) {
      failures.push(`${relativeFile} -> ${reference}`);
    }

    if (referenceType !== "href") continue;
    const rawPath = reference.split(/[?#]/)[0];
    if (/\?section=/.test(reference)) {
      failures.push(`${relativeFile} links to obsolete query-based navigation: ${reference}`);
    }
    if (/^\/blog\/(?:americanito_bcn|becoming_dr_mana)\//.test(rawPath)) {
      failures.push(`${relativeFile} links to a duplicate archive route: ${reference}`);
    }
    if (!path.extname(rawPath) && rawPath !== rawPath.toLowerCase()) {
      failures.push(`${relativeFile} links to a mixed-case route: ${reference}`);
    }
  }

  for (const reference of srcsets) {
    if (!reference.startsWith("/") || reference.startsWith("//")) continue;
    if (!(await targetExists(exportedTarget(reference)))) failures.push(`${relativeFile} -> ${reference}`);
  }

  let canonical = null;
  if (!redirect && !special) {
    if (canonicals.length !== 1) {
      failures.push(`${relativeFile} must have exactly one canonical URL (found ${canonicals.length})`);
    } else {
      const canonicalUrl = validateSiteUrl(canonicals[0], `${relativeFile} canonical`);
      if (canonicalUrl) {
        canonical = normalizeRoute(canonicalUrl.pathname);
        if (!(await targetExists(exportedTarget(canonicalUrl.pathname)))) {
          failures.push(`${relativeFile} canonical target does not exist: ${canonicals[0]}`);
        }
        if (!noindex && canonical !== route) {
          failures.push(`${relativeFile} is indexable but canonicalizes to ${canonical}`);
        }
      }
    }
  }

  pages.set(route, { relativeFile, route, redirect, special, noindex, canonical });
}

const sitemapXml = await readFile(path.join(exportRoot, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapRoutes = new Set();

for (const rawUrl of sitemapUrls) {
  const url = validateSiteUrl(rawUrl, "sitemap entry");
  if (!url) continue;
  const route = normalizeRoute(url.pathname);
  if (sitemapRoutes.has(route)) failures.push(`sitemap contains duplicate route: ${route}`);
  sitemapRoutes.add(route);

  const page = pages.get(route);
  if (!page) {
    failures.push(`sitemap target is not an exported HTML page: ${rawUrl}`);
  } else {
    if (page.redirect) failures.push(`sitemap includes redirect page: ${route}`);
    if (page.noindex) failures.push(`sitemap includes noindex page: ${route}`);
    if (page.canonical !== route) failures.push(`sitemap entry ${route} conflicts with page canonical ${page.canonical || "(missing)"}`);
  }
}

for (const page of pages.values()) {
  if (page.redirect || page.special || page.noindex) continue;
  if (!sitemapRoutes.has(page.route)) failures.push(`indexable page is missing from sitemap: ${page.route}`);
}

const cname = (await readFile(path.join(exportRoot, "CNAME"), "utf8")).trim();
if (cname !== "manaaziz.com") failures.push(`CNAME contains ${JSON.stringify(cname)}`);

if (failures.length) {
  const uniqueFailures = [...new Set(failures)];
  console.error(`Static export validation found ${uniqueFailures.length} broken contract(s):`);
  uniqueFailures.slice(0, 75).forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${htmlFiles.length} exported HTML pages, ${sitemapRoutes.size} canonical sitemap routes, and all internal file references.`
  );
}
