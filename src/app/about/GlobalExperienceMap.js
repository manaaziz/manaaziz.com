"use client";

import { useMemo, useState } from "react";
import worldMap from "@svg-maps/world";
import usAtlas from "us-atlas/states-albers-10m.json";
import { feature, mesh } from "topojson-client";
import { geoPath } from "d3-geo";

const card = ({ name, type, blurb, href, logo, countryId }) => ({
  name,
  type,
  blurb,
  href,
  logo,
  countryId
});

const tileInitials = (name) =>
  name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const collaborations = [
  {
    country: "United States",
    id: "us",
    summary: "Gaming, hospitality, analytics, teaching, and research work rooted in Las Vegas.",
    drilldown: true,
    work: [
      card({
        name: "UNLV College of Hospitality",
        type: "Teaching",
        blurb: "Taught and supported applied statistics, analytics, and hospitality coursework.",
        href: "/teaching",
        logo: "/assets/logos/unlvhospitality_logo.jpeg"
      }),
      card({
        name: "International Gaming Institute",
        type: "Research",
        blurb: "Worked on gaming research at the intersection of data, operations, and policy.",
        href: "/research",
        logo: "/assets/logos/unlv_igi_logo.jpeg"
      }),
      card({
        name: "Wynn Resorts",
        type: "Consulting",
        blurb: "Supported analytics work tied to Wynn and Encore casino and hospitality operations.",
        logo: "/assets/logos/Wynn_Las_Vegas_logo.svg.png"
      }),
      card({
        name: "Resorts World Las Vegas",
        type: "Consulting",
        blurb: "Supported integrated resort and casino hospitality analytics context in Las Vegas.",
        logo: "/assets/logos/resorts_world_LV_logo_transparent.png"
      }),
      card({
        name: "WDTS",
        type: "Consulting",
        blurb: "Explored gaming technology and data questions connected to operator workflows.",
        logo: "/assets/logos/wdts_logo.png"
      }),
      card({
        name: "AXES",
        type: "Research",
        blurb: "Connected casino payments and player behavior data to applied analytics questions.",
        logo: "/assets/logos/axes_logo.png"
      }),
      card({
        name: "International Conference on Gambling & Risk Taking",
        type: "Research",
        blurb: "Presented work on baccarat luck quantification and declined gambling payment transactions in Las Vegas.",
        href: "/research",
        logo: "/assets/logos/gambling_risk_taking_logo.jpg"
      }),
      card({
        name: "ICRG Conference on Gambling and Addiction",
        type: "Research",
        blurb: "Presented work on interpretable gambler clusters and slot-machine player clustering in Las Vegas.",
        href: "/research",
        logo: "/assets/logos/icrg_conference.png"
      }),
      card({
        name: "GLI Regulator Roundtable",
        type: "Research",
        blurb: "Presented research characterizing UK online gamblers exceeding financial risk thresholds.",
        href: "/research",
        logo: "/assets/logos/gli_regulator_roundtable.png"
      }),
      card({
        name: "Casino Miami",
        type: "Consulting",
        blurb: "Supported casino and hospitality consulting context connected to South Florida operations.",
        logo: "/assets/logos/casino_miami_logo.png"
      }),
      card({
        name: "Gilley's Kansas City",
        type: "Consulting",
        blurb: "Supported hospitality and entertainment consulting context connected to Kansas City.",
        logo: "/assets/logos/gilleys_logo_transparent.png"
      }),
      card({
        name: "Oakmont",
        type: "Consulting",
        blurb: "Supported consulting work connected to Texas hospitality and entertainment operations.",
        logo: "/assets/logos/oakmont_logo_transparent.png"
      }),
      card({
        name: "Graduate Education & Graduate Student Research Conference",
        type: "Research",
        blurb: "Presented a scoping review on how hotel customers feel about AI service technologies in Miami.",
        href: "/research",
        logo: "/assets/logos/west_chrie_2023.jpeg"
      }),
      card({
        name: "Conference on Statistical Practice",
        type: "Research",
        blurb: "Attended the 2020 Conference on Statistical Practice in Sacramento, California.",
        href: "/research",
        logo: "/assets/logos/csp_2020_logo.svg"
      }),
      card({
        name: "RevME Hospitality Management and Analytics Conference",
        type: "Research",
        blurb: "Presented machine learning prediction of hotel room demand in Nashville.",
        href: "/research",
        logo: "/assets/logos/revme_conf_logo.png"
      }),
      card({
        name: "Belmont University",
        type: "Teaching",
        blurb: "Delivered invited talks to Belmont students and professors about data, AI, and applied analytics.",
        href: "/teaching",
        logo: "/assets/logos/belmont_university_logo.png"
      }),
      card({
        name: "GMA Consulting",
        type: "Consulting",
        blurb: "Supported Denver-based consulting work translating casino data into operational recommendations.",
        logo: "/assets/logos/gma_logo.png.webp"
      }),
      card({
        name: "Bally's Atlantic City",
        type: "Consulting",
        blurb: "Supported casino and hospitality consulting context connected to Atlantic City operations.",
        logo: "/assets/logos/ballys_corporation_logo.svg"
      }),
      card({
        name: "Master's degree",
        type: "Education",
        blurb: "Earned a master's degree in North Carolina before continuing into doctoral research and applied analytics.",
        logo: "/assets/logos/nc_state_logo.svg"
      }),
      card({
        name: "Student statistical consultant",
        type: "Consulting",
        blurb: "Served as a student statistical consultant, supporting applied quantitative research and analysis projects.",
        logo: "/assets/logos/nc_state_logo.svg"
      })
    ]
  },
  {
    country: "Spain",
    id: "es",
    summary: "Academic, cultural, and community ties from time spent studying and working in Barcelona.",
    work: [
      card({
        name: "IEEE Conference on Artificial Intelligence",
        type: "Research",
        blurb: "Presented Shapley interaction networks work on explaining the clinical course of gambling disorder in Granada.",
        href: "/research",
        logo: "/assets/logos/cai_granada_logo.png"
      }),
      card({
        name: "Club de Convergentes",
        type: "Research",
        blurb: "Presented work on AI ethics and governance in the gambling sector in Madrid.",
        href: "/research",
        logo: "/assets/logos/club_convergentes.png"
      }),
      card({
        name: "Fundacion Patologia Dual",
        type: "Research",
        blurb: "Connected research conversations to dual pathology work in Madrid.",
        logo: "/assets/logos/fund_path_dual_transparent.png"
      })
    ]
  },
  {
    country: "Netherlands",
    id: "nl",
    summary: "Invited academic guest experience with Breda University of Applied Sciences.",
    work: [
      card({
        name: "Breda University of Applied Sciences",
        type: "Teaching",
        blurb: "Visited as an invited guest connected to hospitality, tourism, gaming, and applied research conversations.",
        href: "https://pure.buas.nl/en/activities/mana-azizsoltani/",
        logo: "/assets/logos/buas_logo.png"
      })
    ]
  },
  {
    country: "Italy",
    id: "it",
    summary: "Gambling studies and responsible gambling research presentations in Italy.",
    work: [
      card({
        name: "European Conference on Gambling Studies and Policy Issues",
        type: "Research",
        blurb: "Presented work on MG-CFA measurement invariance for the PGSI in Rome.",
        href: "/research",
        logo: "/assets/logos/easg_rome_logo.png"
      })
    ]
  },
  {
    country: "Malta",
    id: "mt",
    summary: "Safer gambling research presentations connected to Malta.",
    work: [
      card({
        name: "Webinar on Safer Gambling",
        type: "Research",
        blurb: "Presented machine learning work on detecting customer transaction decline.",
        href: "/research",
        logo: "/assets/logos/sgcertified_logo.jpeg"
      })
    ]
  },
  {
    country: "United Kingdom",
    id: "gb",
    summary: "Trust, gaming, and hospitality-facing analytics connections.",
    work: [
      card({
        name: "Department of Trust",
        type: "Research",
        blurb: "Explored trust, compliance, and gaming-related analytics questions.",
        logo: "/assets/logos/department_trust_logo.jpeg"
      }),
      card({
        name: "Wynn Mayfair",
        type: "Consulting",
        blurb: "Tracked international luxury hospitality and gaming market context.",
        logo: "/assets/logos/wynn_mayfair_logo.png"
      })
    ]
  },
  {
    country: "United Arab Emirates",
    id: "ae",
    summary: "Resort and gaming analytics connections in the Gulf region.",
    work: [
      card({
        name: "Wynn Al Marjan Island",
        type: "Consulting",
        blurb: "Followed emerging integrated resort strategy in a new gaming market.",
        logo: "/assets/logos/wynn_al_marjan_logo.png"
      })
    ]
  },
  {
    country: "Qatar",
    id: "qa",
    summary: "Hospitality and tourism research presentations in Qatar.",
    work: [
      card({
        name: "EuroCHRIE Conference 2024",
        type: "Research",
        blurb: "Presented interpretable forecasting of hotel booking cancellations with stacked generalization.",
        href: "/research",
        logo: "/assets/logos/eurochrie_2024_qatar.png"
      })
    ]
  },
  {
    country: "China",
    id: "cn",
    summary: "Integrated resort and casino hospitality work across China and Macau.",
    work: [
      card({
        name: "International Conference on Culture, Tourism, and Hospitality",
        type: "Research",
        blurb: "Presented explainable machine learning work for hotel upselling in Portugal from Macau.",
        href: "/research",
        logo: "/assets/logos/iccth_macau.png"
      }),
      card({
        name: "Wynn",
        type: "Consulting",
        blurb: "Worked with Wynn-related Macau context across premium integrated resort operations, casino hospitality, and market strategy.",
        href: "/blog/europe-2023",
        logo: "/assets/logos/wynn_macau_logo.png"
      }),
      card({
        name: "Melco",
        type: "Consulting",
        blurb: "Studied integrated resort positioning and casino hospitality operations across Melco's Macau portfolio.",
        logo: "/assets/logos/Melco_logo.png"
      })
    ]
  },
  {
    country: "South Korea",
    id: "kr",
    summary: "Integrated resort entertainment and hospitality analytics work in Korea.",
    work: [
      card({
        name: "INSPIRE Resort Entertainment",
        type: "Consulting",
        blurb: "Worked on casino and resort analytics questions for an integrated entertainment resort.",
        logo: "/assets/logos/inspire_resort_logo.png"
      })
    ]
  },
  {
    country: "Vietnam",
    id: "vn",
    summary: "Integrated resort and hospitality connections in Southeast Asia.",
    work: [
      card({
        name: "Hoiana",
        type: "Consulting",
        blurb: "Reviewed integrated resort and casino hospitality context in Southeast Asia.",
        logo: "/assets/logos/hoiana_logo.png"
      })
    ]
  },
  {
    country: "Singapore",
    id: "sg",
    summary: "Integrated resort and hospitality consulting connections in Singapore.",
    work: [
      card({
        name: "Resorts World Sentosa",
        type: "Consulting",
        blurb: "Supported integrated resort and casino hospitality analytics context in Singapore.",
        logo: "/assets/logos/resorts_world_singapore_logo_transparent.png"
      })
    ]
  },
  {
    country: "Argentina",
    id: "ar",
    summary: "Invited guest experience with the University of Buenos Aires.",
    work: [
      card({
        name: "University of Buenos Aires",
        type: "Teaching",
        blurb: "Visited as an invited guest for international academic exchange and applied analytics conversation.",
        logo: "/assets/logos/uba_logo.svg"
      })
    ]
  },
  {
    country: "Australia",
    id: "au",
    summary: "Gaming and hospitality industry connections in Australia.",
    work: [
      card({
        name: "Technology, Risk and Gambling Early Career Researcher Showcase",
        type: "Research",
        blurb: "Presented work on clustering slot machine players using session-level transaction data.",
        href: "/research",
        logo: "/assets/logos/usydney_logo.svg"
      }),
      card({
        name: "Crown Resorts",
        type: "Consulting",
        blurb: "Worked with gaming and hospitality context for Australian operator questions.",
        logo: "/assets/logos/crown_resorts_logo.png"
      }),
      card({
        name: "The Star Entertainment Group",
        type: "Consulting",
        blurb: "Tracked operator strategy and casino hospitality questions in Australia.",
        logo: "/assets/logos/the_star_logo.png"
      })
    ]
  }
];

