import {
  askText, askList, askConfirm,
  printSuccess, printNext, printSection, printHint,
} from "./_shared/prompts.ts";
import { writeYaml, writeText, readText } from "./_shared/files.ts";

console.log(`
╔══════════════════════════════════════════════════════════╗
║              CONTENTY — Business Intake                  ║
║  Answer each question to build your business foundation  ║
╚══════════════════════════════════════════════════════════╝
`);

// ── 1. Identity ──────────────────────────────────────────

printSection(
  "1/8 — Business Identity",
  "Basic facts about who you are and what you do.",
);

printHint('Example: "Greenfield Solar" or "Apex Consulting Group"');
const businessName = await askText("Business name");

printHint('Example: "Renewable energy" or "B2B management consulting"');
const industry = await askText("Industry or sector");

// ── 2. Website goal ──────────────────────────────────────

printSection(
  "2/8 — Website Goal",
  "What should the website accomplish? Think about the single most important outcome.",
);

printHint(
  'Examples:\n' +
  '     "Generate qualified inbound leads for our consulting services"\n' +
  '     "Sell online courses directly to individual learners"\n' +
  '     "Build credibility so prospects book a discovery call"',
);
const websiteGoal = await askText("Website goal");

// ── 3. Audience ──────────────────────────────────────────

printSection(
  "3/8 — Audience & Markets",
  "Who are you trying to reach, and where are they?",
);

printHint(
  'Target markets = geographic regions you serve.\n' +
  '     Examples: "Saudi Arabia", "GCC", "North America", "Global"',
);
const targetMarkets = await askList("Target markets");

printHint(
  'Audience segments = specific roles or types of people visiting your site.\n' +
  '     Examples: "CTOs at mid-size companies", "HR managers", "Homeowners aged 30-50"\n' +
  '     Be as specific as you can — "plant managers" is better than "decision-makers".',
);
const targetSegments = await askList("Target audience segments");

// ── 4. Offers ────────────────────────────────────────────

printSection(
  "4/8 — Core Offers",
  "What do you sell or provide? List your main products or services.",
);

printHint(
  'List each offer as a short, concrete phrase.\n' +
  '     Examples: "Brand strategy workshops", "Monthly SEO retainer",\n' +
  '     "Industrial monitoring system installation", "Online leadership course"',
);
const offers = await askList("Core offers / services");

// ── 5. Conversion & Tone ─────────────────────────────────

printSection(
  "5/8 — Conversion & Tone",
  "How do you want visitors to act, and how should the site feel?",
);

printHint(
  'The primary CTA is the #1 action you want visitors to take.\n' +
  '     Examples: "Book a discovery call", "Start free trial",\n' +
  '     "Request a quote", "Download the whitepaper"',
);
const primaryCta = await askText("Primary CTA");

printHint(
  'Tone = 3-5 adjectives that describe how the site should sound.\n' +
  '     Examples: "Clear, credible, practical"\n' +
  '     "Bold, energetic, conversational"\n' +
  '     "Professional, warm, reassuring"',
);
const desiredTone = await askText("Desired tone");

// ── 6. Competitive landscape ─────────────────────────────

printSection(
  "6/8 — Competitive Landscape",
  "Who else does your audience consider? (optional but helpful)",
);

printHint(
  'Name direct competitors or types of alternatives.\n' +
  '     Examples: "McKinsey, Bain (for strategy consulting)"\n' +
  '     "Legacy industrial automation vendors"\n' +
  '     Press Enter to skip if unsure.',
);
const competitors = await askList("Key competitors");

printHint(
  'Constraints = any rules or limitations for the website.\n' +
  '     Examples: "No pricing on the site", "Must comply with HIPAA",\n' +
  '     "Avoid unsupported performance claims"\n' +
  '     Press Enter to skip.',
);
const constraints = await askList("Constraints");

// ── 7. Language / i18n ───────────────────────────────────

printSection(
  "7/8 — Language & Localization",
  "Will your site need to support multiple languages?",
);

printHint(
  'Use ISO 639-1 codes: en = English, ar = Arabic, fr = French, es = Spanish, etc.',
);
const defaultLocale = await askText("Default language code", "en");

