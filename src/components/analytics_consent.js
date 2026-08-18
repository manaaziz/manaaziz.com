"use client";

import { useEffect, useRef, useState } from "react";
import {
  acceptAnalytics,
  analyticsConsentKey,
  analyticsIsConfigured,
  declineAnalytics
} from "@/lib/analytics";

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState("loading");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const dialogRef = useRef(null);
  const configured = analyticsIsConfigured();

  useEffect(() => {
    if (!configured) return;
    setChoice(window.localStorage.getItem(analyticsConsentKey) || "unset");
  }, [configured]);

  useEffect(() => {
    if (!preferencesOpen) return undefined;
    dialogRef.current?.focus();

    function closeOnEscape(event) {
      if (event.key === "Escape") setPreferencesOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [preferencesOpen]);

  if (!configured) return null;

  const panelOpen = choice === "unset" || preferencesOpen;

  function accept() {
    acceptAnalytics();
    setChoice("accepted");
    setPreferencesOpen(false);
  }

  function decline() {
    declineAnalytics();
    setChoice("declined");
    setPreferencesOpen(false);
  }

  return (
    <>
      <button
        className="analytics-preferences-button"
        type="button"
        onClick={() => setPreferencesOpen(true)}
      >
        Analytics preferences
      </button>

      {panelOpen ? (
        <aside
          aria-label="Analytics preferences"
          aria-modal={preferencesOpen ? "true" : undefined}
          className="analytics-consent-panel"
          ref={dialogRef}
          role={preferencesOpen ? "dialog" : "region"}
          tabIndex={-1}
        >
          <div>
            <p className="eyebrow">Your privacy</p>
            <h2>Help improve this website?</h2>
            <p>
              Anonymous analytics show which pages and interactions are useful. A small sample of
              visits may be replayed to reveal layout problems; form and search inputs are always masked.
            </p>
          </div>
          <div className="analytics-consent-actions">
            <button className="button" type="button" onClick={accept}>Allow analytics</button>
            <button className="analytics-decline-button" type="button" onClick={decline}>No thanks</button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
