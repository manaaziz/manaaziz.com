"use client";

import { useEffect, useRef, useState } from "react";

export default function PaperMosaic({ papers }) {
  const wrapRef = useRef(null);
  const chipRefs = useRef([]);
  const [activePaper, setActivePaper] = useState(null);
  const [paperOrigin, setPaperOrigin] = useState({
    x: "0px",
    y: "0px",
    scale: 0.42
  });

  useEffect(() => {
    if (!activePaper) return undefined;

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setActivePaper(null);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activePaper]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const chipElements = chipRefs.current.filter(Boolean);

    if (!wrap || chipElements.length === 0 || activePaper) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    let animationFrame;
    let lastFrame = performance.now();
    let bounds = wrap.getBoundingClientRect();
    let polygons = [];
    let crackLanes = [];

    function pointInPolygon(point, polygon) {
      let inside = false;
      for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
        const currentPoint = polygon[index];
        const previousPoint = polygon[previous];
        const crosses =
          currentPoint.y > point.y !== previousPoint.y > point.y &&
          point.x < ((previousPoint.x - currentPoint.x) * (point.y - currentPoint.y)) / (previousPoint.y - currentPoint.y) + currentPoint.x;

        if (crosses) inside = !inside;
      }
      return inside;
    }

    function closestPointOnSegment(point, segmentStart, segmentEnd) {
      const dx = segmentEnd.x - segmentStart.x;
      const dy = segmentEnd.y - segmentStart.y;
      const lengthSquared = dx * dx + dy * dy || 1;
      const t = Math.max(0, Math.min(1, ((point.x - segmentStart.x) * dx + (point.y - segmentStart.y) * dy) / lengthSquared));

      return {
        x: segmentStart.x + dx * t,
        y: segmentStart.y + dy * t
      };
    }

    function refreshPolygons() {
      bounds = wrap.getBoundingClientRect();
      const tileRects = Array.from(wrap.querySelectorAll(".paper-tile")).map((tile) => {
        const rect = tile.getBoundingClientRect();

        return {
          x: rect.left - bounds.left,
          y: rect.top - bounds.top,
          width: rect.width,
          height: rect.height
        };
      });

      polygons = tileRects.map((tileRect) => {
        const { x, y, width, height } = tileRect;

        return [
          { x: x + width * 0.5, y },
          { x: x + width, y: y + height * 0.25 },
          { x: x + width, y: y + height * 0.75 },
          { x: x + width * 0.5, y: y + height },
          { x, y: y + height * 0.75 },
          { x, y: y + height * 0.25 }
        ];
      });

      const measuredLanes = new Set();
      tileRects.forEach((firstRect) => {
        tileRects.forEach((secondRect) => {
          if (secondRect.x <= firstRect.x) return;

          const verticalOverlap = Math.min(firstRect.y + firstRect.height, secondRect.y + secondRect.height) - Math.max(firstRect.y, secondRect.y);
          const horizontalGap = secondRect.x - (firstRect.x + firstRect.width);

          if (verticalOverlap > Math.min(firstRect.height, secondRect.height) * 0.28 && horizontalGap > 2) {
            measuredLanes.add(Math.round(firstRect.x + firstRect.width + horizontalGap / 2));
          }
        });
      });

      crackLanes = [...measuredLanes]
        .filter((lane) => lane > bounds.width * 0.08 && lane < bounds.width * 0.92)
        .sort((firstLane, secondLane) => firstLane - secondLane);

      if (crackLanes.length === 0) {
        crackLanes = [bounds.width * 0.28, bounds.width * 0.5, bounds.width * 0.72];
      }
    }

    function collideChipWithPolygon(chip, polygon) {
      let nearestPoint = null;
      let nearestDistance = Infinity;

      for (let index = 0; index < polygon.length; index += 1) {
        const start = polygon[index];
        const end = polygon[(index + 1) % polygon.length];
        const point = closestPointOnSegment(chip, start, end);
        const dx = chip.x - point.x;
        const dy = chip.y - point.y;
        const distance = Math.hypot(dx, dy);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestPoint = point;
        }
      }

      const inside = pointInPolygon(chip, polygon);
      const collisionRadius = chip.radius * 0.58;
      if (!inside && nearestDistance >= collisionRadius) return;

      const dx = chip.x - nearestPoint.x;
      const dy = chip.y - nearestPoint.y;
      const distance = Math.hypot(dx, dy) || 1;
      const normal = inside ? { x: -dx / distance, y: -dy / distance } : { x: dx / distance, y: dy / distance };
      const penetration = inside ? collisionRadius + nearestDistance : collisionRadius - nearestDistance;
      const velocityAlongNormal = chip.vx * normal.x + chip.vy * normal.y;

      chip.x += normal.x * (penetration + 0.6);
      chip.y += normal.y * (penetration + 0.6);

      if (velocityAlongNormal < 0) {
        const bounce = 0.72;
        chip.vx -= (1 + bounce) * velocityAlongNormal * normal.x;
        chip.vy -= (1 + bounce) * velocityAlongNormal * normal.y;

        const tangentVelocity = -chip.vx * normal.y + chip.vy * normal.x;
        chip.angularVelocity += tangentVelocity * 0.26;
        chip.vx *= 0.985;
        chip.vy *= 0.985;
      } else if (Math.hypot(chip.vx, chip.vy) < 42) {
        let tangent = { x: -normal.y, y: normal.x };
        if (tangent.y < 0) {
          tangent = { x: -tangent.x, y: -tangent.y };
        }
        chip.vx += tangent.x * 18;
        chip.vy += tangent.y * 18;
        chip.angularVelocity += tangent.x * 58;
      }
    }

    function resetChip(chip, index, startAbove = true) {
      chip.radius = Math.max(5, chipElements[index].offsetWidth / 2);
      const randomDropX = Math.random() * bounds.width;
      const edgeBuffer = bounds.width * 0.18;
      let side = Math.random() < 0.5 ? -1 : 1;
      if (randomDropX < edgeBuffer) side = 1;
      if (randomDropX > bounds.width - edgeBuffer) side = -1;
      chip.x = randomDropX;
      chip.y = startAbove ? -chip.radius * (2.5 + Math.random() * 4.5) : -chip.radius * (1 + index * 1.6);
      chip.vx = side * (38 + Math.random() * 92) + (Math.random() - 0.5) * 72;
      chip.vy = 12 + Math.random() * 36;
      chip.angle = Math.random() * 360;
      chip.angularVelocity = chip.vx * (0.88 + Math.random() * 0.58);
    }

    refreshPolygons();

    const chips = chipElements.map((element, index) => {
      const chip = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: Math.max(5, element.offsetWidth / 2),
        angle: 0,
        angularVelocity: 0
      };
      resetChip(chip, index, false);
      return chip;
    });

    function update(now) {
      const delta = Math.min(0.034, (now - lastFrame) / 1000);
      lastFrame = now;

      chips.forEach((chip, index) => {
        chip.vy += 760 * delta;
        chip.x += chip.vx * delta;
        chip.y += chip.vy * delta;
        chip.angle += chip.angularVelocity * delta;
        chip.angularVelocity *= 0.994;

        polygons.forEach((polygon) => collideChipWithPolygon(chip, polygon));

        if (
          chip.y > bounds.height + chip.radius * 5 ||
          chip.x < -chip.radius * 6 ||
          chip.x > bounds.width + chip.radius * 6
        ) {
          resetChip(chip, index);
        }

        chipElements[index].style.transform = `translate3d(${chip.x - chip.radius}px, ${chip.y - chip.radius}px, 0) rotate(${chip.angle}deg)`;
      });

      animationFrame = requestAnimationFrame(update);
    }

    const resizeObserver = new ResizeObserver(refreshPolygons);
    resizeObserver.observe(wrap);
    animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [activePaper]);

  function openPaper(paper, element) {
    if (element) {
      const tileBounds = element.getBoundingClientRect();
      const wrapBounds = element.closest(".paper-mosaic-wrap")?.getBoundingClientRect();

      if (wrapBounds) {
        const focusWidth = Math.min(wrapBounds.width - 32, 736);
        const tileCenterX = tileBounds.left + tileBounds.width / 2;
        const tileCenterY = tileBounds.top + tileBounds.height / 2;
        const wrapCenterX = wrapBounds.left + wrapBounds.width / 2;
        const wrapCenterY = wrapBounds.top + wrapBounds.height / 2;

        setPaperOrigin({
          x: `${tileCenterX - wrapCenterX}px`,
          y: `${tileCenterY - wrapCenterY}px`,
          scale: Math.max(0.24, Math.min(0.58, tileBounds.width / focusWidth))
        });
      }
    }

    setActivePaper(paper);
  }

  function paperKeyDown(event, paper) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPaper(paper, event.currentTarget);
    }
  }

  function stopTileOpen(event) {
    event.stopPropagation();
  }

  const paperRows = [];
  for (let index = 0; index < papers.length;) {
    const rowSize = paperRows.length % 2 === 0 ? 4 : 3;
    paperRows.push(papers.slice(index, index + rowSize));
    index += rowSize;
  }

  return (
    <div className="paper-mosaic-wrap" ref={wrapRef}>
      <div className="paper-chip-drop" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={`paper-chip-${index}`}
            ref={(element) => {
              chipRefs.current[index] = element;
            }}
          />
        ))}
      </div>
      <div className="paper-mosaic" data-expanded={activePaper ? "true" : "false"}>
        {paperRows.map((row, rowIndex) => (
          <div className="paper-mosaic-row" data-row={rowIndex % 2 === 0 ? "full" : "offset"} key={`paper-row-${rowIndex}`}>
            {row.map((paper) => (
              <article
                aria-label={`Open details for ${paper.title}`}
                className="paper-tile"
                data-active={activePaper?.title === paper.title ? "true" : "false"}
                key={paper.title}
                onClick={(event) => openPaper(paper, event.currentTarget)}
                onKeyDown={(event) => paperKeyDown(event, paper)}
                role="button"
                tabIndex={0}
              >
                <div className="paper-tile-inner">
                  <div>
                    <h3>{paper.title}</h3>
                  </div>
                  <div className="paper-tile-detail">
                    <p>{paper.blurb}</p>
                    <small>{paper.venue}</small>
                  </div>
                  <div className="paper-tile-actions" onClick={stopTileOpen}>
                    {paper.doi ? (
                      <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">
                        DOI
                      </a>
                    ) : null}
                    {paper.blogHref ? (
                      <a href={paper.blogHref}>
                        Manalogue
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>

      {activePaper ? (
        <div
          className="paper-focus-layer"
          role="presentation"
          onClick={() => setActivePaper(null)}
          style={{
            "--paper-origin-x": paperOrigin.x,
            "--paper-origin-y": paperOrigin.y,
            "--paper-origin-scale": paperOrigin.scale
          }}
        >
          <article className="paper-focus-card" role="dialog" aria-modal="true" aria-labelledby="paper-focus-title" onClick={(event) => event.stopPropagation()}>
            <button className="paper-focus-back" onClick={() => setActivePaper(null)} type="button">
              Back
            </button>
            <span>{activePaper.status} · {activePaper.year}</span>
            <h3 id="paper-focus-title">{activePaper.title}</h3>
            <p>{activePaper.detail || activePaper.blurb}</p>
            <small>{activePaper.venue}</small>
            <div className="paper-focus-actions">
              {activePaper.doi ? (
                <a className="button paper-focus-button" href={`https://doi.org/${activePaper.doi}`} target="_blank" rel="noreferrer">
                  DOI
                </a>
              ) : null}
              {activePaper.blogHref ? (
                <a className="button paper-focus-button" href={activePaper.blogHref}>
                  Manalogue
                </a>
              ) : null}
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}
