"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const visibleOffsets = [-2, -1, 0, 1, 2];

function wrapIndex(index, length) {
  return (index + length) % length;
}

export default function ArchiveCarousel({ posts }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visiblePosts = useMemo(() => (
    visibleOffsets.map((offset) => ({
      offset,
      post: posts[wrapIndex(activeIndex + offset, posts.length)]
    }))
  ), [activeIndex, posts]);

  useEffect(() => {
    if (isPaused || posts.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => wrapIndex(index + 1, posts.length));
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isPaused, posts.length]);

  function goToPost(nextIndex) {
    setActiveIndex(wrapIndex(nextIndex, posts.length));
  }

  return (
    <section
      className="archive-carousel blog-panel-carousel"
      aria-labelledby="archive-carousel-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="archive-carousel-header">
        <div>
          <p className="eyebrow">Archive</p>
          <h2 id="archive-carousel-title">Browse recent posts</h2>
        </div>
        <div className="archive-carousel-controls" aria-label="Archive carousel controls">
          <button onClick={() => goToPost(activeIndex - 1)} type="button" aria-label="Previous post">
            ←
          </button>
          <span>{activeIndex + 1} / {posts.length}</span>
          <button onClick={() => goToPost(activeIndex + 1)} type="button" aria-label="Next post">
            →
          </button>
        </div>
      </div>

      <div className="blog-panel-stage">
        {visiblePosts.map(({ offset, post }) => (
          <Link
            aria-hidden={offset !== 0}
            className="blog-panel-card"
            data-offset={offset}
            href={post.href}
            key={`${post.href}-${offset}`}
            tabIndex={offset === 0 ? 0 : -1}
          >
            <img src={post.cover || post.seriesCover} alt="" />
            <div>
              <span>{post.seriesTitle} · {post.date} · {post.readingMinutes} min read</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="archive-carousel-dots" aria-label="Archive posts">
        {posts.map((post, index) => (
          <button
            aria-label={`Go to ${post.title}`}
            aria-pressed={index === activeIndex}
            className={index === activeIndex ? "is-active" : ""}
            key={post.href}
            onClick={() => goToPost(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
