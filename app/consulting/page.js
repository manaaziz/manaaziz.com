import Link from "next/link";

export const metadata = {
  title: "Consulting"
};

export default function ConsultingPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">Consulting</p>
      <h1>Helping companies leverage data and AI</h1>
      <p className="lede">
        I help casino and hospitality teams turn analytics, forecasting, machine learning, and AI into clearer operational decisions.
      </p>

      <section className="article-list">
        <article>
          <span>Operators</span>
          <h2>Analytics that connects to actual decisions</h2>
          <p>
            Consulting work can include forecasting, player and guest behavior analysis, reporting systems, model interpretation, and operator-facing recommendations.
          </p>
        </article>
        <article>
          <span>AI and data science</span>
          <h2>Practical tools, not theater</h2>
          <p>
            I focus on data products, workflows, and explanations that teams can understand, trust, and use in the real world.
          </p>
        </article>
        <article>
          <span>Hospitality and gaming</span>
          <h2>Domain context matters</h2>
          <p>
            My work sits at the intersection of hospitality operations, casino analytics, machine learning, research, and teaching.
          </p>
        </article>
      </section>

      <section className="callout">
        <h2>Start a conversation</h2>
        <p>
          For consulting inquiries, send a note with the project context, timeline, and the decision you are trying to improve.
        </p>
        <a className="button" href="mailto:azizsm1@unlv.nevada.edu">
          Email Mana
        </a>
        <Link className="text-link" href="/about">
          See global project experience
        </Link>
      </section>
    </main>
  );
}
