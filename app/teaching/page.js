export const metadata = {
  title: "Teaching"
};

const interests = [
  "Statistics and data analytics",
  "Research methods",
  "Revenue management and forecasting",
  "Applied machine learning for hospitality students"
];

export default function TeachingPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">Teaching</p>
      <h1>Teaching</h1>
      <p className="lede">
        My teaching centers on helping students use quantitative tools with confidence. I have supported graduate hospitality statistics, entrepreneurship courses, guest lectures, tutoring, and student mentorship across hospitality, data science, mathematics, and business contexts.
      </p>

      <section className="article-list">
        <article>
          <span>UNLV Hospitality</span>
          <h2>HOA 730 and HOA 732: Statistical Analysis for Hospitality</h2>
          <p>Teaching assistant experience across online, hybrid, and in-person formats. Topics included R, RStudio, time series, regression, central limit theorem, t-tests, chi-square testing, random forest, and XGBoost.</p>
        </article>
        <article>
          <span>UNLV Business</span>
          <h2>MGT 709 and MGT 710: New venture feasibility and creation</h2>
          <p>Helped design graduate-level course materials, Canvas pages, syllabi, schedules, and assignment support for entrepreneurship students.</p>
        </article>
        <article>
          <span>Applied teaching</span>
          <h2>Guest lectures, tutoring, and multilingual classroom work</h2>
          <p>Guest lectures in hospitality analytics, data science, casino games, beverage management, and student success; private tutoring in statistics and math; substitute teaching in Barcelona in English and Spanish.</p>
        </article>
      </section>

      <section className="callout">
        <h2>Teaching interests</h2>
        <ul>
          {interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
