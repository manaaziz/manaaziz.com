import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeriesInfo, getSeriesPosts, getSeriesSummaries } from "@/lib/posts";

export function generateStaticParams() {
  return getSeriesSummaries().map((series) => ({ series: series.seriesSlug }));
}

export async function generateMetadata({ params }) {
  const { series } = await params;
  const info = getSeriesInfo(series);
  return {
    title: info?.title || "Blog series"
  };
}

export default async function BlogSeriesPage({ params }) {
  const { series } = await params;
  const info = getSeriesInfo(series);
  const posts = getSeriesPosts(series);

  if (!info) notFound();

  const totalReadingMinutes = posts.reduce((total, post) => total + post.readingMinutes, 0);
  const firstPost = posts[0];
  const leadImages = info.coverImages?.length ? info.coverImages : [info.cover].filter(Boolean);

  return (
    <main className="page-shell">
      <section className="blog-series-hero reveal">
        <div>
          <p className="eyebrow">Blog series</p>
          <h1>{info.title}</h1>
          <p className="lede">{info.description}</p>
          <div className="post-tag-row" aria-label={`${info.title} tags`}>
            {(info.tags || []).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        {leadImages.length ? (
          <div className="series-image-reel" aria-label={`${info.title} image preview`}>
            {leadImages.map((image, index) => (
              <img
                alt=""
                decoding="async"
                key={`${image}-${index}`}
                loading={index === 0 ? "eager" : "lazy"}
                src={image}
                style={{ "--image-index": index }}
              />
            ))}
          </div>
        ) : null}
      </section>

      <section className="blog-dashboard reveal" aria-label={`${info.title} summary`}>
        <div>
          <span>{posts.length}</span>
          <p>posts</p>
        </div>
        <div>
          <span>{totalReadingMinutes}</span>
          <p>minutes total</p>
        </div>
        <div>
          <span>{firstPost?.date?.slice(0, 4) || "Archive"}</span>
          <p>{info.startingPointLabel || "opening note"}</p>
        </div>
      </section>

      <section className="post-list series-post-list">
        {posts.map((post) => (
          <Link className="post-list-item reveal" href={post.href} key={post.href}>
            {post.cover || post.images[0] ? <img src={post.cover || post.images[0]} alt="" loading="lazy" decoding="async" /> : null}
            <span>{post.date} - {post.readingMinutes} min read</span>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <div className="post-card-tags">
              {post.tags.slice(0, 3).map((tag) => (
                <small key={tag}>{tag}</small>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
