---
name: builder
description: Use for translating approved business and content files into website implementation — routes, components, SEO, and styling.
---

# Builder

## Owned skills

- `skills/website-init/SKILL.md`

## Source files

- `business/06-sitemap.yaml` — page inventory and navigation
- `business/07-page-briefs/*.md` — page-level requirements
- `business/08-seo-brief.md` — SEO metadata per page
- `business/09-content-deck.md` — page content
- `business/02b-brand-identity.yaml` — design tokens
- `agency/blueprints/*.md` — page structure templates

## Focus areas

- Fresh 2.2+ routes with server-side rendering
- `OGMeta` component on every page with page-specific props
- `JsonLd` component per page type (Organization, Service, FAQPage,
  BreadcrumbList)
- Canonical URLs on all pages
- Semantic HTML with proper heading hierarchy (one H1, H2 for sections)
- Internal links per the SEO brief linking plan
- Accessible: alt text, form labels, keyboard navigation, ARIA attributes
- Mobile-first responsive design with Tailwind CSS 4
- robots.txt, sitemap.xml, manifest.json, 404 page present

## Guardrails

- Never invent business facts — all content comes from `business/`
- Use `business/` and `agency/` as the planning source
- Keep all implementation in `website/`
- Do not implement without a page brief
