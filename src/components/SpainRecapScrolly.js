"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const stops = [
  {
    city: "Madrid",
    date: "May 20, 2025",
    day: "Day 1",
    label: "Arrival and welcome dinner",
    copy:
      "Transfer to accommodations, receive the Madrid Metro Pass, and gather for the welcome dinner. Placeholder for the first arrival impressions, first meal, and early group rhythm.",
    motif: "plaza"
  },
  {
    city: "Madrid",
    date: "May 21, 2025",
    day: "Day 2",
    label: "Orientation and city tour",
    copy:
      "Local orientation, neighborhood walk, guided Habsburg Madrid tour, and group lunch. Placeholder for notes on place, history, and the city becoming the classroom.",
    motif: "plaza"
  },
  {
    city: "Madrid",
    date: "May 22, 2025",
    day: "Day 3",
    label: "Free day or university activity",
    copy:
      "Independent exploration or a university-sourced activity in Madrid. Placeholder for whatever felt worth remembering: museums, meals, walks, and student observations.",
    motif: "notes"
  },
  {
    city: "Madrid",
    date: "May 23, 2025",
    day: "Day 4",
    label: "Class meeting and vineyard visit",
    copy:
      "Faculty-led class meeting followed by a guided vineyard and wine tasting outside Madrid. Placeholder for wine, region, hospitality, and how tasting became a learning method.",
    motif: "plaza"
  },
  {
    city: "Madrid",
    date: "May 24, 2025",
    day: "Day 5",
    label: "Royal Palace",
    copy:
      "Guided visit to the Royal Palace of Madrid with free time afterward. Placeholder for architecture, monarchy, ritual, and the connection between spectacle and culture.",
    motif: "tiles"
  },
  {
    city: "Valencia",
    date: "May 25, 2025",
    day: "Day 1",
    label: "Train to Valencia and class",
    copy:
      "Travel by train to Valencia, receive a transit pass, check in, and meet for class. Placeholder for the shift in pace, scenery, and regional identity.",
    motif: "tiles"
  },
  {
    city: "Valencia",
    date: "May 26, 2025",
    day: "Day 2",
    label: "Class and city tour",
    copy:
      "Faculty-led class meeting followed by a guided walk through Valencia's old quarter and central market area. Placeholder for markets, city texture, and local foodways.",
    motif: "tiles"
  },
  {
    city: "Valencia",
    date: "May 27, 2025",
    day: "Day 3",
    label: "Paella cooking class",
    copy:
      "Farm-to-table paella cooking class and group lunch at Barraca de Toni Montoliu. Placeholder for cooking, rice, shared meals, and the way food turns strangers into a table.",
    motif: "paella"
  },
  {
    city: "Valencia",
    date: "May 28, 2025",
    day: "Day 4",
    label: "Free day or university activity",
    copy:
      "Independent exploration or a university-sourced activity in Valencia. Placeholder for free-day wandering, small discoveries, and the moments that did not fit the official itinerary.",
    motif: "notes"
  },
  {
    city: "Barcelona",
    date: "May 29, 2025",
    day: "Day 1",
    label: "Travel to Barcelona",
    copy:
      "Coach transfer to Barcelona with a cheese and wine tour stop, then hotel check-in. Placeholder for the travel day, the food stop, and the transition into the final city.",
    motif: "tiles"
  },
  {
    city: "Barcelona",
    date: "May 30, 2025",
    day: "Day 2",
    label: "Gothic Quarter and Sagrada Familia",
    copy:
      "Faculty-led class meeting, Gothic Quarter tour, and guided visit to La Sagrada Familia. Placeholder for architecture, tourism, sacred space, and Barcelona's layered identity.",
    motif: "tiles"
  },
  {
    city: "Barcelona",
    date: "May 31, 2025",
    day: "Day 3",
    label: "Penedes wine region",
    copy:
      "Full-day visit to the Penedes wine region with free evening time in Barcelona. Placeholder for wine region notes, landscape, hospitality, and group reflections.",
    motif: "plaza"
  },
  {
    city: "Barcelona",
    date: "June 1, 2025",
    day: "Day 4",
    label: "La Boqueria market",
    copy:
      "Faculty-led class meeting followed by a guided La Boqueria market visit with tastings. Placeholder for market sensory details, crowds, ingredients, and food as public life.",
    motif: "paella"
  },
  {
    city: "Barcelona",
    date: "June 2, 2025",
    day: "Day 5",
    label: "Final class and farewell dinner",
    copy:
      "Final class meeting, reflection time, and group farewell dinner in Barcelona. Placeholder for the emotional wrap-up, what students noticed, and what the course left behind.",
    motif: "notes"
  },
  {
    city: "Barcelona",
    date: "June 3, 2025",
    day: "Day 6",
    label: "Program ends",
    copy:
      "Check out and transfer to the airport at the most common departure time. Placeholder for departures, final impressions, and the aftertaste of the trip.",
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
            <article className={`spain-scroll-card${activeIndex === index ? " active" : ""}`} key={`${stop.city}-${stop.date}`}>
              <header>
                <span>Spain 2025</span>
                <time>{stop.date}</time>
              </header>
              <h2>{stop.city}: {stop.day}</h2>
              <p><strong>{stop.label}.</strong> {stop.copy}</p>
            </article>
          ))}
        </div>

        <div className="spain-scroll-visual-wrap" aria-hidden="true">
          <div className="spain-scroll-visual-stage">
            {stops.map((stop, index) => (
              <figure className={`spain-scroll-visual ${stop.motif}${activeIndex === index ? " active" : ""}`} key={`${stop.motif}-${stop.date}`}>
                <div className="spain-scroll-placeholder">
                  <span>Photo placeholder</span>
                  <strong>{stop.city}</strong>
                  <small>{stop.day}</small>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
