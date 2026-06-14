import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "../../courses";

export function generateStaticParams() {
  return courses
    .filter((course) => course.syllabus)
    .map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }) {
  const course = getCourse(params.slug);

  if (!course?.syllabus) {
    return {
      title: "Syllabus"
    };
  }

  return {
    title: `${course.courseNumber} Syllabus`
  };
}

export default function SyllabusPage({ params }) {
  const course = getCourse(params.slug);

  if (!course?.syllabus) {
    notFound();
  }

  const syllabus = course.syllabus;

  return (
    <main className="page-shell course-page syllabus-page">
      <Link className="case-link" href={`/teaching/${course.slug}`}>
        Back to course
      </Link>

      <section className="course-detail-hero">
        <p className="eyebrow">{course.university} syllabus</p>
        <h1>{course.title}</h1>
        <p className="lede">{course.semester}</p>
      </section>

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
        <div className="syllabus-table" role="table" aria-label="Assessment summary">
          <div role="row">
            <strong role="columnheader">Task</strong>
            <strong role="columnheader">Points</strong>
            <strong role="columnheader">Due</strong>
          </div>
          {syllabus.assessments.map((assessment) => (
            <div role="row" key={assessment.task}>
              <span role="cell">{assessment.task}</span>
              <span role="cell">{assessment.points}</span>
              <span role="cell">{assessment.due}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="syllabus-section">
        <p className="eyebrow">Schedule</p>
        <h2>Weekly teaching schedule</h2>
        <div className="syllabus-table weekly" role="table" aria-label="Weekly teaching schedule">
          <div role="row">
            <strong role="columnheader">Week</strong>
            <strong role="columnheader">Date</strong>
            <strong role="columnheader">Topic</strong>
          </div>
          {syllabus.schedule.map((week) => (
            <div role="row" key={`${week.week}-${week.date}`}>
              <span role="cell">{week.week}</span>
              <span role="cell">{week.date}</span>
              <span role="cell">{week.topic}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
