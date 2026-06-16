"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const topics = [
  { id: "machine-learning", label: "machine learning", x: 50, y: 44, size: "large" },
  { id: "gambling", label: "gambling", x: 28, y: 34, size: "large" },
  { id: "hospitality", label: "hospitality", x: 72, y: 34, size: "large" },
  { id: "gaming", label: "gaming analytics", x: 18, y: 52, size: "medium" },
  { id: "forecasting", label: "forecasting", x: 72, y: 58, size: "medium" },
  { id: "revenue", label: "revenue management", x: 54, y: 70, size: "medium" },
  { id: "open-banking", label: "open banking", x: 12, y: 42, size: "medium" },
  { id: "interpretable", label: "interpretable AI", x: 34, y: 62, size: "small" },
  { id: "measurement", label: "measurement invariance", x: 20, y: 72, size: "small" },
  { id: "cancellations", label: "booking cancellations", x: 84, y: 44, size: "small" },
  { id: "demand", label: "hotel demand", x: 82, y: 76, size: "small" },
  { id: "statistics", label: "statistics", x: 46, y: 22, size: "small" },
  { id: "responsible", label: "responsible gambling", x: 14, y: 24, size: "small" },
  { id: "hotel-upselling", label: "hotel upselling", x: 88, y: 60, size: "small" },
  { id: "open-science", label: "open science", x: 58, y: 84, size: "small" },
  { id: "baccarat", label: "baccarat", x: 34, y: 48, size: "small" },
  { id: "dual-pathology", label: "dual pathology", x: 10, y: 62, size: "small" },
  { id: "behavioral-clusters", label: "behavioral clusters", x: 38, y: 78, size: "small" },
  { id: "operations-research", label: "operations research", x: 64, y: 48, size: "small" },
  { id: "casino-management", label: "casino management", x: 24, y: 44, size: "small" },
  { id: "marketing-analytics", label: "marketing analytics", x: 42, y: 30, size: "small" },
  { id: "reinvestment", label: "reinvestment efficiency", x: 58, y: 30, size: "small" },
  { id: "surveillance", label: "surveillance", x: 18, y: 14, size: "small" },
  { id: "behavioral-analysis", label: "behavioral analysis", x: 28, y: 84, size: "small" },
  { id: "problem-gambling", label: "problem gambling", x: 9, y: 34, size: "small" },
  { id: "gambling-disorder", label: "gambling disorder", x: 11, y: 76, size: "small" },
  { id: "risk-thresholds", label: "financial risk thresholds", x: 22, y: 86, size: "small" },
  { id: "payments", label: "gambling payments", x: 12, y: 52, size: "small" },
  { id: "patron-lifecycle", label: "patron lifecycle", x: 48, y: 14, size: "small" },
  { id: "hotel-occupancy", label: "hotel occupancy", x: 86, y: 28, size: "small" },
  { id: "service-technology", label: "AI service technology", x: 88, y: 70, size: "small" },
  { id: "revenue-forecasting", label: "revenue forecasting", x: 70, y: 84, size: "small" }
];

