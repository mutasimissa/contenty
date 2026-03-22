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

Run `deno task start` for the guided hub menu, or run any task directly:

- `start` — hub menu: detects project state, routes to the right task
- `intake` — quick business intake (5 core questions, then AI fills the rest via
  `/init-business`)
- `validate` — check business files, YAML keys, brand assets, and SEO files
- `audit` — content audit (sitemap ↔ brief ↔ copy ↔ route ↔ SEO coverage)
- `sync` — detect changed business files and suggest AI workflows
- `snapshot` — save file hashes for change detection
- `new-page` — add a new page (brief + sitemap entry + optional route)
- `new-blog` — scaffold a blog post with frontmatter, category, and routes
- `new-landing` — scaffold a conversion-focused landing page
- `add-locale` — add a new language to the site
- `init-website` — bootstrap Fresh 2.2+ project in `website/`

## Three developer paths

1. **Fresh start** — `deno task start` → Fresh Start → sequential build
2. **Edit & sync** — change business files, `deno task sync` → propagate
3. **Rebuild** — `deno task start` → Rebuild Website → regenerate from scratch

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

- **Add page:** `deno task new-page` → `/add-page`
- **Add blog post:** `deno task new-blog` → `/add-blog-post`
- **Add landing page:** `deno task new-landing` → `/add-landing-page`
- **Add locale:** `deno task add-locale` → `/add-locale`
- **Remove page:** `/remove-page` (AI-driven cleanup)

## Boundaries

- Do not create extra businesses or project folders.
- Do not put business truth into code files only.
- Do not bypass `business/` when generating copy, metadata, or navigation.
- Do not skip to website implementation before business files are coherent.
