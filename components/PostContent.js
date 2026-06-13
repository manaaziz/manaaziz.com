import Link from "next/link";
import { getAdjacentPosts } from "@/lib/posts";

export default function PostContent({ post }) {
  const { previous, next } = getAdjacentPosts(post);

  return (
    <main className="page-shell post-shell">
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
      {post.excerpt ? <p className="post-dek">{post.excerpt}</p> : null}
      {post.headings.length ? (
        <aside className="post-toc" aria-label="In this post">
          <strong>In this post</strong>
          {post.headings.map((heading, index) => (
            <span key={`${heading.text}-${index}`} data-level={heading.level}>
              {heading.text}
            </span>
          ))}
        </aside>
      ) : null}
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
