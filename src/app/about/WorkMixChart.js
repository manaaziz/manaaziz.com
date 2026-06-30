"use client";

import Link from "next/link";
import { useState } from "react";

const defaultWorkMix = [
  {
    id: "consulting",
    label: "Consulting",
    value: 70,
    href: "/consulting",
    calloutSide: "right",
    title: "Helping companies leverage data and AI",
    body: "Marketing personalization, surveillance analytics, operational optimization, patron lifecycle modeling, churn prediction, offer sensitivity, and real-time AI-driven loss offers."
  },
  {
    id: "research",
    label: "Research",
    value: 20,
    href: "/research",
    calloutSide: "left",
    title: "Data-driven, industry-relevant research",
    body: "Predictive modeling, machine learning, revenue management, gaming analytics, and demand forecasting."
  },
  {
    id: "teaching",
    label: "Teaching",
    value: 10,
    href: "/teaching",
    calloutSide: "left",
    title: "Educating and empowering young minds",
    body: "Statistics, entrepreneurship, mathematics, hospitality, R, forecasting, and applied data analysis."
  }
];

export default function WorkMixChart({ id, items = defaultWorkMix }) {
  const workMix = defaultWorkMix.map((item) => ({
    ...item,
    ...(items.find((override) => override.id === item.id || override.href === item.href) || {})
  }));
  const [activeId, setActiveId] = useState("consulting");
  const [isComparing, setIsComparing] = useState(false);
  const active = workMix.find((item) => item.id === activeId) || workMix[0];
  const cardById = new Map(workMix.map((item) => [item.id, item]));
  const leftCards = ["teaching", "research"].map((itemId) => cardById.get(itemId)).filter(Boolean);
  const rightCards = ["consulting"].map((itemId) => cardById.get(itemId)).filter(Boolean);

  function activateItem(itemId) {
    setActiveId(itemId);
    setIsComparing(true);
  }

  function resetWorkMix() {
    setActiveId("consulting");
    setIsComparing(false);
  }

  function handleWrapBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      resetWorkMix();
    }
  }

  function renderCard(item) {
    return (
      <article
        className={`work-mix-card ${item.id}`}
        data-active={isComparing && activeId === item.id ? "true" : "false"}
        data-muted={isComparing && activeId !== item.id ? "true" : "false"}
        key={item.id}
        onFocus={() => activateItem(item.id)}
        onMouseEnter={() => activateItem(item.id)}
      >
        <span>{item.label}</span>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        <Link className="button" href={item.href}>
          Explore {item.label}
        </Link>
      </article>
    );
  }

  return (
    <section className="work-mix-section" id={id} aria-labelledby="work-mix-title">
      <div className="section-intro">
        <p className="eyebrow">Work mix</p>
        <h2 id="work-mix-title">I am a consultant with passion for research and teaching</h2>
      </div>

      <div className="work-mix-layout">
        <div
          className="work-pie-wrap"
          aria-label="Clickable work mix pie chart"
          data-comparing={isComparing ? "true" : "false"}
          onBlur={handleWrapBlur}
          onMouseLeave={resetWorkMix}
        >
          <div className="work-mix-card-stack work-mix-card-stack-left">
            {leftCards.map(renderCard)}
          </div>

          <div className="work-pie-node">
            <svg className="work-pie-chart" viewBox="0 0 42 42" role="img" aria-label="Consulting 70 percent, research 20 percent, teaching 10 percent">
              <circle className="work-pie-base" cx="21" cy="21" r="15.9155" />
              {workMix.map((item, index) => {
                const offset = workMix.slice(0, index).reduce((total, slice) => total + slice.value, 0);

                return (
                  <circle
                    className={`work-pie-slice ${item.id}`}
                    cx="21"
                    cy="21"
                    data-active={isComparing && activeId === item.id ? "true" : "false"}
                    key={item.id}
                    onClick={() => activateItem(item.id)}
                    onFocus={() => activateItem(item.id)}
                    onMouseEnter={() => activateItem(item.id)}
                    r="15.9155"
                    role="button"
                    strokeDasharray={`${item.value} ${100 - item.value}`}
                    strokeDashoffset={25 - offset}
                    tabIndex={0}
                  />
                );
              })}
            </svg>
            <div className="work-pie-center" aria-hidden="true">
              <strong>{active.value}%</strong>
              <span>{active.label}</span>
            </div>
          </div>

          <div className="work-mix-card-stack work-mix-card-stack-right">
            {rightCards.map(renderCard)}
          </div>
        </div>
      </div>
    </section>
  );
}
