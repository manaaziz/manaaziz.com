import Link from "next/link";
import { getAdjacentPosts, getRelatedPosts } from "@/lib/posts";
import SpainRecapScrolly from "@/components/SpainRecapScrolly";

export default function PostContent({ post }) {
  const { previous, next } = getAdjacentPosts(post);
  const relatedPosts = getRelatedPosts(post);
  const isSpainRecap = post.seriesSlug === "spain-2025" && post.slug === "spain-recap";
  const allowedTags = new Set(["consulting", "teaching", "research", "travel"]);
  const visibleTags = post.tags.filter((tag, index, tags) => {
    const key = tag.toLowerCase();
    return allowedTags.has(key) && tags.findIndex((candidate) => candidate.toLowerCase() === key) === index;
  });
  const backHref = post.standalone ? "/manalogue" : `/blog/${post.seriesSlug}`;
  const backLabel = post.standalone ? "Back to The Manalogue" : `Back to ${post.seriesTitle}`;

  return (
    <main className="page-shell post-shell">
      <div className="reading-progress" aria-hidden="true" />
      <Link className="back-link" href={backHref}>
        {backLabel}
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
      </div>
      {visibleTags.length > 0 ? (
        <div className="post-tag-row" aria-label="Post tags">
          {visibleTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      ) : null}
      {isSpainRecap ? (
        <SpainRecapScrolly />
      ) : (
        <div className="post-content-grid">
          <article className="post-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          <aside className="post-related-panel" aria-label="Related items">
            <p className="eyebrow">Related</p>
            <h2>Keep reading</h2>
            <div className="post-related-list">
              {post.standalone ? (
                <Link href="/manalogue">
                  <span>Manalogue</span>
                  <strong>Tagged writing</strong>
                  <small>Browse by teaching, travel, research, and analytics</small>
                </Link>
              ) : (
                <Link href={`/blog/${post.seriesSlug}`}>
                  <span>Series</span>
                  <strong>{post.seriesTitle}</strong>
                  <small>Open the full archive</small>
                </Link>
              )}
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
