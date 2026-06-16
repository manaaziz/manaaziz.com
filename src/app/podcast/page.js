export const metadata = {
  title: "Podcast"
};

const podcasts = [
  {
    title: "The Rebel Revolution",
    description: "A UNLV-centered show about ideas, people, scholarship, and the work moving through the university.",
    href: "https://open.spotify.com/show/3HrzYII7QOj8CyYYj19r3o?si=4a3605a137fa4173"
  },
  {
    title: "The Job Forum",
    description: "A show about college, work, early career transitions, and the stories people carry into their professional lives.",
    href: "https://open.spotify.com/show/1xfePE5KeTYJFdoz0PDV0T?si=ac2fa720a41943a0"
  }
];

export default function PodcastPage() {
  return (
    <main className="page-shell podcast-page">
      <p className="eyebrow">Podcast</p>
      <h1>Podcast work</h1>
      <p className="lede">
        Two audio projects: The Rebel Revolution and The Job Forum. Both shows live on Spotify, with room here for selected episodes, show notes, and future embeds.
      </p>

      <section className="podcast-show-grid" aria-label="Podcast shows">
        {podcasts.map((podcast) => (
          <a className="podcast-show-card" href={podcast.href} key={podcast.title} rel="noreferrer" target="_blank">
            <span>Spotify show</span>
            <h2>{podcast.title}</h2>
            <p>{podcast.description}</p>
            <strong>Listen on Spotify</strong>
          </a>
        ))}
      </section>
    </main>
  );
}
