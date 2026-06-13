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

  return (
    <main className="page-shell">
      <p className="eyebrow">Blog series</p>
      <h1>{info.title}</h1>
      <p className="lede">{info.description}</p>

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
          <span>{posts[0]?.date?.slice(0, 4) || "Archive"}</span>
          <p>starting point</p>
        </div>
      </section>

      <section className="post-list">
        {posts.map((post) => (
          <Link className="post-list-item reveal" href={post.href} key={post.href}>
            <span>{post.date} - {post.readingMinutes} min read</span>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
