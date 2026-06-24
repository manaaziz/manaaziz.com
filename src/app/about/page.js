import AboutBackgroundTimeline from "./AboutBackgroundTimeline";
import AboutDistanceFromVegas from "./AboutDistanceFromVegas";

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
