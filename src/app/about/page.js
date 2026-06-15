import AboutBackgroundTimeline from "./AboutBackgroundTimeline";
import AboutDistanceFromVegas from "./AboutDistanceFromVegas";
import GlobalExperienceMap from "./GlobalExperienceMap";
import WorkMixChart from "./WorkMixChart";

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <AboutBackgroundTimeline />
      <AboutDistanceFromVegas />

      <WorkMixChart />

      <GlobalExperienceMap />
    </main>
  );
}
