"use client";

import { useEffect, useMemo, useState } from "react";

export default function StudentReviewCarousel({ reviews }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeReview = reviews[activeIndex];

  const controls = useMemo(() => ({
    next() {
      setActiveIndex((index) => (index + 1) % reviews.length);
    },
    previous() {
      setActiveIndex((index) => (index - 1 + reviews.length) % reviews.length);
    }
  }), [reviews.length]);

  useEffect(() => {
    if (isPaused || reviews.length < 2) return undefined;

    const timer = window.setInterval(controls.next, 5200);
    return () => window.clearInterval(timer);
  }, [controls, isPaused, reviews.length]);

  return (
    <section
      className="student-review-section"
      onBlur={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="section-intro">
        <p className="eyebrow">Student reviews</p>
        <h2>What students notice</h2>
      </div>

      <div className="student-review-card" aria-live="polite">
        <blockquote key={activeReview.quote}>
          <p>{activeReview.quote}</p>
          <footer>{activeReview.context}</footer>
        </blockquote>

        <div className="student-review-controls" aria-label="Student review controls">
          <button onClick={controls.previous} type="button" aria-label="Previous student review">
            Prev
          </button>
          <span>{activeIndex + 1} / {reviews.length}</span>
          <button onClick={controls.next} type="button" aria-label="Next student review">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
