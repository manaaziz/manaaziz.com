import { responsiveImageSources, responsiveVariantPath } from "@/lib/responsive_image_sources";

export default function ResponsiveImage({ alt = "", eager = false, sizes, src, ...props }) {
  const metadata = responsiveImageSources[src];

  if (!metadata) {
    return <img {...props} src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />;
  }

  const candidates = [480, 960]
    .filter((width) => width < metadata.width)
    .map((width) => `${responsiveVariantPath(src, width)} ${width}w`);
  candidates.push(`${src} ${metadata.width}w`);

  return (
    <img
      {...props}
      src={src}
      srcSet={candidates.join(", ")}
      sizes={sizes}
      width={metadata.width}
      height={metadata.height}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
    />
  );
}
