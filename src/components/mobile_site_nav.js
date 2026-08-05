"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.4" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {open ? (
        <>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export default function MobileSiteNav({ navItems, searchItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [popTarget, setPopTarget] = useState("");
  const inputRef = useRef(null);
  const popTimerRef = useRef(null);

  const indexedItems = useMemo(
    () => searchItems.map((item) => ({
      ...item,
      searchText: [
        item.title,
        item.label,
        item.type,
        item.description,
        ...(item.keywords || [])
      ].filter(Boolean).join(" ").toLowerCase()
    })),
    [searchItems]
  );

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return indexedItems.slice(0, 6);
    return indexedItems
      .filter((item) => item.searchText.includes(normalized))
      .slice(0, 10);
  }, [indexedItems, query]);

  function closePanels() {
    setMenuOpen(false);
    setSearchOpen(false);
  }

  function pulseButton(target) {
    window.clearTimeout(popTimerRef.current);
    setPopTarget(target);
    popTimerRef.current = window.setTimeout(() => setPopTarget(""), 320);
  }

  function toggleSearch() {
    pulseButton("search");
    setSearchOpen((open) => !open);
    setMenuOpen(false);
  }

  function toggleMenu() {
    pulseButton("menu");
    setMenuOpen((open) => !open);
    setSearchOpen(false);
  }

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(popTimerRef.current);
    };
  }, []);

  return (
    <div className="mobile-site-controls">
      <div className="mobile-site-actions">
        <button
          aria-controls="mobile-site-search-panel"
          aria-expanded={searchOpen}
          aria-label={searchOpen ? "Close search" : "Open search"}
          className={`mobile-icon-button${searchOpen ? " is-active" : ""}${popTarget === "search" ? " is-popping" : ""}`}
          type="button"
          onClick={toggleSearch}
        >
          <SearchIcon />
        </button>
        <button
          aria-controls="mobile-site-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`mobile-icon-button${menuOpen ? " is-active" : ""}${popTarget === "menu" ? " is-popping" : ""}`}
          type="button"
          onClick={toggleMenu}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {searchOpen ? (
        <section id="mobile-site-search-panel" className="mobile-site-panel mobile-search-panel" aria-label="Site search">
          <label className="sr-only" htmlFor="mobile-site-search">
            Search the site
          </label>
          <input
            autoFocus
            ref={inputRef}
            id="mobile-site-search"
            className="mobile-search-input"
            type="search"
            value={query}
            placeholder="Search posts, pages, places..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="mobile-search-results" role="list">
            {results.length ? results.map((item) => (
              <Link className="mobile-search-result" href={item.href} key={`${item.href}-${item.title}`} role="listitem" onClick={closePanels}>
                <span>{item.type}</span>
                <strong>{item.title}</strong>
                {item.description ? <small>{item.description}</small> : null}
              </Link>
            )) : (
              <p className="mobile-search-empty">No results yet.</p>
            )}
          </div>
        </section>
      ) : null}

      {menuOpen ? (
        <nav id="mobile-site-menu" className="mobile-site-panel mobile-menu-panel" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href} onClick={closePanels}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
