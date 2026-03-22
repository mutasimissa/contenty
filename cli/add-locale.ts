import { askText, printSection, printSuccess, printInfo, printHint } from "./_shared/prompts.ts";
import { readYaml, writeYaml, writeText, getLocales, fileExists } from "./_shared/files.ts";

console.log(`
╔══════════════════════════════════════════════════════════╗
║            CONTENTY — Add Locale                         ║
╚══════════════════════════════════════════════════════════╝
`);

const { defaultLocale, locales } = getLocales();

printSection("Current Locales", "Languages currently configured for this site.");

if (locales.length > 1) {
  printInfo(`Locales: ${locales.join(", ")} (default: ${defaultLocale})`);
} else {
  printInfo(`Single-language site: ${defaultLocale}`);
}

printHint(
  'Use ISO 639-1 codes: en = English, ar = Arabic, fr = French,\n' +
  '     es = Spanish, de = German, zh = Chinese, ja = Japanese, etc.',
);

const newLocale = await askText("New locale code to add");

if (!newLocale || newLocale.length < 2) {
  console.error("❌ Invalid locale code.");
  Deno.exit(1);
}

if (locales.includes(newLocale)) {
  printInfo(`Locale "${newLocale}" already exists. No changes needed.`);
  Deno.exit(0);
}

const updatedLocales = locales.length > 1
  ? [...locales, newLocale]
  : [defaultLocale, newLocale];

try {
  const input = readYaml<Record<string, unknown>>("business/01-business-input.yaml");
  input.locales = updatedLocales;
  await writeYaml("business/01-business-input.yaml", input);
  printSuccess(`Added locale "${newLocale}" to business/01-business-input.yaml`);
  printInfo(`Locales are now: ${updatedLocales.join(", ")}`);
} catch (e) {
  console.error(`❌ Failed to update business input: ${e}`);
  Deno.exit(1);
}

// ── Generate locale stub files if website exists ────────

const hasWebsite = fileExists("website/deno.json") || fileExists("website/fresh.config.ts");

if (hasWebsite) {
  // Create locale JSON stub
  const localeJsonPath = `website/locales/${newLocale}.json`;
  if (!fileExists(localeJsonPath)) {
    const input = readYaml<Record<string, string>>("business/01-business-input.yaml");
    const stub = JSON.stringify({
      nav: { home: "Home", services: "Services", about: "About", contact: "Contact", book_cta: input.primary_cta || "" },
      footer: { copyright: "© {year} {business}. All rights reserved.", services: "Services", company: "Company", get_started: "Get started" },
      meta: {},
      pages: {},
    }, null, 2) + "\n";
    await writeText(localeJsonPath, stub);
    printSuccess(`Created ${localeJsonPath}`);
  }

  // Create locale route directory stubs
  const localeIndexPath = `website/routes/[locale]/index.tsx`;
  if (!fileExists(localeIndexPath)) {
    printInfo("Locale routes already exist or will be created by init-website.");
  }
}

console.log(`
${"─".repeat(60)}
  Next: run the /add-locale workflow in your AI tool to
  fully implement the "${newLocale}" locale.

  /add-locale

  The workflow will:
  1. Create locale route stubs for all pages
  2. Translate UI strings in website/locales/${newLocale}.json
  3. Add hreflang tags to all existing pages
  4. Update the LocaleSwitcher component
  5. Verify RTL styling (if applicable)
${"─".repeat(60)}
`);
