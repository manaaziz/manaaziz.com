"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const transitionMs = 360;

export default function SectionSlider({ activeId, ariaLabel, className = "", items }) {
  const router = useRouter();
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const [visualIndex, setVisualIndex] = useState(activeIndex);
  const activeLinkRef = useRef(null);
  const navRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    setVisualIndex(activeIndex);
    if (activeLinkRef.current && navRef.current) {
      navRef.current.scrollTo({
        left: activeLinkRef.current.offsetLeft - ((navRef.current.clientWidth - activeLinkRef.current.offsetWidth) / 2),
        behavior: "auto"
      });
    }
    document.documentElement.classList.remove("section-route-leaving");
    document.documentElement.classList.add("section-route-entering");
    const savedScroll = Number.parseFloat(window.sessionStorage.getItem("section-slider-scroll") || "");
    if (Number.isFinite(savedScroll)) {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: savedScroll, behavior: "instant" });
        window.requestAnimationFrame(() => window.scrollTo({ top: savedScroll, behavior: "instant" }));
      });
      window.sessionStorage.removeItem("section-slider-scroll");
    }
    const timer = window.setTimeout(() => document.documentElement.classList.remove("section-route-entering"), transitionMs);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function navigate(event, item, index) {
    if (item.id === activeId || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.clearTimeout(timerRef.current);
    const direction = index > activeIndex ? "forward" : "backward";
    document.documentElement.dataset.sectionDirection = direction;
    document.documentElement.classList.remove("section-route-entering");
    document.documentElement.classList.add("section-route-leaving");
    window.sessionStorage.setItem("section-slider-scroll", String(window.scrollY));
    setVisualIndex(index);
    timerRef.current = window.setTimeout(() => router.push(item.href, { scroll: false }), transitionMs - 80);
  }

  return (
    <nav
      className={`section-slider ${className}`.trim()}
      aria-label={ariaLabel}
      ref={navRef}
      style={{ "--active-index": visualIndex, "--section-count": items.length }}
    >
      {items.map((item, index) => (
        <Link
          aria-current={item.id === activeId ? "page" : undefined}
          href={item.href}
          key={item.id}
          onClick={(event) => navigate(event, item, index)}
          ref={item.id === activeId ? activeLinkRef : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
