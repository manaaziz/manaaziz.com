import Link from "next/link";
import { getRecentPosts, getSeriesSummaries } from "@/lib/posts";
import ArchiveCarousel from "./ArchiveCarousel";

export const metadata = {
  title: "Blog"
};

const hubNav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/podcast", label: "Podcast" },
  { href: "/news", label: "In the News" },
  { href: "/about", label: "About" }
];

function PostImage({ post }) {
  return <img src={post.cover || post.seriesCover} alt="" />;
}

export default function BlogPage() {
  const series = getSeriesSummaries();
  const recentPosts = getRecentPosts(12).map((post) => {
    const seriesInfo = series.find((item) => item.seriesSlug === post.seriesSlug);
    return {
      ...post,
      seriesCover: seriesInfo?.cover || "/assets/images/phdblog-cover.jpg"
    };
  });
  const featuredPost = recentPosts[0];
  const secondaryPosts = recentPosts.slice(1, 3);
  const railPost = recentPosts[3];

  return (
    <main className="blog-page">
      <section className="blog-landing">
        <nav className="blog-hub-nav" aria-label="Media sections">
          {hubNav.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <section className="blog-hub-layout" aria-label="Featured writing and media">
          <div className="blog-hub-stack">
            {secondaryPosts.map((post, index) => (
              <Link className="blog-image-card compact" href={post.href} key={post.href}>
                <PostImage post={post} />
                <div className="blog-image-overlay">
                  <span>{post.seriesTitle}</span>
                  <time>{post.date}</time>
                  <small>{String(index + 1).padStart(3, "0")}</small>
                  <h2>{post.title}</h2>
                </div>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>

          {featuredPost ? (
            <Link className="blog-feature-card" href={featuredPost.href}>
              <PostImage post={featuredPost} />
              <div className="blog-feature-title">
                <span>{featuredPost.seriesTitle}</span>
                <h1>{featuredPost.title}</h1>
              </div>
            </Link>
          ) : null}

          <aside className="blog-hub-rail">
            <div className="blog-hub-intro">
              <p>
                Writing, podcast work, field notes, and future media mentions from the same professional orbit: hospitality, gaming, analytics, research, teaching, and the life around it.
              </p>
              <div className="button-row">
                <Link className="button" href="/podcast">
                  Podcast
                </Link>
                <Link className="button" href="/news">
                  In the News
                </Link>
              </div>
            </div>

            {railPost ? (
              <Link className="blog-image-card rail" href={railPost.href}>
                <PostImage post={railPost} />
                <div className="blog-image-overlay">
                  <span>{railPost.seriesTitle}</span>
                  <time>{railPost.date}</time>
                  <small>003</small>
                  <h2>{railPost.title}</h2>
                </div>
                <b aria-hidden="true">↗</b>
              </Link>
            ) : null}
          </aside>
        </section>

        <a className="scroll-cue blog-scroll-cue" href="#blog-archive">
          Scroll down
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="blog-archive-section" id="blog-archive">
        <ArchiveCarousel posts={recentPosts} />
      </section>

      <section className="media-grid blog-series-grid" aria-label="Blog series">
        {series.map((item) => (
          <Link className="media-card reveal" href={`/blog/${item.seriesSlug}`} id={item.seriesSlug} key={item.title}>
            <img src={item.cover} alt="" />
            <div>
              <span>{item.posts.length} posts</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
