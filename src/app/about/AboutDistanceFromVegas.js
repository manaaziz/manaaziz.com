"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import worldMap from "@svg-maps/world";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const lasVegas = {
  city: "Las Vegas",
  region: "Nevada",
  country: "United States",
  latitude: 36.1716,
  longitude: -115.1391
};

const lasVegasAvatarSrc = "/assets/images/bitmoji_waving_marker.png";
const lasVegasSearchingAvatarSrc = "/assets/images/bitmoji_searching_marker.png";

const lookupServices = [
  {
    url: "https://ipapi.co/json/",
    parse(data) {
      return {
        city: data?.city,
        region: data?.region,
        country: data?.country_name,
        latitude: Number(data?.latitude),
        longitude: Number(data?.longitude)
      };
    }
  },
  {
    url: "https://ipwho.is/",
    parse(data) {
      if (data?.success === false) return null;

      return {
        city: data?.city,
        region: data?.region,
        country: data?.country,
        latitude: Number(data?.latitude),
        longitude: Number(data?.longitude)
      };
    }
  },
  {
    url: "https://freeipapi.com/api/json/",
    parse(data) {
      return {
        city: data?.cityName,
        region: data?.regionName,
        country: data?.countryName,
        latitude: Number(data?.latitude),
        longitude: Number(data?.longitude)
      };
    }
  }
];

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

function haversineKilometers(origin, destination) {
  const earthRadiusKilometers = 6371;
  const deltaLatitude = toRadians(destination.latitude - origin.latitude);
  const deltaLongitude = toRadians(destination.longitude - origin.longitude);
  const originLatitude = toRadians(origin.latitude);
  const destinationLatitude = toRadians(destination.latitude);
  const a = Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(originLatitude) * Math.cos(destinationLatitude) * Math.sin(deltaLongitude / 2) ** 2;

  return earthRadiusKilometers * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function overviewZoomForDistance(distanceKilometers) {
  if (distanceKilometers < 120) return 7.2;
  if (distanceKilometers < 450) return 5.8;
  if (distanceKilometers < 900) return 5;
  if (distanceKilometers < 1800) return 4.1;
  if (distanceKilometers < 3200) return 3.2;
  if (distanceKilometers < 6500) return 2.15;
  return 1.05;
}

function midpoint(origin, destination) {
  return [
    (origin.longitude + destination.longitude) / 2,
    (origin.latitude + destination.latitude) / 2
  ];
}

function greatCirclePoint(origin, destination, fraction) {
  const lat1 = toRadians(origin.latitude);
  const lon1 = toRadians(origin.longitude);
  const lat2 = toRadians(destination.latitude);
  const lon2 = toRadians(destination.longitude);
  const distance = 2 * Math.asin(Math.sqrt(
    Math.sin((lat2 - lat1) / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2
  ));

  if (distance === 0) return [origin.longitude, origin.latitude];

  const a = Math.sin((1 - fraction) * distance) / Math.sin(distance);
  const b = Math.sin(fraction * distance) / Math.sin(distance);
  const x = a * Math.cos(lat1) * Math.cos(lon1) + b * Math.cos(lat2) * Math.cos(lon2);
  const y = a * Math.cos(lat1) * Math.sin(lon1) + b * Math.cos(lat2) * Math.sin(lon2);
  const z = a * Math.sin(lat1) + b * Math.sin(lat2);

  return [toDegrees(Math.atan2(y, x)), toDegrees(Math.atan2(z, Math.sqrt(x * x + y * y)))];
}

function routeCoordinates(origin, destination, steps = 120) {
  return Array.from({ length: steps + 1 }, (_, index) => greatCirclePoint(origin, destination, index / steps));
}

function makeMarker({ className, imageSrc, label }) {
  const marker = document.createElement("div");
  marker.className = className;

  if (imageSrc) {
    const image = document.createElement("img");
    image.alt = "";
    image.decoding = "async";
    image.draggable = false;
    image.src = imageSrc;
    marker.appendChild(image);
  } else {
    marker.textContent = label;
  }

  return marker;
}

function emptyRoute() {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: []
    }
  };
}

function pointFeature(coordinates) {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates
    }
  };
}

function routeFeature(coordinates) {
  return {
    ...emptyRoute(),
    geometry: {
      type: "LineString",
      coordinates
    }
  };
}

