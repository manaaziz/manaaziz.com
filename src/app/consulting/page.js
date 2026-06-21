import Link from "next/link";
import LogoBounceField from "./LogoBounceField";
import { newsItems } from "../news/items";

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
  { name: "Wynn Resorts", logo: "/assets/logos/Wynn_Las_Vegas_logo.svg.png" },
  { name: "Melco", logo: "/assets/logos/Melco_logo.png" },
  { name: "Crown Resorts", logo: "/assets/logos/crown_resorts_logo.png" },
  { name: "The Star", logo: "/assets/logos/the_star_logo.png" },
  { name: "Hoiana", logo: "/assets/logos/hoiana_logo.png" },
  { name: "Inspire", logo: "/assets/logos/inspire_resort_logo.png" },
  { name: "Resorts World Las Vegas", logo: "/assets/logos/resorts_world_LV_logo_transparent.png" },
  { name: "Resorts World Sentosa", logo: "/assets/logos/resorts_world_singapore_logo_transparent.png" },
  { name: "Casino Miami", logo: "/assets/logos/casino_miami_logo.png" },
  { name: "Gilley's Kansas City", logo: "/assets/logos/gilleys_logo_transparent.png" },
  { name: "Oakmont", logo: "/assets/logos/oakmont_logo_transparent.png" },
  { name: "WDTS", logo: "/assets/logos/wdts_logo.png" },
  { name: "AXES", logo: "/assets/logos/axes_logo.png" },
  { name: "Bally's", logo: "/assets/logos/ballys_corporation_logo.svg" },
  { name: "GMA Consulting", logo: "/assets/logos/gma_logo.png.webp" }
];

const consultingWriting = [
  {
    title: "The Manalogue analytics desk",
    body:
      "Notes on gaming, hospitality, data science, AI, analytics, and the business-facing questions behind the work.",
    href: "/manalogue",
    label: "Open Manalogue"
  },
  {
    title: newsItems[0]?.title || "Baccarat data and casino operators",
    body: newsItems[0]?.description || "Coverage on how baccarat data can create new analytical opportunities for casino operators.",
    href: newsItems[0]?.href || "https://igamingbusiness.com/casino/baccarat-data-the-next-breakthrough-for-casino-operators/",
    label: "Read coverage",
    external: true
  }
];

export default function ConsultingPage() {
  return (
    <main className="page-shell consulting-page">
      <section className="consulting-hero">
        <p className="eyebrow">Consulting</p>
        <h1>Helping casinos leverage data and AI</h1>
        <p className="lede">
          I am the head of data science at{" "}
          <a href="https://diffgaming.com" rel="noreferrer" target="_blank">
            differential labs
          </a>
          , where I lead the development and implementation of data science and AI solutions for casinos all across the globe. I am also the head of knowledge architecture for{" "}
          <a href="https://hexgaming.ai" rel="noreferrer" target="_blank">
            Hex Gaming AI
          </a>
          . Hex is a platform for LLM-driven personalized marketing in real time.
        </p>
      </section>

      <section className="consulting-client-section" aria-labelledby="consulting-clients-title">
        <div className="section-intro">
          <p className="eyebrow">Clients</p>
          <h2 id="consulting-clients-title">I have worked with some of the biggest players in the industry</h2>
        </div>

        <LogoBounceField clients={clients} />
      </section>

      <section className="consulting-area-section" aria-labelledby="consulting-areas-title">
        <div className="section-intro">
          <p className="eyebrow">Areas</p>
          <h2 id="consulting-areas-title">I have experience in various faces of the business</h2>
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

      <section className="consulting-example-section" aria-labelledby="consulting-writing-title">
        <div className="section-intro">
          <p className="eyebrow">Writing</p>
          <h2 id="consulting-writing-title">Consulting-related writing and coverage</h2>
        </div>

        <div className="consulting-example-grid">
          {consultingWriting.map((item) => (
            item.external ? (
              <a className="consulting-writing-card" href={item.href} key={item.title} rel="noreferrer" target="_blank">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </a>
            ) : (
              <Link className="consulting-writing-card" href={item.href} key={item.title}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Link>
            )
          ))}
        </div>
      </section>
    </main>
  );
}
