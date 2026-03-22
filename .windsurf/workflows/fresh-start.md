---
description: Full guided build from scratch — intake through live website
---

# Fresh Start

Run the complete Contenty pipeline from business intake to a fully built website.

## Prerequisites
- No existing business files (or willing to overwrite)
- Deno installed

## Steps

// turbo
1. Run `deno task intake` to collect business information.

2. Read `skills/brand-strategy/SKILL.md`. Follow every step to produce `business/02-brand-strategy.md`. Score against `agency/rubrics/strategy-rubric.md` — minimum average 4.

3. Read `skills/brand-identity/SKILL.md`. Follow every step to produce `business/02b-brand-identity.yaml`. Score against `agency/rubrics/brand-identity-rubric.md` — minimum average 4.

4. Read `skills/offer-design/SKILL.md`. Follow every step to produce `business/03-business-model.md`, `business/04-value-proposition.md`, and `business/05-personas-jobs.md`.

5. Read `skills/sitemap-ia/SKILL.md`. Follow every step to produce `business/06-sitemap.yaml` and page briefs in `business/07-page-briefs/`.

6. Read `skills/seo-brief/SKILL.md`. Follow every step to produce `business/08-seo-brief.md`. Score against `agency/rubrics/seo-rubric.md` — minimum average 4.

7. For each page in `business/06-sitemap.yaml`, read the page brief and follow `skills/page-copy/SKILL.md` to write copy. Append each page's copy to `business/09-content-deck.md`. Score against `agency/rubrics/copy-rubric.md`.

8. Read `skills/launch-qa/SKILL.md`. Score all business files against all rubrics. Produce `business/10-launch-checklist.md`.

// turbo
9. Run `deno task init-website` to scaffold the Fresh project and generate branded files.

10. Read `skills/website-init/SKILL.md`. Populate every route with content from the content deck, SEO metadata from the SEO brief, OG tags via `OGMeta` component, and JSON-LD via `JsonLd` component. Ensure every page has proper `<title>`, `<meta description>`, canonical URL, and structured data.

// turbo
11. Run `deno task snapshot` to save the initial state for future sync.

## Validation
- All business files exist and pass `deno task validate`
- All audit checks pass via `deno task audit`
- Every route has OGMeta, canonical, and JSON-LD
- robots.txt and sitemap.xml are present
