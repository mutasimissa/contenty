# Contenty — Build Your Website with AI

Turn your business information into a complete, SEO-ready website using
[Claude Code](https://claude.ai/). One command to start, AI handles the rest.

> **One repo = one business = one website.**

## Quick Start

```bash
# 1. Clone this template
git clone https://github.com/your-org/contenty.git my-site
cd my-site

# 2. Place your logo files
#    assets/brand/logo.svg       (primary logo)
#    assets/brand/logo-icon.svg  (square icon)

# 3. Launch the hub
deno task start
```

That's it. The hub detects your project state, shows what's done and what's next,
and tells you exactly which command to run.

### Prerequisites

- [Deno 2.x](https://deno.land/)
- [Git](https://git-scm.com/)
- [Claude Code](https://claude.ai/)

---

## How It Works

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  business/   │ ──→ │   AI Skills   │ ──→ │   website/    │
│  Your facts  │     │  + Blueprints │     │  Fresh 2.2+   │
└─────────────┘     └──────────────┘     └──────────────┘
```

1. You answer questions about your business (name, goal, audience, CTA)
2. AI generates strategy, copy, SEO, and design tokens from your answers
3. AI builds a production-ready website from those files

Everything lives in `business/` as the source of truth. The website is always
derived from business files — never the other way around.

---

## What Kind of Site Can I Build?

Contenty auto-detects your site type from your intake answers and adjusts the
build pipeline accordingly. You don't need to choose — it figures it out.

| Type | Best for | Pages | What gets built |
|------|----------|-------|-----------------|
| **Corporate** | Companies with services, team, blog | 8-15 | Full site with services, about, contact, blog, case studies |
| **Service** | Agencies, consultants, freelancers | 5-10 | Service pages with quote/booking flows, testimonials |
| **Personal Blog** | Authors, thought leaders, creators | 3-5 + posts | Blog-first site with about page, newsletter signup |
| **Booking** | Coaches, therapists, consultants | 1-3 | Focused site with prominent book-a-call widget |
| **Single Page** | Product launches, events, portfolios | 1 | Scrolling one-pager with all sections |
| **Coming Soon** | Pre-launch audience building | 1 | Placeholder page with email capture |

The site type controls which build phases run, which pages get created, and
which validation rules apply. A coming-soon site skips the full SEO brief and
sitemap. A personal blog skips offer design. The system adapts.

---

## The Build Process

### Starting from scratch

Run `deno task start` → choose **Fresh Start**. The hub walks you through each
phase and tells you the exact command to run:

| # | Phase | What happens | Command |
|---|-------|-------------|---------|
| 1 | Business intake | Answer 5 core questions | `deno task intake` |
| 2 | Fill seed fields | AI interviews you to complete all sections | `/init-business` |
| 3 | Brand strategy | AI builds positioning, tone, messaging | `/build-brand-strategy` |
| 3b | Brand identity | AI generates design tokens (colors, type, spacing) | `/build-brand-strategy` |
| 4 | Offer design | AI defines business model, value prop, personas | `/run-offer-design` |
| 5 | Sitemap & IA | AI plans pages and writes page briefs | `/generate-sitemap` |
| 6 | SEO brief | AI defines keywords, metadata, schema | `/run-seo-brief` |
| 7 | Page copy | AI writes structured copy for every page | `/write-page-copy` |
| 8 | Launch QA | AI scores everything against quality rubrics | `/launch-qa` |
| 9 | Website build | CLI scaffolds Fresh project, AI fills routes | `/init-website` |

Phases marked "skipped" for your site type are handled automatically.

### Adding content after launch

| Task | Step 1 (CLI) | Step 2 (AI) |
|------|-------------|-------------|
| Add a page | `deno task new-page` | `/add-page` |
| Add a blog post | `deno task new-blog` | `/add-blog-post` |
| Add a landing page | `deno task new-landing` | `/add-landing-page` |
| Add a language | `deno task add-locale` | `/add-locale` |
| Remove a page | — | `/remove-page` |

### Updating existing content

Change any business file, then:

```bash
deno task sync     # shows what changed and what needs updating
```

Then run `/edit-sync` in Claude Code — it reads the changes and updates all
downstream files and website routes automatically.

### Rebuilding everything

Run `deno task start` → **Rebuild Website**. This wipes `website/` and
regenerates it from your current business files. Use when you've made major
strategy changes.

---

## Project Structure

```
business/          Your business facts (source of truth)
  01-business-input.yaml    Core info, audiences, offers, design seeds
  02-brand-strategy.md      Positioning, tone, messaging
  02b-brand-identity.yaml   Design tokens (colors, fonts, spacing)
  03-business-model.md      Revenue model, packaging
  04-value-proposition.md   Promise and proof
  05-personas-jobs.md       Buyer segments
  06-sitemap.yaml           Page inventory and navigation
  07-page-briefs/           One brief per page
  08-seo-brief.md           Keywords, metadata, schema
  09-content-deck.md        Page-by-page copy
  10-launch-checklist.md    QA results

agency/            Reusable methodology (pre-built, customizable)
  blueprints/        Page structures (homepage, service, blog, etc.)
  methodology/       Strategy and quality frameworks
  rubrics/           Scoring criteria (strategy, copy, SEO, accessibility)
  schemas/           YAML schemas for structured outputs
  templates/         Starting templates for deliverables
  site-types.yaml    Site type profiles and pipeline rules

skills/            AI instructions (one SKILL.md per phase)
website/           Generated website (Fresh 2.2+ / Tailwind CSS 4 / Deno)
cli/               CLI automation (hub, intake, scaffolding, validation)
assets/brand/      Logo files (logo.svg + logo-icon.svg)
docs/decisions/    Implementation decisions log
```

---

## Commands Reference

### CLI tasks (run with `deno task`)

| Command | What it does |
|---------|-------------|
| `start` | Hub menu — detects state, shows next step |
| `intake` | 5-question business intake |
| `validate` | Check business files, YAML, brand assets |
| `audit` | Content coverage audit |
| `sync` | Detect changes since last snapshot |
| `snapshot` | Save file hashes for change detection |
| `new-page` | Scaffold a new page (brief + sitemap + route) |
| `new-blog` | Scaffold a blog post with frontmatter |
| `new-landing` | Scaffold a conversion landing page |
| `add-locale` | Add a new language |
| `init-website` | Bootstrap Fresh 2.2+ project |

### AI commands (run as `/command` in Claude Code)

| Command | What it does |
|---------|-------------|
| `/fresh-start` | Full guided build from intake to live site |
| `/init-business` | Fill all business input sections |
| `/build-brand-strategy` | Build positioning, tone, identity |
| `/run-offer-design` | Define business model, value prop, personas |
| `/generate-sitemap` | Plan pages and write briefs |
| `/run-seo-brief` | Keyword strategy and metadata |
| `/write-page-copy` | Write copy for all pages |
| `/launch-qa` | Score everything against rubrics |
| `/init-website` | Build website from business files |
| `/edit-sync` | Propagate business file changes to website |
| `/rebuild-website` | Full website regeneration |
| `/add-page` | Complete a new page end-to-end |
| `/add-blog-post` | Write and publish a blog post |
| `/add-landing-page` | Build a conversion landing page |
| `/add-locale` | Add and implement a new language |
| `/remove-page` | Clean up a removed page everywhere |

---

## For Advanced Users

### Agents

Claude Code uses specialized agents that activate based on the task:

| Agent | Role | Key skills |
|-------|------|-----------|
| **strategist** | Positioning, audience, messaging, offers | brand-strategy, offer-design, sitemap-ia |
| **copywriter** | Page copy, blog posts, tone alignment | page-copy, blog-strategy |
| **seo** | Keywords, metadata, schema, linking | seo-brief |
| **builder** | Website implementation from business files | website-init |
| **reviewer** | QA across all quality rubrics | launch-qa |
| **researcher** | Market validation, competitor analysis | WebSearch + business files |
| **qa-runner** | Automated validation + rubric scoring | CLI tools + all rubrics |

### Quality rubrics

Every AI output is scored against rubrics (minimum average: 4/5):

- **Strategy** — audience clarity, positioning, differentiation, CTA alignment
- **Copy** — clarity, relevance, tone, proof, readability
- **SEO** — keywords, metadata, schema, internal links, Core Web Vitals
- **Brand identity** — palette coherence, contrast, token completeness
- **Accessibility** — semantic HTML, keyboard nav, color contrast, ARIA
- **Performance** — LCP, INP, CLS, image optimization
- **Launch** — message consistency, conversion, SEO, trust, compliance

### Customizing blueprints

Page blueprints in `agency/blueprints/` define the section structure for each
page type. You can edit these to change what sections appear on your pages. The
AI reads them when writing copy and building routes.

### Adding a language

```bash
deno task add-locale   # creates locale stubs
```

Then run `/add-locale` in Claude Code to translate UI strings, create locale
routes, add hreflang tags, and handle RTL if needed.

---

## Operating Principles

- `business/` defines truth. `agency/` defines method. `website/` is derived.
- Never skip to code before business files are coherent.
- Never invent business facts — everything traces to `business/`.
- Always rebuild the website from business files, not the other way around.
- Record implementation decisions in `docs/decisions/`.
