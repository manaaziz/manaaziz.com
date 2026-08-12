import AboutBackgroundTimeline from "./about_background_timeline";
import AboutDistanceFromVegas from "./about_distance_from_vegas";

export const metadata = {
  title: "About",
  description: "About Mana Azizsoltani, an AI consultant, researcher, and professor working across casino, hospitality, and gambling research.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <AboutBackgroundTimeline />
      <AboutDistanceFromVegas />
    </main>
  );
}
