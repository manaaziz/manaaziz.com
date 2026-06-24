"use client";

import dynamic from "next/dynamic";

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

const GlobalExperienceMap = dynamic(() => import("./about/GlobalExperienceMap"), {
  ssr: false,
  loading: GlobalExperiencePlaceholder
});

export default function HomeGlobalExperience() {
  return <GlobalExperienceMap />;
}
