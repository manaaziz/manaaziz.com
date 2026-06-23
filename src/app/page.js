import Link from "next/link";
import FeatureCarousel from "@/components/FeatureCarousel";
import LocalizedHello from "@/components/LocalizedHello";
import { getRecentPosts, getSeriesSummaries } from "@/lib/posts";

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
  const series = getSeriesSummaries();
  const recentPosts = getRecentPosts(8).map((post) => {
    const seriesInfo = series.find((item) => item.seriesSlug === post.seriesSlug);
    return {
      ...post,
      image: post.previewImage || post.cover || seriesInfo?.cover || "/assets/images/phdblog-cover.jpg",
      imageAlt: "",
      dateLabel: post.date,
      label: "Read post",
      topic: post.seriesTitle || "The Manalogue",
      seriesCover: seriesInfo?.cover || "/assets/images/phdblog-cover.jpg"
    };
  });

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

        <div className="portrait-panel" aria-label="Portrait of Mana Azizsoltani">
          <img className="home-portrait" src="/assets/images/mana_home_portrait_bw_cutout.png" alt="Mana Azizsoltani" />
        </div>

        <a className="scroll-cue" href="#selected-areas">
          Scroll down
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="section-intro home-about reveal" id="selected-areas">
        <p className="eyebrow">About</p>
        <h2>Get to know me a little bit more.</h2>
        <div className="home-about-tile">
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
        <div className="section-intro home-stream-heading">
          <p className="eyebrow">Manalogue</p>
          <h2>The Manalogue is the home for all things Mana.</h2>
          <Link className="button" href="/manalogue">
            Open The Manalogue
          </Link>
        </div>
        <FeatureCarousel
          ariaLabel="Latest post carousel controls"
          items={recentPosts}
          variant="blog"
        />
      </section>
    </main>
  );
}
