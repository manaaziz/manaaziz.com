"use client";

import { useEffect, useRef, useState } from "react";

const HEX_POINTS = [
  [0.25, 0],
  [0.75, 0],
  [1, 0.5],
  [0.75, 1],
  [0.25, 1],
  [0, 0.5]
];

function polygonFromRect(rect) {
  return HEX_POINTS.map(([x, y]) => ({
    x: rect.x + rect.width * x,
    y: rect.y + rect.height * y
  }));
}

function solidEdgesFromPolygon(polygon) {
  return polygon.map((point, index) => {
    const nextPoint = polygon[(index + 1) % polygon.length];
    const dx = nextPoint.x - point.x;
    const dy = nextPoint.y - point.y;
    const length = Math.hypot(dx, dy) || 1;

    return {
      start: point,
      end: nextPoint,
      // The polygon points are clockwise in screen coordinates. The left normal
      // points outward from the visible hexagon.
      normal: {
        x: dy / length,
        y: -dx / length
      }
    };
  });
}

function nearestPointOnSegment(point, segment) {
  const dx = segment.end.x - segment.start.x;
  const dy = segment.end.y - segment.start.y;
  const lengthSquared = dx * dx + dy * dy;
  const projected = lengthSquared === 0
    ? 0
    : ((point.x - segment.start.x) * dx + (point.y - segment.start.y) * dy) / lengthSquared;
  const t = Math.max(0, Math.min(1, projected));

  return {
    x: segment.start.x + dx * t,
    y: segment.start.y + dy * t
  };
}

function pointInPolygon(point, polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const pi = polygon[i];
    const pj = polygon[j];
    const intersects = pi.y > point.y !== pj.y > point.y && point.x < ((pj.x - pi.x) * (point.y - pi.y)) / (pj.y - pi.y) + pi.x;

    if (intersects) inside = !inside;
  }

  return inside;
}

