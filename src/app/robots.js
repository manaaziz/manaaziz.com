export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://manaaziz.com/sitemap.xml",
    host: "https://manaaziz.com"
  };
}
