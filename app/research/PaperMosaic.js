"use client";

import { useEffect, useState } from "react";

export default function PaperMosaic({ papers }) {
  const [activePaper, setActivePaper] = useState(null);

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

  function openPaper(paper) {
    setActivePaper(paper);
  }

  function paperKeyDown(event, paper) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPaper(paper);
    }
  }

  function stopTileOpen(event) {
    event.stopPropagation();
  }

  return (
    <div className="paper-mosaic-wrap">
      <div className="paper-mosaic" data-expanded={activePaper ? "true" : "false"}>
        {papers.map((paper, index) => (
          <article
            aria-label={`Open details for ${paper.title}`}
            className="paper-tile"
            data-size={index % 7 === 0 ? "wide" : index % 5 === 0 ? "tall" : "standard"}
            key={paper.title}
            onClick={() => openPaper(paper)}
            onKeyDown={(event) => paperKeyDown(event, paper)}
            role="button"
            tabIndex={0}
          >
            <div>
              <span>{paper.status} · {paper.year}</span>
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
                  Blog
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {activePaper ? (
        <div className="paper-focus-layer" role="presentation" onClick={() => setActivePaper(null)}>
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
                <a href={`https://doi.org/${activePaper.doi}`} target="_blank" rel="noreferrer">
                  View DOI
                </a>
              ) : null}
              {activePaper.blogHref ? (
                <a href={activePaper.blogHref}>
                  Blog post
                </a>
              ) : null}
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}
