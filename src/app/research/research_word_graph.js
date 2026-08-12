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
  { id: "table-games", label: "table games", x: 40, y: 40, size: "small" },
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
  { id: "revenue-forecasting", label: "revenue forecasting", x: 70, y: 84, size: "small" },
  { id: "smart-tables", label: "smart-table data", x: 30, y: 20, size: "medium" },
  { id: "game-speed", label: "game speed", x: 34, y: 10, size: "small" },
  { id: "side-bets", label: "side bets", x: 22, y: 58, size: "small" },
  { id: "advantage-play", label: "advantage play", x: 8, y: 46, size: "small" },
  { id: "game-protection", label: "game protection", x: 8, y: 86, size: "small" },
  { id: "casino-loyalty", label: "casino loyalty", x: 52, y: 8, size: "small" },
  { id: "self-exclusion", label: "self-exclusion", x: 8, y: 66, size: "small" },
  { id: "accessible-tourism", label: "accessible tourism", x: 76, y: 16, size: "medium" },
  { id: "geospatial-routing", label: "geospatial routing", x: 90, y: 20, size: "small" },
  { id: "smart-tourism", label: "smart tourism", x: 90, y: 36, size: "small" },
  { id: "forecast-evidence", label: "forecast evidence", x: 64, y: 12, size: "small" },
  { id: "sports-attendance", label: "sports attendance", x: 90, y: 50, size: "medium" },
  { id: "womens-soccer", label: "women's soccer", x: 90, y: 84, size: "small" },
  { id: "dei-practices", label: "DEI practices", x: 66, y: 88, size: "small" },
  { id: "workplace-wellbeing", label: "workplace well-being", x: 52, y: 88, size: "small" },
  { id: "school-to-work", label: "school-to-work transitions", x: 38, y: 88, size: "small" },
  { id: "qualitative-research", label: "qualitative research", x: 17, y: 90, size: "small" }
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
  ["gaming", "table-games"],
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
  ["gambling", "table-games"],
  ["baccarat", "table-games"],
  ["table-games", "casino-management"],
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
  ["marketing-analytics", "patron-lifecycle"],
  ["gaming", "smart-tables"],
  ["smart-tables", "game-speed"],
  ["smart-tables", "side-bets"],
  ["smart-tables", "behavioral-analysis"],
  ["smart-tables", "surveillance"],
  ["smart-tables", "casino-management"],
  ["side-bets", "baccarat"],
  ["side-bets", "advantage-play"],
  ["advantage-play", "game-protection"],
  ["surveillance", "game-protection"],
  ["casino-loyalty", "marketing-analytics"],
  ["casino-loyalty", "reinvestment"],
  ["casino-loyalty", "patron-lifecycle"],
  ["casino-loyalty", "self-exclusion"],
  ["self-exclusion", "responsible"],
  ["self-exclusion", "machine-learning"],
  ["accessible-tourism", "hospitality"],
  ["accessible-tourism", "geospatial-routing"],
  ["accessible-tourism", "smart-tourism"],
  ["geospatial-routing", "operations-research"],
  ["smart-tourism", "service-technology"],
  ["forecast-evidence", "forecasting"],
  ["forecast-evidence", "interpretable"],
  ["sports-attendance", "forecasting"],
  ["sports-attendance", "revenue"],
  ["sports-attendance", "womens-soccer"],
  ["dei-practices", "hospitality"],
  ["dei-practices", "workplace-wellbeing"],
  ["school-to-work", "workplace-wellbeing"],
  ["school-to-work", "qualitative-research"]
];

