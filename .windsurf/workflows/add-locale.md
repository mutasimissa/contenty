---
description: Add a new language to the site end-to-end
---

# Add Locale

Complete workflow for adding a new language/locale to the website.

## Prerequisites
- Website bootstrapped with at least one locale
- Content deck populated for the default locale

## Steps

// turbo
1. Run `deno task add-locale` to update the business input, create locale JSON stub, and prepare locale routes.

2. Read all existing page content from `business/09-content-deck.md` and the sitemap from `business/06-sitemap.yaml`.

3. For each page in the sitemap:
   a. Create or update the locale route at `website/routes/[locale]/<slug>.tsx`
   b. Translate the page content (or mark sections for human translation with `<!-- TRANSLATE: ... -->` comments)
   c. Ensure the route imports `Header`, `Footer`, `OGMeta`, and `JsonLd` components

4. Translate all UI strings in `website/locales/<locale>.json`:
   - Navigation labels
   - Footer text
   - CTA button text
   - Common UI phrases

5. Update `website/components/Header.tsx`:
   - Verify the `LocaleSwitcher` component lists the new locale
   - Ensure nav labels use translated strings for the new locale

6. Add `hreflang` tags to all existing pages:
   - Each page should have `<link rel="alternate" hreflang="<locale>" href="...">` for every locale
   - The `HrefLang` component should handle this automatically if locale config is updated

7. If the new locale is RTL (Arabic, Hebrew, Farsi, etc.):
   - Verify RTL font is specified in `business/02b-brand-identity.yaml` under `rtl_fonts`
   - Test that `dir="rtl"` is applied correctly in `_app.tsx`
   - Verify layout doesn't break with RTL text

8. Verify:
   - All locale routes render correctly
   - `hreflang` tags are present on every page
   - LocaleSwitcher shows the new locale and switches correctly
   - UI strings are translated in the locale JSON
   - RTL styling works (if applicable)

// turbo
9. Run `deno task snapshot` to save the updated state.
