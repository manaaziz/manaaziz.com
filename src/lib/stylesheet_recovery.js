const recoveryKey = "mana-stylesheet-recovery";

// React rejects its stylesheet-loading promise with the link's native error
// event, rather than an Error with a stack or the failed asset's URL.
export function failedStylesheetUrl(reason, origin) {
  const target = reason?.target;
  if (reason?.type !== "error" || target?.tagName !== "LINK" || target.rel !== "stylesheet") return null;

  try {
    const url = new URL(target.href, origin);
    if (url.origin !== origin || !url.pathname.startsWith("/_next/static/") || !url.pathname.endsWith(".css")) return null;
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}

export function installStylesheetRecovery(browser) {
  function recover(event) {
    if (!failedStylesheetUrl(event.reason, browser.location.origin)) return;

    // A tab open across a Pages deployment can request a removed CSS hash.
    // Fresh HTML can recover it, but never enter a reload loop if the network
    // stays unavailable. Without persistent storage, skip automatic recovery.
    try {
      if (browser.sessionStorage.getItem(recoveryKey)) return;
      browser.sessionStorage.setItem(recoveryKey, "attempted");
    } catch {
      return;
    }

    // Leave the rejection visible to Sentry and allow its report to be queued.
    browser.setTimeout(() => browser.location.reload(), 1000);
  }

  browser.addEventListener("unhandledrejection", recover);
  return () => browser.removeEventListener("unhandledrejection", recover);
}
