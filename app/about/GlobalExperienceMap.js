"use client";

import { useMemo, useState } from "react";
import worldMap from "@svg-maps/world";
import usAtlas from "us-atlas/states-albers-10m.json";
import { feature, mesh } from "topojson-client";
import { geoPath } from "d3-geo";

const card = ({ name, type, blurb, href, logo }) => ({
  name,
  type,
  blurb,
  href,
  logo
});

const collaborations = [
  {
    country: "United States",
    id: "us",
    summary: "Gaming, hospitality, analytics, teaching, and research work rooted in Las Vegas.",
    drilldown: true,
    work: [
      card({
        name: "UNLV",
        type: "Education",
        blurb: "Taught, researched, and completed doctoral work in hospitality analytics.",
        href: "/teaching",
        logo: "/assets/logos/unlv.png"
      }),
      card({
        name: "International Gaming Institute",
        type: "Research",
        blurb: "Worked on applied gaming research connecting data, operations, and responsible innovation.",
        href: "/research",
        logo: "/assets/logos/igi.png"
      }),
      card({
        name: "Wynn Las Vegas",
        type: "Consulting",
        blurb: "Supported casino and hospitality analytics work for operator-facing decisions.",
        logo: "/assets/images/logos/1128.HK_BIG-b02662a0.png"
      }),
      card({
        name: "GMA Consulting",
        type: "Consulting",
        blurb: "Supported consulting work translating casino data into operational recommendations."
      })
    ]
  },
  {
    country: "Spain",
    id: "es",
    summary: "Academic, cultural, and community ties from time spent studying and working in Barcelona.",
    work: [
      card({
        name: "Barcelona",
        type: "Education",
        blurb: "Studied, taught, and built international perspective through time in Barcelona.",
        href: "/blog/barcelona"
      }),
      card({
        name: "Hospitality education",
        type: "Education",
        blurb: "Connected classroom experience with hospitality, culture, and student development."
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
        type: "Consulting",
        blurb: "Explored trust, compliance, and gaming-related analytics questions."
      }),
      card({
        name: "Wynn Mayfair",
        type: "Consulting",
        blurb: "Tracked international luxury hospitality and gaming market context.",
        logo: "/assets/images/logos/24c29a9a52a740359bb959093e5243a9.png"
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
        logo: "/assets/images/logos/Wynn_Al_Marjan_Island_Logo_2025.png"
      })
    ]
  },
  {
    country: "China",
    id: "cn",
    summary: "International casino, resort, and integrated hospitality markets.",
    work: [
      card({
        name: "City of Dreams",
        type: "Consulting",
        blurb: "Studied integrated resort positioning and casino hospitality operations.",
        logo: "/assets/images/logos/Melco_logo.png"
      }),
      card({
        name: "Studio City",
        type: "Consulting",
        blurb: "Reviewed resort entertainment and gaming market strategy in Macau.",
        logo: "/assets/images/logos/Melco_logo.png"
      }),
      card({
        name: "Altira Macau",
        type: "Consulting",
        blurb: "Explored premium hospitality and casino market context.",
        logo: "/assets/images/logos/Melco_logo.png"
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
        logo: "/assets/images/logos/IER_Logotype_RGB.png"
      })
    ]
  },
  {
    country: "Macau",
    id: "mo",
    summary: "Integrated resort and casino hospitality work in one of the world's major gaming markets.",
    work: [
      card({
        name: "Wynn Palace",
        type: "Consulting",
        blurb: "Studied premium integrated resort operations and casino hospitality strategy.",
        href: "/blog/europe-2023",
        logo: "/assets/images/logos/1128.HK_BIG-b02662a0.png"
      }),
      card({
        name: "Wynn Macau",
        type: "Consulting",
        blurb: "Explored gaming, hospitality, and market context in Macau.",
        logo: "/assets/images/logos/1128.HK_BIG-b02662a0.png"
      }),
      card({
        name: "City of Dreams",
        type: "Consulting",
        blurb: "Observed integrated resort strategy and entertainment-driven hospitality.",
        logo: "/assets/images/logos/Melco_logo.png"
      }),
      card({
        name: "Studio City",
        type: "Consulting",
        blurb: "Examined entertainment resort positioning in Macau's casino market.",
        logo: "/assets/images/logos/Melco_logo.png"
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
        logo: "/assets/images/logos/1691075779109-771fb91b-7411-40e2-ab45-906ce79464bb.jpg"
      })
    ]
  },
  {
    country: "Australia",
    id: "au",
    summary: "Gaming and hospitality industry connections in Australia.",
    work: [
      card({
        name: "Crown Resorts",
        type: "Consulting",
        blurb: "Worked with gaming and hospitality context for Australian operator questions.",
        logo: "/assets/images/logos/Crown_Resorts_logo.svg.png"
      }),
      card({
        name: "The Star Entertainment Group",
        type: "Consulting",
        blurb: "Tracked operator strategy and casino hospitality questions in Australia.",
        logo: "/assets/images/logos/SGR.AX_BIG-d0a53ced.png"
      })
    ]
  }
];

