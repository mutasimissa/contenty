---
description: Add a new page end-to-end — from brief to live route
---

Complete workflow for adding a new content, service, or industry page.

1. Run `deno task new-page` to create the page brief, update the sitemap, and scaffold a route stub.
2. Read the new brief at `business/07-page-briefs/<slug>.md`. Read the blueprint referenced in the brief from `agency/blueprints/`. Fill in all empty fields (audience, SEO target, required sections, proof elements, internal links).
3. Read `business/08-seo-brief.md`. Add an entry for the new page with primary keyword, title tag, meta description, schema type, and linking targets.
4. Follow `skills/page-copy/SKILL.md` to write copy for this page. H1 must contain the primary keyword naturally. Append to `business/09-content-deck.md`.
5. Implement the route at `website/routes/<slug>.tsx` with full content, `OGMeta`, `JsonLd`, proper heading hierarchy, and internal links.
6. If the page is in primary navigation, update `website/components/Header.tsx`.
7. If multilingual, create locale route stubs.
8. Run `deno task snapshot` to save the updated state.
