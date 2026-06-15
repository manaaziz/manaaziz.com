import Link from "next/link";
import LocalizedHello from "@/components/LocalizedHello";
import { getRecentPosts } from "@/lib/posts";

const workAreas = [
  {
    href: "/consulting",
    label: "Consulting",
    title: "Helping companies leverage data and AI.",
    body: "Applied data science, AI, forecasting, reporting, and analytics work for casino and hospitality operators."
  },
  {
    href: "/research",
    label: "Research",
    title: "Data-driven, industry-relevant research.",
    body: "Machine learning, revenue management, gaming analytics, demand forecasting, and hospitality technology."
  },
  {
    href: "/teaching",
    label: "Teaching",
    title: "Educating and empowering young minds.",
    body: "Statistics, R, forecasting, applied data analysis, entrepreneurship, and student mentorship."
  }
];

export default function Home() {
  const recentPosts = getRecentPosts(4);

  return (
    <main>
      <section className="hero hero-home" aria-label="Mana Azizsoltani introduction">
        <div className="hero-copy">
          <h1 className="hero-greeting">
            <LocalizedHello />
          </h1>
          <p className="hero-signature">- I&apos;m Mana Azizsoltani.</p>
          <p className="lede">
            I am a consultant, researcher, and professor focused on data science and AI solutions in the casino and hospitality industry.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/about">
              About
            </Link>
            <Link className="button" href="/blog">
              Blog
            </Link>
            <a className="button" href="/assets/Azizsoltani_CV.pdf">
              CV
            </a>
            <a className="button" href="mailto:azizsm1@unlv.nevada.edu">
              Email
            </a>
          </div>
        </div>

        <div className="portrait-panel portrait-placeholder" aria-label="Portrait placeholder">
          <span>Portrait coming soon</span>
        </div>

        <a className="scroll-cue" href="#selected-areas">
          Scroll down
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="split-band home-about reveal" id="selected-areas">
        <div>
          <p className="eyebrow">About</p>
          <h2>Get to know me a little bit more.</h2>
        </div>
        <div>
          <p>
            I work at the intersection of hospitality, gaming, data science, AI, research, and teaching. The about page is where the professional story has more room to breathe.
          </p>
          <Link className="button" href="/about">
            About Mana
          </Link>
        </div>
      </section>

      <section className="section-intro reveal">
        <p className="eyebrow">Work</p>
        <h2>Consulting, research, and teaching connected by applied analytics.</h2>
      </section>

      <section className="card-grid home-work-grid">
        {workAreas.map((area) => (
          <Link className="feature-card reveal" href={area.href} key={area.href}>
            <span>{area.label}</span>
            <h3>{area.title}</h3>
            <p>{area.body}</p>
          </Link>
        ))}
      </section>

      <section className="home-stream reveal">
        <div>
          <p className="eyebrow">Latest</p>
          <h2>Writing, podcasts, and field notes.</h2>
          <Link className="button" href="/blog">
            Browse the blog
          </Link>
        </div>
        <div className="home-stream-list">
          {recentPosts.map((post) => (
            <Link className="post-list-item" href={post.href} key={post.href}>
              <span>{post.seriesTitle} - {post.date} - {post.readingMinutes} min read</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </Link>
          ))}
          <Link className="post-list-item home-media-card" href="/podcast">
            <span>Podcast</span>
            <h2>Recent graduates, careers, and the transition into work.</h2>
            <p>A place for the podcast archive and future media appearances to live alongside the writing.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
