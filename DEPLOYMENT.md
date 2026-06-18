# Deploying manaaziz.com on GitHub Pages

This site is a static Next.js export. GitHub Actions builds the site into `out/` and publishes that folder to GitHub Pages.

## Later Deployment Note

Deployment is intentionally being prepared but not turned on yet. When Mana says he feels ready to publish the site, help him do the following:

1. Review the current site locally and run `npm run lint`, `npm run audit:assets`, and `npm run build`.
2. Commit and push any final website changes.
3. Confirm the GitHub Pages workflow is present at `.github/workflows/deploy.yml`.
4. In GitHub, switch Pages to **GitHub Actions** as the build source.
5. Add `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` to GitHub Actions variables or secrets.
6. Confirm the custom domain is `manaaziz.com`.
7. Confirm DNS records point to GitHub Pages.
8. Trigger the deployment by pushing to `master` or manually running the workflow.
9. After deployment, verify `https://manaaziz.com`, `https://www.manaaziz.com`, the Mapbox globe, image-heavy pages, and internal routes.

Do not assume deployment has already been activated just because this file exists.

## GitHub Repository Settings

1. Open the repository on GitHub.
2. Go to **Settings** -> **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Under **Custom domain**, enter `manaaziz.com`.
5. Keep **Enforce HTTPS** enabled once GitHub allows it.

The repository includes `public/CNAME`, so each static export keeps the custom domain file in `out/CNAME`.

## DNS

For the apex domain `manaaziz.com`, point your DNS provider to GitHub Pages:

```txt
A  185.199.108.153
A  185.199.109.153
A  185.199.110.153
A  185.199.111.153
```

For `www.manaaziz.com`, add:

```txt
CNAME  manaaziz.github.io
```

After DNS propagates, GitHub Pages can issue the HTTPS certificate.

## Environment Variables

The About page Mapbox globe needs a public Mapbox token at build time.

In GitHub, go to **Settings** -> **Secrets and variables** -> **Actions** and add either:

```txt
Variable: NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
```

or:

```txt
Secret: NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
```

The deployment workflow reads either one.

## Deployment Flow

On every push to `master`, GitHub Actions will:

1. Install dependencies with `npm ci`.
2. Validate source references with `npm run lint`.
3. Report large image assets with `npm run audit:assets`.
4. Optimize oversized deployed images in the GitHub Actions runner.
5. Build the static site with `npm run build`.
6. Remove `.DS_Store` metadata from `out/`.
7. Verify `out/CNAME` is `manaaziz.com`.
8. Publish `out/` to GitHub Pages.

## Performance Notes

The site can run on GitHub Pages, but static hosting means image files are served as-is. For best performance:

- Keep display images near the dimensions they are shown at.
- Prefer WebP or AVIF for large gallery images when possible.
- Keep original high-resolution photos outside `public/` unless they need to be downloaded directly.
- Run `npm run audit:assets` before deployment to see the largest files.
- Run `npm run optimize:assets` to preview deploy-time image compression.
- Run `npm run optimize:assets:write` only when you intentionally want to rewrite local image files.