function getPaperSlot(index) {
  let remaining = index;
  let row = 0;

  while (true) {
    const rowCapacity = row % 2 === 0 ? 2 : 1;

    if (remaining < rowCapacity) {
      return {
        x: rowCapacity === 2 ? remaining * 2 : 1,
        y: row
      };
    }

    remaining -= rowCapacity;
    row += 1;
  }
}

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
    let tileElements = [];
    let solidTiles = [];

    function resolveChipContact(chip, normal) {
      const velocityDotNormal = chip.vx * normal.x + chip.vy * normal.y;

      if (velocityDotNormal >= 0) return;

      const tangent = { x: -normal.y, y: normal.x };
      const tangentVelocity = chip.vx * tangent.x + chip.vy * tangent.y;
      const isSlopedEdge = Math.abs(normal.x) > 0.32 && normal.y < 0.12;
      const isTopSurface = normal.y < -0.72;
      const impact = Math.abs(velocityDotNormal);
      const restitution = isSlopedEdge ? 0.48 : impact > 190 ? 0.72 : 0.58;
      const normalVelocity = impact * restitution;
      const tangentFriction = isSlopedEdge ? 0.982 : 0.964;

      chip.vx = tangent.x * tangentVelocity * tangentFriction + normal.x * normalVelocity;
      chip.vy = tangent.y * tangentVelocity * tangentFriction + normal.y * normalVelocity;

      if (isTopSurface && impact > 90) {
        chip.vy -= Math.min(38, impact * 0.08);
      }
    }

    function refreshPolygons() {
      bounds = wrap.getBoundingClientRect();
      tileElements = Array.from(wrap.querySelectorAll(".paper-tile"));
    }

    function updateSolidTiles() {
      bounds = wrap.getBoundingClientRect();
      solidTiles = tileElements.map((tile) => {
        const rect = tile.getBoundingClientRect();
        const tileRect = {
          x: rect.left - bounds.left,
          y: rect.top - bounds.top,
          width: rect.width,
          height: rect.height
        };
        const polygon = polygonFromRect(tileRect);

        return {
          polygon,
          edges: solidEdgesFromPolygon(polygon)
        };
      });
    }

    function resetChip(chip, index, startAbove = true) {
      chip.visualRadius = Math.max(5, chipElements[index].offsetWidth / 2);
      chip.radius = Math.max(4, chipElements[index].offsetWidth * 0.32);
      const laneDirection = index % 2 === 0 ? 1 : -1;
      const leftLaneStart = bounds.width * 0.08;
      const rightLaneStart = bounds.width * 0.58;
      const laneWidth = bounds.width * 0.34;
      chip.x = (laneDirection > 0 ? leftLaneStart : rightLaneStart) + Math.random() * laneWidth;
      chip.y = startAbove ? -chip.radius * (2.5 + Math.random() * 4.5) : -chip.radius * (1 + index * 1.6);
      const fallSpeed = 165 + Math.random() * 55;
      const fallAngle = (Math.PI / 180) * (30 + Math.random() * 12);
      const centerDirection = chip.x < bounds.width / 2 ? 1 : -1;
      const direction = Math.random() > 0.12 ? centerDirection : -centerDirection;
      chip.vx = Math.sin(fallAngle) * fallSpeed * direction;
      chip.vy = Math.cos(fallAngle) * fallSpeed;
      chip.driftDirection = direction;
      chip.stuckTime = 0;
      chip.surfaceContact = false;
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
        radius: Math.max(4, element.offsetWidth * 0.32),
        visualRadius: Math.max(5, element.offsetWidth / 2),
        driftDirection: index % 2 === 0 ? 1 : -1,
        stuckTime: 0,
        surfaceContact: false,
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
        const steps = 3;
        const stepDelta = delta / steps;
        chip.surfaceContact = false;

        for (let step = 0; step < steps; step += 1) {
          updateSolidTiles();
          chip.vy += 520 * stepDelta;
          chip.x += chip.vx * stepDelta;
          chip.y += chip.vy * stepDelta;

          solidTiles.forEach((tile) => {
            const chipPoint = { x: chip.x, y: chip.y };
            const insideTile = pointInPolygon(chipPoint, tile.polygon);
            let collision = null;

            tile.edges.forEach((edge) => {
              if (insideTile) {
                const signedDistance = (chip.x - edge.start.x) * edge.normal.x + (chip.y - edge.start.y) * edge.normal.y;

                if (!collision || signedDistance > collision.signedDistance) {
                  collision = {
                    signedDistance,
                    overlap: chip.radius - signedDistance,
                    normal: edge.normal
                  };
                }

                return;
              }

              const nearest = nearestPointOnSegment(chipPoint, edge);
              const dx = chip.x - nearest.x;
              const dy = chip.y - nearest.y;
              const distance = Math.hypot(dx, dy);

              if (distance >= chip.radius) return;

              const normal = distance > 0.001
                ? { x: dx / distance, y: dy / distance }
                : edge.normal;

              if (!collision || distance < collision.distance) {
                collision = {
                  distance,
                  overlap: chip.radius - distance,
                  normal: edge.normal
                };

                collision.normal = normal;
              }
            });

            if (!collision) return;

            chip.x += collision.normal.x * (collision.overlap + 0.15);
            chip.y += collision.normal.y * (collision.overlap + 0.15);
            resolveChipContact(chip, collision.normal);

            if (collision.normal.y < -0.72) {
              chip.surfaceContact = true;
            }
          });
        }

        const speed = Math.hypot(chip.vx, chip.vy);
        if (chip.surfaceContact && speed < 22) {
          chip.stuckTime += delta;
          chip.vx += chip.driftDirection * 22 * delta;

          if (chip.stuckTime > 0.42) {
            chip.vx += chip.driftDirection * (46 + Math.random() * 18);
            chip.vy -= 42 + Math.random() * 24;
            chip.stuckTime = 0;
          }
        } else {
          chip.stuckTime = Math.max(0, chip.stuckTime - delta * 2);
        }

        const rollingSpin = (chip.vx / Math.max(chip.visualRadius, 1)) * 44;
        chip.angularVelocity += (rollingSpin - chip.angularVelocity) * 0.12;
        chip.angularVelocity = Math.max(-360, Math.min(360, chip.angularVelocity));
        chip.angle += chip.angularVelocity * delta;
        chip.angularVelocity *= 0.982;

        chip.vx *= 0.998;

        if (
          chip.y > bounds.height + chip.radius * 5 ||
          chip.x < -chip.radius * 6 ||
          chip.x > bounds.width + chip.radius * 6
        ) {
          resetChip(chip, index);
        }

        chipElements[index].style.transform = `translate3d(${chip.x - chip.visualRadius}px, ${chip.y - chip.visualRadius}px, 0) rotate(${chip.angle}deg)`;
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

  const paperSlots = papers.map((paper, index) => ({
    paper,
    slot: getPaperSlot(index)
  }));
  const maxSlotY = paperSlots.reduce((maxY, { slot }) => Math.max(maxY, slot.y), 4);

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
      <div
        className="paper-mosaic"
        data-expanded={activePaper ? "true" : "false"}
        style={{ "--paper-slot-rows": maxSlotY + 1 }}
      >
        {paperSlots.map(({ paper, slot }, index) => (
          <article
            aria-label={`Open details for ${paper.title}`}
            className="paper-tile"
            data-active={activePaper?.title === paper.title ? "true" : "false"}
            data-slot={index}
            key={paper.title}
            onClick={(event) => openPaper(paper, event.currentTarget)}
            onKeyDown={(event) => paperKeyDown(event, paper)}
            role="button"
            style={{
              "--paper-slot-left": slot.x,
              "--paper-slot-y": slot.y
            }}
            tabIndex={0}
          >
            <div className="paper-tile-inner">
              <div>
                <h3>{paper.title}</h3>
              </div>
              <div className="paper-tile-detail">
                <small>{paper.venue}</small>
              </div>
              <div className="paper-tile-actions" onClick={stopTileOpen}>
                {paper.doi ? (
                  <a className="button button-small" href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">
                    DOI
                  </a>
                ) : null}
                {paper.pdfHref ? (
                  <a className="button button-small" href={paper.pdfHref} target="_blank" rel="noreferrer">
                    PDF
                  </a>
                ) : null}
              </div>
            </div>
          </article>
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
              {activePaper.pdfHref ? (
                <a className="button paper-focus-button" href={activePaper.pdfHref} target="_blank" rel="noreferrer">
                  PDF
                </a>
              ) : null}
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}
