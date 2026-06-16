"use client";

import Link from "next/link";
import { useState } from "react";

const workMix = [
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
    value: 15,
    href: "/research",
    calloutSide: "left",
    title: "Data-driven, industry-relevant research",
    body: "Predictive modeling, machine learning, revenue management, gaming analytics, and demand forecasting."
  },
  {
    id: "teaching",
    label: "Teaching",
    value: 15,
    href: "/teaching",
    calloutSide: "left",
    title: "Educating and empowering young minds",
    body: "Statistics, entrepreneurship, mathematics, hospitality, R, forecasting, and applied data analysis."
  }
];

export default function WorkMixChart() {
  const [activeId, setActiveId] = useState("consulting");
  const active = workMix.find((item) => item.id === activeId) || workMix[0];

  return (
    <section className="work-mix-section" aria-labelledby="work-mix-title">
      <div className="section-intro">
        <p className="eyebrow">Work mix</p>
        <h2 id="work-mix-title">I am principally a consultant, but am passionate about research and teaching</h2>
      </div>

      <div className="work-mix-layout">
        <div className="work-pie-wrap" aria-label="Clickable work mix pie chart">
          <svg className="work-pie-chart" viewBox="0 0 42 42" role="img" aria-labelledby="work-pie-title">
            <title id="work-pie-title">Consulting 70 percent, research 15 percent, teaching 15 percent</title>
            <circle className="work-pie-base" cx="21" cy="21" r="15.9155" />
            {workMix.map((item, index) => {
              const offset = workMix.slice(0, index).reduce((total, slice) => total + slice.value, 0);

              return (
                <circle
                  className={`work-pie-slice ${item.id}`}
                  cx="21"
                  cy="21"
                  data-active={activeId === item.id ? "true" : "false"}
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
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

          <article className={`work-mix-card ${active.id} ${active.calloutSide}`} key={active.id}>
            <span>{active.label}</span>
            <h3>{active.title}</h3>
            <p>{active.body}</p>
            <Link className="button" href={active.href}>
              Explore {active.label}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
