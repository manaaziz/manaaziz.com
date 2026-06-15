export const metadata = {
  title: "Podcast"
};

export default function PodcastPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">Podcast</p>
      <h1>Podcast</h1>
      <p className="lede">
        Podcast work has been part of the broader archive, including The Rebel Revolution and The Job Forum. This page is reserved for selected episodes, show notes, and media links.
      </p>
      <section className="article-list">
        <article>
          <span>The Rebel Revolution</span>
          <h2>Innovation and scholarship at UNLV</h2>
          <p>A podcast project highlighting the work, people, and ideas moving through UNLV.</p>
        </article>
        <article>
          <span>The Job Forum</span>
          <h2>College, work, and early career stories</h2>
          <p>A show about recent graduates' journeys through college and into the workforce.</p>
        </article>
      </section>
    </main>
  );
}