function normalizeLocation(location) {
  if (!Number.isFinite(location?.latitude) || !Number.isFinite(location?.longitude)) {
    return null;
  }

  return {
    city: location.city,
    region: location.region,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude
  };
}

function DistanceSearchFallback() {
  return (
    <div className="distance-search-fallback" aria-hidden="true">
      <div className="distance-search-globe">
        <svg className="distance-search-world-map" viewBox={worldMap.viewBox} focusable="false">
          {worldMap.locations.map((location) => (
            <path d={location.path} key={location.id} />
          ))}
        </svg>
        <span className="distance-search-vegas-dot" />
        <img src={lasVegasSearchingAvatarSrc} alt="" decoding="async" draggable={false} />
      </div>
    </div>
  );
}

async function fetchJsonWithTimeout(url, signal) {
  const timeoutController = new AbortController();
  const timeout = window.setTimeout(() => timeoutController.abort(), 4500);

  function abortTimeout() {
    timeoutController.abort();
  }

  signal?.addEventListener("abort", abortTimeout, { once: true });

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: timeoutController.signal
    });

    if (!response.ok) {
      throw new Error("IP lookup unavailable");
    }

    return response.json();
  } finally {
    window.clearTimeout(timeout);
    signal?.removeEventListener("abort", abortTimeout);
  }
}

async function lookupVisitorLocation(signal) {
  for (const service of lookupServices) {
    try {
      const data = await fetchJsonWithTimeout(service.url, signal);
      const location = normalizeLocation(service.parse(data));

      if (location) {
        return location;
      }
    } catch (error) {
      if (signal?.aborted) {
        throw error;
      }
    }
  }

  throw new Error("All IP lookup services failed");
}

