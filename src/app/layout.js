import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";
import "./phase-two-mobile-first.css";
import Link from "next/link";
import AnalyticsConsent from "@/components/analytics_consent";
import MobileSiteNav from "@/components/mobile_site_nav";
import SiteLogo from "@/components/site_logo";
import { getVisiblePosts } from "@/lib/posts";

const siteTitle = "Mana Azizsoltani";
const siteDescription =
  "Consultant, researcher, and professor specializing in AI and analytics in the hospitality and gaming industry";
const canonicalPortrait = "/assets/images/mana-azizsoltani-professional-portrait.webp";
const officialProfiles = [
  "https://www.linkedin.com/in/manaazizsoltani/",
  "https://scholar.google.com/citations?user=Qe4izygAAAAJ&hl=en",
  "https://orcid.org/0009-0001-5193-2823",
  "https://github.com/manaaziz",
  "https://instagram.com/mana010"
];

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://manaaziz.com/#mana-azizsoltani",
  name: siteTitle,
  alternateName: "Mana Azizsoltani",
  url: "https://manaaziz.com/",
  image: {
    "@type": "ImageObject",
    "@id": "https://manaaziz.com/#mana-portrait",
    url: `https://manaaziz.com${canonicalPortrait}`,
    contentUrl: `https://manaaziz.com${canonicalPortrait}`,
    width: 1254,
    height: 1250,
    caption: "Portrait of Mana Azizsoltani"
  },
  jobTitle: ["AI Consultant", "Researcher", "Professor"],
  description: siteDescription,
  sameAs: officialProfiles,
  knowsAbout: [
    "Artificial intelligence",
    "Data science",
    "Casino analytics",
    "Hospitality analytics",
    "Gambling research",
    "Machine learning"
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Nevada, Las Vegas"
  }
};

