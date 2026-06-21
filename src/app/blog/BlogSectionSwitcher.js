"use client";

import Link from "next/link";
import { useState } from "react";
import { newsItems } from "../news/items";
import { podcasts } from "../podcast/shows";

const sections = [
  { id: "home", label: "Home Page" },
  { id: "analytics", label: "Analytics" },
  { id: "research", label: "Research" },
  { id: "teaching", label: "Teaching" },
  { id: "travel", label: "Travel" },
  { id: "podcasts", label: "Podcasts" },
  { id: "gallery", label: "Gallery" }
];

const panelHeights = {
  home: "clamp(33rem, 48vw, 43rem)",
  analytics: "clamp(26rem, 38vw, 34rem)",
  research: "clamp(26rem, 38vw, 34rem)",
  teaching: "clamp(26rem, 38vw, 34rem)",
  travel: "clamp(26rem, 38vw, 34rem)",
  podcasts: "clamp(24rem, 34vw, 31rem)",
  gallery: "clamp(31rem, 44vw, 39rem)"
};

function StoryCard({ story }) {
  const content = (
    <>
      {story.image ? <img src={story.image} alt="" loading="lazy" decoding="async" /> : null}
      <span>{story.topic}</span>
      <h2>{story.title}</h2>
      <p>{story.excerpt}</p>
      <strong>{story.action}</strong>
    </>
  );

  if (story.external) {
    return (
      <a className="manalogue-topic-card" data-size={story.size} href={story.href} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link className="manalogue-topic-card" data-size={story.size} href={story.href}>
      {content}
    </Link>
  );
}

function PhotoMosaic({ photos }) {
  return (
    <div className="presentation-gallery manalogue-photo-mosaic">
      {photos.map((photo) => (
        <Link
          className={`presentation-photo-card presentation-tile-${photo.tile || "standard"}`}
          href={photo.href}
          key={`${photo.href}-${photo.image}`}
        >
          <div className="presentation-photo-surface">
            <div className="presentation-photo-placeholder has-photo">
              <img className="presentation-photo-image is-photo" src={photo.image} alt="" loading="lazy" decoding="async" />
              <span>{photo.series}</span>
            </div>
            <div className="presentation-photo-copy">
              <div className="presentation-hover-meta">
                <span>{photo.place}</span>
                <time>{photo.date}</time>
              </div>
              <p>{photo.preview}</p>
            </div>
          </div>
          <div className="presentation-photo-caption">
            <h3>{photo.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function BlogSectionSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = sections[activeIndex];
  const newsItem = newsItems[0];
  const travelArchives = [
    {
      topic: "Travel Archive",
      title: "Europe 2023",
      excerpt: "A professional and personal archive from a multi-purpose European summer trip.",
      href: "/blog/europe-2023",
      image: "/assets/images/EU23cover.jpg",
      action: "Open archive",
      size: "lead"
    },
    {
      topic: "Travel Archive",
      title: "Americanito in Barcelona",
      excerpt: "The older week-by-week archive from life abroad in Spain, kept here without taking over the front page.",
      href: "/blog/barcelona",
      image: "/assets/images/barcapic.jpg",
      action: "Open archive",
      size: "standard"
    },
    {
      topic: "Academic Archive",
      title: "Becoming Dr. Mana",
      excerpt: "Older doctoral-life writing, archived as part of the broader Manalogue record.",
      href: "/blog/becoming-dr-mana",
      image: "/assets/images/phdblog-cover.jpg",
      action: "Open archive",
      size: "standard"
    }
  ];
  const galleryPhotos = [
    {
      title: "Blog 8 - Barcelona",
      series: "Europe 2023",
      date: "2023-06-22",
      place: "Barcelona",
      preview: "A travel note from Barcelona and the return of an older thread in the Manalogue archive.",
      href: "/blog/europe-2023/Post8",
      image: "/assets/EUblog/images/blog8_1.jpg",
      tile: "wide"
    },
    {
      title: "Week 1 - Pivoting",
      series: "Barcelona",
      date: "2021-09-21",
      place: "Barcelona",
      preview: "The opening week of the Americanito in Barcelona archive.",
      href: "/blog/barcelona/Week-1",
      image: "/assets/images/barcapic.jpg"
    },
    {
      title: "Blog 1 - Europe 2023",
      series: "Europe 2023",
      date: "2023",
      place: "Europe",
      preview: "Photos and field notes from the Europe 2023 archive.",
      href: "/blog/europe-2023/Post1",
      image: "/assets/EUblog/images/blog1_2.jpg"
    },
    {
      title: "Blog 4 - Europe 2023",
      series: "Europe 2023",
      date: "2023",
      place: "Europe",
      preview: "A visual entry from the European travel archive.",
      href: "/blog/europe-2023/Post4",
      image: "/assets/EUblog/images/blog4_4.jpg",
      tile: "wide"
    },
    {
      title: "Blog 7 - Europe 2023",
      series: "Europe 2023",
      date: "2023",
      place: "Europe",
      preview: "Another photo-forward stop from the Europe 2023 posts.",
      href: "/blog/europe-2023/Post7",
      image: "/assets/EUblog/images/blog7_3.jpg"
    },
    {
      title: "Becoming Dr. Mana",
      series: "Doctoral Archive",
      date: "Archive",
      place: "Academic Life",
      preview: "Older writing about doctoral work, growth, and academic identity.",
      href: "/blog/becoming-dr-mana/Preface",
      image: "/assets/images/phdblog-cover.jpg"
    }
  ];
  const topicPanels = [
    {
      id: "home",
      kicker: "Front Page",
      title: "The current front page of the work",
      layout: "front",
      stories: [
        newsItem
          ? {
              topic: "Analytics",
              title: newsItem.title,
              excerpt: newsItem.description,
              href: newsItem.href,
              image: "/assets/images/LVcover.png",
              action: "Read coverage",
              size: "lead",
              external: true
            }
          : null,
        {
          topic: "Research",
          title: "Conference presentations and published work",
          excerpt: "A running archive of research questions, methods, papers, and presentation moments.",
          href: "/research",
          image: "/assets/gallery/ICGRT_2023.jpeg",
          action: "Open research",
          size: "wide"
        },
        {
          topic: "Teaching",
          title: "Course homes and classroom materials",
          excerpt: "Course pages, syllabi, learning objectives, assignments, grading structures, and teaching resources.",
          href: "/teaching",
          image: "/assets/images/grad_pic.jpeg",
          action: "Open teaching",
          size: "standard"
        },
        podcasts[0]
          ? {
              topic: "Podcast",
              title: podcasts[0].title,
              excerpt: podcasts[0].description,
              href: podcasts[0].spotifyHref,
              image: podcasts[0].logo,
              action: "Listen on Spotify",
              external: true,
              size: "standard"
            }
          : null,
        {
          topic: "Travel",
          title: "Archived travel writing lives in its own room",
          excerpt: "Older travel and doctoral-life posts are archived under Travel, not promoted as current homepage material.",
          href: "/blog/europe-2023",
          image: "/assets/images/EU23cover.jpg",
          action: "Open travel",
          size: "standard"
        }
      ].filter(Boolean)
    },
    {
      id: "analytics",
      kicker: "Analytics Desk",
      title: "Gaming, hospitality, data, and decision-making",
      stories: [
        newsItem
          ? {
              topic: "In the News",
              title: newsItem.title,
              excerpt: newsItem.description,
              href: newsItem.href,
              image: "/assets/images/LVcover.png",
              action: "Read coverage",
              size: "lead",
              external: true
            }
          : null,
        {
          topic: "Consulting",
          title: "Applied analytics across gaming and hospitality",
          excerpt: "A consulting-oriented view of analytics work, operational questions, and business-facing data projects.",
          href: "/consulting",
          image: "/assets/images/consultant_pic.jpeg",
          action: "Open consulting",
          size: "standard"
        }
      ].filter(Boolean)
    },
    {
      id: "research",
      kicker: "Research Desk",
      title: "Papers, projects, methods, and academic life",
      stories: [
        {
          topic: "Research",
          title: "Published work and conference presentations",
          excerpt:
            "A mosaic of journals, working papers, presentation archives, research questions, and the methods connecting them.",
          href: "/research",
          image: "/assets/gallery/ICGRT_2023.jpeg",
          action: "Open research",
          size: "lead"
        }
      ]
    },
    {
      id: "teaching",
      kicker: "Teaching Desk",
      title: "Courses, classrooms, and student-facing materials",
      stories: [
        {
          topic: "Teaching",
          title: "Course homes, syllabi, assignments, and class media",
          excerpt:
            "A practical home for course pages, learning objectives, grading structures, schedules, materials, and the classroom systems behind them.",
          href: "/teaching",
          image: "/assets/images/grad_pic.jpeg",
          action: "Open teaching",
          size: "lead"
        },
        {
          topic: "Course Home",
          title: "Culture and Cuisine",
          excerpt: "A student-facing course home built around foodways, cultural context, assignments, and embedded course materials.",
          href: "/teaching/fab-333-culture-and-cuisine",
          image: "/assets/images/barcapic.jpg",
          action: "Open course",
          size: "standard"
        }
      ]
    },
    {
      id: "travel",
      kicker: "Travel Archive",
      title: "Older blogs, kept as archive instead of front-page material",
      stories: travelArchives
    },
    {
      id: "podcasts",
      kicker: "Podcast Desk",
      title: "Two shows, each with its own home",
      stories: podcasts.map((podcast) => ({
        topic: podcast.eyebrow,
        title: podcast.title,
        excerpt: podcast.description,
        href: podcast.spotifyHref,
        image: podcast.logo,
        action: "Listen on Spotify",
        external: true,
        size: "standard"
      }))
    },
    {
      id: "gallery",
      kicker: "Photo Archive",
      title: "A visual index into archived Manalogue posts",
      layout: "photo-mosaic",
      photos: galleryPhotos,
      stories: []
    }
  ];

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
        <div className="blog-switcher-bar" role="tablist" aria-label="Manalogue topics">
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
            {topicPanels.map((panel) => (
              <section
                aria-labelledby={`blog-tab-${panel.id}`}
                className={`blog-switcher-panel newspaper-panel manalogue-panel manalogue-panel-${panel.layout || "topic"}`}
                id={`blog-panel-${panel.id}`}
                key={panel.id}
                role="tabpanel"
              >
                <div className="media-newspaper manalogue-topic-page">
                  <section className="manalogue-topic-front" aria-label={`${panel.title} stories`}>
                    <div className="manalogue-topic-heading">
                      <span>{panel.kicker}</span>
                      <h2>{panel.title}</h2>
                    </div>

                    {panel.layout === "photo-mosaic" ? (
                      <PhotoMosaic photos={panel.photos} />
                    ) : (
                      <div className="manalogue-topic-grid" data-count={panel.stories.length} data-layout={panel.layout || "topic"}>
                        {panel.stories.map((story) => (
                          <StoryCard key={`${story.topic}-${story.title}`} story={story} />
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
