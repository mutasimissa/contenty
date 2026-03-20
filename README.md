# Contenty

A strategy-first website template for AI-assisted delivery. Clone it, run the
hub CLI, and let AI skills guide you through strategy, content, and
implementation — whether you're launching for the first time or coming back to
add a blog post.

> **One repo = one business = one website.**

---

## Prerequisites

- [Deno 2.x](https://deno.land/) installed
- [Git](https://git-scm.com/)
- An AI coding tool: [Windsurf](https://codeium.com/windsurf) or
  [Claude Code](https://claude.ai/)

---

## Quick Start

```bash
# 1. Clone the template
git clone https://github.com/your-org/contenty.git my-business-site
cd my-business-site

# 2. Run the hub — it detects your project state and guides you
deno task start
```

`deno task start` is the **single entry point** for everything. It checks which
business files exist, detects your project stage, and presents a menu of what
you can do next — whether that's first-time intake, adding a landing page,
running a content audit, or checking your brand assets.

You can also run any task directly: `deno task intake`, `deno task new-blog`,
etc.

---

## How It Works

This repo separates **three concerns**:

| Folder      | Role                                                                         | Who writes it                     |
| ----------- | ---------------------------------------------------------------------------- | --------------------------------- |
| `business/` | The truth about this business — strategy, offers, personas, sitemap, content | AI skills guided by you           |
| `agency/`   | Reusable methodology — frameworks, templates, schemas, rubrics, blueprints   | Pre-built (you can customize)     |
| `website/`  | The actual website implementation                                            | AI + you (after strategy is done) |

The first launch is **sequential**: intake → strategy → content → build. After
that, operations are **cyclical** — you come back to add pages, write posts,
update strategy, run audits, and extend the site.

---

## First Launch

The first time through, follow these 8 phases in order:

| # | Phase           | How                                                           | Output                                        |
| - | --------------- | ------------------------------------------------------------- | --------------------------------------------- |
| 1 | Business intake | `deno task intake`                                            | `business/01-business-input.yaml`             |
| 2 | Brand strategy  | AI: `skills/brand-strategy/SKILL.md`                          | `business/02-brand-strategy.md`               |
| 3 | Offer design    | AI: `skills/offer-design/SKILL.md`                            | `business/03-*`, `04-*`, `05-*`               |
| 4 | Sitemap & IA    | AI: `skills/sitemap-ia/SKILL.md`                              | `business/06-sitemap.yaml`, `07-page-briefs/` |
| 5 | SEO brief       | AI: `skills/seo-brief/SKILL.md`                               | `business/08-seo-brief.md`                    |
| 6 | Page copy       | AI: `skills/page-copy/SKILL.md`                               | `business/09-content-deck.md`                 |
| 7 | Launch QA       | AI: `skills/launch-qa/SKILL.md`                               | `business/10-launch-checklist.md`             |
| 8 | Website build   | `deno task init-website` + AI: `skills/website-init/SKILL.md` | `website/`                                    |

Each AI phase means telling your AI tool:

> Follow the skill in `skills/<name>/SKILL.md`

The AI reads your business files, applies the agency methodology, writes the
output, and validates against the rubric.

---

## Ongoing Operations

After first launch, you come back to extend and maintain the site. Run
`deno task start` and pick what you need:

### Add content

| Task                 | Command                        | What it does                                                           |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| **New page**         | `deno task new-page`           | Interactive wizard → creates brief, updates sitemap, scaffolds route   |
| **New blog post**    | `deno task new-blog`           | Scaffolds blog post with frontmatter — asks for locale if multilingual |
| **New landing page** | `deno task new-landing`        | Creates brief, route, and sitemap entry for a conversion page          |
| **Clone a brief**    | `deno task clone-brief <slug>` | Scaffolds a blank page brief from template                             |

### Update strategy or content

Re-run any AI skill to update its output. The AI reads your current files and
proposes changes:

- **Update positioning** → re-run `skills/brand-strategy/SKILL.md`
- **Change offers** → re-run `skills/offer-design/SKILL.md`
- **Refresh SEO** → re-run `skills/seo-brief/SKILL.md`
- **Rewrite page copy** → re-run `skills/page-copy/SKILL.md` for that page
- **Re-run intake** → `deno task intake` (overwrites business input)

### Audit and QA

| Task                | Command                         | What it does                                                       |
| ------------------- | ------------------------------- | ------------------------------------------------------------------ |
| **Validate files**  | `deno task validate`            | Checks all required business files exist and validates YAML keys   |
| **Content audit**   | `deno task audit`               | Checks sitemap ↔ brief ↔ copy ↔ route coverage and CTA consistency |
| **Prelaunch check** | `deno task prelaunch`           | Counts unchecked items in the launch checklist                     |
| **Full launch QA**  | AI: `skills/launch-qa/SKILL.md` | Comprehensive review across all rubrics                            |

### Analytics and tracking

| Task                | Command               | What it does                                                  |
| ------------------- | --------------------- | ------------------------------------------------------------- |
| **Analytics setup** | `deno task analytics` | Guided GTM + GA4 setup → writes `docs/decisions/analytics.md` |

Walks you through Google Tag Manager container ID, GA4 measurement ID,
recommended conversion events (form_submit, cta_click, phone_click, etc.),
Search Console, cookie consent, and Meta Pixel. Generates an implementation
checklist.

### Brand assets

| Task            | Command                 | What it does                                                      |
| --------------- | ----------------------- | ----------------------------------------------------------------- |
| **Brand check** | `deno task brand-check` | Validates logo files in `assets/brand/` against naming convention |

Expected files in `assets/brand/`:

```
logo-icon.svg / .png       Square icon, favicon source
logo-horizontal.svg / .png Wide horizontal lockup
logo-vertical.svg / .png   Stacked vertical lockup
logo-color.svg             Full-color version
logo-white.svg             White-only (dark backgrounds)
logo-black.svg             Black-only (light backgrounds)
```

Optional: `favicon.ico`, `og-image.png` (1200×630), `apple-touch-icon.png`
(180×180).

### Localization

| Task           | Command                | What it does                                             |
| -------------- | ---------------------- | -------------------------------------------------------- |
| **Add locale** | `deno task add-locale` | Adds a new language to `business/01-business-input.yaml` |

The intake CLI asks about languages upfront. Blog and landing page CLIs are
i18n-aware — they ask which locale to write in and create files in the correct
directory.

### Project setup

| Task             | Command                  | What it does                                    |
| ---------------- | ------------------------ | ----------------------------------------------- |
| **Init website** | `deno task init-website` | Bootstraps Fresh 2.2 + Tailwind 4 in `website/` |
| **Init project** | `deno task init-project` | Sets project name and basic config              |

---

## CLI Reference

All tasks are available via `deno task <name>`. Run `deno task start` for the
guided hub menu.

| Category           | Task             | Command                        |
| ------------------ | ---------------- | ------------------------------ |
| **Hub**            | Start            | `deno task start`              |
| **First launch**   | Intake           | `deno task intake`             |
|                    | Init website     | `deno task init-website`       |
| **Content**        | New page         | `deno task new-page`           |
|                    | New blog post    | `deno task new-blog`           |
|                    | New landing page | `deno task new-landing`        |
|                    | Clone brief      | `deno task clone-brief <slug>` |
| **Quality**        | Validate         | `deno task validate`           |
|                    | Content audit    | `deno task audit`              |
|                    | Prelaunch check  | `deno task prelaunch`          |
| **Infrastructure** | Analytics setup  | `deno task analytics`          |
|                    | Brand check      | `deno task brand-check`        |
|                    | Add locale       | `deno task add-locale`         |
|                    | Init project     | `deno task init-project`       |

---

## Skills vs CLI Tools

| Layer                            | What                                              | How to use                                                   |
| -------------------------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| **Skills** (`skills/*/SKILL.md`) | AI instructions for strategy and content work     | Tell your AI: "Follow the skill in `skills/<name>/SKILL.md`" |
| **CLI tools** (`cli/*.ts`)       | Automation for scaffolding, validation, and setup | Run in terminal: `deno task <name>`                          |

---

## Folder Map

```
business/     Source of truth — strategy, offers, personas, sitemap, content
agency/       Reusable method — frameworks, templates, schemas, rubrics, blueprints
  blueprints/   Section-level page structures (homepage, about, service, etc.)
  methodology/  Strategic frameworks (brand, SEO, content, CRO, QA, lifecycle)
  rubrics/      Scoring criteria for quality review
  schemas/      YAML schemas for structured business files
  templates/    Blank starting templates for each business file
skills/       AI instructions — each skill is a SKILL.md the AI follows
cli/          Deno scripts — hub, intake, scaffolding, audit, analytics, brand check
website/      Implementation target — empty until Phase 8
assets/       Logos and brand files (see naming convention above)
  brand/        Logo variants: icon, horizontal, vertical, color, white, black
  images/       Site images and references
docs/         Decision records (tech stack, analytics, handoff notes)
.windsurf/    Windsurf-specific workflows and rules
.claude/      Claude-specific rules
```

---

## Using with Windsurf

Windsurf reads `AGENTS.md` at the repo root. It also picks up:

- **Rules** in `.windsurf/rules/` — content quality, SEO quality, website
  standards
- **Workflows** in `.windsurf/workflows/` — slash-command automations

Use slash commands: `/build-brand-strategy`, `/generate-sitemap`,
`/write-page-copy`, `/launch-qa`, `/init-website`, etc.

## Using with Claude

Claude reads `CLAUDE.md` at the repo root. It also picks up:

- **Rules** in `.claude/rules/` — same quality standards as Windsurf

Tell Claude which skill to run:

> Read and follow `skills/brand-strategy/SKILL.md`

---

## Operating Principle

**`business/` defines truth. `agency/` defines method. `website/` defines
implementation.**

Never skip to code before the business files are coherent. Never invent business
facts outside `business/`. Never implement without a page brief.

---

## Template Philosophy

This template is **strategy-first by design**. The `website/` directory is
intentionally empty. You must complete the business and content foundations
before touching implementation. This prevents the common failure mode of jumping
into UI code before the positioning, messaging, and content are solid.

After launch, the same repo supports **ongoing operations** — adding pages,
writing blog posts, creating landing pages, refreshing SEO, running audits, and
managing brand assets. One entry point (`deno task start`), one source of truth
(`business/`), one methodology (`agency/`).
