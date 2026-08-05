import AboutBackgroundTimeline from "./about_background_timeline";
import AboutDistanceFromVegas from "./about_distance_from_vegas";

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <AboutBackgroundTimeline />
      <AboutDistanceFromVegas />
    </main>
  );
}
