import Link from "next/link";
import { getAdjacentPosts, getRelatedPosts } from "@/lib/posts";
import SpainRecapScrolly from "@/components/SpainRecapScrolly";

export default function PostContent({ post }) {
  const { previous, next } = getAdjacentPosts(post);
  const relatedPosts = getRelatedPosts(post);
  const isSpainRecap = post.seriesSlug === "spain-2025" && post.slug === "spain-recap";

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
      <div className="post-tag-row" aria-label="Post tags">
        {post.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      {isSpainRecap ? (
        <SpainRecapScrolly />
      ) : (
        <div className="post-content-grid">
          <article className="post-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          <aside className="post-related-panel" aria-label="Related items">
            <p className="eyebrow">Related</p>
            <h2>Keep reading</h2>
            <div className="post-related-list">
              <Link href={`/blog/${post.seriesSlug}`}>
                <span>Series</span>
                <strong>{post.seriesTitle}</strong>
                <small>Open the full archive</small>
              </Link>
              {relatedPosts.map((related) => (
                <Link href={related.href} key={related.href}>
                  <span>{related.seriesTitle}</span>
                  <strong>{related.title}</strong>
                  <small>{related.readingMinutes} min read</small>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}
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
