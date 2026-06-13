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
        <footer className="site-footer">
          <div>
            <strong>Mana Azizsoltani</strong>
            <p>Hospitality analytics, machine learning, teaching, and research communication.</p>
          </div>
          <div className="footer-links">
            <a href="mailto:azizsm1@unlv.nevada.edu">Email</a>
            <a href="https://www.linkedin.com/in/manaazizsoltani/">LinkedIn</a>
            <a href="https://github.com/manaaziz">GitHub</a>
            <a href="/assets/Azizsoltani_CV.pdf">CV</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
