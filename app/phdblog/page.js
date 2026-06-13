import Link from "next/link";
import { getSeriesPosts } from "@/lib/posts";

export const metadata = {
  title: "Becoming Dr. Mana"
};

export default function OldPhdBlogPage() {
  const posts = getSeriesPosts("becoming-dr-mana");

  return (
    <main className="page-shell">
      <p className="eyebrow">Blog series</p>
      <h1>Becoming Dr. Mana</h1>
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
