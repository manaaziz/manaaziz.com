import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const exportRoot = path.join(root, "out");
const htmlFiles = [];
const failures = [];

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
  const html = await readFile(htmlFile, "utf8");
  const references = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
  const srcsets = [...html.matchAll(/\bsrcset=["']([^"']+)["']/g)]
    .flatMap((match) => match[1].split(",").map((candidate) => candidate.trim().split(/\s+/)[0]));

  for (const reference of [...references, ...srcsets]) {
    if (!reference.startsWith("/") || reference.startsWith("//")) continue;
    const target = exportedTarget(reference);
    if (!(await targetExists(target))) {
      failures.push(`${path.relative(exportRoot, htmlFile)} -> ${reference}`);
    }
  }
}

const cname = (await readFile(path.join(exportRoot, "CNAME"), "utf8")).trim();
if (cname !== "manaaziz.com") failures.push(`CNAME contains ${JSON.stringify(cname)}`);

if (failures.length) {
  console.error(`Static export validation found ${failures.length} broken contract(s):`);
  failures.slice(0, 50).forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`Validated ${htmlFiles.length} exported HTML pages and their internal file references.`);
}
