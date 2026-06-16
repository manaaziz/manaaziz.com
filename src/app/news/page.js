import Link from "next/link";

export const metadata = {
  title: "In the News"
};

export default function NewsPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">In the News</p>
      <h1>In the News</h1>
      <p className="lede">
        A future home for media mentions, interviews, podcast appearances, conference coverage, and public-facing work.
      </p>

      <section className="callout">
        <h2>Coming soon</h2>
        <p>
          This section is ready for links to articles, interviews, videos, and other public features.
        </p>
        <Link className="button" href="/media">
          Back to media hub
        </Link>
      </section>
    </main>
  );
}
