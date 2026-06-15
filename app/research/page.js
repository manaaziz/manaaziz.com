import ResearchWordGraph from "./ResearchWordGraph";

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

const conferencePresentations = [
  {
    title: "Quantifying luck: Determining the probability of baccarat wins given player bet mix",
    type: "Paper",
    date: "May 27, 2026",
    venue: "19th International Conference on Gambling & Risk Taking"
  },
  {
    title: "Shapley interaction networks for explaining the clinical course of gambling disorder",
    type: "Paper",
    date: "May 8-10, 2026",
    venue: "2026 IEEE International Conference on Artificial Intelligence"
  },
  {
    title: "Open science in hospitality: A scoping review",
    type: "Poster",
    date: "March 6, 2026",
    venue: "UNLV Harrah College of Hospitality Research Forum"
  },
  {
    title: "Explainable machine learning for hotel upselling in Portugal",
    type: "Paper",
    date: "February 27, 2026",
    venue: "International Conference on Culture, Tourism, and Hospitality"
  },
  {
    title: "Interpretable behavioral clusters of gamblers through unsupervised learning",
    type: "Poster",
    date: "October 6, 2025",
    venue: "26th ICRG Conference on Gambling and Addiction"
  },
  {
    title: "Avanzando en la ética y la gobernanza de la IA en el sector del juego: Un piloto de traducción de investigación",
    type: "Paper",
    date: "October 2, 2025",
    venue: "Club de Convergentes, Madrid, Spain"
  },
  {
    title: "Characterizing UK online gamblers exceeding financial risk thresholds",
    type: "Paper",
    date: "April 17, 2025",
    venue: "2025 GLI Regulator Roundtable"
  },
  {
    title: "How do hotel customers feel about AI service technologies? A scoping review",
    type: "Paper",
    date: "January 5, 2025",
    venue: "The 30th Annual Graduate Education & Graduate Student Research Conference in Hospitality and Tourism"
  },
  {
    title: "Interpretable forecasting of booking cancellations with stacked generalization",
    type: "Paper",
    date: "November 4-7, 2024",
    venue: "EuroCHRIE Conference 2024"
  },
  {
    title: "Clustering slot machine players using session-level transaction data",
    type: "Poster",
    date: "November 6, 2024",
    venue: "Technology, Risk and Gambling Early Career Researcher Showcase"
  },
  {
    title: "Clustering slot machine players using session-level transaction data",
    type: "Poster",
    date: "October 6-7, 2024",
    venue: "25th ICRG Conference on Gambling and Addiction"
  },
  {
    title: "An ordinal categorical variable approach to assessing measurement invariance using the theta parameterization for MG-CFA",
    type: "Paper",
    date: "September 10-13, 2024",
    venue: "14th European Conference on Gambling Studies and Policy Issues"
  },
  {
    title: "An assessment of the measurement invariance of the Problem Gambling Severity Index (PGSI)",
    type: "Paper",
    date: "May 23-24, 2024",
    venue: "Nevada Annual State Conference on Problem Gambling"
  },
  {
    title: "Machine learning prediction of hotel room demand",
    type: "Paper",
    date: "December 14, 2023",
    venue: "6th Annual RevME Hospitality Management and Analytics Conference"
  },
  {
    title: "Detection of customer transaction decline using machine learning",
    type: "Paper",
    date: "June 13, 2023",
    venue: "Webinar on Safer Gambling: Insights from Leading Researchers & Applicability"
  },
  {
    title: "Predicting declined transactions in gambling payments data",
    type: "Paper",
    date: "May 23-25, 2023",
    venue: "International Conference on Gambling & Risk Taking, Las Vegas, NV"
  },
  {
    title: "Teaching statistics in hospitality",
    type: "Paper",
    date: "April 15, 2023",
    venue: "Graduate & Professional Student Research Forum, Las Vegas, NV"
  },
  {
    title: "Teaching statistics in hospitality using R",
    type: "Paper",
    date: "March 17, 2023",
    venue: "2023 Hawkes Learning Innovative Educators Summit"
  },
  {
    title: "Predicting cancellations in bookings using machine learning",
    type: "Poster",
    date: "February 18-19, 2023",
    venue: "2023 West Federation of Council on Hotel, Restaurant, and Institutional Education"
  }
];

export default function ResearchPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">Research</p>
      <h1>Research</h1>
      <p className="lede">
        My research uses statistics, machine learning, and applied analytics to study hospitality, tourism, gaming, and education. Recent work focuses on hotel demand forecasting, booking cancellations, revenue management, gambling behavior, and quantitative methods for hospitality students.
      </p>

      <ResearchWordGraph />

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
      </section>

      <section className="presentation-section">
        <div className="section-intro">
          <p className="eyebrow">Research</p>
          <h2>Conference presentations</h2>
        </div>
        <div className="presentation-list">
          {conferencePresentations.map((presentation) => (
            <article className="presentation-card" key={`${presentation.date}-${presentation.title}`}>
              <span className={presentation.type === "Poster" ? "presentation-type poster" : "presentation-type"}>
                {presentation.type}
              </span>
              <h3>{presentation.title}</h3>
              <p>{presentation.venue}</p>
              <time>{presentation.date}</time>
              <span className="case-link disabled">Retrospective coming soon</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
