import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "../../courses";

export function generateStaticParams() {
  return courses
    .filter((course) => course.syllabus)
    .map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course?.syllabus) {
    return {
      title: "Syllabus"
    };
  }

  return {
    title: `${course.courseNumber} Syllabus`
  };
}

export default async function SyllabusPage({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course?.syllabus) {
    notFound();
  }

  const syllabus = course.syllabus;
  const showAssessmentPoints = syllabus.assessments.some((assessment) => assessment.points);

  return (
    <main className="page-shell course-page syllabus-page">
      <Link className="button course-back-button" href={`/teaching/${course.slug}`}>
        Back to course
      </Link>

      <section className="course-detail-hero">
        <p className="eyebrow">{course.university} syllabus</p>
        <h1>{course.title}</h1>
        <p className="lede">{course.semester}</p>
      </section>

      {syllabus.featuredLinks?.length ? (
        <section className="syllabus-featured-links" aria-label="Related course writing">
          {syllabus.featuredLinks.map((link) => (
            <Link className="button" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </section>
      ) : null}

      <section className="syllabus-grid" aria-label="Course information">
        <article>
          <span>Instructor</span>
          <strong>{syllabus.instructor}</strong>
          <p>{syllabus.email}</p>
        </article>
        <article>
          <span>Meeting</span>
          <strong>{syllabus.meeting}</strong>
          <p>{syllabus.room}</p>
        </article>
        <article>
          <span>Credits</span>
          <strong>{syllabus.credits}</strong>
          <p>{syllabus.prerequisites}</p>
        </article>
      </section>

      <section className="syllabus-section">
        <p className="eyebrow">Description</p>
        <h2>Course description</h2>
        <p>{syllabus.description}</p>
      </section>

      <section className="syllabus-section">
        <p className="eyebrow">Objectives</p>
        <h2>What students should be able to do</h2>
        <ol className="syllabus-list">
          {syllabus.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ol>
      </section>

      <section className="syllabus-section">
        <p className="eyebrow">Evaluation</p>
        <h2>Assignments and grading</h2>
        <div className={`syllabus-table${showAssessmentPoints ? "" : " no-points"}`} role="table" aria-label="Assessment summary">
          <div role="row">
            <strong role="columnheader">Task</strong>
            {showAssessmentPoints ? <strong role="columnheader">Points</strong> : null}
            <strong role="columnheader">Weight</strong>
            <strong role="columnheader">Due</strong>
          </div>
          {syllabus.assessments.map((assessment) => (
            <div role="row" key={assessment.task}>
              <span role="cell">{assessment.task}</span>
              {showAssessmentPoints ? <span role="cell">{assessment.points}</span> : null}
              <span role="cell">{assessment.percent || "TBD"}</span>
              <span role="cell">{assessment.due}</span>
            </div>
          ))}
        </div>
        {syllabus.gradingScale?.length ? (
          <div className="syllabus-scale-list" aria-label="Grading scale">
            {syllabus.gradingScale.map((item) => (
              <article key={item.grade}>
                <strong>{item.grade}</strong>
                <span>{item.range}</span>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="syllabus-section">
        <p className="eyebrow">Schedule</p>
        <h2>{syllabus.scheduleHeading || "Weekly teaching schedule"}</h2>
        <div className="syllabus-table weekly" role="table" aria-label="Weekly teaching schedule">
          <div role="row">
            <strong role="columnheader">{syllabus.scheduleLabel || "Week"}</strong>
            <strong role="columnheader">Topic</strong>
          </div>
          {syllabus.schedule.map((week) => (
            <div role="row" key={`${week.week}-${week.topic}`}>
              <span role="cell">{week.week}</span>
              <span role="cell">{week.topic}</span>
            </div>
          ))}
        </div>
      </section>

      {syllabus.sections?.map((section) => (
        <section className="syllabus-section" key={section.title}>
          <p className="eyebrow">{section.label}</p>
          <h2>{section.title}</h2>
          {section.copy ? <p>{section.copy}</p> : null}
          {section.items?.length ? (
            <ul className="syllabus-list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </main>
  );
}
