import Image from "next/image";
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
    blogHref: "/manalogue",
    pdfHref: "/assets/papers/characterising-online-gamblers-risk-thresholds.pdf",
    blurb: "A retrospective analysis of open banking data to understand financial risk signals among online gamblers.",
    detail: "This paper studies online gamblers who exceed financial risk thresholds using open banking data. It connects gambling behavior, financial signals, and public-health-oriented risk identification."
  },
  {
    title: "Interpretable behavioral clusters of gamblers through unsupervised learning",
    status: "Published",
    venue: "Acta Psychologica",
    year: "2026",
    doi: "10.1016/j.actpsy.2026.106947",
    blogHref: "/manalogue",
    pdfHref: "/assets/papers/interpretable-behavioral-clusters-gamblers.pdf",
    blurb: "An unsupervised learning project identifying behaviorally meaningful gambler clusters.",
    detail: "This study uses unsupervised learning to identify behavioral clusters among gamblers. The goal is to find interpretable subgroups that can support research on gambling behavior and risk."
  },
  {
    title: "A systematic review of machine learning applications in hotel occupancy forecasting",
    status: "Published",
    venue: "European Journal of Tourism, Hospitality and Recreation",
    year: "2025",
    doi: "10.2478/ejthr-2025-0022",
    blogHref: "/manalogue",
    pdfHref: "/assets/papers/systematic-review-ml-hotel-occupancy-forecasting.pdf",
    blurb: "A review of how machine learning methods are used across hotel occupancy forecasting research.",
    detail: "This systematic review maps how machine learning has been used in hotel occupancy forecasting. It highlights model families, common prediction tasks, and gaps for future hospitality analytics research."
  },
  {
    title: "Across the bettor-verse: An open banking perspective on gambling in the United Kingdom",
    status: "Published",
    venue: "Journal of Gambling Studies",
    year: "2025",
    doi: "10.1007/s10899-025-10419-6",
    blogHref: "/manalogue",
    pdfHref: "/assets/papers/across-the-bettor-verse-open-banking-gambling.pdf",
    blurb: "An open banking view of gambling behavior, spending patterns, and risk-relevant financial activity.",
    detail: "This study uses open banking data to characterize gambling activity through a financial lens. It helps connect player behavior, spending patterns, and broader questions about gambling-related harm."
  },
  {
    title: "Measurement invariance of the Problem Gambling Severity Index",
    status: "Published",
    venue: "International Gambling Studies",
    year: "2025",
    doi: "10.1080/14459795.2025.2529177",
    blogHref: "/manalogue",
    pdfHref: "/assets/papers/measurement-invariance-pgsi.pdf",
    blurb: "A measurement study testing whether the PGSI behaves consistently across sociodemographics and gambling modalities.",
    detail: "This paper evaluates whether the Problem Gambling Severity Index measures the same construct across different groups and gambling modalities. The work is about making sure comparisons across people are statistically defensible."
  },
  {
    title: "Towards explainable artificial intelligence in machine learning",
    status: "Published",
    venue: "Engineering Applications of Artificial Intelligence",
    year: "2025",
    doi: "10.1016/j.engappai.2025.110664",
    blogHref: "/manalogue",
    pdfHref: "/assets/papers/towards-explainable-ai-machine-learning.pdf",
    blurb: "A study of efficient perturbation-based explanations for machine learning models.",
    detail: "This paper contributes to explainable AI by studying efficient perturbation-based explanations. The focus is on making complex machine learning predictions more interpretable without unnecessary computational cost."
  },
  {
    title: "Machine learning in hospitality: Interpretable forecasting of booking cancellations",
    status: "Published",
    venue: "IEEE Access",
    year: "2025",
    doi: "10.1109/ACCESS.2025.3536094",
    blogHref: "/manalogue",
    pdfHref: "/assets/papers/ml-hospitality-booking-cancellations.pdf",
    blurb: "An interpretable machine learning approach to forecasting hotel booking cancellations.",
    detail: "This paper applies machine learning to predict hotel booking cancellations while keeping model interpretation central. It sits at the intersection of forecasting, hospitality operations, and practical decision support."
  },
  {
    title: "Forecasting hotel occupancy with explainable stacked generalization",
    status: "Under review",
    venue: "Journal of Hospitality and Tourism Technology",
    year: "2025",
    blogHref: "/manalogue",
    blurb: "A forecasting study using stacked generalization and explainable methods for hotel occupancy.",
    detail: "This project studies hotel occupancy forecasting using stacked generalization. It emphasizes predictive accuracy while using explainability tools to make the forecasts more useful for hospitality managers."
  },
  {
    title: "Teaching statistics to hospitality students: A theoretical perspective",
    status: "Under review",
    venue: "Journal of Hospitality and Tourism Education",
    year: "2025",
    blogHref: "/manalogue",
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
    location: "Las Vegas, Nevada",
    logo: "/assets/photos/conf_gambling_risk_2026.jpeg",
    photo: true,
    tile: "wide",
    focus: "center 42%"
  },
  {
    title: "Shapley interaction networks for explaining the clinical course of gambling disorder",
    type: "Paper",
    date: "May 8-10, 2026",
    venue: "2026 IEEE International Conference on Artificial Intelligence",
    location: "Granada, Spain",
    logo: "/assets/logos/cai_granada_logo.png"
  },
  {
    title: "Open science in hospitality: A scoping review",
    type: "Poster",
    date: "March 6, 2026",
    venue: "UNLV Harrah College of Hospitality Research Forum",
    location: "Las Vegas, Nevada",
    logo: "/assets/logos/unlvhospitality_logo.jpeg"
  },
  {
    title: "Explainable machine learning for hotel upselling in Portugal",
    type: "Paper",
    date: "February 27, 2026",
    venue: "International Conference on Culture, Tourism, and Hospitality",
    location: "Macau, China",
    logo: "/assets/logos/iccth_macau.png"
  },
  {
    title: "Interpretable behavioral clusters of gamblers through unsupervised learning",
    type: "Poster",
    date: "October 6, 2025",
    venue: "26th ICRG Conference on Gambling and Addiction",
    location: "Las Vegas, Nevada",
    logo: "/assets/photos/ICRG_2025.jpeg",
    photo: true,
    tile: "wide",
    focus: "center 40%"
  },
  {
    title: "Avanzando en la ética y la gobernanza de la IA en el sector del juego: Un piloto de traducción de investigación",
    type: "Paper",
    date: "October 2, 2025",
    venue: "Club de Convergentes",
    location: "Madrid, Spain",
    logo: "/assets/photos/CEOE_2025.jpg",
    photo: true,
    tile: "wide",
    focus: "center 38%"
  },
  {
    title: "Characterizing UK online gamblers exceeding financial risk thresholds",
    type: "Paper",
    date: "April 17, 2025",
    venue: "2025 GLI Regulator Roundtable",
    location: "Las Vegas, Nevada",
    logo: "/assets/photos/gli_regulator_roundtable.JPG",
    photo: true,
    tile: "wide",
    focus: "center 42%"
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
    location: "Qatar",
    logo: "/assets/photos/eurochrie_qatar.jpeg",
    photo: true,
    tile: "wide",
    focus: "center 42%"
  },
  {
    title: "Clustering slot machine players using session-level transaction data",
    type: "Poster",
    date: "November 6, 2024",
    venue: "Technology, Risk and Gambling Early Career Researcher Showcase",
    location: "Australia",
    logo: "/assets/logos/usydney_logo.svg"
  },
  {
    title: "Clustering slot machine players using session-level transaction data",
    type: "Poster",
    date: "October 6-7, 2024",
    venue: "25th ICRG Conference on Gambling and Addiction",
    location: "Las Vegas, Nevada",
    logo: "/assets/photos/ICRG_2024.JPG",
    photo: true,
    tile: "tall",
    focus: "center 38%"
  },
  {
    title: "An ordinal categorical variable approach to assessing measurement invariance using the theta parameterization for MG-CFA",
    type: "Paper",
    date: "September 10-13, 2024",
    venue: "14th European Conference on Gambling Studies and Policy Issues",
    location: "Rome, Italy",
    logo: "/assets/photos/EASG_2024.JPG",
    photo: true,
    tile: "tall",
    focus: "center 42%"
  },
  {
    title: "An assessment of the measurement invariance of the Problem Gambling Severity Index (PGSI)",
    type: "Paper",
    date: "May 23-24, 2024",
    venue: "Nevada Annual State Conference on Problem Gambling",
    location: "Nevada",
    logo: "/assets/photos/nvcpg_2024.jpeg",
    photo: true,
    tile: "wide",
    focus: "center 40%"
  },
  {
    title: "Machine learning prediction of hotel room demand",
    type: "Paper",
    date: "December 14, 2023",
    venue: "6th Annual RevME Hospitality Management and Analytics Conference",
    location: "Nashville, Tennessee",
    logo: "/assets/photos/revme_nashville.JPG",
    photo: true,
    tile: "wide",
    focus: "center 43%"
  },
  {
    title: "Detection of customer transaction decline using machine learning",
    type: "Paper",
    date: "June 13, 2023",
    venue: "Webinar on Safer Gambling: Insights from Leading Researchers & Applicability",
    location: "Malta",
    logo: "/assets/photos/sustainable_gambling_photo.jpeg",
    photo: true,
    tile: "wide",
    showInMosaic: true,
    focus: "center 45%"
  },
  {
    title: "Predicting declined transactions in gambling payments data",
    type: "Paper",
    date: "May 23-25, 2023",
    venue: "International Conference on Gambling & Risk Taking",
    location: "Las Vegas, Nevada",
    logo: "/assets/photos/ICGRT_2023.jpeg",
    photo: true,
    tile: "wide",
    focus: "center 42%"
  },
  {
    title: "Teaching statistics in hospitality",
    type: "Paper",
    date: "April 15, 2023",
    venue: "Graduate & Professional Student Research Forum",
    location: "Las Vegas, Nevada",
    logo: "/assets/photos/gradforum1.jpg",
    photo: true,
    tile: "tall",
    focus: "center 38%"
  },
  {
    title: "Teaching statistics in hospitality using R",
    type: "Paper",
    date: "March 17, 2023",
    venue: "2023 Hawkes Learning Innovative Educators Summit",
    location: "Virtual",
    logo: "/assets/photos/hawkes3-cropped.jpg",
    photo: true,
    tile: "wide",
    fit: "contain",
    focus: "center"
  },
  {
    title: "Predicting cancellations in bookings using machine learning",
    type: "Poster",
    date: "February 18-19, 2023",
    venue: "2023 West Federation of Council on Hotel, Restaurant, and Institutional Education",
    location: "Las Vegas, Nevada",
    logo: "/assets/photos/wfchrie_2023.jpeg",
    photo: true,
    focus: "center 26%"
  }
];

