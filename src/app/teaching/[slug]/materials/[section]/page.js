import Link from "next/link";
import { notFound } from "next/navigation";
import SectionSlider from "@/components/section_slider";
import { courses, getCourse } from "../../../courses";
import { getMaterialHub } from "../../../material_hubs";

function ResourceCard({ eyebrow, title, description, href, links }) {
  return (
    <article className="course-resource-card">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {href ? <a className="button button-small" href={href}>Open resource</a> : null}
      {links?.length ? (
        <div className="course-resource-links">
          {links.map((link) => <a className="button button-small" href={link.href} key={link.href}>{link.label}</a>)}
        </div>
      ) : null}
    </article>
  );
}

function AssignmentsPage({ course }) {
  const assignments = course.materials.filter((material) => ["Assignment", "Assignments", "Project", "Activity"].includes(material.kind));
  return (
    <div className="course-resource-page-grid">
      {assignments.length ? assignments.map((material) => <ResourceCard eyebrow={material.kind} key={material.title} {...material} />) : (
        <article className="course-resource-card"><span>Assignments</span><h2>Assignment library in progress</h2><p>Assignment instructions and supporting files will be organized here as they are prepared for publication.</p></article>
      )}
    </div>
  );
}

function LecturesPage({ course }) {
  const lectureMaterials = course.materials.filter((material) => ["Slides", "Videos"].includes(material.kind));
  const lectures = lectureMaterials.flatMap((material) => material.links?.length
    ? material.links.map((link) => ({ eyebrow: material.kind, title: link.label, href: link.href, description: material.description }))
    : [{ eyebrow: material.kind, ...material }]);
  return (
    <>
      <div className="course-format-key" aria-label="Lecture material format key">
        <span>Slides available now</span><span>Video and transcript slots are ready to add</span>
      </div>
      <div className="course-resource-page-grid">
        {lectures.length ? lectures.map((lecture, index) => <ResourceCard key={`${lecture.title}-${index}`} {...lecture} />) : (
          <article className="course-resource-card"><span>Lectures</span><h2>Lecture library in progress</h2><p>Videos, slide decks, and transcripts will be organized here by class session.</p></article>
        )}
      </div>
    </>
  );
}

function CodeDataPage({ course }) {
  const resources = course.materials.filter((material) => ["Code", "Data"].includes(material.kind));
  return (
    <>
      <article className="course-github-callout">
        <div><span>GitHub</span><h2>Course repository</h2></div>
        <p>The course repository can be linked here once the {course.courseNumber} folder structure is ready on GitHub.</p>
      </article>
      <div className="course-resource-page-grid">
        {resources.length ? resources.map((material) => <ResourceCard eyebrow={material.kind} key={material.title} {...material} />) : (
          <article className="course-resource-card"><span>Code</span><h2>Code library in progress</h2><p>Course scripts and datasets will appear here once the repository is organized.</p></article>
        )}
      </div>
    </>
  );
}

export function generateStaticParams() {
  return courses.flatMap((course) => (getMaterialHub(course.slug) || []).map((section) => ({ slug: course.slug, section: section.id })));
}

export async function generateMetadata({ params }) {
  const { slug, section } = await params;
  const course = getCourse(slug);
  const entry = getMaterialHub(slug)?.find((item) => item.id === section);
  return { title: course && entry ? `${entry.title} | ${course.courseNumber}` : "Course materials" };
}

export default async function CourseMaterialSectionPage({ params }) {
  const { slug, section } = await params;
  const course = getCourse(slug);
  const sections = getMaterialHub(slug);
  const activeSection = sections?.find((item) => item.id === section);
  if (!course || !activeSection) notFound();

  return (
    <main className="page-shell course-material-page">
      <Link className="button course-back-button" href={`/teaching/${course.slug}`}>Back to {course.courseNumber}</Link>
      <header className="course-material-page-heading">
        <p className="eyebrow">{course.courseNumber} materials</p>
        <h1>{activeSection.title}</h1>
        <p className="lede">{activeSection.description}</p>
      </header>
      <SectionSlider
        activeId={section}
        ariaLabel={`${course.courseNumber} material sections`}
        className="course-material-section-slider"
        items={sections.map((item) => ({
          href: `/teaching/${course.slug}/materials/${item.id}`,
          id: item.id,
          label: item.eyebrow
        }))}
      />
      {section === "assignments" ? <AssignmentsPage course={course} /> : null}
      {section === "lectures" ? <LecturesPage course={course} /> : null}
      {section === "code-and-data" ? <CodeDataPage course={course} /> : null}
    </main>
  );
}
