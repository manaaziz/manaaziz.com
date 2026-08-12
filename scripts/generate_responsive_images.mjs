import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const widths = [480, 960];
const sources = [
  "/assets/images/mana-azizsoltani-professional-portrait.webp",
  "/assets/photos/fab333_madrid/fab_madrid_day5.webp",
  "/assets/photos/fab333_madrid/fab_val_day2.webp",
  "/assets/photos/fab333_reunion_group.webp",
  "/assets/photos/fab333_2026_2.webp",
  "/assets/photos/fab333_2026_tea.webp",
  "/assets/photos/fab333_paella.webp"
];

let generated = 0;

for (const source of sources) {
  const sourcePath = path.join(root, "public", source);
  const metadata = await sharp(sourcePath).metadata();
  const relative = source.replace(/^\/assets\//, "").replace(/\.webp$/i, "");

  for (const width of widths.filter((candidate) => candidate < (metadata.width || 0))) {
    const outputPath = path.join(root, "public", "assets", "responsive", `${relative}-${width}w.webp`);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(outputPath);
    generated += 1;
  }
}

console.log(`Generated ${generated} responsive WebP variants.`);
