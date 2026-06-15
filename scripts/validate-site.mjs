import { existsSync, readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "src");
const staleAssetPatterns = ["/assets/partner-logos/", "/assets/images/logos/", "IGI-ConfLogo.jpg"];
const logoPattern = /\/assets\/logos\/[^"')\s]+/g;
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".md", ".mdx"]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectFiles(entryPath);
      }

      if (sourceExtensions.has(path.extname(entry.name))) {
        return [entryPath];
      }

      return [];
    })
  );

  return files.flat();
}

const failures = [];
const files = await collectFiles(sourceRoot);

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const relativeFile = path.relative(root, file);

  for (const stalePattern of staleAssetPatterns) {
    if (text.includes(stalePattern)) {
      failures.push(`${relativeFile}: stale asset reference "${stalePattern}"`);
    }
  }

  for (const match of text.matchAll(logoPattern)) {
    const publicPath = path.join(root, "public", match[0]);

    if (!existsSync(publicPath)) {
      failures.push(`${relativeFile}: missing logo ${match[0]}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${files.length} source files.`);
