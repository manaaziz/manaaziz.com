# Website quality strategy

This project adapts the most useful validation patterns from the local `teen_ai_python`,
`high_potential_dashboard`, and `unusual_loss_python` projects to a static Next.js website.
The implementation is intentionally web-specific; it does not reproduce Python tooling that has no
equivalent deployment risk here.

## Principles adopted

1. **Test the shipped artifact.** Source validation is not enough. `npm run validate:export` walks the
   generated `out/` site, checks internal routes/assets (including `srcset` candidates), and verifies the
   custom domain contract.
2. **Use layered, focused checks.** Source/content validation, production export validation, browser
   behavior, desktop references, responsive reflow, performance profiling, dependency auditing, and
   secret scanning each have a distinct job.
3. **Reproduce deployment conditions.** CI installs from `package-lock.json`, generates responsive
   assets, performs the static export, and validates that export before deployment.
4. **Turn regressions into tests.** A discovered bug should receive the narrowest useful automated test
   before or alongside its fix. Browser behavior belongs in Playwright; broken static references belong
   in the export validator; content invariants belong in `scripts/validate_site.mjs`.
5. **Do not hide skipped coverage.** Intentional browser limitations must carry an explicit reason.
   New skips should not be used to make an unstable feature appear green.
6. **Document security exceptions.** A future vulnerability ignore must state what exploitation requires,
   why the affected path is unreachable here, and when the ignore can be removed.
7. **Keep performance comparative.** `npm run measure:performance -- --write` uses fixed local profiles.
   The resulting numbers are lab trends, not claims about real-user field performance.

## Local verification ladder

Run the smallest relevant check while developing, then the complete ladder before a release:

```bash
npm run lint
npm run audit:assets
npm run generate:responsive-images
npm run build
npm run validate:export
npm run test:responsive
npm run measure:performance -- --write
```

`npm audit --omit=dev --audit-level=high` mirrors the production dependency gate.

## CI responsibilities

- `quality.yml`: locked install, source/content validation, asset audit, production-equivalent build,
  and exported-route/file validation.
- `responsive-qa.yml`: Chromium and WebKit behavior, accessibility, reflow, and desktop references.
- `security.yml`: production dependency audit plus full-history secret scanning; it also runs weekly so
  newly disclosed vulnerabilities are detected even when the repository is quiet.
- `deploy.yml`: repeats deployment-critical validation before publishing GitHub Pages.

Recommended branch protection for `main`: require the production export, responsive browser suite,
production dependency audit, and secret scan checks before merge.

## Deliberately deferred

The complex carousel, research honeycomb/physics, word graph, maps, scrollytelling, logo arena, and
casino interactives need focused test specifications and reference captures before their internals are
changed. Their presence is covered by route/render checks, but this phase does not refactor them.
