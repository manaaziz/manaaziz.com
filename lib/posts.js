import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content", "blog");

export const seriesConfig = {
  "becoming-dr-mana": {
    legacyCategory: "phdblog",
    legacyBase: "phdblog",
    title: "Becoming Dr. Mana",
    description: "Writing about doctoral work, research life, and the emotional weather around becoming an academic.",
    cover: "/assets/images/phdblog-cover.jpg"
  },
  "europe-2023": {
    legacyCategory: "EUblog",
    legacyBase: "EUblog",
    title: "Europe 2023",
    description: "A travel and professional archive from a multi-purpose European summer trip.",
    cover: "/assets/images/EU23cover.jpg"
  },
  barcelona: {
    legacyCategory: "bcnblog",
    legacyBase: "bcnblog",
    title: "Americanito in Barcelona",
    description: "The week-by-week archive from life abroad in Spain.",
    cover: "/assets/images/barcapic.jpg"
  }
};

const seriesByLegacyCategory = Object.fromEntries(
  Object.entries(seriesConfig).map(([seriesSlug, config]) => [config.legacyCategory, { seriesSlug, ...config }])
);

function parseValue(value = "") {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parseList(value = "") {
  return parseValue(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBoolean(value = "") {
  return ["true", "yes", "1"].includes(parseValue(value).toLowerCase());
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

  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) {
      data[match[1]] = parseValue(match[2]);
    }
  }

  return { data, body };
}

function slugFromFile(file) {
  return path.basename(file).replace(/\.mdx$/, "");
}

function stripHtml(value) {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadingMinutes(content) {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 225));
}

function makeExcerpt(content) {
  const text = stripHtml(content);
  if (text.length <= 180) return text;
  return `${text.slice(0, 177).trim()}...`;
}

function normalizeBody(body) {
  return body
    .replace(/className=/g, "class=")
    .replace(/\/>/g, ">")
    .trim();
}

function getHeadings(contentHtml) {
  return Array.from(contentHtml.matchAll(/<h([2-3])[^>]*>(.*?)<\/h\1>/gi)).map((match) => ({
    level: Number(match[1]),
    text: stripHtml(match[2])
  }));
}

function readSeriesPosts(seriesSlug) {
  const config = seriesConfig[seriesSlug];
  const seriesDir = path.join(contentRoot, seriesSlug);

  if (!config || !fs.existsSync(seriesDir)) return [];

  return fs
    .readdirSync(seriesDir)
    .filter((file) => file.endsWith(".mdx"))
    .sort()
    .map((file) => {
      const sourcePath = path.join(seriesDir, file);
      const source = fs.readFileSync(sourcePath, "utf8");
      const { data, body } = parseFrontMatter(source);
      const slug = slugFromFile(file);
      const contentHtml = normalizeBody(body);
      const title = data.title || slug;
      const date = data.date || "";

      return {
        sourcePath,
        seriesSlug,
        seriesTitle: data.seriesTitle || config.title,
        legacyBase: config.legacyBase,
        legacyCategory: config.legacyCategory,
        slug,
        title,
        date,
        href: `/blog/${seriesSlug}/${slug}`,
        legacyHref: data.legacyPath || `/${config.legacyBase}/${slug}`,
        contentHtml,
        excerpt: makeExcerpt(contentHtml),
        readingMinutes: estimateReadingMinutes(contentHtml),
        headings: getHeadings(contentHtml),
        tags: parseList(data.tags),
        map: {
          featured: parseBoolean(data.mapFeatured),
          country: data.country || "",
          city: data.city || "",
          region: data.region || "",
          company: data.company || "",
          logo: data.logo || "",
          workType: data.workType || "",
          coordinates: parseList(data.coordinates).map(Number).filter(Number.isFinite)
        }
      };
    });
}

export function getAllPosts() {
  return Object.keys(seriesConfig).flatMap(readSeriesPosts);
}

export function getRecentPosts(count = 6) {
  return getAllPosts()
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}

export function getMapFeaturedPosts() {
  return getAllPosts().filter((post) => post.map.featured);
}

export function getSeriesPosts(seriesSlug) {
  return readSeriesPosts(seriesSlug);
}

export function getSeriesInfo(seriesSlug) {
  const info = seriesConfig[seriesSlug];
  if (!info) return null;
  return { seriesSlug, ...info };
}

export function getPost(seriesSlug, slug) {
  return getSeriesPosts(seriesSlug).find((post) => post.slug === slug) || null;
}

export function getLegacyPost(category, slug) {
  const series = seriesByLegacyCategory[category];
  if (!series) return null;
  return getPost(series.seriesSlug, slug);
}

export function getAdjacentPosts(post) {
  const posts = getSeriesPosts(post.seriesSlug);
  const index = posts.findIndex((candidate) => candidate.slug === post.slug);

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null
  };
}

export function getSeriesSummaries() {
  return Object.entries(seriesConfig).map(([seriesSlug, config]) => ({
    seriesSlug,
    ...config,
    posts: readSeriesPosts(seriesSlug)
  }));
}
