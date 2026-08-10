# Website Roadmap

This roadmap tracks the mobile-first migration and related quality work for `manaaziz.com`.
The stable pre-migration fallback is `main`; active migration work lives on `mobile-first-phase-two`.

## Current phase: low-risk mobile foundation

- [x] Add Playwright as a development dependency.
- [x] Add a responsive QA matrix covering 320, 375, 390, 430, 768, 1024, and 1440 CSS pixels.
- [x] Add a 320px page-overflow and content-reflow test.
- [x] Add desktop visual-regression coverage at 1024px and 1440px.
- [x] Formalize shared spacing, typography, content-width, breakpoint, and touch-target tokens.
- [x] Use mobile-first defaults with `min-width` enhancements for newly migrated components.
- [x] Gate optional hover treatments for devices with a fine pointer and convenient hover.
- [x] Establish a 44px internal target for ordinary buttons and icon controls.
- [x] Preserve documented exceptions for dense maps, calendars, and research visualizations.
- [x] Add a comprehensive reduced-motion fallback.
- [x] Audit critical and reusable image markup for dimensions and eager/lazy loading.
- [x] Start incremental CSS Module migration with the ordinary Teaching course grid.
- [x] Review generated desktop reference screenshots before approving a merge to `main`.
- [x] Add GitHub Actions coverage for the responsive suite on `main`, `mobile-first-dev`, and pull requests.
- [ ] Confirm the first remote Responsive browser QA workflow run succeeds.

## Ongoing architecture

- [ ] Keep global CSS limited to reset, tokens, typography, shared utilities, and true site-wide rules.
- [ ] Move component styles into colocated CSS Modules whenever that component is next modified.
- [ ] Consolidate duplicate legacy breakpoint rules only after visual-regression coverage exists.
- [ ] Introduce container queries for reusable cards after their CSS Module migration.
- [ ] Evaluate a deliberate cascade-layer structure after legacy unlayered CSS has been reduced.
- [ ] Keep pages as Server Components and isolate `use client` to the smallest interactive boundary.
- [ ] Audit route-specific JavaScript and dynamically load heavy interactives near the viewport.
- [ ] Pause requestAnimationFrame loops, observers, and simulations while offscreen.

## Design and accessibility

- [ ] Verify all ordinary controls meet the 44px internal target and WCAG 2.2 minimum sizing.
- [x] Verify keyboard reachability and that focus is visible and not obscured by the sticky mobile header.
- [ ] Verify semantic source order matches reading and keyboard order before desktop repositioning.
- [ ] Ensure every hover-revealed detail also has a tap, click, or keyboard path.
- [x] Test browser zoom at 200% and reflow at a 320px equivalent viewport.
- [x] Test portrait and landscape orientations.
- [ ] Test the site with reduced motion, keyboard-only navigation, and screen-reader landmarks.
- [ ] Provide list-based alternatives for dense map and visualization controls where practical.

## Images and performance

- [ ] Complete the remaining dynamic-image dimension audit as content models are updated.
- [ ] Add responsive `srcset`/`sizes` or Next Image where compatible with static export.
- [ ] Create mobile-specific crops where the desktop crop loses its subject.
- [ ] Keep likely LCP images eager/high-priority and ordinary offscreen images lazy.
- [ ] Measure mobile and desktop LCP, INP, and CLS independently.
- [ ] Test `content-visibility: auto` on long static archives and course schedules.
- [ ] Avoid `content-visibility` on components that measure offscreen geometry until tested.

## Complex interactive roadmap — deliberately deferred

Do not refactor these systems during the low-risk migration. Each needs its own reference captures,
interaction specification, mobile design, reduced-motion behavior, and focused implementation branch.

### Feature and student-review carousels

- [ ] Preserve the established connected reel/spin motion on desktop.
- [ ] Design touch-first navigation, swipe behavior, card sizing, and reduced-motion substitution.
- [ ] Measure initialization and interaction cost on mid-range mobile hardware.

### Research honeycomb and falling poker chips

- [ ] Redesign hexagon sizing and text density around container width.
- [ ] Preserve the 2-1-2-1 desktop composition and visible gutters.
- [ ] Create an accessible mobile alternative for paper links.
- [ ] Rework chip physics only after layout geometry is stable.

### Research word graph

- [ ] Define touch selection, keyboard navigation, label collision, and mobile starting positions.
- [ ] Keep the three primary themes visually forward on initial load.

### Global Experience maps

- [ ] Provide reliable touch targets and an equivalent list-based navigation path.
- [ ] Audit map-label collisions and phone detail overlays.
- [ ] Lazy-load map code without delaying the surrounding Home content.

### Course calendars

- [ ] Replace hover-dependent discovery with explicit tap/keyboard controls.
- [ ] Preserve compact week pills and accessible assignment/due-date details.
- [ ] Reconsider the calendar layout at 320–430px without changing desktop until approved.

### Reusable scrollytelling template

- [ ] Extract a reusable scrollytelling data model for stops, media, captions, and route connectors.
- [ ] Separate narrative content from viewport/animation logic.
- [ ] Define desktop, tablet, and mobile compositions before implementation.
- [ ] Add progress semantics, keyboard navigation, reduced-motion behavior, and static fallback content.
- [ ] Use the Spain recap as the first template consumer after its desktop presentation is reworked.
- [ ] Preserve the current Spain recap connector and moving-dot requirements until that redesign begins.

### Consulting logo arena

- [ ] Define mobile bounds, collision behavior, pausing, and reduced-motion fallback.

### Casino and blog interactives

- [ ] Audit baccarat animations, charts, tooltips, and decision-tree interactions for touch and keyboard use.
- [ ] Replace hover-only graph information with selectable states.
- [ ] Profile long tasks and layout work during animation.

## Release checklist for mobile-first branches

- [x] `npm run lint`
- [x] `npm run audit:assets`
- [x] `npm run build`
- [x] `npm run test:responsive`
- [x] Review desktop screenshot differences at 1024px and 1440px.
- [ ] Manually test Home, Manalogue, Teaching, Consulting, Research, About, and one course page.
- [ ] Confirm the worktree is clean and the branch is pushed before requesting merge approval.
