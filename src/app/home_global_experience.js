"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function GlobalExperiencePlaceholder() {
  return (
    <section className="global-experience global-experience-loading" aria-labelledby="global-experience-title">
      <div className="section-intro">
        <p className="eyebrow">Experience</p>
        <h2 id="global-experience-title">I bring a wide range of global experience</h2>
      </div>
      <div className="global-map-shell" data-mode="regions">
        <div className="world-map-panel global-map-placeholder" aria-hidden="true">
          <div />
        </div>
        <aside className="map-detail-card global-detail-placeholder" aria-hidden="true">
          <div />
          <div />
          <div />
        </aside>
      </div>
    </section>
  );
}

const GlobalExperienceMap = dynamic(() => import("./about/global_experience_map"), {
  ssr: false,
  loading: GlobalExperiencePlaceholder
});

export default function HomeGlobalExperience() {
  const boundaryRef = useRef(null);
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    const boundary = boundaryRef.current;
    if (!boundary || !("IntersectionObserver" in window)) {
      setIsNearby(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNearby(true);
        observer.disconnect();
      },
      { rootMargin: "700px 0px" }
    );

    observer.observe(boundary);
    return () => observer.disconnect();
  }, []);

  return <div ref={boundaryRef}>{isNearby ? <GlobalExperienceMap /> : <GlobalExperiencePlaceholder />}</div>;
}
