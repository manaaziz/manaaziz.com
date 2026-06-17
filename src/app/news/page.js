import Link from "next/link";
import { newsItems } from "./items";

export const metadata = {
  title: "In the News"
};

export default function NewsPage() {
  return (
    <main className="page-shell newspaper-page">
      <section className="newspaper-masthead" aria-labelledby="newspaper-title">
        <div className="newspaper-kicker">
          <span>Wednesday, June 17, 2026</span>
        </div>
        <h1 id="newspaper-title">The Manalogue</h1>
      </section>

      <section className="newspaper-front-page" aria-label="The Manalogue articles">
        <div className="newspaper-edition-strip">
          <span>Gaming</span>
          <span>Analytics</span>
          <span>Hospitality</span>
          <span>Research</span>
          <span>The Manalogue</span>
        </div>

        <div className="newspaper-grid">
          {newsItems.map((item, index) => (
            <a className={index === 0 ? "newspaper-article lead" : "newspaper-article"} href={item.href} key={item.href} rel="noreferrer" target="_blank">
              <span>{item.outlet} · {item.date}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <strong>Read article</strong>
            </a>
          ))}

          <aside className="newspaper-rail" aria-label="Story sections">
            <section>
              <span>Inside</span>
              <h2>Baccarat data</h2>
              <p>Casino operators, table games, player behavior, and the analytics hiding inside baccarat play.</p>
            </section>
            <section>
              <span>Section</span>
              <h2>Gaming & analytics</h2>
              <p>A single lead story for now, treated like the front page rather than a generic archive.</p>
            </section>
            <Link className="button button-small" href="/manalogue">
              Back to The Manalogue
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
