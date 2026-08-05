import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const assetRoot = path.join(root, "public", "assets");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const warningSize = 1_000_000;
const heavySize = 3_000_000;
const largestCount = 20;

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectImages(entryPath);
      }

      if (!imageExtensions.has(path.extname(entry.name).toLowerCase())) {
        return [];
      }

      const details = await stat(entryPath);

      return [{
        path: path.relative(root, entryPath),
        size: details.size
      }];
    })
  );

  return images.flat();
}

function formatBytes(bytes) {
  if (bytes >= 1_000_000) {
    return `${(bytes / 1_000_000).toFixed(1)} MB`;
  }

  return `${Math.round(bytes / 1_000)} KB`;
}

const images = await collectImages(assetRoot);
const totalBytes = images.reduce((total, image) => total + image.size, 0);
const warningImages = images.filter((image) => image.size >= warningSize);
const heavyImages = images.filter((image) => image.size >= heavySize);
const largestImages = images
  .slice()
  .sort((a, b) => b.size - a.size)
  .slice(0, largestCount);

console.log(`Audited ${images.length} image assets.`);
console.log(`Total image payload in public/assets: ${formatBytes(totalBytes)}.`);
console.log(`${warningImages.length} images are at least ${formatBytes(warningSize)}.`);
console.log(`${heavyImages.length} images are at least ${formatBytes(heavySize)}.`);

if (largestImages.length > 0) {
  console.log("\nLargest images:");
  largestImages.forEach((image) => {
    console.log(`- ${formatBytes(image.size)}  ${image.path}`);
  });
}

if (heavyImages.length > 0) {
  console.log("\nDeployment note: large source images are allowed, but gallery/course pages will feel faster if display images are resized or converted to WebP/AVIF over time.");
}
