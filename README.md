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
npm run build
```

The site is configured for static export through `next.config.mjs`.

## Notes

This repository was migrated from an older Jekyll/Minimal Mistakes site. The active site now lives in the Next.js structure above; converted legacy blog content is stored in `src/content/blog`.
