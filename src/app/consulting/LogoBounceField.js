"use client";

import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function LogoBounceField({ clients }) {
  const arenaRef = useRef(null);
  const logoRefs = useRef([]);
  const bodiesRef = useRef([]);

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
          spin: index % 2 === 0 ? 1 : -1,
          width,
          wobble: ((index * 47 + 19) % 360) * (Math.PI / 180),
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
          const dx = bx - ax;
          const dy = by - ay;
          const overlapX = (a.width + b.width) / 2 - Math.abs(dx);
          const overlapY = (a.height + b.height) / 2 - Math.abs(dy);

          if (overlapX <= 0 || overlapY <= 0) continue;

          const resolveX = overlapX < overlapY;
          const nx = resolveX ? Math.sign(dx || 1) : 0;
          const ny = resolveX ? 0 : Math.sign(dy || 1);
          const separateBy = (resolveX ? overlapX : overlapY) * 0.52;

          a.x -= nx * separateBy;
          a.y -= ny * separateBy;
          b.x += nx * separateBy;
          b.y += ny * separateBy;

          const relativeSpeed = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          const impulse = Math.max(0, 28 - relativeSpeed) * 0.5;
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

      bodiesRef.current.forEach((body) => {
        clampSpeed(body);

        body.x += body.vx * delta;
        body.y += body.vy * delta;

        if (body.x <= 0) {
          body.x = 0;
          body.vx = Math.abs(body.vx) + 3;
          body.spin *= -1;
        } else if (body.x + body.width >= bounds.width) {
          body.x = bounds.width - body.width;
          body.vx = -Math.abs(body.vx) - 3;
          body.spin *= -1;
        }

        if (body.y <= 0) {
          body.y = 0;
          body.vy = Math.abs(body.vy) + 3;
          body.spin *= -1;
        } else if (body.y + body.height >= bounds.height) {
          body.y = bounds.height - body.height;
          body.vy = -Math.abs(body.vy) - 3;
          body.spin *= -1;
        }
      });

      resolveCollisions(bounds);

      bodiesRef.current.forEach((body, index) => {
        const node = logoRefs.current[index];
        if (!node) return;
        const tilt = Math.max(-4, Math.min(4, body.vx * 0.08)) + Math.sin(now * 0.0014 + body.wobble) * 1.2;
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
