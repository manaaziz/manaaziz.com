import Link from "next/link";
import StudentReviewCarousel from "./student_review_carousel";
import { courses } from "./courses";
import { studentReviews } from "./reviews";
import styles from "./teaching.module.css";

export const metadata = {
  title: "Teaching"
};

const teachingValues = [
  {
    label: "Whole person formation",
    title: "Preparing students for real-world success",
    body:
      "My goal is to go beyond course content by helping students develop the judgment, communication skills, confidence, and professional habits they need to become successful professionals."
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

const recentCourseOrder = [
  "hoa-730-statistical-analysis",
  "hoa-732-advanced-statistical-analysis",
  "fab-333-culture-and-cuisine",
  "fab-333-summer-studies-spain"
];

export default function TeachingPage() {
  const sortedCourses = courses
    .slice()
    .sort((a, b) => recentCourseOrder.indexOf(a.slug) - recentCourseOrder.indexOf(b.slug));

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

      <section className={styles.values} aria-labelledby="teaching-values-title">
        <h2 className="sr-only" id="teaching-values-title">Teaching philosophy and style</h2>
        {teachingValues.map((item) => (
          <article className={styles.valueCard} key={item.label}>
            <span className={styles.valueLabel}>{item.label}</span>
            <h3 className={styles.valueTitle}>{item.title}</h3>
            <p className={styles.valueBody}>{item.body}</p>
          </article>
        ))}
      </section>

      <StudentReviewCarousel reviews={studentReviews} />

      <section className="course-link-section" aria-labelledby="course-link-title">
        <div className="section-intro">
          <p className="eyebrow">Courses</p>
          <h2 id="course-link-title">I have taught both graduate and undergraduate courses.</h2>
        </div>

        <div className={styles.courseGrid}>
          {sortedCourses.map((course) => (
            <Link className={styles.courseCard} href={`/teaching/${course.slug}`} key={course.slug}>
              <div className={styles.courseMeta}>
                <span className={styles.courseTag}>{course.courseNumber}</span>
                <span className={styles.courseTag}>{course.university}</span>
              </div>
              <h3 className={styles.courseTitle}>{course.cardTitle || course.courseName}</h3>
              <p className={styles.courseSummary}>{course.summary}</p>
              <span className={`button button-small ${styles.courseAction}`}>Open course home</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
