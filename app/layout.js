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
    title: "Academic",
    links: [
      { href: "/research", label: "Research" },
      { href: "/teaching", label: "Teaching" },
      { href: "/gallery", label: "Gallery" }
    ]
  },
  {
    title: "General",
    links: [
      { href: "/about", label: "About Mana" },
      { href: "/blog", label: "Blog" },
      { href: "mailto:azizsm1@unlv.nevada.edu", label: "Contact" }
    ]
  }
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/manaazizsoltani/", label: "LinkedIn", icon: "in" },
  { href: "https://instagram.com/mana010", label: "Instagram", icon: "ig" },
  { href: "https://github.com/manaaziz", label: "GitHub", icon: "gh" },
  { href: "https://scholar.google.com/citations?user=Qe4izygAAAAJ&hl=en", label: "Google Scholar", icon: "gs" },
  { href: "https://orcid.org/0009-0001-5193-2823", label: "ORCID", icon: "id" }
];

const newsletterAction = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_URL || "";

function SocialIcon({ icon }) {
  if (icon === "in") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.1 8.6h3.2v10.3H5.1V8.6Zm1.6-5.1a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8Zm3.7 5.1h3v1.4h.1c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8v5.8h-3.2v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.2h-3.2V8.6Z" />
      </svg>
    );
  }

  if (icon === "gh") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.7c-5.2 0-9.4 4.2-9.4 9.4 0 4.1 2.7 7.7 6.4 8.9.5.1.6-.2.6-.5v-1.8c-2.6.6-3.1-1.1-3.1-1.1-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .8 1.5 2.2 1 2.7.8.1-.6.3-1 .6-1.3-2.1-.2-4.2-1-4.2-4.6 0-1 .4-1.8 1-2.5-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.8-1.2 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.5 1 2.5 0 3.6-2.2 4.4-4.3 4.6.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5 3.7-1.2 6.4-4.7 6.4-8.9 0-5.2-4.2-9.4-9.4-9.4Z" />
      </svg>
    );
  }

  if (icon === "ig") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="16.8" cy="7.4" r="0.8" />
      </svg>
    );
  }

  if (icon === "gs") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 3.8 9.2 12 15.4l8.2-6.2L12 3Z" />
        <path d="M6.4 13v3.5c1.5 1.9 3.3 2.8 5.6 2.8s4.1-.9 5.6-2.8V13" />
      </svg>
    );
  }

  if (icon === "id") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.6" />
        <path d="M9.2 8.6v6.8" />
        <path d="M12.3 8.6h1.9c1.9 0 3.2 1.4 3.2 3.4s-1.3 3.4-3.2 3.4h-1.9V8.6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.2 9.7v9.2" />
      <path d="M6.2 6.9v.1" />
      <path d="M10.4 18.9v-9h3.3c2.2 0 4.1 1.5 4.1 4.5v4.5" />
    </svg>
  );
}

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
            <div className="footer-main">
              <section className="footer-newsletter" aria-label="Newsletter signup">
                <p>Want to know when I publish new research, teaching notes, or field updates?</p>
                <p>Enter your email to join my newsletter:</p>
                <form
                  action={newsletterAction || undefined}
                  className="newsletter-form"
                  data-provider="surveymonkey"
                  method={newsletterAction ? "post" : "get"}
                >
                  <label className="sr-only" htmlFor="newsletter-email">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    placeholder="mana@example.com"
                    required
                    type="email"
                  />
                  <button aria-label="Join newsletter" disabled={!newsletterAction} type="submit">
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
              </section>

              <div className="footer-links-panel">
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

                <div className="footer-socials" aria-label="Social links">
                  {socialLinks.map((link) => (
                    <a aria-label={link.label} href={link.href} key={link.label}>
                      <SocialIcon icon={link.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2026 Mana Azizsoltani. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
