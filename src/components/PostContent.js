import Link from "next/link";
import { getAdjacentPosts } from "@/lib/posts";

export default function PostContent({ post }) {
  const { previous, next } = getAdjacentPosts(post);

  return (
    <main className="page-shell post-shell">
      <div className="reading-progress" aria-hidden="true" />
      <Link className="back-link" href={`/blog/${post.seriesSlug}`}>
        Back to {post.seriesTitle}
      </Link>
      <p className="eyebrow">{post.seriesTitle}</p>
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>
          {new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </span>
        <span>{post.readingMinutes} min read</span>
        <span>Filed under {post.seriesTitle}</span>
      </div>
      <article className="post-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      <nav className="post-nav" aria-label="Post navigation">
        {previous ? (
          <Link href={previous.href}>
            <span>Previous</span>
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href}>
            <span>Next</span>
            {next.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
