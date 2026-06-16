export const podcasts = [
  {
    slug: "the-rebel-revolution",
    title: "The Rebel Revolution",
    eyebrow: "UNLV podcast",
    description:
      "A UNLV-centered show about ideas, people, scholarship, and the work moving through the university.",
    spotifyHref: "https://open.spotify.com/show/3HrzYII7QOj8CyYYj19r3o?si=4a3605a137fa4173",
    focus: ["UNLV", "Scholarship", "Campus voices"]
  },
  {
    slug: "the-job-forum",
    title: "The Job Forum",
    eyebrow: "Career podcast",
    description:
      "A show about college, work, early career transitions, and the stories people carry into their professional lives.",
    spotifyHref: "https://open.spotify.com/show/1xfePE5KeTYJFdoz0PDV0T?si=ac2fa720a41943a0",
    focus: ["College", "Work", "Career stories"]
  }
];

export function getPodcast(slug) {
  return podcasts.find((podcast) => podcast.slug === slug);
}
