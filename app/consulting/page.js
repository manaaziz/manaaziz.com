import Link from "next/link";

export const metadata = {
  title: "Consulting"
};

const consultingAreas = [
  {
    label: "Marketing",
    title: "Individual-level personalization",
    body:
      "Helping casino teams move from segmentation to micro-segmentation to true patron-level personalization: the right offer, to the right person, at the right time, with the right components, terms, and delivery.",
    examples: [
      "Offer sensitivity and reinvestment efficiency",
      "Churn prediction and patron lifecycle modeling",
      "Future value prediction from first-property interactions",
      "Preference modeling and personalized offer construction"
    ]
  },
  {
    label: "Surveillance",
    title: "Sharper signals for unusual behavior",
    body:
      "Building models that help teams understand what is unusual for a specific patron, not just unusual in the aggregate.",
    examples: [
      "Unusually high loss thresholds by patron",
      "Improbable loss detection across wagers and bet mix",
      "Behavioral signal monitoring",
      "Operator-facing interpretation of model outputs"
    ]
  },
  {
    label: "Optimization",
    title: "Better decisions across operations",
    body:
      "Turning analytics, forecasting, and reporting into practical recommendations for casino and hospitality teams.",
    examples: [
      "Operational reporting and executive dashboards",
      "Forecasting and demand-oriented analysis",
      "AI-supported decision workflows",
      "Recommendations that connect models to daily operator action"
    ]
  }
];

const clients = [
  { name: "Wynn", logo: "/assets/partner-logos/wynn_macau_logo.png" },
  { name: "Melco", logo: "/assets/partner-logos/melco_logo.png" },
  { name: "Crown Resorts", logo: "/assets/partner-logos/crown_resorts_logo.png" },
  { name: "The Star", logo: "/assets/partner-logos/the_star_logo.png" },
  { name: "Hoiana", logo: "/assets/partner-logos/hoiana_logo.png" },
  { name: "Inspire", logo: "/assets/partner-logos/inspire_resort_logo.png" },
  { name: "Casino Miami", logo: "/assets/partner-logos/casino_miami_logo.png" },
  { name: "WDTS", logo: "/assets/partner-logos/wdts_logo.png" },
  { name: "AXES", logo: "/assets/partner-logos/axes_logo.png" },
  { name: "Bally's", logo: "/assets/images/logos/Bally's_Corporation_logo.svg" },
  { name: "GMA Consulting" }
];

const projectExamples = [
  {
    title: "From segmentation to personalization",
    body:
      "Casino marketing has moved from broad segments to micro-segments. My work pushes that further toward personalization at the individual level, where offers are tuned to a patron's predicted behavior, value, preference, and lifecycle stage."
  },
  {
    title: "Unusual loss modeling",
    body:
      "Instead of asking whether a loss is large in general, these models ask whether the loss is unusually large for that specific patron and whether the sequence of lost wagers is improbable given how that patron plays."
  },
  {
    title: "Real-time marketing support",
    body:
      "Using AI and analytics to help teams identify when an offer may be relevant, how it should be framed, and what constraints or delivery details matter for the patron and the property."
  }
];

export default function ConsultingPage() {
  return (
    <main className="page-shell consulting-page">
      <section className="consulting-hero">
        <p className="eyebrow">Consulting</p>
        <h1>Helping casinos leverage data and AI</h1>
        <p className="lede">
          I help casino and hospitality teams turn data science, forecasting, machine learning, and AI into clearer decisions across marketing, surveillance, and operational optimization.
        </p>
        <div className="button-row">
          <a className="button" href="mailto:azizsm1@unlv.nevada.edu">
            Start a conversation
          </a>
          <Link className="button" href="/about">
            See global experience
          </Link>
        </div>
      </section>

      <section className="consulting-client-section" aria-labelledby="consulting-clients-title">
        <div className="section-intro">
          <p className="eyebrow">Clients</p>
          <h2 id="consulting-clients-title">Selected casino, hospitality, and gaming technology contexts</h2>
        </div>

        <div className="consulting-client-grid">
          {clients.map((client) => (
            <article className="consulting-client-card" key={client.name}>
              <div className="consulting-client-logo" aria-label={client.name}>
                {client.logo ? <img src={client.logo} alt="" /> : <strong>{client.name}</strong>}
              </div>
              <span>{client.name}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="consulting-area-section" aria-labelledby="consulting-areas-title">
        <div className="section-intro">
          <p className="eyebrow">Areas</p>
          <h2 id="consulting-areas-title">What the work usually touches</h2>
        </div>

        <div className="consulting-area-grid">
          {consultingAreas.map((area) => (
            <article className="consulting-area-card" key={area.label}>
              <span>{area.label}</span>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
              <ul>
                {area.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="consulting-example-section" aria-labelledby="consulting-examples-title">
        <div className="section-intro">
          <p className="eyebrow">Examples</p>
          <h2 id="consulting-examples-title">The kinds of questions I help answer</h2>
        </div>

        <div className="consulting-example-grid">
          {projectExamples.map((project) => (
            <article key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
