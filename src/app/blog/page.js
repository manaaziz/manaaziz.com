import { getRecentPosts, getSeriesSummaries } from "@/lib/posts";
import ArchiveCarousel from "./ArchiveCarousel";
import BlogSectionSwitcher from "./BlogSectionSwitcher";

export const metadata = {
  title: "Blog"
};

export default function BlogPage() {
  const series = getSeriesSummaries();
  const recentPosts = getRecentPosts(12).map((post) => {
    const seriesInfo = series.find((item) => item.seriesSlug === post.seriesSlug);
    return {
      ...post,
      seriesCover: seriesInfo?.cover || "/assets/images/phdblog-cover.jpg"
    };
  });
  return (
    <main className="blog-page">
      <BlogSectionSwitcher posts={recentPosts} series={series} />

      <section className="blog-archive-section" id="blog-archive">
        <ArchiveCarousel posts={recentPosts} />
      </section>
    </main>
  );
}
