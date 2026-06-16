import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "../courses";

const kindGroups = [
  {
    title: "Syllabus and course guide",
    eyebrow: "Start here",
    kinds: ["Syllabus"]
  },
  {
    title: "Assignments and projects",
    eyebrow: "Student work",
    kinds: ["Assignment", "Assignments", "Project", "Activity", "Writing", "Experiences"]
  },
  {
    title: "Slides, videos, code, and data",
    eyebrow: "Resources",
    kinds: ["Slides", "Videos", "Code", "Data"]
  }
];

function materialMatches(material, kinds) {
  return kinds.includes(material.kind);
}

function MaterialCard({ material }) {
  return (
    <article>
      {material.kind ? <span>{material.kind}</span> : null}
      <h3>{material.title}</h3>
      <p>{material.description}</p>
      {material.href ? (
        <Link className="case-link" href={material.href}>
          Open resource
        </Link>
      ) : null}
      {material.links?.length ? (
        <div className="course-resource-links">
          {material.links.map((link) => (
            <Link className="case-link" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }) {
  const course = getCourse(params.slug);

  if (!course) {
    return {
      title: "Teaching"
    };
  }

  return {
    title: course.shortTitle
  };
}

export default function CoursePage({ params }) {
  const course = getCourse(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="page-shell course-page">
      <Link className="case-link" href="/teaching">
        Back to teaching
      </Link>

      <section className="course-home-hero">
        <div>
          <p className="eyebrow">{course.university} course home</p>
          <h1>{course.title}</h1>
          <p className="lede">{course.summary}</p>
        </div>
        <aside className="course-facts" aria-label="Course facts">
          <span>{course.courseNumber}</span>
          <strong>{course.semester}</strong>
          <p>{course.university}</p>
        </aside>
      </section>

      <section className="course-home-grid">
        <article className="course-detail-panel course-overview-panel">
          <span>Course concept</span>
          <h2>{course.shortTitle}</h2>
          {course.catalogIntro ? <p>{course.catalogIntro}</p> : null}
          <p>{course.description}</p>
          <div className="course-hero-actions">
            {course.syllabus ? (
              <Link className="button" href={`/teaching/${course.slug}/syllabus`}>
                Read web syllabus
              </Link>
            ) : null}
            {course.materials.find((material) => material.kind === "Syllabus" && material.href) ? (
              <Link
                className="button"
                href={course.materials.find((material) => material.kind === "Syllabus" && material.href).href}
              >
                Download syllabus
              </Link>
            ) : null}
          </div>
        </article>

        <article className="course-video-panel">
          <span>Video library</span>
          <h2>Panopto-ready course media</h2>
          <p>
            This area is set up for future Panopto embeds, short lecture clips, walkthroughs, and class demos connected to the course materials below.
          </p>
          <div className="course-video-slots" aria-label="Future course video slots">
            <span>Lecture clip</span>
            <span>Assignment walkthrough</span>
            <span>Course demo</span>
          </div>
        </article>
      </section>

      {course.outcomes?.length ? (
        <section className="course-outcomes" aria-labelledby="course-outcomes-title">
          <div className="section-intro">
            <p className="eyebrow">Focus</p>
            <h2 id="course-outcomes-title">What students work on</h2>
          </div>

          <div className="course-outcome-grid">
            {course.outcomes.map((outcome, index) => (
              <article key={outcome}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{outcome}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="course-materials course-home-materials" aria-labelledby="course-materials-title">
        <div className="section-intro">
          <p className="eyebrow">Materials</p>
          <h2 id="course-materials-title">Course materials, assignments, and links</h2>
        </div>

        {kindGroups.map((group) => {
          const materials = course.materials.filter((material) => materialMatches(material, group.kinds));

          if (!materials.length) return null;

          return (
            <section className="course-material-group" key={group.title}>
              <div>
                <p className="eyebrow">{group.eyebrow}</p>
                <h3>{group.title}</h3>
              </div>
              <div className="course-material-list">
                {materials.map((material) => (
                  <MaterialCard key={material.title} material={material} />
                ))}
              </div>
            </section>
          );
        })}
      </section>

      {course.syllabus ? (
        <section className="course-syllabus-preview" aria-labelledby="course-syllabus-preview-title">
          <div>
            <p className="eyebrow">Web syllabus</p>
            <h2 id="course-syllabus-preview-title">The syllabus is available as a website page</h2>
            <p>
              The Culture and Cuisine syllabus has been translated from the PDF into a rendered course page with course information, objectives, assignments, and weekly schedule.
            </p>
          </div>
          <Link className="button" href={`/teaching/${course.slug}/syllabus`}>
            Open syllabus
          </Link>
        </section>
      ) : null}
    </main>
  );
}
