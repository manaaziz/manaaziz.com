import { getRecentPosts, getSeriesSummaries } from "@/lib/posts";
import BlogSectionSwitcher from "./BlogSectionSwitcher";

export const metadata = {
  title: "The Manalogue"
};

export default function MediaPage() {
  const series = getSeriesSummaries();
  const recentPosts = getRecentPosts(12).map((post) => {
    const seriesInfo = series.find((item) => item.seriesSlug === post.seriesSlug);
    return {
      ...post,
      seriesCover: seriesInfo?.cover || "/assets/images/phdblog-cover.jpg"
    };
  });
  return (
    <main className="page-shell blog-page">
      <BlogSectionSwitcher posts={recentPosts} />
    </main>
  );
}
