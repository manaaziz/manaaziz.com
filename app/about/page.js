import AboutBackgroundTimeline from "./AboutBackgroundTimeline";
import AboutDistanceFromVegas from "./AboutDistanceFromVegas";
import GlobalExperienceMap from "./GlobalExperienceMap";
import WorkMixChart from "./WorkMixChart";
import Link from "next/link";

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <AboutBackgroundTimeline />
      <AboutDistanceFromVegas />

      <section className="work-pathways" id="what-i-do" aria-label="What I do">
        <div className="section-intro">
          <p className="eyebrow">What I do</p>
        </div>

        <div className="pathway-grid" aria-label="Core work areas">
          <Link className="pathway-card" href="/consulting">
            <span>Consulting</span>
            <h2>Helping companies leverage data and AI</h2>
            <p>Applied data science, AI, forecasting, and reporting work for gaming and hospitality teams.</p>
          </Link>
          <Link className="pathway-card" href="/research">
            <span>Research</span>
            <h2>Data-driven, industry-relevant research</h2>
            <p>Predictive modeling, machine learning, revenue management, gaming analytics, and demand forecasting.</p>
          </Link>
          <Link className="pathway-card" href="/teaching">
            <span>Teaching</span>
            <h2>Educating and empowering young minds</h2>
            <p>Statistics, entrepreneurship, mathematics, hospitality, R, forecasting, and applied data analysis.</p>
          </Link>
        </div>
      </section>

      <WorkMixChart />

      <GlobalExperienceMap />
    </main>
  );
}
