import { Select } from "@cliffy/prompt";
import { getProjectState, STAGE_LABELS } from "./_shared/state.ts";
import { printInfo, printSection, printHint } from "./_shared/prompts.ts";

const state = getProjectState();

// ── Header ───────────────────────────────────────────────

const name = state.businessName || "(no business set)";
const stageLabel = STAGE_LABELS[state.stage];
const fileCount = state.completedFiles.length;
const totalFiles = state.completedFiles.length + state.missingFiles.length;

console.log(`
╔══════════════════════════════════════════════════════════╗
║                    ${name.padEnd(20)}Hub                 ║
╚══════════════════════════════════════════════════════════╝
`);

console.log(`  Stage:    ${stageLabel}`);
console.log(`  Files:    ${fileCount}/${totalFiles} business files populated`);
if (state.hasWebsite) console.log(`  Website:  bootstrapped`);
if (state.locales.length > 1) console.log(`  Locales:  ${state.locales.join(", ")}`);
if (state.hasBrandIdentity) console.log(`  Identity: defined`);
if (state.siteType) console.log(`  Type:     ${state.siteType}`);
if (state.brandAssets.present.length > 0) console.log(`  Brand:    ${state.brandAssets.present.length}/${state.brandAssets.present.length + state.brandAssets.missing.length} assets`);
if (state.isBrandingStale) console.log(`  ⚠️  Branding out of sync — brand identity is newer than website styles`);
console.log("");

// ── Helpers ──────────────────────────────────────────────

const run = (script: string) => {
  const cmd = new Deno.Command("deno", {
    args: ["task", script],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });
  const child = cmd.spawn();
  return child.status;
};

const showAICommand = (
  skill: string,
  description: string,
  opts: { command?: string; reads?: string[]; writes?: string[] } = {},
) => {
  const cmd = opts.command ?? `/${skill.replace("_", "-")}`;

  printSection(description, "Run this in Claude Code:");
  console.log(`    ${cmd}`);

  if (opts.reads?.length) {
    console.log(`\n  Reads:`);
    for (const f of opts.reads) console.log(`    <- ${f}`);
  }
  if (opts.writes?.length) {
    console.log(`  Writes:`);
    for (const f of opts.writes) console.log(`    -> ${f}`);
  }
  console.log("");
};

// ── Launch phases ────────────────────────────────────────

// Site-type skip rules (hardcoded from agency/site-types.yaml skip_skills)
const SITE_TYPE_SKIPS: Record<string, Set<string>> = {
  "coming-soon": new Set(["offer-design", "sitemap", "seo-brief", "launch-qa"]),
  "single-page": new Set(["sitemap", "launch-qa"]),
  "booking": new Set(["sitemap"]),
  "personal-blog": new Set(["offer-design"]),
};

const skippedPhases = state.siteType
  ? (SITE_TYPE_SKIPS[state.siteType] ?? new Set())
  : new Set<string>();

interface LaunchPhase {
  num: string;
  label: string;
  done: boolean;
  skipped: boolean;
  action: () => void | Promise<void>;
}

