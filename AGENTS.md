# Repository Instructions

This is a **single-business website system**.

## Meaning of folders

- `business/` = truth (strategy, offers, personas, sitemap, content)
- `agency/` = reusable method (frameworks, templates, schemas, rubrics,
  blueprints)
- `website/` = implementation (Fresh 2.2+ / Tailwind 4 / Deno)
- `skills/` = AI instructions (each skill is a SKILL.md you follow step by step)
- `cli/` = Deno automation scripts (hub, intake, scaffolding, audit, sync)

## How to use skills

Each skill is a `SKILL.md` file in `skills/<name>/`. When asked to perform a
delivery phase:

1. Read the SKILL.md
2. Read the files it lists under "Read these files first"
3. Follow the working method step by step
4. Write outputs in the specified format
5. Validate against the criteria before finishing

Skills are site-type-aware. Check `site_type` in `business/01-business-input.yaml`
and consult `agency/site-types.yaml` to determine which skills and pages apply.

## Agents

- **strategist** — positioning, audience, messaging, offer structure, sitemap,
  and business-facing site strategy. Loads all business inputs in parallel and
  validates market claims via web search when available.
- **copywriter** — homepage, service pages, about pages, contact pages, blog
  posts, and structured web copy. Adapts copy depth to site type (ultra-brief
  for coming-soon, comprehensive for corporate).
- **seo** — keyword strategy, intent mapping, metadata, internal links, OG tags,
  schema markup. Produces simplified briefs for minimal-SEO site types and
  validates keywords via web search when available.
- **reviewer** — final quality review against all rubrics and launch-readiness
  checks. Runs CLI validation tools before manual review.
- **builder** — translates approved business and content files into website
  implementation (routes, components, SEO, styling). Reads site type to
  determine required pages and runs scaffolding before implementing routes.
- **researcher** — validates market claims, researches competitors, checks
  keyword data, and gathers external context. Supports strategist and SEO agents
  with verified findings.
- **qa-runner** — automated QA that runs CLI validation tools, scores every
  applicable rubric, and produces a structured report with pass/fail status and
  fix recommendations. Adapts checks to site type.

## CLI tools

Run `deno task start` for the guided hub menu, or run any task directly:

- `start` — hub menu: detects project state, routes to the right task
- `intake` — quick business intake (5 core questions, then AI fills the rest via
  `/init-business`)
- `validate` — check business files, YAML keys, brand assets, and SEO files
- `audit` — content audit (sitemap <-> brief <-> copy <-> route <-> SEO coverage)
- `sync` — detect changed business files and suggest AI workflows
- `snapshot` — save file hashes for change detection
- `new-page` — add a new page (brief + sitemap entry + optional route)
- `new-blog` — scaffold a blog post with frontmatter, category, and routes
- `new-landing` — scaffold a conversion-focused landing page
- `add-locale` — add a new language to the site
- `init-website` — bootstrap Fresh 2.2+ project in `website/`

## Three developer paths

1. **Fresh start** — `deno task start` -> Fresh Start -> sequential build
2. **Edit & sync** — change business files, `deno task sync` -> propagate
3. **Rebuild** — `deno task start` -> Rebuild Website -> regenerate from scratch

## SEO requirements

Every page must have:

- `OGMeta` component with page-specific title, description, path
- JSON-LD structured data (Organization, Service, FAQPage, BreadcrumbList)
- Canonical URL via OGMeta
- H1 containing the primary keyword naturally
- Title tag (50-60 chars) and meta description (150-160 chars)

The website must have: robots.txt, sitemap.xml route, manifest.json, custom 404.

## Rules

- Always read `PROJECT.md` first.
- Use `business/` as the source of truth.
- Use `agency/` for frameworks, templates, schemas, blueprints, and rubrics.
- Only implement into `website/` after business files are coherent.
- Review outputs against `agency/rubrics/` — minimum average score of 4.
- Keep this repository focused on one business only.

## Recommended workflow

1. `deno task intake` -> `business/01-business-input.yaml`
2. `skills/brand-strategy/` -> `business/02-brand-strategy.md` 2b.
   `skills/brand-identity/` -> `business/02b-brand-identity.yaml`
3. `skills/offer-design/` -> `business/03-*`, `04-*`, `05-*`
4. `skills/sitemap-ia/` -> `business/06-sitemap.yaml`, `07-page-briefs/`
5. `skills/seo-brief/` -> `business/08-seo-brief.md`
6. `skills/page-copy/` -> `business/09-content-deck.md`
7. `skills/launch-qa/` -> `business/10-launch-checklist.md`
8. `deno task init-website` -> `website/`
9. `deno task snapshot` -> `.contenty-state.json`

## Content lifecycle

- **Add page:** `deno task new-page` -> `/add-page` workflow
- **Add blog post:** `deno task new-blog` -> `/add-blog-post` workflow
- **Add landing page:** `deno task new-landing` -> `/add-landing-page` workflow
- **Add locale:** `deno task add-locale` -> `/add-locale` workflow
- **Remove page:** `/remove-page` workflow (AI-driven cleanup)

## Output discipline

- Prefer structured outputs first.
- Do not skip straight to code.
- Do not create implementation that contradicts the business files.
- Do not invent business facts — ask the user.
