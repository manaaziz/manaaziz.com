"use client";

import { useMemo, useRef, useState } from "react";

const topics = [
  { id: "machine-learning", label: "machine learning", x: 50, y: 44, size: "large" },
  { id: "gambling", label: "gambling", x: 28, y: 34, size: "large" },
  { id: "hospitality", label: "hospitality", x: 72, y: 34, size: "large" },
  { id: "gaming", label: "gaming analytics", x: 18, y: 52, size: "medium" },
  { id: "forecasting", label: "forecasting", x: 72, y: 58, size: "medium" },
  { id: "revenue", label: "revenue management", x: 54, y: 70, size: "medium" },
  { id: "interpretable", label: "interpretable AI", x: 34, y: 62, size: "small" },
  { id: "measurement", label: "measurement", x: 20, y: 72, size: "small" },
  { id: "cancellations", label: "booking cancellations", x: 84, y: 44, size: "small" },
  { id: "demand", label: "hotel demand", x: 82, y: 76, size: "small" },
  { id: "statistics", label: "statistics", x: 46, y: 22, size: "small" },
  { id: "responsible", label: "responsible gambling", x: 14, y: 24, size: "small" }
];

const links = [
  ["machine-learning", "gaming"],
  ["machine-learning", "hospitality"],
  ["machine-learning", "forecasting"],
  ["machine-learning", "interpretable"],
  ["machine-learning", "cancellations"],
  ["machine-learning", "gambling"],
  ["gaming", "gambling"],
  ["gaming", "responsible"],
  ["gaming", "measurement"],
  ["hospitality", "revenue"],
  ["hospitality", "forecasting"],
  ["forecasting", "demand"],
  ["revenue", "demand"],
  ["statistics", "measurement"],
  ["statistics", "machine-learning"]
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function ResearchWordGraph() {
  const graphRef = useRef(null);
  const [positions, setPositions] = useState(() => (
    Object.fromEntries(topics.map((topic) => [topic.id, { x: topic.x, y: topic.y }]))
  ));
  const [draggingId, setDraggingId] = useState(null);

  const topicMap = useMemo(() => (
    Object.fromEntries(topics.map((topic) => [topic.id, topic]))
  ), []);

  function moveTopic(event, id) {
    const bounds = graphRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setPositions((current) => ({
      ...current,
      [id]: {
        x: clamp(x, 8, 92),
        y: clamp(y, 12, 88)
      }
    }));
  }

  return (
    <section className="research-word-graph-section" aria-labelledby="research-word-graph-title">
      <div className="section-intro">
        <p className="eyebrow">Research map</p>
        <h2 id="research-word-graph-title">Drag the ideas around</h2>
      </div>

      <div className="research-word-graph" ref={graphRef}>
        <svg aria-hidden="true" className="research-word-graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          {links.map(([sourceId, targetId]) => {
            const source = positions[sourceId];
            const target = positions[targetId];

            return (
              <line
                key={`${sourceId}-${targetId}`}
                x1={source.x}
                x2={target.x}
                y1={source.y}
                y2={target.y}
              />
            );
          })}
        </svg>

        {topics.map((topic) => {
          const position = positions[topic.id];

          return (
            <button
              className={`research-word-node ${topic.size}`}
              key={topic.id}
              onPointerCancel={() => setDraggingId(null)}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                setDraggingId(topic.id);
                moveTopic(event, topic.id);
              }}
              onPointerMove={(event) => {
                if (draggingId === topic.id) {
                  moveTopic(event, topic.id);
                }
              }}
              onPointerUp={(event) => {
                event.currentTarget.releasePointerCapture(event.pointerId);
                setDraggingId(null);
              }}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              type="button"
            >
              {topicMap[topic.id].label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
