import Link from "next/link";
import { getSeriesPosts } from "@/lib/posts";

export const metadata = {
  title: "Europe 2023"
};

export default function OldEuropeBlogPage() {
  const posts = getSeriesPosts("travel");

  return (
    <main className="page-shell">
      <p className="eyebrow">Blog series</p>
      <h1>Europe 2023</h1>
      <p className="lede">This series now lives inside the media section. The old URL is preserved here for compatibility.</p>
      <section className="post-list">
        {posts.map((post) => (
          <Link className="post-list-item" href={`/e_ublog/${post.slug}`} key={post.slug}>
            <span>{post.date} - {post.readingMinutes} min read</span>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
