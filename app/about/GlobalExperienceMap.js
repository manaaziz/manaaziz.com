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
        logo: "/assets/partner-logos/wynn-macau.png"
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
        logo: "/assets/partner-logos/wynn-mayfair.png"
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
        logo: "/assets/partner-logos/wynn-al-marjan.png"
      })
    ]
  },
  {
    country: "China",
    id: "cn",
    summary: "Integrated resort and casino hospitality work across China and Macau.",
    work: [
      card({
        name: "Wynn Palace",
        type: "Consulting",
        blurb: "Studied premium integrated resort operations and casino hospitality strategy.",
        href: "/blog/europe-2023",
        logo: "/assets/partner-logos/wynn-macau.png"
      }),
      card({
        name: "Wynn Macau",
        type: "Consulting",
        blurb: "Explored gaming, hospitality, and market context in Macau.",
        logo: "/assets/partner-logos/wynn-macau.png"
      }),
      card({
        name: "City of Dreams",
        type: "Consulting",
        blurb: "Studied integrated resort positioning and casino hospitality operations.",
        logo: "/assets/partner-logos/melco.png"
      }),
      card({
        name: "Studio City",
        type: "Consulting",
        blurb: "Reviewed resort entertainment and gaming market strategy in Macau.",
        logo: "/assets/partner-logos/melco.png"
      }),
      card({
        name: "Altira Macau",
        type: "Consulting",
        blurb: "Explored premium hospitality and casino market context.",
        logo: "/assets/partner-logos/melco.png"
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
        logo: "/assets/partner-logos/inspire-resort.png"
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
        logo: "/assets/partner-logos/hoiana.png"
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
        logo: "/assets/partner-logos/crown-resorts.png"
      }),
      card({
        name: "The Star Entertainment Group",
        type: "Consulting",
        blurb: "Tracked operator strategy and casino hospitality questions in Australia.",
        logo: "/assets/partner-logos/the-star.png"
      })
    ]
  }
];

const globalRegions = [
  {
    id: "north-america",
    label: "North America",
    summary: "U.S.-based casino analytics, hospitality education, and gaming research work.",
    countries: ["us"],
    defaultCountry: "us",
    position: { left: "22%", top: "38%" },
    zoom: { scale: 1.85, originX: "23%", originY: "40%" }
  },
  {
    id: "south-america",
    label: "South America",
    summary: "Future collaborations in South America will live here as the project list grows.",
    countries: [],
    position: { left: "34%", top: "66%" },
    zoom: { scale: 2.25, originX: "34%", originY: "66%" }
  },
  {
    id: "europe",
    label: "Europe",
    summary: "Academic, trust, hospitality, and gaming connections across Europe.",
    countries: ["gb", "es"],
    defaultCountry: "gb",
    position: { left: "49%", top: "32%" },
    zoom: { scale: 3.05, originX: "48%", originY: "36%" }
  },
  {
    id: "africa",
    label: "Africa",
    summary: "Future collaborations in Africa will live here as the project list grows.",
    countries: [],
    position: { left: "52%", top: "56%" },
    zoom: { scale: 2.25, originX: "52%", originY: "56%" }
  },
  {
    id: "middle-east",
    label: "Middle East",
    summary: "Emerging integrated resort and gaming analytics work in the Gulf region.",
    countries: ["ae"],
    defaultCountry: "ae",
    position: { left: "60%", top: "48%" },
    zoom: { scale: 3.25, originX: "60%", originY: "48%" }
  },
  {
    id: "asia",
    label: "Asia",
    summary: "Integrated resort, casino, and hospitality analytics work across East and Southeast Asia.",
    countries: ["cn", "kr", "vn"],
    defaultCountry: "cn",
    position: { left: "73%", top: "43%" },
    zoom: { scale: 2.05, originX: "73%", originY: "46%" }
  },
  {
    id: "oceania",
    label: "Oceania",
    summary: "Gaming and hospitality operator connections in Australia.",
    countries: ["au"],
    defaultCountry: "au",
    position: { left: "79%", top: "73%" },
    zoom: { scale: 2.65, originX: "79%", originY: "73%" }
  }
];

