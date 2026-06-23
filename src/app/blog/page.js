import { getRecentPosts, getSeriesSummaries, getVisiblePosts } from "@/lib/posts";
import BlogSectionSwitcher from "./BlogSectionSwitcher";

export const metadata = {
  title: "The Manalogue"
};

export default function MediaPage() {
  const series = getSeriesSummaries();
  const allPosts = getVisiblePosts()
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => {
      const seriesInfo = series.find((item) => item.seriesSlug === post.seriesSlug);
      return {
        ...post,
        seriesCover: seriesInfo?.cover || "/assets/images/phdblog-cover.jpg"
      };
    });
  const recentPosts = getRecentPosts(12).map((post) => {
    const seriesInfo = series.find((item) => item.seriesSlug === post.seriesSlug);
    return {
      ...post,
      seriesCover: seriesInfo?.cover || "/assets/images/phdblog-cover.jpg"
    };
  });
  return (
    <main className="page-shell blog-page">
      <BlogSectionSwitcher allPosts={allPosts} posts={recentPosts} />
    </main>
  );
}
