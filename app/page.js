import Link from "next/link";
import LocalizedHello from "@/components/LocalizedHello";

const focusAreas = [
  {
    href: "/research",
    label: "Research",
    title: "Machine learning for hospitality, tourism, gaming, and revenue questions.",
    body: "Demand forecasting, booking cancellations, gaming payments, measurement invariance, and applied analytics."
  },
  {
    href: "/teaching",
    label: "Teaching",
    title: "Statistics, R, forecasting, and applied data analysis.",
    body: "Teaching assistant work, guest lectures, tutoring, mentoring, and quantitative hospitality pedagogy."
  },
  {
    href: "/blog",
    label: "Blog",
    title: "Writing from the academic and personal archive.",
    body: "The Manalogue spirit, now living as one thoughtful section of a broader professional site."
  },
  {
    href: "/gallery",
    label: "Gallery",
    title: "Photos from conferences, travel, teaching, and community work.",
    body: "A visual record of classrooms, research forums, travel, and student leadership."
  }
];

const stats = [
  ["PhD", "Hospitality Administration"],
  ["MS", "Statistics"],
  ["BS", "Mathematics"]
];

export default function Home() {
  return (
    <main>
      <section className="hero hero-home" aria-label="Mana Azizsoltani introduction">
        <div className="hero-rail">
          <span>Hospitality analytics researcher</span>
          <span>2026</span>
        </div>

        <div className="hero-metrics" aria-label="Education summary">
          {stats.map(([value, label]) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Hospitality analytics - machine learning - teaching</p>
          <h1 className="hero-greeting">
            <LocalizedHello />
          </h1>
          <p className="hero-signature">- I&apos;m Mana Azizsoltani.</p>
          <p className="lede">
            I work at the intersection of hospitality, statistics, and machine learning, with research spanning hotel demand forecasting, gaming analytics, revenue management, and quantitative education.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/research">
              Research
            </Link>
            <a className="button" href="/assets/Azizsoltani_CV.pdf">
              CV
            </a>
            <a className="button" href="mailto:azizsm1@unlv.nevada.edu">
              Email
            </a>
          </div>
        </div>

        <figure className="portrait-panel">
          <img src="/assets/images/mana-cutout.png" alt="Mana Azizsoltani" />
        </figure>

        <a className="scroll-cue" href="#selected-areas">
          Scroll down
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="section-intro" id="selected-areas">
        <p className="eyebrow">Selected areas</p>
        <h2>A professional home with enough room for the person.</h2>
      </section>

      <section className="card-grid">
        {focusAreas.map((area, index) => (
          <Link className={index === 0 ? "feature-card highlighted" : "feature-card"} href={area.href} key={area.href}>
            <span>{area.label}</span>
            <h3>{area.title}</h3>
            <p>{area.body}</p>
          </Link>
        ))}
      </section>

      <section className="split-band">
        <div>
          <p className="eyebrow">About</p>
          <h2>Quantitative training, hospitality questions, international curiosity.</h2>
        </div>
        <div>
          <p>
            My path runs through mathematics at UNLV, statistics at NC State, doctoral work in hospitality administration, Las Vegas, Barcelona, classrooms, research forums, student organizations, and service work.
          </p>
          <Link className="text-link" href="/about">
            Read the full about page
          </Link>
        </div>
      </section>

      <section className="stat-row" aria-label="Education summary">
        {stats.map(([value, label]) => (
          <div key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
