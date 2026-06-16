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
  const [chipFlips, setChipFlips] = useState({ previous: 0, next: 0 });
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

  function movePost(direction) {
    setChipFlips((current) => ({
      ...current,
      [direction]: current[direction] + 1
    }));
    goToPost(direction === "previous" ? activeIndex - 1 : activeIndex + 1);
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
          <button
            className="casino-chip previous"
            data-flips={chipFlips.previous}
            key={`archive-previous-${chipFlips.previous}`}
            onClick={() => movePost("previous")}
            type="button"
            aria-label="Previous post"
          >
            <img className="casino-chip-face" src="/assets/images/black_casino_chip.png" alt="" aria-hidden="true" />
            <span aria-hidden="true">←</span>
          </button>
          <span>{activeIndex + 1} / {posts.length}</span>
          <button
            className="casino-chip next"
            data-flips={chipFlips.next}
            key={`archive-next-${chipFlips.next}`}
            onClick={() => movePost("next")}
            type="button"
            aria-label="Next post"
          >
            <img className="casino-chip-face" src="/assets/images/black_casino_chip.png" alt="" aria-hidden="true" />
            <span aria-hidden="true">→</span>
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