const globalRegions = [
  {
    id: "north-america",
    label: "North America",
    summary: "U.S.-based casino analytics, teaching, consulting, and gaming research work.",
    countries: ["us"],
    defaultCountry: "us",
    position: { left: "22%", top: "38%" },
    mapCountries: ["bz", "ca", "cr", "gt", "hn", "mx", "ni", "pa", "sv", "us"],
    viewBox: "0 125 355 330"
  },
  {
    id: "south-america",
    label: "South America",
    summary: "Invited academic exchange and applied analytics conversations in Argentina.",
    countries: ["ar"],
    defaultCountry: "ar",
    position: { left: "34%", top: "70%" },
    mapCountries: ["ar", "bo", "br", "cl", "co", "ec", "fk", "gf", "gy", "pe", "py", "sr", "uy", "ve"],
    viewBox: "195 300 285 380"
  },
  {
    id: "europe",
    label: "Europe",
    summary: "Academic, trust, hospitality, and gaming connections across Europe.",
    countries: ["gb", "es", "nl", "it", "mt"],
    defaultCountry: "gb",
    position: { left: "49%", top: "32%" },
    mapCountries: [
      "ad", "al", "at", "ba", "be", "bg", "by", "ch", "cz", "de", "dk", "ee", "es", "fi", "fo", "fr", "gb",
      "gg", "gi", "gr", "hr", "hu", "ie", "im", "is", "it", "je", "li", "lt", "lu", "lv", "mc", "md", "me",
      "mk", "mt", "nl", "no", "pl", "pt", "ro", "rs", "se", "si", "sk", "sm", "ua", "va"
    ],
    viewBox: "395 230 185 160"
  },
  {
    id: "africa",
    label: "Africa",
    summary: "Future collaborations in Africa will live here as the project list grows.",
    countries: [],
    position: { left: "52%", top: "61%" },
    mapCountries: [
      "ao", "bf", "bi", "bj", "bw", "cd", "cf", "cg", "ci", "cm", "cv", "dj", "dz", "eg", "eh", "er", "et",
      "ga", "gh", "gm", "gn", "gq", "gw", "ke", "km", "lr", "ls", "ly", "ma", "mg", "ml", "mr", "mu", "mw",
      "mz", "na", "ne", "ng", "re", "rw", "sc", "sd", "sh", "sl", "sn", "so", "ss", "st", "sz", "td", "tg",
      "tn", "tz", "ug", "yt", "za", "zm", "zw"
    ],
    viewBox: "410 330 245 300"
  },
  {
    id: "middle-east",
    label: "Middle East",
    summary: "Emerging integrated resort and gaming analytics work in the Gulf region.",
    countries: ["ae", "qa"],
    defaultCountry: "ae",
    position: { left: "60%", top: "48%" },
    mapCountries: ["ae", "bh", "cy", "il", "iq", "jo", "kw", "lb", "om", "ps", "qa", "sa", "sy", "tr", "ye"],
    viewBox: "555 320 140 115"
  },
  {
    id: "asia",
    label: "Asia",
    summary: "Integrated resort, casino, and hospitality analytics work across East and Southeast Asia.",
    countries: ["cn", "kr", "vn", "sg"],
    defaultCountry: "cn",
    position: { left: "76%", top: "43%" },
    mapCountries: [
      "af", "am", "az", "bd", "bn", "bt", "cc", "cn", "cx", "ge", "hk", "id", "in", "jp", "kg", "kh", "kp",
      "kr", "kz", "la", "lk", "mm", "mn", "mo", "my", "np", "ph", "pk", "sg", "th", "tj", "tm", "tw", "uz", "vn"
    ],
    viewBox: "610 205 330 305"
  },
  {
    id: "oceania",
    label: "Oceania",
    summary: "Gaming and hospitality operator connections in Australia.",
    countries: ["au"],
    defaultCountry: "au",
    position: { left: "79%", top: "73%" },
    mapCountries: ["as", "au", "fj", "fm", "gu", "ki", "mh", "mp", "nc", "nf", "nr", "nz", "pf", "pg", "pn", "pw", "sb", "tk", "to", "tv", "vu", "wf", "ws"],
    viewBox: "780 450 220 180"
  }
];

