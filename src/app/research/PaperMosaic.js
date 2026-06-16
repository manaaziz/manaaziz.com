"use client";

import { useEffect, useState } from "react";

export default function PaperMosaic({ papers }) {
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

  return (
    <div className="paper-mosaic-wrap">
      <div className="paper-mosaic" data-expanded={activePaper ? "true" : "false"}>
        {papers.map((paper, index) => (
          <article
            aria-label={`Open details for ${paper.title}`}
            className="paper-tile"
            data-active={activePaper?.title === paper.title ? "true" : "false"}
            data-size={index % 7 === 0 ? "wide" : index % 5 === 0 ? "tall" : "standard"}
            key={paper.title}
            onClick={(event) => openPaper(paper, event.currentTarget)}
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
                  Media
                </a>
              ) : null}
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
              {activePaper.blogHref ? (
                <a className="button paper-focus-button" href={activePaper.blogHref}>
                  Media
                </a>
              ) : null}
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}
