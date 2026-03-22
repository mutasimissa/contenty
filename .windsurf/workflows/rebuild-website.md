---
description: Wipe and regenerate the website from business files
---

# Rebuild Website

Completely regenerate the website from the current business files. Use this when the website is out of sync beyond what edit-sync can fix, or after major business file changes.

## Prerequisites
- All business files are populated and valid
- `deno task validate` passes

## Steps

// turbo
1. Run `deno task validate` to confirm all business files are present and valid.

// turbo
2. Run `deno task audit` to check content coverage before rebuilding.

// turbo
3. Run `deno task init-website` to regenerate the Fresh scaffold and all branded files (styles, components, routes, SEO files).

4. Read `skills/website-init/SKILL.md`. For every route generated:
   - Read the corresponding page brief from `business/07-page-briefs/`
   - Read the page's copy from `business/09-content-deck.md`
   - Read the page's SEO targets from `business/08-seo-brief.md`
   - Populate the route with full content, headings, CTAs
   - Add `OGMeta` with page-specific title, description, path
   - Add JSON-LD structured data appropriate to the page type
   - Verify heading hierarchy (one H1, H2 for sections)
   - Add internal links per the SEO brief's linking plan

5. Verify the complete website:
   - Every route renders with real content (no placeholder comments)
   - Navigation matches the sitemap
   - robots.txt and sitemap.xml are present
   - Every page has OG tags, canonical URL, and JSON-LD

// turbo
6. Run `deno task snapshot` to save the fresh state.

## Validation
- `deno task validate` passes
- `deno task audit` passes with 0 issues
