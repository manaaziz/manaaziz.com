import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicRoot = path.join(root, "public");
const sourceRoots = ["src", "public"].map((directory) => path.join(root, directory));
const originalRoot = path.join(root, "asset_originals");
const photoExtensions = new Set([".jpg", ".jpeg", ".heic", ".png"]);
const sourceExtensions = new Set([".js", ".jsx", ".md", ".mdx", ".css", ".mjs", ".json", ".html", ".ics"]);
const protectedImageNames = new Set([
  "bitmoji_formal.png",
  "bitmoji_head_logo_cutout.png",
  "bitmoji_searching_marker.png",
  "bitmoji_waving_marker.png",
  "black_casino_chip.png"
]);
const protectedLogoNames = new Set([
  "ballys_corporation_logo.svg",
  "csp_2020_logo.svg",
  "nc_state_logo.svg",
  "uba_logo.svg",
  "usydney_logo.svg"
]);

async function collectFiles(directory, predicate) {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git" || entry.name === ".next" || entry.name === "out") {
        return [];
      }

      return collectFiles(entryPath, predicate);
    }

    return predicate(entryPath) ? [entryPath] : [];
  }));

  return files.flat();
}

function publicPathFor(filePath) {
  return `/${path.relative(publicRoot, filePath).split(path.sep).join("/")}`;
}

function webpPathFor(filePath) {
  return filePath.replace(/\.(jpe?g|heic|png)$/i, ".webp");
}

function originalPathFor(filePath) {
  const relative = path.relative(publicRoot, filePath);
  return path.join(originalRoot, relative);
}

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function convertPhoto(filePath) {
  const webpPath = webpPathFor(filePath);

  if (!(await pathExists(webpPath))) {
    await sharp(filePath)
      .rotate()
      .resize({
        width: 2200,
        height: 2200,
        fit: "inside",
        withoutEnlargement: true
      })
      .webp({ quality: 78 })
      .toFile(webpPath);
  }

  const originalPath = originalPathFor(filePath);
  await mkdir(path.dirname(originalPath), { recursive: true });

  if (!(await pathExists(originalPath))) {
    await rename(filePath, originalPath);
  } else {
    await rm(filePath);
  }

  return {
    from: publicPathFor(filePath),
    to: publicPathFor(webpPath),
    original: path.relative(root, originalPath)
  };
}

async function updateReferences(conversions) {
  const sourceFiles = (await Promise.all(sourceRoots.map((directory) => (
    collectFiles(directory, (filePath) => sourceExtensions.has(path.extname(filePath).toLowerCase()))
  )))).flat();

  let touched = 0;

  for (const filePath of sourceFiles) {
    let content = await readFile(filePath, "utf8");
    const originalContent = content;

    conversions.forEach(({ from, to }) => {
      content = content.split(from).join(to);
    });

    if (content !== originalContent) {
      await writeFile(filePath, content);
      touched += 1;
    }
  }

  return touched;
}

async function removeUnusedLogos() {
  const logoRoot = path.join(publicRoot, "assets", "logos");
  const logoFiles = await collectFiles(logoRoot, (filePath) => !filePath.endsWith(".DS_Store"));
  const searchableFiles = (await Promise.all(sourceRoots.map((directory) => (
    collectFiles(directory, (filePath) => sourceExtensions.has(path.extname(filePath).toLowerCase()))
  )))).flat();
  const haystacks = await Promise.all(searchableFiles.map((filePath) => readFile(filePath, "utf8")));
  const removed = [];

  for (const logoPath of logoFiles) {
    const name = path.basename(logoPath);

    if (protectedLogoNames.has(name)) continue;

    const publicPath = publicPathFor(logoPath);
    const referenced = haystacks.some((content) => content.includes(publicPath));

    if (!referenced) {
      await rm(logoPath);
      removed.push(path.relative(root, logoPath));
    }
  }

  return removed;
}

const photoFiles = await collectFiles(path.join(publicRoot, "assets"), (filePath) => {
  const relative = path.relative(path.join(publicRoot, "assets"), filePath);
  const topLevelDirectory = relative.split(path.sep)[0];
  const extension = path.extname(filePath).toLowerCase();

  if (!photoExtensions.has(extension)) return false;
  if (protectedImageNames.has(path.basename(filePath))) return false;

  return topLevelDirectory === "photos" || topLevelDirectory === "images";
});

const conversions = [];
const failures = [];

for (const photoFile of photoFiles) {
  try {
    conversions.push(await convertPhoto(photoFile));
  } catch (error) {
    failures.push({
      file: path.relative(root, photoFile),
      error: error.message
    });
  }
}

const touchedReferenceFiles = await updateReferences(conversions);
const removedLogos = await removeUnusedLogos();

console.log(`Converted/moved ${conversions.length} photo assets to WebP.`);
console.log(`Updated references in ${touchedReferenceFiles} files.`);
console.log(`Removed ${removedLogos.length} unused logo assets.`);

if (removedLogos.length > 0) {
  removedLogos.forEach((logo) => console.log(`- removed ${logo}`));
}

if (failures.length > 0) {
  console.log(`Failed to convert ${failures.length} files:`);
  failures.forEach((failure) => console.log(`- ${failure.file}: ${failure.error}`));
}
