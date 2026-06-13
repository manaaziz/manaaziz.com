import Link from "next/link";
import { getRecentPosts, getSeriesSummaries } from "@/lib/posts";

export const metadata = {
  title: "Blog"
};

export default function BlogPage() {
  const series = getSeriesSummaries();
  const recentPosts = getRecentPosts(5);

  return (
    <main className="page-shell">
      <p className="eyebrow">Blog</p>
      <h1>Writing</h1>
      <p className="lede">
        The blog is the home for the Manalogue archive: PhD reflections, travel writing, and older essays from Barcelona and Europe.
      </p>

      <section className="media-grid">
        {series.map((item) => (
          <Link className="media-card" href={`/blog/${item.seriesSlug}`} key={item.title}>
            <img src={item.cover} alt="" />
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span>{item.posts.length} posts</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="recent-posts">
        <div>
          <p className="eyebrow">Recent writing</p>
          <h2>Latest from the archive</h2>
        </div>
        <div className="post-list">
          {recentPosts.map((post) => (
            <Link className="post-list-item" href={post.href} key={post.href}>
              <span>{post.seriesTitle} - {post.date} - {post.readingMinutes} min read</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
