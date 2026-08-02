"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const stops = [
  {
    city: "Madrid",
    date: "May 20, 2025",
    day: "Day 1",
    label: "\"Y nos fuimos pa Madriddddd\"",
    copy:
      "Nineteen students arrived in Madrid on May 20 with nerves, excitement, and a whole lot of jet lag. For many of them, it was their first time out of the country. Nobody knew it yet, but the new faces in new places would become lifelong friends, and even girlfriend/boyfriend stories.",
    motif: "plaza",
    image: "/assets/photos/fab333_madrid/fab_madrid_day1.webp"
  },
  {
    city: "Madrid",
    date: "May 21, 2025",
    day: "Day 2",
    label: "Madrizzzzz",
    copy:
      "We toured my favorite city in the world. I quickly realized how easy it was to transmit my knowledge and passion for Madrid and Spanish culture to the students, and how strongly they responded to that energy. We walked all through Madrid, checking out the coolest monuments: Plaza Mayor, Sol, Gran Via, Plaza de Espana, Mercado de San Miguel, and so much more.",
    motif: "plaza",
    image: "/assets/photos/fab333_madrid/fab_madrid_day2.webp"
  },
  {
    city: "Madrid",
    date: "May 22, 2025",
    day: "Day 3",
    label: "The family was forming!",
    copy:
      "Some students took a day trip to Segovia, which they found, planned, and managed all by themselves on just their third day. I could not believe the cool pictures they got while they were there. The students who stayed back in Madrid took advantage of the rich culture and art, checking out museums, gardens, and historical sites. Some even met up with me for an Iranian lunch.",
    motif: "notes",
    image: "/assets/photos/fab333_madrid/fab_madrid_day3.webp"
  },
  {
    city: "Madrid",
    date: "May 23, 2025",
    day: "Day 4",
    label: "¡Salud!",
    copy:
      "We ventured out of the city and did a special wine tasting at a local vineyard on the outskirts of Madrid. The students learned how wine is produced, tasted, paired with food, and enjoyed with others. The amazing food and drink, especially in a social setting, is such a core component of Spanish culture.",
    motif: "plaza",
    image: "/assets/photos/fab333_madrid/fab_madrid_day4.webp"
  },
  {
    city: "Madrid",
    date: "May 24, 2025",
    day: "Day 5",
    label: "\"Viva el rey, el orden, y la ley\"",
    copy:
      "We toured the Royal Palace of Madrid, where we learned about the Spanish monarchy and its long history. They had some really rare and expensive Stradivarius violins. After the tour, we went to tomar algo as a group, like typical Spaniards.",
    motif: "tiles",
    image: "/assets/photos/fab333_madrid/fab_madrid_day5.webp"
  },
  {
    city: "Valencia",
    date: "May 25, 2025",
    day: "Day 1",
    label: "Train to Valencia and class",
    copy:
      "Travel by train to Valencia, receive a transit pass, check in, and meet for class. Placeholder for the shift in pace, scenery, and regional identity.",
    motif: "tiles",
    image: "/assets/photos/fab333_madrid/fab_val_day1.webp"
  },
  {
    city: "Valencia",
    date: "May 26, 2025",
    day: "Day 2",
    label: "Class and city tour",
    copy:
      "Faculty-led class meeting followed by a guided walk through Valencia's old quarter and central market area. Placeholder for markets, city texture, and local foodways.",
    motif: "tiles",
    image: "/assets/photos/fab333_madrid/fab_val_day2.webp"
  },
  {
    city: "Valencia",
    date: "May 27, 2025",
    day: "Day 3",
    label: "Paella cooking class",
    copy:
      "Farm-to-table paella cooking class and group lunch at Barraca de Toni Montoliu. Placeholder for cooking, rice, shared meals, and the way food turns strangers into a table.",
    motif: "paella",
    image: "/assets/photos/fab333_madrid/fab_val_day3.webp"
  },
  {
    city: "Valencia",
    date: "May 28, 2025",
    day: "Day 4",
    label: "Free day or university activity",
    copy:
      "Independent exploration or a university-sourced activity in Valencia. Placeholder for free-day wandering, small discoveries, and the moments that did not fit the official itinerary.",
    motif: "notes",
    image: "/assets/photos/fab333_madrid/fab_val_day4.webp"
  },
  {
    city: "Barcelona",
    date: "May 29, 2025",
    day: "Day 1",
    label: "Travel to Barcelona",
    copy:
      "Coach transfer to Barcelona with a cheese and wine tour stop, then hotel check-in. Placeholder for the travel day, the food stop, and the transition into the final city.",
    motif: "tiles",
    image: "/assets/photos/fab333_madrid/fab_bcn_day1.webp"
  },
  {
    city: "Barcelona",
    date: "May 30, 2025",
    day: "Day 2",
    label: "Gothic Quarter and Sagrada Familia",
    copy:
      "Faculty-led class meeting, Gothic Quarter tour, and guided visit to La Sagrada Familia. Placeholder for architecture, tourism, sacred space, and Barcelona's layered identity.",
    motif: "tiles",
    image: "/assets/photos/fab333_madrid/fab_bcn_day2.webp"
  },
  {
    city: "Barcelona",
    date: "May 31, 2025",
    day: "Day 3",
    label: "Penedes wine region",
    copy:
      "Full-day visit to the Penedes wine region with free evening time in Barcelona. Placeholder for wine region notes, landscape, hospitality, and group reflections.",
    motif: "plaza",
    image: "/assets/photos/fab333_madrid/fab_bcn_day3.webp"
  },
  {
    city: "Barcelona",
    date: "June 1, 2025",
    day: "Day 4",
    label: "La Boqueria market",
    copy:
      "Faculty-led class meeting followed by a guided La Boqueria market visit with tastings. Placeholder for market sensory details, crowds, ingredients, and food as public life.",
    motif: "paella",
    image: "/assets/photos/fab333_madrid/fab_bcn_day4.webp"
  },
  {
    city: "Barcelona",
    date: "June 2, 2025",
    day: "Day 5",
    label: "Final class and farewell dinner",
    copy:
      "Final class meeting, reflection time, and group farewell dinner in Barcelona. Placeholder for the emotional wrap-up, what students noticed, and what the course left behind.",
    motif: "notes",
    image: "/assets/photos/fab333_madrid/fab_bcn_day5.webp"
  },
  {
    city: "Barcelona",
    date: "June 3, 2025",
    day: "Day 6",
    label: "Program ends",
    copy:
      "Check out and transfer to the airport at the most common departure time. Placeholder for departures, final impressions, and the aftertaste of the trip.",
    motif: "notes",
    image: "/assets/photos/fab333_madrid/fab_bcn_day6.webp"
  }
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getRoutePoints(index) {
  const direction = index % 2 === 0 ? 1 : -1;
  const side = direction > 0 ? 1 : -1;
  const variants = [
    [
      [60, 0],
      [60, 62],
      [102, 62],
      [102, 176],
      [60, 176],
      [60, 300]
    ],
    [
      [60, 0],
      [60, 78],
      [24, 78],
      [24, 138],
      [88, 138],
      [88, 214],
      [60, 214],
      [60, 300]
    ],
    [
      [60, 0],
      [60, 48],
      [98, 48],
      [98, 110],
      [36, 110],
      [36, 230],
      [60, 230],
      [60, 300]
    ],
    [
      [60, 0],
      [60, 92],
      [20, 92],
      [20, 184],
      [60, 184],
      [60, 300]
    ]
  ];
  const base = variants[index % variants.length];

  return base.map(([x, y]) => ({
    x: side === 1 ? x : 120 - x,
    y
  }));
}

