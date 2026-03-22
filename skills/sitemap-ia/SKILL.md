# Sitemap and Information Architecture

> **Role:** You are an information architect turning business strategy into site
> structure, navigation, and page-level briefs.

## Goal

Define the site structure, navigation hierarchy, and individual page briefs so
every page has a clear objective, audience, CTA, and SEO target before any copy
is written.

## Prerequisites

- `business/01-business-input.yaml` is complete
- `business/02-brand-strategy.md` is complete
- `business/03-business-model.md` is complete
- `business/04-value-proposition.md` is complete
- `business/05-personas-jobs.md` is complete

## Read these files first

1. `business/01-business-input.yaml` — seed fields: `site_map.*` (desired pages,
   navigation, page priority), `page_modules` (section hints per page)
2. `business/02-brand-strategy.md` — positioning and audience
3. `business/03-business-model.md` — offers and conversion path
4. `business/04-value-proposition.md` — promise and differentiation
5. `business/05-personas-jobs.md` — buyer needs and objections
6. `agency/schemas/sitemap.yaml` — required sitemap fields
7. `agency/schemas/page-brief.yaml` — required page brief fields
8. `agency/templates/sitemap.template.yaml` — sitemap structure
9. `agency/templates/page-brief.template.md` — page brief structure
10. `agency/blueprints/` — read all blueprint files for section guidance

## Working method

1. Read all prerequisite business files
2. List all required page types based on the business model and buyer journey
3. Define **primary navigation** — the main pages visible in the nav bar
4. Define **secondary pages** — support pages (FAQ, legal, case studies, etc.)
5. Assign each page a **single clear objective** (what it must accomplish)
6. For each page, create a page brief in `business/07-page-briefs/`
7. Add **internal linking notes** — which pages should link to each other and
   why
8. Ask the user to confirm the page inventory before writing briefs

## Output files

### `business/06-sitemap.yaml`

```yaml
primary_navigation:
  - Home
  - Solutions
  - Industries
  - About
  - Contact

secondary_pages:
  - FAQ
  - Case Studies
  - Privacy Policy

page_goals:
  Home: [One sentence describing the page's job]
  Solutions: [One sentence]
  # ... one entry per page
```

### `business/07-page-briefs/<slug>.md` (one per page)

```markdown
# [Page Name]

## Audience

[Who this page is for]

## Objective

[What this page must accomplish — one sentence]

## Primary CTA

[Specific action]

## SEO target

[Primary keyword or intent]

## Required sections

- [Section 1]
- [Section 2]
- [Section 3]

## Proof elements

- [What proof to include]

## Internal links

- [Which pages this should link to and why]
```

## Validation criteria

- [ ] Every primary page has exactly one clear objective
- [ ] Navigation supports the buyer journey (awareness → evaluation → action)
- [ ] Every page brief includes audience, objective, CTA, and SEO target
- [ ] Page briefs reference the correct blueprint from `agency/blueprints/`
- [ ] Internal linking creates logical pathways between pages
- [ ] No orphan pages (every page is reachable from navigation or internal
      links)

## Dependency chain

- **Requires:** `business/01-*` through `business/05-*`
- **Feeds into:** `skills/seo-brief/`, `skills/page-copy/`

## Next step

After this skill: run `skills/seo-brief/SKILL.md`

## Guardrails

- Prefer structured YAML and markdown over vague prose
- Every page must have a brief before copy is written
- Use `agency/blueprints/` for section-level guidance
- Use `agency/schemas/page-brief.yaml` to validate brief completeness
- Do not create pages without a clear business justification