const countryFloatPositions = {
  us: { left: "45%", top: "48%" },
  gb: { left: "41%", top: "42%" },
  es: { left: "38%", top: "68%" },
  nl: { left: "48%", top: "36%" },
  it: { left: "54%", top: "71%" },
  mt: { left: "58%", top: "82%" },
  qa: { left: "54%", top: "62%" },
  ar: { left: "52%", top: "70%" },
  ae: { left: "58%", top: "60%" },
  cn: { left: "54%", top: "60%" },
  kr: { left: "66%", top: "48%" },
  vn: { left: "54%", top: "75%" },
  sg: { left: "49%", top: "86%" },
  au: { left: "42%", top: "58%" }
};

const flagColumnCount = 12;
const flagSvgViewBox = "0 0 120 80";

function Star({ cx, cy, fill = "#fff", points = 5, outer = 6, inner = 2.5, rotate = -90 }) {
  const path = Array.from({ length: points * 2 }).map((_, index) => {
    const angle = ((Math.PI * 2 * index) / (points * 2)) + (rotate * Math.PI / 180);
    const radius = index % 2 === 0 ? outer : inner;
    return `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`;
  }).join(" ");

  return <polygon points={path} fill={fill} />;
}

function UnionJack({ x = 0, y = 0, width = 120, height = 80 }) {
  const cx = x + width / 2;
  const cy = y + height / 2;

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="#012169" />
      <line x1={x} y1={y} x2={x + width} y2={y + height} stroke="#fff" strokeWidth={height * 0.18} />
      <line x1={x + width} y1={y} x2={x} y2={y + height} stroke="#fff" strokeWidth={height * 0.18} />
      <line x1={x} y1={y} x2={x + width} y2={y + height} stroke="#c8102e" strokeWidth={height * 0.08} />
      <line x1={x + width} y1={y} x2={x} y2={y + height} stroke="#c8102e" strokeWidth={height * 0.08} />
      <rect x={x} y={cy - height * 0.14} width={width} height={height * 0.28} fill="#fff" />
      <rect x={cx - width * 0.09} y={y} width={width * 0.18} height={height} fill="#fff" />
      <rect x={x} y={cy - height * 0.08} width={width} height={height * 0.16} fill="#c8102e" />
      <rect x={cx - width * 0.055} y={y} width={width * 0.11} height={height} fill="#c8102e" />
    </g>
  );
}

