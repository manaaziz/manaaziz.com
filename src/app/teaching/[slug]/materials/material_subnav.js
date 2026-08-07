import SectionSlider from "@/components/section_slider";

export default function MaterialSubnav({ courseSlug, currentSection, sections }) {
  return (
    <SectionSlider
      activeId={currentSection}
      ariaLabel="Course material sections"
      className="course-material-subnav"
      items={sections.map((item) => ({ id: item.id, label: item.eyebrow, href: `/teaching/${courseSlug}/materials/${item.id}` }))}
    />
  );
}
