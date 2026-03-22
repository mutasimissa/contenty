# Contenty

**Build a complete, SEO-ready website from your business information using AI.**

Answer questions about your business. AI generates strategy, copy, SEO, design
tokens, and a production-ready website. One repo, one business, one website.

```
business/  ──>  AI skills + blueprints  ──>  website/
(your facts)    (methodology)               (Fresh 2.2+ / Tailwind)
```

---

## Table of Contents

- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Site Types](#site-types)
- [The Build Process](#the-build-process)
- [Content Lifecycle](#content-lifecycle)
- [Project Structure](#project-structure)
- [Build & Test Tasks](#build--test-tasks)
- [AI Commands](#ai-commands)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Agents](#agents)
- [Quality Rubrics](#quality-rubrics)
- [Internationalization](#internationalization)
- [Customization](#customization)
- [Architecture](#architecture)
- [Operating Principles](#operating-principles)
- [License](#license)

---

## Quick Start

### Prerequisites

- [Deno 2.x](https://deno.land/) — runtime and task runner
- [Git](https://git-scm.com/) — version control
- [Claude Code](https://claude.ai/) — AI-powered development

### Get started in 3 steps

```bash
# 1. Clone the template
git clone https://github.com/your-org/contenty.git my-site
cd my-site

# 2. Place your logo files
#    assets/brand/logo.svg       (primary logo)
#    assets/brand/logo-icon.svg  (square icon)

# 3. Open Claude Code and run /fresh-start
```

Claude Code walks you through each phase, detects your project state, and tells
you exactly what to do next. No configuration needed.

---

## How It Works

Contenty follows a structured pipeline where **business files are the source of
truth** and the website is always derived from them.

```
You answer questions
        |
        v
business/01-business-input.yaml    <-- Your facts
        |
        v
AI generates strategy, identity,
copy, SEO, and page briefs         <-- Skills + blueprints
        |
        v
website/ built from those files    <-- Fresh 2.2+ / Tailwind CSS 4
```

1. **Intake** — You answer 5 core questions about your business
2. **Strategy** — AI builds positioning, tone, messaging, and visual identity
3. **Structure** — AI plans pages, writes briefs, and defines SEO targets
4. **Content** — AI writes structured copy for every page
5. **QA** — AI scores everything against quality rubrics
6. **Build** — CLI scaffolds a Fresh project, AI fills routes with content

Every step produces files in `business/`. The website reads those files. Change
the business files, and the website follows.

---

## Site Types

Contenty auto-detects your site type from your intake answers and adjusts the
entire pipeline — which phases run, which pages are created, and which validation
rules apply. You don't need to choose; it figures it out.

| Type | Best for | Pages | What gets built |
|------|----------|-------|-----------------|
| **Corporate** | Companies with services, team, blog | 8-15 | Full site with services, about, contact, blog, case studies |
| **Service** | Agencies, consultants, freelancers | 5-10 | Service pages with quote/booking flows, testimonials |
| **Personal Blog** | Authors, thought leaders, creators | 3-5 + posts | Blog-first site with about page, newsletter signup |
| **Booking** | Coaches, therapists, consultants | 1-3 | Focused site with prominent book-a-call widget |
| **Single Page** | Product launches, events, portfolios | 1 | Scrolling one-pager with all sections |
| **Coming Soon** | Pre-launch audience building | 1 | Placeholder page with email capture |

A coming-soon site skips SEO brief, sitemap, and page copy. A personal blog
skips offer design. A booking site skips sitemap planning. The system adapts
automatically.

---

## The Build Process

### Starting from scratch

Run `/fresh-start` in Claude Code. It walks you through each phase:

| # | Phase | What happens | Command |
|---|-------|-------------|---------|
| 1 | Business intake | Answer 5 core questions | `/fresh-start` |
| 2 | Fill seed fields | AI interviews you to complete all sections | `/init-business` |
| 3 | Brand strategy | AI builds positioning, tone, messaging | `/build-brand-strategy` |
| 3b | Brand identity | AI generates design tokens (colors, fonts, spacing) | `/build-brand-strategy` |
| 4 | Offer design | AI defines business model, value prop, personas | `/run-offer-design` |
| 5 | Sitemap & IA | AI plans pages and writes page briefs | `/generate-sitemap` |
| 6 | SEO brief | AI defines keywords, metadata, schema | `/run-seo-brief` |
| 7 | Page copy | AI writes structured copy for every page | `/write-page-copy` |
| 8 | Launch QA | AI scores everything against quality rubrics | `/launch-qa` |
| 9 | Website build | CLI scaffolds Fresh project, AI fills routes | `/init-website` |

Phases that don't apply to your site type are skipped automatically.

### Three developer paths

| Path | When to use | How |
|------|-------------|-----|
| **Fresh start** | New project from scratch | `/fresh-start` in Claude Code (fully AI-guided) |
| **Edit & sync** | Update existing business files | Change business files, then `/edit-sync` in Claude Code |
| **Rebuild** | Major strategy changes | `/rebuild-website` in Claude Code |

---

## Content Lifecycle

### Adding content

| Task | Command |
|------|---------|
| Add a page | `/add-page` |
| Add a blog post | `/add-blog-post` |
| Add a landing page | `/add-landing-page` |
| Add a language | `/add-locale` |
| Remove a page | `/remove-page` |

### Updating content

Change any business file, then run `/edit-sync` in Claude Code. It reads the
changes and updates all downstream files and website routes automatically.

### Dependency graph

Changes cascade through the pipeline. When you change a file, everything
downstream becomes stale:

```
business-input
  └─> brand-strategy
        ├─> brand-identity ──> website/assets/styles.css
        ├─> business-model ──┐
        ├─> value-proposition ──> sitemap
        └─> personas-jobs ──┘       └─> seo-brief
                                          └─> content-deck
                                                └─> website/routes/
```

`/edit-sync` detects these cascades and updates all downstream files
automatically.

---

## Project Structure

```
contenty/
│
├── business/                   Source of truth (your business facts)
│   ├── 01-business-input.yaml      Core info, audiences, offers, design seeds
│   ├── 02-brand-strategy.md        Positioning, tone, messaging
│   ├── 02b-brand-identity.yaml     Design tokens (colors, fonts, spacing)
│   ├── 03-business-model.md        Revenue model, packaging
│   ├── 04-value-proposition.md     Promise and proof
│   ├── 05-personas-jobs.md         Buyer segments and jobs-to-be-done
│   ├── 06-sitemap.yaml             Page inventory and navigation
│   ├── 07-page-briefs/             One brief per page
│   ├── 08-seo-brief.md             Keywords, metadata, schema
│   ├── 09-content-deck.md          Page-by-page copy
│   └── 10-launch-checklist.md      QA results
│
├── agency/                     Reusable methodology
│   ├── blueprints/                  12 page structure templates
│   ├── methodology/                 Strategy and quality frameworks
│   ├── rubrics/                     8 scoring rubrics
│   ├── schemas/                     10 YAML validation schemas
│   ├── templates/                   Starting templates for deliverables
│   └── site-types.yaml              Site type profiles and pipeline rules
│
├── skills/                     AI instructions (11 skills)
│   ├── business-intake/             Collect core business info
│   ├── brand-strategy/              Positioning and tone
│   ├── brand-identity/              Visual identity and design tokens
│   ├── offer-design/                Business model and personas
│   ├── sitemap-ia/                  Page structure and briefs
│   ├── seo-brief/                   Keyword strategy and metadata
│   ├── page-copy/                   Structured page copy
│   ├── blog-strategy/               Blog planning
│   ├── launch-qa/                   Pre-launch review
│   ├── website-init/                Fresh website scaffolding
│   └── testing/                     Automated test suite execution
│
├── tests/                      Testing infrastructure
│   ├── unit/                        Deno unit tests (34 tests)
│   ├── e2e/                         Playwright E2E specs (13 specs)
│   ├── features/                    BDD feature files (5 features)
│   ├── steps/                       Cucumber step definitions
│   ├── support/                     BDD world and hooks
│   └── ci/                          CI scripts (schema validation, drift check)
│
├── .github/                    CI/CD
│   ├── workflows/ci.yml             Validation, lint, unit tests, audit, drift
│   ├── workflows/preview.yml        Build, E2E, Lighthouse, broken links, visual diff
│   └── lighthouse/                  Lighthouse CI config
│
├── cli/                        Deno CLI automation
├── website/                    Generated website (Fresh 2.2+ / Tailwind CSS 4)
├── assets/brand/               Logo files (logo.svg + logo-icon.svg)
└── docs/decisions/             Implementation decision records
```

---

## Build & Test Tasks

Run with `deno task <command>`:

### Build tasks

| Command | What it does |
|---------|-------------|
| `validate` | Check business files, YAML keys, brand assets, SEO files |
| `audit` | Content coverage audit (sitemap vs briefs vs copy vs routes vs SEO) |
| `init-website` | Bootstrap Fresh 2.2+ project in `website/` |

### Testing

| Command | What it does |
|---------|-------------|
| `test` | Run all tests (unit + E2E) |
| `test:unit` | Deno unit tests for CLI utilities |
| `test:e2e` | Playwright E2E tests against running website |
| `test:smoke` | Quick pre-launch smoke suite (critical subset of E2E) |
| `prelaunch` | Full pre-launch gate: `validate` + `audit` + `test:smoke` |

---

## AI Commands

Run as `/command` in Claude Code:

### Build phases

| Command | What it does |
|---------|-------------|
| `/fresh-start` | Full guided build from intake to live site |
| `/init-business` | Fill all business input sections interactively |
| `/build-brand-strategy` | Build positioning, tone, and visual identity |
| `/run-offer-design` | Define business model, value prop, and personas |
| `/generate-sitemap` | Plan pages and write page briefs |
| `/run-seo-brief` | Keyword strategy, metadata, and schema direction |
| `/write-page-copy` | Write structured copy for all pages |
| `/launch-qa` | Score everything against quality rubrics |
| `/init-website` | Build website from business files |

### Content management

| Command | What it does |
|---------|-------------|
| `/add-page` | Complete a new page end-to-end |
| `/add-blog-post` | Write and publish a blog post |
| `/add-landing-page` | Build a conversion-focused landing page |
| `/add-locale` | Add and implement a new language |
| `/remove-page` | Clean up a removed page everywhere |
| `/edit-sync` | Propagate business file changes to website |
| `/rebuild-website` | Wipe and regenerate the entire website |

---

## Testing

Contenty includes a comprehensive testing infrastructure with unit tests, E2E
browser tests, and BDD feature specs. Tests are **data-driven** — they read your
`business/06-sitemap.yaml` and site type config to dynamically generate test
cases for your specific site.

### Unit tests

```bash
deno task test:unit
```

34 tests covering CLI utilities:

- **Slug generation** — `toSlug()` function (8 tests)
- **State detection** — `detectStage()` for all 6 site types (12 tests)
- **Dependency graph** — cascade traversal, stale file detection (9 tests)
- **Sitemap parsing** — YAML to route expectations (5 tests)

### E2E tests (Playwright)

```bash
# Install Playwright (one-time)
cd tests/e2e && npm install && npx playwright install chromium

# Start your dev server
cd website && deno task start

# Run E2E tests
deno task test:e2e
```

13 spec files testing the running website:

| Spec | What it verifies |
|------|-----------------|
| `page-existence` | Every sitemap page returns HTTP 200 |
| `navigation` | Nav links match sitemap, correct hrefs, clickable |
| `footer` | Footer renders, links resolve, copyright present |
| `contact-form` | Form fields, validation, submission (per site type) |
| `booking-widget` | Booking link/widget renders (booking sites only) |
| `broken-links` | All internal links on every page return 200 |
| `missing-images` | All `<img>` tags load successfully |
| `seo-meta` | OG tags, title length, description, canonical URL |
| `json-ld` | Valid JSON-LD structured data on every page |
| `hreflang` | Locale routes and hreflang tags (multilingual only) |
| `accessibility` | One H1/page, heading hierarchy, skip link, alt text |
| `smoke` | Critical pre-launch checks (CTA, robots.txt, sitemap.xml, 404) |
| `snapshots` | Full-page visual regression screenshots |

### BDD features (Cucumber)

5 feature files with Given/When/Then scenarios:

- **Page existence** — all sitemap pages accessible
- **Navigation** — nav bar visible, links match sitemap, clickable
- **Contact form** — form present, fields exist, validation works
- **SEO** — OG tags, JSON-LD, canonical URLs
- **Locale switching** — alternate locale routes, hreflang tags

### Smoke tests

```bash
deno task test:smoke
```

A fast subset of E2E tests tagged `@smoke` — covers the critical path: home page
loads, CTA visible, no console errors, robots.txt, sitemap.xml, manifest.json,
and 404 page.

### Pre-launch gate

```bash
deno task prelaunch
```

Chains `validate` + `audit` + `test:smoke` into a single command. If any step
fails, the pipeline stops. Run this before publishing.

### Playwright MCP

A Playwright MCP server is configured in `.mcp.json` for interactive browser
testing within Claude Code. Claude can navigate your site, click elements, fill
forms, take screenshots, and verify page behavior in real time.

---

## CI/CD Pipeline

Two GitHub Actions workflows run automatically:

### `ci.yml` — Every push and PR

Fast checks that don't require a running server:

| Job | What it checks | Fails PR if |
|-----|----------------|-------------|
| **YAML & Schema Validation** | YAML syntax, required fields, schema compliance | Syntax errors or missing required fields |
| **Markdown Lint** | Formatting in `business/`, `agency/`, `skills/`, `docs/` | Markdown formatting issues |
| **Unit Tests** | All Deno unit tests | Any test failure |
| **Content Audit** | Sitemap vs briefs vs copy vs routes vs SEO coverage | Coverage gaps |
| **Drift Check** | Business files vs website routes alignment | Orphaned routes, missing routes, stale styles, locale mismatches |

### `preview.yml` — PR only (requires website)

Full browser-based checks against the running dev server:

| Job | What it checks | Fails PR if |
|-----|----------------|-------------|
| **Build Preview** | Website compiles successfully | Build failure |
| **E2E Tests** | Full Playwright suite against dev server | Any E2E test failure |
| **Broken Links** | Crawl all links via [lychee](https://github.com/lycheeverse/lychee) | Any broken link |
| **Lighthouse CI** | Performance, accessibility, SEO scores | Score below 0.9 |
| **Visual Diff** | Screenshot comparison against main branch | Uploads diffs as artifacts (advisory) |

Lighthouse audits all pages in your sitemap (not just the homepage).
Visual diff snapshots are uploaded as build artifacts for manual review.

---

## Agents

Claude Code uses specialized agents that activate based on the task:

| Agent | Role | Key skills |
|-------|------|-----------|
| **strategist** | Positioning, audience, messaging, offers, sitemap | brand-strategy, offer-design, sitemap-ia |
| **copywriter** | Page copy, blog posts, tone alignment | page-copy, blog-strategy |
| **seo** | Keywords, metadata, schema, internal linking | seo-brief |
| **builder** | Website implementation from business files | website-init |
| **reviewer** | QA across all quality rubrics | launch-qa |
| **researcher** | Market validation, competitor analysis, keyword data | WebSearch + business files |
| **qa-runner** | Automated validation + rubric scoring + smoke tests | CLI tools + all rubrics |

Each agent has a definition file in `.claude/agents/` with its role, owned
skills, source files, and guardrails. Agents adapt their behavior to your site
type — a copywriter produces ultra-brief copy for a coming-soon site and
comprehensive multi-page content for a corporate site.

---

## Quality Rubrics

Every AI output is scored against rubrics before proceeding. Minimum average
score: **4/5** (accessibility and performance allow 3/5).

| Rubric | What it scores | Key criteria |
|--------|---------------|--------------|
| **Strategy** | Brand positioning | Audience clarity, differentiation, CTA alignment, proof readiness |
| **Copy** | Page content | Clarity, relevance, tone fit, trust signals, readability |
| **SEO** | Search optimization | Keyword targeting, metadata, schema, internal links, Core Web Vitals |
| **Brand Identity** | Visual design system | Palette coherence, contrast compliance, token completeness |
| **Accessibility** | Inclusive design | Semantic HTML, keyboard nav, WCAG AA contrast, ARIA labels |
| **Performance** | Page speed | LCP < 2.5s, INP < 200ms, CLS < 0.1, image optimization |
| **Launch** | Release readiness | Message consistency, conversion readiness, compliance |
| **Testing** | Automated test coverage | Unit tests, E2E coverage, smoke suite, CI pipeline status |

Rubric definitions live in `agency/rubrics/`. The `qa-runner` agent scores all
applicable rubrics and produces `business/10-launch-checklist.md` with specific,
actionable fix recommendations.

---

## Internationalization

Contenty supports multilingual sites with locale-aware routing and RTL support.

### Adding a language

Run `/add-locale` in Claude Code to:

- Create locale route directories (`website/routes/[locale]/`)
- Translate UI strings (`website/locales/[locale].json`)
- Add `<link rel="alternate" hreflang="...">` tags
- Update the locale switcher component
- Apply RTL styling if needed (Arabic, Hebrew, Farsi, Urdu, etc.)

### How locales work

- `business/01-business-input.yaml` defines `default_locale` and `locales`
- Translation files live in `website/locales/[locale].json`
- Locale routes are nested under `website/routes/[locale]/`
- RTL detection is automatic for: ar, he, fa, ur, ku, ps, sd, ug, yi
- E2E tests verify locale routes and hreflang tags when locales are configured

---

## Customization

### Page blueprints

Page blueprints in `agency/blueprints/` define the section structure for each
page type. Edit these to change what sections appear on your pages. 12 blueprints
are included:

`homepage`, `about-page`, `service-page`, `contact-page`, `faq-page`,
`pricing-page`, `blog-index`, `blog-post`, `case-study`, `industry-page`,
`market-page`, `local-landing-page`

The AI reads blueprints when writing copy and building routes.

### YAML schemas

Schemas in `agency/schemas/` define the structure of each business file. The CI
pipeline validates your business files against these schemas on every push.
10 schemas are included:

`business-input`, `brand-strategy`, `brand-identity`, `business-model`,
`page-brief`, `seo-brief`, `content-deck`, `blog-post`, `sitemap`, `build-spec`

### Site type profiles

`agency/site-types.yaml` defines which pages, skills, blueprints, and validation
rules apply for each site type. You can modify these profiles or add new site
types.

### Methodology frameworks

`agency/methodology/` contains frameworks for accessibility, brand identity,
business model, content strategy, CRO, QA, SEO, value proposition, and website
delivery lifecycle. These guide the AI's approach but can be customized.

---

## Architecture

### Technology stack

| Layer | Technology |
|-------|-----------|
| Runtime | [Deno 2.x](https://deno.land/) |
| Frontend | [Fresh 2.2+](https://fresh.deno.dev/) (Preact, server-rendered) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Testing | [Playwright](https://playwright.dev/) (E2E) + Deno test (unit) + [Cucumber](https://cucumber.io/) (BDD) |
| CI/CD | [GitHub Actions](https://github.com/features/actions) |
| AI | [Claude Code](https://claude.ai/) with MCP tools |
| Link checking | [lychee](https://github.com/lycheeverse/lychee) |
| Performance | [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) |

### SEO requirements (built-in)

Every page automatically includes:

- `OGMeta` component with page-specific title, description, path
- JSON-LD structured data (Organization, Service, FAQPage, BreadcrumbList)
- Canonical URL
- H1 containing the primary keyword naturally
- Title tag (50-60 chars) and meta description (150-160 chars)
- Twitter card meta tags

The website includes: `robots.txt`, `sitemap.xml` route, `manifest.json`, and a
custom 404 page.

### Accessibility standards

- Semantic HTML (header, nav, main, section, article, footer)
- Proper heading hierarchy (one H1, H2 for sections, H3 for subsections)
- ARIA labels, skip-to-content link, visible focus indicators
- WCAG 2.2 AA color contrast (4.5:1 normal text, 3:1 large text)
- Keyboard navigable (Tab, Shift+Tab, Enter, Escape)
- Touch targets at least 44x44px
- Descriptive alt text on all images

### Performance targets

- LCP (Largest Contentful Paint) < 2.5s
- INP (Interaction to Next Paint) < 200ms
- CLS (Cumulative Layout Shift) < 0.1
- Server-side rendering by default (Fresh)
- Minimal client-side JavaScript (islands architecture)
- Lazy-loaded images with explicit width/height

### File dependency tracking

Claude handles dependency tracking between business files via `/edit-sync`.
When you change a file, it identifies all downstream files that need updating:

```
01-business-input.yaml
  └─> 02-brand-strategy.md
        ├─> 02b-brand-identity.yaml ──> website/assets/styles.css
        ├─> 03-business-model.md ──┐
        ├─> 04-value-proposition.md ├──> 06-sitemap.yaml
        └─> 05-personas-jobs.md ──┘       └─> 08-seo-brief.md
                                                └─> 09-content-deck.md
                                                      └─> website/routes/
```

### Business/website drift detection

The CI pipeline includes a drift checker (`tests/ci/drift-check.ts`) that fails
the PR if:

- A page in `business/06-sitemap.yaml` has no matching route in `website/routes/`
- A route exists in `website/routes/` but isn't in the sitemap (orphaned)
- Brand identity is newer than website styles (stale CSS)
- Locale files don't match the locales defined in business input

---

## Operating Principles

1. `business/` defines truth. `agency/` defines method. `website/` is derived.
2. Never skip to code before business files are coherent.
3. Never invent business facts — everything traces to `business/`.
4. Always rebuild the website from business files, not the other way around.
5. Validate outputs against rubrics — minimum average score of 4/5.
6. Record implementation decisions in `docs/decisions/`.
7. Prefer reuse over reinvention — check blueprints, templates, and schemas first.

---

## License

[MIT](LICENSE) — Copyright (c) 2025 Mutasim Qaddoumi
