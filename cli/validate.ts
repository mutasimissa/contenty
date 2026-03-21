import { fileExists, readYaml } from "./_shared/files.ts";
import { printSuccess, printError, printInfo } from "./_shared/prompts.ts";

const REQUIRED_FILES = [
  "business/01-business-input.yaml",
  "business/02-brand-strategy.md",
  "business/02b-brand-identity.yaml",
  "business/03-business-model.md",
  "business/04-value-proposition.md",
  "business/05-personas-jobs.md",
  "business/06-sitemap.yaml",
  "business/08-seo-brief.md",
  "business/09-content-deck.md",
  "business/10-launch-checklist.md",
];

const REQUIRED_YAML_KEYS: Record<string, string[]> = {
  "business/01-business-input.yaml": [
    "business_name",
    "website_goal",
    "industry",
    "target_markets",
    "target_segments",
    "offers",
    "primary_cta",
  ],
  "business/02b-brand-identity.yaml": [
    "brand_philosophy",
    "colors",
    "typography",
  ],
};

let hasErrors = false;

printInfo("Checking required business files...\n");

for (const file of REQUIRED_FILES) {
  if (!fileExists(file)) {
    printError(`Missing: ${file}`);
    hasErrors = true;
  } else {
    console.log(`  ✓ ${file}`);
  }
}

console.log("");

for (const [file, keys] of Object.entries(REQUIRED_YAML_KEYS)) {
  if (!fileExists(file)) continue;

  printInfo(`Validating YAML keys in ${file}...`);
  try {
    const data = readYaml<Record<string, unknown>>(file);
    for (const key of keys) {
      if (data[key] === undefined || data[key] === null || data[key] === "") {
        printError(`  Missing or empty key "${key}" in ${file}`);
        hasErrors = true;
      } else {
        console.log(`  ✓ ${key}`);
      }
    }
  } catch (e) {
    printError(`  Failed to parse ${file}: ${e}`);
    hasErrors = true;
  }
}

console.log("");

if (hasErrors) {
  printError("Validation failed. Fix the issues above before proceeding.");
  Deno.exit(1);
} else {
  printSuccess("All required business files are present and valid.");
}
