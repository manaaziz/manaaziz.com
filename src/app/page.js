import Link from "next/link";
import LocalizedHello from "@/components/LocalizedHello";

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

const manalogueHighlights = [
  {
    href: "/manalogue",
    label: "The Manalogue",
    title: "A home for writing, media, podcasts, and visual archives.",
    body: "The current desk for essays, analytics notes, teaching material, podcast projects, and gallery-style archives."
  },
  {
    href: "/podcast/the-job-forum",
    label: "Podcast",
    title: "The Job Forum",
    body: "Recent graduates, careers, and the transition into work."
  },
  {
    href: "/research",
    label: "Research",
    title: "Published work and conference presentations.",
    body: "Papers, methods, presentation archives, and the research questions connecting hospitality, gaming, and analytics."
  }
];

export default function Home() {
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
            <Link className="button" href="/manalogue">
              The Manalogue
            </Link>
            <a className="button" href="/assets/Azizsoltani_CV.pdf">
              CV
            </a>
            <a className="button" href="mailto:manaazizsoltani@gmail.com">
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
          <p className="eyebrow">Media</p>
          <h2>The Manalogue is the home for current writing, podcasts, and archives.</h2>
          <Link className="button" href="/manalogue">
            Open The Manalogue
          </Link>
        </div>
        <div className="home-stream-list">
          {manalogueHighlights.map((item) => (
            <Link className="post-list-item" href={item.href} key={item.href}>
              <span>{item.label}</span>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
