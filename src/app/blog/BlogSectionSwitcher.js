"use client";

import Link from "next/link";
import { useState } from "react";
import { newsItems } from "../news/items";
import { podcasts } from "../podcast/shows";

const sections = [
  { id: "manalogue", label: "The Manalogue" },
  { id: "podcasts", label: "Podcasts" },
  { id: "gallery", label: "Gallery" }
];

const panelHeights = {
  manalogue: "clamp(35rem, 50vw, 47rem)",
  podcasts: "clamp(26rem, 33vw, 31rem)",
  gallery: "clamp(24rem, 31vw, 29rem)"
};

export default function BlogSectionSwitcher({ posts }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = sections[activeIndex];
  const featuredPost = posts[0];
  const frontPagePosts = posts.slice(1, 4);

  return (
    <section className="blog-desk manalogue-desk" aria-labelledby="blog-desk-title">
      <div className="newspaper-masthead manalogue-masthead">
        <div className="newspaper-kicker">
          <span>Wednesday, June 17, 2026</span>
        </div>
        <h1 id="blog-desk-title">The Manalogue</h1>
      </div>

      <div
        className="blog-switcher"
        style={{
          "--active-index": activeIndex,
          "--active-panel-height": panelHeights[activeSection.id],
          "--section-count": sections.length
        }}
      >
        <div className="blog-switcher-bar" role="tablist" aria-label="Media sections">
          {sections.map((section, index) => (
            <button
              aria-controls={`blog-panel-${section.id}`}
              aria-selected={activeSection.id === section.id}
              id={`blog-tab-${section.id}`}
              key={section.id}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="blog-switcher-window">
          <div className="blog-switcher-track">
            <section
              aria-labelledby="blog-tab-manalogue"
              className="blog-switcher-panel newspaper-panel manalogue-panel"
              id="blog-panel-manalogue"
              role="tabpanel"
            >
              <div className="media-newspaper newspaper-page">
                <section className="newspaper-front-page" aria-label="The Manalogue front page">
                  <div className="newspaper-edition-strip">
                    <span>Blog</span>
                    <span>In the News</span>
                    <span>Gaming</span>
                    <span>Analytics</span>
                    <span>Field Notes</span>
                  </div>

                  <div className="manalogue-grid">
                    {featuredPost ? (
                      <Link className="newspaper-article lead" href={featuredPost.href}>
                        <span>{featuredPost.seriesTitle} · {featuredPost.date}</span>
                        <img src={featuredPost.cover || featuredPost.seriesCover} alt="" />
                        <h2>{featuredPost.title}</h2>
                        <p>{featuredPost.excerpt}</p>
                        <strong>Read column</strong>
                      </Link>
                    ) : null}

                    <aside className="newspaper-rail" aria-label="The Manalogue rail">
                      {newsItems.map((item) => (
                        <a href={item.href} key={item.href} rel="noreferrer" target="_blank">
                          <span>{item.outlet} · {item.date}</span>
                          <h2>{item.title}</h2>
                          <p>{item.description}</p>
                          <strong>Read article</strong>
                        </a>
                      ))}
                    </aside>

                    <div className="manalogue-briefs" aria-label="Recent Manalogue posts">
                      {frontPagePosts.map((post) => (
                        <Link href={post.href} key={post.href}>
                          <span>{post.seriesTitle} · {post.readingMinutes} min</span>
                          <h3>{post.title}</h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </section>

            <section
              aria-labelledby="blog-tab-podcasts"
              className="blog-switcher-panel podcasts"
              id="blog-panel-podcasts"
              role="tabpanel"
            >
              <div className="blog-podcast-heading">
                <p className="eyebrow">Podcasts</p>
                <h2>Two shows</h2>
              </div>
              <div className="blog-podcast-list">
                {podcasts.map((podcast) => (
                  <Link className="blog-podcast-card" href={`/podcast/${podcast.slug}`} key={podcast.title}>
                    <span>{podcast.eyebrow}</span>
                    <h3>{podcast.title}</h3>
                    <p>{podcast.description}</p>
                    <strong>Open show page</strong>
                  </Link>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="blog-tab-gallery"
              className="blog-switcher-panel split"
              id="blog-panel-gallery"
              role="tabpanel"
            >
              <article className="blog-text-panel">
                <span>Gallery</span>
                <h2>Visual archive</h2>
                <p>
                  A visual home for research presentations, teaching, student leadership, travel, wine, hospitality, and community work.
                </p>
                <Link className="button" href="/gallery">
                  Open gallery
                </Link>
              </article>
              <div className="blog-note-stack" aria-hidden="true">
                <span>Research</span>
                <span>Teaching</span>
                <span>Travel</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