const multiLingual = await askConfirm("Will this site support multiple languages?", false);
let locales: string[] = [defaultLocale];

if (multiLingual) {
  printHint(
    'List all locales including the default.\n' +
    '     Example: en, ar, fr',
  );
  locales = await askList("All supported locales", [defaultLocale]);
}

// ── 8. Brand Identity Seeds ───────────────────────────────────

printSection(
  "8/8 — Brand Identity Seeds",
  "Optional visual identity inputs. These help the AI generate your design tokens.",
);

printHint(
  'If you have a logo file, provide the path relative to the project root.\n' +
  '     Example: "assets/brand/logo-color.svg"\n' +
  '     Press Enter to skip if you don\'t have one yet.',
);
const logoPath = await askText("Logo file path (optional)", "");

printHint(
  'If you have a brand color in mind, enter a hex code.\n' +
  '     Example: "#2d5490" or "#e63946"\n' +
  '     Press Enter to skip.',
);
const brandColorHint = await askText("Brand color hint (optional)", "");

printHint(
  'A short statement describing the visual feel you want for the brand.\n' +
  '     Examples:\n' +
  '     "Clean, minimal, and trustworthy — convey authority without heaviness"\n' +
  '     "Bold and energetic — stand out in a crowded market"\n' +
  '     "Refined and corporate — match Big 4 credibility"\n' +
  '     Press Enter to skip.',
);
const brandPhilosophy = await askText("Brand philosophy (optional)", "");

// ── Write output ─────────────────────────────────────────────

const data: Record<string, unknown> = {
  business_name: businessName,
  website_goal: websiteGoal,
  industry,
  target_markets: targetMarkets,
  target_segments: targetSegments,
  offers,
  primary_cta: primaryCta,
  desired_tone: desiredTone,
  ...(competitors.length > 0 && { competitors }),
  ...(constraints.length > 0 && { constraints }),
  default_locale: defaultLocale,
  ...(locales.length > 1 && { locales }),
  ...(logoPath && { logo_path: logoPath }),
  ...(brandColorHint && { brand_color_hint: brandColorHint }),
  ...(brandPhilosophy && { brand_philosophy: brandPhilosophy }),
};

await writeYaml("business/01-business-input.yaml", data);
printSuccess("Wrote business/01-business-input.yaml");

const projectTemplate = readText("PROJECT.md");
const updatedProject = projectTemplate
  .replace(/^- Business name:.*$/m, `- Business name: ${businessName}`)
  .replace(/^- Primary market:.*$/m, `- Primary market: ${targetMarkets.join(", ")}`)
  .replace(/^- Website scope:.*$/m, `- Website scope: ${websiteGoal}`);

await writeText("PROJECT.md", updatedProject);
printSuccess("Updated PROJECT.md");

console.log(`\n${"═".repeat(60)}`);
console.log("  Intake complete! Here's what was captured:");
console.log(`${"═".repeat(60)}`);
console.log(`  Business:  ${businessName}`);
console.log(`  Industry:  ${industry}`);
console.log(`  Goal:      ${websiteGoal}`);
console.log(`  CTA:       ${primaryCta}`);
console.log(`  Tone:      ${desiredTone}`);
console.log(`  Markets:   ${targetMarkets.join(", ")}`);
console.log(`  Segments:  ${targetSegments.join(", ")}`);
console.log(`  Offers:    ${offers.join(", ")}`);
if (locales.length > 1) {
  console.log(`  Locales:   ${locales.join(", ")} (default: ${defaultLocale})`);
}
if (logoPath) console.log(`  Logo:      ${logoPath}`);
if (brandColorHint) console.log(`  Color:     ${brandColorHint}`);
if (brandPhilosophy) console.log(`  Identity:  ${brandPhilosophy}`);
console.log(`${"═".repeat(60)}\n`);

printNext(
  "Open this repo in Windsurf or Claude and say:\n" +
  '  "Follow the skill in skills/brand-strategy/SKILL.md"\n' +
  '  Then: "Follow the skill in skills/brand-identity/SKILL.md"',
);
