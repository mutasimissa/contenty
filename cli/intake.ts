import {
  askText, askConfirm,
  printSuccess, printError, printNext, printSection, printHint,
} from "./_shared/prompts.ts";
import { readText, readYaml, writeText, fileExists } from "./_shared/files.ts";
import { stringify } from "@std/yaml";

console.log(`
╔══════════════════════════════════════════════════════════╗
║              CONTENTY — Business Intake                  ║
║  Quick-start: 5 questions, then AI fills the rest        ║
╚══════════════════════════════════════════════════════════╝
`);

// ── 1. Core identity ────────────────────────────────────

printSection(
  "1/5 — Business Identity",
  "The three required fields that drive everything.",
);

printHint('Example: "Greenfield Solar" or "Apex Consulting Group"');
const businessName = await askText("Business name");

printHint('Example: "Renewable energy" or "B2B management consulting"');
const industry = await askText("Industry or sector");

// ── 2. Website goal ─────────────────────────────────────

printSection(
  "2/5 — Website Goal",
  "What should the website accomplish?",
);

printHint(
  'Examples:\n' +
  '     "Generate qualified inbound leads for our consulting services"\n' +
  '     "Sell online courses directly to individual learners"\n' +
  '     "Build credibility so prospects book a discovery call"',
);
const websiteGoal = await askText("Website goal");

// ── 3. Primary CTA ──────────────────────────────────────

printSection(
  "3/5 — Primary Call-to-Action",
  "The #1 action you want visitors to take.",
);

printHint(
  'Examples: "Book a discovery call", "Start free trial",\n' +
  '     "Request a quote", "Download the whitepaper"',
);
const primaryCta = await askText("Primary CTA");

// ── 4. Brand logo check ─────────────────────────────────

printSection(
  "4/5 — Brand Logo Check",
  "Verifying required logo files exist.",
);

const REQUIRED_LOGOS = [
  { file: "assets/brand/logo.svg", label: "Primary logo (SVG)" },
  { file: "assets/brand/logo-icon.svg", label: "Square icon (SVG)" },
];

let logosMissing = false;
for (const { file, label } of REQUIRED_LOGOS) {
  if (fileExists(file)) {
    printSuccess(`  ✓ ${label} — ${file}`);
  } else {
    printError(`  ✗ Missing: ${file} — ${label}`);
    logosMissing = true;
  }
}

if (logosMissing) {
  console.log("");
  printError(
    "Intake cannot continue without the required logo files.\n" +
    "  Place your logos at the paths shown above and run `deno task intake` again.\n" +
    "  The brand-identity skill will generate all needed variations from these SVGs.",
  );
  Deno.exit(1);
}

// ── 5. Language / i18n ──────────────────────────────────

printSection(
  "5/5 — Language",
  "Primary language for the website.",
);

printHint(
  'Use ISO 639-1 codes: en = English, ar = Arabic, fr = French, es = Spanish, etc.',
);
const defaultLocale = await askText("Default language code", "en");

const multiLingual = await askConfirm("Will this site support multiple languages?", false);
let locales: string[] = [];

if (multiLingual) {
  printHint(
    'Enter additional locale codes (comma-separated).\n' +
    '     Example: ar, fr',
  );
  const extra = await askText("Additional locales", "");
  locales = extra
    ? [defaultLocale, ...extra.split(",").map((s) => s.trim()).filter(Boolean)]
    : [defaultLocale];
} else {
  locales = [];
}

// ── 6. Confirmation ─────────────────────────────────────

printSection(
  "Confirm",
  "Review your inputs before saving.",
);

console.log(`  Business:  ${businessName}`);
console.log(`  Industry:  ${industry}`);
console.log(`  Goal:      ${websiteGoal}`);
console.log(`  CTA:       ${primaryCta}`);
console.log(`  Logos:     ✓ assets/brand/logo.svg, ✓ assets/brand/logo-icon.svg`);
console.log(`  Locale:    ${defaultLocale}${locales.length > 1 ? ` + ${locales.slice(1).join(", ")}` : ""}`);
console.log("");

const confirmed = await askConfirm("Save these inputs?", true);
if (!confirmed) {
  console.log("\n  Aborted. Run `deno task intake` again to restart.\n");
  Deno.exit(0);
}

// ── Write output ────────────────────────────────────────

const templatePath = "business/01-business-input.yaml";
let existing: Record<string, unknown> = {};
try {
  existing = readYaml<Record<string, unknown>>(templatePath);
} catch { /* template may be empty or unparseable */ }

const merged: Record<string, unknown> = {
  ...existing,
  business_name: businessName,
  website_goal: websiteGoal,
  industry,
  primary_cta: primaryCta,
  default_locale: defaultLocale,
  ...(locales.length > 1 ? { locales } : { locales: [] }),
};

await writeText(templatePath, stringify(merged, { lineWidth: 120 }));
printSuccess(`Wrote ${templatePath}`);

const projectTemplate = readText("PROJECT.md");
const updatedProject = projectTemplate
  .replace(/^- Business name:.*$/m, `- Business name: ${businessName}`)
  .replace(/^- Primary market:.*$/m, `- Primary market: (run /init-business to complete)`)
  .replace(/^- Website scope:.*$/m, `- Website scope: ${websiteGoal}`);

await writeText("PROJECT.md", updatedProject);
printSuccess("Updated PROJECT.md");

console.log(`\n${"═".repeat(60)}`);
console.log("  Core intake complete!");
console.log(`${"═".repeat(60)}`);
console.log("");
console.log("  The business input file has ~15 seed sections that help the AI");
console.log("  generate better strategy, copy, and SEO. To fill them:");
console.log("");

printNext(
  "Run /init-business in your AI tool (Windsurf or Claude).\n" +
  "  The AI will interview you section by section and fill the rest.\n" +
  "  Or edit business/01-business-input.yaml manually.",
);
