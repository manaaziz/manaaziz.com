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

const defaultGradingScale = [
  { grade: "A", range: "93% and above" },
  { grade: "A-", range: "90% to 92.9%" },
  { grade: "B+", range: "87% to 89.9%" },
  { grade: "B", range: "83% to 86.9%" },
  { grade: "B-", range: "80% to 82.9%" },
  { grade: "C+", range: "77% to 79.9%" },
  { grade: "C", range: "73% to 76.9%" },
  { grade: "C-", range: "70% to 72.9%" },
  { grade: "D", range: "60% to 69.9%" },
  { grade: "F", range: "Below 60%" }
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
        <Link className="button button-small" href={material.href}>
          Open resource
        </Link>
      ) : null}
      {material.links?.length ? (
        <div className="course-resource-links">
          {material.links.map((link) => (
            <Link className="button button-small" href={link.href} key={link.href}>
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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return {
      title: "Teaching"
    };
  }

  return {
    title: course.shortTitle
  };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const objectives = course.syllabus?.objectives || course.outcomes || [];
  const gradingComponents = course.syllabus?.assessments || course.gradingComponents || [];
  const weeklySchedule = course.syllabus?.schedule || course.schedule || [];
  const photoSlots = course.photos?.length
    ? course.photos
    : [
        { label: "Class photo", note: "Add a classroom or group image" },
        { label: "Activity", note: "Add a tasting, lab, or field moment" },
        { label: "Student work", note: "Add presentations, travel, or project photos" }
      ];

  return (
    <main className="page-shell course-page">
      <Link className="button course-back-button" href="/teaching">
        Back to teaching
      </Link>

      <section className="course-home-hero">
        <p className="eyebrow">{course.university} course home</p>
        <h1>{course.title}</h1>
        <p className="lede">{course.summary}</p>
      </section>

      <section className="course-photo-highlight" aria-labelledby="course-photo-highlight-title">
        <div className="section-intro">
          <p className="eyebrow">Class moments</p>
          <h2 id="course-photo-highlight-title">Photos and highlights</h2>
        </div>
        <div className="course-photo-grid">
          {photoSlots.map((photo) => (
            <figure className="course-photo-slot" key={photo.label}>
              {photo.src ? <img src={photo.src} alt={photo.alt || ""} /> : null}
              <figcaption>
                <span>{photo.label}</span>
                <p>{photo.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="course-description-section" aria-labelledby="course-description-title">
        <div className="section-intro">
          <p className="eyebrow">Description</p>
          <h2 id="course-description-title">Course description</h2>
        </div>
        <div className="course-description-card">
          {course.catalogIntro ? <p>{course.catalogIntro}</p> : null}
          <p>{course.description}</p>
          <div className="course-hero-actions">
            {course.catalogHref ? (
              <a className="button" href={course.catalogHref} rel="noreferrer" target="_blank">
                UNLV course catalog
              </a>
            ) : null}
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
        </div>
      </section>

      {objectives.length ? (
        <section className="course-outcomes" aria-labelledby="course-outcomes-title">
          <div className="section-intro">
            <p className="eyebrow">Objectives</p>
            <h2 id="course-outcomes-title">Learning objectives</h2>
          </div>

          <div className="course-outcome-grid">
            {objectives.map((outcome, index) => (
              <article key={outcome}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{outcome}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="course-grading-section" aria-labelledby="course-grading-title">
        <div className="section-intro">
          <p className="eyebrow">Assessment</p>
          <h2 id="course-grading-title">Assignments, grading, and scale</h2>
        </div>
        <div className="course-grading-grid">
          <div className="syllabus-table course-grade-table" role="table" aria-label="Assignments and grading weights">
            <div role="row">
              <strong role="columnheader">Component</strong>
              <strong role="columnheader">Weight</strong>
              <strong role="columnheader">Due</strong>
            </div>
            {gradingComponents.map((item) => (
              <div role="row" key={item.task}>
                <span role="cell">{item.task}</span>
                <span role="cell">{item.percent || item.points || "TBD"}</span>
                <span role="cell">{item.due || "TBD"}</span>
              </div>
            ))}
          </div>

          <div className="syllabus-table course-scale-table" role="table" aria-label="Grading scale">
            <div role="row">
              <strong role="columnheader">Grade</strong>
              <strong role="columnheader">Range</strong>
            </div>
            {defaultGradingScale.map((item) => (
              <div role="row" key={item.grade}>
                <span role="cell">{item.grade}</span>
                <span role="cell">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {weeklySchedule.length ? (
        <section className="course-schedule-section" aria-labelledby="course-schedule-title">
          <div className="section-intro">
            <p className="eyebrow">Schedule</p>
            <h2 id="course-schedule-title">Weekly schedule</h2>
          </div>
          <div className="syllabus-table weekly" role="table" aria-label="Weekly course schedule">
            <div role="row">
              <strong role="columnheader">Week</strong>
              <strong role="columnheader">Topic</strong>
            </div>
            {weeklySchedule.map((week) => (
              <div role="row" key={`${week.week}-${week.topic}`}>
                <span role="cell">{week.week}</span>
                <span role="cell">{week.topic}</span>
              </div>
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
