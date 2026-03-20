---
description: Normalize and complete the business inputs for this repository
---

# /init-business

## Purpose

Review and strengthen the business input file after the user has run
`deno task intake`.

## Steps

1. Read `PROJECT.md`
2. Read `business/01-business-input.yaml`
3. Read `agency/schemas/business-input.yaml` for required fields
4. Read `skills/business-intake/SKILL.md` for the full working method
5. Identify missing or weak fields per the schema
6. Ask the user targeted questions to fill gaps
7. Update `business/01-business-input.yaml` with structured data
8. Update `PROJECT.md` with business name and scope
9. Summarize open questions without blocking momentum

## Output targets

- `business/01-business-input.yaml`
- `PROJECT.md`

## Quality check

- Validate against `agency/schemas/business-input.yaml`
- All required fields must be non-empty