export default function AboutDistanceFromVegas() {
  const mapNodeRef = useRef(null);
  const mapRef = useRef(null);
  const frameRef = useRef(null);
  const timeoutRefs = useRef([]);
  const [visitorLocation, setVisitorLocation] = useState(null);
  const [status, setStatus] = useState("loading");
  const [mapStatus, setMapStatus] = useState(mapboxToken ? "loading" : "missing-token");

  useEffect(() => {
    const controller = new AbortController();

    lookupVisitorLocation(controller.signal)
      .then((location) => {
        setVisitorLocation(location);
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setStatus("unavailable");
          setMapStatus((currentStatus) => currentStatus === "missing-token" ? currentStatus : "no-location");
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const distance = useMemo(() => (
    visitorLocation ? Math.round(haversineKilometers(lasVegas, visitorLocation)) : null
  ), [visitorLocation]);

  useEffect(() => {
    const showHomeFallback = status === "unavailable";

    if (!mapboxToken || !mapNodeRef.current || (!visitorLocation && !showHomeFallback)) return undefined;

    mapboxgl.accessToken = mapboxToken;

    const hasVisitorLocation = Boolean(visitorLocation);
    const visitorCenter = hasVisitorLocation ? [visitorLocation.longitude, visitorLocation.latitude] : null;
    const vegasCenter = [lasVegas.longitude, lasVegas.latitude];
    const overviewCenter = hasVisitorLocation ? midpoint(visitorLocation, lasVegas) : vegasCenter;
    const finalZoom = hasVisitorLocation ? overviewZoomForDistance(haversineKilometers(visitorLocation, lasVegas)) : 1.35;
    const fullRoute = hasVisitorLocation ? routeCoordinates(visitorLocation, lasVegas) : [];

    const map = new mapboxgl.Map({
      center: hasVisitorLocation ? visitorCenter : vegasCenter,
      container: mapNodeRef.current,
      dragPan: false,
      interactive: false,
      pitch: hasVisitorLocation ? 58 : 0,
      projection: "globe",
      scrollZoom: false,
      style: "mapbox://styles/mapbox/dark-v11",
      zoom: hasVisitorLocation ? 10.8 : finalZoom
    });

    mapRef.current = map;

    const mapLoadFallbackTimeout = window.setTimeout(() => {
      setMapStatus((currentStatus) => currentStatus === "loading" ? "error" : currentStatus);
    }, 8500);

    map.on("style.load", () => {
      map.setFog({
        color: "rgb(17, 24, 32)",
        "high-color": "rgb(62, 80, 101)",
        "horizon-blend": 0.08,
        "space-color": "rgb(10, 13, 17)",
        "star-intensity": 0.18
      });
    });

    map.on("load", () => {
      window.clearTimeout(mapLoadFallbackTimeout);
      setMapStatus("ready");

      const vegasMarker = new mapboxgl.Marker({
        anchor: "bottom",
        element: makeMarker({
          className: hasVisitorLocation ? "distance-map-marker vegas avatar" : "distance-map-marker vegas avatar searching",
          imageSrc: hasVisitorLocation ? lasVegasAvatarSrc : lasVegasSearchingAvatarSrc
        })
      })
        .setLngLat(vegasCenter);

      if (!hasVisitorLocation) {
        vegasMarker.addTo(map);

        map.once("remove", () => {
          vegasMarker.remove();
        });

        return;
      }

      map.addSource("mana-route", {
        type: "geojson",
        data: emptyRoute()
      });

      map.addSource("visitor-point", {
        type: "geojson",
        data: pointFeature(visitorCenter)
      });

      map.addLayer({
        id: "visitor-point-halo",
        type: "circle",
        source: "visitor-point",
        paint: {
          "circle-color": "#fffaf1",
          "circle-opacity": 0.16,
          "circle-radius": 18,
          "circle-stroke-color": "rgba(255, 250, 241, 0.22)",
          "circle-stroke-width": 2
        }
      });

      map.addLayer({
        id: "visitor-point-dot",
        type: "circle",
        source: "visitor-point",
        paint: {
          "circle-color": "#5f6b78",
          "circle-radius": 11,
          "circle-stroke-color": "#fffaf1",
          "circle-stroke-width": 2
        }
      });

      map.addLayer({
        id: "visitor-point-label",
        type: "symbol",
        source: "visitor-point",
        layout: {
          "text-field": "YOU",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 9
        },
        paint: {
          "text-color": "#fffaf1"
        }
      });

      map.addLayer({
        id: "mana-route-glow",
        type: "line",
        source: "mana-route",
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-blur": 4,
          "line-color": "#fffaf1",
          "line-opacity": 0.28,
          "line-width": 7
        }
      });

      map.addLayer({
        id: "mana-route-line",
        type: "line",
        source: "mana-route",
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "#fffaf1",
          "line-dasharray": [0.3, 1.4],
          "line-opacity": 0.9,
          "line-width": 3
        }
      });

      timeoutRefs.current.push(window.setTimeout(() => {
        map.flyTo({
          bearing: -8,
          center: overviewCenter,
          curve: 1.45,
          duration: 4800,
          essential: true,
          pitch: 0,
          zoom: finalZoom
        });
      }, 650));

      timeoutRefs.current.push(window.setTimeout(() => {
        vegasMarker.addTo(map);
        const source = map.getSource("mana-route");
        const startTime = performance.now();
        const duration = 1900;

        function drawRoute(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const count = Math.max(2, Math.ceil(progress * fullRoute.length));
          source.setData(routeFeature(fullRoute.slice(0, count)));

          if (progress < 1) {
            frameRef.current = window.requestAnimationFrame(drawRoute);
          }
        }

        frameRef.current = window.requestAnimationFrame(drawRoute);
      }, 5250));

      map.once("remove", () => {
        vegasMarker.remove();
      });
    });

    map.on("error", () => {
      setMapStatus("error");
    });

    return () => {
      window.clearTimeout(mapLoadFallbackTimeout);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      timeoutRefs.current.forEach((timeout) => window.clearTimeout(timeout));
      timeoutRefs.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [status, visitorLocation]);

  return (
    <section className="about-distance-card" data-map-status={mapStatus} data-status={status} aria-labelledby="about-distance-title">
      <div className="distance-map mapbox-distance-map" aria-hidden="true">
        <div className="distance-mapbox-canvas" ref={mapNodeRef} />
        {mapStatus !== "ready" ? (
          <div className="distance-map-fallback">
            <DistanceSearchFallback />
            <span className="distance-map-fallback-label">
              {mapStatus === "missing-token" ? "Mapbox token missing" : "Looking from home"}
            </span>
          </div>
        ) : null}
      </div>

      <div className="distance-copy">
        <h2 id="about-distance-title">I&apos;m from Las Vegas, Nevada.</h2>
        {status === "ready" ? (
          <p>
            That is roughly <strong className="distance-value">{distance.toLocaleString()} km</strong> from where you are based on your IP address.
          </p>
        ) : status === "loading" ? (
          <p>I am looking for you from home based on your IP address.</p>
        ) : (
          <p>I couldn&apos;t find you based on your IP address, but I am looking for you from home.</p>
        )}
      </div>
    </section>
  );
}
