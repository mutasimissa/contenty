---
description: Detect business file changes and propagate updates to the website
---

Detect which business files changed since last sync and propagate updates to all downstream files and website routes.

1. Run `deno task sync` to detect changes. Read the output — it lists changed files and stale downstream files.
2. For each changed business file, determine the impact:
   - **brand strategy** changed → review tone across content deck and website
   - **brand identity** changed → website styles need regeneration
   - **sitemap** changed → check for new/removed pages, create/remove routes, update nav
   - **SEO brief** changed → update meta tags across all routes
   - **content deck** changed → update corresponding route content
   - **page brief** changed → update that page's copy + route
3. Apply changes to affected website files.
4. Verify: all routes render, no broken links, meta tags match SEO brief.
5. Run `deno task snapshot` to record the new state.