function FlagArt({ countryId }) {
  switch (countryId) {
    case "us":
      return (
        <>
          <rect width="120" height="80" fill="#fff" />
          {Array.from({ length: 7 }).map((_, index) => (
            <rect key={index} y={index * (80 / 13) * 2} width="120" height={80 / 13} fill="#b22234" />
          ))}
          <rect width="52" height={80 * 7 / 13} fill="#3c3b6e" />
          {Array.from({ length: 5 }).map((_, row) => (
            Array.from({ length: 6 }).map((__, col) => (
              <circle key={`full-${row}-${col}`} cx={5 + col * 8} cy={5 + row * 8} r="1.15" fill="#fff" />
            ))
          ))}
          {Array.from({ length: 4 }).map((_, row) => (
            Array.from({ length: 5 }).map((__, col) => (
              <circle key={`offset-${row}-${col}`} cx={9 + col * 8} cy={9 + row * 8} r="1.15" fill="#fff" />
            ))
          ))}
        </>
      );
    case "gb":
      return <UnionJack />;
    case "es":
      return (
        <>
          <rect width="120" height="80" fill="#aa151b" />
          <rect y="20" width="120" height="40" fill="#f1bf00" />
          <rect x="30" y="31" width="10" height="16" rx="1.5" fill="#c60b1e" />
          <rect x="33" y="28" width="4" height="5" fill="#f1bf00" />
        </>
      );
    case "nl":
      return (
        <>
          <rect width="120" height="80" fill="#fff" />
          <rect width="120" height="26.666" fill="#ae1c28" />
          <rect y="53.333" width="120" height="26.667" fill="#21468b" />
        </>
      );
    case "it":
      return (
        <>
          <rect width="40" height="80" fill="#009246" />
          <rect x="40" width="40" height="80" fill="#fff" />
          <rect x="80" width="40" height="80" fill="#ce2b37" />
        </>
      );
    case "mt":
      return (
        <>
          <rect width="60" height="80" fill="#fff" />
          <rect x="60" width="60" height="80" fill="#cf142b" />
          <g transform="translate(13 10)">
            <path d="M0 5h6V0h8v5h6v8h-6v6H6v-6H0Z" fill="#b7b7b7" stroke="#777" strokeWidth="1.4" />
            <path d="M6 5h8v8H6Z" fill="#fff" opacity="0.5" />
          </g>
        </>
      );
    case "ae":
      return (
        <>
          <rect width="120" height="80" fill="#fff" />
          <rect y="0" width="120" height="26.666" fill="#009739" />
          <rect y="53.333" width="120" height="26.667" fill="#000" />
          <rect width="30" height="80" fill="#ff0000" />
        </>
      );
    case "cn":
      return (
        <>
          <rect width="120" height="80" fill="#de2910" />
          <Star cx={20} cy={19} outer={9} inner={3.8} fill="#ffde00" />
          <Star cx={38} cy={10} outer={3.8} inner={1.5} fill="#ffde00" rotate={-30} />
          <Star cx={47} cy={18} outer={3.8} inner={1.5} fill="#ffde00" rotate={-8} />
          <Star cx={47} cy={31} outer={3.8} inner={1.5} fill="#ffde00" rotate={18} />
          <Star cx={38} cy={39} outer={3.8} inner={1.5} fill="#ffde00" rotate={42} />
        </>
      );
    case "kr":
      return (
        <>
          <rect width="120" height="80" fill="#fff" />
          <g transform="translate(60 40) rotate(-32)">
            <circle r="18" fill="#c60c30" />
            <path d="M-18 0A18 18 0 0 0 18 0A9 9 0 0 0 0 0A9 9 0 0 1 -18 0Z" fill="#003478" />
          </g>
          <g stroke="#111" strokeWidth="3.2" strokeLinecap="butt">
            <g transform="translate(27 18) rotate(-32)">
              <line x1="-9" y1="-7" x2="9" y2="-7" />
              <line x1="-9" y1="0" x2="9" y2="0" />
              <line x1="-9" y1="7" x2="9" y2="7" />
            </g>
            <g transform="translate(93 62) rotate(-32)">
              <line x1="-9" y1="-7" x2="-2" y2="-7" />
              <line x1="2" y1="-7" x2="9" y2="-7" />
              <line x1="-9" y1="0" x2="9" y2="0" />
              <line x1="-9" y1="7" x2="-2" y2="7" />
              <line x1="2" y1="7" x2="9" y2="7" />
            </g>
            <g transform="translate(93 18) rotate(32)">
              <line x1="-9" y1="-7" x2="9" y2="-7" />
              <line x1="-9" y1="0" x2="-2" y2="0" />
              <line x1="2" y1="0" x2="9" y2="0" />
              <line x1="-9" y1="7" x2="9" y2="7" />
            </g>
            <g transform="translate(27 62) rotate(32)">
              <line x1="-9" y1="-7" x2="-2" y2="-7" />
              <line x1="2" y1="-7" x2="9" y2="-7" />
              <line x1="-9" y1="0" x2="-2" y2="0" />
              <line x1="2" y1="0" x2="9" y2="0" />
              <line x1="-9" y1="7" x2="-2" y2="7" />
              <line x1="2" y1="7" x2="9" y2="7" />
            </g>
          </g>
        </>
      );
    case "qa":
      return (
        <>
          <rect width="120" height="80" fill="#8a1538" />
          <rect width="34" height="80" fill="#fff" />
          <path d="M34 0l12 4.444l-12 4.445l12 4.444l-12 4.445l12 4.444l-12 4.445l12 4.444l-12 4.445l12 4.444l-12 4.445l12 4.444l-12 4.445l12 4.444l-12 4.445l12 4.444l-12 4.445l12 4.444l-12 4.445V0Z" fill="#fff" />
        </>
      );
    case "ar":
      return (
        <>
          <rect width="120" height="80" fill="#75aadb" />
          <rect y="26.666" width="120" height="26.667" fill="#fff" />
          <circle cx="60" cy="40" r="7" fill="#f6b40e" />
          <circle cx="60" cy="40" r="3.2" fill="#8b5a1c" />
        </>
      );
    case "vn":
      return (
        <>
          <rect width="120" height="80" fill="#da251d" />
          <Star cx={60} cy={40} outer={17} inner={6.7} fill="#ffde00" />
        </>
      );
    case "sg":
      return (
        <>
          <rect width="120" height="40" fill="#ef3340" />
          <rect y="40" width="120" height="40" fill="#fff" />
          <circle cx="25" cy="20" r="13" fill="#fff" />
          <circle cx="31" cy="20" r="11" fill="#ef3340" />
          <g transform="translate(43 20)">
            {Array.from({ length: 5 }).map((_, index) => {
              const angle = (-90 + index * 72) * Math.PI / 180;
              return (
                <Star
                  cx={Math.cos(angle) * 8}
                  cy={Math.sin(angle) * 8}
                  fill="#fff"
                  inner={1}
                  key={index}
                  outer={2.6}
                />
              );
            })}
          </g>
        </>
      );
    case "au":
      return (
        <>
          <rect width="120" height="80" fill="#012169" />
          <UnionJack x={0} y={0} width={58} height={38} />
          <Star cx={83} cy={44} outer={8} inner={3.2} points={7} fill="#fff" />
          <Star cx={101} cy={18} outer={4.2} inner={1.8} points={7} fill="#fff" />
          <Star cx={108} cy={34} outer={4.2} inner={1.8} points={7} fill="#fff" />
          <Star cx={96} cy={57} outer={4.2} inner={1.8} points={7} fill="#fff" />
          <Star cx={111} cy={65} outer={3.5} inner={1.5} points={5} fill="#fff" />
        </>
      );
    default:
      return (
        <>
          <rect width="120" height="80" fill="#fffaf1" />
          <rect y="0" width="120" height="26.7" fill="#2f6f64" />
          <rect y="53.3" width="120" height="26.7" fill="#171717" />
        </>
      );
  }
}

