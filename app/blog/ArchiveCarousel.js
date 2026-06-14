"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const pageSize = 3;

export default function ArchiveCarousel({ posts }) {
  const [pageIndex, setPageIndex] = useState(0);
  const pages = useMemo(() => {
    const chunks = [];
    for (let index = 0; index < posts.length; index += pageSize) {
      chunks.push(posts.slice(index, index + pageSize));
    }
    return chunks;
  }, [posts]);
  const pageCount = Math.max(pages.length, 1);

  function goToPage(nextIndex) {
    setPageIndex((nextIndex + pageCount) % pageCount);
  }

  return (
    <section className="archive-carousel" aria-labelledby="archive-carousel-title">
      <div className="archive-carousel-header">
        <div>
          <p className="eyebrow">Archive</p>
          <h2 id="archive-carousel-title">Browse the archive</h2>
        </div>
        <div className="archive-carousel-controls" aria-label="Archive carousel controls">
          <button onClick={() => goToPage(pageIndex - 1)} type="button" aria-label="Previous archive page">
            ←
          </button>
          <span>{pageIndex + 1} / {pageCount}</span>
          <button onClick={() => goToPage(pageIndex + 1)} type="button" aria-label="Next archive page">
            →
          </button>
        </div>
      </div>

      <div className="archive-carousel-window">
        <div
          className="archive-carousel-track"
          style={{ transform: `translateX(-${pageIndex * 100}%)` }}
        >
          {pages.map((page, index) => (
            <div className="archive-carousel-page" key={index} aria-hidden={index !== pageIndex}>
              {page.map((post) => (
                <Link className="archive-preview-card" href={post.href} key={post.href}>
                  <span>{post.seriesTitle} · {post.date} · {post.readingMinutes} min read</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="archive-carousel-dots" aria-label="Archive pages">
        {pages.map((_, index) => (
          <button
            aria-label={`Go to archive page ${index + 1}`}
            aria-pressed={index === pageIndex}
            className={index === pageIndex ? "is-active" : ""}
            key={index}
            onClick={() => goToPage(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
