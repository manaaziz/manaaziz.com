"use client";

import Link from "next/link";
import { useState } from "react";
import { newsItems } from "../news/items";
import { podcasts } from "../podcast/shows";

const sections = [
  { id: "home", label: "Front Page" },
  { id: "teaching", label: "Teaching" },
  { id: "analytics", label: "Analytics" },
  { id: "research", label: "Research" },
  { id: "opinion", label: "Opinion" },
  { id: "field-notes", label: "Field Notes" },
  { id: "podcasts", label: "Podcasts" },
  { id: "gallery", label: "Gallery" }
];

const panelHeights = {
  home: "clamp(33rem, 48vw, 43rem)",
  teaching: "clamp(26rem, 38vw, 34rem)",
  analytics: "clamp(26rem, 38vw, 34rem)",
  research: "clamp(26rem, 38vw, 34rem)",
  opinion: "clamp(26rem, 38vw, 34rem)",
  "field-notes": "clamp(26rem, 38vw, 34rem)",
  podcasts: "clamp(24rem, 34vw, 31rem)",
  gallery: "clamp(24rem, 34vw, 31rem)"
};

function StoryCard({ story }) {
  const content = (
    <>
      {story.image ? <img src={story.image} alt="" /> : null}
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

export default function BlogSectionSwitcher({ posts }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = sections[activeIndex];
  const featuredPost = posts[0];
  const phdPost = posts.find((post) => post.seriesSlug === "becoming-dr-mana") || posts[0];
  const europePost = posts.find((post) => post.seriesSlug === "europe-2023") || posts[1];
  const barcelonaPost = posts.find((post) => post.seriesSlug === "barcelona") || posts[2];
  const newsItem = newsItems[0];
  const topicPanels = [
    {
      id: "home",
      kicker: "Front Page",
      title: "Featured stories from research, teaching, media, and the work around it",
      layout: "front",
      stories: [
        featuredPost
          ? {
              topic: "Latest",
              title: featuredPost.title,
              excerpt: featuredPost.excerpt,
              href: featuredPost.href,
              image: featuredPost.cover || featuredPost.seriesCover,
              action: "Read story",
              size: "lead"
            }
          : null,
        newsItem
          ? {
              topic: "Analytics",
              title: newsItem.title,
              excerpt: newsItem.description,
              href: newsItem.href,
              image: "/assets/images/LVcover.png",
              action: "Read coverage",
              size: "wide",
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
          size: "standard"
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
              href: `/podcast/${podcasts[0].slug}`,
              image: "/assets/images/TJF1.jpg",
              action: "Open show",
              size: "standard"
            }
          : null,
        {
          topic: "Gallery",
          title: "A more personal bulletin board",
          excerpt: "Photos, places, quotes, people, travel, and the smaller things worth keeping.",
          href: "/gallery",
          image: "/assets/gallery/CEOE_2025.jpg",
          action: "Open gallery",
          size: "standard"
        }
      ].filter(Boolean)
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
        },
        phdPost
          ? {
              topic: "Academic Life",
              title: phdPost.title,
              excerpt: phdPost.excerpt,
              href: phdPost.href,
              image: phdPost.cover || phdPost.seriesCover,
              action: "Read essay",
              size: "standard"
            }
          : null
      ].filter(Boolean)
    },
    {
      id: "opinion",
      kicker: "Opinion Desk",
      title: "Essays, reflections, and point-of-view writing",
      stories: [
        barcelonaPost
          ? {
              topic: "Opinion",
              title: barcelonaPost.title,
              excerpt: barcelonaPost.excerpt,
              href: barcelonaPost.href,
              image: barcelonaPost.cover || barcelonaPost.seriesCover,
              action: "Read column",
              size: "lead"
            }
          : null,
        phdPost
          ? {
              topic: "Reflection",
              title: phdPost.title,
              excerpt: phdPost.excerpt,
              href: phdPost.href,
              image: phdPost.cover || phdPost.seriesCover,
              action: "Read essay",
              size: "standard"
            }
          : null
      ].filter(Boolean)
    },
    {
      id: "field-notes",
      kicker: "Field Notes",
      title: "Travel archives, observations, and life around the work",
      stories: [
        featuredPost
          ? {
              topic: "Latest Note",
              title: featuredPost.title,
              excerpt: featuredPost.excerpt,
              href: featuredPost.href,
              image: featuredPost.cover || featuredPost.seriesCover,
              action: "Read note",
              size: "lead"
            }
          : null,
        europePost
          ? {
              topic: "Travel",
              title: europePost.title,
              excerpt: europePost.excerpt,
              href: europePost.href,
              image: europePost.cover || europePost.seriesCover,
              action: "Read archive",
              size: "standard"
            }
          : null
      ].filter(Boolean)
    },
    {
      id: "podcasts",
      kicker: "Podcast Desk",
      title: "Two shows, each with its own home",
      stories: podcasts.map((podcast) => ({
        topic: podcast.eyebrow,
        title: podcast.title,
        excerpt: podcast.description,
        href: `/podcast/${podcast.slug}`,
        image: "/assets/images/TJF1.jpg",
        action: "Open show page",
        size: "standard"
      }))
    },
    {
      id: "gallery",
      kicker: "Gallery Desk",
      title: "A bulletin board for photos, places, ideas, and things worth keeping",
      stories: [
        {
          topic: "Gallery",
          title: "Visual archive and personal bulletin board",
          excerpt:
            "A more personal space for travel, conference photos, quotes, people I look up to, teaching moments, hospitality, and research-adjacent memories.",
          href: "/gallery",
          image: "/assets/gallery/CEOE_2025.jpg",
          action: "Open gallery",
          size: "lead"
        }
      ]
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
                className="blog-switcher-panel newspaper-panel manalogue-panel"
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

                    <div className="manalogue-topic-grid" data-count={panel.stories.length} data-layout={panel.layout || "topic"}>
                      {panel.stories.map((story) => (
                        <StoryCard key={`${story.topic}-${story.title}`} story={story} />
                      ))}
                    </div>
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