const mobilePositions = {
  surveillance: { x: 24, y: 12 },
  "hotel-occupancy": { x: 74, y: 12 },
  gambling: { x: 24, y: 27 },
  hospitality: { x: 76, y: 27 },
  "machine-learning": { x: 50, y: 42 },
  gaming: { x: 22, y: 57 },
  forecasting: { x: 78, y: 57 },
  responsible: { x: 24, y: 71 },
  revenue: { x: 76, y: 71 },
  interpretable: { x: 25, y: 84 },
  statistics: { x: 75, y: 84 },
  baccarat: { x: 22, y: 90 },
  cancellations: { x: 76, y: 90 }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function ResearchWordGraph() {
  const graphRef = useRef(null);
  const draggingIdRef = useRef(null);
  const bumpTimeoutRef = useRef(null);
  const [positions, setPositions] = useState(() => (
    Object.fromEntries(topics.map((topic) => [topic.id, { x: topic.x, y: topic.y }]))
  ));
  const [draggingId, setDraggingId] = useState(null);
  const [bumpedIds, setBumpedIds] = useState([]);

  const topicMap = useMemo(() => (
    Object.fromEntries(topics.map((topic) => [topic.id, topic]))
  ), []);

  useEffect(() => () => {
    if (bumpTimeoutRef.current) {
      window.clearTimeout(bumpTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    function applyResponsiveLayout() {
      setPositions(Object.fromEntries(topics.map((topic) => [
        topic.id,
        mediaQuery.matches && mobilePositions[topic.id]
          ? mobilePositions[topic.id]
          : { x: topic.x, y: topic.y }
      ])));
    }

    applyResponsiveLayout();
    mediaQuery.addEventListener?.("change", applyResponsiveLayout);
    return () => mediaQuery.removeEventListener?.("change", applyResponsiveLayout);
  }, []);

  function markBumped(ids) {
    if (!ids.length) return;

    setBumpedIds(ids);
    if (bumpTimeoutRef.current) {
      window.clearTimeout(bumpTimeoutRef.current);
    }

    bumpTimeoutRef.current = window.setTimeout(() => {
      setBumpedIds([]);
      bumpTimeoutRef.current = null;
    }, 260);
  }

  function releaseRepel(current, id) {
    const droppedPosition = current[id];
    if (!droppedPosition) return current;

    const releaseRadius = 20;
    const collisionRadius = 7.5;
    const maxPush = 5.2;
    const bumped = [];
    const next = { ...current };

    topics.forEach((topic) => {
      if (topic.id === id) return;

      const position = current[topic.id];
      const dx = position.x - droppedPosition.x;
      const dy = position.y - droppedPosition.y;
      const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);

      if (distance > releaseRadius) return;

      const proximity = (releaseRadius - distance) / releaseRadius;
      const pulse = proximity * proximity * maxPush;
      const collisionPulse = distance < collisionRadius ? (collisionRadius - distance) * 0.5 : 0;
      const push = pulse + collisionPulse;
      const originPull = {
        x: (topic.x - position.x) * 0.01,
        y: (topic.y - position.y) * 0.01
      };

      next[topic.id] = {
        x: clamp(position.x + (dx / distance) * push + originPull.x, 8, 92),
        y: clamp(position.y + (dy / distance) * push + originPull.y, 12, 88)
      };
      bumped.push(topic.id);
    });

    markBumped(bumped);
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
            x: clamp(position.x + (topic.x - position.x) * 0.018, 8, 92),
            y: clamp(position.y + (topic.y - position.y) * 0.018, 12, 88)
          };
        });

        return next;
      });
    }, 140);
  }

  function repelNearbyNodes(current, id, nextPosition) {
    const nudgeRadius = 20;
    const collisionRadius = 7.25;
    const maxNudge = 2.4;
    const bumped = [];
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
      const collisionTap = distance < collisionRadius ? (collisionRadius - distance) * 0.45 : 0;
      const push = softNudge + collisionTap;

      if (push <= 0) return;

      next[topic.id] = {
        x: clamp(position.x + (dx / distance) * push, 8, 92),
        y: clamp(position.y + (dy / distance) * push, 12, 88)
      };
      if (distance < collisionRadius + 2) {
        bumped.push(topic.id);
      }
    });

    markBumped(bumped);
    return next;
  }

  function moveTopic(event, id) {
    const bounds = graphRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setPositions((current) => repelNearbyNodes(current, id, {
      x: clamp(x, 8, 92),
      y: clamp(y, 12, 88)
    }));
  }

  function endDrag(id) {
    if (draggingIdRef.current !== id) return;

    draggingIdRef.current = null;
    setDraggingId(null);
    setPositions((current) => releaseRepel(current, id));
    settleAfterRelease(id);
  }

  return (
    <section className="research-word-graph-section" aria-labelledby="research-word-graph-title">
      <div className="section-intro">
        <p className="eyebrow">Research map</p>
        <h2 id="research-word-graph-title">My research applies AI and data science to hospitality and gaming contexts</h2>
      </div>

      <div className="research-word-graph" ref={graphRef}>
        <svg aria-hidden="true" className="research-word-graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          {links.map(([sourceId, targetId]) => {
            const source = positions[sourceId];
            const target = positions[targetId];

            return (
              <line
                data-mobile-visible={mobilePositions[sourceId] && mobilePositions[targetId] ? "true" : "false"}
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
              data-mobile-visible={mobilePositions[topic.id] ? "true" : "false"}
              data-bumped={bumpedIds.includes(topic.id) ? "true" : "false"}
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
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`
              }}
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
