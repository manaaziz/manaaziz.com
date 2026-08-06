"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { newsItems } from "../news/items";
import { podcasts } from "../podcast/shows";

const sections = [
  { id: "home", label: "Home Page" },
  { id: "analytics", label: "Analysis" },
  { id: "research", label: "Research" },
  { id: "teaching", label: "Teaching" },
  { id: "travel", label: "Travel" },
  { id: "podcasts", label: "Podcasts" },
  { id: "gallery", label: "Gallery" }
];

const sectionLabels = Object.fromEntries(sections.map((section) => [section.id, section.label]));

function formatMastheadDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

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
  const knownTopics = [
    ["analytics", "Analysis"],
    ["research", "Research"],
    ["teaching", "Teaching"],
    ["travel", "Travel"],
    ["consulting", "Consulting"]
  ];
  const tagSet = new Set(post.tags.map((item) => item.toLowerCase()));
  const topic = knownTopics.find(([key]) => tagSet.has(key));
  return topic ? topic[1] : "The Manalogue";
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

function panelStoriesForMobile(panel) {
  if (panel.layout === "photo-mosaic") {
    return (panel.photos || []).map((photo) => ({
      topic: photo.place || "Gallery",
      title: photo.title,
      excerpt: photo.preview || photo.series || "",
      href: photo.href,
      image: photo.image,
      action: "View gallery",
      date: photo.date
    }));
  }

  return panel.stories || [];
}

