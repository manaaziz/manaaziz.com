import posthog from "posthog-js";

export const analyticsConsentKey = "mana_analytics_consent";
const replaySampleKey = "mana_analytics_replay_sample";
const replaySampleRate = 0.15;

export function analyticsIsConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST
  );
}

export function stripAnalyticsUrl(value) {
  if (!value || typeof value !== "string") return value;

  try {
    const url = new URL(value, window.location.origin);
    return `${url.origin}${url.pathname}`;
  } catch {
    return value.split(/[?#]/, 1)[0];
  }
}

function isReplaySampled() {
  if (typeof window === "undefined") return false;

  const storedSample = window.localStorage.getItem(replaySampleKey);
  if (storedSample) return storedSample === "included";

  const included = Math.random() < replaySampleRate;
  window.localStorage.setItem(replaySampleKey, included ? "included" : "excluded");
  return included;
}

export function startSampledReplay() {
  if (!analyticsIsConfigured() || !isReplaySampled()) return;
  posthog.startSessionRecording();
}

export function captureAnalyticsEvent(eventName, properties = {}) {
  if (!analyticsIsConfigured() || posthog.has_opted_out_capturing()) return;
  posthog.capture(eventName, properties);
}

export function acceptAnalytics() {
  if (!analyticsIsConfigured() || typeof window === "undefined") return;
  window.localStorage.setItem(analyticsConsentKey, "accepted");
  posthog.opt_in_capturing();
  startSampledReplay();
  posthog.capture("analytics consent granted");
  posthog.capture("$pageview");
}

export function declineAnalytics() {
  if (!analyticsIsConfigured() || typeof window === "undefined") return;
  posthog.opt_out_capturing();
  posthog.stopSessionRecording();
  window.localStorage.setItem(analyticsConsentKey, "declined");
}

export { posthog };
