import { mkdir, readdir, rename, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const assetRoot = path.join(root, "public", "assets");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const optimizeAboveBytes = 900_000;
const maxDimension = 2200;
const jpegQuality = 78;
const webpQuality = 78;
const pngQuality = 82;
const shouldWrite = process.argv.includes("--write");

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

      if (details.size < optimizeAboveBytes) {
        return [];
      }

      return [{
        path: entryPath,
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

function resizeFor(metadata) {
  const width = metadata.width || 0;
  const height = metadata.height || 0;
  const longest = Math.max(width, height);

  if (longest <= maxDimension) {
    return {};
  }

  if (width >= height) {
    return { width: maxDimension };
  }

  return { height: maxDimension };
}

async function optimizeImage(image) {
  const extension = path.extname(image.path).toLowerCase();
  const metadata = await sharp(image.path).metadata();
  const tmpPath = `${image.path}.optimized`;
  const pipeline = sharp(image.path)
    .rotate()
    .resize({
      ...resizeFor(metadata),
      fit: "inside",
      withoutEnlargement: true
    });

  if (extension === ".png") {
    await pipeline.png({ compressionLevel: 9, quality: pngQuality, palette: true }).toFile(tmpPath);
  } else if (extension === ".webp") {
    await pipeline.webp({ quality: webpQuality }).toFile(tmpPath);
  } else {
    await pipeline.jpeg({ quality: jpegQuality, mozjpeg: true }).toFile(tmpPath);
  }

  const optimized = await stat(tmpPath);

  if (optimized.size >= image.size) {
    await unlink(tmpPath);
    return {
      ...image,
      optimizedSize: image.size,
      skipped: true
    };
  }

  if (shouldWrite) {
    await rename(tmpPath, image.path);
  } else {
    await unlink(tmpPath);
  }

  return {
    ...image,
    optimizedSize: optimized.size,
    skipped: false
  };
}

await mkdir(assetRoot, { recursive: true });

const images = await collectImages(assetRoot);
const results = [];

for (const image of images) {
  results.push(await optimizeImage(image));
}

const optimizedResults = results.filter((result) => !result.skipped);
const originalBytes = results.reduce((total, result) => total + result.size, 0);
const optimizedBytes = results.reduce((total, result) => total + result.optimizedSize, 0);

console.log(`${shouldWrite ? "Optimized" : "Would optimize"} ${optimizedResults.length} image assets over ${formatBytes(optimizeAboveBytes)}.`);
console.log(`Candidate payload: ${formatBytes(originalBytes)} -> ${formatBytes(optimizedBytes)}.`);

optimizedResults
  .sort((a, b) => (b.size - b.optimizedSize) - (a.size - a.optimizedSize))
  .slice(0, 20)
  .forEach((result) => {
    console.log(`- ${formatBytes(result.size)} -> ${formatBytes(result.optimizedSize)}  ${path.relative(root, result.path)}`);
  });
