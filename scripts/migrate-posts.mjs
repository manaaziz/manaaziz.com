import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const seriesConfig = {
  phdblog: {
    output: "becoming-dr-mana",
    title: "Becoming Dr. Mana"
  },
  EUblog: {
    output: "europe-2023",
    title: "Europe 2023"
  },
  bcnblog: {
    output: "barcelona",
    title: "Americanito in Barcelona"
  }
};

function parseValue(value = "") {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parseFrontMatter(source) {
  if (!source.startsWith("---")) {
    return { data: {}, body: source };
  }

  const end = source.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, body: source };
  }

  const raw = source.slice(3, end).trim();
  const body = source.slice(end + 4).trim();
  const data = {};
  let currentList = null;

  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim()) continue;

    const topLevel = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (topLevel) {
      const [, key, value] = topLevel;
      if (value) {
        data[key] = parseValue(value);
        currentList = null;
      } else {
        data[key] = [];
        currentList = key;
      }
      continue;
    }

    const imagePath = line.match(/^\s*-\s*image_path:\s*(.+)$/);
    if (currentList && imagePath) {
      data[currentList].push({ image_path: parseValue(imagePath[1]) });
    }
  }

  return { data, body };
}

function getSlug(filePath) {
  return path
    .basename(filePath)
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/\.(html|md)$/, "");
}

function getDate(filePath) {
  return path.basename(filePath).slice(0, 10);
}

function normalizeTitle(title, slug) {
  return (title || slug).replace(/&rarr;/g, "->").trim();
}

function assetPath(imagePath) {
  if (imagePath.startsWith("/")) return imagePath;
  if (imagePath.startsWith("EUblog/images/")) return `/assets/${imagePath}`;
  return `/${imagePath}`;
}

function galleryBlock(items = [], caption = "") {
  if (!items.length) return "";

  const images = items
    .map((item) => `  <img src="${assetPath(item.image_path)}" alt="" />`)
    .join("\n");
  const captionLine = caption ? `\n  <figcaption>${caption}</figcaption>` : "";

  return `<figure className="post-gallery">\n  <div>\n${images}\n  </div>${captionLine}\n</figure>`;
}

function transformBody(body, frontMatter) {
  return body
    .replace(/<\/?(html|body)>/gi, "")
    .replace(/<div style="margin-left:20px;margin-right:20px">\s*/gi, "")
    .replace(/\s*<\/div>\s*$/i, "")
    .replace(
      /{%\s*include gallery id=['"]([^'"]+)['"](?:\s+caption=['"]([^'"]*)['"])?\s*%}/g,
      (_, galleryId, caption = "") => galleryBlock(frontMatter[galleryId], caption)
    )
    .replace(/<center><h1>\s*([^<]+?)\s*<\/h1><\/center>/gi, "")
    .replace(/class="/g, "className=\"")
    .replace(/<img([^>]*?)(?<!\/)>/g, "<img$1 />")
    .trim();
}

function quoteYaml(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

for (const [category, config] of Object.entries(seriesConfig)) {
  const inputDir = path.join(root, category, "_posts");
  const outputDir = path.join(root, "content", "blog", config.output);
  fs.mkdirSync(outputDir, { recursive: true });

  for (const file of fs.readdirSync(inputDir).filter((item) => /\.(html|md)$/.test(item)).sort()) {
    const filePath = path.join(inputDir, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data, body } = parseFrontMatter(source);
    const slug = getSlug(filePath);
    const title = normalizeTitle(data.title, slug);
    const date = getDate(filePath);
    const postBody = transformBody(body, data);

    const output = `---\ntitle: ${quoteYaml(title)}\ndate: ${quoteYaml(date)}\nseries: ${quoteYaml(config.output)}\nseriesTitle: ${quoteYaml(config.title)}\nlegacyPath: ${quoteYaml(`/${category}/${slug}`)}\n---\n\n${postBody}\n`;

    fs.writeFileSync(path.join(outputDir, `${slug}.mdx`), output);
  }
}
