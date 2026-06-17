import Link from "next/link";
import { notFound } from "next/navigation";
import { getPodcast, podcasts } from "../shows";

export function generateStaticParams() {
  return podcasts.map((podcast) => ({ slug: podcast.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const podcast = getPodcast(slug);

  return {
    title: podcast?.title || "Podcast"
  };
}

export default async function PodcastShowPage({ params }) {
  const { slug } = await params;
  const podcast = getPodcast(slug);

  if (!podcast) {
    notFound();
  }

  return (
    <main className="page-shell podcast-show-page">
      <Link className="button course-back-button" href="/manalogue">
        Back to media
      </Link>

      <p className="eyebrow">{podcast.eyebrow}</p>
      <h1>{podcast.title}</h1>
      <p className="lede">{podcast.description}</p>

      <section className="podcast-show-feature" aria-label={`${podcast.title} links and topics`}>
        <div className="podcast-show-card podcast-show-primary-card">
          <span>Spotify show</span>
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
          <a className="button" href={podcast.spotifyHref} rel="noreferrer" target="_blank">
            Listen on Spotify
          </a>
        </div>

        <div className="blog-note-stack" aria-hidden="true">
          {podcast.focus.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
