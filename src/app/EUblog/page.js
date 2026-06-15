import Link from "next/link";
import { getSeriesPosts } from "@/lib/posts";

export const metadata = {
  title: "Europe 2023"
};

export default function OldEuropeBlogPage() {
  const posts = getSeriesPosts("europe-2023");

  return (
    <main className="page-shell">
      <p className="eyebrow">Blog series</p>
      <h1>Europe 2023</h1>
      <p className="lede">This series now lives inside the main blog section. The old URL is preserved here for compatibility.</p>
      <section className="post-list">
        {posts.map((post) => (
          <Link className="post-list-item" href={post.legacyHref} key={post.legacyHref}>
            <span>{post.date} - {post.readingMinutes} min read</span>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
