import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.join(process.cwd(), "public/assets/images/logos");
const outputDir = path.join(process.cwd(), "public/assets/partner-logos");

const logos = [
  {
    source: "1128.HK_BIG-b02662a0.png",
    output: "wynn-macau.png",
    maxWidth: 900
  },
  {
    source: "1691075779109-771fb91b-7411-40e2-ab45-906ce79464bb.jpg",
    output: "hoiana.png",
    maxWidth: 800,
    removeWhite: true
  },
  {
    source: "24c29a9a52a740359bb959093e5243a9.png",
    output: "wynn-mayfair.png",
    maxWidth: 520,
    removeWhite: true
  },
  {
    source: "Crown_Resorts_logo.svg.png",
    output: "crown-resorts.png",
    maxWidth: 720
  },
  {
    source: "IER_Logotype_RGB.png",
    output: "inspire-resort.png",
    maxWidth: 900
  },
  {
    source: "Melco_logo.png",
    output: "melco.png",
    maxWidth: 640
  },
  {
    source: "SGR.AX_BIG-d0a53ced.png",
    output: "the-star.png",
    maxWidth: 900
  },
  {
    source: "Wynn_Al_Marjan_Island_Logo_2025.png",
    output: "wynn-al-marjan.png",
    maxWidth: 760
  }
];

function removeNearWhiteBackground({ data, info }) {
  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const alpha = data[index + 3];
    const whiteness = Math.min(red, green, blue);
    const colorSpread = Math.max(red, green, blue) - whiteness;

    if (whiteness > 246 && colorSpread < 12) {
      data[index + 3] = 0;
    } else if (whiteness > 232 && colorSpread < 16) {
      data[index + 3] = Math.min(alpha, Math.round((246 - whiteness) * 18));
    }
  }

  return sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  });
}

async function cleanLogo(logo) {
  const input = path.join(sourceDir, logo.source);
  const output = path.join(outputDir, logo.output);
  let image = sharp(input, { failOn: "none" }).rotate().ensureAlpha();

  if (logo.removeWhite) {
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    image = removeNearWhiteBackground({ data, info });
  }

  const metadata = await image.metadata();
  const width = metadata.width || logo.maxWidth;
  const resizeWidth = Math.max(240, Math.min(logo.maxWidth, width < 420 ? Math.round(width * 2) : width));

  image = image
    .resize({
      width: resizeWidth,
      withoutEnlargement: false
    })
    .trim({
      background: logo.trimWhite ? "#ffffff" : { r: 0, g: 0, b: 0, alpha: 0 },
      threshold: logo.trimWhite ? 18 : 8
    })
    .extend({
      top: 18,
      right: 18,
      bottom: 18,
      left: 18,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .sharpen({
      sigma: 0.65,
      m1: 0.6,
      m2: 1.2
    });

  await image.png({ compressionLevel: 9, palette: false }).toFile(output);
}

await fs.mkdir(outputDir, { recursive: true });
await Promise.all(logos.map(cleanLogo));