const usRegions = [
  {
    id: "west",
    label: "West / Las Vegas",
    summary: "Casino analytics, hospitality education, and gaming research concentrated in Nevada and the western U.S.",
    work: [
      card({
        name: "UNLV",
        type: "Education",
        blurb: "Taught, researched, and completed doctoral work in hospitality analytics.",
        href: "/teaching",
        logo: "/assets/logos/unlv.png"
      }),
      card({
        name: "International Gaming Institute",
        type: "Research",
        blurb: "Worked on gaming research at the intersection of data, operations, and policy.",
        href: "/research",
        logo: "/assets/logos/igi.png"
      }),
      card({
        name: "Wynn Las Vegas",
        type: "Consulting",
        blurb: "Supported analytics work tied to casino and hospitality operations.",
        logo: "/assets/images/logos/1128.HK_BIG-b02662a0.png"
      }),
      card({
        name: "Encore",
        type: "Consulting",
        blurb: "Worked with operator context for premium resort and gaming decisions.",
        logo: "/assets/images/logos/1128.HK_BIG-b02662a0.png"
      }),
      card({
        name: "WDTS",
        type: "Research",
        blurb: "Explored gaming technology and data questions connected to operator workflows."
      }),
      card({
        name: "AXES",
        type: "Research",
        blurb: "Connected casino payments and player behavior data to applied analytics questions."
      })
    ],
    states: ["Arizona", "California", "Nevada", "Oregon", "Washington", "Idaho", "Utah", "New Mexico", "Colorado"]
  },
  {
    id: "central",
    label: "Central / National",
    summary: "Modeling, forecasting, and operator-facing analytics projects that travel across markets.",
    work: [
      card({
        name: "GMA Consulting",
        type: "Consulting",
        blurb: "Supported casino consulting work by turning analysis into operator-facing recommendations."
      }),
      card({
        name: "Revenue strategy",
        type: "Consulting",
        blurb: "Built forecasting and pricing logic for casino and hospitality revenue decisions."
      }),
      card({
        name: "Machine learning",
        type: "Research",
        blurb: "Applied predictive models to casino, hotel, and guest behavior problems."
      }),
      card({
        name: "Operator reporting",
        type: "Consulting",
        blurb: "Translated model outputs into recommendations that operators can actually use."
      })
    ],
    states: ["Kansas", "Nebraska", "Oklahoma", "Texas", "Missouri", "Iowa", "Illinois", "Indiana", "Michigan", "Ohio"]
  },
  {
    id: "east",
    label: "East / Academic",
    summary: "Graduate statistics training, research methods, and academic collaborations across hospitality and data science.",
    work: [
      card({
        name: "NC State Statistics",
        type: "Education",
        blurb: "Built graduate-level statistical training that anchors my applied analytics work."
      }),
      card({
        name: "Hospitality research",
        type: "Research",
        blurb: "Studied forecasting, measurement, and quantitative methods in hospitality contexts.",
        href: "/research"
      }),
      card({
        name: "Teaching",
        type: "Education",
        blurb: "Helped students build confidence with statistics, R, and applied data analysis.",
        href: "/teaching"
      })
    ],
    states: ["North Carolina", "South Carolina", "Georgia", "Florida", "Virginia", "Maryland", "Pennsylvania", "New York", "Massachusetts", "Washington, DC"]
  }
];

const usRegionByState = new Map(
  usRegions.flatMap((region) => region.states.map((state) => [state, region.id]))
);
const usStateFeatures = feature(usAtlas, usAtlas.objects.states).features;
const usInteriorBorders = mesh(usAtlas, usAtlas.objects.states, (a, b) => a !== b);
const usOutline = mesh(usAtlas, usAtlas.objects.nation, (a, b) => a === b);
const usPath = geoPath();

