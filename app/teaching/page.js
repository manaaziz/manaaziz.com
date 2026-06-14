import Link from "next/link";
import StudentReviewCarousel from "./StudentReviewCarousel";
import { courses } from "./courses";

export const metadata = {
  title: "Teaching"
};

const teachingValues = [
  {
    label: "Philosophy",
    title: "Quantitative work should feel usable",
    body:
      "I want students to leave class believing that statistics, data science, and AI are tools they can use to answer real questions, not just formulas they survive for a grade."
  },
  {
    label: "Style",
    title: "Applied, direct, and student-centered",
    body:
      "My classes emphasize examples, guided practice, plain-language explanations, and repeated opportunities to connect technical ideas to hospitality, gaming, and business decisions."
  },
  {
    label: "Classroom",
    title: "Confidence comes from doing",
    body:
      "I care about lowering the intimidation factor around math and code while still holding students to a high standard of clear thinking and careful analysis."
  }
];

const studentReviews = [
  {
    quote: "Selected student review will appear here once the review file is added.",
    context: "Placeholder"
  },
  {
    quote: "Add a review about Mana's clarity, support, teaching style, or classroom energy here.",
    context: "Placeholder"
  },
  {
    quote: "Add another selected review here; the carousel already supports auto-advance and next/previous controls.",
    context: "Placeholder"
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
          I teach statistics, analytics, hospitality, entrepreneurship, and applied data science with a focus on confidence, clarity, and real-world decision-making.
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
          <h2 id="course-link-title">Classes and teaching work</h2>
        </div>

        <div className="course-card-grid">
          {courses.map((course) => (
            <Link className="course-card" href={`/teaching/${course.slug}`} key={course.slug}>
              <span>{course.label}</span>
              <h3>{course.title}</h3>
              <p>{course.summary}</p>
              <strong>View course</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
