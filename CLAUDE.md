# Claude Instructions

This repository represents **one business and one website only**.

## Priority order

1. `PROJECT.md`
2. `business/` as source of truth
3. `agency/` as methodology
4. `skills/` as AI instructions
5. `website/` as implementation target

## How to use skills

Each skill is a `SKILL.md` file in `skills/<name>/`. When asked to perform a
delivery phase, read and follow the corresponding skill file. It contains: role,
prerequisites, files to read, working method, output format, and validation
criteria.

## CLI tools

The `cli/` directory contains Deno automation scripts. Run `deno task start` for
the guided hub menu, or run any task directly:

- `deno task start` — hub menu: detects project state, routes to the right task
- `deno task intake` — interactive business intake questionnaire (with i18n
  support)
- `deno task validate` — check business files exist and validate YAML
- `deno task clone-brief <slug>` — scaffold a new page brief from template
- `deno task new-page` — add a new page (brief + sitemap entry + optional route)
- `deno task new-blog` — scaffold a blog post with frontmatter (i18n-aware)
- `deno task new-landing` — scaffold a conversion-focused landing page
- `deno task audit` — content audit (sitemap ↔ brief ↔ copy ↔ route coverage)
- `deno task analytics` — GTM + GA4 setup guide → `docs/decisions/analytics.md`
- `deno task brand-check` — validate logo files against naming convention
- `deno task add-locale` — add a new language to the site
- `deno task init-website` — bootstrap Fresh 2.2+ project in `website/`
- `deno task prelaunch` — count unchecked launch checklist items

## Mandatory rules

- Never invent business facts outside `business/`.
- Never change positioning, audience, offers, or claims without updating the
  relevant file in `business/`.
- Use `agency/templates/` and `agency/schemas/` before generating new
  deliverables.
- Use `agency/blueprints/` for page structure and section logic.
- Validate outputs against `agency/rubrics/` — minimum average score of 4.
- Prefer reuse over reinvention.
- Keep implementation decisions documented in `docs/decisions/`.

## Role routing

- strategy work → read `skills/brand-strategy/SKILL.md` or
  `skills/business-intake/SKILL.md`
- offer design → read `skills/offer-design/SKILL.md`
- sitemap and IA → read `skills/sitemap-ia/SKILL.md`
- SEO work → read `skills/seo-brief/SKILL.md`
- page copy → read `skills/page-copy/SKILL.md`
- launch QA → read `skills/launch-qa/SKILL.md`
- website implementation → read `skills/website-init/SKILL.md`

## Working sequence

1. Confirm relevant source files exist
2. Read the appropriate `skills/<name>/SKILL.md`
3. Follow its working method step by step
4. Update `business/` deliverables
5. Validate against the relevant rubric
6. Only touch `website/` after all business files are complete and QA'd

## Boundaries

- Do not create extra businesses or project folders.
- Do not put business truth into code files only.
- Do not bypass `business/` when generating copy, metadata, or navigation.
- Do not skip to website implementation before business files are coherent.