export const metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`
  },
  description: siteDescription,
  metadataBase: new URL("https://manaaziz.com"),
  authors: [{ name: siteTitle, url: "/" }],
  icons: {
    icon: [
      { url: "/mana-poker-chip-favicon.ico", sizes: "64x64", type: "image/x-icon" },
      { url: "/icon.png?v=mana-poker-chip", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://manaaziz.com",
    siteName: siteTitle,
    type: "profile",
    images: [{
      url: canonicalPortrait,
      width: 1254,
      height: 1250,
      alt: "Portrait of Mana Azizsoltani"
    }]
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: [canonicalPortrait]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/consulting", label: "Consulting" },
  { href: "/research", label: "Research" },
  { href: "/teaching", label: "Teaching" },
  { href: "/manalogue", label: "The Manalogue" }
];

const pageSearchItems = [
  {
    href: "/",
    title: "Home",
    type: "Page",
    description: "Main landing page for consulting, research, teaching, and writing.",
    keywords: ["landing", "work mix", "global experience"]
  },
  {
    href: "/about",
    title: "About",
    type: "Page",
    description: "Background, global experience, CV, and Mana's story.",
    keywords: ["cv", "resume", "global experience", "map", "countries", "conferences"]
  },
  {
    href: "/consulting",
    title: "Consulting",
    type: "Page",
    description: "Casino AI, analytics, marketing, surveillance, and operator-facing work.",
    keywords: ["casino", "marketing", "surveillance", "AI", "analytics"]
  },
  {
    href: "/research",
    title: "Research",
    type: "Page",
    description: "Publications, papers, conferences, and research themes.",
    keywords: ["papers", "publications", "conference", "machine learning", "gambling"]
  },
  {
    href: "/teaching",
    title: "Teaching",
    type: "Page",
    description: "Courses, student reviews, pedagogy, and teaching notes.",
    keywords: ["students", "course", "FAB 333", "reviews"]
  },
  {
    href: "/manalogue",
    title: "The Manalogue",
    type: "Page",
    description: "Blog home for essays, travel, teaching, consulting, and research notes.",
    keywords: ["blog", "posts", "writing", "travel"]
  },
  {
    href: "/manalogue?section=gallery",
    title: "Gallery",
    type: "Manalogue",
    description: "Photo gallery and visual archive.",
    keywords: ["photos", "pictures", "presentations"]
  },
  {
    href: "/assets/azizsoltani_cv.pdf",
    title: "CV",
    type: "File",
    description: "Mana Azizsoltani curriculum vitae.",
    keywords: ["resume", "vitae", "pdf"]
  }
];

const experienceSearchItems = [
  {
    href: "/about",
    title: "International Gaming Institute",
    type: "Experience",
    description: "Part-time research scientist studying AI applications in casino and hospitality.",
    keywords: ["IGI", "UNLV", "Nevada", "Las Vegas", "research"]
  },
  {
    href: "/about",
    title: "Wynn Resorts",
    type: "Experience",
    description: "International initiatives including financial analysis, database analysis, and marketing.",
    keywords: ["Nevada", "Las Vegas", "consulting", "casino"]
  },
  {
    href: "/about",
    title: "Resorts World Las Vegas",
    type: "Experience",
    description: "Product performance, operational efficiency, and surveillance recommendations.",
    keywords: ["Nevada", "Las Vegas", "casino", "operations"]
  },
  {
    href: "/about",
    title: "Walker Digital Table Systems",
    type: "Experience",
    description: "AI-powered applications for forecasting, loss discounting, efficiency, and player analytics.",
    keywords: ["WDTS", "table games", "baccarat", "forecasting", "consulting"]
  },
  {
    href: "/about",
    title: "AXES.ai",
    type: "Experience",
    description: "AI and behavioral tracking work to detect high-risk slot player behavior.",
    keywords: ["responsible gambling", "slot", "AI", "Canada"]
  },
  {
    href: "/about",
    title: "International Conference on Gambling and Risk Taking",
    type: "Experience",
    description: "Conference presentations on gambling payment declines and baccarat luck.",
    keywords: ["ICGRT", "research", "Nevada", "gambling"]
  },
  {
    href: "/about",
    title: "ICRG Conference on Gambling and Addiction",
    type: "Experience",
    description: "Research presentation on interpretable machine learning and slot player behavior.",
    keywords: ["ICRG", "gambling", "addiction", "research"]
  },
  {
    href: "/about",
    title: "Fundacion Patologia Dual",
    type: "Experience",
    description: "Research collaboration applying AI to gambling disorder in a dual disorder context.",
    keywords: ["Spain", "Madrid", "responsible gambling", "AI"]
  },
  {
    href: "/about",
    title: "Hospital Gregorio Maranon",
    type: "Experience",
    description: "Psychiatry collaboration on gambling disorder comorbidity.",
    keywords: ["Spain", "Madrid", "hospital", "research"]
  },
  {
    href: "/about",
    title: "Universidad Rey Juan Carlos",
    type: "Experience",
    description: "Applied AI research projects during a three-month research stay in Madrid.",
    keywords: ["Spain", "Madrid", "university", "research"]
  },
  {
    href: "/about",
    title: "Club de Convergentes",
    type: "Experience",
    description: "AI ethics, governance, and applications for Spanish gambling stakeholders.",
    keywords: ["Spain", "Madrid", "regulators", "casino"]
  },
  {
    href: "/about",
    title: "Melco",
    type: "Experience",
    description: "AI and data science solutions across operations, marketing, and surveillance.",
    keywords: ["Macau", "China", "casino", "consulting"]
  },
  {
    href: "/about",
    title: "Wynn Macau",
    type: "Experience",
    description: "Data science and analytics development, implementation, and training.",
    keywords: ["Macau", "China", "Wynn", "casino"]
  },
  {
    href: "/about",
    title: "Hoiana",
    type: "Experience",
    description: "Training analysts on behavioral tracking data and advising management on its use.",
    keywords: ["Vietnam", "casino", "analytics", "training"]
  },
  {
    href: "/about",
    title: "Resorts World Sentosa",
    type: "Experience",
    description: "Predictive and generative AI models for casino marketing use cases.",
    keywords: ["Singapore", "AI", "marketing", "consulting"]
  },
  {
    href: "/about",
    title: "IGT Italia",
    type: "Experience",
    description: "Panel discussion on responsible gambling research with IGT Italia.",
    keywords: ["Italy", "responsible gambling", "panel", "research"]
  },
  {
    href: "/about",
    title: "Breda University of Applied Sciences",
    type: "Experience",
    description: "Invited guest lectures and applied research conversations with data science students.",
    keywords: ["Netherlands", "BUAS", "teaching", "hospitality"]
  },
  {
    href: "/about",
    title: "Belmont University",
    type: "Experience",
    description: "Invited presentations on explainable AI research and practical business applications of AI.",
    keywords: ["Tennessee", "explainable AI", "business", "AI use cases", "research"]
  },
  {
    href: "/about",
    title: "RevME Conference",
    type: "Experience",
    description: "Research presentation on machine learning for hotel occupancy forecasting.",
    keywords: ["conference", "research", "revenue management", "hospitality"]
  },
  {
    href: "/about",
    title: "EuroCHRIE Conference 2024",
    type: "Experience",
    description: "Research presentation on explainable AI for booking cancellations.",
    keywords: ["conference", "research", "Qatar", "hospitality"]
  },
  {
    href: "/about",
    title: "Gilley's Wichita",
    type: "Experience",
    description: "Financial modeling, loyalty and marketing programs, and market research.",
    keywords: ["Kansas", "Wichita", "Gilleys", "consulting"]
  },
  {
    href: "/about",
    title: "Bally's Atlantic City",
    type: "Experience",
    description: "Customer database analysis, market research, and strategic recommendations.",
    keywords: ["New Jersey", "Atlantic City", "casino", "consulting"]
  },
  {
    href: "/about",
    title: "Casino Miami",
    type: "Experience",
    description: "Patron database analysis and AI models for patron lifecycle and lifetime value.",
    keywords: ["Florida", "Miami", "casino", "AI"]
  },
  {
    href: "/about",
    title: "Crown Resorts",
    type: "Experience",
    description: "Database analysis and strategic insights around marketing, loyalty, and responsible gaming.",
    keywords: ["Australia", "casino", "responsible gaming"]
  }
];

const footerGroups = [
  {
    title: "Work",
    links: [
      { href: "/consulting", label: "Consulting" },
      { href: "/research", label: "Research" },
      { href: "/teaching", label: "Teaching" }
    ]
  },
  {
    title: "General",
    links: [
      { href: "/about", label: "About Mana" },
      { href: "/manalogue", label: "The Manalogue" },
      { href: "mailto:manaazizsoltani@gmail.com", label: "Contact" }
    ]
  }
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/manaazizsoltani/", label: "LinkedIn", icon: "in" },
  { href: "https://instagram.com/mana010", label: "Instagram", icon: "ig" },
  { href: "https://github.com/manaaziz", label: "GitHub", icon: "gh" },
  { href: "https://scholar.google.com/citations?user=Qe4izygAAAAJ&hl=en", label: "Google Scholar", icon: "gs" },
  { href: "https://orcid.org/0009-0001-5193-2823", label: "ORCID", icon: "id" },
  { href: "https://www.ratemyprofessors.com/professor/3107663", label: "RateMyProfessors", icon: "rmp" }
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

  if (icon === "rmp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.6 4.8h16.8v10.7H9.3l-4.1 3.7.8-3.7H3.6V4.8Z" />
        <text x="6.2" y="12.3">RMP</text>
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
  const postSearchItems = getVisiblePosts().map((post) => ({
    href: post.href,
    title: post.title,
    type: post.seriesTitle || "Post",
    description: post.excerpt,
    keywords: [
      post.category,
      post.seriesSlug,
      post.map?.company,
      post.map?.city,
      post.map?.country,
      post.map?.region,
      post.map?.workType,
      ...(post.tags || [])
    ].filter(Boolean)
  }));
  const searchItems = [...pageSearchItems, ...experienceSearchItems, ...postSearchItems];

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c") }}
          type="application/ld+json"
        />
        <header className="site-header">
          <SiteLogo />
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <MobileSiteNav navItems={navItems} searchItems={searchItems} />
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
                  className="newsletter-form ph-no-capture"
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
                    <a aria-label={link.label} href={link.href} key={link.label} rel="noreferrer" target="_blank">
                      <SocialIcon icon={link.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2026 Mana Azizsoltani. All rights reserved.</p>
              <AnalyticsConsent />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
