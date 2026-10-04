"use client";

import { useEffect, useRef, useState } from "react";
import journey from "@/content/photo_maps/san_francisco.json";
import styles from "./san_francisco_photo_map.module.css";

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const stops = journey.stops;

export default function SanFranciscoPhotoMap() {
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState(token ? "loading" : "unavailable");
  const [ready, setReady] = useState(false);
  const container = useRef(null);
  const mapRef = useRef(null);
  const library = useRef(null);
  const markers = useRef([]);
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const selected = stops.find((stop) => stop.id === selectedId);

  useEffect(() => {
    if (!token) return;
    let disposed = false;
    let map;
    let resize;
    const timeout = window.setTimeout(() => setStatus("unavailable"), 15000);
    async function start() {
      try {
        const { default: mapboxgl } = await import("mapbox-gl");
        if (disposed) return;
        library.current = mapboxgl;
        map = new mapboxgl.Map({
          container: container.current,
          accessToken: token,
          style: "mapbox://styles/mapbox/light-v11",
          center: [-122.47, 37.77], zoom: 12,
          cooperativeGestures: true
        });
        mapRef.current = map;
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
        map.on("load", () => {
          if (disposed) return;
          window.clearTimeout(timeout);
          setReady(true);
          setStatus("ready");
        });
        map.on("error", () => {
          if (!disposed && !map.isStyleLoaded()) setStatus("unavailable");
        });
        resize = new ResizeObserver(() => map.resize());
        resize.observe(container.current);
      } catch {
        if (!disposed) setStatus("unavailable");
      }
    }
    start();
    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      resize?.disconnect();
      markers.current.forEach(({ marker }) => marker.remove());
      markers.current = [];
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  function fitStops(includeAirport = true) {
    const map = mapRef.current;
    const points = stops.filter((stop) => stop.coordinates && (includeAirport || stop.id !== "airport"));
    if (!map || !library.current || !points.length) return;
    const bounds = new library.current.LngLatBounds();
    points.forEach((stop) => bounds.extend(stop.coordinates));
    map.fitBounds(bounds, { padding: 85, maxZoom: 14, duration: 0 });
  }

  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;
    markers.current.forEach(({ marker }) => marker.remove());
    markers.current = [];
    const features = [];
    stops.forEach((stop, index) => {
      if (!stop.coordinates) return;
      const previous = stops[index - 1];
      if (previous?.coordinates) features.push({
        type: "Feature", properties: {},
        geometry: { type: "LineString", coordinates: [previous.coordinates, stop.coordinates] }
      });
      const button = document.createElement("button");
      button.type = "button";
      button.className = styles.pin;
      button.setAttribute("aria-label", `Open photo: ${stop.title}`);
      button.setAttribute("aria-pressed", "false");
      const image = document.createElement("img");
      image.src = stop.image;
      image.alt = "";
      image.decoding = "async";
      const number = document.createElement("span");
      number.textContent = String(index + 1);
      button.append(image, number);
      button.addEventListener("click", () => {
        triggerRef.current = button;
        setSelectedId(stop.id);
      });
      const marker = new library.current.Marker({ element: button, anchor: "bottom" })
        .setLngLat(stop.coordinates).addTo(map);
      // Mapbox assigns an image role to markers; these are interactive buttons.
      button.setAttribute("role", "button");
      markers.current.push({ marker, button, id: stop.id });
    });
    const data = { type: "FeatureCollection", features };
    if (map.getSource("photo-route")) map.getSource("photo-route").setData(data);
    else {
      map.addSource("photo-route", { type: "geojson", data });
      map.addLayer({ id: "photo-route-border", type: "line", source: "photo-route", paint: { "line-color": "#fff", "line-width": 9 } });
      map.addLayer({ id: "photo-route", type: "line", source: "photo-route", paint: { "line-color": "#dc592e", "line-width": 4, "line-dasharray": [2, 1] } });
    }
    fitStops(false);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    let phase = 0;
    function animate() {
      window.clearInterval(timer);
      if (motion.matches) {
        map.setPaintProperty("photo-route", "line-dasharray", [2, 3]);
        return;
      }
      timer = window.setInterval(() => {
        if (document.hidden || !map.getLayer("photo-route")) return;
        phase = (phase + 0.08) % 5;
        // Advance the leading gap, wrapping the dash at the end of each cycle.
        const dash = phase <= 3 ? [0, phase, 2, 3 - phase] : [phase - 3, 3, 5 - phase, 0];
        map.setPaintProperty("photo-route", "line-dasharray", dash);
      }, 80);
    }
    animate();
    motion.addEventListener("change", animate);
    return () => {
      window.clearInterval(timer);
      motion.removeEventListener("change", animate);
    };
  }, [ready]);

  useEffect(() => {
    markers.current.forEach(({ button, id }) => button.setAttribute("aria-pressed", String(id === selectedId)));
    if (selectedId) dialogRef.current?.showModal();
  }, [selectedId, ready]);

  function closePhoto() {
    dialogRef.current?.close();
    setSelectedId(null);
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <section className={styles.journey} aria-label="San Francisco photo journey" onKeyDown={(event) => {
      if (event.key === "Escape" && selected) closePhoto();
    }}>
      <div className={styles.intro}>
        <div><p className="eyebrow">A city, one stop at a time</p><h2>Follow the photos.</h2></div>
        <p>A little wandering, a few detours, and the moments in between. Tap a photo to take a closer look.</p>
      </div>
      <div className={styles.toolbar}>
        <button type="button" className={styles.fit} onClick={() => fitStops(false)} disabled={!ready}>City view</button>
        <button type="button" className={styles.fit} onClick={() => fitStops()} disabled={!ready}>Show all stops</button>
      </div>
      <div className={styles.stage}>
        <div ref={container} className={styles.map} aria-label="Interactive map of San Francisco photo stops" />
        {status !== "ready" && <p role="status" className={styles.notice}>
          {status === "loading" ? "Opening the map…" : "The map is unavailable right now. You can still open the photo stops below."}
        </p>}
        <div className={styles.mapLabel}><span />One day · {stops.length} moments</div>
      </div>
      {status === "unavailable" && <div className={styles.fallback} aria-label="Photo stops">
        {stops.map((stop) => <button className={styles.fit} type="button" key={stop.id} onClick={(event) => {
          triggerRef.current = event.currentTarget; setSelectedId(stop.id);
        }}>{stop.title}</button>)}
      </div>}
      <dialog ref={dialogRef} className={styles.detail} aria-label={selected ? `Photo details: ${selected.title}` : "Photo details"}
        onClose={() => setSelectedId(null)}>
      {selected && <>
        <img src={selected.image} alt={selected.alt} decoding="async" />
        <div className={styles.story}>
          <button type="button" className={styles.close} onClick={closePhoto} aria-label="Close photo">×</button>
          <h3>{selected.title}</h3>
          <p>{selected.blurb || "A little story from this stop, coming soon."}</p>
          {!selected.coordinates && <small>This moment was captured between mapped stops.</small>}
        </div>
      </>}
      </dialog>
    </section>
  );
}
