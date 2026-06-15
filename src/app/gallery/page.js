export const metadata = {
  title: "Gallery"
};

const galleries = [
  {
    title: "Research and conferences",
    body: "Presentations, posters, and professional travel.",
    images: [
      "/assets/gallery/assets/images/ICGRT1.jpg",
      "/assets/gallery/assets/images/WCHRIE23-1.jpg",
      "/assets/gallery/assets/images/gradforum1.jpg"
    ]
  },
  {
    title: "Teaching and student life",
    body: "Mentorship, events, organizations, and campus work.",
    images: [
      "/assets/gallery/assets/images/mentor1.jpg",
      "/assets/gallery/assets/images/soccerclub1.jpg",
      "/assets/gallery/assets/images/CDF23-1.jpg"
    ]
  },
  {
    title: "Travel and hospitality",
    body: "Universities, wineries, and the wider world around the work.",
    images: [
      "/assets/gallery/assets/images/bordeaux1.jpg",
      "/assets/gallery/assets/images/sardinia1.jpg",
      "/assets/gallery/assets/images/italy1.jpg"
    ]
  }
];

export default function GalleryPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">Gallery</p>
      <h1>Gallery</h1>
      <p className="lede">
        A visual archive from research presentations, teaching, student leadership, travel, wine, hospitality, and community work.
      </p>

      <section className="gallery-stack">
        {galleries.map((gallery) => (
          <article className="gallery-section" key={gallery.title}>
            <div>
              <span>{gallery.title}</span>
              <h2>{gallery.title}</h2>
              <p>{gallery.body}</p>
            </div>
            <div className="gallery-strip">
              {gallery.images.map((image) => (
                <img src={image} alt="" key={image} />
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
