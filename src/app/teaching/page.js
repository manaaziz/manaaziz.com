import Link from "next/link";
import StudentReviewCarousel from "./StudentReviewCarousel";
import { courses } from "./courses";
import { studentReviews } from "./reviews";

export const metadata = {
  title: "Teaching"
};

const teachingValues = [
  {
    label: "Whole person formation",
    title: "Preparing students for more than the next assignment",
    body:
      "I care about helping students build judgment, confidence, communication skills, and professional habits alongside the course material."
  },
  {
    label: "Teaching through passion",
    title: "Energy makes learning contagious",
    body:
      "The best teachers in my life transmitted their own passions. I try to bring that same energy to food, culture, statistics, hospitality, and data."
  },
  {
    label: "Agency and technology",
    title: "Students should learn how to take the wheel",
    body:
      "I want students to see themselves as active learners who can use modern tools, including AI, responsibly and effectively rather than fall behind people who do."
  }
];

export default function TeachingPage() {
  return (
    <main className="page-shell teaching-page">
      <section className="teaching-hero">
        <div>
          <p className="eyebrow">Teaching</p>
          <h1>Teaching students to think with data</h1>
        </div>
        <p className="lede">
          I teach hospitality, culture, cuisine, statistics, analytics, and applied data science with a focus on whole-person formation, student agency, and real-world usefulness.
        </p>
      </section>

      <section className="teaching-values" aria-label="Teaching philosophy and style">
        {teachingValues.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <StudentReviewCarousel reviews={studentReviews} />

      <section className="course-link-section" aria-labelledby="course-link-title">
        <div className="section-intro">
          <p className="eyebrow">Courses</p>
          <h2 id="course-link-title">I have taught both graduate and undergraduate courses.</h2>
        </div>

        <div className="course-card-grid">
          {courses.map((course) => (
            <Link className="course-card" href={`/teaching/${course.slug}`} key={course.slug}>
              <span>{course.courseNumber}</span>
              <h3>{course.courseName}</h3>
              <div className="course-card-university">
                <img src="/assets/logos/unlvhospitality_logo.jpeg" alt="" loading="lazy" />
                <small>{course.university}</small>
              </div>
              <p>{course.summary}</p>
              <strong>Open course home</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