export default function ResearchPage() {
  const mosaicPresentations = conferencePresentations.filter((presentation) => presentation.photo || presentation.showInMosaic);
  const presentationColumns = Array.from({ length: 3 }, () => []);
  mosaicPresentations.forEach((presentation, index) => {
    presentationColumns[index % presentationColumns.length].push(presentation);
  });

  return (
    <main className="page-shell">
      <p className="eyebrow">Research</p>
      <h1>A voracious appetite for high-impact research</h1>
      <p className="lede">
        My research uses statistics, machine learning, and applied analytics to study hospitality, tourism, gaming, and education. Recent work focuses on hotel demand forecasting, booking cancellations, revenue management, gambling behavior, and quantitative methods for hospitality students.
      </p>

      <ResearchWordGraph />

      <section className="paper-mosaic-section" aria-labelledby="paper-mosaic-title">
        <div className="section-intro">
          <p className="eyebrow">Papers</p>
          <h2 id="paper-mosaic-title">I have published in leading journals across multiple disciplines</h2>
        </div>
        <PaperMosaic papers={papers.filter((paper) => paper.status === "Published")} />
      </section>

      <section className="presentation-section">
        <div className="section-intro">
          <p className="eyebrow">Research</p>
          <h2>Conference presentations</h2>
        </div>
        <div className="presentation-gallery research-presentation-gallery">
          {presentationColumns.map((column, columnIndex) => (
            <div className="research-presentation-column" key={`presentation-column-${columnIndex}`}>
              {column.map((presentation) => (
                <article
                  className={`presentation-photo-card presentation-tile-${presentation.tile || "standard"}`}
                  key={`${presentation.date}-${presentation.title}`}
                  style={{
                    "--presentation-fit": presentation.fit || "cover",
                    "--presentation-focus": presentation.focus || "center"
                  }}
                >
                  <div className="presentation-photo-surface">
                    <div className={`presentation-photo-placeholder${presentation.photo ? " has-photo" : ""}`}>
                      {presentation.logo ? (
                        <Image
                          className={`presentation-photo-image${presentation.photo ? " is-photo" : ""}`}
                          src={presentation.logo}
                          alt=""
                          fill
                          sizes={presentation.tile === "wide" ? "(max-width: 920px) 100vw, 40vw" : "(max-width: 920px) 100vw, 24vw"}
                        />
                      ) : null}
                    </div>
                    <div className="presentation-photo-copy">
                      <p>{presentation.venue}</p>
                    </div>
                  </div>
                  <div className="presentation-photo-caption">
                    <div className="presentation-card-meta">
                      <span>{presentation.location}</span>
                      <time>{presentation.date}</time>
                    </div>
                    <h3>{presentation.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
