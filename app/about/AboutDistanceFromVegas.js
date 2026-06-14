"use client";

import { useEffect, useMemo, useState } from "react";
import worldMap from "@svg-maps/world";

const lasVegas = {
  city: "Las Vegas",
  region: "Nevada",
  country: "United States",
  latitude: 36.1716,
  longitude: -115.1391
};

const mapBounds = {
  width: 1009,
  height: 665
};

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function haversineMiles(origin, destination) {
  const earthRadiusMiles = 3958.8;
  const deltaLatitude = toRadians(destination.latitude - origin.latitude);
  const deltaLongitude = toRadians(destination.longitude - origin.longitude);
  const originLatitude = toRadians(origin.latitude);
  const destinationLatitude = toRadians(destination.latitude);
  const a = Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(originLatitude) * Math.cos(destinationLatitude) * Math.sin(deltaLongitude / 2) ** 2;

  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function projectPoint({ latitude, longitude }) {
  const clampedLatitude = Math.max(Math.min(latitude, 85), -85);
  const latitudeRadians = toRadians(clampedLatitude);
  const mercatorY = (1 - Math.log(Math.tan(latitudeRadians) + 1 / Math.cos(latitudeRadians)) / Math.PI) / 2;

  return {
    x: ((longitude + 180) / 360) * mapBounds.width,
    y: mercatorY * mapBounds.height
  };
}

function locationLabel(location) {
  return [location.city, location.region, location.country].filter(Boolean).join(", ");
}

function arcPath(origin, destination) {
  const dx = destination.x - origin.x;
  const controlX = origin.x + dx * 0.5;
  const controlY = Math.min(origin.y, destination.y) - Math.max(70, Math.abs(dx) * 0.14);

  return `M ${origin.x} ${origin.y} Q ${controlX} ${controlY} ${destination.x} ${destination.y}`;
}

export default function AboutDistanceFromVegas() {
  const [visitorLocation, setVisitorLocation] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    fetch("https://ipapi.co/json/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("IP lookup unavailable");
        }
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;

        const latitude = Number(data?.latitude);
        const longitude = Number(data?.longitude);

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
          throw new Error("IP lookup missing coordinates");
        }

        setVisitorLocation({
          city: data?.city,
          region: data?.region,
          country: data?.country_name,
          latitude,
          longitude
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("unavailable");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const mapData = useMemo(() => {
    const vegasPoint = projectPoint(lasVegas);
    const visitorPoint = visitorLocation ? projectPoint(visitorLocation) : null;

    return {
      vegasPoint,
      visitorPoint,
      path: visitorPoint ? arcPath(visitorPoint, vegasPoint) : null,
      miles: visitorLocation ? Math.round(haversineMiles(lasVegas, visitorLocation)) : null,
      focusPoint: visitorPoint || vegasPoint
    };
  }, [visitorLocation]);

  return (
    <section className="about-distance-card" data-status={status} aria-labelledby="about-distance-title">
      <div className="distance-map" aria-hidden="true">
        <svg
          className="distance-globe-svg"
          style={{ transformOrigin: `${mapData.focusPoint.x}px ${mapData.focusPoint.y}px` }}
          viewBox={`0 0 ${mapBounds.width} ${mapBounds.height}`}
          role="img"
        >
          <g className="distance-map-countries">
            {worldMap.locations.map((location) => (
              <path d={location.path} key={location.id} />
            ))}
          </g>
          {mapData.path ? (
            <>
              <path className="distance-route" d={mapData.path} pathLength="1" />
              <circle className="distance-traveler-dot" r="6">
                <animateMotion dur="4.8s" path={mapData.path} repeatCount="indefinite" />
              </circle>
            </>
          ) : null}
          <g className="distance-origin-marker" transform={`translate(${mapData.vegasPoint.x} ${mapData.vegasPoint.y})`}>
            <circle r="14" />
            <text x="0" y="4">LV</text>
          </g>
          {mapData.visitorPoint ? (
            <g className="distance-pin" transform={`translate(${mapData.visitorPoint.x} ${mapData.visitorPoint.y})`}>
              <path d="M0-30c17 0 29 12 29 28 0 21-29 48-29 48S-29 19-29-2c0-16 12-28 29-28Z" />
              <circle r="10" />
            </g>
          ) : null}
        </svg>
      </div>

      <div className="distance-copy">
        <p className="eyebrow">Location</p>
        <h2 id="about-distance-title">I&apos;m from Las Vegas, Nevada.</h2>
        {status === "ready" ? (
          <p>
            That is roughly <strong>{mapData.miles.toLocaleString()} miles</strong> from {locationLabel(visitorLocation)}, according to your IP address.
          </p>
        ) : status === "loading" ? (
          <p>Checking how far Las Vegas is from your current location...</p>
        ) : (
          <p>Your current location could not be estimated, but Las Vegas is still home base.</p>
        )}
      </div>
    </section>
  );
}
