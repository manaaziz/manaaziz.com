import Link from "next/link";
import { getSeriesPosts } from "@/lib/posts";

export const metadata = {
  title: "Americanito in Barcelona"
};

export default function OldBarcelonaBlogPage() {
  const posts = getSeriesPosts("barcelona");

  return (
    <main className="page-shell">
      <p className="eyebrow">Blog series</p>
      <h1>Americanito in Barcelona</h1>
      <p className="lede">This series now lives inside the media section. The old URL is preserved here for compatibility.</p>
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
