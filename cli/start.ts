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
  opts: { windsurf?: string; claude?: string; reads?: string[]; writes?: string[] } = {},
) => {
  const wsCmd = opts.windsurf ?? `/${skill.replace("_", "-")}`;
  const clCmd = opts.claude ?? `/${skill.replace("_", "-")}`;

  printSection(description, "Run this in your AI tool:");
  console.log(`    Windsurf:  ${wsCmd}`);
  console.log(`    Claude:    ${clCmd}`);

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

interface LaunchPhase {
  num: string;
  label: string;
  done: boolean;
  action: () => void | Promise<void>;
}

const launchPhases: LaunchPhase[] = [
  {
    num: "1",
    label: "Business intake",
    done: state.completedFiles.includes("business/01-business-input.yaml"),
    action: () => run("intake"),
  },
  {
    num: "2",
    label: "Brand strategy",
    done: state.completedFiles.includes("business/02-brand-strategy.md"),
    action: () => showAICommand("brand-strategy", "Build brand positioning and messaging", {
      windsurf: "/build-brand-strategy",
      claude: "/build-brand-strategy",
      reads: ["business/01-business-input.yaml", "agency/methodology/brand-strategy-framework.md"],
      writes: ["business/02-brand-strategy.md"],
    }),
  },
  {
    num: "2b",
    label: "Brand identity",
    done: state.completedFiles.includes("business/02b-brand-identity.yaml"),
    action: () => showAICommand("brand-identity", "Generate design tokens from brand strategy", {
      windsurf: "/build-brand-strategy",
      claude: "/build-brand-strategy",
      reads: ["business/02-brand-strategy.md", "business/01-business-input.yaml"],
      writes: ["business/02b-brand-identity.yaml"],
    }),
  },
  {
    num: "3",
    label: "Offer design",
    done: state.completedFiles.includes("business/03-business-model.md") &&
      state.completedFiles.includes("business/04-value-proposition.md") &&
      state.completedFiles.includes("business/05-personas-jobs.md"),
    action: () => showAICommand("offer-design", "Define business model, value prop, and personas", {
      windsurf: "/run-offer-design",
      claude: "/run-offer-design",
      reads: ["business/01-business-input.yaml", "business/02-brand-strategy.md"],
      writes: ["business/03-business-model.md", "business/04-value-proposition.md", "business/05-personas-jobs.md"],
    }),
  },
  {
    num: "4",
    label: "Sitemap & IA",
    done: state.completedFiles.includes("business/06-sitemap.yaml"),
    action: () => showAICommand("sitemap-ia", "Plan page structure and write page briefs", {
      windsurf: "/generate-sitemap",
      claude: "/generate-sitemap",
      reads: ["business/02-brand-strategy.md", "business/03-business-model.md", "business/05-personas-jobs.md"],
      writes: ["business/06-sitemap.yaml", "business/07-page-briefs/*.md"],
    }),
  },
  {
    num: "5",
    label: "SEO brief",
    done: state.completedFiles.includes("business/08-seo-brief.md"),
    action: () => showAICommand("seo-brief", "Define keyword strategy and metadata direction", {
      windsurf: "/run-seo-brief",
      claude: "/run-seo-brief",
      reads: ["business/01-* through business/07-*"],
      writes: ["business/08-seo-brief.md"],
    }),
  },
  {
    num: "6",
    label: "Page copy",
    done: state.completedFiles.includes("business/09-content-deck.md"),
    action: () => showAICommand("page-copy", "Write structured copy for each page", {
      windsurf: "/write-page-copy",
      claude: "/write-page-copy",
      reads: ["business/07-page-briefs/*.md", "business/02-brand-strategy.md", "business/08-seo-brief.md"],
      writes: ["business/09-content-deck.md"],
    }),
  },
  {
    num: "7",
    label: "Launch QA",
    done: state.completedFiles.includes("business/10-launch-checklist.md"),
    action: () => showAICommand("launch-qa", "Review all files for launch readiness", {
      windsurf: "/launch-qa",
      claude: "/launch-qa",
      reads: ["business/01-* through business/09-*", "agency/rubrics/*"],
      writes: ["business/10-launch-checklist.md"],
    }),
  },
  {
    num: "8",
    label: "Website build",
    done: state.hasWebsite,
    action: () => showAICommand("website-init", "Build the website from business files", {
      windsurf: "/init-website",
      claude: "/init-website",
      reads: ["business/09-content-deck.md", "business/07-page-briefs/*.md", "business/08-seo-brief.md"],
      writes: ["website/"],
    }),
  },
];

// ── Main menu ────────────────────────────────────────────

const menuOptions = [
  { name: "🚀  First Launch — guided step-by-step build", value: "launch" },
  { name: "📄  Add Content — new page, blog post, or landing page", value: "content" },
  { name: "✏️   Update — revise strategy, copy, SEO, or offers", value: "update" },
  { name: "🔍  Audit & QA — validate files, run QA, prelaunch check", value: "audit" },
  { name: "📊  Analytics — GTM, conversion, reporting setup", value: "analytics" },
  { name: "🎨  Brand — check logos and design tokens", value: "brand" },
  { name: "🌐  Localization — add a locale", value: "i18n" },
];

if (state.hasWebsite) {
  menuOptions.push({
    name: state.isBrandingStale
      ? "🔄  Rebuild Website — branding out of sync, re-generate from business files"
      : "🔄  Rebuild Website — full rebuild from business files",
    value: "rebuild",
  });
}

menuOptions.push({ name: "⚙️   Setup — init website, rename project", value: "setup" });

const category = await Select.prompt({
  message: "What do you need?",
  options: menuOptions,
});

// ── First Launch (guided checklist) ──────────────────────

if (category === "launch") {
  printSection("First Launch", "Follow the delivery workflow from intake to implementation.");

  console.log("  Phase checklist:\n");
  for (const phase of launchPhases) {
    const icon = phase.done ? "✓" : "○";
    const marker = phase.done ? "" : " ← next";
    const isCurrent = !phase.done && launchPhases.filter((p) => !p.done)[0] === phase;
    console.log(`    ${icon}  ${phase.num}. ${phase.label}${isCurrent ? marker : ""}`);
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

// ── Rebuild Website ──────────────────────────────────────

if (category === "rebuild") {
  printSection("Rebuild Website", "Full rebuild from business files — wipes website/ and regenerates.");
  printInfo("This runs deno task init-website which:\n");
  console.log("  1. Scaffolds a fresh Fresh 2.2+ project");
  console.log("  2. Generates branded styles, routes, and components from business/");
  console.log("  3. Then your AI tool populates content\n");
  await run("init-website");
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
      { name: "📋  Clone a page brief from template", value: "clone-brief" },
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
    const skillMap: Record<string, { windsurf: string; claude: string; writes: string[] }> = {
      "brand-strategy": { windsurf: "/build-brand-strategy", claude: "/build-brand-strategy", writes: ["business/02-brand-strategy.md"] },
      "brand-identity": { windsurf: "/build-brand-strategy", claude: "/build-brand-strategy", writes: ["business/02b-brand-identity.yaml"] },
      "offer-design": { windsurf: "/run-offer-design", claude: "/run-offer-design", writes: ["business/03-*.md", "04-*.md", "05-*.md"] },
      "sitemap-ia": { windsurf: "/generate-sitemap", claude: "/generate-sitemap", writes: ["business/06-sitemap.yaml", "07-page-briefs/*.md"] },
      "seo-brief": { windsurf: "/run-seo-brief", claude: "/run-seo-brief", writes: ["business/08-seo-brief.md"] },
      "page-copy": { windsurf: "/write-page-copy", claude: "/write-page-copy", writes: ["business/09-content-deck.md"] },
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
      { name: "✓  Validate business files (exist + YAML keys)", value: "validate" },
      { name: "📊  Content audit (coverage, brief ↔ copy, SEO)", value: "audit" },
      { name: "🚀  Prelaunch check (unchecked items)", value: "prelaunch" },
      { name: "🔍  Full launch QA (AI-driven review)", value: "launch-qa" },
    ],
  });

  if (task === "launch-qa") {
    showAICommand("launch-qa", "Comprehensive prelaunch audit across all business files", {
      windsurf: "/launch-qa",
      claude: "/launch-qa",
      reads: ["business/01-* through business/09-*", "agency/rubrics/*"],
      writes: ["business/10-launch-checklist.md"],
    });
  } else {
    await run(task);
  }
}

// ── Analytics & Tracking ─────────────────────────────────

if (category === "analytics") {
  await run("analytics");
}

// ── Brand Assets ─────────────────────────────────────────

if (category === "brand") {
  printSection("Brand Assets & Identity", "Check logo files and manage visual identity tokens.");

  const task = await Select.prompt({
    message: "What do you need?",
    options: [
      { name: "🖼️   Check logo files & naming convention", value: "brand-check" },
      { name: "🎨  Generate / update brand identity tokens", value: "brand-identity" },
    ],
  });

  if (task === "brand-identity") {
    showAICommand("brand-identity", state.hasBrandIdentity
      ? "Update your visual identity tokens"
      : "Generate design tokens from your brand strategy", {
      windsurf: "/build-brand-strategy",
      claude: "/build-brand-strategy",
      reads: ["business/02-brand-strategy.md", "business/01-business-input.yaml"],
      writes: ["business/02b-brand-identity.yaml"],
    });
    if (!state.hasBrandIdentity) {
      printHint("Make sure business/02-brand-strategy.md exists first.");
    }
  } else {
    await run("brand-check");
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
      { name: "✏️   Rename project / set business name", value: "init-project" },
      { name: "✓  Validate business files", value: "validate" },
    ],
  });
  await run(task);
}
