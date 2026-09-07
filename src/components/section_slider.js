"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { captureAnalyticsEvent } from "@/lib/analytics";

const transitionMs = 360;

export default function SectionSlider({ activeId, ariaLabel, className = "", items }) {
  const router = useRouter();
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const [visualIndex, setVisualIndex] = useState(activeIndex);
  const activeLinkRef = useRef(null);
  const linkRefs = useRef([]);
  const navRef = useRef(null);

  useLayoutEffect(() => {
    setVisualIndex(activeIndex);
    if (activeLinkRef.current && navRef.current) {
      navRef.current.scrollTo({
        left: activeLinkRef.current.offsetLeft - ((navRef.current.clientWidth - activeLinkRef.current.offsetWidth) / 2),
        behavior: "auto"
      });
    }
    const savedScroll = Number.parseFloat(window.sessionStorage.getItem("section-slider-scroll") || "");
    if (Number.isFinite(savedScroll)) {
      window.scrollTo({ top: savedScroll, behavior: "auto" });
      window.sessionStorage.removeItem("section-slider-scroll");
    }
  }, [activeIndex]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    const alignPill = (index) => {
      const link = linkRefs.current[index];
      if (!link) return;
      nav.style.setProperty("--slider-pill-left", `${link.offsetLeft}px`);
      nav.style.setProperty("--slider-pill-width", `${link.offsetWidth}px`);
    };

    const savedIndex = Number.parseInt(window.sessionStorage.getItem("section-slider-from-index") || "", 10);
    let animationFrame;
    let cleanupTimer;

    if (Number.isInteger(savedIndex) && savedIndex !== visualIndex && linkRefs.current[savedIndex]) {
      nav.classList.add("is-positioning");
      alignPill(savedIndex);
      nav.getBoundingClientRect();
      nav.classList.remove("is-positioning");
      animationFrame = window.requestAnimationFrame(() => alignPill(visualIndex));
      cleanupTimer = window.setTimeout(() => {
        window.sessionStorage.removeItem("section-slider-from-index");
      }, transitionMs + 80);
    } else {
      nav.classList.add("is-positioning");
      alignPill(visualIndex);
      nav.getBoundingClientRect();
      nav.classList.remove("is-positioning");
    }

    const observer = new ResizeObserver(() => alignPill(visualIndex));
    observer.observe(nav);
    linkRefs.current.forEach((link) => {
      if (link) observer.observe(link);
    });
    return () => {
      observer.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (cleanupTimer) window.clearTimeout(cleanupTimer);
    };
  }, [items.length, visualIndex]);

  function navigate(event, item, index) {
    if (item.id === activeId || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const direction = index > activeIndex ? "forward" : "backward";
    document.documentElement.dataset.sectionDirection = direction;
    window.sessionStorage.setItem("section-slider-scroll", String(window.scrollY));
    window.sessionStorage.setItem("section-slider-from-index", String(activeIndex));
    setVisualIndex(index);
    captureAnalyticsEvent("section navigation selected", {
      section: item.id,
      navigation_label: ariaLabel
    });
    router.push(item.href, { scroll: false });
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
          ref={(node) => {
            linkRefs.current[index] = node;
            if (item.id === activeId) activeLinkRef.current = node;
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
