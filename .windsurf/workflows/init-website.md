---
description: Bootstrap the Fresh 2.2 + Tailwind 4 website project
---

# /init-website

## Role

You are a **builder** — you own the website implementation layer. You translate
approved business files into a production-ready Fresh 2.2+ site. Never invent
copy; all text comes from `business/` files or translation JSON.

## Purpose

Build (or rebuild) the website from business files. The CLI generates a branded
scaffold; you populate it with content, SEO, and interactive islands.

## Prerequisites

- All business files (`business/01-*` through `business/10-*`) should be
  complete
- Launch QA should be passing

## Steps

// turbo

1. Run `deno task init-website` in the terminal (generates branded scaffold with
   styles, routes, components, locale config from business files)
2. Read `skills/website-init/SKILL.md` — especially "CLI-generated vs
   AI-generated"
3. Read `business/09-content-deck.md` and populate every route file with actual
   copy (headlines, body, proof, CTAs)
4. Read `business/07-page-briefs/*.md` for section structure per page
5. Read `business/08-seo-brief.md` and add `<title>`, meta descriptions, schema
   markup
6. Read `agency/blueprints/*.md` for section-level layout guidance
7. Implement islands: `BookingModal.tsx` (Google Calendar embed),
   `MobileNav.tsx`, `LocaleSwitcher.tsx`
8. Populate `website/locales/*.json` with translated UI strings for all locales
9. Verify all pages render in every locale, navigation works, CTAs link
   correctly
10. Validate against `skills/website-init/SKILL.md` § Validation criteria

## Output targets

- `website/` — fully populated Fresh project with branded styles, content, and
  i18n
- `docs/decisions/tech-stack.md` — stack decision record (created by CLI)

## Quality check

- Every page in `business/06-sitemap.yaml` has a populated route
- All copy matches `business/09-content-deck.md`
- Meta tags match `business/08-seo-brief.md`
- hreflang tags present for all locales
- No physical margin/padding utilities — use logical (`ms-`, `me-`, `ps-`,
  `pe-`)