function pointBetween(start, end, distanceFromStart) {
  const length = Math.hypot(end.x - start.x, end.y - start.y);
  const ratio = length === 0 ? 0 : distanceFromStart / length;

  return {
    x: start.x + (end.x - start.x) * ratio,
    y: start.y + (end.y - start.y) * ratio
  };
}

function quadraticPoint(start, control, end, t) {
  const inverse = 1 - t;

  return {
    x: inverse * inverse * start.x + 2 * inverse * t * control.x + t * t * end.x,
    y: inverse * inverse * start.y + 2 * inverse * t * control.y + t * t * end.y
  };
}

function getRoundedRoutePoints(index) {
  const points = getRoutePoints(index);
  const rounded = [points[0]];
  const radius = 13;

  for (let pointIndex = 1; pointIndex < points.length - 1; pointIndex += 1) {
    const previous = points[pointIndex - 1];
    const current = points[pointIndex];
    const next = points[pointIndex + 1];
    const previousLength = Math.hypot(current.x - previous.x, current.y - previous.y);
    const nextLength = Math.hypot(next.x - current.x, next.y - current.y);
    const cornerRadius = Math.min(radius, previousLength / 2, nextLength / 2);
    const curveStart = pointBetween(current, previous, cornerRadius);
    const curveEnd = pointBetween(current, next, cornerRadius);

    rounded.push(curveStart);

    for (let step = 1; step <= 12; step += 1) {
      rounded.push(quadraticPoint(curveStart, current, curveEnd, step / 12));
    }
  }

  rounded.push(points[points.length - 1]);
  return rounded;
}

