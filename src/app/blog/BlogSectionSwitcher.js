"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  { id: "writing", label: "Writing" },
  { id: "series", label: "Series" },
  { id: "podcast", label: "Podcast" },
  { id: "news", label: "In the News" }
];

function PostCard({ post, featured = false }) {
  return (
    <Link className={featured ? "blog-desk-card featured" : "blog-desk-card"} href={post.href}>
      <img src={post.cover || post.seriesCover} alt="" />
      <div>
        <span>{post.seriesTitle} · {post.date} · {post.readingMinutes} min</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </div>
    </Link>
  );
}

export default function BlogSectionSwitcher({ posts, series }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = sections[activeIndex];
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <section className="blog-desk" aria-labelledby="blog-desk-title">
      <div className="blog-desk-topline">
        <div>
          <p className="eyebrow">Media desk</p>
          <h1 id="blog-desk-title">Writing, field notes, and public work</h1>
        </div>
        <p>
          A cleaner home for essays, travel archives, podcast work, media mentions, and the professional life around hospitality, gaming, analytics, research, and teaching.
        </p>
      </div>

      <div
        className="blog-switcher"
        style={{
          "--active-index": activeIndex,
          "--section-count": sections.length
        }}
      >
        <div className="blog-switcher-bar" role="tablist" aria-label="Blog sections">
          {sections.map((section, index) => (
            <button
              aria-controls={`blog-panel-${section.id}`}
              aria-selected={activeSection.id === section.id}
              id={`blog-tab-${section.id}`}
              key={section.id}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="blog-switcher-window">
          <div className="blog-switcher-track">
            <section
              aria-labelledby="blog-tab-writing"
              className="blog-switcher-panel writing"
              id="blog-panel-writing"
              role="tabpanel"
            >
              {featuredPost ? <PostCard post={featuredPost} featured /> : null}
              <div className="blog-desk-list">
                {recentPosts.map((post) => (
                  <PostCard key={post.href} post={post} />
                ))}
              </div>
            </section>

            <section
              aria-labelledby="blog-tab-series"
              className="blog-switcher-panel"
              id="blog-panel-series"
              role="tabpanel"
            >
              <div className="blog-series-clean-grid">
                {series.map((item) => (
                  <Link className="blog-series-clean-card" href={`/blog/${item.seriesSlug}`} key={item.title}>
                    <img src={item.cover} alt="" />
                    <div>
                      <span>{item.posts.length} posts</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="blog-tab-podcast"
              className="blog-switcher-panel split"
              id="blog-panel-podcast"
              role="tabpanel"
            >
              <article className="blog-text-panel">
                <span>Podcast</span>
                <h2>Recent graduates, real transitions</h2>
                <p>
                  A home for conversations about school, work, identity, hospitality, and the weird middle space between being a student and becoming a professional.
                </p>
                <Link className="button" href="/podcast">
                  Open podcast
                </Link>
              </article>
              <div className="blog-note-stack" aria-hidden="true">
                <span>Interviews</span>
                <span>Career stories</span>
                <span>Audio archive</span>
              </div>
            </section>

            <section
              aria-labelledby="blog-tab-news"
              className="blog-switcher-panel split"
              id="blog-panel-news"
              role="tabpanel"
            >
              <article className="blog-text-panel">
                <span>News</span>
                <h2>Media mentions and public-facing work</h2>
                <p>
                  A future home for interviews, conference coverage, press mentions, and public writing connected to gaming, hospitality, analytics, and education.
                </p>
                <Link className="button" href="/news">
                  Open news
                </Link>
              </article>
              <div className="blog-note-stack" aria-hidden="true">
                <span>Conference notes</span>
                <span>Media mentions</span>
                <span>Public scholarship</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
