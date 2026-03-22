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

Skills are site-type-aware. Check `site_type` in `business/01-business-input.yaml`
and consult `agency/site-types.yaml` to determine which skills, pages, and
validation rules apply for the current project.

## Build & test tasks

Run with `deno task <command>`:

- `validate` — check business files, YAML keys, brand assets, and SEO files
- `audit` — content audit (sitemap ↔ brief ↔ copy ↔ route ↔ SEO coverage)
- `init-website` — bootstrap Fresh 2.2+ project in `website/`
- `test` — run all tests (unit + E2E)
- `test:unit` — Deno unit tests for CLI utilities
- `test:e2e` — Playwright E2E tests against running website
- `test:smoke` — quick pre-launch smoke suite (subset of E2E)
- `prelaunch` — full pre-launch gate: validate + audit + smoke tests

## Testing

Tests are data-driven from `business/06-sitemap.yaml` and site type config.

- **Unit tests** (`tests/unit/`) — Deno native, test CLI utilities
- **E2E tests** (`tests/e2e/specs/`) — Playwright, test the running website
- **BDD features** (`tests/features/`) — Cucumber Given/When/Then scenarios
- **CI scripts** (`tests/ci/`) — schema validation, drift detection, Lighthouse URLs
- **Playwright MCP** — interactive browser testing via Claude

### CI/CD (GitHub Actions)

- `.github/workflows/ci.yml` — YAML validation, markdown lint, unit tests,
  content audit, business/website drift check (every push and PR)
- `.github/workflows/preview.yml` — build preview, E2E tests, broken link check,
  Lighthouse CI, visual diff snapshots (PR only, requires website)

## Three developer paths

1. **Fresh start** — `/fresh-start` in Claude Code (fully AI-guided)
2. **Edit & sync** — change business files, then `/edit-sync` in Claude Code
3. **Rebuild** — `/rebuild-website` in Claude Code

## Site types

The `site_type` field in `business/01-business-input.yaml` controls which pages,
skills, and validation rules apply. Defined in `agency/site-types.yaml`:

- **corporate** — multi-page company site (services, about, contact, blog), 8-15 pages
- **service** — service-oriented with booking/quote flows, 5-10 pages
- **personal-blog** — author-focused blog with about + posts, 3-5 pages + posts
- **booking** — book-a-call / appointment-driven, 1-3 pages
- **single-page** — one-page scrolling site with all sections, 1 page
- **coming-soon** — placeholder with email capture, minimal SEO, 1 page

## SEO requirements

Every page must have:

- `OGMeta` component with page-specific title, description, path
- JSON-LD structured data (Organization, Service, FAQPage, BreadcrumbList)
- Canonical URL via OGMeta
- H1 containing the primary keyword naturally
- Title tag (50-60 chars) and meta description (150-160 chars)

The website must have: robots.txt, sitemap.xml route, manifest.json, custom 404.

## Commands

Use `.claude/commands/` for slash-command workflows. Available commands:

- `/fresh-start` — full guided build from scratch
- `/edit-sync` — detect changes and propagate updates
- `/rebuild-website` — wipe and regenerate website
- `/add-page` — add a new page end-to-end
- `/add-blog-post` — write and publish a blog post
- `/add-landing-page` — add a conversion-focused landing page
- `/add-locale` — add a new language
- `/remove-page` — cleanly remove a page
- `/build-brand-strategy` — create or refine brand strategy
- `/run-offer-design` — clarify business model and personas
- `/generate-sitemap` — turn strategy into site structure
- `/run-seo-brief` — define keyword strategy and metadata
- `/write-page-copy` — write structured page copy
- `/launch-qa` — prelaunch review against rubrics
- `/init-website` — build the website from business files
- `/init-business` — normalize business inputs

## Agents

- `strategist` — positioning, audience, messaging, offers, sitemap
- `copywriter` — page copy, blog posts, tone alignment
- `seo` — keywords, metadata, OG tags, schema, internal linking
- `reviewer` — QA across all rubrics, launch checklist
- `builder` — website implementation from business files
- `researcher` — market validation, competitor research, keyword data
- `qa-runner` — automated QA via CLI tools, rubric scoring, structured reports

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

## Content lifecycle

- **Add page:** `/add-page`
- **Add blog post:** `/add-blog-post`
- **Add landing page:** `/add-landing-page`
- **Add locale:** `/add-locale`
- **Remove page:** `/remove-page`

## Boundaries

- Do not create extra businesses or project folders.
- Do not put business truth into code files only.
- Do not bypass `business/` when generating copy, metadata, or navigation.
- Do not skip to website implementation before business files are coherent.
