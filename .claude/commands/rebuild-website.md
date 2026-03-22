---
description: Wipe and regenerate the website from business files
---

Completely regenerate the website from the current business files.

1. Run `deno task validate` to confirm all business files are present and valid.
2. Run `deno task audit` to check content coverage before rebuilding.
3. Run `deno task init-website` to regenerate the Fresh scaffold and all branded files.
4. Read `skills/website-init/SKILL.md`. For every route, populate with content from the content deck, SEO metadata, OG tags via `OGMeta`, and JSON-LD via `JsonLd`. Verify heading hierarchy, internal links, and accessibility.
5. Run `deno task snapshot` to save the fresh state.
