import Image from "next/image";

export function GallerySection({ body, images, title }) {
  return (
    <article className="standard-gallery-section gallery-section">
      <div className="standard-gallery-copy">
        <span>{title}</span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className={`standard-gallery-strip gallery-strip${images.length === 1 ? " single" : ""}`}>
        {images.map((image) => (
          <span className="gallery-image-frame" key={image.src || image}>
            <Image
              src={image.src || image}
              alt={image.alt || ""}
              fill
              sizes="(max-width: 920px) 100vw, 48vw"
            />
          </span>
        ))}
      </div>
    </article>
  );
}

export default function GalleryStack({ galleries }) {
  return (
    <section className="standard-gallery-stack gallery-stack">
      {galleries.map((gallery) => (
        <GallerySection
          body={gallery.body}
          images={gallery.images}
          key={gallery.title}
          title={gallery.title}
        />
      ))}
    </section>
  );
}
