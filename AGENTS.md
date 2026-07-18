# Agent Instructions

This is the working memory for `manaaziz.com`, Mana Azizsoltani's personal website. Use it to get oriented quickly before making changes.

## Project Overview

- This is a Next.js App Router site with static export for GitHub Pages.
- The active application code lives in `src/app`, shared components in `src/components`, content in `src/content`, shared utilities in `src/lib`, and static files in `public/assets`.
- The site is deployed from the `main` branch through `.github/workflows/deploy.yml`.
- The custom domain is `manaaziz.com`; `public/CNAME` should remain present.
- GitHub Pages should use GitHub Actions as the source, not branch-root deployment.

## Validation And Deployment

- Run `npm run lint` after source/content changes. This uses `scripts/validate-site.mjs`.
- Run `npm run build` before larger UI/content changes are considered complete.
- Run `npm run audit:assets` when adding or replacing media-heavy assets.
- The deploy workflow runs `npm ci`, `npm run lint`, `npm run audit:assets`, `npm run optimize:assets:write`, and `npm run build`.
- The About page Mapbox globe needs `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` available during deploy.
- Do not commit generated `out/` or `.next/` output unless the project explicitly changes to require it.

## Git Workflow

- Default branch is `main`. Do not use `master` for new work.
- Before staging, inspect `git status -sb` and the relevant diff.
- Stage only the files that belong to the user's current request. The worktree may contain unrelated uploaded assets or user changes.
- Do not remove, revert, or overwrite unrelated untracked files.
- When asked to commit and push, commit intentionally with a short message and push to `origin main` unless the user asks for a branch.

## Design Direction

- The site should feel personal, polished, tactile, and a little playful, but still professional enough for consulting, research, and academic audiences.
- Prefer real usable sections over marketing filler. The first screen should show actual content or navigation value.
- Keep UI dense enough to scan. Avoid oversized decorative sections unless they are doing real visual work.
- Use the existing cream/off-white surface, black ink, green accent, subtle borders, and 3D black button language.
- Buttons that sit on dark/black 3D backgrounds need light text.
- Keep card border radii modest unless matching an established component.
- Avoid changing an animation the user has explicitly said is finally right.

## Image Assets

- Convert site photos to WebP before adding or replacing them so pages load more lightly.
- Keep original source photos out of committed site assets unless they are explicitly needed for downloads or archival reasons.
- Use descriptive, lowercase, hyphenated filenames for optimized images.
- Prefer responsive image sizing and avoid shipping images much larger than their rendered size.
- Use `loading="lazy"` and `decoding="async"` for ordinary post/card images where appropriate.
- For thumbnails, prefer wide landscape compositions with no embedded text/logos unless the user asks otherwise.

## Carousels

- `src/components/FeatureCarousel.js` is the shared feature carousel for student review cards and blog preview cards.
- Do not introduce page-specific carousel tile-size overrides. Tile sizing should be centralized.
- Preserve the carousel animation unless the user explicitly asks to change it. The desired behavior is:
  - default state: staggered, layered carousel tiles;
  - spin state: tiles move as a connected circular/reel-like strip;
  - tiles themselves move around the axis, not just their content swapping.
- Blog preview carousel cards should keep the image at the top, fitting cleanly from the top edge, with body text truncating with ellipses instead of clipping.
- Student review cards should show the full quote inside a standard card size; adjust review-card font size only when asked, without changing carousel motion.

## Manalogue And Blog Cards

- The Manalogue should use a clean newspaper/editorial card approach, not the experimental Gaudi mosaic idea.
- Blog post cards should be standardized in size where possible.
- Avoid weird vertical whitespace in cards with images; images should sit naturally at the top and card content should flow below.
- The user prefers clicking individual blog posts rather than a redundant "Open The Manalogue" button in sections where posts are already visible.
- Read-post buttons use the black 3D button style with readable light text.

## Research Page

