import PaperMosaic from "./PaperMosaic";
import ResearchWordGraph from "./ResearchWordGraph";

export const metadata = {
  title: "Research"
};

const papers = [
  {
    title: "Characterising online gamblers exceeding financial risk thresholds in the UK",
    status: "Published",
    venue: "Public Health",
    year: "2026",
    doi: "10.1016/j.puhe.2025.106080",
    blogHref: "/blog",
    blurb: "A retrospective analysis of open banking data to understand financial risk signals among online gamblers.",
    detail: "This paper studies online gamblers who exceed financial risk thresholds using open banking data. It connects gambling behavior, financial signals, and public-health-oriented risk identification."
  },
  {
    title: "A systematic review of machine learning methodologies in hotel revenue management",
    status: "Published",
    venue: "European Journal of Tourism, Hospitality and Recreation",
    year: "2025",
    doi: "10.2478/ejthr-2025-0022",
    blogHref: "/blog",
    blurb: "A review of how machine learning methods are used across hotel revenue management research.",
    detail: "This systematic review maps how machine learning has been used in hotel revenue management. It highlights model families, common prediction tasks, and gaps for future hospitality analytics research."
  },
  {
    title: "Across the bettor-verse: An open banking perspective on gambling in the United Kingdom",
    status: "Published",
    venue: "Journal of Gambling Studies",
    year: "2025",
    doi: "10.1007/s10899-025-10419-6",
    blogHref: "/blog",
    blurb: "An open banking view of gambling behavior, spending patterns, and risk-relevant financial activity.",
    detail: "This study uses open banking data to characterize gambling activity through a financial lens. It helps connect player behavior, spending patterns, and broader questions about gambling-related harm."
  },
  {
    title: "Measurement invariance of the Problem Gambling Severity Index",
    status: "Published",
    venue: "International Gambling Studies",
    year: "2025",
    doi: "10.1080/14459795.2025.2529177",
    blogHref: "/blog",
    blurb: "A measurement study testing whether the PGSI behaves consistently across sociodemographics and gambling modalities.",
    detail: "This paper evaluates whether the Problem Gambling Severity Index measures the same construct across different groups and gambling modalities. The work is about making sure comparisons across people are statistically defensible."
  },
  {
    title: "Towards explainable artificial intelligence in machine learning",
    status: "Published",
    venue: "Engineering Applications of Artificial Intelligence",
    year: "2025",
    doi: "10.1016/j.engappai.2025.110664",
    blogHref: "/blog",
    blurb: "A study of efficient perturbation-based explanations for machine learning models.",
    detail: "This paper contributes to explainable AI by studying efficient perturbation-based explanations. The focus is on making complex machine learning predictions more interpretable without unnecessary computational cost."
  },
  {
    title: "Machine learning in hospitality: Interpretable forecasting of booking cancellations",
    status: "Published",
    venue: "IEEE Access",
    year: "2025",
    doi: "10.1109/ACCESS.2025.3536094",
    blogHref: "/blog",
    blurb: "An interpretable machine learning approach to forecasting hotel booking cancellations.",
    detail: "This paper applies machine learning to predict hotel booking cancellations while keeping model interpretation central. It sits at the intersection of forecasting, hospitality operations, and practical decision support."
  },
  {
    title: "Forecasting hotel occupancy with explainable stacked generalization",
    status: "Under review",
    venue: "Journal of Hospitality and Tourism Technology",
    year: "2025",
    blogHref: "/blog",
    blurb: "A forecasting study using stacked generalization and explainable methods for hotel occupancy.",
    detail: "This project studies hotel occupancy forecasting using stacked generalization. It emphasizes predictive accuracy while using explainability tools to make the forecasts more useful for hospitality managers."
  },
  {
    title: "Interpretable behavioral clusters of gamblers through unsupervised learning",
    status: "Under review",
    venue: "Acta Psychologica",
    year: "2025",
    blogHref: "/blog",
    blurb: "An unsupervised learning project identifying behaviorally meaningful gambler clusters.",
    detail: "This study uses unsupervised learning to identify behavioral clusters among gamblers. The goal is to find interpretable subgroups that can support research on gambling behavior and risk."
  },
  {
    title: "Teaching statistics to hospitality students: A theoretical perspective",
    status: "Under review",
    venue: "Journal of Hospitality and Tourism Education",
    year: "2025",
    blogHref: "/blog",
    blurb: "A conceptual paper about teaching statistics in hospitality contexts.",
    detail: "This conceptual paper focuses on how statistics can be taught more effectively to hospitality students. It frames quantitative education around usefulness, confidence, and discipline-specific examples."
  }
];

