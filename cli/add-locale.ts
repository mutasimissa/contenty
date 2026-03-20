import { askText, printSection, printSuccess, printInfo, printHint, printNext } from "./_shared/prompts.ts";
import { readYaml, writeYaml, getLocales } from "./_shared/files.ts";

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

console.log(`
  Next steps for the "${newLocale}" locale:
  ─────────────────────────────────────────
  1. Create translated page briefs or content as needed
  2. Use \`deno task new-blog\` to write blog posts in this locale
  3. Implement locale routing in website/routes/ (e.g. /${newLocale}/...)
  4. Add hreflang tags for SEO (see agency/methodology/seo-framework.md)
`);

printNext(
  'Tell your AI tool:\n' +
  `  "The site now supports ${updatedLocales.join(", ")}. Update the SEO brief and sitemap for locale ${newLocale}."`,
);
