# manaaziz.com

Personal website for Mana Azizsoltani, built with Next.js and React.

## Structure

- `src/app` - Next.js App Router routes, page components, and route-local UI.
- `src/components` - shared React components used across routes.
- `src/lib` - shared data loading and utility code.
- `src/content` - MDX/blog source content.
- `public/assets` - static files served by the site, including images, logos, PDFs, and course materials.
- `scripts` - one-off migration or asset maintenance scripts.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run generate:responsive-images
npm run build
```

The site is configured for static export through `next.config.mjs`.

## Production telemetry

Browser error and performance telemetry uses Sentry's browser SDK through Next.js client
instrumentation. It captures uncaught exceptions, unhandled promise rejections, `console.error`
events, failed same-origin HTTP requests, navigation/network breadcrumbs, and a 5% sample of
browser performance traces. Reports are queued briefly in IndexedDB when a visitor is offline.
Session replay and collection of default personally identifiable information are disabled.

To activate telemetry:

1. Create a Sentry JavaScript project for `manaaziz.com` and copy its public DSN.
2. In the GitHub repository, open **Settings → Secrets and variables → Actions → Variables**.
3. Add `NEXT_PUBLIC_SENTRY_DSN` with that DSN. The deploy workflow supplies the production
   environment and commit SHA automatically.
4. Deploy the site, then run `console.error("Mana website telemetry test")` once in the deployed
   browser console and confirm that the event appears in Sentry.

The DSN is a public client identifier rather than a secret, but Sentry project rate limits and
allowed-domain settings should still be enabled. Local development remains quiet unless the DSN
is deliberately added to `.env.local`.

## Performance baseline

After building the static export, run the repeatable mobile and desktop lab profile with:

```bash
npm run measure:performance -- --write
```

The command measures Home, Manalogue, Teaching, Research, and one course route under consistent
mobile and desktop CPU/network profiles. It records navigation timing, FCP, LCP, CLS, a repeatable
interaction-latency proxy, long tasks, request counts, JavaScript bytes, and image bytes in
`performance-baseline.json`.

These are local comparison measurements, not field data. Use the same machine and command when
comparing a future branch to the baseline.

## Notes

This repository was migrated from an older Jekyll/Minimal Mistakes site. The active site now lives in the Next.js structure above; converted legacy blog content is stored in `src/content/blog`.
