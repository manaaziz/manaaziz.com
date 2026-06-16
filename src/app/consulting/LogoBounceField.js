"use client";

import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function LogoBounceField({ clients }) {
  const arenaRef = useRef(null);
  const logoRefs = useRef([]);
  const bodiesRef = useRef([]);
  const wanderRef = useRef(0);

  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena || prefersReducedMotion()) return undefined;

    let frameId = 0;
    let lastTime = performance.now();

    function buildBodies() {
      const bounds = arena.getBoundingClientRect();
      bodiesRef.current = logoRefs.current.map((node, index) => {
        const width = node?.offsetWidth || 92;
        const height = node?.offsetHeight || 56;
        const angle = (index * 79 + 23) * (Math.PI / 180);
        const speed = 42 + (index % 5) * 4;
        const maxX = Math.max(0, bounds.width - width);
        const maxY = Math.max(0, bounds.height - height);
        const x = (maxX * ((index * 37) % 100)) / 100;
        const y = (maxY * ((index * 53) % 100)) / 100;

        return {
          height,
          radius: Math.max(width, height) * 0.48,
          spin: index % 2 === 0 ? 1 : -1,
          width,
          wobble: Math.random() * Math.PI * 2,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed
        };
      });
    }

    function clampSpeed(body) {
      const speed = Math.hypot(body.vx, body.vy);
      const minSpeed = 34;
      const maxSpeed = 68;

      if (speed < minSpeed) {
        const angle = body.wobble || Math.random() * Math.PI * 2;
        body.vx += Math.cos(angle) * (minSpeed - speed + 2);
        body.vy += Math.sin(angle) * (minSpeed - speed + 2);
        return;
      }

      if (speed > maxSpeed) {
        body.vx = (body.vx / speed) * maxSpeed;
        body.vy = (body.vy / speed) * maxSpeed;
      }
    }

    function keepInBounds(body, bounds) {
      body.x = Math.max(0, Math.min(body.x, bounds.width - body.width));
      body.y = Math.max(0, Math.min(body.y, bounds.height - body.height));
    }

    function resolveCollisions(bounds) {
      const bodies = bodiesRef.current;

      for (let i = 0; i < bodies.length; i += 1) {
        for (let j = i + 1; j < bodies.length; j += 1) {
          const a = bodies[i];
          const b = bodies[j];

          const ax = a.x + a.width / 2;
          const ay = a.y + a.height / 2;
          const bx = b.x + b.width / 2;
          const by = b.y + b.height / 2;
          let dx = bx - ax;
          let dy = by - ay;
          let distance = Math.hypot(dx, dy);
          const minDistance = a.radius + b.radius + 10;

          if (distance >= minDistance) continue;

          if (distance < 0.001) {
            const angle = ((i * 67 + j * 31) % 360) * (Math.PI / 180);
            dx = Math.cos(angle);
            dy = Math.sin(angle);
            distance = 1;
          }

          const nx = dx / distance;
          const ny = dy / distance;
          const overlap = minDistance - distance;
          const separateBy = overlap * 0.52;

          a.x -= nx * separateBy;
          a.y -= ny * separateBy;
          b.x += nx * separateBy;
          b.y += ny * separateBy;

          const relativeSpeed = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          const impulse = Math.max(0, 24 - relativeSpeed) * 0.42;
          a.vx -= nx * impulse;
          a.vy -= ny * impulse;
          b.vx += nx * impulse;
          b.vy += ny * impulse;
          a.spin = nx > 0 ? -1 : 1;
          b.spin = nx > 0 ? 1 : -1;
          keepInBounds(a, bounds);
          keepInBounds(b, bounds);
          clampSpeed(a);
          clampSpeed(b);
        }
      }
    }

    function tick(now) {
      const bounds = arena.getBoundingClientRect();
      const delta = Math.min((now - lastTime) / 1000, 0.032);
      lastTime = now;
      wanderRef.current += delta;

      bodiesRef.current.forEach((body, index) => {
        const wiggle = wanderRef.current * (0.9 + index * 0.07) + body.wobble;
        body.vx += Math.cos(wiggle) * 7 * delta + (Math.random() - 0.5) * 0.28;
        body.vy += Math.sin(wiggle * 1.13) * 7 * delta + (Math.random() - 0.5) * 0.28;
        body.vx *= 0.999;
        body.vy *= 0.999;
        clampSpeed(body);

        body.x += body.vx * delta;
        body.y += body.vy * delta;

        if (body.x <= 0) {
          body.x = 0;
          body.vx = Math.abs(body.vx) + 3;
          body.vy += (Math.random() - 0.5) * 8;
          body.spin *= -1;
        } else if (body.x + body.width >= bounds.width) {
          body.x = bounds.width - body.width;
          body.vx = -Math.abs(body.vx) - 3;
          body.vy += (Math.random() - 0.5) * 8;
          body.spin *= -1;
        }

        if (body.y <= 0) {
          body.y = 0;
          body.vy = Math.abs(body.vy) + 3;
          body.vx += (Math.random() - 0.5) * 8;
          body.spin *= -1;
        } else if (body.y + body.height >= bounds.height) {
          body.y = bounds.height - body.height;
          body.vy = -Math.abs(body.vy) - 3;
          body.vx += (Math.random() - 0.5) * 8;
          body.spin *= -1;
        }
      });

      resolveCollisions(bounds);

      bodiesRef.current.forEach((body, index) => {
        const node = logoRefs.current[index];
        if (!node) return;
        const tilt = Math.max(-4, Math.min(4, body.vx * 0.08)) + Math.sin(wanderRef.current * 1.4 + body.wobble) * 1.6;
        node.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${tilt * body.spin}deg)`;
      });

      frameId = requestAnimationFrame(tick);
    }

    buildBodies();
    frameId = requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(buildBodies);
    resizeObserver.observe(arena);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [clients]);

  return (
    <div className="consulting-logo-arena" ref={arenaRef}>
      {clients.map((client, index) => (
        <article
          className="consulting-logo-bouncer"
          key={client.name}
          ref={(node) => {
            logoRefs.current[index] = node;
          }}
        >
          <div className="consulting-client-logo" aria-label={client.name}>
            {client.logo ? <img src={client.logo} alt="" /> : <strong>{client.name}</strong>}
          </div>
        </article>
      ))}
    </div>
  );
}