function AnimatedFlag({ countryId, label }) {
  return (
    <span
      aria-label={`${label} flag`}
      className="mini-flag"
      role="img"
    >
      {Array.from({ length: flagColumnCount }).map((_, index) => (
        <span
          aria-hidden="true"
          className="mini-flag-column"
          key={index}
          style={{
            "--column-index": index,
            "--column-count": flagColumnCount,
            "--column-offset": index
          }}
        >
          <svg
            aria-hidden="true"
            className="mini-flag-art"
            preserveAspectRatio="none"
            viewBox={flagSvgViewBox}
          >
            <FlagArt countryId={countryId} />
          </svg>
        </span>
      ))}
    </span>
  );
}

const usStates = [
  {
    id: "nevada",
    label: "Nevada",
    summary: "Casino analytics, teaching, consulting, and gaming research concentrated in Nevada.",
    work: [
      card({
        name: "UNLV College of Hospitality",
        type: "Teaching",
        blurb: "Taught and supported applied statistics, analytics, and hospitality coursework.",
        href: "/teaching",
        logo: "/assets/logos/unlvhospitality_logo.jpeg"
      }),
      card({
        name: "International Gaming Institute",
        type: "Research",
        blurb: "Worked on gaming research at the intersection of data, operations, and policy.",
        href: "/research",
        logo: "/assets/logos/unlv_igi_logo.jpeg"
      }),
      card({
        name: "Wynn Resorts",
        type: "Consulting",
        blurb: "Supported analytics work tied to Wynn and Encore casino and hospitality operations.",
        logo: "/assets/logos/Wynn_Las_Vegas_logo.svg.png"
      }),
      card({
        name: "Resorts World Las Vegas",
        type: "Consulting",
        blurb: "Supported integrated resort and casino hospitality analytics context in Las Vegas.",
        logo: "/assets/logos/resorts_world_LV_logo_transparent.png"
      }),
      card({
        name: "WDTS",
        type: "Consulting",
        blurb: "Explored gaming technology and data questions connected to operator workflows.",
        logo: "/assets/logos/wdts_logo.png"
      }),
      card({
        name: "AXES",
        type: "Research",
        blurb: "Connected casino payments and player behavior data to applied analytics questions.",
        logo: "/assets/logos/axes_logo.png"
      }),
      card({
        name: "International Conference on Gambling & Risk Taking",
        type: "Research",
        blurb: "Presented work on baccarat luck quantification and declined gambling payment transactions in Las Vegas.",
        href: "/research",
        logo: "/assets/logos/gambling_risk_taking_logo.jpg"
      }),
      card({
        name: "ICRG Conference on Gambling and Addiction",
        type: "Research",
        blurb: "Presented work on interpretable gambler clusters and slot-machine player clustering in Las Vegas.",
        href: "/research",
        logo: "/assets/logos/icrg_conference.png"
      }),
      card({
        name: "GLI Regulator Roundtable",
        type: "Research",
        blurb: "Presented research characterizing UK online gamblers exceeding financial risk thresholds.",
        href: "/research",
        logo: "/assets/logos/gli_regulator_roundtable.png"
      }),
    ],
    state: "Nevada"
  },
  {
    id: "florida",
    label: "Florida",
    summary: "Casino and hospitality consulting work in South Florida.",
    work: [
      card({
        name: "Casino Miami",
        type: "Consulting",
        blurb: "Supported casino and hospitality consulting context connected to South Florida operations.",
        logo: "/assets/logos/casino_miami_logo.png"
      }),
      card({
        name: "Graduate Education & Graduate Student Research Conference",
        type: "Research",
        blurb: "Presented a scoping review on how hotel customers feel about AI service technologies in Miami.",
        href: "/research",
        logo: "/assets/logos/west_chrie_2023.jpeg"
      })
    ],
    state: "Florida"
  },
  {
    id: "california",
    label: "California",
    summary: "Applied statistics and professional practice conference experience in Sacramento.",
    work: [
      card({
        name: "Conference on Statistical Practice",
        type: "Research",
        blurb: "Attended the 2020 Conference on Statistical Practice in Sacramento, California.",
        href: "/research",
        logo: "/assets/logos/csp_2020_logo.svg"
      })
    ],
    state: "California"
  },
  {
    id: "tennessee",
    label: "Tennessee",
    summary: "Hospitality analytics, research presentations, and invited teaching talks in Nashville.",
    work: [
      card({
        name: "RevME Hospitality Management and Analytics Conference",
        type: "Research",
        blurb: "Presented machine learning prediction of hotel room demand in Nashville.",
        href: "/research",
        logo: "/assets/logos/revme_conf_logo.png"
      }),
      card({
        name: "Belmont University",
        type: "Teaching",
        blurb: "Delivered invited talks to Belmont students and professors about data, AI, and applied analytics.",
        href: "/teaching",
        logo: "/assets/logos/belmont_university_logo.png"
      })
    ],
    state: "Tennessee"
  },
  {
    id: "colorado",
    label: "Colorado",
    summary: "Denver-based consulting work with GMA Consulting.",
    work: [
      card({
        name: "GMA Consulting",
        type: "Consulting",
        blurb: "Supported Denver-based casino consulting work by turning analysis into operator-facing recommendations.",
        logo: "/assets/logos/gma_logo.png.webp"
      })
    ],
    state: "Colorado"
  },
  {
    id: "new-jersey",
    label: "New Jersey",
    summary: "Atlantic City casino and operator-facing hospitality work.",
    work: [
      card({
        name: "Bally's Atlantic City",
        type: "Consulting",
        blurb: "Supported casino and hospitality consulting context connected to Atlantic City operations.",
        logo: "/assets/logos/ballys_corporation_logo.svg"
      })
    ],
    state: "New Jersey"
  },
  {
    id: "kansas",
    label: "Kansas",
    summary: "Hospitality and entertainment consulting context connected to Kansas City.",
    work: [
      card({
        name: "Gilley's Kansas City",
        type: "Consulting",
        blurb: "Supported hospitality and entertainment consulting context connected to Kansas City.",
        logo: "/assets/logos/gilleys_logo_transparent.png"
      })
    ],
    state: "Kansas"
  },
  {
    id: "texas",
    label: "Texas",
    summary: "Hospitality and entertainment consulting work in Texas.",
    work: [
      card({
        name: "Oakmont",
        type: "Consulting",
        blurb: "Supported consulting work connected to Texas hospitality and entertainment operations.",
        logo: "/assets/logos/oakmont_logo_transparent.png"
      })
    ],
    state: "Texas"
  },
  {
    id: "north-carolina",
    label: "North Carolina",
    summary: "Graduate statistics training, research methods, and academic collaborations across hospitality and data science.",
    work: [
      card({
        name: "Master's degree",
        type: "Education",
        blurb: "Earned a master's degree in North Carolina before continuing into doctoral research and applied analytics.",
        logo: "/assets/logos/nc_state_logo.svg"
      }),
      card({
        name: "Student statistical consultant",
        type: "Consulting",
        blurb: "Served as a student statistical consultant, supporting applied quantitative research and analysis projects.",
        logo: "/assets/logos/nc_state_logo.svg"
      })
    ],
    state: "North Carolina"
  }
];

