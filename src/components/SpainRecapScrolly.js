"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const stops = [
  {
    city: "Madrid",
    date: "May 20-24, 2025",
    label: "Arrival and first reads",
    copy:
      "Draft space for the opening city: first meals, market walks, group rhythm, museums, and the first moments when the course started turning Spain into the classroom.",
    motif: "plaza"
  },
  {
    city: "Valencia",
    date: "May 25-28, 2025",
    label: "Paella, markets, and coast",
    copy:
      "Draft space for the middle of the trip: regional cuisine, paella, coastal pace, food identity, and the shift from watching the culture to participating in it.",
    motif: "paella"
  },
  {
    city: "Barcelona",
    date: "May 29-June 3, 2025",
    label: "Closing the course",
    copy:
      "Draft space for the final city: architecture, neighborhoods, final student observations, and the way the study-abroad class became a shared travel archive.",
    motif: "tiles"
  },
  {
    city: "Reflection",
    date: "After the trip",
    label: "What stayed with us",
    copy:
      "Draft space for the closing reflection: what students remembered, what the course made possible, and which details still feel worth writing down later.",
    motif: "notes"
  }
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function SpainRecapScrolly() {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const dotTop = useMemo(() => `${8 + progress * 84}%`, [progress]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    let frame;

    function update() {
      const rect = wrap.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const travel = Math.max(1, rect.height - viewport);
      const nextProgress = clamp((viewport * 0.18 - rect.top) / travel, 0, 1);
      const nextIndex = clamp(Math.floor(nextProgress * stops.length), 0, stops.length - 1);

      setProgress(nextProgress);
      setActiveIndex(nextIndex);
    }

    function requestUpdate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className="spain-scroll" ref={wrapRef} aria-label="Spain recap scrollytelling draft">
      <div className="spain-scroll-grid">
        <div className="spain-scroll-copy">
          <div className="spain-scroll-route" aria-hidden="true">
            <span className="spain-scroll-dot" style={{ top: dotTop }} />
          </div>
          {stops.map((stop, index) => (
            <article className={`spain-scroll-card${activeIndex === index ? " active" : ""}`} key={stop.city}>
              <header>
                <span>{stop.city}</span>
                <time>{stop.date}</time>
              </header>
              <h2>{stop.label}</h2>
              <p>{stop.copy}</p>
            </article>
          ))}
        </div>

        <div className="spain-scroll-visual-wrap" aria-hidden="true">
          <div className="spain-scroll-visual-stage">
            {stops.map((stop, index) => (
              <figure className={`spain-scroll-visual ${stop.motif}${activeIndex === index ? " active" : ""}`} key={stop.motif}>
                <div className="spain-scroll-placeholder">
                  <span>Photo placeholder</span>
                  <strong>{stop.city}</strong>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
