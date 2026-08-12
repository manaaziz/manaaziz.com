import { courses } from "@/app/teaching/courses";
import { getMaterialHub } from "@/app/teaching/material_hubs";
import { podcasts } from "@/app/podcast/shows";
import { getAllPosts, getSeriesSummaries } from "@/lib/posts";

export const dynamic = "force-static";

const siteUrl = "https://manaaziz.com";
const manalogueSections = ["consulting", "research", "teaching", "travel", "podcasts", "gallery"];
const identityImages = [
  "/assets/images/mana-azizsoltani-professional-portrait.webp",
  "/assets/photos/mana-azizsoltani-university-of-macau.webp",
  "/assets/photos/mana-azizsoltani-macau-research-lab.webp",
  "/assets/photos/mana-azizsoltani-macau-campus-visit.webp",
  "/assets/photos/mana-azizsoltani-urjc-madrid-research.webp",
  "/assets/photos/mana-azizsoltani-belmont-ai-presentation.webp",
  "/assets/photos/mana-azizsoltani-spain-study-abroad.webp",
  "/assets/photos/mana-azizsoltani-fab333-reunion.webp"
];

function absolute(path) {
  return path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function uniqueImages(images = []) {
  return Array.from(new Set(images.filter(Boolean).map(absolute)));
}

function entry(path, options = {}) {
  const images = uniqueImages(options.images);
  return {
    url: absolute(path),
    changeFrequency: options.changeFrequency || "monthly",
    priority: options.priority ?? 0.6,
    ...(options.lastModified ? { lastModified: options.lastModified } : {}),
    ...(images.length ? { images } : {})
  };
}

export default function sitemap() {
  const corePages = [
    entry("/", { changeFrequency: "weekly", priority: 1, images: identityImages }),
    entry("/about", { priority: 0.9, images: identityImages }),
    entry("/consulting", { priority: 0.85 }),
    entry("/research", { priority: 0.85, images: ["/assets/photos/mana-azizsoltani-belmont-ai-presentation.webp"] }),
    entry("/teaching", { priority: 0.85 }),
    entry("/manalogue", { changeFrequency: "weekly", priority: 0.85 }),
    entry("/gallery", { priority: 0.75, images: identityImages }),
    entry("/podcast", { priority: 0.7, images: podcasts.map((podcast) => podcast.logo) }),
    entry("/media", { priority: 0.6 }),
    entry("/news", { priority: 0.6 })
  ];

  const sectionPages = manalogueSections.map((section) => entry(`/manalogue/${section}`, {
    changeFrequency: "weekly",
    priority: 0.72
  }));

  const seriesPages = getSeriesSummaries().map((series) => entry(`/blog/${series.seriesSlug}`, {
    changeFrequency: "weekly",
    priority: 0.68,
    images: [series.cover]
  }));

  const postPages = getAllPosts().map((post) => entry(post.href, {
    changeFrequency: "yearly",
    priority: 0.64,
    lastModified: post.date || undefined,
    images: [post.previewImage, post.cover, ...post.images]
  }));

  const coursePages = courses.flatMap((course) => {
    const courseImages = (course.photos || []).map((photo) => photo.src);
    const pages = [
      entry(`/teaching/${course.slug}`, { priority: 0.75, images: courseImages }),
      entry(`/teaching/${course.slug}/syllabus`, { priority: 0.55 })
    ];
    const materialPages = (getMaterialHub(course.slug) || []).map((section) => entry(
      `/teaching/${course.slug}/materials/${section.id}`,
      { priority: 0.55 }
    ));
    return [...pages, ...materialPages];
  });

  const podcastPages = podcasts.map((podcast) => entry(`/podcast/${podcast.slug}`, {
    priority: 0.62,
    images: [podcast.logo]
  }));

  const pages = [...corePages, ...sectionPages, ...seriesPages, ...postPages, ...coursePages, ...podcastPages];
  return Array.from(new Map(pages.map((page) => [page.url, page])).values());
}
