# Offer Design

> **Role:** You are a business strategist clarifying the commercial offer
> structure, value proposition, buyer personas, and website conversion logic.

## Goal

Define the business model, value proposition, and buyer personas so the website
can present clear offers with a logical conversion path.

## Prerequisites

- `business/01-business-input.yaml` is complete
- `business/02-brand-strategy.md` is complete (run `skills/brand-strategy/`
  first)

## Read these files first

1. `business/01-business-input.yaml` — business facts
2. `business/02-brand-strategy.md` — positioning and audience
3. `agency/methodology/business-model-framework.md` — what to capture
4. `agency/methodology/value-proposition-framework.md` — value prop structure
5. `agency/templates/business-model.template.md` — output structure

## Working method

1. Read the business input and brand strategy
2. Ask the user about:
   - Revenue model (project-based, subscription, retainer, etc.)
   - Core offers — what specifically does the business sell?
   - Sales motion — consultative, self-serve, demo-driven?
   - Conversion event — what action on the website counts as success?
   - Packaging — how are offers structured for buyers?
   - Pricing context — any pricing to show, or custom-quoted?
3. Map the **conversion path**: visitor → understanding → trust → action
4. Define the **value proposition** using the framework: audience, problem,
   desired outcome, promise, differentiation, proof, urgency
5. Define **buyer personas** with their needs, objections, and jobs-to-be-done
6. Write all three output files

## Output files

### `business/03-business-model.md`

```markdown
# Business Model

## Revenue model

[Project-based / subscription / retainer / etc.]

## Core offers

- [Offer 1: specific description]
- [Offer 2: specific description]

## Conversion path

[Visitor → understanding → trust → action, with specifics]

## Sales motion

[Consultative B2B / self-serve / demo / etc.]

## Packaging

[How offers are scoped or bundled]

## Notes and dependencies

[What the website must do to support this model]
```

### `business/04-value-proposition.md`

```markdown
# Value Proposition

## Audience

[Specific buyer description]

## Problem

[What the audience struggles with — be specific]

## Desired outcome

[What success looks like for the buyer]

## Promise

[One sentence: what the business delivers]

## Differentiation

[What makes this different from alternatives]

## Proof

[Types of evidence: case studies, credentials, process, references]

## Reason to act now

[Why waiting is costly]
```

### `business/05-personas-jobs.md`

```markdown
# Personas and Jobs

## [Persona 1 title]

### Needs

[What they need from this business]

### Objections

[What concerns they have]

### Decision criteria

[What they evaluate when choosing]

## [Persona 2 title]

### Needs

...

### Objections

...

### Decision criteria

...
```

## Validation criteria

- [ ] Main offer is obvious and specific (not vague categories)
- [ ] Conversion event is explicitly named
- [ ] Value proposition headline could work in a hero section
- [ ] Each persona has at least 2 specific objections
- [ ] Conversion path maps logically from stranger to qualified lead

## Dependency chain

- **Requires:** `business/01-business-input.yaml`,
  `business/02-brand-strategy.md`
- **Feeds into:** `skills/sitemap-ia/`, `skills/seo-brief/`, `skills/page-copy/`

## Next step

After this skill: run `skills/sitemap-ia/SKILL.md`

## Guardrails

- Prefer structured markdown over vague prose
- Preserve clear separation between verified facts and assumptions
- Keep all business truth in `business/`
- Do not invent business facts — ask the user
- Value proposition must be concrete enough to shape a headline, subheadline,
  and CTA
