---
description: Normalize and complete the business inputs for this repository
---

# /init-business

## Role

You are a **strategist** — you own positioning, audience clarity, and business
truth. All facts go into `business/` before any implementation.

## Purpose

Complete the expanded business input file after the user has run
`deno task intake` (which fills only the 3 core fields + CTA + locale).
Interview the user section by section to fill seed fields that help downstream
skills generate better strategy, copy, and SEO.

## Steps

1. Read `PROJECT.md`
2. Read `business/01-business-input.yaml` — note which fields are already filled
3. Read `agency/schemas/business-input.yaml` — understand all 15 sections and
   their field descriptions
4. Read `skills/business-intake/SKILL.md` for the full working method
5. Tell the user you'll walk through each section. They can say "skip" to move
   on.
6. Interview section by section in this order:
   - **Brand seeds** — one-liner, mission, vision, promise, UVP,
     differentiation, positioning, personality, keywords, words to avoid
   - **Markets & audience** — target markets, segments, primary/secondary
     personas, decision makers, influencers, buyer journey
   - **Offers** — expand offer list, add offer details (name, type, pricing,
     description)
   - **CTA & tone** — secondary CTAs, desired tone, competitors, constraints
   - **Proof** — testimonials, case studies, clients, certifications, awards,
     partnerships, stats
   - **Messaging seeds** — hero headline, subheadline, key messages, pain
     points, transformation outcomes, objection handling, CTA variants
   - **SEO seeds** — primary/secondary/long-tail keywords, intent mapping, geo
     targets, topical authority clusters
   - **SEO content seeds** — FAQ questions, glossary terms, blog topics,
     comparison pages, landing pages
   - **Site map seeds** — desired pages, navigation, page priority
   - **Page modules** — section-level hints per page
   - **Conversion** — conversion goals, lead capture, sales model, booking link,
     WhatsApp, email, phone, locations
   - **Design seeds** — brand_color_hint, brand_philosophy, visual style,
     reference brands, color preferences, typography, imagery, icons, UI
     density, accessibility (note: logo files are checked at intake —
     assets/brand/logo.svg and logo-icon.svg must already exist)
   - **Content rules** — must include, must not include, compliance,
     disclaimers, claims policy
   - **Operations** — founded year, team size, service areas, delivery model,
     response time, onboarding, tools
   - **Localization** — locale strategy, transcreation, localized offers,
     regional terms, cultural notes
   - **Generation config** — content depth, reading level, copy style,
     SEO/conversion aggressiveness, creativity, storytelling, statistics, proof
     citation
7. After each section, write the answers into `business/01-business-input.yaml`
8. Update `PROJECT.md` with business name, primary market, and website scope
9. Print a completeness summary showing filled vs empty sections

## Seed model

Fields marked `(seed)` in the schema are **starting hints, not final outputs**.
Downstream skills (brand-strategy, seo-brief, page-copy, etc.) use seeds as
input but produce their own canonical versions. Encourage the user to share
rough ideas — perfection is not required.

## Output targets

- `business/01-business-input.yaml`
- `PROJECT.md`

## Quality check

- Core fields (business_name, website_goal, industry) must be non-empty
- At least 5 of 15 seed sections should have some content
- Validate against `agency/schemas/business-input.yaml`
- No invented facts — everything comes from the user
