import Image from "next/image";
import styles from "./gallery_section.module.css";

export function GallerySection({ body, images, title }) {
  return (
    <article className={styles.section}>
      <div className="standard-gallery-copy">
        <span>{title}</span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className={`${styles.strip}${images.length === 1 ? ` ${styles.single}` : ""}`}>
        {images.map((image) => (
          <span className={styles.frame} key={image.src || image}>
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
    <section className={styles.stack} aria-label="Photo galleries">
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
