import Link from "next/link";
import { newsItems } from "./items";

export const metadata = {
  title: "In the News"
};

export default function NewsPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">In the News</p>
      <h1>In the News</h1>
      <p className="lede">
        Articles and media mentions connected to gaming, hospitality, analytics, and public-facing research.
      </p>

      <section className="article-list news-list" aria-label="News articles">
        {newsItems.map((item) => (
          <a className="news-article-card" href={item.href} key={item.href} rel="noreferrer" target="_blank">
            <span>{item.outlet} · {item.date}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <strong>Read article</strong>
          </a>
        ))}
      </section>

      <section className="callout news-note">
        <h2>More soon</h2>
        <p>This is the current press shelf. Small but mighty.</p>
        <Link className="button" href="/media">
          Back to media hub
        </Link>
      </section>
    </main>
  );
}