export default function GlobalExperienceMap() {
  const [activeId, setActiveId] = useState("us");
  const [mapMode, setMapMode] = useState("world");
  const [activeRegionId, setActiveRegionId] = useState("west");
  const collaborationById = useMemo(
    () => new Map(collaborations.map((item) => [item.id, item])),
    []
  );
  const regionById = useMemo(
    () => new Map(usRegions.map((item) => [item.id, item])),
    []
  );
  const active = mapMode === "us"
    ? regionById.get(activeRegionId) || usRegions[0]
    : collaborationById.get(activeId) || collaborations[0];

  function activateCountry(locationId) {
    const collaboration = collaborationById.get(locationId);
    if (!collaboration) return;

    setActiveId(locationId);
    if (locationId !== "us") {
      setMapMode("world");
    }
  }

  function openCountry(locationId) {
    const collaboration = collaborationById.get(locationId);
    if (!collaboration) return;

    setActiveId(locationId);
    if (collaboration.drilldown) {
      setMapMode("us");
      setActiveRegionId("west");
    }
  }

  return (
    <section className="global-experience" aria-labelledby="global-experience-title">
      <div className="section-intro">
        <p className="eyebrow">Experience</p>
        <h2 id="global-experience-title">International projects across casino, hospitality, and data science.</h2>
      </div>

      <div className="global-map-shell" data-mode={mapMode}>
        <div className="world-map-panel" aria-label="Interactive world map">
          {mapMode === "world" ? (
            <svg className="world-map" viewBox={worldMap.viewBox} role="img" aria-labelledby="world-map-title">
              <title id="world-map-title">Highlighted countries where Mana has worked or collaborated</title>
              {worldMap.locations.map((location) => {
                const collaboration = collaborationById.get(location.id);
                const isActive = activeId === location.id;

                return (
                  <path
                    aria-label={collaboration ? `${location.name}: ${collaboration.summary}` : location.name}
                    className={collaboration ? "map-country is-highlighted" : "map-country"}
                    d={location.path}
                    key={location.id}
                    onClick={() => openCountry(location.id)}
                    onFocus={() => activateCountry(location.id)}
                    onKeyDown={(event) => {
                      if ((event.key === "Enter" || event.key === " ") && collaboration) {
                        event.preventDefault();
                        openCountry(location.id);
                      }
                    }}
                    onMouseEnter={() => activateCountry(location.id)}
                    role={collaboration ? "button" : "presentation"}
                    tabIndex={collaboration ? 0 : -1}
                    data-active={isActive ? "true" : "false"}
                  />
                );
              })}
            </svg>
          ) : (
            <div className="us-drilldown">
              <div className="drilldown-topline">
                <button className="map-back-button" onClick={() => setMapMode("world")} type="button">
                  Back to globe
                </button>
                <span>United States detail</span>
              </div>
              <svg className="us-region-map" viewBox="0 0 975 610" role="img" aria-labelledby="us-region-title">
                <title id="us-region-title">United States regions with related clients, projects, and operators</title>
                <g className="us-state-layer">
                  {usStateFeatures.map((state) => {
                    const regionId = usRegionByState.get(state.properties.name);
                    const region = regionById.get(regionId);

                    return (
                      <path
                        aria-label={region ? `${state.properties.name}: ${region.label}` : state.properties.name}
                        className={region ? "us-state is-highlighted" : "us-state"}
                        d={usPath(state)}
                        data-active={regionId && activeRegionId === regionId ? "true" : "false"}
                        key={state.properties.name}
                        onClick={() => regionId && setActiveRegionId(regionId)}
                        onFocus={() => regionId && setActiveRegionId(regionId)}
                        onMouseEnter={() => regionId && setActiveRegionId(regionId)}
                        role={region ? "button" : "presentation"}
                        tabIndex={region ? 0 : -1}
                      />
                    );
                  })}
                </g>
                <path className="us-state-borders" d={usPath(usInteriorBorders)} />
                <path className="us-map-outline" d={usPath(usOutline)} />
              </svg>
            </div>
          )}
        </div>

        <aside className="map-detail-card" aria-live="polite">
          <span>{mapMode === "us" ? active.label : active.country}</span>
          <h3>{active.summary}</h3>
          <div className="collaboration-cards" aria-label={`${mapMode === "us" ? active.label : active.country} collaborations`}>
            {active.work.map((item) => (
              <article className="collaboration-card" key={`${active.id}-${item.name}`}>
                <div className="collaboration-logo" aria-label={item.name}>
                  {item.logo ? (
                    <img src={item.logo} alt="" />
                  ) : (
                    <span>{item.name}</span>
                  )}
                </div>
                <div>
                  <span className={`work-tag ${item.type.toLowerCase()}`}>{item.type}</span>
                  <h4>{item.name}</h4>
                  <p>{item.blurb}</p>
                  {item.href ? (
                    <a className="case-link" href={item.href}>
                      Read more
                    </a>
                  ) : (
                    <span className="case-link disabled">Case note coming soon</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>

      <div className="country-tabs" aria-label="Highlighted countries">
        {collaborations.map((item) => (
          <button
            className={activeId === item.id ? "country-tab is-active" : "country-tab"}
            key={item.id}
            onClick={() => openCountry(item.id)}
            type="button"
          >
            {item.drilldown ? `${item.country} +` : item.country}
          </button>
        ))}
      </div>

      <p className="map-credit">
        Map data from <a href="https://github.com/VictorCazanave/svg-maps">svg-maps</a>, licensed CC BY 4.0.
      </p>
    </section>
  );
}