const conferencePresentations = [
  {
    title: "Quantifying luck: Determining the probability of baccarat wins given player bet mix",
    type: "Paper",
    date: "May 27, 2026",
    venue: "19th International Conference on Gambling & Risk Taking",
    location: "Las Vegas, Nevada"
  },
  {
    title: "Shapley interaction networks for explaining the clinical course of gambling disorder",
    type: "Paper",
    date: "May 8-10, 2026",
    venue: "2026 IEEE International Conference on Artificial Intelligence",
    location: "Granada, Spain"
  },
  {
    title: "Open science in hospitality: A scoping review",
    type: "Poster",
    date: "March 6, 2026",
    venue: "UNLV Harrah College of Hospitality Research Forum",
    location: "Las Vegas, Nevada"
  },
  {
    title: "Explainable machine learning for hotel upselling in Portugal",
    type: "Paper",
    date: "February 27, 2026",
    venue: "International Conference on Culture, Tourism, and Hospitality",
    location: "Macau, China"
  },
  {
    title: "Interpretable behavioral clusters of gamblers through unsupervised learning",
    type: "Poster",
    date: "October 6, 2025",
    venue: "26th ICRG Conference on Gambling and Addiction",
    location: "Las Vegas, Nevada"
  },
  {
    title: "Avanzando en la ética y la gobernanza de la IA en el sector del juego: Un piloto de traducción de investigación",
    type: "Paper",
    date: "October 2, 2025",
    venue: "Club de Convergentes",
    location: "Madrid, Spain"
  },
  {
    title: "Characterizing UK online gamblers exceeding financial risk thresholds",
    type: "Paper",
    date: "April 17, 2025",
    venue: "2025 GLI Regulator Roundtable",
    location: "Las Vegas, Nevada"
  },
  {
    title: "How do hotel customers feel about AI service technologies? A scoping review",
    type: "Paper",
    date: "January 5, 2025",
    venue: "The 30th Annual Graduate Education & Graduate Student Research Conference in Hospitality and Tourism",
    location: "Miami, Florida"
  },
  {
    title: "Interpretable forecasting of booking cancellations with stacked generalization",
    type: "Paper",
    date: "November 4-7, 2024",
    venue: "EuroCHRIE Conference 2024",
    location: "Qatar"
  },
  {
    title: "Clustering slot machine players using session-level transaction data",
    type: "Poster",
    date: "November 6, 2024",
    venue: "Technology, Risk and Gambling Early Career Researcher Showcase",
    location: "Australia"
  },
  {
    title: "Clustering slot machine players using session-level transaction data",
    type: "Poster",
    date: "October 6-7, 2024",
    venue: "25th ICRG Conference on Gambling and Addiction",
    location: "Las Vegas, Nevada"
  },
  {
    title: "An ordinal categorical variable approach to assessing measurement invariance using the theta parameterization for MG-CFA",
    type: "Paper",
    date: "September 10-13, 2024",
    venue: "14th European Conference on Gambling Studies and Policy Issues",
    location: "Rome, Italy"
  },
  {
    title: "An assessment of the measurement invariance of the Problem Gambling Severity Index (PGSI)",
    type: "Paper",
    date: "May 23-24, 2024",
    venue: "Nevada Annual State Conference on Problem Gambling",
    location: "Nevada"
  },
  {
    title: "Machine learning prediction of hotel room demand",
    type: "Paper",
    date: "December 14, 2023",
    venue: "6th Annual RevME Hospitality Management and Analytics Conference",
    location: "Nashville, Tennessee"
  },
  {
    title: "Detection of customer transaction decline using machine learning",
    type: "Paper",
    date: "June 13, 2023",
    venue: "Webinar on Safer Gambling: Insights from Leading Researchers & Applicability",
    location: "Malta"
  },
  {
    title: "Predicting declined transactions in gambling payments data",
    type: "Paper",
    date: "May 23-25, 2023",
    venue: "International Conference on Gambling & Risk Taking",
    location: "Las Vegas, Nevada"
  },
  {
    title: "Teaching statistics in hospitality",
    type: "Paper",
    date: "April 15, 2023",
    venue: "Graduate & Professional Student Research Forum",
    location: "Las Vegas, Nevada"
  },
  {
    title: "Teaching statistics in hospitality using R",
    type: "Paper",
    date: "March 17, 2023",
    venue: "2023 Hawkes Learning Innovative Educators Summit",
    location: "Virtual"
  },
  {
    title: "Predicting cancellations in bookings using machine learning",
    type: "Poster",
    date: "February 18-19, 2023",
    venue: "2023 West Federation of Council on Hotel, Restaurant, and Institutional Education",
    location: "Las Vegas, Nevada"
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

      <section className="paper-mosaic-section" aria-labelledby="paper-mosaic-title">
        <div className="section-intro">
          <p className="eyebrow">Papers</p>
          <h2 id="paper-mosaic-title">Selected research papers</h2>
        </div>
        <PaperMosaic papers={papers} />
      </section>

      <section className="presentation-section">
        <div className="section-intro">
          <p className="eyebrow">Research</p>
          <h2>Conference presentations</h2>
        </div>
        <div className="presentation-gallery">
          {conferencePresentations.map((presentation) => (
            <article className="presentation-photo-card" key={`${presentation.date}-${presentation.title}`}>
              <div className="presentation-photo-surface">
                <div className="presentation-photo-placeholder">
                  <span>{presentation.location}</span>
                </div>
                <div className="presentation-photo-copy">
                  <span className={presentation.type === "Poster" ? "presentation-type poster" : "presentation-type"}>
                    {presentation.type}
                  </span>
                  <time>{presentation.date}</time>
                  <p>{presentation.venue}</p>
                  <a href="/blog">Blog post</a>
                </div>
              </div>
              <div className="presentation-photo-caption">
                <h3>{presentation.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