const links = [
  ["machine-learning", "gaming"],
  ["machine-learning", "hospitality"],
  ["machine-learning", "forecasting"],
  ["machine-learning", "interpretable"],
  ["machine-learning", "cancellations"],
  ["machine-learning", "gambling"],
  ["machine-learning", "open-banking"],
  ["machine-learning", "dual-pathology"],
  ["gaming", "gambling"],
  ["gaming", "responsible"],
  ["gaming", "measurement"],
  ["gaming", "baccarat"],
  ["gaming", "behavioral-clusters"],
  ["hospitality", "revenue"],
  ["hospitality", "forecasting"],
  ["hospitality", "hotel-upselling"],
  ["hospitality", "open-science"],
  ["forecasting", "demand"],
  ["revenue", "demand"],
  ["statistics", "measurement"],
  ["statistics", "machine-learning"],
  ["machine-learning", "operations-research"],
  ["machine-learning", "surveillance"],
  ["machine-learning", "behavioral-analysis"],
  ["machine-learning", "service-technology"],
  ["gambling", "casino-management"],
  ["gambling", "problem-gambling"],
  ["gambling", "gambling-disorder"],
  ["gambling", "payments"],
  ["gambling", "baccarat"],
  ["open-banking", "risk-thresholds"],
  ["open-banking", "payments"],
  ["responsible", "problem-gambling"],
  ["dual-pathology", "gambling-disorder"],
  ["behavioral-clusters", "behavioral-analysis"],
  ["hospitality", "casino-management"],
  ["hospitality", "operations-research"],
  ["hospitality", "hotel-occupancy"],
  ["hospitality", "service-technology"],
  ["revenue", "revenue-forecasting"],
  ["revenue", "reinvestment"],
  ["forecasting", "hotel-occupancy"],
  ["forecasting", "revenue-forecasting"],
  ["gaming", "marketing-analytics"],
  ["marketing-analytics", "reinvestment"],
  ["marketing-analytics", "patron-lifecycle"]
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function ResearchWordGraph() {
  const graphRef = useRef(null);
  const draggingIdRef = useRef(null);
  const frameRef = useRef(null);
  const lastPointerRef = useRef(null);
  const velocitiesRef = useRef(Object.fromEntries(topics.map((topic) => [topic.id, { vx: 0, vy: 0 }])));
  const [positions, setPositions] = useState(() => (
    Object.fromEntries(topics.map((topic) => [topic.id, { x: topic.x, y: topic.y }]))
  ));
  const [draggingId, setDraggingId] = useState(null);

  const topicMap = useMemo(() => (
    Object.fromEntries(topics.map((topic) => [topic.id, topic]))
  ), []);

  useEffect(() => () => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }
  }, []);

  function addVelocity(id, vx, vy) {
    const velocity = velocitiesRef.current[id] || { vx: 0, vy: 0 };
    velocitiesRef.current[id] = {
      vx: clamp(velocity.vx + vx, -1.8, 1.8),
      vy: clamp(velocity.vy + vy, -1.8, 1.8)
    };
  }

  function hasGlideVelocity() {
    return topics.some((topic) => {
      const velocity = velocitiesRef.current[topic.id] || { vx: 0, vy: 0 };
      return Math.hypot(velocity.vx, velocity.vy) > 0.015;
    });
  }

  function startGlide() {
    if (frameRef.current) return;

    function tick() {
      frameRef.current = null;

      setPositions((current) => {
        const next = { ...current };

        topics.forEach((topic) => {
          if (topic.id === draggingIdRef.current) return;

          const velocity = velocitiesRef.current[topic.id] || { vx: 0, vy: 0 };
          let x = current[topic.id].x + velocity.vx;
          let y = current[topic.id].y + velocity.vy;

          if (x <= 8 || x >= 92) {
            x = clamp(x, 8, 92);
            velocity.vx *= -0.7;
          }

          if (y <= 12 || y >= 88) {
            y = clamp(y, 12, 88);
            velocity.vy *= -0.7;
          }

          velocity.vx = velocity.vx * 0.965 + (topic.x - x) * 0.0009;
          velocity.vy = velocity.vy * 0.965 + (topic.y - y) * 0.0009;

          if (Math.hypot(velocity.vx, velocity.vy) < 0.015) {
            velocity.vx = 0;
            velocity.vy = 0;
          }

          velocitiesRef.current[topic.id] = velocity;
          next[topic.id] = { x, y };
        });

        return next;
      });

      if (hasGlideVelocity()) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    }

    frameRef.current = window.requestAnimationFrame(tick);
  }

  function releaseRepel(current, id) {
    const droppedPosition = current[id];
    if (!droppedPosition) return current;

    const releaseRadius = 22;
    const collisionRadius = 7.5;
    const maxPush = 3.2;
    const next = { ...current };
    const droppedVelocity = velocitiesRef.current[id] || { vx: 0, vy: 0 };

    topics.forEach((topic) => {
      if (topic.id === id) return;

      const position = current[topic.id];
      const dx = position.x - droppedPosition.x;
      const dy = position.y - droppedPosition.y;
      const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);

      if (distance > releaseRadius) return;

      const proximity = (releaseRadius - distance) / releaseRadius;
      const pulse = proximity * proximity * maxPush;
      const collisionPulse = distance < collisionRadius ? (collisionRadius - distance) * 0.42 : 0;
      const push = pulse + collisionPulse;
      const originPull = {
        x: (topic.x - position.x) * 0.004,
        y: (topic.y - position.y) * 0.004
      };

      next[topic.id] = {
        x: clamp(position.x + (dx / distance) * push * 0.45 + originPull.x, 8, 92),
        y: clamp(position.y + (dy / distance) * push * 0.45 + originPull.y, 12, 88)
      };
      addVelocity(
        topic.id,
        (dx / distance) * push * 0.08 + droppedVelocity.vx * proximity * 0.16,
        (dy / distance) * push * 0.08 + droppedVelocity.vy * proximity * 0.16
      );
    });

    return next;
  }

  function settleAfterRelease(id) {
    window.setTimeout(() => {
      setPositions((current) => {
        const next = { ...current };

        topics.forEach((topic) => {
          if (topic.id === id) return;

          const position = current[topic.id];
          next[topic.id] = {
            x: clamp(position.x + (topic.x - position.x) * 0.012, 8, 92),
            y: clamp(position.y + (topic.y - position.y) * 0.012, 12, 88)
          };
        });

        return next;
      });
      startGlide();
    }, 140);
  }

  function repelNearbyNodes(current, id, nextPosition, dragVector) {
    const previousDrag = current[id] || nextPosition;
    const dragSpeed = Math.min(Math.sqrt(dragVector.x * dragVector.x + dragVector.y * dragVector.y), 8);
    const nudgeRadius = 20;
    const collisionRadius = 7.25;
    const maxNudge = 1.15 + dragSpeed * 0.09;
    const next = {
      ...current,
      [id]: nextPosition
    };

    topics.forEach((topic) => {
      if (topic.id === id) return;

      const position = current[topic.id];
      const dx = position.x - nextPosition.x;
      const dy = position.y - nextPosition.y;
      const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);

      if (distance > nudgeRadius) return;

      const proximity = (nudgeRadius - distance) / nudgeRadius;
      const softNudge = proximity * proximity * maxNudge;
      const collisionTap = distance < collisionRadius ? (collisionRadius - distance) * 0.36 : 0;
      const movingWake = dragSpeed > 0.15 ? proximity * dragSpeed * 0.08 : 0;
      const push = softNudge + collisionTap;
      next[topic.id] = {
        x: clamp(position.x + (dx / distance) * (push + movingWake) * 0.55, 8, 92),
        y: clamp(position.y + (dy / distance) * (push + movingWake) * 0.55, 12, 88)
      };
      addVelocity(topic.id, (dx / distance) * push * 0.035, (dy / distance) * push * 0.035);
    });

    return next;
  }

  function moveTopic(event, id) {
    const bounds = graphRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const now = performance.now();
    const lastPointer = lastPointerRef.current;
    const dragVector = lastPointer && lastPointer.id === id
      ? {
        x: (x - lastPointer.x) / Math.max((now - lastPointer.time) / 16.67, 0.6),
        y: (y - lastPointer.y) / Math.max((now - lastPointer.time) / 16.67, 0.6)
      }
      : { x: 0, y: 0 };

    lastPointerRef.current = { id, time: now, x, y };
    velocitiesRef.current[id] = {
      vx: clamp(dragVector.x * 0.8, -2.1, 2.1),
      vy: clamp(dragVector.y * 0.8, -2.1, 2.1)
    };

    setPositions((current) => repelNearbyNodes(current, id, {
      x: clamp(x, 8, 92),
      y: clamp(y, 12, 88)
    }, dragVector));
  }

  function endDrag(id) {
    if (draggingIdRef.current !== id) return;

    draggingIdRef.current = null;
    setDraggingId(null);
    lastPointerRef.current = null;
    setPositions((current) => releaseRepel(current, id));
    settleAfterRelease(id);
    startGlide();
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
              data-dragging={draggingId === topic.id ? "true" : "false"}
              key={topic.id}
              onPointerCancel={() => endDrag(topic.id)}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                draggingIdRef.current = topic.id;
                setDraggingId(topic.id);
                moveTopic(event, topic.id);
              }}
              onLostPointerCapture={() => {
                if (draggingIdRef.current === topic.id) {
                  endDrag(topic.id);
                }
              }}
              onPointerMove={(event) => {
                if (draggingIdRef.current === topic.id) {
                  moveTopic(event, topic.id);
                }
              }}
              onPointerUp={(event) => {
                event.currentTarget.releasePointerCapture(event.pointerId);
                endDrag(topic.id);
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