const launchPhases: LaunchPhase[] = [
  {
    num: "1",
    label: "Business intake",
    done: state.completedFiles.includes("business/01-business-input.yaml"),
    skipped: false,
    action: () => run("intake"),
  },
  {
    num: "2",
    label: "Brand strategy",
    done: state.completedFiles.includes("business/02-brand-strategy.md"),
    skipped: false,
    action: () => showAICommand("brand-strategy", "Build brand positioning and messaging", {
      command: "/build-brand-strategy",
      reads: ["business/01-business-input.yaml", "agency/methodology/brand-strategy-framework.md"],
      writes: ["business/02-brand-strategy.md"],
    }),
  },
  {
    num: "2b",
    label: "Brand identity",
    done: state.completedFiles.includes("business/02b-brand-identity.yaml"),
    skipped: false,
    action: () => showAICommand("brand-identity", "Generate design tokens from brand strategy", {
      command: "/build-brand-strategy",
      reads: ["business/02-brand-strategy.md", "business/01-business-input.yaml"],
      writes: ["business/02b-brand-identity.yaml"],
    }),
  },
  {
    num: "3",
    label: "Offer design",
    done: skippedPhases.has("offer-design") ||
      (state.completedFiles.includes("business/03-business-model.md") &&
      state.completedFiles.includes("business/04-value-proposition.md") &&
      state.completedFiles.includes("business/05-personas-jobs.md")),
    skipped: skippedPhases.has("offer-design"),
    action: () => showAICommand("offer-design", "Define business model, value prop, and personas", {
      command: "/run-offer-design",
      reads: ["business/01-business-input.yaml", "business/02-brand-strategy.md"],
      writes: ["business/03-business-model.md", "business/04-value-proposition.md", "business/05-personas-jobs.md"],
    }),
  },
  {
    num: "4",
    label: "Sitemap & IA",
    done: skippedPhases.has("sitemap") ||
      state.completedFiles.includes("business/06-sitemap.yaml"),
    skipped: skippedPhases.has("sitemap"),
    action: () => showAICommand("sitemap-ia", "Plan page structure and write page briefs", {
      command: "/generate-sitemap",
      reads: ["business/02-brand-strategy.md", "business/03-business-model.md", "business/05-personas-jobs.md"],
      writes: ["business/06-sitemap.yaml", "business/07-page-briefs/*.md"],
    }),
  },
  {
    num: "5",
    label: "SEO brief",
    done: skippedPhases.has("seo-brief") ||
      state.completedFiles.includes("business/08-seo-brief.md"),
    skipped: skippedPhases.has("seo-brief"),
    action: () => showAICommand("seo-brief", "Define keyword strategy and metadata direction", {
      command: "/run-seo-brief",
      reads: ["business/01-* through business/07-*"],
      writes: ["business/08-seo-brief.md"],
    }),
  },
  {
    num: "6",
    label: "Page copy",
    done: state.completedFiles.includes("business/09-content-deck.md"),
    skipped: false,
    action: () => showAICommand("page-copy", "Write structured copy for each page", {
      command: "/write-page-copy",
      reads: ["business/07-page-briefs/*.md", "business/02-brand-strategy.md", "business/08-seo-brief.md"],
      writes: ["business/09-content-deck.md"],
    }),
  },
  {
    num: "7",
    label: "Launch QA",
    done: skippedPhases.has("launch-qa") ||
      state.completedFiles.includes("business/10-launch-checklist.md"),
    skipped: skippedPhases.has("launch-qa"),
    action: () => showAICommand("launch-qa", "Review all files for launch readiness", {
      command: "/launch-qa",
      reads: ["business/01-* through business/09-*", "agency/rubrics/*"],
      writes: ["business/10-launch-checklist.md"],
    }),
  },
  {
    num: "8",
    label: "Website build",
    done: state.hasWebsite,
    skipped: false,
    action: () => showAICommand("website-init", "Build the website from business files", {
      command: "/init-website",
      reads: ["business/09-content-deck.md", "business/07-page-briefs/*.md", "business/08-seo-brief.md"],
      writes: ["website/"],
    }),
  },
];

// ── Main menu ────────────────────────────────────────────

const menuOptions = [
  { name: "🚀  Fresh Start — guided step-by-step build from scratch", value: "launch" },
  { name: "�  Sync — detect changes and propagate updates", value: "sync" },
  { name: "�  Add Content — new page, blog post, or landing page", value: "content" },
  { name: "✏️   Update — revise strategy, copy, SEO, or offers", value: "update" },
  { name: "🔍  Audit & QA — validate files, run content audit", value: "audit" },
  { name: "🌐  Localization — add a locale", value: "i18n" },
];

if (state.hasWebsite) {
  menuOptions.push({
    name: state.isBrandingStale
      ? "♻️   Rebuild Website — branding out of sync, re-generate from business files"
      : "♻️   Rebuild Website — full rebuild from business files",
    value: "rebuild",
  });
}

menuOptions.push({ name: "⚙️   Setup — init website, validate files", value: "setup" });

const category = await Select.prompt({
  message: "What do you need?",
  options: menuOptions,
});

// ── First Launch (guided checklist) ──────────────────────

if (category === "launch") {
  printSection("First Launch", "Follow the delivery workflow from intake to implementation.");

  console.log("  Phase checklist:\n");
  for (const phase of launchPhases) {
    const icon = phase.skipped ? "—" : phase.done ? "✓" : "○";
    const suffix = phase.skipped ? " (skipped)" : "";
    const isCurrent = !phase.done && launchPhases.filter((p) => !p.done)[0] === phase;
    const marker = isCurrent ? " ← next" : "";
    console.log(`    ${icon}  ${phase.num}. ${phase.label}${suffix}${marker}`);
  }
  console.log("");

  const nextPhase = launchPhases.find((p) => !p.done);
  if (nextPhase) {
    printInfo(`Next: Phase ${nextPhase.num} — ${nextPhase.label}\n`);
    await nextPhase.action();
  } else {
    printInfo("All phases complete! Your site is ready.\n");
    printHint("Use 'Add Content' or 'Update' to extend and maintain the site.");
  }
}

// ── Sync ─────────────────────────────────────────────────

if (category === "sync") {
  printSection("Sync", "Detect business file changes and propagate updates.");
  printInfo("Running change detection...\n");
  await run("sync");
  console.log(`
${"─".repeat(60)}
  After reviewing the report, run the edit-sync workflow
  in your AI tool to propagate changes:

  /edit-sync
${"─".repeat(60)}
`);
}

