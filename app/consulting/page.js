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
        I help casino and hospitality teams turn analytics, forecasting, machine learning, and AI into clearer decisions across marketing, surveillance, and operational optimization.
      </p>

      <section className="article-list">
        <article>
          <span>Marketing</span>
          <h2>From segmentation to individual-level personalization</h2>
          <p>
            Casino marketing is moving beyond broad segments and micro-segments toward the right offer, for the right patron, at the right time, with the right components, terms, and delivery channel.
          </p>
        </article>
        <article>
          <span>Player behavior</span>
          <h2>Models that explain who may change behavior</h2>
          <p>
            Projects include offer sensitivity, churn prediction, patron lifecycle modeling, future value prediction, preference modeling, and personalized offer construction.
          </p>
        </article>
        <article>
          <span>Surveillance and operations</span>
          <h2>Signals that help teams act faster</h2>
          <p>
            Work includes real-time marketing, AI-crafted unusual loss offers, unusually high loss thresholds by patron, improbable loss detection, forecasting, reporting, and operator-facing recommendations.
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
