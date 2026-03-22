---
description: Detect business file changes and propagate updates to the website
---

# Edit & Sync

Detect which business files changed since last sync and propagate updates to all downstream files and website routes.

## When to use
- After editing any file in `business/`
- After updating brand strategy, sitemap, SEO brief, or content deck
- When the hub menu shows "files changed since last sync"

## Steps

// turbo
1. Run `deno task sync` to detect changes. Read the output carefully — it lists changed files and stale downstream files.

2. For each changed business file, determine the impact and apply updates:

   **business/01-business-input.yaml** changed:
   - Review brand strategy for alignment with new business info
   - Update PROJECT.md if business name or goal changed

   **business/02-brand-strategy.md** changed:
   - Review tone across `business/09-content-deck.md`
   - Update website copy where tone has drifted

   **business/02b-brand-identity.yaml** changed:
   - Regenerate website styles: the `init-website` CLI will handle `styles.css`
   - Review component colors for consistency

   **business/03-business-model.md, 04-value-proposition.md, 05-personas-jobs.md** changed:
   - Review sitemap for alignment with new offers
   - Update affected page briefs
   - Update affected content deck sections

   **business/06-sitemap.yaml** changed:
   - Check for NEW pages → create briefs, write copy, scaffold routes
   - Check for REMOVED pages → delete briefs, content deck sections, routes, nav links
   - Update Header.tsx and Footer.tsx navigation

   **business/08-seo-brief.md** changed:
   - Update `<title>` tags across all routes
   - Update `<meta description>` tags
   - Update OGMeta props on affected pages
   - Update JSON-LD structured data if schema targets changed

   **business/09-content-deck.md** changed:
   - Update the corresponding route content for each changed page section
   - Verify CTA consistency

   **Page brief in business/07-page-briefs/** changed:
   - Re-write that page's content deck section
   - Update the route implementation

3. After applying all changes, verify:
   - All routes still render correctly
   - No broken internal links
   - Meta tags match the SEO brief
   - Navigation is accurate

// turbo
4. Run `deno task snapshot` to record the new state.

## Validation
- `deno task validate` passes
- `deno task audit` passes
- Changed pages have updated content matching business files
