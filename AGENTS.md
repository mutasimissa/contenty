# Repository Instructions

This is a **single-business website system**.

## Meaning of folders

- `business/` = truth (strategy, offers, personas, sitemap, content)
- `agency/` = reusable method (frameworks, templates, schemas, rubrics,
  blueprints)
- `website/` = implementation (Fresh 2.2+ / Tailwind 4 / Deno)
- `skills/` = AI instructions (each skill is a SKILL.md you follow step by step)
- `cli/` = Deno automation scripts (hub, intake, scaffolding, audit, analytics,
  brand check)

## How to use skills

Each skill is a `SKILL.md` file in `skills/<name>/`. When asked to perform a
delivery phase:

1. Read the SKILL.md
2. Read the files it lists under "Read these files first"
3. Follow the working method step by step
4. Write outputs in the specified format
5. Validate against the criteria before finishing

## CLI tools

Run `deno task start` for the guided hub menu, or run any task directly:

- `start` — hub menu: detects project state, routes to the right task
- `intake` — interactive business intake questionnaire (with i18n support)
- `validate` — check business files exist and validate YAML
- `clone-brief <slug>` — scaffold a new page brief from template
- `new-page` — add a new page (brief + sitemap entry + optional route)
- `new-blog` — scaffold a blog post with frontmatter (i18n-aware)
- `new-landing` — scaffold a conversion-focused landing page
- `audit` — content audit (sitemap ↔ brief ↔ copy ↔ route coverage)
- `analytics` — GTM + GA4 setup guide → `docs/decisions/analytics.md`
- `brand-check` — validate logo files against naming convention
- `add-locale` — add a new language to the site
- `init-website` — bootstrap Fresh 2.2+ project in `website/`
- `prelaunch` — count unchecked launch checklist items

## Rules

- Always read `PROJECT.md` first.
- Use `business/` as the source of truth.
- Use `agency/` for frameworks, templates, schemas, blueprints, and rubrics.
- Only implement into `website/` after business files are coherent.
- Review outputs against `agency/rubrics/` — minimum average score of 4.
- Keep this repository focused on one business only.

## Recommended workflow

1. `deno task intake` → `business/01-business-input.yaml`
2. `skills/brand-strategy/` → `business/02-brand-strategy.md` 2b.
   `skills/brand-identity/` → `business/02b-brand-identity.yaml`
3. `skills/offer-design/` → `business/03-*`, `04-*`, `05-*`
4. `skills/sitemap-ia/` → `business/06-sitemap.yaml`, `07-page-briefs/`
5. `skills/seo-brief/` → `business/08-seo-brief.md`
6. `skills/page-copy/` → `business/09-content-deck.md`
7. `skills/launch-qa/` → `business/10-launch-checklist.md`
8. `deno task init-website` → `website/`

## Output discipline

- Prefer structured outputs first.
- Do not skip straight to code.
- Do not create implementation that contradicts the business files.
- Do not invent business facts — ask the user.
