---
description: Detect business file changes and propagate updates to the website
---

Detect which business files changed since last sync and propagate updates to all downstream files and website routes.

1. Run `deno task sync` to detect changes. Read the output — it lists changed files and stale downstream files.
2. Read `business/01-business-input.yaml` — note `site_type` for context.
3. For each changed business file, assess impact and apply changes:
   - **Business input** changed → check if `site_type` changed; if so, warn user about potential structural changes
   - **Brand strategy** changed → review tone across content deck; update website copy that no longer matches tone
   - **Brand identity** changed → run `deno task init-website` to regenerate branded files (styles, colors, typography)
   - **Business model / value prop / personas** changed → review and update content deck sections that reference offers or personas
   - **Sitemap** changed → check for new/removed pages; create new page briefs + routes for additions; run `/remove-page` logic for removals; update navigation
   - **SEO brief** changed → update meta tags (title, description, OG) across all affected routes
   - **Content deck** changed → update corresponding route content to match new copy
   - **Page brief** changed → update that page's copy section in content deck, then update the route
4. After all changes are applied, verify:
   - All routes render with correct content
   - No broken internal links
   - Meta tags match the current SEO brief
   - Navigation reflects the current sitemap
5. Run `deno task snapshot` to record the new state.
