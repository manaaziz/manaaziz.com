import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: {
    default: "Mana Azizsoltani",
    template: "%s | Mana Azizsoltani"
  },
  description:
    "Hospitality analytics researcher, educator, and data storyteller working across machine learning, tourism, gaming, and quantitative education.",
  metadataBase: new URL("https://manaaziz.com")
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/teaching", label: "Teaching" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" }
];

const footerGroups = [
  {
    title: "Explore",
    links: [
      { href: "/research", label: "Research" },
      { href: "/teaching", label: "Teaching" },
      { href: "/gallery", label: "Gallery" },
      { href: "/about", label: "About" }
    ]
  },
  {
    title: "Writing",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/blog/becoming-dr-mana", label: "Becoming Dr. Mana" },
      { href: "/blog/europe-2023", label: "Europe 2023" },
      { href: "/blog/barcelona", label: "Barcelona" }
    ]
  },
  {
    title: "Connect",
    links: [
      { href: "https://www.linkedin.com/in/manaazizsoltani/", label: "LinkedIn" },
      { href: "https://instagram.com/mana010", label: "Instagram" },
      { href: "https://github.com/manaaziz", label: "GitHub" },
      { href: "https://scholar.google.com/citations?user=Qe4izygAAAAJ&hl=en", label: "Google Scholar" },
      { href: "https://orcid.org/0009-0001-5193-2823", label: "ORCID" }
    ]
  },
  {
    title: "General",
    links: [
      { href: "/assets/Azizsoltani_CV.pdf", label: "CV" },
      { href: "mailto:azizsm1@unlv.nevada.edu", label: "Email" },
      { href: "/podcast", label: "Podcast" }
    ]
  }
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/manaazizsoltani/", label: "LinkedIn" },
  { href: "https://instagram.com/mana010", label: "Instagram" },
  { href: "https://github.com/manaaziz", label: "GitHub" },
  { href: "https://scholar.google.com/citations?user=Qe4izygAAAAJ&hl=en", label: "Scholar" },
  { href: "https://orcid.org/0009-0001-5193-2823", label: "ORCID" }
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Mana Azizsoltani home">
            <span>MA</span>
            <strong>Mana Azizsoltani</strong>
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
        <footer className="site-footer" id="footer">
          <div className="footer-inner">
            <section className="footer-brand" aria-label="Site summary">
              <strong>Mana Azizsoltani</strong>
              <p>Hospitality analytics, machine learning, teaching, and research communication.</p>
            </section>

            <nav className="footer-directory" aria-label="Footer navigation">
              {footerGroups.map((group) => (
                <div className="footer-group" key={group.title}>
                  <h2>{group.title}</h2>
                  {group.links.map((link) => (
                    <a href={link.href} key={`${group.title}-${link.label}`}>
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </nav>

            <div className="footer-bottom">
              <p>© 2026 Mana Azizsoltani. All rights reserved.</p>
              <div className="footer-socials" aria-label="Social links">
                {socialLinks.map((link) => (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
