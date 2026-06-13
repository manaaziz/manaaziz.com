import Link from "next/link";
import { getRecentPosts, getSeriesSummaries } from "@/lib/posts";

export const metadata = {
  title: "Blog"
};

export default function BlogPage() {
  const series = getSeriesSummaries();
  const recentPosts = getRecentPosts(5);
  const totalPosts = series.reduce((total, item) => total + item.posts.length, 0);
  const totalReadingMinutes = series.reduce(
    (total, item) => total + item.posts.reduce((seriesTotal, post) => seriesTotal + post.readingMinutes, 0),
    0
  );

  return (
    <main className="page-shell">
      <p className="eyebrow">Blog</p>
      <h1>Writing</h1>
      <p className="lede">
        The blog is the home for the Manalogue archive: PhD reflections, travel writing, and older essays from Barcelona and Europe.
      </p>

      <section className="blog-dashboard reveal" aria-label="Blog archive summary">
        <div>
          <span>{totalPosts}</span>
          <p>posts migrated</p>
        </div>
        <div>
          <span>{series.length}</span>
          <p>series</p>
        </div>
        <div>
          <span>{totalReadingMinutes}</span>
          <p>minutes of reading</p>
        </div>
      </section>

      <nav className="topic-pills reveal" aria-label="Browse blog series">
        {series.map((item) => (
          <a href={`#${item.seriesSlug}`} key={item.seriesSlug}>
            {item.title}
          </a>
        ))}
      </nav>

      <section className="media-grid">
        {series.map((item) => (
          <Link className="media-card reveal" href={`/blog/${item.seriesSlug}`} id={item.seriesSlug} key={item.title}>
            <img src={item.cover} alt="" />
            <div>
              <span>{item.posts.length} posts</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
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
            <Link className="post-list-item reveal" href={post.href} key={post.href}>
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
