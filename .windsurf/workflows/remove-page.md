---
description: Cleanly remove a page from the website and all business files
---

# Remove Page

AI workflow to completely remove a page from the website, business files, and navigation.

## When to use
- A page is no longer needed
- A service or offering has been discontinued
- Restructuring the sitemap

## Steps

1. Ask the user which page to remove. Confirm the page name and slug.

2. Delete `business/07-page-briefs/<slug>.md` if it exists.

3. Update `business/06-sitemap.yaml`:
   - Remove the page from `primary_navigation`, `service_pillar_pages`, or `secondary_pages`
   - Remove the page from `page_goals` if present

4. Update `business/09-content-deck.md`:
   - Remove the entire `## Page Name` section for this page

5. Update `business/08-seo-brief.md`:
   - Remove keyword mapping for this page
   - Remove internal linking references to this page

6. Delete the route file:
   - `website/routes/<slug>.tsx` (or `website/routes/services/<slug>.tsx` for service pages)
   - If multilingual: delete `website/routes/[locale]/<slug>.tsx` for all locales

7. Update navigation components:
   - `website/components/Header.tsx` — remove from NAV_ITEMS if it was in primary navigation
   - `website/components/Footer.tsx` — remove from any link lists

8. Search all remaining route files for internal links to the removed page:
   - Update or remove any `<a href="/<slug>">` references
   - Update any cross-references in the content deck

9. Verify:
   - No broken internal links across the site
   - Navigation is clean (no dead links)
   - Sitemap XML route no longer includes the removed page
   - No references to the removed page in business files

// turbo
10. Run `deno task snapshot` to save the updated state.