- Research paper cards use the honeycomb/hexagon mosaic in `src/app/research/PaperMosaic.js`.
- The current hexagon layout is intentionally a 2-1-2-1 pattern that can keep expanding as papers are added.
- Hexagons should be same-sized, flat-side-on-top, centered content, no descriptions, and show paper title, journal, DOI, Manalogue, and PDF links.
- Preserve the honeycomb gutters so small poker chips can fall through the cracks.
- Poker chip animation should feel physical: chips fall at a diagonal, bounce off visible hexagon surfaces, and should not appear to collide with invisible boxes or get stuck to sloped edges.
- If tuning chip physics, prefer small changes to restitution, tangent friction, gravity, contact resolution, and stuck nudges. Verify visually if possible.
- The research word graph should keep the three main themes visually in front on initial load.

## Consulting And Blog Interactives

- Dragon Tail baccarat post:
  - trend-board dots should be circular;
  - Banker and Player animations should be balanced and slow enough to read;
  - the mystery/question mark appears only when it is its turn;
  - graph hover should spotlight only the hovered line, keep that line colored, fade the others, and show a small info tile near the line.
- Marketing blog decision tree:
  - implemented through `src/components/DecisionTreeGrowth.js` and inserted via a marker in `src/components/PostContent.js`;
  - title should read `SEGMENTATION LOGIC` and `From segmentation to microsegmentation`;
  - animation should grow continuously from 4 terminal nodes to 8, 16, 32, 64, and 128 rather than cutting between separate trees or resizing the frame.
- Consulting page cards should keep buttons aligned and panels balanced.
- Surveillance copy should include advantage-play safeguarding and operator-facing interpretation of model outputs.
- Marketing copy should include: "the right offer, to the right person, at the right time, with the right components, terms, and delivery."

## Teaching Page

- Teaching philosophy cards should sound polished enough for a business school dean while still sounding like Mana.
- First teaching card title should be: "Preparing students for success in the real world".
- The first-card description should emphasize going beyond course material to help students build judgment, confidence, communication skills, and professional habits.
- Student review carousel font can be adjusted when asked, but do not change the established carousel animation.

## Spain Recap Post

- The Spain recap scrollytelling component is `src/components/SpainRecapScrolly.js`.
- The desired route/timeline effect has separate dotted red connector lines between tiles, with 90-degree bends, touching the bottom edge of the tile above and the top edge of the tile below.
- The red dot should move fluidly along the dotted connector as the user scrolls.
- Photos should appear alongside the relevant text as the reader scrolls, not just swap in one fixed top image.

## Home Page

- Home should lead with work/business content before global experience.
- The old about-me teaser was intentionally removed because About is already linked in the nav.
- Work Mix lives on the home page and should be compact vertically; the pie itself can be large, but the whole section should not dwarf Global Experience.
- Work Mix hover behavior: all panels are visible by default; hovering a panel/section spotlights it and fades the others; when hover ends, the pie returns to rest.
- Semantic ordering and halo effects are preferred over connector lines in Work Mix.
- Global Experience tiles may need region-specific positioning so map labels do not crowd.

## Copy And Metadata

- Site preview title should be "Mana Azizsoltani".
- Site preview description should be "Consultant, researcher, and professor specializing in AI and analytics in the hospitality and gaming industry".
- Use "I bring experience across multiple facets of the business." when that positioning is needed.
- Blog date notes:
  - Spain Reunion: April 29, 2026;
  - Summer School in Spain / Spain Recap: July 1, 2025;
  - Gambling and risk-taking conference post: May 29, 2026;
  - Dragon Tails in Baccarat: June 11, 2025.

## Local Server

- Use `npm run dev` for local development.
- If restarting the local site, kill the existing dev process cleanly and restart it rather than stacking multiple servers.
- If port 3000 is occupied, use the next available port and tell the user the URL.

## User Preference Notes

- The user likes iterative visual tuning with screenshots. Respond by making focused adjustments rather than broad redesigns.
- When the user says not to change an animation, do not touch animation logic while adjusting fonts/copy/content.
- The user cares a lot about spacing, tile consistency, readable text, and whether visual motion feels physically believable.
- Prefer direct implementation over long explanations unless the user asks to brainstorm.
