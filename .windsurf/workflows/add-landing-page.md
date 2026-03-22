---
description: Add a conversion-focused landing page end-to-end
---

# Add Landing Page

Complete workflow for creating a conversion-focused landing page.

## Prerequisites
- Business files populated (brand strategy, value proposition, CRO framework)
- Website bootstrapped

## Steps

// turbo
1. Run `deno task new-landing` to create the brief, route stub, and sitemap entry.

2. Read the new brief at `business/07-page-briefs/<slug>.md`. Read these reference files:
   - `agency/blueprints/local-landing-page.md` — page structure
   - `agency/methodology/cro-framework.md` — conversion optimization
   - `business/04-value-proposition.md` — offer clarity

3. Fill in the brief completely:
   - **Audience** — specific segment this landing page targets
   - **SEO target** — primary keyword for this campaign
   - **Required sections** — Hero + CTA, Problem, Solution, Proof, Objections, Final CTA
   - **Proof elements** — testimonials, case studies, certifications relevant to this audience

4. Write conversion-focused copy following `skills/page-copy/SKILL.md`:
   - **Hero**: Clear value proposition + primary CTA visible without scrolling
   - **Problem**: Articulate the pain point this audience faces
   - **Solution**: How this offer solves the problem
   - **Proof**: Specific evidence (stats, testimonials, logos)
   - **Objection handling**: Address top 2-3 concerns
   - **Final CTA**: Urgency or reassurance + same primary CTA
   - CTA text describes the outcome, not the action

5. Implement the route at `website/routes/<slug>.tsx`:
   - **No main navigation** — focused conversion page (minimal header with logo only)
   - Import `OGMeta` and relevant `JsonLd` components
   - Populate all sections with copy
   - Add `OGMeta` with campaign-specific title and description
   - Add JSON-LD (typically Organization + Service)
   - Ensure mobile-first CTA placement

6. Verify:
   - Route renders with full content
   - CTA is visible above the fold
   - OG tags are correct for social sharing
   - No distracting navigation links

// turbo
7. Run `deno task snapshot` to save the updated state.
