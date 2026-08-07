"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function MaterialSubnav({ courseSlug, currentSection, sections }) {
  const currentRef = useRef(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [currentSection]);

  return (
    <nav className="course-material-subnav" aria-label="Course material sections">
      {sections.map((item) => (
        <Link
          aria-current={item.id === currentSection ? "page" : undefined}
          href={`/teaching/${courseSlug}/materials/${item.id}`}
          key={item.id}
          ref={item.id === currentSection ? currentRef : undefined}
        >
          {item.eyebrow}
        </Link>
      ))}
    </nav>
  );
}
