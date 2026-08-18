import * as Sentry from "@sentry/browser";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const environment = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV || "production";
const release = process.env.NEXT_PUBLIC_SENTRY_RELEASE;

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

export function onRouterTransitionStart(url, navigationType) {
  if (!dsn) return;

  Sentry.addBreadcrumb({
    category: "navigation",
    message: `Navigate to ${stripUrlDetails(url)}`,
    level: "info",
    data: { navigationType }
  });
}