const usWorkByState = new Map(usStates.map((state) => [state.state, state.id]));
const regionByCountry = new Map(
  globalRegions.flatMap((region) => region.countries.map((countryId) => [countryId, region.id]))
);
const usStateFeatures = feature(usAtlas, usAtlas.objects.states).features;
const usInteriorBorders = mesh(usAtlas, usAtlas.objects.states, (a, b) => a !== b);
const usOutline = mesh(usAtlas, usAtlas.objects.nation, (a, b) => a === b);
const usPath = geoPath();

export default function GlobalExperienceMap() {
  const [activeId, setActiveId] = useState("us");
  const [mapMode, setMapMode] = useState("regions");
  const [activeGlobalRegionId, setActiveGlobalRegionId] = useState("north-america");
  const [activeStateId, setActiveStateId] = useState("nevada");
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(null);
  const collaborationById = useMemo(
    () => new Map(collaborations.map((item) => [item.id, item])),
    []
  );
  const globalRegionById = useMemo(
    () => new Map(globalRegions.map((item) => [item.id, item])),
    []
  );
  const stateById = useMemo(
    () => new Map(usStates.map((item) => [item.id, item])),
    []
  );
  const activeGlobalRegion = globalRegionById.get(activeGlobalRegionId) || globalRegions[0];
  const activeCountry = collaborationById.get(activeId);
  const activeRegionCountries = activeGlobalRegion.countries
    .map((countryId) => collaborationById.get(countryId))
    .filter(Boolean);
  const activeRegionMapCountryIds = new Set(activeGlobalRegion.mapCountries || activeGlobalRegion.countries);
  const activeRegionOverview = {
    country: activeGlobalRegion.label,
    id: activeGlobalRegion.id,
    summary: activeGlobalRegion.summary,
    work: activeRegionCountries.map((country) => card({
      name: country.country,
      type: country.drilldown ? "Drilldown" : "Projects",
      blurb: country.summary,
      countryId: country.id
    }))
  };
  const active = mapMode === "us"
    ? stateById.get(activeStateId) || usStates[0]
    : mapMode === "regions" || !activeCountry
      ? activeRegionOverview
      : activeCountry;
  const activeCountryFloatPosition = activeCountry
    ? countryFloatPositions[activeCountry.id] || { left: "50%", top: "50%" }
    : null;
  const selectedWork = selectedWorkIndex === null ? null : active.work[selectedWorkIndex] || null;

  function activateCountry(locationId) {
    const collaboration = collaborationById.get(locationId);
    if (!collaboration) return;

    setActiveId(locationId);
    setActiveGlobalRegionId(regionByCountry.get(locationId) || activeGlobalRegionId);
    setSelectedWorkIndex(null);
  }

  function openCountry(locationId) {
    const collaboration = collaborationById.get(locationId);
    if (!collaboration) return;

    setActiveId(locationId);
    setActiveGlobalRegionId(regionByCountry.get(locationId) || activeGlobalRegionId);
    setSelectedWorkIndex(null);
    if (collaboration.drilldown) {
      setMapMode("us");
      setActiveStateId("nevada");
    } else {
      setMapMode("region");
    }
  }

  function activateGlobalRegion(regionId) {
    const region = globalRegionById.get(regionId);
    if (!region) return;

    setActiveGlobalRegionId(regionId);
    setSelectedWorkIndex(null);
    if (region.defaultCountry) {
      setActiveId(region.defaultCountry);
    }
  }

  function openGlobalRegion(regionId) {
    const region = globalRegionById.get(regionId);
    if (!region) return;

    setActiveGlobalRegionId(regionId);
    setSelectedWorkIndex(null);
    setActiveId("");
    setMapMode("region");
  }

  function selectWorkItem(item, index) {
    if ((mapMode === "regions" || mapMode === "region") && item.countryId) {
      openCountry(item.countryId);
      return;
    }

    setSelectedWorkIndex(index);
  }

  function backToRegionMap() {
    setMapMode("region");
    setActiveGlobalRegionId("north-america");
    setActiveId("us");
    setSelectedWorkIndex(null);
  }

  return (
    <section className="global-experience" aria-labelledby="global-experience-title">
      <div className="section-intro">
        <p className="eyebrow">Experience</p>
        <h2 id="global-experience-title">I bring a wide range of global experience</h2>
      </div>

      <div className="global-map-shell" data-mode={mapMode}>
        <div className="world-map-panel" aria-label="Interactive world map">
          {mapMode === "us" ? (
            <div className="us-drilldown">
              <div className="drilldown-topline">
                <button className="map-back-button" onClick={backToRegionMap} type="button">
                  Back to North America
                </button>
                <span>United States detail</span>
              </div>
              <svg className="us-region-map" viewBox="0 0 975 610" role="img" aria-labelledby="us-region-title">
                <title id="us-region-title">United States regions with related clients, projects, and operators</title>
                <g className="us-state-layer">
                  {usStateFeatures.map((state) => {
                    const stateId = usWorkByState.get(state.properties.name);
                    const stateWork = stateById.get(stateId);

                    return (
                      <path
                        aria-label={stateWork ? `${state.properties.name}: ${stateWork.label}` : state.properties.name}
                        className={stateWork ? "us-state is-highlighted" : "us-state"}
                        d={usPath(state)}
                        data-active={stateId && activeStateId === stateId ? "true" : "false"}
                        key={state.properties.name}
                        onClick={() => {
                          if (!stateId) return;
                          setActiveStateId(stateId);
                          setSelectedWorkIndex(null);
                        }}
                        onFocus={() => {
                          if (!stateId) return;
                          setActiveStateId(stateId);
                          setSelectedWorkIndex(null);
                        }}
                        onMouseEnter={() => {
                          if (!stateId) return;
                          setActiveStateId(stateId);
                          setSelectedWorkIndex(null);
                        }}
                        role={stateWork ? "button" : "presentation"}
                        tabIndex={stateWork ? 0 : -1}
                      />
                    );
                  })}
                </g>
                <path className="us-state-borders" d={usPath(usInteriorBorders)} />
                <path className="us-map-outline" d={usPath(usOutline)} />
              </svg>
            </div>
          ) : (
            <div className="regional-map-view">
              <div className="drilldown-topline">
                {mapMode === "region" ? (
                  <button className="map-back-button" onClick={() => setMapMode("regions")} type="button">
                    Back to regions
                  </button>
                ) : (
                  <span>Choose a region</span>
                )}
                <span>{mapMode === "region" ? activeGlobalRegion.label : "Global view"}</span>
              </div>
              {mapMode === "regions" ? (
                <div className="region-overview-map" aria-label="Choose a global region">
                  <svg className="world-map region-base-map" viewBox={worldMap.viewBox} aria-hidden="true">
                    {worldMap.locations.map((location) => (
                      <path className="map-country" d={location.path} key={location.id} />
                    ))}
                  </svg>
                  <div className="region-hotspots">
                    {globalRegions.map((region) => (
                      <button
                        aria-label={`Open ${region.label}: ${region.summary}`}
                        className={activeGlobalRegionId === region.id ? "region-hotspot is-active" : "region-hotspot"}
                        key={region.id}
                        onClick={() => openGlobalRegion(region.id)}
                        onFocus={() => activateGlobalRegion(region.id)}
                        onMouseEnter={() => activateGlobalRegion(region.id)}
                        style={{
                          "--x": region.position.left,
                          "--y": region.position.top
                        }}
                        type="button"
                      >
                        <span>{region.label}</span>
                        <small>{region.countries.length ? "Explore region" : "Coming soon"}</small>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="country-map-stage">
                  <svg className="world-map region-country-map" viewBox={activeGlobalRegion.viewBox || worldMap.viewBox} role="img" aria-labelledby="world-map-title">
                    <title id="world-map-title">{`${activeGlobalRegion.label} countries where Mana has worked or collaborated`}</title>
                    {worldMap.locations
                      .filter((location) => activeRegionMapCountryIds.has(location.id))
                      .map((location) => {
                        const collaboration = collaborationById.get(location.id);
                        const isActiveCountry = activeId === location.id;

                        return (
                          <path
                            aria-label={collaboration ? `${location.name}: ${collaboration.summary}` : location.name}
                            className={[
                              "map-country",
                              collaboration ? "is-highlighted" : "is-region-context"
                            ].filter(Boolean).join(" ")}
                            d={location.path}
                            key={location.id}
                            onClick={() => collaboration && openCountry(location.id)}
                            onFocus={() => collaboration && activateCountry(location.id)}
                            onKeyDown={(event) => {
                              if ((event.key === "Enter" || event.key === " ") && collaboration) {
                                event.preventDefault();
                                openCountry(location.id);
                              }
                            }}
                            onMouseEnter={() => collaboration && activateCountry(location.id)}
                            role={collaboration ? "button" : "presentation"}
                            tabIndex={collaboration ? 0 : -1}
                            data-active={isActiveCountry ? "true" : "false"}
                          />
                        );
                      })}
                  </svg>
                  {activeCountry && activeCountryFloatPosition ? (
                    <button
                      className="country-floater"
                      onClick={() => openCountry(activeCountry.id)}
                      style={{
                        "--x": activeCountryFloatPosition.left,
                        "--y": activeCountryFloatPosition.top
                      }}
                      type="button"
                    >
                      <span>{activeCountry.country}</span>
                      <small>{activeCountry.drilldown ? "Open U.S. detail" : "View country projects"}</small>
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="map-detail-card" key={`${mapMode}-${active.id}-${selectedWork?.name || "list"}`} aria-live="polite">
          <div className="map-detail-heading">
            {mapMode === "region" && activeCountry ? (
              <AnimatedFlag countryId={activeCountry.id} label={activeCountry.country} />
            ) : mapMode === "us" ? (
              <AnimatedFlag countryId="us" label="United States" />
            ) : null}
            <h3>{mapMode === "us" ? active.label : active.country}</h3>
          </div>
          <div className="collaboration-cards" aria-label={`${mapMode === "us" ? active.label : active.country} collaborations`}>
            {active.work.length ? (
              selectedWork ? (
                <article className="collaboration-detail-card" key={`${active.id}-${selectedWork.name}-detail`}>
                  <button className="map-back-button collaboration-detail-back" onClick={() => setSelectedWorkIndex(null)} type="button">
                    Back
                  </button>
                  <div className="collaboration-detail-logo" aria-label={selectedWork.name}>
                    {selectedWork.logo ? (
                      <img src={selectedWork.logo} alt="" />
                    ) : (
                      <span>{selectedWork.name}</span>
                    )}
                  </div>
                  <div>
                    <span className={`work-tag ${selectedWork.type.toLowerCase()}`}>{selectedWork.type}</span>
                    <h4>{selectedWork.name}</h4>
                    <p>{selectedWork.blurb}</p>
                    {selectedWork.href ? (
                      <a className="case-link" href={selectedWork.href}>
                        Read more
                      </a>
                    ) : (
                      <span className="case-link disabled">Case note coming soon</span>
                    )}
                  </div>
                </article>
              ) : (
                <div className="collaboration-tile-list" aria-label="Select a collaboration">
                  {active.work.map((item, index) => (
                    <button
                      className="collaboration-tile"
                      key={`${active.id}-${item.name}`}
                      onClick={() => selectWorkItem(item, index)}
                      style={{ "--tile-index": index }}
                      type="button"
                    >
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.type}</small>
                      </span>
                      <span className="collaboration-tile-logo" aria-hidden="true">
                        {item.logo ? (
                          <img src={item.logo} alt="" />
                        ) : item.countryId ? (
                          <AnimatedFlag countryId={item.countryId} label={item.name} />
                        ) : (
                          <span>{tileInitials(item.name)}</span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              )
            ) : (
              <p className="map-empty-note">No public project cards here yet. This region is ready for future work.</p>
            )}
          </div>
        </aside>
      </div>

      <div className="country-tabs region-tabs" aria-label="Highlighted regions">
        {globalRegions.map((item) => (
          <button
            className={activeGlobalRegionId === item.id ? "country-tab is-active" : "country-tab"}
            key={item.id}
            onClick={() => openGlobalRegion(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      {mapMode !== "regions" && activeRegionCountries.length > 0 ? (
        <div className="country-tabs country-tabs-secondary" aria-label={`${activeGlobalRegion.label} countries`}>
          {activeRegionCountries.map((item) => (
            <button
              className={activeId === item.id || (mapMode === "us" && item.id === "us") ? "country-tab is-active" : "country-tab"}
              key={item.id}
              onClick={() => openCountry(item.id)}
              type="button"
            >
              {item.drilldown ? `${item.country} +` : item.country}
            </button>
          ))}
        </div>
      ) : null}

    </section>
  );
}
