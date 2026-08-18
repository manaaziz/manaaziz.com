"use client";

import Scrollytelling, { spainRecapStory } from "@/components/scrollytelling";
import AnimatedFlag from "@/components/animated_flag";

function starPoints(cx, cy, outer = 8, inner = 3.3) {
  return Array.from({ length: 10 }, (_, index) => {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + index * Math.PI / 5;
    return `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`;
  }).join(" ");
}

function RegionalFlagArt({ city }) {
  if (city === "Madrid") {
    return (
      <>
        <rect width="120" height="80" fill="#c60b2e" />
        {[22, 47, 72, 97].map((cx) => <polygon fill="#fff" key={`top-${cx}`} points={starPoints(cx, 28)} />)}
        {[34.5, 59.5, 84.5].map((cx) => <polygon fill="#fff" key={`bottom-${cx}`} points={starPoints(cx, 51)} />)}
      </>
    );
  }

  if (city === "Valencia") {
    return (
      <>
        <rect width="120" height="80" fill="#ffd600" />
        {[8, 24, 40, 56, 72].map((y) => <rect fill="#da121a" height="8" key={y} width="90" x="30" y={y} />)}
        <rect width="30" height="80" fill="#0878bd" />
        <path d="M5 4 C19 12 7 19 24 25 C9 30 21 39 5 46 C19 53 7 61 24 77" fill="none" stroke="#ffd600" strokeWidth="5" />
        {[12, 36, 60].map((y) => <circle cx="20" cy={y} fill="#ffd600" key={y} r="4" />)}
      </>
    );
  }

  return (
    <>
      <rect width="120" height="80" fill="#ffd800" />
      {[9, 27, 45, 63].map((y) => <rect fill="#da121a" height="9" key={y} width="120" y={y} />)}
    </>
  );
}

function SpainRecapHeading(stop) {
  const region = stop.city === "Barcelona" ? "Catalonia" : stop.city;
  return (
    <h2 className="spain-scroll-heading">
      <AnimatedFlag className="spain-region-flag" label={region}>
        <RegionalFlagArt city={stop.city} />
      </AnimatedFlag>
      <span>{stop.title || `${stop.city}: ${stop.day}`}</span>
    </h2>
  );
}

export default function SpainRecapScrolly() {
  return <Scrollytelling className="spain-recap-scrolly" renderHeading={SpainRecapHeading} story={spainRecapStory} />;
}
