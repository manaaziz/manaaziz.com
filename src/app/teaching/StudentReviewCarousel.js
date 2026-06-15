"use client";

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

export default function StudentReviewCarousel({ reviews }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinTimerRef = useRef(null);
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
    if (isPaused || isSpinning || reviews.length < 2) return undefined;

    const timer = window.setInterval(controls.next, 6500);
    return () => window.clearInterval(timer);
  }, [controls, isPaused, isSpinning, reviews.length]);

  useEffect(() => () => {
    if (spinTimerRef.current) {
      window.clearTimeout(spinTimerRef.current);
    }
  }, []);

  function spinReel() {
    if (isSpinning || reviews.length < 2) return;

    const targetIndex = (() => {
      const randomIndex = Math.floor(Math.random() * reviews.length);
      return randomIndex === activeIndex ? (randomIndex + 1) % reviews.length : randomIndex;
    })();
    const forwardDistance = wrapIndex(targetIndex - activeIndex, reviews.length);
    const totalSteps = reviews.length + forwardDistance;
    let step = 0;

    setIsSpinning(true);
    setIsPaused(true);

    function advance() {
      step += 1;
      setActiveIndex((index) => (index + 1) % reviews.length);

      if (step >= totalSteps) {
        setIsSpinning(false);
        setIsPaused(false);
        spinTimerRef.current = null;
        return;
      }

      const progress = step / totalSteps;
      const delay = 38 + progress * progress * 185;
      spinTimerRef.current = window.setTimeout(advance, delay);
    }

    spinTimerRef.current = window.setTimeout(advance, 38);
  }

  const visibleReviews = reelPositions.map(({ offset, position }) => {
    const index = wrapIndex(activeIndex + offset, reviews.length);
    return {
      review: reviews[index],
      position,
      index
    };
  });

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

      <div className={`student-review-carousel ${isSpinning ? "is-spinning" : ""}`} aria-live="polite">
        <div className="student-review-stage">
          {visibleReviews.map(({ review, position, index }) => (
            <article
              aria-hidden={position !== "active"}
              className={`student-review-card is-${position}`}
              key={`${review.courseNumber}-${review.semester}-${index}`}
              style={{ "--review-index": index }}
            >
              <blockquote>
                <div className="review-quote">
                  <p>{review.review}</p>
                </div>
                <footer>
                  <strong>{review.courseNumber}: {review.courseName}</strong>
                  <span>{review.semester}</span>
                  <span>{review.university}</span>
                </footer>
              </blockquote>
            </article>
          ))}
        </div>

        <div className="student-review-controls" aria-label="Student review controls">
          <button className="review-arrow previous" onClick={controls.previous} type="button" aria-label="Previous student review">
            <span aria-hidden="true">←</span>
          </button>
          <div className="review-dots" aria-label={`Review ${activeIndex + 1} of ${reviews.length}`}>
            {reviews.map((review, index) => (
              <button
                aria-label={`Show review ${index + 1}`}
                className={index === activeIndex ? "is-active" : ""}
                key={`${review.courseNumber}-${review.semester}-${index}`}
                onClick={() => {
                  if (!isSpinning) setActiveIndex(index);
                }}
                type="button"
              />
            ))}
          </div>
          <button className="review-arrow next" onClick={controls.next} type="button" aria-label="Next student review">
            <span aria-hidden="true">→</span>
          </button>
          <button className="review-spin-button" disabled={isSpinning} onClick={spinReel} type="button">
            {isSpinning ? "Spinning" : "Spin"}
          </button>
        </div>
      </div>
    </section>
  );
}
