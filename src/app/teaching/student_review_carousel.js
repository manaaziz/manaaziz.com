import FeatureCarousel from "@/components/feature_carousel";

export default function StudentReviewCarousel({ reviews }) {
  return (
    <FeatureCarousel
      ariaLabel="Student review controls"
      eyebrow="Student reviews"
      items={reviews}
      title="What students notice"
      variant="quote"
    />
  );
}
