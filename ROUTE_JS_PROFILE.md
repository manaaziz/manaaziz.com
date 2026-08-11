# Route JavaScript profile

Profiled from the static Next.js export on August 10, 2026. File sizes below are emitted sizes on disk,
not compressed transfer sizes.

## Findings

- Ordinary Teaching cards, course-material cards, and editorial cards are server-rendered markup plus CSS.
  Their CSS Module migration adds no new client-side component boundary.
- The largest emitted JavaScript chunks are approximately 2.1 MB each in `out/_next/static/chunks`.
  Source inspection identifies Mapbox in one of these chunks; it is already loaded through a dynamic import
  inside the existing About distance-map component.
- The Home Global Experience component was already split dynamically, but its wrapper rendered immediately.
  The wrapper now waits until the section is within 700px of the viewport before mounting the unchanged map.
- The complex carousel, research honeycomb/chip physics, word graph, maps, scrollytelling, logo physics,
  and blog/casino interactives were not refactored during this pass.

## Regression coverage

- `tests/responsive.spec.js` verifies that the Home map placeholder is present before approach and that the
  real map mounts when the section reaches the observer boundary.
- `tests/semantics.spec.js` checks the primary routes for one `main`, one `h1`, named visible landmarks, and
  non-skipping course-material heading order.

Future bundle work should be performed one complex interactive at a time, with interaction captures and
route-specific before/after measurements, rather than changing those components during ordinary CSS work.

## Repeatable measurement

Run `npm run generate:responsive-images`, `npm run build`, and then
`npm run measure:performance -- --write`. The harness applies consistent mobile and desktop CPU/network
profiles to five representative routes and writes the comparison data to `performance-baseline.json`.
