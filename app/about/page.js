export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">About</p>
      <h1>About Mana</h1>
      <p className="lede">
        I am a hospitality analytics researcher and educator from Las Vegas with training in mathematics, statistics, and hospitality administration. My work connects predictive modeling, machine learning, tourism, gaming, revenue management, and the practical question of how people learn quantitative ideas.
      </p>

      <figure className="wide-image">
        <img src="/assets/images/triphoto-about.jpg" alt="Mana Azizsoltani traveling with a landscape in the background" />
      </figure>

      <section className="article-list">
        <article>
          <span>Education</span>
          <h2>Mathematics, statistics, and hospitality administration</h2>
          <p>I studied mathematics at UNLV, earned a master's degree in statistics from North Carolina State University, and pursued doctoral work in Hospitality Administration at UNLV's William F. Harrah College of Hospitality.</p>
        </article>
        <article>
          <span>Research</span>
          <h2>Data-driven hospitality and gaming questions</h2>
          <p>My research interests include predictive and statistical modeling, machine learning applications to hospitality, revenue management, gaming analytics, and hotel demand forecasting.</p>
        </article>
        <article>
          <span>Teaching and service</span>
          <h2>Classrooms, student organizations, and community work</h2>
          <p>I have taught and supported statistics, entrepreneurship, mathematics, and hospitality courses; founded student organizations; served in academic and community roles; and helped organize events that connect students with professional opportunities.</p>
        </article>
      </section>

      <section className="callout">
        <h2>Beyond the CV</h2>
        <p>I grew up in Las Vegas and have also spent formative time abroad, including Barcelona. I care about culture, language, soccer, music, community-building, and making technical work feel more human and useful.</p>
      </section>
    </main>
  );
}