// ── Rebuild Website ──────────────────────────────────────

if (category === "rebuild") {
  printSection("Rebuild Website", "Full rebuild from business files — wipes website/ and regenerates.");
  showAICommand("rebuild-website", "Regenerate the entire website from business files", {
    command: "/rebuild-website",
    reads: ["business/01-* through business/09-*"],
    writes: ["website/"],
  });
}

// ── Add Content ──────────────────────────────────────────

if (category === "content") {
  printSection("Add Content", "Extend the site with new pages, blog posts, or landing pages.");

  const task = await Select.prompt({
    message: "What would you like to add?",
    options: [
      { name: "📄  New page (content, service, industry, legal, etc.)", value: "new-page" },
      { name: "📝  New blog post", value: "new-blog" },
      { name: "🎯  New landing page (conversion-focused)", value: "new-landing" },
    ],
  });
  await run(task);
}

// ── Update Existing ──────────────────────────────────────

if (category === "update") {
  printSection("Update Existing", "Revise strategy, copy, SEO, or business model.");

  const task = await Select.prompt({
    message: "What do you want to update?",
    options: [
      { name: "🎯  Brand strategy & positioning", value: "brand-strategy" },
      { name: "🎨  Brand identity & design tokens", value: "brand-identity" },
      { name: "💼  Business model & offers", value: "offer-design" },
      { name: "👥  Buyer personas", value: "offer-design" },
      { name: "🗺️   Sitemap & page structure", value: "sitemap-ia" },
      { name: "🔍  SEO brief & keywords", value: "seo-brief" },
      { name: "✏️   Page copy (pick a page)", value: "page-copy" },
      { name: "📥  Re-run business intake", value: "intake" },
    ],
  });

  if (task === "intake") {
    await run("intake");
  } else {
    const skillMap: Record<string, { command: string; writes: string[] }> = {
      "brand-strategy": { command: "/build-brand-strategy", writes: ["business/02-brand-strategy.md"] },
      "brand-identity": { command: "/build-brand-strategy", writes: ["business/02b-brand-identity.yaml"] },
      "offer-design": { command: "/run-offer-design", writes: ["business/03-*.md", "04-*.md", "05-*.md"] },
      "sitemap-ia": { command: "/generate-sitemap", writes: ["business/06-sitemap.yaml", "07-page-briefs/*.md"] },
      "seo-brief": { command: "/run-seo-brief", writes: ["business/08-seo-brief.md"] },
      "page-copy": { command: "/write-page-copy", writes: ["business/09-content-deck.md"] },
    };
    const info = skillMap[task];
    if (info) {
      showAICommand(task, `Update your ${task.replace(/-/g, " ")}`, info);
    }
    printHint("The AI reads your current files and proposes updates — nothing is lost.");
  }
}

// ── Audit & QA ───────────────────────────────────────────

if (category === "audit") {
  printSection("Audit & QA", "Check file health, content coverage, and launch readiness.");

  const task = await Select.prompt({
    message: "What kind of check?",
    options: [
      { name: "✓  Validate business files (exist + YAML keys + brand assets)", value: "validate" },
      { name: "📊  Content audit (coverage, SEO, launch checklist)", value: "audit" },
      { name: "🔍  Full launch QA (AI-driven review against rubrics)", value: "launch-qa" },
    ],
  });

  if (task === "launch-qa") {
    showAICommand("launch-qa", "Comprehensive prelaunch audit across all business files", {
      command: "/launch-qa",
      reads: ["business/01-* through business/09-*", "agency/rubrics/*"],
      writes: ["business/10-launch-checklist.md"],
    });
  } else {
    await run(task);
  }
}

// ── Localization ─────────────────────────────────────────

if (category === "i18n") {
  printSection("Localization", "Manage site languages and locale structure.");

  if (state.locales.length > 1) {
    printInfo(`Current locales: ${state.locales.join(", ")} (default: ${state.defaultLocale})`);
  } else {
    printInfo(`Single-language site (${state.defaultLocale}). You can add more locales.`);
  }

  const task = await Select.prompt({
    message: "What do you need?",
    options: [
      { name: "🌐  Add a new locale", value: "add-locale" },
      { name: "📝  Write a blog post in a specific locale", value: "new-blog" },
    ],
  });
  await run(task);
}

// ── Project Setup ────────────────────────────────────────

if (category === "setup") {
  printSection("Project Setup", "Infrastructure and project configuration.");

  const task = await Select.prompt({
    message: "What do you need?",
    options: [
      { name: "🏗️   Bootstrap website (Fresh 2.2 + Tailwind 4)", value: "init-website" },
      { name: "✓  Validate business files", value: "validate" },
      { name: "📸  Save snapshot for change detection", value: "snapshot" },
    ],
  });
  await run(task);
}
