---
description: Add a new page end-to-end — from brief to live route
---

# Add Page

Complete workflow for adding a new content, service, or industry page to the website.

## Prerequisites
- Business files are populated (at least through sitemap)
- Website is bootstrapped

## Steps

// turbo
1. Run `deno task new-page` to create the page brief, update the sitemap, and scaffold a route stub.

2. Read the new brief at `business/07-page-briefs/<slug>.md`. Read the blueprint referenced in the brief from `agency/blueprints/`. Fill in all empty fields:
   - **Audience** — who this page is for (from personas)
   - **SEO target** — primary keyword (from SEO brief or research)
   - **Required sections** — from the blueprint
   - **Proof elements** — what evidence supports claims on this page
   - **Internal links** — which pages link to/from this one

3. Read `business/08-seo-brief.md`. Add an entry for the new page:
   - Primary keyword and secondary keywords
   - Title tag (50-60 chars) with primary keyword
   - Meta description (150-160 chars) with keyword + CTA
   - Schema markup type (Service, FAQPage, etc.)
   - Internal linking targets

4. Follow `skills/page-copy/SKILL.md` to write copy for this page:
   - H1 must contain the primary keyword naturally
   - Write each section from the brief
   - Include proof elements near key claims
   - Add FAQ section if the blueprint calls for it
   - CTA must match the business CTA strategy

5. Append the new page's copy to `business/09-content-deck.md` under a new `## Page Name` heading.

6. Implement the route at `website/routes/<slug>.tsx`:
   - Import and use `Header`, `Footer`, `OGMeta`, and relevant `JsonLd` components
   - Populate all sections with content from the content deck
   - Set proper `<title>` and `<meta description>` from SEO brief
   - Add `OGMeta` with page-specific title, description, and path
   - Add JSON-LD structured data for the page type
   - Build heading hierarchy: one H1, H2 for sections, H3 for subsections
   - Add internal links per the SEO brief

7. If the page is in primary navigation, update `website/components/Header.tsx` to add the nav link.

8. If the site is multilingual, create locale route stubs at `website/routes/[locale]/<slug>.tsx` for each non-default locale.

9. Verify:
   - Route renders with full content
   - Navigation updated
   - OG tags present (check page source)
   - JSON-LD present
   - Internal links work

// turbo
10. Run `deno task snapshot` to save the updated state.