function getRoutePath(index) {
  const points = getRoutePoints(index);
  const radius = 13;
  const commands = [`M${points[0].x} ${points[0].y}`];

  for (let pointIndex = 1; pointIndex < points.length - 1; pointIndex += 1) {
    const previous = points[pointIndex - 1];
    const current = points[pointIndex];
    const next = points[pointIndex + 1];
    const previousLength = Math.hypot(current.x - previous.x, current.y - previous.y);
    const nextLength = Math.hypot(next.x - current.x, next.y - current.y);
    const cornerRadius = Math.min(radius, previousLength / 2, nextLength / 2);
    const curveStart = pointBetween(current, previous, cornerRadius);
    const curveEnd = pointBetween(current, next, cornerRadius);

    commands.push(`L${curveStart.x} ${curveStart.y}`);
    commands.push(`Q${current.x} ${current.y} ${curveEnd.x} ${curveEnd.y}`);
  }

  const finalPoint = points[points.length - 1];
  commands.push(`L${finalPoint.x} ${finalPoint.y}`);
  return commands.join(" ");
}

function getLabelPunctuation(label) {
  return /[.!?]$/.test(label) ? "" : ".";
}

export default function SpainRecapScrolly() {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const segmentPosition = useMemo(() => {
    const scaled = progress * (stops.length - 1);
    const index = clamp(Math.floor(scaled), 0, stops.length - 2);
    return {
      index,
      progress: clamp(scaled - index, 0, 1)
    };
  }, [progress]);
  const dotPosition = useMemo(() => {
    const path = getRoundedRoutePoints(segmentPosition.index);
    const lengths = path.slice(1).map((point, index) => {
      const previous = path[index];
      return Math.hypot(point.x - previous.x, point.y - previous.y);
    });
    const totalLength = lengths.reduce((sum, length) => sum + length, 0);
    let remaining = segmentPosition.progress * totalLength;
    let x = path[0].x;
    let y = path[0].y;

    for (let index = 0; index < lengths.length; index += 1) {
      const length = lengths[index];
      const start = path[index];
      const end = path[index + 1];

      if (remaining <= length) {
        const ratio = length === 0 ? 0 : remaining / length;
        x = start.x + (end.x - start.x) * ratio;
        y = start.y + (end.y - start.y) * ratio;
        break;
      }

      remaining -= length;
      x = end.x;
      y = end.y;
    }

    return {
      x,
      y
    };
  }, [segmentPosition]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    let frame;

    function update() {
      const rect = wrap.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const travel = Math.max(1, rect.height - viewport);
      const nextProgress = clamp((viewport * 0.18 - rect.top) / travel, 0, 1);
      const nextIndex = clamp(Math.round(nextProgress * (stops.length - 1)), 0, stops.length - 1);

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
      <div className="spain-scroll-steps">
        {stops.map((stop, index) => (
          <div className={`spain-scroll-step${activeIndex === index ? " active" : ""}`} key={`${stop.city}-${stop.date}`}>
            <article className="spain-scroll-card">
              <header>
                <span>Spain 2025</span>
                <time>{stop.date}</time>
              </header>
              <h2>{stop.city}: {stop.day}</h2>
              <p><strong>{stop.label}{getLabelPunctuation(stop.label)}</strong> {stop.copy}</p>
            </article>

            <div
              aria-hidden="true"
              className={`spain-scroll-route bend-${index % 2 === 0 ? "right" : "left"}${segmentPosition.index === index ? " active" : ""}${index === stops.length - 1 ? " final" : ""}`}
            >
              {index < stops.length - 1 ? (
                <>
                  <svg className="spain-scroll-route-line" viewBox="0 0 120 300" preserveAspectRatio="none">
                    <path d={getRoutePath(index)} />
                    {segmentPosition.index === index ? (
                      <circle className="spain-scroll-dot-svg" cx={dotPosition.x} cy={dotPosition.y} r="4.3" />
                    ) : null}
                  </svg>
                  <span className="spain-scroll-start" />
                  <span className="spain-scroll-pin" />
                </>
              ) : (
                <span className="spain-scroll-pin" />
              )}
            </div>

            <figure className={`spain-scroll-visual ${stop.motif}`}>
              <img src={stop.image} alt="" loading={index < 2 ? "eager" : "lazy"} decoding="async" />
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
