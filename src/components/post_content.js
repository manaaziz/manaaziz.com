import Link from "next/link";
import DecisionTreeGrowth from "@/components/decision_tree_growth";
import { getAdjacentPosts, getRelatedPosts } from "@/lib/posts";
import SpainRecapScrolly from "@/components/spain_recap_scrolly";

const decisionTreeMarker = '<div data-decision-tree-growth></div>';

export default function PostContent({ post }) {
  const { previous, next } = getAdjacentPosts(post);
  const relatedPosts = getRelatedPosts(post);
  const isSpainRecap = post.seriesSlug === "teaching" && post.slug === "spain-recap";
  const allowedTags = new Set(["consulting", "teaching", "research", "travel"]);
  const visibleTags = post.tags.filter((tag, index, tags) => {
    const key = tag.toLowerCase();
    return allowedTags.has(key) && tags.findIndex((candidate) => candidate.toLowerCase() === key) === index;
  });
  const backHref = post.isSeries ? `/blog/${post.seriesSlug}` : `/manalogue/${post.subjectSlug}`;
  const backLabel = post.isSeries ? `Back to ${post.collectionTitle}` : `Back to ${post.subjectTitle}`;
  const postContentSections = post.contentHtml.split(decisionTreeMarker);

  function renderPostBody() {
    if (postContentSections.length === 1) {
      return <article className="post-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />;
    }

    return (
      <article className="post-body">
        {postContentSections.map((section, index) => (
          <div key={`post-section-${index}`}>
            {section ? <div dangerouslySetInnerHTML={{ __html: section }} /> : null}
            {index < postContentSections.length - 1 ? <DecisionTreeGrowth /> : null}
          </div>
        ))}
      </article>
    );
  }

  return (
    <main className="page-shell post-shell">
      <div className="reading-progress" aria-hidden="true" />
      <Link className="back-link" href={backHref}>
        {backLabel}
      </Link>
      <p className="eyebrow">{post.isSeries ? post.seriesTitle : post.subjectTitle}</p>
      <h1>{post.title}</h1>
      <div className="post-meta">
        {post.date ? (
          <span>
            {new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </span>
        ) : null}
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
          {renderPostBody()}
          <aside className="post-related-panel" aria-label="Related items">
            <p className="eyebrow">Related</p>
            <h2>Keep reading</h2>
            <div className="post-related-list">
              {!post.isSeries ? (
                <Link href={`/manalogue/${post.subjectSlug}`}>
                  <span>Manalogue subject</span>
                  <strong>{post.subjectTitle}</strong>
                  <small>Browse all posts tagged {post.subjectTitle.toLowerCase()}</small>
                </Link>
              ) : (
                <Link href={`/blog/${post.seriesSlug}`}>
                  <span>Series</span>
                  <strong>{post.collectionTitle}</strong>
                  <small>Open the full archive</small>
                </Link>
              )}
              {relatedPosts.map((related) => (
                <Link href={related.href} key={related.href}>
                  <span>{related.isSeries ? related.seriesTitle : related.subjectTitle}</span>
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