const countryFloatPositions = {
  us: { left: "22%", top: "40%" },
  gb: { left: "47%", top: "32%" },
  es: { left: "45%", top: "39%" },
  ae: { left: "60%", top: "49%" },
  cn: { left: "71%", top: "43%" },
  kr: { left: "78%", top: "39%" },
  vn: { left: "73%", top: "56%" },
  au: { left: "79%", top: "76%" }
};

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
        logo: "/assets/partner-logos/wynn-macau.png"
      }),
      card({
        name: "Encore",
        type: "Consulting",
        blurb: "Worked with operator context for premium resort and gaming decisions.",
        logo: "/assets/partner-logos/wynn-macau.png"
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
  const [activeRegionId, setActiveRegionId] = useState("west");
  const collaborationById = useMemo(
    () => new Map(collaborations.map((item) => [item.id, item])),
    []
  );
  const globalRegionById = useMemo(
    () => new Map(globalRegions.map((item) => [item.id, item])),
    []
  );
  const regionById = useMemo(
    () => new Map(usRegions.map((item) => [item.id, item])),
    []
  );
  const activeGlobalRegion = globalRegionById.get(activeGlobalRegionId) || globalRegions[0];
  const activeCountry = collaborationById.get(activeId);
  const activeRegionCountries = activeGlobalRegion.countries
    .map((countryId) => collaborationById.get(countryId))
    .filter(Boolean);
  const activeRegionOverview = {
    country: activeGlobalRegion.label,
    id: activeGlobalRegion.id,
    summary: activeGlobalRegion.summary,
    work: activeRegionCountries.map((country) => card({
      name: country.country,
      type: country.drilldown ? "Drilldown" : "Projects",
      blurb: country.summary
    }))
  };
  const active = mapMode === "us"
    ? regionById.get(activeRegionId) || usRegions[0]
    : mapMode === "regions"
      ? activeRegionOverview
      : activeCountry || {
        country: activeGlobalRegion.label,
        id: activeGlobalRegion.id,
        summary: activeGlobalRegion.summary,
        work: []
      };
  const activeCountryFloatPosition = activeCountry
    ? countryFloatPositions[activeCountry.id] || { left: "50%", top: "50%" }
    : null;

  function activateCountry(locationId) {
    const collaboration = collaborationById.get(locationId);
    if (!collaboration) return;

    setActiveId(locationId);
    setActiveGlobalRegionId(regionByCountry.get(locationId) || activeGlobalRegionId);
  }

  function openCountry(locationId) {
    const collaboration = collaborationById.get(locationId);
    if (!collaboration) return;

    setActiveId(locationId);
    setActiveGlobalRegionId(regionByCountry.get(locationId) || activeGlobalRegionId);
    if (collaboration.drilldown) {
      setMapMode("us");
      setActiveRegionId("west");
    } else {
      setMapMode("region");
    }
  }

  function activateGlobalRegion(regionId) {
    const region = globalRegionById.get(regionId);
    if (!region) return;

    setActiveGlobalRegionId(regionId);
    if (region.defaultCountry) {
      setActiveId(region.defaultCountry);
    }
  }

  function openGlobalRegion(regionId) {
    const region = globalRegionById.get(regionId);
    if (!region) return;

    setActiveGlobalRegionId(regionId);
    if (region.defaultCountry) {
      setActiveId(region.defaultCountry);
    } else {
      setActiveId("");
    }
    setMapMode("region");
  }

  function backToRegionMap() {
    setMapMode("region");
    setActiveGlobalRegionId("north-america");
    setActiveId("us");
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
                <div
                  className="country-map-stage"
                  style={{
                    "--region-scale": activeGlobalRegion.zoom.scale,
                    "--region-floater-scale": 1 / activeGlobalRegion.zoom.scale,
                    "--region-origin-x": activeGlobalRegion.zoom.originX,
                    "--region-origin-y": activeGlobalRegion.zoom.originY
                  }}
                >
                  <div className="map-zoom-layer">
                    <svg className="world-map" viewBox={worldMap.viewBox} role="img" aria-labelledby="world-map-title">
                      <title id="world-map-title">{`${activeGlobalRegion.label} countries where Mana has worked or collaborated`}</title>
                      {worldMap.locations.map((location) => {
                        const collaboration = collaborationById.get(location.id);
                        const globalRegionId = regionByCountry.get(location.id);
                        const isActiveRegionCountry = globalRegionId === activeGlobalRegionId;
                        const isActiveCountry = activeId === location.id;

                        return (
                          <path
                            aria-label={collaboration ? `${location.name}: ${collaboration.summary}` : location.name}
                            className={[
                              "map-country",
                              isActiveRegionCountry ? "is-highlighted" : "is-muted"
                            ].filter(Boolean).join(" ")}
                            d={location.path}
                            key={location.id}
                            onClick={() => isActiveRegionCountry && openCountry(location.id)}
                            onFocus={() => isActiveRegionCountry && activateCountry(location.id)}
                            onKeyDown={(event) => {
                              if ((event.key === "Enter" || event.key === " ") && isActiveRegionCountry) {
                                event.preventDefault();
                                openCountry(location.id);
                              }
                            }}
                            onMouseEnter={() => isActiveRegionCountry && activateCountry(location.id)}
                            role={isActiveRegionCountry ? "button" : "presentation"}
                            tabIndex={isActiveRegionCountry ? 0 : -1}
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
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="map-detail-card" aria-live="polite">
          <span>{mapMode === "us" ? active.label : active.country}</span>
          <h3>{active.summary}</h3>
          <div className="collaboration-cards" aria-label={`${mapMode === "us" ? active.label : active.country} collaborations`}>
            {active.work.length ? active.work.map((item) => (
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
            )) : (
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

      <p className="map-credit">
        Map data from <a href="https://github.com/VictorCazanave/svg-maps">svg-maps</a>, licensed CC BY 4.0.
      </p>
    </section>
  );
}
