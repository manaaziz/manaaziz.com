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
  home: "clamp(42rem, 60vw, 54rem)",
  analytics: "clamp(29rem, 42vw, 37rem)",
  research: "clamp(29rem, 42vw, 37rem)",
  teaching: "clamp(29rem, 42vw, 37rem)",
  travel: "clamp(29rem, 42vw, 37rem)",
  podcasts: "clamp(26rem, 38vw, 34rem)",
  gallery: "clamp(35rem, 52vw, 45rem)"
};

function StoryCard({ story }) {
  const content = (
    <>
      {story.image ? <img src={story.image} alt="" loading="lazy" decoding="async" /> : null}
      <span>{story.topic}</span>
      <h2>{story.title}</h2>
      <p>{story.excerpt}</p>
      <strong className={story.actionStyle === "button" ? "button button-small" : undefined}>{story.action}</strong>
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

function postToStory(post, topic) {
  return {
    topic,
    title: post.title,
    excerpt: post.excerpt,
    href: post.href,
    image: post.previewImage || post.cover || post.images[0] || post.seriesCover,
    action: "Read post",
    size: "standard",
    date: post.date,
    minutes: post.readingMinutes,
    tags: post.tags || []
  };
}

function postTopic(post) {
  const knownTopics = ["teaching", "analytics", "research", "travel", "consulting"];
  const tag = post.tags.find((item) => knownTopics.includes(item.toLowerCase()));
  return tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : "The Manalogue";
}

function formatStoryDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function storyMeta(story) {
  return [story.topic, formatStoryDate(story.date), story.minutes ? `${story.minutes} min read` : ""].filter(Boolean).join(" · ");
}

function NewspaperStory({ story, variant = "brief" }) {
  const content = (
    <>
      {story.image ? (
        <div className="manalogue-paper-image">
          <img src={story.image} alt="" loading={variant === "lead" ? "eager" : "lazy"} decoding="async" />
        </div>
      ) : null}
      <div className="manalogue-paper-copy">
        <span>{storyMeta(story)}</span>
        <h3>{story.title}</h3>
        <p>{story.excerpt}</p>
        <strong>{story.action || "Read post"}</strong>
      </div>
    </>
  );

  if (story.external) {
    return (
      <a className="manalogue-paper-story" data-variant={variant} href={story.href} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link className="manalogue-paper-story" data-variant={variant} href={story.href}>
      {content}
    </Link>
  );
}

function NewspaperFrontPage({ stories }) {
  const frontStories = stories.slice(0, 7);
  const [lead, feature, ...briefs] = frontStories;

  return (
    <div className="manalogue-newspaper-front">
      {lead ? <NewspaperStory story={lead} variant="lead" /> : null}
      <div className="manalogue-paper-briefs">
        {briefs.slice(0, 2).map((story) => (
          <NewspaperStory key={`${story.topic}-${story.title}`} story={story} />
        ))}
      </div>
      {feature ? <NewspaperStory story={feature} variant="feature" /> : null}
      <div className="manalogue-paper-strip">
        {briefs.slice(2, 5).map((story) => (
          <NewspaperStory key={`${story.topic}-${story.title}`} story={story} variant="compact" />
        ))}
      </div>
    </div>
  );
}

function storiesByTag(posts, tag, topic, leadFirst = false) {
  const tagKey = tag.toLowerCase();
  const stories = posts
    .filter((post) => post.tags.some((item) => item.toLowerCase() === tagKey))
    .map((post) => postToStory(post, topic));

  if (leadFirst && stories.length) {
    stories[0] = { ...stories[0], size: "lead" };
  }

  return stories;
}

function fallbackStory({ topic, title, excerpt, href, image, action = "Open", size = "lead" }) {
  return { topic, title, excerpt, href, image, action, size };
}

export default function BlogSectionSwitcher({ allPosts = [], posts = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = sections[activeIndex];
  const newsItem = newsItems[0];
  const visiblePosts = allPosts.length ? allPosts : posts;
  const analyticsStories = storiesByTag(visiblePosts, "analytics", "Analytics", true);
  const researchStories = storiesByTag(visiblePosts, "research", "Research", true);
  const teachingStories = storiesByTag(visiblePosts, "teaching", "Teaching", true);
  const travelPostStories = storiesByTag(visiblePosts, "travel", "Travel", true);
  const frontPageStories = visiblePosts.slice(0, 7).map((post) => postToStory(post, postTopic(post)));
  const travelArchives = [
    {
      topic: "Travel + Teaching",
      title: "Spain Recap",
      excerpt: "A city-by-city FAB 333 study-abroad recap from Madrid, Valencia, and Barcelona.",
      href: "/blog/spain-2025/spain-recap",
      image: "/assets/photos/fab333_reunion_group.jpg",
      action: "Read recap",
      size: "lead"
    },
    {
      topic: "Travel Archive",
      title: "Europe 2023",
      excerpt: "A professional and personal archive from a multi-purpose European summer trip.",
      href: "/blog/europe-2023",
      image: "/assets/images/EU23cover.jpg",
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
      image: "/assets/photos/eublog/blog8_1.jpg",
      tile: "wide"
    },
    {
      title: "Blog 1 - Europe 2023",
      series: "Europe 2023",
      date: "2023",
      place: "Europe",
      preview: "Photos and field notes from the Europe 2023 archive.",
      href: "/blog/europe-2023/Post1",
      image: "/assets/photos/eublog/blog1_2.jpg"
    },
    {
      title: "Blog 4 - Europe 2023",
      series: "Europe 2023",
      date: "2023",
      place: "Europe",
      preview: "A visual entry from the European travel archive.",
      href: "/blog/europe-2023/Post4",
      image: "/assets/photos/eublog/blog4_4.jpg",
      tile: "wide"
    },
    {
      title: "Blog 7 - Europe 2023",
      series: "Europe 2023",
      date: "2023",
      place: "Europe",
      preview: "Another photo-forward stop from the Europe 2023 posts.",
      href: "/blog/europe-2023/Post7",
      image: "/assets/photos/eublog/blog7_3.jpg"
    }
  ];
  const topicPanels = [
    {
      id: "home",
      kicker: "Front Page",
      title: "The current front page of the work",
      layout: "newspaper-front",
      stories: frontPageStories.length ? frontPageStories : [
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
          image: "/assets/photos/ICGRT_2023.jpeg",
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
      stories: analyticsStories.length ? analyticsStories : [
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
      stories: researchStories.length ? researchStories : [
        fallbackStory({
          topic: "Research",
          title: "Published work and conference presentations",
          excerpt:
            "A mosaic of journals, working papers, presentation archives, research questions, and the methods connecting them.",
          href: "/research",
          image: "/assets/photos/ICGRT_2023.jpeg",
          action: "Open research",
          size: "lead"
        })
      ]
    },
    {
      id: "teaching",
      kicker: "Teaching Desk",
      title: "Courses, classrooms, and student-facing materials",
      stories: teachingStories.length ? teachingStories : [
        fallbackStory({
          topic: "Teaching",
          title: "Course homes, syllabi, assignments, and class media",
          excerpt:
            "A practical home for course pages, learning objectives, grading structures, schedules, materials, and the classroom systems behind them.",
          href: "/teaching",
          image: "/assets/images/grad_pic.jpeg",
          action: "Open teaching",
          size: "lead"
        }),
        fallbackStory({
          topic: "Course Home",
          title: "Culture and Cuisine",
          excerpt: "A student-facing course home built around foodways, cultural context, assignments, and embedded course materials.",
          href: "/teaching/fab-333-culture-and-cuisine",
          image: "/assets/images/barcapic.jpg",
          action: "Open course",
          size: "standard"
        })
      ]
    },
    {
      id: "travel",
      kicker: "Travel Archive",
      title: "Tales from far and wide",
      stories: travelPostStories.length ? travelPostStories : travelArchives
    },
    {
      id: "podcasts",
      kicker: "Podcast Desk",
      title: "Two shows, each with its own home",
      layout: "podcasts",
      stories: podcasts.map((podcast) => ({
        topic: podcast.eyebrow,
        title: podcast.title,
        excerpt: podcast.description,
        href: podcast.spotifyHref,
        image: podcast.logo,
        action: "Listen on Spotify",
        actionStyle: "button",
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
                      <h2>{panel.title}</h2>
                    </div>

                    {panel.layout === "photo-mosaic" ? (
                      <PhotoMosaic photos={panel.photos} />
                    ) : panel.layout === "newspaper-front" ? (
                      <NewspaperFrontPage stories={panel.stories} />
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