function MobileStoryShell({ story, variant, children }) {
  const className = `manalogue-mobile-story ${story.image ? "has-image" : "no-image"}`;

  if (story.external) {
    return (
      <a className={className} data-variant={variant} href={story.href} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  if (story.href) {
    return (
      <Link className={className} data-variant={variant} href={story.href}>
        {children}
      </Link>
    );
  }

  return (
    <article className={className} data-variant={variant}>
      {children}
    </article>
  );
}

function ManalogueMobileStory({ story, variant = "row" }) {
  return (
    <MobileStoryShell story={story} variant={variant}>
      {story.image ? (
        <div className="manalogue-mobile-story-image">
          <img src={story.image} alt="" loading={variant === "lead" ? "eager" : "lazy"} decoding="async" />
        </div>
      ) : null}
      <div className="manalogue-mobile-story-copy">
        <span className="manalogue-mobile-story-meta">{story.topic}</span>
        <h3>{story.title}</h3>
        {variant === "lead" && story.excerpt ? <p>{story.excerpt}</p> : null}
        <p className="manalogue-mobile-byline">
          By <strong>Mana Azizsoltani</strong>
          {story.minutes ? ` · ${story.minutes} min read` : ""}
        </p>
      </div>
    </MobileStoryShell>
  );
}

function ManalogueMobileFeed({ panels, activeIndex, onChange }) {
  const panel = panels[activeIndex] || panels[0];
  const stories = panelStoriesForMobile(panel);
  const [lead, ...rest] = stories;

  return (
    <div className="manalogue-mobile-feed" aria-label="Mobile Manalogue stories">
      <label className="manalogue-mobile-section-select">
        <span>Section</span>
        <select aria-label="Choose Manalogue section" value={activeIndex} onChange={(event) => onChange(Number(event.target.value))}>
          {panels.map((panel, index) => (
            <option key={panel.id} value={index}>
              {sectionLabels[panel.id] || panel.title}
            </option>
          ))}
        </select>
      </label>
      <div className="manalogue-mobile-story-list">
        {lead ? <ManalogueMobileStory story={lead} variant="lead" /> : null}
        {rest.slice(0, 12).map((story, index) => (
          <ManalogueMobileStory key={`mobile-${panel.id}-${story.href || story.title}-${index}`} story={story} />
        ))}
      </div>
    </div>
  );
}

function EditorialStoryShell({ story, className, children }) {
  if (story.external) {
    return <a className={className} href={story.href} rel="noreferrer" target="_blank">{children}</a>;
  }
  return <Link className={className} href={story.href}>{children}</Link>;
}

function EditorialStoryCard({ story, variant = "standard", eager = false }) {
  return (
    <EditorialStoryShell story={story} className={`manalogue-editorial-card is-${variant}`}>
      {story.image ? (
        <figure className="manalogue-editorial-image">
          <img src={story.image} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />
        </figure>
      ) : null}
      <div className="manalogue-editorial-copy">
        <span>{story.topic}</span>
        <h2>{story.title}</h2>
        {variant !== "latest" && story.excerpt ? <p>{story.excerpt}</p> : null}
        <strong>By Mana Azizsoltani{story.minutes ? ` · ${story.minutes} min read` : ""}</strong>
      </div>
    </EditorialStoryShell>
  );
}

function EditorialSection({ panel }) {
  const stories = panelStoriesForMobile(panel).slice(0, 4);
  if (!stories.length) return null;

  return (
    <section className="manalogue-editorial-section" id={`manalogue-${panel.id}`}>
      <div className="manalogue-editorial-section-heading">
        <h2>{sectionLabels[panel.id] || panel.title}</h2>
        <a href="#manalogue-top">Back to top ↑</a>
      </div>
      <div className="manalogue-editorial-grid">
        {stories.map((story, index) => (
          <EditorialStoryCard key={`${panel.id}-${story.href || story.title}-${index}`} story={story} />
        ))}
      </div>
    </section>
  );
}

function ManalogueEditorialLanding({ panels }) {
  const homePanel = panels.find((panel) => panel.id === "home") || panels[0];
  const frontStories = panelStoriesForMobile(homePanel);
  const lead = frontStories[0];
  const supporting = frontStories.slice(1, 3);
  const latest = frontStories.slice(3, 7);
  const sectionPanels = panels.filter((panel) => panel.id !== "home");
  const mustReads = frontStories.filter((story) => story.image).slice(0, 2);

  return (
    <div className="manalogue-editorial" id="manalogue-top">
      <nav className="manalogue-editorial-nav" aria-label="Manalogue sections">
        {sections.map((section) => (
          <a href={section.id === "home" ? "#manalogue-top" : `#manalogue-${section.id}`} key={section.id}>
            {section.label}
          </a>
        ))}
      </nav>

      <section className="manalogue-editorial-front" aria-label="Featured Manalogue stories">
        <div className="manalogue-editorial-supporting">
          {supporting.map((story, index) => (
            <EditorialStoryCard key={`${story.href}-${index}`} story={story} variant="supporting" eager={index === 0} />
          ))}
        </div>
        {lead ? <div className="manalogue-editorial-lead"><EditorialStoryCard story={lead} variant="lead" eager /></div> : null}
        <aside className="manalogue-editorial-latest" aria-labelledby="manalogue-latest-title">
          <h2 id="manalogue-latest-title">The Latest</h2>
          <div>
            {latest.map((story, index) => <EditorialStoryCard key={`${story.href}-${index}`} story={story} variant="latest" />)}
          </div>
        </aside>
      </section>

      {sectionPanels.slice(0, 3).map((panel) => <EditorialSection key={panel.id} panel={panel} />)}

      {mustReads.length ? (
        <section className="manalogue-editorial-section manalogue-must-reads" aria-labelledby="manalogue-must-reads-title">
          <div className="manalogue-editorial-section-heading"><h2 id="manalogue-must-reads-title">Must Reads</h2></div>
          <div className="manalogue-must-read-grid">
            {mustReads.map((story, index) => <EditorialStoryCard key={`must-read-${story.href}-${index}`} story={story} variant="must-read" />)}
          </div>
        </section>
      ) : null}

      {sectionPanels.slice(3).map((panel) => <EditorialSection key={panel.id} panel={panel} />)}
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
  const [mastheadDate, setMastheadDate] = useState("");

  useEffect(() => {
    setMastheadDate(formatMastheadDate(new Date()));
  }, []);
  const newsItem = newsItems[0];
  const visiblePosts = allPosts.length ? allPosts : posts;
  const analyticsStories = storiesByTag(visiblePosts, "analytics", "Analysis", true);
  const researchStories = storiesByTag(visiblePosts, "research", "Research", true);
  const teachingStories = storiesByTag(visiblePosts, "teaching", "Teaching", true);
  const travelPostStories = storiesByTag(visiblePosts, "travel", "Travel", true);
  const frontPageStories = visiblePosts.slice(0, 7).map((post) => postToStory(post, postTopic(post)));
  const travelArchives = [
    {
      topic: "Travel + Teaching",
      title: "Summer School in Spain",
      excerpt: "A city-by-city FAB 333 study-abroad recap from Madrid, Valencia, and Barcelona.",
      href: "/blog/teaching/spain-recap",
      image: "/assets/photos/fab333_madrid/fab_cover.webp",
      action: "Read recap",
      size: "lead"
    },
    {
      topic: "Travel Archive",
      title: "Europe 2023",
      excerpt: "A professional and personal archive from a multi-purpose European summer trip.",
      href: "/blog/travel",
      image: "/assets/images/eu23cover.webp",
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
      href: "/blog/travel/post8",
      image: "/assets/photos/eublog/blog8_1.webp",
      tile: "wide"
    },
    {
      title: "Blog 1 - Europe 2023",
      series: "Europe 2023",
      date: "2023",
      place: "Europe",
      preview: "Photos and field notes from the Europe 2023 archive.",
      href: "/blog/travel/post1",
      image: "/assets/photos/eublog/blog1_2.webp"
    },
    {
      title: "Blog 4 - Europe 2023",
      series: "Europe 2023",
      date: "2023",
      place: "Europe",
      preview: "A visual entry from the European travel archive.",
      href: "/blog/travel/post4",
      image: "/assets/photos/eublog/blog4_4.webp",
      tile: "wide"
    },
    {
      title: "Blog 7 - Europe 2023",
      series: "Europe 2023",
      date: "2023",
      place: "Europe",
      preview: "Another photo-forward stop from the Europe 2023 posts.",
      href: "/blog/travel/post7",
      image: "/assets/photos/eublog/blog7_3.webp"
    },
    {
      title: "Betting and Digital Assets Conference",
      series: "Research",
      date: "2026",
      place: "Belmont",
      preview: "Conference presentation moments from the betting, data, and analytics side of the work.",
      href: "/research",
      image: "/assets/photos/mana_belmont_bdaic.webp",
      tile: "wide"
    },
    {
      title: "UMAC Research Presentation",
      series: "Research",
      date: "2026",
      place: "Las Vegas",
      preview: "Presentation photos from research conversations around gaming, data, and hospitality analytics.",
      href: "/research",
      image: "/assets/photos/mana_davis_umac.webp"
    },
    {
      title: "URJC Research Visit",
      series: "Research",
      date: "2026",
      place: "Madrid",
      preview: "A research and teaching stop from the international side of the archive.",
      href: "/research",
      image: "/assets/photos/urjc_mana.webp"
    },
    {
      title: "UMAC Session",
      series: "Research",
      date: "2026",
      place: "Las Vegas",
      preview: "More presentation-room texture for the gallery view.",
      href: "/research",
      image: "/assets/photos/mana_umac.webp",
      tile: "wide"
    }
  ];
  const topicPanels = [
    {
      id: "home",
      kicker: "Front Page",
      title: "The current front page of the work",
      showTitle: false,
      layout: "newspaper-front",
      stories: frontPageStories.length ? frontPageStories : [
        newsItem
          ? {
              topic: "Analytics",
              title: newsItem.title,
              excerpt: newsItem.description,
              href: newsItem.href,
              image: "/assets/images/l_vcover.webp",
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
          image: "/assets/photos/conf_gambling_risk_2023.webp",
          action: "Open research",
          size: "wide"
        },
        {
          topic: "Teaching",
          title: "Course homes and classroom materials",
          excerpt: "Course pages, syllabi, learning objectives, assignments, grading structures, and teaching resources.",
          href: "/teaching",
          image: "/assets/images/grad_pic.webp",
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
          href: "/blog/travel",
          image: "/assets/images/eu23cover.webp",
          action: "Open travel",
          size: "standard"
        }
      ].filter(Boolean)
    },
    {
      id: "analytics",
      kicker: "Analysis Desk",
      title: "Gaming, hospitality, data, and decision-making",
      stories: analyticsStories.length ? analyticsStories : [
        newsItem
          ? {
              topic: "In the News",
              title: newsItem.title,
              excerpt: newsItem.description,
              href: newsItem.href,
              image: "/assets/images/l_vcover.webp",
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
          image: "/assets/images/consultant_pic.webp",
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
          image: "/assets/photos/conf_gambling_risk_2023.webp",
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
          image: "/assets/images/grad_pic.webp",
          action: "Open teaching",
          size: "lead"
        }),
        fallbackStory({
          topic: "Course Home",
          title: "Culture and Cuisine",
          excerpt: "A student-facing course home built around foodways, cultural context, assignments, and embedded course materials.",
          href: "/teaching/fab-333-culture-and-cuisine",
          image: "/assets/images/barcapic.webp",
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
          <span>{mastheadDate}</span>
        </div>
        <h1 id="blog-desk-title">The Manalogue</h1>
      </div>

      <ManalogueEditorialLanding panels={topicPanels} />
    </section>
  );
}
