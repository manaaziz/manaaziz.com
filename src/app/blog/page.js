import { getRecentPosts, getSeriesSummaries, getVisiblePosts } from "@/lib/posts";
import BlogSectionSwitcher from "./blog_section_switcher";

export const metadata = {
  title: "The Manalogue"
};

export function ManaloguePage({ sectionId = "home" } = {}) {
  const series = getSeriesSummaries();
  const allPosts = getVisiblePosts()
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => {
      const seriesInfo = series.find((item) => item.seriesSlug === post.seriesSlug);
      return {
        ...post,
        seriesCover: seriesInfo?.cover || "/assets/images/phdblog_cover.webp"
      };
    });
  const recentPosts = getRecentPosts(12).map((post) => {
    const seriesInfo = series.find((item) => item.seriesSlug === post.seriesSlug);
    return {
      ...post,
      seriesCover: seriesInfo?.cover || "/assets/images/phdblog_cover.webp"
    };
  });
  return (
    <main className="page-shell blog-page">
      <BlogSectionSwitcher allPosts={allPosts} posts={recentPosts} sectionId={sectionId} />
    </main>
  );
}

export default function MediaPage() {
  return <ManaloguePage />;
}
