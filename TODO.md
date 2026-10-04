# Website To-Do List

Updated October 4, 2026. Current priorities for `manaaziz.com`, followed by remaining maintenance work.
Code audit performed against local `main`. Source and test coverage were inspected; this was not a fresh browser test, performance measurement, or CI run.

## 1. Add recent media coverage

Use the existing `newsItems` data in `src/app/news/items.js`, which feeds In the News. `/media` currently redirects to `/manalogue`; avoid creating a duplicate media page.

- [ ] Add Inside Asian Gaming — [Loyalty in Numbers](https://asgam.com/2026/09/30/loyalty-in-numbers/) (September 30, 2026). Describe Mana's comments on AI, loyalty, and casino analytics at the IAG Academy Summit in Manila.
- [ ] Add GGRAsia — [AI a defence as well as risk regarding ‘advantage play’ in land-based casinos: Differential Labs](https://www.ggrasia.com/ai-a-defence-as-well-as-risk-regarding-advantage-play-in-land-based-casinos-differential-labs) (September 21, 2026). Describe Mana's comments on smart-table data and real-time advantage-play detection.
- [ ] Add Inside Asian Gaming — [Study finds AI-backed advantage play on baccarat side bets becoming an increasing problem for casinos in Asia](https://asgam.com/2026/08/30/study-finds-ai-backed-advantage-play-on-baccarat-side-bets-becoming-an-increasing-problem-for-casinos-in-asia/) (August 30, 2026). Describe this as coverage of Differential Labs' analysis; the article does not name Mana individually.
- [ ] Keep existing coverage, order entries newest first, and check titles, dates, descriptions, and outbound links.

Titles and dates were checked against the linked sources during this audit. None of these three links is in the current news data.

## 2. Write the Manila / IAG Expo blog post and add a presentation photo

- [ ] Gather Mana's trip notes, highlights, presentation topic, event dates, and selected photos. Confirm the session name: the linked IAG coverage calls the panel the IAG Academy Summit, while the recap can cover the wider IAG Expo experience.
- [ ] Draft a personal Manalogue post about the Manila visit, presentation, conversations, and takeaways using the existing MDX structure in `src/content/blog`.
- [ ] Add a photo of Mana presenting, with an accurate visible caption and alt text. Decide whether it should also appear in the Research presentation gallery once the photo and session details are available.
- [ ] Save the original under `asset_originals/assets/photos/`; publish a suitably sized WebP with a descriptive name such as `mana-azizsoltani-iag-manila-presentation.webp`.
- [ ] Add the thumbnail, publication date, canonical metadata, and relevant media links. Check the post in the Manalogue, search, and sitemap, including its representative image.

Progress October 4: created the `killa_in_manila.mdx` draft shell with the presentation and trip photos. Also created `wyatts_wedding.mdx` and `day_in_sf.mdx` draft shells. All 19 uploaded photos are now WebP, with originals archived. Draft shells are excluded from routes, search, and the sitemap until `draft: false` and a publication date are set. The two consulting posts, `baccarat_countability_ai.mdx` and `loyalty_in_numbers.mdx`, are implemented locally. Personal narratives still need to be supplied. Draft dates are September 17 for Manila, September 19 for Wyatt’s Wedding, and September 20 for San Francisco (all 2026).

San Francisco update: interactive Mapbox photo journey presented as one day, with all eight photo pins and a subtly animated dotted route. Uber photo is assigned to Dumpling House (335 Noe St); original capture metadata stays in the content file but is not displayed. No photo strip or route note. City view opens first; Show all stops includes the airport. Edit each stop's `blurb` in `src/content/photo_maps/san_francisco.json` before publishing. Direct draft URLs work locally only; drafts remain excluded from production exports.

## 3. Reconcile paper statuses, then update the CV / resume

- [ ] In the planned email-review session, locate the research tracker and editable CV/resume source, and review journal/editor/coauthor messages for papers in progress.
- [ ] Reconcile each paper's title, authors, journal, latest status, and status date. Record supporting message/date references in the private tracker and flag ambiguous or conflicting updates.
- [ ] Update the research tracker first, distinguishing in preparation, submitted, under review, revise and resubmit, accepted/in press, and published papers as supported by the correspondence.
- [ ] Update the CV and any separate resume from the reconciled tracker, including an appropriately labeled under-review section; keep unpublished work distinct from publications.
- [ ] Export and replace `public/assets/azizsoltani_cv.pdf`, preserving its existing URL; check the homepage CV link and any research-page entries affected by confirmed changes.

Dependency order: email evidence → research tracker → CV/resume → website PDF and relevant public entries. Email review and document updates are future tasks. The repo contains the public CV PDF; no editable CV/resume or research tracker was identified in the file inventory.

## 4. Add color to the Work Mix pie chart

- [x] Use the approved coordinated green palette: deep green for Consulting, medium sage for Research, and pale sage for Teaching.
- [x] Update slice colors in `src/app/globals.css` and simplify the heading to “Tap a section of the chart to see how I spend my time”.
- [x] Preserve the 70/20/10 proportions, established motion, hover spotlight/reset, labels, keyboard selection, and mobile tap-to-detail behavior in `src/app/about/work_mix_chart.js`.
- [x] Inspect desktop/mobile colors and retain category labels; existing Work Mix interaction checks pass, with a fractional-pixel 320px failure on the first run that passed on recheck.

Post/category pills are standardized through `src/components/topic_pill.js` across carousels, post headers, Manalogue cards, archives, search results, and map details. Desktop/mobile style checks, lint, build, and export validation passed.

## 5. Remaining maintenance — actual gaps and focused checks

- [ ] Pause the Consulting logo arena and decision-tree animation when offscreen. `logo_bounce_field.js` and `decision_tree_growth.js` already check reduced motion, but lack the visibility gating used by the carousel and paper chips. Check other loops when their components are touched.
- [ ] Audit remaining hover-only information, especially casino/blog graph tooltips and research word-graph keyboard interaction. Buttons and pointer dragging alone do not establish keyboard equivalence.
- [ ] Verify complete navigation parity for Global Experience's region/country buttons and collaboration list, including US-state drilldown; check phone overlays and label collisions. Extend demonstrated gaps in existing navigation.
- [ ] Verify research paper dialog focus handling and return, plus word-graph label collisions on small screens. Mobile paper layout, tap/Enter-to-open details, and a reduced mobile graph already exist.
- [ ] Extend image dimensions and responsive variants to remaining dynamic/content images as their models are edited. Reuse `ResponsiveImage` and the generator; add mobile crops only where an actual image needs one.
- [ ] Profile remaining complex interactives if performance issues arise. Existing baseline tooling measures mobile/desktop load and scripted interactions; this is not real-device or field INP verification.

## Standing rules, not standalone projects

- Move ordinary component styles into colocated CSS Modules when those components are next changed; consolidate duplicate breakpoints with visual coverage. Global CSS still has component rules, so migration is incremental.
- Keep pages as Server Components where practical and isolate interactive client boundaries.
- Keep likely LCP images eager and ordinary offscreen images lazy. Avoid untested containment on geometry-dependent components.
- Preserve carousel motion, desktop research honeycomb/gutters, foreground research themes, and Spain recap connectors. These are design constraints, not unfinished features.
- Maintain existing accessibility, responsive, performance, and security checks.
