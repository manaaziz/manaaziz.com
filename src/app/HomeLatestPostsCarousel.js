"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const reelPositions = [
  { offset: -2, position: "far-previous" },
  { offset: -1, position: "previous" },
  { offset: 0, position: "active" },
  { offset: 1, position: "next" },
  { offset: 2, position: "far-next" }
];

function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

export default function HomeLatestPostsCarousel({ posts }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [chipFlips, setChipFlips] = useState({ previous: 0, next: 0 });
  const spinTimerRef = useRef(null);

  const controls = useMemo(() => ({
    next() {
      setActiveIndex((index) => (index + 1) % posts.length);
    },
    previous() {
      setActiveIndex((index) => (index - 1 + posts.length) % posts.length);
    }
  }), [posts.length]);

  useEffect(() => {
    if (isPaused || isSpinning || posts.length < 2) return undefined;

    const timer = window.setInterval(controls.next, 6500);
    return () => window.clearInterval(timer);
  }, [controls, isPaused, isSpinning, posts.length]);

  useEffect(() => () => {
    if (spinTimerRef.current) {
      window.clearTimeout(spinTimerRef.current);
    }
  }, []);

  if (!posts.length) {
    return null;
  }

  function spinReel() {
    if (isSpinning || posts.length < 2) return;

    const targetIndex = (() => {
      const randomIndex = Math.floor(Math.random() * posts.length);
      return randomIndex === activeIndex ? (randomIndex + 1) % posts.length : randomIndex;
    })();
    const forwardDistance = wrapIndex(targetIndex - activeIndex, posts.length);
    const totalSteps = posts.length * 2 + forwardDistance;
    let step = 0;

    setIsSpinning(true);
    setIsPaused(true);

    function advance() {
      step += 1;
      setActiveIndex((index) => (index + 1) % posts.length);

      if (step >= totalSteps) {
        setIsSpinning(false);
        setIsPaused(false);
        spinTimerRef.current = null;
        return;
      }

      const progress = step / totalSteps;
      const delay = 132 + progress * progress * progress * 260;
      spinTimerRef.current = window.setTimeout(advance, delay);
    }

    spinTimerRef.current = window.setTimeout(advance, 132);
  }

  function movePost(direction) {
    if (isSpinning) return;

    setChipFlips((current) => ({
      ...current,
      [direction]: current[direction] + 1
    }));
    controls[direction]();
  }

  const visiblePosts = reelPositions.map(({ offset, position }) => {
    const index = wrapIndex(activeIndex + offset, posts.length);
    return {
      post: posts[index],
      position,
      index
    };
  });

  return (
    <div
      className={`student-review-carousel home-post-carousel ${isSpinning ? "is-spinning" : ""}`}
      aria-label="Latest blog posts"
      aria-live="polite"
      onBlur={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="student-review-stage home-post-stage">
        {visiblePosts.map(({ post, position, index }) => (
          <Link
            aria-hidden={position !== "active"}
            className={`student-review-card home-post-card is-${position}`}
            href={post.href}
            key={post.href}
            tabIndex={position === "active" ? 0 : -1}
          >
            <img src={post.previewImage || post.cover || post.seriesCover} alt="" loading="lazy" decoding="async" />
            <div className="home-post-card-copy">
              <span>{post.seriesTitle} · {post.date} · {post.readingMinutes} min read</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="student-review-controls home-post-controls" aria-label="Latest post carousel controls">
        <button
          className="review-arrow casino-chip previous"
          data-flips={chipFlips.previous}
          key={`home-post-previous-${chipFlips.previous}`}
          onClick={() => movePost("previous")}
          type="button"
          aria-label="Previous blog post"
        >
          <img className="casino-chip-face" src="/assets/images/black_casino_chip.png" alt="" aria-hidden="true" />
          <span aria-hidden="true">←</span>
        </button>
        <div className="review-dots" aria-label={`Post ${activeIndex + 1} of ${posts.length}`}>
          {posts.map((post, index) => (
            <button
              aria-label={`Show ${post.title}`}
              className={index === activeIndex ? "is-active" : ""}
              key={post.href}
              onClick={() => {
                if (!isSpinning) setActiveIndex(index);
              }}
              type="button"
            />
          ))}
        </div>
        <button
          className="review-arrow casino-chip next"
          data-flips={chipFlips.next}
          key={`home-post-next-${chipFlips.next}`}
          onClick={() => movePost("next")}
          type="button"
          aria-label="Next blog post"
        >
          <img className="casino-chip-face" src="/assets/images/black_casino_chip.png" alt="" aria-hidden="true" />
          <span aria-hidden="true">→</span>
        </button>
        <button className="review-spin-button" disabled={isSpinning} onClick={spinReel} type="button">
          {isSpinning ? "Spinning" : "Spin"}
        </button>
      </div>
    </div>
  );
}
