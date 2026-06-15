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
        const width = node?.offsetWidth || 112;
        const height = node?.offsetHeight || 78;
        const angle = (index * 79 + 23) * (Math.PI / 180);
        const speed = 18 + (index % 4) * 2.5;
        const maxX = Math.max(0, bounds.width - width);
        const maxY = Math.max(0, bounds.height - height);
        const x = (maxX * ((index * 37) % 100)) / 100;
        const y = (maxY * ((index * 53) % 100)) / 100;

        return {
          height,
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
      const minSpeed = 12;
      const maxSpeed = 46;

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

    function resolveCollisions() {
      const bodies = bodiesRef.current;

      for (let i = 0; i < bodies.length; i += 1) {
        for (let j = i + 1; j < bodies.length; j += 1) {
          const a = bodies[i];
          const b = bodies[j];
          const overlapX = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
          const overlapY = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);

          if (overlapX <= 0 || overlapY <= 0) continue;

          if (overlapX < overlapY) {
            const direction = a.x < b.x ? -1 : 1;
            a.x += direction * overlapX * 0.56;
            b.x -= direction * overlapX * 0.56;
            const average = Math.max((Math.abs(a.vx) + Math.abs(b.vx)) / 2, 18);
            a.vx = -direction * average;
            b.vx = direction * average;
            a.vy += (Math.random() - 0.5) * 9;
            b.vy += (Math.random() - 0.5) * 9;
          } else {
            const direction = a.y < b.y ? -1 : 1;
            a.y += direction * overlapY * 0.56;
            b.y -= direction * overlapY * 0.56;
            const average = Math.max((Math.abs(a.vy) + Math.abs(b.vy)) / 2, 18);
            a.vy = -direction * average;
            b.vy = direction * average;
            a.vx += (Math.random() - 0.5) * 9;
            b.vx += (Math.random() - 0.5) * 9;
          }

          a.spin *= -1;
          b.spin *= -1;
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
        body.vx += Math.cos(wiggle) * 11 * delta + (Math.random() - 0.5) * 3.2;
        body.vy += Math.sin(wiggle * 1.13) * 11 * delta + (Math.random() - 0.5) * 3.2;
        body.vx *= 0.996;
        body.vy *= 0.996;
        clampSpeed(body);

        body.x += body.vx * delta;
        body.y += body.vy * delta;

        if (body.x <= 0) {
          body.x = 0;
          body.vx = Math.abs(body.vx) + 4;
          body.vy += (Math.random() - 0.5) * 10;
          body.spin *= -1;
        } else if (body.x + body.width >= bounds.width) {
          body.x = bounds.width - body.width;
          body.vx = -Math.abs(body.vx) - 4;
          body.vy += (Math.random() - 0.5) * 10;
          body.spin *= -1;
        }

        if (body.y <= 0) {
          body.y = 0;
          body.vy = Math.abs(body.vy) + 4;
          body.vx += (Math.random() - 0.5) * 10;
          body.spin *= -1;
        } else if (body.y + body.height >= bounds.height) {
          body.y = bounds.height - body.height;
          body.vy = -Math.abs(body.vy) - 4;
          body.vx += (Math.random() - 0.5) * 10;
          body.spin *= -1;
        }
      });

      resolveCollisions();

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
          <span>{client.name}</span>
        </article>
      ))}
    </div>
  );
}
