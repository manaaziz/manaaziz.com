import Link from "next/link";
import FeatureCarousel from "@/components/FeatureCarousel";
import LocalizedHello from "@/components/LocalizedHello";
import { getRecentPosts, getSeriesSummaries } from "@/lib/posts";
import HomeGlobalExperience from "./HomeGlobalExperience";
import WorkMixChart from "./about/WorkMixChart";

const workAreas = [
  {
    id: "consulting",
    href: "/consulting",
    label: "Consulting",
    title: "Helping companies leverage data and AI.",
    body: "Applied data science, AI, forecasting, reporting, and analytics work for casino and hospitality operators."
  },
  {
    id: "research",
    href: "/research",
    label: "Research",
    title: "Data-driven, industry-relevant research.",
    body: "Machine learning, revenue management, gaming analytics, demand forecasting, and hospitality technology."
  },
  {
    id: "teaching",
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
      href: post.href,
      title: post.title,
      excerpt: post.excerpt,
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

      <WorkMixChart id="selected-areas" items={workAreas} />

      <HomeGlobalExperience />

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
