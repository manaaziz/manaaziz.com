"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  { id: "blog", label: "Blog" },
  { id: "podcasts", label: "Podcasts" },
  { id: "news", label: "In the News" },
  { id: "gallery", label: "Gallery" }
];

const podcasts = [
  {
    title: "The Rebel Revolution",
    description: "A UNLV-centered show about ideas, people, scholarship, and the work moving through the university.",
    href: "https://open.spotify.com/show/3HrzYII7QOj8CyYYj19r3o?si=4a3605a137fa4173"
  },
  {
    title: "The Job Forum",
    description: "A show about college, work, early career transitions, and the stories people carry into their professional lives.",
    href: "https://open.spotify.com/show/1xfePE5KeTYJFdoz0PDV0T?si=ac2fa720a41943a0"
  }
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

export default function BlogSectionSwitcher({ posts }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = sections[activeIndex];
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <section className="blog-desk" aria-labelledby="blog-desk-title">
      <div className="blog-desk-topline">
        <p className="eyebrow">Media</p>
        <h1 id="blog-desk-title">Media</h1>
      </div>

      <div
        className="blog-switcher"
        style={{
          "--active-index": activeIndex,
          "--section-count": sections.length
        }}
      >
        <div className="blog-switcher-bar" role="tablist" aria-label="Media sections">
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
              aria-labelledby="blog-tab-blog"
              className="blog-switcher-panel writing"
              id="blog-panel-blog"
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
              aria-labelledby="blog-tab-podcasts"
              className="blog-switcher-panel split"
              id="blog-panel-podcasts"
              role="tabpanel"
            >
              <article className="blog-text-panel">
                <span>Podcasts</span>
                <h2>Two shows, two kinds of conversation</h2>
                <p>
                  The podcast archive is focused on The Rebel Revolution and The Job Forum, with both shows available on Spotify.
                </p>
                <Link className="button" href="/podcast">
                  Open podcast page
                </Link>
              </article>
              <div className="blog-podcast-list">
                {podcasts.map((podcast) => (
                  <a className="blog-podcast-card" href={podcast.href} key={podcast.title} rel="noreferrer" target="_blank">
                    <span>Spotify show</span>
                    <h3>{podcast.title}</h3>
                    <p>{podcast.description}</p>
                    <strong>Listen on Spotify</strong>
                  </a>
                ))}
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

            <section
              aria-labelledby="blog-tab-gallery"
              className="blog-switcher-panel split"
              id="blog-panel-gallery"
              role="tabpanel"
            >
              <article className="blog-text-panel">
                <span>Gallery</span>
                <h2>Visual archive</h2>
                <p>
                  A visual home for research presentations, teaching, student leadership, travel, wine, hospitality, and community work.
                </p>
                <Link className="button" href="/gallery">
                  Open gallery
                </Link>
              </article>
              <div className="blog-note-stack" aria-hidden="true">
                <span>Research</span>
                <span>Teaching</span>
                <span>Travel</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
