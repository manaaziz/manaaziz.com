import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "../courses";

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

      <section className="course-detail-hero">
        <p className="eyebrow">{course.label}</p>
        <h1>{course.title}</h1>
        <p className="lede">{course.summary}</p>
      </section>

      <section className="course-detail-grid">
        <div className="course-photo-placeholder">
          <span>Class photos</span>
          <p>Photos from this class can live here once they are selected.</p>
        </div>

        <article className="course-detail-panel">
          <span>About the class</span>
          <h2>{course.shortTitle}</h2>
          <p>{course.description}</p>
        </article>
      </section>

      <section className="course-materials" aria-labelledby="course-materials-title">
        <div className="section-intro">
          <p className="eyebrow">Materials</p>
          <h2 id="course-materials-title">Course materials and resources</h2>
        </div>

        <div className="course-material-list">
          {course.materials.map((material) => (
            <article key={material.title}>
              <h3>{material.title}</h3>
              <p>{material.description}</p>
              {material.href ? (
                <Link className="case-link" href={material.href}>
                  Open resource
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
