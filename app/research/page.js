export const metadata = {
  title: "Research"
};

const works = [
  "Measurement invariance assessment of the Problem Gambling Severity Index.",
  "A systematic review of machine learning methodologies in hotel revenue management.",
  "Predicting cancellations in hotel room bookings with interpretable machine learning.",
  "Using supervised machine learning to predict online gamblers' behaviors.",
  "Prediction of aggregate stadium attendance in professional European football."
];

const talks = [
  "Machine learning prediction of hotel room demand, RevME Hospitality Management and Analytics Conference.",
  "Predicting declined transactions in gambling payments data, International Conference on Gambling & Risk Taking.",
  "Teaching statistics in hospitality, Graduate & Professional Student Research Forum.",
  "Predicting cancellations in bookings using machine learning, WF-CHRIE."
];

export default function ResearchPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">Research</p>
      <h1>Research</h1>
      <p className="lede">
        My research uses statistics, machine learning, and applied analytics to study hospitality, tourism, gaming, and education. Recent work focuses on hotel demand forecasting, booking cancellations, revenue management, gambling behavior, and quantitative methods for hospitality students.
      </p>

      <section className="article-list">
        <article>
          <span>Dissertation</span>
          <h2>Applications of meta-learning in hotel demand forecasting</h2>
          <p>Doctoral research advised by Dr. Ashok Singh, focused on forecasting hotel room demand with data-driven methods.</p>
        </article>
        <article>
          <span>Research interests</span>
          <h2>Predictive modeling, machine learning, revenue management, and gaming analytics</h2>
          <p>Work across unconstrained hotel demand, aggregate stadium attendance, gambling payments, online gambler behavior, and applied machine learning in hospitality contexts.</p>
        </article>
        <article>
          <span>Methods</span>
          <h2>Statistical modeling, interpretable machine learning, and measurement</h2>
          <p>Projects include random forests, support vector machines, neural networks, Bayesian logistic regression, MG-CFA measurement invariance, and systematic reviews of machine learning in revenue management.</p>
        </article>
      </section>

      <section className="two-column">
        <div className="callout">
          <h2>Selected works in progress</h2>
          <ul>
            {works.map((work) => (
              <li key={work}>{work}</li>
            ))}
          </ul>
        </div>
        <div className="callout">
          <h2>Selected presentations</h2>
          <ul>
            {talks.map((talk) => (
              <li key={talk}>{talk}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
