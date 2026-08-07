import { notFound } from "next/navigation";
import { ManaloguePage } from "../../blog/page";

const sectionNames = {
  consulting: "Consulting",
  research: "Research",
  teaching: "Teaching",
  travel: "Travel",
  podcasts: "Podcasts",
  gallery: "Gallery"
};

export function generateStaticParams() {
  return Object.keys(sectionNames).map((section) => ({ section }));
}

export async function generateMetadata({ params }) {
  const { section } = await params;
  const title = sectionNames[section];
  return title ? { title: `${title} | The Manalogue` } : {};
}

export default async function ManalogueSectionPage({ params }) {
  const { section } = await params;
  if (!sectionNames[section]) notFound();
  return <ManaloguePage sectionId={section} />;
}
