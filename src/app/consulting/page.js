import FeatureCarousel from "@/components/FeatureCarousel";
import { getAllPosts, getSeriesSummaries } from "@/lib/posts";
import LogoBounceField from "./LogoBounceField";

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

const companyRoles = [
  {
    company: "Differential Labs",
    href: "https://diffgaming.com",
    role: "Head of Data Science",
    kicker: "Casino analytics, casino AI, marketing analytics, and fraud analytics.",
    body:
      "I lead the development and implementation of data science and AI solutions for casinos across the globe, translating models into workflows that operators can actually use.",
    points: [
      "Casino-facing data science and AI systems",
      "Marketing, fraud, surveillance, and operational analytics",
      "Model interpretation that connects technical output to business decisions"
    ]
  },
  {
    company: "Hex Gaming AI",
    href: "https://hexgaming.ai",
    role: "Head of Knowledge Architecture",
    kicker: "Gen AI-powered tools for casino marketing, fraud detection, and operations optimization.",
    body:
      "I help shape the knowledge layer for LLM-driven casino workflows, especially where personalization, domain expertise, and real-time marketing logic need to work together.",
    points: [
      "Knowledge architecture for casino-specific AI agents",
      "LLM workflows for personalized marketing in real time",
      "Domain structure that keeps AI useful for casino teams"
    ]
  }
];

export default function ConsultingPage() {
  const series = getSeriesSummaries();
  const writingPosts = getAllPosts()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => {
      const seriesInfo = series.find((item) => item.seriesSlug === post.seriesSlug);
      return {
        ...post,
        image: post.previewImage || post.cover || seriesInfo?.cover || "/assets/images/phdblog-cover.jpg",
        imageAlt: "",
        dateLabel: post.date,
        label: "Read post",
        topic: post.seriesTitle || "The Manalogue",
        seriesCover: seriesInfo?.cover || "/assets/images/phdblog-cover.jpg"
      };
    });
  const consultingWriting = writingPosts.filter((post) => post.tags.some((tag) => tag.toLowerCase() === "consulting"));

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

      <section className="consulting-role-section" aria-labelledby="consulting-roles-title">
        <div className="section-intro">
          <p className="eyebrow">Roles</p>
          <h2 id="consulting-roles-title">Where I build casino AI and analytics systems</h2>
        </div>

        <div className="consulting-role-grid">
          {companyRoles.map((role) => (
            <article className="consulting-role-card" key={role.company}>
              <h3>{role.company}</h3>
              <p>{role.body}</p>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a href={role.href} rel="noreferrer" target="_blank">
                Visit {role.company}
              </a>
            </article>
          ))}
        </div>
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

      {consultingWriting.length ? (
        <section className="home-stream reveal">
          <div className="section-intro home-stream-heading">
            <p className="eyebrow">Writing</p>
            <h2>Check out some of my thinking</h2>
          </div>
          <FeatureCarousel
            ariaLabel="Consulting writing controls"
            filterTag="consulting"
            items={writingPosts}
            variant="blog"
          />
        </section>
      ) : (
        <section className="consulting-example-section consulting-writing-empty" aria-labelledby="consulting-writing-title">
          <div className="section-intro">
            <p className="eyebrow">Writing</p>
            <h2 id="consulting-writing-title">Check out some of my thinking</h2>
          </div>
          <div className="consulting-writing-placeholder">
            <p>
              Consulting essays from The Manalogue will appear here once posts are tagged with <strong>consulting</strong>.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
