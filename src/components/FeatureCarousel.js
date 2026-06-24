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

const reelPositionsByCount = {
  1: [{ offset: 0, position: "active" }],
  2: [
    { offset: 0, position: "active" },
    { offset: 1, position: "next" }
  ],
  3: [
    { offset: -1, position: "previous" },
    { offset: 0, position: "active" },
    { offset: 1, position: "next" }
  ],
  4: [
    { offset: -1, position: "previous" },
    { offset: 0, position: "active" },
    { offset: 1, position: "next" },
    { offset: 2, position: "far-next" }
  ]
};

function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

function getSpinDelay(step, totalSteps) {
  const progress = step / totalSteps;
  return 74 + Math.pow(progress, 2.35) * 230;
}

function QuoteCard({ item }) {
  return (
    <blockquote>
      <div className="review-quote">
        <p>{item.review}</p>
      </div>
      <footer>
        <strong>{item.courseNumber}: {item.courseName}</strong>
        <span>{item.semester}</span>
        <span>{item.university}</span>
      </footer>
    </blockquote>
  );
}

function BlogPreviewCard({ item }) {
  const image = item.image || item.previewImage || item.cover || item.seriesCover;
  const topic = item.topic || item.seriesTitle || "The Manalogue";
  const dateLabel = item.dateLabel || item.date;

  return (
    <Link className="feature-blog-card-link" href={item.href}>
      <figure className="feature-blog-image">
        {image ? (
          <img src={image} alt={item.imageAlt || ""} loading="lazy" decoding="async" />
        ) : (
          <span>{topic}</span>
        )}
      </figure>
      <div className="feature-blog-body">
        <div className="feature-blog-meta">
          <span>{topic}</span>
          {dateLabel ? <time>{dateLabel}</time> : null}
        </div>
        <h3>{item.title}</h3>
        <p>{item.excerpt || item.body}</p>
        <strong>{item.label || "Read post"}</strong>
      </div>
    </Link>
  );
}

const tileContentByVariant = {
  blog: BlogPreviewCard,
  quote: QuoteCard
};

export default function FeatureCarousel({
  ariaLabel = "Carousel controls",
  cardClassName = "",
  carouselClassName = "",
  eyebrow,
  filterTag,
  items,
  sectionClassName = "",
  stageClassName = "",
  title,
  variant = "quote"
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [chipFlips, setChipFlips] = useState({ previous: 0, next: 0 });
  const spinTimerRef = useRef(null);

  const filteredItems = useMemo(() => {
    if (!filterTag) return items;

    const filterKey = filterTag.toLowerCase();
    return items.filter((item) => {
      const tags = item.tags || [];
      return tags.some((tag) => tag.toLowerCase() === filterKey);
    });
  }, [filterTag, items]);

  const itemCount = filteredItems.length;
  const controls = useMemo(() => ({
    next() {
      setActiveIndex((index) => (index + 1) % itemCount);
    },
    previous() {
      setActiveIndex((index) => (index - 1 + itemCount) % itemCount);
    }
  }), [itemCount]);

  useEffect(() => {
    setActiveIndex((index) => (itemCount ? Math.min(index, itemCount - 1) : 0));
  }, [itemCount]);

  useEffect(() => {
    if (isPaused || isSpinning || itemCount < 2) return undefined;

    const timer = window.setInterval(controls.next, 6500);
    return () => window.clearInterval(timer);
  }, [controls, isPaused, isSpinning, itemCount]);

  useEffect(() => () => {
    if (spinTimerRef.current) {
      window.clearTimeout(spinTimerRef.current);
    }
  }, []);

  if (!itemCount) return null;
  const TileContent = tileContentByVariant[variant] || tileContentByVariant.quote;

  function spinReel() {
    if (isSpinning || itemCount < 2) return;

    const targetIndex = (() => {
      const randomIndex = Math.floor(Math.random() * itemCount);
      return randomIndex === activeIndex ? (randomIndex + 1) % itemCount : randomIndex;
    })();
    const forwardDistance = wrapIndex(targetIndex - activeIndex, itemCount) || itemCount;
    const totalSteps = itemCount * 2 + forwardDistance;
    let step = 0;

    setIsSpinning(true);
    setIsPaused(true);

    function advance() {
      step += 1;
      setActiveIndex((index) => (index + 1) % itemCount);

      if (step >= totalSteps) {
        setIsSpinning(false);
        setIsPaused(false);
        spinTimerRef.current = null;
        return;
      }

      spinTimerRef.current = window.setTimeout(advance, getSpinDelay(step, totalSteps));
    }

    spinTimerRef.current = window.setTimeout(advance, 74);
  }

  function moveItem(direction) {
    if (isSpinning) return;

    setChipFlips((current) => ({
      ...current,
      [direction]: current[direction] + 1
    }));
    controls[direction]();
  }

  const visibleReelPositions = reelPositionsByCount[itemCount] || reelPositions;
  const visibleItems = visibleReelPositions.map(({ offset, position }) => {
    const index = wrapIndex(activeIndex + offset, itemCount);
    return {
      item: filteredItems[index],
      position,
      index
    };
  });

  return (
    <section
      className={`student-review-section feature-carousel-section feature-carousel-${variant} ${sectionClassName}`.trim()}
      onBlur={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {(eyebrow || title) ? (
        <div className="section-intro">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title ? <h2>{title}</h2> : null}
        </div>
      ) : null}

      <div className={`student-review-carousel feature-carousel ${carouselClassName} ${isSpinning ? "is-spinning" : ""}`.trim()} aria-live="polite">
        <div className={`student-review-stage feature-carousel-stage ${stageClassName}`.trim()}>
          {visibleItems.map(({ item, position, index }) => {
            const itemKey = `${item.href || item.courseNumber || item.title}-${index}`;

            return (
              <article
                aria-hidden={position !== "active"}
                className={`student-review-card feature-carousel-card feature-carousel-card-${variant} ${cardClassName} is-${position}`.trim()}
                key={itemKey}
                style={{ "--review-index": index }}
              >
                <TileContent item={item} />
              </article>
            );
          })}
        </div>

        <div className="student-review-controls" aria-label={ariaLabel}>
          <button
            className="review-arrow casino-chip previous"
            data-flips={chipFlips.previous}
            key={`carousel-previous-${chipFlips.previous}`}
            onClick={() => moveItem("previous")}
            type="button"
            aria-label="Previous item"
          >
            <img className="casino-chip-face" src="/assets/images/black_casino_chip.png" alt="" aria-hidden="true" />
            <span aria-hidden="true">←</span>
          </button>
          <div className="review-dots" aria-label={`Item ${activeIndex + 1} of ${itemCount}`}>
            {filteredItems.map((item, index) => (
              <button
                aria-label={`Show item ${index + 1}`}
                className={index === activeIndex ? "is-active" : ""}
                key={`${item.href || item.courseNumber || item.title}-${index}`}
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
            key={`carousel-next-${chipFlips.next}`}
            onClick={() => moveItem("next")}
            type="button"
            aria-label="Next item"
          >
            <img className="casino-chip-face" src="/assets/images/black_casino_chip.png" alt="" aria-hidden="true" />
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
