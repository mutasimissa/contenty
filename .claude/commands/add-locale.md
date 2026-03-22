---
description: Add a new language to the site end-to-end
---

Complete workflow for adding a new language/locale to the website.

1. Run `deno task add-locale` to update business input, create locale JSON stub, and prepare locale routes.
2. For each page in the sitemap, create locale route stubs and translate content (or mark for human translation).
3. Translate UI strings in `website/locales/<locale>.json`.
4. Verify `LocaleSwitcher` lists the new locale in `Header.tsx`.
5. Add `hreflang` tags to all existing pages via the `HrefLang` component.
6. If RTL locale: verify RTL font in brand identity and `dir="rtl"` styling.
7. Run `deno task snapshot` to save the updated state.
