"use client";

import { useEffect, useState } from "react";

const TREE_WIDTH = 1000;
const TREE_HEIGHT = 380;
const TREE_MARGIN_X = 46;
const TREE_MARGIN_Y = 28;
const TREE_DEPTH = 7;
const CYCLE_MS = 13000;
const STAGE_HOLD = 0.2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - ((-2 * value + 2) ** 3) / 2;
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function lerpPoint(start, end, amount) {
  return {
    x: lerp(start.x, end.x, amount),
    y: lerp(start.y, end.y, amount)
  };
}

function getAnimatedDepth(progress) {
  const stageCount = TREE_DEPTH - 2;
  const segment = clamp(progress, 0, 1) * stageCount;
  const whole = Math.min(stageCount - 1, Math.floor(segment));
  const local = whole === stageCount ? 1 : segment - whole;
  const growProgress = local <= STAGE_HOLD ? 0 : (local - STAGE_HOLD) / (1 - STAGE_HOLD);

  return Math.min(TREE_DEPTH, 2 + whole + easeInOutCubic(clamp(growProgress, 0, 1)));
}

function nodePoint(level, index, depth) {
  const usableHeight = TREE_HEIGHT - TREE_MARGIN_Y * 2;
  const count = 2 ** level;

  return {
    x: TREE_MARGIN_X + ((TREE_WIDTH - TREE_MARGIN_X * 2) / depth) * level,
    y: TREE_MARGIN_Y + ((index + 0.5) / count) * usableHeight
  };
}

function edgePath(start, end) {
  const controlOffset = (end.x - start.x) * 0.44;

  return `M ${start.x} ${start.y} C ${start.x + controlOffset} ${start.y}, ${end.x - controlOffset} ${end.y}, ${end.x} ${end.y}`;
}

function makeAnimatedTree(depth) {
  const solidDepth = Math.floor(depth);
  const growth = depth - solidDepth;
  const layoutDepth = Math.max(2, depth);
  const nodeRadius = Math.max(2, 7.6 - layoutDepth * 0.62);
  const edges = [];
  const nodes = [];

  for (let level = 0; level <= solidDepth; level += 1) {
    const count = 2 ** level;

    for (let index = 0; index < count; index += 1) {
      const point = nodePoint(level, index, layoutDepth);

      nodes.push({
        ...point,
        id: `node-${level}-${index}`,
        opacity: 1,
        r: nodeRadius
      });

      if (level < solidDepth) {
        const left = nodePoint(level + 1, index * 2, layoutDepth);
        const right = nodePoint(level + 1, index * 2 + 1, layoutDepth);

        edges.push({
          id: `edge-${level}-${index}-a`,
          opacity: 1,
          path: edgePath(point, left)
        });
        edges.push({
          id: `edge-${level}-${index}-b`,
          opacity: 1,
          path: edgePath(point, right)
        });
      }
    }
  }

  if (solidDepth < TREE_DEPTH && growth > 0.001) {
    const count = 2 ** solidDepth;
    const easedGrowth = easeInOutCubic(growth);

    for (let index = 0; index < count; index += 1) {
      const start = nodePoint(solidDepth, index, layoutDepth);
      const leftTarget = nodePoint(solidDepth + 1, index * 2, layoutDepth);
      const rightTarget = nodePoint(solidDepth + 1, index * 2 + 1, layoutDepth);
      const left = lerpPoint(start, leftTarget, easedGrowth);
      const right = lerpPoint(start, rightTarget, easedGrowth);

      edges.push({
        id: `edge-growing-${solidDepth}-${index}-a`,
        opacity: clamp(easedGrowth * 1.25, 0, 1),
        path: edgePath(start, left)
      });
      edges.push({
        id: `edge-growing-${solidDepth}-${index}-b`,
        opacity: clamp(easedGrowth * 1.25, 0, 1),
        path: edgePath(start, right)
      });
      nodes.push({
        ...left,
        id: `node-growing-${solidDepth + 1}-${index * 2}`,
        opacity: clamp(easedGrowth * 1.4, 0, 1),
        r: Math.max(1.6, nodeRadius * clamp(easedGrowth, 0.35, 1))
      });
      nodes.push({
        ...right,
        id: `node-growing-${solidDepth + 1}-${index * 2 + 1}`,
        opacity: clamp(easedGrowth * 1.4, 0, 1),
        r: Math.max(1.6, nodeRadius * clamp(easedGrowth, 0.35, 1))
      });
    }
  }

  return { edges, nodes };
}

export default function DecisionTreeGrowth() {
  const [animatedDepth, setAnimatedDepth] = useState(2);
  const tree = makeAnimatedTree(animatedDepth);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      setAnimatedDepth(TREE_DEPTH);
      return undefined;
    }

    let frameId;
    const startTime = performance.now();

    function tick(now) {
      const progress = clamp((now - startTime) / CYCLE_MS, 0, 1);
      setAnimatedDepth(getAnimatedDepth(progress));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="decision-tree-demo decision-tree-growth" aria-label="A decision tree animation showing segmentation becoming too crowded">
      <div className="decision-tree-caption">
        <span>Segmentation logic</span>
        <strong>When every exception becomes another branch</strong>
      </div>
      <div className="decision-tree-visual decision-tree-growth-visual" aria-hidden="true">
        <svg viewBox={`0 0 ${TREE_WIDTH} ${TREE_HEIGHT}`} role="img">
          <g className="decision-tree-graph">
            {tree.edges.map((edge) => (
              <path
                className="decision-tree-edge"
                d={edge.path}
                key={edge.id}
                style={{ opacity: edge.opacity }}
              />
            ))}
            {tree.nodes.map((node) => (
              <circle
                className="decision-tree-node"
                cx={node.x}
                cy={node.y}
                key={node.id}
                r={node.r}
                style={{ opacity: node.opacity }}
              />
            ))}
          </g>
        </svg>
      </div>
    </section>
  );
}
