import FeatureCarousel from "@/components/FeatureCarousel";

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
