---
description: Cleanly remove a page from the website and all business files
---

Completely remove a page from the website, business files, and navigation.

1. Confirm which page to remove with the user.
2. Delete `business/07-page-briefs/<slug>.md`.
3. Remove the page from `business/06-sitemap.yaml` (primary_navigation, service_pillar_pages, or secondary_pages + page_goals).
4. Remove the page's section from `business/09-content-deck.md`.
5. Remove the page's entry from `business/08-seo-brief.md`.
6. Delete `website/routes/<slug>.tsx` and locale variants.
7. Update `Header.tsx` and `Footer.tsx` to remove nav links.
8. Search all routes for internal links to the removed page — update or remove them.
9. Run `deno task snapshot` to save the updated state.
