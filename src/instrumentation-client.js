import * as Sentry from "@sentry/browser";
import { analyticsConsentKey, posthog, startSampledReplay, stripAnalyticsUrl } from "@/lib/analytics";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const environment = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV || "production";
const release = process.env.NEXT_PUBLIC_SENTRY_RELEASE;
const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

function stripUrlDetails(value) {
  if (!value || typeof value !== "string") return value;

  try {
    const url = new URL(value, window.location.origin);
    return `${url.origin}${url.pathname}`;
  } catch {
    return value.split(/[?#]/, 1)[0];
  }
}

function sanitizeEvent(event) {
  if (event.request) {
    event.request.url = stripUrlDetails(event.request.url);
    delete event.request.cookies;
    delete event.request.data;
    delete event.request.headers;
  }

  delete event.user;
  return event;
}

if (dsn) {
  try {
    Sentry.init({
      dsn,
      enabled: true,
      environment,
      release: release || undefined,
      sendDefaultPii: false,
      maxBreadcrumbs: 50,
      transport: Sentry.makeBrowserOfflineTransport(),
      transportOptions: {
        maxQueueSize: 30
      },
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.captureConsoleIntegration({ levels: ["error"] }),
        Sentry.extraErrorDataIntegration({ depth: 3 }),
        Sentry.httpClientIntegration({
          failedRequestStatusCodes: [[400, 599]],
          failedRequestTargets: [/^\//, /^https:\/\/(?:www\.)?manaaziz\.com\//]
        })
      ],
      tracesSampleRate: 0.05,
      tracePropagationTargets: [/^\//, /^https:\/\/(?:www\.)?manaaziz\.com\//],
      ignoreErrors: [
        "ResizeObserver loop completed with undelivered notifications",
        "ResizeObserver loop limit exceeded"
      ],
      denyUrls: [
        /browser-extension:\/\//i,
        /chrome-extension:\/\//i,
        /moz-extension:\/\//i,
        /safari-extension:\/\//i
      ],
      beforeBreadcrumb(breadcrumb) {
        if (breadcrumb.data?.url) {
          breadcrumb.data.url = stripUrlDetails(breadcrumb.data.url);
        }
        if (breadcrumb.data?.from) {
          breadcrumb.data.from = stripUrlDetails(breadcrumb.data.from);
        }
        if (breadcrumb.data?.to) {
          breadcrumb.data.to = stripUrlDetails(breadcrumb.data.to);
        }
        return breadcrumb;
      },
      beforeSend: sanitizeEvent,
      beforeSendTransaction: sanitizeEvent
    });
  } catch (error) {
    // Monitoring must always fail open so it can never prevent the site loading.
    console.warn("Website telemetry could not initialize.", error);
  }
}

if (posthogToken && posthogHost) {
  try {
    posthog.init(posthogToken, {
      api_host: posthogHost,
      defaults: "2026-05-30",
      autocapture: true,
      capture_pageview: "history_change",
      capture_pageleave: true,
      person_profiles: "never",
      opt_out_capturing_by_default: true,
      opt_out_capturing_persistence_type: "localStorage",
      disable_session_recording: true,
      session_recording: {
        maskAllInputs: true,
        blockClass: "ph-no-capture"
      },
      before_send(event) {
        if (!event?.properties) return event;

        for (const property of ["$current_url", "$referrer", "$initial_current_url", "$initial_referrer"]) {
          if (event.properties[property]) {
            event.properties[property] = stripAnalyticsUrl(event.properties[property]);
          }
        }
        return event;
      },
      loaded(instance) {
        if (window.localStorage.getItem(analyticsConsentKey) === "accepted") {
          instance.opt_in_capturing();
          startSampledReplay();
        }
      }
    });
  } catch (error) {
    // Analytics must never interfere with rendering or interaction.
    console.warn("Website analytics could not initialize.", error);
  }
}

export function onRouterTransitionStart(url, navigationType) {
  if (!dsn) return;

  Sentry.addBreadcrumb({
    category: "navigation",
    message: `Navigate to ${stripUrlDetails(url)}`,
    level: "info",
    data: { navigationType }
  });
}
