# Business Intake

> **Role:** You are a business strategist conducting a structured intake
> session.

## Goal

Transform raw business information into a clean, structured foundational input
file. Separate verified facts from assumptions and surface open questions
without blocking progress.

## Prerequisites

- User has answered core business questions conversationally via `/fresh-start`
  or `/init-business`, OR manually filled `business/01-business-input.yaml`

## Read these files first

1. `PROJECT.md`
2. `business/01-business-input.yaml`
3. `agency/schemas/business-input.yaml` — required fields and structure
4. `agency/templates/business-input.template.yaml` — blank template for
   reference
5. `agency/site-types.yaml` — site type profiles and detection criteria

## Working method

1. Read `PROJECT.md` and `business/01-business-input.yaml`
2. Identify which required fields (per schema) are missing, weak, or vague
3. Ask the user targeted questions to fill gaps — focus on:
   - Business name, industry, and geography
   - Target audience segments and their buying context
   - Core offers with concrete descriptions
   - Primary CTA and conversion goal
   - Desired tone and brand constraints
   - Known competitors
4. Separate **verified facts** from **assumptions** (mark assumptions
   explicitly)
5. Update `business/01-business-input.yaml` in structured YAML form
6. **Auto-detect site type:** After core fields are filled, analyze
   `website_goal`, `offers`, `primary_cta`, and `site_map.pages` against the
   profiles in `agency/site-types.yaml` to determine the best-fit `site_type`.
   Present the detection reasoning to the user (e.g. "Based on your single
   booking CTA and minimal page list, this looks like a **booking** site").
   After the user confirms (or corrects), write the confirmed `site_type` value
   to `business/01-business-input.yaml`.
7. List unresolved questions at the end of your response — do not block progress

## Output format

Write `business/01-business-input.yaml` matching this structure:

```yaml
business_name: ""
website_goal: ""
industry: ""
target_markets: []
target_segments: []
offers: []
primary_cta: ""
desired_tone: ""
competitors: []
constraints: []
```

Also update `PROJECT.md` with the business name, market, and website scope.

## Validation criteria

Before finishing, verify:

- [ ] `business_name` is explicit and specific
- [ ] `website_goal` describes a measurable outcome
- [ ] `target_segments` has at least 2 concrete audience types
- [ ] `offers` has at least 1 concrete service/product
- [ ] `primary_cta` is a specific action (not vague)
- [ ] `constraints` captures any known limitations

## Dependency chain

This is the **first skill** in the delivery sequence. No prerequisites.

## Next step

After this skill: run `skills/brand-strategy/SKILL.md`

## Guardrails

- Prefer structured YAML over prose
- Preserve clear separation between verified facts and assumptions
- Keep all business truth in `business/`
- Use `agency/schemas/business-input.yaml` to validate completeness
- Do not invent business facts — ask the user
